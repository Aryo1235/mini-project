import React from "react";
import ReactMarkdown from "react-markdown";

const ChatWindow = ({ chatHistory, loading }) => {
  return (
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
        <div className="text-center text-gray-500">Generating response...</div>
      )}
    </div>
  );
};

export default ChatWindow;
