import { signal, effect } from "@preact/signals-react";
import { STORE_NAMES, DEFAULT_SETTINGS } from "../App.config";
import { Workspace, Project, Task } from "./data";

export const workspaces = signal(getSaved(STORE_NAMES.workspaces, Workspace));
export const projects = signal(getSaved(STORE_NAMES.projects, Project));
export const tasks = signal(getSaved(STORE_NAMES.tasks, Task));
export const settings = signal(getSaved(STORE_NAMES.settings));

effect(() => {
  localStorage.setItem(
    STORE_NAMES.workspaces,
    JSON.stringify(workspaces.value),
  );
});

effect(() => {
  localStorage.setItem(STORE_NAMES.projects, JSON.stringify(projects.value));
});

effect(() => {
  localStorage.setItem(STORE_NAMES.tasks, JSON.stringify(tasks.value));
});

effect(() => {
  localStorage.setItem(STORE_NAMES.settings, JSON.stringify(settings.value));
});

function getSaved(storeName, reclass) {
  const saved = localStorage.getItem(storeName);
  if (saved == null) return { ...DEFAULT_SETTINGS };
  const parsed = JSON.parse(saved);
  if (reclass)
    return Object.fromEntries(
      Object.keys(parsed).map((key) => [key, new reclass(parsed[key])]),
    );
  return parsed;
}
