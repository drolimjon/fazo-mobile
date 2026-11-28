/* Fazo Mobile — веб-версия терминала для телефона (PWA).
   Работает без ПК: котировки берёт сам браузер у Binance, Binance Futures, Bybit и cTrader (Open API, JSON через WebSocket). */
"use strict";
const VER = "1.4.0";
const LWC = window.LightweightCharts;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
const LS = {
  get(k, d) { try { const v = localStorage.getItem("fzm_" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("fzm_" + k, JSON.stringify(v)); } catch (e) {} }
};

/* ================= язык ================= */
const EN = {
  "Всё для теханализа": "Everything for technical analysis", "Настройки графика": "Chart settings", "Снимок графика": "Chart snapshot", "Полный экран": "Fullscreen",
  "Свечи": "Candles", "Рост": "Up", "Падение": "Down", "Внешний вид": "Appearance", "Сетка": "Grid", "Объём": "Volume", "Отсчёт до закрытия свечи": "Countdown to bar close",
  "Логарифмическая шкала": "Logarithmic scale", "Кнопки «Продать / Купить» на графике": "Sell / Buy buttons on chart", "Логотип Fazo на графике": "Fazo logo on chart",
  "Поведение": "Behavior", "Скрыть панель вкладок": "Hide tab bar", "Скрыть панель вкладок, когда график в горизонтальном режиме.": "Hide the tab bar when the chart is in landscape.",
  "Вибрация при выборе": "Vibrate on selection", "Часовой пояс": "Time zone", "Время телефона": "Phone time", "UTC+3 (Москва)": "UTC+3 (Moscow)",
  "UTC+5 (Душанбе, Ташкент)": "UTC+5 (Dushanbe, Tashkent)", "UTC−5 (Нью-Йорк)": "UTC−5 (New York)",   "Список котировок": "Watchlist", "Добавить": "Add", "Меню": "Menu", "Интервал": "Interval", "ИЗБРАННОЕ": "FAVORITES", "МИНУТЫ": "MINUTES", "ЧАСЫ": "HOURS", "ДНИ": "DAYS",
  "Добавьте интервал в избранное при помощи долгого нажатия": "Add an interval to favorites with a long press", "Удалено из избранного": "Removed from favorites", "Добавлено в избранное": "Added to favorites",
  "Индексы": "Indices", "Акции": "Stocks", "Форекс": "Forex", "Металлы и сырьё": "Metals & commodities", "Криптовалюта": "Crypto",
  "Fazo для компьютера": "Fazo for desktop", "Полная версия терминала для Windows: стратегии, ИИ, MT5 и все инструменты.": "The full terminal for Windows: strategies, AI, MT5 and every tool.",
  "Перейти на сайт": "Visit the website", "Сортировать по": "Sort by", "Оповещение для списка": "Alerts for the list", "Добавить инструмент": "Add symbol",
  "Вручную": "Manual", "Названию": "Name", "Изменению: сначала рост": "Change: gainers first", "Изменению: сначала падение": "Change: losers first", "Цене": "Price",
  "Тема": "Theme", "Светлая": "Light", "Тёмная": "Dark", "Системная тема": "System theme", "Изменение темы в зависимости от настроек телефона": "Follows the phone settings",
  "Fazo для ПК": "Fazo for PC", "Торгуйте со своим брокером": "Trade with your broker", "ИНСТРУМЕНТЫ": "TOOLS", "Объекты рисования": "Drawing tools", "Оповещения": "Alerts",
  "Сайт Fazo": "Fazo website", "Поддержка": "Support",   "График": "Chart", "Котировки": "Watchlist", "Алерты": "Alerts", "Настройки": "Settings", "Изменить": "Edit", "Готово": "Done",
  "Таймфрейм": "Timeframe", "Тип графика": "Chart type", "Свечи": "Candles", "Бары": "Bars", "Линия": "Line", "Область": "Area",
  "Хейкин-Аши": "Heikin Ashi", "Индикаторы": "Indicators", "Рисование": "Drawing", "Горизонтальная линия": "Horizontal line",
  "Линия тренда": "Trend line", "Удалить все рисунки": "Remove all drawings", "Рисунки на графике": "Drawings on chart",
  "Коснитесь графика, чтобы поставить линию": "Tap the chart to place the line", "Коснитесь первой точки": "Tap the first point",
  "Коснитесь второй точки": "Tap the second point", "Отмена": "Cancel", "Поиск инструмента": "Symbol search",
  "Введите название, например BTC": "Type a name, e.g. BTC", "Ничего не найдено": "Nothing found", "Загрузка…": "Loading…",
  "Добавлено в котировки": "Added to watchlist", "Уже в котировках": "Already in watchlist", "Новый алерт": "New alert",
  "Цена": "Price", "Инструмент": "Symbol", "Создать": "Create", "Алерт создан": "Alert created", "Нет алертов": "No alerts",
  "Алерт сработал": "Alert triggered", "пересекла": "crossed", "Активен": "Active", "Сработал": "Triggered",
  "Список пуст. Нажмите ＋, чтобы добавить инструмент.": "The list is empty. Tap ＋ to add a symbol.",
  "Создайте алерт кнопкой ＋ или колокольчиком на графике. Алерты проверяются, пока приложение открыто.":
    "Create an alert with ＋ or the bell on the chart. Alerts are checked while the app is open.",
  "Язык": "Language", "Подключение cTrader": "cTrader connection", "Сервер": "Server", "Демо": "Demo", "Реальный": "Live",
  "Подключить": "Connect", "Отключить": "Disconnect", "Не настроен": "Not configured", "Подключение…": "Connecting…",
  "Подключён": "Connected", "счёт": "account", "инструментов": "symbols", "ошибка": "error",
  "cTrader не настроен": "cTrader is not configured", "Нет инструмента": "No such symbol",
  "Форекс, металлы и индексы идут через cTrader. Введите данные своего приложения Open API (openapi.ctrader.com → Applications) и токены. Данные хранятся только на этом телефоне.":
    "Forex, metals and indices come through cTrader. Enter your Open API application (openapi.ctrader.com → Applications) and tokens. They are stored only on this phone.",
  "Уведомления": "Notifications", "Разрешить уведомления": "Allow notifications", "Уведомления разрешены": "Notifications allowed",
  "Уведомления запрещены в настройках браузера": "Notifications are blocked in browser settings",
  "Установка": "Install", "Установить приложение": "Install app",
  "На iPhone: Safari → «Поделиться» → «На экран Домой».": "On iPhone: Safari → Share → Add to Home Screen.",
  "На Android: меню Chrome ⋮ → «Установить приложение».": "On Android: Chrome menu ⋮ → Install app.",
  "Приложение уже установлено": "The app is installed", "О программе": "About", "Версия": "Version",
  "Данные": "Data", "Сбросить настройки": "Reset settings", "Сбросить все настройки этого телефона?": "Reset all settings on this phone?",
  "Не удалось загрузить данные": "Failed to load data", "Повторить": "Retry", "Настроить cTrader": "Set up cTrader",
  "Этот инструмент идёт через cTrader. Подключите cTrader в настройках.": "This symbol comes through cTrader. Connect cTrader in Settings.",
  "Длина": "Length", "Множ.": "Mult.", "Цвет": "Color", "Быстрая": "Fast", "Медленная": "Slow", "Сигнал": "Signal",
  "Период ATR": "ATR period", "Сглаж.": "Smooth", "Объём": "Volume", "Показывать объём": "Show volume",
  "Сохранено": "Saved", "Выше": "Above", "Ниже": "Below", "Пересечение": "Crossing", "Условие": "Condition",
  "Нет связи": "No connection", "ТОРГОВАЯ ПЛАТФОРМА": "TRADING PLATFORM", "Скопировано": "Copied", "Удалить": "Delete", "Текущая цена": "Current price"
};
let LANG = LS.get("lang", (navigator.language || "ru").toLowerCase().startsWith("ru") ? "ru" : "en");
const T = s => LANG === "en" ? (EN[s] || s) : s;
function applyLang() {
  document.documentElement.lang = LANG;
  $$("[data-t]").forEach(e => e.textContent = T(e.dataset.t));
}

/* ================= утилиты ================= */
const TFS = ["1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "1d", "1w", "1M"];
const TF_SEC = {"1m": 60, "3m": 180, "5m": 300, "15m": 900, "30m": 1800, "1h": 3600, "2h": 7200, "4h": 14400, "1d": 86400, "1w": 604800, "1M": 2592000};
const TZ = (() => { const z = LS.get("tz", "local"); return z === "local" ? -new Date().getTimezoneOffset() * 60 : z === "utc" ? 0 : +z * 3600; })();            // график показывает местное время телефона
const decOf = arr => {                                       // точность цены по строкам биржи
  let d = 0;
  for (const s of arr) { const t = String(s).replace(/0+$/, ""); const i = t.indexOf("."); if (i >= 0) d = Math.max(d, t.length - i - 1); }
  return Math.min(d, 10);
};
const fmt = (v, d) => v == null || isNaN(v) ? "—" : (+v).toFixed(d);
const fmtVol = v => v >= 1e9 ? (v / 1e9).toFixed(2) + "B" : v >= 1e6 ? (v / 1e6).toFixed(2) + "M" : v >= 1e3 ? (v / 1e3).toFixed(2) + "K" : (+v).toFixed(2);

async function getJSON(urls, tmo = 15000) {
  let err;
  for (const u of [].concat(urls).filter(Boolean)) {
    const ac = new AbortController(); const t = setTimeout(() => ac.abort(), tmo);
    try {
      const r = await fetch(u, {signal: ac.signal, cache: "no-store"});
      if (!r.ok) throw new Error("HTTP " + r.status);
      return await r.json();
    } catch (e) { err = e; } finally { clearTimeout(t); }
  }
  throw err || new Error(T("Нет связи"));
}

/* WebSocket с автопереподключением */
function rws(url, onOpen, onMsg, ping) {
  let ws, closed = false, timer, pt;
  const open = () => {
    if (closed) return;
    ws = new WebSocket(url);
    ws.onopen = () => {
      onOpen && onOpen(ws);
      if (ping) pt = setInterval(() => { try { ws.send(ping.msg); } catch (e) {} }, ping.ms);
    };
    ws.onmessage = e => { try { onMsg(JSON.parse(e.data)); } catch (x) {} };
    ws.onclose = () => { clearInterval(pt); if (!closed) timer = setTimeout(open, 3000); };
    ws.onerror = () => { try { ws.close(); } catch (e) {} };
  };
  open();
  return {close() { closed = true; clearTimeout(timer); clearInterval(pt); try { ws && ws.close(); } catch (e) {} }};
}

/* ================= источники котировок ================= */
function binanceSrc(id, label, rest, alt, pfx, wsb) {
  let list = null;
  const kl = k => ({time: k[0] / 1000, open: +k[1], high: +k[2], low: +k[3], close: +k[4], volume: +k[5]});
  return {
    id, label,
    async history(sym, tf, limit, endSec) {
      const q = `${pfx}/klines?symbol=${sym}&interval=${tf}&limit=${Math.min(limit, 1000)}` + (endSec ? `&endTime=${endSec * 1000 - 1}` : "");
      const j = await getJSON([rest + q, alt && alt + q]);
      const tail = j.slice(-200);
      return {bars: j.map(kl), digits: decOf(tail.flatMap(k => [k[1], k[2], k[3], k[4]]))};
    },
    kline(sym, tf, cb) {
      const s = rws(`${wsb}/ws/${sym.toLowerCase()}@kline_${tf}`, null, m => {
        const k = m.k; if (k) cb({time: k.t / 1000, open: +k.o, high: +k.h, low: +k.l, close: +k.c, volume: +k.v});
      });
      return () => s.close();
    },
    ticker(syms, cb) {
      const s = rws(`${wsb}/stream?streams=` + syms.map(x => x.toLowerCase() + "@miniTicker").join("/"), null, m => {
        const d = m.data; if (d && d.s) cb(d.s, {last: +d.c, chg: (d.c - d.o) / d.o * 100, d: decOf([d.c, d.o, d.h, d.l])});
      });
      return () => s.close();
    },
    async search(q) {
      if (!list) list = (await getJSON([rest + pfx + "/ticker/price", alt && alt + pfx + "/ticker/price"])).map(x => x.symbol);
      return rank(list, q).map(s => ({sym: s, d: ""}));
    }
  };
}

const BY = {"1m": "1", "3m": "3", "5m": "5", "15m": "15", "30m": "30", "1h": "60", "2h": "120", "4h": "240", "1d": "D", "1w": "W", "1M": "M"};
function bybitSrc() {
  let list = null;
  const WS = "wss://stream.bybit.com/v5/public/linear", ping = {msg: JSON.stringify({op: "ping"}), ms: 20000};
  const sub = (ws, args) => { for (let i = 0; i < args.length; i += 10) ws.send(JSON.stringify({op: "subscribe", args: args.slice(i, i + 10)})); };
  return {
    id: "BYBIT", label: "Bybit",
    async history(sym, tf, limit, endSec) {
      const j = await getJSON(`https://api.bybit.com/v5/market/kline?category=linear&symbol=${sym}&interval=${BY[tf]}&limit=${Math.min(limit, 1000)}` + (endSec ? `&end=${endSec * 1000 - 1}` : ""));
      if (j.retCode) throw new Error(j.retMsg || "Bybit");
      const L = (j.result && j.result.list || []).slice().reverse();
      return {bars: L.map(k => ({time: k[0] / 1000, open: +k[1], high: +k[2], low: +k[3], close: +k[4], volume: +k[5]})),
        digits: decOf(L.slice(-200).flatMap(k => [k[1], k[2], k[3], k[4]]))};
    },
    kline(sym, tf, cb) {
      const s = rws(WS, ws => sub(ws, [`kline.${BY[tf]}.${sym}`]), m => {
        if (m.topic && m.data) m.data.forEach(k => cb({time: k.start / 1000, open: +k.open, high: +k.high, low: +k.low, close: +k.close, volume: +k.volume}));
      }, ping);
      return () => s.close();
    },
    ticker(syms, cb) {
      const st = {};
      const s = rws(WS, ws => sub(ws, syms.map(x => "tickers." + x)), m => {
        const d = m.data; if (!m.topic || !d || !d.symbol) return;
        const o = st[d.symbol] = Object.assign(st[d.symbol] || {}, d);
        if (o.lastPrice) cb(d.symbol, {last: +o.lastPrice, chg: +(o.price24hPcnt || 0) * 100, d: decOf([o.lastPrice, o.highPrice24h || "", o.lowPrice24h || ""])});
      }, ping);
      return () => s.close();
    },
    async search(q) {
      if (!list) { const j = await getJSON("https://api.bybit.com/v5/market/tickers?category=linear"); list = (j.result && j.result.list || []).map(x => x.symbol); }
      return rank(list, q).map(s => ({sym: s, d: ""}));
    }
  };
}

function rank(list, q) {
  q = (q || "").toUpperCase().replace(/[^A-Z0-9.]/g, "");
  if (!q) return list.filter(s => /USDT$|USD$/.test(s)).slice(0, 80);
  const a = [], b = [];
  for (const s of list) { const i = s.indexOf(q); if (i === 0) a.push(s); else if (i > 0) b.push(s); }
  a.sort((x, y) => x.length - y.length);
  return a.concat(b).slice(0, 80);
}

/* ---------- cTrader Open API (JSON через WebSocket, напрямую из браузера) ---------- */
const CT_PER = {"1m": 1, "3m": 3, "5m": 5, "15m": 7, "30m": 8, "1h": 9, "4h": 10, "1d": 12, "1w": 13, "1M": 14};
const CT_SEC = {1: 60, 3: 180, 5: 300, 7: 900, 8: 1800, 9: 3600, 10: 14400, 12: 86400, 13: 604800, 14: 2592000};
const CT_WIN = {1: 302400000, 3: 302400000, 5: 302400000, 7: 21168000000, 8: 21168000000, 9: 21168000000,
  10: 31622400000, 12: 31622400000, 13: 158112000000, 14: 158112000000};
class CTrader {
  constructor() {
    this.id = "CT"; this.label = "cTrader";
    this.ws = null; this.ok = false; this.status = ""; this.log = [];
    this.pend = new Map(); this.n = 0; this.syms = {}; this.byid = {}; this.dig = {};
    this.spotL = new Map(); this.subs = new Set(); this.q = Promise.resolve(); this.lastHist = 0; this.readyP = null; this.dayOpen = {};
    this.onStatus = () => {};
  }
  cfg() { return LS.get("ct", {}); }
  save(c) { LS.set("ct", c); }
  configured() { const c = this.cfg(); return !!(c.cid && c.csec && (c.at || c.rt) && !c.off); }
  st(m, cls) { this.status = m; this.stCls = cls || ""; this.log.push(new Date().toLocaleTimeString() + " " + m); this.log = this.log.slice(-10); this.onStatus(); }
  ready() {
    if (this.ok) return Promise.resolve();
    if (!this.configured()) return Promise.reject(new Error(T("cTrader не настроен")));
    if (!this.readyP) this.readyP = this.connect().catch(e => { this.readyP = null; this.drop(); this.st(T("ошибка") + ": " + e.message, "er"); throw e; });
    return this.readyP;
  }
  drop() {
    const ws = this.ws; this.ws = null; this.ok = false; clearInterval(this.hb);
    if (ws) { ws.onclose = null; try { ws.close(); } catch (e) {} }
    for (const p of this.pend.values()) p.rej(new Error("cTrader: " + T("Нет связи")));
    this.pend.clear(); this.subs.clear();
  }
  reset() { this.drop(); this.readyP = null; this.syms = {}; this.byid = {}; this.st(this.configured() ? "" : T("Не настроен")); }
  async connect(depth = 0) {
    const c = this.cfg();
    this.st(T("Подключение…"));
    await new Promise((res, rej) => {
      const ws = new WebSocket(`wss://${c.live ? "live" : "demo"}.ctraderapi.com:5036`);
      this.ws = ws;
      const to = setTimeout(() => rej(new Error("timeout")), 15000);
      ws.onopen = () => { clearTimeout(to); res(); };
      ws.onerror = () => { clearTimeout(to); rej(new Error("WebSocket")); };
      ws.onmessage = e => this.msg(e.data);
      ws.onclose = () => this.closed(ws);
    });
    clearInterval(this.hb);
    this.hb = setInterval(() => { try { this.ws && this.ws.send(JSON.stringify({payloadType: 51, payload: {}})); } catch (e) {} }, 10000);
    await this.req(2100, {clientId: c.cid, clientSecret: c.csec});
    if (c.rt && (!c.at || Date.now() / 1000 > (c.exp || 0) - 3 * 86400)) {
      try {
        const r = await this.req(2173, {refreshToken: c.rt});
        c.at = r.accessToken || c.at; c.rt = r.refreshToken || c.rt; c.exp = Date.now() / 1000 + (+r.expiresIn || 2592000); this.save(c);
      } catch (e) { this.st("refresh: " + e.message, "er"); }
    }
    const r = await this.req(2149, {accessToken: c.at});
    const accs = (r.ctidTraderAccount || []).map(a => ({id: a.ctidTraderAccountId, login: a.traderLogin, live: !!a.isLive}));
    if (!accs.length) throw new Error("no accounts");
    let acc = accs.find(a => a.id === c.acc) || accs.find(a => a.live === !!c.live) || accs.find(a => !a.live) || accs[0];
    if (acc.live !== !!c.live) {                             // счёт на другом сервере — переподключиться туда
      c.live = acc.live; c.acc = acc.id; this.save(c); this.drop();
      if (depth > 1) throw new Error("server switch loop");
      return this.connect(depth + 1);
    }
    c.acc = acc.id; this.save(c);
    await this.req(2102, {ctidTraderAccountId: acc.id, accessToken: c.at});
    this.acc = acc.id;
    const sl = await this.req(2114, {ctidTraderAccountId: acc.id, includeArchivedSymbols: false}, 60000);
    const syms = {}, byid = {};
    for (const s of sl.symbol || []) {
      if (s.enabled === false || !s.symbolName) continue;
      syms[s.symbolName.toUpperCase()] = {id: s.symbolId, n: s.symbolName, d: s.description || ""};
      byid[s.symbolId] = s.symbolName.toUpperCase();
    }
    this.syms = syms; this.byid = byid; this.ok = true;
    this.st(`${T("Подключён")}: ${T("счёт")} ${acc.login || acc.id} (${acc.live ? T("Реальный") : T("Демо")}), ${T("инструментов")} ${Object.keys(syms).length}`, "ok");
    // восстановить подписки на котировки после переподключения
    const want = [...this.spotL.keys()];
    if (want.length) this.req(2127, {ctidTraderAccountId: this.acc, symbolId: want}).then(() => want.forEach(i => this.subs.add(i))).catch(() => {});
  }
  closed(ws) {
    if (this.ws !== ws) return;
    this.drop(); this.readyP = null;
    this.st(T("Нет связи") + "…", "er");
    if (this.configured() && this.spotL.size) setTimeout(() => this.ready().catch(() => {}), 4000);
  }
  msg(txt) {
    let m; try { m = JSON.parse(txt); } catch (e) { return; }
    const p = m.payload || {}, pt = m.payloadType;
    if (m.clientMsgId && this.pend.has(m.clientMsgId)) {
      const w = this.pend.get(m.clientMsgId); this.pend.delete(m.clientMsgId);
      if (pt === 2142 || pt === 50) w.rej(new Error((p.errorCode || "") + " " + (p.description || ""))); else w.res(p);
      return;
    }
    if (pt === 2131) {
      const L = this.spotL.get(p.symbolId); if (!L || !p.bid) return;
      const px = p.bid / 1e5; L.forEach(f => f(px));
    } else if (pt === 2147 || pt === 2148 || pt === 2164) {
      try { this.ws && this.ws.close(); } catch (e) {}
    }
  }
  req(pt, payload, tmo = 25000) {
    return new Promise((res, rej) => {
      if (!this.ws || this.ws.readyState !== 1) return rej(new Error("cTrader: " + T("Нет связи")));
      const id = "m" + (++this.n);
      const t = setTimeout(() => { if (this.pend.delete(id)) rej(new Error("cTrader timeout " + pt)); }, tmo);
      this.pend.set(id, {res: v => { clearTimeout(t); res(v); }, rej: e => { clearTimeout(t); rej(e); }});
      this.ws.send(JSON.stringify({clientMsgId: id, payloadType: pt, payload}));
    });
  }
  sid(name) {
    const s = this.syms[name.toUpperCase()];
    if (!s) throw new Error(T("Нет инструмента") + " " + name + " (cTrader)");
    return s.id;
  }
  async digits(sid) {
    if (this.dig[sid] == null) {
      try { const r = await this.req(2116, {ctidTraderAccountId: this.acc, symbolId: [sid]}); (r.symbol || []).forEach(s => this.dig[s.symbolId] = +s.digits || 5); } catch (e) {}
      if (this.dig[sid] == null) this.dig[sid] = 5;
    }
    return this.dig[sid];
  }
  async sub(sid) {
    if (this.subs.has(sid)) return;
    this.subs.add(sid);
    try { await this.req(2127, {ctidTraderAccountId: this.acc, symbolId: [sid]}, 10000); }
    catch (e) { if (!/ALREADY/i.test(e.message)) this.subs.delete(sid); }
  }
  listen(sid, f) {
    if (!this.spotL.has(sid)) this.spotL.set(sid, new Set());
    this.spotL.get(sid).add(f);
    return () => { const L = this.spotL.get(sid); L && L.delete(f); };
  }
  async hist(sid, per, frm, to) {                              // не больше 5 запросов истории в секунду
    const p = this.q.then(async () => { const w = 220 - (Date.now() - this.lastHist); if (w > 0) await sleep(w); this.lastHist = Date.now(); });
    this.q = p.catch(() => {});
    await p;
    const r = await this.req(2137, {ctidTraderAccountId: this.acc, symbolId: sid, period: per, fromTimestamp: Math.floor(frm), toTimestamp: Math.floor(to), count: 5000}, 40000);
    return (r.trendbar || []).map(b => {
      const lo = b.low || 0;
      return {time: (b.utcTimestampInMinutes || 0) * 60, open: (lo + (b.deltaOpen || 0)) / 1e5, high: (lo + (b.deltaHigh || 0)) / 1e5,
        low: lo / 1e5, close: (lo + (b.deltaClose || 0)) / 1e5, volume: +(b.volume || 0)};
    });
  }
  async bars(sid, tf, limit, endSec) {
    const per = CT_PER[tf], ms = CT_SEC[per] * 1000, cap = Math.min(CT_WIN[per], 4000 * ms);
    let to = endSec ? endSec * 1000 - 1 : Date.now() + 60000, empty = 0, grow = 1;
    const got = new Map();
    for (let i = 0; i < 40 && got.size < limit; i++) {
      const need = limit - got.size;
      const w = Math.min(cap, Math.max(need * ms * 1.6, Math.min(4 * 86400000, cap)) * grow);
      const frm = Math.max(0, to - w);
      const bs = await this.hist(sid, per, frm, to);
      if (!bs.length) {
        if (w < cap) { grow *= 4; continue; }
        if (++empty >= (per <= 9 ? 3 : 1) || frm <= 0) break;
        to = frm - 1; continue;
      }
      empty = 0; grow = 1;
      bs.forEach(b => got.set(b.time, b));
      to = frm - 1;
    }
    return [...got.values()].sort((a, b) => a.time - b.time).slice(-limit);
  }
  async history(name, tf, limit, endSec) {
    await this.ready();
    const sid = this.sid(name), d = await this.digits(sid);
    this.sub(sid);
    limit = Math.min(limit, 1000);
    if (tf === "2h") {                                          // в cTrader нет H2 — собираем из H1
      const src = await this.bars(sid, "1h", limit * 2 + 2, endSec), out = [];
      for (const b of src) {
        const t = Math.floor(b.time / 7200) * 7200, o = out[out.length - 1];
        if (o && o.time === t) { o.high = Math.max(o.high, b.high); o.low = Math.min(o.low, b.low); o.close = b.close; o.volume += b.volume; }
        else out.push(Object.assign({}, b, {time: t}));
      }
      return {bars: out.slice(-limit), digits: d};
    }
    return {bars: await this.bars(sid, tf, limit, endSec), digits: d};
  }
  kline(name, tf, cb, last) {                                  // текущая свеча строится из потока котировок + сверка с историей раз в 30 с
    let stop = false, un = () => {};
    const sec = TF_SEC[tf];
    this.ready().then(() => {
      if (stop) return;
      const sid = this.sid(name); this.sub(sid);
      un = this.listen(sid, px => {
        const L = last(); if (!L) return;
        const now = Date.now() / 1000;
        if (sec <= 14400 && now >= L.time + sec) {
          const t = Math.floor(now / sec) * sec;
          cb({time: t, open: px, high: px, low: px, close: px, volume: 1});
        } else cb({time: L.time, open: L.open, high: Math.max(L.high, px), low: Math.min(L.low, px), close: px, volume: L.volume + 1});
      });
    }).catch(() => {});
    const iv = setInterval(() => {
      this.history(name, tf, 3).then(r => r.bars.forEach(b => cb(b))).catch(() => {});
    }, 30000);
    return () => { stop = true; un(); clearInterval(iv); };
  }
  ticker(names, cb) {
    const uns = []; let stop = false;
    this.ready().then(async () => {
      for (const name of names) {
        if (stop) return;
        let sid; try { sid = this.sid(name); } catch (e) { continue; }
        this.sub(sid);
        const d = await this.digits(sid);
        uns.push(this.listen(sid, px => {
          const o = this.dayOpen[sid];
          cb(name, {last: px, chg: o ? (px - o) / o * 100 : null, d});
        }));
        if (this.dayOpen[sid] == null) {
          this.dayOpen[sid] = 0;
          this.hist(sid, 12, Date.now() - 6 * 86400000, Date.now() + 60000).then(b => {
            if (b.length) { this.dayOpen[sid] = b[b.length - 1].open; cb(name, {last: b[b.length - 1].close, chg: (b[b.length - 1].close - b[b.length - 1].open) / b[b.length - 1].open * 100, d}); }
          }).catch(() => { this.dayOpen[sid] = null; });
        }
      }
    }).catch(() => {});
    return () => { stop = true; uns.forEach(f => f()); };
  }
  async search(q) {
    await this.ready();
    q = (q || "").toUpperCase();
    const all = Object.values(this.syms);
    const res = q ? all.filter(s => s.n.toUpperCase().includes(q) || s.d.toUpperCase().includes(q)) : all;
    res.sort((a, b) => (a.n.toUpperCase().indexOf(q) - b.n.toUpperCase().indexOf(q)) || a.n.length - b.n.length);
    return res.slice(0, 80).map(s => ({sym: s.n.toUpperCase(), d: s.d}));
  }
}

/* ---------- Yahoo Finance (через посредника /yf на нашем же сайте) ---------- */
function yahooSrc() {
  const YI = {"1m": ["1m", 1], "3m": ["1m", 3], "5m": ["5m", 1], "15m": ["15m", 1], "30m": ["30m", 1], "1h": ["60m", 1], "2h": ["60m", 2], "4h": ["60m", 4],
    "1d": ["1d", 1], "1w": ["1wk", 1], "1M": ["1mo", 1]};
  const MAXR = {"1m": 7 * 86400, "5m": 59 * 86400, "15m": 59 * 86400, "30m": 59 * 86400, "60m": 720 * 86400};
  const BASE = {"1m": 60, "5m": 300, "15m": 900, "30m": 1800, "60m": 3600, "1d": 86400, "1wk": 604800, "1mo": 2592000};
  const POP = [["^GSPC", "S&P 500"], ["^NDX", "Nasdaq 100"], ["^DJI", "Dow Jones"], ["^IXIC", "Nasdaq Composite"], ["^RUT", "Russell 2000"], ["^VIX", "VIX"],
    ["^FTSE", "FTSE 100"], ["^GDAXI", "DAX"], ["^N225", "Nikkei 225"], ["^HSI", "Hang Seng"], ["GC=F", "Gold Futures"], ["SI=F", "Silver Futures"], ["CL=F", "Crude Oil"],
    ["BZ=F", "Brent Crude"], ["NG=F", "Natural Gas"], ["EURUSD=X", "EUR/USD"], ["GBPUSD=X", "GBP/USD"], ["USDJPY=X", "USD/JPY"], ["USDRUB=X", "USD/RUB"],
    ["AAPL", "Apple"], ["MSFT", "Microsoft"], ["NVDA", "NVIDIA"], ["TSLA", "Tesla"], ["AMZN", "Amazon"], ["GOOGL", "Alphabet"], ["META", "Meta"], ["BTC-USD", "Bitcoin USD"]];
  const agg = (bars, k, sec) => {
    if (k === 1) return bars; const out = [];
    for (const b of bars) {
      const t = Math.floor(b.time / sec) * sec, o = out[out.length - 1];
      if (o && o.time === t) { o.high = Math.max(o.high, b.high); o.low = Math.min(o.low, b.low); o.close = b.close; o.volume += b.volume; }
      else out.push(Object.assign({}, b, {time: t}));
    }
    return out;
  };
  async function chart(sym, iv, p1, p2) {
    const j = await getJSON(`/yf/v8/finance/chart/${encodeURIComponent(sym)}?interval=${iv}&period1=${Math.floor(p1)}&period2=${Math.floor(p2)}&includePrePost=false`);
    const r = j.chart && j.chart.result && j.chart.result[0];
    if (!r) throw new Error((j.chart && j.chart.error && j.chart.error.description) || "Yahoo: no data");
    const ts = r.timestamp || [], q = (r.indicators && r.indicators.quote && r.indicators.quote[0]) || {}, bars = [];
    for (let i = 0; i < ts.length; i++) {
      if (q.close[i] == null || q.open[i] == null) continue;
      bars.push({time: ts[i], open: q.open[i], high: q.high[i], low: q.low[i], close: q.close[i], volume: q.volume && q.volume[i] || 0});
    }
    return {bars, meta: r.meta || {}};
  }
  const digitsOf = (meta, bars) => meta.priceHint != null ? Math.min(6, Math.max(2, meta.priceHint)) : decOf(bars.slice(-50).map(b => String(+b.close.toFixed(6))));
  const src = {
    id: "YAHOO", label: "Yahoo Finance",
    async history(sym, tf, limit, endSec) {
      const [iv, k] = YI[tf], sec = BASE[iv], p2 = endSec ? endSec - 1 : Date.now() / 1000 + 60;
      let span = limit * k * sec * (sec < 86400 ? 3.2 : 1.6);              // с запасом на выходные и ночь
      if (MAXR[iv]) {
        const oldest = Date.now() / 1000 - MAXR[iv];
        if (p2 <= oldest) return {bars: [], digits: 2};
        span = Math.min(span, p2 - oldest);
      }
      const {bars, meta} = await chart(sym, iv, Math.max(0, p2 - span), p2);
      const out = agg(bars.filter(b => b.time < p2 + 1), k, TF_SEC[tf]).slice(-limit);
      return {bars: out, digits: digitsOf(meta, bars)};
    },
    kline(sym, tf, cb) {                                    // у Yahoo нет потока — опрос раз в 10 с
      let stop = false;
      const tick = async () => {
        if (stop) return;
        if (!document.hidden) { try { const r = await src.history(sym, tf, 3); r.bars.forEach(b => cb(b)); } catch (e) {} }
        if (!stop) setTimeout(tick, 10000);
      };
      setTimeout(tick, 10000);
      return () => { stop = true; };
    },
    ticker(syms, cb) {
      let stop = false;
      const poll = async () => {
        if (stop) return;
        if (!document.hidden) for (let i = 0; i < syms.length; i += 20) {
          try {
            const part = syms.slice(i, i + 20);
            const j = await getJSON(`/yf/v8/finance/spark?symbols=${part.map(encodeURIComponent).join(",")}&range=1d&interval=5m`);
            const res = j.spark && j.spark.result ? j.spark.result.map(x => [x.symbol, x.response && x.response[0]]) : Object.entries(j).map(([s, v]) => [s, v]);
            for (const [s, r] of res) {
              if (!r) continue;
              const m = r.meta || r, closes = (r.indicators && r.indicators.quote && r.indicators.quote[0].close) || r.close || [];
              const last = m.regularMarketPrice != null ? m.regularMarketPrice : closes.filter(x => x != null).pop();
              const prev = m.chartPreviousClose != null ? m.chartPreviousClose : m.previousClose;
              if (last != null) cb(s, {last, chg: prev ? (last - prev) / prev * 100 : null, d: m.priceHint != null ? Math.min(6, Math.max(2, m.priceHint)) : null});
            }
          } catch (e) {}
        }
        if (!stop) setTimeout(poll, 15000);
      };
      poll();
      return () => { stop = true; };
    },
    async search(q) {
      if (!q) return POP.map(([s, d]) => ({sym: s, d}));
      const j = await getJSON(`/yf/v1/finance/search?q=${encodeURIComponent(q)}&quotesCount=25&newsCount=0&listsCount=0`);
      return (j.quotes || []).filter(x => x.symbol).map(x => ({sym: x.symbol, d: [x.shortname || x.longname, x.exchDisp].filter(Boolean).join(" · ")}));
    }
  };
  return src;
}

const CT = new CTrader();
const SRC = {
  BINANCE: binanceSrc("BINANCE", "Binance", "https://api.binance.com", "https://data-api.binance.vision", "/api/v3", "wss://stream.binance.com:9443"),
  BINANCEF: binanceSrc("BINANCEF", "Binance Futures", "https://fapi.binance.com", null, "/fapi/v1", "wss://fstream.binance.com/market"),
  BYBIT: bybitSrc(),
  YAHOO: yahooSrc(),
  CT
};
const SRC_TAG = {BINANCE: "Binance", BINANCEF: "Binance F", BYBIT: "Bybit", YAHOO: "Yahoo", CT: "cTrader"};
const splitKey = k => { const i = k.indexOf(":"); return [k.slice(0, i), k.slice(i + 1)]; };

/* ================= состояние ================= */
// по умолчанию — то, что работает сразу без cTrader: форекс-фьючерсы Bybit, золото и серебро Binance Futures, крипта
const DEF_WATCH = ["YAHOO:^GSPC", "YAHOO:^NDX", "YAHOO:^DJI", "YAHOO:AAPL", "YAHOO:NVDA", "BYBIT:EURUSDUSDT", "BYBIT:GBPUSDUSDT", "BYBIT:USDJPYUSDT", "BINANCEF:XAUUSDT", "BINANCEF:XAGUSDT",
  "BINANCE:BTCUSDT", "BINANCE:ETHUSDT", "BINANCE:SOLUSDT", "BINANCE:XRPUSDT"];
const OLD_WATCH = ["CT:EURUSD", "CT:GBPUSD", "CT:USDJPY", "CT:AUDUSD", "CT:USDCAD", "CT:USDCHF", "CT:XAUUSD",
  "BINANCE:BTCUSDT", "BINANCE:ETHUSDT", "BINANCE:SOLUSDT", "BINANCE:XRPUSDT", "BINANCE:PAXGUSDT"];
if (JSON.stringify(LS.get("watch", null)) === JSON.stringify(OLD_WATCH)) LS.set("watch", DEF_WATCH);
if (!LS.get("mig2", false)) { const w = LS.get("watch", null); if (w) { ["YAHOO:^GSPC", "YAHOO:^NDX"].forEach(k => { if (!w.includes(k)) w.unshift(k); }); LS.set("watch", w); } LS.set("mig2", true); }
const S = {
  sym: LS.get("sym", "BINANCE:BTCUSDT"),
  tf: LS.get("tf", "1h"),
  type: LS.get("type", "candles"),
  vol: LS.get("vol", true),
  inds: LS.get("inds", [{k: "ema", p: {len: 50}, c: "#2962ff"}, {k: "ema", p: {len: 200}, c: "#f5c542"}]),
  watch: LS.get("watch", DEF_WATCH),
  alerts: LS.get("alerts", []),
  dig: LS.get("dig", {})
};
const save = k => LS.set(k, S[k]);

/* ================= индикаторы ================= */
const closes = B => B.map(b => b.close);
function smaA(v, n) { const o = new Array(v.length).fill(null); let s = 0; for (let i = 0; i < v.length; i++) { s += v[i]; if (i >= n) s -= v[i - n]; if (i >= n - 1) o[i] = s / n; } return o; }
function emaA(v, n) { const o = new Array(v.length).fill(null), k = 2 / (n + 1); let e = null, s = 0;
  for (let i = 0; i < v.length; i++) { if (v[i] == null) continue; if (e == null) { s += v[i]; if (i === n - 1) e = s / n; else continue; } else e = v[i] * k + e * (1 - k); o[i] = e; } return o; }
function rmaA(v, n) { const o = new Array(v.length).fill(null); let r = null, s = 0;
  for (let i = 0; i < v.length; i++) { if (r == null) { s += v[i]; if (i === n - 1) r = s / n; else continue; } else r = (r * (n - 1) + v[i]) / n; o[i] = r; } return o; }
function trA(B) { return B.map((b, i) => i ? Math.max(b.high - b.low, Math.abs(b.high - B[i - 1].close), Math.abs(b.low - B[i - 1].close)) : b.high - b.low); }
function stdA(v, n, m) { return v.map((x, i) => { if (m[i] == null) return null; let s = 0; for (let j = i - n + 1; j <= i; j++) s += (v[j] - m[i]) ** 2; return Math.sqrt(s / n); }); }

const IND = {
  sma: {n: "SMA", pane: 0, p: {len: 20}, c: "#f5c542", calc: (B, p) => [smaA(closes(B), p.len)]},
  ema: {n: "EMA", pane: 0, p: {len: 50}, c: "#2962ff", calc: (B, p) => [emaA(closes(B), p.len)]},
  bb: {n: "Bollinger Bands", pane: 0, p: {len: 20, mult: 2}, c: "#2196f3", calc: (B, p) => {
    const c = closes(B), m = smaA(c, p.len), sd = stdA(c, p.len, m);
    return [m, m.map((x, i) => x == null ? null : x + p.mult * sd[i]), m.map((x, i) => x == null ? null : x - p.mult * sd[i])];
  }},
  st: {n: "Supertrend", pane: 0, p: {atr: 10, mult: 3}, c: "#089981", calc: (B, p) => {
    const atr = rmaA(trA(B), p.atr), out = new Array(B.length).fill(null), col = new Array(B.length).fill(null);
    let up = null, dn = null, dir = 1;
    for (let i = 0; i < B.length; i++) {
      if (atr[i] == null) continue;
      const hl = (B[i].high + B[i].low) / 2, bu = hl - p.mult * atr[i], bd = hl + p.mult * atr[i], pc = i ? B[i - 1].close : B[i].close;
      up = up == null ? bu : (pc > up ? Math.max(bu, up) : bu);
      dn = dn == null ? bd : (pc < dn ? Math.min(bd, dn) : bd);
      if (dir === -1 && B[i].close > dn) dir = 1; else if (dir === 1 && B[i].close < up) dir = -1;
      out[i] = dir === 1 ? up : dn; col[i] = dir === 1 ? "#089981" : "#f23645";
    }
    return [out, null, null, col];
  }},
  vwap: {n: "VWAP", pane: 0, p: {}, c: "#e040fb", calc: B => {
    let d = null, pv = 0, vv = 0;
    return [B.map(b => { const day = Math.floor((b.time + TZ) / 86400); if (day !== d) { d = day; pv = 0; vv = 0; }
      const tp = (b.high + b.low + b.close) / 3; pv += tp * b.volume; vv += b.volume; return vv ? pv / vv : tp; })];
  }},
  rsi: {n: "RSI", pane: 1, p: {len: 14}, c: "#7e57c2", lv: [70, 30], calc: (B, p) => {
    const c = closes(B), g = [0], l = [0];
    for (let i = 1; i < c.length; i++) { const d = c[i] - c[i - 1]; g.push(Math.max(d, 0)); l.push(Math.max(-d, 0)); }
    const ag = rmaA(g, p.len), al = rmaA(l, p.len);
    return [ag.map((x, i) => x == null || i < p.len ? null : al[i] === 0 ? 100 : 100 - 100 / (1 + x / al[i]))];
  }},
  macd: {n: "MACD", pane: 1, p: {fast: 12, slow: 26, sig: 9}, c: "#2962ff", calc: (B, p) => {
    const c = closes(B), f = emaA(c, p.fast), s = emaA(c, p.slow), m = f.map((x, i) => x == null || s[i] == null ? null : x - s[i]);
    const first = m.findIndex(x => x != null), sg = new Array(m.length).fill(null);
    if (first >= 0) emaA(m.slice(first), p.sig).forEach((x, i) => sg[first + i] = x);
    return [m, sg, m.map((x, i) => x == null || sg[i] == null ? null : x - sg[i])];
  }},
  stoch: {n: "Stochastic", pane: 1, p: {len: 14, k: 3, d: 3}, c: "#2962ff", lv: [80, 20], calc: (B, p) => {
    const raw = B.map((b, i) => { if (i < p.len - 1) return null; let h = -Infinity, l = Infinity; for (let j = i - p.len + 1; j <= i; j++) { h = Math.max(h, B[j].high); l = Math.min(l, B[j].low); } return h === l ? 50 : (b.close - l) / (h - l) * 100; });
    const sm = (v, n) => { const o = new Array(v.length).fill(null); for (let i = 0; i < v.length; i++) { let s = 0, c = 0; for (let j = Math.max(0, i - n + 1); j <= i; j++) if (v[j] != null) { s += v[j]; c++; } if (c === n) o[i] = s / n; } return o; };
    const k = sm(raw, p.k); return [k, sm(k, p.d)];
  }},
  atr: {n: "ATR", pane: 1, p: {len: 14}, c: "#f23645", calc: (B, p) => [rmaA(trA(B), p.len)]}
};
const PNAME = {len: "Длина", mult: "Множ.", atr: "Период ATR", fast: "Быстрая", slow: "Медленная", sig: "Сигнал", k: "%K", d: "%D"};

/* ================= график ================= */
const CH_OPT = {
  autoSize: true,
  layout: {background: {type: "solid", color: "#101010"}, textColor: "#b2b5be", fontSize: 11, attributionLogo: false,
    fontFamily: "-apple-system,BlinkMacSystemFont,'Trebuchet MS',Roboto,Ubuntu,sans-serif"},
  grid: {vertLines: {color: "#191919"}, horzLines: {color: "#191919"}},
  crosshair: {mode: 0, vertLine: {color: "#9598a1", style: 3, labelBackgroundColor: "#2a2a2e"}, horzLine: {color: "#9598a1", style: 3, labelBackgroundColor: "#2a2a2e"}},
  rightPriceScale: {borderColor: "#2a2a2e", minimumWidth: 64, scaleMargins: {top: 0.08, bottom: 0.08}},
  timeScale: {borderColor: "#2a2a2e", timeVisible: true, secondsVisible: false, rightOffset: 6, barSpacing: 7},
  handleScale: {axisPressedMouseMove: {time: true, price: true}}
};
const G = {chart: null, main: null, vol: null, B: [], HA: [], dig: 2, tok: 0, unK: null, more: false, noMore: false,
  indS: [], subs: [], alertLines: [], drawObjs: [], tool: null, pts: [], hover: false};

function initChart() {
  G.chart = LWC.createChart($("#chart"), CH_OPT);
  G.chart.subscribeCrosshairMove(p => { G.hover = !!(p && p.time); legend(p && p.time ? p : null); });
  G.chart.timeScale().subscribeVisibleLogicalRangeChange(r => {
    if (!r) return;
    G.subs.forEach(s => s.chart.timeScale().setVisibleLogicalRange(r));
    if (r.from < 15) loadMore();
  });
}

function mkMain() {
  if (G.main) { G.chart.removeSeries(G.main); G.main = null; }
  if (G.vol) { G.chart.removeSeries(G.vol); G.vol = null; }
  const pf = {type: "price", precision: G.dig, minMove: +(1 / 10 ** G.dig).toFixed(G.dig)};
  const U = CUP(), D = CDN();
  const cs = {upColor: U, downColor: D, borderVisible: false, wickUpColor: U, wickDownColor: D, priceFormat: pf};
  if (S.type === "bars") G.main = G.chart.addBarSeries({upColor: U, downColor: D, thinBars: false, priceFormat: pf});
  else if (S.type === "line") G.main = G.chart.addLineSeries({color: "#2962ff", lineWidth: 2, priceFormat: pf});
  else if (S.type === "area") G.main = G.chart.addAreaSeries({lineColor: "#2962ff", topColor: "rgba(41,98,255,.35)", bottomColor: "rgba(41,98,255,0)", lineWidth: 2, priceFormat: pf});
  else G.main = G.chart.addCandlestickSeries(cs);
  if (S.vol) {
    G.vol = G.chart.addHistogramSeries({priceFormat: {type: "volume"}, priceScaleId: "vol", lastValueVisible: false, priceLineVisible: false});
    G.chart.priceScale("vol").applyOptions({scaleMargins: {top: 0.84, bottom: 0}});
  }
  G.main.applyOptions({lastValueVisible: true, priceLineVisible: true});
}

const haCalc = (b, p) => {
  const c = (b.open + b.high + b.low + b.close) / 4, o = p ? (p.open + p.close) / 2 : (b.open + b.close) / 2;
  return {time: b.time, open: o, high: Math.max(b.high, o, c), low: Math.min(b.low, o, c), close: c};
};
const toPt = (b, i) => {
  const t = b.time + TZ;
  if (S.type === "line" || S.type === "area") return {time: t, value: b.close};
  if (S.type === "ha") { const h = G.HA[i]; return {time: t, open: h.open, high: h.high, low: h.low, close: h.close}; }
  return {time: t, open: b.open, high: b.high, low: b.low, close: b.close};
};
const volPt = b => ({time: b.time + TZ, value: b.volume, color: (b.close >= b.open ? CUP() : CDN()) + "73"});

function renderAll(keepRange) {
  const r = keepRange ? G.chart.timeScale().getVisibleLogicalRange() : null;
  if (S.type === "ha") { G.HA = []; G.B.forEach((b, i) => G.HA.push(haCalc(b, G.HA[i - 1]))); }
  G.main.setData(G.B.map(toPt));
  if (G.vol) G.vol.setData(G.B.map(volPt));
  renderInds();
  if (typeof DR !== "undefined") DR.dirty();
  renderAlertLines();
  if (r) G.chart.timeScale().setVisibleLogicalRange({from: r.from + keepRange, to: r.to + keepRange});
  legend(null);
  if (typeof TR !== "undefined") TR.chartLines();
}

/* ---- индикаторы на графике ---- */
function clearInds() {
  G.indS.forEach(x => { if (!x.sub) x.series.forEach(s => { try { G.chart.removeSeries(s); } catch (e) {} }); });
  G.indS = [];
  G.subs.forEach(s => s.chart.remove());
  G.subs = [];
  $("#subs").innerHTML = "";
}
function indData(vals, colors) {
  return G.B.map((b, i) => vals[i] == null || isNaN(vals[i]) ? {time: b.time + TZ} :
    colors ? {time: b.time + TZ, value: vals[i], color: colors[i]} : {time: b.time + TZ, value: vals[i]});
}
function renderInds() {
  clearInds();
  const subs = S.inds.filter(x => IND[x.k] && IND[x.k].pane);
  G.chart.applyOptions({timeScale: {visible: !subs.length}});
  S.inds.forEach((ins, idx) => {
    const D = IND[ins.k]; if (!D) return;
    const p = Object.assign({}, D.p, ins.p), out = D.calc(G.B, p), col = ins.c || D.c;
    let ch = G.chart, sub = null;
    if (D.pane) {
      const div = document.createElement("div"); div.className = "sub";
      div.innerHTML = `<div class="lg">${esc(D.n)} ${Object.values(p).join(" ")}</div>`;
      $("#subs").appendChild(div);
      const last = subs[subs.length - 1] === ins;
      ch = LWC.createChart(div, Object.assign({}, CH_OPT, {handleScroll: false, handleScale: false,
        timeScale: Object.assign({}, CH_OPT.timeScale, {visible: last}), rightPriceScale: Object.assign({}, CH_OPT.rightPriceScale, {scaleMargins: {top: 0.1, bottom: 0.1}})}));
      sub = {chart: ch, idx};
      G.subs.push(sub);
    }
    const ser = [];
    const line = (vals, c, w = 1.5, colors) => {
      const s = ch.addLineSeries({color: c, lineWidth: w, lastValueVisible: !!D.pane, priceLineVisible: false, crosshairMarkerVisible: false,
        priceFormat: D.pane ? {type: "price", precision: 2, minMove: 0.01} : {type: "price", precision: G.dig, minMove: 1 / 10 ** G.dig}});
      s.setData(indData(vals, colors)); ser.push(s); return s;
    };
    if (ins.k === "macd") {
      const h = ch.addHistogramSeries({priceLineVisible: false, lastValueVisible: false});
      h.setData(G.B.map((b, i) => out[2][i] == null ? {time: b.time + TZ} : {time: b.time + TZ, value: out[2][i], color: out[2][i] >= 0 ? "rgba(8,153,129,.6)" : "rgba(242,54,69,.6)"}));
      ser.push(h); line(out[0], col); line(out[1], "#ff6d00");
    } else if (ins.k === "st") line(out[0], col, 2, out[3]);
    else if (ins.k === "bb") { line(out[0], "#ff6d00"); line(out[1], col); line(out[2], col); }
    else if (ins.k === "stoch") { line(out[0], col); line(out[1], "#ff6d00"); }
    else line(out[0], col, ins.k === "rsi" ? 1.5 : 2);
    if (D.lv) D.lv.forEach(v => ser[0].createPriceLine({price: v, color: "#555", lineWidth: 1, lineStyle: 2, axisLabelVisible: false}));
    G.indS.push({ins, series: ser, sub});
  });
  const r = G.chart.timeScale().getVisibleLogicalRange();
  if (r) G.subs.forEach(s => s.chart.timeScale().setVisibleLogicalRange(r));
}
let indTimer = null;
function updateIndsLast() {                                      // при новых тиках — пересчёт и обновление последней точки
  if (indTimer) return;
  indTimer = setTimeout(() => {
    indTimer = null;
    const n = G.B.length - 1; if (n < 0) return;
    const t = G.B[n].time + TZ;
    G.indS.forEach(x => {
      const D = IND[x.ins.k], out = D.calc(G.B, Object.assign({}, D.p, x.ins.p));
      const put = (s, v, c) => { try { s.update(v == null || isNaN(v) ? {time: t} : c ? {time: t, value: v, color: c} : {time: t, value: v}); } catch (e) {} };
      if (x.ins.k === "macd") { const h = out[2][n]; put(x.series[0], h, h >= 0 ? "rgba(8,153,129,.6)" : "rgba(242,54,69,.6)"); put(x.series[1], out[0][n]); put(x.series[2], out[1][n]); }
      else if (x.ins.k === "st") put(x.series[0], out[0][n], out[3][n]);
      else x.series.forEach((s, i) => put(s, out[i][n]));
    });
  }, 400);
}

/* ---- легенда ---- */
/* ---- загрузка ---- */
function chartMsg(html, btn, fn) {
  const m = $("#chartMsg");
  if (!html) { m.classList.remove("on"); return; }
  m.innerHTML = html + (btn ? `<br><button>${esc(btn)}</button>` : "");
  if (btn) m.querySelector("button").onclick = fn;
  m.classList.add("on");
}
async function loadChart() {
  const tok = ++G.tok;
  if (G.unK) { G.unK(); G.unK = null; }
  G.more = false; G.noMore = false; G.B = [];
  const [src, sym] = splitKey(S.sym), S0 = SRC[src];
  $("#symTxt").textContent = symInfo(S.sym).show; $("#tfBtn").textContent = tfLabel(S.tf);
  if (typeof TR !== "undefined") { TR.chartBtns(); TR.chartLines(); }
  chartMsg(null); $("#loading").classList.add("on");
  if (G.main) G.main.setData([]); if (G.vol) G.vol.setData([]); clearInds(); if (typeof DR !== "undefined") DR.load(); legend(null);
  if (src === "CT" && !CT.configured()) {
    $("#loading").classList.remove("on");
    chartMsg(esc(T("Этот инструмент идёт через cTrader. Подключите cTrader в настройках.")), T("Настроить cTrader"), () => { go("pgSet"); });
    return;
  }
  try {
    const r = await S0.history(sym, S.tf, 1000);
    if (tok !== G.tok) return;
    G.B = r.bars; G.dig = r.digits || S.dig[S.sym] || 2;
    S.dig[S.sym] = G.dig; save("dig");
    mkMain(); renderAll();
    G.chart.timeScale().setVisibleLogicalRange({from: Math.max(0, G.B.length - 110), to: G.B.length + 5});
    G.unK = S0.kline(sym, S.tf, onBar, () => G.B[G.B.length - 1]);
  } catch (e) {
    if (tok !== G.tok) return;
    chartMsg(`${esc(T("Не удалось загрузить данные"))}<br><small style="color:var(--mu)">${esc(e.message || e)}</small>`, T("Повторить"), loadChart);
  } finally { if (tok === G.tok) $("#loading").classList.remove("on"); }
}
function onBar(b) {
  const n = G.B.length; if (!n || !G.main) return;
  const L = G.B[n - 1];
  if (b.time < L.time) {                                       // поправка недавней свечи (сверка cTrader)
    const i = G.B.findIndex(x => x.time === b.time);
    if (i >= 0 && i >= n - 3) { G.B[i] = b; if (S.type !== "ha") G.main.update(toPt(b, i)); }
    return;
  }
  if (b.time === L.time) G.B[n - 1] = b; else G.B.push(b);
  const i = G.B.length - 1;
  if (S.type === "ha") G.HA[i] = haCalc(b, G.HA[i - 1]);
  try { G.main.update(toPt(b, i)); if (G.vol) G.vol.update(volPt(b)); } catch (e) {}
  updateIndsLast();
  if (!G.hover) legend(null);
  checkAlerts(S.sym, b.close);
}
async function loadMore() {
  if (G.more || G.noMore || !G.B.length) return;
  G.more = true;
  const tok = G.tok, [src, sym] = splitKey(S.sym);
  try {
    const r = await SRC[src].history(sym, S.tf, 1000, G.B[0].time);
    if (tok !== G.tok) return;
    const old = r.bars.filter(b => b.time < G.B[0].time);
    if (!old.length) { G.noMore = true; return; }
    G.B = old.concat(G.B);
    renderAll(old.length);
  } catch (e) {} finally { if (tok === G.tok) G.more = false; }
}
function openSym(key) {
  S.sym = key; save("sym");
  go("pgChart"); loadChart(); syncTickers();
}

/* ================= котировки и алерты ================= */
const Q = {};                                                  // key -> {last, chg, d}
let tickUns = [];
function syncTickers() {
  tickUns.forEach(f => f()); tickUns = [];
  const keys = new Set(S.watch.concat(S.alerts.filter(a => a.on).map(a => a.sym)));
  const by = {};
  keys.forEach(k => { const [s, y] = splitKey(k); if (!SRC[s]) return; (by[s] = by[s] || []).push(y); });
  for (const s in by) {
    if (s === "CT" && !CT.configured()) continue;
    tickUns.push(SRC[s].ticker(by[s], (sym, q) => {
      const k = s + ":" + sym, o = Q[k] || {};
      const prev = o.last;
      Q[k] = {last: q.last, chg: q.chg != null ? q.chg : o.chg, d: q.d != null ? q.d : o.d};
      paintRow(k);
      if (prev != null) checkAlerts(k, q.last, prev);
    }));
  }
}
const lastPx = {};
function checkAlerts(key, px, prev) {
  if (prev == null) prev = lastPx[key];
  lastPx[key] = px;
  if (prev == null) return;
  let fired = false;
  S.alerts.forEach(a => {
    if (!a.on || a.sym !== key) return;
    const hit = a.cond === "above" ? prev < a.price && px >= a.price : a.cond === "below" ? prev > a.price && px <= a.price :
      (prev < a.price && px >= a.price) || (prev > a.price && px <= a.price);
    if (!hit) return;
    a.on = false; a.fired = Date.now(); fired = true;
    notify(a, px);
  });
  if (fired) { save("alerts"); renderAlerts(); renderAlertLines(); }
}
function beep() {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.18, 0.36].forEach(t => { const o = ac.createOscillator(), g = ac.createGain(); o.frequency.value = 880; o.connect(g); g.connect(ac.destination);
      g.gain.setValueAtTime(0.15, ac.currentTime + t); g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + t + 0.15); o.start(ac.currentTime + t); o.stop(ac.currentTime + t + 0.16); });
  } catch (e) {}
}
function notify(a, px) {
  const [, sym] = splitKey(a.sym), d = S.dig[a.sym] || 5;
  const body = `${sym} ${T("пересекла")} ${fmt(a.price, d)} (${fmt(px, d)})`;
  toast("🔔 " + body, 6000); beep();
  try { navigator.vibrate && navigator.vibrate([200, 100, 200]); } catch (e) {}
  if ("Notification" in window && Notification.permission === "granted" && navigator.serviceWorker) {
    navigator.serviceWorker.ready.then(r => r.showNotification("Fazo — " + T("Алерт сработал"), {body, icon: "icons/icon-192.png", badge: "icons/icon-192.png", tag: a.id, vibrate: [200, 100, 200]})).catch(() => {});
  }
}
function renderAlertLines() {
  G.alertLines.forEach(l => { try { G.main && G.main.removePriceLine(l); } catch (e) {} });
  G.alertLines = [];
  if (!G.main) return;
  S.alerts.filter(a => a.on && a.sym === S.sym).forEach(a =>
    G.alertLines.push(G.main.createPriceLine({price: a.price, color: "#ff9800", lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: "🔔"})));
}

