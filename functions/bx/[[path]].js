// Fazo Mobile — посредник к Binance Futures для запросов, которые Binance не пропускает из браузера (демо-счёт).
// Секретный ключ сюда не приходит: телефон сам подписывает запрос, посредник только передаёт его как есть.
const HOSTS = {demo: "demo-fapi.binance.com", live: "fapi.binance.com", test: "testnet.binancefuture.com"};
export async function onRequest({request, params}) {
  const parts = [].concat(params.path || []), host = HOSTS[parts.shift()], path = parts.join("/");
  if (!host || !/^fapi\/v[123]\/[A-Za-z/]+$/.test(path) || !["GET", "POST", "DELETE", "PUT"].includes(request.method))
    return new Response(JSON.stringify({code: -1, msg: "Not allowed"}), {status: 403, headers: {"Content-Type": "application/json"}});
  const key = request.headers.get("X-MBX-APIKEY");
  const r = await fetch(`https://${host}/${path}${new URL(request.url).search}`, {method: request.method, headers: key ? {"X-MBX-APIKEY": key} : {}});
  return new Response(r.body, {status: r.status, headers: {"Content-Type": "application/json", "Cache-Control": "no-store"}});
}
