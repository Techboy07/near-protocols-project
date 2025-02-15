// eslint-disable-next-line react/prop-types
function Button({ handleClick, text }) {
  return (
    <button
      className="bg-black border border-accent rounded-md px-5 text-white  py-2 ms-auto flex items-center gap-2 text-lg"
      onClick={handleClick}
    >
      {text}

      <img
        className="w-7"
        src={"/splash-icons/uil_wallet.png"}
        alt="wallet-image"
      />
    </button>
  );
}

export default Button;
