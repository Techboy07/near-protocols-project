// eslint-disable-next-line react/prop-types
function Button({ login, handleClick }) {
  return (
    <button
      className="bg-sky-500 px-5 text-white text-2xl py-2 ms-auto block"
      onClick={handleClick}
    >
      {login ? "Login" : "Signup"}
    </button>
  );
}

export default Button;
