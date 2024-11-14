import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI, HarmCategory } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import { getEnergyData } from "../utils/energyApi";

function ChatBot() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { role: "user", parts: [{ text: prompt }] },
    ]);

    try {
      const EnergyData = await getEnergyData();
      const EnergyDataInfo = EnergyData.data
        .map(
          (energy) =>
            `Nama Device: ${energy.device}, Daya Watt: ${energy.watt}, Tanggal Pemakaian: ${energy.date}, Durasi Pemakaian: ${energy.usageHours}`
        )
        .join("\n");
      const filmSpecificPrompt = `"Anda adalah asisten AI dengan keahlian dalam manajemen energi listrik dan sapalah user dengan ramah. Berdasarkan data berikut: ${EnergyDataInfo}, berikan jawaban yang ramah, informatif, dan praktis terkait manajemen energi listrik untuk pertanyaan berikut: ${prompt}.
Berikan jawaban yang langsung relevan dengan pertanyaan, termasuk strategi atau solusi praktis terkait efisiensi dan pengelolaan energi jika diperlukan."
`;

      const genAI = new GoogleGenerativeAI(
        "AIzaSyAAmeNonOeqDm27E0_modFLcqHOesCmce4"
      );
      const model = genAI.getGenerativeModel({
        model: "gemini-pro",
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT },
        ],
        generationConfig: {
          maxOutputTokens: 150,
          temperature: 0.5,
        },
      });
      const chat = model.startChat({ history: chatHistory });
      const result = await chat.sendMessageStream(filmSpecificPrompt);

      let aiResponse = "";
      for await (const chunk of result.stream) {
        aiResponse += chunk.text();
      }

      if (aiResponse) {
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { role: "model", parts: [{ text: aiResponse }] },
        ]);
      }

      setPrompt("");
    } catch (err) {
      console.error(err);
      setError("An error occurred while generating content.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setChatHistory([]);
    setError("");
    setPrompt("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-500">
          AI Baruchat
        </h1>

        {/* Chat Window */}
        <div className="flex flex-col space-y-4 h-80 overflow-y-auto border border-gray-300 rounded-lg p-4 mb-4">
          {chatHistory.length === 0 && !loading ? (
            <p className="text-center text-gray-500">
              Silahkan kirim pertanyaan tentang energi!
            </p>
          ) : (
            chatHistory.map((chat, index) => (
              <div key={index}>
                {chat.role === "user" ? (
                  <div className="text-right text-gray-700 whitespace-pre-wrap mb-2 break-words">
                    <p className="bg-blue-200 p-2 rounded-lg inline-block max-w-full text-left break-words">
                      {chat.parts[0].text}
                    </p>
                  </div>
                ) : (
                  <div className="text-left text-gray-700 whitespace-pre-wrap">
                    <div className="bg-green-200 p-2 rounded-lg inline-block">
                      <ReactMarkdown>{chat.parts[0].text}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          {loading && (
            <div className="text-center text-gray-500">
              Generating response...
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Form for Input */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
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

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className="bg-red-500 text-white py-2 px-4 rounded-lg w-full mt-4 hover:bg-red-600 transition-all duration-300 ease-in-out"
        >
          Refresh Chat
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
