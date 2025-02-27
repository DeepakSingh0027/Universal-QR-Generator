import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TextQR from "./pages/text";
import Home from "./pages/home";
import UrlQR from "./pages/url";
import WifiQR from "./pages/wifi";
import EmailQR from "./pages/email";
import SmsQR from "./pages/sms";
import MerchantQR from "./pages/merchant";
import PersonalQR from "./pages/personal";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/text" element={<TextQR />} />
      <Route path="/url" element={<UrlQR />} />
      <Route path="/wifi" element={<WifiQR />} />
      <Route path="/email" element={<EmailQR />} />
      <Route path="/sms" element={<SmsQR />} />
      <Route path="/merchant-payment" element={<MerchantQR />} />
      <Route path="/personal-payment" element={<PersonalQR />} />
    </Routes>
  );
}

export default App;
