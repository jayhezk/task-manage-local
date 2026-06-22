const STORAGE_KEYS = {
  tasks: "todo-app-tasks",
  goals: "todo-app-goals",
  history: "todo-app-completion-history",
  calendar: "todo-app-calendar-state",
  projects: "todo-app-projects",
  projectTasks: "todo-app-project-tasks",
  projectState: "todo-app-project-state",
  boardMode: "todo-app-board-mode",
};

const LEGACY_TASKS_KEY = "todo-app-items";
const WEEKDAY_LABELS = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const GANTT_COLORS = [
  "#2563eb",
  "#dc2626",
  "#16a34a",
  "#d97706",
  "#9333ea",
  "#0891b2",
  "#db2777",
  "#65a30d",
  "#ea580c",
  "#4f46e5",
  "#0d9488",
  "#be123c",
  "#7c3aed",
  "#059669",
  "#ca8a04",
  "#0284c7",
  "#c026d3",
  "#475569",
  "#e11d48",
  "#0f766e",
  "#b45309",
  "#6d28d9",
  "#0369a1",
  "#15803d",
  "#a21caf",
  "#b91c1c",
  "#1d4ed8",
  "#047857",
  "#c2410c",
  "#4338ca",
  "#0e7490",
  "#9f1239",
  "#854d0e",
  "#5b21b6",
  "#166534",
  "#7f1d1d",
];
const GANTT_SCALE_SETTINGS = {
  day: {
    label: "天",
    dayWidth: 34,
    unitWidth: 34,
  },
  week: {
    label: "周",
    dayWidth: 14,
    unitWidth: 98,
  },
  month: {
    label: "月",
    dayWidth: 6,
    unitWidth: 180,
  },
};

const openGoalModalButton = document.querySelector("#open-goal-modal-button");
const goalEmptyState = document.querySelector("#goal-empty-state");
const goalList = document.querySelector("#goal-list");

const currentDateLabel = document.querySelector("#current-date-label");
const currentTimeLabel = document.querySelector("#current-time-label");
const dayRemainingLabel = document.querySelector("#day-remaining-label");
const weekRemainingLabel = document.querySelector("#week-remaining-label");
const monthRemainingLabel = document.querySelector("#month-remaining-label");
const yearRemainingLabel = document.querySelector("#year-remaining-label");
const todayTaskToggle = document.querySelector("#today-task-toggle");
const todayTaskCount = document.querySelector("#today-task-count");
const todayTaskToggleIcon = document.querySelector("#today-task-toggle-icon");
const todayTaskListPanel = document.querySelector("#today-task-list-panel");
const todayTaskEmptyState = document.querySelector("#today-task-empty-state");
const todayTaskList = document.querySelector("#today-task-list");

const calendarToggle = document.querySelector("#calendar-toggle");
const calendarToggleIcon = document.querySelector("#calendar-toggle-icon");
const calendarBody = document.querySelector("#calendar-body");
const calendarMonthLabel = document.querySelector("#calendar-month-label");
const calendarPrevButton = document.querySelector("#calendar-prev-button");
const calendarNextButton = document.querySelector("#calendar-next-button");
const calendarGrid = document.querySelector("#calendar-grid");
const historyDateLabel = document.querySelector("#history-date-label");
const historyEmptyState = document.querySelector("#history-empty-state");
const historyList = document.querySelector("#history-list");

const boardSwitchButton = document.querySelector("#board-switch-button");
const boardSwitchMenu = document.querySelector("#board-switch-menu");
const boardSwitchOptions = Array.from(document.querySelectorAll("[data-board-mode]"));

const openTaskModalButton = document.querySelector("#open-task-modal-button");
const clearCompletedButton = document.querySelector("#clear-completed-button");
const taskEmptyState = document.querySelector("#task-empty-state");
const taskList = document.querySelector("#task-list");
const tasksPanel = document.querySelector(".tasks-panel");
const totalCount = document.querySelector("#total-count");
const pendingCount = document.querySelector("#pending-count");
const completedCount = document.querySelector("#completed-count");
const ganttEmptyState = document.querySelector("#gantt-empty-state");
const ganttChart = document.querySelector("#gantt-chart");
const ganttWindowLabel = document.querySelector("#gantt-window-label");
const ganttScaleButtons = Array.from(document.querySelectorAll("[data-gantt-scale]"));
const dailyGanttPanel = document.querySelector(".gantt-panel");

const openProjectModalButton = document.querySelector("#open-project-modal-button");
const projectEmptyState = document.querySelector("#project-empty-state");
const projectList = document.querySelector("#project-list");
const projectsPanel = document.querySelector(".projects-panel");
const projectTotalCount = document.querySelector("#project-total-count");
const projectActiveCount = document.querySelector("#project-active-count");
const projectRiskCount = document.querySelector("#project-risk-count");
const projectDetailEmptyState = document.querySelector("#project-detail-empty-state");
const projectDetail = document.querySelector("#project-detail");
const projectDetailTitle = document.querySelector("#project-detail-title");
const projectDetailStatus = document.querySelector("#project-detail-status");
const projectDetailObjective = document.querySelector("#project-detail-objective");
const projectDetailOwner = document.querySelector("#project-detail-owner");
const projectDetailDates = document.querySelector("#project-detail-dates");
const projectDetailRemaining = document.querySelector("#project-detail-remaining");
const projectDetailProgressLabel = document.querySelector("#project-detail-progress-label");
const projectDetailProgressBar = document.querySelector("#project-detail-progress-bar");
const projectDetailTaskSummary = document.querySelector("#project-detail-task-summary");
const openProjectTaskButton = document.querySelector("#open-project-task-button");
const collapseProjectDetailButton = document.querySelector("#collapse-project-detail-button");
const projectTaskTotalCount = document.querySelector("#project-task-total-count");
const projectTaskPendingCount = document.querySelector("#project-task-pending-count");
const projectTaskCompletedCount = document.querySelector("#project-task-completed-count");
const projectTaskEmptyState = document.querySelector("#project-task-empty-state");
const projectTaskList = document.querySelector("#project-task-list");
const projectGanttEmptyState = document.querySelector("#project-gantt-empty-state");
const projectGanttChart = document.querySelector("#project-gantt-chart");
const projectGanttWindowLabel = document.querySelector("#project-gantt-window-label");
const projectGanttScaleButtons = Array.from(document.querySelectorAll("[data-project-gantt-scale]"));

const goalModal = document.querySelector("#goal-modal");
const goalModalTitle = document.querySelector("#goal-modal-title");
const goalModalClose = document.querySelector("#goal-modal-close");
const goalForm = document.querySelector("#goal-form");
const goalIdInput = document.querySelector("#goal-id");
const goalTitleInput = document.querySelector("#goal-title-input");
const goalDateInput = document.querySelector("#goal-date-input");
const goalSubmitButton = document.querySelector("#goal-submit-button");
const goalCancelButton = document.querySelector("#goal-cancel-button");

const projectModal = document.querySelector("#project-modal");
const projectModalTitle = document.querySelector("#project-modal-title");
const projectModalClose = document.querySelector("#project-modal-close");
const projectForm = document.querySelector("#project-form");
const projectIdInput = document.querySelector("#project-id");
const projectTitleInput = document.querySelector("#project-title-input");
const projectOwnerInput = document.querySelector("#project-owner-input");
const projectObjectiveInput = document.querySelector("#project-objective-input");
const projectStartDateInput = document.querySelector("#project-start-date-input");
const projectDueDateInput = document.querySelector("#project-due-date-input");
const projectSubmitButton = document.querySelector("#project-submit-button");
const projectCancelButton = document.querySelector("#project-cancel-button");

const taskModal = document.querySelector("#task-modal");
const taskModalTitle = document.querySelector("#task-modal-title");
const taskModalClose = document.querySelector("#task-modal-close");
const taskForm = document.querySelector("#task-form");
const taskIdInput = document.querySelector("#task-id");
const taskSourceTypeInput = document.querySelector("#task-source-type");
const taskProjectIdInput = document.querySelector("#task-project-id");
const taskTitleInput = document.querySelector("#task-title-input");
const taskOwnerInput = document.querySelector("#task-owner-input");
const taskCriteriaInput = document.querySelector("#task-criteria-input");
const taskStartDateInput = document.querySelector("#task-start-date-input");
const taskDueDateInput = document.querySelector("#task-due-date-input");
const taskProgressInput = document.querySelector("#task-progress-input");
const taskDirectoryInput = document.querySelector("#task-directory-input");
const taskSubmitButton = document.querySelector("#task-submit-button");
const taskCancelButton = document.querySelector("#task-cancel-button");

