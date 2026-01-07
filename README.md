# KMO Education Center

## Facebook Messenger Chat Setup

To enable the Facebook Messenger chat popup on your site, you need to:

### Your Facebook Page: [KMOEduCenterMongolia](https://www.facebook.com/KMOEduCenterMongolia)

### Step 1: Get your Facebook Page ID

**Method 1 - From Page Settings (Recommended):**
1. Go to [https://www.facebook.com/KMOEduCenterMongolia](https://www.facebook.com/KMOEduCenterMongolia)
2. Make sure you're logged in as a page admin
3. Click "Settings" (in the left sidebar)
4. Click "Page Info" 
5. Scroll down to find your **Page ID** (it's a long numeric ID, e.g., `123456789012345`)

**Method 2 - From Page Source:**
1. Go to [https://www.facebook.com/KMOEduCenterMongolia](https://www.facebook.com/KMOEduCenterMongolia)
2. Right-click and select "View Page Source"
3. Press Ctrl+F (or Cmd+F on Mac) and search for `"pageID"`
4. You'll find something like `"pageID":"123456789012345"` - copy that number

**Method 3 - Using Facebook Graph API Explorer:**
1. Go to [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Search for `KMOEduCenterMongolia`
3. The Page ID will be displayed

### Step 2: (Optional) Get your Facebook App ID
- Go to [Facebook Developers](https://developers.facebook.com/)
- Create or select your app
- Copy your App ID

### Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory (if it doesn't exist) and add:

```env
NEXT_PUBLIC_FACEBOOK_PAGE_ID=your_page_id_here
NEXT_PUBLIC_FACEBOOK_APP_ID=your_app_id_here  # Optional
```

**For local development:**
- Create `.env.local` file with the above variables
- Restart your Next.js dev server

**For production (Vercel/Netlify/etc.):**
- Add these environment variables in your deployment platform's settings
- Redeploy your application

### Step 4: Verify
- The Messenger chat widget will automatically appear on all site pages once configured
- You should see a chat bubble in the bottom right corner of your website

### Important Notes:
- Make sure your Facebook Page has **Messenger enabled** and is set up to receive messages
- The Page ID must be numeric (not the username "KMOEduCenterMongolia")
- After setting environment variables, restart your development server or redeploy
