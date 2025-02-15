// eslint-disable-next-line react/prop-types
function PathButton({ text, icon, func }) {
  return (
    <button
      className="bg-accent flex items-center rounded-md text-white text-2xl px-5 py-3 justify-between w-full mb-8"
      onClick={func}
    >
      <span>{text}</span> <img className="w-10" src={icon} alt="button icon" />
    </button>
  );
}

export default PathButton;
