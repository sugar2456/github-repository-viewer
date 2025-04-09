import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RepositoryDetailComponent from "@/components/detail/RepositoryDetailComponent";

jest.mock("@/components/detail/DetailInfo", () => ({
  __esModule: true,
  default: ({ repositoryFullName, langueage, iconUrl }: { repositoryFullName: string; langueage: string; iconUrl: string }) => (
    <div>
      <h2>{repositoryFullName}</h2>
      <p>{langueage}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={iconUrl} alt={`${repositoryFullName} icon`} />
    </div>
  ),
}));

jest.mock("@/components/detail/CountCard", () => ({
  __esModule: true,
  default: ({ count, title }: { count: number; title: string }) => (
    <div>
      <h2>{title}</h2>
      <p>{count}</p>
    </div>
  ),
}));

describe("RepositoryDetailComponent", () => {
  it("DetailInfoコンポーネントが正しくレンダリングされる", () => {
    render(<RepositoryDetailComponent />);

    // DetailInfoのプロパティが正しく表示されているか確認
    const repositoryName = screen.getByText("example/repo");
    const language = screen.getByText("JavaScript");
    const icon = screen.getByAltText("example/repo icon");

    expect(repositoryName).toBeInTheDocument();
    expect(language).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "https://avatars.githubusercontent.com/u/51810157?v=4");
  });

  it("CountCardコンポーネントが正しくレンダリングされる", () => {
    render(<RepositoryDetailComponent />);

    // CountCardのプロパティが正しく表示されているか確認
    const starTitle = screen.getByText("Star");
    const starCount = screen.getByText("100");
    const forkTitle = screen.getByText("Fork");
    const forkCount = screen.getByText("50");
    const forkNumberTitle = screen.getByText("Fork数");
    const forkNumberCount = screen.getByText("200");
    const issueTitle = screen.getByText("issue数");
    const issueCount = screen.getByText("300");

    expect(starTitle).toBeInTheDocument();
    expect(starCount).toBeInTheDocument();
    expect(forkTitle).toBeInTheDocument();
    expect(forkCount).toBeInTheDocument();
    expect(forkNumberTitle).toBeInTheDocument();
    expect(forkNumberCount).toBeInTheDocument();
    expect(issueTitle).toBeInTheDocument();
    expect(issueCount).toBeInTheDocument();
  });
});