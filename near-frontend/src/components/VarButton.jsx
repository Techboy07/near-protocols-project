/* eslint-disable react/prop-types */
function VarButton({ type, text, handleClick, icon, small }) {
  function changeStyle(type) {
    switch (type) {
      case "outlined":
        return "border-accent border-2 text-white cursor-pointer ";
      case "filled":
        return "bg-white border-accent border-2 text-accent cursor-pointer";
      case "disabled":
        return "bg-gray-300 text-white";
      default:
        return "bg-accent text-white cursor-pointer";
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
      disabled={type == "disabled"}
      className={`${changeStyle(type)} ${changeSize(
        small
      )}  w-full rounded-lg flex items-center justify-center gap-2`}
      onClick={handleClick}
    >
      {text}

      {icon ? icon : null}
    </button>
  );
}

export default VarButton;
