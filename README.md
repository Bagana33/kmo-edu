# KMO Education Center

## Facebook Messenger Chat Setup

To enable the Facebook Messenger chat popup on your site, you need to:

1. Get your Facebook Page ID:
   - Go to your Facebook Page
   - Click "Settings" → "Page Info"
   - Your Page ID is listed there

2. (Optional) Get your Facebook App ID:
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create or select your app
   - Copy your App ID

3. Add environment variables to your `.env.local` file:
   ```env
   NEXT_PUBLIC_FACEBOOK_PAGE_ID=your_page_id_here
   NEXT_PUBLIC_FACEBOOK_APP_ID=your_app_id_here  # Optional
   ```

4. The Messenger chat widget will automatically appear on all site pages once configured.

Note: Make sure your Facebook Page has Messenger enabled and is set up to receive messages.
