import "./FormDropdown.module.css";
import React, { useRef } from "react";

export default function FormDropdown({ formInputs, titleContent }) {
  return (
    <div className="form-dropdown">
      <summary className="title">{titleContent}</summary>
      <form method="dialog" onSubmit={(e) => {}}>
        {formInputs}
        <div className="buttons">
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
