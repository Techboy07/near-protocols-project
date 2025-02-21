import { useEffect } from "react";
import { useNavigate } from "react-router";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/main");
    }, 3000);
  }, []);

  return (
    <div className="text-center text-white min-h-screen flex flex-col justify-center ">
      <img
        src="/splash-icons/Group22.png"
        alt="aura-image"
        className="mx-auto mb-10"
      />
      <p>
        I am AURA <br />
        How may I help you today?
      </p>
    </div>
  );
}

export default Splash;
