/**
 * microCMS APIクライアント
 * docs/04-tech-architecture.md 準拠。コンテンツモデル: blog / works / news / faq。
 *
 * 環境変数（.env / GitHub Secrets で設定。コミットしない）:
 *   MICROCMS_SERVICE_DOMAIN … サブドメイン（xxxx.microcms.io の xxxx）
 *   MICROCMS_API_KEY         … 読み取りAPIキー
 *
 * 注意: アカウント作成済みだが各APIは未作成のため、実際のフィールド型は
 *       microCMS側のスキーマ確定後にこの型定義と突き合わせて調整する。
 */
import { createClient } from 'microcms-js-sdk';

const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;

/** 環境変数が未設定でもビルドが落ちないようにする（コンテンツ実装前の段階向け） */
export const isMicroCMSConfigured = Boolean(serviceDomain && apiKey);

export const client = isMicroCMSConfigured
  ? createClient({ serviceDomain: serviceDomain!, apiKey: apiKey! })
  : null;

// ---- コンテンツ型（暫定。microCMSスキーマ確定後に要調整） ----
export interface Blog {
  id: string;
  title: string;
  slug?: string;
  eyecatch?: { url: string; width: number; height: number };
  body: string;
  category?: { id: string; name: string };
  tags?: { id: string; name: string }[];
  author?: string;
  metaDescription?: string;
  publishedAt: string;
}

export interface Work {
  id: string;
  title: string;
  slug?: string;
  thumbnail?: { url: string; width: number; height: number };
  workType?: string;
  industry?: string;
  serviceType?: string[];
  clientName?: string;
  body: string;
  externalUrl?: string;
  publishedAt: string;
}

export interface News {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

/** 一覧取得の薄いラッパー。未設定時は空配列を返す（ビルドを止めない）。 */
export async function getList<T>(
  endpoint: 'blog' | 'works' | 'news' | 'faq',
  queries?: Record<string, unknown>,
): Promise<T[]> {
  if (!client) return [];
  const res = await client.getList<T>({ endpoint, queries });
  return res.contents;
}
