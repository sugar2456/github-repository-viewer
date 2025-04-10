import { Octokit } from "octokit";
import GithubApiRepositoryInterface from "../interfaces/githubApiRepositoryInterface";
import Repository from "../responses/repository";
import RepositoryDetailResult from "../responses/repositoryDetailResult";
import SearchResult from "../responses/searchResult";
import { getQueryParams, parseLinkHeaders, splitString } from "@/lib/utils/string_utils";

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
  ): Promise<SearchResult> {
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
      return {
        repositories: [],
        lastPage: 1,
      }
    }

    let lastPage = 1;
    const linkHeader = response.headers.link;
    // 1ページしかない場合は、リンクヘッダーがない
    if (!linkHeader) {
      lastPage = 1;
    } else {
      const splitLinks = splitString(linkHeader, ",");
      const parsedLinks = parseLinkHeaders(splitLinks);
      const lastPageLink = parsedLinks.find((link) => link.rel === "last");
      if (lastPageLink) {
        const queryParams = getQueryParams(lastPageLink.url);
        lastPage = Number(queryParams.page);
      }
    }

    const returnData: SearchResult = {
      repositories: response.data.items.map((item) => {
        const repository: Repository = {
          id: item.id,
          repositoryName: item.name,
          repositoryFullName: item.full_name,
          description: item.description ?? '',
          ownerName: item.owner?.login ?? '',
          ownerIconUrl: item.owner?.avatar_url ?? '',
        };
        return repository;
      }),
      lastPage: lastPage,
    };

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
      watchers: response.data.watchers_count,
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