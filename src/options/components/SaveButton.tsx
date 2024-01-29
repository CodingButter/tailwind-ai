import classNames from "classnames";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Options } from "../../hooks/useOpenAI";

interface SaveButtonProps {
  options: Options;
  unsavedOptions: Options;
  setOptions: (options: Partial<Options>) => void;
  saveOptions: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  options,
  unsavedOptions,
  setOptions,
  saveOptions,
}) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const handleSetAutoSave = (e: ChangeEvent<HTMLInputElement>) => {
    setOptions({ autoSave: e.target.checked });
  };

  useEffect(() => {
    if (Object.is(options, unsavedOptions)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [options, unsavedOptions]);

  return (
    <div className="flex items-start justify-start gap-2">
      <button
        title={disabled ? "No changes to save" : "Save Options"}
        disabled={disabled}
        onClick={saveOptions}
        className={classNames(
          `bg-blue-500 text-white font-bold py-2 px-4 rounded`,
          disabled ? `opacity-50 cursor-not-allowed` : "hover:bg-blue-700"
        )}
      >
        {disabled ? `Saved` : `Save Options`}
      </button>
      <input
        type="checkbox"
        checked={unsavedOptions.autoSave}
        onChange={handleSetAutoSave}
      />
      <label className="text-accent">Auto Save</label>
    </div>
  );
};

export default SaveButton;
