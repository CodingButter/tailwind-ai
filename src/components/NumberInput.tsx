import React, { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

interface NumberInputProps extends React.HTMLProps<HTMLInputElement> {
  value: number;
  setValue: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = (props) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const { className, value, setValue } = props;
  const showButtons = hovered || focused;

  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(e.target.value));
  };

  const increment = () => {
    setValue(value + parseFloat(props.step as string));
  };

  const decrement = () => {
    setValue(value - parseFloat(props.step as string));
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {showButtons && (
        <button
          className="absolute left-0 ml-2 text-gray-500 hover:text-gray-700 focus:text-gray-700"
          onClick={decrement}
          tabIndex={-1}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      )}
      <input
        type="number"
        value={value}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={handleSetValue}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={classNames(
          "surface form-input rounded-md text-center outline-none ",
          className
        )}
        style={{
          paddingLeft: showButtons ? "2rem" : "0.5rem",
          paddingRight: "0.5rem",
        }}
      />
      {showButtons && (
        <button
          className="absolute right-0 mr-2 text-gray-500 hover:text-gray-700 focus:text-gray-700"
          onClick={increment}
          tabIndex={-1}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}
    </div>
  );
};

export default NumberInput;
