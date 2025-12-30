export function getProgress(courseId) {
  const progress = JSON.parse(localStorage.getItem("progress")) || {};
  return progress[courseId] || 0;
}

export function setProgress(courseId, percent) {
  const progress = JSON.parse(localStorage.getItem("progress")) || {};
  progress[courseId] = percent;
  localStorage.setItem("progress", JSON.stringify(progress));
}
