import React from "react";
import {
  IconBxlReact,
  IconOptions,
  IconWeather_lightning,
} from "../../components/icons";

const Header = () => {
  return (
    <div className="flex justify-items-stretch flex-row-reverse items-center gap-2 px-4 w-full">
      <button className="surface rounded p-2 text-sm top-2 right-2">
        <span className="button-text">Convert to React</span>
        <span className="button-icon">
          <IconBxlReact />
        </span>
      </button>
      <button
        className="surface rounded p-2 text-sm top-2 right-2"
        onClick={() => chrome.runtime.openOptionsPage()}
      >
        <span className="button-text">Goto Options</span>
        <span className="button-icon">
          <IconOptions />
        </span>
      </button>
      <label
        htmlFor="accordion"
        className="surface rounded p-2 text-sm top-2 right-2"
      >
        <span className="button-text">Quick Options</span>
        <span className="button-icon">
          <IconWeather_lightning />
        </span>
      </label>
    </div>
  );
};

export default Header;
