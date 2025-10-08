# Complete HR Management System - Application Specification

## Project Overview
Create a comprehensive Human Resources Management System built with React, TypeScript, Tailwind CSS, and Supabase backend. This is a full-stack web application for managing employees, departments, attendance, leave requests, payroll, and generating reports.

---

## Technical Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI (shadcn/ui component library)
- **State Management**: React Query (@tanstack/react-query 5.83.0)
- **Routing**: React Router DOM 6.30.1
- **Form Handling**: React Hook Form 7.61.1 with Zod validation
- **Date Handling**: date-fns 3.6.0
- **Icons**: Lucide React 0.462.0
- **Notifications**: Sonner 1.7.4

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime (optional)

---

## Design System

### Color Palette (All HSL Format)

#### Light Mode
```css
/* Base Colors */
--background: 0 0% 100%;           /* White */
--foreground: 0 0% 0%;             /* Black */
--card: 0 0% 100%;                 /* White */
--card-foreground: 0 0% 0%;        /* Black */

/* Primary Brand - Professional Blue */
--primary: 217 91% 25%;            /* Deep Blue #0b4f8f */
--primary-foreground: 0 0% 100%;   /* White */
--primary-light: 217 91% 35%;      /* Light Blue */
--primary-dark: 217 91% 15%;       /* Dark Blue */

/* Secondary - Neutral Gray */
--secondary: 210 40% 96%;          /* Light Gray */
--secondary-foreground: 222 84% 5%; /* Dark Gray */

/* Success - Green */
--success: 142 76% 36%;            /* Green #16a34a */
--success-foreground: 0 0% 100%;   /* White */
--success-light: 142 76% 86%;      /* Light Green */

/* Warning - Orange */
--warning: 32 95% 44%;             /* Orange #ea580c */
--warning-foreground: 0 0% 100%;   /* White */
--warning-light: 32 95% 94%;       /* Light Orange */

/* Destructive - Red */
--destructive: 0 84% 60%;          /* Red #ef4444 */
--destructive-foreground: 0 0% 100%; /* White */
--destructive-light: 0 84% 95%;    /* Light Red */

/* Muted */
--muted: 210 40% 96%;              /* Light Gray */
--muted-foreground: 215 16% 47%;   /* Medium Gray */

/* Accent */
--accent: 210 40% 96%;             /* Light Gray */
--accent-foreground: 222 84% 5%;   /* Dark Gray */

/* Form Inputs - WHITE backgrounds with BLACK text */
--input: 0 0% 100%;                /* White */
--input-foreground: 0 0% 0%;       /* Black */
--border: 214 32% 91%;             /* Light Gray Border */
--ring: 217 91% 25%;               /* Primary Blue */

/* Sidebar */
--sidebar-background: 217 91% 25%;       /* Primary Blue */
--sidebar-foreground: 0 0% 100%;         /* White */
--sidebar-primary: 217 91% 35%;          /* Light Blue */
--sidebar-primary-foreground: 0 0% 100%; /* White */
--sidebar-accent: 217 91% 30%;           /* Blue Accent */
--sidebar-accent-foreground: 0 0% 100%;  /* White */
--sidebar-border: 217 91% 20%;           /* Dark Blue */
--sidebar-ring: 217 91% 40%;             /* Light Blue */

/* Status Colors */
--status-active: 142 76% 36%;      /* Green */
--status-inactive: 0 0% 64%;       /* Gray */
--status-pending: 32 95% 44%;      /* Orange */
--status-approved: 142 76% 36%;    /* Green */
--status-rejected: 0 84% 60%;      /* Red */

/* Currency Color */
--currency-color: 142 76% 36%;     /* Green */

/* Border Radius */
--radius: 0.5rem;                  /* 8px */
```

#### Dark Mode
```css
--background: 222 84% 5%;          /* Dark */
--foreground: 210 40% 98%;         /* Light */
--card: 222 84% 5%;                /* Dark */
--card-foreground: 210 40% 98%;    /* Light */
--secondary: 217 33% 18%;          /* Dark Gray */
--secondary-foreground: 210 40% 98%; /* Light */
--muted: 217 33% 18%;              /* Dark Gray */
--muted-foreground: 215 20% 65%;   /* Medium Gray */
--border: 217 33% 18%;             /* Dark Gray */
--input: 0 0% 100%;                /* White (stays white) */
--input-foreground: 0 0% 0%;       /* Black (stays black) */
--ring: 217 91% 35%;               /* Light Blue */
```

### Typography

#### Font Family
- **System Font Stack**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
- No custom fonts - uses Tailwind's default system fonts

