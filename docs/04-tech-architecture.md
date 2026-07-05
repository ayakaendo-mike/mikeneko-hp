---
title: 技術スタック・ディレクトリ設計
status: 確定（Phase1時点）／src以下の実装は未着手
updated: 2026-07-04
---

# 技術スタック・ディレクトリ設計

## 1. 技術スタック: Astro + microCMS ハイブリッド構成

コード・構造（デザイン／機能／SEOロジック）はAstro＋Gitで管理しClaude Codeが改修する。
頻繁に更新するコンテンツ（ブログ／実績／お知らせ／FAQ）はmicroCMSでスタッフが直接編集する。

選定理由・比較検討の詳細は [decisions.md - D001](./decisions.md#d001) を参照。

| 領域 | 技術 | 担当者 |
|---|---|---|
| コード・デザイン・機能 | Astro（静的サイトジェネレーター）+ GitHub | Claude Code / 開発者 |
| コンテンツ（ブログ/実績/お知らせ/FAQ） | microCMS | 社内スタッフ（AI活用） |
| ホスティング | Xserver | - |
| 画像最適化 | Astro Image / microCMSの画像API | - |
| サイト内検索（将来） | Pagefind | - |

### トレードオフの明記
コンテンツ本文はGitでバージョン管理されず、microCMS側のクラウドDBに保存される（microCMS自体に変更履歴・公開予約機能はあり）。「全部Gitで管理したい」という要求より「スタッフがGit不要で更新できる」ことを優先した判断。

## 2. microCMSコンテンツモデル設計（案）

### blog（ブログ記事）
| フィールド | 型 | 備考 |
|---|---|---|
| title | テキスト | |
| slug | テキスト | URL用 |
| eyecatch | 画像 | |
| body | リッチエディタ | |
| category | セレクト | ホームページ制作/WordPress/AI導入/DX/LINE構築/ITサポート |
| tags | 複数選択 | |
| author | テキスト | E-E-A-T対策として必須 |
| publishedAt | 日付 | |
| metaDescription | テキスト | SEO用 |

### works（制作実績）
| フィールド | 型 | 備考 |
|---|---|---|
| title | テキスト | |
| slug | テキスト | |
| thumbnail | 画像 | |
| industry | セレクト | 業種 |
| serviceType | 複数選択 | `/service/`との対応付け |
| clientName | テキスト | 掲載可否は案件ごとに確認 |
| body | リッチエディタ | |
| externalUrl | テキスト | 公開サイトURL（あれば） |
| publishedAt | 日付 | |

### news（お知らせ）
| フィールド | 型 |
|---|---|
| title | テキスト |
| body | リッチエディタ |
| publishedAt | 日付 |

### faq（よくある質問）
| フィールド | 型 |
|---|---|
| question | テキスト |
| answer | リッチエディタ |
| category | セレクト |

> ⚠️ microCMSの料金プランによってコンテンツモデル（API）数の上限が異なる可能性があるため、契約前に最新の料金ページで確認すること（[01-requirements.md](./01-requirements.md) 未確定事項参照）。

## 3. ディレクトリ設計（案）

実装（Phase2以降・承認後）で実際にスキャフォールドする想定の構成。現時点ではdocs/のみ作成済み。

```
/
├── docs/                          設計・運用ドキュメント（作成済み）
├── src/
│   ├── components/                UIコンポーネント
│   ├── layouts/                   共通レイアウト
│   ├── pages/                     ルーティング（Astroファイルベース）
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── service/
│   │   ├── price.astro
│   │   ├── flow.astro
│   │   ├── area.astro
│   │   ├── contact.astro
│   │   ├── privacy.astro
│   │   ├── works/[slug].astro     microCMSから取得
│   │   ├── voice/[slug].astro     microCMSから取得
│   │   ├── blog/[slug].astro      microCMSから取得
│   │   ├── news/[slug].astro      microCMSから取得
│   │   └── faq.astro              microCMSから取得
│   ├── lib/
│   │   └── microcms.ts            microCMS APIクライアント
│   └── styles/
├── public/
│   ├── images/
│   ├── robots.txt
│   └── favicon一式
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml             コード変更(main push)時のビルド&デプロイ
│   │   └── rebuild-on-publish.yml microCMS Webhook受信時の再ビルド&デプロイ
│   └── ISSUE_TEMPLATE/
├── astro.config.mjs
├── package.json
└── README.md
```

## 4. 次の実装ステップ（承認後）
1. `npm create astro@latest` でプロジェクト初期化
2. microCMSアカウント作成・コンテンツモデル本設定
3. `src/lib/microcms.ts` でAPIクライアント実装
4. 各ページのコンポーネント実装
5. GitHub Actionsワークフロー実装（[07-deploy-strategy.md](./07-deploy-strategy.md) 参照）

これらはすべて実装フェーズであり、ユーザーの承認後に着手する。
