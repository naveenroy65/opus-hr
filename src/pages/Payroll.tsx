import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
} from '@/components/ui/dialog';
import { DollarSign, Eye, Download, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockPayrolls, mockEmployees, mockDepartments } from '@/data/mockData';
import { Payroll } from '@/types/hr';

export default function PayrollPage() {
  const { toast } = useToast();
  const [payrolls, setPayrolls] = useState<Payroll[]>(mockPayrolls);
  const [selectedPayroll, setSelectedPayroll] = useState<Payroll | null>(null);
  const [filters, setFilters] = useState({
    year: 2024,
    month: 11,
    status: 'all',
  });

  const getEmployeeName = (employeeId: string) => {
    const employee = mockEmployees.find(emp => emp.id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown';
  };

  const getEmployeeDepartment = (employeeId: string) => {
    const employee = mockEmployees.find(emp => emp.id === employeeId);
    if (!employee) return 'Unknown';
    const department = mockDepartments.find(dept => dept.id === employee.departmentId);
    return department?.name || 'Unknown';
  };

  const filteredPayrolls = payrolls.filter(payroll => {
    if (payroll.year !== filters.year) return false;
    if (payroll.month !== filters.month) return false;
    if (filters.status !== 'all' && payroll.status !== filters.status) return false;
    return true;
  });

  const markAsPaid = (payrollId: string) => {
    setPayrolls(payrolls =>
      payrolls.map(payroll =>
        payroll.id === payrollId
          ? {
              ...payroll,
              status: 'paid' as const,
              paidAt: new Date(),
              paymentMethod: 'Bank Transfer',
              transactionId: `TXN${Date.now()}`,
            }
          : payroll
      )
    );
    toast({
      title: "Payment Processed",
      description: "The payroll has been marked as paid successfully.",
    });
  };

  const generatePayroll = () => {
    toast({
      title: "Payroll Generated",
      description: "Monthly payroll has been generated for all employees.",
    });
  };

  const exportPayroll = () => {
    toast({
      title: "Export Started",
      description: "Payroll export will be downloaded shortly.",
    });
  };

  const downloadPayslip = (employeeName: string) => {
    toast({
      title: "Download Started",
      description: `Payslip for ${employeeName} will be downloaded shortly.`,
    });
  };

  const getPayrollStats = () => {
    const total = filteredPayrolls.reduce((sum, p) => sum + p.netPay, 0);
    const paid = filteredPayrolls.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.netPay, 0);
    const pending = filteredPayrolls.filter(p => p.status === 'generated').reduce((sum, p) => sum + p.netPay, 0);
    const count = filteredPayrolls.length;
    return { total, paid, pending, count };
  };

  const stats = getPayrollStats();

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payroll</h1>
          <p className="text-muted-foreground">
            Manage employee salary payments and records
          </p>
        </div>
        <Button onClick={generatePayroll}>
          <DollarSign className="mr-2 h-4 w-4" />
          Generate Payroll
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-primary mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Payroll</p>
                <p className="text-2xl font-bold currency">₹{stats.total.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-success mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Paid</p>
                <p className="text-2xl font-bold currency">₹{stats.paid.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-warning mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold currency">₹{stats.pending.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-muted-foreground mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Employees</p>
                <p className="text-2xl font-bold">{stats.count}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payroll Records</CardTitle>
          <CardDescription>
            View and manage monthly salary payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select 
              value={filters.year.toString()} 
              onValueChange={(value) => setFilters({ ...filters, year: Number(value) })}
            >
              <SelectTrigger className="w-32 bg-white text-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>

            <Select 
              value={filters.month.toString()} 
              onValueChange={(value) => setFilters({ ...filters, month: Number(value) })}
            >
              <SelectTrigger className="w-40 bg-white text-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month.value} value={month.value.toString()}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={filters.status} 
              onValueChange={(value) => setFilters({ ...filters, status: value })}
            >
              <SelectTrigger className="w-40 bg-white text-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="generated">Generated</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={exportPayroll}>
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
                  <TableHead>Gross Pay</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayrolls.map((payroll) => (
                  <TableRow key={payroll.id} className="table-row-hover">
                    <TableCell>
                      <div className="font-medium">
                        {getEmployeeName(payroll.employeeId)}
                      </div>
                    </TableCell>
                    <TableCell>{getEmployeeDepartment(payroll.employeeId)}</TableCell>
                    <TableCell className="currency">
                      ₹{payroll.grossPay.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell className="text-destructive">
                      ₹{payroll.totalDeductions.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell className="currency font-semibold">
                      ₹{payroll.netPay.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={payroll.status === 'paid' ? 'default' : 'secondary'}
                        className={payroll.status === 'paid' ? 'status-approved' : 'status-pending'}
                      >
                        {payroll.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedPayroll(payroll)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {payroll.status === 'generated' && (
                          <Button
                            size="sm"
                            onClick={() => markAsPaid(payroll.id)}
                            className="bg-success hover:bg-success/90"
                          >
                            Mark Paid
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedPayroll && (
        <Dialog open={!!selectedPayroll} onOpenChange={() => setSelectedPayroll(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Payroll Details</DialogTitle>
              <DialogDescription>
                Detailed breakdown for {getEmployeeName(selectedPayroll.employeeId)} - 
                {months.find(m => m.value === selectedPayroll.month)?.label} {selectedPayroll.year}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Employee</label>
                  <p className="text-lg font-semibold">{getEmployeeName(selectedPayroll.employeeId)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Department</label>
                  <p className="text-lg">{getEmployeeDepartment(selectedPayroll.employeeId)}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Earnings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span>Basic Salary</span>
                    <span className="currency">₹{selectedPayroll.basic.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HRA</span>
                    <span className="currency">₹{selectedPayroll.hra.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                
                {Object.entries(selectedPayroll.allowances).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key}</span>
                    <span className="currency">₹{value.toLocaleString('en-IN')}</span>
                  </div>
                ))}

                {selectedPayroll.overtime > 0 && (
                  <div className="flex justify-between">
                    <span>Overtime</span>
                    <span className="currency">₹{selectedPayroll.overtime.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Gross Pay</span>
                  <span className="currency">₹{selectedPayroll.grossPay.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Deductions</h3>
                {Object.entries(selectedPayroll.deductions).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key}</span>
                    <span className="text-destructive">₹{value.toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total Deductions</span>
                  <span className="text-destructive">₹{selectedPayroll.totalDeductions.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Net Pay</span>
                  <span className="currency">₹{selectedPayroll.netPay.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {selectedPayroll.status === 'paid' && selectedPayroll.paidAt && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Payment Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Payment Date:</span>
                      <p>{new Date(selectedPayroll.paidAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Payment Method:</span>
                      <p>{selectedPayroll.paymentMethod}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Transaction ID:</span>
                      <p>{selectedPayroll.transactionId}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline"
                  onClick={() => downloadPayslip(getEmployeeName(selectedPayroll.employeeId))}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Payslip
                </Button>
                {selectedPayroll.status === 'generated' && (
                  <Button
                    onClick={() => {
                      markAsPaid(selectedPayroll.id);
                      setSelectedPayroll(null);
                    }}
                    className="bg-success hover:bg-success/90"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Paid
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}