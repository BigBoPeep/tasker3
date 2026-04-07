import React from "react";
import { createPortal } from "react-dom";
import { useSignal } from "@preact/signals-react";
import { Ellipsis } from "lucide-react";
import { format } from "date-fns";
import TaskEntry from "./TaskEntry";
import TaskControls from "./TaskControls";
import TaskModal from "./TaskModal";

export default function ProjectUI({
  projects,
  tasks,
  settings,
  selectedProject,
  onAction,
}) {
  const selectedTask = useSignal(null);

  if (!selectedProject.value)
    return (
      <div>
        No Project Selected
        <></>
      </div>
    );

  const project = projects.value[selectedProject.value];

  return (
    <div className="overflow-auto">
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
        <div className="flex flex-col gap-1 p-1">
          {project.taskIDs.map((taskID) => {
            return (
              <TaskEntry
                taskID={taskID}
                tasks={tasks}
                key={taskID}
                onClick={() => (selectedTask.value = taskID)}
              />
            );
          })}
        </div>
        <TaskModal
          taskID={selectedTask}
          tasks={tasks}
          onAction={(data) => {
            if (data.actionType === "close" || data.actionType === "delete")
              selectedTask.value = null;
            onAction({ ...data, projectID: project.id });
          }}
        />
      </div>
    </div>
  );
}
