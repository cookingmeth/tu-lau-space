# Decap CMS Setup Guide

## What is Decap CMS?

Decap CMS (formerly Netlify CMS) is a Git-based content management system that provides a user-friendly admin interface for managing your Hugo website content. It allows you to edit content through a web interface instead of manually editing markdown files.

## Installation Complete

The following files have been added to your project:

- `static/admin/config.yml` - CMS configuration
- `layouts/admin/index.html` - CMS admin interface

## Setup Steps

### 1. Deploy to Netlify (if not already done)

1. Go to [Netlify](https://app.netlify.com)
2. Connect your GitHub repository
3. Deploy your site

### 2. Configure GitHub OAuth App (for CMS Backend)

1. Go to your site dashboard on Netlify
2. Navigate to **Site settings** → **Access control** → **OAuth**
3. Under **Authentication providers**, click **Install provider**
4. Select **GitHub** and follow the setup process

This allows Decap CMS to commit changes to your repository using the GitHub backend.

### 3. Access the CMS

Once deployed, access your CMS at:
```
https://your-site.netlify.app/admin/
```

## Local Development (Optional)

To test the CMS locally:

1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Run Hugo server:
   ```bash
   hugo server
   ```

3. In another terminal, run Netlify proxy:
   ```bash
   npx netlify-cms-proxy-server
   ```

4. Uncomment `local_backend: true` in `static/admin/config.yml`

5. Access CMS at `http://localhost:1313/admin/`

## Content Collections

The CMS is configured to manage:

- **Homepage** - Banner, features, workshops section
- **Blog Posts** - Create and edit blog articles
- **Pages** - Workshop, booking, policies, etc.
- **Sections** - Testimonials, call-to-action
- **Services** - Service offerings
- **Workshops** - Workshop listings
- **Authors** - Author profiles

## Editing Content

1. Log in to `/admin/`
2. Select a collection (e.g., "Blog", "Pages")
3. Click on an existing entry to edit or "New [Collection]" to create
4. Make your changes in the editor
5. Click **Publish** to commit changes to your repository
6. Netlify will automatically rebuild your site

## Media Management

- Upload images through the CMS interface
- Images are stored in `static/images/`
- Referenced in content with `/images/filename.jpg`

## Workflow (Optional)

For editorial workflow:

1. Enable **Editorial Workflow** in `config.yml`:
   ```yaml
   publish_mode: editorial_workflow
   ```

2. This adds three statuses:
   - **Draft** - Work in progress
   - **In Review** - Ready for review
   - **Ready** - Approved for publishing

## Troubleshooting

### Cannot log in
- Make sure GitHub OAuth is configured in Netlify
- Verify you have access to the GitHub repository
- Check that the OAuth provider is properly set up in Netlify settings

### Changes not appearing
- Check that changes were published, not just saved
- Wait for Netlify to rebuild (check deploy status)
- Clear browser cache

### Images not uploading
- Check `media_folder` path in config.yml
- Ensure you have write permissions to the GitHub repository

## Support

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Hugo Documentation](https://gohugo.io/documentation/)
- [Netlify OAuth Documentation](https://docs.netlify.com/visitor-access/oauth-provider-tokens/)

## Security Notes

- Regularly review authorized users with GitHub repository access
- Consider enabling 2FA for GitHub and Netlify accounts
- The CMS commits are logged with GitHub user information
- Only grant repository access to trusted users
