import React from "react";
import Lottie from "react-lottie";
import "./Successpopup.css";
import successAnimation from "../../assets/ani-succsesfull-login.json"; // match the filename exactly

function SuccessPopup({ onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <Lottie
          options={{
            animationData: successAnimation,
            loop: false,
            autoplay: true,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={150}
          width={150}
        />
        <h2>Congratulations!</h2>
        <p>Your login was successful.</p>
        <button onClick={onClose}>Let's Go</button>
      </div>
    </div>
  );
}

export default SuccessPopup;