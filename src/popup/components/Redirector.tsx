import React, { useRef, useEffect } from "react";

interface RedirectProps {
  enabled: boolean;
  handleRedirect: () => void;
  timeout: number;
}

const Redirector: React.FC<RedirectProps> = ({
  handleRedirect,
  enabled = false,
  timeout = 5,
}) => {
  const redirectTimeRef = useRef(timeout);
  const redirectElementRef = useRef(null);

  useEffect(() => {
    if (enabled && redirectElementRef.current) {
      setInterval(() => {
        if (redirectElementRef.current)
          redirectElementRef.current.innerText = --redirectTimeRef.current;

        if (redirectTimeRef.current === 0) {
          handleRedirect();
        }
      }, 1000);
    }
  }, [enabled]);

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="text-accent text-md">Redirecting in</p>
      <button
        className="shado-md animate-ping duration-1000 flex justify-center items-center text-lg text-accent bg-gray-600 rounded-full w-12 h-12"
        ref={redirectElementRef}
        onClick={handleRedirect}
      >
        {redirectTimeRef.current}
      </button>
    </div>
  );
};

export default Redirector;
