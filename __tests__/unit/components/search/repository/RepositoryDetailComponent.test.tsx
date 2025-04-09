import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RepositoryDetailComponent from "@/components/search/repository/RepositoryDetailComponent";

jest.mock("@/components/search/repository/DetailInfo", () => ({
  __esModule: true,
  default: ({ repositoryFullName, language, iconUrl }: { repositoryFullName: string; language: string; iconUrl: string }) => (
    <div>
      <h2>{repositoryFullName}</h2>
      <p>{language}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={iconUrl} alt={`${repositoryFullName} icon`} />
    </div>
  ),
}));

jest.mock("@/components/search/repository/CountCard", () => ({
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
    render(<RepositoryDetailComponent
      fullName="example/repo"
      language="JavaScript"
      ownerIconUrl="https://avatars.githubusercontent.com/u/51810157?v=4"
      stars={100}
      watchers={50}
      forks={200}
      issues={300}
    />);

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
    render(<RepositoryDetailComponent 
      fullName="example/repo"
      language="JavaScript"
      ownerIconUrl="https://avatars.githubusercontent.com/u/51810157?v=4"
      stars={100}
      watchers={50}
      forks={200}
      issues={300}
    />);

    // CountCardのプロパティが正しく表示されているか確認
    const starTitle = screen.getByText("Star");
    const starCount = screen.getByText("100");
    const forkTitle = screen.getByText("Watcher数");
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