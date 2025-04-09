import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SearchComponent from "@/components/search/SearchComponent";

jest.mock("octokit", () => {
  return {
    Octokit: jest.fn().mockImplementation(() => ({
      rest: {
        search: {
          repos: jest.fn().mockResolvedValue({
            status: 200,
            headers: {
              link: '<https://api.github.com/search/repositories?q=test-repo&page=2>; rel="next", <https://api.github.com/search/repositories?q=test-repo&page=3>; rel="last"',
            },
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
            headers: {
              link: '<https://api.github.com/search/repositories?q=test-repo&page=2>; rel="next", <https://api.github.com/search/repositories?q=test-repo&page=3>; rel="last"',
            },
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

beforeAll(() => {
  class MockIntersectionObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  }

  Object.defineProperty(global, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
});

describe("SearchComponent", () => {
  it("SearchFormがよびだされているか", () => {
    render(<SearchComponent />);
    const searchForm = screen.getByRole("form");
    expect(searchForm).toBeInTheDocument();
  });
  
  it("SearchResultListがよびだされているか", () => {
    render(<SearchComponent />);
    const noResultsMessage = screen.getByText("検索結果がありません。");
    expect(noResultsMessage).toBeInTheDocument();
  });
});
