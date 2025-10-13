-- Create test users with different roles
-- Note: These are just the role assignments. Users must sign up through the auth system.

-- First, let's create a helper function to assign roles
CREATE OR REPLACE FUNCTION assign_user_role(_email text, _role app_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id uuid;
BEGIN
  -- Get user ID from auth.users
  SELECT id INTO _user_id
  FROM auth.users
  WHERE email = _email;
  
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', _email;
  END IF;
  
  -- Delete existing roles for this user
  DELETE FROM public.user_roles WHERE user_id = _user_id;
  
  -- Insert new role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, _role);
END;
$$;

-- Create a view to help manage user roles
CREATE OR REPLACE VIEW public.user_roles_view AS
SELECT 
  u.id,
  u.email,
  ur.role,
  p.first_name,
  p.last_name,
  ur.created_at
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
LEFT JOIN public.profiles p ON u.id = p.id
ORDER BY u.created_at DESC;

COMMENT ON FUNCTION assign_user_role IS 'Helper function to assign roles to users. Usage: SELECT assign_user_role(''user@example.com'', ''admin'');';