"use client";

import { useEffect, useRef, useState } from "react";
import Loading from "@/app/loading";
import Repository from "@/lib/repositories/responses/repository";

export default function SearchResultsList({
  results,
  fetchMore,
}: {
  results: Repository[];
  fetchMore: () => Promise<void>;
}) {
  const [isFetching, setIsFetching] = useState(false);
  const bottomBoundaryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isFetching) {
          setIsFetching(true); // データ取得中に設定
          fetchMore().finally(() => setIsFetching(false));
        }
      },
      // 完全にビューポート内に入ったときに発火
      { threshold: 1.0 }
    );

    // bottomBoundaryRefが更新される可能性があるので一旦コピーする
    const currentRef = bottomBoundaryRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchMore, isFetching]);

  if (!results || results.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-gray-600">検索結果がありません。</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <ul className="mt-6 w-full max-w-lg">
        {results.map((result) => (
          <li
            key={result.id}
            className="p-4 bg-white shadow-md rounded-lg mb-4"
          >
            <h2 className="text-xl font-bold break-words">
              {result.repositoryFullName}
            </h2>
            <p className="text-gray-600">
              {result.description || "No description available"}
            </p>
          </li>
        ))}
      </ul>
      <div ref={bottomBoundaryRef} className="h-16"></div>
      {isFetching && <Loading />}
    </div>
  );
}