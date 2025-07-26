// 'use client';

// import React, { useEffect } from 'react';
// import { Languages } from 'lucide-react';

// declare global {
//   interface Window {
//     google: any;
//     googleTranslateElementInit: () => void;
//   }
// }

// const GoogleTranslate: React.FC = () => {
//   useEffect(() => {
//     // Define init function globally
//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: 'en',
//           includedLanguages: 'en,hi,bn,ta,te,mr,gu,kn,ml,or,pa,as,ur',
//           layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//           autoDisplay: false,
//         },
//         'google_translate_element'
//       );
//     };

//     // Inject script only once
//     if (!document.getElementById('google-translate-script')) {
//       const script = document.createElement('script');
//       script.id = 'google-translate-script';
//       script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//       script.async = true;
//       document.head.appendChild(script);
//     }
//   }, []);

//   return (
//     <div className="flex items-center space-x-2 relative">
//       <Languages className="w-4 h-4 text-muted-foreground" />
//       <div
//         id="google_translate_element"
//         className="overflow-hidden h-6 text-sm"
//         style={{
//           transform: 'scale(0.8)',
//           transformOrigin: 'left center',
//         }}
//       ></div>
//     </div>
//   );
// };

// export default GoogleTranslate;

'use client';

import { useEffect } from 'react';
import { Languages } from 'lucide-react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    // Inject Google Translate script
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,bn,ta,te,mr,gu,kn,ml,or,pa,as,ur',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    }

    // 🔥 REMOVE iframe banner if injected
    const interval = setInterval(() => {
      const iframe = document.querySelector('iframe.goog-te-banner-frame');
      if (iframe) {
        iframe.remove();
        document.body.style.top = '0px';
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <Languages className="w-4 h-4 text-muted-foreground" />
      <div id="google_translate_element" className="text-sm scale-90 origin-left"></div>
    </div>
  );
};

export default GoogleTranslate;
