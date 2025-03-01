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
  const [message, setMessage] = useState("");
  const [hide, setHide] = useState(false);

  const handleNavigate = (e) => {
    const selectedRoute = e.target.value;
    if (selectedRoute) {
      navigate(`/${selectedRoute}`);
    }
  };

  const handleGenerate = () => {
    if (!text) {
      setMessage("Please Enter the Text.");
      return;
    }
    setQrValue(text);
    setMessage("");
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
        <select onChange={handleNavigate} className="qr-input-heading">
          <option value="">SWITCH TO</option>
          {hide && <option value="text">TEXT</option>}
          <option value="url">URL</option>
          <option value="wifi">WIFI</option>
          <option value="email">EMAIL</option>
          <option value="sms">SMS</option>
          <option value="merchant-payment">MERCHANT</option>
          <option value="personal-payment">PERSONAL</option>
        </select>
      </div>
      <div className="qr-container">
        <p style={{ fontFamily: "sans-serif" }}>TEXT</p>
        <input
          type="text"
          className="qr-input"
          placeholder="Enter Your Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <p style={{ fontFamily: "sans-serif" }}>{message}</p>
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

export default TextQR;
