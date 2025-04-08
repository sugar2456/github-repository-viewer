'use client';

import SearchRepositoryAction from "@/actions/search/search_repository_action";
import { Suspense, useActionState } from "react";
import SearchForm from "./SearchForm";
import Loading from "@/app/loading";
import SearchResults from "./SearchResult";


export default function SearchComponent() {
  const [state, formAction] = useActionState(
    SearchRepositoryAction,
    null
  );
  return (
    <div>
      <SearchForm formAction={formAction} />
      <SearchResults results={state} />
    </div>
  );
}
