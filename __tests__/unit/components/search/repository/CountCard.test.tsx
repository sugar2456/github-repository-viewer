import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CountCard from "@/components/search/repository/CountCard";

describe("CountCard", () => {
  it("プロパティが正しくレンダリングされる", () => {
    const mockTitle = "Test Title";
    const mockCount = 42;

    render(<CountCard count={mockCount} title={mockTitle} />);

    // タイトルが正しく表示されているか確認
    const titleElement = screen.getByText(mockTitle);
    expect(titleElement).toBeInTheDocument();

    // カウントが正しく表示されているか確認
    const countElement = screen.getByText(mockCount.toString());
    expect(countElement).toBeInTheDocument();
  });
});