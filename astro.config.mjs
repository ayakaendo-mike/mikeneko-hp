// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// サイトの正式URL（canonical / sitemap / OGP で使用）
export default defineConfig({
  site: 'https://mikeneko.design',
  integrations: [sitemap()],
  build: {
    // Xserverへrsyncする都合上、末尾スラッシュのディレクトリ構成で出力
    format: 'directory',
  },
});
