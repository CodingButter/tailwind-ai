import classNames from "classnames";
import React from "react";
import HyperText from "./HyperText";
import { ErrorLevel, ErrorMessage } from "../types";

interface ErrorComponentProps {
  error: ErrorMessage;
  className?: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  error,
  className,
}) => {
  return (
    <div className="relative w-full flex h-full justify-start items-end">
      <div
        className={classNames(
          "w-full h-full flex justify-start items-center px-4 py-0 rounded-sm shadow-md",
          error?.level === ErrorLevel.ERROR && "bg-red-500",
          error?.level === ErrorLevel.WARNING && "bg-yellow-500",
          error?.level === ErrorLevel.INFO && "bg-blue-500",
          error && "animate-expand"
        )}
      >
        <p
          className={classNames(
            "transition-all duration-1000 delay-[2000ms]",
            error ? "opacity-100" : "opacity-0"
          )}
        >
          <HyperText text={error?.message?.slice(4) || ""} />
        </p>
      </div>
    </div>
  );
};

export default ErrorComponent;
