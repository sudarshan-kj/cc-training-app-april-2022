import { count } from "console";
import React from "react";
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
  return (
    <div>
      <label htmlFor={id}>{children} </label>
      <input value={searchText} id={id} type={type} onChange={onChange} />
    </div>
  );
};

export default InputWithLabel;
