import React from "react";

interface HyperTextProps {
  text: string;
  limit?: number;
}

const HyperText: React.FC<HyperTextProps> = ({ text, limit }) => {
  const split = text.split(" ");
  const result: { link: boolean; value: string }[] = [];
  split.forEach((word) => {
    if (word.startsWith("http")) {
      result.push({ link: true, value: word });
    } else {
      result.push({ link: false, value: word });
    }
  });
  return (
    <>
      {result.map(({ link, value }, index) => {
        if (link) {
          return (
            <span key={index}>
              {" "}
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300-500 font-bold hover:underline"
              >
                {limit && value.length > limit
                  ? `${value.slice(0, limit)}...`
                  : value}
              </a>{" "}
            </span>
          );
        }
        return <span key={index}> {value} </span>;
      })}
    </>
  );
};

export default HyperText;
