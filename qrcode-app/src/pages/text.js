import React, { useRef, useState } from "react";
import "./text.css";
import Aurora from "../reactBitsLib/Aurora";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; // Correct import

const TextQR = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [qrValue, setQrValue] = useState("");
  const qrRef = useRef(null);

  const handleGenerate = () => {
    setQrValue(text);
  };

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "textQR.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div>
      <Aurora
        colorStops={["#bfe05c", "#df1896", "#daaa3b"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <div className="Heading-text">
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          &#8592; HOME
        </span>
        <p style={{ cursor: "default", color: "#000000" }}>
          TEXT &#8594; QR CODE GENERATOR
        </p>
      </div>
      <input
        type="text"
        placeholder="Enter Your text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "300px", padding: "8px" }}
      />
      <br />
      <br />
      <button
        onClick={handleGenerate}
        style={{ padding: "10px 20px", marginBottom: "20px" }}
      >
        Generate QR Code
      </button>
      <br />
      <div
        ref={qrRef}
        style={{
          padding: "20px",

          display: "inline-block",
        }}
      >
        {qrValue && (
          <QRCodeCanvas
            value={qrValue}
            size={300} // Increased size for better readability
            bgColor="#ffffff" // White background
            fgColor="#000000" // Black foreground
            level="H" // High error correction (H = 30% of code can be damaged and still work)
            includeMargin={true} // Adds padding to improve scan accuracy
          />
        )}
      </div>
      <br />
      {qrValue && (
        <button onClick={handleDownload} style={{ padding: "10px 20px" }}>
          Download QR Code
        </button>
      )}
    </div>
  );
};

export default TextQR;
