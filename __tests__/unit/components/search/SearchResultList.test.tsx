import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SearchResultsList from "@/components/search/SearchResultList";
import Repository from "@/lib/repositories/responses/repository";

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

describe("SearchResultsList", () => {
  it("検索結果が正しくレンダリングされる", () => {
    const results = [
      {
        id: 1,
        repositoryName: "test-repo",
        repositoryFullName: "user/test-repo",
        description: "This is a test repository",
        ownerName: "user",
        ownerIconUrl: "https://example.com/icon.png",
      },
    ];
  
    const { getByText, getByAltText } = render(
      <SearchResultsList results={results} fetchMore={jest.fn()} />
    );
  
    expect(getByText("user/test-repo")).toBeInTheDocument();
    expect(getByText("This is a test repository")).toBeInTheDocument();
    expect(getByAltText("user/test-repo icon")).toBeInTheDocument();
  });

  it("複数の検索結果が正しくレンダリングされる", () => {
    const mockResults: Repository[] = [
      {
        id: 1,
        repositoryName: "repo1",
        repositoryFullName: "owner/repo1",
        description: "description1",
        ownerName: "owner",
        ownerIconUrl: "https://example.com/icon1.png",
      },
      {
        id: 2,
        repositoryName: "repo2",
        repositoryFullName: "owner/repo2",
        description: "description2",
        ownerName: "owner",
        ownerIconUrl: "https://example.com/icon2.png",
      },
    ];

    render(<SearchResultsList results={mockResults} fetchMore={jest.fn()} />);

    const firstResult = screen.getByText("owner/repo1");
    const secondResult = screen.getByText("owner/repo2");

    expect(firstResult).toBeInTheDocument();
    expect(secondResult).toBeInTheDocument();
  });

  it("検索結果がない場合、検索結果がないことをメッセージで表示する", () => {
    const mockFetchMore = jest.fn();

    const { rerender } = render(
      <SearchResultsList results={[]} fetchMore={mockFetchMore} />
    );

    // ローディング状態をシミュレート
    rerender(<SearchResultsList results={[]} fetchMore={mockFetchMore} />);

    const noResultsMessage = screen.getByText("検索結果がありません。");
    expect(noResultsMessage).toBeInTheDocument();
  });

  it("検索結果がない場合の表示", () => {
    const { getByText } = render(<SearchResultsList results={[]} fetchMore={jest.fn()} />);
    expect(getByText("検索結果がありません。")).toBeInTheDocument();
  });
});
