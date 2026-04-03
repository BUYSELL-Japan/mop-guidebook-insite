// Cloudflare Worker - 静的アセット対応版
// このコードをCloudflare Workersに適用してください

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. 静的アセットは直接Netlifyに転送（Workerをバイパス）
    if (
      url.pathname.startsWith('/_astro/') ||
      url.pathname.startsWith('/favicon.') ||
      url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|webmanifest|woff|woff2|ico)$/)
    ) {
      // 静的ファイルはキャッシュを有効化してそのままフェッチ
      const response = await fetch(request);
      const headers = new Headers(response.headers);

      // 静的アセットは長期キャッシュ
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: headers
      });
    }

    // 2. HTMLファイルはキャッシュを最小化
    if (
      url.pathname.endsWith('/') ||
      url.pathname.endsWith('.html') ||
      url.pathname.match(/\/(zh|en)\/guidebook/)
    ) {
      const response = await fetch(request);
      const headers = new Headers(response.headers);

      // HTMLは常に最新版をチェック
      headers.set('Cache-Control', 'public, max-age=0, must-revalidate');

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: headers
      });
    }

    // 3. その他のリクエスト処理
    return fetch(request);
  }
};
