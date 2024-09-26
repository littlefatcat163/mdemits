import { getCurrentScope as $e, onScopeDispose as Le, unref as u, ref as H, isRef as Oe, watch as G, readonly as E, inject as ae, computed as c, shallowRef as Ne, watchEffect as Be, getCurrentInstance as be, provide as He, useId as Ie, toValue as M, defineComponent as A, h as T, Teleport as Pe, openBlock as g, createBlock as w, Transition as Me, mergeProps as P, withCtx as F, renderSlot as x, createElementBlock as L, useSlots as ye, resolveDynamicComponent as O, normalizeClass as I, createTextVNode as z, toDisplayString as D, createCommentVNode as j, toRef as le, useAttrs as De, mergeModels as W, useModel as ge, Fragment as re, createVNode as U, onMounted as Ve, nextTick as Ee, createElementVNode as Q, createStaticVNode as ie, resolveComponent as ze, renderList as Re, shallowReactive as he, onBeforeMount as je } from "vue";
const Ge = Symbol("bvn::collapse"), Xe = Symbol("bvn::navbar"), Y = Symbol("bvn::defaults");
function K(t) {
  return $e() ? (Le(t), !0) : !1;
}
function Z(t) {
  return typeof t == "function" ? t() : u(t);
}
const ne = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const qe = Object.prototype.toString, We = (t) => qe.call(t) === "[object Object]", de = () => +Date.now(), Ke = () => {
};
function Ue(t, a = 1e3, o = {}) {
  const {
    immediate: e = !0,
    immediateCallback: l = !1
  } = o;
  let n = null;
  const s = H(!1);
  function r() {
    n && (clearInterval(n), n = null);
  }
  function i() {
    s.value = !1, r();
  }
  function d() {
    const f = Z(a);
    f <= 0 || (s.value = !0, l && t(), r(), n = setInterval(t, f));
  }
  if (e && ne && d(), Oe(a) || typeof a == "function") {
    const f = G(a, () => {
      s.value && ne && d();
    });
    K(f);
  }
  return K(i), {
    isActive: s,
    pause: i,
    resume: d
  };
}
function Ze(t) {
  var a;
  const o = Z(t);
  return (a = o == null ? void 0 : o.$el) != null ? a : o;
}
const J = ne ? window : void 0;
function se(...t) {
  let a, o, e, l;
  if (typeof t[0] == "string" || Array.isArray(t[0]) ? ([o, e, l] = t, a = J) : [a, o, e, l] = t, !a)
    return Ke;
  Array.isArray(o) || (o = [o]), Array.isArray(e) || (e = [e]);
  const n = [], s = () => {
    n.forEach((f) => f()), n.length = 0;
  }, r = (f, h, _, k) => (f.addEventListener(h, _, k), () => f.removeEventListener(h, _, k)), i = G(
    () => [Ze(a), Z(l)],
    ([f, h]) => {
      if (s(), !f)
        return;
      const _ = We(h) ? { ...h } : h;
      n.push(
        ...o.flatMap((k) => e.map((y) => r(f, k, y, _)))
      );
    },
    { immediate: !0, flush: "post" }
  ), d = () => {
    i(), s();
  };
  return K(d), d;
}
function Je(t) {
  return typeof t == "function" ? t : typeof t == "string" ? (a) => a.key === t : Array.isArray(t) ? (a) => t.includes(a.key) : () => !0;
}
function Qe(...t) {
  let a, o, e = {};
  t.length === 3 ? (a = t[0], o = t[1], e = t[2]) : t.length === 2 ? typeof t[1] == "object" ? (a = !0, o = t[0], e = t[1]) : (a = t[0], o = t[1]) : (a = !0, o = t[0]);
  const {
    target: l = J,
    eventName: n = "keydown",
    passive: s = !1,
    dedupe: r = !1
  } = e, i = Je(a);
  return se(l, n, (f) => {
    f.repeat && Z(r) || i(f) && o(f);
  }, s);
}
function Ye(t, a = {}) {
  const {
    immediate: o = !0,
    fpsLimit: e = void 0,
    window: l = J
  } = a, n = H(!1), s = e ? 1e3 / e : null;
  let r = 0, i = null;
  function d(_) {
    if (!n.value || !l)
      return;
    r || (r = _);
    const k = _ - r;
    if (s && k < s) {
      i = l.requestAnimationFrame(d);
      return;
    }
    r = _, t({ delta: k, timestamp: _ }), i = l.requestAnimationFrame(d);
  }
  function f() {
    !n.value && l && (n.value = !0, r = 0, i = l.requestAnimationFrame(d));
  }
  function h() {
    n.value = !1, i != null && l && (l.cancelAnimationFrame(i), i = null);
  }
  return o && f(), K(h), {
    isActive: E(n),
    pause: h,
    resume: f
  };
}
function et(t, a = {}) {
  const {
    delayEnter: o = 0,
    delayLeave: e = 0,
    window: l = J
  } = a, n = H(!1);
  let s;
  const r = (i) => {
    const d = i ? o : e;
    s && (clearTimeout(s), s = void 0), d ? s = setTimeout(() => n.value = i, d) : n.value = i;
  };
  return l && (se(t, "mouseenter", () => r(!0), { passive: !0 }), se(t, "mouseleave", () => r(!1), { passive: !0 })), n;
}
function tt(t = {}) {
  const {
    controls: a = !1,
    offset: o = 0,
    immediate: e = !0,
    interval: l = "requestAnimationFrame",
    callback: n
  } = t, s = H(de() + o), r = () => s.value = de() + o, i = n ? () => {
    r(), n(s.value);
  } : r, d = l === "requestAnimationFrame" ? Ye(i, { immediate: e }) : Ue(i, l, { immediate: e });
  return a ? {
    timestamp: s,
    ...d
  } : s;
}
const ee = /\s+/;
function ot(t, a = Ce("injectSelf")) {
  const { provides: o } = a;
  if (o && t in o)
    return o[t];
}
function Ce(t, a) {
  const o = be();
  if (!o)
    throw new Error(`[Bvn] ${t} must be called from inside a setup function`);
  return o;
}
const at = (t = "") => t.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase(), ue = (t) => t !== null && typeof t == "object" && !Array.isArray(t);
function _e(t = {}, a = {}, o) {
  const e = {};
  for (const l in t)
    e[l] = t[l];
  for (const l in a) {
    const n = t[l], s = a[l];
    if (ue(n) && ue(s)) {
      e[l] = _e(n, s, o);
      continue;
    }
    if (Array.isArray(n) && Array.isArray(s) && o) {
      e[l] = o(n, s);
      continue;
    }
    e[l] = s;
  }
  return e;
}
const lt = (t, a) => {
  var o, e;
  return typeof ((o = t.props) == null ? void 0 : o[a]) < "u" || typeof ((e = t.props) == null ? void 0 : e[at(a)]) < "u";
};
function nt(t = {}, a) {
  const o = ae(Y, H({})), e = Ce("useDefaults");
  if (a = a ?? e.type.name ?? e.type.__name, !a)
    throw new Error("[Bvn] Could not determine component name");
  const l = c(() => {
    var i;
    return (i = o.value) == null ? void 0 : i[t._as ?? a];
  }), n = new Proxy(t, {
    get(i, d) {
      var f, h, _, k;
      const y = Reflect.get(i, d);
      return d === "class" || d === "style" ? [(f = l.value) == null ? void 0 : f[d], y].filter((b) => b != null) : typeof d == "string" && !lt(e.vnode, d) ? ((h = l.value) == null ? void 0 : h[d]) ?? ((k = (_ = o.value) == null ? void 0 : _.global) == null ? void 0 : k[d]) ?? y : y;
    }
  }), s = Ne();
  Be(() => {
    if (l.value) {
      const i = Object.entries(l.value).filter(
        ([d]) => d.startsWith(d[0].toUpperCase())
      );
      s.value = i.length ? Object.fromEntries(i) : void 0;
    } else
      s.value = void 0;
  });
  function r() {
    const i = ot(Y, e);
    He(
      Y,
      c(
        () => s.value ? _e((i == null ? void 0 : i.value) ?? {}, s.value) : i == null ? void 0 : i.value
      )
    );
  }
  return { props: n, provideSubDefaults: r };
}
function N(t, a) {
  const { props: o, provideSubDefaults: e } = nt(t, a);
  return e(), o;
}
const V = (t, a) => {
  const o = Ie();
  return c(() => M(t) || `__BVID__${o}___BV_${a}__`);
}, st = (t, a = {}) => {
  const o = (l = []) => {
    const { activeElement: n } = document;
    return n && !l.some((s) => s === n) ? n : null;
  }, e = (l) => l === o();
  try {
    t.focus(a);
  } catch (l) {
    console.error(l);
  }
  return e(t);
}, ke = (t) => ((t == null ? void 0 : t()) ?? []).length === 0, rt = (t) => {
  if (t.getAttribute("display") === "none")
    return !1;
  const a = t.getBoundingClientRect();
  return !!(a && a.height > 0 && a.width > 0);
}, it = typeof window < "u" && typeof document < "u" && typeof navigator < "u";
A({
  name: "ConditionalTeleport",
  inheritAttrs: !1,
  slots: Object,
  props: {
    to: {
      type: [String, Object],
      default: null
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup(t, { slots: a }) {
    return () => {
      var o, e;
      return t.disabled || !t.to ? (o = a.default) == null ? void 0 : o.call(a, {}) : T(Pe, { to: t.to }, [(e = a.default) == null ? void 0 : e.call(a, {})]);
    };
  }
});
const dt = (t, a) => [...a].reduce(
  (o, e) => (o[e] = t[e], o),
  {}
), ut = /* @__PURE__ */ A({
  __name: "BTransition",
  props: {
    appear: { type: Boolean, default: !1 },
    mode: { default: void 0 },
    noFade: { type: Boolean, default: !1 },
    transProps: { default: void 0 }
  },
  emits: ["after-appear", "after-enter", "after-leave", "appear", "before-appear", "before-enter", "before-leave", "enter", "appear-cancelled", "enter-cancelled", "leave", "leave-cancelled"],
  setup(t, { emit: a }) {
    const o = t, e = a, l = c(() => {
      const s = {
        name: "",
        enterActiveClass: "",
        enterToClass: "",
        leaveActiveClass: "",
        leaveToClass: "showing",
        enterFromClass: "showing",
        leaveFromClass: ""
      }, r = {
        ...s,
        enterActiveClass: "fade showing",
        leaveActiveClass: "fade showing"
      };
      return o.noFade ? s : r;
    }), n = c(() => ({ mode: o.mode, css: !0, ...l.value }));
    return (s, r) => (g(), w(Me, P({ ...n.value, ...o.transProps }, {
      appear: o.appear,
      onAfterAppear: r[0] || (r[0] = (i) => e("after-appear", i)),
      onAfterEnter: r[1] || (r[1] = (i) => e("after-enter", i)),
      onAfterLeave: r[2] || (r[2] = (i) => e("after-leave", i)),
      onAppear: r[3] || (r[3] = (i) => e("appear", i)),
      onBeforeAppear: r[4] || (r[4] = (i) => e("before-appear", i)),
      onBeforeEnter: r[5] || (r[5] = (i) => e("before-enter", i)),
      onBeforeLeave: r[6] || (r[6] = (i) => e("before-leave", i)),
      onEnter: r[7] || (r[7] = (i) => e("enter", i)),
      onAppearCancelled: r[8] || (r[8] = (i) => e("appear-cancelled", i)),
      onEnterCancelled: r[9] || (r[9] = (i) => e("enter-cancelled", i)),
      onLeave: r[10] || (r[10] = (i) => e("leave", i)),
      onLeaveCancelled: r[11] || (r[11] = (i) => e("leave-cancelled", i))
    }), {
      default: F(() => [
        x(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["appear"]));
  }
}), ct = ["type", "disabled", "aria-label"], pt = /* @__PURE__ */ A({
  __name: "BCloseButton",
  props: {
    ariaLabel: { default: "Close" },
    disabled: { type: Boolean, default: !1 },
    type: { default: "button" }
  },
  emits: ["click"],
  setup(t, { emit: a }) {
    const e = N(t, "BCloseButton"), l = a;
    return (n, s) => (g(), L("button", {
      type: u(e).type,
      class: "btn-close",
      disabled: u(e).disabled,
      "aria-label": u(e).ariaLabel,
      onClick: s[0] || (s[0] = (r) => l("click", r))
    }, null, 8, ct));
  }
}), ft = {
  key: 0,
  class: "visually-hidden"
}, vt = /* @__PURE__ */ A({
  __name: "BSpinner",
  props: {
    label: { default: void 0 },
    role: { default: "status" },
    small: { type: Boolean, default: !1 },
    tag: { default: "span" },
    type: { default: "border" },
    variant: { default: null }
  },
  setup(t) {
    const o = N(t, "BSpinner"), e = ye(), l = c(() => [
      `spinner-${o.type}`,
      {
        [`spinner-${o.type}-sm`]: o.small,
        [`text-${o.variant}`]: o.variant !== null
      }
    ]), n = c(() => !ke(e.label));
    return (s, r) => (g(), w(O(u(o).tag), {
      class: I(l.value),
      role: u(o).label || n.value ? u(o).role : null,
      "aria-hidden": u(o).label || n.value ? null : !0
    }, {
      default: F(() => [
        u(o).label || n.value ? (g(), L("span", ft, [
          x(s.$slots, "label", {}, () => [
            z(D(u(o).label), 1)
          ])
        ])) : j("", !0)
      ]),
      _: 3
    }, 8, ["class", "role", "aria-hidden"]));
  }
}), mt = (t) => !!(t.href || t.to), Se = (t, a) => {
  const o = E(le(a)), e = E(le(t)), l = c(() => mt(e.value)), n = c(
    () => l.value ? dt(
      e.value,
      o.value ?? [
        "active",
        "activeClass",
        "append",
        "href",
        "rel",
        "replace",
        "routerComponentName",
        "target",
        "to",
        "variant",
        "opacity",
        "opacityHover",
        "underlineVariant",
        "underlineOffset",
        "underlineOffsetHover",
        "underlineOpacity",
        "underlineOpacityHover"
      ]
    ) : {}
  );
  return { computedLink: l, computedLinkProps: n };
}, Ae = (t) => c(() => {
  const a = M(t);
  return {
    [`link-${a.variant}`]: a.variant !== null,
    [`link-opacity-${a.opacity}`]: a.opacity !== void 0,
    [`link-opacity-${a.opacityHover}-hover`]: a.opacityHover !== void 0,
    [`link-underline-${a.underlineVariant}`]: a.underlineVariant !== null,
    [`link-offset-${a.underlineOffset}`]: a.underlineOffset !== void 0,
    [`link-offset-${a.underlineOffsetHover}-hover`]: a.underlineOffsetHover !== void 0,
    "link-underline": a.underlineVariant === null && (a.underlineOpacity !== void 0 || a.underlineOpacityHover !== void 0),
    [`link-underline-opacity-${a.underlineOpacity}`]: a.underlineOpacity !== void 0,
    [`link-underline-opacity-${a.underlineOpacityHover}-hover`]: a.underlineOpacityHover !== void 0,
    "icon-link": a.icon === !0
  };
}), ce = "active", we = /* @__PURE__ */ A({
  __name: "BLink",
  props: {
    active: { type: Boolean, default: void 0 },
    activeClass: { default: "router-link-active" },
    disabled: { type: Boolean, default: !1 },
    exactActiveClass: { default: "router-link-exact-active" },
    href: { default: void 0 },
    icon: { type: Boolean, default: !1 },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    rel: { default: void 0 },
    replace: { type: Boolean, default: !1 },
    routerComponentName: { default: "router-link" },
    routerTag: { default: "a" },
    stretched: { type: Boolean, default: !1 },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: null },
    variant: { default: null }
  },
  emits: ["click"],
  setup(t, { emit: a }) {
    const e = N(t, "BLink"), l = a, n = De(), s = ae(Ge, null), r = ae(Xe, null), i = be(), d = c(() => {
      const v = e.routerComponentName.split("-").map((C) => C.charAt(0).toUpperCase() + C.slice(1)).join("");
      return !((i == null ? void 0 : i.appContext.app.component(v)) !== void 0) || e.disabled || !e.to ? "a" : e.routerComponentName;
    }), f = c(() => {
      const v = "#";
      if (e.href) return e.href;
      if (typeof e.to == "string") return e.to || v;
      const { to: p } = e;
      if (p !== void 0 && "path" in p) {
        const C = p.path || "", m = p.query ? `?${Object.keys(p.query).map((B) => {
          var $;
          return `${B}=${($ = p.query) == null ? void 0 : $[B]}`;
        }).join("=")}` : "", S = !p.hash || p.hash.charAt(0) === "#" ? p.hash || "" : `#${p.hash}`;
        return `${C}${m}${S}` || v;
      }
      return v;
    }), h = Ae(e), _ = c(() => [
      h.value,
      {
        "stretched-link": e.stretched === !0
      }
    ]), k = c(() => ({
      class: _.value,
      to: e.to,
      replace: e.replace,
      href: f.value,
      target: e.target,
      rel: e.target === "_blank" ? e.rel ?? "noopener" : void 0,
      tabindex: e.disabled ? "-1" : typeof n.tabindex > "u" ? null : n.tabindex,
      "aria-disabled": e.disabled ? !0 : null
    })), y = c(() => ({
      [ce]: e.active,
      disabled: e.disabled
    })), b = (v) => {
      var p, C, m;
      if (e.disabled) {
        v.preventDefault(), v.stopImmediatePropagation();
        return;
      }
      (((p = s == null ? void 0 : s.isNav) == null ? void 0 : p.value) === !0 && r === null || r !== null && ((C = r.autoClose) == null ? void 0 : C.value) === !0) && ((m = s == null ? void 0 : s.hide) == null || m.call(s)), l("click", v);
    };
    return (v, p) => d.value === "router-link" ? (g(), w(O(d.value), P({ key: 0 }, k.value, { custom: "" }), {
      default: F(({ href: C, navigate: m, isActive: S, isExactActive: B }) => [
        (g(), w(O(u(e).routerTag), P({
          href: C,
          target: u(e).target,
          class: {
            [ce]: u(e).active,
            [u(e).activeClass]: S,
            [u(e).exactActiveClass]: B
          }
        }, v.$attrs, {
          onClick: ($) => {
            m($), b($);
          }
        }), {
          default: F(() => [
            x(v.$slots, "default")
          ]),
          _: 2
        }, 1040, ["href", "target", "class", "onClick"]))
      ]),
      _: 3
    }, 16)) : (g(), w(O(d.value), P({
      key: 1,
      class: y.value
    }, k.value, { onClick: b }), {
      default: F(() => [
        x(v.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Bt = /* @__PURE__ */ A({
  __name: "BButton",
  props: /* @__PURE__ */ W({
    loading: { type: Boolean, default: !1 },
    loadingFill: { type: Boolean, default: !1 },
    loadingText: { default: "Loading..." },
    pill: { type: Boolean, default: !1 },
    size: { default: "md" },
    squared: { type: Boolean, default: !1 },
    tag: { default: "button" },
    type: { default: "button" },
    variant: { default: "secondary" },
    active: { type: Boolean, default: !1 },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    icon: { type: Boolean, default: !1 },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    routerTag: { default: void 0 },
    stretched: { type: Boolean, default: !1 },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: null }
  }, {
    pressed: { type: Boolean, default: void 0 },
    pressedModifiers: {}
  }),
  emits: /* @__PURE__ */ W(["click"], ["update:pressed"]),
  setup(t, { emit: a }) {
    const e = N(t, "BButton"), l = a, n = H(null), s = ge(t, "pressed"), { computedLink: r, computedLinkProps: i } = Se(e, [
      "active-class",
      "exact-active-class",
      "replace",
      "routerComponentName",
      "routerTag"
    ]), d = c(() => typeof s.value == "boolean"), f = c(
      () => e.tag === "button" && e.href === void 0 && e.to === void 0
    ), h = c(() => e.to !== void 0), _ = c(() => e.href !== void 0 ? !1 : !f.value), k = c(() => h.value ? i.value : []), y = c(() => e.href === "#" && e.disabled ? !0 : _.value ? e.disabled : null), b = c(() => {
      var B;
      return ((B = e.variant) == null ? void 0 : B.startsWith("link")) || !1;
    }), v = c(() => {
      var B;
      return ((B = e.variant) == null ? void 0 : B.startsWith("link-")) || !1;
    }), p = Ae(
      c(() => {
        var B;
        return {
          ...b.value && {
            icon: e.icon,
            opacity: e.opacity,
            opacityHover: e.opacityHover,
            underlineOffset: e.underlineOffset,
            underlineOffsetHover: e.underlineOffsetHover,
            underlineOpacity: e.underlineOpacity,
            underlineOpacityHover: e.underlineOpacityHover,
            underlineVariant: e.underlineVariant,
            variant: v.value === !0 ? (B = e.variant) == null ? void 0 : B.slice(5) : null
          }
        };
      })
    ), C = c(() => [
      b.value === !0 && r.value === !1 ? p.value : void 0,
      [`btn-${e.size}`],
      {
        [`btn-${e.variant}`]: e.variant !== null && v.value === !1,
        active: e.active || s.value,
        "rounded-pill": e.pill,
        "rounded-0": e.squared,
        disabled: e.disabled
      }
    ]), m = c(() => h.value ? we : e.href ? "a" : e.tag), S = (B) => {
      if (e.disabled) {
        B.preventDefault(), B.stopPropagation();
        return;
      }
      l("click", B), d.value && (s.value = !s.value);
    };
    return Qe(
      [" ", "enter"],
      (B) => {
        var $;
        e.href === "#" && (B.preventDefault(), ($ = n.value) == null || $.click());
      },
      { target: n }
    ), (B, $) => (g(), w(O(m.value), P({
      ref_key: "element",
      ref: n,
      class: "btn"
    }, k.value, {
      class: C.value,
      "aria-disabled": y.value,
      "aria-pressed": d.value ? s.value : null,
      autocomplete: d.value ? "off" : null,
      disabled: f.value ? u(e).disabled : null,
      href: u(e).href,
      rel: u(r) ? u(e).rel : null,
      role: _.value || u(r) ? "button" : null,
      target: u(r) ? u(e).target : null,
      type: f.value ? u(e).type : null,
      to: f.value ? null : u(e).to,
      onClick: S
    }), {
      default: F(() => [
        u(e).loading ? x(B.$slots, "loading", { key: 0 }, () => [
          u(e).loadingFill ? j("", !0) : (g(), L(re, { key: 0 }, [
            z(D(u(e).loadingText), 1)
          ], 64)),
          x(B.$slots, "loading-spinner", {}, () => [
            U(vt, {
              small: u(e).size !== "lg",
              label: u(e).loadingFill ? u(e).loadingText : void 0
            }, null, 8, ["small", "label"])
          ])
        ]) : x(B.$slots, "default", { key: 1 })
      ]),
      _: 3
    }, 16, ["class", "aria-disabled", "aria-pressed", "autocomplete", "disabled", "href", "rel", "role", "target", "type", "to"]));
  }
}), bt = (t, a, o = {}) => {
  const e = E(le(t)), l = H(!1), n = H(Date.now() + e.value), { isActive: s, pause: r, resume: i, timestamp: d } = tt({
    interval: a,
    controls: !0,
    callback: (b) => {
      b >= n.value && (l.value = !1, r());
    },
    ...o
  }), f = c(() => n.value - d.value), h = () => {
    n.value = Date.now() + e.value, i();
  };
  G(e, () => {
    h();
  });
  const _ = () => {
    l.value = !0, r();
  }, k = () => {
    l.value = !1;
    const b = n.value - d.value;
    n.value = Date.now() + b, i();
  }, y = () => {
    r(), d.value = n.value, l.value = !1;
  };
  return {
    isActive: E(s),
    isPaused: E(l),
    stop: y,
    pause: _,
    resume: k,
    restart: h,
    value: f
  };
}, yt = (t, a, o) => {
  const e = et(t), l = () => {
    M(a).noHoverPause || o.pause();
  }, n = () => {
    M(a).noResumeOnHoverLeave || o.resume();
  };
  return G(e, (s) => {
    if (s) {
      l();
      return;
    }
    n();
  }), {
    isHovering: e
  };
}, gt = (t, a) => {
  const o = t.__vccOpts || t;
  for (const [e, l] of a)
    o[e] = l;
  return o;
}, ht = /* @__PURE__ */ A({
  __name: "BAlert",
  props: /* @__PURE__ */ W({
    closeClass: { default: void 0 },
    closeContent: { default: void 0 },
    closeLabel: { default: "Close" },
    closeVariant: { default: "secondary" },
    dismissible: { type: Boolean, default: !1 },
    fade: { type: Boolean, default: !1 },
    immediate: { type: Boolean, default: !0 },
    interval: { default: "requestAnimationFrame" },
    noHoverPause: { type: Boolean, default: !1 },
    noResumeOnHoverLeave: { type: Boolean, default: !1 },
    showOnPause: { type: Boolean, default: !0 },
    variant: { default: "info" }
  }, {
    modelValue: { type: [Boolean, Number], default: !1 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ W(["close", "close-countdown", "closed"], ["update:modelValue"]),
  setup(t, { expose: a, emit: o }) {
    const l = N(t, "BAlert"), n = o, s = ye(), r = H(null), i = ge(t, "modelValue"), d = c(() => !ke(s.close)), f = c(
      () => typeof i.value == "boolean" ? 0 : i.value
    ), h = c(() => ({
      [`alert-${l.variant}`]: l.variant !== null,
      "alert-dismissible": l.dismissible
    })), _ = c(() => [l.closeClass, { "btn-close-custom": d.value }]), {
      isActive: k,
      pause: y,
      resume: b,
      stop: v,
      isPaused: p,
      restart: C,
      value: m
    } = bt(f, l.interval, {
      immediate: typeof i.value == "number" && l.immediate
    });
    yt(
      r,
      c(() => ({
        noHoverPause: l.noHoverPause,
        noResumeOnHoverLeave: l.noResumeOnHoverLeave
      })),
      { pause: y, resume: b }
    );
    const S = c(
      () => typeof i.value == "boolean" ? i.value : k.value || l.showOnPause && p.value
    ), B = c(() => ({
      variant: d.value ? l.closeVariant : void 0,
      class: _.value
    }));
    Be(() => {
      n("close-countdown", m.value);
    });
    const $ = () => {
      n("close"), typeof i.value == "boolean" ? i.value = !1 : (i.value = 0, v()), n("closed");
    };
    return a({
      pause: y,
      resume: b,
      stop: v,
      restart: C
    }), (X, zt) => (g(), w(ut, {
      "no-fade": !u(l).fade,
      "trans-props": { enterToClass: "show" }
    }, {
      default: F(() => [
        S.value ? (g(), L("div", {
          key: 0,
          ref_key: "element",
          ref: r,
          class: I(["alert", h.value]),
          role: "alert",
          "aria-live": "polite",
          "aria-atomic": "true"
        }, [
          x(X.$slots, "default", {}, void 0, !0),
          u(l).dismissible ? (g(), L(re, { key: 0 }, [
            d.value || u(l).closeContent ? (g(), w(Bt, P({ key: 0 }, B.value, { onClick: $ }), {
              default: F(() => [
                x(X.$slots, "close", {}, () => [
                  z(D(u(l).closeContent), 1)
                ], !0)
              ]),
              _: 3
            }, 16)) : (g(), w(pt, P({
              key: 1,
              "aria-label": u(l).closeLabel
            }, B.value, { onClick: $ }), null, 16, ["aria-label"]))
          ], 64)) : j("", !0)
        ], 2)) : j("", !0)
      ]),
      _: 3
    }, 8, ["no-fade"]));
  }
}), jt = /* @__PURE__ */ gt(ht, [["__scopeId", "data-v-d1c92ab3"]]), Ct = (t) => c(() => {
  let a = M(t);
  return a = {
    ...a,
    variant: a.variant ?? null,
    bgVariant: a.bgVariant ?? null,
    textVariant: a.textVariant ?? null
  }, {
    [`text-bg-${a.variant}`]: a.variant !== null,
    [`text-${a.textVariant}`]: a.textVariant !== null,
    [`bg-${a.bgVariant}`]: a.bgVariant !== null
  };
}), _t = A({
  name: "ConditionalWrapper",
  inheritAttrs: !1,
  slots: Object,
  props: {
    tag: {
      type: String,
      default: "div"
    },
    skip: {
      type: Boolean,
      default: !1
    }
  },
  setup(t, { slots: a, attrs: o }) {
    return () => {
      var e, l;
      return t.skip ? (e = a.default) == null ? void 0 : e.call(a, {}) : T(t.tag, { ...o }, [(l = a.default) == null ? void 0 : l.call(a, {})]);
    };
  }
}), Gt = /* @__PURE__ */ A({
  __name: "BBadge",
  props: {
    dotIndicator: { type: Boolean, default: !1 },
    pill: { type: Boolean, default: !1 },
    placement: { default: void 0 },
    tag: { default: "span" },
    active: { type: Boolean, default: void 0 },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    icon: { type: Boolean, default: void 0 },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    stretched: { type: Boolean, default: !1 },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: void 0 },
    variant: { default: "secondary" },
    bgVariant: { default: null },
    textVariant: { default: null }
  },
  setup(t) {
    const o = N(t, "BBadge"), e = Ct(o), { computedLink: l, computedLinkProps: n } = Se(o, [
      "active",
      "activeClass",
      "append",
      "disabled",
      "href",
      "rel",
      "replace",
      "routerComponentName",
      "target",
      "to",
      "opacity",
      "opacityHover",
      "underlineVariant",
      "underlineOffset",
      "underlineOffsetHover",
      "underlineOpacity",
      "underlineOpacityHover",
      "icon"
    ]), s = c(() => l.value ? we : o.tag), r = c(() => {
      const d = o.placement ?? (o.dotIndicator ? "top-end" : void 0);
      return [
        "position-absolute",
        "translate-middle",
        {
          "start-0 top-0": d === "top-start",
          "start-0 top-50": d === "start",
          "start-0 top-100": d === "bottom-start",
          "start-50 top-0": d === "top",
          "start-50 top-100": d === "bottom",
          "start-100 top-0": d === "top-end",
          "start-100 top-50": d === "end",
          "start-100 top-100": d === "bottom-end"
        }
      ];
    }), i = c(() => [
      e.value,
      o.placement !== void 0 || o.dotIndicator === !0 ? r.value : void 0,
      {
        active: o.active,
        disabled: o.disabled,
        "rounded-pill": o.pill,
        "p-2 border border-light rounded-circle": o.dotIndicator,
        "text-decoration-none": l.value
      }
    ]);
    return (d, f) => (g(), w(O(s.value), P({
      class: ["badge", i.value]
    }, u(n)), {
      default: F(() => [
        U(_t, P({
          skip: u(o).dotIndicator !== !0,
          tag: "span"
        }, u(o).dotIndicator ? { class: "visually-hidden" } : {}), {
          default: F(() => [
            x(d.$slots, "default")
          ]),
          _: 3
        }, 16, ["skip"])
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), te = (t, a, o, e = o) => a.reduce((l, n) => (t[n] && l.push(
  [e, n.replace(o, ""), t[n]].filter((s) => s && typeof s != "boolean").join("-").toLowerCase()
), l), []), q = /* @__PURE__ */ A({
  __name: "BCol",
  props: {
    alignSelf: { default: void 0 },
    tag: { default: "div" },
    order: { default: void 0 },
    offset: { default: void 0 },
    cols: { default: void 0 },
    col: { type: Boolean, default: !1 },
    offsetSm: { default: void 0 },
    offsetMd: { default: void 0 },
    offsetLg: { default: void 0 },
    offsetXl: { default: void 0 },
    offsetXxl: { default: void 0 },
    orderSm: { default: void 0 },
    orderMd: { default: void 0 },
    orderLg: { default: void 0 },
    orderXl: { default: void 0 },
    orderXxl: { default: void 0 },
    sm: { type: [Boolean, Number, String], default: !1 },
    md: { type: [Boolean, Number, String], default: !1 },
    lg: { type: [Boolean, Number, String], default: !1 },
    xl: { type: [Boolean, Number, String], default: !1 },
    xxl: { type: [Boolean, Number, String], default: !1 }
  },
  setup(t) {
    const o = N(t, "BCol"), e = c(() => [
      ...te(
        {
          sm: o.sm,
          md: o.md,
          lg: o.lg,
          xl: o.xl,
          xxl: o.xxl
        },
        ["sm", "md", "lg", "xl", "xxl"],
        "col"
      ),
      ...te(
        {
          order: o.order,
          orderLg: o.orderLg,
          orderMd: o.orderMd,
          orderSm: o.orderSm,
          orderXl: o.orderXl,
          orderXxl: o.orderXxl
        },
        ["order", "orderLg", "orderMd", "orderSm", "orderXl", "orderXxl"],
        "order"
      ),
      ...te(
        {
          offset: o.offset,
          offsetLg: o.offsetLg,
          offsetMd: o.offsetMd,
          offsetSm: o.offsetSm,
          offsetXl: o.offsetXl,
          offsetXxl: o.offsetXxl
        },
        ["offset", "offsetLg", "offsetMd", "offsetSm", "offsetXl", "offsetXxl"],
        "offset"
      )
    ]), l = c(() => [
      e.value,
      {
        col: o.col || !e.value.some((n) => n.startsWith("col-")) && !o.cols,
        [`col-${o.cols}`]: o.cols !== void 0,
        [`offset-${o.offset}`]: o.offset !== void 0,
        [`order-${o.order}`]: o.order !== void 0,
        [`align-self-${o.alignSelf}`]: o.alignSelf !== void 0
      }
    ]);
    return (n, s) => (g(), w(O(u(o).tag), {
      class: I(l.value)
    }, {
      default: F(() => [
        x(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), pe = /* @__PURE__ */ A({
  __name: "BFormInvalidFeedback",
  props: {
    ariaLive: { default: void 0 },
    forceShow: { type: Boolean, default: !1 },
    id: { default: void 0 },
    role: { default: void 0 },
    state: { type: [Boolean, null], default: null },
    tag: { default: "div" },
    text: { default: void 0 },
    tooltip: { type: Boolean, default: !1 }
  },
  setup(t) {
    const o = N(t, "BFormInvalidFeedback"), e = c(() => o.forceShow === !0 || o.state === !1), l = c(() => ({
      "d-block": e.value,
      "invalid-feedback": !o.tooltip,
      "invalid-tooltip": o.tooltip
    }));
    return (n, s) => (g(), w(O(u(o).tag), {
      id: u(o).id,
      role: u(o).role,
      "aria-live": u(o).ariaLive,
      "aria-atomic": u(o).ariaLive ? !0 : void 0,
      class: I(l.value)
    }, {
      default: F(() => [
        x(n.$slots, "default", {}, () => [
          z(D(u(o).text), 1)
        ])
      ]),
      _: 3
    }, 8, ["id", "role", "aria-live", "aria-atomic", "class"]));
  }
}), oe = /* @__PURE__ */ A({
  __name: "BFormRow",
  props: {
    tag: { default: "div" }
  },
  setup(t) {
    const o = N(t, "BFormRow");
    return (e, l) => (g(), w(O(u(o).tag), { class: "row d-flex flex-wrap" }, {
      default: F(() => [
        x(e.$slots, "default")
      ]),
      _: 3
    }));
  }
}), fe = /* @__PURE__ */ A({
  __name: "BFormText",
  props: {
    id: { default: void 0 },
    inline: { type: Boolean, default: !1 },
    tag: { default: "small" },
    text: { default: void 0 },
    textVariant: { default: "body-secondary" }
  },
  setup(t) {
    const o = N(t, "BFormText"), e = c(() => ({
      [`text-${o.textVariant}`]: o.textVariant !== null,
      "form-text": !o.inline
    }));
    return (l, n) => (g(), w(O(u(o).tag), {
      id: u(o).id,
      class: I(e.value)
    }, {
      default: F(() => [
        x(l.$slots, "default", {}, () => [
          z(D(u(o).text), 1)
        ])
      ]),
      _: 3
    }, 8, ["id", "class"]));
  }
}), ve = /* @__PURE__ */ A({
  __name: "BFormValidFeedback",
  props: {
    ariaLive: { default: void 0 },
    forceShow: { type: Boolean, default: !1 },
    id: { default: void 0 },
    role: { default: void 0 },
    state: { type: [Boolean, null], default: null },
    tag: { default: "div" },
    text: { default: void 0 },
    tooltip: { type: Boolean, default: !1 }
  },
  setup(t) {
    const o = N(t, "BFormInvalidFeedback"), e = c(() => o.forceShow === !0 || o.state === !0), l = c(() => ({
      "d-block": e.value,
      "valid-feedback": !o.tooltip,
      "valid-tooltip": o.tooltip
    }));
    return (n, s) => (g(), w(O(u(o).tag), {
      id: u(o).id,
      role: u(o).role,
      "aria-live": u(o).ariaLive,
      "aria-atomic": u(o).ariaLive ? !0 : void 0,
      class: I(l.value)
    }, {
      default: F(() => [
        x(n.$slots, "default", {}, () => [
          z(D(u(o).text), 1)
        ])
      ]),
      _: 3
    }, 8, ["id", "role", "aria-live", "aria-atomic", "class"]));
  }
}), kt = (t, a) => c(() => {
  const o = M(t), e = M(a);
  return o === !0 ? "true" : typeof o == "string" ? o : e === !1 ? "true" : o === !1 ? "false" : void 0;
}), St = (t) => c(() => {
  const a = M(t);
  return a === !0 ? "is-valid" : a === !1 ? "is-invalid" : null;
}), At = (t) => {
  const a = t.trim();
  return a.charAt(0).toUpperCase() + a.slice(1);
}, me = (t, a) => a + (t ? At(t) : ""), R = (t, a = {}, o = {}) => {
  const e = [t];
  let l;
  for (let n = 0; n < e.length && !l; n++) {
    const s = e[n];
    l = o[s];
  }
  return l && typeof l == "function" ? l(a) : l;
}, Te = ["input", "select", "textarea"], wt = Te.map((t) => `${t}:not([disabled])`).join(), Tt = [...Te, "a", "button", "label"], Ft = "label", xt = "invalid-feedback", $t = "valid-feedback", Lt = "description", Ot = "default";
A({
  components: { BCol: q, BFormInvalidFeedback: pe, BFormRow: oe, BFormText: fe, BFormValidFeedback: ve },
  props: {
    ariaInvalid: { type: [Boolean, String], default: void 0 },
    contentCols: { type: [Boolean, String, Number], default: void 0 },
    contentColsLg: { type: [Boolean, String, Number], default: void 0 },
    contentColsMd: { type: [Boolean, String, Number], default: void 0 },
    contentColsSm: { type: [Boolean, String, Number], default: void 0 },
    contentColsXl: { type: [Boolean, String, Number], default: void 0 },
    description: { type: [String], default: void 0 },
    disabled: { type: Boolean, default: !1 },
    feedbackAriaLive: { type: String, default: "assertive" },
    floating: { type: Boolean, default: !1 },
    id: { type: String, default: void 0 },
    invalidFeedback: { type: String, default: void 0 },
    label: { type: String, default: void 0 },
    labelAlign: { type: [String], default: void 0 },
    labelAlignLg: { type: [String], default: void 0 },
    labelAlignMd: { type: [String], default: void 0 },
    labelAlignSm: { type: [String], default: void 0 },
    labelAlignXl: { type: [String], default: void 0 },
    labelClass: { type: [Array, Object, String], default: void 0 },
    labelCols: { type: [Boolean, String, Number], default: void 0 },
    labelColsLg: { type: [Boolean, String, Number], default: void 0 },
    labelColsMd: { type: [Boolean, String, Number], default: void 0 },
    labelColsSm: { type: [Boolean, String, Number], default: void 0 },
    labelColsXl: { type: [Boolean, String, Number], default: void 0 },
    labelFor: { type: String, default: void 0 },
    labelSize: { type: String, default: void 0 },
    labelVisuallyHidden: { type: Boolean, default: !1 },
    state: { type: Boolean, default: null },
    tooltip: { type: Boolean, default: !1 },
    validFeedback: { type: String, default: void 0 },
    validated: { type: Boolean, default: !1 }
  },
  setup(t) {
    const o = ["xs", "sm", "md", "lg", "xl"], e = (y, b) => o.reduce((v, p) => {
      const C = me(p === "xs" ? "" : p, `${b}Align`), m = y[C] || null;
      return m && (p === "xs" ? v.push(`text-${m}`) : v.push(`text-${p}-${m}`)), v;
    }, []), l = (y, b) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      o.reduce((v, p) => {
        const C = me(p === "xs" ? "" : p, `${b}Cols`);
        let m = y[C];
        if (m = m === "" ? !0 : m || !1, typeof m != "boolean" && m !== "auto") {
          const S = Number.parseInt(m);
          m = Number.isNaN(S) ? 0 : S, m = m > 0 ? m : !1;
        }
        return m && (p === "xs" ? v[typeof m == "boolean" ? "col" : "cols"] = m : v[p || (typeof m == "boolean" ? "col" : "cols")] = m), v;
      }, {})
    ), n = H(null), s = (y, b = null) => {
      if (it && t.labelFor && n.value !== null) {
        const v = n.value.querySelector(`#${CSS.escape(t.labelFor)}`);
        if (v) {
          const p = "aria-describedby", C = (y || "").split(ee), m = (b || "").split(ee), S = (v.getAttribute(p) || "").split(ee).filter((B) => !m.includes(B)).concat(C).filter((B, $, X) => X.indexOf(B) === $).filter((B) => B).join(" ").trim();
          S ? v.setAttribute(p, S) : v.removeAttribute(p);
        }
      }
    }, r = c(() => l(t, "content")), i = c(() => e(t, "label")), d = c(() => l(t, "label")), f = c(
      () => (
        // Determine if the form group will be rendered horizontal
        // based on the existence of 'content-col' or 'label-col' props
        Object.keys(r.value).length > 0 || Object.keys(d.value).length > 0
      )
    ), h = St(() => t.state), _ = kt(
      () => t.ariaInvalid,
      () => t.state
    );
    return G(
      () => null,
      (y, b) => {
        y !== b && s(y, b);
      }
    ), Ve(() => {
      Ee(() => {
        s(null);
      });
    }), {
      ariaDescribedby: null,
      computedAriaInvalid: _,
      contentColProps: r,
      isHorizontal: f,
      labelAlignClasses: i,
      labelColProps: d,
      onLegendClick: (y) => {
        if (t.labelFor || n.value === null) return;
        const { target: b } = y, v = b ? b.tagName : "";
        if (Tt.indexOf(v) !== -1) return;
        const p = [...n.value.querySelectorAll(wt)].filter(rt), [C] = p;
        p.length === 1 && C instanceof HTMLElement && st(C);
      },
      stateClass: h
    };
  },
  render() {
    const t = this.$props, a = this.$slots, o = V(), e = !t.labelFor;
    let l = null;
    const n = R(Ft, {}, a) || t.label, s = n ? V(void 0, "_BV_label_").value : null;
    if (n || this.isHorizontal) {
      const S = e ? "legend" : "label";
      if (t.labelVisuallyHidden)
        n && (l = T(
          S,
          {
            class: "visually-hidden",
            id: s,
            for: t.labelFor || null
          },
          n
        )), this.isHorizontal ? l = T(q, this.labelColProps, { default: () => l }) : l = T("div", {}, [l]);
      else {
        const B = {
          onClick: e ? this.onLegendClick : null,
          ...this.isHorizontal ? this.labelColProps : {},
          tag: this.isHorizontal ? S : null,
          id: s,
          for: t.labelFor || null,
          tabIndex: e ? "-1" : null,
          class: [
            this.isHorizontal ? "col-form-label" : "form-label",
            {
              "bv-no-focus-ring": e,
              "col-form-label": this.isHorizontal || e,
              "pt-0": !this.isHorizontal && e,
              "d-block": !this.isHorizontal && !e,
              [`col-form-label-${t.labelSize}`]: !!t.labelSize
            },
            this.labelAlignClasses,
            t.labelClass
          ]
        };
        this.isHorizontal ? l = T(q, B, { default: () => n }) : l = T(S, B, n);
      }
    }
    let r = null;
    const i = R(xt, {}, a) || this.invalidFeedback, d = i ? V(void 0, "_BV_feedback_invalid_").value : void 0;
    i && (r = T(
      pe,
      {
        ariaLive: t.feedbackAriaLive,
        id: d,
        state: t.state,
        tooltip: t.tooltip
      },
      { default: () => i }
    ));
    let f = null;
    const h = R($t, {}, a) || this.validFeedback, _ = h ? V(void 0, "_BV_feedback_valid_").value : void 0;
    h && (f = T(
      ve,
      {
        ariaLive: t.feedbackAriaLive,
        id: _,
        state: t.state,
        tooltip: t.tooltip
      },
      { default: () => h }
      // validFeedbackContent
    ));
    let k = null;
    const y = R(Lt, {}, a) || this.description, b = y ? V(void 0, "_BV_description_").value : void 0;
    y && (k = T(
      fe,
      {
        id: b
      },
      { default: () => y }
    ));
    const v = this.ariaDescribedby = [
      b,
      t.state === !1 ? d : null,
      t.state === !0 ? _ : null
    ].filter((S) => S).join(" ") || null, p = [
      R(Ot, { ariaDescribedby: v, descriptionId: b, id: o, labelId: s }, a) || "",
      r,
      f,
      k
    ];
    !this.isHorizontal && t.floating && p.push(l);
    let C = T(
      "div",
      {
        ref: "content",
        class: [
          {
            "form-floating": !this.isHorizontal && t.floating
          }
        ]
      },
      p
    );
    this.isHorizontal && (C = T(q, { ref: "content", ...this.contentColProps }, { default: () => p }));
    const m = {
      class: [
        this.stateClass,
        {
          "was-validated": t.validated
        }
      ],
      id: V(() => t.id).value,
      disabled: e ? t.disabled : null,
      role: e ? null : "group",
      "aria-invalid": this.computedAriaInvalid,
      // Only apply `aria-labelledby` if we are a horizontal fieldset
      // as the legend is no longer a direct child of fieldset
      "aria-labelledby": e && this.isHorizontal ? s : null
    };
    return this.isHorizontal && !e ? T(oe, m, { default: () => [l, C] }) : T(
      e ? "fieldset" : "div",
      m,
      this.isHorizontal && e ? [T(oe, null, { default: () => [l, C] })] : this.isHorizontal || !t.floating ? [l, C] : [C]
    );
  }
});
const Nt = {
  BAccordion: "/components/BAccordion",
  BAccordionItem: "/components/BAccordion",
  BAlert: "/components/BAlert",
  BAvatar: "/components/BAvatar",
  BAvatarGroup: "/components/BAvatar",
  BBadge: "/components/BBadge",
  BBreadcrumb: "/components/BBreadcrumb",
  BBreadcrumbItem: "/components/BBreadcrumb",
  BButton: "/components/BButton",
  BButtonGroup: "/components/BButton",
  BButtonToolbar: "/components/BButton",
  BCloseButton: "/components/BButton",
  BCard: "/components/BCard",
  BCardBody: "/components/BCard",
  BCardFooter: "/components/BCard",
  BCardGroup: "/components/BCard",
  BCardHeader: "/components/BCard",
  BCardImg: "/components/BCard",
  BCardSubtitle: "/components/BCard",
  BCardText: "/components/BCard",
  BCardTitle: "/components/BCard",
  BCarousel: "/components/BCarousel",
  BCarouselSlide: "/components/BCarousel",
  BCol: "/components/BContainer",
  BCollapse: "/components/BCollapse",
  BContainer: "/components/BContainer",
  BDropdown: "/components/BDropdown",
  BDropdownDivider: "/components/BDropdown",
  BDropdownForm: "/components/BDropdown",
  BDropdownGroup: "/components/BDropdown",
  BDropdownHeader: "/components/BDropdown",
  BDropdownItem: "/components/BDropdown",
  BDropdownItemButton: "/components/BDropdown",
  BDropdownText: "/components/BDropdown",
  BForm: "/components/BForm",
  BFormCheckbox: "/components/BFormCheckbox",
  BFormCheckboxGroup: "/components/BFormCheckbox",
  BFormDatalist: "/components/BForm",
  BFormFile: "/components/BFormFile",
  BFormFloatingLabel: "/components/BForm",
  BFormGroup: "/components/BFormGroup",
  BFormInput: "/components/BFormInput",
  BFormInvalidFeedback: "/components/BForm",
  BFormRadio: "/components/BFormRadio",
  BFormRadioGroup: "/components/BFormRadio",
  BFormRow: "/components/BForm",
  BFormSelect: "/components/BFormSelect",
  BFormSelectOption: "/components/BFormSelect",
  BFormSelectOptionGroup: "/components/BFormSelect",
  BFormSpinbutton: "/components/BFormSpinbutton",
  BFormTag: "/components/BFormTags",
  BFormTags: "/components/BFormTags",
  BFormText: "/components/BForm",
  BFormTextarea: "/components/BFormTextarea",
  BFormValidFeedback: "/components/BForm",
  BImg: "/components/BImg",
  BInput: "/components/BFormInput",
  BInputGroup: "/components/BInputGroup",
  BInputGroupText: "/components/BInputGroup",
  BListGroup: "/components/BListGroup",
  BListGroupItem: "/components/BListGroup",
  BModal: "/components/BModal",
  BModalOrchestrator: "/components/BModal",
  BNav: "/components/BNav",
  BNavForm: "/components/BNav",
  BNavItem: "/components/BNav",
  BNavItemDropdown: "/components/BNav",
  BNavText: "/components/BNav",
  BNavbar: "/components/BNavbar",
  BNavbarBrand: "/components/BNavbar",
  BNavbarNav: "/components/BNavbar",
  BNavbarToggle: "/components/BNavbar",
  BOffcanvas: "/components/BOffcanvas",
  BOverlay: "/components/BOverlay",
  BPagination: "/components/BPagination",
  BPlaceholder: "/components/BPlaceholder",
  BPlaceholderButton: "/components/BPlaceholder",
  BPlaceholderCard: "/components/BPlaceholder",
  BPlaceholderTable: "/components/BPlaceholder",
  BPlaceholderWrapper: "/components/BPlaceholder",
  BPopover: "/components/BPopover",
  BProgress: "/components/BProgress",
  BRow: "/components/BContainer",
  BSpinner: "/components/BSpinner",
  BTab: "/components/BTabs",
  BTabs: "/components/BTabs",
  BToast: "/components/BToast",
  BToastOrchestrator: "/components/BToast",
  BTooltip: "/components/BTooltip",
  BLink: "/components/BLink",
  BProgressBar: "/components/BProgress",
  BTableSimple: "/components/BTable",
  BTableLite: "/components/BTable",
  BTable: "/components/BTable",
  BTbody: "/components/BTable",
  BTd: "/components/BTable",
  BTh: "/components/BTable",
  BThead: "/components/BTable",
  BTfoot: "/components/BTable",
  BTr: "/components/BTable",
  BPopoverOrchestrator: "/components/BPopover",
  BTooltipOrchestrator: "/components/BTooltip"
};
Object.freeze(
  Object.keys(Nt)
);
const Ht = {
  vBColorMode: "/directives/BColorMode",
  vBModal: "/directives/BModal",
  vBPopover: "/directives/BPopover",
  vBScrollspy: "/directives/BScrollspy",
  vBToggle: "/directives/BToggle",
  vBTooltip: "/directives/BTooltip"
};
Object.freeze(
  Object.keys(Ht)
);
const It = {
  useBreadcrumb: "/composables/useBreadcrumb",
  useColorMode: "/composables/useColorMode",
  useModal: "/composables/useModal",
  useModalController: "/composables/useModalController",
  useScrollspy: "/composables/useScrollspy",
  useToast: "/composables/useToast",
  usePopover: "/composables/usePopover",
  useTooltip: "/composables/useTooltip"
};
Object.freeze(
  Object.keys(It)
);
const Pt = { class: "mde-header border-bottom border-body-secondary text-light d-flex align-items-center px-4" }, Xt = /* @__PURE__ */ A({
  __name: "MDEHeader",
  setup(t) {
    let a = !1;
    function o() {
      var e;
      a = !a, (e = document.querySelector("html")) == null || e.setAttribute("data-bs-theme", a ? "dark" : "light");
    }
    return (e, l) => (g(), L("header", Pt, [
      l[2] || (l[2] = Q("div", {
        class: "fw-bold fs-2 flex-fill",
        role: "button"
      }, "MDEMITS", -1)),
      Q("div", {
        class: "d-grid column-gap-3",
        style: { "grid-template-columns": "auto auto auto" }
      }, [
        l[1] || (l[1] = ie('<svg class="point-hover" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16"><path d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5M.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5M4 4h1v1H4z"></path><path d="M7 2H2v5h5zM3 3h3v3H3zm2 8H4v1h1z"></path><path d="M7 9H2v5h5zm-4 1h3v3H3zm8-6h1v1h-1z"></path><path d="M9 2h5v5H9zm1 1v3h3V3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8zm2 2H9V9h1zm4 2h-1v1h-2v1h3zm-4 2v-1H8v1z"></path><path d="M12 9h2V8h-2z"></path></svg><svg class="point-hover" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path></svg>', 2)),
        Q("div", {
          class: "mde-theme-switch",
          role: "button",
          onClick: o
        }, l[0] || (l[0] = [
          ie('<svg class="point-hover" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"></path></svg><svg class="point-hover" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"></path><path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"></path></svg>', 2)
        ]))
      ])
    ]));
  }
});
function Fe(t) {
  const a = [{ node: t, prefix: "" }];
  for (; a.length > 0; ) {
    const { node: o, prefix: e } = a.shift();
    o.forEach((l, n) => {
      l.id = `${e}${n}`, Array.isArray(l.items) && a.push({ node: l.items, prefix: `${e}${n}-` });
    });
  }
  return t;
}
const Mt = { class: "list-unstyled mde-nav-tree" }, Dt = { class: "py-1" }, Vt = ["href"], Et = ["data-id"], xe = /* @__PURE__ */ A({
  __name: "MDENavTree",
  props: {
    data: {},
    collapseds: {}
  },
  setup(t) {
    return (a, o) => {
      const e = ze("MDENavTree", !0);
      return g(), L("ul", Mt, [
        (g(!0), L(re, null, Re(a.data, ({ text: l, href: n, items: s, id: r, isFocusable: i }) => (g(), L("li", Dt, [
          n ? (g(), L("a", {
            key: 0,
            role: "button",
            class: I([
              "link-offset-2",
              "link-underline",
              "link-underline-opacity-0",
              { "is-focusable": i }
            ]),
            href: n
          }, D(l), 11, Vt)) : (g(), L("span", {
            key: 1,
            role: "button",
            class: "fw-medium",
            "data-id": r
          }, D(l), 9, Et)),
          s ? (g(), w(e, {
            key: 2,
            data: s,
            collapseds: a.collapseds,
            class: I(["ps-3", { "d-none": !a.collapseds.has(r) }])
          }, null, 8, ["data", "collapseds", "class"])) : j("", !0)
        ]))), 256))
      ]);
    };
  }
}), qt = /* @__PURE__ */ A({
  __name: "MDENavMenu",
  props: {
    data: {},
    active: { type: Boolean }
  },
  setup(t) {
    const o = Fe(t.data), e = he(/* @__PURE__ */ new Set());
    je(() => {
    });
    const l = (n) => {
      const s = n.target;
      if (s.tagName === "SPAN") {
        const r = s.getAttribute("data-id");
        e.has(r) ? e.delete(r) : e.add(r);
      }
    };
    return (n, s) => (g(), L("nav", {
      class: I([
        "mde-nav",
        "mde-nav-menu border-right border-body-secondary bg-body",
        { active: n.active }
      ]),
      onClick: l
    }, [
      U(xe, {
        data: u(o),
        collapseds: u(e)
      }, null, 8, ["data", "collapseds"])
    ], 2));
  }
}), Wt = /* @__PURE__ */ A({
  __name: "MDENavToc",
  props: {
    data: {},
    active: { type: Boolean }
  },
  setup(t) {
    const o = Fe(t.data), e = he(/* @__PURE__ */ new Set()), l = (n) => {
      const s = n.target;
      if (s.tagName === "SPAN") {
        const r = s.getAttribute("data-id");
        e.has(r) ? e.delete(r) : e.add(r);
      }
    };
    return (n, s) => (g(), L("nav", {
      class: I(["mde-nav", "mde-nav-toc border-left border-body-secondary bg-body", { active: n.active }]),
      onClick: l
    }, [
      U(xe, {
        data: u(o),
        collapseds: u(e)
      }, null, 8, ["data", "collapseds"])
    ], 2));
  }
});
export {
  jt as BAlert,
  Gt as BBadge,
  Bt as BButton,
  Xt as MDEHeader,
  qt as MDENavMenu,
  Wt as MDENavToc
};
