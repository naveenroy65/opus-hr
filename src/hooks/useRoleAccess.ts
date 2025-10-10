import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/lib/auth';

interface RolePermissions {
  canViewDashboard: boolean;
  canViewEmployees: boolean;
  canManageEmployees: boolean;
  canViewDepartments: boolean;
  canManageDepartments: boolean;
  canViewAttendance: boolean;
  canManageAttendance: boolean;
  canViewLeaveRequests: boolean;
  canManageLeaveRequests: boolean;
  canViewPayroll: boolean;
  canManagePayroll: boolean;
  canViewReports: boolean;
  canViewProfile: boolean;
}

export const useRoleAccess = (): RolePermissions & { userRole: UserRole | null } => {
  const { userRole } = useAuth();

  const permissions: RolePermissions = {
    canViewDashboard: userRole !== null,
    canViewEmployees: ['admin', 'hr', 'manager'].includes(userRole || ''),
    canManageEmployees: ['admin', 'hr'].includes(userRole || ''),
    canViewDepartments: ['admin', 'hr', 'manager'].includes(userRole || ''),
    canManageDepartments: ['admin', 'hr'].includes(userRole || ''),
    canViewAttendance: userRole !== null,
    canManageAttendance: ['admin', 'hr', 'manager'].includes(userRole || ''),
    canViewLeaveRequests: userRole !== null,
    canManageLeaveRequests: ['admin', 'hr', 'manager'].includes(userRole || ''),
    canViewPayroll: ['admin', 'hr', 'manager'].includes(userRole || ''),
    canManagePayroll: ['admin', 'hr'].includes(userRole || ''),
    canViewReports: ['admin', 'hr', 'manager'].includes(userRole || ''),
    canViewProfile: userRole !== null,
  };

  return { ...permissions, userRole };
};
