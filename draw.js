/* Fazo Mobile — инструменты рисования (набор как в TradingView) для сенсорного экрана.
   Рисунки рисуются на отдельном холсте поверх графика; точки хранятся как {t: время (с), p: цена},
   поэтому рисунки остаются на месте при прокрутке, масштабе и смене таймфрейма. */
"use strict";
Object.assign(EN, {
  "Линия тренда": "Trend line", "Линия данных": "Data line", "Удлинённая линия": "Extended line", "Перекрещенные линии": "Cross lines", "Вилы": "Pitchfork",
  "Фиксированный Квадрат Ганна": "Gann square fixed", "Импульсная волна Эллиотта": "Elliott impulse wave", "Коррекционная волна Эллиотта": "Elliott correction wave",
  "Треугольник в волнах Эллиотта": "Elliott triangle wave", "Двойная комбинация Эллиотта": "Elliott double combo wave", "Тройная комбинация Эллиотта": "Elliott triple combo wave",
  "Разделение циклов": "Cyclic lines", "Прогноз позиции": "Position forecast", "Проекция цены": "Price projection", "Диапазон цены": "Price range", "Диапазон времени": "Date range",
  "Диапазон цены и времени": "Date and price range", "Anchored VWAP": "Anchored VWAP", "Профиль объёма в заданном диапазоне": "Fixed range volume profile",
  "Текст на экране": "Anchored text", "Изображение": "Image", "Стикеры": "Stickers", "Иконки": "Icons", "Линейка": "Ruler", "Ластик": "Eraser",
  "Продолжить рисовать": "Stay in drawing mode", "Скрыть объекты рисования": "Hide drawings", "Зафиксировать все объекты": "Lock all drawings",
  "Слабый магнит": "Weak magnet", "Сильный магнит": "Strong magnet", "Магнит выключен": "Magnet off", "Удалить все объекты": "Remove drawings",
  "Увеличить масштаб": "Zoom in", "Уменьшить масштаб": "Zoom out", "Избранное": "Favorites", "Инструменты": "Tools", "Линии тренда": "Trend line tools",
  "Ганн и Фибоначчи": "Gann and Fibonacci", "Измерение и прогнозирование": "Forecasting and measurement", "Геометрические фигуры": "Geometric shapes",
  "Комментирование": "Annotation", "Визуальные элементы": "Visuals", "Поиск": "Search", "В избранном ничего нет": "Nothing in favorites yet",
  "Просмотрите категории выше и добавьте нужное в избранное с помощью долгого нажатия.": "Browse the categories above and add tools to favorites with a long press.",
  "Коснитесь рисунка, чтобы удалить": "Tap a drawing to remove it",
  "Линии": "Lines", "Вилы": "Pitchforks", "Фибоначчи": "Fibonacci", "Ганн": "Gann", "Паттерны": "Patterns", "Волны Эллиотта": "Elliott waves",
  "Циклы": "Cycles", "Прогнозы и измерения": "Forecasting & measurement", "Объём": "Volume", "Фигуры": "Shapes", "Текст и заметки": "Text & notes",
  "Трендовая линия": "Trend line", "Луч": "Ray", "Расширенная линия": "Extended line", "Информационная линия": "Info line", "Угол тренда": "Trend angle",
  "Горизонтальная линия": "Horizontal line", "Горизонтальный луч": "Horizontal ray", "Вертикальная линия": "Vertical line", "Перекрестие": "Cross line",
  "Параллельный канал": "Parallel channel", "Регрессионный тренд": "Regression trend", "Плоский верх/низ": "Flat top/bottom", "Расходящийся канал": "Disjoint channel",
  "Вилы Эндрюса": "Pitchfork", "Вилы Шифа": "Schiff pitchfork", "Видоизменённые вилы Шифа": "Modified Schiff pitchfork", "Вилы (внутрь)": "Inside pitchfork", "Вилка": "Fork (Vilka)",
  "Коррекция Фибоначчи": "Fib retracement", "Расширение Фибоначчи по тренду": "Trend-based Fib extension", "Каналы Фибоначчи": "Fib channel",
  "Периоды времени Фибоначчи": "Fib time zone", "Веерные линии сопротивления Фибоначчи": "Fib speed resistance fan", "Периоды Фибоначчи по тренду": "Trend-based Fib time",
  "Окружности Фибоначчи": "Fib circles", "Спираль Фибоначчи": "Fib spiral", "Дуги сопротивления Фибоначчи": "Fib speed resistance arcs", "Клин Фибоначчи": "Fib wedge", "Наклонный веер": "Pitchfan",
  "Коробка Ганна": "Gann box", "Фиксированный квадрат Ганна": "Gann square fixed", "Квадрат Ганна": "Gann square", "Веер Ганна": "Gann fan",
  "Паттерн XABCD": "XABCD pattern", "Паттерн Cypher": "Cypher pattern", "Голова и плечи": "Head and shoulders", "Паттерн ABCD": "ABCD pattern",
  "Паттерн треугольник": "Triangle pattern", "Паттерн трёх движений": "Three drives pattern",
  "Импульс (12345)": "Elliott impulse wave (12345)", "Коррекция (ABC)": "Elliott correction wave (ABC)", "Треугольник (ABCDE)": "Elliott triangle wave (ABCDE)",
  "Двойная комбинация (WXY)": "Elliott double combo (WXY)", "Тройная комбинация (WXYXZ)": "Elliott triple combo (WXYXZ)",
  "Циклические линии": "Cyclic lines", "Циклы времени": "Time cycles", "Синусоида": "Sine line",
  "Длинная позиция": "Long position", "Короткая позиция": "Short position", "Прогноз": "Forecast", "Проекция": "Projection", "Шаблон баров": "Bars pattern",
  "Диапазон цен": "Price range", "Диапазон дат": "Date range", "Диапазон дат и цен": "Date and price range", "Сектор": "Sector",
  "VWAP с привязкой": "Anchored VWAP", "Профиль объёма (диапазон)": "Fixed range volume profile", "Профиль объёма с привязкой": "Anchored volume profile",
  "Кисть": "Brush", "Маркер": "Highlighter", "Стрелка-указатель": "Arrow marker", "Стрелка": "Arrow", "Стрелка вверх": "Arrow mark up", "Стрелка вниз": "Arrow mark down",
  "Прямоугольник": "Rectangle", "Вращающийся прямоугольник": "Rotated rectangle", "Траектория": "Path", "Окружность": "Circle", "Эллипс": "Ellipse",
  "Ломаная линия": "Polyline", "Треугольник": "Triangle", "Дуга": "Arc", "Кривая": "Curve", "Двойная кривая": "Double curve",
  "Текст": "Text", "Заметка": "Note", "Заметка цены": "Price note", "Метка": "Pin", "Таблица": "Table", "Сноска": "Callout", "Комментарий": "Comment",
  "Метка цены": "Price label", "Знак": "Signpost", "Флаг": "Flag", "Эмодзи": "Emoji", "Алерт на цене": "Price alert",
  "Магнит": "Magnet", "Рисовать подряд": "Stay in drawing mode", "Скрыть рисунки": "Hide drawings", "Удалить все рисунки": "Remove all drawings",
  "Точка": "Point", "из": "of", "Готово": "Done", "Введите текст": "Enter text", "Текст пуст": "Text is empty", "Рисунок удалён": "Drawing removed",
  "Удалить все рисунки на этом графике?": "Remove all drawings on this chart?", "Тяните точку или весь рисунок": "Drag a point or the whole drawing",
  "Нарисуйте пальцем": "Draw with your finger", "Цель": "Target", "Стоп": "Stop", "свечей": "bars", "Закреплён": "Locked"
});