#### Font Sizes
```
text-xs: 0.75rem (12px)
text-sm: 0.875rem (14px)
text-base: 1rem (16px)
text-lg: 1.125rem (18px)
text-xl: 1.25rem (20px)
text-2xl: 1.5rem (24px)
text-3xl: 1.875rem (30px)
```

#### Font Weights
```
font-normal: 400
font-medium: 500
font-semibold: 600
font-bold: 700
```

#### Typography Usage
- **Page Titles (H1)**: `text-3xl font-bold tracking-tight`
- **Card Titles**: `text-2xl font-semibold` or `text-lg font-medium`
- **Table Headers**: `text-sm font-medium`
- **Body Text**: `text-base font-normal`
- **Descriptions**: `text-sm text-muted-foreground`
- **Small Labels**: `text-xs text-muted-foreground`

### Spacing & Layout
- **Container Padding**: 2rem (32px)
- **Card Padding**: p-6 (24px)
- **Element Gaps**: gap-4 (16px) or gap-6 (24px)
- **Grid Gaps**: gap-4 (16px)

### Border Radius
```
rounded-sm: calc(0.5rem - 4px) = 4px
rounded-md: calc(0.5rem - 2px) = 6px
rounded-lg: 0.5rem = 8px
rounded-full: 9999px
```

### Custom Utility Classes
```css
/* Status Badges */
.status-active { @apply bg-success text-success-foreground; }
.status-inactive { @apply bg-muted text-muted-foreground; }
.status-pending { @apply bg-warning text-warning-foreground; }
.status-approved { @apply bg-success text-success-foreground; }
.status-rejected { @apply bg-destructive text-destructive-foreground; }

/* Currency Display */
.currency { @apply text-success font-semibold; }

/* Photo Preview */
.photo-preview { @apply w-20 h-20 rounded-full object-cover border-2 border-border; }

/* Table Row Hover */
.table-row-hover { @apply hover:bg-muted/50 transition-colors; }

/* Card Hover Animation */
.card-hover { @apply transition-all duration-200 hover:shadow-lg hover:-translate-y-1; }

/* Gradients */
.gradient-primary { background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-light))); }
.gradient-success { background: linear-gradient(135deg, hsl(var(--success)), hsl(var(--success-light))); }
```

---

## Database Schema

### Enums

#### app_role
```sql
CREATE TYPE app_role AS ENUM ('admin', 'hr', 'manager', 'employee');
```

#### employee_status
```sql
CREATE TYPE employee_status AS ENUM ('active', 'inactive');
```

#### employee_type
```sql
CREATE TYPE employee_type AS ENUM ('permanent', 'contract', 'intern');
```

#### attendance_status
```sql
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'leave', 'half_day');
```

#### leave_type
```sql
CREATE TYPE leave_type AS ENUM ('sick', 'casual', 'paid', 'unpaid');
```

#### leave_status
```sql
CREATE TYPE leave_status AS ENUM ('pending', 'approved', 'rejected');
```

#### payroll_status
```sql
CREATE TYPE payroll_status AS ENUM ('generated', 'approved', 'paid');
```

### Tables

#### 1. profiles
```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 2. user_roles
```sql
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);
```

#### 3. departments
```sql
CREATE TABLE public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  manager_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 4. roles
```sql
CREATE TABLE public.roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  department_id UUID NOT NULL REFERENCES public.departments(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 5. employees
```sql
CREATE TABLE public.employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  employee_id TEXT NOT NULL UNIQUE DEFAULT generate_employee_id(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  photo_url TEXT,
  department_id UUID NOT NULL REFERENCES public.departments(id),
  role_id UUID NOT NULL REFERENCES public.roles(id),
  date_of_birth DATE,
  address TEXT,
  join_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status employee_status NOT NULL DEFAULT 'active',
  salary_monthly NUMERIC,
  bank_account TEXT,
  ifsc_code TEXT,
  employee_type employee_type NOT NULL DEFAULT 'permanent',
  emergency_contact TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 6. attendance
```sql
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES public.employees(id),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status attendance_status NOT NULL DEFAULT 'present',
  clock_in TIMESTAMPTZ,
  clock_out TIMESTAMPTZ,
  working_hours NUMERIC,
  overtime_hours NUMERIC DEFAULT 0,
  notes TEXT,
  marked_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 7. leave_requests
```sql
CREATE TABLE public.leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES public.employees(id),
  leave_type leave_type NOT NULL,
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  total_days INTEGER NOT NULL,
  status leave_status NOT NULL DEFAULT 'pending',
  reason TEXT NOT NULL,
  approver_comment TEXT,
  approver_id UUID,
  attachment_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 8. payroll
```sql
CREATE TABLE public.payroll (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES public.employees(id),
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  basic NUMERIC NOT NULL,
  hra NUMERIC DEFAULT 0,
  allowances JSONB DEFAULT '{}',
  overtime NUMERIC DEFAULT 0,
  gross_pay NUMERIC NOT NULL,
  deductions JSONB DEFAULT '{}',
  total_deductions NUMERIC DEFAULT 0,
  net_pay NUMERIC NOT NULL,
  status payroll_status NOT NULL DEFAULT 'generated',
  payment_method TEXT,
  transaction_id TEXT,
  paid_at TIMESTAMPTZ,
  approver_id UUID,
  approver_comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 9. notifications
```sql
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  related_id UUID,
  related_type TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 10. audit_logs
```sql
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Database Functions

#### generate_employee_id()
```sql
CREATE OR REPLACE FUNCTION generate_employee_id()
RETURNS TEXT AS $$
DECLARE
  next_id INTEGER;
  emp_id TEXT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(employee_id FROM 4) AS INTEGER)), 0) + 1
  INTO next_id FROM public.employees;
  emp_id := 'EMP' || LPAD(next_id::TEXT, 5, '0');
  RETURN emp_id;
