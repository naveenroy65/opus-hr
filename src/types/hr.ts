export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'hr' | 'manager' | 'employee';
  lastLogin?: Date;
  createdAt: Date;
}

export interface Employee {
  id: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photoUrl?: string;
  departmentId: string;
  roleId: string;
  dateOfBirth?: Date;
  address?: string;
  joinDate: Date;
  status: 'active' | 'inactive';
  salaryMonthly: number;
  bankAccount?: string;
  ifscCode?: string;
  employeeType: 'permanent' | 'contract';
  emergencyContact?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: string;
  name: string;
  managerEmployeeId?: string;
  createdAt: Date;
}

export interface Role {
  id: string;
  departmentId: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: Date;
  status: 'present' | 'absent' | 'leave';
  markedBy: string;
  markedAt: Date;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: 'paid' | 'unpaid' | 'medical' | 'casual' | 'annual';
  fromDate: Date;
  toDate: Date;
  totalDays: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approverId?: string;
  approverComment?: string;
  attachmentUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payroll {
  id: string;
  employeeId: string;
  year: number;
  month: number;
  basic: number;
  hra: number;
  allowances: { [key: string]: number };
  deductions: { [key: string]: number };
  overtime: number;
  grossPay: number;
  totalDeductions: number;
  netPay: number;
  paidAt?: Date;
  paymentMethod?: string;
  transactionId?: string;
  status: 'generated' | 'paid';
  createdAt: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  details: any;
  timestamp: Date;
}

// Filter and search interfaces
export interface EmployeeFilters {
  search?: string;
  departmentIds?: string[];
  status?: 'active' | 'inactive' | 'all';
  roleIds?: string[];
  page?: number;
  limit?: number;
}

export interface AttendanceFilters {
  date?: Date;
  departmentId?: string;
  employeeId?: string;
  status?: 'present' | 'absent' | 'leave' | 'all';
}

export interface PayrollFilters {
  year?: number;
  month?: number;
  departmentIds?: string[];
  employeeIds?: string[];
  status?: 'generated' | 'paid' | 'all';
  page?: number;
  limit?: number;
}

export interface ReportFilters {
  employeeIds?: string[];
  departmentIds?: string[];
  fromDate: Date;
  toDate: Date;
  reportType: 'employee' | 'attendance' | 'payroll' | 'leave' | 'combined';
  format: 'csv' | 'pdf';
}