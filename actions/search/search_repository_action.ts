'use server';

import GithubApiRepository from "@/lib/repositories/rest_api/githubApiRepository";
import GithubService from "@/lib/services/github_service";
import SearchResult from "@/lib/repositories/responses/searchResult";

export default async function SearchRepositoryAction(formData: FormData) {
  const query = formData.get("q") as string;
  const page = parseInt(formData.get("page") as string, 10) || 1;

  const service = new GithubService(new GithubApiRepository());
  const data: SearchResult[] = await service.searchRepositories(query, page, 30);

  return data;
}