END;
$$ LANGUAGE plpgsql;
```

#### has_role()
```sql
CREATE OR REPLACE FUNCTION has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public;
```

#### get_user_role()
```sql
CREATE OR REPLACE FUNCTION get_user_role(_user_id UUID)
RETURNS app_role AS $$
  SELECT role FROM public.user_roles
  WHERE user_id = _user_id
  ORDER BY CASE role
    WHEN 'admin' THEN 1
    WHEN 'hr' THEN 2
    WHEN 'manager' THEN 3
    WHEN 'employee' THEN 4
  END LIMIT 1
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public;
```

#### calculate_working_hours() - Trigger Function
```sql
CREATE OR REPLACE FUNCTION calculate_working_hours()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.clock_in IS NOT NULL AND NEW.clock_out IS NOT NULL THEN
    NEW.working_hours := EXTRACT(EPOCH FROM (NEW.clock_out - NEW.clock_in)) / 3600;
    IF NEW.working_hours > 8 THEN
      NEW.overtime_hours := NEW.working_hours - 8;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

#### update_updated_at_column() - Trigger Function
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

#### handle_new_user() - Trigger Function
```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'employee');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
```

---

## Application Features

### 1. Authentication System
- **Email/Password Authentication**
- **Auto-confirm email signups** (for development)
- **Session Management** using Supabase Auth
- **Protected Routes** with route guards
- **Login/Signup Pages** with form validation
- **Logout Functionality**

### 2. Dashboard
**Features:**
- Total Employees count with active employees breakdown
- Total Departments count
- Present Today attendance with percentage
- Pending Leave Requests count
- Monthly Payroll Overview (total, gross, deductions)
- Recent Activity Feed
- Department Distribution chart
- Quick Action buttons

**Layout:** 
- 4-column grid for metric cards
- 2-column grid for larger cards
- All cards have hover animations (card-hover class)

### 3. Employees Management
**Features:**
- Add new employee with comprehensive form
- Edit existing employee details
- View employee list with filters
- Search by name/email
- Filter by status (active/inactive)
- Filter by department
- Export employee data
- Employee details with avatar
- Salary information
- Department and role assignment

**Form Fields:**
- First Name*, Last Name*
- Email*, Phone
- Photo URL
- Department*, Role*
- Date of Birth
- Address
- Join Date
- Employee Type (permanent/contract/intern)
- Salary (Monthly)
- Bank Account, IFSC Code
- Emergency Contact

### 4. Departments Management
**Features:**
- Create new departments
- Edit existing departments
- Delete departments (with confirmation)
- Assign department managers
- View employee count per department
- Card view and table view
- Department overview with statistics

### 5. Attendance Tracking
**Features:**
- Daily attendance marking
- Date picker for specific dates
- Filter by department
- Bulk attendance marking (select multiple employees)
- Mark as Present/Absent/Leave
- Attendance statistics (Present, Absent, On Leave, Not Marked)
- View attendance history
- Clock in/out functionality

**Stats Cards:**
- Present count (green)
- Absent count (red)
- On Leave count (orange)
- Not Marked count (gray)

### 6. Leave Requests
**Features:**
- View all leave requests
- Approve/Reject leave requests
- Add comments to decisions
- Filter by status
- Leave request details dialog
- Leave types: Sick, Casual, Paid, Unpaid
- View leave duration and reason
- Attachment support