let tasks = loadTasks();
let goals = loadCollection(STORAGE_KEYS.goals, isValidGoal);
let completionHistory = loadHistory();
let calendarState = loadCalendarState();
let projects = loadCollection(STORAGE_KEYS.projects, isValidProject).map(normalizeProject);
let projectTasks = loadCollection(STORAGE_KEYS.projectTasks, isValidProjectTask).map(normalizeProjectTask);
let projectState = loadProjectState();
let boardMode = loadBoardMode();
let clockTimer = null;
let goalModalMode = "add";
let projectModalMode = "add";
let taskModalMode = "add";
let taskModalContext = { sourceType: "daily", projectId: "" };
let ganttScale = "day";
let projectGanttScale = "day";
let todayTaskPromptExpanded = false;

function loadCollection(key, validator) {
  try {
    const rawValue = localStorage.getItem(key);
    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);
    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(validator);
  } catch (error) {
    console.error(`读取数据失败：${key}`, error);
    return [];
  }
}

function loadTasks() {
  const savedTasks = loadCollection(STORAGE_KEYS.tasks, isValidTask).map(normalizeTask);
  if (savedTasks.length > 0) {
    return savedTasks;
  }

  try {
    const legacyValue = localStorage.getItem(LEGACY_TASKS_KEY);
    if (!legacyValue) {
      return [];
    }

    const legacyTasks = JSON.parse(legacyValue);
    if (!Array.isArray(legacyTasks)) {
      return [];
    }

    return legacyTasks
      .filter(
        (item) =>
          item &&
          typeof item.id === "string" &&
          typeof item.text === "string" &&
          typeof item.completed === "boolean"
      )
      .map((item) => ({
        id: item.id,
        title: item.text,
        owner: "",
        completionCriteria: "",
        startDate: "",
        dueDate: "",
        progressNote: "",
        directoryPath: "",
        completed: item.completed,
        createdAt: new Date().toISOString(),
        completedAt: item.completed ? new Date().toISOString() : "",
      }));
  } catch (error) {
    console.error("迁移旧任务数据失败：", error);
    return [];
  }
}

function loadHistory() {
  return loadCollection(STORAGE_KEYS.history, isValidHistoryRecord).map(normalizeHistoryRecord);
}

function loadProjectState() {
  try {
    const rawValue = localStorage.getItem(STORAGE_KEYS.projectState);
    if (!rawValue) {
      return { selectedProjectId: "" };
    }

    const parsedValue = JSON.parse(rawValue);
    if (!parsedValue || typeof parsedValue.selectedProjectId !== "string") {
      return { selectedProjectId: "" };
    }

    return parsedValue;
  } catch (error) {
    console.error("读取项目状态失败：", error);
    return { selectedProjectId: "" };
  }
}

function loadBoardMode() {
  const savedMode = localStorage.getItem(STORAGE_KEYS.boardMode);
  return savedMode === "project" ? "project" : "daily";
}

function normalizeTask(item) {
  return {
    id: item.id,
    title: item.title,
    owner: item.owner,
    completionCriteria: item.completionCriteria,
    startDate: typeof item.startDate === "string" ? item.startDate : "",
    dueDate: item.dueDate,
    progressNote: item.progressNote,
    directoryPath: item.directoryPath,
    completed: item.completed,
    createdAt: item.createdAt,
    completedAt: item.completedAt,
  };
}

