import { useState } from "react";
import { GoogleGenerativeAI, HarmCategory } from "@google/generative-ai";
import ChatWindow from "../components/Chat-Bot/ChatWindow";
import InputForm from "../components/Chat-Bot/InputForm";
import { getEnergyData } from "../utils/energyApi";

function ChatBot() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-500">
          AI Baruchat
        </h1>

        {/* Chat Window */}
        <ChatWindow chatHistory={chatHistory} loading={loading} />

        {/* Error Display */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Input Form */}
        <InputForm
          prompt={prompt}
          setPrompt={setPrompt}
          loading={loading}
          handleSubmit={handleSubmit}
          handleKeyDown={handleKeyDown}
        />

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
