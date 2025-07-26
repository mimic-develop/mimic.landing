// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    buildAssetsDir: "assets",
    head: {
      title: 'MIMIC - Fun for All',
      meta: [
        // 기본 메타 태그
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'MIMIC - My 3rd Place' },

        // SEO 메타 태그
        { name: 'keywords', content: 'MIMIC, 게임, 플랫폼, 모바일게임, 엔터테인먼트, All in Fun, 3rd place' },
        { name: 'author', content: 'MIMIC Team' },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'ko-KR' },

        // Open Graph (소셜 미디어 공유용)
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'MIMIC - All in Fun' },
        { property: 'og:description', content: 'MIMIC - My 3rd Place' },
        {
          property: 'og:image',
          content: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230626_267%2F1687738654396hqllR_PNG%2FMimic_Logo_512_512.png'
        },
        {
          property: 'og:image:secure_url',
          content: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230626_267%2F1687738654396hqllR_PNG%2FMimic_Logo_512_512.png'
        },
        { property: 'og:site_name', content: 'MIMIC' },
        { property: 'og:locale', content: 'ko_KR' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'MIMIC - All in Fun' },
        { name: 'twitter:description', content: 'MIMIC - 혁신적인 게임 플랫폼으로 모든 재미를 경험하세요' },
        { name: 'twitter:image', content: 'https://your-domain.com/twitter-image.jpg' },

        // 모바일 최적화
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },

        // 검색 엔진 최적화
        { name: 'theme-color', content: '#000000' },
        { name: 'msapplication-TileColor', content: '#000000' },
      ],
      link: [
        // 파비콘
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },

        // 정규 URL (SEO 중복 콘텐츠 방지)
        { rel: 'canonical', href: 'https://mimic.poker' }, // 실제 도메인으로 변경
      ]
    }
  }
})
