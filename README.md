# 開発環境整備

前提条件：vscodeとdockerがインストール済みであること  
vscodeは拡張機能のdev containerをインストール済みであること

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

vscodeの拡張機能dev containerの機能で「コンテナを再度開く」を選択して、
開発コンテナを開く

# サーバの立ち上げ

開発サーバを立ち上げる

```
npm run dev
```

本番ビルドでサーバを立ち上げる

```
npm run build
npm run start
```

## テストコード

単体テストコードとコンポーネントテストが実施される

```
npm run test
```

end-to-endのテストが実施される

```
npm run dev
# 新しくコンソールを立ち上げて
npx playwright test
```

