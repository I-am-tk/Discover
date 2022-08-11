import React, { useRef } from "react";

type TextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

function TextArea({ onChange, className = "", ...rest }: TextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null!);
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(e);

    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };
  return (
    <textarea
      className={`resize-none block border w-full p-2 rounded overflow-hidden ${className}`}
      onChange={onChangeHandler}
      ref={textAreaRef}
      {...rest}
    ></textarea>
  );
}

export default TextArea;
