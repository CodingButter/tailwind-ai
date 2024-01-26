import React from "react";

function Accordion({ children }) {
  return (
    <div className="flex flex-col gap-2">
      <input type="checkbox" id="accordion" className="accordion-checkbox" />
      <label
        htmlFor="accordion"
        className="accordion-label bg-primary block w-full cursor-pointer rounded py-2 text-center text-sm hover:bg-gray-700"
      >
        AI Options
      </label>
      <div className="accordion-content mb-2 flex flex-col gap-1 rounded bg-gray-700 text-sm text-gray-200">
        {children}
      </div>
    </div>
  );
}

export default Accordion;
