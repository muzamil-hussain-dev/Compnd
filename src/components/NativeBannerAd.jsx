import React, { useEffect, useRef } from 'react';

const NativeBannerAd = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Only inject the script once
    if (containerRef.current && !containerRef.current.hasAttribute('data-ad-injected')) {
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl31410999.profitableratecpmnetwork.com/48ae87bd355d91a71c0ced91d36f8b2f/invoke.js';
      
      containerRef.current.appendChild(script);
      containerRef.current.setAttribute('data-ad-injected', 'true');
    }
  }, []);

  return (
    <div className="w-full flex justify-center my-6">
      <div 
        ref={containerRef} 
        id="container-48ae87bd355d91a71c0ced91d36f8b2f"
        className="w-full max-w-full overflow-hidden"
      >
        {/* Adsterra Native Banner will inject content here */}
      </div>
    </div>
  );
};

export default NativeBannerAd;
