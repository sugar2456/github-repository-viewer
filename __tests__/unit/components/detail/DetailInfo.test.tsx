import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DetailInfo from "@/components/search/repository/DetailInfo";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe("DetailInfo", () => {
  it("プロパティが正しくレンダリングされる", () => {
    const mockRepositoryFullName = "owner/repo";
    const mockLangueage = "TypeScript";
    const mockIconUrl = "https://avatars.githubusercontent.com/u/123456?v=4";

    render(
      <DetailInfo
        repositoryFullName={mockRepositoryFullName}
        langueage={mockLangueage}
        iconUrl={mockIconUrl}
      />
    );

    // リポジトリ名が正しく表示されているか確認
    const repositoryNameElement = screen.getByText(mockRepositoryFullName);
    expect(repositoryNameElement).toBeInTheDocument();

    // 言語が正しく表示されているか確認
    const languageElement = screen.getByText(`言語: ${mockLangueage}`);
    expect(languageElement).toBeInTheDocument();

    // アイコン画像が正しく表示されているか確認
    const imageElement = screen.getByAltText(`${mockRepositoryFullName} icon`);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", mockIconUrl);
  });
});