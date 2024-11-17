import { getGeminiResponse } from "./geminiApi";
import { getEnergyData } from "../ServiceApi/energyApi";

// Fungsi untuk mengelola pengiriman prompt dan respons AI
export const handleChatSubmit = async ({
  event,
  prompt,
  setLoading,
  setError,
  setChatHistory,
  chatHistory,
  setPrompt,
}) => {
  event.preventDefault(); // Mencegah refresh halaman
  if (!prompt.trim()) return; // Jika input kosong, keluar dari fungsi

  setLoading(true); // Mengaktifkan indikator loading
  setError(""); // Menghapus error sebelumnya
  setChatHistory((prevChatHistory) => [
    ...prevChatHistory,
    { role: "user", parts: [{ text: prompt }] }, // Tambahkan prompt pengguna ke riwayat
  ]);

  try {
    // Ambil data energi untuk dijadikan referensi dalam jawaban AI
    const EnergyData = await getEnergyData();
    const EnergyDataInfo = EnergyData.data
      .map(
        (energy) =>
          `Nama Device: ${energy.device}, Daya Watt: ${energy.watt}, Tanggal Pemakaian: ${energy.date}, Durasi Pemakaian: ${energy.usageHours}`
      )
      .join("\n");

    const filmSpecificPrompt = `
Anda adalah asisten AI yang ahli dalam manajemen energi listrik. Sambut pengguna dengan ramah, dan berdasarkan data berikut: ${EnergyDataInfo}, berikan jawaban yang jelas, informatif, dan praktis untuk pertanyaan: ${prompt}. Pastikan jawaban relevan dengan pertanyaan, serta berikan strategi atau solusi efisiensi energi jika diperlukan.
`;

    // Panggil API Gemini melalui fungsi utilitas
    const aiResponse = await getGeminiResponse(
      import.meta.env.VITE_API_KEY, // API Key
      filmSpecificPrompt, // Prompt yang dihasilkan
      chatHistory // Riwayat obrolan
    );

    // Tambahkan respons AI ke riwayat obrolan
    if (aiResponse) {
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { role: "model", parts: [{ text: aiResponse }] },
      ]);
    }

    setPrompt(""); // Kosongkan input pengguna
  } catch (err) {
    console.error(err);
    setError("An error occurred while generating content."); // Tampilkan error jika ada
  } finally {
    setLoading(false); // Nonaktifkan indikator loading
  }
};
