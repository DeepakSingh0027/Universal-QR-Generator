import React, { useRef, useState } from "react";
import "./text.css";
import Aurora from "../reactBitsLib/Aurora";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; // Correct import

const WifiQR = () => {
  const navigate = useNavigate();
  const [ssid, setssid] = useState("");
  const [qrValue, setQrValue] = useState("");
  const qrRef = useRef(null);
  const [password, setPass] = useState("");
  const [encrypt, setEncrypt] = useState("");
  const [hidden, setHidden] = useState("");
  const [message, setMessage] = useState("");
  const [hide, setHide] = useState(false);

  const handleGenerate = () => {
    if (!ssid) {
      setMessage("Please enter the ssid.");
      return;
    }
    if (!password) {
      setMessage("Please enter Password field.");
      return;
    }
    if (!encrypt) {
      setEncrypt("WPA");
    }
    if (!hidden) {
      setHidden("false");
    }
    setQrValue(`WIFI:S:${ssid};T:${encrypt};P:${password};H:${hidden};;`);
    setMessage("");
  };

  const handleNavigate = (e) => {
    const selectedRoute = e.target.value;
    if (selectedRoute) {
      navigate(`/${selectedRoute}`);
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
      downloadLink.download = "WifiQR.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div>
      <Aurora
        colorStops={["#bd163d", "#52c3b0", "#9ebd16"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <div className="Heading-text">
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          &#8592; HOME
        </span>
        <p style={{ cursor: "default", color: "#000000" }}>
          WIFI &#8594; QR CODE GENERATOR
        </p>
        <select onChange={handleNavigate} className="qr-input-heading">
          <option value="">SWITCH TO</option>
          <option value="text">TEXT</option>
          <option value="url">URL</option>
          {hide && <option value="wifi">WIFI</option>}
          <option value="email">EMAIL</option>
          <option value="sms">SMS</option>
          <option value="merchant-payment">MERCHANT</option>
          <option value="personal-payment">PERSONAL</option>
        </select>
      </div>
      <div className="qr-container">
        <p style={{ fontFamily: "sans-serif" }}>SSID</p>
        <input
          type="text"
          className="qr-input"
          placeholder="Enter Your ssid"
          value={ssid}
          onChange={(e) => setssid(e.target.value)}
        />
        <br />
        <p style={{ fontFamily: "sans-serif" }}>PASSWORD</p>
        <input
          type="text"
          className="qr-input"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
        />
        <br />
        <p style={{ fontFamily: "sans-serif" }}>ENCRYPTION</p>
        <select
          value={encrypt}
          onChange={(e) => setEncrypt(e.target.value)}
          className="qr-input"
        >
          <option value="">Select an Encryption</option>
          <option value="WPA">WPA</option>
          <option value="WPA2">WPA2</option>
          <option value="WPA3">WPA3</option>
          <option value="WEP">WEP</option>
        </select>

        <br />
        <p style={{ fontFamily: "sans-serif" }}>HIDDEN</p>
        <select
          value={hidden}
          onChange={(e) => setHidden(e.target.value)}
          className="qr-input"
        >
          <option value="">Select if Hidden</option>
          <option value="true">YES</option>
          <option value="false">NO</option>
        </select>
        <br />
        <p style={{ fontFamily: "sans-serif", fontSize: "13px" }}>
          Note: If Encryption and Hidden details are unknown still you can
          generate qr code.
        </p>
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

export default WifiQR;
