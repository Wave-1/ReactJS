const API_BASE_URL = "https://localhost:7131/api/"; // Thay đổi thành URL của API thực tế
const API_ROUTES = {
  LOGIN: "Auth/Login",
  EMPLOYEE:"Employee",
  TimeAttendanceManagement: "TimeAttendanceManagement",
  SalaryBonus: "SalaryBonus",
  WorkSchedule: "WorkSchedule",
  Contact: "Contact",
  Income: "Income",
  LevelIncome: "LevelIncome"
  // Thêm các route API khác tại đây
};
// Khi đăng nhập thành công và có token
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbXBsb3llZUNvZGUiOiIxMjM0NTYiLCJFbXBsb3llZU5hbWUiOiJUQlEiLCJyb2xlIjoiZW1wbG95ZWUiLCJUb2tlbklEIjoiYjA3MWZhMzEtN2YyMy00MTVkLWI4ZjctZjEyNmRiNzMyYTcwIiwiZXhwIjoxNjkxNzMyNTUwLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTMxIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzEzMSJ9.GnKB1vJRCtXqW1pyEYyOSU7YVCZx30uoGxS4nasYWjw'; // Thay thế bằng token thực tế
// localStorage.setItem('token', token);


export const API_HEADERS = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
};

export { API_BASE_URL, API_ROUTES };
