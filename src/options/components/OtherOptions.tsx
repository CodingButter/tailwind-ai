import React, { ChangeEvent } from "react";
import { Options } from "../../hooks/useOpenAI";

interface OtherOptionsProps {
  options: Partial<Options>;
  setOptions: (options: Partial<Options>) => void;
}

const OtherOptions: React.FC<OtherOptionsProps> = ({ options, setOptions }) => {
  const { sendScreenshot } = options;

  const setIncludeScreenshot = (e: ChangeEvent<HTMLInputElement>) => {
    setOptions({ sendScreenshot: e.target.checked });
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="otherOptionsToggle"
        className="cursor-pointer text-xl font-medium mb-2"
      >
        Other Options
      </label>
      <div className="">
        <input type="checkbox" id="otherOptionsToggle" className="hidden" />
        <div id="otherOptionsContent" className="p-4 grid gap-4 grid-cols-4">
          <div className="surface flex gap-2 justify-center items-center p-4">
            <label
              htmlFor="include-screenshot"
              className="block mb-2 text-accent text-md"
            >
              Include Screenshot
            </label>
            <input
              id="include-screenshot"
              type="checkbox"
              checked={sendScreenshot}
              onChange={setIncludeScreenshot}
            />
          </div>
          {/* Future options can be added here */}
        </div>
      </div>
    </div>
  );
};

export default OtherOptions;
