import RepositoryDetailResult from "../repositories/responses/repositoryDetailResult";
import GithubApiRepositoryInterface from "../repositories/interfaces/githubApiRepositoryInterface";
import SearchResult from "../repositories/responses/searchResult";

export default class GithubService {
  constructor(
    private readonly githubApiRepository: GithubApiRepositoryInterface,
  ) {}

  async searchRepositories(
    query: string,
    page: number,
    perPage: number,
  ): Promise<SearchResult> {
    const queryInName = `${query}+in:name`;
    const repositories = await this.githubApiRepository.searchRepositories(
      queryInName,
      page,
      perPage,
    );
    return repositories;
  }

  async getRepositoryDetails(
    owner: string,
    repo: string,
  ): Promise<RepositoryDetailResult> {
    const repositoryDetail = await this.githubApiRepository.getRepositoryDetails(
      owner,
      repo,
    );
    return repositoryDetail;
  }
}