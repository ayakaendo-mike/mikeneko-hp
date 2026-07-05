---
title: Git運用方針・GitHub運用
status: 確定（Phase1時点）／ブランチ保護は当面見送り（[decisions.md#d007](./decisions.md#d007)）
updated: 2026-07-06
---

# Git運用方針・GitHub運用

## 1. ブランチ戦略
- `main` = 本番反映ブランチ
- **ブランチ保護は当面設定しない**（2026-07-06時点の判断）。現在は一人体制でスピード優先のため、`main`への直pushを許可する。将来スタッフやAIエージェントによる運用が本格化し、事故のリスクが上がった段階で改めて保護設定（PR必須・レビュー必須）を有効化する（[decisions.md#d007](./decisions.md#d007)）
- ブランチ命名規則（保護設定を有効化した際に使用。現時点では任意）
  - `feature/*` — 新機能
  - `fix/*` — 不具合修正
  - `content/*` — 記事・コンテンツ関連の軽微な変更（コード側で持つ静的コンテンツのみ。microCMS上のコンテンツはGit対象外）

## 2. コミット規約
Conventional Commitsを採用: `feat:`, `fix:`, `content:`, `docs:`, `chore:`

## 3. マージ方針
Squash mergeを推奨。履歴をシンプルに保ち、AIエージェント（Claude Code）が後から差分を追いやすくする。

## 4. リポジトリ運用
- **Private推奨**（ソース非公開。将来技術ブログ用に一部OSS化する場合は別リポジトリに分離）
- Branch protection: 当面は設定しない（1章参照）。将来有効化する際はPR必須・レビュー必須・CI（lint/build）グリーン必須の設定を想定
- Secrets管理: Xserver接続情報・microCMS APIキー等はGitHub Secretsで管理。`.env`はコミットしない（`.gitignore`で除外）

## 5. Issue運用
| ラベル | 用途 |
|---|---|
| `content` | コンテンツ関連 |
| `bug` | 不具合 |
| `enhancement` | 機能追加・改善 |
| `seo` | SEO改善 |
| `ai-generated` | AIエージェントが作成したPR/Issue |
| `needs-human-review` | 人間の最終確認が必須なもの |

Issue Templates: バグ報告／コンテンツ追加／SEO改善提案 の3種を用意する。

## 6. GitHub Projects
カンバンボード（ネタ出し → 執筆中 → レビュー待ち → 公開済み）をコンテンツカレンダー兼進捗管理として運用する。

## 7. PRレビューのチェック観点
- 誤字・脱字
- リンク切れ
- OGP設定の有無
- レスポンシブ表示の確認
- （AI作成PRの場合）事実確認・ブランドトーンとの一致・法令表現チェック
