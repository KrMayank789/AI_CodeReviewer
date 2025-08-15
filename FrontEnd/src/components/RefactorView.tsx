import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface RefactorViewProps {
  code: string;
}

const RefactorView: React.FC<RefactorViewProps> = ({ code }) => {
  const match = code.match(/```(\w+)?\s*([\s\S]*?)```/);

  const language = match?.[1] || "plaintext";
  const extractedCode = match?.[2]?.trim() || code;

  return (
    <div className="anime-card p-4">
      <SyntaxHighlighter language={language} style={vscDarkPlus} wrapLongLines>
        {extractedCode}
      </SyntaxHighlighter>
    </div>
  );
};

export default RefactorView;
