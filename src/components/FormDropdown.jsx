import React, { useRef } from "react";
import { RotateCcw, Forward } from "lucide-react";

export default function FormDropdown({
  formInputs,
  titleContent,
  onSubmit,
  styles = "",
}) {
  return (
    <details
      className={`bg-(--color-btn) p-1 details-content:h-0 open:details-content:h-auto 
      details-content:transition-all details-content:ease-in-out details-content:transition-discrete 
      details-content:duration-700 overflow-hidden cursor-default rounded-md group/formdrop
      shrink-0 open:details-content:mt-1 inset-shadow-md drop-shadow-lg
      ${styles}`}
    >
      <summary
        className="flex justify-between 
          cursor-pointer items-center p-2 rounded-xs"
      >
        {titleContent}
      </summary>
      <form
        method="dialog"
        className="flex flex-col gap-2 p-1"
        onSubmit={(e) => {
          onSubmit(Object.fromEntries(new FormData(e.target).entries()));
        }}
      >
        {formInputs}
        <div className="flex justify-evenly p-1">
          <button type="reset" className="">
            <RotateCcw />
          </button>
          <button type="submit" className="">
            <Forward />
          </button>
        </div>
      </form>
    </details>
  );
}
