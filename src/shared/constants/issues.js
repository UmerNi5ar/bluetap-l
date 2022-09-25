export const IssueStatus = {
  SELECTED: 'ready',

  DONE: 'done',
};

export const BacklogIssueStatus = {
  UNPLANNED: 'unplanned',
  PLANNED: 'planned',
};

export const HistoryIssueStatus = {
  ARCHIVED: 'archived',
};

export const IssuePriority = {
  HIGHEST: '5',
  HIGH: '4',
  MEDIUM: '3',
  LOW: '2',
  LOWEST: '1',
};

export const IssueStatusCopy = {
  // [IssueStatus.BLOCKED]: 'Blocked',
  [IssueStatus.SELECTED]: 'To Reiview',
  // [IssueStatus.INPROGRESS]: 'In progress',
  // [IssueStatus.INQA]: 'In QA',
  [IssueStatus.DONE]: 'Reviwed',
};

export const BacklogIssueStatusCopy = {
  [BacklogIssueStatus.UNPLANNED]: 'Tasks Pending',
  [BacklogIssueStatus.PLANNED]: 'Tasks Done',
};

export const HistoryIssueStatusCopy = {
  [HistoryIssueStatus.ARCHIVED]: 'Archived',
};

export const IssuePriorityCopy = {
  [IssuePriority.HIGHEST]: 'Highest',
  [IssuePriority.HIGH]: 'High',
  [IssuePriority.MEDIUM]: 'Medium',
  [IssuePriority.LOW]: 'Low',
  [IssuePriority.LOWEST]: 'Lowest',
};
