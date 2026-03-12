"user client"

import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRephrase() {
    if (!inputText.trim()) return;

    setLoading(true);
    setOutputText("");

    try {
      const response = await fetch("http://127.0.0.1:8000/rephrase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: inputText })
      });

      const data = await response.json();
      setOutputText(data.improved);
    } catch (error) {
      setOutputText("Error: Unable to connect to backend.");
    }

    setLoading(false);
  }

  return (
    <main style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Speech Rephrasing Tool</h1>
      <p>Paste your text below and get a clearer, more neutral version.</p>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste your text here..."
        style={{
          width: "100%",
          height: "150px",
          padding: "15px",
          marginTop: "20px",
          fontSize: "16px"
        }}
      />

      <button
        onClick={handleRephrase}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        {loading ? "Rephrasing..." : "Improve My Speech"}
      </button>

      {outputText && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#f5f5f5",
            borderRadius: "8px"
          }}
        >
          <h3>Improved Version:</h3>
          <p>{outputText}</p>
        </div>
      )}
    </main>
  );
}
