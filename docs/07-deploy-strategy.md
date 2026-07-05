---
title: デプロイ戦略
status: 確定（Phase1時点）／SSH対応可否のみ要確認・実際のワークフロー実装は未着手
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
1. PRが`main`にマージされる
2. GitHub ActionsがトリガーされAstroをビルド
3. SFTP/FTP（またはSSH+rsync、プランによる）でXserverへ転送

## 3. コンテンツ公開時のデプロイ
1. スタッフがmicroCMSで記事等を公開
2. microCMSのWebhook機能がGitHubのrepository dispatchイベントを発火
3. GitHub Actionsがトリガーされ、最新のmicroCMSコンテンツを取得しつつAstroをビルド
4. Xserverへ転送

これにより**スタッフはGitやデプロイ作業を意識せず、公開ボタンを押すだけでサイトに反映される。**

## 4. ステージング環境
- 初期は**ローカルプレビュー**（`astro dev`）で代用
- 予算・体制が整い次第、Vercel/Cloudflare PagesなどでPRごとのプレビューURLを発行する構成を検討（本番のみXserver、プレビューは別サービスという二重構成）

## 5. Xserverに関する確認事項

- **契約・ドメイン**: 既存のXserver契約（スタンダードプラン）を流用。ドメイン`mikeneko.design`は既に向いている（[decisions.md#d009](./decisions.md#d009)）
- **SSH接続可否**: 公式サイトではプラン別対応表が明確に見つからず未確認。Xserverの現行プラン(スタンダード/プレミアム/ビジネス)は近年SSHに対応している認識だが、確証が取れていない。**サーバーパネル→SSH設定で利用可否を確認いただきたい**
  - SSH利用可 → SSH+rsyncまたはSCPでのデプロイを採用（高速・シンプル）
  - SSH利用不可 → FTP/SFTPでのデプロイにフォールバック（[SamKirkland/FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action) 等のGitHub Actionsが利用可能。速度はSSHよりやや劣るが機能的には問題ない）
- 無料独自SSLの対応: 未確認（スタンダードプランなら通常対応のはずだが要確認）

静的サイト（ビルド後は純粋なHTML/CSS/JS）を配信するだけなので、ハイスペックなプランは不要。スタンダードプランで十分。

## 6. CDN・キャッシュ（将来検討）
Cloudflareを前段に置く構成を将来的に検討（無料枠で十分）。初期リリースではXserver単体で問題ない。

## 7. 実装ステップ（承認後）
1. GitHub Secretsに接続情報を登録
2. `.github/workflows/deploy.yml` 実装（mainマージ時ビルド&デプロイ）
3. `.github/workflows/rebuild-on-publish.yml` 実装（microCMS Webhook受信時）
4. microCMS側でWebhook設定

これらは実装フェーズであり、ユーザーの承認後に着手する。
