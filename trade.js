/* Fazo Mobile — торговля по API-ключам: Binance Futures (USDT-M) и Bybit (USDT-перпетуалы).
   Запросы подписываются прямо в телефоне (WebCrypto HMAC-SHA256), ключи хранятся только на телефоне,
   зашифрованные PIN-кодом (PBKDF2 + AES-GCM), и расшифровываются лишь в памяти на время сессии. */
"use strict";
Object.assign(EN, {
  "Торговля": "Trade", "Счёт": "Account", "Баланс": "Equity", "Доступно": "Available", "Нереализ. P&L": "Unrealized P&L",
  "Позиции": "Positions", "Нет открытых позиций": "No open positions", "Ордера": "Orders", "Нет активных ордеров": "No open orders",
  "Подключите API-ключ биржи": "Connect the exchange API key", "API-ключ": "API key", "Секретный ключ": "Secret key",
  "Демо-счёт": "Demo account", "Реальный счёт": "Live account", "PIN-код (минимум 4 цифры)": "PIN (at least 4 digits)",
  "Повторите PIN": "Repeat PIN", "Сохранить": "Save", "PIN не совпадает": "PINs do not match", "PIN слишком короткий": "PIN is too short",
  "Заполните ключ и секрет": "Fill in the key and secret", "Ключ сохранён": "Key saved", "Введите PIN": "Enter PIN",
  "Разблокировать": "Unlock", "Неверный PIN": "Wrong PIN", "Заблокировать": "Lock", "Удалить ключ": "Remove key",
  "Удалить ключ с этого телефона?": "Remove the key from this phone?", "Ключ удалён": "Key removed",
  "Ключ заблокирован PIN-кодом": "The key is locked with a PIN",
  "Безопасность: в настройках ключа на бирже включите только фьючерсную торговлю. Вывод средств не включайте. Ключ хранится только на этом телефоне, зашифрованный вашим PIN-кодом.":
    "Security: in the key settings on the exchange enable futures trading only. Do not enable withdrawals. The key is stored only on this phone, encrypted with your PIN.",
  "Купить": "Buy", "Продать": "Sell", "Рыночный": "Market", "Лимитный": "Limit", "Количество": "Quantity", "Плечо": "Leverage",
  "Тейк-профит": "Take profit", "Стоп-лосс": "Stop loss", "необязательно": "optional", "Проверьте ордер": "Review the order",
  "Подтвердить": "Confirm", "Ордер отправлен": "Order sent", "Закрыть позицию": "Close position", "Позиция закрыта": "Position closed",
  "Отменить ордер": "Cancel order", "Ордер отменён": "Order cancelled", "по рынку": "at market", "по цене": "at price",
  "Торговля доступна для Binance Futures и Bybit. Откройте инструмент с этих бирж.": "Trading is available for Binance Futures and Bybit. Open a symbol from these exchanges.",
  "Сначала подключите API-ключ во вкладке «Торговля»": "Connect the API key in the Trade tab first",
  "Количество меньше минимального": "Quantity is below the minimum", "Укажите цену": "Enter the price",
  "Ордер исполнен, но TP/SL не выставлены": "Order filled, but TP/SL were not placed", "примерно": "approx.",
  "Биржа": "Exchange", "Сторона": "Side", "Тип": "Type", "Цена": "Price", "Закрыть": "Close", "мин.": "min.",
  "Binance Spot не принимает запросы с ключом из браузера, поэтому торговля на Binance — через фьючерсы.":
    "Binance Spot does not accept keyed requests from a browser, so Binance trading goes through futures."
});

