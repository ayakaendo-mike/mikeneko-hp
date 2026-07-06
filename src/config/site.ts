/**
 * サイト共通設定（Single Source of Truth）
 * 会社名・キャッチコピー・ナビ・SEOの既定値をここで一元管理する。
 * docs/03-seo-content-strategy.md / docs/08-design-guide.md 準拠。
 */

export const SITE = {
  /** 会社名（表示用） */
  name: 'みけねこデザイン',
  /** 欧文表記 */
  nameEn: 'MIKENEKO DESIGN',
  /** サイトの正式URL（astro.config.mjs の site と一致させる） */
  url: 'https://mikeneko.design',
  /** 既定のタイトル（トップ用） */
  defaultTitle: '松戸・鎌ケ谷のホームページ制作／IT・AI活用支援｜みけねこデザイン',
  /** タイトルのテンプレート（下層ページ用。%s にページ名が入る） */
  titleTemplate: '%s｜みけねこデザイン',
  /** 既定のメタディスクリプション（docs 3-3 の雛形） */
  defaultDescription:
    '千葉県松戸市・鎌ケ谷市など東葛地域を中心に、オンラインで全国対応。ホームページ制作からWeb改善・IT・AI活用・デザイン制作まで、事業成長を伴走するITパートナーです。',
  /** キャッチコピー */
  catchcopy: 'Webを、事業の「働く資産」へ。',
  /** 問い合わせ先メール */
  email: 'info@mikeneko.design',
  /** 地域の基本フレーズ（docs 3-1） */
  areaPhrase: '松戸・鎌ケ谷など東葛地域を中心に、オンラインで全国対応',
  /** OGP画像（正式ロゴ確定までは仮） */
  ogImage: '/ogp.png',
  /** 言語 */
  locale: 'ja_JP',
  lang: 'ja',
} as const;

/** グローバルナビ */
export const NAV_ITEMS = [
  { label: 'サービス', href: '/service/' },
  { label: '制作実績', href: '/works/' },
  { label: '私たちについて', href: '/about/' },
  { label: '料金', href: '/price/' },
  { label: 'ご相談の流れ', href: '/flow/' },
] as const;

/** 対応エリア（LocalBusiness の areaServed に使用。docs 3 準拠） */
export const SERVICE_AREAS = [
  '松戸市',
  '鎌ケ谷市',
  '柏市',
  '流山市',
  '我孫子市',
  '野田市',
  '船橋市',
  '市川市',
] as const;

/** フッターのサービスリンク（ラベルは src/data/services.ts のtitleと一致させる） */
export const FOOTER_SERVICES = [
  { label: 'ホームページ制作', href: '/service/homepage/' },
  { label: 'Web改善・保守運用', href: '/service/support/' },
  { label: 'デザイン制作', href: '/service/graphic/' },
  { label: 'AI導入支援', href: '/service/ai/' },
  { label: 'ITサポート', href: '/service/it-support/' },
] as const;
