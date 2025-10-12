-- Fix security issues from the linter

-- Drop the view that exposes auth.users
DROP VIEW IF EXISTS public.user_roles_view;

-- Update existing functions to have proper search_path
CREATE OR REPLACE FUNCTION public.calculate_working_hours()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.clock_in IS NOT NULL AND NEW.clock_out IS NOT NULL THEN
    NEW.working_hours := EXTRACT(EPOCH FROM (NEW.clock_out - NEW.clock_in)) / 3600;
    
    IF NEW.working_hours > 8 THEN
      NEW.overtime_hours := NEW.working_hours - 8;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_employee_id()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  next_id INTEGER;
  emp_id TEXT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(employee_id FROM 4) AS INTEGER)), 0) + 1
  INTO next_id
  FROM public.employees;
  
  emp_id := 'EMP' || LPAD(next_id::TEXT, 5, '0');
  RETURN emp_id;
END;
$$;