const TR = (() => {
  const EXS = {
    BINANCEF: {label: "Binance Futures", live: "https://fapi.binance.com", demo: "https://demo-fapi.binance.com"},
    BYBIT: {label: "Bybit", live: "https://api.bybit.com", demo: "https://api-demo.bybit.com"}
  };
  let ex = LS.get("tex", "BINANCEF");
  const keys = {};                       // расшифрованные ключи — только в памяти
  const data = {};                       // ex -> {acc, pos, ord, err, t}
  const off = {};                        // ex -> поправка часов (мс)
  const finfo = {};                      // ex:sym -> {step, minQty, tick, minNotional}
  let dual = null, lines = [], timer = null;
  const enc = s => new TextEncoder().encode(s);
  const b64 = b => btoa(String.fromCharCode(...new Uint8Array(b)));
  const unb64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  const store = () => LS.get("tk", {});

  /* ---------- шифрование ключей PIN-кодом ---------- */
  async function aesKey(pin, salt) {
    const base = await crypto.subtle.importKey("raw", enc(pin), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({name: "PBKDF2", salt, iterations: 250000, hash: "SHA-256"}, base, {name: "AES-GCM", length: 256}, false, ["encrypt", "decrypt"]);
  }
  async function saveKeys(e, k, s, demo, pin) {
    const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = await crypto.subtle.encrypt({name: "AES-GCM", iv}, await aesKey(pin, salt), enc(JSON.stringify({k, s})));
    const st = store(); st[e] = {salt: b64(salt), iv: b64(iv), ct: b64(ct), demo: !!demo}; LS.set("tk", st);
    keys[e] = {k, s, demo: !!demo};
  }
  async function openKeys(e, pin) {
    const x = store()[e]; if (!x) throw new Error("no key");
    const pt = await crypto.subtle.decrypt({name: "AES-GCM", iv: unb64(x.iv)}, await aesKey(pin, unb64(x.salt)), unb64(x.ct));
    const o = JSON.parse(new TextDecoder().decode(pt));
    keys[e] = {k: o.k, s: o.s, demo: !!x.demo};
  }
  async function hmac(secret, msg) {
    const k = await crypto.subtle.importKey("raw", enc(secret), {name: "HMAC", hash: "SHA-256"}, false, ["sign"]);
    return [...new Uint8Array(await crypto.subtle.sign("HMAC", k, enc(msg)))].map(b => b.toString(16).padStart(2, "0")).join("");
  }
  const base = e => keys[e] && keys[e].demo ? EXS[e].demo : EXS[e].live;
  async function sync(e) {
    if (off[e] != null) return;
    try {
      const t0 = Date.now();
      const j = await (await fetch(base(e) + (e === "BYBIT" ? "/v5/market/time" : "/fapi/v1/time"))).json();
      const st = e === "BYBIT" ? +j.result.timeSecond * 1000 + 500 : j.serverTime;
      off[e] = st - Math.round((t0 + Date.now()) / 2);
    } catch (x) { off[e] = 0; }
  }

  /* ---------- Binance Futures ---------- */
  async function bn(method, path, p = {}) {
    await sync("BINANCEF");
    const k = keys.BINANCEF;
    const q = new URLSearchParams(Object.assign({}, p, {recvWindow: 6000, timestamp: Date.now() + off.BINANCEF})).toString();
    const r = await fetch(base("BINANCEF") + path + "?" + q + "&signature=" + await hmac(k.s, q), {method, headers: {"X-MBX-APIKEY": k.k}});
    let j = null; try { j = await r.json(); } catch (x) {}
    if (!r.ok || (j && j.code && j.code < 0)) {
      if (j && j.code === -1021) off.BINANCEF = null;
      throw new Error((j && j.msg) || "HTTP " + r.status);
    }
    return j;
  }
  const BN = {
    async account() { const a = await bn("GET", "/fapi/v2/account"); return {eq: +a.totalMarginBalance, avail: +a.availableBalance, upnl: +a.totalUnrealizedProfit}; },
    async positions() {
      return (await bn("GET", "/fapi/v2/positionRisk")).filter(p => +p.positionAmt).map(p => ({
        sym: p.symbol, side: +p.positionAmt > 0 ? "long" : "short", size: Math.abs(+p.positionAmt), entry: +p.entryPrice, mark: +p.markPrice,
        pnl: +p.unRealizedProfit, lev: +p.leverage, ps: p.positionSide}));
    },
    async orders() {
      const o = (await bn("GET", "/fapi/v1/openOrders")).map(o => ({id: o.orderId, sym: o.symbol, side: o.side.toLowerCase(), type: o.type,
        price: +o.price || +o.stopPrice, qty: +o.origQty, cp: o.closePosition}));
      try {                                                    // условные ордера (TP/SL) у Binance — отдельный «алго»-раздел
        const a = await bn("GET", "/fapi/v1/openAlgoOrders");
        (Array.isArray(a) ? a : a.orders || []).forEach(x => o.push({id: x.algoId, algo: true, sym: x.symbol, side: String(x.side).toLowerCase(),
          type: x.orderType || x.type || "ALGO", price: +(x.triggerPrice || x.stopPrice || x.price || 0), qty: +(x.quantity || 0), cp: x.closePosition}));
      } catch (x) {}
      return o;
    },
    async filters(sym) {
      if (!BN.ei) BN.ei = (await (await fetch(base("BINANCEF") + "/fapi/v1/exchangeInfo")).json()).symbols;
      const s = BN.ei.find(x => x.symbol === sym); if (!s) throw new Error("symbol " + sym);
      const f = t => s.filters.find(x => x.filterType === t) || {};
      return {step: +f("LOT_SIZE").stepSize, minQty: +f("LOT_SIZE").minQty, tick: +f("PRICE_FILTER").tickSize, minNotional: +(f("MIN_NOTIONAL").notional || 0)};
    },
    async isDual() { if (dual == null) { try { dual = !!(await bn("GET", "/fapi/v1/positionSide/dual")).dualSidePosition; } catch (x) { dual = false; } } return dual; },
    async lev(sym, l) { await bn("POST", "/fapi/v1/leverage", {symbol: sym, leverage: l}); },
    async cond(sym, side, type, stop, ps) {
      const p = {symbol: sym, side, type, closePosition: "true", workingType: "MARK_PRICE"}; if (ps) p.positionSide = ps;
      try { await bn("POST", "/fapi/v1/order", Object.assign({stopPrice: stop}, p)); }
      catch (e) { await bn("POST", "/fapi/v1/algoOrder", Object.assign({algoType: "CONDITIONAL", triggerPrice: stop}, p)); }
    },
    async place(o) {
      const d = await BN.isDual(), ps = d ? (o.side === "buy" ? "LONG" : "SHORT") : null;
      const p = {symbol: o.sym, side: o.side.toUpperCase(), type: o.type === "limit" ? "LIMIT" : "MARKET", quantity: o.qty};
      if (o.type === "limit") { p.price = o.price; p.timeInForce = "GTC"; }
      if (ps) p.positionSide = ps;
      await bn("POST", "/fapi/v1/order", p);
      const cs = o.side === "buy" ? "SELL" : "BUY"; let warn = false;
      for (const [v, t] of [[o.tp, "TAKE_PROFIT_MARKET"], [o.sl, "STOP_MARKET"]]) if (v) { try { await BN.cond(o.sym, cs, t, v, ps); } catch (e) { warn = e.message; } }
      return warn;
    },
    async close(p) {
      const q = {symbol: p.sym, side: p.side === "long" ? "SELL" : "BUY", type: "MARKET", quantity: p.size};
      if (p.ps && p.ps !== "BOTH") q.positionSide = p.ps; else q.reduceOnly = "true";
      await bn("POST", "/fapi/v1/order", q);
    },
    async cancel(o) { if (o.algo) await bn("DELETE", "/fapi/v1/algoOrder", {algoId: o.id}); else await bn("DELETE", "/fapi/v1/order", {symbol: o.sym, orderId: o.id}); }
  };

  /* ---------- Bybit (v5, USDT-перпетуалы) ---------- */
  async function by(method, path, p = {}) {
    await sync("BYBIT");
    const k = keys.BYBIT, ts = String(Date.now() + off.BYBIT), rw = "6000";
    let url = base("BYBIT") + path, body, pl;
    if (method === "GET") { pl = new URLSearchParams(p).toString(); if (pl) url += "?" + pl; } else { body = JSON.stringify(p); pl = body; }
    const h = {"X-BAPI-API-KEY": k.k, "X-BAPI-TIMESTAMP": ts, "X-BAPI-RECV-WINDOW": rw, "X-BAPI-SIGN": await hmac(k.s, ts + k.k + rw + pl)};
    if (body) h["Content-Type"] = "application/json";
    const r = await fetch(url, {method, headers: h, body});
    if (r.status === 401) throw new Error("Bybit: API key invalid / 401");
    const j = await r.json();
    if (j.retCode !== 0) { if (j.retCode === 10002) off.BYBIT = null; const e = new Error(`${j.retMsg} (${j.retCode})`); e.code = j.retCode; throw e; }
    return j.result;
  }
  const BY = {
    async account() {
      const a = ((await by("GET", "/v5/account/wallet-balance", {accountType: "UNIFIED"})).list || [])[0] || {};
      return {eq: +a.totalEquity || 0, avail: +a.totalAvailableBalance || 0, upnl: +a.totalPerpUPL || 0};
    },
    async positions() {
      return ((await by("GET", "/v5/position/list", {category: "linear", settleCoin: "USDT"})).list || []).filter(p => +p.size).map(p => ({
        sym: p.symbol, side: p.side === "Buy" ? "long" : "short", size: +p.size, entry: +p.avgPrice, mark: +p.markPrice, pnl: +p.unrealisedPnl,
        lev: +p.leverage, idx: p.positionIdx, tp: +p.takeProfit || null, sl: +p.stopLoss || null}));
    },
    async orders() {
      return ((await by("GET", "/v5/order/realtime", {category: "linear", settleCoin: "USDT"})).list || []).map(o => ({
        id: o.orderId, sym: o.symbol, side: o.side.toLowerCase(), type: o.orderType + (o.stopOrderType ? " " + o.stopOrderType : ""),
        price: +o.price || +o.triggerPrice, qty: +o.qty}));
    },
    async filters(sym) {
      const j = await (await fetch(base("BYBIT") + "/v5/market/instruments-info?category=linear&symbol=" + sym)).json();
      const s = (j.result && j.result.list || [])[0]; if (!s) throw new Error("symbol " + sym);
      return {step: +s.lotSizeFilter.qtyStep, minQty: +s.lotSizeFilter.minOrderQty, tick: +s.priceFilter.tickSize, minNotional: +(s.lotSizeFilter.minNotionalValue || 0)};
    },
    async lev(sym, l) {
      try { await by("POST", "/v5/position/set-leverage", {category: "linear", symbol: sym, buyLeverage: String(l), sellLeverage: String(l)}); }
      catch (e) { if (e.code !== 110043) throw e; }              // плечо уже такое
    },
    async place(o) {
      const b = {category: "linear", symbol: o.sym, side: o.side === "buy" ? "Buy" : "Sell", orderType: o.type === "limit" ? "Limit" : "Market", qty: String(o.qty), positionIdx: 0};
      if (o.type === "limit") { b.price = String(o.price); b.timeInForce = "GTC"; }
      if (o.tp || o.sl) { b.tpslMode = "Full"; if (o.tp) b.takeProfit = String(o.tp); if (o.sl) b.stopLoss = String(o.sl); }
      try { await by("POST", "/v5/order/create", b); }
      catch (e) { if (!/position idx|positionIdx/i.test(e.message)) throw e; b.positionIdx = o.side === "buy" ? 1 : 2; await by("POST", "/v5/order/create", b); }
      return false;
    },
    async close(p) {
      await by("POST", "/v5/order/create", {category: "linear", symbol: p.sym, side: p.side === "long" ? "Sell" : "Buy", orderType: "Market",
        qty: String(p.size), reduceOnly: true, positionIdx: p.idx || 0});
    },
    async cancel(o) { await by("POST", "/v5/order/cancel", {category: "linear", symbol: o.sym, orderId: o.id}); }
  };
  const API = {BINANCEF: BN, BYBIT: BY};

  /* ---------- данные ---------- */
  async function refresh(e) {
    if (!keys[e]) return;
    const d = data[e] = data[e] || {};
    try {
      const [acc, pos, ord] = await Promise.all([API[e].account(), API[e].positions(), API[e].orders()]);
      Object.assign(d, {acc, pos, ord, err: null, t: Date.now()});
    } catch (x) { d.err = x.message || String(x); }
    if ($("#pgTrade").classList.contains("on") && e === ex) paint();
    if (splitKey(S.sym)[0] === e) chartLines();
  }
  function loop() {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      if (!document.hidden) for (const e of Object.keys(keys)) await refresh(e);
      loop();
    }, 4000);
  }

  /* ---------- страница «Торговля» ---------- */
  const money = v => v == null || isNaN(v) ? "—" : (+v).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
  const pcls = v => v >= 0 ? "up" : "dn";
  function render() {
    const L = $("#tList"), st = store()[ex];
    $("#tEx").innerHTML = Object.keys(EXS).map(k => `<button data-x="${k}" class="${k === ex ? "on" : ""}">${EXS[k].label}</button>`).join("");
    $$("#tEx button").forEach(b => b.onclick = () => { ex = b.dataset.x; LS.set("tex", ex); render(); });
    if (!st) {
      L.innerHTML = `<div class="sec">${esc(T("Подключите API-ключ биржи"))} · ${EXS[ex].label}</div>
      <div class="card"><label>${esc(T("Счёт"))}</label><div class="seg" id="kDemo"><button data-v="0" class="on">${esc(T("Реальный счёт"))}</button><button data-v="1">${esc(T("Демо-счёт"))}</button></div>
        <label>${esc(T("API-ключ"))}</label><input id="kKey" autocomplete="off" spellcheck="false">
        <label>${esc(T("Секретный ключ"))}</label><input id="kSec" type="password" autocomplete="off">
        <label>${esc(T("PIN-код (минимум 4 цифры)"))}</label><input id="kPin" type="password" inputmode="numeric" autocomplete="new-password">
        <label>${esc(T("Повторите PIN"))}</label><input id="kPin2" type="password" inputmode="numeric" autocomplete="new-password">
        <div class="btns"><button class="pri" id="kSave">${esc(T("Сохранить"))}</button></div>
        <div class="note">${esc(T("Безопасность: в настройках ключа на бирже включите только фьючерсную торговлю. Вывод средств не включайте. Ключ хранится только на этом телефоне, зашифрованный вашим PIN-кодом."))}</div>
        ${ex === "BINANCEF" ? `<div class="note">${esc(T("Binance Spot не принимает запросы с ключом из браузера, поэтому торговля на Binance — через фьючерсы."))}</div>` : ""}</div>`;
      let demo = false;
      $$("#kDemo button", L).forEach(b => b.onclick = () => { demo = b.dataset.v === "1"; $$("#kDemo button", L).forEach(x => x.classList.toggle("on", x === b)); });
      $("#kSave", L).onclick = async () => {
        const k = $("#kKey", L).value.trim(), s = $("#kSec", L).value.trim(), p = $("#kPin", L).value, p2 = $("#kPin2", L).value;
        if (!k || !s) return toast(T("Заполните ключ и секрет"));
        if (p.length < 4) return toast(T("PIN слишком короткий"));
        if (p !== p2) return toast(T("PIN не совпадает"));
        await saveKeys(ex, k, s, demo, p); off[ex] = null; toast(T("Ключ сохранён")); render(); refresh(ex); loop(); chartBtns();
      };
      return;
    }
    if (!keys[ex]) {
      L.innerHTML = `<div class="card" style="margin-top:12px"><b>${EXS[ex].label}</b> · ${esc(T(st.demo ? "Демо-счёт" : "Реальный счёт"))}
        <div class="note">${esc(T("Ключ заблокирован PIN-кодом"))}</div>
        <div class="btns"><button class="pri" id="kUn">${esc(T("Разблокировать"))}</button><button id="kDel" style="color:var(--dn)">${esc(T("Удалить ключ"))}</button></div></div>`;
      $("#kUn", L).onclick = () => unlock(ex).then(render).catch(() => {});
      $("#kDel", L).onclick = delKey;
      return;
    }
    paint();
  }
  function delKey() {
    if (!confirm(T("Удалить ключ с этого телефона?"))) return;
    const st = store(); delete st[ex]; LS.set("tk", st); delete keys[ex]; delete data[ex]; toast(T("Ключ удалён")); render(); chartLines(); chartBtns();
  }
  function paint() {
    const L = $("#tList"), d = data[ex] || {}, a = d.acc || {}, dg = s => S.dig[ex + ":" + s] || 4;
    L.innerHTML = `<div class="card" style="margin-top:12px">
      <div style="display:flex;justify-content:space-between;align-items:center"><b>${EXS[ex].label}</b><span style="color:${keys[ex].demo ? "#f5c542" : "var(--up)"};font-size:12px;font-weight:600">${esc(T(keys[ex].demo ? "Демо-счёт" : "Реальный счёт"))}</span></div>
      <div style="display:flex;gap:10px;margin-top:10px;text-align:center">
        <div style="flex:1"><div class="note" style="margin:0">${esc(T("Баланс"))}</div><b style="font-size:16px">${money(a.eq)}</b></div>
        <div style="flex:1"><div class="note" style="margin:0">${esc(T("Доступно"))}</div><b style="font-size:16px">${money(a.avail)}</b></div>
        <div style="flex:1"><div class="note" style="margin:0">${esc(T("Нереализ. P&L"))}</div><b style="font-size:16px" class="${pcls(a.upnl)}">${money(a.upnl)}</b></div></div>
      ${d.err ? `<div class="st er">${esc(d.err)}</div>` : ""}
      <div class="btns"><button id="kLock">${esc(T("Заблокировать"))}</button><button id="kDel" style="color:var(--dn)">${esc(T("Удалить ключ"))}</button></div></div>
    <div class="sec">${esc(T("Позиции"))}</div>
    ${(d.pos || []).length ? d.pos.map((p, i) => `<div class="row" data-p="${i}" style="height:auto;padding:10px 14px">
      <div class="nm"><b><span class="${p.side === "long" ? "up" : "dn"}">${p.side.toUpperCase()}</span> ${esc(p.sym)} <small style="display:inline;color:var(--mu)">${p.lev}x</small></b>
        <small>${p.size} · ${fmt(p.entry, dg(p.sym))} → ${fmt(p.mark, dg(p.sym))}${p.tp ? " · TP " + fmt(p.tp, dg(p.sym)) : ""}${p.sl ? " · SL " + fmt(p.sl, dg(p.sym)) : ""}</small></div>
      <div class="pr"><b class="${pcls(p.pnl)}">${p.pnl >= 0 ? "+" : ""}${money(p.pnl)}</b></div>
      <button class="x" data-cl="${i}" title="${esc(T("Закрыть позицию"))}">✕</button></div>`).join("") : `<div class="empty" style="padding:16px">${esc(T("Нет открытых позиций"))}</div>`}
    <div class="sec">${esc(T("Ордера"))}</div>
    ${(d.ord || []).length ? d.ord.map((o, i) => `<div class="row" style="height:auto;padding:10px 14px">
      <div class="nm"><b><span class="${o.side === "buy" ? "up" : "dn"}">${o.side.toUpperCase()}</span> ${esc(o.sym)}</b><small>${esc(o.type)} · ${o.cp === true || o.cp === "true" ? "close" : o.qty} @ ${fmt(o.price, dg(o.sym))}</small></div>
      <button class="x" data-co="${i}">✕</button></div>`).join("") : `<div class="empty" style="padding:16px">${esc(T("Нет активных ордеров"))}</div>`}
    <div style="height:16px"></div>`;
    $("#kLock", L).onclick = () => { delete keys[ex]; render(); chartLines(); };
    $("#kDel", L).onclick = delKey;
    $$("[data-p]", L).forEach(r => r.onclick = ev => { if (ev.target.dataset.cl) return; openSym(ex + ":" + d.pos[+r.dataset.p].sym); });
    $$("[data-cl]", L).forEach(b => b.onclick = () => closePos(ex, d.pos[+b.dataset.cl]));
    $$("[data-co]", L).forEach(b => b.onclick = () => cancelOrd(ex, d.ord[+b.dataset.co]));
  }

  /* ---------- PIN ---------- */
  function unlock(e) {
    if (keys[e]) return Promise.resolve();
    return new Promise((res, rej) => {
      let done = false;
      const b = sheet(T("Введите PIN") + " · " + EXS[e].label, `<div class="card"><input id="pinIn" type="password" inputmode="numeric" autocomplete="off">
        <div class="btns"><button class="pri" id="pinOk">${esc(T("Разблокировать"))}</button></div></div>`, () => { if (!done) rej(new Error("cancel")); });
      const go_ = async () => {
        try { await openKeys(e, $("#pinIn", b).value); done = true; closeSheet(); off[e] = null; refresh(e); loop(); res(); }
        catch (x) { toast(T("Неверный PIN")); $("#pinIn", b).value = ""; }
      };
      $("#pinOk", b).onclick = go_;
      $("#pinIn", b).onkeydown = ev => { if (ev.key === "Enter") go_(); };
      setTimeout(() => $("#pinIn", b).focus(), 250);
    });
  }

  /* ---------- действия с подтверждением ---------- */
  function confirmSheet(title, html, okText, okCls, fn) {
    const b = sheet(title, `<div class="card" style="line-height:1.7">${html}<div class="btns"><button id="cfNo">${esc(T("Отмена"))}</button>
      <button class="pri" id="cfOk" style="${okCls ? "background:" + okCls : ""}">${esc(okText)}</button></div></div>`);
    $("#cfNo", b).onclick = closeSheet;
    $("#cfOk", b).onclick = async () => {
      const btn = $("#cfOk", b); btn.disabled = true; btn.textContent = "…";
      try { await fn(); closeSheet(); } catch (x) { toast("⚠ " + (x.message || x), 5000); btn.disabled = false; btn.textContent = okText; }
    };
  }
  function closePos(e, p) {
    const dg = S.dig[e + ":" + p.sym] || 4;
    confirmSheet(T("Закрыть позицию"), `<b>${EXS[e].label}</b><br>${p.side.toUpperCase()} ${esc(p.sym)} · ${p.size}<br>${esc(T("по рынку"))} ≈ ${fmt(p.mark, dg)}<br>P&L: <b class="${pcls(p.pnl)}">${money(p.pnl)}</b>`,
      T("Закрыть позицию"), "var(--dn)", async () => { await API[e].close(p); toast(T("Позиция закрыта")); setTimeout(() => refresh(e), 600); });
  }
  function cancelOrd(e, o) {
    confirmSheet(T("Отменить ордер"), `${o.side.toUpperCase()} ${esc(o.sym)} · ${esc(o.type)} @ ${o.price}`, T("Отменить ордер"), "var(--dn)",
      async () => { await API[e].cancel(o); toast(T("Ордер отменён")); setTimeout(() => refresh(e), 600); });
  }

  /* ---------- тикет ордера ---------- */
  const decs = st => { const s = String(st); if (/e-/.test(s)) return +s.split("e-")[1]; const i = s.indexOf("."); return i < 0 ? 0 : s.length - i - 1; };
  const roundTo = (v, st) => +(Math.floor(v / st + 1e-9) * st).toFixed(decs(st));
  const roundPx = (v, st) => +(Math.round(v / st) * st).toFixed(decs(st));
  async function ticket(side) {
    const [e, sym] = splitKey(S.sym);
    if (!EXS[e]) return toast(T("Торговля доступна для Binance Futures и Bybit. Откройте инструмент с этих бирж."), 4000);
    if (!store()[e]) { toast(T("Сначала подключите API-ключ во вкладке «Торговля»"), 3500); ex = e; LS.set("tex", ex); go("pgTrade"); return; }
    try { await unlock(e); } catch (x) { return; }
    let f; try { f = finfo[e + ":" + sym] = finfo[e + ":" + sym] || await API[e].filters(sym); } catch (x) { return toast("⚠ " + x.message, 4000); }
    const last = G.B.length ? G.B[G.B.length - 1].close : 0, levK = "lev:" + e + ":" + sym;
    let type = "market";
    const b = sheet(`${sym} · ${EXS[e].label}`, `<div class="card">
      <div class="seg" id="oSide"><button data-v="buy" class="${side === "buy" ? "on" : ""}" style="${side === "buy" ? "background:var(--up);color:#fff" : ""}">${esc(T("Купить"))}</button>
        <button data-v="sell" class="${side === "sell" ? "on" : ""}" style="${side === "sell" ? "background:var(--dn);color:#fff" : ""}">${esc(T("Продать"))}</button></div>
      <label>${esc(T("Тип"))}</label><div class="seg" id="oType"><button data-v="market" class="on">${esc(T("Рыночный"))}</button><button data-v="limit">${esc(T("Лимитный"))}</button></div>
      <div id="oPxW" style="display:none"><label>${esc(T("Цена"))}</label><input id="oPx" type="number" inputmode="decimal" step="any" value="${roundPx(last, f.tick)}"></div>
      <label>${esc(T("Количество"))} <span style="float:right">${esc(T("мин."))} ${f.minQty}</span></label><input id="oQty" type="number" inputmode="decimal" step="any" placeholder="${f.minQty}">
      <div class="tabs" style="padding:8px 0 0" id="oPct">${[10, 25, 50, 100].map(p => `<button data-p="${p}">${p}%</button>`).join("")}</div>
      <div class="note" id="oVal" style="margin-top:4px"></div>
      <label>${esc(T("Плечо"))}</label><input id="oLev" type="number" inputmode="numeric" value="${LS.get(levK, 10)}">
      <div style="display:flex;gap:8px"><div style="flex:1"><label>${esc(T("Тейк-профит"))}</label><input id="oTp" type="number" inputmode="decimal" step="any" placeholder="${esc(T("необязательно"))}"></div>
        <div style="flex:1"><label>${esc(T("Стоп-лосс"))}</label><input id="oSl" type="number" inputmode="decimal" step="any" placeholder="${esc(T("необязательно"))}"></div></div>
      <div class="btns"><button class="pri" id="oGo"></button></div></div>`);
    const px = () => type === "limit" ? parseFloat($("#oPx", b).value) : (G.B.length ? G.B[G.B.length - 1].close : last);
    const upd = () => {
      const q = parseFloat($("#oQty", b).value) || 0, lev = parseFloat($("#oLev", b).value) || 1;
      $("#oVal", b).textContent = q ? `≈ ${money(q * px())} USDT · margin ≈ ${money(q * px() / lev)} USDT` : "";
      const g = $("#oGo", b); g.textContent = T(side === "buy" ? "Купить" : "Продать") + (q ? " " + q + " " + sym : "");
      g.style.background = side === "buy" ? "var(--up)" : "var(--dn)";
    };
    $$("#oSide button", b).forEach(x => x.onclick = () => {
      side = x.dataset.v;
      $$("#oSide button", b).forEach(y => { const on = y === x; y.classList.toggle("on", on); y.style.background = on ? (side === "buy" ? "var(--up)" : "var(--dn)") : ""; y.style.color = on ? "#fff" : ""; });
      upd();
    });
    $$("#oType button", b).forEach(x => x.onclick = () => { type = x.dataset.v; $$("#oType button", b).forEach(y => y.classList.toggle("on", y === x)); $("#oPxW", b).style.display = type === "limit" ? "" : "none"; upd(); });
    $$("#oPct button", b).forEach(x => x.onclick = () => {
      const a = (data[e] && data[e].acc) || {}, lev = parseFloat($("#oLev", b).value) || 1;
      if (!a.avail || !px()) return;
      $("#oQty", b).value = roundTo(a.avail * 0.98 * lev * (+x.dataset.p / 100) / px(), f.step); upd();
    });
    ["#oQty", "#oLev", "#oPx"].forEach(id => $(id, b).oninput = upd);
    upd();
    $("#oGo", b).onclick = () => {
      const qty = roundTo(parseFloat($("#oQty", b).value) || 0, f.step), lev = Math.max(1, Math.round(parseFloat($("#oLev", b).value) || 1));
      const price = type === "limit" ? roundPx(parseFloat($("#oPx", b).value) || 0, f.tick) : null;
      const tp = parseFloat($("#oTp", b).value) ? roundPx(parseFloat($("#oTp", b).value), f.tick) : null;
      const sl = parseFloat($("#oSl", b).value) ? roundPx(parseFloat($("#oSl", b).value), f.tick) : null;
      if (!qty || qty < f.minQty) return toast(T("Количество меньше минимального") + " (" + f.minQty + ")");
      if (type === "limit" && !price) return toast(T("Укажите цену"));
      const d = S.dig[S.sym] || 4;
      confirmSheet(T("Проверьте ордер"), `${esc(T("Биржа"))}: <b>${EXS[e].label}</b> · <b style="color:${keys[e].demo ? "#f5c542" : "var(--up)"}">${esc(T(keys[e].demo ? "Демо-счёт" : "Реальный счёт"))}</b><br>
        ${esc(T("Сторона"))}: <b class="${side === "buy" ? "up" : "dn"}">${esc(T(side === "buy" ? "Купить" : "Продать"))}</b> ${esc(sym)}<br>
        ${esc(T("Количество"))}: <b>${qty}</b> (${esc(T("примерно"))} ${money(qty * (price || px()))} USDT)<br>
        ${esc(T("Тип"))}: <b>${type === "limit" ? esc(T("по цене")) + " " + fmt(price, d) : esc(T("по рынку"))}</b> · ${esc(T("Плечо"))}: <b>${lev}x</b>
        ${tp ? `<br>TP: <b>${fmt(tp, d)}</b>` : ""}${sl ? `<br>SL: <b>${fmt(sl, d)}</b>` : ""}`,
        T("Подтвердить"), side === "buy" ? "var(--up)" : "var(--dn)", async () => {
          await API[e].lev(sym, lev); LS.set(levK, lev);
          const warn = await API[e].place({sym, side, type, qty, price, tp, sl});
          toast(warn ? "⚠ " + T("Ордер исполнен, но TP/SL не выставлены") + ": " + warn : "✓ " + T("Ордер отправлен"), warn ? 7000 : 2500);
          setTimeout(() => refresh(e), 700);
        });
    };
  }

  /* ---------- график: кнопки и линии позиций ---------- */
  /* кнопки Продать / Купить с ценами bid / ask и спредом (поток лучших цен стакана) */
  let book = null, bookKey = "";
  const pxs = v => { const s = fmt(v, S.dig[S.sym] || G.dig || 2); return LANG === "ru" ? s.replace(".", ",") : s; };
  function paintBook(b, a) {
    $("#tBid").textContent = b ? pxs(b) : "—"; $("#tAsk").textContent = a ? pxs(a) : "—";
    $("#tSpread").textContent = b && a ? pxs(a - b) : "";
  }
  function placeBtns() {
    const lg = $("#legend"); $("#tradeBtns").style.top = (lg.offsetTop + lg.offsetHeight + 6) + "px";
  }
  function chartBtns() {
    const [e, sym] = splitKey(S.sym), on = !!EXS[e];
    $("#tradeBtns").style.display = on ? "" : "none";
    if (bookKey === S.sym) { placeBtns(); return; }
    if (book) { book.close(); book = null; }
    bookKey = S.sym; paintBook(null, null);
    if (!on) return;
    placeBtns(); setTimeout(placeBtns, 300);
    if (e === "BINANCEF") book = rws(`wss://fstream.binance.com/public/ws/${sym.toLowerCase()}@bookTicker`, null, m => { if (m.b) paintBook(+m.b, +m.a); });
    else book = rws("wss://stream.bybit.com/v5/public/linear", ws => ws.send(JSON.stringify({op: "subscribe", args: ["orderbook.1." + sym]})), m => {
      const d = m.data; if (!d) return;
      const b = d.b && d.b[0], a = d.a && d.a[0];
      if (m.type === "snapshot") { book.b = b ? +b[0] : null; book.a = a ? +a[0] : null; }
      else { if (b && +b[1]) book.b = +b[0]; if (a && +a[1]) book.a = +a[0]; }
      paintBook(book.b, book.a);
    }, {msg: JSON.stringify({op: "ping"}), ms: 20000});
  }
  new ResizeObserver(() => { if ($("#tradeBtns").style.display !== "none") placeBtns(); }).observe($("#legend"));
  function chartLines() {
    lines.forEach(l => { try { G.main && G.main.removePriceLine(l); } catch (x) {} });
    lines = [];
    const [e, sym] = splitKey(S.sym), d = data[e];
    if (!G.main || !d || !keys[e]) return;
    (d.pos || []).filter(p => p.sym === sym).forEach(p => {
      lines.push(G.main.createPriceLine({price: p.entry, color: p.side === "long" ? "#089981" : "#f23645", lineWidth: 2, lineStyle: 0, axisLabelVisible: true,
        title: `${p.side === "long" ? "LONG" : "SHORT"} ${p.size}  ${p.pnl >= 0 ? "+" : ""}${p.pnl.toFixed(2)}`}));
      if (p.tp) lines.push(G.main.createPriceLine({price: p.tp, color: "#089981", lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: "TP"}));
      if (p.sl) lines.push(G.main.createPriceLine({price: p.sl, color: "#f23645", lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: "SL"}));
    });
    (d.ord || []).filter(o => o.sym === sym && o.price).forEach(o => {
      const t = /TAKE/i.test(o.type) ? "TP" : /STOP/i.test(o.type) ? "SL" : (o.side === "buy" ? "BUY " : "SELL ") + o.qty;
      lines.push(G.main.createPriceLine({price: o.price, color: t === "TP" ? "#089981" : t === "SL" ? "#f23645" : "#9598a1", lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: t}));
    });
  }

  $("#tBuy").onclick = () => ticket("buy");
  $("#tSell").onclick = () => ticket("sell");
  chartBtns();
  return {render, chartBtns, chartLines, refresh};
})();
