import React from "react";

function Accordion({ children }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center gap-4 text-accent"></div>
      <input type="checkbox" id="accordion" className="accordion-checkbox" />

      <div className="accordion-content mb-2 flex flex-col gap-1 rounded bg-gray-700 text-sm text-gray-200">
        {children}
      </div>
    </div>
  );
}

export default Accordion;
