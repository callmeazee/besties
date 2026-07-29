import type { FC, ReactNode } from "react";

export type FormDataType = Record<string, string>;

interface FormInterface {
  children?: ReactNode;
  className: string;
  onValue?: (value: FormDataType) => void;
  reset?: boolean;
}

const Form: FC<FormInterface> = ({
  children,
  className,
  onValue,
  reset = false,
}) => {
  const handleForm = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: FormDataType = {};

    formData.forEach((value, name) => {
      data[name] = value.toString();
    });
    //other way to write this
    //onValue?.(data);
    if (onValue) {
      onValue(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      reset && form.reset();
    }
  };

  return (
    <form className={className} onSubmit={handleForm}>
      {children}
    </form>
  );
};

export default Form;