/* ================= интерфейс ================= */
const ICO = {
  search: '<svg class="i" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>',
  dots: '<svg class="i" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="19" cy="12" r="1.3" fill="currentColor"/></svg>',
  ham: '<svg class="i" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  chev: '<svg class="i" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
  plus: '<svg class="i" viewBox="0 0 24 24" style="width:20px;height:20px"><path d="M12 5v14M5 12h14"/></svg>',
  pen: '<svg class="i" viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m14 6 4 4"/></svg>',
  sort: '<svg class="i" viewBox="0 0 24 24"><path d="M8 4v16M4 8l4-4 4 4M16 20V4M12 16l4 4 4-4"/></svg>',
  bell: '<svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="13" r="7"/><path d="M12 9v4l2 2M5 4 2 7M19 4l3 3"/></svg>',
  ghost: '<svg viewBox="0 0 120 120"><path d="M30 104V48a30 30 0 0 1 60 0v56l-10-8-10 8-10-8-10 8-10-8z"/><path d="M30 64 14 76M90 64l16 12"/><circle cx="50" cy="50" r="2.5" fill="currentColor"/><circle cx="70" cy="50" r="2.5" fill="currentColor"/></svg>'
};
const NUMF = {};
const nf = (v, d) => {
  if (v == null || isNaN(v)) return "—";
  const k = LANG + d; NUMF[k] = NUMF[k] || new Intl.NumberFormat(LANG === "ru" ? "ru-RU" : "en-US", {minimumFractionDigits: d, maximumFractionDigits: d});
  return NUMF[k].format(v);
};

