import Header from "../components/Header";
import PathButton from "../components/PathButton";
import { useState } from "react";
import Button from "../components/Button";
const Home = () => {
  const paths = useState([
    { text: "Manage Bio", icon: "/splash-icons/BioThin.png" },
    { text: "Manage DMs", icon: "/splash-icons/Vector(1).svg" },
    { text: "Manage Tweets", icon: "/splash-icons/Vector.svg" },
    {
      text: "Manage Posts",
      icon: "/splash-icons/Vector(2).svg",
    },
    { text: "Manage Spaces", icon: "/splash-icons/Frame3.svg" },
  ])[0];
  return (
    <div className="text-white px-5 pt-10">
      <Header />
      {paths.map(({ text, icon }, idx) => (
        <PathButton text={text} icon={icon} func={() => {}} key={idx} />
      ))}
      <Button text={"Connect"} handleClick={() => {}} />
    </div>
  );
};

export default Home;
