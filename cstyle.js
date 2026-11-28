/* Fazo Mobile — стиль свечей как в TradingView:
   • касание свечи выделяет серию (точки на свечах + рамка у названия и кнопка «⋯»);
   • двойное касание свечи — окно «Инструмент»: тело / границы / фитиль, цвет по предыдущему закрытию,
     ручной цвет выбранной свечи, точность и часовой пояс;
   • палитра цветов как в TradingView (сетка цветов, свои цвета «+», прозрачность). */
"use strict";
Object.assign(EN, {
  "Инструмент": "Symbol", "Японские свечи": "Candles", "Бары": "Bars", "Цвет баров основан на цене предыдущего закрытия": "Color bars based on previous close",
  "Тело": "Body", "Границы": "Borders", "Фитиль": "Wick", "Настройка данных": "Data modification", "Точность": "Precision", "По умолчанию": "Default",
  "Часовой пояс": "Timezone", "Отмена": "Cancel", "Ок": "Ok", "Выбранная свеча": "Selected bar", "Сбросить цвет свечи": "Reset bar color",
  "Сбросить настройки": "Reset settings", "Сбросить цвета всех свечей": "Reset colors of all bars", "Прозрачность": "Opacity",
  "Настройки…": "Settings…", "Копировать цену": "Copy price", "Цена скопирована": "Price copied", "Добавить оповещение": "Add alert",
  "Цвет": "Color", "Для линейного графика настройки свечей недоступны.": "Candle settings are not available for the line chart."
});

