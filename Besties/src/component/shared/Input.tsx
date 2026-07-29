import type { FC, ChangeEventHandler } from "react";

interface InputInterface {
  name: string;
  placeholder?: string;
  type?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const Input: FC<InputInterface> = ({
  name = "input",
  placeholder = "enter text here",
  type = "text",
  className = "border border-gray-300 rounded-lg px-3 w-full py-2 ",
  onChange
}) => {
  return (
    <input
      className={className}
      placeholder={placeholder}
      name={name}
      type={type}
      onChange={onChange}
    />
  );
};

export default Input;
