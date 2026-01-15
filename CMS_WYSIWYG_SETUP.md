# CMS WYSIWYG Preview Setup Guide

## What Was Implemented

Your Decap CMS has been enhanced with WYSIWYG (What You See Is What You Get) preview capabilities. The right panel should now display styled previews that match your actual website design.

## Files Modified

1. **`static/admin/index.html`** - Main CMS interface with custom preview templates
2. **`static/admin/preview.css`** - Preview-specific styles matching your site
3. **`static/admin/config.yml`** - Enhanced CMS configuration
4. **`public/admin/*`** - Synced copies of all admin files

## Features Added

### Custom Preview Templates

Each content type has a specialized preview:

- **Blog Posts**: Featured image, date, categories, tags, and draft badge
- **Workshops**: Card layout with image, price, duration, and category badges
- **Services**: Gradient background with description
- **Authors**: Profile card with avatar and social links
- **Pages**: Clean centered layout with proper typography
- **Homepage**: Banner and features sections preview
- **Testimonials**: Grid layout with star ratings

### Typography & Styling

- **Fonts**: Heebo (body), Playfair Display (headings), Signika (secondary)
- **Colors**: All your brand colors (#121212, #6B705C, #D0805A, etc.)
- **Components**: Cards, buttons, badges, grids - all styled
- **Responsive**: Mobile and desktop views

## How to Test

1. **Access CMS**: Go to `https://tulau.space/admin`
2. **Login**: Authenticate with GitHub
3. **Open Content**: Click on any blog post, workshop, or page
4. **Check Preview**: The right panel should show styled content
5. **Edit Content**: Make changes and see them update in real-time

## Troubleshooting

### If Preview Shows Raw Markdown

**Check Browser Console** (F12):

1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for errors or the message: ✅ CMS Preview Templates Registered Successfully

**Common Issues**:

- **Decap CMS not loaded**: Check network tab for failed requests
- **JavaScript errors**: Look for red error messages in console
- **Styles not applying**: Check if preview.css loaded in Network tab

### Debug Commands

Open browser console and run:

```javascript
// Check if CMS is loaded
console.log('CMS loaded:', typeof window.CMS);

// Check if preview templates registered
console.log('Templates:', CMS._previewTemplates);

// Check if styles registered
console.log('Styles:', CMS._previewStyles);
```

### Force Reload

1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh the admin page (Ctrl+F5)
3. Close and reopen browser

## File Structure

```
static/admin/
├── index.html       # CMS interface + preview templates
├── config.yml       # CMS configuration
└── preview.css      # Preview styles

public/admin/        # Auto-synced copies
├── index.html
├── config.yml
└── preview.css
```

## Preview Style Classes

Your preview templates use these CSS classes:

- `.cms-preview-content` - Main wrapper
- `.blog-post-preview` - Blog post container
- `.workshop-card` - Workshop card layout
- `.service-card` - Service card layout
- `.author-preview` - Author profile layout
- `.testimonial-card` - Testimonial cards
- `.badge`, `.badge-draft` - Status badges

## Advanced Configuration

### Adding New Preview Template

```javascript
var MyPreview = createClass({
  render: function() {
    var entry = this.props.entry;
    var title = entry.getIn(['data', 'title'], '');
    var body = this.props.widgetFor('body');

    return h('div', { className: 'my-preview' },
      h('h1', {}, title),
      body
    );
  }
});

CMS.registerPreviewTemplate('my_collection', MyPreview);
```

### Modifying Styles

Edit `static/admin/preview.css` to customize preview appearance.

## Expected Behavior

### Working Preview

- ✅ Fonts match website (Heebo, Playfair Display)
- ✅ Colors match brand palette
- ✅ Images display properly
- ✅ Markdown renders as HTML
- ✅ Meta info shows (dates, tags, categories)
- ✅ Layout matches actual site

### Not Working

- ❌ Shows raw markdown syntax
- ❌ No styling applied
- ❌ Console errors present
- ❌ Preview pane is blank

## Next Steps

1. **Test all content types** - Blog, Workshops, Services, Pages
2. **Check console** - Verify no errors
3. **Report issues** - Note which content types don't preview correctly
4. **Customize** - Adjust `preview.css` if needed

## Support

If previews still show raw markdown:

1. Screenshot the browser console (F12)
2. Note which collection (blog/workshop/page) has the issue
3. Check if the file `preview.css` is accessible at `/admin/preview.css`
4. Verify `config.yml` has correct collection names

## Technical Details

- **CMS Version**: Decap CMS 3.x
- **React Version**: Bundled with Decap CMS
- **Preview Method**: Custom React components with createClass
- **Style Loading**: Both external CSS and inline styles
- **Font Loading**: Google Fonts API

---

**Last Updated**: 2026-01-15
**Status**: Implemented and synced to public folder
