import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full bg-indigo-600 text-white shadow-lg transition hover:bg-indigo-700"
    >
      <ChevronUp size={22} className="mx-auto" />
    </button>
  );
};

export default ScrollTopButton;
