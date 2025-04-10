import { test, expect } from "@playwright/test";

test("検索ページのタイトルリンクが正しいことを確認", async ({ page }) => {
  await page.goto("http://localhost:3000/search");
  // タイトルリンクを特定のテキストで選択
  const titleLink = page.locator("a:has-text('Github Repository Viewer')");
  // リンクが正しいURLを指していることを確認
  await expect(titleLink).toHaveAttribute("href", "/search");

  // リンクをクリック
  await titleLink.click();

  // 新しいURLが"/search"であることを確認
  await expect(page).toHaveURL("http://localhost:3000/search");
});

test("検索結果が表示されることを確認", async ({ page }) => {
  await page.goto("http://localhost:3000/search");

  const searchInput = page.locator("input[name='q']");
  // playwrightの公式リポジトリを検索
  await searchInput.fill("microsoft/playwright");
  const searchButton = page.locator("button[type='submit']");
  await searchButton.click();

  // リポジトリ名の完全一致で検索
  const firstResultTitle = page.getByText("microsoft/playwright", {exact: true});
  await expect(firstResultTitle).toBeVisible();
});

test("検索結果から詳細に遷移することを確認", async ({ page }) => {
  await page.goto("http://localhost:3000/search");
  const searchInput = page.locator("input[name='q']");
  // playwrightの公式リポジトリを検索
  await searchInput.fill("microsoft/playwright");
  const searchButton = page.locator("button[type='submit']");
  await searchButton.click();

  // 検索結果が表示されるまで待機
  await page.waitForSelector("li");

  // リポジトリ名の完全一致で検索
  const firstResultTitle = page.getByText("microsoft/playwright", {exact: true});
  await expect(firstResultTitle).toBeVisible();

  // リンクをクリック
  await firstResultTitle.click();

  // 新しい画面になるまで待機
  await page.waitForURL("http://localhost:3000/search/221981891?ownerName=microsoft&repositoryName=playwright");

  // 詳細ページに特定の要素が存在することを確認
  const detailTitle = page.getByText("microsoft/playwright", {exact: true});
  await expect(detailTitle).toBeVisible();
  const language = page.getByText("TypeScript");
  await expect(language).toBeVisible();
}
);

test("検索結果がない場合のメッセージを確認", async ({ page }) => {
  await page.goto("http://localhost:3000/search");

  const searchInput = page.locator("input[name='q']");
  // 存在しないリポジトリを検索(今後追加される可能性もある)
  await searchInput.fill("abcabcdefdef");
  const searchButton = page.locator("button[type='submit']");
  await searchButton.click();

  const noResultsMessage = page.getByText("検索結果がありません。");
  await expect(noResultsMessage).toBeVisible();
});