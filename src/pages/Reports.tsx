import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon, Download, FileText, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { mockEmployees, mockDepartments } from '@/data/mockData';
import { ReportFilters } from '@/types/hr';

export default function Reports() {
  const [filters, setFilters] = useState<ReportFilters>({
    fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    toDate: new Date(),
    reportType: 'combined',
    format: 'csv',
  });
  
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const reportTypes = [
    { value: 'employee', label: 'Employee Profile Report' },
    { value: 'attendance', label: 'Attendance Report' },
    { value: 'payroll', label: 'Payroll Report' },
    { value: 'leave', label: 'Leave Report' },
    { value: 'combined', label: 'Combined Report' },
  ];

  const formatOptions = [
    { value: 'csv', label: 'CSV Format' },
    { value: 'pdf', label: 'PDF Format' },
  ];

  const handleEmployeeSelection = (employeeId: string, checked: boolean) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    }
  };

  const handleDepartmentSelection = (departmentId: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartments([...selectedDepartments, departmentId]);
    } else {
      setSelectedDepartments(selectedDepartments.filter(id => id !== departmentId));
    }
  };

  const generateReport = () => {
    const reportData = {
      ...filters,
      employeeIds: selectedEmployees.length > 0 ? selectedEmployees : undefined,
      departmentIds: selectedDepartments.length > 0 ? selectedDepartments : undefined,
    };

    // In a real app, this would make an API call
    console.log('Generating report with filters:', reportData);
    
    // Simulate file download
    const fileName = `hr_report_${format(filters.fromDate, 'yyyy-MM-dd')}_to_${format(filters.toDate, 'yyyy-MM-dd')}.${filters.format}`;
    alert(`Report "${fileName}" would be downloaded in a real application.`);
  };

  const getSelectedEmployeesText = () => {
    if (selectedEmployees.length === 0) return 'All employees';
    if (selectedEmployees.length === 1) {
      const emp = mockEmployees.find(e => e.id === selectedEmployees[0]);
      return emp ? `${emp.firstName} ${emp.lastName}` : '1 employee';
    }
    return `${selectedEmployees.length} employees selected`;
  };

  const getSelectedDepartmentsText = () => {
    if (selectedDepartments.length === 0) return 'All departments';
    if (selectedDepartments.length === 1) {
      const dept = mockDepartments.find(d => d.id === selectedDepartments[0]);
      return dept?.name || '1 department';
    }
    return `${selectedDepartments.length} departments selected`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          Generate and export comprehensive HR reports
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Configuration</CardTitle>
              <CardDescription>
                Configure your report parameters and data range
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Type</label>
                  <Select 
                    value={filters.reportType} 
                    onValueChange={(value: any) => setFilters({ ...filters, reportType: value })}
                  >
                    <SelectTrigger className="bg-white text-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Export Format</label>
                  <Select 
                    value={filters.format} 
                    onValueChange={(value: any) => setFilters({ ...filters, format: value })}
                  >
                    <SelectTrigger className="bg-white text-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {formatOptions.map(format => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white text-black",
                          !filters.fromDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.fromDate ? format(filters.fromDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.fromDate}
                        onSelect={(date) => date && setFilters({ ...filters, fromDate: date })}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">To Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white text-black",
                          !filters.toDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.toDate ? format(filters.toDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.toDate}
                        onSelect={(date) => date && setFilters({ ...filters, toDate: date })}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Employees</CardTitle>
                <CardDescription>
                  Choose specific employees or leave empty for all
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {mockEmployees.filter(emp => emp.status === 'active').map((employee) => (
                    <div key={employee.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`emp-${employee.id}`}
                        checked={selectedEmployees.includes(employee.id)}
                        onCheckedChange={(checked) => 
                          handleEmployeeSelection(employee.id, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`emp-${employee.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {employee.firstName} {employee.lastName}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Departments</CardTitle>
                <CardDescription>
                  Choose specific departments or leave empty for all
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockDepartments.map((department) => (
                    <div key={department.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`dept-${department.id}`}
                        checked={selectedDepartments.includes(department.id)}
                        onCheckedChange={(checked) => 
                          handleDepartmentSelection(department.id, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`dept-${department.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {department.name}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Preview</CardTitle>
              <CardDescription>
                Review your report configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Report Type</label>
                <p className="font-medium">
                  {reportTypes.find(t => t.value === filters.reportType)?.label}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Date Range</label>
                <p className="font-medium">
                  {format(filters.fromDate, 'MMM dd, yyyy')} - {format(filters.toDate, 'MMM dd, yyyy')}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Employees</label>
                <p className="font-medium">{getSelectedEmployeesText()}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Departments</label>
                <p className="font-medium">{getSelectedDepartmentsText()}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Format</label>
                <p className="font-medium">
                  {formatOptions.find(f => f.value === filters.format)?.label}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generate Report</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={generateReport} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Generate & Download
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Reports</CardTitle>
              <CardDescription>
                Common report templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  setFilters({ ...filters, reportType: 'attendance' });
                  generateReport();
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                Monthly Attendance
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  setFilters({ ...filters, reportType: 'payroll' });
                  generateReport();
                }}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Payroll Summary
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  setFilters({ ...filters, reportType: 'leave' });
                  generateReport();
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                Leave Analytics
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  setFilters({ ...filters, reportType: 'employee' });
                  generateReport();
                }}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Department Metrics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}