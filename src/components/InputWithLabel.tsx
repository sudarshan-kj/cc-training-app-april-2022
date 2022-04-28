import { count } from "console";
import React, { useState } from "react";
import "./InputWithLabel.css";

type InputWithLabelProps = {
  children: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchText: string;
  type?: string;
  id: string;
};

const InputWithLabel = ({
  children,
  onChange,
  searchText,
  type = "text",
  id,
}: InputWithLabelProps) => {
  const [count, setCount] = useState(() => {
    console.log("Init state for input with label");
    return 0;
  });
  return (
    <div>
      <label htmlFor={id}>{children} </label>
      <input value={searchText} id={id} type={type} onChange={onChange} />
    </div>
  );
};

export default InputWithLabel;
