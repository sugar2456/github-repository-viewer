# Githubリポジトリ検索Webサイト

githubのリポジトリを検索できるwebサイト

検索ワードと部分一致したリポジトリ名が検索結果として表示される

# 開発環境整備

## 前提条件

vscode/docker/gitがインストール済みであること  
vscodeは拡張機能dev containerをインストール済みであること

## ソースコードの取得

```
gh repo clone sugar2456/github-repository-viewer
```

## コンテナの立ち上げ

プロジェクトのルートでvscodeを立ち上げる

```
cd github-repository-viewer
code .
```

vscodeの拡張機能dev containerの機能で「コンテナを再度開く」を選択して、開発コンテナを開く

## サーバの立ち上げ

開発サーバを立ち上げる

```
npm run dev
```

本番ビルドでサーバを立ち上げる

```
npm run build
npm run start
```

## 検索画面URL

検索画面URL

ここから検索をする

```
http://localhost:3000/search
```

## テストコード

単体テストコードとコンポーネントテストが実施される

```
npm run test
```

end-to-endのテストが実施される

```
# あらかじめ開発サーバを起動
npm run dev
# 新しくコンソールを立ち上げて、テストを実施
npx playwright test
```

# バージョン情報

- Next 15.2.4
- React 19.0.0
- Node 23
- typescript 5.8.3

# 生成AIを利用した箇所

github copilotを利用  
チャット利用した実装の相談やpull request時のレビュー  
プロジェクト全般のソースコードでコード提案機能を利用  

# こだわった点

## 機能面
検索ワード入力欄ではリポジトリ名になり得ない文字はバリデーションチェックがある  

## デザイン面

レスポンシブ対応済みでデスクトップ画面、タブレット画面、スマホ画面でレイアウトが崩れない  
google material desginっぽいレイアウトを目指した  
シンプルな配色やカードなどで情報のまとまりを表現している

ファビコンはgoogle material iconをベースにfigmaで加工して作成した。

## ソースコード

ビジネスロジック、データアクセスはappフォルダから分離して  
libフォルダにtypescriptとして格納。  

フレームワークから分離しているので、  
別フレームワークの移行することになっても、  
テストコードごと持ち運べる  

## 運用面

テストコードは単体テストとE2Eテストを用意してある。  
github actionを利用したCD/CI環境を構築  
