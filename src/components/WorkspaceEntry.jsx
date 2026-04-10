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
      <details className="bg-transBG-2 p-1.5 cursor-default rounded-md group/ws">
        <summary
          className="flex cursor-pointer justify-between items-center p-1 text-lg 
            font-semibold"
        >
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
        <div className="mt-1 mb-2">
          {workspaces.value[workspaceID].projectIDs.map((projectID) => {
            return (
              <div
                key={projectID}
                className="bg-transBG-1 py-2 min-w-8/12 justify-self-center cursor-pointer 
                  text-center rounded-md"
                onClick={() => {
                  onAction({
                    actionType: "select",
                    targetType: "project",
                    projectID,
                  });
                }}
              >
                {projects.value[projectID].title}
              </div>
            );
          })}
        </div>
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
