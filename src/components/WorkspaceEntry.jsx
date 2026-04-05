import React from "react";
import { Ellipsis, SquareArrowDownRight } from "lucide-react";
import FormDropdown from "./FormDropdown";

export default function WorkspaceEntry({
  workspaceID,
  workspaces,
  projects,
  onAction,
}) {
  return (
    <div>
      <details
        className="bg-amber-200 p-1 details-content:h-0 open:details-content:h-auto
          details-content:transition-all details-content:ease-in-out details-content:transition-discrete
          details-content:duration-700 overflow-hidden cursor-default rounded-md group"
      >
        <summary className="flex cursor-pointer justify-between items-center p-1">
          <SquareArrowDownRight
            className="-rotate-45 group-open:rotate-0 transition-transform
              transform-gpu duration-700 ease-in-out"
          />
          <div className="text-center w-full">
            {workspaces.value[workspaceID].title}
          </div>
          <button className="p-1.5">
            <Ellipsis className="size-4" />
          </button>
        </summary>
        {workspaces.value[workspaceID].projectIDs.map((projectID) => {
          return (
            <div
              key={projectID}
              className="p-2 justify-self-center cursor-pointer"
              onClick={() => {
                onAction({
                  actionType: "select",
                  targetType: "project",
                  projectID,
                  workspaceID,
                });
              }}
            >
              {projects.value[projectID].title}
            </div>
          );
        })}
        <FormDropdown
          titleContent={[
            <SquareArrowDownRight
              className="-rotate-45 group-open/formdrop:rotate-0 transition-transform
              transform-gpu duration-700 ease-in-out"
              key={0}
            />,
            <div className="text-center w-full" key={1}>
              New Project
            </div>,
          ]}
          formInputs={[
            <input type="text" name="title" key={0} placeholder="Title" />,
            <textarea name="desc" key={1} placeholder="Description" />,
            <input type="datetime-local" name="deadline" key={2} />,
          ]}
          onSubmit={(data) =>
            onAction({
              ...data,
              actionType: "add",
              targetType: "project",
            })
          }
        />
      </details>
    </div>
  );
}
