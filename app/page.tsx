"use client";

import React, { useState, useEffect, useRef } from "react";

const responses = [
  "如果没人回应你，你还会继续追问吗？（关于你说的：“{input}”）",
  "那你想从谁那儿得到肯定呢？（关于你说的：“{input}”）",
  "你觉得这样追问能得到答案吗？（关于你说的：“{input}”）",
  "你有没有想过，答案可能就在你的内心？（关于你说的：“{input}”）",
  "你愿意真正面对这个问题吗？（关于你说的：“{input}”）",
  "如果换个角度思考，会有什么不同？（关于你说的：“{input}”）",
  "这是不是你想听到的答案呢？（关于你说的：“{input}”）",
  "你希望我怎么帮助你？（关于你说的：“{input}”）",
];

export default function Chat() {
  const [messages, setMessages] = useState<{ from: "user" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(_: React.FormEvent) {
    _.preventDefault();
    if (!input.trim()) return;

    setMessages((msgs) => [...msgs, { from: "user", text: input }]);

    const randomIndex = Math.floor(Math.random() * responses.length);
    const reply = responses[randomIndex].replace("{input}", input);

    setTimeout(() => {
      setMessages((msgs) => [...msgs, { from: "ai", text: reply }]);
    }, 700);

    setInput("");
  }

  return (
    <>
      <style>{`
        /* 页面整体容器 */
        .chat-container {
          max-width: 600px;
          margin: 40px auto 20px;
          height: 90vh;
          display: flex;
          flex-direction: column;
          background: #1e1e2f;
          color: white;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          border-radius: 12px;
          padding: 20px 24px 24px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 30px rgba(124, 58, 237, 0.6);
        }

        /* 顶部标题和介绍 */
        .header {
          margin-bottom: 20px;
          text-align: center;
          user-select: none;
        }
        .header h1 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #a78bfa;
          margin-bottom: 6px;
        }
        .header p {
          font-size: 1rem;
          color: #d8b4fe;
          opacity: 0.8;
        }

        /* 动态旋转圆环 */
        .rotating-ring {
          position: absolute;
          top: 16px;
          left: 16px;
          width: 48px;
          height: 48px;
          border: 4px solid transparent;
          border-top-color: #a78bfa;
          border-right-color: #8b5cf6;
          border-radius: 50%;
          animation: spin 2s linear infinite;
          filter: drop-shadow(0 0 6px #8b5cf6);
          z-index: 10;
        }
        @keyframes spin {
          from { transform: rotate(0deg);}
          to { transform: rotate(360deg);}
        }

        /* 消息列表区域 */
        .messages {
          flex-grow: 1;
          overflow-y: auto;
          padding: 12px 12px 0 12px;
          background: #2c2c44;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: #7c3aed transparent;
        }
        /* Firefox滚动条 */
        .messages::-webkit-scrollbar {
          width: 8px;
        }
        .messages::-webkit-scrollbar-thumb {
          background-color: #7c3aed;
          border-radius: 4px;
        }

        /* 单条消息气泡 */
        .message {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 20px;
          word-break: break-word;
          line-height: 1.4;
          font-size: 15px;
          box-shadow: 0 0 8px rgba(124, 58, 237, 0.4);
        }
        /* 用户消息靠右 */
        .user {
          background-color: #6b46c1;
          align-self: flex-end;
          border-bottom-right-radius: 6px;
        }
        /* AI消息靠左 */
        .ai {
          background-color: #9f7aea;
          align-self: flex-start;
          border-bottom-left-radius: 6px;
        }

        /* 输入区域 */
        form {
          display: flex;
          gap: 12px;
          margin-top: 14px;
        }
        input[type="text"] {
          flex-grow: 1;
          padding: 12px 16px;
          border-radius: 24px;
          border: none;
          outline: none;
          font-size: 15px;
          background: #3b3b5a;
          color: white;
          box-sizing: border-box;
          transition: background-color 0.3s;
        }
        input[type="text"]:focus {
          background-color: #4c4b70;
        }
        input[type="text"]::placeholder {
          color: #c4b5fd;
          opacity: 0.8;
        }
        button {
          padding: 12px 24px;
          background: #7c3aed;
          color: white;
          border: none;
          border-radius: 24px;
          cursor: pointer;
          font-weight: 600;
          font-size: 15px;
          transition: background-color 0.3s;
          user-select: none;
          box-shadow: 0 0 8px #7c3aed;
        }
        button:hover {
          background: #6b46c1;
        }
      `}</style>

      <div className="chat-container">
        <div className="rotating-ring" aria-hidden="true" />

        <div className="header" aria-label="应用介绍">
          <h1>🤔 反问思考机器人</h1>
          <p>帮你激发思考，引导你深入反问自己</p>
        </div>

        <div className="messages" role="log" aria-live="polite">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.from === "user" ? "user" : "ai"}`}
              aria-label={msg.from === "user" ? "你的问题" : "机器人回答"}
            >
              {msg.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSend} role="search" aria-label="输入问题">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="请输入你的问题，按回车发送"
            aria-required="true"
            aria-describedby="inputHelp"
          />
          <button type="submit" aria-label="发送问题按钮">
            发送
          </button>
        </form>
      </div>
    </>
  );
}

        