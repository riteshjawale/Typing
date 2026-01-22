import React from 'react';

const SourceTextDisplay = ({ sourceText, typedText, errors }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-[400px] overflow-y-auto">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Source Text
        </h3>
        <p className="text-xs text-gray-500 mt-1">Type the text below as accurately as possible</p>
      </div>
      <div className="font-mono text-lg leading-relaxed text-gray-800">
        {sourceText?.split('')?.map((char, index) => {
          let className = 'transition-colors';
          
          if (index < typedText?.length) {
            if (typedText?.[index] === char) {
              className += ' text-green-600 bg-green-50';
            } else {
              className += ' text-red-600 bg-red-100 font-bold';
            }
          } else if (index === typedText?.length) {
            className += ' bg-yellow-200';
          }
          
          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SourceTextDisplay;