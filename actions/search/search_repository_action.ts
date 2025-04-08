'use server';
import GithubApiRepository from "@/lib/repositories/rest_api/githubApiRepository";
import GithubService from "@/lib/services/github_service";
import SearchResult from "@/lib/repositories/responses/searchResult";

export default async function SearchRepositoryAction(
  currentState: any,
  formData: any
) {
  const query = formData.get('q') as string;
  const service = new GithubService(new GithubApiRepository());
  const data: SearchResult[] = await service.searchRepositories(query, 1, 30);

  return data;
}