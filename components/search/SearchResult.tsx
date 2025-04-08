"use client";

import SearchResult from "@/lib/repositories/responses/searchResult";

export default function SearchResults({
  results,
}: {
  results: SearchResult[] | null;
}) {
  if (!results) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-gray-600">検索結果がありません。</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <ul className="mt-6 w-full max-w-lg">
        {results.map((result) => (
          <li
            key={result.id}
            className="p-4 bg-white shadow-md rounded-lg mb-4"
          >
            <h2 className="text-xl font-bold">{result.repositoryName}</h2>
            <p className="text-gray-600">
              {result.description || "No description available"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
