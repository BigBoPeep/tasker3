import "./WorkspaceUI.css";
import React from "react";
import FormDropdown from "../FormDropdown/FormDropdown";

export default function WorkspaceUI({ workspaces, projects }) {
  return (
    <div className="workspaceui">
      <FormDropdown
        formInputs={[
          <input type="text" name="workspace-title" />,
          <textarea name="workspace-desc" />,
        ]}
      />
    </div>
  );
}
