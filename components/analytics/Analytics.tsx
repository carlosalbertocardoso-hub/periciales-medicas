'use client';

import { GoogleTagManager } from '@next/third-parties/google';

export function Analytics() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <>
      <script
        id="consent-default"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500,
            });
          `,
        }}
      />
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
    </>
  );
}
