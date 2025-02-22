"use client";
import Link from "next/link";
import { useState } from "react";

export default function SnetimentAnalysis() {
  const [inputText, setInputText] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0.0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAnalysis = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:8000/api/sentiment_analysis",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: inputText }),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setConfidence(data.score);
      setLabel(data.label.toLowerCase());
    } catch (error) {
      console.error("Error analyzing text:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <style jsx>{`
        .animated-shimmer {
          position: relative;
          display: inline-block;
          color: gray; /* Base text color */
          overflow: hidden;
        }
        .animated-shimmer::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.8),
            transparent
          );
          animation: shimmer 2s linear infinite;
        }
        @keyframes shimmer {
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
      {/* Back Button */}
      <Link href="/">
        <span className="text-gray-500 hover:underline cursor-pointer top-4 left-4 absolute transition duration-200">
          &larr; Back to Home
        </span>
      </Link>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Sentiment Analysis
      </h1>
      <p className="text-gray-400 text-sm mb-6">
        made with{" "}
        <a
          href="https://huggingface.co/distilbert/distilbert-base-uncased-finetuned-sst-2-english"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-600 transition duration-200"
        >
          distilbert/distilbert-base-uncased-finetuned-sst-2-english
        </a>
      </p>

      <div className="w-full max-w-lg">
        {/* Editable Text Input Area */}
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to analyze..."
          className="w-full h-32 p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Analyze Button */}
        <button
          onClick={handleAnalysis}
          disabled={loading}
          className="mt-4 w-full bg-indigo-500 hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-indigo-400 disabled:hover:bg-indigo-400 text-white px-4 py-2 rounded transition duration-200"
        >
          {loading ? "Loading..." : "Analyze"}
        </button>
        {/* Output Area */}
        {loading ? (
          <div className="mt-6 p-4 border border-gray-300 rounded bg-white">
            <p className="text-gray-600 animated-shimmer">Analyzing...</p>
          </div>
        ) : label ? (
          <div className="mt-6 p-4 border border-gray-300 rounded bg-white text-gray-600">
            The sentence has a {label} sentiment with a {confidence.toFixed(3)}{" "}
            confidence score.
          </div>
        ) : null}
      </div>
    </div>
  );
}
