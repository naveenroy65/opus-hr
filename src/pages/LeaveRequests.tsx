import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FileText, Check, X, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { mockLeaveRequests, mockEmployees } from '@/data/mockData';
import { LeaveRequest } from '@/types/hr';

export default function LeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [approvalComment, setApprovalComment] = useState('');

  const getEmployeeName = (employeeId: string) => {
    const employee = mockEmployees.find(emp => emp.id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown';
  };

  const handleApprove = (requestId: string) => {
    setLeaveRequests(requests =>
      requests.map(req =>
        req.id === requestId
          ? {
              ...req,
              status: 'approved' as const,
              approverId: '1',
              approverComment: approvalComment || 'Approved',
              updatedAt: new Date(),
            }
          : req
      )
    );
    setSelectedRequest(null);
    setApprovalComment('');
  };

  const handleReject = (requestId: string) => {
    setLeaveRequests(requests =>
      requests.map(req =>
        req.id === requestId
          ? {
              ...req,
              status: 'rejected' as const,
              approverId: '1',
              approverComment: approvalComment || 'Rejected',
              updatedAt: new Date(),
            }
          : req
      )
    );
    setSelectedRequest(null);
    setApprovalComment('');
  };

  const getStatusStats = () => {
    const pending = leaveRequests.filter(req => req.status === 'pending').length;
    const approved = leaveRequests.filter(req => req.status === 'approved').length;
    const rejected = leaveRequests.filter(req => req.status === 'rejected').length;
    return { pending, approved, rejected };
  };

  const stats = getStatusStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leave Requests</h1>
          <p className="text-muted-foreground">
            Manage employee leave applications and approvals
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-warning mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-success mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-success">{stats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <X className="h-4 w-4 text-destructive mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-destructive">{stats.rejected}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Applications</CardTitle>
          <CardDescription>
            Review and manage employee leave requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.map((request) => (
                  <TableRow key={request.id} className="table-row-hover">
                    <TableCell>
                      <div className="font-medium">
                        {getEmployeeName(request.employeeId)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {request.leaveType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{format(request.fromDate, 'MMM dd')} - {format(request.toDate, 'MMM dd, yyyy')}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{request.totalDays} days</span>
                    </TableCell>
                    <TableCell>
                      {format(request.createdAt, 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          request.status === 'approved' ? 'default' :
                          request.status === 'rejected' ? 'destructive' : 'secondary'
                        }
                        className={
                          request.status === 'approved' ? 'status-approved' :
                          request.status === 'rejected' ? 'status-rejected' : 'status-pending'
                        }
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedRequest(request)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        {request.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              className="bg-success hover:bg-success/90"
                              onClick={() => {
                                setSelectedRequest(request);
                                setTimeout(() => handleApprove(request.id), 100);
                              }}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                setSelectedRequest(request);
                                setTimeout(() => handleReject(request.id), 100);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
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

      {selectedRequest && (
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Leave Request Details</DialogTitle>
              <DialogDescription>
                Review and take action on this leave request
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Employee</label>
                  <p className="text-lg">{getEmployeeName(selectedRequest.employeeId)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Leave Type</label>
                  <p className="text-lg capitalize">{selectedRequest.leaveType}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">From Date</label>
                  <p>{format(selectedRequest.fromDate, 'PPP')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">To Date</label>
                  <p>{format(selectedRequest.toDate, 'PPP')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Total Days</label>
                  <p className="font-semibold">{selectedRequest.totalDays} days</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Reason</label>
                <p className="mt-1 p-3 bg-muted rounded-md">{selectedRequest.reason}</p>
              </div>

              {selectedRequest.attachmentUrl && (
                <div>
                  <label className="text-sm font-medium">Attachment</label>
                  <div className="mt-1">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      View Attachment
                    </Button>
                  </div>
                </div>
              )}

              {selectedRequest.status !== 'pending' && (
                <div>
                  <label className="text-sm font-medium">
                    {selectedRequest.status === 'approved' ? 'Approval' : 'Rejection'} Comment
                  </label>
                  <p className="mt-1 p-3 bg-muted rounded-md">
                    {selectedRequest.approverComment}
                  </p>
                </div>
              )}

              {selectedRequest.status === 'pending' && (
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium">Add Comment</label>
                    <Textarea
                      value={approvalComment}
                      onChange={(e) => setApprovalComment(e.target.value)}
                      placeholder="Add a comment for this decision..."
                      className="mt-1 bg-white text-black"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApprove(selectedRequest.id)}
                      className="bg-success hover:bg-success/90"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleReject(selectedRequest.id)}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}