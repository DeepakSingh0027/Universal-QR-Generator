import "./App.css";
import RotatingText from "./reactBitsLib/RotatingText";
import SpotlightCard from "./reactBitsLib/SpotlightCard";
import GridDistortion from "./reactBitsLib/GridDistortion";
function App() {
  return (
    <div className=".fullscreen-container">
      <GridDistortion
        imageSrc="99998.jpg"
        grid={20}
        mouse={0.1}
        strength={0.15}
        relaxation={0.9}
        className="custom-class"
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
        <p className="heading-text-2">QR GENERATOR</p>
      </div>
      <div className="main-body">
        <SpotlightCard
          className="custom-spotlight-card"
          spotlightColor="rgba(255, 255, 255, 0.48)"
        >
          TEXT QR
        </SpotlightCard>
      </div>
    </div>
  );
}

export default App;
