import React from "react";
import FormDropdown from "./FormDropdown";
import WorkspaceEntry from "./WorkspaceEntry";
import { SquareArrowDownRight } from "lucide-react";

export default function WorkspaceUI({ workspaces, projects, onAction }) {
  return (
    <div className="w-full flex flex-col gap-2 h-full overflow-hidden">
      <FormDropdown
        titleContent={[
          <SquareArrowDownRight
            className="-rotate-45 group-open/formdrop:rotate-0 transition-transform 
            transform-gpu duration-700 ease-in-out"
            key={0}
          />,
          <div className="text-center w-full" key={1}>
            New Workspace
          </div>,
        ]}
        formInputs={[
          <input type="text" name="title" key={0} placeholder="Title" />,
          <textarea name="desc" key={1} placeholder="Description" />,
        ]}
        onSubmit={(data) => {
          onAction({ ...data, actionType: "add", dataType: "workspace" });
        }}
      />
      <div className="flex flex-col gap-1 flex-1 overflow-y-auto">
        {Object.entries(workspaces.value).map(([wsID, workspace]) => {
          return (
            <WorkspaceEntry
              workspaceID={wsID}
              workspaces={workspaces}
              projects={projects}
              onAction={onAction}
              key={wsID}
            />
          );
        })}
      </div>
    </div>
  );
}
