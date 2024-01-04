/*!
  * Native JavaScript for Bootstrap v4.1.0alpha2 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2022 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (e, t) {
  typeof exports == "object" && typeof module != "undefined" ? module.exports = t() : typeof define == "function" && define.amd ? define(t) : (e = typeof globalThis != "undefined" ? globalThis : e || self,
    e.BSN = t())
}
)(this, function () {
  "use strict";
  const v = "click"
    , St = "transitionend"
    , Ri = "transitionDelay"
    , Vt = "transitionProperty";
  function b(e, t) {
    const n = getComputedStyle(e);
    return t in n ? n[t] : ""
  }
  function fi(e) {
    const t = b(e, Vt)
      , n = b(e, Ri)
      , o = n.includes("ms") ? 1 : 1e3
      , s = t && t !== "none" ? parseFloat(n) * o : 0;
    return Number.isNaN(s) ? 0 : s
  }
  const di = "transitionDuration";
  function Q(e) {
    const t = b(e, Vt)
      , n = b(e, di)
      , o = n.includes("ms") ? 1 : 1e3
      , s = t && t !== "none" ? parseFloat(n) * o : 0;
    return Number.isNaN(s) ? 0 : s
  }
  function d(e, t, n, s) {
    const o = s || !1;
    e.addEventListener(t, n, o)
  }
  function f(e, t, n, s) {
    const o = s || !1;
    e.removeEventListener(t, n, o)
  }
  function h(e, t) {
    let n = 0;
    const s = new Event(St)
      , o = Q(e)
      , i = fi(e);
    if (o) {
      const a = s => {
        s.target === e && (t.apply(e, [s]),
          f(e, St, a),
          n = 1)
      }
        ;
      d(e, St, a),
        setTimeout(() => {
          n || e.dispatchEvent(s)
        }
          , o + i + 17)
    } else
      t.apply(e, [s])
  }
  function l(e) {
    return e instanceof HTMLElement ? e.ownerDocument : e instanceof Window ? e.document : window.document
  }
  const X = [Document, Node, Element, HTMLElement]
    , li = [Element, HTMLElement];
  function r(e, t) {
    const n = typeof e == "string"
      , s = t && X.some(e => t instanceof e) ? t : l();
    return !n && [...li].some(t => e instanceof t) ? e : n ? s.querySelector(e) : null
  }
  function g(e, t) {
    return e ? e.closest(t) || g(e.getRootNode().host, t) : null
  }
  const p = (e, t) => Object.assign(e, t);
  function e(e, t) {
    return e.classList.contains(t)
  }
  function o(e, t) {
    e.classList.remove(t)
  }
  const i = (e, t) => e.dispatchEvent(t)
    , Z = new Map
    , J = {
      set: (e, t, n) => {
        const s = r(e);
        if (!s)
          return;
        Z.has(t) || Z.set(t, new Map);
        const o = Z.get(t);
        o.set(s, n)
      }
      ,
      getAllFor: e => {
        const t = Z.get(e);
        return t || null
      }
      ,
      get: (e, t) => {
        const n = r(e)
          , s = J.getAllFor(t)
          , o = n && s && s.get(n);
        return o || null
      }
      ,
      remove: (e, t) => {
        const s = r(e)
          , n = Z.get(t);
        if (!n || !s)
          return;
        n.delete(s),
          n.size === 0 && Z.delete(t)
      }
    }
    , j = (e, t) => J.get(e, t);
  function a(e, t) {
    const n = new CustomEvent(e, {
      cancelable: !0,
      bubbles: !0
    });
    return t instanceof Object && p(n, t),
      n
  }
  const x = "fade"
    , t = "show"
    , Me = "data-bs-dismiss"
    , Ae = "alert"
    , jn = "Alert"
    , se = (e, t) => e.getAttribute(t);
  function xn(e) {
    return e === "true" || e !== "false" && (Number.isNaN(+e) ? e === "" || e === "null" ? null : e : +e)
  }
  const ge = e => Object.keys(e)
    , re = e => e.toLowerCase();
  function Zo(e, t, n, s) {
    const a = {
      ...e.dataset
    }
      , o = {}
      , i = {}
      , r = "title";
    return ge(a).forEach(e => {
      const t = s && e.includes(s) ? e.replace(s, "").replace(/[A-Z]/, e => re(e)) : e;
      i[t] = xn(a[e])
    }
    ),
      ge(n).forEach(e => {
        n[e] = xn(n[e])
      }
      ),
      ge(t).forEach(s => {
        s in n ? o[s] = n[s] : s in i ? o[s] = i[s] : o[s] = s === r ? se(e, r) : t[s]
      }
      ),
      o
  }
  var qo = "4.1.0alpha2", wt;
  const Pn = qo;
  class k {
    constructor(e, t) {
      const n = this
        , s = r(e);
      if (!s)
        throw Error(`${n.name} Error: "${e}" is not a valid selector.`);
      n.options = {};
      const o = J.get(s, n.name);
      o && o.dispose(),
        n.element = s,
        n.defaults && Object.keys(n.defaults).length && (n.options = Zo(s, n.defaults, t || {}, "bs")),
        J.set(s, n.name, n)
    }
    get version() {
      return Pn
    }
    get name() {
      return this.constructor.name
    }
    get defaults() {
      return this.constructor.defaults
    }
    dispose() {
      const e = this;
      J.remove(e.element, e.name),
        ge(e).forEach(t => {
          e[t] = null
        }
        )
    }
  }
  const rs = `.${Ae}`
    , Co = `[${Me}="${Ae}"]`
    , cs = e => j(e, jn)
    , _o = e => new ze(e)
    , Os = a(`close.bs.${Ae}`)
    , uo = a(`closed.bs.${Ae}`);
  function As(e) {
    const { element: t } = e;
    ft(e),
      i(t, uo),
      e.dispose(),
      t.remove()
  }
  function ft(e, t) {
    const s = t ? d : f
      , { dismiss: n } = e;
    n && s(n, v, e.close)
  }
  class ze extends k {
    constructor(e) {
      super(e);
      const t = this
        , { element: n } = t;
      t.dismiss = r(Co, n),
        ft(t, !0)
    }
    get name() {
      return jn
    }
    close(n) {
      const a = n ? cs(g(this, rs)) : this;
      if (!a)
        return;
      const { element: s } = a;
      if (e(s, t)) {
        if (i(s, Os),
          Os.defaultPrevented)
          return;
        o(s, t),
          e(s, x) ? h(s, () => As(a)) : As(a)
      }
    }
    dispose() {
      ft(this),
        super.dispose()
    }
  }
  p(ze, {
    selector: rs,
    init: _o,
    getInstance: cs
  });
  const Ss = "aria-pressed"
    , m = (e, t, n) => e.setAttribute(t, n);
  function n(e, t) {
    e.classList.add(t)
  }
  const c = "active"
    , L = "data-bs-toggle"
    , oo = "button"
    , Fs = "Button"
    , Ys = `[${L}="${oo}"]`
    , Ln = e => j(e, Fs)
    , Us = e => new ye(e);
  function Vs(e, t) {
    const n = t ? d : f;
    n(e.element, v, e.toggle)
  }
  class ye extends k {
    constructor(t) {
      super(t);
      const n = this
        , { element: s } = n;
      n.isActive = e(s, c),
        m(s, Ss, `${!!n.isActive}`),
        Vs(n, !0)
    }
    get name() {
      return Fs
    }
    toggle(t) {
      t && t.preventDefault();
      const s = t ? Ln(this) : this;
      if (!s)
        return;
      const { element: i } = s;
      if (e(i, "disabled"))
        return;
      s.isActive = e(i, c);
      const { isActive: a } = s
        , r = a ? o : n;
      r(i, c),
        m(i, Ss, a ? "false" : "true")
    }
    dispose() {
      Vs(this),
        super.dispose()
    }
  }
  p(ye, {
    selector: Ys,
    init: Us,
    getInstance: Ln
  });
  const Ke = "mouseenter"
    , it = "mouseleave"
    , qe = "keydown"
    , Ps = "touchmove"
    , Ls = "touchend"
    , Le = "touchstart"
    , Ns = "ArrowLeft"
    , Ds = "ArrowRight";
  function N(e) {
    if (e == null)
      return window;
    if (!(e instanceof Window)) {
      const { ownerDocument: t } = e;
      return t ? t.defaultView || window : window
    }
    return e
  }
  function H(e, t) {
    const { width: o, height: i, top: a, right: c, bottom: l, left: r } = e.getBoundingClientRect();
    let n = 1
      , s = 1;
    if (t && e instanceof HTMLElement) {
      const { offsetWidth: t, offsetHeight: a } = e;
      n = t > 0 ? Math.round(o) / t || 1 : 1,
        s = a > 0 ? Math.round(i) / a || 1 : 1
    }
    return {
      width: o / n,
      height: i / s,
      top: a / s,
      right: c / n,
      bottom: l / s,
      left: r / n,
      x: r / n,
      y: a / s
    }
  }
  function D(e) {
    return l(e).documentElement
  }
  const zs = e => {
    const { top: t, bottom: n } = H(e)
      , { clientHeight: s } = D(e);
    return t <= s && n >= 0
  }
    , W = e => D(e).dir === "rtl";
  function A(e, t) {
    const n = t && X.some(e => t instanceof e) ? t : l();
    return n.querySelectorAll(e)
  }
  function P(e, t) {
    const n = t && X.some(e => t instanceof e) ? t : l();
    return n.getElementsByClassName(e)
  }
  const z = new Map
    , s = {
      set: (e, t, n, s) => {
        const o = r(e);
        if (!o)
          return;
        if (s && s.length) {
          z.has(o) || z.set(o, new Map);
          const e = z.get(o);
          e.set(s, setTimeout(t, n))
        } else
          z.set(o, setTimeout(t, n))
      }
      ,
      get: (e, t) => {
        const s = r(e);
        if (!s)
          return null;
        const n = z.get(s);
        return t && t.length && n && n.get ? n.get(t) || null : n || null
      }
      ,
      clear: (e, t) => {
        const n = r(e);
        if (!n)
          return;
        if (t && t.length) {
          const e = z.get(n);
          e && e.get && (clearTimeout(e.get(t)),
            e.delete(t),
            e.size === 0 && z.delete(n))
        } else
          clearTimeout(z.get(n)),
            z.delete(n)
      }
    }
    , q = e => e.offsetHeight
    , y = {
      passive: !0
    }
    , jt = "data-bs-target"
    , $ = "carousel"
    , _s = "Carousel"
    , js = "data-bs-parent"
    , vo = "data-bs-container";
  function F(e) {
    const t = [jt, js, vo, "href"]
      , n = l(e);
    return t.map(t => {
      const s = se(e, t);
      return s ? t === js ? g(e, s) : r(s, n) : null
    }
    ).filter(e => e)[0]
  }
  const Se = `[data-bs-ride="${$}"]`
    , E = `${$}-item`
    , ct = "data-bs-slide-to"
    , G = "data-bs-slide"
    , I = "paused"
    , ps = {
      pause: "hover",
      keyboard: !1,
      touch: !0,
      interval: 5e3
    }
    , M = e => j(e, _s)
    , yo = e => new Be(e);
  let Re = 0
    , Pe = 0
    , ds = 0;
  const nt = a(`slide.bs.${$}`)
    , tt = a(`slid.bs.${$}`);
  function zo(e) {
    const { index: r, direction: d, element: a, slides: t, options: u } = e;
    if (e.isAnimating && M(a)) {
      const h = et(e)
        , f = d === "left" ? "next" : "prev"
        , m = d === "left" ? "start" : "end";
      n(t[r], c),
        o(t[h], c),
        o(t[r], `${E}-${f}`),
        o(t[r], `${E}-${m}`),
        o(t[h], `${E}-${m}`),
        i(a, tt),
        s.clear(a, G),
        !l(a).hidden && u.interval && !e.isPaused && e.cycle()
    }
  }
  function Yn() {
    const e = this
      , t = M(e);
    t && !t.isPaused && !s.get(e, I) && n(e, I)
  }
  function Kn() {
    const t = this
      , e = M(t);
    e && e.isPaused && !s.get(t, I) && e.cycle()
  }
  function Uo(t) {
    t.preventDefault();
    const n = this
      , o = g(n, Se) || F(n);
    if (!o)
      return;
    const s = M(o);
    if (!s || s.isAnimating)
      return;
    const i = +se(n, ct);
    n && !e(n, c) && !Number.isNaN(i) && s.to(i)
  }
  function Ko(e) {
    e.preventDefault();
    const n = this
      , s = g(n, Se) || F(n)
      , t = s && M(s);
    if (!t || t.isAnimating)
      return;
    const o = se(n, G);
    o === "next" ? t.next() : o === "prev" && t.prev()
  }
  function Yo({ code: e }) {
    const [s] = [...A(Se)].filter(e => zs(e))
      , t = M(s);
    if (!t)
      return;
    const n = W()
      , o = n ? Ns : Ds
      , i = n ? Ds : Ns;
    e === i ? t.prev() : e === o && t.next()
  }
  function Ws(e) {
    const n = this
      , t = M(n);
    if (!t || t.isTouch)
      return;
    Re = e.changedTouches[0].pageX,
      n.contains(e.target) && (t.isTouch = !0,
        bn(t, !0))
  }
  function Xo(e) {
    const { changedTouches: t, type: s } = e
      , n = M(this);
    if (!n || !n.isTouch)
      return;
    Pe = t[0].pageX,
      s === Ps && t.length > 1 && e.preventDefault()
  }
  function Jo(e) {
    const n = this
      , t = M(n);
    if (!t || !t.isTouch)
      return;
    if (ds = Pe || e.changedTouches[0].pageX,
      t.isTouch) {
      if ((!n.contains(e.target) || !n.contains(e.relatedTarget)) && Math.abs(Re - ds) < 75)
        return;
      Pe < Re ? t.index += 1 : Pe > Re && (t.index -= 1),
        t.isTouch = !1,
        t.to(t.index),
        bn(t)
    }
  }
  function Qe(e, t) {
    const { indicators: s } = e;
    [...s].forEach(e => o(e, c)),
      e.indicators[t] && n(s[t], c)
  }
  function bn(e, t) {
    const { element: n } = e
      , s = t ? d : f;
    s(n, Ps, Xo, y),
      s(n, Ls, Jo, y)
  }
  function hn(e, t) {
    const { element: s, options: a, slides: r, controls: o, indicators: i } = e
      , { touch: c, pause: l, interval: u, keyboard: h } = a
      , n = t ? d : f;
    l && u && (n(s, Ke, Yn),
      n(s, it, Kn),
      n(s, Le, Yn, y),
      n(s, Ls, Kn, y)),
      c && r.length > 1 && n(s, Le, Ws, y),
      o.length && o.forEach(e => {
        e && n(e, v, Ko)
      }
      ),
      i.length && i.forEach(e => {
        n(e, v, Uo)
      }
      ),
      h && n(N(s), qe, Yo)
  }
  function et(e) {
    const { slides: t, element: n } = e
      , s = r(`.${E}.${c}`, n);
    return [...t].indexOf(s)
  }
  class Be extends k {
    constructor(e, t) {
      super(e, t);
      const s = this;
      s.direction = W() ? "right" : "left",
        s.index = 0,
        s.isTouch = !1;
      const { element: o } = s;
      s.slides = P(E, o);
      const { slides: i } = s;
      if (i.length < 2)
        return;
      s.controls = [...A(`[${G}]`, o), ...A(`[${G}][${jt}="#${o.id}"]`)],
        s.indicator = r(`.${$}-indicators`, o),
        s.indicators = [...s.indicator ? A(`[${ct}]`, s.indicator) : [], ...A(`[${ct}][${jt}="#${o.id}"]`)];
      const { options: a } = s;
      s.options.interval = a.interval === !0 ? ps.interval : a.interval,
        et(s) < 0 && (i.length && n(i[0], c),
          s.indicators.length && Qe(s, 0)),
        hn(s, !0),
        a.interval && s.cycle()
    }
    get name() {
      return _s
    }
    get defaults() {
      return ps
    }
    get isPaused() {
      return e(this.element, I)
    }
    get isAnimating() {
      return r(`.${E}-next,.${E}-prev`, this.element) !== null
    }
    cycle() {
      const e = this
        , { element: t, options: n, isPaused: i } = e;
      s.clear(t, $),
        i && (s.clear(t, I),
          o(t, I)),
        s.set(t, () => {
          !e.isPaused && zs(t) && (e.index += 1,
            e.to(e.index))
        }
          , n.interval, $)
    }
    pause() {
      const e = this
        , { element: t, options: o } = e;
      !e.isPaused && o.interval && (n(t, I),
        s.set(t, () => { }
          , 1, I))
    }
    next() {
      const e = this;
      e.isAnimating || (e.index += 1,
        e.to(e.index))
    }
    prev() {
      const e = this;
      e.isAnimating || (e.index -= 1,
        e.to(e.index))
    }
    to(t) {
      const l = this
        , { element: u, slides: r, options: b } = l
        , d = et(l)
        , f = W();
      let a = t;
      if (l.isAnimating || d === a)
        return;
      d < a || d === 0 && a === r.length - 1 ? l.direction = f ? "right" : "left" : (d > a || d === r.length - 1 && a === 0) && (l.direction = f ? "left" : "right");
      const { direction: m } = l;
      a < 0 ? a = r.length - 1 : a >= r.length && (a = 0);
      const j = m === "left" ? "next" : "prev"
        , g = m === "left" ? "start" : "end"
        , v = {
          relatedTarget: r[a],
          from: d,
          to: a,
          direction: m
        };
      if (p(nt, v),
        p(tt, v),
        i(u, nt),
        nt.defaultPrevented)
        return;
      l.index = a,
        Qe(l, a),
        Q(r[a]) && e(u, "slide") ? s.set(u, () => {
          n(r[a], `${E}-${j}`),
            q(r[a]),
            n(r[a], `${E}-${g}`),
            n(r[d], `${E}-${g}`),
            h(r[a], () => zo(l))
        }
          , 17, G) : (n(r[a], c),
            o(r[d], c),
            s.set(u, () => {
              s.clear(u, G),
                u && b.interval && !l.isPaused && l.cycle(),
                i(u, tt)
            }
              , 17, G))
    }
    dispose() {
      const t = this
        , { slides: n } = t
        , s = ["start", "end", "prev", "next"];
      [...n].forEach((n, i) => {
        e(n, c) && Qe(t, i),
          s.forEach(e => o(n, `${E}-${e}`))
      }
      ),
        hn(t),
        super.dispose()
    }
  }
  p(Be, {
    selector: Se,
    init: yo,
    getInstance: M
  });
  const ee = "aria-expanded"
    , te = "collapsing"
    , _ = "collapse"
    , un = "Collapse"
    , ii = `.${_}`
    , ln = `[${L}="${_}"]`
    , ri = {
      parent: null
    }
    , ke = e => j(e, un)
    , ui = e => new Oe(e)
    , en = a(`show.bs.${_}`)
    , xi = a(`shown.bs.${_}`)
    , Kt = a(`hide.bs.${_}`)
    , zi = a(`hidden.bs.${_}`);
  function Di(e) {
    const { element: a, parent: r, triggers: c } = e;
    if (i(a, en),
      en.defaultPrevented)
      return;
    s.set(a, () => { }
      , 17),
      r && s.set(r, () => { }
        , 17),
      n(a, te),
      o(a, _),
      a.style.height = `${a.scrollHeight}px`,
      h(a, () => {
        s.clear(a),
          r && s.clear(r),
          c.forEach(e => m(e, ee, "true")),
          o(a, te),
          n(a, _),
          n(a, t),
          a.style.height = "",
          i(a, xi)
      }
      )
  }
  function Lt(e) {
    const { element: a, parent: r, triggers: c } = e;
    if (i(a, Kt),
      Kt.defaultPrevented)
      return;
    s.set(a, () => { }
      , 17),
      r && s.set(r, () => { }
        , 17),
      a.style.height = `${a.scrollHeight}px`,
      o(a, _),
      o(a, t),
      n(a, te),
      q(a),
      a.style.height = "0px",
      h(a, () => {
        s.clear(a),
          r && s.clear(r),
          c.forEach(e => m(e, ee, "false")),
          o(a, te),
          n(a, _),
          a.style.height = "",
          i(a, zi)
      }
      )
  }
  function Nt(e, t) {
    const s = t ? d : f
      , { triggers: n } = e;
    n.length && n.forEach(e => s(e, v, Ni))
  }
  function Ni(e) {
    const { target: n } = e
      , t = n && g(n, ln)
      , s = t && F(t)
      , o = s && ke(s);
    o && o.toggle(),
      t && t.tagName === "A" && e.preventDefault()
  }
  class Oe extends k {
    constructor(e, t) {
      super(e, t);
      const n = this
        , { element: s, options: o } = n;
      n.triggers = [...A(ln)].filter(e => F(e) === s),
        n.parent = r(o.parent),
        Nt(n, !0)
    }
    get name() {
      return un
    }
    get defaults() {
      return ri
    }
    toggle() {
      const n = this;
      e(n.element, t) ? n.hide() : n.show()
    }
    hide() {
      const e = this
        , { triggers: t, element: o } = e;
      if (s.get(o))
        return;
      Lt(e),
        t.length && t.forEach(e => n(e, `${_}d`))
    }
    show() {
      const r = this
        , { element: c, parent: e, triggers: l } = r;
      let i, a;
      e && (i = [...A(`.${_}.${t}`, e)].find(e => ke(e)),
        a = i && ke(i)),
        (!e || e && !s.get(e)) && !s.get(c) && (a && i !== c && (Lt(a),
          a.triggers.forEach(e => {
            n(e, `${_}d`)
          }
          )),
          Di(r),
          l.length && l.forEach(e => o(e, `${_}d`)))
    }
    dispose() {
      const e = this;
      Nt(e),
        super.dispose()
    }
  }
  p(Oe, {
    selector: ii,
    init: ui,
    getInstance: ke
  });
  const yt = "focus"
    , Li = "keyup"
    , _e = "scroll"
    , je = "resize"
    , xt = "ArrowUp"
    , Ct = "ArrowDown"
    , Et = "Escape"
    , kt = (e, t) => e.hasAttribute(t)
    , B = (e, t) => {
      p(e.style, t)
    }
    , R = e => e.focus()
    , ue = ["dropdown", "dropup", "dropstart", "dropend"]
    , zn = "Dropdown"
    , _t = "dropdown-menu";
  function zt(e) {
    const t = g(e, "A");
    return e && (kt(e, "href") && e.href.slice(-1) === "#" || t && kt(t, "href") && t.href.slice(-1) === "#")
  }
  const [T, vt, gt, pt] = ue
    , Pt = `[${L}="${T}"]`
    , oe = e => j(e, zn)
    , Ti = e => new ve(e)
    , Bt = `${_t}-end`
    , Mi = [T, vt]
    , $t = [gt, pt]
    , Wt = ["A", "BUTTON"]
    , ki = {
      offset: 5,
      display: "dynamic"
    }
    , mt = a(`show.bs.${T}`)
    , qt = a(`shown.bs.${T}`)
    , ht = a(`hide.bs.${T}`)
    , Gt = a(`hidden.bs.${T}`);
  function Xt(t) {
    const { element: f, menu: i, parentElement: _, options: E } = t
      , { offset: s } = E;
    if (b(i, "position") === "static")
      return;
    const o = W(f)
      , d = e(_, Bt)
      , A = ["margin", "top", "bottom", "left", "right"];
    A.forEach(e => {
      i.style[e] = ""
    }
    );
    let n = ue.find(t => e(_, t)) || T
      , m = {
        dropdown: [s, 0, 0],
        dropup: [0, 0, s],
        dropstart: o ? [-1, 0, 0, s] : [-1, s, 0],
        dropend: o ? [-1, s, 0] : [-1, 0, 0, s]
      };
    const c = {
      dropdown: {
        top: "100%"
      },
      dropup: {
        top: "auto",
        bottom: "100%"
      },
      dropstart: o ? {
        left: "100%",
        right: "auto"
      } : {
        left: "auto",
        right: "100%"
      },
      dropend: o ? {
        left: "auto",
        right: "100%"
      } : {
        left: "100%",
        right: "auto"
      },
      menuEnd: o ? {
        right: "auto",
        left: 0
      } : {
        right: 0,
        left: "auto"
      }
    }
      , { offsetWidth: r, offsetHeight: u } = i
      , { clientWidth: g, clientHeight: w } = D(f)
      , { left: a, top: h, width: l, height: C } = H(f)
      , j = a - r - s < 0
      , v = a + r + l + s >= g
      , k = h + u + s >= w
      , y = h + u + C + s >= w
      , O = h - u - s < 0
      , x = (!o && d || o && !d) && a + l - r < 0
      , S = (o && d || !o && !d) && a + r >= g;
    $t.includes(n) && j && v && (n = T),
      n === gt && (o ? v : j) && (n = pt),
      n === pt && (o ? j : v) && (n = gt),
      n === vt && O && !y && (n = T),
      n === T && y && !O && (n = vt),
      $t.includes(n) && k && p(c[n], {
        top: "auto",
        bottom: 0
      }),
      Mi.includes(n) && (x || S) && a + l + Math.abs(r - l) + s < g && p(c[n], x ? {
        left: 0,
        right: "auto"
      } : {
        left: "auto",
        right: 0
      }),
      m = m[n],
      i.style.margin = `${m.map(e => e && `${e}px`).join(" ")}`,
      B(i, c[n]),
      e(i, Bt) && B(i, c.menuEnd)
  }
  function Oi(e) {
    return [...e.children].map(e => {
      if (e && Wt.includes(e.tagName))
        return e;
      const { firstElementChild: t } = e;
      return t && Wt.includes(t.tagName) ? t : null
    }
    ).filter(e => e)
  }
  function Zt(e) {
    const { element: s } = e
      , t = e.open ? d : f
      , n = l(s);
    t(n, v, tn),
      t(n, yt, tn),
      t(n, qe, ji),
      t(n, Li, vi),
      e.options.display === "dynamic" && [_e, je].forEach(e => {
        t(N(s), e, pi, y)
      }
      )
  }
  function Jt(e, t) {
    const n = t ? d : f;
    n(e.element, v, _i)
  }
  function Ce(e) {
    const n = [...ue, "btn-group", "input-group"].map(e => P(`${e} ${t}`), l(e)).find(e => e.length);
    return n && n.length ? [...n[0].children].find(e => kt(e, L)) : null
  }
  function tn(e) {
    const { target: t, type: o } = e;
    if (!t || !t.closest)
      return;
    const s = Ce(t);
    if (!s)
      return;
    const n = oe(s);
    if (!n)
      return;
    const { parentElement: i, menu: a } = n
      , r = g(t, Pt) !== null
      , c = i && i.contains(t) && (t.tagName === "form" || g(t, "form") !== null);
    if (o === v && zt(t) && e.preventDefault(),
      o === yt && (t === s || t === a || a.contains(t)))
      return;
    c || r || n && n.hide()
  }
  function _i(e) {
    const s = this
      , { target: t } = e
      , n = oe(s);
    n && (n.toggle(),
      t && zt(t) && e.preventDefault())
  }
  function ji(e) {
    [Ct, xt].includes(e.code) && e.preventDefault()
  }
  function vi(e) {
    const { code: s } = e
      , t = Ce(this)
      , o = t && oe(t)
      , i = t && l(t).activeElement;
    if (!o || !i)
      return;
    const { menu: a, open: r } = o
      , n = Oi(a);
    if (n && n.length && [Ct, xt].includes(s)) {
      let e = n.indexOf(i);
      i === t ? e = 0 : s === xt ? e = e > 1 ? e - 1 : 0 : s === Ct && (e = e < n.length - 1 ? e + 1 : e),
        n[e] && R(n[e])
    }
    Et === s && r && (o.toggle(),
      R(t))
  }
  function pi() {
    const t = Ce(this)
      , e = t && oe(t);
    e && e.open && Xt(e)
  }
  class ve extends k {
    constructor(e, t) {
      super(e, t);
      const n = this
        , { element: o } = n
        , { parentElement: s } = o;
      n.parentElement = s,
        n.menu = r(`.${_t}`, s),
        n.open = !1,
        Jt(n, !0)
    }
    get name() {
      return zn
    }
    get defaults() {
      return ki
    }
    toggle() {
      const e = this;
      e.open ? e.hide() : e.show()
    }
    show() {
      const e = this
        , { element: s, open: c, menu: l, parentElement: o } = e
        , a = Ce(s)
        , r = a && oe(a);
      if (r && r.hide(),
        [mt, qt].forEach(e => {
          e.relatedTarget = s
        }
        ),
        i(o, mt),
        mt.defaultPrevented)
        return;
      n(l, t),
        n(o, t),
        m(s, ee, "true"),
        Xt(e),
        e.open = !c,
        setTimeout(() => {
          R(s),
            Zt(e),
            i(o, qt)
        }
          , 1)
    }
    hide() {
      const e = this
        , { element: s, open: a, menu: r, parentElement: n } = e;
      if ([ht, Gt].forEach(e => {
        e.relatedTarget = s
      }
      ),
        i(n, ht),
        ht.defaultPrevented)
        return;
      o(r, t),
        o(n, t),
        m(s, ee, "false"),
        e.open = !a,
        setTimeout(() => Zt(e), 1),
        i(n, Gt)
    }
    dispose() {
      const n = this
        , { parentElement: s } = n;
      e(s, t) && n.open && n.hide(),
        Jt(n),
        super.dispose()
    }
  }
  p(ve, {
    selector: Pt,
    init: Ti,
    getInstance: oe
  });
  const Fe = "aria-hidden"
    , Te = "aria-modal"
    , U = (e, t) => e.removeAttribute(t);
  function K(e) {
    return l(e).body
  }
  const w = "modal"
    , mn = "Modal"
    , fn = e => {
      const t = N(e).ShadowRoot;
      return e instanceof t || e instanceof ShadowRoot
    }
    ;
  function oi(e) {
    return e.nodeName === "HTML" ? e : e.assignedSlot || e.parentNode || (fn(e) ? e.host : null) || D(e)
  }
  const gn = e => ["TABLE", "TD", "TH"].includes(e.tagName)
    , si = e => e instanceof HTMLElement;
  function Ve(e, t) {
    const o = ["HTML", "BODY"];
    if (t) {
      let { offsetParent: t } = e;
      const n = N(e);
      for (; t && (gn(t) || si(t) && b(t, "position") !== "fixed");)
        t = t.offsetParent;
      return (!t || t && (o.includes(t.tagName) || b(t, "position") === "static")) && (t = n),
        t
    }
    const s = [];
    let { parentNode: n } = e;
    for (; n && !o.includes(n.nodeName);)
      n = oi(n),
        fn(n) || !!n.shadowRoot || gn(n) || s.push(n);
    return s.find((e, t) => b(e, "position") !== "relative" && s.slice(t + 1).every(e => b(e, "position") === "static") ? e : null) || K(e)
  }
  const ni = "fixed-top"
    , ti = "fixed-bottom"
    , _n = "sticky-top"
    , wn = "position-sticky"
    , On = e => [...P(ni, e), ...P(ti, e), ...P(_n, e), ...P(wn, e), ...P("is-fixed", e)];
  function ei(e) {
    const t = K(e);
    B(t, {
      paddingRight: "",
      overflow: ""
    });
    const n = On(t);
    n.length && n.forEach(e => {
      B(e, {
        paddingRight: "",
        marginRight: ""
      })
    }
    )
  }
  function Cn(e) {
    const { clientWidth: t } = D(e)
      , { innerWidth: n } = N(e);
    return Math.abs(n - t)
  }
  function En(t, n) {
    const s = K(t)
      , i = parseInt(b(s, "paddingRight"), 10)
      , r = b(s, "overflow") === "hidden"
      , o = r && i ? 0 : Cn(t)
      , a = On(s);
    n && (B(s, {
      overflow: "hidden",
      paddingRight: `${i + o}px`
    }),
      a.length && a.forEach(t => {
        const n = b(t, "paddingRight");
        if (t.style.paddingRight = `${parseInt(n, 10) + o}px`,
          [_n, wn].some(n => e(t, n))) {
          const e = b(t, "marginRight");
          t.style.marginRight = `${parseInt(e, 10) - o}px`
        }
      }
      ))
  }
  const C = "offcanvas"
    , An = "backdrop"
    , Sn = `${w}-${An}`
    , Mn = `${C}-${An}`
    , Fn = `.${w}.${t}`
    , Ye = `.${C}.${t}`
    , u = l().createElement("div");
  function V(e) {
    return r(`${Fn},${Ye}`, l(e))
  }
  function ut(e) {
    const t = e ? Sn : Mn;
    [Sn, Mn].forEach(e => {
      o(u, e)
    }
    ),
      n(u, t)
  }
  function Ft(e, t, s) {
    ut(s),
      e.append(u),
      t && n(u, x)
  }
  function Rn() {
    n(u, t),
      q(u)
  }
  function Ue() {
    o(u, t)
  }
  function Hn(e) {
    V(e) || (o(u, x),
      u.remove(),
      ei(e))
  }
  function In(e) {
    return e && b(e, "visibility") !== "hidden" && e.offsetParent !== null
  }
  const Wo = `.${w}`
    , Vn = `[${L}="${w}"]`
    , $o = `[${Me}="${w}"]`
    , Wn = `${w}-static`
    , Vo = {
      backdrop: !0,
      keyboard: !0
    }
    , he = e => j(e, mn)
    , Po = e => new He(e)
    , Xe = a(`show.bs.${w}`)
    , Gn = a(`shown.bs.${w}`)
    , Ze = a(`hide.bs.${w}`)
    , Qn = a(`hidden.bs.${w}`);
  function Zn(e) {
    const { element: t } = e
      , n = Cn(t)
      , { clientHeight: o, scrollHeight: i } = D(t)
      , { clientHeight: a, scrollHeight: r } = t
      , s = a !== r;
    if (!s && n) {
      const e = W(t) ? "paddingLeft" : "paddingRight";
      t.style[e] = `${n}px`
    }
    En(t, s || o !== i)
  }
  function Jn(e, t) {
    const n = t ? d : f
      , { element: s } = e;
    n(s, v, xo),
      n(N(s), je, e.update, y),
      n(l(s), qe, Ao)
  }
  function es(e, t) {
    const s = t ? d : f
      , { triggers: n } = e;
    n.length && n.forEach(e => s(e, v, Fo))
  }
  function ts(e) {
    const { triggers: t, element: n } = e;
    if (Hn(n),
      n.style.paddingRight = "",
      t.length) {
      const e = t.find(e => In(e));
      e && R(e)
    }
  }
  function ns(e) {
    const { element: t, relatedTarget: n } = e;
    R(t),
      Jn(e, !0),
      Gn.relatedTarget = n,
      i(t, Gn)
  }
  function ss(e) {
    const { element: s, hasFade: o } = e;
    s.style.display = "block",
      Zn(e),
      V(s) || (K(s).style.overflow = "hidden"),
      n(s, t),
      U(s, Fe),
      m(s, Te, "true"),
      o ? h(s, () => ns(e)) : ns(e)
  }
  function os(n, s) {
    const { element: o, options: a, relatedTarget: r, hasFade: c } = n;
    o.style.display = "",
      a.backdrop && !s && c && e(u, t) && !V(o) ? (Ue(),
        h(u, () => ts(n))) : ts(n),
      Jn(n),
      Qn.relatedTarget = r,
      i(o, Qn)
  }
  function Fo(e) {
    const { target: o } = e
      , t = o && g(this, Vn)
      , s = t && F(t)
      , n = s && he(s);
    if (!n)
      return;
    t && t.tagName === "A" && e.preventDefault(),
      n.relatedTarget = t,
      n.toggle()
  }
  function Ao({ code: n }) {
    const o = r(Fn)
      , s = o && he(o);
    if (!s)
      return;
    const { options: i } = s;
    i.keyboard && n === Et && e(o, t) && (s.relatedTarget = null,
      s.hide())
  }
  function xo(e) {
    const t = this
      , o = he(t);
    if (!o || s.get(t))
      return;
    const { options: u, isStatic: a, modalDialog: r } = o
      , { backdrop: m } = u
      , { target: i } = e
      , f = l(t).getSelection().toString().length
      , c = r.contains(i)
      , d = i && g(i, $o);
    a && !c ? s.set(t, () => {
      n(t, Wn),
        h(r, () => Oo(o))
    }
      , 17) : (d || !f && !a && !c && m) && (o.relatedTarget = d || null,
        o.hide(),
        e.preventDefault())
  }
  function Oo(e) {
    const { element: t, modalDialog: n } = e
      , i = Q(n) + 17;
    o(t, Wn),
      s.set(t, () => s.clear(t), i)
  }
  class He extends k {
    constructor(t, n) {
      super(t, n);
      const s = this
        , { element: o } = s;
      s.modalDialog = r(`.${w}-dialog`, o),
        s.triggers = [...A(Vn)].filter(e => F(e) === o),
        s.isStatic = s.options.backdrop === "static",
        s.hasFade = e(o, x),
        s.relatedTarget = null,
        s.container = Ve(o),
        es(s, !0),
        s.update = s.update.bind(s)
    }
    get name() {
      return mn
    }
    get defaults() {
      return Vo
    }
    toggle() {
      const n = this;
      e(n.element, t) ? n.hide() : n.show()
    }
    show() {
      const o = this
        , { element: s, options: r, hasFade: c, relatedTarget: l, container: d } = o
        , { backdrop: h } = r;
      let a = 0;
      if (e(s, t))
        return;
      if (Xe.relatedTarget = l || null,
        i(s, Xe),
        Xe.defaultPrevented)
        return;
      const n = V(s);
      if (n && n !== s) {
        const e = he(n)
          , t = e || j(n, "Offcanvas");
        t.hide()
      }
      h ? (!n && !e(u, t) ? Ft(d, c, !0) : ut(!0),
        a = Q(u),
        e(u, t) || Rn(),
        setTimeout(() => ss(o), a)) : (ss(o),
          n && e(u, t) && Ue())
    }
    hide(n) {
      const a = this
        , { element: s, hasFade: r, relatedTarget: c } = a;
      if (!e(s, t))
        return;
      if (Ze.relatedTarget = c || null,
        i(s, Ze),
        Ze.defaultPrevented)
        return;
      o(s, t),
        m(s, Fe, "true"),
        U(s, Te),
        r && n !== !1 ? h(s, () => os(a)) : os(a, n)
    }
    update() {
      const n = this;
      e(n.element, t) && Zn(n)
    }
    dispose() {
      const e = this;
      e.hide(!0),
        es(e),
        super.dispose()
    }
  }
  p(He, {
    selector: Wo,
    init: Po,
    getInstance: he
  });
  const us = "Offcanvas"
    , wo = `.${C}`
    , ot = `[${L}="${C}"]`
    , jo = `[${Me}="${C}"]`
    , De = `${C}-toggling`
    , bo = {
      backdrop: !0,
      keyboard: !0,
      scroll: !1
    }
    , fe = e => j(e, us)
    , fo = e => new we(e)
    , dt = a(`show.bs.${C}`)
    , ys = a(`shown.bs.${C}`)
    , Ge = a(`hide.bs.${C}`)
    , ws = a(`hidden.bs.${C}`);
  function mo(e) {
    const { element: t } = e
      , { clientHeight: n, scrollHeight: s } = D(t);
    En(t, n !== s)
  }
  function xs(e, t) {
    const n = t ? d : f;
    e.triggers.forEach(e => n(e, v, co))
  }
  function Cs(e, t) {
    const n = t ? d : f
      , s = l(e.element);
    n(s, qe, ao),
      n(s, v, ro)
  }
  function Es(e) {
    const { element: s, options: o } = e;
    o.scroll || (mo(e),
      K(s).style.overflow = "hidden"),
      n(s, De),
      n(s, t),
      s.style.visibility = "visible",
      h(s, () => so(e))
  }
  function ks(n) {
    const { element: s, options: o } = n
      , i = V(s);
    s.blur(),
      !i && o.backdrop && e(u, t) ? (Ue(),
        h(u, () => Ts(n))) : Ts(n)
  }
  function co(e) {
    const t = g(this, ot)
      , s = t && F(t)
      , n = s && fe(s);
    n && (n.relatedTarget = t,
      n.toggle(),
      t && t.tagName === "A" && e.preventDefault())
  }
  function ro(e) {
    const t = r(Ye, this);
    if (!t)
      return;
    const n = r(jo, t)
      , o = fe(t);
    if (!o)
      return;
    const { options: c, triggers: d } = o
      , { target: i } = e
      , s = g(i, ot)
      , a = l(t).getSelection();
    !(a && a.toString().length) && (!t.contains(i) && c.backdrop && (!s || s && !d.includes(s)) || n && n.contains(i)) && (o.relatedTarget = n && n.contains(i) ? n : null,
      o.hide()),
      s && s.tagName === "A" && e.preventDefault()
  }
  function ao({ code: e }) {
    const n = r(Ye, this);
    if (!n)
      return;
    const t = fe(n);
    t && t.options.keyboard && e === Et && (t.relatedTarget = null,
      t.hide())
  }
  function so(e) {
    const { element: t, triggers: n } = e;
    o(t, De),
      U(t, Fe),
      m(t, Te, "true"),
      m(t, "role", "dialog"),
      n.length && n.forEach(e => m(e, ee, "true")),
      i(t, ys),
      Cs(e, !0),
      R(t)
  }
  function Ts(e) {
    const { element: t, triggers: n } = e;
    if (m(t, Fe, "true"),
      U(t, Te),
      U(t, "role"),
      t.style.visibility = "",
      n.length) {
      n.forEach(e => m(e, ee, "false"));
      const e = n.find(e => In(e));
      e && R(e)
    }
    Hn(t),
      i(t, ws),
      o(t, De),
      V(t) || Cs(e)
  }
  class we extends k {
    constructor(e, t) {
      super(e, t);
      const n = this
        , { element: s } = n;
      n.triggers = [...A(ot)].filter(e => F(e) === s),
        n.container = Ve(s),
        n.relatedTarget = null,
        xs(n, !0)
    }
    get name() {
      return us
    }
    get defaults() {
      return bo
    }
    toggle() {
      const n = this;
      e(n.element, t) ? n.hide() : n.show()
    }
    show() {
      const o = this
        , { element: s, options: c, container: l, relatedTarget: a } = o;
      let r = 0;
      if (e(s, t))
        return;
      if (dt.relatedTarget = a,
        ys.relatedTarget = a,
        i(s, dt),
        dt.defaultPrevented)
        return;
      const n = V(s);
      if (n && n !== s) {
        const e = fe(n)
          , t = e || j(n, "Modal");
        t.hide()
      }
      c.backdrop ? (n ? ut() : Ft(l, !0),
        r = Q(u),
        e(u, t) || Rn(),
        setTimeout(() => Es(o), r)) : (Es(o),
          n && e(u, t) && Ue())
    }
    hide(s) {
      const r = this
        , { element: a, relatedTarget: c } = r;
      if (!e(a, t))
        return;
      if (Ge.relatedTarget = c,
        ws.relatedTarget = c,
        i(a, Ge),
        Ge.defaultPrevented)
        return;
      n(a, De),
        o(a, t),
        s ? ks(r) : h(a, () => ks(r))
    }
    dispose() {
      const e = this;
      e.hide(!0),
        xs(e),
        super.dispose()
    }
  }
  p(we, {
    selector: wo,
    init: fo,
    getInstance: fe
  });
  const Y = "popover"
    , Ie = "Popover"
    , O = "tooltip";
  function Rs(e) {
    const t = e === O
      , n = t ? `${e}-inner` : `${e}-body`
      , s = t ? "" : `<h3 class="${e}-header"></h3>`
      , o = `<div class="${e}-arrow"></div>`
      , i = `<div class="${n}"></div>`;
    return `<div class="${e}" role="${O}">${s + o + i}</div>`
  }
  const Ee = e => e && [SVGElement, HTMLImageElement, HTMLVideoElement].some(t => e instanceof t);
  function to(e) {
    const t = "scrollX" in e
      , n = t ? e.scrollX : e.scrollLeft
      , s = t ? e.scrollY : e.scrollTop;
    return {
      x: n,
      y: s
    }
  }
  function Zs(e) {
    const { width: t, height: n } = H(e)
      , { offsetWidth: s, offsetHeight: o } = e;
    return Math.round(t) !== s || Math.round(n) !== o
  }
  function Gs(e, t, n) {
    const i = t instanceof HTMLElement
      , s = H(e, i && Zs(t))
      , o = {
        x: 0,
        y: 0
      };
    if (i) {
      const e = H(t, !0);
      o.x = e.x + t.clientLeft,
        o.y = e.y + t.clientTop
    }
    return {
      x: s.left + n.x - o.x,
      y: s.top + n.y - o.y,
      width: s.width,
      height: s.height
    }
  }
  wt = {
    top: "top",
    bottom: "bottom",
    left: "start",
    right: "end"
  };
  function bt(e, t) {
    const Z = /\b(top|bottom|start|end)+/
      , { element: j, tooltip: u, options: G, arrow: l, offsetParent: Y } = e
      , L = {
        ...wt
      };
    B(u, {
      top: "0px",
      left: "0px",
      right: ""
    });
    const C = e.name === Ie
      , o = u.offsetWidth
      , i = u.offsetHeight
      , R = W(j);
    R && (L.left = "end",
      L.right = "start");
    const K = D(j)
      , Q = K.clientWidth
      , U = K.clientHeight
      , { container: p } = G;
    let { placement: n } = G;
    const { left: I, right: $ } = H(p, !0)
      , z = p.clientWidth
      , V = b(p, "position")
      , X = V === "static"
      , q = ["sticky", "fixed"].includes(V)
      , T = 0
      , y = q ? z + I : z + I + (Q - $) - 1
      , { width: d, height: c, left: S, right: J, top: F } = H(j, !0)
      , P = to(Y)
      , { x: E, y: v } = Gs(j, Y, P);
    B(l, {
      top: "",
      left: "",
      right: ""
    });
    let r, s, x, w, m, O;
    const a = l.offsetWidth || 0
      , h = l.offsetHeight || 0
      , f = a / 2;
    let M = F - i - h < 0
      , A = F + i + c + h >= U
      , g = S - o - a < T
      , _ = S + o + d + a >= y;
    const k = ["left", "right"]
      , N = ["top", "bottom"];
    if (M = k.includes(n) ? F + c / 2 - i / 2 - h < 0 : M,
      A = k.includes(n) ? F + i / 2 + c / 2 + h >= U : A,
      g = N.includes(n) ? S + d / 2 - o / 2 < T : g,
      _ = N.includes(n) ? S + o / 2 + d / 2 >= y : _,
      n = k.includes(n) && g && _ ? "top" : n,
      n = n === "top" && M ? "bottom" : n,
      n = n === "bottom" && A ? "top" : n,
      n = n === "left" && g ? "right" : n,
      n = n === "right" && _ ? "left" : n,
      u.className.includes(n) || (u.className = u.className.replace(Z, L[n])),
      k.includes(n))
      n === "left" ? s = E - o - (C ? a : 0) : s = E + d + (C ? a : 0),
        M ? (r = v,
          w = c / 2 - a) : A ? (r = v - i + c,
            w = i - c / 2 - a) : (r = v - i / 2 + c / 2,
              w = i / 2 - h / 2);
    else if (N.includes(n))
      if (t && Ee(j)) {
        let e = 0
          , c = 0;
        X ? (e = t.pageX,
          c = t.pageY) : (e = t.clientX - (R ? 0 : p.offsetLeft) + P.x,
            c = t.clientY - p.offsetTop + P.y);
        const l = $ - z;
        e -= R && q ? l : 0,
          n === "top" ? r = c - i - a : r = c + a,
          t.clientX - o / 2 < T ? (s = 0,
            m = e - f) : t.clientX + o / 2 > y ? (s = "auto",
              x = 0,
              O = y - e - f) : (s = e - o / 2,
                m = o / 2 - f)
      } else
        n === "top" ? r = v - i - (C ? h : 0) : r = v + c + (C ? h : 0),
          g ? (s = 0,
            m = E + d / 2 - f) : _ ? (s = "auto",
              x = 0,
              O = d / 2 + y - J - f) : (s = E - o / 2 + d / 2,
                m = o / 2 - f);
    B(u, {
      top: `${r}px`,
      left: s === "auto" ? s : `${s}px`,
      right: x !== void 0 ? `${x}px` : ""
    }),
      l instanceof HTMLElement && (w !== void 0 && (l.style.top = `${w}px`),
        m !== void 0 ? l.style.left = `${m}px` : O !== void 0 && (l.style.right = `${O}px`))
  }
  const rt = {
    template: Rs(O),
    title: null,
    customClass: null,
    trigger: "hover focus",
    placement: "top",
    sanitizeFn: null,
    animation: !0,
    delay: 200,
    container: null
  }
    , $s = "aria-describedby"
    , Ks = "mousedown"
    , qs = "mousemove"
    , at = "focusin"
    , Bs = "focusout"
    , Xs = "hover"
    , { userAgentData: Qs } = navigator
    , Is = Qs
    , { userAgent: Js } = navigator
    , eo = Js
    , Hs = /(iPhone|iPod|iPad)/
    , no = Is ? Is.brands.some(e => Hs.test(e.brand)) : Hs.test(eo);
  let Mt = 1;
  const $e = new Map;
  function io(e, t) {
    Mt += 1;
    let n = $e.get(e)
      , s = Mt;
    return n ? s = t && t.length && n.get && n.get(t) ? n.get(t) : n : t && t.length ? (n || ($e.set(e, new Map),
      n = $e.get(e)),
      n.set(t, s)) : $e.set(e, s),
      s
  }
  const Ms = "data-original-title"
    , ce = "Tooltip";
  function ie(e, t, n) {
    if (typeof t == "string" && !t.length)
      return;
    if (typeof t == "string") {
      let s = t.trim();
      typeof n == "function" && (s = n(s));
      const a = new DOMParser
        , r = a.parseFromString(s, "text/html")
        , { body: o } = r
        , i = o.children.length ? "innerHTML" : "innerText";
      e[i] = o[i]
    } else
      t instanceof HTMLElement && e.append(t)
  }
  function lo(t) {
    const { id: w, element: _, options: g } = t
      , { animation: C, customClass: b, sanitizeFn: i, placement: A, dismissible: k } = g;
    let { title: o, content: a } = g;
    const c = t.name === ce
      , d = c ? O : Y
      , { template: v, btnClose: p } = g
      , j = {
        ...wt
      };
    W(_) && (j.left = "end",
      j.right = "start");
    const y = `bs-${d}-${j[A]}`;
    let f;
    if ([Element, HTMLElement].some(e => v instanceof e))
      f = v;
    else {
      const e = l(_).createElement("div");
      ie(e, v, i),
        f = e.firstElementChild
    }
    t.tooltip = f && f.cloneNode(!0);
    const { tooltip: s } = t;
    m(s, "id", w),
      m(s, "role", O);
    const E = c ? `${O}-inner` : `${Y}-body`
      , h = c ? null : r(`.${Y}-header`, s)
      , u = r(`.${E}`, s);
    t.arrow = r(`.${d}-arrow`, s),
      k && (o ? o instanceof HTMLElement ? ie(o, p, i) : o += p : (h && h.remove(),
        a instanceof HTMLElement ? ie(a, p, i) : a += p)),
      c ? o && u && ie(u, o, i) : (o && h && ie(h, o, i),
        a && u && ie(u, a, i),
        t.btn = r(".btn-close", s)),
      e(s, d) || n(s, d),
      C && !e(s, x) && n(s, x),
      b && !e(s, b) && n(s, b),
      e(s, y) || n(s, y)
  }
  function le(e, t) {
    return e instanceof HTMLElement && t.contains(e)
  }
  const ho = `[${L}="${O}"],[data-tip="${O}"]`
    , st = "title";
  let bs = e => j(e, ce);
  const po = e => new me(e);
  function go(e) {
    const { element: t, tooltip: n } = e;
    U(t, $s),
      n.remove()
  }
  function vs(e) {
    const { element: t } = e;
    de(e),
      t.hasAttribute(Ms) && e.name === O && ls(e)
  }
  function gs(e, t) {
    const s = t ? d : f
      , { element: n } = e;
    s(l(n), Le, Je, y),
      Ee(n) || [_e, je].forEach(t => {
        s(N(n), t, e.update, y)
      }
      )
  }
  function fs(e) {
    const { element: t } = e
      , n = a(`shown.bs.${re(e.name)}`);
    gs(e, !0),
      i(t, n),
      s.clear(t, "in")
  }
  function ms(e) {
    const { element: t } = e
      , n = a(`hidden.bs.${re(e.name)}`);
    gs(e),
      go(e),
      i(t, n),
      s.clear(t, "out")
  }
  function de(e, t) {
    const s = t ? d : f
      , { element: n, options: c, btn: i } = e
      , { trigger: a, dismissible: o } = c;
    if (a.includes("manual"))
      return;
    e.enabled = !!t;
    const u = a.split(" ")
      , r = Ee(n);
    r && s(n, qs, e.update, y),
      u.forEach(t => {
        r || t === Xs ? (s(n, Ks, e.show),
          s(n, Ke, e.show),
          o && i ? s(i, v, e.hide) : (s(n, it, e.hide),
            s(l(n), Le, Je, y))) : t === v ? s(n, t, o ? e.show : e.toggle) : t === yt && (s(n, at, e.show),
              o || s(n, Bs, e.hide),
              no && s(n, v, () => R(n)))
      }
      )
  }
  function hs(e, t) {
    const s = t ? d : f
      , { element: n, options: r, offsetParent: c } = e
      , { container: o } = r
      , { offsetHeight: l, scrollHeight: u } = o
      , i = g(n, `.${w}`)
      , a = g(n, `.${C}`);
    if (!Ee(n)) {
      const t = N(n)
        , i = l !== u
        , a = i || c !== t ? o : t;
      s(t, je, e.update, y),
        s(a, _e, e.update, y)
    }
    i && d(i, `hide.bs.${w}`, e.hide),
      a && d(a, `hide.bs.${C}`, e.hide)
  }
  function ls(e, t) {
    const n = [Ms, st]
      , { element: s } = e;
    m(s, n[t ? 0 : 1], t || se(s, n[0])),
      U(s, n[t ? 1 : 0])
  }
  function Je({ target: e }) {
    const { tooltip: n, element: t } = this;
    n.contains(e) || e === t || t.contains(e) || this.hide()
  }
  class me extends k {
    constructor(e, t) {
      super(e, t);
      const n = this
        , { element: o } = n
        , s = n.name === ce
        , c = s ? O : Y
        , l = s ? ce : Ie;
      bs = e => j(e, l),
        n.tooltip = {},
        s || (n.btn = null),
        n.arrow = {},
        n.offsetParent = {},
        n.enabled = !0,
        n.id = `${c}-${io(o, c)}`;
      const { options: i } = n;
      if (!i.title && s || !s && !i.content)
        return;
      const a = r(i.container)
        , d = Ve(o);
      n.options.container = !a || a && ["static", "relative"].includes(b(a, "position")) ? d : a || K(o),
        rt[st] = null,
        Je.bind(n),
        n.update = n.update.bind(n),
        n.show = n.show.bind(n),
        n.hide = n.hide.bind(n),
        n.toggle = n.toggle.bind(n),
        o.hasAttribute(st) && s && ls(n, i.title),
        lo(n),
        de(n, !0)
    }
    get name() {
      return ce
    }
    get defaults() {
      return rt
    }
    show(o) {
      const r = this
        , { options: u, tooltip: c, element: l, id: f } = r
        , { container: d, animation: p } = u
        , g = s.get(l, "out");
      s.clear(l, "out"),
        c && !g && !le(c, d) && s.set(l, () => {
          const s = a(`show.bs.${re(r.name)}`);
          if (i(l, s),
            s.defaultPrevented)
            return;
          d.append(c),
            m(l, $s, `#${f}`),
            r.offsetParent = Ve(c, !0),
            r.update(o),
            hs(r, !0),
            e(c, t) || n(c, t),
            p ? h(c, () => fs(r)) : fs(r)
        }
          , 17, "in")
    }
    hide() {
      const e = this
        , { options: c, tooltip: n, element: r } = e
        , { container: l, animation: d, delay: u } = c;
      s.clear(r, "in"),
        n && le(n, l) && s.set(r, () => {
          const s = a(`hide.bs.${re(e.name)}`);
          if (i(r, s),
            s.defaultPrevented)
            return;
          o(n, t),
            hs(e),
            d ? h(n, () => ms(e)) : ms(e)
        }
          , u + 17, "out")
    }
    update(e) {
      bt(this, e)
    }
    toggle(e) {
      const t = this
        , { tooltip: n, options: s } = t;
      le(n, s.container) ? t.hide() : t.show(e)
    }
    enable() {
      const e = this
        , { enabled: t } = e;
      t || (de(e, !0),
        e.enabled = !t)
    }
    disable() {
      const e = this
        , { element: t, tooltip: n, options: i, enabled: o } = e
        , { animation: a, container: r, delay: c } = i;
      o && (le(n, r) && a ? (e.hide(),
        s.set(t, () => {
          de(e),
            s.clear(t, O)
        }
          , Q(n) + c + 17, O)) : de(e),
        e.enabled = !o)
    }
    toggleEnabled() {
      const e = this;
      e.enabled ? e.disable() : e.enable()
    }
    dispose() {
      const e = this
        , { tooltip: n, options: t } = e;
      t.animation && le(n, t.container) ? (t.delay = 0,
        e.hide(),
        h(n, () => vs(e))) : vs(e),
        super.dispose()
    }
  }
  p(me, {
    selector: ho,
    init: po,
    getInstance: bs,
    styleTip: bt
  });
  const Eo = `[${L}="${Y}"],[data-tip="${Y}"]`
    , ko = {
      ...rt,
      template: Rs(Y),
      btnClose: '<button class="btn-close" aria-label="Close"></button>',
      dismissible: !1,
      content: null
    };
  class Ne extends me {
    constructor(e, t) {
      super(e, t)
    }
    get name() {
      return Ie
    }
    get defaults() {
      return ko
    }
    show() {
      super.show();
      const { options: t, btn: e } = this;
      t.dismissible && e && setTimeout(() => R(e), 17)
    }
  }
  const So = e => j(e, Ie)
    , Mo = e => new Ne(e);
  p(Ne, {
    selector: Eo,
    init: Mo,
    getInstance: So,
    styleTip: bt
  });
  function is(e, t) {
    const n = t && X.some(e => t instanceof e) ? t : l();
    return n.getElementsByTagName(e)
  }
  const To = "scrollspy"
    , Xn = "ScrollSpy"
    , Do = '[data-bs-spy="scroll"]'
    , No = {
      offset: 10,
      target: null
    }
    , Lo = e => j(e, Xn)
    , Ro = e => new We(e)
    , qn = a(`activate.bs.${To}`);
  function Ho(e) {
    const { target: s, scrollTarget: t, options: a, itemsLength: c, scrollHeight: d, element: u } = e
      , { offset: h } = a
      , o = t instanceof Window
      , n = s && is("A", s)
      , i = t && Io(t);
    if (e.scrollTop = o ? t.scrollY : t.scrollTop,
      n && (c !== n.length || i !== d)) {
      let t, s, a;
      e.items = [],
        e.offsets = [],
        e.scrollHeight = i,
        e.maxScroll = e.scrollHeight - Bo(e),
        [...n].forEach(n => {
          t = se(n, "href"),
            s = t && t.charAt(0) === "#" && t.slice(-1) !== "#" && r(t, l(u)),
            s && (e.items.push(n),
              a = s.getBoundingClientRect(),
              e.offsets.push((o ? a.top + e.scrollTop : s.offsetTop) - h))
        }
        ),
        e.itemsLength = e.items.length
    }
  }
  function Io(e) {
    return e instanceof HTMLElement ? e.scrollHeight : D(e).scrollHeight
  }
  function Bo({ element: e, scrollTarget: t }) {
    return t instanceof Window ? t.innerHeight : H(e).height
  }
  function Un(t) {
    [...is("A", t)].forEach(t => {
      e(t, c) && o(t, c)
    }
    )
  }
  function $n(t, s) {
    const { target: l, element: a } = t;
    Un(l),
      t.activeItem = s,
      n(s, c);
    const r = [];
    let o = s;
    for (; o !== K(a);)
      o = o.parentElement,
        (e(o, "nav") || e(o, "dropdown-menu")) && r.push(o);
    r.forEach(t => {
      const s = t.previousElementSibling;
      s && !e(s, c) && n(s, c)
    }
    ),
      qn.relatedTarget = s,
      i(a, qn)
  }
  function Bn(e, t) {
    const n = t ? d : f;
    n(e.scrollTarget, _e, e.refresh, y)
  }
  class We extends k {
    constructor(e, t) {
      super(e, t);
      const n = this
        , { element: s, options: o } = n;
      if (n.target = r(o.target, l(s)),
        !n.target)
        return;
      const i = N(s);
      n.scrollTarget = s.clientHeight < s.scrollHeight ? s : i,
        n.scrollTop = 0,
        n.maxScroll = 0,
        n.scrollHeight = 0,
        n.activeItem = null,
        n.items = [],
        n.itemsLength = 0,
        n.offsets = [],
        n.refresh = n.refresh.bind(n),
        Bn(n, !0),
        n.refresh()
    }
    get name() {
      return Xn
    }
    get defaults() {
      return No
    }
    refresh() {
      const e = this
        , { target: o } = e;
      if (o.offsetHeight === 0)
        return;
      Ho(e);
      const { scrollTop: n, maxScroll: a, itemsLength: r, items: i, activeItem: s } = e;
      if (n >= a) {
        const t = i[r - 1];
        s !== t && $n(e, t);
        return
      }
      const { offsets: t } = e;
      if (s && n < t[0] && t[0] > 0) {
        e.activeItem = null,
          Un(o);
        return
      }
      i.forEach((o, i) => {
        s !== o && n >= t[i] && (typeof t[i + 1] == "undefined" || n < t[i + 1]) && $n(e, o)
      }
      )
    }
    dispose() {
      Bn(this),
        super.dispose()
    }
  }
  p(We, {
    selector: Do,
    init: Ro,
    getInstance: Lo
  });
  const Nn = "aria-selected"
    , ae = "tab"
    , Dn = "Tab"
    , Go = `[${L}="${ae}"]`
    , Tn = e => j(e, Dn)
    , Qo = e => new be(e)
    , lt = a(`show.bs.${ae}`)
    , kn = a(`shown.bs.${ae}`)
    , Ot = a(`hide.bs.${ae}`)
    , yn = a(`hidden.bs.${ae}`)
    , pe = new Map;
  function vn(e) {
    const { tabContent: t, nav: n } = e;
    t && (t.style.height = "",
      o(t, te)),
      n && s.clear(n)
  }
  function pn(e) {
    const { element: o, tabContent: t, nav: n } = e
      , { currentHeight: r, nextHeight: a } = pe.get(o)
      , { tab: c } = n && pe.get(n);
    t ? r === a ? vn(e) : setTimeout(() => {
      t.style.height = `${a}px`,
        q(t),
        h(t, () => vn(e))
    }
      , 50) : n && s.clear(n),
      kn.relatedTarget = c,
      i(o, kn)
  }
  function dn(s) {
    const { element: d, content: a, tabContent: r, nav: m } = s
      , { tab: f, content: l } = m && pe.get(m);
    let u = 0;
    if (r && ([l, a].forEach(e => n(e, "overflow-hidden")),
      u = l.scrollHeight),
      lt.relatedTarget = f,
      yn.relatedTarget = d,
      i(d, lt),
      lt.defaultPrevented)
      return;
    if (n(a, c),
      o(l, c),
      r) {
      const e = a.scrollHeight;
      pe.set(d, {
        currentHeight: u,
        nextHeight: e
      }),
        n(r, te),
        r.style.height = `${u}px`,
        q(r),
        [l, a].forEach(e => o(e, "overflow-hidden"))
    }
    a && e(a, x) ? setTimeout(() => {
      n(a, t),
        h(a, () => {
          pn(s)
        }
        )
    }
      , 17) : pn(s),
      i(f, yn)
  }
  function ai(t) {
    const { nav: o } = t
      , n = P(c, o);
    let s;
    n.length === 1 && !ue.some(t => e(n[0].parentElement, t)) ? [s] = n : n.length > 1 && (s = n[n.length - 1]);
    const i = s ? F(s) : null;
    return {
      tab: s,
      content: i
    }
  }
  function cn(e, t) {
    const n = t ? d : f;
    n(e.element, v, ci)
  }
  function ci(e) {
    const t = Tn(this);
    if (!t)
      return;
    e.preventDefault(),
      t.show()
  }
  class be extends k {
    constructor(e) {
      super(e);
      const t = this
        , { element: o } = t
        , n = F(o);
      if (!n)
        return;
      const s = g(o, ".nav")
        , i = g(n, ".tab-content");
      t.nav = s,
        t.content = n,
        t.tabContent = i,
        t.dropdown = s && r(`.${ue[0]}-toggle`, s),
        cn(t, !0)
    }
    get name() {
      return Dn
    }
    show() {
      const d = this
        , { element: r, nav: a, dropdown: l } = d;
      if (!(a && s.get(a)) && !e(r, c)) {
        const { tab: u, content: f } = ai(d);
        if (a && pe.set(a, {
          tab: u,
          content: f
        }),
          Ot.relatedTarget = r,
          i(u, Ot),
          Ot.defaultPrevented)
          return;
        a && s.set(a, () => { }
          , 17),
          o(u, c),
          m(u, Nn, "false"),
          n(r, c),
          m(r, Nn, "true"),
          l && (e(r.parentNode, _t) ? e(l, c) || n(l, c) : e(l, c) && o(l, c)),
          e(f, x) ? (o(f, t),
            h(f, () => dn(d))) : dn(d)
      }
    }
    dispose() {
      cn(this),
        super.dispose()
    }
  }
  p(be, {
    selector: Go,
    init: Qo,
    getInstance: Tn
  });
  const S = "toast"
    , rn = "Toast"
    , hi = `.${S}`
    , mi = `[${Me}="${S}"]`
    , ne = "showing"
    , an = "hide"
    , gi = {
      animation: !0,
      autohide: !0,
      delay: 5e3
    }
    , on = e => j(e, rn)
    , bi = e => new xe(e)
    , sn = a(`show.bs.${S}`)
    , yi = a(`shown.bs.${S}`)
    , nn = a(`hide.bs.${S}`)
    , wi = a(`hidden.bs.${S}`);
  function Qt(e) {
    const { element: t, options: n } = e;
    o(t, ne),
      s.clear(t, ne),
      i(t, yi),
      n.autohide && s.set(t, () => e.hide(), n.delay, S)
  }
  function Yt(e) {
    const { element: a } = e;
    o(a, ne),
      o(a, t),
      n(a, an),
      s.clear(a, S),
      i(a, wi)
  }
  function Ci(e) {
    const { element: t, options: s } = e;
    n(t, ne),
      s.animation ? (q(t),
        h(t, () => Yt(e))) : Yt(e)
  }
  function Ei(e) {
    const { element: i, options: a } = e;
    s.set(i, () => {
      o(i, an),
        q(i),
        n(i, t),
        n(i, ne),
        a.animation ? h(i, () => Qt(e)) : Qt(e)
    }
      , 17, ne)
  }
  function Ut(e, t) {
    const n = t ? d : f
      , { element: o, dismiss: s, options: i } = e;
    s && n(s, v, e.hide),
      i.autohide && [at, Bs, Ke, it].forEach(e => n(o, e, Si))
  }
  function Ai(e) {
    s.clear(e.element, S),
      Ut(e)
  }
  function Si(e) {
    const t = this
      , n = on(t)
      , { type: i, relatedTarget: o } = e;
    if (!n || t === o || t.contains(o))
      return;
    [Ke, at].includes(i) ? s.clear(t, S) : s.set(t, () => n.hide(), n.options.delay, S)
  }
  class xe extends k {
    constructor(t, s) {
      super(t, s);
      const i = this
        , { element: a, options: c } = i;
      c.animation && !e(a, x) ? n(a, x) : !c.animation && e(a, x) && o(a, x),
        i.dismiss = r(mi, a),
        i.show = i.show.bind(i),
        i.hide = i.hide.bind(i),
        Ut(i, !0)
    }
    get name() {
      return rn
    }
    get defaults() {
      return gi
    }
    show() {
      const s = this
        , { element: n } = s;
      if (n && !e(n, t)) {
        if (i(n, sn),
          sn.defaultPrevented)
          return;
        Ei(s)
      }
    }
    hide() {
      const s = this
        , { element: n } = s;
      if (n && e(n, t)) {
        if (i(n, nn),
          nn.defaultPrevented)
          return;
        Ci(s)
      }
    }
    dispose() {
      const n = this
        , { element: s } = n;
      e(s, t) && o(s, t),
        Ai(n),
        super.dispose()
    }
  }
  p(xe, {
    selector: hi,
    init: bi,
    getInstance: on
  });
  const Fi = e => e && !!e.shadowRoot;
  function It(e) {
    const t = e && X.some(t => e instanceof t) ? e : l();
    return [...t.querySelectorAll("*")].filter(Fi)
  }
  const Ht = {
    Alert: ze,
    Button: ye,
    Carousel: Be,
    Collapse: Oe,
    Dropdown: ve,
    Modal: He,
    Offcanvas: we,
    Popover: Ne,
    ScrollSpy: We,
    Tab: be,
    Toast: xe,
    Tooltip: me
  }
    , Rt = ge(Ht);
  function Dt(e, t) {
    [...t].forEach(t => e(t))
  }
  function Tt(e, t) {
    const n = J.getAllFor(e);
    n && [...n].forEach(e => {
      const [n, s] = e;
      t && t.contains(n) && s.dispose()
    }
    )
  }
  function At(e) {
    const t = e && X.some(t => e instanceof t) ? e : void 0
      , n = It(t);
    Rt.forEach(e => {
      const { init: s, selector: o } = Ht[e];
      Dt(s, A(o, t)),
        n.forEach(e => Dt(s, A(o, e.shadowRoot)))
    }
    )
  }
  function Pi(e) {
    const t = e && X.some(t => e instanceof t) ? e : void 0
      , n = It(t);
    Rt.forEach(e => {
      Tt(e, t),
        n.forEach(t => Tt(e, t.shadowRoot))
    }
    )
  }
  document.body ? At() : document.addEventListener("DOMContentLoaded", () => At(), {
    once: !0
  });
  const Hi = {
    Alert: ze,
    Button: ye,
    Carousel: Be,
    Collapse: Oe,
    Dropdown: ve,
    Modal: He,
    Offcanvas: we,
    Popover: Ne,
    ScrollSpy: We,
    Tab: be,
    Toast: xe,
    Tooltip: me,
    initCallback: At,
    removeDataAPI: Pi,
    Version: Pn
  };
  return Hi
}),
  document.querySelectorAll(".preview").forEach(e => {
    e.addEventListener("click", () => {
      const t = document.querySelector("#kImagePreview img");
      t.setAttribute("src", e.getAttribute("src")),
        t.setAttribute("alt", e.getAttribute("alt")),
        $("#kImagePreview").modal("show")
    }
    )
  }
  ),
  document.querySelectorAll(".tab-pane.video").forEach(function (e) {
    e = e.id;
    const s = document.getElementById(`${e}-control`)
      , n = document.querySelector(`#${e} video`)
      , t = document.querySelector(`#${e} button`);
    s.addEventListener("click", function () {
      t.classList.contains("d-none") || t.classList.add("d-none"),
        n.currentTime = 0,
        n.play()
    }),
      n.addEventListener("ended", function () {
        t.classList.contains("d-none") && t.classList.remove("d-none")
      }),
      t.addEventListener("click", function () {
        t.classList.add("d-none"),
          n.currentTime = 0,
          n.play()
      })
  }),
  document.querySelectorAll(".tab-pane.two-videos").forEach(function (e) {
    e = e.id;
    const o = document.getElementById(`${e}-control`)
      , n = document.querySelector(`#${e} .phone-overlay video`)
      , s = document.querySelector(`#${e} .laptop-overlay video`)
      , t = document.querySelector(`#${e} button`);
    o.addEventListener("click", function () {
      t.classList.contains("d-none") || t.classList.add("d-none"),
        n.currentTime = 0,
        s.currentTime = 0,
        n.play(),
        s.play()
    }),
      n.addEventListener("ended", function () {
        t.classList.contains("d-none") && t.classList.remove("d-none")
      }),
      t.addEventListener("click", function () {
        t.classList.add("d-none"),
          n.currentTime = 0,
          s.currentTime = 0,
          n.play(),
          s.play()
      })
  });
const config = {
  rootMargin: "0px 0px 50px 0px",
  threshold: 0
};
let observer = new IntersectionObserver(function (e, t) {
  e.forEach(e => {
    e.isIntersecting && (e.target.src = e.target.dataset.src,
      t.unobserve(e.target))
  }
  )
}
  , config);
const imgs = document.querySelectorAll("[data-src]");
imgs.forEach(e => {
  observer.observe(e)
}
),
  document.querySelectorAll(".nav-features .nav-link").forEach(e => {
    e.addEventListener("mouseover", function (e) {
      const t = document.querySelector(`${e.target.getAttribute("href")} [data-src]`);
      t && (t.src = t.dataset.src)
    })
  }
  ),
  document.querySelectorAll(".dropdown-trans .dropdown-item").forEach(e => {
    e.addEventListener("click", e => {
      localStorage = window.localStorage,
        localStorage.setItem("lang", e.target.lang)
    }
    )
  }
  );
function convertLangCode(e) {
  return e == "pt" ? "pt-pt" : e == "no" ? "nn" : e == "zh" ? "zh-cn" : e.startsWith("de") ? "de" : e.startsWith("en") && !e.toLowerCase().endsWith("gb") ? "en" : e.startsWith("es") ? "es" : e.startsWith("fr") ? "fr" : e.startsWith("it") ? "it" : e.startsWith("tr") ? "tr" : e.startsWith("vi") ? "vi" : (hugoLang = e.toLowerCase().replace(/[@_]/, "-"),
    parts = hugoLang.split("-"),
    parts.length > 1 && (parts[1] == "ijekavian" ? hugoLang = `${parts[0]}-ije` : parts[1] == "ijekavianlatin" ? hugoLang = `${parts[0]}-il` : parts[1].length > 2 && (hugoLang = `${parts[0]}-${parts[1].slice(0, 2)}`)),
    hugoLang)
}
if (window.location.hostname != "planet.kde.org") {
  localStorage = window.localStorage;
  const e = localStorage.getItem("lang") || convertLangCode(navigator.language);
  if (console.log(`${navigator.language} - ${e}`),
    e) {
    const t = document.querySelector("html").lang
      , n = document.querySelector('link[rel="alternate"][hreflang="' + e + '"]');
    t !== e && t === "en" && n && (window.location.href = n.href + window.location.search)
  }
}
