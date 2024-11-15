import React, { useRef, useEffect } from "react";

const InputForm = ({
  prompt,
  setPrompt,
  loading,
  handleSubmit,
  handleKeyDown,
}) => {
  const inputRef = useRef(null);

  const adjustTextareaHeight = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "auto";

      if (textarea.scrollHeight > 80) {
        textarea.style.height = `${80}px`;
        textarea.style.overflowY = "auto";
      } else {
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.style.overflowY = "hidden";
      }
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [prompt]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Tulis pertanyaan Anda"
        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        disabled={loading}
        rows="1"
        ref={inputRef}
      />
      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition-all duration-300 ease-in-out ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Generating..." : "Submit"}
      </button>
    </form>
  );
};

export default InputForm;
