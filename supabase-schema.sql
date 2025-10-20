-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  summary TEXT,
  content TEXT NOT NULL,
  thumbnail_url TEXT,
  thumbnail_path TEXT,
  featured BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON blog_posts(author_id);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts
-- Allow everyone (including anonymous users) to read all blog posts
CREATE POLICY "Allow public read access to blog posts" ON blog_posts
  FOR SELECT USING (true);

-- Allow authenticated users to insert their own blog posts
CREATE POLICY "Allow authenticated users to insert blog posts" ON blog_posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Allow users to update their own blog posts
CREATE POLICY "Allow users to update their own blog posts" ON blog_posts
  FOR UPDATE USING (auth.uid() = author_id);

-- Allow users to delete their own blog posts
CREATE POLICY "Allow users to delete their own blog posts" ON blog_posts
  FOR DELETE USING (auth.uid() = author_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON blog_posts TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('iris', 'iris', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for blog images
CREATE POLICY "Allow authenticated users to upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'iris' AND 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Allow authenticated users to view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'iris');

CREATE POLICY "Allow authenticated users to update their own blog images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'iris' AND 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Allow authenticated users to delete their own blog images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'iris' AND 
    auth.role() = 'authenticated'
  );
