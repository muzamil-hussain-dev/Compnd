import React from 'react';

const AdPlaceholder = ({ type }) => {
  let classes = "flex items-center justify-center bg-gray-200 text-gray-500 text-sm font-medium border border-gray-300 rounded-sm w-full";

  if (type === 'top-banner') {
    // We use an iframe with srcDoc to safely load Adsterra's document.write scripts in a React SPA
    const adsterraHTML = `
      <html>
        <head>
          <style>body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; }</style>
        </head>
        <body>
          <script>
            atOptions = {
              'key' : 'b25d64b28547eb8e1af2ed8882371c3b',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
          </script>
          <script src="https://www.highrevenueformat.com/b25d64b28547eb8e1af2ed8882371c3b/invoke.js"></script>
        </body>
      </html>
    `;

    return (
      <div className="mx-auto my-4 flex justify-center w-full overflow-hidden max-w-[728px] h-[90px]">
        <iframe 
          title="Adsterra Top Banner"
          srcDoc={adsterraHTML} 
          width="728" 
          height="90" 
          frameBorder="0" 
          scrolling="no"
          className="max-w-full"
        ></iframe>
      </div>
    );
  }

  if (type === 'sidebar-rectangle') {
    const adsterraHTML = `
      <html>
        <head>
          <style>body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; }</style>
        </head>
        <body>
          <script>
            atOptions = {
              'key' : 'b1250ac90f76b9306c86aa859b698062',
              'format' : 'iframe',
              'height' : 250,
              'width' : 300,
              'params' : {}
            };
          </script>
          <script src="https://www.highrevenueformat.com/b1250ac90f76b9306c86aa859b698062/invoke.js"></script>
        </body>
      </html>
    `;

    return (
      <div className="mx-auto my-6 flex justify-center w-full overflow-hidden max-w-[300px] h-[250px]">
        <iframe 
          title="Adsterra Sidebar Rectangle"
          srcDoc={adsterraHTML} 
          width="300" 
          height="250" 
          frameBorder="0" 
          scrolling="no"
          className="max-w-full"
        ></iframe>
      </div>
    );
  }

  // Fallbacks for the other placeholders until you provide their scripts
  let content = "Adsterra Placeholder";
  switch (type) {
    case 'sticky-footer':
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