/* ---- названия и значки инструментов ---- */
const CUR = {EUR: ["Евро", "Euro", "🇪🇺"], USD: ["Доллар США", "U.S. Dollar", "🇺🇸"], GBP: ["Британский фунт", "British Pound", "🇬🇧"], JPY: ["Японская иена", "Japanese Yen", "🇯🇵"],
  CHF: ["Швейцарский франк", "Swiss Franc", "🇨🇭"], CAD: ["Канадский доллар", "Canadian Dollar", "🇨🇦"], AUD: ["Австралийский доллар", "Australian Dollar", "🇦🇺"],
  NZD: ["Новозеландский доллар", "New Zealand Dollar", "🇳🇿"], RUB: ["Российский рубль", "Russian Ruble", "🇷🇺"], CNY: ["Китайский юань", "Chinese Yuan", "🇨🇳"],
  CNH: ["Китайский юань", "Chinese Yuan", "🇨🇳"], TRY: ["Турецкая лира", "Turkish Lira", "🇹🇷"], HKD: ["Гонконгский доллар", "Hong Kong Dollar", "🇭🇰"],
  SGD: ["Сингапурский доллар", "Singapore Dollar", "🇸🇬"], MXN: ["Мексиканское песо", "Mexican Peso", "🇲🇽"], ZAR: ["Южноафриканский рэнд", "South African Rand", "🇿🇦"],
  SEK: ["Шведская крона", "Swedish Krona", "🇸🇪"], NOK: ["Норвежская крона", "Norwegian Krone", "🇳🇴"], PLN: ["Польский злотый", "Polish Zloty", "🇵🇱"],
  KZT: ["Казахстанский тенге", "Kazakhstani Tenge", "🇰🇿"], UZS: ["Узбекский сум", "Uzbekistani Som", "🇺🇿"], TJS: ["Таджикский сомони", "Tajikistani Somoni", "🇹🇯"],
  XAU: ["Золото", "Gold", ""], XAG: ["Серебро", "Silver", ""], USDT: ["TetherUS", "TetherUS", ""]};
