import React, { useRef, useState } from "react";
import "./text.css";
import Aurora from "../reactBitsLib/Aurora";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; // Correct import

const PersonalQR = () => {
  const navigate = useNavigate();
  const [upiID, setUpiId] = useState("");
  const [qrValue, setQrValue] = useState("");
  const qrRef = useRef(null);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState(
    "Note: Upi ID should be correct with Amount."
  );
  const [hide, setHide] = useState(false);

  const handleNavigate = (e) => {
    const selectedRoute = e.target.value;
    if (selectedRoute) {
      navigate(`/${selectedRoute}`);
    }
  };

  const handleGenerate = () => {
    if (!upiID) {
      setMessage("Please enter UPI ID.");
      return;
    }
    if (!name) {
      setMessage("Please enter reciever's Name.");
      return;
    }
    const upiPattern = /^[a-zA-Z0-9.\-_]+@[a-zA-Z0-9]+$/; // Matches typical UPI ID format

    if (!upiPattern.test(upiID)) {
      setMessage("Please enter valid UPI ID.");
      return;
    }
    if (amount > 0) {
      setQrValue(
        `upi://pay?pa=${upiID}&pn=${name}&tn=${note}&cu=INR&am=${amount}`
      );
      setMessage("");
    } else {
      setMessage("Invalid Amount!");
    }
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
        colorStops={["#164f45", "#bcbc1f", "#129c10"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <div className="Heading-text">
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          &#8592; HOME
        </span>
        <p style={{ cursor: "default", color: "#000000" }}>
          PERSONAL UPI &#8594; QR CODE GENERATOR
        </p>
        <select onChange={handleNavigate} className="qr-input-heading">
          <option value="">SWITCH TO</option>
          <option value="text">TEXT</option>
          <option value="url">URL</option>
          <option value="wifi">WIFI</option>
          <option value="email">EMAIL</option>
          <option value="sms">SMS</option>
          <option value="merchant-payment">MERCHANT</option>
          {hide && <option value="personal-payment">PERSONAL</option>}
        </select>
      </div>
      <div className="qr-container">
        <p style={{ fontFamily: "sans-serif" }}>UPI ID</p>
        <input
          type="text"
          className="qr-input"
          placeholder="Enter Reciever's UPI ID"
          value={upiID}
          onChange={(e) => setUpiId(e.target.value)}
        />
        <br />
        <p style={{ fontFamily: "sans-serif" }}>NAME</p>
        <input
          type="text"
          className="qr-input"
          placeholder="Enter Reciever's Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <p style={{ fontFamily: "sans-serif" }}>AMOUNT</p>
        <input
          type="text"
          className="qr-input"
          placeholder="Enter the Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <p style={{ fontFamily: "sans-serif" }}>NOTE</p>
        <input
          type="text"
          className="qr-input"
          placeholder="Enter Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
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

export default PersonalQR;
