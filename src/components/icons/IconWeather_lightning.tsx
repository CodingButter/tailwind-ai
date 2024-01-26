// icon:weather_lightning | Linea Iconset https://linea.io/ | Benjamin Sigidi
import * as React from "react";

function IconWeather_lightning(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="bevel"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M40 1L17 37h14l-7 26 26-36H36z"
      />
    </svg>
  );
}

export default IconWeather_lightning;
