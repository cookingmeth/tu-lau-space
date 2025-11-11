# Decap CMS Setup Guide

## What is Decap CMS?

Decap CMS (formerly Netlify CMS) is a Git-based content management system that provides a user-friendly admin interface for managing your Hugo website content. It allows you to edit content through a web interface instead of manually editing markdown files.

## Installation Complete

The following files have been added to your project:

- `static/admin/config.yml` - CMS configuration
- `layouts/admin/index.html` - CMS admin interface with Auth0 authentication
- `layouts/partials/essentials/head.html` - Added Netlify Identity widget
- `layouts/partials/essentials/script.html` - Added Identity redirect script

## Setup Steps

### 1. Configure Auth0 Environment Variables

This site uses Auth0 for authentication. You need to set the following environment variables in your Netlify site settings:

1. Go to your site dashboard on Netlify
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:

   - `AUTH0_DOMAIN` - Your Auth0 domain (e.g., `dev-xxxxx.auth0.com`)
   - `AUTH0_CLIENT_ID` - Your Auth0 client ID (public value, safe to expose in frontend)
   - `AUTH0_REDIRECT_URI` - Your site's admin callback URL (e.g., `https://tulau.space/admin/`)

4. **CRITICAL CONFIGURATION REQUIREMENTS:**
   - **DO NOT** mark these variables as "secret" (especially `AUTH0_CLIENT_ID` and `AUTH0_REDIRECT_URI`)
   - Set the scope to **"Builds, Deployments, and Functions"** (NOT "Runtime-only")
   - These variables must be available during the Hugo build process
   - If marked as secret or runtime-only, Hugo cannot access them, causing "Unknown host" errors

5. After adding the variables, trigger a new deployment

**Why these settings matter:**
- Auth0 client IDs are public values and meant to be included in frontend JavaScript
- Hugo's `getenv` function only works at BUILD TIME, so variables must be available during builds
- Secret/runtime-only variables are not accessible during the build process, causing template injection to fail
- If template injection fails, the literal Auth0 domain string won't be replaced, causing DNS resolution errors

### 2. Deploy to Netlify (if not already done)

1. Go to [Netlify](https://app.netlify.com)
2. Connect your GitHub repository
3. Deploy your site

### 3. Configure GitHub OAuth App (for CMS Backend)

1. Go to your site dashboard on Netlify
2. Navigate to **Site settings** → **Access control** → **OAuth**
3. Under **Authentication providers**, click **Install provider**
4. Select **GitHub** and follow the setup process

This allows Decap CMS to commit changes to your repository using the GitHub backend.

### 4. Access the CMS

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
- Make sure Netlify Identity is enabled
- Check that Git Gateway is enabled
- Verify you've been invited as a user

### Changes not appearing
- Check that changes were published, not just saved
- Wait for Netlify to rebuild (check deploy status)
- Clear browser cache

### Images not uploading
- Check `media_folder` path in config.yml
- Ensure you have write permissions (via Git Gateway)

## Support

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Netlify Identity Documentation](https://docs.netlify.com/visitor-access/identity/)
- [Hugo Documentation](https://gohugo.io/documentation/)

## Security Notes

- Always use "Invite only" registration
- Regularly review authorized users in Netlify Identity
- Consider enabling 2FA for Netlify account
- The CMS commits are logged with user information
