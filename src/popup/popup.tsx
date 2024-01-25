import React, { useEffect } from "react";
import "./popup.css";
import type { ACTIONS_KEYS } from "../types";
import { useGet } from "./hooks/usePort";

const Popup = () => {
  const [html, htmlLoading, htmlError, htmlUpdate] = useGet("GET_HTML");
  const [css, cssLoading, cssError, cssUpdate] = useGet("GET_CSS");

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center w-full">
        {htmlLoading ? (
          <div>Loading...</div>
        ) : (
          <textarea value={html}></textarea>
        )}
        <button
          onClick={htmlUpdate}
          className="p-2 rounded-md shadow-lg bg-blue-600 text-white"
        >
          LOAD HTML
        </button>
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        {cssLoading ? <div>Loading...</div> : <textarea value={css}></textarea>}
        <button
          onClick={cssUpdate}
          className="p-2 rounded-md shadow-lg bg-blue-600 text-white"
        >
          LOAD CSS
        </button>
      </div>
    </div>
  );
};

export default Popup;
