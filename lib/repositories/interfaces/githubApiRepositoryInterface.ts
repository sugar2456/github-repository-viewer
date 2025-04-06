import SearchResult from "../responses/searchResult";
import RepositoryDetailResult from "../responses/repositoryDetailResult";

export default interface GithubApiRepositoryInterface {
  searchRepositories(
    query: string,
    page: number,
    perPage: number,
  ): Promise<SearchResult[]>;

  getRepositoryDetails(
    owner: string,
    repo: string,
  ): Promise<RepositoryDetailResult>;
}