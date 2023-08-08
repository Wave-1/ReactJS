const API_BASE_URL = "https://localhost:7131/api/"; // Thay đổi thành URL của API thực tế
const API_ROUTES = {
  LOGIN: "Auth/Login",
  EMPLOYEE:"Employee",
  TimeAttendanceManagement: "TimeAttendanceManagement",
  SalaryBonus: "SalaryBonus",
  WorkSchedule: "WorkSchedule",
  Contact: "Contact",
  // Thêm các route API khác tại đây
};

export const API_HEADERS = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
};

export { API_BASE_URL, API_ROUTES };
