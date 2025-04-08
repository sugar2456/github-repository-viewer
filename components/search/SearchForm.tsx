'use client';
import Form from 'next/form';

export default function SearchForm({ formAction }: { formAction: (formData: FormData) => void }) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 py-8">
      <Form action={formAction} className="w-full max-w-lg">
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
      </Form>
    </div>
  );
}