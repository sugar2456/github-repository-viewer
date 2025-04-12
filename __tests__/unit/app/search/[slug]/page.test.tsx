import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '@/app/search/[slug]/page';
import getRepositoryDetailAction from '@/app/actions/search/get_repository_detail_action';
import RepositoryDetailComponent from '@/components/search/repository/RepositoryDetailComponent';

// getRepositoryDetailActionをモック化
jest.mock('@/app/actions/search/get_repository_detail_action', () => {
  return jest.fn();
});

// RepositoryDetailComponentをモック化
jest.mock('@/components/search/repository/RepositoryDetailComponent', () => {
  return jest.fn(() => (
    <div data-testid="repository-detail-component">
      モック化されたリポジトリ詳細コンポーネント
    </div>
  ));
});

describe('Repository Detail Page', () => {
  const mockRepositoryDetail = {
    fullName: 'owner/repository',
    language: 'TypeScript',
    ownerIconUrl: 'https://example.com/icon.png',
    stars: 100,
    watchers: 50,
    forks: 25,
    issues: 10,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // getRepositoryDetailActionのモック実装を定義
    (getRepositoryDetailAction as jest.Mock).mockResolvedValue(mockRepositoryDetail);
  });

  it('正しいパラメータでリポジトリ詳細を取得する', async () => {
    // 非同期コンポーネントとsearchParamsをモック
    const mockSearchParams = Promise.resolve({
      repositoryName: 'repository',
      ownerName: 'owner'
    });

    // コンポーネントをレンダリング
    await render(
      await Page({ searchParams: mockSearchParams })
    );

    // APIアクションが正しいパラメータで呼ばれたことを確認
    expect(getRepositoryDetailAction).toHaveBeenCalledWith('owner', 'repository');
  });

  it('リポジトリ詳細コンポーネントに正しいプロパティが渡される', async () => {
    // 非同期コンポーネントとsearchParamsをモック
    const mockSearchParams = Promise.resolve({
      repositoryName: 'repository',
      ownerName: 'owner'
    });

    // コンポーネントをレンダリング
    await render(
      await Page({ searchParams: mockSearchParams })
    );

    // RepositoryDetailComponentが正しいプロパティで呼び出されたことを確認
    expect(RepositoryDetailComponent).toHaveBeenCalledWith(
      {
        fullName: mockRepositoryDetail.fullName,
        language: mockRepositoryDetail.language,
        ownerIconUrl: mockRepositoryDetail.ownerIconUrl,
        stars: mockRepositoryDetail.stars,
        watchers: mockRepositoryDetail.watchers,
        forks: mockRepositoryDetail.forks,
        issues: mockRepositoryDetail.issues,
      },
      expect.anything() // Reactコンポーネントのコンテキスト
    );
  });

  it('RepositoryDetailComponentがレンダリングされる', async () => {
    const mockSearchParams = Promise.resolve({
      repositoryName: 'repository',
      ownerName: 'owner'
    });

    // コンポーネントをレンダリング
    await render(
      await Page({ searchParams: mockSearchParams })
    );

    // コンポーネントが表示されることを確認
    const detailComponent = screen.getByTestId('repository-detail-component');
    expect(detailComponent).toBeInTheDocument();
  });

  it('親divが適切なクラスでレンダリングされる', async () => {
    const mockSearchParams = Promise.resolve({
      repositoryName: 'repository',
      ownerName: 'owner'
    });

    // コンポーネントをレンダリング
    const { container } = await render(
      await Page({ searchParams: mockSearchParams })
    );

    // 親divが正しいクラスを持っていることを確認
    const parentDiv = container.firstChild;
    expect(parentDiv).toHaveClass('flex');
    expect(parentDiv).toHaveClass('flex-col');
    expect(parentDiv).toHaveClass('items-center');
    expect(parentDiv).toHaveClass('justify-center');
  });

  it('リポジトリ詳細の取得に失敗した場合のエラーハンドリング', async () => {
    // APIエラーをシミュレート
    const errorMessage = 'リポジトリの詳細を取得できませんでした';
    (getRepositoryDetailAction as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
    const mockSearchParams = Promise.resolve({
      repositoryName: 'non-existent-repo',
      ownerName: 'non-existent-owner'
    });

    // エラーが発生することを確認
    await expect(async () => {
      await render(
        await Page({ searchParams: mockSearchParams })
      );
    }).rejects.toThrow();

    // APIは正しく呼び出された
    expect(getRepositoryDetailAction).toHaveBeenCalledWith('non-existent-owner', 'non-existent-repo');
  });
});