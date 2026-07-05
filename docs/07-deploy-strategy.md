---
title: デプロイ戦略
status: 確定／実際のワークフロー実装は未着手（承認待ち）
updated: 2026-07-06
---

# デプロイ戦略

## 1. 全体像
デプロイのトリガーは2系統ある。どちらも最終的にAstroをビルドし、Xserverへ静的ファイルを転送する点は共通。

```
[コード変更]  main へPRマージ ──┐
                                ├─▶ GitHub Actions: astro build ──▶ Xserverへ転送
[コンテンツ公開] microCMS Webhook ┘
```

## 2. コード変更時のデプロイ
1. `main`にpush（またはPRマージ）される
2. GitHub ActionsがトリガーされAstroをビルド
3. **SSH+rsync**でXserverへ転送（スタンダードプランでSSH利用可能なことを確認済み、[decisions.md#d010](./decisions.md#d010)）

## 3. コンテンツ公開時のデプロイ
1. スタッフがmicroCMSで記事等を公開
2. microCMSのWebhook機能がGitHubのrepository dispatchイベントを発火
3. GitHub Actionsがトリガーされ、最新のmicroCMSコンテンツを取得しつつAstroをビルド
4. Xserverへ転送

これにより**スタッフはGitやデプロイ作業を意識せず、公開ボタンを押すだけでサイトに反映される。**

## 4. ステージング環境
- 初期は**ローカルプレビュー**（`astro dev`）で代用
- 予算・体制が整い次第、Vercel/Cloudflare PagesなどでPRごとのプレビューURLを発行する構成を検討（本番のみXserver、プレビューは別サービスという二重構成）

## 5. Xserverに関する確認事項（確定）

- **契約・ドメイン**: 既存のXserver契約（スタンダードプラン）を流用。ドメイン`mikeneko.design`は既に向いている
- **SSH接続**: **利用可能なことを確認済み**（[decisions.md#d010](./decisions.md#d010)）。SSH+rsyncでのデプロイを採用する
- 無料独自SSLの対応: 未確認（スタンダードプランなら通常対応のはずだが、実装時に念のため確認する）

静的サイト（ビルド後は純粋なHTML/CSS/JS）を配信するだけなので、ハイスペックなプランは不要。スタンダードプランで十分。

## 6. CDN・キャッシュ（将来検討）
Cloudflareを前段に置く構成を将来的に検討（無料枠で十分）。初期リリースではXserver単体で問題ない。

## 7. 実装ステップ（承認後）
1. GitHub Secretsに接続情報を登録
2. `.github/workflows/deploy.yml` 実装（mainマージ時ビルド&デプロイ）
3. `.github/workflows/rebuild-on-publish.yml` 実装（microCMS Webhook受信時）
4. microCMS側でWebhook設定

これらは実装フェーズであり、ユーザーの承認後に着手する。
