import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Search, Filter, Edit, Trash2, Eye, Download } from 'lucide-react';
import { mockEmployees, mockDepartments, mockRoles } from '@/data/mockData';
import { Employee, EmployeeFilters } from '@/types/hr';
import EmployeeForm from '@/components/employees/EmployeeForm';

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [filters, setFilters] = useState<EmployeeFilters>({
    search: '',
    status: 'all',
    page: 1,
    limit: 10,
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = !filters.search || 
      employee.firstName.toLowerCase().includes(filters.search.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(filters.search.toLowerCase()) ||
      employee.email.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || employee.status === filters.status;
    
    const matchesDepartment = !filters.departmentIds?.length || 
      filters.departmentIds.includes(employee.departmentId);

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getDepartmentName = (departmentId: string) => {
    return mockDepartments.find(dept => dept.id === departmentId)?.name || 'Unknown';
  };

  const getRoleName = (roleId: string) => {
    return mockRoles.find(role => role.id === roleId)?.name || 'Unknown';
  };

  const handleAddEmployee = (employeeData: Partial<Employee>) => {
    const newEmployee: Employee = {
      id: `emp-${Date.now()}`,
      userId: `user-${Date.now()}`,
      firstName: employeeData.firstName!,
      lastName: employeeData.lastName!,
      email: employeeData.email!,
      phone: employeeData.phone!,
      photoUrl: employeeData.photoUrl,
      departmentId: employeeData.departmentId!,
      roleId: employeeData.roleId!,
      dateOfBirth: employeeData.dateOfBirth,
      address: employeeData.address,
      joinDate: employeeData.joinDate || new Date(),
      status: 'active',
      salaryMonthly: employeeData.salaryMonthly || 0,
      bankAccount: employeeData.bankAccount,
      ifscCode: employeeData.ifscCode,
      employeeType: employeeData.employeeType || 'permanent',
      emergencyContact: employeeData.emergencyContact,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setEmployees([...employees, newEmployee]);
    setIsAddDialogOpen(false);
  };

  const handleEditEmployee = (employeeData: Partial<Employee>) => {
    if (!editingEmployee) return;

    const updatedEmployee = {
      ...editingEmployee,
      ...employeeData,
      updatedAt: new Date(),
    };

    setEmployees(employees.map(emp => 
      emp.id === editingEmployee.id ? updatedEmployee : emp
    ));
    setEditingEmployee(null);
  };

  const handleDeleteEmployee = (employeeId: string) => {
    if (confirm('Are you sure you want to deactivate this employee?')) {
      setEmployees(employees.map(emp =>
        emp.id === employeeId ? { ...emp, status: 'inactive' as const } : emp
      ));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground">
            Manage your organization's workforce
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>
                Fill in the employee details below
              </DialogDescription>
            </DialogHeader>
            <EmployeeForm onSubmit={handleAddEmployee} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>
            Search and filter employees across all departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search employees..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10 bg-white text-black"
              />
            </div>
            <Select 
              value={filters.status} 
              onValueChange={(value: any) => setFilters({ ...filters, status: value })}
            >
              <SelectTrigger className="w-40 bg-white text-black">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select 
              value={filters.departmentIds?.[0] || 'all'} 
              onValueChange={(value) => setFilters({ 
                ...filters, 
                departmentIds: value === 'all' ? undefined : [value] 
              })}
            >
              <SelectTrigger className="w-48 bg-white text-black">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {mockDepartments.map(dept => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="table-row-hover">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={employee.photoUrl} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {employee.firstName} {employee.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getDepartmentName(employee.departmentId)}</TableCell>
                    <TableCell>{getRoleName(employee.roleId)}</TableCell>
                    <TableCell>
                      {new Date(employee.joinDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={employee.status === 'active' ? 'default' : 'secondary'}
                        className={employee.status === 'active' ? 'status-active' : 'status-inactive'}
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="currency">
                      ₹{employee.salaryMonthly.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setEditingEmployee(employee)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredEmployees.length} of {employees.length} employees
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {editingEmployee && (
        <Dialog open={!!editingEmployee} onOpenChange={() => setEditingEmployee(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Employee</DialogTitle>
              <DialogDescription>
                Update employee information
              </DialogDescription>
            </DialogHeader>
            <EmployeeForm 
              initialData={editingEmployee}
              onSubmit={handleEditEmployee}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}