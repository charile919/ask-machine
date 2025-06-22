import React from "react";

type QAProps = {
  question: string;
  followUp: string;
  answer: string;
};

export default function QABox({ question, followUp, answer }: QAProps) {
  return (
    <div className="qa-box">
      <div className="question">你问：</div>
      <div className="question-text">{question}</div>
      <div className="follow-up">AI 反问：</div>
      <div className="follow-up-text">{followUp}</div>
      <div className="answer">{answer}</div>

      <style jsx>{`
        .qa-box {
          background: rgba(255 255 255 / 0.1);
          border-radius: 16px;
          padding: 20px;
          margin: 12px auto;
          max-width: 520px;
          box-shadow: 0 8px 24px rgb(138 132 226 / 0.3);
          backdrop-filter: blur(12px);
          color: #ddd;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          user-select: none;
          transition: background-color 0.3s ease;
        }
        .qa-box:hover {
          background: rgba(138 132 226 / 0.2);
        }
        .question,
        .follow-up {
          font-weight: 700;
          margin-bottom: 6px;
          color: #a9a9ff;
        }
        .question-text,
        .follow-up-text,
        .answer {
          font-size: 1.1rem;
          margin-bottom: 14px;
          line-height: 1.5;
          user-select: text;
        }
        .answer {
          font-style: italic;
          color: #c1c1ff;
        }
      `}</style>
    </div>
  );
}
