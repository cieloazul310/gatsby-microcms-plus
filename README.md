# Gatsby + microCMS Template

[Gatsby] + [microCMS] の最小限のテンプレートです。

## デモサイト

<https://cieloazul310.github.io/gatsby-microcms/>

## リポジトリの使い方

このリポジトリは Template Repository です。
「Use this template」>「Create a new repository」でテンプレートを使って新規リポジトリを作成することができます。

### APIの作成

microCMSに登録後、以下の2種類のAPIを作成。

#### 1. 最初のAPI

以下のチュートリアルに従って作成  
<https://document.microcms.io/tutorial/gatsby/gatsby-getting-started>

- API名: 最初のAPI (何でもよい)
- エンドポイント: **hello**
- APIの型: **オブジェクト形式**

##### 最初のAPIのフィールド

- フィールドID: **text**
- 表示名: テキスト(何でもよい)
- 種類: テキストフィールド

#### 2. ブログ

microCMS のテンプレートから API を自動作成  
<https://document.microcms.io/manual/create-api>

- API名: ブログ (自動)
- エンドポイント: **blogs** (自動)
- APIの型: リスト形式 (自動)

##### ブログのフィールド

| フィールドID | 表示名     | 種類                    |
|------------|-----------|------------------------|
| title      | タイトル    | テキストフィールド        |
| content    | 内容       | リッチエディタ           |
| eyecatch   | アイキャッチ | 画像                   |
| category   | カテゴリ    | コンテンツ参照 - カテゴリ |

このテンプレートでは title フィールドと content フィールドのみ使用

### gatsby-config.ts の編集

gatsby-config.ts の `siteMetadata` と、 `gatsby-source-microcms` の `serviceId` を設定

```ts
const config: GatsbyConfig = {
  siteMetadata: {
    title: `サイト名`,
    description: `サイトの説明`,
    author: `作者名`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: process.env.MICROCMS_APIKEY,
        // microCMSのサービスID
        serviceId: 'YOUR_SERVICEID',
        apis: [
          { endpoint: 'hello', format: 'object' },
          { endpoint: 'blogs', format: 'list' },
        ],
      },
    },
  ],
};
```

ローカル環境で開発、ビルドをおこなう場合は `.env` ファイルに microCMS のAPIキーを記述。

参考: dotenv  
<https://github.com/motdotla/dotenv>

## Github Pagesに公開する

microCMS の Webhook 機能を使うことで、コンテンツの更新に合わせて Github Actions で自動でビルド、デプロイすることができる

参考: メディアのWebhookを設定  
<https://document.microcms.io/manual/medium-webhook-setting>

### Repository secrets の設定

リポジトリ内の「Settings」>「Security」>「Secrets and variables」>「Actions」のページに移動し、New repository secrets に以下の通りに設定

- Name: **MICROCMS_APIKEY**
- Secret: microCMSで取得したAPIキー

参考: 暗号化されたシークレット  
<https://docs.github.com/ja/actions/security-guides/encrypted-secrets>

### Github Pages の設定

リポジトリ内の「Settings」>「Code and automation」>「Pages」に移動し、「Build and deployment」>「Source」に「Github Actions」を設定

[.github/workflows/gatsby.yml](/blob/main/.github/workflows/gatsby.yml)

参考: GitHub Pages サイトの公開元を設定する  
<https://docs.github.com/ja/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>

### Webhook を設定

最初のAPI、ブログAPIの画面右上のAPI設定から「API設定」>「Webhook」>「Github Actions」と移動し設定

- Webhookの識別名
- [Githubトークンを取得](https://docs.github.com/ja/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- リポジトリのユーザ名
- リポジトリ名
- トリガーイベント名: **update_blogs**

コンテンツのWebhookを設定  
<https://document.microcms.io/manual/webhook-setting#hf0d425ae06>

[Gatsby]: https://www.gatsbyjs.com "Gatsby"
[microCMS]: https://microcms.io "microCMS"
