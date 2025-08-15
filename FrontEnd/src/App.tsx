import React, { useState } from "react";
import CodeInputBox from "./components/CodeInputBox";
import LoadingSpinner from "./components/LoadingSpinner";
import ReviewPanel from "./components/ReviewPanel";
import "./App";

function App() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState("");
  const [refactoredCode, setRefactoredCode] = useState("");

  const handleSubmit = async (codeToAnalyze: string) => {
    if (!codeToAnalyze.trim()) {
      alert("Please paste or upload some code first.");
      return;
    }

    setIsLoading(true);
    setReview("");
    setRefactoredCode("");

    try {
      const response = await fetch("http://localhost:8000/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeToAnalyze }),
      });

      const data = await response.json();
      setReview(data.review || "");
      setRefactoredCode(data.refactored_code || "");
    } catch (error) {
      console.error("Error analyzing code:", error);
      alert("Failed to analyze code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container p-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
        🤖 AI Code Reviewer
      </h1>
      <p className="text-gray-600 mb-6">
        Paste or upload your code for review ✨
      </p>

      {/* Side-by-Side Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Code Input */}
        <div className="flex-1">
          <CodeInputBox
            code={code}
            onChange={setCode}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        {/* Right: Review Panel */}
        <div className="flex-1">
          {isLoading ? (
            <LoadingSpinner />
          ) : review ? (
            <ReviewPanel review={review} refactoredCode={refactoredCode} />

          ) : (
            <div className="p-6 border rounded-lg text-center text-gray-400 bg-gray-50 h-full flex items-center justify-center">
              Your AI review will appear here after analysis.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
