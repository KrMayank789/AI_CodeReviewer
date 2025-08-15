import React, { useRef } from "react";

interface CodeInputBoxProps {
  code: string;
  onChange: (value: string) => void;
  onSubmit: (code: string) => void;
  isLoading: boolean;
}

const CodeInputBox: React.FC<CodeInputBoxProps> = ({
  code,
  onChange,
  onSubmit,
  isLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileText = e.target?.result as string;
      onChange(fileText);
    };
    reader.readAsText(file);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleFileRead(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFileRead(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="anime-card p-4 rounded-xl border border-purple-200">
      {/* Drag & Drop Zone */}
      <div
        className="border-2 border-dashed border-purple-300 rounded-lg p-4 text-center text-gray-600 mb-4 hover:border-purple-500 transition cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <p className="font-semibold text-purple-500">
          📂 Drop a file here or click to upload
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Supported: .py, .js, .ts, .java, .cpp, .txt
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept=".py,.js,.ts,.java,.cpp,.txt"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}
      />

      {/* Code Input */}
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`# Paste your code here or drag & drop a file above\n# Example:\ndef hello_world():\n    print("Hello from your code reviewer! ✨")`}
        className="w-full p-3 border rounded-lg bg-white text-sm font-mono h-48 resize-none"
      />

      {/* Analyze Button */}
      <button
        onClick={() => onSubmit(code)}
        disabled={isLoading}
        className={`anime-button w-full mt-3 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Analyzing..." : "🚀 Analyze Code"}
      </button>
    </div>
  );
};

export default CodeInputBox;