const COIN = {BTC: "Bitcoin", ETH: "Ethereum", SOL: "Solana", XRP: "XRP", BNB: "BNB", DOGE: "Dogecoin", ADA: "Cardano", TON: "Toncoin", TRX: "TRON", LTC: "Litecoin",
  AVAX: "Avalanche", LINK: "Chainlink", DOT: "Polkadot", PAXG: "PAX Gold", XAUT: "Tether Gold", SHIB: "Shiba Inu", PEPE: "Pepe", SUI: "Sui", NEAR: "NEAR",
  APT: "Aptos", ARB: "Arbitrum", OP: "Optimism", ATOM: "Cosmos", UNI: "Uniswap", BCH: "Bitcoin Cash", ETC: "Ethereum Classic", FIL: "Filecoin", WIF: "dogwifhat"};
const YNAME = {"^GSPC": ["SPX", "Индекс S&P 500", "S&P 500 Index"], "^NDX": ["NDX", "Индекс Nasdaq 100", "Nasdaq 100 Index"], "^DJI": ["DJI", "Индекс Dow Jones", "Dow Jones Industrial Average"],
  "^IXIC": ["IXIC", "Nasdaq Composite", "Nasdaq Composite"], "^RUT": ["RUT", "Russell 2000", "Russell 2000"], "^VIX": ["VIX", "Индекс волатильности", "Volatility Index"],
  "^FTSE": ["UKX", "FTSE 100", "FTSE 100"], "^GDAXI": ["DAX", "Индекс DAX", "DAX Index"], "^N225": ["NI225", "Nikkei 225", "Nikkei 225"], "^HSI": ["HSI", "Hang Seng", "Hang Seng"],
  "GC=F": ["GC1!", "Золото (фьючерс)", "Gold Futures"], "SI=F": ["SI1!", "Серебро (фьючерс)", "Silver Futures"], "CL=F": ["CL1!", "Нефть WTI", "Crude Oil WTI"],
  "BZ=F": ["BRN1!", "Нефть Brent", "Brent Crude Oil"], "NG=F": ["NG1!", "Природный газ", "Natural Gas"],
  AAPL: ["AAPL", "Apple Inc.", "Apple Inc."], NVDA: ["NVDA", "NVIDIA Corporation", "NVIDIA Corporation"], MSFT: ["MSFT", "Microsoft Corporation", "Microsoft Corporation"],
  TSLA: ["TSLA", "Tesla, Inc.", "Tesla, Inc."], AMZN: ["AMZN", "Amazon.com, Inc.", "Amazon.com, Inc."], GOOGL: ["GOOGL", "Alphabet Inc.", "Alphabet Inc."], META: ["META", "Meta Platforms, Inc.", "Meta Platforms, Inc."]};
