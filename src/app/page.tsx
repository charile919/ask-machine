// 文件路径：app/page.tsx

"use client";

import React, { useState } from "react";

const questions = [
  "如果清空一切社会标签，你是谁？",
  "如果未来不需要工作，你如何度过一天？",
  "你是否有过逃避面对的人事物？",
];

export default function Home() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleClick(question: string) {
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setAnswer(data.answer);
    } catch {
      setAnswer("调用失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        padding: 20,
        fontFamily: "monospace",
        background: "#111",
        color: "#eee",
        minHeight: "100vh",
      }}
    >
      <h1>反问句机</h1>
      <div style={{ marginBottom: 20 }}>
        {questions.map((q) => (
          <button
            key={q}
            style={{
              marginRight: 12,
              marginBottom: 12,
              padding: "8px 16px",
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
              background: "#222",
              color: "#6cf",
            }}
            onClick={() => handleClick(q)}
            disabled={loading}
          >
            {q}
          </button>
        ))}
      </div>
      <div style={{ minHeight: 80, whiteSpace: "pre-wrap" }}>
        {loading ? "生成中..." : answer}
      </div>
    </main>
  );
}
