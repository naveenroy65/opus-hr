import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Users,
  Building2,
  Calendar,
  FileText,
  DollarSign,
  BarChart3,
  User,
  LayoutDashboard,
  Settings,
} from 'lucide-react';
import { useRoleAccess } from '@/hooks/useRoleAccess';

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    requiredPermission: 'canViewDashboard' as const,
  },
  {
    title: 'Employees',
    url: '/employees',
    icon: Users,
    requiredPermission: 'canViewEmployees' as const,
  },
  {
    title: 'Departments',
    url: '/departments',
    icon: Building2,
    requiredPermission: 'canViewDepartments' as const,
  },
  {
    title: 'Attendance',
    url: '/attendance',
    icon: Calendar,
    requiredPermission: 'canViewAttendance' as const,
  },
  {
    title: 'Leave Requests',
    url: '/leave-requests',
    icon: FileText,
    requiredPermission: 'canViewLeaveRequests' as const,
  },
  {
    title: 'Payroll',
    url: '/payroll',
    icon: DollarSign,
    requiredPermission: 'canViewPayroll' as const,
  },
  {
    title: 'Reports',
    url: '/reports',
    icon: BarChart3,
    requiredPermission: 'canViewReports' as const,
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: User,
    requiredPermission: 'canViewProfile' as const,
  },
];

export default function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === 'collapsed';
  const permissions = useRoleAccess();

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' : 'hover:bg-sidebar-accent/50';

  return (
    <Sidebar className={isCollapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-sidebar-foreground">HR System</h2>
              <p className="text-xs text-sidebar-foreground/60">Management Portal</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems
                .filter((item) => permissions[item.requiredPermission])
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="mr-3 h-4 w-4" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/settings" className={getNavCls}>
                    <Settings className="mr-3 h-4 w-4" />
                    {!isCollapsed && <span>Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}