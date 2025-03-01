import React, { useRef, useState } from "react";
import "./text.css";
import Aurora from "../reactBitsLib/Aurora";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; // Correct import

const EmailQR = () => {
  const navigate = useNavigate();
  const [mailto, setMailto] = useState("");
  const [qrValue, setQrValue] = useState("");
  const qrRef = useRef(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [hide, setHide] = useState(false);

  const handleNavigate = (e) => {
    const selectedRoute = e.target.value;
    if (selectedRoute) {
      navigate(`/${selectedRoute}`);
    }
  };

  const handleGenerate = () => {
    if (!mailto) {
      setMessage("Please enter email Id.");
      return;
    }
    if (!subject) {
      setMessage("Please enter subject.");
      return;
    }
    if (!body) {
      setMessage("Please enter body of Subject.");
      return;
    }
    if (
      mailto.indexOf("@") === -1 ||
      mailto.indexOf(".") === -1 ||
      mailto.indexOf("@") > mailto.lastIndexOf(".")
    ) {
      setMessage("Invalid Email.");
      return;
    }
    setQrValue(`mailto:${mailto}?subject=${subject}&body=${body}`);
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
      downloadLink.download = "EmailQR.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div>
      <Aurora
        colorStops={["#db963c", "#118e0f", "#330771"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <div className="Heading-text">
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          &#8592; HOME
        </span>
        <p style={{ cursor: "default", color: "#000000" }}>
          EMAIL &#8594; QR CODE GENERATOR
        </p>
        <select onChange={handleNavigate} className="qr-input-heading">
          <option value="">SWITCH TO</option>
          <option value="text">TEXT</option>
          <option value="url">URL</option>
          <option value="wifi">WIFI</option>
          {hide && <option value="email">EMAIL</option>}
          <option value="sms">SMS</option>
          <option value="merchant-payment">MERCHANT</option>
          <option value="personal-payment">PERSONAL</option>
        </select>
      </div>
      <div className="qr-container">
        <p style={{ fontFamily: "sans-serif" }}>MAIL TO</p>
        <input
          type="text"
          className="qr-input"
          placeholder="Enter the reciever's Email"
          value={mailto}
          onChange={(e) => setMailto(e.target.value)}
        />
        <br />
        <p style={{ fontFamily: "sans-serif" }}>SUBJECT</p>
        <input
          type="text"
          className="qr-input"
          placeholder="Enter the Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <br />
        <p style={{ fontFamily: "sans-serif" }}>BODY</p>
        <input
          type="text"
          className="qr-input"
          placeholder="Enter the Body Content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <br />
        <p style={{ fontFamily: "sans-serif" }}>{message}</p>
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

export default EmailQR;
