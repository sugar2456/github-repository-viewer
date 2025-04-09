"use client";

type SearchFormProps = {
  onSearch: (formData: FormData) => void;
};

export default function SearchForm({ onSearch }: SearchFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSearch(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 py-8">
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
          Search
        </button>
      </form>
    </div>
  );
}
