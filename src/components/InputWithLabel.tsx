import { count } from "console";
import React, { FormEvent } from "react";
import "./InputWithLabel.css";

type InputWithLabelProps = {
  children: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchText: string;
  type?: string;
  id: string;
  onSearchSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const InputWithLabel = ({
  children,
  onChange,
  searchText,
  type = "text",
  id,
  onSearchSubmit,
}: InputWithLabelProps) => {
  return (
    <div>
      <form onSubmit={onSearchSubmit}>
        <label htmlFor={id}>{children} </label>
        <input value={searchText} id={id} type={type} onChange={onChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InputWithLabel;
