-- ============================================
-- Add phone to profiles and update handle_new_user trigger
-- ============================================

-- Add column
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone TEXT;

-- Update trigger function to include phone when creating profiles
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  SET row_security = off;
  INSERT INTO profiles (id, email, full_name, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'phone', NULL),
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: If you have other triggers depending on the old signature, this replaces the function in-place.
