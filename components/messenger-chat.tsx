'use client'

import { useEffect } from 'react'

interface MessengerChatProps {
  pageId: string
  appId?: string
  themeColor?: string
  loggedInGreeting?: string
  loggedOutGreeting?: string
  greetingDialogDisplay?: 'show' | 'hide' | 'fade'
  greetingDialogDelay?: number
  minimized?: boolean
  autoExpand?: boolean
  height?: number
  width?: number
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    FB?: {
      init: (config: { xfbml: boolean; version: string }) => void
      XFBML: {
        parse: () => void
      }
    }
    fbAsyncInit?: () => void
  }
}

export function MessengerChat({
  pageId,
  appId,
  themeColor = '#0084ff',
  loggedInGreeting,
  loggedOutGreeting,
  greetingDialogDisplay = 'show',
  greetingDialogDelay = 3,
  minimized = false,
  autoExpand = false,
  height = 320,
  width = 300,
}: MessengerChatProps) {
  useEffect(() => {
    // Don't load if pageId is not provided
    if (!pageId) {
      return
    }

    // Load Facebook SDK if not already loaded
    if (typeof window !== 'undefined' && !window.FB) {
      // Set up fbAsyncInit before loading the script
      window.fbAsyncInit = function () {
        if (window.FB) {
          window.FB.init({
            xfbml: true,
            version: 'v18.0',
          })
        }
      }

      // Load the Facebook SDK script
      const script = document.createElement('script')
      script.src = 'https://connect.facebook.net/mn_MN/sdk/xfbml.customerchat.js'
      script.async = true
      script.defer = true
      script.crossOrigin = 'anonymous'
      document.body.appendChild(script)
    } else if (window.FB) {
      // If SDK is already loaded, parse XFBML
      window.FB.XFBML.parse()
    }

    return () => {
      // Cleanup if needed
    }
  }, [pageId])

  // Don't render if pageId is not provided
  if (!pageId) {
    return null
  }

  return (
    <>
      {/* Facebook Customer Chat Plugin */}
      <div
        className="fb-customerchat"
        data-page_id={pageId}
        {...(appId && { 'data-app_id': appId })}
        data-theme_color={themeColor}
        {...(loggedInGreeting && { 'data-logged_in_greeting': loggedInGreeting })}
        {...(loggedOutGreeting && { 'data-logged_out_greeting': loggedOutGreeting })}
        data-greeting_dialog_display={greetingDialogDisplay}
        data-greeting_dialog_delay={greetingDialogDelay}
        data-minimized={minimized}
        data-auto_expand={autoExpand}
        data-height={height}
        data-width={width}
      />
    </>
  )
}

