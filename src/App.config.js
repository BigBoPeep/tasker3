export const DEFAULT_SETTINGS = {
  filters: {
    completed: { enabled: true, text: "Completed" },
    incomplete: { enabled: true, text: "Incomplete" },
    overdue: { enabled: true, text: "Overdue" },
  },
  sortBy: "deadline",
  sortOrder: "descending",
};

export const STORE_NAMES = {
  tasks: "tasks",
  projects: "projects",
  workspaces: "workspaces",
  settings: "settings",
};
