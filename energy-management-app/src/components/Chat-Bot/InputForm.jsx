import React, { useRef, useEffect } from "react";
import { Textarea, Button } from "flowbite-react"; // Import Flowbite React components

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
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Tulis pertanyaan Anda"
        disabled={loading}
        rows="1"
        ref={inputRef}
        className="focus:ring-2 focus:ring-blue-500 resize-none" // Flowbite Tailwind styles
      />

      <Button
        type="submit"
        disabled={loading}
        className=" w-full"
        outline
        gradientMonochrome="cyan"
        size="lg"
      >
        {loading ? "Generating..." : "Submit"}
      </Button>
    </form>
  );
};

export default InputForm;
