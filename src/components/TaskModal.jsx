import React, { useRef, useState, useEffect } from "react";
import { useSignal, effect } from "@preact/signals-react";
import { createPortal } from "react-dom";
import { format } from "date-fns";
import { SquareX, RotateCcw, Trash2, Forward, SquarePen } from "lucide-react";

export default function TaskModal({ taskID, tasks, onAction }) {
  const [editMode, setEditMode] = useState(false);
  const [inpTitle, setInpTitle] = useState("");
  const [inpDesc, setInpDesc] = useState("");
  const [inpDeadline, setInpDeadline] = useState("");

  useEffect(() => {
    setInpTitle(tasks.value[taskID.value]?.title || "");
    setInpDesc(tasks.value[taskID.value]?.desc || "");
    setInpDeadline(
      format(
        tasks.value[taskID.value]?.deadline || new Date(),
        "yyyy-MM-dd'T'HH:mm",
      ),
    );
  }, [taskID.value, tasks.value]);

  return createPortal(
    <div
      className={`absolute inset-0 h-fit w-[min(500px,70dvw)] rounded-md
        m-auto transition-transform duration-700 ease-out bg-teal-600
        ${taskID.value ? "translate-y-0" : "-translate-y-[100dvh]"}
      `}
    >
      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-3">
          {editMode ? (
            <input
              type="text"
              className="w-full"
              value={inpTitle}
              onChange={(e) => setInpTitle(e.target.value)}
            />
          ) : (
            <div className="px-2 py-1">
              {tasks.value[taskID.value]?.title || " "}
            </div>
          )}
          <button
            className="shrink-0 p-1"
            onClick={() => onAction({ actionType: "close" })}
          >
            <SquareX />
          </button>
        </div>
        <div>
          {editMode ? (
            <input
              type="datetime-local"
              value={inpDeadline}
              onChange={(e) => setInpDeadline(e.target.value)}
              className="w-full px-2 py-1"
            />
          ) : (
            <div className="px-2 py-1">
              {"Due: "}
              {format(
                tasks.value[taskID.value]?.deadline || new Date(),
                "eee MMM do, y '@' h:mmaaa",
              )}
            </div>
          )}
        </div>
        <div>
          {editMode ? (
            <textarea
              value={inpDesc}
              onChange={(e) => setInpDesc(e.target.value)}
              rows={4}
              className="w-full leading-tight p-2"
            />
          ) : (
            <div className="px-2 py-1 leading-tight h-24">
              {tasks.value[taskID.value]?.desc || ""}
            </div>
          )}
        </div>
        <div className="flex justify-evenly">
          <button
            onClick={() =>
              onAction({
                actionType: "delete",
                targetType: "task",
                taskID: taskID.value,
              })
            }
          >
            <Trash2 />
          </button>
          {(editMode && (
            <>
              <button
                onClick={() => {
                  setInpTitle(tasks.value[taskID.value]?.title || "");
                  setInpDesc(tasks.value[taskID.value]?.desc || "");
                  setInpDeadline(
                    format(
                      tasks.value[taskID.value]?.deadline || new Date(),
                      "yyyy-MM-dd'T'HH:mm",
                    ),
                  );
                }}
              >
                <RotateCcw />
              </button>
              <button
                onClick={() => {
                  onAction({
                    actionType: "update",
                    targetType: "task",
                    id: taskID.value,
                    title: inpTitle,
                    desc: inpDesc,
                    deadline: new Date(inpDeadline).toISOString(),
                    completed: "",
                    created: tasks.value[taskID.value].created,
                  });
                  setEditMode(false);
                }}
              >
                <Forward />
              </button>
            </>
          )) || (
            <button onClick={() => setEditMode(true)}>
              <SquarePen />
            </button>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("root"),
  );
}
