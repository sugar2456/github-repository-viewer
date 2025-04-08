import RepositoryDetailResult from "../repositories/responses/repositoryDetailResult";
import SearchResult from "../repositories/responses/searchResult";
import GithubApiRepositoryInterface from "../repositories/interfaces/githubApiRepositoryInterface";

export default class GithubService {
  constructor(
    private readonly githubApiRepository: GithubApiRepositoryInterface,
  ) {}

  async searchRepositories(
    query: string,
    page: number,
    perPage: number,
  ): Promise<SearchResult[]> {
    const repositories = await this.githubApiRepository.searchRepositories(
      query,
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