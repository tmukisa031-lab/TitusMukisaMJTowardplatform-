// scanner.js
// Auto-channel scanner with HTTP probe + ffprobe deep-check + mirrors/backups
// Usage: NODE_ENV=production node scanner.js
// npm deps: axios p-limit
// System required: ffprobe (ffmpeg package) in PATH for deep-check

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const pLimit = require('p-limit');
const { spawn } = require('child_process');

const SOURCE_FILE = path.join(__dirname, 'source_channels.json');
const OUT_FILE = path.join(__dirname, 'channels.json');
const LOG_FILE = path.join(__dirname, 'scanner.log');

const CONCURRENCY = parseInt(process.env.CONCURRENCY) || 8;
const TIMEOUT_MS = parseInt(process.env.TIMEOUT_MS) || 8000; // per-request
const CHECK_INTERVAL_MS = parseInt(process.env.CHECK_INTERVAL_MS) || 1000 * 60 * 5; // 5 mins
const RETRIES = parseInt(process.env.RETRIES) || 1;

// helpers
function log(...args) {
  const msg = `[${new Date().toISOString()}] ${args.join(' ')}`;
  console.log(msg);
  try { fs.appendFileSync(LOG_FILE, msg + '\n'); } catch(e){}
}

async function httpProbeHead(url) {
  try {
    const res = await axios.head(url, {
      timeout: TIMEOUT_MS,
      maxRedirects: 5,
      validateStatus: null
    });
    return { ok: res.status >= 200 && res.status < 400, status: res.status, headers: res.headers };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// GET small range to confirm bytes (useful for HLS)
async function httpProbeRange(url) {
  try {
    const res = await axios.get(url, {
      timeout: TIMEOUT_MS,
      responseType: 'stream',
      headers: { Range: 'bytes=0-2048' },
      maxRedirects: 5,
      validateStatus: null
    });
    const ok = res.status >= 200 && res.status < 400;
    return { ok, status: res.status, headers: res.headers };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// ffprobe deep-check — returns { ok, info } or { ok:false, error }
function ffprobeCheck(url, timeout = 10000) {
  return new Promise((resolve) => {
    const args = ['-v','error','-show_streams','-show_format','-print_format','json', url];
    const proc = spawn('ffprobe', args, { timeout });
    let out = '', err = '';
    proc.stdout.on('data', d => out += d.toString());
    proc.stderr.on('data', d => err += d.toString());
    proc.on('close', code => {
      if (out) {
        try {
          const info = JSON.parse(out);
          const ok = info.streams && info.streams.length > 0;
          resolve({ ok, info });
        } catch (e) {
          resolve({ ok: false, error: 'ffprobe-parse-error' });
        }
      } else {
        resolve({ ok: false, error: err || ('ffprobe_exit_' + code) });
      }
    });
    proc.on('error', e => resolve({ ok: false, error: e.message }));
  });
}

async function probeUrl(url) {
  // quick HEAD
  const head = await httpProbeHead(url);
  if (head.ok) return { ok: true, method: 'HEAD', status: head.status };

  // try GET-range (HLS/MP3)
  const range = await httpProbeRange(url);
  if (range.ok) return { ok: true, method: 'RANGE', status: range.status };

  // last resort: ffprobe
  try {
    const ff = await ffprobeCheck(url, 10000);
    if (ff.ok) return { ok: true, method: 'FFPROBE', status: 'ffprobe detected streams' };
    return { ok: false, error: ff.error || 'ffprobe_no_streams' };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

async function checkChannel(channel) {
  // channel: { name, url, mirrors:[], backups:[], category, type }
  const urls = [channel.url].concat(channel.mirrors || []).concat(channel.backups || []);
  let lastError = null;
  for (const u of urls) {
    if (!u || u === 'guide') continue; // skip UI guide pseudo-url
    try {
      const res = await probeUrl(u);
      if (res.ok) {
        return {
          ...channel,
          activeUrl: u,
          status: 'online',
          statusCheckedAt: new Date().toISOString(),
          probeMethod: res.method,
          probeStatus: res.status || null,
          error: null
        };
      } else {
        lastError = res.error || res;
      }
    } catch (e) {
      lastError = e.message;
    }
  }
  // none worked
  return {
    ...channel,
    activeUrl: channel.url, // keep original for logs
    status: 'offline',
    statusCheckedAt: new Date().toISOString(),
    probeMethod: null,
    probeStatus: null,
    error: lastError
  };
}

async function runScanOnce() {
  if (!fs.existsSync(SOURCE_FILE)) {
    log('Missing source file:', SOURCE_FILE);
    return;
  }
  const raw = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'));
  log(`Scanning ${raw.length} channels (concurrency=${CONCURRENCY}) ...`);

  const limit = pLimit(CONCURRENCY);
  const checks = raw.map(ch => limit(() => checkChannelWithRetry(ch)));

  const results = await Promise.all(checks);
  const out = {
    updatedAt: new Date().toISOString(),
    checkedCount: results.length,
    channels: results
  };

  fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2), 'utf8');
  log(`Scan complete. Wrote ${OUT_FILE}`);
  return out;
}

async function checkChannelWithRetry(ch) {
  let attempt = 0;
  while (attempt <= RETRIES) {
    const res = await checkChannel(ch);
    if (res.status === 'online') return res;
    attempt++;
    if (attempt <= RETRIES) {
      await new Promise(r => setTimeout(r, 500)); // small wait then retry
    }
  }
  return { ...ch, status: 'offline', statusCheckedAt: new Date().toISOString() };
}

async function mainLoop() {
  log('Scanner starting ...');
  await runScanOnce();
  setInterval(async () => {
    try {
      await runScanOnce();
    } catch (e) {
      log('Scan error', e.message || e);
    }
  }, CHECK_INTERVAL_MS);
}

mainLoop().catch(err => {
  log('Fatal error', err.stack || err);
  process.exit(1);
});