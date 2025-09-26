# Backend setup
mkdir backend && cd backend
npm init -y
npm install express cors multer jsonwebtoken bcryptjs fs path

# Start backend
node server.js

# Frontend setup
cd ..
npx create-react-app frontend
cd frontend
npm install axios react-router-dom

# Start frontend
npm start