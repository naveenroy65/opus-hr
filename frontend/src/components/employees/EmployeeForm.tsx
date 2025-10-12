import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Employee } from '@/types/hr';
import { mockDepartments, mockRoles } from '@/data/mockData';

interface EmployeeFormProps {
  initialData?: Employee;
  onSubmit: (data: Partial<Employee>) => void;
}

export default function EmployeeForm({ initialData, onSubmit }: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    departmentId: initialData?.departmentId || '',
    roleId: initialData?.roleId || '',
    dateOfBirth: initialData?.dateOfBirth || undefined,
    address: initialData?.address || '',
    joinDate: initialData?.joinDate || new Date(),
    salaryMonthly: initialData?.salaryMonthly || 0,
    bankAccount: initialData?.bankAccount || '',
    ifscCode: initialData?.ifscCode || '',
    employeeType: initialData?.employeeType || 'permanent',
    emergencyContact: initialData?.emergencyContact || '',
    photoUrl: initialData?.photoUrl || '',
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(
    initialData?.photoUrl || null
  );

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        handleInputChange('photoUrl', `/uploads/employees/${file.name}`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const availableRoles = mockRoles.filter(role => 
    !formData.departmentId || role.departmentId === formData.departmentId
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            required
            className="bg-white text-black"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            required
            className="bg-white text-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            className="bg-white text-black"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
            className="bg-white text-black"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="photo">Profile Photo</Label>
        <div className="flex items-center gap-4">
          {photoPreview && (
            <img 
              src={photoPreview} 
              alt="Photo preview" 
              className="photo-preview"
            />
          )}
          <div className="flex-1">
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="bg-white text-black"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Accepted formats: JPG, PNG. Max size: 3MB
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="department">Department *</Label>
          <Select 
            value={formData.departmentId} 
            onValueChange={(value) => {
              handleInputChange('departmentId', value);
              handleInputChange('roleId', ''); // Reset role when department changes
            }}
          >
            <SelectTrigger className="bg-white text-black">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {mockDepartments.map(dept => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role *</Label>
          <Select 
            value={formData.roleId} 
            onValueChange={(value) => handleInputChange('roleId', value)}
            disabled={!formData.departmentId}
          >
            <SelectTrigger className="bg-white text-black">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {availableRoles.map(role => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white text-black",
                  !formData.dateOfBirth && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dateOfBirth ? (
                  format(formData.dateOfBirth, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.dateOfBirth}
                onSelect={(date) => handleInputChange('dateOfBirth', date)}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label>Join Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-white text-black"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(formData.joinDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.joinDate}
                onSelect={(date) => handleInputChange('joinDate', date || new Date())}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="bg-white text-black"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="salary">Monthly Salary (₹) *</Label>
          <Input
            id="salary"
            type="number"
            value={formData.salaryMonthly}
            onChange={(e) => handleInputChange('salaryMonthly', Number(e.target.value))}
            required
            className="bg-white text-black"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employeeType">Employee Type *</Label>
          <Select 
            value={formData.employeeType} 
            onValueChange={(value: 'permanent' | 'contract') => handleInputChange('employeeType', value)}
          >
            <SelectTrigger className="bg-white text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="permanent">Permanent</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="emergencyContact">Emergency Contact</Label>
          <Input
            id="emergencyContact"
            value={formData.emergencyContact}
            onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
            className="bg-white text-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bankAccount">Bank Account Number</Label>
          <Input
            id="bankAccount"
            value={formData.bankAccount}
            onChange={(e) => handleInputChange('bankAccount', e.target.value)}
            className="bg-white text-black"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ifscCode">IFSC Code</Label>
          <Input
            id="ifscCode"
            value={formData.ifscCode}
            onChange={(e) => handleInputChange('ifscCode', e.target.value)}
            className="bg-white text-black"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update' : 'Create'} Employee
        </Button>
      </div>
    </form>
  );
}