function normalizeProject(item) {
  return {
    id: item.id,
    title: item.title,
    owner: item.owner,
    objective: item.objective,
    startDate: item.startDate,
    dueDate: item.dueDate,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

function normalizeProjectTask(item) {
  return {
    ...normalizeTask(item),
    projectId: item.projectId,
  };
}

function normalizeHistoryRecord(item) {
  return {
    taskId: item.taskId,
    title: item.title,
    owner: item.owner,
    completionCriteria: item.completionCriteria,
    startDate: typeof item.startDate === "string" ? item.startDate : "",
    dueDate: item.dueDate,
    progressNote: item.progressNote,
    directoryPath: item.directoryPath,
    completedAt: item.completedAt,
    completedDateKey: item.completedDateKey,
    sourceType: item.sourceType === "project" ? "project" : "daily",
    projectId: typeof item.projectId === "string" ? item.projectId : "",
    projectTitle: typeof item.projectTitle === "string" ? item.projectTitle : "",
  };
}

function loadCalendarState() {
  const today = new Date();
  const fallbackState = {
    expanded: false,
    selectedDate: toDateKey(today),
    viewYear: today.getFullYear(),
    viewMonth: today.getMonth(),
  };

  try {
    const rawValue = localStorage.getItem(STORAGE_KEYS.calendar);
    if (!rawValue) {
      return fallbackState;
    }

    const parsedValue = JSON.parse(rawValue);
    if (
      !parsedValue ||
      typeof parsedValue.expanded !== "boolean" ||
      !Number.isInteger(parsedValue.viewYear) ||
      !Number.isInteger(parsedValue.viewMonth) ||
      typeof parsedValue.selectedDate !== "string"
    ) {
      return fallbackState;
    }

    return parsedValue;
  } catch (error) {
    console.error("读取日历状态失败：", error);
    return fallbackState;
  }
}

function isValidTask(item) {
  return (
    item &&
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.owner === "string" &&
    typeof item.completionCriteria === "string" &&
    (typeof item.startDate === "string" || typeof item.startDate === "undefined") &&
    typeof item.dueDate === "string" &&
    typeof item.progressNote === "string" &&
    typeof item.directoryPath === "string" &&
    typeof item.completed === "boolean" &&
    typeof item.createdAt === "string" &&
    typeof item.completedAt === "string"
  );
}

function isValidProject(item) {
  return (
    item &&
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.owner === "string" &&
    typeof item.objective === "string" &&
    typeof item.startDate === "string" &&
    typeof item.dueDate === "string" &&
    typeof item.createdAt === "string" &&
    typeof item.updatedAt === "string"
  );
}

function isValidProjectTask(item) {
  return isValidTask(item) && typeof item.projectId === "string";
}

function isValidGoal(item) {
  return (
    item &&
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.targetDate === "string" &&
    typeof item.createdAt === "string"
  );
}

function isValidHistoryRecord(item) {
  return (
    item &&
    typeof item.taskId === "string" &&
    typeof item.title === "string" &&
    typeof item.owner === "string" &&
    typeof item.completionCriteria === "string" &&
    (typeof item.startDate === "string" || typeof item.startDate === "undefined") &&
    typeof item.dueDate === "string" &&
    typeof item.progressNote === "string" &&
    typeof item.directoryPath === "string" &&
    typeof item.completedAt === "string" &&
    typeof item.completedDateKey === "string" &&
    (typeof item.sourceType === "string" || typeof item.sourceType === "undefined") &&
    (typeof item.projectId === "string" || typeof item.projectId === "undefined") &&
    (typeof item.projectTitle === "string" || typeof item.projectTitle === "undefined")
  );
}

function ensureProjectStateConsistency() {
  if (projectState.selectedProjectId && !getProjectById(projectState.selectedProjectId)) {
    projectState.selectedProjectId = "";
  }
}

function saveAll() {
  ensureProjectStateConsistency();
  ensureHistoryConsistency();
  localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks));
  localStorage.setItem(STORAGE_KEYS.goals, JSON.stringify(goals));
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(completionHistory));
  localStorage.setItem(STORAGE_KEYS.calendar, JSON.stringify(calendarState));
  localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
  localStorage.setItem(STORAGE_KEYS.projectTasks, JSON.stringify(projectTasks));
  localStorage.setItem(STORAGE_KEYS.projectState, JSON.stringify(projectState));
  localStorage.setItem(STORAGE_KEYS.boardMode, boardMode);
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateInput(value) {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function addMonths(date, months) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function getDayDifference(fromDate, toDate) {
  return Math.round((startOfDay(toDate).getTime() - startOfDay(fromDate).getTime()) / ONE_DAY_MS);
}

function formatShortDateLabel(date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function formatMonthShortLabel(date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}`;
}

function startOfWeek(date) {
  const normalizedWeekday = date.getDay() === 0 ? 7 : date.getDay();
  return addDays(startOfDay(date), 1 - normalizedWeekday);
}

function endOfWeek(date) {
  return addDays(startOfWeek(date), 6);
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function formatDateLabel(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日，${WEEKDAY_LABELS[date.getDay()]}`;
}

function formatDateKeyLabel(dateKey) {
  const parsedDate = parseDateInput(dateKey);
  return parsedDate ? formatDateLabel(parsedDate) : "未选择日期";
}

function formatMonthLabel(year, monthIndex) {
  return `${year}年${monthIndex + 1}月`;
}

function formatClock(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function diffDays(fromDate, toDate) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.max(0, Math.round((toDate.getTime() - fromDate.getTime()) / oneDay));
}

function formatGoalCountdown(targetDate) {
  const parsedDate = parseDateInput(targetDate);
  if (!parsedDate) {
    return "未设置日期";
  }

  const today = startOfDay(new Date());
  const target = startOfDay(parsedDate);
  const days = Math.round((target.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));

  if (days > 0) {
    return `距离截止 ${days} 天`;
  }

  if (days === 0) {
    return "今天到期";
  }

  return `已逾期 ${Math.abs(days)} 天`;
}

function formatDueRemaining(dueDate) {
  if (!dueDate) {
    return "未设置";
  }

  const parsedDate = parseDateInput(dueDate);
  if (!parsedDate) {
    return "未设置";
  }

  const today = startOfDay(new Date());
  const target = startOfDay(parsedDate);
  const days = Math.round((target.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));

  if (days > 0) {
    return `剩余 ${days} 天`;
  }

  if (days === 0) {
    return "今天截止";
  }

  return `已逾期 ${Math.abs(days)} 天`;
}

function formatDateRange(startDate, dueDate) {
  if (startDate && dueDate) {
    return `${startDate} 至 ${dueDate}`;
  }

  if (startDate) {
    return `${startDate} 开始`;
  }

  if (dueDate) {
    return `${dueDate} 截止`;
  }

  return "未设置";
}

function getSelectedProject() {
  return projects.find((project) => project.id === projectState.selectedProjectId) || null;
}

function getProjectById(projectId) {
  return projects.find((project) => project.id === projectId) || null;
}

function getProjectTasks(projectId) {
  return projectTasks.filter((task) => task.projectId === projectId);
}

function touchProject(projectId) {
  const updatedAt = new Date().toISOString();
  projects = projects.map((project) => (project.id === projectId ? { ...project, updatedAt } : project));
}

function getProjectRemainingLabel(project, isComplete) {
  if (isComplete) {
    return "已完成";
  }

  return formatDueRemaining(project.dueDate);
}

function getProjectStats(project) {
  const tasksInProject = getProjectTasks(project.id);
  const total = tasksInProject.length;
  const completed = tasksInProject.filter((task) => task.completed).length;
  const pending = total - completed;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isComplete = total > 0 && completed === total;
  const today = startOfDay(new Date());
  const startDate = parseDateInput(project.startDate);
  const dueDate = parseDateInput(project.dueDate);
  let timeProgress = 0;

  if (startDate && dueDate && dueDate.getTime() > startDate.getTime()) {
    const elapsed = Math.max(0, getDayDifference(startDate, today));
    const duration = Math.max(1, getDayDifference(startDate, dueDate));
    timeProgress = Math.min(100, Math.round((elapsed / duration) * 100));
  }

  let status = "normal";
  let statusLabel = "正常";
  if (isComplete) {
    status = "complete";
    statusLabel = "完成";
  } else if (dueDate && today.getTime() > dueDate.getTime()) {
    status = "overdue";
    statusLabel = "逾期";
  } else if (total > 0 && timeProgress >= 50 && timeProgress - progress >= 25) {
    status = "risk";
    statusLabel = "风险";
  }

  return {
    total,
    completed,
    pending,
    progress,
    timeProgress,
    status,
    statusLabel,
    remainingLabel: getProjectRemainingLabel(project, isComplete),
  };
}

function getActiveProjectCount() {
  return projects.filter((project) => {
    const stats = getProjectStats(project);
    return stats.status !== "complete";
  }).length;
}

function getRiskProjectCount() {
  return projects.filter((project) => {
    const stats = getProjectStats(project);
    return stats.status === "risk" || stats.status === "overdue";
  }).length;
}

function getTaskStartForTodayCheck(task) {
  const explicitStartDate = parseDateInput(task.startDate);
  if (explicitStartDate) {
    return startOfDay(explicitStartDate);
  }

  return null;
}

function getTodayTaskRemainingRank(task) {
  const dueDate = parseDateInput(task.dueDate);
  if (!dueDate) {
    return Number.POSITIVE_INFINITY;
  }

  return getDayDifference(startOfDay(new Date()), dueDate);
}

function getTodayTaskRemainingLabel(task) {
  const rank = getTodayTaskRemainingRank(task);
  if (!Number.isFinite(rank)) {
    return "未设截止";
  }

  if (rank < 0) {
    return `逾期 ${Math.abs(rank)} 天`;
  }

  if (rank === 0) {
    return "今天截止";
  }

  return `剩余 ${rank} 天`;
}

function getTodayActionableTasks() {
  const today = startOfDay(new Date());
  const dailyItems = tasks.map((task) => ({
    task,
    sourceType: "daily",
    projectId: "",
    projectTitle: "",
  }));
  const projectItems = projectTasks.map((task) => {
    const project = getProjectById(task.projectId);
    return {
      task,
      sourceType: "project",
      projectId: task.projectId,
      projectTitle: project ? project.title : "未命名项目",
    };
  });

  return [...dailyItems, ...projectItems]
    .filter(({ task }) => {
      if (task.completed) {
        return false;
      }

      const startDate = getTaskStartForTodayCheck(task);
      return !startDate || startDate.getTime() <= today.getTime();
    })
    .sort((a, b) => {
      const rankDiff = getTodayTaskRemainingRank(a.task) - getTodayTaskRemainingRank(b.task);
      if (rankDiff !== 0) {
        return rankDiff;
      }

      return a.task.title.localeCompare(b.task.title, "zh-CN");
    });
}

function renderTodayTaskPrompt() {
  const actionableTasks = getTodayActionableTasks();
  todayTaskCount.textContent = String(actionableTasks.length);
  todayTaskToggle.setAttribute("aria-expanded", String(todayTaskPromptExpanded));
  todayTaskToggleIcon.classList.toggle("collapsed", !todayTaskPromptExpanded);
  todayTaskListPanel.classList.toggle("hidden", !todayTaskPromptExpanded);
  todayTaskList.innerHTML = "";
  todayTaskEmptyState.classList.toggle("hidden", actionableTasks.length > 0);

  actionableTasks.forEach(({ task, sourceType, projectId, projectTitle }) => {
    const item = document.createElement("li");
    item.className = "today-task-item";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "today-task-link";
    button.dataset.taskId = task.id;
    button.dataset.sourceType = sourceType;
    button.dataset.projectId = projectId;

    const title = document.createElement("span");
    title.className = "today-task-name";
    title.textContent = task.title;

    const meta = document.createElement("span");
    meta.className = "today-task-meta";
    meta.textContent =
      sourceType === "project"
        ? `${projectTitle} | ${getTodayTaskRemainingLabel(task)}`
        : `日常任务 | ${getTodayTaskRemainingLabel(task)}`;

    button.append(title, meta);
    item.appendChild(button);
    todayTaskList.appendChild(item);
  });
}

function toggleTodayTaskPrompt() {
  todayTaskPromptExpanded = !todayTaskPromptExpanded;
  renderTodayTaskPrompt();
}

function highlightTaskElement(element) {
  if (!element) {
    return;
  }

  element.scrollIntoView({ behavior: "smooth", block: "center" });
  element.classList.add("task-focus-ring");
  window.setTimeout(() => {
    element.classList.remove("task-focus-ring");
  }, 1800);
}

function jumpToTaskDetail(taskId, sourceType, projectId = "") {
  todayTaskPromptExpanded = false;

  if (sourceType === "project") {
    boardMode = "project";
    projectState.selectedProjectId = projectId;
  } else {
    boardMode = "daily";
  }

  render();
  window.requestAnimationFrame(() => {
    const listSelector = sourceType === "project" ? "#project-task-list" : "#task-list";
    const taskElement = document.querySelector(`${listSelector} [data-task-id="${taskId}"]`);
    highlightTaskElement(taskElement);
  });
}

function isBoardSwitchMenuOpen() {
  return !boardSwitchMenu.classList.contains("hidden");
}

function openBoardSwitchMenu() {
  boardSwitchMenu.classList.remove("hidden");
  boardSwitchButton.setAttribute("aria-expanded", "true");
}

function closeBoardSwitchMenu() {
  boardSwitchMenu.classList.add("hidden");
  boardSwitchButton.setAttribute("aria-expanded", "false");
}

function toggleBoardSwitchMenu() {
  if (isBoardSwitchMenuOpen()) {
    closeBoardSwitchMenu();
  } else {
    openBoardSwitchMenu();
  }
}

function switchBoardMode(nextMode) {
  if (nextMode !== "daily" && nextMode !== "project") {
    return;
  }

  boardMode = nextMode;
  closeBoardSwitchMenu();
  render();
}

function renderBoardMode() {
  const isDailyMode = boardMode === "daily";
  dailyGanttPanel.classList.toggle("hidden", !isDailyMode);
  tasksPanel.classList.toggle("hidden", !isDailyMode);
  projectsPanel.classList.toggle("hidden", isDailyMode);

  boardSwitchOptions.forEach((button) => {
    const isActive = button.dataset.boardMode === boardMode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function formatDateTime(isoString) {
  if (!isoString) {
    return "未记录";
  }

  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return "未记录";
  }

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${formatDateLabel(date)} ${hours}:${minutes}`;
}

function renderTimeModule() {
  const now = new Date();
  const startTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const normalizedWeekday = now.getDay() === 0 ? 7 : now.getDay();
  const nextWeekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (8 - normalizedWeekday));
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const nextYearStart = new Date(now.getFullYear() + 1, 0, 1);

  currentDateLabel.textContent = formatDateLabel(now);
  currentTimeLabel.textContent = formatClock(now);
  dayRemainingLabel.textContent = formatDuration(startTomorrow.getTime() - now.getTime());
  weekRemainingLabel.textContent = `${diffDays(startTomorrow, nextWeekStart)} 天`;
  monthRemainingLabel.textContent = `${diffDays(startTomorrow, nextMonthStart)} 天`;
  yearRemainingLabel.textContent = `${diffDays(startTomorrow, nextYearStart)} 天`;
  renderTodayTaskPrompt();
}

function startClock() {
  renderTimeModule();
  if (clockTimer) {
    clearInterval(clockTimer);
  }

  clockTimer = setInterval(() => {
    renderTimeModule();
  }, 1000);
}

function buildTaskFromForm() {
  return {
    title: taskTitleInput.value.trim(),
    owner: taskOwnerInput.value.trim(),
    completionCriteria: taskCriteriaInput.value.trim(),
    startDate: taskStartDateInput.value,
    dueDate: taskDueDateInput.value,
    progressNote: taskProgressInput.value.trim(),
    directoryPath: taskDirectoryInput.value.trim(),
  };
}

function buildProjectFromForm() {
  return {
    title: projectTitleInput.value.trim(),
    owner: projectOwnerInput.value.trim(),
    objective: projectObjectiveInput.value.trim(),
    startDate: projectStartDateInput.value,
    dueDate: projectDueDateInput.value,
  };
}

function openGoalModal(mode, goalId = "") {
  goalModalMode = mode;
  goalForm.reset();
  goalIdInput.value = "";

  if (mode === "edit") {
    const goal = goals.find((item) => item.id === goalId);
    if (!goal) {
      return;
    }

    goalModalTitle.textContent = "编辑目标";
    goalSubmitButton.textContent = "保存目标";
    goalIdInput.value = goal.id;
    goalTitleInput.value = goal.title;
    goalDateInput.value = goal.targetDate;
  } else {
    goalModalTitle.textContent = "添加目标";
    goalSubmitButton.textContent = "添加目标";
  }

  goalModal.classList.remove("hidden");
  goalModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  goalTitleInput.focus();
}

function closeGoalModal() {
  goalModal.classList.add("hidden");
  goalModal.setAttribute("aria-hidden", "true");
  goalForm.reset();
  goalIdInput.value = "";
  document.body.style.overflow = anyModalOpen() ? "hidden" : "";
}

function handleGoalSubmit(event) {
  event.preventDefault();

  const title = goalTitleInput.value.trim();
  const targetDate = goalDateInput.value;
  if (!title || !targetDate) {
    return;
  }

  if (goalModalMode === "edit" && goalIdInput.value) {
    goals = goals.map((goal) =>
      goal.id === goalIdInput.value ? { ...goal, title, targetDate } : goal
    );
  } else {
    goals.unshift({
      id: createId("goal"),
      title,
      targetDate,
      createdAt: new Date().toISOString(),
    });
  }

  closeGoalModal();
  render();
}

function deleteGoal(goalId) {
  goals = goals.filter((goal) => goal.id !== goalId);
  render();
}

function openProjectModal(mode, projectId = "") {
  projectModalMode = mode;
  projectForm.reset();
  projectIdInput.value = "";

  if (mode === "edit") {
    const project = getProjectById(projectId);
    if (!project) {
      return;
    }

    projectModalTitle.textContent = "编辑项目";
    projectSubmitButton.textContent = "保存项目";
    projectIdInput.value = project.id;
    projectTitleInput.value = project.title;
    projectOwnerInput.value = project.owner;
    projectObjectiveInput.value = project.objective;
    projectStartDateInput.value = project.startDate;
    projectDueDateInput.value = project.dueDate;
  } else {
    projectModalTitle.textContent = "添加项目";
    projectSubmitButton.textContent = "添加项目";
  }

  projectModal.classList.remove("hidden");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  projectTitleInput.focus();
}

function closeProjectModal() {
  projectModal.classList.add("hidden");
  projectModal.setAttribute("aria-hidden", "true");
  projectForm.reset();
  projectIdInput.value = "";
  document.body.style.overflow = anyModalOpen() ? "hidden" : "";
}

function handleProjectSubmit(event) {
  event.preventDefault();

  const formData = buildProjectFromForm();
  if (!formData.title) {
    projectTitleInput.focus();
    return;
  }

  const now = new Date().toISOString();
  if (projectModalMode === "edit" && projectIdInput.value) {
    projects = projects.map((project) =>
      project.id === projectIdInput.value ? { ...project, ...formData, updatedAt: now } : project
    );
  } else {
    const project = {
      id: createId("project"),
      ...formData,
      createdAt: now,
      updatedAt: now,
    };
    projects.unshift(project);
    projectState.selectedProjectId = project.id;
  }

  closeProjectModal();
  render();
}

function selectProject(projectId) {
  projectState.selectedProjectId = projectId;
  render();
}

function collapseProjectDetail() {
  projectState.selectedProjectId = "";
  render();
}

function deleteProject(projectId) {
  const project = getProjectById(projectId);
  if (!project) {
    return;
  }

  const confirmed = window.confirm(`删除项目“${project.title}”？项目任务和相关完成记录也会删除。`);
  if (!confirmed) {
    return;
  }

  projects = projects.filter((item) => item.id !== projectId);
  projectTasks = projectTasks.filter((task) => task.projectId !== projectId);
  completionHistory = completionHistory.filter(
    (record) => !(record.sourceType === "project" && record.projectId === projectId)
  );

  if (projectState.selectedProjectId === projectId) {
    projectState.selectedProjectId = "";
  }

  render();
}

function openTaskModal(mode, taskId = "", context = { sourceType: "daily", projectId: "" }) {
  taskModalMode = mode;
  taskModalContext = {
    sourceType: context.sourceType === "project" ? "project" : "daily",
    projectId: context.sourceType === "project" ? context.projectId || "" : "",
  };
  taskForm.reset();
  taskIdInput.value = "";
  taskSourceTypeInput.value = taskModalContext.sourceType;
  taskProjectIdInput.value = taskModalContext.projectId;

  if (mode === "edit") {
    const taskCollection = taskModalContext.sourceType === "project" ? projectTasks : tasks;
    const task = taskCollection.find((item) => item.id === taskId);
    if (!task) {
      return;
    }

    taskModalTitle.textContent = taskModalContext.sourceType === "project" ? "编辑项目任务" : "编辑任务";
    taskSubmitButton.textContent = "保存任务";
    taskIdInput.value = task.id;
    taskTitleInput.value = task.title;
    taskOwnerInput.value = task.owner;
    taskCriteriaInput.value = task.completionCriteria;
    taskStartDateInput.value = task.startDate;
    taskDueDateInput.value = task.dueDate;
    taskProgressInput.value = task.progressNote;
    taskDirectoryInput.value = task.directoryPath;
  } else {
    taskModalTitle.textContent = taskModalContext.sourceType === "project" ? "添加项目任务" : "添加任务";
    taskSubmitButton.textContent = "添加任务";
  }

  taskModal.classList.remove("hidden");
  taskModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  taskTitleInput.focus();
}

function closeTaskModal() {
  taskModal.classList.add("hidden");
  taskModal.setAttribute("aria-hidden", "true");
  taskForm.reset();
  taskIdInput.value = "";
  taskSourceTypeInput.value = "daily";
  taskProjectIdInput.value = "";
  taskModalContext = { sourceType: "daily", projectId: "" };
  document.body.style.overflow = anyModalOpen() ? "hidden" : "";
}

function handleTaskSubmit(event) {
  event.preventDefault();

  const formData = buildTaskFromForm();
  if (!formData.title) {
    taskTitleInput.focus();
    return;
  }

  const isProjectTask = taskModalContext.sourceType === "project" && taskModalContext.projectId;
  const targetProject = isProjectTask ? getProjectById(taskModalContext.projectId) : null;
  if (isProjectTask && !targetProject) {
    closeTaskModal();
    return;
  }

  if (taskModalMode === "edit" && taskIdInput.value) {
    const updater = (task) => {
      if (task.id !== taskIdInput.value) {
        return task;
      }

      const updatedTask = {
        ...task,
        ...formData,
      };

      if (updatedTask.completed && updatedTask.completedAt) {
        upsertHistoryRecord(updatedTask, {
          sourceType: isProjectTask ? "project" : "daily",
          projectId: isProjectTask ? taskModalContext.projectId : "",
        });
      }

      return updatedTask;
    };

    if (isProjectTask) {
      projectTasks = projectTasks.map(updater);
      touchProject(taskModalContext.projectId);
    } else {
      tasks = tasks.map(updater);
    }
  } else {
    const nextTask = {
      id: createId("task"),
      ...formData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: "",
    };

    if (isProjectTask) {
      projectTasks.unshift({
        ...nextTask,
        projectId: taskModalContext.projectId,
      });
      touchProject(taskModalContext.projectId);
    } else {
      tasks.unshift(nextTask);
    }
  }

  closeTaskModal();
  render();
}

function deleteTask(taskId, context = { sourceType: "daily", projectId: "" }) {
  const isProjectTask = context.sourceType === "project";
  if (isProjectTask) {
    projectTasks = projectTasks.filter((task) => task.id !== taskId);
    completionHistory = completionHistory.filter(
      (record) =>
        !(
          record.taskId === taskId &&
          record.sourceType === "project" &&
          record.projectId === context.projectId
        )
    );
    touchProject(context.projectId);
  } else {
    tasks = tasks.filter((task) => task.id !== taskId);
    completionHistory = completionHistory.filter(
      (record) => !(record.taskId === taskId && record.sourceType !== "project")
    );
  }

  if (taskIdInput.value === taskId) {
    closeTaskModal();
  }
  render();
}

function removeHistoryRecord(taskId, context = { sourceType: "daily", projectId: "" }) {
  completionHistory = completionHistory.filter((record) => {
    if (context.sourceType === "project") {
      return !(record.taskId === taskId && record.sourceType === "project" && record.projectId === context.projectId);
    }

    return !(record.taskId === taskId && record.sourceType !== "project");
  });
}

function updateTaskStatus(taskId, completed, context = { sourceType: "daily", projectId: "" }) {
  const isProjectTask = context.sourceType === "project";
  const updater = (task) => {
    if (task.id !== taskId) {
      return task;
    }

    if (completed) {
      const completedAt = new Date().toISOString();
      const updatedTask = { ...task, completed: true, completedAt };
      upsertHistoryRecord(updatedTask, context);
      return updatedTask;
    }

    removeHistoryRecord(taskId, context);
    return { ...task, completed: false, completedAt: "" };
  };

  if (isProjectTask) {
    projectTasks = projectTasks.map(updater);
    touchProject(context.projectId);
  } else {
    tasks = tasks.map(updater);
  }

  render();
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  render();
}

function upsertHistoryRecord(task, context = { sourceType: "daily", projectId: "" }) {
  const project = context.sourceType === "project" ? getProjectById(context.projectId) : null;
  const record = {
    taskId: task.id,
    title: task.title,
    owner: task.owner,
    completionCriteria: task.completionCriteria,
    startDate: task.startDate,
    dueDate: task.dueDate,
    progressNote: task.progressNote,
    directoryPath: task.directoryPath,
    completedAt: task.completedAt,
    completedDateKey: toDateKey(new Date(task.completedAt)),
    sourceType: context.sourceType === "project" ? "project" : "daily",
    projectId: context.sourceType === "project" ? context.projectId : "",
    projectTitle: project ? project.title : "",
  };

  const existingIndex = completionHistory.findIndex(
    (item) =>
      item.taskId === task.id &&
      item.sourceType === record.sourceType &&
      item.projectId === record.projectId
  );
  if (existingIndex >= 0) {
    completionHistory[existingIndex] = record;
  } else {
    completionHistory.unshift(record);
  }
}

function ensureHistoryConsistency() {
  tasks.forEach((task) => {
    if (task.completed && task.completedAt) {
      upsertHistoryRecord(task, { sourceType: "daily", projectId: "" });
    }
  });

  projectTasks.forEach((task) => {
    if (task.completed && task.completedAt) {
      upsertHistoryRecord(task, { sourceType: "project", projectId: task.projectId });
    }
  });
}

function getHistoryMap() {
  return completionHistory.reduce((map, record) => {
    if (!map[record.completedDateKey]) {
      map[record.completedDateKey] = [];
    }

    map[record.completedDateKey].push(record);
    return map;
  }, {});
}

function toggleCalendarExpanded() {
  calendarState.expanded = !calendarState.expanded;
  renderCalendarVisibility();
  saveAll();
}

function shiftCalendarMonth(offset) {
  const nextDate = new Date(calendarState.viewYear, calendarState.viewMonth + offset, 1);
  calendarState.viewYear = nextDate.getFullYear();
  calendarState.viewMonth = nextDate.getMonth();
  renderCalendar();
  saveAll();
}

function selectCalendarDate(dateKey, year, month) {
  calendarState.selectedDate = dateKey;
  calendarState.viewYear = year;
  calendarState.viewMonth = month;
  renderCalendar();
  saveAll();
}

function renderCalendarVisibility() {
  calendarBody.classList.toggle("hidden", !calendarState.expanded);
  calendarToggle.setAttribute("aria-expanded", String(calendarState.expanded));
  calendarToggleIcon.classList.toggle("collapsed", !calendarState.expanded);
}

function renderCalendar() {
  renderCalendarVisibility();
  calendarGrid.innerHTML = "";
  calendarMonthLabel.textContent = formatMonthLabel(calendarState.viewYear, calendarState.viewMonth);

  const historyMap = getHistoryMap();
  const monthStart = new Date(calendarState.viewYear, calendarState.viewMonth, 1);
  const startOffset = (monthStart.getDay() + 6) % 7;
  const gridStart = new Date(calendarState.viewYear, calendarState.viewMonth, 1 - startOffset);
  const todayKey = toDateKey(new Date());

  for (let index = 0; index < 42; index += 1) {
    const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);
    const dateKey = toDateKey(date);
    const count = historyMap[dateKey]?.length ?? 0;
    const isOtherMonth = date.getMonth() !== monthStart.getMonth();

    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-day";
    button.dataset.dateKey = dateKey;
    button.dataset.year = String(date.getFullYear());
    button.dataset.month = String(date.getMonth());
    button.setAttribute("role", "gridcell");

    if (isOtherMonth) {
      button.classList.add("other-month");
    }
    if (dateKey === todayKey) {
      button.classList.add("today");
    }
    if (dateKey === calendarState.selectedDate) {
      button.classList.add("selected");
    }

    const number = document.createElement("span");
    number.className = "calendar-day-number";
    number.textContent = String(date.getDate());

    const meta = document.createElement("span");
    meta.className = "calendar-day-meta";

    const label = document.createElement("span");
    label.textContent = count > 0 ? "已完成" : "无记录";
    meta.appendChild(label);

    if (count > 0) {
      const badge = document.createElement("span");
      badge.className = "calendar-day-count";
      badge.textContent = String(count);
      meta.appendChild(badge);
    }

    button.append(number, meta);
    calendarGrid.appendChild(button);
  }

  renderHistory();
}

function renderHistory() {
  const historyMap = getHistoryMap();
  const records = [...(historyMap[calendarState.selectedDate] ?? [])].sort((a, b) =>
    b.completedAt.localeCompare(a.completedAt)
  );

  historyDateLabel.textContent = formatDateKeyLabel(calendarState.selectedDate);
  historyList.innerHTML = "";
  historyEmptyState.classList.toggle("hidden", records.length > 0);

  records.forEach((record) => {
    const item = document.createElement("li");
    item.className = "history-item";

    const title = document.createElement("h4");
    title.textContent = record.title;

    const meta = document.createElement("p");
    meta.className = "history-meta";
    const sourceLabel =
      record.sourceType === "project" && record.projectTitle ? `项目：${record.projectTitle}` : "日常任务";
    meta.textContent = `完成时间：${formatDateTime(record.completedAt)} | 来源：${sourceLabel}`;

    const details = document.createElement("p");
    details.className = "history-meta";
    details.textContent = `对接人：${record.owner || "未填写"} | 完成标准：${
      record.completionCriteria || "未填写"
    } | 进度：${record.progressNote || "未填写"} | 时间：${formatDateRange(
      record.startDate,
      record.dueDate
    )}`;

    item.append(title, meta, details);
    historyList.appendChild(item);
  });
}

function renderGoals() {
  goalList.innerHTML = "";
  goalEmptyState.classList.toggle("hidden", goals.length > 0);

  const sortedGoals = [...goals].sort((a, b) => a.targetDate.localeCompare(b.targetDate));
  sortedGoals.forEach((goal) => {
    const item = document.createElement("li");
    item.className = "goal-item";

    const content = document.createElement("div");
    content.className = "goal-meta";

    const line = document.createElement("div");
    line.className = "goal-line";

    const title = document.createElement("span");
    title.className = "goal-title-text";
    title.textContent = goal.title;

    const dividerOne = document.createElement("span");
    dividerOne.className = "goal-divider";
    dividerOne.textContent = "|";

    const date = document.createElement("span");
    date.textContent = goal.targetDate;

    const dividerTwo = document.createElement("span");
    dividerTwo.className = "goal-divider";
    dividerTwo.textContent = "|";

    const countdown = document.createElement("span");
    countdown.textContent = formatGoalCountdown(goal.targetDate);

    line.append(title, dividerOne, date, dividerTwo, countdown);
    content.appendChild(line);

    const actions = document.createElement("div");
    actions.className = "goal-actions";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "edit-pen-button";
    editButton.textContent = "✎";
    editButton.title = "编辑目标";
    editButton.setAttribute("aria-label", `编辑目标“${goal.title}”`);
    editButton.dataset.action = "edit-goal";
    editButton.dataset.goalId = goal.id;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "goal-delete-button";
    deleteButton.textContent = "删除";
    deleteButton.dataset.action = "delete-goal";
    deleteButton.dataset.goalId = goal.id;

    actions.append(editButton, deleteButton);
    item.append(content, actions);
    goalList.appendChild(item);
  });
}

function renderTaskCounts() {
  const completed = tasks.filter((task) => task.completed).length;
  totalCount.textContent = String(tasks.length);
  completedCount.textContent = String(completed);
  pendingCount.textContent = String(tasks.length - completed);
}

function createMetaBlock(label, value) {
  const block = document.createElement("div");
  block.className = "task-meta-block";

  const title = document.createElement("span");
  title.textContent = label;

  const content = document.createElement("p");
  content.textContent = value;

  block.append(title, content);
  return block;
}

function renderTaskList(taskItems, listElement, emptyStateElement, context = { sourceType: "daily", projectId: "" }) {
  listElement.innerHTML = "";
  emptyStateElement.classList.toggle("hidden", taskItems.length > 0);

  taskItems.forEach((task) => {
    const item = document.createElement("li");
    item.className = "task-item";
    item.dataset.taskId = task.id;
    item.dataset.sourceType = context.sourceType;
    item.dataset.projectId = context.projectId || "";

    const checkboxWrap = document.createElement("div");
    checkboxWrap.className = "task-checkbox-wrap";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.dataset.taskId = task.id;
    checkbox.dataset.sourceType = context.sourceType;
    checkbox.dataset.projectId = context.projectId || "";
    checkbox.setAttribute("aria-label", `标记任务“${task.title}”是否完成`);
    checkboxWrap.appendChild(checkbox);

    const main = document.createElement("div");
    main.className = `task-main${task.completed ? " completed" : ""}`;

    const titleLine = document.createElement("div");
    titleLine.className = "task-title-line";

    const title = document.createElement("h3");
    title.textContent = task.title;

    const stateTag = document.createElement("span");
    stateTag.className = task.completed ? "task-completed-tag" : "task-open-tag";
    stateTag.textContent = task.completed ? "已完成" : "未完成";
    titleLine.append(title, stateTag);

    const metaGrid = document.createElement("div");
    metaGrid.className = "task-meta-grid";
    metaGrid.append(
      createMetaBlock("任务内容", task.title),
      createMetaBlock("对接人", task.owner || "未填写"),
      createMetaBlock("完成标准", task.completionCriteria || "未填写"),
      createMetaBlock("开始日期", task.startDate || "未设置"),
      createMetaBlock("截止日期", task.dueDate || "未设置"),
      createMetaBlock("剩余时间", formatDueRemaining(task.dueDate)),
      createMetaBlock("当前进度", task.progressNote || "未填写"),
      createMetaBlock("任务目录地址", task.directoryPath || "未填写"),
      createMetaBlock("创建时间", formatDateTime(task.createdAt)),
      createMetaBlock("完成时间", task.completedAt ? formatDateTime(task.completedAt) : "未完成")
    );

    main.append(titleLine, metaGrid);

    const actions = document.createElement("div");
    actions.className = "task-actions-row";

    if (!task.completed) {
      const editButton = document.createElement("button");
      editButton.type = "button";
      editButton.className = "edit-pen-button";
      editButton.textContent = "✎";
      editButton.title = "编辑任务";
      editButton.setAttribute("aria-label", `编辑任务“${task.title}”`);
      editButton.dataset.action = "edit-task";
      editButton.dataset.taskId = task.id;
      editButton.dataset.sourceType = context.sourceType;
      editButton.dataset.projectId = context.projectId || "";
      actions.appendChild(editButton);
    }

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "task-delete-button";
    deleteButton.textContent = "删除";
    deleteButton.dataset.action = "delete-task";
    deleteButton.dataset.taskId = task.id;
    deleteButton.dataset.sourceType = context.sourceType;
    deleteButton.dataset.projectId = context.projectId || "";
    actions.appendChild(deleteButton);

    item.append(checkboxWrap, main, actions);
    listElement.appendChild(item);
  });
}

function renderTasks() {
  renderTaskList(tasks, taskList, taskEmptyState, { sourceType: "daily", projectId: "" });
}

function renderProjectCounts() {
  projectTotalCount.textContent = String(projects.length);
  projectActiveCount.textContent = String(getActiveProjectCount());
  projectRiskCount.textContent = String(getRiskProjectCount());
}

function createProjectHealthTag(stats) {
  const tag = document.createElement("span");
  tag.className = `project-health-tag ${stats.status}`;
  tag.textContent = stats.statusLabel;
  return tag;
}

function renderProjects() {
  renderProjectCounts();
  projectList.innerHTML = "";
  projectEmptyState.classList.toggle("hidden", projects.length > 0);

  if (projectState.selectedProjectId && !getSelectedProject()) {
    projectState.selectedProjectId = "";
  }

  const sortedProjects = [...projects].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  sortedProjects.forEach((project) => {
    const stats = getProjectStats(project);
    const card = document.createElement("article");
    card.className = `project-card ${project.id === projectState.selectedProjectId ? "selected" : ""}`;
    card.dataset.action = "select-project";
    card.dataset.projectId = project.id;
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `查看项目“${project.title}”`);

    const header = document.createElement("div");
    header.className = "project-card-header";

    const title = document.createElement("h3");
    title.textContent = project.title;
    header.append(title, createProjectHealthTag(stats));

    const objective = document.createElement("p");
    objective.className = "project-card-objective";
    objective.textContent = project.objective || "未填写项目目标";

    const meta = document.createElement("div");
    meta.className = "project-card-meta";
    meta.append(
      createMetaBlock("负责人", project.owner || "未填写"),
      createMetaBlock("周期", formatDateRange(project.startDate, project.dueDate)),
      createMetaBlock("剩余", stats.remainingLabel),
      createMetaBlock("任务", `${stats.completed}/${stats.total} 已完成`)
    );

    const progress = document.createElement("div");
    progress.className = "project-card-progress";
    const progressBar = document.createElement("span");
    progressBar.style.width = `${stats.progress}%`;
    progress.appendChild(progressBar);

    const footer = document.createElement("div");
    footer.className = "project-card-footer";

    const progressLabel = document.createElement("strong");
    progressLabel.textContent = `进度 ${stats.progress}%`;

    const actions = document.createElement("div");
    actions.className = "project-card-actions";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "edit-pen-button";
    editButton.textContent = "✎";
    editButton.title = "编辑项目";
    editButton.setAttribute("aria-label", `编辑项目“${project.title}”`);
    editButton.dataset.action = "edit-project";
    editButton.dataset.projectId = project.id;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "task-delete-button";
    deleteButton.textContent = "删除";
    deleteButton.dataset.action = "delete-project";
    deleteButton.dataset.projectId = project.id;

    actions.append(editButton, deleteButton);
    footer.append(progressLabel, actions);

    card.append(header, objective, meta, progress, footer);
    projectList.appendChild(card);
  });

  renderProjectDetail();
}

function renderProjectDetail() {
  const project = getSelectedProject();
  const hasProject = Boolean(project);
  projectDetail.classList.toggle("hidden", !hasProject);
  projectDetailEmptyState.classList.toggle("hidden", hasProject || projects.length === 0);

  if (!project) {
    renderProjectGanttChart(null);
    return;
  }

  const stats = getProjectStats(project);
  projectDetailTitle.textContent = project.title;
  projectDetailObjective.textContent = project.objective || "未填写项目目标";
  projectDetailStatus.className = `project-health-tag ${stats.status}`;
  projectDetailStatus.textContent = stats.statusLabel;
  projectDetailOwner.textContent = project.owner || "未填写";
  projectDetailDates.textContent = formatDateRange(project.startDate, project.dueDate);
  projectDetailRemaining.textContent = stats.remainingLabel;
  projectDetailProgressLabel.textContent = `${stats.progress}%`;
  projectDetailProgressBar.style.width = `${stats.progress}%`;
  projectDetailTaskSummary.textContent = `${stats.total} 个任务，${stats.completed} 个已完成，${stats.pending} 个推进中`;

  projectTaskTotalCount.textContent = String(stats.total);
  projectTaskCompletedCount.textContent = String(stats.completed);
  projectTaskPendingCount.textContent = String(stats.pending);
  renderTaskList(getProjectTasks(project.id), projectTaskList, projectTaskEmptyState, {
    sourceType: "project",
    projectId: project.id,
  });
  renderProjectGanttChart(project);
}

function getTaskTimelineStart(task) {
  const explicitStartDate = parseDateInput(task.startDate);
  if (explicitStartDate) {
    return startOfDay(explicitStartDate);
  }

  const createdDate = new Date(task.createdAt);
  if (Number.isNaN(createdDate.getTime())) {
    return startOfDay(new Date());
  }

  return startOfDay(createdDate);
}

function getTaskTimelineEnd(task, startDate) {
  const dueDate = parseDateInput(task.dueDate);
  if (dueDate) {
    return startOfDay(dueDate);
  }

  if (task.completedAt) {
    const completedDate = new Date(task.completedAt);
    if (!Number.isNaN(completedDate.getTime())) {
      return startOfDay(completedDate);
    }
  }

  return startDate;
}

function getGanttColor(taskId) {
  const hash = taskId.split("").reduce((value, character) => {
    return value + character.charCodeAt(0);
  }, 0);

  return GANTT_COLORS[hash % GANTT_COLORS.length];
}

function buildGanttItems(taskItems) {
  return taskItems
    .map((task) => {
      const rawStart = getTaskTimelineStart(task);
      const rawEnd = getTaskTimelineEnd(task, rawStart);
      const start = rawEnd.getTime() < rawStart.getTime() ? rawEnd : rawStart;
      const end = rawEnd.getTime() < rawStart.getTime() ? rawStart : rawEnd;

      return {
        task,
        start,
        end,
        color: getGanttColor(task.id),
      };
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime() || a.end.getTime() - b.end.getTime());
}

function getGanttScaleSetting(scale) {
  return GANTT_SCALE_SETTINGS[scale] || GANTT_SCALE_SETTINGS.day;
}

function getGanttAxisStart(date, scale) {
  if (scale === "week") {
    return startOfWeek(date);
  }

  if (scale === "month") {
    return startOfMonth(date);
  }

  return startOfDay(date);
}

function getGanttAxisEnd(date, scale) {
  if (scale === "week") {
    return endOfWeek(date);
  }

  if (scale === "month") {
    return endOfMonth(date);
  }

  return startOfDay(date);
}

function buildGanttUnits(chartStart, chartEnd, scale) {
  const units = [];
  let cursor = new Date(chartStart);
  let guard = 0;

  while (cursor.getTime() <= chartEnd.getTime() && guard < 1500) {
    units.push(new Date(cursor));

    if (scale === "week") {
      cursor = addDays(cursor, 7);
    } else if (scale === "month") {
      cursor = addMonths(cursor, 1);
    } else {
      cursor = addDays(cursor, 1);
    }

    guard += 1;
  }

  return units;
}

function formatGanttUnitLabel(date, scale) {
  if (scale === "week") {
    return `${formatShortDateLabel(date)} 周`;
  }

  if (scale === "month") {
    return formatMonthShortLabel(date);
  }

  return formatShortDateLabel(date);
}

function getGanttLeftPercent(date, chartStart, totalDays) {
  const offset = Math.max(0, Math.min(totalDays, getDayDifference(chartStart, date)));
  return (offset / Math.max(1, totalDays)) * 100;
}

function createGanttTick(unitDate, totalDays, chartStart, scale, extraClass = "") {
  const tick = document.createElement("span");
  tick.className = `gantt-tick${extraClass ? ` ${extraClass}` : ""}`;
  tick.textContent = formatGanttUnitLabel(unitDate, scale);
  tick.style.left = `${getGanttLeftPercent(unitDate, chartStart, totalDays)}%`;
  return tick;
}

function applyTodayMarker(track, todayOffset, totalDays) {
  if (todayOffset < 0 || todayOffset > totalDays) {
    return;
  }

  track.classList.add("has-today");
  track.style.setProperty("--today-left", `${(todayOffset / Math.max(1, totalDays)) * 100}%`);
}

function renderGanttScaleControls(buttons, scale, attributeName) {
  buttons.forEach((button) => {
    const isActive = button.dataset[attributeName] === scale;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function getTaskDeadlineLabel(task) {
  return task.dueDate ? `截止 ${task.dueDate}` : "未设截止";
}

function renderGanttChart({
  chartElement,
  emptyStateElement,
  windowLabelElement,
  scaleButtons,
  scale,
  scaleAttributeName,
  taskItems,
  axisLabelText = "任务",
  emptyLabel = "暂无任务",
}) {
  if (!chartElement || !emptyStateElement || !windowLabelElement) {
    return;
  }

  renderGanttScaleControls(scaleButtons, scale, scaleAttributeName);

  const ganttItems = buildGanttItems(taskItems);
  chartElement.innerHTML = "";
  emptyStateElement.classList.toggle("hidden", ganttItems.length > 0);
  chartElement.classList.toggle("hidden", ganttItems.length === 0);
  chartElement.dataset.ganttScale = scale;

  if (ganttItems.length === 0) {
    windowLabelElement.textContent = emptyLabel;
    return;
  }

  const today = startOfDay(new Date());
  const earliestTaskDate = ganttItems.reduce((earliest, item) => {
    return item.start.getTime() < earliest.getTime() ? item.start : earliest;
  }, ganttItems[0].start);
  const latestTaskDate = ganttItems.reduce((latest, item) => {
    return item.end.getTime() > latest.getTime() ? item.end : latest;
  }, ganttItems[0].end);
  const rawChartStart = earliestTaskDate.getTime() < today.getTime() ? earliestTaskDate : today;
  const rawChartEnd = latestTaskDate.getTime() > today.getTime() ? latestTaskDate : today;
  const chartStart = getGanttAxisStart(rawChartStart, scale);
  const chartEnd = getGanttAxisEnd(rawChartEnd, scale);
  const totalDays = Math.max(1, getDayDifference(chartStart, chartEnd) + 1);
  const scaleSetting = getGanttScaleSetting(scale);
  const dayWidth = scaleSetting.dayWidth;
  const trackWidth = Math.max(560, totalDays * dayWidth);
  const todayOffset = getDayDifference(chartStart, today);
  const units = buildGanttUnits(chartStart, chartEnd, scale);

  chartElement.style.setProperty("--gantt-track-width", `${trackWidth}px`);
  chartElement.style.setProperty("--gantt-unit-width", `${scaleSetting.unitWidth}px`);
  windowLabelElement.textContent = `${scaleSetting.label} | ${toDateKey(chartStart)} - ${toDateKey(chartEnd)}`;

  const axis = document.createElement("div");
  axis.className = "gantt-axis";

  const axisLabel = document.createElement("span");
  axisLabel.className = "gantt-axis-label";
  axisLabel.textContent = axisLabelText;

  const axisTrack = document.createElement("div");
  axisTrack.className = "gantt-axis-track";
  applyTodayMarker(axisTrack, todayOffset, totalDays);

  const unitDateKeys = new Set(units.map((unitDate) => toDateKey(unitDate)));
  units.forEach((unitDate, index) => {
    axisTrack.appendChild(createGanttTick(unitDate, totalDays, chartStart, scale, index === 0 ? "start" : ""));
  });

  if (!unitDateKeys.has(toDateKey(today)) && todayOffset >= 0 && todayOffset <= totalDays) {
    axisTrack.appendChild(createGanttTick(today, totalDays, chartStart, scale, "today"));
  }

  axis.append(axisLabel, axisTrack);
  chartElement.appendChild(axis);

  ganttItems.forEach(({ task, start, end, color }) => {
    const row = document.createElement("article");
    row.className = `gantt-row${task.completed ? " completed" : ""}`;

    const label = document.createElement("div");
    label.className = "gantt-row-label";

    const dot = document.createElement("span");
    dot.className = "gantt-color-dot";
    dot.style.backgroundColor = color;

    const name = document.createElement("span");
    name.className = "gantt-task-name";
    name.textContent = task.title;

    const meta = document.createElement("span");
    meta.className = "gantt-task-meta";
    meta.textContent = `${toDateKey(start)} 至 ${toDateKey(end)} | ${task.dueDate ? "截止 " + task.dueDate : "无截止日期"}`;

    label.append(dot, name, meta);

    const track = document.createElement("div");
    track.className = "gantt-timeline";
    applyTodayMarker(track, todayOffset, totalDays);

    const startOffset = Math.max(0, getDayDifference(chartStart, start));
    const endOffset = Math.max(startOffset, getDayDifference(chartStart, end));
    const duration = Math.max(1, endOffset - startOffset + 1);
    const deadlineOffset = Math.min(totalDays, endOffset + 1);

    const bar = document.createElement("div");
    bar.className = `gantt-bar${task.completed ? " completed" : ""}`;
    bar.style.left = `${(startOffset / Math.max(1, totalDays)) * 100}%`;
    bar.style.width = `${(duration / totalDays) * 100}%`;
    bar.style.backgroundColor = color;
    bar.title = `${task.title} | ${toDateKey(start)} 至 ${toDateKey(end)} | ${getTaskDeadlineLabel(task)}`;

    const barLabel = document.createElement("span");
    barLabel.className = "gantt-bar-label";
    barLabel.textContent = task.completed ? "已完成" : "进行中";

    const deadlineMarker = document.createElement("div");
    deadlineMarker.className = "gantt-deadline-marker";
    deadlineMarker.style.left = `${(deadlineOffset / Math.max(1, totalDays)) * 100}%`;
    if (deadlineOffset / Math.max(1, totalDays) > 0.78) {
      deadlineMarker.classList.add("near-end");
    }

    const deadlineLabel = document.createElement("span");
    deadlineLabel.className = "gantt-deadline-label";
    deadlineLabel.textContent = getTaskDeadlineLabel(task);
    deadlineMarker.appendChild(deadlineLabel);

    bar.appendChild(barLabel);
    track.append(bar, deadlineMarker);
    row.append(label, track);
    chartElement.appendChild(row);
  });
}

function renderDailyGanttChart() {
  renderGanttChart({
    chartElement: ganttChart,
    emptyStateElement: ganttEmptyState,
    windowLabelElement: ganttWindowLabel,
    scaleButtons: ganttScaleButtons,
    scale: ganttScale,
    scaleAttributeName: "ganttScale",
    taskItems: tasks,
    axisLabelText: "日常任务",
    emptyLabel: "暂无任务",
  });
}

function renderProjectGanttChart(project) {
  renderGanttChart({
    chartElement: projectGanttChart,
    emptyStateElement: projectGanttEmptyState,
    windowLabelElement: projectGanttWindowLabel,
    scaleButtons: projectGanttScaleButtons,
    scale: projectGanttScale,
    scaleAttributeName: "projectGanttScale",
    taskItems: project ? getProjectTasks(project.id) : [],
    axisLabelText: "项目任务",
    emptyLabel: project ? "暂无项目任务" : "未选择项目",
  });
}

function anyModalOpen() {
  return (
    !goalModal.classList.contains("hidden") ||
    !projectModal.classList.contains("hidden") ||
    !taskModal.classList.contains("hidden")
  );
}

function closeModalByType(type) {
  if (type === "goal") {
    closeGoalModal();
  }

  if (type === "project") {
    closeProjectModal();
  }

  if (type === "task") {
    closeTaskModal();
  }
}

function render() {
  saveAll();
  renderBoardMode();
  renderGoals();
  renderTimeModule();
  renderCalendar();
  renderDailyGanttChart();
  renderTaskCounts();
  renderTasks();
  renderProjects();
}

boardSwitchButton.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleBoardSwitchMenu();
});

boardSwitchOptions.forEach((button) => {
  button.addEventListener("click", () => {
    switchBoardMode(button.dataset.boardMode);
  });
});

todayTaskToggle.addEventListener("click", toggleTodayTaskPrompt);
todayTaskList.addEventListener("click", (event) => {
  const button = event.target.closest(".today-task-link");
  if (!button) {
    return;
  }

  jumpToTaskDetail(button.dataset.taskId, button.dataset.sourceType, button.dataset.projectId);
});

openGoalModalButton.addEventListener("click", () => openGoalModal("add"));
goalModalClose.addEventListener("click", closeGoalModal);
goalCancelButton.addEventListener("click", closeGoalModal);
goalForm.addEventListener("submit", handleGoalSubmit);

goalList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) {
    return;
  }

  const { action, goalId } = button.dataset;
  if (action === "edit-goal") {
    openGoalModal("edit", goalId);
  }

  if (action === "delete-goal") {
    deleteGoal(goalId);
  }
});

calendarToggle.addEventListener("click", toggleCalendarExpanded);
calendarPrevButton.addEventListener("click", () => shiftCalendarMonth(-1));
calendarNextButton.addEventListener("click", () => shiftCalendarMonth(1));
calendarGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".calendar-day");
  if (!button) {
    return;
  }

  selectCalendarDate(button.dataset.dateKey, Number(button.dataset.year), Number(button.dataset.month));
});

ganttScaleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextScale = button.dataset.ganttScale;
    if (!GANTT_SCALE_SETTINGS[nextScale] || nextScale === ganttScale) {
      return;
    }

    ganttScale = nextScale;
    renderDailyGanttChart();
  });
});

projectGanttScaleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextScale = button.dataset.projectGanttScale;
    if (!GANTT_SCALE_SETTINGS[nextScale] || nextScale === projectGanttScale) {
      return;
    }

    projectGanttScale = nextScale;
    renderProjectDetail();
  });
});

openProjectModalButton.addEventListener("click", () => openProjectModal("add"));
projectModalClose.addEventListener("click", closeProjectModal);
projectCancelButton.addEventListener("click", closeProjectModal);
projectForm.addEventListener("submit", handleProjectSubmit);
collapseProjectDetailButton.addEventListener("click", collapseProjectDetail);
openProjectTaskButton.addEventListener("click", () => {
  const project = getSelectedProject();
  if (!project) {
    return;
  }

  openTaskModal("add", "", { sourceType: "project", projectId: project.id });
});

projectList.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) {
    return;
  }

  const { action, projectId } = target.dataset;
  if (action === "select-project") {
    selectProject(projectId);
  }

  if (action === "edit-project") {
    openProjectModal("edit", projectId);
  }

  if (action === "delete-project") {
    deleteProject(projectId);
  }
});

projectList.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  if (event.target.closest("button")) {
    return;
  }

  const card = event.target.closest(".project-card");
  if (!card) {
    return;
  }

  event.preventDefault();
  selectProject(card.dataset.projectId);
});

openTaskModalButton.addEventListener("click", () => openTaskModal("add"));
taskModalClose.addEventListener("click", closeTaskModal);
taskCancelButton.addEventListener("click", closeTaskModal);
taskForm.addEventListener("submit", handleTaskSubmit);
clearCompletedButton.addEventListener("click", clearCompletedTasks);

taskList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) {
    return;
  }

  const { action, taskId } = button.dataset;
  if (action === "edit-task") {
    openTaskModal("edit", taskId, { sourceType: "daily", projectId: "" });
  }

  if (action === "delete-task") {
    deleteTask(taskId, { sourceType: "daily", projectId: "" });
  }
});

taskList.addEventListener("change", (event) => {
  const checkbox = event.target.closest(".task-checkbox");
  if (!checkbox) {
    return;
  }

  updateTaskStatus(checkbox.dataset.taskId, checkbox.checked, { sourceType: "daily", projectId: "" });
});

projectTaskList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) {
    return;
  }

  const { action, taskId, projectId } = button.dataset;
  if (action === "edit-task") {
    openTaskModal("edit", taskId, { sourceType: "project", projectId });
  }

  if (action === "delete-task") {
    deleteTask(taskId, { sourceType: "project", projectId });
  }
});

projectTaskList.addEventListener("change", (event) => {
  const checkbox = event.target.closest(".task-checkbox");
  if (!checkbox) {
    return;
  }

  updateTaskStatus(checkbox.dataset.taskId, checkbox.checked, {
    sourceType: "project",
    projectId: checkbox.dataset.projectId,
  });
});

document.addEventListener("click", (event) => {
  if (isBoardSwitchMenuOpen() && !event.target.closest(".board-switcher")) {
    closeBoardSwitchMenu();
  }

  if (calendarState.expanded && !event.target.closest(".header-calendar-widget")) {
    calendarState.expanded = false;
    renderCalendarVisibility();
    saveAll();
  }

  if (todayTaskPromptExpanded && !event.target.closest(".today-task-prompt")) {
    todayTaskPromptExpanded = false;
    renderTodayTaskPrompt();
  }

  const closeTarget = event.target.closest("[data-close-modal]");
  if (!closeTarget) {
    return;
  }

  closeModalByType(closeTarget.dataset.closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeBoardSwitchMenu();
    if (calendarState.expanded) {
      calendarState.expanded = false;
      renderCalendarVisibility();
      saveAll();
    }

    if (todayTaskPromptExpanded) {
      todayTaskPromptExpanded = false;
      renderTodayTaskPrompt();
    }

    if (!goalModal.classList.contains("hidden")) {
      closeGoalModal();
    }

    if (!projectModal.classList.contains("hidden")) {
      closeProjectModal();
    }

    if (!taskModal.classList.contains("hidden")) {
      closeTaskModal();
    }
  }
});

startClock();
render();