const isFx = s => /^[A-Z]{6}$/.test(s) && CUR[s.slice(0, 3)] && CUR[s.slice(3)];
function symInfo(k) {
  const [src, sym] = splitKey(k), en = LANG === "en";
  let show = sym, desc = (S.names || {})[k] || "", kind = "crypto", base = sym, quote = "";
  if (src === "YAHOO") {
    const y = YNAME[sym];
    if (y) { show = y[0]; desc = desc || y[en ? 2 : 1]; }
    if (/=X$/.test(sym)) { show = sym.replace("=X", ""); kind = isFx(show) ? "fx" : "other"; base = show.slice(0, 3); quote = show.slice(3); }
    else if (/=F$/.test(sym)) kind = /^(GC|SI)/.test(sym) ? "metal" : "commodity";
    else if (sym[0] === "^") kind = "index";
    else if (/-USD$/.test(sym)) { kind = "crypto"; base = sym.replace("-USD", ""); quote = "USD"; }
    else kind = "stock";
    if (kind === "metal") base = sym.startsWith("GC") ? "XAU" : "XAG";
  } else {
    const m = sym.match(/^([A-Z]{6})USDT$/);
    let core = src === "BYBIT" && m && isFx(m[1]) ? m[1] : sym;
    if (src === "BYBIT" && m && isFx(m[1])) show = m[1];
    if (isFx(core)) { kind = "fx"; base = core.slice(0, 3); quote = core.slice(3); }
    else {
      const q = core.match(/^(.+?)(USDT|USDC|USD|BUSD|FDUSD|BTC|ETH)$/);
      base = q ? q[1] : core; quote = q ? q[2] : "";
      if (base === "XAU" || base === "XAG") kind = "metal";
    }
  }
  if (!desc) {
    const nm = c => CUR[c] ? CUR[c][en ? 1 : 0] : COIN[c] || c;
    if (kind === "fx" || kind === "metal") desc = nm(base) + (quote ? " / " + nm(quote) : "");
    else if (kind === "crypto") desc = (COIN[base] || base) + (quote ? " / " + nm(quote) : "");
  }
  return {src, sym, show, desc, kind, base, quote};
}
function symIcon(k, size) {
  const i = symInfo(k), st = size ? `style="width:${size}px;height:${size}px"` : "";
  if (i.kind === "fx") return `<div class="fx2" ${st}><span>${CUR[i.base][2] || i.base[0]}</span><span>${CUR[i.quote][2] || i.quote[0]}</span></div>`;
  if (i.kind === "metal") return `<div class="ic sic" ${st} style="background:${i.base === "XAU" ? "linear-gradient(135deg,#f7d774,#b8860b)" : "linear-gradient(135deg,#e8e8e8,#8a8a8a)"};color:#3a2a00">${i.base === "XAU" ? "Au" : "Ag"}</div>`;
  if (i.kind === "index") {
    const lab = {"^GSPC": ["500", "#b71c1c"], "^NDX": ["100", "#00838f"], "^DJI": ["30", "#1565c0"], "^IXIC": ["IX", "#00838f"], "^VIX": ["VIX", "#6a1b9a"]}[i.sym] || [i.show.slice(0, 3), "#37474f"];
    return `<div class="ic sic" ${st} style="background:${lab[1]}">${esc(lab[0])}</div>`;
  }
  if (i.kind === "commodity") return `<div class="ic sic" ${st} style="background:#263238;font-size:18px">${/^(CL|BZ)/.test(i.sym) ? "🛢" : "🔥"}</div>`;
  if (i.kind === "crypto") {
    const fb = esc(i.base.slice(0, 3));
    return `<div class="ic sic" ${st} style="background:${icColor(i.base)}">${fb}<img src="https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/${i.base.toLowerCase()}.png" alt="" loading="lazy"
      style="position:absolute;inset:0;width:100%;height:100%;background:var(--bg)" onerror="this.remove()"></div>`;
  }
  return `<div class="ic sic" ${st} style="background:${icColor(i.show)}">${esc(i.show.slice(0, 4))}</div>`;
}
S.names = LS.get("names", {});

/* ---- тема ---- */
const THEMES = {
  dark: {bg: "#000000", tx: "#b2b5be", grid: "#141414", bd: "#2a2a2a", lab: "#2e2e2e"},
  light: {bg: "#ffffff", tx: "#131722", grid: "#f0f3fa", bd: "#e0e3eb", lab: "#131722"}
};
function isLight() { const m = LS.get("theme", "dark"); return m === "light" || (m === "system" && matchMedia("(prefers-color-scheme: light)").matches); }
function applyTheme() {
  const lt = isLight(), c = THEMES[lt ? "light" : "dark"];
  document.documentElement.classList.toggle("light", lt);
  const mt = document.querySelector('meta[name="theme-color"]'); if (mt) mt.content = c.bg;
  const gc = LS.get("grid", true) ? c.grid : "rgba(0,0,0,0)";
  const o = {layout: {background: {type: "solid", color: c.bg}, textColor: c.tx}, grid: {vertLines: {color: gc}, horzLines: {color: gc}},
    rightPriceScale: {borderColor: c.bd}, timeScale: {borderColor: c.bd},
    crosshair: {vertLine: {labelBackgroundColor: c.lab}, horzLine: {labelBackgroundColor: c.lab}}};
  Object.assign(CH_OPT.layout, o.layout); CH_OPT.grid = o.grid;
  CH_OPT.rightPriceScale.borderColor = c.bd; CH_OPT.timeScale.borderColor = c.bd;
  if (G.chart) G.chart.applyOptions(o);
  G.subs.forEach(s => s.chart.applyOptions(o));
  if (typeof DR !== "undefined") DR.dirty();
}
matchMedia("(prefers-color-scheme: light)").addEventListener("change", applyTheme);
function themeSheet() {
  const m = LS.get("theme", "dark"), sys = m === "system", cur = sys ? (isLight() ? "light" : "dark") : m;
  const ph = (bg, bar) => `<div class="ph" style="background:${bg}">${[1, 1, 0, 0, 1, 1, 1, 1].map(u => `<i><b style="width:8px;background:${bar}"></b><b style="width:26px;background:${bar}"></b><b style="width:22px;margin-left:auto;background:${u ? "#22ab94" : "#f7525f"}"></b></i>`).join("")}</div>`;
  const b = sheet(T("Тема"), `<div class="thm">
    <button data-m="light" class="${cur === "light" && !sys ? "on" : ""}">${ph("#fff", "#c9cbd1")}<span class="rd"></span>${esc(T("Светлая"))}</button>
    <button data-m="dark" class="${cur === "dark" && !sys ? "on" : ""}">${ph("#111", "#3a3a3a")}<span class="rd"></span>${esc(T("Тёмная"))}</button></div>
    <button class="opt" id="thSys" style="height:auto;padding:12px 18px"><span style="flex:1"><b style="font-weight:500">${esc(T("Системная тема"))}</b><br><small style="color:var(--mu)">${esc(T("Изменение темы в зависимости от настроек телефона"))}</small></span><span class="sw ${sys ? "on" : ""}"></span></button>`);
  $$("[data-m]", b).forEach(x => x.onclick = () => { LS.set("theme", x.dataset.m); applyTheme(); themeSheet(); });
  $("#thSys", b).onclick = () => { LS.set("theme", sys ? (isLight() ? "light" : "dark") : "system"); applyTheme(); themeSheet(); };
}

