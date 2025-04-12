import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // 直接インポートを追加
import Page from '@/app/search/page';
import SearchComponent from '@/components/search/SearchComponent';

// SearchComponentをモック化
jest.mock('@/components/search/SearchComponent', () => {
  return jest.fn(() => <div data-testid="mock-search-component">モック化された検索コンポーネント</div>);
});

describe('Search Page', () => {
  it('ページが正しくレンダリングされる', () => {
    const { container } = render(<Page />);
    expect(container).toBeTruthy();
    expect(document.body.contains(container)).toBe(true);
  });

  it('SearchComponentが正しくマウントされている', () => {
    const { getByTestId } = render(<Page />);
    // .toBeInTheDocument()の代わりに標準のJestマッチャーを使用する
    expect(getByTestId('mock-search-component')).toBeTruthy();
  });

  it('SearchComponentが1回呼び出される', () => {
    render(<Page />);
    expect(SearchComponent).toHaveBeenCalledTimes(1);
  });
});