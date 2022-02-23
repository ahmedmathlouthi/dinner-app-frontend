// import { usePrevious } from 'client/hooks/usePrevious';
// import CloseIcon from 'client/svg/CloseIcon';
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "./CloseIcon";
import "./MultiInput.css";
import { usePrevious } from "../../hooks/customHooks";

const MultiInput = ({ onRemove, label, chips, onSubmit, submitQuery }) => {
  const [state, setState] = useState({
    focused: false,
    exitingIndex: -1,
  });

  const formControlRef = useRef();

  const removeChip = (index) => {
    setState((prevState) => ({ ...prevState, exitingIndex: index }));
    setTimeout(() => {
      onRemove(index);
      setState((prevState) => ({ ...prevState, exitingIndex: null }));
    }, 250);
  };

  const prevChips = usePrevious(chips);

  useEffect(() => {
    if (!formControlRef.current) return;
    if (prevChips?.length !== chips.length) {
      formControlRef.current.value = "";
    }
  }, [chips]);

  return (
    <div>
      {label && (
        <label className="form-label" htmlFor="multi-input">
          <span className="flex justify-content-between align-items-center  form-custom-label ">
            {label}
          </span>
        </label>
      )}

      <div
        id="multi-input"
        role="button"
        key={1}
        tabIndex={-1}
        onKeyPress={() => formControlRef.current?.focus()}
        onClick={() => formControlRef.current?.focus()}
        className={["chip-input", state.focused ? "shadow-primary" : ""].join(
          " "
        )}
      >
        <div className="rowchips flex justify-center">
          {chips.map((chip, index) => (
            <div
              className={[
                "p-1",
                "flex",
                "align-center",
                "h-10",
                "rounded",
                "border-2",
                "bg-blue",
                "m-2",
                state.exitingIndex === index ? "invisible" : "",
              ].join(" ")}
              key={index.toString()}
            >
              <div
                className={["chip", "show", "flex", "align-center"].join(" ")}
              >
                <div>{chip}</div>
              </div>
              <CloseIcon
                // className={["ml-2", "cursor-pointer"].join(" ")}
                onClick={() => removeChip(index)}
              />
            </div>
          ))}
          <div>
            <div
              role="button"
              key={1}
              tabIndex={-1}
              className="flex justify-center mt-10"
              onKeyUp={(e) => {
                e.preventDefault();
                if (!formControlRef.current?.value) {
                  return;
                }
                if (e.keyCode === 13) {
                  onSubmit(formControlRef.current?.value);
                }
              }}
            >
              <input
                ref={formControlRef}
                name="chipInput"
                placeholder="Enter Here..."
                aria-label="Chip Input"
                style={{
                  marginBottom: "13px",
                  boxShadow: "none",
                  width: "300px",
                }}
                className="border-b-[3px] transition duration-500 placeholder-blue-400 focus:placeholder-transparent border-blue-400 w-4/12 py-2 text-center text-blue-400 focus:outline-none "
                // className={["form-control", "no-focus"].join(" ")}
                onFocus={() =>
                  setState((prevState) => ({ ...prevState, focused: true }))
                }
                onBlur={() =>
                  setState((prevState) => ({ ...prevState, focused: false }))
                }
              />
            </div>
          <div className="container text-center">
            <button
              onClick={() => submitQuery()}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Search
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiInput;
