import { next } from '@vercel/edge';

const BOT_REGEX = /googlebot|bingbot|linkedinbot|twitterbot|facebookexternalhit|slackbot|whatsapp|discordbot|telegrambot|applebot|baiduspider|yandex|duckduckbot|ia_archiver|gptbot|claudebot|perplexitybot|prerender/i;

export const config = {
  matcher: '/((?!api|_next|.*\\.).*)',
};

export default async function middleware(request: Request) {
  const ua = request.headers.get('user-agent') || '';
  if (!BOT_REGEX.test(ua)) {
    return next();
  }

  const url = new URL(request.url);
  const prerenderUrl = `https://service.prerender.io/${url.href}`;

  const res = await fetch(prerenderUrl, {
    headers: {
      'X-Prerender-Token': '9FXMissNOY9THXVJgoaI',
      'User-Agent': ua,
    },
  });

  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
}
