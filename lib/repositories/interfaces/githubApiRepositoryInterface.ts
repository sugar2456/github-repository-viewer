import SearchResult from "../responses/searchResult";
export default interface GithubApiRepositoryInterface {
  searchRepositories(
    query: string,
    page: number,
    perPage: number,
  ): Promise<SearchResult[]>;
}