function toast(t, ms = 2200) {
  const e = $("#toast"); e.textContent = t; e.classList.add("on");
  clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.remove("on"), ms);
}
function go(id) {
  closeMenu();
  $$(".page").forEach(p => p.classList.toggle("on", p.id === id));
  $$("#nav button").forEach(b => b.classList.toggle("on", b.dataset.p === id));
  LS.set("page", id);
  if (id === "pgWatch") renderWatch();
  if (id === "pgAlerts") renderAlerts();
  if (id === "pgSet") renderSettings();
  if (id === "pgTrade" && typeof TR !== "undefined") TR.render();
}
let sheetClose = null;
function sheet(title, html, onClose) {
  closeMenu();
  $("#shT").textContent = title; $("#shB").innerHTML = html; $("#shB").className = "sb"; $("#shB").scrollTop = 0;
  $("#ov").classList.add("on"); $("#sheet").classList.add("on");
  sheetClose = onClose || null;
  return $("#shB");
}
function closeSheet() {
  $("#ov").classList.remove("on"); $("#sheet").classList.remove("on");
  const f = sheetClose; sheetClose = null; f && f();
}
/* всплывающее меню */
function popMenu(anchor, items) {
  const m = $("#popMenu");
  m.innerHTML = items.map((it, i) => `<button data-i="${i}"><span>${esc(T(it[0]))}</span>${it[1] || ""}</button>`).join("");
  const r = anchor.getBoundingClientRect();
  m.style.left = Math.max(8, Math.min(r.left - 10, innerWidth - 290)) + "px"; m.style.top = (r.top - 4) + "px";
  m.classList.add("on");
  $$("button", m).forEach(b => b.onclick = e => { e.stopPropagation(); closeMenu(); items[+b.dataset.i][2](); });
  setTimeout(() => document.addEventListener("click", closeMenu, {once: true}), 0);
}
function closeMenu() { const m = $("#popMenu"); if (m) m.classList.remove("on"); }

/* ---- интервалы (как в TradingView) ---- */
const TF_GROUPS = [["МИНУТЫ", ["1m", "3m", "5m", "15m", "30m"]], ["ЧАСЫ", ["1h", "2h", "4h"]], ["ДНИ", ["1d", "1w", "1M"]]];
const tfLabel = t => {
  const n = parseInt(t), u = t.replace(/\d+/, ""), ru = LANG === "ru";
  return n + ({m: ru ? "м" : "m", h: ru ? "ч" : "h", d: ru ? "Д" : "D", w: ru ? "Н" : "W", M: ru ? "М" : "M"}[u] || u);
};
function tfSheet() {
  const fav = LS.get("tfFav", []), tipOff = LS.get("tfTip", false);
  const row = arr => `<div class="tfrow">${arr.map(t => `<button data-tf="${t}" class="${t === S.tf ? "on" : ""}">${tfLabel(t)}${fav.includes(t) ? '<i class="fv">★</i>' : ""}</button>`).join("")}</div>`;
  const b = sheet(T("Интервал"), `${tipOff ? "" : `<div class="tip"><span style="font-size:26px">☆</span><span>${esc(T("Добавьте интервал в избранное при помощи долгого нажатия"))}</span><button class="cl" id="tipX">✕</button></div>`}
    ${fav.length ? `<div class="tfsec" style="border:0">${esc(T("ИЗБРАННОЕ"))}</div>${row(TFS.filter(t => fav.includes(t)))}` : ""}
    ${TF_GROUPS.map(([g, arr], i) => `<div class="tfsec" ${!i && !fav.length ? 'style="border:0"' : ""}>${esc(T(g))}</div>${row(arr)}`).join("")}`);
  const tx = $("#tipX", b); if (tx) tx.onclick = () => { LS.set("tfTip", true); tfSheet(); };
  $$("[data-tf]", b).forEach(e => longPress(e, () => {
    const f = LS.get("tfFav", []), t = e.dataset.tf, i = f.indexOf(t);
    if (i >= 0) f.splice(i, 1); else f.push(t);
    LS.set("tfFav", f); toast(i >= 0 ? T("Удалено из избранного") : T("Добавлено в избранное")); tfSheet();
  }, () => { S.tf = e.dataset.tf; save("tf"); closeSheet(); loadChart(); }));
}
/* долгое нажатие + обычное нажатие */
function longPress(el, onLong, onTap) {
  let t = null, fired = false, sx = 0, sy = 0;
  el.addEventListener("pointerdown", e => { fired = false; sx = e.clientX; sy = e.clientY; t = setTimeout(() => { fired = true; try { LS.get("vib", true) && navigator.vibrate && navigator.vibrate(20); } catch (x) {} onLong(); }, 550); });
  el.addEventListener("pointermove", e => { if (t && Math.hypot(e.clientX - sx, e.clientY - sy) > 10) { clearTimeout(t); t = null; } });
  ["pointerup", "pointercancel", "pointerleave"].forEach(ev => el.addEventListener(ev, () => { clearTimeout(t); t = null; }));
  el.addEventListener("contextmenu", e => e.preventDefault());
  el.onclick = e => { if (fired) { e.preventDefault(); return; } onTap && onTap(e); };
}
const TYPES = [["candles", "Свечи"], ["ha", "Хейкин-Аши"], ["bars", "Бары"], ["line", "Линия"], ["area", "Область"]];
function typeSheet() {
  const b = sheet(T("Тип графика"), TYPES.map(([k, n]) => `<button class="opt ${k === S.type ? "on" : ""}" data-ty="${k}">${esc(T(n))}</button>`).join("") +
    `<button class="opt" id="volT">${esc(T("Показывать объём"))}<span class="sw ${S.vol ? "on" : ""}" style="margin-left:auto"></span></button>`);
  $$("[data-ty]", b).forEach(e => e.onclick = () => { S.type = e.dataset.ty; save("type"); closeSheet(); mkMain(); renderAll(); });
  $("#volT", b).onclick = () => { S.vol = !S.vol; save("vol"); closeSheet(); mkMain(); renderAll(); };
}

/* ---- индикаторы ---- */
function indSheet() {
  const draw = () => {
    const act = S.inds.map((x, i) => {
      const D = IND[x.k]; if (!D) return "";
      const p = Object.assign({}, D.p, x.p);
      return `<div class="ind"><div class="h"><b>${esc(D.n)}</b><button class="x" data-del="${i}" style="color:var(--dn);font-size:18px;width:32px">✕</button></div>
        <div class="ps">${Object.keys(p).map(k => `<div><span>${esc(T(PNAME[k] || k))}</span><input type="number" inputmode="decimal" step="any" data-i="${i}" data-k="${k}" value="${p[k]}"></div>`).join("")}
        <div><span>${esc(T("Цвет"))}</span><input type="color" data-i="${i}" data-c="1" value="${x.c || D.c}"></div></div></div>`;
    }).join("");
    b.innerHTML = act + `<div class="sec">${esc(T("Индикаторы"))} ＋</div>` +
      Object.entries(IND).map(([k, D]) => `<button class="opt" data-add="${k}">${esc(D.n)}<span class="r">${D.pane ? "▭" : ""}</span></button>`).join("");
    $$("[data-del]", b).forEach(e => e.onclick = () => { S.inds.splice(+e.dataset.del, 1); changed(); draw(); });
    $$("[data-add]", b).forEach(e => e.onclick = () => { S.inds.push({k: e.dataset.add, p: {}, c: IND[e.dataset.add].c}); changed(); draw(); b.scrollTop = 0; });
    $$("input[data-i]", b).forEach(e => e.onchange = () => {
      const x = S.inds[+e.dataset.i];
      if (e.dataset.c) x.c = e.value; else { const v = parseFloat(e.value); if (v > 0) x.p[e.dataset.k] = v; }
      changed();
    });
  };
  const changed = () => { save("inds"); if (G.main && G.B.length) { renderInds(); legend(null); } };
  const b = sheet(T("Индикаторы"), "");
  draw();
}

/* ---- поиск инструмента ---- */
let searchSrc = LS.get("ssrc", "BINANCE");
function searchSheet(mode) {                                    // mode: "open" — открыть на графике, "add" — в котировки
  const b = sheet(T("Поиск инструмента"), `<div class="dsrch">${ICO.search}<input id="sq" placeholder="${esc(T("Введите название, например BTC"))}" autocomplete="off" autocapitalize="characters" spellcheck="false"></div>
    <div class="dtabs">${Object.keys(SRC).map(k => `<button data-s="${k}" class="${k === searchSrc ? "on" : ""}">${SRC[k].label}</button>`).join("")}</div><div id="sr"></div>`);
  let tm, n = 0;
  const run = async () => {
    const my = ++n, q = $("#sq").value.trim(), out = $("#sr");
    if (searchSrc === "CT" && !CT.configured()) {
      out.innerHTML = `<div class="empty">${esc(T("Этот инструмент идёт через cTrader. Подключите cTrader в настройках."))}<br><br><button class="btn pri" style="padding:10px 16px;border-radius:12px;background:var(--bl);color:#fff" id="toSet">${esc(T("Настроить cTrader"))}</button></div>`;
      $("#toSet").onclick = () => { closeSheet(); go("pgSet"); }; return;
    }
    out.innerHTML = `<div class="empty">${esc(T("Загрузка…"))}</div>`;
    try {
      const r = await SRC[searchSrc].search(q);
      if (my !== n) return;
      out.innerHTML = r.length ? r.map(x => {
        const k = searchSrc + ":" + x.sym, inW = S.watch.includes(k);
        if (x.d && !S.names[k] && searchSrc === "YAHOO") S.names[k] = x.d;
        const i = symInfo(k);
        return `<div class="row" data-k="${esc(k)}" data-d="${esc(x.d || "")}">${symIcon(k)}
          <div class="nm"><b>${esc(i.show)}</b><small>${esc(x.d || i.desc || SRC[searchSrc].label)}</small></div>
          <button class="x" data-w="${esc(k)}" style="color:${inW ? "#f5c542" : "var(--mu)"};font-size:24px">${inW ? "★" : "☆"}</button></div>`;
      }).join("") : `<div class="empty">${esc(T("Ничего не найдено"))}</div>`;
      $$(".row", out).forEach(e => e.onclick = ev => {
        if (ev.target.dataset.w) return;
        const k = e.dataset.k; if (e.dataset.d) { S.names[k] = e.dataset.d; LS.set("names", S.names); }
        if (mode === "add") addWatch(k, e.querySelector("[data-w]")); else { closeSheet(); openSym(k); }
      });
      $$("[data-w]", out).forEach(e => e.onclick = () => { const r = e.closest(".row"); if (r.dataset.d) { S.names[r.dataset.k] = r.dataset.d; LS.set("names", S.names); } addWatch(e.dataset.w, e); });
    } catch (e) { if (my === n) out.innerHTML = `<div class="empty dn">${esc(e.message || e)}</div>`; }
  };
  $$("[data-s]", b).forEach(e => e.onclick = () => { searchSrc = e.dataset.s; LS.set("ssrc", searchSrc); $$("[data-s]", b).forEach(x => x.classList.toggle("on", x === e)); run(); });
  $("#sq").oninput = () => { clearTimeout(tm); tm = setTimeout(run, 250); };
  run();
}
function addWatch(k, btn) {
  if (S.watch.includes(k)) { S.watch = S.watch.filter(x => x !== k); if (btn && btn.dataset && btn.dataset.w) { btn.textContent = "☆"; btn.style.color = "var(--mu)"; } }
  else { S.watch.push(k); toast(T("Добавлено в котировки")); if (btn && btn.dataset && btn.dataset.w) { btn.textContent = "★"; btn.style.color = "#f5c542"; } }
  save("watch"); syncTickers(); renderWatch();
}
function icColor(s) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 360; return `hsl(${h},45%,38%)`; }

/* ---- котировки (главная страница, как в TradingView) ---- */
let wEdit = false;
const GROUPS = [["index", "Индексы"], ["stock", "Акции"], ["fx", "Форекс"], ["metal", "Металлы и сырьё"], ["crypto", "Криптовалюта"]];
const groupOf = k => { const i = symInfo(k); return i.kind === "commodity" ? "metal" : i.kind === "other" ? "fx" : i.kind; };
const SITE = "https://fazo-terminal.pages.dev";
function promoHTML() {
  if (LS.get("promoOff", 0) > Date.now()) return "";
  return `<div class="promo"><i class="star" style="left:62%;top:22%">✦</i><i class="star" style="left:78%;top:70%">✦</i><i class="star" style="left:56%;top:78%">✦</i>
    <h4>${esc(T("Fazo для компьютера"))}</h4><p>${esc(T("Полная версия терминала для Windows: стратегии, ИИ, MT5 и все инструменты."))}</p>
    <a href="${SITE}" target="_blank" rel="noopener">${esc(T("Перейти на сайт"))}</a><img src="logo.png" alt=""><button class="cl" id="promoX">✕</button></div>`;
}
function sortedKeys(keys) {
  const m = LS.get("wsort", "manual");
  if (m === "manual") return keys;
  const a = keys.slice(), q = k => Q[k] || {};
  if (m === "name") a.sort((x, y) => symInfo(x).show.localeCompare(symInfo(y).show));
  if (m === "chgD") a.sort((x, y) => (q(y).chg ?? -1e9) - (q(x).chg ?? -1e9));
  if (m === "chgA") a.sort((x, y) => (q(x).chg ?? 1e9) - (q(y).chg ?? 1e9));
  if (m === "price") a.sort((x, y) => (q(y).last ?? 0) - (q(x).last ?? 0));
  return a;
}
function renderWatch() {
  const L = $("#wList");
  $("#wListBtn").innerHTML = `${esc(T(wEdit ? "Готово" : "Список котировок"))}`;
  const col = LS.get("wcol", {});
  let html = promoHTML();
  if (!S.watch.length) html += `<div class="empty">${esc(T("Список пуст. Нажмите ＋, чтобы добавить инструмент."))}</div>`;
  for (const [g, title] of GROUPS) {
    const keys = sortedKeys(S.watch.filter(k => groupOf(k) === g)); if (!keys.length) continue;
    html += `<div class="grp ${col[g] ? "cl" : ""}" data-g="${g}">${ICO.chev}<span>${esc(T(title))}</span></div>`;
    if (col[g]) continue;
    html += keys.map(k => {
      const i = symInfo(k), idx = S.watch.indexOf(k);
      return `<div class="row" data-k="${esc(k)}">${symIcon(k)}
        <div class="nm"><b>${esc(i.show)}</b><small>${esc(i.desc || SRC_TAG[i.src] || i.src)}${i.src === "CT" && !CT.configured() ? " · " + esc(T("Не настроен")) : ""}</small></div>
        ${wEdit ? `<span class="dr" data-up="${idx}">▲</span><span class="dr" data-dn="${idx}">▼</span><button class="x" data-rm="${esc(k)}">✕</button>` : `<div class="pr" id="q_${cssId(k)}"></div>`}</div>`;
    }).join("");
  }
  L.innerHTML = html + `<div style="height:16px"></div>`;
  S.watch.forEach(paintRow);
  const px = $("#promoX", L); if (px) px.onclick = e => { e.stopPropagation(); LS.set("promoOff", Date.now() + 3 * 86400000); renderWatch(); };
  $$(".grp", L).forEach(e => e.onclick = () => { const c = LS.get("wcol", {}); c[e.dataset.g] = !c[e.dataset.g]; LS.set("wcol", c); renderWatch(); });
  $$(".row", L).forEach(e => e.onclick = ev => {
    const t = ev.target;
    if (t.dataset.rm) { S.watch = S.watch.filter(x => x !== t.dataset.rm); save("watch"); syncTickers(); renderWatch(); return; }
    if (t.dataset.up || t.dataset.dn) {
      const i = +(t.dataset.up || t.dataset.dn), g = groupOf(S.watch[i]);
      const same = S.watch.map((k, j) => [k, j]).filter(([k]) => groupOf(k) === g).map(([, j]) => j), p = same.indexOf(i), j = same[t.dataset.up ? p - 1 : p + 1];
      if (j == null) return;
      [S.watch[i], S.watch[j]] = [S.watch[j], S.watch[i]]; LS.set("wsort", "manual"); save("watch"); renderWatch(); return;
    }
    if (!wEdit) openSym(e.dataset.k);
  });
}
const cssId = k => k.replace(/[^A-Za-z0-9]/g, "_");
function paintRow(k) {
  const e = document.getElementById("q_" + cssId(k)); if (!e) return;
  const q = Q[k]; if (!q) { e.innerHTML = `<b style="color:var(--mu)">—</b>`; return; }
  const d = q.d != null ? q.d : (S.dig[k] || 2);
  if (q.chg == null) { e.innerHTML = `<b>${nf(q.last, d)}</b><span style="color:var(--mu)">—</span>`; return; }
  const abs = q.last - q.last / (1 + q.chg / 100), s = q.chg >= 0 ? "+" : "−", cls = q.chg >= 0 ? "up" : "dn";
  e.innerHTML = `<b>${nf(q.last, d)}</b><span class="${cls}">${s}${nf(Math.abs(abs), d)}&nbsp; ${s}${nf(Math.abs(q.chg), 2)}%</span>`;
}
function watchMenu(anchor) {
  popMenu(anchor, [
    ["Изменить", ICO.pen, () => { wEdit = !wEdit; renderWatch(); }],
    ["Сортировать по", ICO.sort, sortSheet],
    ["Оповещение для списка", ICO.bell, () => go("pgAlerts")],
    ["Добавить инструмент", ICO.plus, () => searchSheet("add")]
  ]);
}
function sortSheet() {
  const m = LS.get("wsort", "manual");
  const b = sheet(T("Сортировать по"), [["manual", "Вручную"], ["name", "Названию"], ["chgD", "Изменению: сначала рост"], ["chgA", "Изменению: сначала падение"], ["price", "Цене"]]
    .map(([k, n]) => `<button class="opt ${k === m ? "on" : ""}" data-s="${k}">${esc(T(n))}${k === m ? '<span class="r">✓</span>' : ""}</button>`).join(""));
  $$("[data-s]", b).forEach(e => e.onclick = () => { LS.set("wsort", e.dataset.s); closeSheet(); renderWatch(); });
}

