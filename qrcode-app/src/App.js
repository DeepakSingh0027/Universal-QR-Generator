import "./App.css";
import RotatingText from "./reactBitsLib/RotatingText";
function App() {
  return (
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
  );
}

export default App;
