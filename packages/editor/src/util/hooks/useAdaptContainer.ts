import React, { useRef, useEffect } from "react";

/**
 * 容器自适应hook
 */
export const useAdaptContainer = (
  contentRef: React.RefObject<HTMLElement>
): React.RefObject<HTMLDivElement> => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElement = containerRef.current;
    const contentElement = contentRef.current;

    if (containerElement && contentElement) {
      const updateContainerHeight = () => {
        const { height } = contentElement.getBoundingClientRect();
        containerElement.style.height = `${height}px`;
      };

      updateContainerHeight();
      window.addEventListener("resize", updateContainerHeight);

      return () => {
        window.removeEventListener("resize", updateContainerHeight);
      };
    }
  }, [contentRef.current?.getBoundingClientRect()]);

  return containerRef;
};
