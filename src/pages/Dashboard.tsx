import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, Calendar, FileText, DollarSign, TrendingUp } from 'lucide-react';
import { mockEmployees, mockDepartments, mockLeaveRequests, mockPayrolls, mockAttendance } from '@/data/mockData';

const DashboardCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend 
}: { 
  title: string; 
  value: string | number; 
  description: string; 
  icon: any; 
  trend?: string 
}) => (
  <Card className="card-hover">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
      {trend && (
        <div className="flex items-center mt-2 text-xs text-success">
          <TrendingUp className="h-3 w-3 mr-1" />
          {trend}
        </div>
      )}
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const totalEmployees = mockEmployees.length;
  const activeEmployees = mockEmployees.filter(emp => emp.status === 'active').length;
  const totalDepartments = mockDepartments.length;
  const pendingLeaves = mockLeaveRequests.filter(leave => leave.status === 'pending').length;
  const presentToday = mockAttendance.filter(att => att.status === 'present').length;
  const totalPayroll = mockPayrolls.reduce((sum, payroll) => sum + payroll.netPay, 0);

  const recentActivity = [
    { action: 'New employee added', employee: 'John Smith', time: '2 hours ago' },
    { action: 'Leave request approved', employee: 'Sarah Johnson', time: '4 hours ago' },
    { action: 'Payroll generated', employee: 'November 2024', time: '1 day ago' },
    { action: 'Department updated', employee: 'IT Department', time: '2 days ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening in your organization.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Employees"
          value={totalEmployees}
          description={`${activeEmployees} active employees`}
          icon={Users}
          trend="+2 this month"
        />
        <DashboardCard
          title="Departments"
          value={totalDepartments}
          description="Active departments"
          icon={Building2}
        />
        <DashboardCard
          title="Present Today"
          value={presentToday}
          description={`${((presentToday / activeEmployees) * 100).toFixed(0)}% attendance rate`}
          icon={Calendar}
          trend="+5% from yesterday"
        />
        <DashboardCard
          title="Pending Leaves"
          value={pendingLeaves}
          description="Awaiting approval"
          icon={FileText}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Monthly Payroll Overview</CardTitle>
            <CardDescription>
              Total payroll expenses for current period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold currency">
              ₹{totalPayroll.toLocaleString('en-IN')}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Net payment for {mockPayrolls.length} employees
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Gross Pay</span>
                <span>₹{mockPayrolls.reduce((sum, p) => sum + p.grossPay, 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Deductions</span>
                <span>₹{mockPayrolls.reduce((sum, p) => sum + p.totalDeductions, 0).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates across the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.employee}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockDepartments.map((dept) => {
                const deptEmployees = mockEmployees.filter(emp => emp.departmentId === dept.id);
                const percentage = (deptEmployees.length / totalEmployees) * 100;
                return (
                  <div key={dept.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{dept.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground w-8">
                        {deptEmployees.length}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <button className="flex items-center gap-2 p-3 text-left rounded-lg hover:bg-muted transition-colors">
              <Users className="h-4 w-4" />
              <span>Add New Employee</span>
            </button>
            <button className="flex items-center gap-2 p-3 text-left rounded-lg hover:bg-muted transition-colors">
              <Calendar className="h-4 w-4" />
              <span>Mark Attendance</span>
            </button>
            <button className="flex items-center gap-2 p-3 text-left rounded-lg hover:bg-muted transition-colors">
              <DollarSign className="h-4 w-4" />
              <span>Generate Payroll</span>
            </button>
            <button className="flex items-center gap-2 p-3 text-left rounded-lg hover:bg-muted transition-colors">
              <FileText className="h-4 w-4" />
              <span>Export Reports</span>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}