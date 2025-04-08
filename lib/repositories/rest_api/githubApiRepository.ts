import { Octokit } from "octokit";
import GithubApiRepositoryInterface from "../interfaces/githubApiRepositoryInterface";
import SearchResult from "../responses/searchResult";
import RepositoryDetailResult from "../responses/repositoryDetailResult";

class GithubApiRepository implements GithubApiRepositoryInterface {
  private githubApi: Octokit;
  constructor(octokitInstance?: Octokit) {
    this.githubApi = octokitInstance || new Octokit({
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
    if (!response.data || Object.keys(response.data).length === 0) {
      throw new Error(
        `データが取得できませんでした。`,
      );
    }
    if(!response.data.items || response.data.items.length === 0) {
      throw new Error(
        `itemsが取得できませんでした。`,
      );
    }
    const returnData = response.data.items.map((item) => {
      const repository: SearchResult = {
        id: item.id,
        repositoryName: item.name,
        repositoryFullName: item.full_name, 
        description: item.description ?? '',
        ownerIconUrl: item.owner?.avatar_url ?? '',
      };
      return repository;
    });

    return returnData;
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
    if (!response.data || Object.keys(response.data).length === 0) {
      throw new Error(
        `データが取得できませんでした。`,
      );
    }
    const repositoryDetail: RepositoryDetailResult = {
      id: response.data.id,
      name: response.data.name,
      fullName: response.data.full_name,
      description: response.data.description ?? '',
      ownerName: response.data.owner?.login ?? '',
      stars: response.data.stargazers_count,
      forks: response.data.forks_count,
      issues: response.data.open_issues_count,
      language: response.data.language ?? '',
      ownerIconUrl: response.data.owner?.avatar_url ?? '',
      createdAt: new Date(response.data.created_at),
      updatedAt: new Date(response.data.updated_at),
    };
    return repositoryDetail;
  }
}
export default GithubApiRepository;