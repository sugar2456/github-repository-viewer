'use client';

import { useState } from "react";
import SearchRepositoryAction from "@/app/actions/search/search_repository_action";
import SearchForm from "./SearchForm";
import SearchResultsList from "./SearchResultList";
import Loading from "@/app/loading";
import Repository from "@/lib/repositories/responses/repository";

export default function SearchComponent() {
  const [results, setResults] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const handleSearch = async (formData: FormData) => {
    setLoading(true);
    // 検索すると改めてページを1に戻す
    setPage(1);

    const query = formData.get("q") as string;
    if (!query) {
      setLoading(false);
      return;
    }
  
    const result = await SearchRepositoryAction(formData);
  
    setResults(result.repositories);
    setLastPage(result.lastPage);
    setSearchQuery(query);
    setLoading(false);
  };

  const fetchMore = async () => {
    if (page >= lastPage) {
      return;
    }

    const formData = new FormData();
    formData.append("q", searchQuery);
    formData.append("page", (page + 1).toString());
    const result = await SearchRepositoryAction(formData);
    const repositories = result.repositories;
    setResults((prevRepos) => [...prevRepos, ...repositories]);
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      return newPage;
    });
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {loading ? <Loading /> : <SearchResultsList results={results} fetchMore={fetchMore} />}
    </div>
  );
}