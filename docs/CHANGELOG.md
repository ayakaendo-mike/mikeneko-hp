# 変更履歴

## 2026-07-07（blog一覧・個別ページを実装）
- `/blog/`一覧・個別ページ（`[slug].astro`新設）をmicroCMS（blog API）連携で実装。`/works/`と同じパターンで0件の間は「準備中」表示＋noindex
- 構造化データに`article()`（Article schema）を追加（`structured-data.ts`）。E-E-A-T対策として執筆者名を記事詳細ページに明示（docs/03 4章）
- フッターナビに「ブログ」リンクを追加
- 記事投入自体はユーザーが後日行う（保留方針は変わらず）。ページ実装が完了したので、記事執筆後は投入するだけで一覧・詳細が自動生成される

## 2026-07-07（microCMS連携: faq/works）
- microCMSの`.env`（サービスドメイン・APIキー）を設定
- `/faq/`をmicroCMS（faq API）連携に切り替え。ハードコードしていた6問はmicroCMS管理画面に移行済み
- `/works/`一覧・個別ページ（`[slug].astro`新設）をmicroCMS（works API）連携で実装。0件の間は「準備中」表示を維持
- `microcms.ts`のBlog型でcategory/tagsをセレクト型（string/string[]）に修正（実スキーマと不一致だった）
- blog記事の執筆は保留中のため、blog連携の実装は次回以降

## 2026-07-06（下層ページ実装）
- 共通部品を追加: PageHeader（パンくず+JSON-LD対応）・CtaSection・CycleDiagram（トップと会社概要で共用化）
- サービスをデータ駆動化（`src/data/services.ts` がSSoT）。`/service/` 一覧＋個別8ページを動的生成（DX支援は当面提供外のため未定義）
- `/about/`（会社概要。代表者名・設立年は入稿待ちプレースホルダー）
- `/price/`（仮価格帯）・`/flow/`（5ステップ詳細）
- `/area/`（地域SEOの本命。東葛エリア集約＋FAQPage構造化データ、GBP導線はTODO）
- `/contact/`（フォームは暫定mailto方式。送信基盤確定後にPOSTへ差し替え）＋`/contact/thanks/`
- `/privacy/`（GA4・Cookie記載込み。制定日等は公開前に最終確認）
- `/faq/`（初期6問＋FAQPage構造化データ）・`/works/`（準備中プレースホルダー・noindex）
- 全20ページのビルド成功・内部リンク切れゼロを機械チェックで確認

## 2026-07-06（実機レビュー反映3）
- サイクル図（モバイル）で中心円と左右のカードがほぼ密着していた問題を修正。中心円をやや縮小(40%)し、左右ノード位置を6%/94%に調整。実測ギャップ 1〜3px → 16〜19px に改善（画面端の余白27〜29pxは維持）

## 2026-07-06（実機レビュー反映2）
- About usのサイクル図（丸い図）がモバイルで画面端ギリギリだったため、`max-width:260px`＋ノード位置調整で左右に余白を確保（375px幅で左右とも約35px余白を確認）
- 「過去の事例」カードに画像スロット(`.case-media`)を追加。画像未設定時は「画像準備中」のプレースホルダーを表示し、原稿・画像は入稿待ちとした
- 事例タイトルを1行固定に変更（`white-space:nowrap`+`text-overflow:ellipsis`。文言も1行に収まる長さへ調整）

## 2026-07-06（実機レビュー反映）
- トップページの余白を調整（詰まり解消）: セクション余白 `112px 0 152px`（上112・下152px）、sec-headの罫線下パディング 56px・見出し下の余白 52px
- 「窓口は、ひとつ。」(.onestop)・「ご相談・お見積りは無料です。」(.flow-note) ブロックの上余白を 56px に
- 下部CTAをフォーム誘導のみに変更（メール相談ボタンを削除）

## 2026-07-06（Phase2着手：Astro実装）
- Astro 7.0.6 でプロジェクトを初期化（脆弱性ゼロ）。@astrojs/sitemap・microcms-js-sdk を導入
- デザイントークン（`src/styles/tokens.css`）とグローバルCSS（`src/styles/global.css`）をC案から実装
- 共通コンポーネント: `Logo.astro`（差し替え可能なワードマーク）・`Header.astro`（モバイルドロワー付き）・`Footer.astro`・`BaseLayout.astro`（SEOメタ/OGP/canonical/JSON-LD対応）
- サイト共通設定 `src/config/site.ts`、構造化データヘルパー `src/lib/structured-data.ts`（LocalBusiness+areaServed）
- microCMSクライアント雛形 `src/lib/microcms.ts`（未設定でもビルドが通る設計）＋ `.env.example`
- **トップページ `src/pages/index.astro` をC案ベースで実装**（全8セクション・レスポンシブ・a11y配慮）
- 404ページ・favicon・robots.txt
- `astro build` 成功を確認（2ページ＋サイトマップ生成、脆弱性0）

