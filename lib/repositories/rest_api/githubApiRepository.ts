import { Octokit } from "octokit";
import GithubApiRepositoryInterface from "../interfaces/githubApiRepositoryInterface";
import SearchResult from "../responses/searchResult";
import RepositoryDetailResult from "../responses/repositoryDetailResult";

class GithubApiRepository implements GithubApiRepositoryInterface {
  private githubApi: Octokit;
  constructor() {
    this.githubApi = new Octokit({
      auth: process.env.GITHUB_API_KEY,
    });
  }

  async searchRepositories(
    query: string,
    page: number,
    perPage: number,
  ): Promise<SearchResult[]> {
    const response = await this.githubApi.rest.search.repos({
      q: query,
      page: page,
      per_page: perPage,
    });
    if (response.status !== 200) {
      throw new Error(
        `ステータスコード: ${response.status}`,
      );
    }
    if(!response.data.items || response.data.items.length === 0) {
      throw new Error(
        `itemsが取得できませんでした。`,
      );
    }
    const returenData = response.data.items.map((item) => {
      const repository = new SearchResult(
        item.id,
        item.name,
        item.full_name,
        item.description ?? '',
        item.owner?.avatar_url ?? '',
      );
      return repository;
    });

    return returenData;
  }

  async getRepositoryDetails(
    owner: string,
    repo: string,
  ): Promise<RepositoryDetailResult> {
    const response = await this.githubApi.rest.repos.get({
      owner: owner,
      repo: repo,
    });
    if (response.status !== 200) {
      throw new Error(
        `ステータスコード: ${response.status}`,
      );
    }
    const repositoryDetail = new RepositoryDetailResult(
      response.data.id,
      response.data.name,
      response.data.full_name,
      response.data.description ?? '',
      response.data.owner?.login ?? '',
      response.data.stargazers_count,
      response.data.forks_count,
      response.data.open_issues_count,
      response.data.language ?? '',
      response.data.owner?.avatar_url ?? '',
      new Date(response.data.created_at),
      new Date(response.data.updated_at),
    );
    return repositoryDetail;
  }
}
export default GithubApiRepository;