**Stats Cards:**
- Pending requests (orange)
- Approved requests (green)
- Rejected requests (red)

### 7. Payroll Management
**Features:**
- Generate monthly payroll
- View payroll records
- Filter by year, month, status
- Mark payroll as paid
- Detailed payroll breakdown
- Download payslips
- Export payroll data
- Track payment status

**Payroll Components:**
- Basic Salary
- HRA (House Rent Allowance)
- Custom Allowances (JSONB)
- Overtime
- Deductions (Tax, PF, Insurance)
- Gross Pay calculation
- Net Pay calculation

**Stats Cards:**
- Total Payroll (currency green)
- Paid amount
- Pending amount
- Employee count

### 8. Reports
**Features:**
- Configure report parameters
- Select report type
- Choose date range
- Select employees/departments
- Generate reports
- Download reports (PDF/Excel)
- Quick report templates

**Report Types:**
- Employee Reports
- Attendance Reports
- Leave Reports
- Payroll Reports
- Department Reports

### 9. Profile Management
**Features:**
- View user profile
- Edit profile information
- Update avatar
- Change password
- View assigned roles

---

## UI Components (shadcn/ui)

### Core Components Used
1. **Card** - For content containers
2. **Button** - Primary actions with variants
3. **Input** - Text input fields (white bg, black text)
4. **Textarea** - Multi-line text input
5. **Select** - Dropdown selections
6. **Table** - Data tables with sorting
7. **Dialog** - Modal windows
8. **Badge** - Status indicators
9. **Avatar** - User/employee images
10. **Calendar** - Date picker
11. **Popover** - Overlay content
12. **Checkbox** - Selection boxes
13. **Label** - Form labels
14. **Toast/Sonner** - Notifications
15. **Sidebar** - Navigation sidebar
16. **Tabs** - Tabbed content

### Component Patterns

#### Button Variants
```tsx
<Button variant="default">Primary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Icon</Button>
<Button variant="link">Link</Button>
```

#### Button Sizes
```tsx
<Button size="default">Normal</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

#### Badge Variants
```tsx
<Badge variant="default">Active</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="destructive">Rejected</Badge>
<Badge variant="outline">Draft</Badge>
```

#### Status Badges
```tsx
<Badge className="status-active">Active</Badge>
<Badge className="status-pending">Pending</Badge>
<Badge className="status-approved">Approved</Badge>
<Badge className="status-rejected">Rejected</Badge>
```

---

## Routing Structure

```
/auth                  - Login/Signup page (public)
/dashboard             - Main dashboard (protected)
/employees             - Employee management (protected)
/departments           - Department management (protected)
/attendance            - Attendance tracking (protected)
/leave-requests        - Leave management (protected)
/payroll               - Payroll management (protected)
/reports               - Report generation (protected)
/profile               - User profile (protected)
```

---

## Layout Structure

### App Layout
```
┌─────────────────────────────────────────┐
│  Sidebar (Blue bg, 240px width)         │  Header (with user menu)
│  - Dashboard                             │  ┌─────────────────────────────┐
│  - Employees                             │  │  Main Content Area          │
│  - Departments                           │  │  (p-6, min-h-screen)        │
│  - Attendance                            │  │                             │
│  - Leave Requests                        │  │  Page content here          │
│  - Payroll                               │  │                             │
│  - Reports                               │  │                             │
│  - Profile                               │  └─────────────────────────────┘
└─────────────────────────────────────────┘
```

### Sidebar Design
- **Background**: Primary blue (#0b4f8f)
- **Text**: White
- **Active Item**: Lighter blue background
- **Hover**: Slightly lighter blue
- **Width**: 240px (fixed)

### Header Design
- **Height**: 64px
- **Background**: White (light mode) / Dark (dark mode)
- **Contains**: 
  - Menu toggle button
  - Page breadcrumbs
  - User avatar dropdown
  - Notifications icon

---

## Responsive Design

### Breakpoints
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1400px
```

### Grid Layouts
- **Dashboard Cards**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- **Department Cards**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Forms**: `grid-cols-1 md:grid-cols-2`

### Mobile Considerations
- Sidebar collapses to hamburger menu
- Tables scroll horizontally
- Cards stack vertically
- Forms adjust to single column

---

## Row Level Security (RLS) Policies

### Employees Table
```sql
-- Admins and HR can manage all employees
CREATE POLICY "Admins and HR can manage employees"
ON employees FOR ALL USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'hr'));

-- Employees can view their own data
CREATE POLICY "Employees can view their own data"
ON employees FOR SELECT USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'hr') OR has_role(auth.uid(), 'manager'));
```

