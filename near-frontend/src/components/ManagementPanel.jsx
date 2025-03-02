import { useEffect, useRef, useState } from "react";

/* eslint-disable react/prop-types */
export function ManagementPanel({ children }) {
  return (
    <div className="bg-white text-black p-10 rounded-3xl relative">
      {children}
    </div>
  );
}

export function Radio({ value, func, selected }) {
  return (
    <div className="flex gap-5 text-lg font-medium capitalize mb-2">
      <input
        type="radio"
        name={value}
        className="w-4"
        onChange={func}
        checked={selected === value}
      />
      <label htmlFor={value}>{value}</label>
    </div>
  );
}

export function CheckBox({ value, func, selected }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (selected.includes(value)) {
      setChecked(true);
    }
  }, []);
  function handleChange() {
    if (!selected.includes(value)) {
      func([...selected, value]);
      setChecked(true);
    }
    if (selected.includes(value) && selected.length > 1) {
      const newSelected = selected.filter((val) => {
        if (val != value) {
          return val;
        }
      });
      func([...newSelected]);
      setChecked(false);
    }
  }
  return (
    <div className="flex gap-5 text-lg font-medium capitalize mb-2">
      <input
        type="checkbox"
        name={value}
        className="w-4"
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={value}>{value}</label>
    </div>
  );
}

export function Input({ value, id, handleChange }) {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [value]);
  return (
    <input
      ref={inputRef}
      type="text"
      className="border-panel-border border-b w-full outline-0 text-panel-border py-1 mb-2"
      value={value}
      onChange={(e) => handleChange(id, e.target.value)}
    />
  );
}

function Heading({ text, value }) {
  return (
    <div className="flex items-baseline gap-5 mb-5">
      <h1 className="font-medium text-lg underline">{text} </h1>
      {value ? (
        <span className="no-underline text-sm text-panel-border">
          ({value})
        </span>
      ) : null}
    </div>
  );
}

export function Section({ children, text, value, last }) {
  return (
    <div className={`${last ? "" : "border-b-2"} border-panel-border py-5`}>
      <Heading text={text} value={value} />
      {children}
    </div>
  );
}
