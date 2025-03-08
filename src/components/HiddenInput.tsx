import React from "react";

interface HiddenInputProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  typedText: string;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const HiddenInput: React.FC<HiddenInputProps> = ({
  inputRef,
  typedText,
  onInput,
  disabled,
}) => (
  <div className="mt-4">
    <input
      ref={inputRef}
      type="text"
      value={typedText}
      onChange={onInput}
      className="opacity-0 absolute"
      disabled={disabled}
      autoFocus
    />
  </div>
);

export default HiddenInput; 