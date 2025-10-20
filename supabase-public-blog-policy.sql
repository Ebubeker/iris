-- Drop the existing policy that only allows authenticated users to read blog posts
DROP POLICY IF EXISTS "Allow authenticated users to read blog posts" ON blog_posts;

-- Create a new policy that allows everyone (including anonymous users) to read blog posts
CREATE POLICY "Allow public read access to blog posts" ON blog_posts
  FOR SELECT USING (true);

-- This allows anyone to view blog posts, which is necessary for the public blogs page
-- Only authenticated users can still create, update, and delete blog posts
