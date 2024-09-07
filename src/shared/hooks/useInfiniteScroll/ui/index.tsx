import { useEffect, useRef, useState } from "react";

interface UseInfiniteScrollProps {
  isFetching: boolean;
  isLast: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
}

export const useInfiniteScroll = ({
  isFetching,
  isLast,
  onLoadMore,
  rootMargin = "100px",
}: UseInfiniteScrollProps) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isFetching || isLoadingMore || isLast || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && !isLast) {
          setIsLoadingMore(true);
          onLoadMore();
        }
      },
      { rootMargin },
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [isFetching, isLast, isLoadingMore]);

  useEffect(() => {
    if (!isFetching) {
      setIsLoadingMore(false);
    }
  }, [isFetching]);

  return { loadMoreRef, isLoadingMore };
};
