/* Fazo Mobile — FAZO AI: ИИ-аналитик прямо на графике.
   Работает на ключе пользователя (Claude, OpenAI, DeepSeek, OpenRouter или свой OpenAI-совместимый сервер).
   Ключи шифруются PIN-кодом (PBKDF2 + AES-GCM) и хранятся только в телефоне; запросы идут с телефона напрямую к провайдеру.
   ИИ видит свечи текущего и старших таймфреймов, снимок графика и (по желанию) счёт; рисует зоны и уровни;
   сделку только предлагает — ордер открывается в обычном тикете после подтверждения пользователем. */
"use strict";
Object.assign(EN, {
  "Анализ графика": "Chart analysis", "Ликвидность и FVG": "Liquidity & FVG", "Сценарий входа": "Entry setup", "Объём от риска": "Size from risk", "Уровни": "Key levels",
  "Спросите об этом графике…": "Ask about this chart…", "Настройки ИИ": "AI settings", "Провайдер": "Provider", "Модель": "Model", "API-ключ": "API key",
  "Адрес сервера (OpenAI-совместимый)": "Server URL (OpenAI-compatible)", "Загрузить список моделей": "Load model list", "PIN для ключа": "PIN for the key",
  "Сохранить": "Save", "Удалить ключ": "Delete key", "Ключ сохранён": "Key saved", "Ключ удалён": "Key deleted", "PIN — минимум 4 цифры": "PIN — at least 4 digits",
  "Что отправлять ИИ": "What the AI receives", "Снимок графика": "Chart screenshot", "Счёт и позиции": "Account and positions", "Свечей на таймфрейм": "Bars per timeframe",
  "Старших таймфреймов": "Higher timeframes", "Методы анализа": "Analysis methods", "Классика": "Classic TA", "Индикаторы": "Indicators",
  "Риск и сделки": "Risk and trades", "Риск на сделку, %": "Risk per trade, %", "Макс. объём сделки от ИИ, USDT": "Max AI trade size, USDT",
  "Рисовать на графике": "Draw on the chart", "Ответ": "Answer", "Креативность": "Creativity", "авто": "auto", "Длина ответа, токенов": "Answer length, tokens",
  "Свои инструкции для ИИ": "Your own instructions for the AI", "например: торгую только по тренду H4, стоп за структурой": "e.g.: I trade only with the H4 trend, stop beyond structure",
  "Голосовой ввод": "Voice input", "Очистить чат": "Clear chat", "Убрать рисунки ИИ": "Remove AI drawings", "Рисунки ИИ убраны": "AI drawings removed",
  "Подключите ИИ": "Connect an AI", "Выберите провайдера, вставьте свой API-ключ и придумайте PIN. Ключ шифруется и хранится только в этом телефоне.": "Choose a provider, paste your API key and set a PIN. The key is encrypted and stays on this phone only.",
  "Где взять ключ": "Get a key", "Думаю…": "Thinking…", "Собираю данные графика…": "Collecting chart data…", "Остановить": "Stop", "Остановлено": "Stopped",
  "На графике": "On the chart", "объектов": "objects", "Показать": "Show", "Убрать": "Remove", "Открыть ордер": "Open order", "Предложение сделки": "Trade idea",
  "Ордер откроется в тикете — проверьте и подтвердите сами.": "The order opens in the ticket — review and confirm it yourself.",
  "Торговля с графика доступна для Binance Futures и Bybit.": "Trading from the chart is available for Binance Futures and Bybit.",
  "Объём по риску": "Size by risk", "ограничен лимитом": "capped by limit", "Ошибка ИИ": "AI error", "Нет ответа": "No answer",
  "Провайдер не пускает запросы из браузера. Используйте OpenRouter — через него работает эта же модель.": "This provider blocks browser requests. Use OpenRouter — the same model works through it.",
  "Голосовой ввод не поддерживается этим браузером": "Voice input isn't supported in this browser", "Говорите…": "Speak…",
  "Модель не видит картинки — снимок графика не отправлен.": "This model can't see images — the screenshot was not sent.",
  "Каждый запрос оплачивается с баланса вашего ключа у провайдера.": "Each request is billed to your key's balance at the provider.",
  "свой сервер": "custom server", "Модели загружены": "Models loaded", "Не удалось загрузить модели": "Couldn't load models", "ИИ-аналитик": "AI analyst",
  "Вы": "You", "Привет! Я вижу ваш график": "Hi! I can see your chart", "Выберите быстрый вопрос ниже или спросите своё.": "Pick a quick question below or ask your own.",
  "Сначала откройте график": "Open a chart first", "Модель видит картинки": "Model can see images", "Своя модель…": "Custom model…", "FAZO AI — ИИ-аналитик": "FAZO AI — AI analyst"
});