const DR = (() => {
  /* ---------- холст ---------- */
  const wrap = $("#chartWrap"), cv = document.createElement("canvas");
  cv.id = "drawCv";
  cv.style.cssText = "position:absolute;left:0;top:0;z-index:2;pointer-events:none;touch-action:none";
  wrap.insertBefore(cv, $("#legend"));
  const ctx = cv.getContext("2d");
  let W = 0, H = 0, DPR = 1;
  let list = [], sel = null, tool = null, tmp = null, drag = null, dirty = true, sig = "";
  const hits = new Map();
  const opt = Object.assign({mag: "weak", keep: false, hide: false, lockAll: false}, LS.get("drOpt", {}));
  if (opt.mag === true) opt.mag = "weak"; if (opt.mag === false) opt.mag = "off";
  const saveOpt = () => LS.set("drOpt", opt);
  const key = () => "dr:" + S.sym;
  const save = () => { LS.set(key(), list.filter(d => !d.temp)); dirty = true; };
  const uid = () => "d" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  /* ---------- координаты: время/цена <-> пиксели ---------- */
  const tfs = () => TF_SEC[S.tf] || 3600;
  function tToL(t) {
    const B = G.B, n = B.length; if (!n) return null;
    if (t <= B[0].time) return (t - B[0].time) / tfs();
    if (t >= B[n - 1].time) return n - 1 + (t - B[n - 1].time) / tfs();
    let lo = 0, hi = n - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (B[m].time <= t) lo = m; else hi = m; }
    return lo + (t - B[lo].time) / (B[hi].time - B[lo].time);
  }
  function lToT(l) {
    const B = G.B, n = B.length; if (!n) return 0;
    if (l <= 0) return B[0].time + l * tfs();
    if (l >= n - 1) return B[n - 1].time + (l - n + 1) * tfs();
    const i = Math.floor(l); return B[i].time + (l - i) * (B[i + 1].time - B[i].time);
  }
  const ts = () => G.chart.timeScale();
  const X = t => { const l = tToL(t); return l == null ? null : ts().logicalToCoordinate(l); };
  const Y = p => G.main ? G.main.priceToCoordinate(p) : null;
  const toPt = (x, y) => {
    const l = ts().coordinateToLogical(x);
    return {t: Math.round(lToT(l == null ? G.B.length - 1 : l)), p: G.main.coordinateToPrice(y)};
  };
  const XY = q => q.fx != null ? {x: q.fx * W, y: q.fy * H} : {x: X(q.t), y: Y(q.p)};
  const dg = () => S.dig[S.sym] || G.dig || 2;
  const pf = v => fmt(v, dg());

  function size() {
    const t = ts(), w = t.width(), h = $("#chart").clientHeight - (G.subs.length ? 0 : t.height());
    DPR = window.devicePixelRatio || 1;
    if (w !== W || h !== H || cv.width !== Math.round(w * DPR)) {
      W = w; H = h; cv.width = Math.round(w * DPR); cv.height = Math.round(h * DPR);
      cv.style.width = w + "px"; cv.style.height = h + "px"; dirty = true;
    }
  }

  /* ---------- примитивы рисования (с сохранением геометрии для попадания пальцем) ---------- */
  let HT = null;                                            // геометрия текущего рисунка
  const LSTY = {s: [], d: [7, 5], o: [2, 4]};
  const rgba = (c, a) => {
    if (!c) return `rgba(41,98,255,${a})`;
    if (c[0] === "#") { let h = c.slice(1); if (h.length === 3) h = h.split("").map(x => x + x).join(""); h = h.slice(0, 6);
      return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`; }
    return c;
  };
  function stroke(c, w, ls) { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.setLineDash(LSTY[ls] || []); }
  function seg(a, b, hit = true) {
    if (!a || !b || a.x == null || b.x == null || a.y == null || b.y == null) return;
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    if (hit && HT) HT.push({k: "s", a, b});
  }
  function extend(a, b, left, right) {                    // продлить отрезок до краёв холста
    const dx = b.x - a.x, dy = b.y - a.y;
    if (Math.abs(dx) < 1e-6) return [{x: a.x, y: left ? (dy > 0 ? -10 : H + 10) : a.y}, {x: b.x, y: right ? (dy > 0 ? H + 10 : -10) : b.y}];
    const k = dy / dx, at = x => ({x, y: a.y + k * (x - a.x)});
    const goR = dx > 0;
    const p1 = left ? at(goR ? -10 : W + 10) : a, p2 = right ? at(goR ? W + 10 : -10) : b;
    return [p1, p2];
  }
  function polyPath(pts, close) { ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)); if (close) ctx.closePath(); }
  function fillPoly(pts, c, a, hit = true) {
    if (pts.some(q => !q || q.x == null || q.y == null)) return;
    ctx.fillStyle = rgba(c, a); polyPath(pts, true); ctx.fill();
    if (hit && HT) HT.push({k: "p", pts});
  }
  function polyline(pts, close) {
    pts = pts.filter(q => q && q.x != null && q.y != null); if (pts.length < 2) return;
    polyPath(pts, close); ctx.stroke();
    if (HT) for (let i = 1; i < pts.length; i++) HT.push({k: "s", a: pts[i - 1], b: pts[i]});
    if (close && HT) HT.push({k: "s", a: pts[pts.length - 1], b: pts[0]});
  }
  function text(s, x, y, o = {}) {
    if (x == null || y == null) return;
    ctx.font = `${o.bold ? "bold " : ""}${o.size || 12}px -apple-system,Roboto,sans-serif`;
    const lines = String(s).split("\n"), lh = (o.size || 12) * 1.3;
    const w = Math.max(...lines.map(l => ctx.measureText(l).width)), h = lh * lines.length, pd = o.bg ? 5 : 0;
    let x0 = o.align === "center" ? x - w / 2 : o.align === "right" ? x - w : x;
    let y0 = o.base === "bottom" ? y - h : o.base === "middle" ? y - h / 2 : y;
    if (o.bg) { ctx.fillStyle = o.bg; roundRect(x0 - pd, y0 - pd, w + pd * 2, h + pd * 2, 4); ctx.fill(); if (o.border) { ctx.strokeStyle = o.border; ctx.lineWidth = 1; ctx.setLineDash([]); ctx.stroke(); } }
    ctx.fillStyle = o.col || "#fff"; ctx.textBaseline = "top"; ctx.textAlign = "left";
    lines.forEach((l, i) => ctx.fillText(l, x0, y0 + i * lh));
    if (HT && o.hit !== false) HT.push({k: "r", x: x0 - pd, y: y0 - pd, w: w + pd * 2, h: h + pd * 2});
    return {x: x0 - pd, y: y0 - pd, w: w + pd * 2, h: h + pd * 2};
  }
  function roundRect(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function head(tip, from, L = 12, fill = true) {
    const a = Math.atan2(tip.y - from.y, tip.x - from.x);
    ctx.beginPath(); ctx.moveTo(tip.x, tip.y); ctx.lineTo(tip.x - L * Math.cos(a - .42), tip.y - L * Math.sin(a - .42));
    if (fill) { ctx.lineTo(tip.x - L * Math.cos(a + .42), tip.y - L * Math.sin(a + .42)); ctx.closePath(); ctx.fill(); }
    else { ctx.moveTo(tip.x, tip.y); ctx.lineTo(tip.x - L * Math.cos(a + .42), tip.y - L * Math.sin(a + .42)); ctx.stroke(); }
  }
  function ellipse(cx, cy, rx, ry, rot, a0, a1, hitN = 48) {
    ctx.beginPath(); ctx.ellipse(cx, cy, Math.abs(rx), Math.abs(ry), rot || 0, a0 == null ? 0 : a0, a1 == null ? Math.PI * 2 : a1); ctx.stroke();
    if (HT) { const s0 = a0 == null ? 0 : a0, s1 = a1 == null ? Math.PI * 2 : a1; let prev = null;
      for (let i = 0; i <= hitN; i++) { const t = s0 + (s1 - s0) * i / hitN, c = Math.cos(rot || 0), s = Math.sin(rot || 0);
        const px = Math.abs(rx) * Math.cos(t), py = Math.abs(ry) * Math.sin(t), q = {x: cx + px * c - py * s, y: cy + px * s + py * c};
        if (prev) HT.push({k: "s", a: prev, b: q}); prev = q; } }
  }
  const mid = (a, b) => ({x: (a.x + b.x) / 2, y: (a.y + b.y) / 2});
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const dur = s => { s = Math.abs(s); const d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60);
    return (d ? d + "d " : "") + (h ? h + "h " : "") + (!d && m ? m + "m" : "").trim() || "0m"; };
  const barsBetween = (t1, t2) => Math.round(Math.abs(tToL(t2) - tToL(t1)));
  const dateStr = t => { const d = new Date(t * 1000); return d.toLocaleDateString(undefined, {day: "2-digit", month: "short", year: "2-digit"}) + (tfs() < 86400 ? " " + d.toLocaleTimeString(undefined, {hour: "2-digit", minute: "2-digit"}) : ""); };
  const priceTag = (y, s, c) => { ctx.font = "11px sans-serif"; const w = ctx.measureText(s).width + 10; ctx.fillStyle = c; ctx.fillRect(W - w, y - 9, w, 18); ctx.fillStyle = "#fff"; ctx.textBaseline = "middle"; ctx.fillText(s, W - w + 5, y); };

  /* ---------- уровни ---------- */
  const FIBL = [[0, "#787b86"], [0.236, "#f23645"], [0.382, "#ff9800"], [0.5, "#4caf50"], [0.618, "#089981"], [0.786, "#00bcd4"], [1, "#787b86"],
    [1.618, "#2962ff"], [2.618, "#f23645"], [3.618, "#9c27b0"], [4.236, "#e91e63"]];
  const FIBX = [[0, "#787b86"], [0.382, "#f23645"], [0.618, "#089981"], [1, "#787b86"], [1.272, "#ff9800"], [1.618, "#2962ff"], [2, "#00bcd4"], [2.618, "#9c27b0"], [3.618, "#e91e63"]];
  const FANL = [[0.25, "#ff9800"], [0.382, "#089981"], [0.5, "#4caf50"], [0.618, "#00bcd4"], [0.75, "#2962ff"], [1, "#787b86"]];
  const ARCL = [[0.236, "#f23645"], [0.382, "#ff9800"], [0.5, "#4caf50"], [0.618, "#089981"], [0.786, "#00bcd4"], [1, "#787b86"]];
  const GANN = [[0, "#787b86"], [0.25, "#ff9800"], [0.382, "#089981"], [0.5, "#4caf50"], [0.618, "#00bcd4"], [0.75, "#2962ff"], [1, "#787b86"]];
  const FIBT = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

  /* ---------- описание инструментов: [точек, раздел, название, настройки] ---------- */
  const C = {L: "Линии", P: "Вилы", F: "Фибоначчи", G: "Ганн", PT: "Паттерны", E: "Волны Эллиотта", CY: "Циклы", M: "Прогнозы и измерения", V: "Объём", SH: "Фигуры", TX: "Текст и заметки"};
  const TL = {
    trend: [2, "L", "Линия тренда"], ray: [2, "L", "Луч"], ext: [2, "L", "Удлинённая линия"], info: [2, "L", "Линия данных"], angle: [2, "L", "Угол тренда"],
    h: [1, "L", "Горизонтальная линия"], hray: [1, "L", "Горизонтальный луч"], v: [1, "L", "Вертикальная линия"], cross: [1, "L", "Перекрещенные линии"],
    channel: [3, "L", "Параллельный канал", {fill: true}], regr: [2, "L", "Регрессионный тренд", {fill: true, col: "#f23645"}], flat: [3, "L", "Плоский верх/низ", {fill: true}],
    dchan: [3, "L", "Расходящийся канал", {fill: true}],
    pitch: [3, "P", "Вилы", {fill: true, col: "#f23645"}], schiff: [3, "P", "Вилы Шифа", {fill: true, col: "#f23645"}], mschiff: [3, "P", "Видоизменённые вилы Шифа", {fill: true, col: "#f23645"}],
    ipitch: [3, "P", "Вилы (внутрь)", {fill: true, col: "#f23645"}], vilka: [3, "P", "Вилка", {fill: true, col: "#2962ff"}],
    fib: [2, "F", "Коррекция Фибоначчи", {fill: true}], fibext: [3, "F", "Расширение Фибоначчи по тренду", {fill: true}], fibch: [3, "F", "Каналы Фибоначчи", {fill: true}],
    fibtime: [2, "F", "Периоды времени Фибоначчи"], fibfan: [2, "F", "Веерные линии сопротивления Фибоначчи", {fill: true}], fibtrtime: [3, "F", "Периоды Фибоначчи по тренду"],
    fibcirc: [2, "F", "Окружности Фибоначчи"], fibspiral: [2, "F", "Спираль Фибоначчи", {col: "#f23645"}], fibarc: [2, "F", "Дуги сопротивления Фибоначчи"],
    fibwedge: [3, "F", "Клин Фибоначчи", {fill: true}], pitchfan: [3, "F", "Наклонный веер", {fill: true}],
    gannbox: [2, "G", "Коробка Ганна", {fill: true}], gannfix: [2, "G", "Фиксированный Квадрат Ганна", {fill: true}], gannsq: [2, "G", "Квадрат Ганна", {fill: true}], gannfan: [2, "G", "Веер Ганна", {fill: true}],
    xabcd: [5, "PT", "Паттерн XABCD", {fill: true, col: "#089981", L: ["X", "A", "B", "C", "D"]}], cypher: [5, "PT", "Паттерн Cypher", {fill: true, col: "#089981", L: ["X", "A", "B", "C", "D"]}],
    hs: [7, "PT", "Голова и плечи", {fill: true, col: "#089981", L: ["", "LS", "", "H", "", "RS", ""]}], abcd: [4, "PT", "Паттерн ABCD", {col: "#089981", L: ["A", "B", "C", "D"]}],
    tripat: [4, "PT", "Паттерн треугольник", {fill: true, col: "#089981", L: ["A", "B", "C", "D"]}], threed: [7, "PT", "Паттерн трёх движений", {col: "#089981", L: ["", "1", "A", "2", "B", "3", ""]}],
    impulse: [6, "E", "Импульсная волна Эллиотта", {col: "#2962ff", L: ["0", "1", "2", "3", "4", "5"], ew: 1}], corr: [4, "E", "Коррекционная волна Эллиотта", {col: "#ff9800", L: ["0", "A", "B", "C"], ew: 1}],
    etri: [6, "E", "Треугольник в волнах Эллиотта", {col: "#e91e63", L: ["0", "A", "B", "C", "D", "E"], ew: 1}], dbl: [4, "E", "Двойная комбинация Эллиотта", {col: "#9c27b0", L: ["0", "W", "X", "Y"], ew: 1}],
    trip: [6, "E", "Тройная комбинация Эллиотта", {col: "#00acc1", L: ["0", "W", "X", "Y", "X", "Z"], ew: 1}],
    cyclic: [2, "CY", "Разделение циклов"], tcycle: [2, "CY", "Циклы времени"], sine: [2, "CY", "Синусоида"],
    long: [1, "M", "Длинная позиция", {pos: 1}], short: [1, "M", "Короткая позиция", {pos: 1}], forecast: [2, "M", "Прогноз позиции"], projection: [3, "M", "Проекция цены", {fill: true}],
    barpat: [3, "M", "Шаблон баров"], prange: [2, "M", "Диапазон цены", {fill: true}], drange: [2, "M", "Диапазон времени", {fill: true}], measure: [2, "M", "Диапазон цены и времени", {fill: true}],
    sector: [3, "M", "Сектор", {fill: true}],
    avwap: [1, "V", "Anchored VWAP", {col: "#e040fb"}], vpfix: [2, "V", "Профиль объёма в заданном диапазоне"], vpanc: [1, "V", "Профиль объёма с привязкой"],
    brush: [0, "SH", "Кисть"], marker: [0, "SH", "Маркер", {col: "#ffeb3b", w: 12}], arrowmk: [2, "SH", "Стрелка-указатель", {col: "#2962ff"}], arrow: [2, "SH", "Стрелка"],
    arrowup: [1, "SH", "Стрелка вверх", {col: "#089981"}], arrowdn: [1, "SH", "Стрелка вниз", {col: "#f23645"}],
    rect: [2, "SH", "Прямоугольник", {fill: true}], rrect: [3, "SH", "Вращающийся прямоугольник", {fill: true}], path: [-1, "SH", "Траектория"],
    circle: [2, "SH", "Окружность", {fill: true}], ellipse: [2, "SH", "Эллипс", {fill: true}], poly: [-1, "SH", "Ломаная линия"], triangle: [3, "SH", "Треугольник", {fill: true}],
    arc: [3, "SH", "Дуга", {fill: true}], curve: [3, "SH", "Кривая"], dcurve: [4, "SH", "Двойная кривая"],
    text: [1, "TX", "Текст", {txt: 1}], note: [1, "TX", "Заметка", {txt: 1, col: "#2962ff"}], pnote: [2, "TX", "Заметка цены", {col: "#2962ff"}], pin: [1, "TX", "Метка", {txt: 1, col: "#f23645"}],
    table: [1, "TX", "Таблица", {txt: 1}], callout: [2, "TX", "Сноска", {txt: 1, col: "#2962ff"}], comment: [1, "TX", "Комментарий", {txt: 1, col: "#2962ff"}],
    plabel: [1, "TX", "Метка цены", {col: "#2962ff"}], signpost: [1, "TX", "Знак", {txt: 1, col: "#2962ff"}], flag: [1, "TX", "Флаг", {col: "#f23645"}],
    emoji: [1, "VI", "Эмодзи", {pick: "emoji"}], sticker: [1, "VI", "Стикеры", {pick: "sticker", w: 4}], iconset: [1, "VI", "Иконки", {pick: "icon", col: "#f23645"}],
    atext: [1, "TX", "Текст на экране", {txt: 1}], image: [2, "TX", "Изображение"], ruler: [2, "X", "Линейка", {fill: true}], alert: [1, "TX", "Алерт на цене"]
  };
  /* ---------- иконки инструментов (в стиле TradingView) ---------- */
  const IC = (d, nodes = "", extra = "") => `<svg viewBox="0 0 30 30"><path d="${d}"/>${extra}${nodes.split(" ").filter(Boolean).map(p => { const [x, y] = p.split(","); return `<circle cx="${x}" cy="${y}" r="2.1" style="fill:var(--tile)"/>`; }).join("")}</svg>`;
  const TX_ = (x, y, s, fs = 7) => `<text x="${x}" y="${y}" font-size="${fs}" fill="currentColor" stroke="none" font-family="sans-serif" text-anchor="middle">${s}</text>`;
  const CAND = "M8 9v12M6 12h4v6H6zM15 6v14M13 9h4v7h-4zM22 10v13M20 13h4v6h-4z";
  const ICN = {
    trend: IC("M7 23 23 7", "7,23 23,7"), ray: IC("M7 23 27 3", "7,23 15,15"), info: IC("M6 22 17 11", "6,22 17,11", '<rect x="19" y="5" width="8" height="6" rx="2.5"/>'),
    ext: IC("M3 27 27 3", "11,19 19,11"), angle: IC("M6 23 22 8M6 23h18M14 23a8 8 0 0 0-2.4-5.6", "6,23 22,8"), h: IC("M3 15h24", "15,15"), hray: IC("M8 15h19", "8,15"),
    v: IC("M15 3v24", "15,15"), cross: IC("M3 15h24M15 3v24", "15,15"), channel: IC("M5 17 19 6M11 25 25 14", "5,17 19,6 18,20"),
    regr: IC("M5 12 25 4v13L5 25zM5 18.5l20-8"), flat: IC("M5 14 25 7M5 22h20", "5,14 25,7 25,22"), dchan: IC("M5 16 25 7M5 19l20 7", "5,16 25,7 25,26"),
    pitch: IC("M6 25 13 18M9 11l8 12M9 11l9-8M13 17l9-8M17 23l9-8", "6,25 9,11 17,23"), schiff: IC("M5 25h9M9 25 13 18M9 11l8 12M9 11l9-8M13 17l9-8M17 23l9-8", "5,25 9,11 17,23"),
    mschiff: IC("M5 22l8 -4M9 11l8 12M9 11l9-8M13 17l9-8M17 23l9-8", "5,22 9,11 17,23"), ipitch: IC("M8 26l5-8M8 26l8-4M13 18l4-14M16 22l10-12M13 18l3 4", "8,26 13,18 16,22"),
    vilka: IC("M5 25 14 6l4 8M5 25 27 12M18 14l9-5", "5,25 14,6 18,14"),
    fib: IC("M5 6h20M5 11h20M5 16h20M5 21h20M5 26h20", "25,6 5,26"), fibext: IC("M5 15 10 6l5 5M5 18h20M5 22h20M5 26h20", "5,15 10,6 15,11"),
    fibch: IC("M4 20 22 6M6 26 26 10M5 23l19-15", "4,20 22,6 6,26"), fibtime: IC("M7 5v20M12 5v20M17 5v20M25 5v20", "7,25 12,13"),
    fibfan: IC("M5 25 25 5M5 25l20-8M5 25l20-14M5 25 17 5M5 25 11 5M25 5v20H5", "5,25 25,5"), fibtrtime: IC("M4 22 8 10l5 7M15 5v20M20 5v20M26 5v20", "4,22 8,10 13,17"),
    fibcirc: IC("M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M15 15m-7 0a7 7 0 1 0 14 0a7 7 0 1 0-14 0M15 15m-11 0a11 11 0 1 0 22 0a11 11 0 1 0-22 0", "15,15 26,15"),
    fibspiral: IC("M15 15a2 2 0 0 1 2 2 4 4 0 0 1-4 4 6 6 0 0 1-6-6 9 9 0 0 1 9-9 11 11 0 0 1 11 11", "15,15 26,17"),
    fibarc: IC("M4 23a11 11 0 0 1 22 0M8 23a7 7 0 0 1 14 0M11.5 23a3.5 3.5 0 0 1 7 0", "15,23 15,8"), fibwedge: IC("M6 24h20M6 24 18 6M17 24a11 11 0 0 0-5-9M23 24a17 17 0 0 0-6-13", "6,24 26,24 18,6"),
    pitchfan: IC("M5 25 25 5M5 25l20-6M5 25l20-13M5 25 17 5M25 5v14", "5,25 25,5 25,19"),
    gannbox: IC("M5 5h20v20H5zM5 12h20M5 18h20M12 5v20M18 5v20", "5,25 25,5"), gannfix: IC("M5 5h20v20H5zM5 15h20M15 5v20M5 25 25 5M5 25 25 15M5 25 15 5", "5,25 25,5"),
    gannsq: IC("M5 5h20v20H5zM5 12h20M5 18h20M12 5v20M18 5v20M5 25 25 5M5 5l20 20", "5,25 25,5"), gannfan: IC("M5 25 25 5M5 25l20-8M5 25l20-14M5 25 17 5M5 25 11 5M5 25l20-3", "5,25"),
    xabcd: IC("M4 24 9 6l5 12 6-10 6 14M4 24l10-6", "4,24 9,6 14,18 20,8 26,22"), cypher: IC("M4 24 9 6l5 12 6-10 6 14M4 24l10-6", "4,24 9,6 14,18 20,8 26,22", TX_(20, 27, "C")),
    hs: IC("M3 22 7 14l3 4 5-12 5 12 3-4 4 8M5 18h20", "7,14 15,6 23,14"), abcd: IC("M5 23 9 7l11 15 5-14M5 23 25 8", "5,23 9,7 20,22 25,8"),
    tripat: IC("M4 22 10 8l6 11 6-7 4 5M10 8l16 9M4 22l18-10", "4,22 10,8 16,19 22,12"), threed: IC("M3 24 7 14l3 5 4-10 3 5 4-10 3 5 3-8", "7,14 14,9 21,4"),
    impulse: IC("M3 22 8 14l3 4 5-9 3 4 5-8", "8,14 11,18 16,9 19,13 24,5", TX_(8, 9, "1") + TX_(24, 27, "5")),
    corr: IC("M4 10l7 10 6-7 8 11", "11,20 17,13 25,24", TX_(11, 27, "A") + TX_(25, 9, "C")), etri: IC("M3 8l5 12 4-9 4 7 4-5 4 4", "8,20 12,11 16,18 20,13 24,17", TX_(8, 27, "A") + TX_(24, 9, "E")),
    dbl: IC("M4 22l7-12 6 7 8-12", "11,10 17,17 25,5", TX_(11, 7, "W") + TX_(25, 27, "Y")), trip: IC("M3 22l5-10 4 5 4-9 4 6 5-9", "8,12 12,17 16,8 20,14 25,5", TX_(8, 7, "W") + TX_(25, 27, "Z")),
    cyclic: IC("M7 4v22M12 4v22M17 4v22M22 4v22", "7,15 12,15"), tcycle: IC("M4 20a5 5 0 0 1 10 0M16 20a5 5 0 0 1 10 0", "4,20 14,20"), sine: IC("M3 15c3-12 7-12 9 0s6 12 9 0 4-6 6-4", "3,15 12,15"),
    long: IC("M4 8h22M4 15h22M4 22h22", "4,8 4,22", TX_(15, 12, "L", 7)), short: IC("M4 8h22M4 15h22M4 22h22", "4,8 4,22", TX_(15, 19, "S", 7)),
    forecast: IC(CAND + "M24 5v6M22 9l2 2 2-2"), barpat: IC(CAND), projection: IC(CAND + "M4 26l22-20", "4,26"), sector: IC("M6 24V6a18 18 0 0 1 18 18z", "6,24 6,6 24,24"),
    avwap: IC(CAND + "M3 24c6-6 12-12 24-14", "3,24"), vpfix: IC("M6 4v22M24 4v22M6 8h9M6 12h13M6 16h7M6 20h11", "6,4 24,26"), vpanc: IC("M6 15h4M25 6v20M25 9h-6M25 13h-10M25 17h-8M25 21h-11", "6,15"),
    prange: IC("M5 6h20M5 24h20M15 9v13M12 11l3-3 3 3", "5,6 5,24"), drange: IC("M6 5v20M24 5v20M9 15h13M20 12l3 3-3 3", "6,5 24,25"),
    measure: IC("M5 5h20v20H5zM15 22V8M12 11l3-3 3 3M8 15h14M19 12l3 3-3 3", "5,25 25,5"), ruler: IC("M3 20 20 3l7 7-17 17zM8 16l2 2M11 13l3 3M14 10l2 2M17 7l3 3"),
    brush: IC("M18 5l7 7-11 11H7v-7zM4 27c3-2 5 0 8-2"), marker: IC("M17 4l9 9-9 9-6-2-3-3-2-6zM8 17l-4 6h7"), arrowmk: IC("M5 25 20 10M14 8l9-1-1 9z"),
    arrow: IC("M6 24 23 7M15 7h8v8", "6,24"), arrowup: IC("M15 4 6 14h5v12h8V14h5z"), arrowdn: IC("M15 26 6 16h5V4h8v12h5z"),
    rect: IC("M6 6h18v18H6z", "6,6 24,24"), rrect: IC("M15 3l12 12-12 12L3 15z", "15,3 27,15"), path: IC("M4 22l7-8 6 5 7-10M19 8h5v5", "4,22 11,14 17,19"),
    circle: IC("M15 15m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0", "15,15 25,15"), ellipse: IC("M15 15m-12 0a12 7 0 1 0 24 0a12 7 0 1 0-24 0", "3,15 27,15 15,8"),
    poly: IC("M5 20l4-10 8-3 7 8-6 9z", "5,20 9,10 17,7 24,15 18,24"), triangle: IC("M6 25 9 6l16 19z", "6,25 9,6 25,25"), arc: IC("M5 22a11 11 0 0 1 20-8", "5,22 25,14 13,9"),
    curve: IC("M5 24c2-12 8-16 20-17", "5,24 25,7"), dcurve: IC("M5 25c0-9 10-6 10-11S25 6 25 5", "5,25 15,14 25,5"),
    text: IC("M7 6h16M15 6v19M11 25h8"), atext: IC("M5 5h14M12 5v14M9 19h6M22 16v10M19 22c0 3 6 3 6 0M20 17h4"), note: IC("M6 4h18v12H6zM15 16v10M11 7h8M15 7v6", "15,26"),
    pnote: IC("M6 4h18v12H6zM15 16v10M17 7h-3a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3M15 6v9", "15,26"), pin: IC("M15 27s8-8 8-14a8 8 0 0 0-16 0c0 6 8 14 8 14zM15 13m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0"),
    table: IC("M4 6h22v18H4zM4 12h22M4 18h22M11 6v18M19 6v18"), callout: IC("M5 5h20v14H13l-5 6v-6H5z"), comment: IC("M9 8h12a6 6 0 0 1 0 12H9a6 6 0 0 1 0-12z"),
    plabel: IC("M5 5h20v15H11l-6 6z"), signpost: IC("M15 11m-7 0a7 7 0 1 0 14 0a7 7 0 1 0-14 0M15 18v9M15 8l1 2h2l-1.5 1.5.5 2-2-1-2 1 .5-2L12 10h2z"), flag: IC("M8 27V4M8 5h16l-4 5 4 5H8"),
    image: IC("M4 6h22v18H4zM4 20l6-6 5 5 4-3 7 6M20 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"), alert: IC("M15 16m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0M15 12v4l3 2M7 5 4 8M23 5l3 3"),
    emoji: IC("M15 15m-11 0a11 11 0 1 0 22 0a11 11 0 1 0-22 0M10 18c2 3 8 3 10 0M11 12v1M19 12v1"), sticker: IC("M5 5h20v12l-8 8H5zM17 25v-8h8M10 13v1M18 13v1M10 18c2 2 5 2 6 1"),
    iconset: IC("M15 25S4 18 4 11a5.5 5.5 0 0 1 11-2 5.5 5.5 0 0 1 11 2c0 7-11 14-11 14z"),
    eraser: IC("M12 25 4 17 17 4l9 9-12 12zM9 12l9 9M12 25h14"), keep: IC("M5 21 18 8l4 4L9 25H5zM16 10l4 4M21 18h6v7h-6zM22 18v-2a2 2 0 0 1 4 0v2"),
    hide: IC("M3 15s4-8 12-8 12 8 12 8-4 8-12 8-12-8-12-8zM15 15m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0M20 22l6 5"), lockall: IC("M8 13h14v13H8zM11 13V9a4 4 0 0 1 8 0v4"),
    magnet: IC("M8 5v10a7 7 0 0 0 14 0V5h-5v10a2 2 0 0 1-4 0V5zM8 9h5M17 9h5"), trash: IC("M5 8h20M12 8V5h6v3M8 8l1 18h12l1-18M13 12v10M17 12v10"),
    zoomin: IC("M13 13m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0M19 19l7 7M13 9v8M9 13h8"), zoomout: IC("M13 13m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0M19 19l7 7M9 13h8")
  };

  const tdef = t => TL[t] || [2, "L", t];
  const topt = t => tdef(t)[3] || {};

  /* ---------- отрисовка каждого инструмента ---------- */
  function levelsH(levels, x1, x2, priceAt, d, labelLeft) {   // горизонтальные уровни с заливкой
    const ys = levels.map(([v, c]) => ({v, c, p: priceAt(v), y: Y(priceAt(v))})).filter(q => q.y != null);
    if (d.fill) for (let i = 1; i < ys.length; i++) fillPoly([{x: x1, y: ys[i - 1].y}, {x: x2, y: ys[i - 1].y}, {x: x2, y: ys[i].y}, {x: x1, y: ys[i].y}], ys[i].c, 0.07, false);
    for (const q of ys) {
      stroke(q.c, 1, "s"); seg({x: x1, y: q.y}, {x: x2, y: q.y});
      text(`${q.v} (${pf(q.p)})`, labelLeft ? x1 - 4 : x2 + 4, q.y, {col: q.c, size: 10, align: labelLeft ? "right" : "left", base: "middle", hit: false});
    }
  }
  function fork(d, P, o0) {                                  // общие вилы: начало o0, рукоять к середине b-c
    const [, b, c] = P; if (!c) { stroke(d.col, d.w, d.ls); seg(P[0], P[1]); return; }
    const m = mid(b, c), dx = m.x - o0.x, dy = m.y - o0.y, far = (W + H) * 2 / Math.max(1, Math.hypot(dx, dy));
    const tine = (s, k) => ({x: s.x + dx * k, y: s.y + dy * k});
    const lv = [[0.5, 0.06], [1, 0.1]];
    if (d.fill) {
      for (const [k] of lv) { const L1 = {x: m.x + (b.x - m.x) * k, y: m.y + (b.y - m.y) * k}, L2 = {x: m.x + (c.x - m.x) * k, y: m.y + (c.y - m.y) * k};
        fillPoly([L1, tine(L1, far), tine(L2, far), L2], d.col, 0.05, false); }
    }
    stroke(d.col, d.w, d.ls);
    seg(o0, tine(m, far)); seg(b, c); seg(b, tine(b, far)); seg(c, tine(c, far));
    stroke(d.col, 1, "d");
    for (const k of [0.5]) for (const s of [b, c]) { const L = {x: m.x + (s.x - m.x) * k, y: m.y + (s.y - m.y) * k}; seg(L, tine(L, far)); }
    if (o0 !== P[0]) { stroke(d.col, 1, "d"); seg(P[0], P[1]); }
  }
  function waveLabels(d, P, L, size) {
    ctx.textAlign = "center";
    P.forEach((q, i) => {
      const s = L[i]; if (!s || q.x == null) return;
      const pv = P[i - 1], nx = P[i + 1], high = (!pv || q.y <= pv.y) && (!nx || q.y <= nx.y);
      text(s, q.x, high ? q.y - 6 : q.y + 6, {col: d.col, size: size || 13, bold: true, align: "center", base: high ? "bottom" : "top", hit: false});
    });
  }
  const ratio = (a, b) => { const r = Math.abs(a / b); return isFinite(r) ? r.toFixed(3) : "—"; };
  const R = {
    trend(d, P) { stroke(d.col, d.w, d.ls); seg(P[0], P[1]); },
    ray(d, P) { stroke(d.col, d.w, d.ls); const [a, b] = extend(P[0], P[1], false, true); seg(a, b); },
    ext(d, P) { stroke(d.col, d.w, d.ls); const [a, b] = extend(P[0], P[1], true, true); seg(a, b); },
    info(d, P) {
      R.trend(d, P); const [p0, p1] = d.pts, df = p1.p - p0.p, ang = Math.atan2(P[0].y - P[1].y, P[1].x - P[0].x) * 180 / Math.PI;
      text(`${df >= 0 ? "+" : ""}${pf(df)} (${(df / p0.p * 100).toFixed(2)}%)\n${barsBetween(p0.t, p1.t)} ${T("свечей")}, ${dur(p1.t - p0.t)}\n${ang.toFixed(1)}°`,
        P[1].x + 8, P[1].y, {bg: "rgba(30,34,45,.92)", border: d.col, size: 11, base: "middle"});
    },
    angle(d, P) {
      R.trend(d, P); const [a, b] = P, r = Math.min(40, dist(a, b)), ang = Math.atan2(b.y - a.y, b.x - a.x);
      stroke(d.col, 1, "d"); seg(a, {x: a.x + r + 20, y: a.y}, false);
      ctx.setLineDash([]); ctx.beginPath(); ctx.arc(a.x, a.y, r, Math.min(0, ang), Math.max(0, ang)); ctx.stroke();
      text((-ang * 180 / Math.PI).toFixed(1) + "°", a.x + r + 6, a.y + (ang < 0 ? -14 : 4), {col: d.col, size: 11, hit: false});
    },
    h(d, P) { stroke(d.col, d.w, d.ls); seg({x: -10, y: P[0].y}, {x: W + 10, y: P[0].y}); priceTag(P[0].y, pf(d.pts[0].p), d.col); },
    hray(d, P) { stroke(d.col, d.w, d.ls); seg(P[0], {x: W + 10, y: P[0].y}); ctx.fillStyle = d.col; ctx.beginPath(); ctx.arc(P[0].x, P[0].y, 3, 0, 7); ctx.fill(); priceTag(P[0].y, pf(d.pts[0].p), d.col); },
    v(d, P) { stroke(d.col, d.w, d.ls); seg({x: P[0].x, y: -10}, {x: P[0].x, y: H + 10}); text(dateStr(d.pts[0].t), P[0].x, H - 4, {bg: d.col, size: 10, align: "center", base: "bottom", hit: false}); },
    cross(d, P) { R.v(d, P); R.h(d, P); },
    channel(d, P) {
      const [a, b, c] = P; if (!c) return R.trend(d, P);
      const off = c.y - (a.y + (b.y - a.y) * ((c.x - a.x) / ((b.x - a.x) || 1))), a2 = {x: a.x, y: a.y + off}, b2 = {x: b.x, y: b.y + off};
      if (d.fill) fillPoly([a, b, b2, a2], d.col, 0.1);
      stroke(d.col, d.w, d.ls); seg(a, b); seg(a2, b2); stroke(d.col, 1, "d"); seg(mid(a, a2), mid(b, b2));
    },
    regr(d, P) {
      const B = G.B, i0 = Math.max(0, Math.ceil(tToL(Math.min(d.pts[0].t, d.pts[1].t)))), i1 = Math.min(B.length - 1, Math.floor(tToL(Math.max(d.pts[0].t, d.pts[1].t))));
      if (i1 - i0 < 2) return R.trend(d, P);
      let n = 0, sx = 0, sy = 0, sxx = 0, sxy = 0;
      for (let i = i0; i <= i1; i++) { const y = B[i].close; n++; sx += i; sy += y; sxx += i * i; sxy += i * y; }
      const k = (n * sxy - sx * sy) / (n * sxx - sx * sx), c0 = (sy - k * sx) / n;
      let sd = 0; for (let i = i0; i <= i1; i++) sd += (B[i].close - (c0 + k * i)) ** 2; sd = Math.sqrt(sd / n) * 2;
      const pt = (i, o) => ({x: ts().logicalToCoordinate(i), y: Y(c0 + k * i + o)});
      const A = pt(i0, 0), Bp = pt(i1, 0), U1 = pt(i0, sd), U2 = pt(i1, sd), D1 = pt(i0, -sd), D2 = pt(i1, -sd);
      if (d.fill) { fillPoly([U1, U2, Bp, A], "#2962ff", 0.08); fillPoly([A, Bp, D2, D1], d.col, 0.08); }
      stroke(d.col, d.w, d.ls); seg(A, Bp); stroke("#2962ff", 1, "s"); seg(U1, U2); seg(D1, D2);
    },
    flat(d, P) {
      const [a, b, c] = P; if (!c) return R.trend(d, P);
      const a2 = {x: a.x, y: c.y}, b2 = {x: b.x, y: c.y};
      if (d.fill) fillPoly([a, b, b2, a2], d.col, 0.1);
      stroke(d.col, d.w, d.ls); seg(a, b); seg(a2, b2);
    },
    dchan(d, P) {
      const [a, b, c] = P; if (!c) return R.trend(d, P);
      const a2 = {x: a.x, y: c.y}, b2 = {x: b.x, y: c.y - (b.y - a.y)};
      if (d.fill) fillPoly([a, b, b2, a2], d.col, 0.1);
      stroke(d.col, d.w, d.ls); seg(a, b); seg(a2, b2);
    },
    pitch(d, P) { fork(d, P, P[0]); },
    schiff(d, P) { fork(d, P, P[2] ? mid(P[0], P[1]) : P[0]); },
    mschiff(d, P) { fork(d, P, P[2] ? {x: P[0].x, y: (P[0].y + P[1].y) / 2} : P[0]); },
    ipitch(d, P) {
      const [a, b, c] = P; if (!c) return R.trend(d, P);
      const m = mid(b, c), dx = m.x - a.x, dy = m.y - a.y, far = (W + H) * 2 / Math.max(1, Math.hypot(dx, dy));
      if (d.fill) fillPoly([b, {x: b.x + dx * far, y: b.y + dy * far}, {x: c.x + dx * far, y: c.y + dy * far}, c], d.col, 0.06);
      stroke(d.col, d.w, d.ls); seg(a, {x: a.x + dx * far, y: a.y + dy * far}); seg(b, c);
      seg({x: b.x - dx, y: b.y - dy}, {x: b.x + dx * far, y: b.y + dy * far}); seg({x: c.x - dx, y: c.y - dy}, {x: c.x + dx * far, y: c.y + dy * far});
    },
    vilka(d, P) {                                             // вилка: начало A, вершина B, откат C; линии из A и C параллельно A→B, уровни отката
      const [a, b, c] = P; if (!c) return R.trend(d, P);
      const dx = b.x - a.x, dy = b.y - a.y, far = (W + H) * 2 / Math.max(1, Math.hypot(dx, dy));
      const ray = s => ({x: s.x + dx * far, y: s.y + dy * far});
      const m = mid(a, c);
      if (d.fill) fillPoly([a, ray(a), ray(c), c], d.col, 0.08);
      stroke(d.col, d.w, d.ls); seg(a, b); seg(b, c); seg(a, ray(a)); seg(c, ray(c));
      stroke(d.col, 1, "d"); seg(m, ray(m));
      const pa = d.pts[0].p, pb = d.pts[1].p, pc = d.pts[2].p, r = Math.abs(pb - pc) / Math.abs(pb - pa || 1);
      text(`${(r * 100).toFixed(1)}%`, c.x + 6, c.y, {col: d.col, size: 11, base: "middle", hit: false});
    },
    fib(d, P) {
      const [a, b] = P; if (!b) return;
      const p0 = d.pts[0].p, p1 = d.pts[1].p, x1 = Math.min(a.x, b.x), x2 = d.extR ? W + 10 : Math.max(a.x, b.x);
      stroke(d.col, 1, "d"); seg(a, b, false);
      levelsH(FIBL, x1, x2, v => p1 + (p0 - p1) * v, d, true);
      if (HT) HT.push({k: "s", a, b});
    },
    fibext(d, P) {
      const [a, b, c] = P; if (!c) { stroke(d.col, 1, "d"); seg(a, b); return; }
      stroke(d.col, 1, "d"); seg(a, b); seg(b, c);
      const dp = d.pts[1].p - d.pts[0].p, x2 = c.x + Math.max(40, Math.abs(b.x - a.x));
      levelsH(FIBX, c.x, x2, v => d.pts[2].p + dp * v, d, false);
    },
    fibch(d, P) {
      const [a, b, c] = P; if (!c) { stroke(d.col, d.w, d.ls); seg(a, b); return; }
      const off = c.y - (a.y + (b.y - a.y) * ((c.x - a.x) / ((b.x - a.x) || 1)));
      const L = FIBL.slice(0, 8).map(([v, col]) => ({v, col, a: {x: a.x, y: a.y + off * v}, b: {x: b.x, y: b.y + off * v}}));
      if (d.fill) for (let i = 1; i < L.length; i++) fillPoly([L[i - 1].a, L[i - 1].b, L[i].b, L[i].a], L[i].col, 0.06, false);
      for (const l of L) { stroke(l.col, 1, "s"); const [p, q] = extend(l.a, l.b, false, true); seg(p, q); text(String(l.v), l.a.x - 4, l.a.y, {col: l.col, size: 10, align: "right", base: "middle", hit: false}); }
    },
    fibtime(d, P) {
      const [a, b] = P; if (!b) return; const dx = b.x - a.x; if (Math.abs(dx) < 2) return;
      FIBT.forEach((n, i) => { const x = a.x + dx * n; if (x < -10 || x > W + 10) return; stroke(i % 2 ? d.col : "#787b86", 1, "s"); seg({x, y: 0}, {x, y: H}); text(String(n), x + 3, 4, {col: d.col, size: 10, hit: false}); });
      stroke(d.col, 1, "d"); seg(a, b);
    },
    fibfan(d, P) {
      const [a, b] = P; if (!b) return; const dx = b.x - a.x, dy = b.y - a.y;
      const rays = FANL.map(([v, c]) => ({v, c, q: {x: b.x, y: a.y + dy * v}})), rays2 = FANL.map(([v, c]) => ({v, c, q: {x: a.x + dx * v, y: b.y}}));
      for (const set of [rays, rays2]) {
        if (d.fill) for (let i = 1; i < set.length; i++) { const [, p1] = extend(a, set[i - 1].q, false, true), [, p2] = extend(a, set[i].q, false, true); fillPoly([a, p1, p2], set[i].c, 0.05, false); }
        for (const r of set) { stroke(r.c, 1, "s"); const [p, q] = extend(a, r.q, false, true); seg(p, q); }
      }
      stroke("#787b86", 1, "d"); ctx.strokeRect(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.abs(dx), Math.abs(dy));
      if (HT) HT.push({k: "s", a, b});
    },
    fibtrtime(d, P) {
      const [a, b, c] = P; if (!c) { stroke(d.col, 1, "d"); seg(a, b); return; }
      stroke(d.col, 1, "d"); seg(a, b); seg(b, c);
      const dx = b.x - a.x;
      [0, 0.382, 0.5, 0.618, 1, 1.382, 1.618, 2, 2.382, 2.618, 3, 3.618, 4.236].forEach((v, i) => {
        const x = c.x + dx * v; if (x < -10 || x > W + 10) return; stroke(FIBL[i % FIBL.length][1], 1, "s"); seg({x, y: 0}, {x, y: H}); text(String(v), x + 3, 4, {col: FIBL[i % FIBL.length][1], size: 10, hit: false}); });
    },
    fibcirc(d, P) {
      const [a, b] = P; if (!b) return; const c = mid(a, b), r = dist(a, b) / 2;
      stroke(d.col, 1, "d"); seg(a, b);
      FIBL.slice(1).forEach(([v, col]) => { stroke(col, 1, "s"); ellipse(c.x, c.y, r * v, r * v); });
    },
    fibspiral(d, P) {
      const [a, b] = P; if (!b) return; const r0 = dist(a, b), a0 = Math.atan2(b.y - a.y, b.x - a.x), phi = 1.6180339887;
      stroke(d.col, d.w, d.ls); seg(a, b); ctx.beginPath(); let prev = null;
      for (let th = -6 * Math.PI; th <= 2.5 * Math.PI; th += 0.05) {
        const r = r0 * Math.pow(phi, th / (Math.PI / 2)), q = {x: a.x + r * Math.cos(a0 - th), y: a.y + r * Math.sin(a0 - th)};
        if (!prev) ctx.moveTo(q.x, q.y); else ctx.lineTo(q.x, q.y);
        if (prev && HT && r > 3) HT.push({k: "s", a: prev, b: q}); prev = q;
      }
      ctx.stroke();
    },
    fibarc(d, P) {
      const [a, b] = P; if (!b) return; const r = dist(a, b), up = a.y < b.y;
      stroke(d.col, 1, "d"); seg(a, b);
      ARCL.forEach(([v, col]) => { stroke(col, 1, "s"); ellipse(b.x, b.y, r * v, r * v, 0, up ? Math.PI : 0, up ? 2 * Math.PI : Math.PI); });
    },
    fibwedge(d, P) {
      const [a, b, c] = P; if (!c) { stroke(d.col, d.w, d.ls); seg(a, b); return; }
      const r = dist(a, b), t1 = Math.atan2(b.y - a.y, b.x - a.x); let t2 = Math.atan2(c.y - a.y, c.x - a.x);
      let s = t1, e = t2; if (((e - s) + 4 * Math.PI) % (2 * Math.PI) > Math.PI) [s, e] = [t2, t1];
      if (e < s) e += 2 * Math.PI;
      stroke(d.col, d.w, d.ls); seg(a, {x: a.x + r * Math.cos(t1), y: a.y + r * Math.sin(t1)}); seg(a, {x: a.x + r * Math.cos(t2), y: a.y + r * Math.sin(t2)});
      ARCL.forEach(([v, col], i) => {
        if (d.fill && i) { ctx.fillStyle = rgba(col, 0.06); ctx.beginPath(); ctx.arc(a.x, a.y, r * v, s, e); ctx.arc(a.x, a.y, r * ARCL[i - 1][0], e, s, true); ctx.closePath(); ctx.fill(); }
        stroke(col, 1, "s"); ellipse(a.x, a.y, r * v, r * v, 0, s, e, 16);
      });
    },
    pitchfan(d, P) {
      const [a, b, c] = P; if (!c) { stroke(d.col, d.w, d.ls); seg(a, b); return; }
      const lv = [[0, "#787b86"], [0.25, "#ff9800"], [0.382, "#089981"], [0.5, "#4caf50"], [0.618, "#00bcd4"], [0.75, "#2962ff"], [1, "#787b86"]];
      const pts = lv.map(([v, col]) => ({col, q: {x: b.x + (c.x - b.x) * v, y: b.y + (c.y - b.y) * v}}));
      if (d.fill) for (let i = 1; i < pts.length; i++) { const [, p1] = extend(a, pts[i - 1].q, false, true), [, p2] = extend(a, pts[i].q, false, true); fillPoly([a, p1, p2], pts[i].col, 0.05, false); }
      for (const p of pts) { stroke(p.col, 1, "s"); const [s, e] = extend(a, p.q, false, true); seg(s, e); }
      stroke(d.col, 1, "d"); seg(b, c);
    },
    gannbox(d, P) {
      const [a, b] = P; if (!b) return; const dx = b.x - a.x, dy = b.y - a.y;
      GANN.forEach(([v, col], i) => {
        if (d.fill && i) { fillPoly([{x: a.x + dx * GANN[i - 1][0], y: a.y}, {x: a.x + dx * v, y: a.y}, {x: a.x + dx * v, y: b.y}, {x: a.x + dx * GANN[i - 1][0], y: b.y}], col, 0.04, false); }
        stroke(col, 1, "s"); seg({x: a.x + dx * v, y: a.y}, {x: a.x + dx * v, y: b.y}); seg({x: a.x, y: a.y + dy * v}, {x: b.x, y: a.y + dy * v});
        text(String(v), a.x + dx * v, Math.max(a.y, b.y) + 3, {col, size: 9, align: "center", hit: false});
        text(String(v), Math.min(a.x, b.x) - 3, a.y + dy * v, {col, size: 9, align: "right", base: "middle", hit: false});
      });
      stroke("#787b86", 1, "d"); seg(a, b); seg({x: a.x, y: b.y}, {x: b.x, y: a.y});
    },
    gannfix(d, P) {
      const [a] = P, b = P[1]; if (!b) return; const s = Math.max(Math.abs(b.x - a.x), Math.abs(b.y - a.y));
      const sx = Math.sign(b.x - a.x) || 1, sy = Math.sign(b.y - a.y) || 1, B2 = {x: a.x + s * sx, y: a.y + s * sy};
      R.gannsq(d, [a, B2]);
    },
    gannsq(d, P) {
      const [a, b] = P; if (!b) return; const dx = b.x - a.x, dy = b.y - a.y;
      if (d.fill) fillPoly([a, {x: b.x, y: a.y}, b, {x: a.x, y: b.y}], d.col, 0.05, false);
      stroke("#787b86", 1, "s");
      for (let i = 0; i <= 8; i++) { seg({x: a.x + dx * i / 8, y: a.y}, {x: a.x + dx * i / 8, y: b.y}, i === 0 || i === 8); seg({x: a.x, y: a.y + dy * i / 8}, {x: b.x, y: a.y + dy * i / 8}, i === 0 || i === 8); }
      stroke(d.col, 1, "s"); seg(a, b); seg({x: a.x, y: b.y}, {x: b.x, y: a.y});
      [[1, "#f23645"], [2, "#ff9800"], [3, "#4caf50"], [4, "#2962ff"]].forEach(([k, col]) => {
        stroke(col, 1, "s"); seg(a, {x: b.x, y: a.y + dy * k / 8}, false); seg(a, {x: a.x + dx * k / 8, y: b.y}, false); });
      stroke(d.col, 1, "d"); ellipse(a.x, a.y, dx, dy, 0, Math.min(0, Math.atan2(dy, dx)), Math.max(0, Math.atan2(dy, dx)), 12);
    },
    gannfan(d, P) {
      const [a, b] = P; if (!b) return; const dx = b.x - a.x, dy = b.y - a.y;
      const R8 = [[1 / 8, "8/1", "#ff9800"], [1 / 4, "4/1", "#089981"], [1 / 3, "3/1", "#4caf50"], [1 / 2, "2/1", "#00bcd4"], [1, "1/1", "#2962ff"],
        [2, "1/2", "#9c27b0"], [3, "1/3", "#e91e63"], [4, "1/4", "#f23645"], [8, "1/8", "#ff9800"]];
      const qs = R8.map(([k, lab, col]) => ({lab, col, q: k <= 1 ? {x: a.x + dx * k, y: b.y} : {x: b.x, y: a.y + dy / k}}));
      if (d.fill) for (let i = 1; i < qs.length; i++) { const [, p1] = extend(a, qs[i - 1].q, false, true), [, p2] = extend(a, qs[i].q, false, true); fillPoly([a, p1, p2], qs[i].col, 0.05, false); }
      for (const r of qs) { stroke(r.col, 1, "s"); const [s, e] = extend(a, r.q, false, true); seg(s, e); text(r.lab, r.q.x + 3, r.q.y, {col: r.col, size: 9, base: "middle", hit: false}); }
    },
    xabcd(d, P) {
      const pp = P.filter(Boolean);
      if (d.fill) { if (pp[2]) fillPoly([pp[0], pp[1], pp[2]], d.col, 0.15, false); if (pp[4]) fillPoly([pp[2], pp[3], pp[4]], d.col, 0.15, false); }
      stroke(d.col, d.w, d.ls); polyline(pp);
      stroke(d.col, 1, "d"); if (pp[2]) seg(pp[0], pp[2], false); if (pp[3]) seg(pp[1], pp[3], false); if (pp[4]) { seg(pp[2], pp[4], false); seg(pp[0], pp[4], false); }
      const p = d.pts.map(q => q.p), rl = (i, j, k, l, at) => at && text(ratio(p[i] - p[j], p[k] - p[l]), at.x, at.y, {col: d.col, size: 10, align: "center", base: "middle", bg: "rgba(16,16,16,.8)", hit: false});
      if (pp[2]) rl(2, 1, 0, 1, mid(pp[0], pp[2])); if (pp[3]) rl(3, 2, 1, 2, mid(pp[1], pp[3])); if (pp[4]) { rl(4, 3, 2, 3, mid(pp[2], pp[4])); rl(4, 1, 0, 1, mid(pp[0], pp[4])); }
      waveLabels(d, pp, topt(d.type).L);
    },
    cypher(d, P) { R.xabcd(d, P); },
    abcd(d, P) {
      const pp = P.filter(Boolean); stroke(d.col, d.w, d.ls); polyline(pp);
      stroke(d.col, 1, "d"); const p = d.pts.map(q => q.p);
      if (pp[2]) { seg(pp[0], pp[2], false); const m = mid(pp[0], pp[2]); text(ratio(p[2] - p[1], p[1] - p[0]), m.x, m.y, {col: d.col, size: 10, align: "center", base: "middle", bg: "rgba(16,16,16,.8)", hit: false}); }
      if (pp[3]) { seg(pp[1], pp[3], false); const m = mid(pp[1], pp[3]); text(ratio(p[3] - p[2], p[2] - p[1]), m.x, m.y, {col: d.col, size: 10, align: "center", base: "middle", bg: "rgba(16,16,16,.8)", hit: false}); }
      waveLabels(d, pp, topt(d.type).L);
    },
    hs(d, P) {
      const pp = P.filter(Boolean);
      if (d.fill && pp.length >= 5) fillPoly(pp, d.col, 0.1, false);
      stroke(d.col, d.w, d.ls); polyline(pp);
      if (pp[4]) { stroke(d.col, 1, "d"); const [s, e] = extend(pp[2], pp[4], true, true); seg(s, e, false); }
      waveLabels(d, pp, topt(d.type).L, 11);
    },
    tripat(d, P) {
      const pp = P.filter(Boolean);
      if (d.fill && pp[3]) fillPoly(pp, d.col, 0.1, false);
      stroke(d.col, d.w, d.ls); polyline(pp);
      if (pp[3]) { stroke(d.col, 1, "d"); seg(pp[0], pp[2], false); seg(pp[1], pp[3], false); }
      waveLabels(d, pp, topt(d.type).L);
    },
    threed(d, P) { const pp = P.filter(Boolean); stroke(d.col, d.w, d.ls); polyline(pp); waveLabels(d, pp, topt(d.type).L); },
    wave(d, P) { const pp = P.filter(Boolean); stroke(d.col, d.w, d.ls); polyline(pp); waveLabels(d, pp, topt(d.type).L, 13); },
    cyclic(d, P) {
      const [a, b] = P; if (!b) return; const dx = b.x - a.x; if (Math.abs(dx) < 3) return;
      stroke(d.col, d.w, d.ls);
      for (let k = Math.floor(-a.x / dx) - 1; k < (W - a.x) / dx + 1; k++) { const x = a.x + k * dx; if (x >= -5 && x <= W + 5) seg({x, y: 0}, {x, y: H}, k === 0 || k === 1); }
    },
    tcycle(d, P) {
      const [a, b] = P; if (!b) return; const dx = Math.abs(b.x - a.x); if (dx < 4) return; const r = dx / 2, dir = b.y < a.y ? -1 : 1;
      stroke(d.col, d.w, d.ls);
      for (let x = Math.min(a.x, b.x); x < W + dx; x += dx) ellipse(x + r, a.y, r, Math.min(r, Math.abs(b.y - a.y) || r), 0, dir < 0 ? Math.PI : 0, dir < 0 ? 2 * Math.PI : Math.PI, 12);
    },
    sine(d, P) {
      const [a, b] = P; if (!b) return; const per = b.x - a.x; if (Math.abs(per) < 3) return;
      const m = (a.y + b.y) / 2, amp = (a.y - b.y) / 2; stroke(d.col, d.w, d.ls); ctx.beginPath(); let prev = null;
      for (let x = -5; x <= W + 5; x += 3) { const q = {x, y: m + amp * Math.cos(Math.PI * (x - a.x) / per)}; if (!prev) ctx.moveTo(q.x, q.y); else ctx.lineTo(q.x, q.y); if (prev && HT) HT.push({k: "s", a: prev, b: q}); prev = q; }
      ctx.stroke();
    },
    long(d, P) { posTool(d, P, 1); },
    short(d, P) { posTool(d, P, -1); },
    forecast(d, P) {
      const [a, b] = P; if (!b) return; const up = d.pts[1].p >= d.pts[0].p, c = up ? "#089981" : "#f23645";
      stroke(c, d.w, "s"); seg(a, b); ctx.fillStyle = c; head(b, a, 12);
      const df = d.pts[1].p - d.pts[0].p;
      text(`${df >= 0 ? "+" : ""}${pf(df)} (${(df / d.pts[0].p * 100).toFixed(2)}%)\n${barsBetween(d.pts[0].t, d.pts[1].t)} ${T("свечей")}`, b.x + 8, b.y, {bg: c, size: 11, base: "middle"});
    },
    projection(d, P) {
      const [a, b, c] = P; if (!c) { stroke(d.col, d.w, d.ls); seg(a, b); return; }
      const e = {x: c.x + (b.x - a.x), y: c.y + (b.y - a.y)};
      if (d.fill) fillPoly([a, b, c], d.col, 0.12);
      stroke(d.col, d.w, d.ls); polyline([a, b, c]); stroke(d.col, 1, "d"); seg(c, e); seg(b, e, false);
      ctx.fillStyle = d.col; head(e, c, 10);
      const pe = d.pts[2].p + d.pts[1].p - d.pts[0].p; text(pf(pe), e.x + 6, e.y, {col: d.col, size: 11, base: "middle", hit: false});
    },
    barpat(d, P) {
      const [a, b, c] = P; if (!b) return;
      const B = G.B, i0 = Math.max(0, Math.round(tToL(Math.min(d.pts[0].t, d.pts[1].t)))), i1 = Math.min(B.length - 1, Math.round(tToL(Math.max(d.pts[0].t, d.pts[1].t))));
      stroke(d.col, 1, "d"); ctx.strokeRect(Math.min(a.x, b.x), 0, Math.abs(b.x - a.x), H); if (HT) HT.push({k: "r", x: Math.min(a.x, b.x), y: 0, w: Math.abs(b.x - a.x), h: 8});
      if (!c || i1 <= i0) return;
      const sh = d.pts[2].p - B[i0].open, l0 = tToL(d.pts[2].t), bw = Math.max(1, (ts().options().barSpacing || 6) * 0.6);
      for (let i = i0; i <= i1; i++) {
        const x = ts().logicalToCoordinate(l0 + (i - i0)), q = B[i]; if (x == null) continue;
        const yo = Y(q.open + sh), yc = Y(q.close + sh), yh = Y(q.high + sh), yl = Y(q.low + sh);
        ctx.fillStyle = ctx.strokeStyle = rgba(q.close >= q.open ? "#089981" : "#f23645", 0.55); ctx.setLineDash([]); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x, yh); ctx.lineTo(x, yl); ctx.stroke(); ctx.fillRect(x - bw / 2, Math.min(yo, yc), bw, Math.max(1, Math.abs(yc - yo)));
        if (HT) HT.push({k: "r", x: x - bw / 2, y: Math.min(yh, yl), w: bw, h: Math.abs(yl - yh)});
      }
    },
    prange(d, P) {
      const [a, b] = P; if (!b) return; const up = d.pts[1].p >= d.pts[0].p, c = up ? "#2962ff" : "#f23645";
      if (d.fill) fillPoly([a, {x: b.x, y: a.y}, b, {x: a.x, y: b.y}], c, 0.15);
      stroke(c, 1, "s"); seg(a, {x: b.x, y: a.y}); seg({x: a.x, y: b.y}, b); const mx = (a.x + b.x) / 2; seg({x: mx, y: a.y}, {x: mx, y: b.y}, false); ctx.fillStyle = c; head({x: mx, y: b.y}, {x: mx, y: a.y}, 9);
      const df = d.pts[1].p - d.pts[0].p; text(`${df >= 0 ? "+" : ""}${pf(df)} (${(df / d.pts[0].p * 100).toFixed(2)}%)`, mx, up ? Math.min(a.y, b.y) - 6 : Math.max(a.y, b.y) + 6, {bg: c, size: 11, align: "center", base: up ? "bottom" : "top"});
    },
    drange(d, P) {
      const [a, b] = P; if (!b) return; const c = "#2962ff";
      if (d.fill) fillPoly([{x: a.x, y: a.y}, {x: b.x, y: a.y}, {x: b.x, y: b.y}, {x: a.x, y: b.y}], c, 0.15);
      stroke(c, 1, "s"); seg({x: a.x, y: a.y}, {x: a.x, y: b.y}); seg({x: b.x, y: a.y}, {x: b.x, y: b.y}); const my = (a.y + b.y) / 2; seg({x: a.x, y: my}, {x: b.x, y: my}, false); ctx.fillStyle = c; head({x: b.x, y: my}, {x: a.x, y: my}, 9);
      text(`${barsBetween(d.pts[0].t, d.pts[1].t)} ${T("свечей")}, ${dur(d.pts[1].t - d.pts[0].t)}`, (a.x + b.x) / 2, Math.max(a.y, b.y) + 6, {bg: c, size: 11, align: "center"});
    },
    measure(d, P) {
      const [a, b] = P; if (!b) return; const up = d.pts[1].p >= d.pts[0].p, c = up ? "#2962ff" : "#f23645", mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      fillPoly([a, {x: b.x, y: a.y}, b, {x: a.x, y: b.y}], c, 0.15);
      stroke(c, 1, "s"); seg({x: mx, y: a.y}, {x: mx, y: b.y}, false); seg({x: a.x, y: my}, {x: b.x, y: my}, false); ctx.fillStyle = c; head({x: mx, y: b.y}, {x: mx, y: a.y}, 9); head({x: b.x, y: my}, {x: a.x, y: my}, 9);
      const df = d.pts[1].p - d.pts[0].p;
      text(`${df >= 0 ? "+" : ""}${pf(df)} (${(df / d.pts[0].p * 100).toFixed(2)}%)\n${barsBetween(d.pts[0].t, d.pts[1].t)} ${T("свечей")}, ${dur(d.pts[1].t - d.pts[0].t)}`, mx,
        up ? Math.min(a.y, b.y) - 6 : Math.max(a.y, b.y) + 6, {bg: c, size: 11, align: "center", base: up ? "bottom" : "top"});
    },
    sector(d, P) {
      const [a, b, c] = P; if (!c) { stroke(d.col, d.w, d.ls); seg(a, b); return; }
      const r = dist(a, b), t1 = Math.atan2(b.y - a.y, b.x - a.x), t2 = Math.atan2(c.y - a.y, c.x - a.x);
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.arc(a.x, a.y, r, t1, t2, ((t2 - t1 + 4 * Math.PI) % (2 * Math.PI)) > Math.PI); ctx.closePath();
      if (d.fill) { ctx.fillStyle = rgba(d.col, 0.15); ctx.fill(); }
      stroke(d.col, d.w, d.ls); ctx.stroke(); seg(a, b); seg(a, {x: a.x + r * Math.cos(t2), y: a.y + r * Math.sin(t2)});
    },
    avwap(d, P) {
      const B = G.B, i0 = Math.max(0, Math.round(tToL(d.pts[0].t))); if (i0 >= B.length) return;
      let pv = 0, vv = 0; const pts = [];
      for (let i = i0; i < B.length; i++) { const q = B[i], tp = (q.high + q.low + q.close) / 3; pv += tp * q.volume; vv += q.volume; pts.push({x: ts().logicalToCoordinate(i), y: Y(vv ? pv / vv : tp)}); }
      stroke(d.col, d.w, d.ls); polyline(pts);
      ctx.fillStyle = d.col; ctx.beginPath(); ctx.arc(P[0].x, P[0].y, 4, 0, 7); ctx.fill();
    },
    vpfix(d, P) { vprofile(d, P, d.pts[0].t, d.pts[1] ? d.pts[1].t : null); },
    vpanc(d, P) { vprofile(d, P, d.pts[0].t, null); },
    brush(d, P) { stroke(d.col, d.w, "s"); ctx.lineJoin = ctx.lineCap = "round"; smooth(P); ctx.lineJoin = "miter"; ctx.lineCap = "butt"; },
    marker(d, P) { ctx.globalAlpha = 0.45; stroke(d.col, d.w || 12, "s"); ctx.lineJoin = ctx.lineCap = "round"; smooth(P); ctx.globalAlpha = 1; ctx.lineJoin = "miter"; ctx.lineCap = "butt"; },
    arrowmk(d, P) {
      const [a, b] = P; if (!b) return; const L = dist(a, b); if (L < 4) return; const ang = Math.atan2(b.y - a.y, b.x - a.x), hw = Math.min(14, L / 3), sw = hw / 2.5, hl = Math.min(L * 0.4, 26);
      const rot = (x, y) => ({x: a.x + x * Math.cos(ang) - y * Math.sin(ang), y: a.y + x * Math.sin(ang) + y * Math.cos(ang)});
      const pts = [rot(0, -sw), rot(L - hl, -sw), rot(L - hl, -hw), rot(L, 0), rot(L - hl, hw), rot(L - hl, sw), rot(0, sw)];
      fillPoly(pts, d.col, 1);
    },
    arrow(d, P) { const [a, b] = P; if (!b) return; stroke(d.col, d.w, d.ls); seg(a, b); ctx.fillStyle = d.col; head(b, a, 10 + d.w * 2); },
    arrowup(d, P) { arrowMark(d, P[0], 1); },
    arrowdn(d, P) { arrowMark(d, P[0], -1); },
    rect(d, P) {
      const [a, b] = P; if (!b) return; const pts = [a, {x: b.x, y: a.y}, b, {x: a.x, y: b.y}];
      if (d.fill) fillPoly(pts, d.col, 0.18); stroke(d.col, d.w, d.ls); polyline(pts, true);
      if (d.text) text(d.text, (a.x + b.x) / 2, (a.y + b.y) / 2, {col: d.col, size: 12, align: "center", base: "middle", hit: false});
    },
    rrect(d, P) {
      const [a, b, c] = P; if (!c) { stroke(d.col, d.w, d.ls); seg(a, b); return; }
      const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, h = (c.x - a.x) * nx + (c.y - a.y) * ny;
      const pts = [a, b, {x: b.x + nx * h, y: b.y + ny * h}, {x: a.x + nx * h, y: a.y + ny * h}];
      if (d.fill) fillPoly(pts, d.col, 0.18); stroke(d.col, d.w, d.ls); polyline(pts, true);
    },
    path(d, P) { const pp = P.filter(Boolean); stroke(d.col, d.w, d.ls); polyline(pp); if (pp.length > 1) { ctx.fillStyle = d.col; head(pp[pp.length - 1], pp[pp.length - 2], 10 + d.w * 2); } },
    poly(d, P) { const pp = P.filter(Boolean); if (d.fill && pp.length > 2) fillPoly(pp, d.col, 0.12, false); stroke(d.col, d.w, d.ls); polyline(pp); },
    circle(d, P) { const [a, b] = P; if (!b) return; const r = dist(a, b); if (d.fill) { ctx.fillStyle = rgba(d.col, 0.15); ctx.beginPath(); ctx.arc(a.x, a.y, r, 0, 7); ctx.fill(); if (HT) HT.push({k: "c", x: a.x, y: a.y, r}); } stroke(d.col, d.w, d.ls); ellipse(a.x, a.y, r, r); },
    ellipse(d, P) { const [a, b] = P; if (!b) return; const c = mid(a, b), rx = Math.abs(b.x - a.x) / 2, ry = Math.abs(b.y - a.y) / 2;
      if (d.fill) { ctx.fillStyle = rgba(d.col, 0.15); ctx.beginPath(); ctx.ellipse(c.x, c.y, rx, ry, 0, 0, 7); ctx.fill(); if (HT) HT.push({k: "r", x: c.x - rx * 0.7, y: c.y - ry * 0.7, w: rx * 1.4, h: ry * 1.4}); }
      stroke(d.col, d.w, d.ls); ellipse(c.x, c.y, rx, ry); },
    triangle(d, P) { const pp = P.filter(Boolean); if (d.fill && pp.length === 3) fillPoly(pp, d.col, 0.18); stroke(d.col, d.w, d.ls); polyline(pp, pp.length === 3); },
    arc(d, P) {
      const [a, b, c] = P; if (!c) { stroke(d.col, d.w, d.ls); seg(a, b); return; }
      const cp = {x: 2 * c.x - (a.x + b.x) / 2, y: 2 * c.y - (a.y + b.y) / 2};
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(cp.x, cp.y, b.x, b.y);
      if (d.fill) { ctx.fillStyle = rgba(d.col, 0.15); ctx.closePath(); ctx.fill(); }
      stroke(d.col, d.w, d.ls); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(cp.x, cp.y, b.x, b.y); ctx.stroke(); bezHit([a, cp, b]);
    },
    curve(d, P) {
      const [a, b, c] = P; if (!c) { stroke(d.col, d.w, d.ls); seg(a, b); return; }
      const cp = {x: 2 * c.x - (a.x + b.x) / 2, y: 2 * c.y - (a.y + b.y) / 2};
      stroke(d.col, d.w, d.ls); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(cp.x, cp.y, b.x, b.y); ctx.stroke(); bezHit([a, cp, b]);
    },
    dcurve(d, P) {
      const pp = P.filter(Boolean); if (pp.length < 4) { stroke(d.col, d.w, d.ls); polyline(pp); return; }
      const [a, c1, c2, b] = pp; stroke(d.col, d.w, d.ls); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, b.x, b.y); ctx.stroke(); bezHit([a, c1, c2, b]);
    },
    text(d, P) { text(d.text || T("Текст"), P[0].x, P[0].y, {col: d.col, size: 10 + d.w * 2, base: "middle"}); },
    note(d, P) {
      const a = P[0]; ctx.fillStyle = d.col; ctx.beginPath(); ctx.arc(a.x, a.y, 7, 0, 7); ctx.fill(); ctx.fillStyle = "#fff"; ctx.font = "bold 10px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("i", a.x, a.y + 1); ctx.textAlign = "left";
      if (HT) HT.push({k: "c", x: a.x, y: a.y, r: 9});
      if (d.text) text(d.text, a.x + 12, a.y - 12, {bg: "rgba(30,34,45,.95)", border: d.col, size: 12, base: "bottom"});
    },
    pnote(d, P) {
      const [a, b] = P; if (!b) return; stroke(d.col, 1, "s"); seg(a, b); ctx.fillStyle = d.col; ctx.beginPath(); ctx.arc(a.x, a.y, 3, 0, 7); ctx.fill();
      text(pf(d.pts[0].p), b.x, b.y, {bg: d.col, size: 12, align: "center", base: "middle"});
    },
    pin(d, P) {
      const a = P[0]; ctx.fillStyle = d.col; ctx.beginPath(); ctx.arc(a.x, a.y - 16, 8, Math.PI * 0.85, Math.PI * 2.15); ctx.lineTo(a.x, a.y); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(a.x, a.y - 16, 3, 0, 7); ctx.fill(); if (HT) HT.push({k: "c", x: a.x, y: a.y - 12, r: 12});
      if (d.text && (sel === d || d.show)) text(d.text, a.x, a.y - 30, {bg: "rgba(30,34,45,.95)", border: d.col, size: 12, align: "center", base: "bottom"});
    },
    table(d, P) {
      const rows = (d.text || "A | B\n1 | 2").split("\n").map(r => r.split("|").map(c => c.trim())); ctx.font = "12px sans-serif";
      const nc = Math.max(...rows.map(r => r.length)), cw = []; for (let j = 0; j < nc; j++) cw[j] = Math.max(...rows.map(r => ctx.measureText(r[j] || "").width)) + 14;
      const rh = 20, x0 = P[0].x, y0 = P[0].y, tw = cw.reduce((s, v) => s + v, 0);
      ctx.fillStyle = "rgba(30,34,45,.95)"; ctx.fillRect(x0, y0, tw, rh * rows.length); stroke(d.col, 1, "s"); ctx.strokeRect(x0, y0, tw, rh * rows.length);
      rows.forEach((r, i) => { let x = x0; r.forEach((c, j) => { ctx.fillStyle = i ? "#d1d4dc" : d.col; ctx.textBaseline = "middle"; ctx.fillText(c, x + 7, y0 + rh * i + rh / 2); x += cw[j]; });
        if (i) seg({x: x0, y: y0 + rh * i}, {x: x0 + tw, y: y0 + rh * i}, false); });
      let x = x0; cw.slice(0, -1).forEach(w => { x += w; seg({x, y: y0}, {x, y: y0 + rh * rows.length}, false); });
      if (HT) HT.push({k: "r", x: x0, y: y0, w: tw, h: rh * rows.length});
    },
    callout(d, P) {
      const [a, b] = P; if (!b) return; const r = text(d.text || T("Текст"), b.x, b.y, {bg: d.col, size: 12, align: "center", base: "middle"});
      if (r) { ctx.fillStyle = d.col; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x - 8, b.y); ctx.lineTo(b.x + 8, b.y); ctx.closePath(); ctx.fill(); if (HT) HT.push({k: "s", a, b}); }
    },
    comment(d, P) {
      const a = P[0], r = text(d.text || T("Текст"), a.x + 10, a.y - 18, {bg: d.col, size: 12, base: "bottom"});
      if (r) { ctx.fillStyle = d.col; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(r.x + 6, r.y + r.h); ctx.lineTo(r.x + 22, r.y + r.h); ctx.closePath(); ctx.fill(); }
    },
    plabel(d, P) {
      const a = P[0], s = pf(d.pts[0].p); ctx.font = "12px sans-serif"; const w = ctx.measureText(s).width + 12;
      ctx.fillStyle = d.col; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(a.x + 8, a.y - 11); ctx.lineTo(a.x + 8 + w, a.y - 11); ctx.lineTo(a.x + 8 + w, a.y + 11); ctx.lineTo(a.x + 8, a.y + 11); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.textBaseline = "middle"; ctx.fillText(s, a.x + 14, a.y); if (HT) HT.push({k: "r", x: a.x, y: a.y - 11, w: w + 8, h: 22});
    },
    signpost(d, P) {
      const a = P[0]; stroke(d.col, 2, "s"); seg(a, {x: a.x, y: a.y - 46}); ctx.fillStyle = d.col; ctx.beginPath(); ctx.arc(a.x, a.y, 3, 0, 7); ctx.fill();
      text(d.text || T("Знак"), a.x, a.y - 46, {bg: d.col, size: 12, align: "center", base: "bottom"});
    },
    flag(d, P) {
      const a = P[0]; stroke("#9598a1", 2, "s"); seg(a, {x: a.x, y: a.y - 28}); ctx.fillStyle = d.col;
      ctx.beginPath(); ctx.moveTo(a.x, a.y - 28); ctx.lineTo(a.x + 18, a.y - 24); ctx.lineTo(a.x, a.y - 18); ctx.closePath(); ctx.fill(); if (HT) HT.push({k: "r", x: a.x - 4, y: a.y - 30, w: 24, h: 32});
    },
    emoji(d, P) { text(d.text || "🚀", P[0].x, P[0].y, {size: 14 + d.w * 6, align: "center", base: "middle"}); },
    sticker(d, P) { text(d.text || "🔥", P[0].x, P[0].y, {size: 20 + d.w * 8, align: "center", base: "middle"}); },
    iconset(d, P) { text(d.text || "★", P[0].x, P[0].y, {size: 14 + d.w * 6, align: "center", base: "middle", col: d.col}); },
    atext(d, P) { text(d.text || T("Текст"), P[0].x, P[0].y, {col: d.col, size: 10 + d.w * 2, base: "middle", bg: "rgba(30,34,45,.55)"}); },
    image(d, P) {
      const [a, b] = P; if (!b) return; const x = Math.min(a.x, b.x), y = Math.min(a.y, b.y), w = Math.abs(b.x - a.x), h = Math.abs(b.y - a.y);
      const im = d.img && (IMG[d.id] = IMG[d.id] || Object.assign(new Image(), {src: d.img, onload: () => { dirty = true; }}));
      if (im && im.complete && im.naturalWidth) ctx.drawImage(im, x, y, w, h); else { stroke(d.col, 1, "d"); ctx.strokeRect(x, y, w, h); }
      if (HT) HT.push({k: "r", x, y, w, h});
    },
    alert(d, P) { R.h(Object.assign({}, d, {col: "#ff9800", ls: "d"}), P); }
  };
  ["impulse", "corr", "etri", "dbl", "trip"].forEach(k => R[k] = R.wave);
  R.ruler = R.measure;
  const IMG = {};
  function smooth(P) {
    const pp = P.filter(Boolean); if (pp.length < 2) return;
    ctx.beginPath(); ctx.moveTo(pp[0].x, pp[0].y);
    for (let i = 1; i < pp.length - 1; i++) ctx.quadraticCurveTo(pp[i].x, pp[i].y, (pp[i].x + pp[i + 1].x) / 2, (pp[i].y + pp[i + 1].y) / 2);
    ctx.lineTo(pp[pp.length - 1].x, pp[pp.length - 1].y); ctx.stroke();
    if (HT) for (let i = 1; i < pp.length; i++) HT.push({k: "s", a: pp[i - 1], b: pp[i]});
  }
  function bezHit(c) {
    if (!HT) return; let prev = c[0];
    for (let i = 1; i <= 24; i++) { const t = i / 24, u = 1 - t;
      const q = c.length === 3 ? {x: u * u * c[0].x + 2 * u * t * c[1].x + t * t * c[2].x, y: u * u * c[0].y + 2 * u * t * c[1].y + t * t * c[2].y}
        : {x: u * u * u * c[0].x + 3 * u * u * t * c[1].x + 3 * u * t * t * c[2].x + t * t * t * c[3].x, y: u * u * u * c[0].y + 3 * u * u * t * c[1].y + 3 * u * t * t * c[2].y + t * t * t * c[3].y};
      HT.push({k: "s", a: prev, b: q}); prev = q; }
  }
  function arrowMark(d, a, dir) {
    const s = 6 + d.w * 2, y0 = a.y + dir * 4, pts = [{x: a.x, y: y0}, {x: a.x + s * 1.4, y: y0 + dir * s * 1.4}, {x: a.x + s * 0.5, y: y0 + dir * s * 1.4},
      {x: a.x + s * 0.5, y: y0 + dir * s * 3}, {x: a.x - s * 0.5, y: y0 + dir * s * 3}, {x: a.x - s * 0.5, y: y0 + dir * s * 1.4}, {x: a.x - s * 1.4, y: y0 + dir * s * 1.4}];
    fillPoly(pts, d.col, 1);
    if (d.text) text(d.text, a.x, y0 + dir * (s * 3 + 4), {col: d.col, size: 12, align: "center", base: dir > 0 ? "top" : "bottom", hit: false});
  }
  function posTool(d, P, dir) {
    const [e, t, s] = P; if (!t || !s) return;
    const x1 = e.x, x2 = Math.max(t.x, x1 + 10), pe = d.pts[0].p, pt = d.pts[1].p, ps = d.pts[2].p;
    fillPoly([{x: x1, y: e.y}, {x: x2, y: e.y}, {x: x2, y: t.y}, {x: x1, y: t.y}], "#089981", 0.22);
    fillPoly([{x: x1, y: e.y}, {x: x2, y: e.y}, {x: x2, y: s.y}, {x: x1, y: s.y}], "#f23645", 0.22);
    stroke("#9598a1", 1, "s"); seg({x: x1, y: e.y}, {x: x2, y: e.y});
    const rr = Math.abs(pt - pe) / Math.abs(pe - ps || 1), mx = (x1 + x2) / 2;
    text(`${T("Цель")}: ${pf(pt)} (${((pt - pe) / pe * 100).toFixed(2)}%)`, mx, t.y + (dir > 0 ? -4 : 4), {bg: "#089981", size: 11, align: "center", base: dir > 0 ? "bottom" : "top", hit: false});
    text(`${T("Стоп")}: ${pf(ps)} (${((ps - pe) / pe * 100).toFixed(2)}%)`, mx, s.y + (dir > 0 ? 4 : -4), {bg: "#f23645", size: 11, align: "center", base: dir > 0 ? "top" : "bottom", hit: false});
    text(`${dir > 0 ? "Long" : "Short"} · R/R ${rr.toFixed(2)}`, mx, e.y, {bg: "rgba(30,34,45,.9)", size: 11, align: "center", base: "middle", hit: false});
  }
  function vprofile(d, P, t1, t2) {
    const B = G.B; if (!B.length) return;
    const i0 = Math.max(0, Math.round(tToL(t2 ? Math.min(t1, t2) : t1))), i1 = t2 ? Math.min(B.length - 1, Math.round(tToL(Math.max(t1, t2)))) : B.length - 1;
    if (i1 <= i0) return;
    let lo = Infinity, hi = -Infinity; for (let i = i0; i <= i1; i++) { lo = Math.min(lo, B[i].low); hi = Math.max(hi, B[i].high); }
    const N = 24, h = (hi - lo) / N || 1, up = new Array(N).fill(0), dn = new Array(N).fill(0);
    for (let i = i0; i <= i1; i++) {
      const q = B[i], a = Math.max(0, Math.floor((q.low - lo) / h)), b = Math.min(N - 1, Math.floor((q.high - lo) / h)), v = q.volume / (b - a + 1);
      for (let k = a; k <= b; k++) (q.close >= q.open ? up : dn)[k] += v;
    }
    const tot = up.map((v, k) => v + dn[k]), mx = Math.max(...tot) || 1, poc = tot.indexOf(mx);
    const order = tot.map((v, k) => k).sort((x, y) => tot[y] - tot[x]); let acc = 0; const sum = tot.reduce((s, v) => s + v, 0), va = new Set();
    for (const k of order) { if (acc >= sum * 0.7) break; va.add(k); acc += tot[k]; }
    const xa = ts().logicalToCoordinate(i0), xb = ts().logicalToCoordinate(i1), wmax = Math.max(30, (xb - xa) * (t2 ? 0.35 : 0.3));
    for (let k = 0; k < N; k++) {
      const y1 = Y(lo + (k + 1) * h), y2 = Y(lo + k * h); if (y1 == null) continue; const hh = Math.max(1, y2 - y1 - 1), wu = up[k] / mx * wmax, wd = dn[k] / mx * wmax, al = va.has(k) ? 0.55 : 0.25;
      ctx.fillStyle = rgba("#2962ff", al); ctx.fillRect(xa, y1, wu, hh); ctx.fillStyle = rgba("#f5c542", al); ctx.fillRect(xa + wu, y1, wd, hh);
    }
    const yp = Y(lo + (poc + 0.5) * h); stroke("#f23645", 1.5, "s"); seg({x: xa, y: yp}, {x: t2 ? xb : W, y: yp}, false);
    stroke("#787b86", 1, "d"); seg({x: xa, y: Y(hi)}, {x: xa, y: Y(lo)}); if (t2) seg({x: xb, y: Y(hi)}, {x: xb, y: Y(lo)});
    if (HT) HT.push({k: "r", x: xa, y: Y(hi), w: Math.max(wmax, (t2 ? xb - xa : 20)), h: Y(lo) - Y(hi)});
  }

  /* ---------- общий цикл отрисовки ---------- */
  function drawOne(d, ghost) {
    const P = d.pts.map(XY); if (!P.length || P.some(q => q.x == null || q.y == null)) return;
    HT = ghost ? null : []; ctx.save();
    if (ghost) ctx.globalAlpha = 0.85;
    try { (R[d.type] || R.trend)(d, P); } catch (e) {}
    ctx.restore();
    if (!ghost) hits.set(d.id, HT);
    HT = null;
    if ((sel === d || ghost) && !isFree(d.type)) {
      const hp = handles(d);
      ctx.setLineDash([]); ctx.lineWidth = 2;
      for (const q of hp) { if (q.x == null) continue; ctx.fillStyle = THEMES[isLight() ? "light" : "dark"].bg; ctx.strokeStyle = "#2962ff"; ctx.beginPath(); ctx.arc(q.x, q.y, 7, 0, 7); ctx.fill(); ctx.stroke(); }
    }
  }
  const isFree = t => t === "brush" || t === "marker";
  function handles(d) {
    if (d.type === "h" || d.type === "alert") return [{x: Math.min(W - 70, Math.max(20, W / 2)), y: Y(d.pts[0].p), i: 0}];
    return d.pts.map((q, i) => Object.assign(XY(q), {i}));
  }
  function draw() {
    if (!G.main || !G.B.length) { ctx.clearRect(0, 0, cv.width, cv.height); return; }
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0); ctx.clearRect(0, 0, W, H);
    hits.clear();
    if (!opt.hide) for (const d of list) if (d !== tmp) drawOne(d, false);
    if (tmp) drawOne(tmp, true);
  }
  function frame() {
    if ($("#pgChart").classList.contains("on") && G.main && G.chart) {
      size();
      const r = ts().getVisibleLogicalRange(), lp = G.B.length ? G.B[G.B.length - 1].close : 0;
      const s = [W, H, r && r.from.toFixed(3), r && r.to.toFixed(3), Y(lp), Y(lp * 1.01), list.length].join("|");
      if (dirty || s !== sig) { sig = s; dirty = false; draw(); }
    }
    requestAnimationFrame(frame);
  }

  /* ---------- попадание пальцем ---------- */
  function segDist(p, a, b) {
    const dx = b.x - a.x, dy = b.y - a.y, L = dx * dx + dy * dy; let t = L ? ((p.x - a.x) * dx + (p.y - a.y) * dy) / L : 0; t = Math.max(0, Math.min(1, t));
    return Math.hypot(p.x - a.x - t * dx, p.y - a.y - t * dy);
  }
  function inPoly(p, pts) { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const a = pts[i], b = pts[j]; if ((a.y > p.y) !== (b.y > p.y) && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) c = !c; } return c; }
  function hitTest(p) {
    let best = null, bd = 14;
    for (let i = list.length - 1; i >= 0; i--) {
      const d = list[i], hs = hits.get(d.id); if (!hs) continue;
      for (const h of hs) {
        let dd = Infinity;
        if (h.k === "s") dd = segDist(p, h.a, h.b);
        else if (h.k === "p") dd = inPoly(p, h.pts) ? 6 : Infinity;
        else if (h.k === "r") dd = p.x >= h.x - 4 && p.x <= h.x + h.w + 4 && p.y >= h.y - 4 && p.y <= h.y + h.h + 4 ? 5 : Infinity;
        else if (h.k === "c") dd = Math.hypot(p.x - h.x, p.y - h.y) <= h.r ? 5 : Infinity;
        if (dd < bd) { bd = dd; best = d; }
      }
    }
    return best;
  }

  /* ---------- создание рисунка ---------- */
  function snap(x, y, type) {
    if ((type || tool) === "atext") return {fx: x / W, fy: y / H};
    let pt = toPt(x, y);
    if (opt.mag && opt.mag !== "off" && G.B.length) {
      const l = Math.round(ts().coordinateToLogical(x)); const q = G.B[Math.max(0, Math.min(G.B.length - 1, l))];
      if (l >= 0 && l < G.B.length) {
        const c = [q.open, q.high, q.low, q.close].map(p => ({p, dy: Math.abs(Y(p) - y)})).sort((a, b) => a.dy - b.dy)[0];
        if (opt.mag === "strong" || c.dy < 28) pt = {t: q.time, p: c.p};
      }
    }
    return pt;
  }
  function newDraw(type) {
    const o = topt(type);
    const last = LS.get("drStyle:" + type, {});
    return {id: uid(), type, pts: [], col: last.col || o.col || "#2962ff", w: last.w || o.w || 2, ls: last.ls || "s", fill: last.fill != null ? last.fill : !!o.fill, text: ""};
  }
  function setTool(type) {
    tool = type; tmp = null; sel = null; drag = null;
    cv.style.pointerEvents = type ? "auto" : "none";
    $("#drawBtn").classList.toggle("on", !!type);
    hint(); bar(); dirty = true;
  }
  function hint() {
    const h = $("#drawHint");
    if (!tool) { h.classList.remove("on"); return; }
    if (tool === "eraser") { h.innerHTML = `${esc(T("Ластик"))} · ${esc(T("Коснитесь рисунка, чтобы удалить"))} <button id="drCancel">✕</button>`; h.classList.add("on"); $("#drCancel").onclick = e => { e.stopPropagation(); setTool(null); }; return; }
    const [n, , name] = tdef(tool), got = tmp && tmp._n ? tmp._n : 0;
    const step = n > 1 ? ` · ${T("Точка")} ${Math.min(got + 1, n)} ${T("из")} ${n}` : n === 0 ? ` · ${T("Нарисуйте пальцем")}` : "";
    h.innerHTML = `${esc(T(name))}${step} ${n < 0 && got > 1 ? `<button id="drDone">${esc(T("Готово"))}</button>` : ""}<button id="drCancel">✕</button>`;
    h.classList.add("on");
    $("#drCancel").onclick = e => { e.stopPropagation(); setTool(null); };
    const dn = $("#drDone"); if (dn) dn.onclick = e => { e.stopPropagation(); finish(); };
  }
  function finish() {
    if (!tmp) return;
    const n = tdef(tmp.type)[0];
    if (n < 0) { tmp.pts = tmp.pts.slice(0, tmp._n || tmp.pts.length); if (tmp.pts.length < 2) { tmp = null; hint(); dirty = true; return; } }
    const d = tmp; tmp = null; delete d._n;
    if (d.type === "alert") { createAlert(d.pts[0].p); if (!opt.keep) setTool(null); else hint(); return; }
    if (d.type === "long" || d.type === "short") posDefaults(d);
    if (d.type === "ruler") { d.temp = true; list.push(d); setTool(null); dirty = true; setTimeout(() => { list = list.filter(x => x !== d); dirty = true; }, 9000); return; }
    list.push(d); save();
    const after = () => { if (opt.keep) { hint(); } else { setTool(null); sel = d; cv.style.pointerEvents = "auto"; bar(); dirty = true; } };
    const drop = () => { list = list.filter(x => x !== d); save(); setTool(null); };
    if (topt(d.type).pick) pickGlyph(topt(d.type).pick, g => { if (!g) return drop(); d.text = g; save(); after(); });
    else if (d.type === "image") pickImage(url => { if (!url) return drop(); d.img = url; save(); after(); });
    else if (topt(d.type).txt && !d.text) askText("", s => { d.text = s; save(); after(); }); else after();
  }
  function posDefaults(d) {
    const e = d.pts[0], dir = d.type === "long" ? 1 : -1, n = G.B.length;
    let lo = Infinity, hi = -Infinity; const r = ts().getVisibleLogicalRange();
    for (let i = Math.max(0, Math.floor(r.from)); i < Math.min(n, Math.ceil(r.to)); i++) { lo = Math.min(lo, G.B[i].low); hi = Math.max(hi, G.B[i].high); }
    const rg = (isFinite(hi - lo) ? hi - lo : e.p * 0.02) || e.p * 0.02, tEnd = e.t + 25 * tfs();
    d.pts = [e, {t: tEnd, p: e.p + dir * rg * 0.16}, {t: tEnd, p: e.p - dir * rg * 0.08}];
  }
  function createAlert(p) {
    const prc = +p.toFixed(dg());
    S.alerts.unshift({id: "a" + Date.now(), sym: S.sym, price: prc, cond: "cross", on: true, created: Date.now()});
    save_alerts();
  }
  function save_alerts() { LS.set("alerts", S.alerts); renderAlertLines(); syncTickers(); toast(T("Алерт создан")); }

  /* ---------- жесты на холсте ---------- */
  let down = null;
  const pos = e => { const r = cv.getBoundingClientRect(); return {x: e.clientX - r.left, y: e.clientY - r.top}; };
  cv.addEventListener("pointerdown", e => {
    e.preventDefault(); cv.setPointerCapture(e.pointerId);
    const p = pos(e); down = {p, moved: false};
    if (tool === "eraser") { const d = hitTest(p); if (d) { list = list.filter(x => x !== d); save(); toast(T("Рисунок удалён")); } down = null; return; }
    if (tool) {
      const n = tdef(tool)[0];
      if (!tmp) tmp = newDraw(tool);
      const pt = snap(p.x, p.y);
      if (n === 0) { tmp.pts = [pt]; }
      else { if (!tmp.pts.length) tmp.pts.push(pt, Object.assign({}, pt)); else tmp.pts[tmp.pts.length - 1] = pt; }
      dirty = true; return;
    }
    if (sel) {
      const hp = handles(sel).find(q => q.x != null && Math.hypot(q.x - p.x, q.y - p.y) < 22);
      if (sel.lock || opt.lockAll) { const o = hitTest(p); if (!o) deselect(); else if (o !== sel) { sel = o; bar(); dirty = true; } return; }
      if (hp) { drag = {h: hp.i, p0: p, orig: JSON.parse(JSON.stringify(sel.pts))}; return; }
      if (hitTest(p) === sel) { drag = {all: true, p0: p, orig: JSON.parse(JSON.stringify(sel.pts))}; return; }
      const other = hitTest(p); if (other) { sel = other; bar(); dirty = true; return; }
      deselect();
    }
  });
  cv.addEventListener("pointermove", e => {
    if (!down) return; const p = pos(e);
    if (Math.hypot(p.x - down.p.x, p.y - down.p.y) > 6) down.moved = true;
    if (tool && tmp) {
      const n = tdef(tool)[0];
      if (n === 0) { const pt = toPt(p.x, p.y); tmp.pts.push(pt); }
      else tmp.pts[tmp.pts.length - 1] = snap(p.x, p.y);
      dirty = true; return;
    }
    if (drag && sel) {
      if (drag.all) {
        const dx = p.x - drag.p0.x, dy = p.y - drag.p0.y;
        sel.pts = drag.orig.map(q => { const o = XY(q); return o.x == null ? q : q.fx != null ? {fx: (o.x + dx) / W, fy: (o.y + dy) / H} : toPt(o.x + dx, o.y + dy); });
      } else {
        const pt = snap(p.x, p.y, sel.type);
        if (sel.type === "h" || sel.type === "alert") sel.pts[0] = {t: sel.pts[0].t, p: pt.p};
        else { sel.pts[drag.h] = pt; if ((sel.type === "long" || sel.type === "short") && drag.h > 0) { const o = drag.h === 1 ? 2 : 1; sel.pts[o] = {t: pt.t, p: sel.pts[o].p}; } }
      }
      dirty = true;
    }
  });
  const up = e => {
    if (!down) return; const moved = down.moved; down = null;
    if (tool && tmp) {
      const n = tdef(tool)[0];
      if (n === 0) { if (tmp.pts.length > 1) finish(); else tmp = null; dirty = true; return; }
      if (n === 1) { tmp.pts = [tmp.pts[0]]; finish(); return; }
      tmp._n = tmp._n == null ? (moved ? 2 : 1) : tmp._n + 1;          // сколько точек уже поставлено
      if (n > 0 && tmp._n >= n) { tmp.pts = tmp.pts.slice(0, n); finish(); return; }
      if (tmp.pts.length <= tmp._n) tmp.pts.push(Object.assign({}, tmp.pts[tmp.pts.length - 1]));  // «живая» точка для следующего касания
      hint(); dirty = true; return;
    }
    if (drag) { drag = null; save(); }
  };
  cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);

  /* выбор рисунка касанием графика */
  function onChartClick(p) {
    if (tool || !p || !p.point) return;
    const d = hitTest(p.point);
    if (d) { sel = d; cv.style.pointerEvents = "auto"; bar(); dirty = true; if (d.type === "pin") { d.show = !d.show; } }
  }
  function deselect() { sel = null; drag = null; cv.style.pointerEvents = "none"; bar(); dirty = true; }

  /* ---------- панель выбранного рисунка ---------- */
  const PAL = ["#2962ff", "#089981", "#f23645", "#ff9800", "#f5c542", "#9c27b0", "#00bcd4", "#e91e63", "#4caf50", "#ffffff", "#787b86", "#000000"];
  const barEl = document.createElement("div"); barEl.id = "drBar"; wrap.appendChild(barEl);
  function bar() {
    if (!sel || tool) { barEl.classList.remove("on"); return; }
    const d = sel, o = topt(d.type);
    barEl.innerHTML = `<button data-a="col"><i style="background:${d.col}"></i></button>
      <button data-a="w">${d.w}px</button>
      <button data-a="ls">${d.ls === "d" ? "╌" : d.ls === "o" ? "┈" : "—"}</button>
      ${o.fill !== undefined ? `<button data-a="fill" class="${d.fill ? "on" : ""}">▧</button>` : ""}
      ${o.txt || d.type === "rect" || d.type === "arrowup" || d.type === "arrowdn" ? `<button data-a="txt">T</button>` : ""}
      <button data-a="dup">⧉</button><button data-a="lock" class="${d.lock ? "on" : ""}">${d.lock ? "🔒" : "🔓"}</button>
      <button data-a="del" style="color:var(--dn)">🗑</button><button data-a="x">✕</button>
      <div id="drPal" style="display:none">${PAL.map(c => `<b data-c="${c}" style="background:${c}"></b>`).join("")}</div>`;
    barEl.classList.add("on");
    const style = () => LS.set("drStyle:" + d.type, {col: d.col, w: d.w, ls: d.ls, fill: d.fill});
    $$("button", barEl).forEach(b => b.onclick = ev => {
      ev.stopPropagation(); const a = b.dataset.a;
      if (a === "col") { const p = $("#drPal", barEl); p.style.display = p.style.display === "none" ? "flex" : "none"; return; }
      if (a === "w") d.w = d.w >= 4 ? 1 : d.w + 1;
      if (a === "ls") d.ls = d.ls === "s" ? "d" : d.ls === "d" ? "o" : "s";
      if (a === "fill") d.fill = !d.fill;
      if (a === "txt") return askText(d.text, s => { d.text = s; save(); bar(); });
      if (a === "dup") { const c = JSON.parse(JSON.stringify(d)); c.id = uid(); c.lock = false; c.pts = c.pts.map(q => { const o2 = XY(q); return o2.x == null ? q : toPt(o2.x + 24, o2.y + 24); }); list.push(c); sel = c; }
      if (a === "lock") d.lock = !d.lock;
      if (a === "del") { list = list.filter(x => x !== d); save(); deselect(); toast(T("Рисунок удалён")); return; }
      if (a === "x") { deselect(); return; }
      if (a === "w" || a === "ls" || a === "fill") style();
      save(); bar();
    });
    $$("#drPal b", barEl).forEach(b => b.onclick = ev => { ev.stopPropagation(); d.col = b.dataset.c; style(); save(); bar(); });
  }
  function askText(def, cb) {
    const b = sheet(T("Введите текст"), `<div class="card"><textarea id="drTxt" rows="3" style="width:100%;font:inherit;color:var(--tx);background:#0c0c0c;border:1px solid var(--bd);border-radius:8px;padding:10px">${esc(def || "")}</textarea>
      <div class="btns"><button class="pri" id="drTxtOk">${esc(T("Готово"))}</button></div></div>`);
    $("#drTxtOk", b).onclick = () => { const s = $("#drTxt", b).value; closeSheet(); cb(s); };
    setTimeout(() => $("#drTxt", b).focus(), 250);
  }

  /* ---------- выбор эмодзи, стикера, иконки и изображения ---------- */
  const GLYPHS = {
    emoji: "😀 😂 😍 😎 🤔 😱 😭 😡 🤑 🥳 🙏 👍 👎 👀 💪 🔥 💰 💎 🚀 🌙 ⭐ ⚡ ❤️ ✅ ❌ ⚠️ 📈 📉 🎯 🐂 🐻 🐳".split(" "),
    sticker: "🚀 🔥 💰 💎 🐂 🐻 🐳 🎯 🏆 🤑 😱 💥 🌕 📈 📉 🙌 ⏰ 🧠 🔔 🎉".split(" "),
    icon: "★ ♥ ✓ ✕ ▲ ▼ ● ■ ◆ ⚑ ⚡ ☀ ☾ ✚ ✖ ⬆ ⬇ ➜ ⬅ ✦".split(" ")
  };
  function pickGlyph(kind, cb) {
    let done = false;
    const b = sheet(T(kind === "emoji" ? "Эмодзи" : kind === "sticker" ? "Стикеры" : "Иконки"),
      `<div class="pick">${GLYPHS[kind].map(g => `<button data-g="${g}" ${kind === "icon" ? 'style="font-size:24px;color:#f23645"' : ""}>${g}</button>`).join("")}</div>`, () => { if (!done) cb(null); });
    $$("[data-g]", b).forEach(x => x.onclick = () => { done = true; closeSheet(); cb(x.dataset.g); });
  }
  function pickImage(cb) {
    const inp = document.createElement("input"); inp.type = "file"; inp.accept = "image/*";
    let got = false;
    inp.onchange = () => {
      const f = inp.files && inp.files[0]; if (!f) return cb(null); got = true;
      const im = new Image(); im.onload = () => {
        const k = Math.min(1, 600 / Math.max(im.width, im.height)), c = document.createElement("canvas");
        c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
        URL.revokeObjectURL(im.src); cb(c.toDataURL("image/jpeg", 0.82));
      };
      im.onerror = () => cb(null); im.src = URL.createObjectURL(f);
    };
    window.addEventListener("focus", () => setTimeout(() => { if (!got && !inp.files.length) cb(null); }, 800), {once: true});
    inp.click();
  }

  /* ---------- меню «Объекты рисования» как в TradingView ---------- */
  const TABS = [["fav", "Избранное"], ["tools", "Инструменты"], ["lines", "Линии тренда"], ["fib", "Ганн и Фибоначчи"], ["pat", "Паттерны"],
    ["meas", "Измерение и прогнозирование"], ["shapes", "Геометрические фигуры"], ["text", "Комментирование"], ["vis", "Визуальные элементы"]];
  const ORDER = {
    lines: ["trend", "ray", "info", "ext", "angle", "h", "hray", "v", "cross", "channel", "regr", "flat", "dchan", "pitch", "schiff", "mschiff", "ipitch", "vilka"],
    fib: ["fib", "fibext", "fibch", "fibtime", "fibfan", "fibtrtime", "fibcirc", "fibspiral", "fibarc", "fibwedge", "pitchfan", "gannbox", "gannfix", "gannsq", "gannfan"],
    pat: ["xabcd", "cypher", "hs", "abcd", "tripat", "threed", "impulse", "corr", "etri", "dbl", "trip", "cyclic", "tcycle", "sine"],
    meas: ["long", "short", "forecast", "barpat", "projection", "sector", "avwap", "vpfix", "vpanc", "prange", "drange", "measure"],
    shapes: ["brush", "marker", "arrowmk", "arrow", "arrowup", "arrowdn", "rect", "rrect", "path", "circle", "ellipse", "poly", "triangle", "arc", "curve", "dcurve"],
    text: ["text", "atext", "note", "pnote", "pin", "table", "callout", "comment", "plabel", "signpost", "flag", "image", "alert"],
    vis: ["emoji", "sticker", "iconset"]
  };
  const magName = () => T(opt.mag === "strong" ? "Сильный магнит" : opt.mag === "off" ? "Магнит выключен" : "Слабый магнит");
  function toolTiles() {
    return [
      ["ruler", "Линейка", () => { closeSheet(); setTool("ruler"); }],
      ["eraser", "Ластик", () => { closeSheet(); setTool("eraser"); }],
      ["keep", "Продолжить рисовать", () => { opt.keep = !opt.keep; saveOpt(); }, opt.keep],
      ["hide", "Скрыть объекты рисования", () => { opt.hide = !opt.hide; saveOpt(); dirty = true; }, opt.hide],
      ["lockall", "Зафиксировать все объекты", () => { opt.lockAll = !opt.lockAll; saveOpt(); }, opt.lockAll],
      ["magnet", magName(), () => { opt.mag = opt.mag === "weak" ? "strong" : opt.mag === "strong" ? "off" : "weak"; saveOpt(); }, opt.mag !== "off", 1],
      ["trash", "Удалить все объекты", () => { if (list.length && confirm(T("Удалить все рисунки на этом графике?"))) { list = []; save(); deselect(); closeSheet(); } }, null, 0, !list.length],
      ["zoomin", "Увеличить масштаб", () => { const t = ts(); t.applyOptions({barSpacing: Math.min(60, (t.options().barSpacing || 7) * 1.4)}); }],
      ["zoomout", "Уменьшить масштаб", () => { const t = ts(); t.applyOptions({barSpacing: Math.max(1, (t.options().barSpacing || 7) / 1.4)}); }]
    ];
  }
  function menu() {
    if (tool) { setTool(null); return; }
    let tab = LS.get("drTab", "lines"), q = "";
    const b = sheet(T("Объекты рисования"), `<div class="dsrch"><svg class="i" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg><input id="dQ" placeholder="${esc(T("Поиск"))}" autocomplete="off"></div>
      <div class="dtabs" id="dTabs">${TABS.map(([k, n]) => `<button data-tab="${k}" class="${k === tab ? "on" : ""}">${esc(T(n))}</button>`).join("")}</div><div class="scr" id="dScr"></div>`);
    b.className = "sb dsb"; b.style.height = "78vh";
    const tile = (k, label, on, dis, extra) => `<button data-k="${k}" class="${extra != null ? "tg" + (on ? " on" : "") : ""}${dis ? " dis" : ""}">${ICN[k] || ICN.trend}<span>${esc(label)}</span>${LS.get("drFav2", []).includes(k) ? '<i class="fv">★</i>' : ""}</button>`;
    const draw = () => {
      const sc = $("#dScr", b), fav = LS.get("drFav2", []);
      $("#dTabs", b).style.display = q ? "none" : "";
      let keys;
      if (q) { const s = q.toLowerCase(); keys = Object.keys(TL).filter(k => TL[k][1] !== "X" && (T(TL[k][2]).toLowerCase().includes(s) || TL[k][2].toLowerCase().includes(s))); }
      else if (tab === "tools") {
        const tt = toolTiles();
        sc.innerHTML = `<div class="dgrid">${tt.map(([k, n, , on, , dis], i) => `<button data-i="${i}" class="${i >= 2 && i <= 6 ? "tg" + (on ? " on" : "") : ""}${dis ? " dis" : ""}">${ICN[k]}<span>${esc(T(n))}</span></button>`).join("")}</div>`;
        $$("[data-i]", sc).forEach(x => x.onclick = () => { tt[+x.dataset.i][2](); if ($("#sheet").classList.contains("on")) draw(); });
        return;
      } else if (tab === "fav") keys = fav.filter(k => TL[k]);
      else keys = ORDER[tab] || [];
      if (!keys.length) {
        sc.innerHTML = tab === "fav" && !q ? `<div class="ghost">${'<svg viewBox="0 0 120 120"><path d="M30 104V48a30 30 0 0 1 60 0v56l-10-8-10 8-10-8-10 8-10-8z"/><path d="M30 64 14 76M90 64l16 12"/><circle cx="50" cy="52" r="2.5"/><circle cx="70" cy="52" r="2.5"/></svg>'}<b>${esc(T("В избранном ничего нет"))}</b>${esc(T("Просмотрите категории выше и добавьте нужное в избранное с помощью долгого нажатия."))}</div>`
          : `<div class="empty">${esc(T("Ничего не найдено"))}</div>`;
        return;
      }
      sc.innerHTML = `<div class="dgrid">${keys.map(k => tile(k, T(TL[k][2]))).join("")}</div>`;
      $$("[data-k]", sc).forEach(x => longPress(x, () => {
        const f = LS.get("drFav2", []), k = x.dataset.k, i = f.indexOf(k);
        if (i >= 0) f.splice(i, 1); else f.push(k);
        LS.set("drFav2", f); toast(i >= 0 ? T("Удалено из избранного") : T("Добавлено в избранное")); draw();
      }, () => { closeSheet(); setTool(x.dataset.k); }));
    };
    $$("[data-tab]", b).forEach(x => x.onclick = () => { tab = x.dataset.tab; LS.set("drTab", tab); $$("[data-tab]", b).forEach(y => y.classList.toggle("on", y === x)); draw(); });
    $("#dQ", b).oninput = e => { q = e.target.value.trim(); draw(); };
    draw();
    const on = $("#dTabs .on", b); if (on) on.scrollIntoView({inline: "center", block: "nearest"});
  }

  /* ---------- загрузка по инструменту, перенос старых рисунков ---------- */
  function load() {
    list = LS.get(key(), null);
    if (!list) {
      list = [];
      const old = LS.get("draw:" + S.sym, []);
      old.forEach(o => {
        if (o.t === "h") list.push(Object.assign(newDraw("h"), {pts: [{t: 0, p: o.p}], col: o.c || "#2962ff", w: 1}));
        else if (o.t === "tr") list.push(Object.assign(newDraw("trend"), {pts: [o.a, o.b]}));
      });
      if (old.length) LS.set(key(), list);
    }
    sel = null; tmp = null; drag = null; if (!tool) cv.style.pointerEvents = "none"; bar(); dirty = true;
  }
  G.chart.subscribeClick(onChartClick);
  load();
  requestAnimationFrame(frame);
  return {menu, load, dirty: () => { dirty = true; }, cancel: () => setTool(null)};
})();
