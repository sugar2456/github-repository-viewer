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
  it("検索結果がない場合、メッセージが表示される", () => {
    render(<SearchResultsList results={[]} fetchMore={jest.fn()} />);

    const noResultsMessage = screen.getByText("検索結果がありません。");
    expect(noResultsMessage).toBeInTheDocument();
  });

  it("検索結果がある場合、リストが正しくレンダリングされる", () => {
    const mockResults: Repository[] = [
      {
        id: 1,
        repositoryName: "repo1",
        repositoryFullName: "owner/repo1",
        description: "description1",
        ownerIconUrl: "https://example.com/icon1.png",
      },
      {
        id: 2,
        repositoryName: "repo2",
        repositoryFullName: "owner/repo2",
        description: "description2",
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
});
