/* eslint-disable react/prop-types */
function VarButton({ type, text, handleClick, icon, small }) {
  function changeStyle(type) {
    switch (type) {
      case "outlined":
        return "border-accent border-2 text-white ";
      case "filled":
        return "bg-white border-accent border-2 text-accent";

      default:
        return "bg-accent";
    }
  }

  function changeSize(small) {
    switch (small) {
      case true:
        return "text-sm py-1 px-5";
      default:
        return "px-10 py-3 text-lg font-semibold";
    }
  }

  return (
    <button
      className={`${changeStyle(type)} ${changeSize(
        small
      )} cursor-pointer w-full rounded-lg flex items-center justify-center gap-2`}
      onClick={handleClick}
    >
      {text}

      {icon ? icon : null}
    </button>
  );
}

export default VarButton;
