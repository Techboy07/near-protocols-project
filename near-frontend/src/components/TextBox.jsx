// eslint-disable-next-line react/prop-types
function TextBox({ actionBtn, actions, valueControl, value }) {
  return (
    <div className="relative">
      <textarea
        cols="30"
        rows="10"
        className="bg-input-bg w-full text-input-text outline-0 border-none p-5 rounded-lg"
        onChange={valueControl}
        value={value}
      ></textarea>
      {actions ? <div className="absolute top-7 right-4">{actions}</div> : null}
      {actionBtn ? (
        <div className="absolute bottom-7 right-4">{actionBtn}</div>
      ) : null}{" "}
    </div>
  );
}

export default TextBox;