/* ---- меню (всё для теханализа и настройки) ---- */
const MI = {
  ind: '<svg viewBox="0 0 24 24"><path d="M4 20h16"/><path d="M6 16v-3M10 16V9M14 16v-5M18 16V6"/><path d="m5 10 5-4 4 3 5-5"/></svg>',
  draw: '<svg viewBox="0 0 24 24"><path d="M4 20 20 4"/><circle cx="4.5" cy="19.5" r="2"/><circle cx="19.5" cy="4.5" r="2"/></svg>',
  alert: '<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="7"/><path d="M12 9v4l2 2M5 4 2 7M19 4l3 3"/></svg>',
  type: '<svg viewBox="0 0 24 24"><path d="M8 3v3M8 17v4M16 6v3M16 15v3"/><rect x="6" y="6" width="4" height="11" rx="1"/><rect x="14" y="9" width="4" height="6" rx="1"/></svg>',
  theme: '<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"/></svg>',
  lang: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>',
  trade: '<svg viewBox="0 0 24 24"><path d="m4 15 5-5 4 4 7-7"/><path d="M15 7h5v5"/></svg>',
  site: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  tg: '<svg viewBox="0 0 24 24"><path d="m21 4-18 7 6 2 2 6 3-4 5 4z"/><path d="m9 13 8-6"/></svg>',
  list: '<svg viewBox="0 0 24 24"><path d="M5 4h14v16l-7-4-7 4z"/></svg>',
  gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/></svg>',
  cam: '<svg viewBox="0 0 24 24"><path d="M4 8h4l2-3h4l2 3h4v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
  full: '<svg viewBox="0 0 24 24"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/></svg>',
  layers: '<svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
};
let installEvt = null;
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvt = e; });
function renderSettings() {
  const c = CT.cfg(), L = $("#sList");
  const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone;
  const np = "Notification" in window ? Notification.permission : "denied";
  L.innerHTML = `
  <div class="mgrid c3" style="margin-top:6px">
    <button class="o" data-m="site">${MI.site}${esc(T("Fazo для ПК"))}</button><button class="o" data-m="theme">${MI.theme}${esc(T("Тема"))}</button><button class="o" data-m="lang">${MI.lang}${LANG === "ru" ? "Русский" : "English"}</button></div>
  <div class="mgrid" style="margin-top:12px"><button data-m="trade" style="grid-column:span 2;border:1px solid transparent;background:linear-gradient(var(--sh),var(--sh)) padding-box,linear-gradient(90deg,#f7525f,#2962ff) border-box">${MI.trade}${esc(T("Торгуйте со своим брокером"))}</button></div>
  <div class="sec">${esc(T("ИНСТРУМЕНТЫ"))}</div>
  <div class="mgrid"><button data-m="ind">${MI.ind}${esc(T("Индикаторы"))}</button><button data-m="draw">${MI.draw}${esc(T("Объекты рисования"))}</button>
    <button data-m="alert">${MI.alert}${esc(T("Оповещения"))}</button><button data-m="type">${MI.type}${esc(T("Тип графика"))}</button>
    <button data-m="cset" style="grid-column:span 2">${MI.gear}${esc(T("Настройки графика"))}</button></div>
  <div class="sec">${esc(T("Подключение cTrader"))}</div>
  <div class="card">
    <label>${esc(T("Сервер"))}</label><div class="seg" id="ctLive"><button data-v="0" class="${!c.live ? "on" : ""}">${esc(T("Демо"))}</button><button data-v="1" class="${c.live ? "on" : ""}">${esc(T("Реальный"))}</button></div>
    <label>Client ID</label><input id="ctCid" value="${esc(c.cid || "")}" autocomplete="off" spellcheck="false">
    <label>Client Secret</label><input id="ctSec" type="password" value="${c.csec ? "•••" : ""}" autocomplete="off">
    <label>Access token</label><input id="ctAt" type="password" value="${c.at ? "•••" : ""}" autocomplete="off">
    <label>Refresh token</label><input id="ctRt" type="password" value="${c.rt ? "•••" : ""}" autocomplete="off">
    <div class="btns"><button class="pri" id="ctGo">${esc(T("Подключить"))}</button>${c.cid ? `<button id="ctOff">${esc(T(c.off ? "Подключить" : "Отключить"))}</button>` : ""}</div>
    <div class="st ${CT.stCls || ""}" id="ctSt">${esc(CT.status || (CT.configured() ? "" : T("Не настроен")))}</div>
    <div class="note">${esc(T("Форекс, металлы и индексы идут через cTrader. Введите данные своего приложения Open API (openapi.ctrader.com → Applications) и токены. Данные хранятся только на этом телефоне."))}</div>
  </div>
  <div class="sec">${esc(T("Уведомления"))}</div>
  <div class="card"><div class="btns" style="margin-top:0"><button id="nBtn" ${np !== "default" ? "disabled" : ""}>${esc(np === "granted" ? T("Уведомления разрешены") : np === "denied" ? T("Уведомления запрещены в настройках браузера") : T("Разрешить уведомления"))}</button></div></div>
  <div class="sec">${esc(T("Установка"))}</div>
  <div class="card">${standalone ? esc(T("Приложение уже установлено")) : `${installEvt ? `<div class="btns" style="margin-top:0"><button class="pri" id="inst">${esc(T("Установить приложение"))}</button></div>` : ""}
    <div class="note">${esc(T("На Android: меню Chrome ⋮ → «Установить приложение»."))}<br>${esc(T("На iPhone: Safari → «Поделиться» → «На экран Домой»."))}</div>`}</div>
  <div class="sec">${esc(T("О программе"))}</div>
  <a class="mlink" href="${SITE}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none">${MI.site}<span>${esc(T("Сайт Fazo"))}</span><span class="r">fazo-terminal.pages.dev</span></a>
  <a class="mlink" href="https://t.me/criptosignals_tj" target="_blank" rel="noopener" style="color:inherit;text-decoration:none">${MI.tg}<span>Telegram</span><span class="r">@criptosignals_tj</span></a>
  <a class="mlink" href="https://t.me/drolimjon" target="_blank" rel="noopener" style="color:inherit;text-decoration:none">${MI.tg}<span>${esc(T("Поддержка"))}</span><span class="r">@drolimjon</span></a>
  <button class="mlink" id="rst" style="color:var(--dn)">${MI.list}<span>${esc(T("Сбросить настройки"))}</span><span class="r">Fazo Mobile ${VER}</span></button>
  <div style="height:24px"></div>`;
  $$("[data-m]", L).forEach(e => e.onclick = () => {
    const m = e.dataset.m;
    if (m === "site") window.open(SITE, "_blank", "noopener");
    if (m === "theme") themeSheet();
    if (m === "lang") { LANG = LANG === "ru" ? "en" : "ru"; LS.set("lang", LANG); applyLang(); renderSettings(); legend(null); }
    if (m === "trade") go("pgTrade");
    if (m === "ind") { go("pgChart"); indSheet(); }
    if (m === "draw") { go("pgChart"); DR.menu(); }
    if (m === "alert") go("pgAlerts");
    if (m === "type") { go("pgChart"); typeSheet(); }
    if (m === "cset") chartSettings();
  });
  let live = !!c.live;
  $$("#ctLive button", L).forEach(e => e.onclick = () => { live = e.dataset.v === "1"; $$("#ctLive button", L).forEach(x => x.classList.toggle("on", x === e)); });
  $("#ctGo", L).onclick = async () => {
    const n = CT.cfg(), v = id => $(id, L).value.trim();
    n.cid = v("#ctCid");
    [["csec", "#ctSec"], ["at", "#ctAt"], ["rt", "#ctRt"]].forEach(([k, id]) => { const x = v(id); if (x && x !== "•••") { n[k] = x; if (k === "at") n.exp = Date.now() / 1000 + 29 * 86400; } if (!x) delete n[k]; });
    if (n.live !== live) { n.live = live; delete n.acc; }
    delete n.off;
    CT.save(n); CT.reset();
    try { await CT.ready(); syncTickers(); if (splitKey(S.sym)[0] === "CT") loadChart(); } catch (e) {}
  };
  const off = $("#ctOff", L);
  if (off) off.onclick = () => { const n = CT.cfg(); n.off = !n.off; CT.save(n); CT.reset(); if (!n.off) CT.ready().then(syncTickers).catch(() => {}); else syncTickers(); renderSettings(); };
  const nb = $("#nBtn", L); if (nb) nb.onclick = () => Notification.requestPermission().then(renderSettings);
  const ib = $("#inst", L); if (ib) ib.onclick = () => { installEvt.prompt(); installEvt.userChoice.finally(() => { installEvt = null; renderSettings(); }); };
  $("#rst", L).onclick = () => { if (!confirm(T("Сбросить все настройки этого телефона?"))) return; Object.keys(localStorage).filter(k => k.startsWith("fzm_")).forEach(k => localStorage.removeItem(k)); location.reload(); };
}

/* ---- алерты ---- */
function alertSheet(key) {
  key = key || S.sym;
  const [, sym] = splitKey(key), d = S.dig[key] || G.dig || 2;
  const cur = key === S.sym && G.B.length ? G.B[G.B.length - 1].close : (Q[key] && Q[key].last);
  const b = sheet(T("Новый алерт"), `<div class="card"><label>${esc(T("Инструмент"))}</label><input value="${esc(sym)} · ${esc(SRC_TAG[splitKey(key)[0]] || "")}" disabled>
    <label>${esc(T("Условие"))}</label><div class="seg" id="acond"><button data-c="cross" class="on">${esc(T("Пересечение"))}</button><button data-c="above">${esc(T("Выше"))}</button><button data-c="below">${esc(T("Ниже"))}</button></div>
    <label>${esc(T("Цена"))}${cur != null ? ` <span style="float:right">${esc(T("Текущая цена"))}: ${fmt(cur, d)}</span>` : ""}</label><input id="aprice" type="number" inputmode="decimal" step="any" value="${cur != null ? fmt(cur, d) : ""}">
    <div class="btns"><button class="pri" id="aOk">${esc(T("Создать"))}</button></div></div>`);
  let cond = "cross";
  $$("#acond button", b).forEach(e => e.onclick = () => { cond = e.dataset.c; $$("#acond button", b).forEach(x => x.classList.toggle("on", x === e)); });
  $("#aOk", b).onclick = () => {
    const p = parseFloat($("#aprice", b).value); if (!(p > 0)) return;
    S.alerts.unshift({id: "a" + Date.now(), sym: key, price: p, cond, on: true, created: Date.now()});
    save("alerts"); closeSheet(); toast(T("Алерт создан")); renderAlertLines(); renderAlerts(); syncTickers();
    if ("Notification" in window && Notification.permission === "default") Notification.requestPermission();
  };
}
function renderAlerts() {
  const L = $("#aList");
  if (!S.alerts.length) { L.innerHTML = `<div class="empty">${esc(T("Нет алертов"))}<br><br>${esc(T("Создайте алерт кнопкой ＋ или колокольчиком на графике. Алерты проверяются, пока приложение открыто."))}</div>`; return; }
  L.innerHTML = S.alerts.map((a, i) => {
    const [s, y] = splitKey(a.sym), d = S.dig[a.sym] || 5;
    const cn = a.cond === "above" ? "≥" : a.cond === "below" ? "≤" : "⇅";
    return `<div class="row" data-i="${i}"><div class="ic" style="background:${a.on ? "#ff9800" : "#363a45"}">🔔</div>
      <div class="nm"><b>${esc(y)} ${cn} ${fmt(a.price, d)}</b><small>${esc(SRC_TAG[s] || s)} · ${esc(a.on ? T("Активен") : T("Сработал") + (a.fired ? " " + new Date(a.fired).toLocaleString() : ""))}</small></div>
      <span class="sw ${a.on ? "on" : ""}" data-tg="${i}"></span><button class="x" data-rm="${i}">✕</button></div>`;
  }).join("");
  $$("[data-tg]", L).forEach(e => e.onclick = ev => { ev.stopPropagation(); const a = S.alerts[+e.dataset.tg]; a.on = !a.on; save("alerts"); renderAlerts(); renderAlertLines(); syncTickers(); });
  $$("[data-rm]", L).forEach(e => e.onclick = ev => { ev.stopPropagation(); S.alerts.splice(+e.dataset.rm, 1); save("alerts"); renderAlerts(); renderAlertLines(); syncTickers(); });
  $$(".row", L).forEach(e => e.onclick = () => openSym(S.alerts[+e.dataset.i].sym));
}

