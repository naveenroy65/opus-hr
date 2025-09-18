import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon, Check, X, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { mockEmployees, mockDepartments, mockAttendance } from '@/data/mockData';
import { Attendance, AttendanceFilters } from '@/types/hr';

export default function AttendancePage() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendance, setAttendance] = useState<Attendance[]>(mockAttendance);
  const [filters, setFilters] = useState<AttendanceFilters>({
    date: new Date(),
    departmentId: '',
  });
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const filteredEmployees = mockEmployees.filter(emp => {
    if (emp.status !== 'active') return false;
    if (filters.departmentId && emp.departmentId !== filters.departmentId) return false;
    return true;
  });

  const getEmployeeAttendance = (employeeId: string, date: Date) => {
    return attendance.find(att => 
      att.employeeId === employeeId && 
      att.date.toDateString() === date.toDateString()
    );
  };

  const markAttendance = (employeeId: string, status: 'present' | 'absent' | 'leave') => {
    const existingRecord = getEmployeeAttendance(employeeId, selectedDate);
    
    if (existingRecord) {
      setAttendance(attendance.map(att =>
        att.id === existingRecord.id 
          ? { ...att, status, markedAt: new Date() }
          : att
      ));
    } else {
      const newRecord: Attendance = {
        id: `att-${Date.now()}-${employeeId}`,
        employeeId,
        date: selectedDate,
        status,
        markedBy: '1',
        markedAt: new Date(),
      };
      setAttendance([...attendance, newRecord]);
    }
  };

  const markBulkAttendance = (status: 'present' | 'absent') => {
    selectedEmployees.forEach(employeeId => {
      markAttendance(employeeId, status);
    });
    setSelectedEmployees([]);
  };

  const getDepartmentName = (departmentId: string) => {
    return mockDepartments.find(dept => dept.id === departmentId)?.name || 'Unknown';
  };

  const getAttendanceStats = () => {
    const todayAttendance = attendance.filter(att => 
      att.date.toDateString() === selectedDate.toDateString()
    );
    const present = todayAttendance.filter(att => att.status === 'present').length;
    const absent = todayAttendance.filter(att => att.status === 'absent').length;
    const onLeave = todayAttendance.filter(att => att.status === 'leave').length;
    const notMarked = filteredEmployees.length - todayAttendance.length;

    return { present, absent, onLeave, notMarked };
  };

  const stats = getAttendanceStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">
            Track and manage daily employee attendance
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-success mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Present</p>
                <p className="text-2xl font-bold text-success">{stats.present}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <X className="h-4 w-4 text-destructive mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold text-destructive">{stats.absent}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-warning mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold text-warning">{stats.onLeave}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-muted-foreground mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Not Marked</p>
                <p className="text-2xl font-bold">{stats.notMarked}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Attendance</CardTitle>
          <CardDescription>
            Mark attendance for employees on {format(selectedDate, 'PPP')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-64 justify-start text-left font-normal bg-white text-black",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date || new Date())}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            <Select 
              value={filters.departmentId || 'all'} 
              onValueChange={(value) => setFilters({ ...filters, departmentId: value === 'all' ? '' : value })}
            >
              <SelectTrigger className="w-48 bg-white text-black">
                <SelectValue placeholder="All Departments" />
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

            {selectedEmployees.length > 0 && (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => markBulkAttendance('present')}
                  className="bg-success hover:bg-success/90"
                >
                  Mark Selected Present
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => markBulkAttendance('absent')}
                >
                  Mark Selected Absent
                </Button>
              </div>
            )}
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedEmployees.length === filteredEmployees.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedEmployees(filteredEmployees.map(emp => emp.id));
                        } else {
                          setSelectedEmployees([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => {
                  const attendanceRecord = getEmployeeAttendance(employee.id, selectedDate);
                  return (
                    <TableRow key={employee.id} className="table-row-hover">
                      <TableCell>
                        <Checkbox
                          checked={selectedEmployees.includes(employee.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedEmployees([...selectedEmployees, employee.id]);
                            } else {
                              setSelectedEmployees(selectedEmployees.filter(id => id !== employee.id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {employee.firstName} {employee.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {employee.email}
                        </div>
                      </TableCell>
                      <TableCell>{getDepartmentName(employee.departmentId)}</TableCell>
                      <TableCell>
                        {attendanceRecord ? (
                          <Badge 
                            variant={
                              attendanceRecord.status === 'present' ? 'default' :
                              attendanceRecord.status === 'absent' ? 'destructive' : 'secondary'
                            }
                            className={
                              attendanceRecord.status === 'present' ? 'status-approved' :
                              attendanceRecord.status === 'absent' ? 'status-rejected' : 'status-pending'
                            }
                          >
                            {attendanceRecord.status}
                          </Badge>
                        ) : (
                          <Badge variant="outline">Not Marked</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant={attendanceRecord?.status === 'present' ? 'default' : 'outline'}
                            onClick={() => markAttendance(employee.id, 'present')}
                            className={attendanceRecord?.status === 'present' ? 'bg-success hover:bg-success/90' : ''}
                          >
                            Present
                          </Button>
                          <Button
                            size="sm"
                            variant={attendanceRecord?.status === 'absent' ? 'destructive' : 'outline'}
                            onClick={() => markAttendance(employee.id, 'absent')}
                          >
                            Absent
                          </Button>
                          <Button
                            size="sm"
                            variant={attendanceRecord?.status === 'leave' ? 'secondary' : 'outline'}
                            onClick={() => markAttendance(employee.id, 'leave')}
                          >
                            Leave
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}