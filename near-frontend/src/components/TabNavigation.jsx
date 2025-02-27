import { useState } from "react";
import { useNavigate } from "react-router";
import home from "/tab-icons/iconamoon_home-thin.svg";
import profile from "/tab-icons/Frame3.svg";
import support from "/tab-icons/fluent_person-support-16-regular.svg";
function TabNavigation() {
  const tabOptions = useState([
    { image: home, text: "Home", link: "/" },
    { image: profile, text: "Profile" },
    { image: support, text: "Support" },
  ])[0];
  return (
    <div className="text-white fixed bottom-0  left-0  w-full z-50">
      <div className="flex justify-between w-full max-w-xl mx-auto bg-black px-5 py-2">
        {tabOptions.map(({ image, text }, idx) => (
          <Tab image={image} text={text} key={idx} />
        ))}
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function Tab({ image, text, link }) {
  const navigate = useNavigate();
  return (
    <button
      className="text-center flex flex-col items-center px-5 gap-y-2"
      onClick={() => navigate(link)}
    >
      <img src={image} alt="tab-img" className="" />
      <p>{text}</p>
    </button>
  );
}

export default TabNavigation;
