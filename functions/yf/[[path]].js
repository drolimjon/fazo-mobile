// Fazo Mobile — посредник к Yahoo Finance (браузер не может обращаться к Yahoo напрямую).
// Разрешены только чтение графиков, котировок и поиск.
const ALLOW = [/^v8\/finance\/chart\/[^/]+$/, /^v8\/finance\/spark$/, /^v1\/finance\/search$/];
export async function onRequest({request, params}) {
  const path = [].concat(params.path || []).join("/");
  if (request.method !== "GET" || !ALLOW.some(r => r.test(path))) return new Response("Not allowed", {status: 403});
  const url = "https://query1.finance.yahoo.com/" + path + new URL(request.url).search;
  const r = await fetch(url, {headers: {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131 Safari/537.36", "Accept": "application/json"},
    cf: {cacheTtl: path.startsWith("v1") ? 3600 : 3, cacheEverything: true}});
  return new Response(r.body, {status: r.status, headers: {"Content-Type": "application/json", "Cache-Control": "no-store", "Access-Control-Allow-Origin": "*"}});
}
