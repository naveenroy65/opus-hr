# Test Users Setup Guide

This document explains how to set up test users with different roles in the HR Management System.

## Available Roles

The system supports 4 user roles:
1. **Admin** - Full access to all system features
2. **HR** - Full access to all HR-related features
3. **Manager** - Access to view employees, departments, attendance, leave requests, payroll, and reports
4. **Employee** - Limited access to attendance, leave requests, and profile only

## Creating Test Users

### Step 1: Sign Up Users

Users must first sign up through the authentication system:

1. Go to the `/auth` page
2. Click on the "Sign Up" tab
3. Fill in the registration form for each user:

**Suggested Test Users:**

| Role | Email | First Name | Last Name | Phone |
|------|-------|------------|-----------|-------|
| Admin | admin@hrms.com | Admin | User | +1-555-0001 |
| HR | hr@hrms.com | HR | Manager | +1-555-0002 |
| Manager | manager@hrms.com | Team | Manager | +1-555-0003 |
| Employee | employee@hrms.com | John | Doe | +1-555-0004 |

**Password for all accounts:** `Test123!` (or choose your own secure password)

### Step 2: Setup MFA (Multi-Factor Authentication)

After each signup, you'll be prompted to set up MFA:

1. Click "Enable MFA"
2. Scan the QR code with an authenticator app (Google Authenticator, Authy, etc.)
3. Enter the 6-digit verification code from your authenticator app
4. Click "Verify and Enable"

**Note:** Keep your authenticator app accessible as you'll need it every time you log in!

### Step 3: Assign Roles

After creating all users, you need to assign their roles using the database function.

**IMPORTANT:** You need to open the Backend to run these SQL commands:

1. Open your backend dashboard
2. Go to the SQL Editor
3. Run the following SQL commands one by one:

```sql
-- Assign Admin role
SELECT assign_user_role('admin@hrms.com', 'admin');

-- Assign HR role
SELECT assign_user_role('hr@hrms.com', 'hr');

-- Assign Manager role
SELECT assign_user_role('manager@hrms.com', 'manager');

-- Assign Employee role (this is the default, but you can reassign if needed)
SELECT assign_user_role('employee@hrms.com', 'employee');
```

### Step 4: Verify Role Assignments

To verify that roles were assigned correctly, run:

```sql
SELECT email, role, first_name, last_name
FROM auth.users u
JOIN public.user_roles ur ON u.id = ur.user_id
JOIN public.profiles p ON u.id = p.id
ORDER BY 
  CASE role
    WHEN 'admin' THEN 1
    WHEN 'hr' THEN 2
    WHEN 'manager' THEN 3
    WHEN 'employee' THEN 4
  END;
```

## Login Process

1. Go to `/auth`
2. Enter email and password
3. Enter the 6-digit MFA code from your authenticator app
4. You'll be redirected to the appropriate dashboard based on your role

## Role-Based Access Control

### Admin & HR
- Dashboard
- Employees (view & manage)
- Departments (view & manage)
- Attendance (view & manage)
- Leave Requests (view & approve/reject)
- Payroll (view & manage)
- Reports (view)
- Profile (view & edit)

### Manager
- Dashboard
- Employees (view only)
- Departments (view only)
- Attendance (view & mark)
- Leave Requests (view & approve/reject)
- Payroll (view only)
- Reports (view)
- Profile (view & edit)

### Employee
- Dashboard (limited view)
- Attendance (view own & clock in/out)
- Leave Requests (create & view own)
- Profile (view & edit)

## Troubleshooting

### Can't see certain menu items?
- Make sure your role was assigned correctly using Step 4
- Log out and log back in to refresh your session

### MFA not working?
- Make sure you're using the correct authenticator app
- Try re-scanning the QR code during setup
- Check that your phone's time is synchronized

### Forgot to set up MFA?
- MFA is mandatory for all new signups
- If you skipped it, you'll need to set it up on next login

### Need to change a user's role?
Run the assign_user_role function again with the new role:
```sql
SELECT assign_user_role('user@example.com', 'new_role');
```

## Security Notes

- All users MUST complete MFA setup
- Passwords must be at least 6 characters long
- Email confirmation is auto-enabled for faster testing
- Never use these test credentials in production!
- For production, use strong passwords and consider additional security measures
