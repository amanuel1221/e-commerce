import React, { useState } from "react";

const ChatWidget = ({ products }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, from: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/.netlify/functions/assistant", {
        method: "POST",
        body: JSON.stringify({ message: userMessage, products }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { text: data.reply, from: "bot" }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: "Error: Could not fetch response", from: "bot" }]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4">
      {open && (
        <div className="w-96 h-96 bg-white border rounded shadow flex flex-col">
          <div className="bg-blue-500 text-white p-2 flex justify-between items-center rounded-t">
            <span>AI Product Assistant</span>
            <button onClick={() => setOpen(false)}>X</button>
          </div>
          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={m.from === "user" ? "text-right" : "text-left"}>
                <div className={`inline-block p-1 rounded whitespace-pre-wrap ${m.from === "user" ? "bg-gray-200" : "bg-blue-100"}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-left text-gray-500">Typing...</div>}
          </div>
          <div className="p-2 flex space-x-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 border rounded px-2"
              placeholder="Ask about products..."
              onKeyDown={e => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} className="bg-blue-500 text-white px-2 rounded">Send</button>
          </div>
        </div>
      )}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