const AI = (() => {
  const PROV = {
    claude: {label: "Claude", url: "https://api.anthropic.com/v1", def: "claude-sonnet-5-5", vision: true, key: "https://console.anthropic.com/settings/keys",
      models: ["claude-opus-5-5", "claude-sonnet-5-5", "claude-haiku-5-5"]},
    openai: {label: "OpenAI", url: "https://api.openai.com/v1", def: "gpt-5-mini", vision: true, key: "https://platform.openai.com/api-keys",
      models: ["gpt-5", "gpt-5-mini", "gpt-4.1", "gpt-4o"]},
    deepseek: {label: "DeepSeek", url: "https://api.deepseek.com", def: "deepseek-chat", vision: false, key: "https://platform.deepseek.com/api_keys",
      models: ["deepseek-chat", "deepseek-reasoner"]},
    openrouter: {label: "OpenRouter", url: "https://openrouter.ai/api/v1", def: "openrouter/auto", vision: true, key: "https://openrouter.ai/settings/keys",
      models: ["openrouter/auto", "anthropic/claude-sonnet-4.5", "openai/gpt-5-mini", "deepseek/deepseek-chat", "google/gemini-2.5-flash"]},
    custom: {label: "Custom", url: "", def: "", vision: true, key: "", models: []}
  };
  const STYLES = [["smc", "SMC"], ["pa", "Price Action"], ["elliott", "Elliott"], ["classic", "Классика"], ["ind", "Индикаторы"]];
  const DEF = {prov: "claude", model: {}, url: "", shot: true, acct: true, draw: true, bars: 150, htf: 2, styles: ["smc", "pa"], risk: 1, maxUsd: 200,
    temp: null, maxTok: 4000, prompt: "", vision: true};
  const cfg = () => Object.assign({}, DEF, LS.get("ai", {}));
  const setCfg = c => LS.set("ai", c);
  const model = c => (c.model && c.model[c.prov]) || PROV[c.prov].def;
  const baseUrl = c => c.prov === "custom" ? String(c.url || "").replace(/\/+$/, "") : PROV[c.prov].url;
  const vision = c => c.prov === "custom" ? c.vision !== false : c.prov === "deepseek" ? false : PROV[c.prov].vision;

  /* ---------- ключи: шифрование PIN-кодом ---------- */
  const mem = {};
  const enc = s => new TextEncoder().encode(s);
  const b64 = b => btoa(String.fromCharCode(...new Uint8Array(b)));
  const unb64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  const kstore = () => LS.get("aik", {});
  async function aesKey(pin, salt) {
    const base = await crypto.subtle.importKey("raw", enc(pin), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({name: "PBKDF2", salt, iterations: 250000, hash: "SHA-256"}, base, {name: "AES-GCM", length: 256}, false, ["encrypt", "decrypt"]);
  }
  async function saveKey(p, key, pin) {
    const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = await crypto.subtle.encrypt({name: "AES-GCM", iv}, await aesKey(pin, salt), enc(key));
    const st = kstore(); st[p] = {salt: b64(salt), iv: b64(iv), ct: b64(ct)}; LS.set("aik", st); mem[p] = key;
  }
  async function openKey(p, pin) {
    const x = kstore()[p]; if (!x) throw new Error("no key");
    mem[p] = new TextDecoder().decode(await crypto.subtle.decrypt({name: "AES-GCM", iv: unb64(x.iv)}, await aesKey(pin, unb64(x.salt)), unb64(x.ct)));
  }
  function askPin(p) {
    return new Promise((res, rej) => {
      let done = false;
      const b = sheet(T("Введите PIN") + " · " + PROV[p].label, `<div class="card"><input id="aPin" type="password" inputmode="numeric" autocomplete="off">
        <div class="btns"><button class="pri" id="aPinOk">${esc(T("Разблокировать"))}</button></div></div>`, () => { if (!done) rej(new Error("cancel")); });
      const ok = async () => {
        try { await openKey(p, $("#aPin", b).value); done = true; closeSheet(); res(mem[p]); }
        catch (x) { toast(T("Неверный PIN")); $("#aPin", b).value = ""; }
      };
      $("#aPinOk", b).onclick = ok; $("#aPin", b).onkeydown = e => { if (e.key === "Enter") ok(); };
      setTimeout(() => $("#aPin", b).focus(), 250);
    });
  }
  async function getKey(c) {
    if (mem[c.prov] != null) return mem[c.prov];
    if (!kstore()[c.prov]) { if (c.prov === "custom") return ""; throw new Error("nokey"); }
    return askPin(c.prov);
  }

  /* ---------- запросы к провайдерам ---------- */
  let ctrl = null;
  async function post(url, headers, body) {
    ctrl = new AbortController();
    const tm = setTimeout(() => ctrl && ctrl.abort(), 180000);
    let r;
    try { r = await fetch(url, {method: "POST", headers: Object.assign({"Content-Type": "application/json"}, headers), body: JSON.stringify(body), signal: ctrl.signal}); }
    catch (e) {
      if (e.name === "AbortError") throw e;
      throw new Error(/deepseek/.test(url) ? T("Провайдер не пускает запросы из браузера. Используйте OpenRouter — через него работает эта же модель.") : (e.message || "network"));
    } finally { clearTimeout(tm); }
    const txt = await r.text(); let j = null; try { j = JSON.parse(txt); } catch (e) {}
    if (!r.ok) throw new Error((j && j.error && (j.error.message || j.error.type || JSON.stringify(j.error))) || `HTTP ${r.status} ${txt.slice(0, 200)}`);
    return j;
  }
  async function complete(c, key, sys, msgs) {
    const m = model(c), u = baseUrl(c);
    if (!m) throw new Error(T("Модель") + "?");
    if (c.prov === "claude") {
      const body = {model: m, max_tokens: +c.maxTok || 4000, system: sys, messages: msgs.map(x => ({role: x.role, content: x.img
        ? [{type: "image", source: {type: "base64", media_type: "image/jpeg", data: x.img.split(",")[1]}}, {type: "text", text: x.text}] : x.text}))};
      if (c.temp != null) body.temperature = +c.temp;
      const j = await post(u + "/messages", {"x-api-key": key, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true"}, body);
      return (j.content || []).filter(x => x.type === "text").map(x => x.text).join("\n");
    }
    const body = {model: m, messages: [{role: "system", content: sys}].concat(msgs.map(x => ({role: x.role, content: x.img
      ? [{type: "text", text: x.text}, {type: "image_url", image_url: {url: x.img}}] : x.text})))};
    if (c.prov === "openai") body.max_completion_tokens = +c.maxTok || 4000; else body.max_tokens = +c.maxTok || 4000;
    if (c.temp != null) body.temperature = +c.temp;
    const h = key ? {Authorization: "Bearer " + key} : {};
    if (c.prov === "openrouter") { h["HTTP-Referer"] = location.origin; h["X-Title"] = "Fazo Mobile"; }
    const j = await post(u + "/chat/completions", h, body);
    const ct = j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content;
    return Array.isArray(ct) ? ct.map(x => x.text || "").join("") : (ct || "");
  }
  async function listModels(c, key) {
    const u = baseUrl(c);
    const h = c.prov === "claude" ? {"x-api-key": key, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true"} : key ? {Authorization: "Bearer " + key} : {};
    const r = await fetch(u + "/models" + (c.prov === "claude" ? "?limit=100" : ""), {headers: h});
    if (!r.ok) throw new Error("HTTP " + r.status);
    const j = await r.json();
    let ids = (j.data || j.models || []).map(x => x.id || x.name).filter(Boolean);
    if (c.prov === "openai") ids = ids.filter(x => /^(gpt|o\d|chatgpt)/.test(x) && !/(audio|realtime|tts|transcribe|image|search|embedding)/.test(x));
    return ids.sort();
  }

  /* ---------- данные графика для ИИ ---------- */
  const LADDER = ["1m", "5m", "15m", "1h", "4h", "1d", "1w"];
  const iso = t => new Date(t * 1000).toISOString().slice(0, 16).replace("T", " ");
  const csv = (B, d) => B.map(b => `${iso(b.time)},${fmt(b.open, d)},${fmt(b.high, d)},${fmt(b.low, d)},${fmt(b.close, d)},${Math.round(b.volume || 0)}`).join("\n");
  async function shot() {
    const c = G.chart.takeScreenshot(), dc = $("#drawCv"), k = Math.min(1, 1280 / c.width);
    const out = document.createElement("canvas"); out.width = Math.round(c.width * k); out.height = Math.round(c.height * k);
    const x = out.getContext("2d"); x.drawImage(c, 0, 0, out.width, out.height); if (dc) x.drawImage(dc, 0, 0, out.width, out.height);
    return out.toDataURL("image/jpeg", 0.82);
  }
  async function context(c) {
    const [ex, sym] = splitKey(S.sym), inf = symInfo(S.sym), d = S.dig[S.sym] || G.dig || 2, n = Math.max(30, Math.min(400, +c.bars || 150));
    const cur = TF_SEC[S.tf] || 3600, B = G.B.slice(-n), last = B.length ? B[B.length - 1].close : null;
    const atr = B.length > 15 ? rmaA(trA(B), 14).filter(v => v != null).pop() : null;
    let s = `INSTRUMENT: ${inf.show} (${sym}, source ${SRC_TAG[ex] || ex}). Price precision: ${d} decimals.\nNOW (UTC): ${iso(Date.now() / 1000)}\n` +
      `CURRENT TIMEFRAME: ${S.tf}. LAST PRICE: ${fmt(last, d)}. ATR(14) ${S.tf}: ${atr ? fmt(atr, d) : "n/a"}\n\n` +
      `### ${S.tf} — last ${B.length} bars (time UTC, open, high, low, close, volume)\n${csv(B, d)}\n`;
    const hi = LADDER.filter(t => TF_SEC[t] > cur).slice(0, Math.max(0, Math.min(3, +c.htf || 0)));
    for (const tf of hi) {
      try {
        const r = await SRC[ex].history(sym, tf, Math.min(n, 200));
        if (r && r.bars && r.bars.length) s += `\n### ${tf} — last ${r.bars.length} bars\n${csv(r.bars, d)}\n`;
      } catch (e) {}
    }
    if (c.acct && typeof TR !== "undefined" && TR.ctx) {
      const a = TR.ctx();
      if (a) {
        s += `\nACCOUNT (${a.ex}, ${a.demo ? "DEMO" : "REAL"}): ` + (a.acc ? `equity ${a.acc.eq.toFixed(2)} USDT, available ${a.acc.avail.toFixed(2)} USDT, unrealized PnL ${a.acc.upnl.toFixed(2)}` : "n/a");
        if (a.pos.length) s += "\nOPEN POSITIONS:\n" + a.pos.map(p => `- ${p.sym} ${p.side} size ${p.size} entry ${p.entry} mark ${p.mark} PnL ${(+p.pnl).toFixed(2)}${p.tp ? " TP " + p.tp : ""}${p.sl ? " SL " + p.sl : ""}`).join("\n");
        if (a.ord.length) s += "\nOPEN ORDERS ON THIS SYMBOL:\n" + a.ord.map(o => `- ${o.side} ${o.type} ${o.qty} @ ${o.price}`).join("\n");
      }
    }
    s += `\nUSER RISK SETTINGS: risk per trade ${c.risk}% of equity; max position notional for AI ideas ${c.maxUsd} USDT.`;
    return s;
  }
  function system(c) {
    const ru = LANG !== "en", st = (c.styles || []).map(k => ({smc: "Smart Money Concepts (structure BOS/CHoCH, liquidity, order blocks, FVG, premium/discount)",
      pa: "Price Action (swings, support/resistance, candle patterns)", elliott: "Elliott Wave analysis", classic: "classic technical analysis (trends, channels, chart patterns)",
      ind: "indicators computed from the data (EMA, RSI, ATR, volume)"}[k])).filter(Boolean);
    return `You are FAZO AI, a professional trading analyst built into the Fazo Mobile charting app. The user sees a candlestick chart; you receive its OHLCV data (UTC times), higher timeframes, optionally a screenshot of the chart with the user's drawings, and optionally their account.
Answer in ${ru ? "Russian" : "English"}. Be concise and concrete for a phone screen: short sections with headers and bullets, real price numbers from the data, no filler.
Preferred methods: ${st.length ? st.join("; ") : "any appropriate"}.
For analysis use this order when relevant: bias/trend per timeframe → structure → key levels and liquidity → zones (OB/FVG) → scenarios (entry, stop, targets, R:R) → what invalidates it. If asked for position size, compute it from the user's risk settings and account equity and show the math.
Never promise profit; mention risk briefly once. Do not invent data you don't have.
At the very end of EVERY answer output one machine-readable block exactly in this form (it is hidden from the user and drawn on the chart):
\`\`\`fazo
{"draw":[...],"order":null}
\`\`\`
"draw" — up to 8 objects (only if useful, else []):
 {"type":"level","price":N,"label":"text","color":"#hex"}  — horizontal level
 {"type":"zone","from":N,"to":N,"from_time":"YYYY-MM-DD HH:MM","label":"OB/FVG/…","color":"#hex"} — price zone starting at from_time (UTC, a real bar time from the data)
 {"type":"trend","p1":N,"t1":"YYYY-MM-DD HH:MM","p2":N,"t2":"YYYY-MM-DD HH:MM","label":"text"} — trend line between two real bars
 {"type":"long"|"short","entry":N,"tp":N,"sl":N} — position box for the proposed setup
 {"type":"label","price":N,"time":"YYYY-MM-DD HH:MM","label":"text"} — text mark
"order" — only when the user asks for an entry/trade or a size: {"side":"buy"|"sell","type":"limit"|"market","price":N|null,"sl":N,"tp":N,"qty":N|null}. Otherwise null.
Use colors: bullish #089981, bearish #f23645, neutral #f5c542, FVG #9c27b0, liquidity #2962ff.${c.prompt ? "\n\nUSER'S OWN INSTRUCTIONS (follow them):\n" + c.prompt : ""}`;
  }
  function parse(txt) {
    let act = null;
    const m = txt.match(/```fazo\s*([\s\S]*?)```/i) || txt.match(/```json\s*(\{[\s\S]*?"draw"[\s\S]*?\})\s*```/i);
    if (m) { try { act = JSON.parse(m[1].trim()); } catch (e) { const k = m[1].indexOf("{"), l = m[1].lastIndexOf("}"); try { act = JSON.parse(m[1].slice(k, l + 1)); } catch (x) {} } txt = txt.replace(m[0], "").trim(); }
    return {text: txt, act};
  }

  /* ---------- окно чата ---------- */
  const QUICK = [["Анализ графика", "Сделай полный анализ графика: тренд и структура на всех таймфреймах, ключевые уровни, ликвидность, зоны и сценарии. Отметь главное на графике."],
    ["Ликвидность и FVG", "Найди зоны ликвидности, FVG и ордер-блоки, которые ещё не отработаны, и отметь их на графике."],
    ["Сценарий входа", "Предложи лучший сценарий входа сейчас: направление, вход, стоп, тейки и R:R. Подготовь ордер."],
    ["Объём от риска", "Рассчитай объём сделки для текущего лучшего сценария от моего риска и баланса. Покажи расчёт и подготовь ордер."],
    ["Уровни", "Отметь ключевые уровни поддержки и сопротивления на графике и коротко объясни каждый."]];
  const EN_Q = {"Анализ графика": "Do a full chart analysis: trend and structure on all timeframes, key levels, liquidity, zones and scenarios. Mark the key things on the chart.",
    "Ликвидность и FVG": "Find unmitigated liquidity pools, FVGs and order blocks and mark them on the chart.",
    "Сценарий входа": "Suggest the best entry setup right now: direction, entry, stop, targets and R:R. Prepare the order.",
    "Объём от риска": "Calculate the position size for the best current setup from my risk and balance. Show the math and prepare the order.",
    "Уровни": "Mark the key support and resistance levels on the chart and briefly explain each."};
  let chat = LS.get("aichat", []), busy = false, P = null, rec = null;
  const saveChat = () => LS.set("aichat", chat.slice(-40).map(m => ({role: m.role, text: m.text, act: m.act, sym: m.sym, tf: m.tf})));
  const SPARK = '<svg viewBox="0 0 24 24"><path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>';
  function md(s) {
    s = esc(s);
    s = s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/`([^`]+)`/g, "<code>$1</code>");
    return s.split("\n").map(l => {
      const h = l.match(/^#{1,4}\s+(.*)/); if (h) return `<div class="h">${h[1]}</div>`;
      const b = l.match(/^\s*[-*•]\s+(.*)/); if (b) return `<div class="li">${b[1]}</div>`;
      const n = l.match(/^\s*(\d+)[.)]\s+(.*)/); if (n) return `<div class="li n"><i>${n[1]}.</i>${n[2]}</div>`;
      return l.trim() ? `<div>${l}</div>` : `<div class="gap"></div>`;
    }).join("");
  }
  function build() {
    if (P) return P;
    P = document.createElement("div"); P.id = "aiP";
    P.innerHTML = `<div class="aih"><button id="aiBack"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>
      <div class="ait"><b>${SPARK}FAZO AI</b><small id="aiSub"></small></div>
      <button id="aiClr" title="clear"><svg viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg></button>
      <button id="aiSet"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/></svg></button></div>
      <div id="aiM"></div>
      <div id="aiQ"></div>
      <div class="aii"><button id="aiMic"><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></svg></button>
        <textarea id="aiIn" rows="1"></textarea>
        <button id="aiSend" class="pri"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div>`;
    document.body.appendChild(P);
    $("#aiBack", P).onclick = close;
    $("#aiSet", P).onclick = settings;
    $("#aiClr", P).onclick = () => popMenu($("#aiClr", P), [["Очистить чат", "", () => { chat = []; saveChat(); paint(); }],
      ["Убрать рисунки ИИ", "", () => { DR.clearAI(); toast(T("Рисунки ИИ убраны")); }]]);
    const inp = $("#aiIn", P);
    inp.oninput = () => { inp.style.height = "auto"; inp.style.height = Math.min(120, inp.scrollHeight) + "px"; };
    inp.onkeydown = e => { if (e.key === "Enter" && !e.shiftKey && !/Android|iPhone|iPad/i.test(navigator.userAgent)) { e.preventDefault(); send(inp.value); } };
    $("#aiSend", P).onclick = () => busy ? stop() : send(inp.value);
    $("#aiMic", P).onclick = voice;
    $("#aiM", P).onclick = e => {
      const b = e.target.closest("[data-a]"); if (!b) return;
      const m = chat[+b.dataset.i]; if (!m || !m.act) return;
      if (b.dataset.a === "show") { if (m.sym !== S.sym || m.tf !== S.tf) toast(m.sym ? symInfo(m.sym).show + " · " + tfLabel(m.tf) : ""); applyDraw(m); close(); }
      if (b.dataset.a === "rm") { DR.clearAI(); toast(T("Рисунки ИИ убраны")); }
      if (b.dataset.a === "ord") order(m.act.order);
    };
    return P;
  }
  function sub() {
    const c = cfg(); $("#aiSub", P).textContent = `${c.prov === "custom" ? T("свой сервер") : PROV[c.prov].label} · ${model(c) || "—"} · ${symInfo(S.sym).show} ${tfLabel(S.tf)}`;
    $("#aiQ", P).innerHTML = QUICK.map(([k]) => `<button data-q="${esc(k)}">${esc(T(k))}</button>`).join("");
    $$("#aiQ button", P).forEach(b => b.onclick = () => send(LANG === "en" ? EN_Q[b.dataset.q] : QUICK.find(q => q[0] === b.dataset.q)[1]));
    $("#aiIn", P).placeholder = T("Спросите об этом графике…");
  }
  function paint() {
    const M = $("#aiM", P);
    if (!chat.length) {
      M.innerHTML = `<div class="aiw">${SPARK}<b>${esc(T("Привет! Я вижу ваш график"))} ${esc(symInfo(S.sym).show)} · ${esc(tfLabel(S.tf))}</b><p>${esc(T("Выберите быстрый вопрос ниже или спросите своё."))}</p>
        <p class="mu">${esc(T("Каждый запрос оплачивается с баланса вашего ключа у провайдера."))}</p></div>`;
    } else M.innerHTML = chat.map((m, i) => m.role === "user"
      ? `<div class="am u"><div>${esc(m.show || m.text)}</div></div>`
      : `<div class="am a${m.err ? " err" : ""}"><div>${md(m.text)}${acts(m, i)}</div></div>`).join("");
    if (busy) M.insertAdjacentHTML("beforeend", `<div class="am a"><div class="dots"><span id="aiStage">${esc(T(busy === 1 ? "Собираю данные графика…" : "Думаю…"))}</span><i></i><i></i><i></i></div></div>`);
    $("#aiSend", P).innerHTML = busy ? '<svg viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="2"/></svg>' : '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    $("#aiSend", P).classList.toggle("stop", !!busy);
    requestAnimationFrame(() => { M.scrollTop = M.scrollHeight; });
  }
  function acts(m, i) {
    if (!m.act) return "";
    let h = "";
    const nd = (m.act.draw || []).length;
    if (nd) h += `<div class="aa"><span>✓ ${esc(T("На графике"))}: ${nd} ${esc(T("объектов"))}</span><button data-a="show" data-i="${i}">${esc(T("Показать"))}</button><button data-a="rm" data-i="${i}">${esc(T("Убрать"))}</button></div>`;
    const o = m.act.order;
    if (o && o.side) {
      const d = S.dig[m.sym] || G.dig || 2, q = sizeOf(o);
      h += `<div class="ao ${o.side === "buy" ? "b" : "s"}"><div class="t">${esc(T("Предложение сделки"))}</div>
        <div class="r"><b>${o.side === "buy" ? "BUY" : "SELL"} ${esc(m.sym ? symInfo(m.sym).show : "")}</b> · ${o.type === "limit" && o.price ? "LIMIT " + fmt(o.price, d) : "MARKET"}</div>
        <div class="r">SL <b>${o.sl ? fmt(o.sl, d) : "—"}</b> · TP <b>${o.tp ? fmt(o.tp, d) : "—"}</b>${q.qty ? ` · ${esc(T("Объём по риску"))} <b>${q.qty}</b>${q.cap ? ` (${esc(T("ограничен лимитом"))})` : ""}` : ""}</div>
        ${TR.canTrade() ? `<button data-a="ord" data-i="${i}">${esc(T("Открыть ордер"))}</button><small>${esc(T("Ордер откроется в тикете — проверьте и подтвердите сами."))}</small>`
          : `<small>${esc(T("Торговля с графика доступна для Binance Futures и Bybit."))}</small>`}</div>`;
    }
    return h;
  }
  function sizeOf(o) {
    const c = cfg(), a = TR.ctx ? TR.ctx() : null, px = o.price || (G.B.length ? G.B[G.B.length - 1].close : 0);
    let qty = o.qty ? +o.qty : null, cap = false;
    if (a && a.acc && o.sl && px && Math.abs(px - o.sl) > 0) qty = a.acc.eq * (+c.risk || 1) / 100 / Math.abs(px - o.sl);
    if (qty && px && +c.maxUsd > 0 && qty * px > +c.maxUsd) { qty = +c.maxUsd / px; cap = true; }
    return {qty: qty ? +qty.toPrecision(4) : null, cap};
  }
  function order(o) {
    if (!o) return;
    const q = sizeOf(o);
    close();
    TR.ticket(o.side === "sell" ? "sell" : "buy", {price: o.type === "limit" ? o.price : null, qty: q.qty, tp: o.tp, sl: o.sl});
  }
  function applyDraw(m) {
    if (!m.act || !m.act.draw || !m.act.draw.length || !cfg().draw) return 0;
    if (m.sym && m.sym !== S.sym) return 0;
    return DR.addAI(m.act.draw);
  }
  function stop() { if (ctrl) ctrl.abort(); }
  async function send(text) {
    text = String(text || "").trim(); if (!text || busy) return;
    if (!G.B.length) return toast(T("Сначала откройте график"));
    const c = cfg();
    let key;
    try { key = await getKey(c); } catch (e) { if (e.message === "nokey") settings(); return; }
    $("#aiIn", P).value = ""; $("#aiIn", P).style.height = "auto";
    const sym = S.sym, tf = S.tf;
    chat.push({role: "user", text, sym, tf}); busy = 1; paint();
    let note = "";
    try {
      const ctxText = await context(c);
      let img = null;
      if (c.shot) { if (vision(c)) { try { img = await shot(); } catch (e) {} } else note = T("Модель не видит картинки — снимок графика не отправлен."); }
      busy = 2; paint();
      const hist = chat.slice(-9, -1).filter(m => !m.err).map(m => ({role: m.role, text: m.role === "assistant" ? m.text : m.text}));
      const msgs = hist.concat([{role: "user", text: `${ctxText}\n\nUSER QUESTION:\n${text}`, img}]);
      const raw = await complete(c, key, system(c), msgs);
      if (!raw.trim()) throw new Error(T("Нет ответа"));
      const r = parse(raw), m = {role: "assistant", text: (note ? "ℹ " + note + "\n\n" : "") + r.text, act: r.act, sym, tf};
      chat.push(m);
      if (r.act && r.act.draw && r.act.draw.length && c.draw && S.sym === sym) DR.addAI(r.act.draw);
    } catch (e) {
      chat.push({role: "assistant", err: true, text: e.name === "AbortError" ? T("Остановлено") : "⚠ " + T("Ошибка ИИ") + ": " + (e.message || e)});
    }
    busy = false; ctrl = null; saveChat(); paint();
  }
  function voice() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return toast(T("Голосовой ввод не поддерживается этим браузером"), 3000);
    if (rec) { rec.stop(); return; }
    rec = new SR(); rec.lang = LANG === "en" ? "en-US" : "ru-RU"; rec.interimResults = true; rec.continuous = false;
    const inp = $("#aiIn", P), base = inp.value ? inp.value + " " : "";
    $("#aiMic", P).classList.add("on"); toast(T("Говорите…"));
    rec.onresult = e => { inp.value = base + [...e.results].map(r => r[0].transcript).join(""); inp.oninput(); };
    rec.onend = rec.onerror = () => { $("#aiMic", P).classList.remove("on"); rec = null; };
    rec.start();
  }

  /* ---------- настройки ---------- */
  function settings() {
    const c = cfg(), ks = kstore();
    let prov = c.prov;
    const tile = p => `<button data-p="${p}" class="${p === prov ? "on" : ""}">${p === "custom" ? esc(T("свой сервер")) : PROV[p].label}${ks[p] ? " ✓" : ""}</button>`;
    const b = sheet(T("Настройки ИИ"), `
      ${Object.keys(ks).length ? "" : `<div class="card" style="border-color:#2962ff"><b>${esc(T("Подключите ИИ"))}</b><div class="note">${esc(T("Выберите провайдера, вставьте свой API-ключ и придумайте PIN. Ключ шифруется и хранится только в этом телефоне."))}</div></div>`}
      <div class="sec">${esc(T("Провайдер"))}</div>
      <div class="card"><div class="aipv" id="apProv">${Object.keys(PROV).map(tile).join("")}</div>
        <div id="apUrlW" style="margin-top:12px"><label>${esc(T("Адрес сервера (OpenAI-совместимый)"))}</label><input id="apUrl" placeholder="https://…/v1" value="${esc(c.url || "")}" autocomplete="off" spellcheck="false"></div>
        <label>${esc(T("Модель"))}</label><div class="aimw"><input id="apModel" autocomplete="off" spellcheck="false" readonly><button id="apMBtn" type="button"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button></div>
        <div id="apList" class="aiml"></div>
        <div class="btns" style="margin-top:8px"><button id="apLoad">${esc(T("Загрузить список моделей"))}</button></div>
        <label>${esc(T("API-ключ"))} <a id="apGet" target="_blank" rel="noopener" style="float:right;color:#5b8cff">${esc(T("Где взять ключ"))}</a></label>
        <input id="apKey" type="password" autocomplete="off" spellcheck="false">
        <label>${esc(T("PIN для ключа"))}</label><input id="apPin" type="password" inputmode="numeric" autocomplete="off">
        <div class="btns"><button class="pri" id="apSave">${esc(T("Сохранить"))}</button><button id="apDel" style="color:var(--dn)">${esc(T("Удалить ключ"))}</button></div>
        <div class="note">${esc(T("Каждый запрос оплачивается с баланса вашего ключа у провайдера."))}</div></div>
      <div class="sec">${esc(T("Что отправлять ИИ"))}</div>
      <div class="card">
        ${tg("shot", "Снимок графика", c.shot)}${tg("acct", "Счёт и позиции", c.acct)}${tg("draw", "Рисовать на графике", c.draw)}
        <div id="apVisW">${tg("vision", "Модель видит картинки", c.vision !== false)}</div>
        <label>${esc(T("Свечей на таймфрейм"))}</label><div class="seg" id="apBars">${[100, 150, 250, 400].map(v => `<button data-v="${v}" class="${+c.bars === v ? "on" : ""}">${v}</button>`).join("")}</div>
        <label>${esc(T("Старших таймфреймов"))}</label><div class="seg" id="apHtf">${[0, 1, 2, 3].map(v => `<button data-v="${v}" class="${+c.htf === v ? "on" : ""}">${v}</button>`).join("")}</div>
        <label>${esc(T("Методы анализа"))}</label><div class="aipv" id="apSty">${STYLES.map(([k, n]) => `<button data-v="${k}" class="${(c.styles || []).includes(k) ? "on" : ""}">${esc(T(n))}</button>`).join("")}</div></div>
      <div class="sec">${esc(T("Риск и сделки"))}</div>
      <div class="card"><div style="display:flex;gap:8px"><div style="flex:1"><label>${esc(T("Риск на сделку, %"))}</label><input id="apRisk" type="number" inputmode="decimal" step="any" value="${c.risk}"></div>
        <div style="flex:1"><label>${esc(T("Макс. объём сделки от ИИ, USDT"))}</label><input id="apMax" type="number" inputmode="decimal" step="any" value="${c.maxUsd}"></div></div>
        <div class="note">${esc(T("Ордер откроется в тикете — проверьте и подтвердите сами."))}</div></div>
      <div class="sec">${esc(T("Ответ"))}</div>
      <div class="card"><div style="display:flex;gap:8px"><div style="flex:1"><label>${esc(T("Креативность"))}</label><input id="apTemp" type="number" inputmode="decimal" step="0.1" min="0" max="1.5" placeholder="${esc(T("авто"))}" value="${c.temp == null ? "" : c.temp}"></div>
        <div style="flex:1"><label>${esc(T("Длина ответа, токенов"))}</label><input id="apTok" type="number" inputmode="numeric" value="${c.maxTok}"></div></div>
        <label>${esc(T("Свои инструкции для ИИ"))}</label><textarea id="apPr" rows="4" placeholder="${esc(T("например: торгую только по тренду H4, стоп за структурой"))}">${esc(c.prompt || "")}</textarea></div>
      <div class="btns" style="margin:4px 12px 18px"><button class="pri" id="apDone">${esc(T("Готово"))}</button></div>`, () => { if (P && P.classList.contains("on")) sub(); });
    function tg(k, label, on) { return `<div class="aitg" data-k="${k}"><span>${esc(T(label))}</span><button class="sw${on ? " on" : ""}"><i></i></button></div>`; }
    const flags = {shot: c.shot, acct: c.acct, draw: c.draw, vision: c.vision !== false};
    $$(".aitg", b).forEach(r => r.onclick = () => { flags[r.dataset.k] = !flags[r.dataset.k]; $("button", r).classList.toggle("on", flags[r.dataset.k]); });
    const segv = id => { const x = $(id + " .on", b); return x ? +x.dataset.v : null; };
    $$("#apBars button, #apHtf button", b).forEach(x => x.onclick = () => { $$("button", x.parentNode).forEach(y => y.classList.toggle("on", y === x)); });
    $$("#apSty button", b).forEach(x => x.onclick = () => x.classList.toggle("on"));
    const models = {};
    const prv = () => {
      $$("#apProv button", b).forEach(x => x.classList.toggle("on", x.dataset.p === prov));
      $("#apUrlW", b).style.display = prov === "custom" ? "" : "none";
      $("#apVisW", b).style.display = prov === "custom" ? "" : "none";
      const cc = Object.assign({}, c, {prov}); $("#apModel", b).value = model(cc);
      mlist(false);
      const g = $("#apGet", b); g.style.display = PROV[prov].key ? "" : "none"; g.href = PROV[prov].key || "#";
      $("#apKey", b).value = ""; $("#apKey", b).placeholder = ks[prov] ? "••••••••  (" + T("Ключ сохранён") + ")" : prov === "custom" ? "(optional)" : "sk-…";
      $("#apDel", b).style.display = ks[prov] ? "" : "none";
    };
    /* выбор модели: список под полем (datalist на Android показывает только совпадения) */
    function mlist(show) {
      const L = $("#apList", b), cur = $("#apModel", b).value, all = models[prov] || PROV[prov].models;
      const items = all.slice(); if (cur && !items.includes(cur)) items.unshift(cur);
      L.innerHTML = items.map(m => `<button type="button" data-m="${esc(m)}" class="${m === cur ? "on" : ""}">${esc(m)}${m === cur ? " ✓" : ""}</button>`).join("") +
        `<button type="button" data-own="1" class="own">✎ ${esc(T("Своя модель…"))}</button>`;
      L.classList.toggle("on", !!show);
      $$("button[data-m]", L).forEach(x => x.onclick = () => { $("#apModel", b).value = x.dataset.m; stash(); mlist(false); });
      $("button[data-own]", L).onclick = () => { const inp = $("#apModel", b); inp.readOnly = false; inp.value = ""; L.classList.remove("on"); inp.focus(); };
    }
    $("#apMBtn", b).onclick = () => mlist(!$("#apList", b).classList.contains("on"));
    $("#apModel", b).onclick = () => { if ($("#apModel", b).readOnly) mlist(!$("#apList", b).classList.contains("on")); };
    $("#apModel", b).onblur = () => { const inp = $("#apModel", b); if (!inp.readOnly) { inp.readOnly = true; if (!inp.value.trim()) inp.value = model(Object.assign({}, c, {prov})); stash(); } };
    $$("#apProv button", b).forEach(x => x.onclick = () => { stash(); prov = x.dataset.p; prv(); });
    const stash = () => { const m = $("#apModel", b).value.trim(); c.model = Object.assign({}, c.model); if (m) c.model[prov] = m; };
    prv();
    $("#apLoad", b).onclick = async () => {
      const cc = Object.assign({}, c, {prov, url: $("#apUrl", b).value.trim()});
      try {
        const k = $("#apKey", b).value.trim() || (prov === "openrouter" ? "" : await getKey(cc));
        models[prov] = await listModels(cc, k); mlist(true);
        toast(T("Модели загружены") + ": " + models[prov].length);
      } catch (e) { if (e.message !== "cancel") toast(T("Не удалось загрузить модели") + " · " + (e.message || e), 4000); }
    };
    $("#apSave", b).onclick = async () => {
      const k = $("#apKey", b).value.trim(), pin = $("#apPin", b).value;
      if (k) {
        if (!/^\d{4,}$/.test(pin)) return toast(T("PIN — минимум 4 цифры"));
        await saveKey(prov, k, pin); ks[prov] = 1; $("#apPin", b).value = ""; toast(T("Ключ сохранён"));
      }
      collect(); prv(); $$("#apProv button", b).forEach(x => { x.innerHTML = (x.dataset.p === "custom" ? esc(T("свой сервер")) : PROV[x.dataset.p].label) + (kstore()[x.dataset.p] ? " ✓" : ""); });
    };
    $("#apDel", b).onclick = () => { const st = kstore(); delete st[prov]; LS.set("aik", st); delete mem[prov]; delete ks[prov]; toast(T("Ключ удалён")); prv(); };
    function collect() {
      stash();
      const t = $("#apTemp", b).value.trim();
      Object.assign(c, {prov, url: $("#apUrl", b).value.trim(), shot: flags.shot, acct: flags.acct, draw: flags.draw, vision: flags.vision,
        bars: segv("#apBars") || c.bars, htf: segv("#apHtf") ?? c.htf, styles: $$("#apSty .on", b).map(x => x.dataset.v),
        risk: Math.max(0.01, parseFloat($("#apRisk", b).value) || 1), maxUsd: Math.max(0, parseFloat($("#apMax", b).value) || 0),
        temp: t === "" ? null : Math.max(0, Math.min(2, parseFloat(t) || 0)), maxTok: Math.max(256, Math.min(32000, parseInt($("#apTok", b).value) || 4000)),
        prompt: $("#apPr", b).value.slice(0, 3000)});
      setCfg(c);
    }
    $("#apDone", b).onclick = () => { collect(); closeSheet(); };
  }

  function open() {
    build(); sub(); paint(); P.classList.add("on");
    if (!Object.keys(kstore()).length && cfg().prov !== "custom") setTimeout(settings, 250);
  }
  function close() { if (P) P.classList.remove("on"); if (rec) rec.stop(); }
  return {open, close, settings};
})();
$("#aiBtn").onclick = () => AI.open();
