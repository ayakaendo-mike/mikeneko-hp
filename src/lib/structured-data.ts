/**
 * 構造化データ（JSON-LD）ヘルパー
 * docs/03-seo-content-strategy.md 2章・3章 準拠。
 * 地域SEO: LocalBusiness の areaServed に東葛各市を明示する。
 */
import { SITE, SERVICE_AREAS } from '../config/site.ts';

/** LocalBusiness / Organization（TOP・会社概要用） */
export function localBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    alternateName: SITE.nameEn,
    url: SITE.url,
    email: SITE.email,
    image: new URL(SITE.ogImage, SITE.url).href,
    description: SITE.defaultDescription,
    slogan: SITE.catchcopy,
    // サービス提供地域型（住所非公開・対応エリアで表現。docs 3-4 / decisions D012）
    areaServed: SERVICE_AREAS.map((name) => ({ '@type': 'City', name })),
    address: {
      '@type': 'PostalAddress',
      addressRegion: '千葉県',
      addressLocality: '松戸市',
      addressCountry: 'JP',
    },
    knowsAbout: [
      'ホームページ制作',
      'WordPress',
      'Web改善',
      'SEO',
      'AI活用支援',
      'DX支援',
      'LINE公式構築',
      'グラフィックデザイン',
      'ITサポート',
    ],
  };
}

/** パンくず（BreadcrumbList） */
export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.path, SITE.url).href,
    })),
  };
}

/** FAQPage（FAQ・AIO対策。docs 3-5） */
export function faqPage(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
