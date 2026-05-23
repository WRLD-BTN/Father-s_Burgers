# Deployment Guide - Father's Burgers Website

## Option 1: Netlify (Recommended - Easiest)

### Step 1: Prepare Files
1. Update all configuration in `js/config.js`:
   - WhatsApp number
   - Restaurant details
   - Menu items & prices

2. Add your logo to `images/logo.png`

3. Update contact form in `pages/contact.html`:
   - Get FormSpree ID from https://formspree.io
   - Replace `YOUR_FORM_ID` in form action

### Step 2: Deploy to Netlify

**Option A: GitHub Integration (Easiest)**
1. Push this folder to GitHub (`https://github.com/yourusername/fathers-burgers`)
2. Go to https://app.netlify.com
3. Click "New site from Git"
4. Connect GitHub, select your repo
5. Deploy! (auto-deploys on every git push)

**Option B: Drag & Drop**
1. Zip the entire project folder
2. Go to https://app.netlify.com/drop
3. Drag & drop the zipped folder
4. Site deployed instantly!

### Step 3: Custom Domain
1. In Netlify dashboard, go to "Domain management"
2. Click "Add custom domain"
3. Enter your domain (e.g., fathersburgers.co.zw)
4. Point domain DNS to Netlify nameservers
5. Wait 24-48 hours for DNS to propagate

### Step 4: HTTPS
Netlify automatically provides free HTTPS certificate!

---

## Option 2: GitHub Pages (Free Alternative)

### Step 1: Create GitHub Repo
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/fathers-burgers.git
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to repository Settings
2. Scroll to "Pages" section
3. Select "Deploy from a branch"
4. Choose `main` branch
5. Save!

### Step 3: Access Your Site
- Default: `yourusername.github.io/fathers-burgers`
- Custom domain: Update DNS settings to GitHub's IP

**Note:** GitHub Pages doesn't support FormSpree forms. Use alternative like Formspree or Getform.

---

## Option 3: Manual Upload (Any Web Host)

1. **Get Web Hosting:**
   - Recommended: Bluehost, SiteGround, Hostinger
   - Look for "Shared Hosting" plans (~$3-5/month)

2. **Upload Files:**
   - Use FTP or File Manager in hosting dashboard
   - Upload entire project folder to `public_html/`

3. **Set Up Custom Domain:**
   - Point domain DNS to hosting provider
   - Update nameservers at domain registrar

4. **Test:**
   - Visit your domain in browser
   - Test WhatsApp integration
   - Test contact form

---

## Testing Before Deploy

### Local Testing
1. Open `index.html` in browser (or use Live Server extension)
2. Test menu filtering
3. Add items to cart
4. Click "Order" button - should open WhatsApp
5. Test contact form (use Formspree test)

### Mobile Testing
- Use browser DevTools (F12 → Device toolbar)
- Test on actual phone if possible
- Verify responsive design

### WhatsApp Testing
1. Update WhatsApp number in `config.js` to a test number
2. Click "Order" with items in cart
3. Verify message format and content
4. Then update to real business number

---

## Maintenance Checklist

### Weekly
- Check WhatsApp messages
- Confirm received orders

### Monthly
- Review contact form submissions
- Update menu if prices change
- Add new specials

### Quarterly
- Update opening hours if seasonal
- Review gallery photos
- Check site analytics

---

## Common Issues & Solutions

### "WhatsApp link not opening"
- Check WhatsApp number format (no +, just country code + number)
- Example: `263771234567` not `+263 77 1234 567`

### "Form not sending emails"
- Verify FormSpree ID is correct
- Check email address is valid
- FormSpree sends confirmation - check spam folder

### "Site looks broken on mobile"
- Clear browser cache (Ctrl+Shift+R)
- Test in incognito/private window
- Check CSS file is loading (css/styles.css)

### "Images not loading"
- Verify image paths start with `/images/`
- Check image file format (PNG, JPG, GIF)
- Ensure logo is named `logo.png`

---

## Performance Tips

1. **Optimize Images:**
   - Compress PNG/JPG files
   - Use online tools like Tiny PNG

2. **Enable Caching:**
   - Netlify does this automatically
   - Browser caches JS/CSS files

3. **Monitor Speed:**
   - Use Google PageSpeed Insights
   - Aim for 90+ score

---

## Security Checklist

- ✅ Site served over HTTPS (automatic on Netlify)
- ✅ No sensitive data stored in code
- ✅ FormSpree handles form submission securely
- ✅ WhatsApp API uses standard Click-to-Chat (no auth needed)

---

## Getting Help

- **Netlify Docs:** https://docs.netlify.com
- **FormSpree Support:** https://formspree.io/help
- **GitHub Pages Guide:** https://pages.github.com
- **Web Design Basics:** https://www.w3schools.com

---

## Next Steps

After deployment:
1. Share WhatsApp link with customers
2. Test first few orders
3. Add photos/gallery items
4. Monitor analytics
5. Gather customer feedback

🎉 **Your restaurant is now online!**
