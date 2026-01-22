import React from 'react';

const TypingInput = ({ inputRef, typedText, onTyping, onKeyDown, disabled }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-[400px] flex flex-col">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Your Input
        </h3>
        <p className="text-xs text-gray-500 mt-1">Start typing here</p>
      </div>
      <textarea
        ref={inputRef}
        value={typedText}
        onChange={onTyping}
        onKeyDown={onKeyDown}
        onCopy={(e) => e?.preventDefault()}
        onPaste={(e) => e?.preventDefault()}
        onCut={(e) => e?.preventDefault()}
        disabled={disabled}
        className="flex-1 w-full font-mono text-lg leading-relaxed text-gray-800 border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        placeholder="Start typing..."
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
      <div className="mt-4 text-xs text-gray-500">
        <p>⚠️ Copy/Paste disabled | Navigation keys blocked | Right-click disabled</p>
      </div>
    </div>
  );
};

export default TypingInput;