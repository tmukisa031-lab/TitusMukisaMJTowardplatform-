import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/global.css";

export default function ChemistryCalculator() {
  const [reactants, setReactants] = useState("");
  const [mode, setMode] = useState("molarMass"); // default mode
  const [result, setResult] = useState("");

  const handleCalculate = () => {
    if (!reactants) {
      setResult("Please enter reactants.");
      return;
    }

    // Original logic preserved
    if (mode === "molarMass") {
      if (reactants.toLowerCase().includes("h2o")) {
        setResult("H2O → Molar Mass: 18.015 g/mol");
      } else if (reactants.toLowerCase().includes("nacl")) {
        setResult("NaCl → Molar Mass: 58.44 g/mol");
      } else {
        setResult(`Calculation for "${reactants}" is not yet supported.`);
      }
    }

    // New features
    else if (mode === "balancedEquation") {
      // Placeholder logic
      setResult(`Balanced equation for "${reactants}" is under analysis.`);
    } else if (mode === "stoichiometry") {
      setResult(`Stoichiometry calculation for "${reactants}" is under analysis.`);
    } else if (mode === "reverseReaction") {
      setResult(`Reverse reaction analysis for "${reactants}" is under analysis.`);
    } else if (mode === "substituteFinder") {
      setResult(`Possible substitutes for reactants in "${reactants}" are under research.`);
    } else if (mode === "mechanism") {
      setResult(`Reaction mechanism for "${reactants}" is being determined.`);
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <main className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Chemistry Calculator</h2>
        <p className="mb-4">Enter reactants separated by commas (e.g., H2,O2)</p>
        <input
          type="text"
          value={reactants}
          onChange={(e) => setReactants(e.target.value)}
          placeholder="Reactants..."
          className="border p-2 rounded w-full mb-4"
        />

        {/* Mode selection */}
        <div className="mb-4">
          <label htmlFor="mode" className="mr-2 font-semibold">Select Mode:</label>
          <select
            id="mode"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="molarMass">Molar Mass</option>
            <option value="balancedEquation">Balanced Equation</option>
            <option value="stoichiometry">Stoichiometry</option>
            <option value="reverseReaction">Reverse Reaction</option>
            <option value="substituteFinder">Find Substitutes</option>
            <option value="mechanism">Reaction Mechanism</option>
          </select>
        </div>

        <button
          onClick={handleCalculate}
          className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Calculate
        </button>

        <pre className="bg-gray-100 p-4 mt-4 rounded">{result}</pre>
      </main>
      <Footer />
    </>
  );
}