import React, { useRef, useEffect, useCallback } from "react";

interface InfiniteScrollProps {
  children: React.ReactNode;
  hasMore: boolean;
  loadMore: () => void;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  hasMore,
  loadMore,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const loaderRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      if (hasMore) {
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        });
        if (node) observer.current.observe(node);
      }
    },
    [hasMore, loadMore]
  );

  return (
    <>
      {children}
      <div ref={loaderRef} />
    </>
  );
};

export default InfiniteScroll;
