const header = document.querySelector(".site-header");
const weddingDate = new Date(2026, 8, 13);
const today = new Date();
let visibleMonth = new Date(weddingDate.getFullYear(), weddingDate.getMonth(), 1);

window.addEventListener("scroll", () => {
  header.toggleAttribute("data-scrolled", window.scrollY > 12);
});

const title = document.querySelector("[data-calendar-title]");
const grid = document.querySelector("[data-calendar-grid]");
const countdown = document.querySelector("[data-countdown]");
const prevButton = document.querySelector("[data-calendar-prev]");
const nextButton = document.querySelector("[data-calendar-next]");
const todayLabel = document.querySelector("[data-today-label]");
const monthFormatter = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" });
const fullDateFormatter = new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
const dayMs = 24 * 60 * 60 * 1000;

function sameDate(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function renderCalendar() {
  if (!grid || !title) return;

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const start = new Date(year, month, 1 - firstDay.getDay());

  title.textContent = monthFormatter.format(visibleMonth);
  grid.innerHTML = "";

  for (let index = 0; index < 42; index += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);

    const day = document.createElement("time");
    day.className = "calendar-day";
    day.dateTime = date.toISOString().slice(0, 10);
    day.textContent = date.getDate();

    if (date.getMonth() !== month) day.classList.add("is-muted");
    if (sameDate(date, today)) day.classList.add("is-today");
    if (sameDate(date, weddingDate)) day.classList.add("is-wedding");

    grid.appendChild(day);
  }
}

function renderCountdown() {
  if (!countdown) return;

  const current = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const wedding = new Date(weddingDate.getFullYear(), weddingDate.getMonth(), weddingDate.getDate());
  const days = Math.round((wedding - current) / dayMs);

  if (days > 0) {
    countdown.textContent = `${days} days from today to the wedding day.`;
  } else if (days === 0) {
    countdown.textContent = "Today is the wedding day.";
  } else {
    countdown.textContent = "The wedding day has passed.";
  }
}

if (todayLabel) {
  todayLabel.textContent = `Today: ${fullDateFormatter.format(today)}`;
}

prevButton?.addEventListener("click", () => {
  visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1);
  renderCalendar();
});

nextButton?.addEventListener("click", () => {
  visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1);
  renderCalendar();
});

renderCalendar();
renderCountdown();
