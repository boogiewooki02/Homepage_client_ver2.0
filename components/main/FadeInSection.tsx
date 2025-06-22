'use client';

import { useEffect, useRef, useState } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
}

const FadeInSection = ({ children }: FadeInSectionProps) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`transition-opacity duration-[1200ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-[20vh] invisible'}`}
      ref={domRef}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
