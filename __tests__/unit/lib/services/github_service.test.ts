import GithubService from "@/lib/services/github_service";
import GithubApiRepositoryInterface from "@/lib/repositories/interfaces/githubApiRepositoryInterface";
import SearchResult from "@/lib/repositories/responses/searchResult";
import RepositoryDetailResult from "@/lib/repositories/responses/repositoryDetailResult";

describe("GithubService", () => {
  let githubApiRepositoryMock: jest.Mocked<GithubApiRepositoryInterface>;
  let githubService: GithubService;

  beforeEach(() => {
    // GithubApiRepositoryInterfaceのモックを作成
    githubApiRepositoryMock = {
      searchRepositories: jest.fn(),
      getRepositoryDetails: jest.fn(),
    };
    githubService = new GithubService(githubApiRepositoryMock);
  });

  describe("searchRepositories", () => {
    it("指定されたクエリ、ページ、件数でリポジトリを検索する", async () => {
      // モックの戻り値を設定
      const mockSearchResult: SearchResult = {
        repositories: [
          {
            id: 1,
            repositoryName: "test-repo",
            repositoryFullName: "test-owner/test-repo",
            description: "A test repository",
            ownerName: "test-owner",
            ownerIconUrl: "https://example.com/avatar.png",
          },
        ],

        lastPage: 2,
      };
      githubApiRepositoryMock.searchRepositories.mockResolvedValue(mockSearchResult);

      // メソッドを実行
      const result = await githubService.searchRepositories("test", 1, 10);

      // 結果を検証
      expect(githubApiRepositoryMock.searchRepositories).toHaveBeenCalledWith(
        "test",
        1,
        10
      );
      expect(result).toEqual(mockSearchResult);
    });
  });

  describe("getRepositoryDetails", () => {
    it("指定されたリポジトリの詳細を取得する", async () => {
      // モックの戻り値を設定
      const mockRepositoryDetail: RepositoryDetailResult = {
        id: 1,
        name: "test-repo",
        fullName: "test-owner/test-repo",
        description: "A test repository",
        ownerName: "test-owner",
        ownerIconUrl: "https://example.com/avatar.png",
        stars: 100,
        watchers: 150,
        forks: 50,
        issues: 10,
        language: "JavaScript",
        createdAt: new Date(2023, 1, 1),
        updatedAt: new Date(2023, 1, 1),
      };
      githubApiRepositoryMock.getRepositoryDetails.mockResolvedValue(mockRepositoryDetail);

      // メソッドを実行
      const result = await githubService.getRepositoryDetails("test-owner", "test-repo");

      // 結果を検証
      expect(githubApiRepositoryMock.getRepositoryDetails).toHaveBeenCalledWith(
        "test-owner",
        "test-repo"
      );
      expect(result).toEqual(mockRepositoryDetail);
    });
  });
});