CT.onStatus = () => { const e = $("#ctSt"); if (e) { e.textContent = CT.status; e.className = "st " + (CT.stCls || ""); } };

/* ================= график в стиле TradingView ================= */
const CUP = () => LS.get("cUp", "#089981"), CDN = () => LS.get("cDn", "#f23645");
function legend(p) {
  const n = G.B.length, L = $("#legend"); if (!n) { L.innerHTML = ""; return; }
  let b = G.B[n - 1], i = n - 1;
  if (p && p.time) { const t = p.time - TZ; const j = G.B.findIndex(x => x.time === t); if (j >= 0) { b = G.B[j]; i = j; } }
  const d = G.dig, inf = symInfo(S.sym), src = splitKey(S.sym)[0];
  const il = S.inds.filter(x => IND[x.k] && !IND[x.k].pane).map(x => `<span style="color:${x.c || IND[x.k].c}">${IND[x.k].n} ${Object.values(Object.assign({}, IND[x.k].p, x.p)).join(" ")}</span>`).join(" · ");
  let line2;
  if (p && p.time) {
    const cls = b.close >= b.open ? "up" : "dn";
    line2 = `<div class="o" style="color:var(--mu)">O<b class="${cls}"> ${nf(b.open, d)}</b> H<b class="${cls}"> ${nf(b.high, d)}</b> L<b class="${cls}"> ${nf(b.low, d)}</b> C<b class="${cls}"> ${nf(b.close, d)}</b>${S.vol ? ` V <b>${fmtVol(b.volume)}</b>` : ""}</div>`;
  } else {
    const q = Q[S.sym], ref = q && q.chg != null ? q.last / (1 + q.chg / 100) : (G.B[n - 2] || b).close, last = b.close, ch = last - ref, pc = ref ? ch / ref * 100 : 0, s = ch >= 0 ? "+" : "−";
    line2 = `<div class="p ${ch >= 0 ? "up" : "dn"}">${nf(last, d)} ${s}${nf(Math.abs(ch), d)} (${s}${nf(Math.abs(pc), 2)}%)</div>`;
  }
  L.innerHTML = `<div class="t" id="lgT">${symIcon(S.sym)}<span>${esc(inf.desc || inf.show)}</span><small>· ${tfLabel(S.tf)} · ${esc(SRC_TAG[src] || src)}</small></div>${line2}${il ? `<div class="il">${il}</div>` : ""}`;
  $("#lgT").onclick = () => searchSheet("open");
}
/* отсчёт до закрытия свечи под меткой цены */
function cdownTick() {
  const e = $("#cdown");
  if (!LS.get("cdown", true) || !G.main || !G.B.length || !$("#pgChart").classList.contains("on")) { e.style.display = "none"; return; }
  const L = G.B[G.B.length - 1], sec = TF_SEC[S.tf], r = Math.floor(L.time + sec - Date.now() / 1000);
  const y = G.main.priceToCoordinate(L.close), h = $("#chart").clientHeight - G.chart.timeScale().height();
  if (r <= 0 || r > sec || y == null || y < 0 || y > h - 30) { e.style.display = "none"; return; }
  const dd = Math.floor(r / 86400), hh = Math.floor(r % 86400 / 3600), mm = Math.floor(r % 3600 / 60), ss = r % 60, z = v => String(v).padStart(2, "0");
  e.textContent = dd ? `${dd}${LANG === "ru" ? "д" : "d"} ${z(hh)}:${z(mm)}` : hh ? `${z(hh)}:${z(mm)}:${z(ss)}` : `${z(mm)}:${z(ss)}`;
  e.style.background = L.close >= L.open ? CUP() : CDN();
  e.style.width = G.chart.priceScale("right").width() + "px"; e.style.top = (y + 9) + "px"; e.style.display = "block";
}
setInterval(cdownTick, 500);
/* полный экран */
function toggleFull() {
  const a = $("#app"), on = !a.classList.contains("full");
  a.classList.toggle("full", on);
  try { if (on && document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {}); else if (!on && document.fullscreenElement) document.exitFullscreen(); } catch (e) {}
}
document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement) $("#app").classList.remove("full"); });
/* снимок графика */
async function snapshot() {
  try {
    const c = G.chart.takeScreenshot(), out = document.createElement("canvas"), dc = $("#drawCv");
    out.width = c.width; out.height = c.height; const x = out.getContext("2d");
    x.drawImage(c, 0, 0); if (dc) x.drawImage(dc, 0, 0);
    const k = c.width / $("#chart").clientWidth, inf = symInfo(S.sym);
    x.fillStyle = isLight() ? "#131722" : "#fff"; x.font = `${15 * k}px sans-serif`; x.fillText(`${inf.show} · ${tfLabel(S.tf)} · Fazo`, 10 * k, 22 * k);
    const blob = await new Promise(r => out.toBlob(r, "image/png")), file = new File([blob], `fazo-${inf.show}-${S.tf}.png`, {type: "image/png"});
    if (navigator.canShare && navigator.canShare({files: [file]})) await navigator.share({files: [file], title: "Fazo"});
    else { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = file.name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }
  } catch (e) { if (e && e.name !== "AbortError") toast("⚠ " + (e.message || e)); }
}
/* «Всё для теханализа» */
function moreSheet() {
  const b = sheet(T("Всё для теханализа"), `
    <div class="mgrid c3"><button class="o" data-m="cset">${MI.gear}${esc(T("Настройки графика"))}</button><button class="o" data-m="shot">${MI.cam}${esc(T("Снимок графика"))}</button><button class="o" data-m="full">${MI.full}${esc(T("Полный экран"))}</button></div>
    <div class="mgrid" style="margin-top:12px"><button data-m="trade" style="grid-column:span 2;border:1px solid transparent;background:linear-gradient(var(--sh),var(--sh)) padding-box,linear-gradient(90deg,#f7525f,#2962ff) border-box">${MI.trade}${esc(T("Торгуйте со своим брокером"))}</button></div>
    <div class="sec">${esc(T("ИНСТРУМЕНТЫ"))}</div>
    <div class="mgrid"><button data-m="ind">${MI.ind}${esc(T("Индикаторы"))}</button><button data-m="draw">${MI.draw}${esc(T("Объекты рисования"))}</button>
      <button data-m="alert">${MI.alert}${esc(T("Оповещения"))}</button><button data-m="type">${MI.type}${esc(T("Тип графика"))}</button>
      <button data-m="tree">${MI.layers}${esc(T("Дерево объектов"))}</button><button data-m="tf">${MI.clock}${esc(T("Интервал"))}</button></div><div style="height:12px"></div>`);
  $$("[data-m]", b).forEach(e => e.onclick = () => {
    const m = e.dataset.m; closeSheet();
    ({cset: chartSettings, shot: snapshot, full: toggleFull, trade: () => go("pgTrade"), ind: indSheet, draw: () => DR.menu(), alert: () => alertSheet(), type: typeSheet, tree: () => DR.tree(), tf: tfSheet})[m]();
  });
}
/* настройки графика */
const CPRESET = [["#089981", "#f23645", "TradingView"], ["#26a69a", "#ef5350", "Classic"], ["#2962ff", "#e91e63", "Blue / Pink"], ["#f5f5f5", "#787b86", "Mono"]];
const TZS = [["local", "Время телефона"], ["utc", "UTC"], ["3", "UTC+3 (Москва)"], ["5", "UTC+5 (Душанбе, Ташкент)"], ["-5", "UTC−5 (Нью-Йорк)"]];
function applyChartPrefs() {
  document.documentElement.classList.toggle("hidenav", LS.get("hidenav", false));
  const wm = $("#flogo"); if (wm) wm.style.display = LS.get("wm", true) ? "" : "none";
  if (G.chart) G.chart.priceScale("right").applyOptions({mode: LS.get("logs", false) ? 1 : 0});
  if (typeof TR !== "undefined") TR.chartBtns();
  applyTheme();
}
function chartSettings() {
  const sw = (k, def, label, note) => `<button class="opt" data-k="${k}" style="height:auto;min-height:56px;padding:10px 18px"><span style="flex:1"><span style="display:block">${esc(T(label))}</span>${note ? `<small style="color:var(--mu);font-size:13px;line-height:1.3">${esc(T(note))}</small>` : ""}</span><span class="sw ${LS.get(k, def) ? "on" : ""}"></span></button>`;
  const tz = LS.get("tz", "local"), up = CUP(), dn = CDN();
  const b = sheet(T("Настройки графика"), `
    <div class="sec" style="padding-top:4px">${esc(T("Свечи"))}</div>
    <div class="card"><div style="display:flex;gap:10px;flex-wrap:wrap">${CPRESET.map(([u, d, n], i) => `<button data-cp="${i}" style="flex:1;min-width:70px;height:56px;border-radius:12px;background:var(--tile);border:2px solid ${u === up && d === dn ? "var(--bl)" : "transparent"};display:flex;align-items:center;justify-content:center;gap:4px">
      <i style="width:8px;height:26px;background:${u};border-radius:2px;display:block"></i><i style="width:8px;height:18px;background:${d};border-radius:2px;display:block"></i><small style="margin-left:4px;font-size:11px;color:var(--mu)">${n}</small></button>`).join("")}</div>
      <div style="display:flex;gap:12px;margin-top:12px;align-items:center"><span style="color:var(--mu);font-size:13px">${esc(T("Рост"))}</span><input type="color" id="cUp" value="${up}" style="width:46px;height:34px;padding:0">
        <span style="color:var(--mu);font-size:13px">${esc(T("Падение"))}</span><input type="color" id="cDn" value="${dn}" style="width:46px;height:34px;padding:0"></div></div>
    <div class="sec">${esc(T("Внешний вид"))}</div>
    <div class="card" style="padding:4px 0">${sw("grid", true, "Сетка")}${sw("vol", S.vol, "Объём")}${sw("cdown", true, "Отсчёт до закрытия свечи")}${sw("logs", false, "Логарифмическая шкала")}
      ${sw("tbtn", true, "Кнопки «Продать / Купить» на графике")}${sw("wm", true, "Логотип Fazo на графике")}</div>
    <div class="sec">${esc(T("Поведение"))}</div>
    <div class="card" style="padding:4px 0">${sw("hidenav", false, "Скрыть панель вкладок", "Скрыть панель вкладок, когда график в горизонтальном режиме.")}${sw("vib", true, "Вибрация при выборе")}</div>
    <div class="sec">${esc(T("Часовой пояс"))}</div>
    <div class="card" style="padding:4px 0">${TZS.map(([k, n]) => `<button class="opt ${k === tz ? "on" : ""}" data-tz="${k}">${esc(T(n))}${k === tz ? '<span class="r">✓</span>' : ""}</button>`).join("")}</div><div style="height:10px"></div>`);
  $$("[data-k]", b).forEach(e => e.onclick = () => {
    const k = e.dataset.k;
    if (k === "vol") { S.vol = !S.vol; save("vol"); mkMain(); renderAll(); }
    else LS.set(k, !LS.get(k, ["grid", "cdown", "tbtn", "wm", "vib"].includes(k)));
    $(".sw", e).classList.toggle("on"); applyChartPrefs();
  });
  const setC = (u, d) => { LS.set("cUp", u); LS.set("cDn", d); if (G.B.length) { mkMain(); renderAll(true && 0); } chartSettings(); };
  $$("[data-cp]", b).forEach(e => e.onclick = () => { const p = CPRESET[+e.dataset.cp]; setC(p[0], p[1]); });
  $("#cUp", b).onchange = e => setC(e.target.value, CDN());
  $("#cDn", b).onchange = e => setC(CUP(), e.target.value);
  $$("[data-tz]", b).forEach(e => e.onclick = () => { LS.set("tz", e.dataset.tz); location.reload(); });
}

/* ================= запуск ================= */
function boot() {
  applyLang();
  initChart();
  applyTheme();
  setTimeout(applyChartPrefs, 0);
  $("#symBtn").onclick = () => searchSheet("open");
  $("#tfBtn").onclick = tfSheet;
  $("#typeBtn").onclick = typeSheet;
  $("#indBtn").onclick = indSheet;
  $("#drawBtn").onclick = () => DR.mode();
  $("#treeBtn").onclick = () => DR.tree();
  $("#moreBtn").onclick = moreSheet;
  $("#undoBtn").onclick = () => DR.undo(); $("#redoBtn").onclick = () => DR.redo();
  $("#fullBtn").onclick = toggleFull; $("#dFull").onclick = toggleFull;
  $("#alertBtn").onclick = () => alertSheet();
  $("#wAdd").onclick = () => searchSheet("add");
  $("#wListBtn").onclick = e => { e.stopPropagation(); if (wEdit) { wEdit = false; renderWatch(); } else watchMenu(e.currentTarget); };
  $("#wDots").onclick = e => { e.stopPropagation(); watchMenu(e.currentTarget); };
  $("#wHam").onclick = () => go("pgSet");
  $("#wSearch").onclick = () => searchSheet("open");
  $("#aAdd").onclick = () => alertSheet();
  $("#ov").onclick = closeSheet; $("#shX").onclick = closeSheet;
  $$("#nav button").forEach(b => b.onclick = () => go(b.dataset.p));
  // свайп листа вниз — закрыть
  let y0 = null;
  $("#sheet").addEventListener("touchstart", e => { y0 = e.target.closest(".sb") && $("#shB").scrollTop > 0 ? null : e.touches[0].clientY; }, {passive: true});
  $("#sheet").addEventListener("touchend", e => { if (y0 != null && e.changedTouches[0].clientY - y0 > 80) closeSheet(); y0 = null; }, {passive: true});
  // после сна телефона — обновить график
  let hidAt = 0;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) hidAt = Date.now();
    else if (hidAt && Date.now() - hidAt > 60000) { loadChart(); syncTickers(); }
  });
  if (CT.configured()) CT.ready().catch(() => {});
  loadChart(); syncTickers();
  go(LS.get("page", "pgWatch"));
  setTimeout(() => $("#splash").classList.add("off"), 1900);
  setTimeout(() => $("#splash").remove(), 2400);
  if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => {});
}
boot();
