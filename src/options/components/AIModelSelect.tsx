import React, { useState, useEffect, ChangeEvent } from "react";
import { useOpenAI, type Options } from "../../hooks/useOpenAI";

interface AIModelSelectProps {
  options: Partial<Options>;
  setOptions: (options: Partial<Options>) => void;
}

const AIModelSelect: React.FC<AIModelSelectProps> = ({
  options,
  setOptions,
}) => {
  const { model } = options;
  const [list, setList] = useState([]);
  const { openAI } = useOpenAI();

  const handleChangeModel = (e: ChangeEvent<HTMLSelectElement>) => {
    setOptions({ model: e.target.value });
  };

  useEffect(() => {
    if (!openAI) {
      return;
    }
    openAI.models.list().then((res) => {
      setList(res.data);
    });
  }, [openAI]);
  return (
    <div className="mb-4">
      <label htmlFor="ai-model" className="block mb-2 text-lg">
        AI Model
      </label>
      {list.length > 0 && (
        <select
          id="ai-model"
          className="bg-gray-700 text-white block w-full p-2 rounded"
          onChange={handleChangeModel}
          value={model || list[0]?.id}
        >
          {list.map((model) => {
            return (
              <option key={model.id} value={model.id}>
                {model.id.replace(/-/g, " ").replace(/_/g, " ").toUpperCase()}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
};

export default AIModelSelect;
