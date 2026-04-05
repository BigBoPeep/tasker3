import React from "react";
import { Ellipsis } from "lucide-react";
import { format } from "date-fns";
import TaskEntry from "./TaskEntry";
import TaskControls from "./TaskControls";

export default function ProjectUI({
  projects,
  tasks,
  settings,
  selectedProject,
}) {
  if (!selectedProject.projectID || !selectedProject.workspaceID)
    return (
      <div>
        No Project Selected
        <></>
      </div>
    );

  const project = projects.value[selectedProject.projectID];

  return (
    <div>
      <div className="bg-red-300 flex flex-col gap-1 p-2">
        <div className="flex justify-between items-center">
          <p>{project.title}</p>

          <button className="p-1.5">
            <Ellipsis className="size-4" />
          </button>
        </div>

        <div>
          {"Due: "}
          <span>{format(project.deadline, "eee MMM do, y '@' h:mmaaa")}</span>
        </div>

        <div className="h-15 leading-tight">{project.desc}</div>

        <div>
          {"Created: "}
          <span>{format(project.created, "Pp")}</span>
        </div>
      </div>
      <div>
        <TaskControls settings={settings} />
        <div className="flex flex-col gap-1">
          {project.taskIDs.map((taskID) => {
            return <TaskEntry task={tasks.value[taskID]} key={taskID} />;
          })}
        </div>
      </div>
    </div>
  );
}
