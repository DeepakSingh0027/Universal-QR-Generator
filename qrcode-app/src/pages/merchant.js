import React, { useRef, useState } from "react";
import "./text.css";
import Aurora from "../reactBitsLib/Aurora";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; // Correct import

const MerchantQR = () => {
  const navigate = useNavigate();
  const [upiID, setUpiId] = useState("");
  const [qrValue, setQrValue] = useState("");
  const qrRef = useRef(null);
  const [name, setName] = useState("");
  const [merchantCode, setMerchantcode] = useState("");
  const [transcationId, setTransactionId] = useState("");
  const [amount, setAmount] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState(
    "Note: Make Sure all the Fields should be correct."
  );

  const handleGenerate = () => {
    if (!upiID) {
      setMessage("Please enter UPI ID.");
      return;
    }
    if (!name) {
      setMessage("Please enter reciever's Name.");
      return;
    }
    if (!merchantCode) {
      setMessage("Please enter merchant Code.");
      return;
    }
    if (!orderId) {
      setMessage("Please enter Order ID.");
      return;
    }
    if (!transcationId) {
      setMessage("Please enter transcation ID.");
      return;
    }
    const upiPattern = /^[a-zA-Z0-9.\-_]+@[a-zA-Z0-9]+$/; // Matches typical UPI ID format

    if (!upiPattern.test(upiID)) {
      setMessage("Please enter valid UPI ID.");
      return;
    }
    if (amount > 0) {
      setQrValue(
        `upi://pay?pa=${upiID}&pn=${name}&mc=${merchantCode}&tid=${transcationId}&tr=${orderId}&tn=Order Payment&am=${amount}&cu=INR`
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
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <div className="Heading-text">
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          &#8592; HOME
        </span>
        <p style={{ cursor: "default", color: "#000000" }}>
          MERCHANT UPI &#8594; QR CODE GENERATOR
        </p>
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
        <p style={{ fontFamily: "sans-serif" }}>MERCHANT CODE</p>
        <input
          type="text"
          className="qr-input"
          placeholder="Enter Merchant Code"
          value={merchantCode}
          onChange={(e) => setMerchantcode(e.target.value)}
        />
        <br />
        <p style={{ fontFamily: "sans-serif" }}>TRANSACTION ID</p>
        <input
          type="text"
          className="qr-input"
          placeholder="Enter the Transaction Id"
          value={transcationId}
          onChange={(e) => setTransactionId(e.target.value)}
        />
        <br />
        <p style={{ fontFamily: "sans-serif" }}>ORDER ID</p>
        <input
          type="text"
          className="qr-input"
          placeholder="Enter the Order Id"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
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

export default MerchantQR;
