# Google Tag Manager Setup Guide for Iris-HR.work

## Overview
This document provides instructions for configuring Google Tag Manager (GTM-M2SGHXBH) with Google Analytics 4 and Facebook Pixel for iris-hr.work.

---

## ✅ Completed Code Implementation

The following have been added to the codebase:

1. **GTM Container Snippet** - Added to `<head>` in index.html
2. **GTM Noscript Fallback** - Added after `<body>` tag in index.html
3. **Facebook Domain Verification** - Meta tag added to `<head>` in index.html
4. **WhatsApp Link** - Already implemented correctly throughout the site

---

## 🔧 Required GTM Configuration

You need to log into Google Tag Manager (https://tagmanager.google.com) and configure the following:

### 1. Google Analytics 4 Configuration

**Container ID:** GTM-M2SGHXBH
**GA4 Measurement ID:** G-G96EYFR9Q9

#### Steps to Configure GA4 in GTM:

1. **Create GA4 Configuration Tag:**
   - Go to GTM workspace for GTM-M2SGHXBH
   - Click "Tags" → "New"
   - Tag Configuration → Choose "Google Analytics: GA4 Configuration"
   - Measurement ID: `G-G96EYFR9Q9`
   - Triggering: Select "All Pages" (Initialization trigger)
   - Name the tag: "GA4 Configuration - G-G96EYFR9Q9"
   - Save

2. **Create GA4 Event Tags (Recommended):**

   **Page View Event:**
   - Tag Type: Google Analytics: GA4 Event
   - Configuration Tag: Select the GA4 Configuration tag created above
   - Event Name: `page_view`
   - Trigger: All Pages
   - Name: "GA4 Event - Page View"

   **Form Submit Event (Contact Form):**
   - Tag Type: Google Analytics: GA4 Event
   - Configuration Tag: Select the GA4 Configuration tag
   - Event Name: `form_submit`
   - Trigger: Form Submission (you'll need to create this trigger)
   - Name: "GA4 Event - Form Submit"

   **WhatsApp Click Event:**
   - Tag Type: Google Analytics: GA4 Event
   - Configuration Tag: Select the GA4 Configuration tag
   - Event Name: `whatsapp_click`
   - Trigger: Click - All Elements where Click URL contains "wa.me"
   - Name: "GA4 Event - WhatsApp Click"

---

### 2. Facebook Pixel Configuration

**Pixel ID:** 735091743009868

#### Steps to Configure Facebook Pixel in GTM:

1. **Create Facebook Pixel Base Code Tag:**
   - Go to GTM workspace for GTM-M2SGHXBH
   - Click "Tags" → "New"
   - Tag Configuration → Choose "Custom HTML"
   - Paste the following code:

```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '735091743009868');
fbq('track', 'PageView');
</script>
<noscript>
  <img height="1" width="1" style="display:none"
       src="https://www.facebook.com/tr?id=735091743009868&ev=PageView&noscript=1"/>
</noscript>
<!-- End Facebook Pixel Code -->
```

   - Triggering: Select "All Pages"
   - Name the tag: "Facebook Pixel - Base Code - 735091743009868"
   - Advanced Settings → Tag firing options → "Once per page"
   - Save

2. **Create Facebook Pixel Event Tags (Recommended):**

   **Contact Event:**
   - Tag Type: Custom HTML
   - HTML: `<script>fbq('track', 'Contact');</script>`
   - Trigger: Form Submission
   - Name: "Facebook Pixel - Contact Event"

   **Lead Event:**
   - Tag Type: Custom HTML
   - HTML: `<script>fbq('track', 'Lead');</script>`
   - Trigger: Form Submission - Success (if you have success confirmation)
   - Name: "Facebook Pixel - Lead Event"

---

## 🧪 Testing & Verification

### GTM Preview Mode Testing:
1. Go to GTM → Click "Preview" button
2. Enter URL: https://iris-hr.work
3. In Preview mode, verify:
   - GTM container loads
   - GA4 Configuration tag fires on page load
   - Facebook Pixel base code fires on page load
   - All event tags fire correctly

### Google Analytics 4 Testing:
1. Go to Google Analytics 4 property for G-G96EYFR9Q9
2. Navigate to Reports → Realtime
3. Visit https://iris-hr.work
4. Verify you see real-time data appearing

### Facebook Pixel Testing:
1. Install "Meta Pixel Helper" Chrome extension
2. Visit https://iris-hr.work
3. Click the extension icon
4. Verify Pixel ID 735091743009868 is detected
5. Check for any errors or warnings

### Facebook Domain Verification:
1. Go to Meta Business Suite → Settings → Brand Safety → Domains
2. Click "Verify" next to iris-hr.work domain
3. The meta tag is already in the code, so it should verify successfully

---

## 📝 Important Notes

### Domain Requirements:
- Ensure implementations are on the main domain only (iris-hr.work)
- Verify there are no redirects between www and non-www versions
- Check that no duplicate GTM containers exist

### GTM Best Practices:
- ✅ GTM is in the `<head>` tag (as required)
- ✅ Noscript version is immediately after `<body>` tag
- ✅ Only one GTM container is implemented
- ⚠️ Do NOT add gtag.js directly to avoid double tracking

### Testing Checklist:
- [ ] GTM container fires on all pages
- [ ] GA4 tracking working in real-time reports
- [ ] Facebook Pixel detected by Pixel Helper
- [ ] Facebook domain verified in Business Manager
- [ ] WhatsApp links open correctly on desktop and mobile
- [ ] Form submissions tracked in both GA4 and Facebook
- [ ] No console errors related to tracking scripts

---

## 🚀 Deployment Steps

1. **Publish GTM Changes:**
   - After configuring all tags in GTM workspace
   - Click "Submit" in top right
   - Add version name: "Initial Setup - GA4 & FB Pixel"
   - Add description of changes
   - Click "Publish"

2. **Deploy Code Changes:**
   - The code changes in index.html are already committed
   - Deploy to production

3. **Verify Everything:**
   - Use GTM Preview mode
   - Check GA4 real-time reports
   - Use Meta Pixel Helper
   - Test form submissions and WhatsApp clicks

---

## 📞 Contact Information

**WhatsApp:** https://wa.me/972508836955 (Already implemented and working)

---

## Configuration Summary

| Item | Value | Status |
|------|-------|--------|
| Domain | iris-hr.work | ✅ |
| GTM Container | GTM-M2SGHXBH | ✅ Code Implemented |
| GA4 Measurement ID | G-G96EYFR9Q9 | ⚠️ Configure in GTM |
| Facebook Pixel ID | 735091743009868 | ⚠️ Configure in GTM |
| Facebook Domain Verification | cqcuq60pb501lhb6mcd4ewzpctugen | ✅ Code Implemented |
| WhatsApp Link | https://wa.me/972508836955 | ✅ Already Implemented |

---

## Next Steps

1. ✅ **Code Implementation** - COMPLETE
2. ⚠️ **GTM Configuration** - Log into GTM and set up tags as documented above
3. ⚠️ **Testing** - Use preview mode and verify all tracking
4. ⚠️ **Facebook Verification** - Complete domain verification in Meta Business Manager
5. ⚠️ **Publish** - Publish GTM container and deploy code to production
