import React from 'react';

const AdPlaceholder = ({ type }) => {
  let classes = "flex items-center justify-center bg-gray-200 text-gray-500 text-sm font-medium border border-gray-300 rounded-sm w-full";
  let content = "Adsterra Placeholder";

  switch (type) {
    case 'top-banner':
      // 728x90 on desktop, 320x50 on mobile
      classes += " max-w-[320px] h-[50px] md:max-w-[728px] md:h-[90px] mx-auto my-4";
      content += " (728x90 / 320x50)";
      break;
    case 'sidebar-rectangle':
      // 300x250
      classes += " max-w-[300px] h-[250px] mx-auto my-6";
      content += " (300x250)";
      break;
    case 'sticky-footer':
      // fixed at bottom for mobile
      classes += " h-[50px] fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gray-200 border-t border-gray-300 rounded-none shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]";
      content += " (Sticky Footer)";
      break;
    default:
      classes += " h-[100px]";
  }

  return (
    <div className={classes}>
      {content}
    </div>
  );
};

export default AdPlaceholder;
