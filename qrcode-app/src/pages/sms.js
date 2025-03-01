import React, { useRef, useState } from "react";
import "./text.css";
import Aurora from "../reactBitsLib/Aurora";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; // Correct import

const SmsQR = () => {
  const navigate = useNavigate();
  const [phoneno, setPhoneNo] = useState("");
  const [qrValue, setQrValue] = useState("");
  const qrRef = useRef(null);
  const [message, setMessage] = useState("");

  const handleGenerate = () => {
    setQrValue(`smsto:${phoneno}:${message}`);
  };

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "EmailQR.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div>
      <Aurora
        colorStops={["#16188e", "#8e1676", "#28c7ac"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <div className="Heading-text">
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          &#8592; HOME
        </span>
        <p style={{ cursor: "default", color: "#000000" }}>
          SMS &#8594; QR CODE GENERATOR
        </p>
      </div>
      <div className="qr-container">
        <p style={{ fontFamily: "sans-serif" }}>PHONE NUMBER</p>
        <input
          type="text"
          className="qr-input"
          placeholder="Enter the reciever's Phone Number"
          value={phoneno}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <br />
        <p style={{ fontFamily: "sans-serif" }}>MESSAGE</p>
        <input
          type="text"
          className="qr-input"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <br />
        <button onClick={handleGenerate} className="glow-on-hover">
          Generate QR Code
        </button>
        <br />
        {qrValue && (
          <div ref={qrRef} className="qr-box">
            <QRCodeCanvas
              value={qrValue}
              size={300}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              includeMargin={true}
            />
          </div>
        )}
        <br />
        {qrValue && (
          <button onClick={handleDownload} className="glow-on-hover">
            Download QR Code
          </button>
        )}
      </div>
    </div>
  );
};

export default SmsQR;