/* ================= палитра цветов TradingView ================= */
const TVC = (() => {
  const GREY = ["#ffffff", "#d1d4dc", "#b2b5be", "#9598a1", "#787b86", "#5d606b", "#434651", "#2a2e39", "#131722", "#000000"];
  const MAIN = ["#f23645", "#ff9800", "#ffeb3b", "#4caf50", "#089981", "#00bcd4", "#2962ff", "#673ab7", "#9c27b0", "#e91e63"];
  const SH = [                                                 // оттенки по столбцам (сверху светлые → снизу тёмные)
    ["#fccbcd", "#faa1a4", "#f77c80", "#f7525f", "#b22833", "#801922"],
    ["#ffe0b2", "#ffcc80", "#ffb74d", "#ffa726", "#ef6c00", "#e65100"],
    ["#fff9c4", "#fff59d", "#fff176", "#ffee58", "#fbc02d", "#f57f17"],
    ["#c8e6c9", "#a5d6a7", "#81c784", "#66bb6a", "#388e3c", "#1b5e20"],
    ["#ace5dc", "#70ccbd", "#42bda8", "#22ab94", "#056656", "#00332a"],
    ["#b2ebf2", "#80deea", "#4dd0e1", "#26c6da", "#0097a7", "#006064"],
    ["#bbd9fb", "#90bff9", "#5b9cf6", "#3179f5", "#1848cc", "#0c3299"],
    ["#d1c4e9", "#b39ddb", "#9575cd", "#7e57c2", "#512da8", "#311b92"],
    ["#e1bee7", "#ce93d8", "#ba68c8", "#ab47bc", "#7b1fa2", "#4a148c"],
    ["#f8bbd0", "#f48fb1", "#f06292", "#ec407a", "#c2185b", "#880e4f"]
  ];
  const ov = document.createElement("div"); ov.id = "tvcOv"; document.body.appendChild(ov);
  const el = document.createElement("div"); el.id = "tvc"; document.body.appendChild(el);
  let cur = null, cb = null;

  const h2 = n => n.toString(16).padStart(2, "0");
  function parse(c) {                                         // → {hex:"#rrggbb", a:0…1}
    c = String(c || "").trim();
    let m = c.match(/^#([0-9a-f]{3})$/i);
    if (m) return {hex: "#" + m[1].split("").map(x => x + x).join("").toLowerCase(), a: 1};
    m = c.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i);
    if (m) return {hex: "#" + m[1].toLowerCase(), a: m[2] ? parseInt(m[2], 16) / 255 : 1};
    m = c.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)(?:[\s,/]+([\d.]+))?\s*\)$/i);
    if (m) return {hex: "#" + h2(+m[1]) + h2(+m[2]) + h2(+m[3]), a: m[4] == null ? 1 : +m[4]};
    return {hex: "#2962ff", a: 1};
  }
  function make(hex, a) {
    a = Math.round(Math.max(0, Math.min(1, a)) * 100) / 100;
    if (a >= 1) return hex;
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`;
  }
  const custom = () => LS.get("tvcCustom", []);
  function paint() {
    const sw = c => `<b data-c="${c}" style="background:${c}" class="${c === cur.hex ? "on" : ""}"></b>`;
    let rows = "";
    for (let r = 0; r < 6; r++) rows += SH.map(col => sw(col[r])).join("");
    el.innerHTML = `<div class="g r1">${GREY.map(sw).join("")}</div><div class="g">${MAIN.map(sw).join("")}</div>
      <div class="g" style="margin-top:10px">${rows}</div><hr>
      <div class="cu">${custom().map(c => `<b data-c="${c}" style="background:${c}" class="${c === cur.hex ? "on" : ""}"></b>`).join("")}<button class="add" id="tvcAdd">+</button></div>
      <div class="op">${esc(T("Прозрачность"))}<div><input type="range" id="tvcA" min="0" max="100" value="${Math.round(cur.a * 100)}"><span id="tvcP">${Math.round(cur.a * 100)}%</span></div></div>`;
    el.style.setProperty("--tvcc", cur.hex);
    $$("[data-c]", el).forEach(b => b.onclick = e => { e.stopPropagation(); cur.hex = b.dataset.c; emit(); paint(); });
    $("#tvcA", el).oninput = e => { cur.a = +e.target.value / 100; $("#tvcP", el).textContent = e.target.value + "%"; emit(); };
    $("#tvcAdd", el).onclick = e => {
      e.stopPropagation();
      const inp = document.createElement("input"); inp.type = "color"; inp.value = cur.hex;
      inp.style.cssText = "position:fixed;left:-50px;top:0;opacity:0";
      document.body.appendChild(inp);
      inp.onchange = () => {
        const c = inp.value.toLowerCase(), l = custom().filter(x => x !== c); l.push(c); LS.set("tvcCustom", l.slice(-9));
        cur.hex = c; emit(); paint(); inp.remove();
      };
      inp.click(); setTimeout(() => { if (document.body.contains(inp) && !inp.value) inp.remove(); }, 60000);
    };
  }
  const emit = () => cb && cb(make(cur.hex, cur.a));
  function pick(anchor, color, onPick) {
    cur = parse(color); cb = onPick;
    paint();
    el.classList.add("on"); ov.classList.add("on");
    const r = anchor.getBoundingClientRect(), w = el.offsetWidth, h = el.offsetHeight;
    let x = r.left, y = r.bottom + 6;
    if (x + w > innerWidth - 8) x = innerWidth - 8 - w;
    if (y + h > innerHeight - 8) y = Math.max(8, r.top - h - 6);
    el.style.left = Math.max(8, x) + "px"; el.style.top = y + "px";
  }
  function close() { el.classList.remove("on"); ov.classList.remove("on"); cb = null; }
  ov.addEventListener("pointerdown", e => e.preventDefault());            // закрываем по click, чтобы касание не «провалилось» в окно под палитрой
  ov.addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); close(); });
  return {pick, close, parse, make};
})();

/* ================= выделение серии и окно «Инструмент» ================= */
const CS = (() => {
  const wrap = $("#chartWrap"), cv = document.createElement("canvas");
  cv.id = "cselCv"; cv.style.cssText = "position:absolute;left:0;top:0;z-index:2;pointer-events:none";
  wrap.insertBefore(cv, $("#legend"));
  const ctx = cv.getContext("2d");
  let sel = false, bar = -1, selKey = "", last = null, W = 0, H = 0;
  const CANDLE = () => S.type === "candles" || S.type === "ha" || S.type === "bars";
  const vib = () => { try { if (LS.get("vib", true) && navigator.vibrate) navigator.vibrate(15); } catch (e) {} };
  const pt = i => S.type === "ha" ? G.HA[i] : G.B[i];

  function size() {
    const w = wrap.clientWidth, h = wrap.clientHeight, d = devicePixelRatio || 1;
    if (w !== W || h !== H) { W = w; H = h; cv.width = w * d; cv.height = h * d; cv.style.width = w + "px"; cv.style.height = h + "px"; }
    ctx.setTransform(d, 0, 0, d, 0, 0);
  }
  /* точки на свечах выделенной серии */
  function frame() {
    requestAnimationFrame(frame);
    if (sel && selKey !== S.sym + "|" + S.tf + "|" + S.type) deselect();
    if (!sel) { if (W) { ctx.clearRect(0, 0, W, H); W = 0; cv.width = 0; } return; }
    if (!G.main || !G.B.length) return;
    size(); ctx.clearRect(0, 0, W, H);
    const ts = G.chart.timeScale(), r = ts.getVisibleLogicalRange(); if (!r) return;
    const pw = $("#chart").clientWidth - G.chart.priceScale("right").width(), ph = $("#chart").clientHeight - ts.height();
    const sp = ts.options().barSpacing || 6, step = Math.max(1, Math.ceil(9 / sp));
    const from = Math.max(0, Math.floor(r.from)), to = Math.min(G.B.length - 1, Math.ceil(r.to));
    const dot = (x, y, rad, ring) => {
      ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fillStyle = isLight() ? "#fff" : "#131722"; ctx.fill();
      ctx.lineWidth = ring ? 2.2 : 1.6; ctx.strokeStyle = "#2962ff"; ctx.stroke();
    };
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, pw, ph); ctx.clip();
    for (let i = from - (from % step); i <= to; i += step) {
      if (i < from) continue;
      const b = pt(i); if (!b) continue;
      const x = ts.logicalToCoordinate(i), y = G.main.priceToCoordinate(CANDLE() ? (b.open + b.close) / 2 : b.close);
      if (x == null || y == null) continue;
      dot(x, y, 3.4);
    }
    if (bar >= from && bar <= to) {                            // свеча, по которой коснулись
      const b = pt(bar), x = ts.logicalToCoordinate(bar), y = b && G.main.priceToCoordinate(CANDLE() ? (b.open + b.close) / 2 : b.close);
      if (x != null && y != null) dot(x, y, 5.2, 1);
    }
    ctx.restore();
  }
  /* попадание касания в свечу */
  function hitBar(p) {
    if (!G.main || !G.B.length) return null;
    const ts = G.chart.timeScale(), l = ts.coordinateToLogical(p.x); if (l == null) return null;
    const i = Math.round(l); if (i < 0 || i >= G.B.length) return null;
    const x = ts.logicalToCoordinate(i), sp = ts.options().barSpacing || 6;
    if (x == null || Math.abs(p.x - x) > Math.max(sp / 2, 9)) return null;
    const b = pt(i); if (!b) return null;
    if (CANDLE()) {
      const yh = G.main.priceToCoordinate(b.high), yl = G.main.priceToCoordinate(b.low);
      if (yh == null || yl == null) return null;
      return p.y >= Math.min(yh, yl) - 10 && p.y <= Math.max(yh, yl) + 10 ? i : null;
    }
    const y = G.main.priceToCoordinate(b.close);
    return y != null && Math.abs(p.y - y) <= 16 ? i : null;
  }
  function select(i) { sel = true; bar = i; selKey = S.sym + "|" + S.tf + "|" + S.type; legend(null); }
  function deselect() { if (!sel) return; sel = false; bar = -1; last = null; legend(null); }

  G.chart.subscribeClick(p => {
    if (!p || !p.point || (typeof DR !== "undefined" && DR.busy && DR.busy())) { return; }
    const i = hitBar(p.point), now = Date.now();
    if (i == null) { last = null; deselect(); return; }
    const dbl = last && now - last.t < 400 && Math.abs(p.point.x - last.x) < 30 && Math.abs(p.point.y - last.y) < 30;
    last = dbl ? null : {t: now, x: p.point.x, y: p.point.y};
    if (!sel || bar !== i) vib();
    select(i);
    if (dbl) openSet(i);
  });
  /* двойное касание / двойной клик (график сам распознаёт двойной тап) */
  let lastOpen = 0;
  const openSet = i => { if (Date.now() - lastOpen < 700) return; lastOpen = Date.now(); settings(i); };
  if (G.chart.subscribeDblClick) G.chart.subscribeDblClick(p => {
    if (!p || !p.point || (typeof DR !== "undefined" && DR.busy && DR.busy())) return;
    const i = hitBar(p.point); if (i == null) return;
    last = null; select(i); openSet(i);
  });

  /* рамка вокруг названия и кнопка «⋯» в легенде */
  function legendHook(L) {
    L.classList.toggle("csel", sel);
    if (!sel) return;
    const t = $("#lgT", L); if (!t || $("#lgDots", t)) return;
    const b = document.createElement("button"); b.id = "lgDots"; b.textContent = "⋯";
    b.onclick = e => { e.stopPropagation(); menu(b); };
    t.appendChild(b);
  }
  function menu(anchor) {
    const b = G.B[bar >= 0 && bar < G.B.length ? bar : G.B.length - 1]; if (!b) return;
    const px = fmt(b.close, G.dig), inf = symInfo(S.sym);
    const IC = d => `<svg viewBox="0 0 24 24" style="width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.6;flex:none">${d}</svg>`;
    popMenu(anchor, [
      [`${T("Добавить оповещение")} · ${inf.show} · ${px}…`, IC('<circle cx="11" cy="13" r="7"/><path d="M11 9v4l2 2M5 4 3 6M17 4l2 2M19 17v5M16.5 19.5h5"/>'), () => alertSheet()],
      [`${T("Копировать цену")} ${px}`, IC('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>'), () => {
        try { navigator.clipboard.writeText(px).then(() => toast(T("Цена скопирована")), () => toast(px)); } catch (e) { toast(px); } }],
      [T("Настройки…"), IC('<circle cx="12" cy="12" r="3"/><path d="M12 2.5 20.2 7v10L12 21.5 3.8 17V7z"/>'), () => settings(bar)]
    ]);
  }

  /* ---------- окно «Инструмент» (как в TradingView) ---------- */
  const hex6 = c => TVC.parse(c).hex;
  /* «призрачный» клик от второго касания двойного тапа не должен нажимать пункты только что открытого окна */
  let openedAt = 0;
  $("#shB").addEventListener("click", e => { if (Date.now() - openedAt < 450) { e.stopPropagation(); e.preventDefault(); } }, true);
  function apply() { if (!G.B.length) return; mkMain(); renderAll(); }
  function settings(i) {
    const snap = {cst: LS.get("cst", null), cbar: LS.get(cbarKey(), null), up: LS.get("cUp", null), dn: LS.get("cDn", null)};
    const tz0 = LS.get("tz", "local");
    let done = false, tz = tz0;
    const b = G.B[i];
    const restore = () => {
      ["cst", "cUp", "cDn"].forEach((k, j) => { const v = [snap.cst, snap.up, snap.dn][j]; if (v == null) localStorage.removeItem("fzm_" + k); else LS.set(k, v); });
      if (snap.cbar == null) LS.set(cbarKey(), {}); else LS.set(cbarKey(), snap.cbar);
      apply();
    };
    const box = sheet(T("Инструмент"), "", () => { TVC.close(); if (!done) restore(); });
    openedAt = Date.now();
    const draw = () => {
      const st = CST(), cb = LS.get(cbarKey(), {}), ov = b && cb[b.time] || {};
      const up = b ? (st.prev && i > 0 ? b.close >= G.B[i - 1].close : b.close >= b.open) : true;
      const eff = {c: ov.c || (up ? st.bu : st.bd), b: ov.b || (up ? st.ru : st.rd), w: ov.w || (up ? st.wu : st.wd)};
      const sw = (f, c) => `<button class="tvsw" data-f="${f}"><b><u style="background:${c}"></u></b></button>`;
      const ck = (k, label) => `<div class="n ${st[k] ? "on" : ""}" data-ck="${k}"><i></i><span>${esc(T(label))}</span></div>`;
      const bars = S.type === "bars", line = !CANDLE();
      const dt = b ? new Date((b.time + TZ) * 1000).toISOString().slice(0, 16).replace("T", " ") : "";
      const prec = [["def", T("По умолчанию")]].concat([0, 1, 2, 3, 4, 5, 6, 7, 8].map(n => [String(n), n ? "0." + "0".repeat(n - 1) + "1" : "1"]));
      box.innerHTML = `<div class="tvi">
        ${line ? `<div class="ts">${esc(T("Японские свечи"))}</div><div style="color:var(--mu);font-size:14px">${esc(T("Для линейного графика настройки свечей недоступны."))}</div>` : `
        <div class="ts">${esc(T(bars ? "Бары" : "Японские свечи"))}</div>
        <div class="ck ${st.prev ? "on" : ""}" data-ck="prev"><i></i><span>${esc(T("Цвет баров основан на цене предыдущего закрытия"))}</span></div>
        <div class="tr">${bars ? `<div class="n" style="padding-left:34px">${esc(T("Цвет"))}</div>` : ck("body", "Тело")}${sw("bu", st.bu)}${sw("bd", st.bd)}</div>
        ${bars ? "" : `<div class="tr">${ck("border", "Границы")}${sw("ru", st.ru)}${sw("rd", st.rd)}</div>
        <div class="tr">${ck("wick", "Фитиль")}${sw("wu", st.wu)}${sw("wd", st.wd)}</div>`}
        ${b ? `<div class="ts">${esc(T("Выбранная свеча"))} · <span style="text-transform:none">${dt}</span></div>
          <div class="tr"><div class="n" style="padding-left:34px">${esc(T(bars ? "Цвет" : "Тело"))}</div>${sw("oc", eff.c)}</div>
          ${bars ? "" : `<div class="tr"><div class="n" style="padding-left:34px">${esc(T("Границы"))}</div>${sw("ob", eff.b)}</div>
          <div class="tr"><div class="n" style="padding-left:34px">${esc(T("Фитиль"))}</div>${sw("ow", eff.w)}</div>`}
          ${cb[b.time] ? `<button class="rs" id="csRs">${esc(T("Сбросить цвет свечи"))}</button>` : ""}` : ""}`}
        <div class="ts">${esc(T("Настройка данных"))}</div>
        <div class="tr"><div class="n">${esc(T("Точность"))}</div><select id="csPr">${prec.map(([k, n]) => `<option value="${k}" ${k === st.prec ? "selected" : ""}>${esc(n)}</option>`).join("")}</select></div>
        <div class="tr"><div class="n">${esc(T("Часовой пояс"))}</div><select id="csTz">${TZS.map(([k, n]) => `<option value="${k}" ${k === tz ? "selected" : ""}>${esc(T(n))}</option>`).join("")}</select></div>
      </div>
      <div class="tvf"><button class="m" id="csM">⋯</button><button class="c" id="csC">${esc(T("Отмена"))}</button><button class="o" id="csO">${esc(T("Ок"))}</button></div>`;

      const setSt = o => {
        const v = Object.assign(LS.get("cst", {}), o); LS.set("cst", v);
        if (o.bu) LS.set("cUp", hex6(o.bu)); if (o.bd) LS.set("cDn", hex6(o.bd));
        apply();
      };
      $$("[data-ck]", box).forEach(x => x.onclick = () => { const k = x.dataset.ck; setSt({[k]: !CST()[k]}); draw(); });
      $$(".tvsw", box).forEach(x => x.onclick = e => {
        e.stopPropagation();
        const f = x.dataset.f, u = $("u", x);
        $$(".tvsw", box).forEach(y => y.classList.toggle("act", y === x));
        const start = f[0] === "o" ? eff[f[1]] : CST()[f];
        TVC.pick(x, start, c => {
          u.style.background = c;
          if (f[0] === "o") {                                   // ручной цвет выбранной свечи
            const m = LS.get(cbarKey(), {}), o = m[b.time] || {};
            o[f[1]] = c; if (bars) o.c = c; m[b.time] = o; LS.set(cbarKey(), m);
            apply();
          } else setSt({[f]: c});
        });
        const obs = setInterval(() => { if (!$("#tvc").classList.contains("on")) { clearInterval(obs); x.classList.remove("act"); draw(); } }, 250);
      });
      const rs = $("#csRs", box);
      if (rs) rs.onclick = () => { const m = LS.get(cbarKey(), {}); delete m[b.time]; LS.set(cbarKey(), m); apply(); draw(); };
      $("#csPr", box).onchange = e => setSt({prec: e.target.value});
      $("#csTz", box).onchange = e => { tz = e.target.value; };
      $("#csC", box).onclick = () => closeSheet();
      $("#csO", box).onclick = () => {
        done = true; closeSheet();
        if (tz !== tz0) { LS.set("tz", tz); location.reload(); }
      };
      $("#csM", box).onclick = e => {
        e.stopPropagation();
        popMenu(e.currentTarget, [
          [T("Сбросить настройки"), "", () => { LS.set("cst", {}); LS.set("cUp", "#089981"); LS.set("cDn", "#f23645"); apply(); draw(); }],
          [T("Сбросить цвета всех свечей"), "", () => { LS.set(cbarKey(), {}); apply(); draw(); }]
        ]);
        const m = $("#popMenu"); m.style.zIndex = 82;
        const r = e.currentTarget.getBoundingClientRect(); m.style.top = Math.max(8, r.top - m.offsetHeight - 8) + "px";
      };
    };
    draw();
  }

  requestAnimationFrame(frame);
  return {legend: legendHook, sel: () => sel, settings: () => settings(bar >= 0 ? bar : G.B.length - 1), deselect};
})();
