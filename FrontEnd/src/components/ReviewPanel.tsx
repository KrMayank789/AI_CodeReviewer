import React, { useState } from "react";

interface ReviewPanelProps {
  review: string;
  refactoredCode?: string;
}

const ReviewPanel: React.FC<ReviewPanelProps> = ({ review, refactoredCode }) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="bg-white border rounded-lg shadow-md p-4 h-full flex flex-col">
      {/* Review Section */}
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-lg font-bold text-purple-600 mb-3">📋 AI Review</h2>
        <div
          className="text-gray-700 text-sm whitespace-pre-wrap"
          dangerouslySetInnerHTML={{
            __html: review.replace(/\n/g, "<br/>"),
          }}
        />
      </div>

      {/* Refactored Code Section */}
      {refactoredCode && (
        <div className="mt-4">
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-purple-600 font-semibold text-sm mb-2 hover:underline"
          >
            {showCode ? "Hide Refactored Code" : "Show Refactored Code"}
          </button>
          {showCode && (
            <pre className="bg-gray-100 p-3 rounded-lg text-xs overflow-x-auto border">
              {refactoredCode}
            </pre>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-3 border-t text-xs text-gray-500">
        💡 AI analysis complete. Review your suggestions and refactored code.
      </div>
    </div>
  );
};

export default ReviewPanel;
