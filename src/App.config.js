import { format } from "date-fns";

export const DEFAULT_SETTINGS = {
  filters: {
    completed: { enabled: true, text: "Completed" },
    incomplete: { enabled: true, text: "Incomplete" },
    overdue: { enabled: true, text: "Overdue" },
  },
  sortBy: "deadline",
  sortOrder: "descending",
  theme: "ozark",
  dueFormat: "eee MMM do, y '@' h:mmaaa",
  createdFormat: "Pp",
};

export const STORE_NAMES = {
  tasks: "tasks",
  projects: "projects",
  workspaces: "workspaces",
  settings: "settings",
};

export const THEMES = {
  pineywood: "Pineywood",
  ozark: "Ozark",
};

const now = new Date();
const formats = [
  "eee MMM do, y '@' h:mmaaa",
  "eee MMM do, y '@' HH:mm",
  "PPPppp",
  "PPPPpppp",
  "Pp",
];
export const DATE_FORMATS = {
  [formats[0]]: format(now, formats[0]),
  [formats[1]]: format(now, formats[1]),
  [formats[2]]: format(now, formats[2]),
  [formats[3]]: format(now, formats[3]),
  [formats[4]]: format(now, formats[4]),
};