## 2026-07-06（追記9）
- 東葛ローカルSEO×AIO戦略を確定（[decisions.md#d012](./decisions.md#d012)）。SEO戦略ドキュメント3章を全面拡充（基本フレーズ・title/description雛形・/area/設計・AIO方針）
- モックアップに地域表記を反映（ヒーロー3枠のAREAを「千葉・東葛／オンラインで全国対応」、フッターに控えめな地域1行を復活）
- SEOドキュメントのポジショニング表記を「制作会社」→「事業成長のパートナー（ITパートナー）」に統一

## 2026-07-06（追記8）
- C案承認。微調整を反映（お悩みカードをA案風の薄い塗りに／S-03を「AI導入支援」に変更／CTAの連絡先枠とフッターのエリア表記を削除＝オンラインで全国対応のため）

## 2026-07-06（追記7）
- デザインフィードバックを反映したC案 `mockups/top-c.html` を作成し、デザイン方向を確定（[decisions.md#d011](./decisions.md#d011)）
  - イエローベース／黒は線と影のみ／「みけねこデザインの特徴」／ITパートナーのポジショニング／料金→事例差し替え／押せる要素のカード型トンマナ統一
- デザインガイド（08-design-guide.md）をC案基準に全面更新

## 2026-07-06（追記6）
- ワイヤーフレーム（wireframe.html）の構成が承認された
- トップページの別デザイン案 `mockups/top-b.html` を作成（黄色メイン・先進性×あたたかみ×信頼感の方向。A案=top.htmlとの比較用）

## 2026-07-06（追記5）
- トップページの高精度デザイン案 `mockups/top.html` を作成（確定デザインシステム反映・レスポンシブ）
- 主要5ページのワイヤーフレーム `mockups/wireframe.html` を作成（PC/スマホ両対応・ローファイ）
- ※当初リモート（クラウド）エージェントで作成を試みたが途中停止したため、ローカルセッションで作成し直した

## 2026-07-06（追記4）
- XserverスタンダードプランでSSH利用可能なことを確認。デプロイ方式をSSH+rsyncに確定（[decisions.md#d010](./decisions.md#d010)）
- Phase1で洗い出した未確定事項が全て解消。Phase2（Astro実装）着手の前提条件が整った

## 2026-07-06（追記3）
- ドメイン(https://mikeneko.design)・Xserverプラン(スタンダード)・microCMSプラン(無料)を確定
- microCMS公式料金ページを確認し、無料プランで4コンテンツモデルが問題なく収まることを検証（[decisions.md#d009](./decisions.md#d009)）
- Xserverスタンダードプランのssh対応可否は未確認。サーバーパネルでの確認を依頼中。FTPフォールバック方針を追記

## 2026-07-06（追記2）
- Xserverは既存契約を流用（新規契約なし）、ドメイン設定済みであることを反映
- microCMSアカウントは作成済みであることを反映（[decisions.md#d008](./decisions.md#d008)）

## 2026-07-06（追記）
- GitHub Issueテンプレート（バグ報告/コンテンツ追加/SEO改善提案）を追加
- コンテンツ・素材準備チェックリスト（docs/09-content-checklist.md）を追加

## 2026-07-06
- ロゴ方針確定: 営業資料の猫マークは不採用。テキストワードマーク＋差し替え可能なコンポーネント設計を採用
- お客様の声は初期リリースで非掲載に決定（`/voice/`はコンテンツモデルのみ維持）
- LINE公式（+エルメ）をテスト運用中。将来導線追加を見据えつつ初期スコープからは除外
- フォーム送信先を`info@mikeneko.design`に確定、GA4は導入予定として記録
- Xserver契約・microCMSアカウント作成は翌日(2026-07-07)実施予定として記録
- GitHubのブランチ保護は当面見送り、`main`への直pushを許可する運用に変更（[decisions.md#d007](./decisions.md#d007)）

## 2026-07-05
- 既存の営業資料（`営業資料/みけねこデザイン_会社案内.html`）からカラーパレット・フォント・簡易ロゴマーク・料金帯・ブランドメッセージを発見し反映
- デザインガイド確定（カラー/フォント）。ロゴ採用可否は継続検討
- 料金ページ方針確定（大まかな価格帯を仮掲載）
- 制作実績の掲載件数確定（Web4〜5/グラフィック4〜5/名刺5〜6/サポート事例2）
- 公開目標日（2026年7月中）・予算方針（サーバー代+AI利用料程度）を確定
- サービスページに「デザイン制作」「ITサポート」を追加（[decisions.md#d006](./decisions.md#d006)）

## 2026-07-04
- Phase1レビュー実施。Project.mdの改善提案・不足要件の洗い出しを実施
- 技術スタック決定: Astro + microCMSハイブリッド構成（[decisions.md#d001](./decisions.md#d001)）
- `docs/` 一式を作成
  - プロジェクト概要（00-project-overview.md）
  - 要件定義（01-requirements.md）
  - サイト構成・IA（02-site-structure.md）
  - SEO設計・コンテンツ戦略（03-seo-content-strategy.md）
  - 技術スタック・ディレクトリ設計（04-tech-architecture.md）
  - Git/GitHub運用（05-git-github-operations.md）
  - 更新フロー・AI運用ガイド（06-operation-guide.md）
  - デプロイ戦略（07-deploy-strategy.md）
  - デザインガイドたたき台（08-design-guide.md）
  - 決定事項ログ（decisions.md）
- Project.mdのファイル名に混入していた誤った先頭スペースを修正
