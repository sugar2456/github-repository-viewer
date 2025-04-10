"use client";
import { useState } from "react";

type SearchFormProps = {
  onSearch: (formData: FormData) => void;
};

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("q") as string;

    if (!query || query.trim() === "") {
      setError("リポジトリ名を入力してください。");
      return;
    }
    setError(null);
    onSearch(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white py-8">
      <form onSubmit={handleSubmit} aria-label="検索フォーム" className="w-full max-w-lg">
        <input
          type="text"
          name="q"
          placeholder="リポジトリの名前を検索してください"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          検索
        </button>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </form>
    </div>
  );
}
