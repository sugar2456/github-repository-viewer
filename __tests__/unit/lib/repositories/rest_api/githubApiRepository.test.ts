import { describe, it, expect } from "@jest/globals";
// import { GithubApiRepositoryInterface } from "@/lib/repositories/interfaces/github_api_repository_interface";
import GithubApiRepository from "@/lib/repositories/rest_api/githubApiRepository";
import SearchResult from "@/lib/repositories/responses/searchResult";
import RepositoryDetailResult from "@/lib/repositories/responses/repositoryDetailResult";
import { Octokit } from "octokit";

jest.mock("octokit", () => {
  return {
    Octokit: jest.fn().mockImplementation(() => ({
      rest: {
        search: {
          repos: jest.fn().mockResolvedValue({
            status: 200,
            data: {
              items: [
                {
                  id: 1,
                  name: "test-repo",
                  full_name: "test-owner/test-repo",
                  description: "A test repository",
                  owner: { avatar_url: "https://example.com/avatar.png" },
                },
              ],
            },
          }),
        },
        repos: {
          get: jest.fn().mockResolvedValue({
            status: 200,
            data: {
              id: 1,
              name: "test-repo",
              full_name: "test-owner/test-repo",
              description: "A test repository",
              owner: {
                login: "test-owner",
                avatar_url: "https://example.com/avatar.png",
              },
              stargazers_count: 100,
              forks_count: 50,
              open_issues_count: 10,
              language: "JavaScript",
              created_at: "2023-01-01T00:00:00Z",
              updated_at: "2023-01-01T00:00:00Z",
            },
          }),
        },
      },
    })),
  };
});

describe("GitHubApiRepository テスト", () => {
  it("GitHubApiRepository 定義済み", () => {
    const githubApiRepository = new GithubApiRepository();
    const actual = githubApiRepository.searchRepositories("test-repo", 1, 10);
    expect(actual).toBeDefined();
  });

  it("searchRepositoriesで値が取得できるかテスト", async () => {
    const githubApiRepository = new GithubApiRepository();
    const actual = await githubApiRepository.searchRepositories(
      "test-repo",
      1,
      10
    );
    const expected: SearchResult[] = [
      {
        id: 1,
        repositoryName: "test-repo",
        repositoryFullName: "test-owner/test-repo",
        description: "A test repository",
        ownerIconUrl: "https://example.com/avatar.png"
      },
    ];

    expect(actual).toEqual(expected);
  });

  it("searchRepositoriesでステータスコードが200でない場合のテスト", async () => {
    const mockOctokit = {
      rest: {
        search: {
          repos: jest.fn().mockResolvedValue({
            status: 404,
            data: {
              items: [],
            },
          }),
        },
      },
    } as unknown as Octokit;

    const githubApiRepository = new GithubApiRepository(mockOctokit);
    await expect(
      githubApiRepository.searchRepositories("test-repo", 1, 10)
    ).rejects.toThrow("ステータスコード: 404");
  });

  it("searchRepositoriesでデータが取得できない場合のテスト", async () => {
    const mockOctokit = {
      rest: {
        search: {
          repos: jest.fn().mockResolvedValue({
            status: 200,
            data: {},
          }),
        },
      },
    } as unknown as Octokit;
    
    const githubApiRepository = new GithubApiRepository(mockOctokit);
    await expect(
      githubApiRepository.searchRepositories("test-repo", 1, 10)
    ).rejects.toThrow("データが取得できませんでした。");
  });

  it("searchRepositoriesでitemsが取得できない場合のテスト", async () => {
    const mockOctokit = {
      rest: {
        search: {
          repos: jest.fn().mockResolvedValue({
            status: 200,
            data: {
              items: [],
            },
          }),
        },
      },
    } as unknown as Octokit;

    const githubApiRepository = new GithubApiRepository(mockOctokit);
    await expect(
      githubApiRepository.searchRepositories("test-repo", 1, 10)
    ).rejects.toThrow("itemsが取得できませんでした。");
  });

  it("getRepositoryDetailsで値が取得できるかテスト", async () => {
    const githubApiRepository = new GithubApiRepository();
    const actual = await githubApiRepository.getRepositoryDetails(
      "test-owner",
      "test-repo"
    );
    const expected = new RepositoryDetailResult(
      1,
      "test-repo",
      "test-owner/test-repo",
      "A test repository",
      "test-owner",
      100,
      50,
      10,
      "JavaScript",
      "https://example.com/avatar.png",
      new Date("2023-01-01T00:00:00Z"),
      new Date("2023-01-01T00:00:00Z")
    );
    expect(actual).toEqual(expected);
  });

  it("getRepositoryDetailsでステータスコードが200でない場合のテスト", async () => {
    const mockOctokit = {
      rest: {
        repos: {
          get: jest.fn().mockResolvedValue({
            status: 404,
            data: {},
          }),
        },
      },
    } as unknown as Octokit;

    const githubApiRepository = new GithubApiRepository(mockOctokit);
    await expect(
      githubApiRepository.getRepositoryDetails("test-owner", "test-repo")
    ).rejects.toThrow("ステータスコード: 404");
  });
 
  it("getRepositoryDetailsで値が取得できない場合のテスト", async () => {
    const mockOctokit = {
      rest: {
        repos: {
          get: jest.fn().mockResolvedValue({
            status: 200,
            data: {},
          }),
        },
      },
    } as unknown as Octokit;

    const githubApiRepository = new GithubApiRepository(mockOctokit);
    await expect(
      githubApiRepository.getRepositoryDetails("test-owner", "test-repo")
    ).rejects.toThrow("データが取得できませんでした。");
  });
});
