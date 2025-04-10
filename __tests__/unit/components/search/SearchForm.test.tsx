import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "@/components/search/SearchForm";

describe("SearchForm", () => {
  it("フォームが正しくレンダリングされる", () => {
    render(<SearchForm onSearch={jest.fn()} />);

    const inputElement = screen.getByPlaceholderText("リポジトリの名前を検索してください");
    expect(inputElement).toBeInTheDocument();

    const buttonElement = screen.getByRole("button", { name: /検索/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("フォーム送信時にonSearchが呼び出される", () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText("リポジトリの名前を検索してください");
    fireEvent.change(inputElement, { target: { value: "react" } });

    const formElement = screen.getByRole("form");
    fireEvent.submit(formElement);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);

    const formData = mockOnSearch.mock.calls[0][0] as FormData;
    expect(formData.get("q")).toBe("react");
  });

  it("空のクエリで送信するとエラーメッセージが表示される", () => {
    render(<SearchForm onSearch={jest.fn()} />);

    const buttonElement = screen.getByRole("button", { name: /検索/i });
    fireEvent.click(buttonElement);

    const errorMessage = screen.getByText("リポジトリ名を入力してください。");
    expect(errorMessage).toBeInTheDocument();
  });

  it("256文字を超えるクエリで送信するとエラーメッセージが表示される", () => {
    render(<SearchForm onSearch={jest.fn()} />);

    const inputElement = screen.getByPlaceholderText("リポジトリの名前を検索してください");
    fireEvent.change(inputElement, { target: { value: "a".repeat(257) } });

    const buttonElement = screen.getByRole("button", { name: /検索/i });
    fireEvent.click(buttonElement);

    const errorMessage = screen.getByText("リポジトリ名は256文字以内で入力してください。");
    expect(errorMessage).toBeInTheDocument();
  });
});