### Attendance Table
```sql
-- Employees can clock in/out
CREATE POLICY "Employees can clock in/out"
ON attendance FOR INSERT WITH CHECK (employee_id IN (SELECT id FROM employees WHERE user_id = auth.uid()));

-- Admins and HR can manage all attendance
CREATE POLICY "Admins and HR can manage all attendance"
ON attendance FOR ALL USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'hr'));
```

### Leave Requests Table
```sql
-- Employees can create leave requests
CREATE POLICY "Employees can create leave requests"
ON leave_requests FOR INSERT WITH CHECK (employee_id IN (SELECT id FROM employees WHERE user_id = auth.uid()));

-- Managers and HR can approve leave requests
CREATE POLICY "Managers and HR can approve leave requests"
ON leave_requests FOR UPDATE USING (has_role(auth.uid(), 'manager') OR has_role(auth.uid(), 'hr') OR has_role(auth.uid(), 'admin'));
```

### Payroll Table
```sql
-- HR and Admins can manage payroll
CREATE POLICY "HR and Admins can manage payroll"
ON payroll FOR ALL USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'hr'));

-- Employees can view their own payroll
CREATE POLICY "Employees can view their own payroll"
ON payroll FOR SELECT USING (employee_id IN (SELECT id FROM employees WHERE user_id = auth.uid()) OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'hr'));
```

---

## Data Validation

### Employee Form Validation (Zod Schema)
```typescript
const employeeSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  departmentId: z.string().uuid("Department required"),
  roleId: z.string().uuid("Role required"),
  dateOfBirth: z.date().optional(),
  joinDate: z.date(),
  salaryMonthly: z.number().min(0).optional(),
  employeeType: z.enum(['permanent', 'contract', 'intern']),
});
```

---

## User Experience Details

### Loading States
- Use `<Loader2 className="h-8 w-8 animate-spin text-primary" />` for page loading
- Show skeleton loaders for data tables
- Disable buttons during form submission

### Toast Notifications
```tsx
toast({
  title: "Success",
  description: "Employee added successfully",
});

toast({
  title: "Error",
  description: "Failed to add employee",
  variant: "destructive",
});
```

### Confirmation Dialogs
```tsx
if (confirm('Are you sure you want to delete this employee?')) {
  // Proceed with deletion
}
```

### Empty States
- Show friendly messages when no data exists
- Provide action buttons to add data
- Use muted foreground color for empty state text

---

## Implementation Notes

### Critical Requirements
1. **Always use semantic color tokens** - Never hardcode colors
2. **Input fields must have white background and black text** - Use `bg-white text-black` explicitly
3. **All forms need validation** - Use Zod schemas
4. **Implement proper error handling** - Try/catch blocks
5. **Use TypeScript strictly** - No `any` types
6. **Enable RLS on all tables** - Security first
7. **Auto-confirm emails in development** - Faster testing

### Best Practices
1. Create small, focused components
2. Use React Query for server state
3. Implement optimistic updates where appropriate
4. Add loading and error states
5. Make all components responsive
6. Follow accessibility guidelines
7. Use semantic HTML
8. Implement proper SEO tags

### Performance Considerations
1. Lazy load routes
2. Memoize expensive computations
3. Use pagination for large datasets
4. Implement virtual scrolling for long lists
5. Optimize images with proper sizing

---

## Testing Checklist

### Authentication
- [ ] User can sign up
- [ ] User can log in
- [ ] User can log out
- [ ] Protected routes redirect to auth
- [ ] Session persists after refresh

### Employee Management
- [ ] Can add new employee
- [ ] Can edit employee
- [ ] Can view employee details
- [ ] Can filter employees
- [ ] Can search employees
- [ ] Form validation works

### Attendance
- [ ] Can mark attendance
- [ ] Can bulk mark attendance
- [ ] Can filter by date
- [ ] Can filter by department
- [ ] Stats update correctly

### Leave Requests
- [ ] Can submit leave request
- [ ] Can approve/reject requests
- [ ] Can add comments
- [ ] Status updates correctly
- [ ] Notifications sent

### Payroll
- [ ] Can generate payroll
- [ ] Can view payroll details
- [ ] Can mark as paid
- [ ] Calculations are correct
- [ ] Can filter by month/year

---

## Deployment Configuration

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

### Build Command
```bash
npm run build
```

### Supabase Configuration
1. Enable Email Auth
2. Disable Email Confirmation (development)
3. Set up RLS policies
4. Create database functions
5. Set up triggers

---

This specification provides a complete blueprint for building the HR Management System. Follow the design system strictly, implement all features as described, and ensure proper security with RLS policies.
