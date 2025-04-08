'use client';

import { useState } from "react";
import SearchRepositoryAction from "@/actions/search/search_repository_action";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResult";
import Loading from "@/app/loading";

export default function SearchComponent() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearch = async (formData: FormData) => {
    setLoading(true);
    const query = formData.get("q") as string;
    if (!query) {
      setLoading(false);
      return;
    }
  
    const data = await SearchRepositoryAction(formData);
  
    setResults((prevResults) => [...prevResults, ...data]);
    setLoading(false);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {loading ? <Loading /> : <SearchResults results={results} />}
    </div>
  );
}