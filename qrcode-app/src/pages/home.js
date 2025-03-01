import React from "react";
import { useNavigate } from "react-router-dom";
import RotatingText from "../reactBitsLib/RotatingText";
import SpotlightCard from "../reactBitsLib/SpotlightCard";
import Aurora from "../reactBitsLib/Aurora";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="fullscreen-container">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <div className="heading">
        <RotatingText
          texts={[
            "TEXT",
            "URL",
            "WIFI",
            "EMAIL",
            "SMS",
            "MERCHANT PAYMENT",
            "PERSONAL PAYMENT",
          ]}
          mainClassName="my-class"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="my-class-split"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
        <p className="heading-text-2">QR CODE GENERATOR</p>
      </div>
      <div className="main-body">
        <SpotlightCard
          className="custom-spotlight-card card-1"
          spotlightColor="rgba(255, 255, 255, 0.48)"
          onClick={() => navigate("/text")} // Now this works!
        >
          TEXT
        </SpotlightCard>

        <SpotlightCard
          className="custom-spotlight-card card-2"
          spotlightColor="rgba(206, 8, 8, 0.57)"
          onClick={() => navigate("/url")}
        >
          URL
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight-card card-3"
          spotlightColor="rgba(190, 179, 22, 0.48)"
          onClick={() => navigate("/wifi")}
        >
          WIFI
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight-card card-4"
          spotlightColor="rgba(44, 179, 21, 0.48)"
          onClick={() => navigate("/email")}
        >
          EMAIL
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight-card card-5"
          spotlightColor="rgba(13, 162, 145, 0.48)"
          onClick={() => navigate("/sms")}
        >
          SMS
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight-card card-6"
          spotlightColor="rgba(16, 19, 187, 0.48)"
          onClick={() => navigate("/merchant-payment")}
        >
          MERCHANT PAYMENT
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight-card card-7"
          spotlightColor="rgba(148, 18, 169, 0.48)"
          onClick={() => navigate("/personal-payment")}
        >
          PERSONAL PAYMENT
        </SpotlightCard>
      </div>
    </div>
  );
};

export default Home;
