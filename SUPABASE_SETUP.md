# Supabase Integration Setup

This guide will help you set up Supabase for your blog management system.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization and enter project details:
   - Name: `iris-shani-blog`
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
4. Click "Create new project"

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to Settings > API
2. Copy the following values:
   - Project URL
   - Anon (public) key

## 3. Set Up Environment Variables

1. Create a `.env.local` file in your project root
2. Add the following variables:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from step 2.

## 4. Set Up the Database and Storage

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase-schema.sql` and paste it into the SQL Editor
3. Click "Run" to execute the SQL

This will create:
- `blog_posts` table with proper structure
- Row Level Security (RLS) policies
- Indexes for better performance
- Automatic timestamp updates
- **Storage bucket** for blog images
- **Storage policies** for secure image uploads

### Storage Setup
The system automatically creates a `blog-images` storage bucket with the following folders:
- `thumbnails/` - For blog post thumbnails
- `content-images/` - For images in blog content

## 6. Create an Admin User

1. In your Supabase dashboard, go to Authentication > Users
2. Click "Add user"
3. Enter an email and password for your admin account
4. Click "Create user"

## 7. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/admin`
3. Log in with the admin credentials you created
4. Try creating a blog post to test the integration

## Security Features

- **Row Level Security (RLS)**: Only authenticated users can access blog posts
- **User-specific permissions**: Users can only modify their own blog posts
- **Secure authentication**: Uses Supabase's built-in auth system
- **Environment variables**: Sensitive data is kept in environment variables

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables" error**
   - Make sure your `.env.local` file exists and has the correct variable names
   - Restart your development server after adding environment variables

2. **Authentication not working**
   - Check that the user exists in Supabase Authentication > Users
   - Verify the email and password are correct

3. **Database errors**
   - Make sure you've run the SQL schema in the Supabase SQL Editor
   - Check that RLS policies are properly set up

4. **CORS errors**
   - Add your domain to the allowed origins in Supabase Settings > API

## New Features Added

The blog system now includes:

### 📝 **Enhanced Blog Creation**
- **Summary Field**: Add a brief summary that will be displayed in blog listings
- **Thumbnail Support**: Add thumbnail images via URL or PC upload
- **Rich Text Editor with Images**: Insert images via URL or PC upload directly into content

### 🖼️ **Image Support**
- Add images to blog content using the rich text editor
- Thumbnail images for blog listings
- **PC Upload Support**: Upload images directly from your computer
- Image preview functionality
- Error handling for broken image URLs
- Automatic image optimization and storage

### 📋 **Improved Blog Listing**
- Thumbnail images displayed in blog cards
- Summary text with line clamping for better layout
- Enhanced visual presentation with proper spacing

## Next Steps

Once everything is working:
1. Create your first blog post with summary and thumbnail
2. Test both URL and PC upload for images in the rich text editor
3. Test thumbnail upload from PC
4. Test the CRUD operations (Create, Read, Update, Delete)
5. Consider adding more features like:
   - Categories
   - Comments
   - SEO metadata
   - Image resizing/compression
   - Bulk image upload
