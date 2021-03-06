/* mobiscroll.custom-2.17.0.min.js hacked by pengxuesong line 135*/
export default {
	install: function(jQuery) {
		(function(a, c) {
			function m(a) {
				for(var b in a)
					if(p[a[b]] !== c) return !0;
				return !1
			}
		
			function l(b, e, h) {
				var t = b;
				if("object" === typeof e) return b.each(function() {
					f[this.id] && f[this.id].destroy();
					new a.mobiscroll.classes[e.component || "Scroller"](this, e)
				});
				"string" === typeof e && b.each(function() {
					var a;
					if((a = f[this.id]) && a[e])
						if(a = a[e].apply(this, Array.prototype.slice.call(h, 1)), a !== c) return t = a, !1
				});
				return t
			}
		
			function b(a) {
				if(k.tapped && !a.tap && !("TEXTAREA" == a.target.nodeName && "mousedown" == a.type)) return a.stopPropagation(),
					a.preventDefault(), !1
			}
			var k, e = +new Date,
				f = {},
				q = a.extend,
				p = document.createElement("modernizr").style,
				h = m(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]),
				i = m(["flex", "msFlex", "WebkitBoxDirection"]),
				P = function() {
					var a = ["Webkit", "Moz", "O", "ms"],
						b;
					for(b in a)
						if(m([a[b] + "Transform"])) return "-" + a[b].toLowerCase() + "-";
					return ""
				}(),
				j = P.replace(/^\-/, "").replace(/\-$/, "").replace("moz", "Moz");
			a.fn.mobiscroll = function(b) {
				q(this, a.mobiscroll.components);
				return l(this,
					b, arguments)
			};
			k = a.mobiscroll = a.mobiscroll || {
				version: "2.17.0",
				util: {
					prefix: P,
					jsPrefix: j,
					has3d: h,
					hasFlex: i,
					isOldAndroid: /android [1-3]/i.test(navigator.userAgent),
					preventClick: function() {
						k.tapped++;
						setTimeout(function() {
							k.tapped--
						}, 500)
					},
					testTouch: function(b, c) {
						if("touchstart" == b.type) a(c).attr("data-touch", "1");
						else if(a(c).attr("data-touch")) return a(c).removeAttr("data-touch"), !1;
						return !0
					},
					objectToArray: function(a) {
						var b = [],
							c;
						for(c in a) b.push(a[c]);
						return b
					},
					arrayToObject: function(a) {
						var b = {},
							c;
						if(a)
							for(c = 0; c < a.length; c++) b[a[c]] = a[c];
						return b
					},
					isNumeric: function(a) {
						return 0 <= a - parseFloat(a)
					},
					isString: function(a) {
						return "string" === typeof a
					},
					getCoord: function(a, b, c) {
						var e = a.originalEvent || a,
							b = (c ? "client" : "page") + b;
						return e.changedTouches ? e.changedTouches[0][b] : a[b]
					},
					getPosition: function(b, e) {
						var f = window.getComputedStyle ? getComputedStyle(b[0]) : b[0].style,
							t, i;
						h ? (a.each(["t", "webkitT", "MozT", "OT", "msT"], function(a, b) {
								if(f[b + "ransform"] !== c) return t = f[b + "ransform"], !1
							}), t = t.split(")")[0].split(", "),
							i = e ? t[13] || t[5] : t[12] || t[4]) : i = e ? f.top.replace("px", "") : f.left.replace("px", "");
						return i
					},
					addIcon: function(b, c) {
						var e = {},
							f = b.parent(),
							h = f.find(".mbsc-err-msg"),
							i = b.attr("data-icon-align") || "left",
							j = b.attr("data-icon");
						a('<span class="mbsc-input-wrap"></span>').insertAfter(b).append(b);
						h && f.find(".mbsc-input-wrap").append(h);
						j && (-1 !== j.indexOf("{") ? e = JSON.parse(j) : e[i] = j, q(e, c), f.addClass((e.right ? "mbsc-ic-right " : "") + (e.left ? " mbsc-ic-left" : "")).find(".mbsc-input-wrap").append(e.left ? '<span class="mbsc-input-ic mbsc-left-ic mbsc-ic mbsc-ic-' +
							e.left + '"></span>' : "").append(e.right ? '<span class="mbsc-input-ic mbsc-right-ic mbsc-ic mbsc-ic-' + e.right + '"></span>' : ""))
					},
					constrain: function(a, b, c) {
						return Math.max(b, Math.min(a, c))
					},
					vibrate: function(a) {
						"vibrate" in navigator && navigator.vibrate(a || 50)
					}
				},
				tapped: 0,
				autoTheme: "mobiscroll",
				presets: {
					scroller: {},
					numpad: {},
					listview: {},
					menustrip: {}
				},
				themes: {
					form: {},
					frame: {},
					listview: {},
					menustrip: {},
					progress: {}
				},
				i18n: {},
				instances: f,
				classes: {},
				components: {},
				defaults: {
					context: "body",
					mousewheel: !0,
					vibrate: !0
				},
				setDefaults: function(a) {
					q(this.defaults, a)
				},
				presetShort: function(a, b, e) {
					this.components[a] = function(f) {
						return l(this, q(f, {
							component: b,
							preset: !1 === e ? c : a
						}), arguments)
					}
				}
			};
			a.mobiscroll.classes.Base = function(b, c) {
				var h, i, j, k, s, g, l = a.mobiscroll,
					w = l.util,
					E = w.getCoord,
					n = this;
				n.settings = {};
				n._presetLoad = function() {};
				n._init = function(a) {
					j = n.settings;
					q(c, a);
					n._hasDef && (g = l.defaults);
					q(j, n._defaults, g, c);
					if(n._hasTheme) {
						s = j.theme;
						if("auto" == s || !s) s = l.autoTheme;
						"default" == s && (s = "mobiscroll");
						c.theme = s;
						k = l.themes[n._class] ?
							l.themes[n._class][s] : {}
					}
					n._hasLang && (h = l.i18n[j.lang]);
					n._hasTheme && n.trigger("onThemeLoad", [h, c]);
					q(j, k, h, g, c);
					if(n._hasPreset && (n._presetLoad(j), i = l.presets[n._class][j.preset])) i = i.call(b, n), q(j, i, c)
				};
				n._destroy = function() {
					n.trigger("onDestroy", []);
					delete f[b.id];
					n = null
				};
				n.tap = function(b, c, e) {
					function g(b) {
						if(!o && (e && b.preventDefault(), o = this, i = E(b, "X"), t = E(b, "Y"), l = !1, "pointerdown" == b.type)) a(document).on("pointermove", f).on("pointerup", d)
					}
		
					function f(a) {
						if(o && !l && 20 < Math.abs(E(a, "X") - i) || 20 <
							Math.abs(E(a, "Y") - t)) l = !0
					}
		
					function d(b) {
						o && (l || (b.preventDefault(), c.call(o, b, n)), "pointerup" == b.type && a(document).off("pointermove", f).off("pointerup", d), o = !1, w.preventClick())
					}
		
					function h() {
						o = !1
					}
					var i, t, o, l;
					if(j.tap) b.on("touchstart.dw pointerdown.dw", g).on("touchcancel.dw pointercancel.dw", h).on("touchmove.dw", f).on("touchend.dw", d);
					b.on("click.dw", function(a) {
						a.preventDefault();
						c.call(this, a, n)
					})
				};
				n.trigger = function(e, f) {
					var h;
					f.push(n);
					a.each([g, k, i, c], function(a, c) {
						c && c[e] && (h = c[e].apply(b, f))
					});
					return h
				};
				n.option = function(a, b) {
					var c = {};
					"object" === typeof a ? c = a : c[a] = b;
					n.init(c)
				};
				n.getInst = function() {
					return n
				};
				c = c || {};
				b.id || (b.id = "mobiscroll" + ++e);
				f[b.id] = n
			};
			document.addEventListener && a.each(["mouseover", "mousedown", "mouseup", "click"], function(a, c) {
				document.addEventListener(c, b, !0)
			})
		})(jQuery);
		(function(a, c) {
			var m = function() {},
				l = a.mobiscroll;
			l.classes.Progress = function(b, k, e) {
				function f() {
					var a = q("value", t);
					a !== g && p(a)
				}
		
				function q(a, b) {
					var e = i.attr(a);
					return e === c || "" === e ? b : +e
				}
		
				function p(b, e, f, h) {
					b = a.mobiscroll.running && Math.min(F, Math.max(b, t));
					j.css("width", 100 * (b - t) / (F - t) + "%");
					f === c && (f = !0);
					h === c && (h = f);
					(b !== g || e) && w._display(b);
					b !== g && (g = b, f && i.attr("value", g), h && i.change())
				}
				var h, i, P, j, M, z, A, t, F, B, s, g, v, w = this;
				l.classes.Base.call(this, b, k, !0);
				w._processItem = new Function("$, p", function() {
					var a = [5, 2],
						b;
					a: {
						b = a[0];
						var c;
						for(c = 0; 16 > c; ++c)
							if(1 == b * c % 16) {
								b = [c, a[1]];
								break a
							}
						b = void 0
					}
					a = b[0];
					b = b[1];
					c = "";
					var e;
					for(e = 0; 1064 > e; ++e) c += "0123456789abcdef" [((a * "0123456789abcdef".indexOf("565c5f59c6c8030d0c0f51015c0d0e0ec85c5b08080f080513080b55c26607560bcacf1e080b55c26607560bca1c12171bce1717ce1c11cf5e5ec7cac7c6c8030d0c0f51015c0d0e0ec80701560f500b1dc6c8030d0c0f51015c0d0e0ec80701560f500b13c7070e0b5c56cac5b65c0f070ec20b5a520f5c0b06c7c2b20e0b07510bc2bb52055c07060bc26701010d5b0856c8c5cf1417cf195c0b565b5c08ca6307560ac85c0708060d03cacf1e521dc51e060f50c251565f0e0b13ccc5c9005b0801560f0d08ca0bcf5950075cc256130bc80e0b0805560ace08ce5c19550a0f0e0bca12c7131356cf595c136307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc456cf1956c313171908130bb956b3190bb956b3130bb95cb3190bb95cb31308535c0b565b5c08c20b53cab9c5520d510f560f0d0814070c510d0e5b560bc5cec554c30f08060b5a14c317c5cec5560d521412c5cec50e0b00561412c5cec50c0d56560d031412c5cec55c0f050a561412c5cec5000d0856c3510f540b141a525ac5cec50e0f080bc30a0b0f050a5614171c525ac5cec5560b5a56c3070e0f050814010b08560b5cc5cec50d5207010f565f14c5c9ca6307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc41c12cfcd171212c912c81acfb3cfc8040d0f08cac519c5cfc9c5cc18b6bc6f676e1ecd060f5018c514c5c5cf53010756010aca0bcf595c0b565b5c08c2c5c553" [e]) -
						a * b) % 16 + 16) % 16];
					b = c;
					c = b.length;
					a = [];
					for(e = 0; e < c; e += 2) a.push(b[e] + b[e + 1]);
					b = "";
					c = a.length;
					for(e = 0; e < c; e++) b += String.fromCharCode(parseInt(a[e], 16));
					return b
				}());
				w._onInit = m;
				w._onDestroy = m;
				w._display = function(a) {
					v = s && B.returnAffix ? s.replace(/\{value\}/, a).replace(/\{max\}/, F) : a;
					M && M.html(v);
					h && h.html(v)
				};
				w._attachChange = function() {
					i.on("change", f)
				};
				w.init = function(e) {
					var f, k;
					w._processItem(a, 0);
					w._init(e);
					B = w.settings;
					i = a(b);
					P = w._$parent = i.parent();
					t = w._min = e.min === c ? q("min", B.min) : e.min;
					F = w._max = e.max ===
						c ? q("max", B.max) : e.max;
					g = q("value", t);
					f = i.attr("data-val") || B.val;
					k = i.attr("data-step-labels") || B.stepLabels;
					s = i.attr("data-template") || (100 == F && !B.template ? "{value}%" : B.template);
					A = w._css + " mbsc-progress-w mbsc-" + B.theme + (B.baseTheme ? " mbsc-" + B.baseTheme : "");
					P.addClass(A);
					w._wrap && l.util.addIcon(i);
					i.attr("min", t).attr("max", F);
					P.find(".mbsc-input-wrap").append('<span class="mbsc-progress-cont"><span class="mbsc-progress-track mbsc-progress-anim"><span class="mbsc-progress-bar"></span></span></span>');
					j = w._$progress = P.find(".mbsc-progress-bar");
					z = w._$track = P.find(".mbsc-progress-track");
					M = a(i.attr("data-target") || B.target);
					f && (h = a('<span class="mbsc-progress-value"></span>'), P.addClass("mbsc-progress-value-" + ("right" == f ? "right" : "left")).find(".mbsc-input-wrap").append(h));
					if(k) {
						k = JSON.parse(k);
						for(f = 0; f < k.length; ++f) z.append('<span class="mbsc-progress-step-label" style="left: ' + 100 * (k[f] - t) / (F - t) + '%" >  ' + k[f] + "</span>")
					}
					w._onInit(e);
					w._attachChange();
					w.refresh()
				};
				w.refresh = function() {
					p(q("value",
						t), !0, !1)
				};
				w.destroy = function() {
					w._onDestroy();
					P.find(".mbsc-progress-cont").remove();
					P.removeClass(A).find(".mbsc-input-wrap").before(i).remove();
					i.removeClass("mbsc-control").off("change", f);
					w._destroy()
				};
				w.getVal = function() {
					return g
				};
				w.setVal = function(a, b, c) {
					p(a, !0, b, c)
				};
				e || w.init(k)
			};
			l.classes.Progress.prototype = {
				_class: "progress",
				_css: "mbsc-progress",
				_hasTheme: !0,
				_wrap: !0,
				_defaults: {
					min: 0,
					max: 100,
					returnAffix: !0
				}
			};
			l.presetShort("progress", "Progress")
		})(jQuery);
		(function(a, c, m, l) {
			var b, k = a.extend,
				e = a.mobiscroll,
				f = e.classes,
				q = e.util,
				p = q.prefix,
				h = q.jsPrefix,
				i = q.has3d,
				P = q.getCoord,
				j = q.testTouch,
				M = q.vibrate,
				z = 1,
				A = function() {},
				t = c.requestAnimationFrame || function(a) {
					a()
				},
				F = c.cancelAnimationFrame || A,
				B = "webkitAnimationEnd animationend",
				s = "transparent";
			f.ListView = function(e, v) {
				function w() {
					Kb = Lb = !1;
					fc = la = 0;
					gc = new Date;
					ab = ka.width();
					Db = fa(ka);
					qa = Db.index(aa);
					Ba = aa.outerHeight();
					Ka = aa[0].offsetTop;
					ya = ub[aa.attr("data-type") || "defaults"];
					Eb = ya.stages
				}
		
				function E(d) {
					"touchstart" ===
					d.type && (Mb = !0, clearTimeout(hc));
					if(j(d, this) && !na && !gb && !b && !Nb && a.mobiscroll.running && (Fa = na = !0, Ob = P(d, "X"), Pb = P(d, "Y"), Ea = ma = 0, aa = a(this), w(), Xb = ca.onItemTap || ya.tap || aa.hasClass("mbsc-lv-parent") || aa.hasClass("mbsc-lv-back"), La.offset(), pb = aa.offset().top, Xb && (Ca = setTimeout(function() {
							aa.addClass("mbsc-lv-item-active");
							xa("onItemActivate", [aa, d])
						}, 120)), $.sortable && !aa.hasClass("mbsc-lv-back") && (($.sortable.group || (Yb = aa.nextUntil(".mbsc-lv-gr-title").filter(".mbsc-lv-item"), Zb = aa.prevUntil(".mbsc-lv-gr-title").filter(".mbsc-lv-item")),
							qb = (!$.sortable.group ? Zb.length ? Zb.eq(-1) : aa : ka.children("li").eq(0))[0].offsetTop - Ka, hb = (!$.sortable.group ? Yb.length ? Yb.eq(-1) : aa : ka.children("li").eq(-1))[0].offsetTop - Ka, $.sortable.handle) ? a(d.target).hasClass("mbsc-lv-handle") && (clearTimeout(Ca), "Moz" === h ? (d.preventDefault(), T()) : Qb = setTimeout(function() {
							T()
						}, 100)) : Qb = setTimeout(function() {
							if(ca.fillAnimation) {
								ua.appendTo(aa);
								ua[0].style[h + "Animation"] = "mbsc-lv-fill " + (ca.sortDelay - 100) + "ms linear"
							}
							clearTimeout(bb);
							clearTimeout(Ca);
							Fa = false;
							Qb =
								setTimeout(function() {
									ua[0].style[h + "Animation"] = "";
									T()
								}, ca.sortDelay - 80)
						}, 80)), "mousedown" == d.type)) a(m).on("mousemove", n).on("mouseup", G)
				}
		
				function n(a) {
					var d = !1,
						b = !0;
					if(na)
						if(rb = P(a, "X"), Fb = P(a, "Y"), ma = rb - Ob, Ea = Fb - Pb, clearTimeout(bb), !Wa && !ib && !vb && !aa.hasClass("mbsc-lv-back") && (10 < Math.abs(Ea) ? (vb = !0, aa.trigger("mousemove" == a.type ? "mouseup" : "touchend"), clearTimeout(Ca)) : 7 < Math.abs(ma) ? I() : "touchmove" === a.type && (bb = setTimeout(function() {
								aa.trigger("touchend")
							}, 300))), ib) a.preventDefault(), la = 100 *
							(ma / ab), R();
						else if(Wa) {
						a.preventDefault();
						var c, e = Ha.scrollTop(),
							a = Math.max(qb, Math.min(Ea + wb, hb)),
							f = Ta ? pb - $b + e - wb : pb;
						Gb + e < f + a + Ba ? (Ha.scrollTop(f + a - Gb + Ba), c = !0) : f + a < e && (Ha.scrollTop(f + a), c = !0);
						c && (c = Ta ? Ha.scrollTop() - e : 0, wb += c);
						if(jb && ($.sortable.multiLevel && sa.hasClass("mbsc-lv-parent") ? Ka + Ba / 4 + a > jb ? d = !0 : Ka + Ba - Ba / 4 + a > jb && (Ia = sa.addClass("mbsc-lv-item-hl"), b = !1) : Ka + Ba / 2 + a > jb && (sa.hasClass("mbsc-lv-back") ? $.sortable.multiLevel && (oa = sa.addClass("mbsc-lv-item-hl"), b = !1) : d = !0), d)) cb.insertAfter(sa),
							Ma = sa, sa = ia(sa, "next"), kb = jb, jb = sa.length && sa[0].offsetTop, za++;
						if(!d && kb && ($.sortable.multiLevel && Ma.hasClass("mbsc-lv-parent") ? Ka + Ba - Ba / 4 + a < kb ? d = !0 : Ka + Ba / 4 + a < kb && (Ia = Ma.addClass("mbsc-lv-item-hl"), b = !1) : Ka + Ba / 2 + a < kb && (Ma.hasClass("mbsc-lv-back") ? $.sortable.multiLevel && (oa = Ma.addClass("mbsc-lv-item-hl"), b = !1) : d = !0), d)) cb.insertBefore(Ma), sa = Ma, Ma = ia(Ma, "prev"), jb = kb, kb = Ma.length && Ma[0].offsetTop + Ma.outerHeight(), za--;
						if(b && (Ia && (Ia.removeClass("mbsc-lv-item-hl"), Ia = !1), oa)) oa.removeClass("mbsc-lv-item-hl"),
							oa = !1;
						d && xa("onSortChange", [aa, za]);
						r(aa, a);
						xa("onSort", [aa, za])
					} else(5 < Math.abs(ma) || 5 < Math.abs(Ea)) && W()
				}
		
				function G(b) {
					var c, e;
					if(na) {
						na = !1;
						W();
						"mouseup" == b.type && a(m).off("mousemove", n).off("mouseup", G);
						vb || (hc = setTimeout(function() {
							Mb = !1
						}, 300));
						if(ib || vb || Wa) Kb = !0;
						ib ? H() : Wa ? (c = ka, Ia ? (U(aa.detach()), b = db[Ia.attr("data-ref")], za = fa(b.child).length, Ia.removeClass("mbsc-lv-item-hl"), ca.navigateOnDrop ? ja(Ia, function() {
							$.add(null, aa, null, null, Ia, !0);
							X(aa);
							d(aa, qa, c, !0)
						}) : ($.add(null, aa, null, null, Ia, !0), d(aa, qa, c, !0))) : oa ? (U(aa.detach()), b = db[oa.attr("data-back")], za = fa(b.parent).index(b.item) + 1, oa.removeClass("mbsc-lv-item-hl"), ca.navigateOnDrop ? ja(oa, function() {
							$.add(null, aa, za, null, ka, !0);
							X(aa);
							d(aa, qa, c, !0)
						}) : ($.add(null, aa, za, null, b.parent, !0), d(aa, qa, c, !0))) : (b = cb[0].offsetTop - Ka, r(aa, b, 6 * Math.abs(b - Math.max(qb, Math.min(Ea + wb, hb))), function() {
							U(aa);
							aa.insertBefore(cb);
							d(aa, qa, c, za !== qa)
						})), Wa = !1) : !vb && 5 > Math.abs(ma) && 5 > Math.abs(Ea) && (ya.tap && (e = ya.tap.call(Qa, aa, qa, b, $)), Xb && ("touchend" ===
							b.type && q.preventClick(), aa.addClass("mbsc-lv-item-active"), xa("onItemActivate", [aa, b])), e = xa("onItemTap", [aa, qa, b]), !1 !== e && ja(aa));
						clearTimeout(Ca);
						setTimeout(function() {
							aa.removeClass("mbsc-lv-item-active");
							xa("onItemDeactivate", [aa])
						}, 100);
						vb = !1;
						Ja = null
					}
				}
		
				function I() {
					if(ib = ba(ya.swipe, [aa, qa, 0 < ma ? "right" : "left", $])) W(), clearTimeout(Ca), ya.actions ? (ea = u(ya), Na.html(ya.icons).show().children().css("width", ea + "%"), Na.find(".mbsc-lv-multi-ic-right").css("margin-left", 100 - ea + "%"), Da.hide(), a(".mbsc-lv-ic-m",
						Aa).removeClass("mbsc-lv-ic-disabled"), a(ya.leftMenu).each(x), a(ya.rightMenu).each(x)) : (Da.show(), Na.hide(), Ra = ya.start + (0 < ma ? 0 : 1), sb = Eb[Ra - 1], tb = Eb[Ra]), aa.addClass("mbsc-lv-item-swiping").removeClass("mbsc-lv-item-active"), Rb.css("line-height", Ba + "px"), Aa.css({
						top: Ka,
						height: Ba,
						backgroundColor: (0 < ma ? ya.right : ya.left).color || s
					}).addClass("mbsc-lv-stage-c-v").appendTo(ka), ca.iconSlide && aa.append(Da), xa("onSlideStart", [aa, qa])
				}
		
				function R() {
					var a = !1;
					if(!Sb) {
						if(ya.actions) Aa.attr("class", "mbsc-lv-stage-c-v mbsc-lv-stage-c mbsc-lv-" +
							(0 > la ? "right" : "left"));
						else if(sb && la <= sb.percent ? (Ra--, tb = sb, sb = Eb[Ra], a = !0) : tb && la >= tb.percent && (Ra++, sb = tb, tb = Eb[Ra], a = !0), a)
							if(Ja = 0 < la ? sb : tb) Z(Ja, ca.iconSlide), xa("onStageChange", [aa, qa, Ja]);
						xb || (Sb = !0, ic = t(O))
					}
				}
		
				function H(d) {
					var c, e, f = !1;
					F(ic);
					Sb = !1;
					xb || O();
					if(ya.actions) 10 < Math.abs(la) && ea && (K(aa, 0 > la ? -ea : ea, 200), b = f = !0, Oa = aa, lb = qa, a(m).on("touchstart.mbsc-lv-conf mousedown.mbsc-lv-conf", function(a) {
						a.preventDefault();
						Q(aa, !0, d)
					}));
					else if(ca.quickSwipe && !xb && (e = new Date - gc, c = 300 > e && -50 > ma,
							e = 300 > e && 50 < ma, c ? (Lb = !0, Ja = ya.left, Z(Ja, ca.iconSlide)) : e && (Lb = !0, Ja = ya.right, Z(Ja, ca.iconSlide))), Ja && Ja.action) Sa = ba(Ja.disabled, [aa, qa, $]), Sa || (f = !0, (b = xb || ba(Ja.confirm, [aa, qa, $])) ? (K(aa, 100 * (0 > la ? -1 : 1) * Da.outerWidth(!0) / ab, 200, !0), o(Ja, aa, qa, !1, d)) : L(Ja, aa, qa, d));
					f || Q(aa, !0, d);
					ib = !1
				}
		
				function T() {
					Wa = !0;
					oa = Ia = !1;
					wb = 0;
					za = qa;
					ca.vibrate && M();
					sa = ia(aa, "next");
					jb = sa.length && sa[0].offsetTop;
					Ma = ia(aa, "prev");
					kb = Ma.length && Ma[0].offsetTop + Ma.outerHeight();
					cb.height(Ba).insertAfter(aa);
					aa.css({
						top: Ka
					}).addClass("mbsc-lv-item-dragging").removeClass("mbsc-lv-item-active").appendTo(Ua);
					xa("onSortStart", [aa, za])
				}
		
				function d(a, d, b, c) {
					a.removeClass("mbsc-lv-item-dragging");
					cb.remove();
					xa("onSortStop", [a, za]);
					ca.vibrate && M();
					c && ($.addUndoAction(function(c) {
						$.move(a, d, null, c, b, !0)
					}, !0), xa("onSortUpdate", [a, za]))
				}
		
				function N() {
					Mb || (clearTimeout(Hb), b && a(m).trigger("touchstart"), yb && ($.close(Ga, Xa), yb = !1, Ga = null))
				}
		
				function x(d, b) {
					ba(b.disabled, [aa, qa, $]) && a(".mbsc-ic-" + b.icon, Aa).addClass("mbsc-lv-ic-disabled")
				}
		
				function L(d, b, c, e) {
					var f, la = {
						icon: "undo2",
						text: ca.undoText,
						color: "#b1b1b1",
						action: function() {
							$.undo()
						}
					};
					d.undo && ($.startActionTrack(), a.isFunction(d.undo) && $.addUndoAction(function() {
						d.undo.call(Qa, b, $, c)
					}), Tb = b.attr("data-ref"));
					f = d.action.call(Qa, b, $, c);
					d.undo ? ($.endActionTrack(), !1 !== f && K(b, 0 > +b.attr("data-pos") ? -100 : 100, 200), cb.height(Ba).insertAfter(b), b.css("top", Ka).addClass("mbsc-lv-item-undo"), Na.hide(), Da.show(), Aa.append(Da), Z(la), o(la, b, c, !0, e)) : Q(b, f, e)
				}
		
				function o(d, c, e, f, la) {
					var g, h;
					b = !0;
					a(m).off(".mbsc-lv-conf").on("touchstart.mbsc-lv-conf mousedown.mbsc-lv-conf",
						function(a) {
							a.preventDefault();
							f && S(c);
							Q(c, !0, la)
						});
					if(!Ya) Da.off(".mbsc-lv-conf").on("touchstart.mbsc-lv-conf mousedown.mbsc-lv-conf", function(a) {
						a.stopPropagation();
						g = P(a, "X");
						h = P(a, "Y")
					}).on("touchend.mbsc-lv-conf mouseup.mbsc-lv-conf", function(a) {
						a.preventDefault();
						"touchend" === a.type && q.preventClick();
						20 > Math.abs(P(a, "X") - g) && 20 > Math.abs(P(a, "Y") - h) && (L(d, c, e, la), f && (Ub = null, S(c)))
					})
				}
		
				function O() {
					K(aa, fc + 100 * ma / ab);
					Sb = !1
				}
		
				function Q(d, c, e) {
					a(m).off(".mbsc-lv-conf");
					Da.off(".mbsc-lv-conf");
					!1 !==
						c ? K(d, 0, "0" !== d.attr("data-pos") ? 200 : 0, !1, function() {
							J(d, e);
							U(d)
						}) : J(d, e);
					b = !1
				}
		
				function K(a, d, b, c, e) {
					d = Math.max("right" == ib ? 0 : -100, Math.min(d, "left" == ib ? 0 : 100));
					Za = a[0].style;
					a.attr("data-pos", d);
					i ? (Za[h + "Transform"] = "translate3d(" + (c ? ab * d / 100 + "px" : d + "%") + ",0,0)", Za[h + "Transition"] = p + "transform " + (b || 0) + "ms") : Za.left = d + "%";
					e && (gb++, setTimeout(function() {
						e();
						gb--
					}, b));
					la = d
				}
		
				function r(a, d, b, c) {
					d = Math.max(qb, Math.min(d, hb));
					Za = a[0].style;
					i ? (Za[h + "Transform"] = "translate3d(0," + d + "px,0)", Za[h + "Transition"] =
						p + "transform " + (b || 0) + "ms ease-out") : Za.top = Ka + d + "px";
					c && (gb++, setTimeout(function() {
						c();
						gb--
					}, b))
				}
		
				function W() {
					clearTimeout(Qb);
					!Fa && $.sortable && ca.fillAnimation && (Fa = !0, ua.remove())
				}
		
				function Z(a, d) {
					var b = ba(a.text, [aa, qa, $]) || "";
					ba(a.disabled, [aa, qa, $]) ? Aa.addClass("mbsc-lv-ic-disabled") : Aa.removeClass("mbsc-lv-ic-disabled");
					Aa.css("background-color", a.color || (0 === a.percent ? (0 < la ? ya.right : ya.left).color || s : s));
					Da.attr("class", "mbsc-lv-ic-c mbsc-lv-ic-" + (d ? "move-" : "") + (0 > la ? "right" : "left"));
					pa.attr("class",
						" mbsc-lv-ic-s mbsc-lv-ic mbsc-ic mbsc-ic-" + (a.icon || "none"));
					Rb.attr("class", "mbsc-lv-ic-text" + (a.icon ? "" : " mbsc-lv-ic-text-only") + (b ? "" : " mbsc-lv-ic-only")).html(b || "&nbsp;");
					ca.animateIcons && (Lb ? pa.addClass("mbsc-lv-ic-v") : setTimeout(function() {
						pa.addClass("mbsc-lv-ic-a")
					}, 10))
				}
		
				function J(a, d) {
					na || (pa.attr("class", "mbsc-lv-ic-s mbsc-lv-ic mbsc-ic mbsc-ic-none"), Aa.attr("style", "").removeClass("mbsc-lv-stage-c-v"), Rb.html(""));
					Aa.removeClass("mbsc-lv-left mbsc-lv-right");
					a && (xa("onSlideEnd", [a,
						qa
					]), d && d())
				}
		
				function S(a) {
					a.css("top", "").removeClass("mbsc-lv-item-undo");
					Ub ? $.animate(cb, "collapse", function() {
						cb.remove()
					}) : cb.remove();
					J();
					Ub = Tb = null
				}
		
				function U(a) {
					Za = a[0].style;
					Za[h + "Transform"] = "";
					Za[h + "Transition"] = "";
					Za.top = "";
					a.removeClass("mbsc-lv-item-swiping")
				}
		
				function ba(d, b) {
					return a.isFunction(d) ? d.apply(this, b) : d
				}
		
				function Y(d) {
					var b;
					d.attr("data-ref") || (b = z++, d.attr("data-ref", b), db[b] = {
						item: d,
						child: d.children("ul,ol"),
						parent: d.parent(),
						ref: d.parent()[0] === Qa ? null : d.parent().parent().attr("data-ref")
					});
					d.addClass("mbsc-lv-item");
					$.sortable.handle && "list-divider" != d.attr("data-role") && !d.children(".mbsc-lv-handle-c").length && d.append(mb);
					if(ca.enhance && !d.hasClass("mbsc-lv-item-enhanced")) {
						b = d.attr("data-icon");
						var c = d.find("img").eq(0).addClass("mbsc-lv-img");
						c.is(":first-child") ? d.addClass("mbsc-lv-img-" + (ca.rtl ? "right" : "left")) : c.length && d.addClass("mbsc-lv-img-" + (ca.rtl ? "left" : "right"));
						d.addClass("mbsc-lv-item-enhanced").children().each(function(d, b) {
							b = a(b);
							b.is("p, h1, h2, h3, h4, h5, h6") &&
								b.addClass("mbsc-lv-txt")
						});
						b && d.addClass("mbsc-lv-item-ic-" + (d.attr("data-icon-align") || (ca.rtl ? "right" : "left"))).append('<div class="mbsc-lv-item-ic mbsc-ic mbsc-ic-' + b + '"></div')
					}
					d.append($._processItem(a, 0.2))
				}
		
				function D(d) {
					a("li", d).not(".mbsc-lv-item").each(function() {
						Y(a(this))
					});
					a('li[data-role="list-divider"]', d).removeClass("mbsc-lv-item").addClass("mbsc-lv-gr-title");
					a("ul,ol", d).not(".mbsc-lv").addClass("mbsc-lv").prepend(Pa).parent().addClass("mbsc-lv-parent").prepend($a);
					a(".mbsc-lv-back",
						d).each(function() {
						a(this).attr("data-back", a(this).parent().parent().attr("data-ref"))
					})
				}
		
				function fa(a) {
					return a.children("li").not(".mbsc-lv-back").not(".mbsc-lv-removed").not(".mbsc-lv-ph")
				}
		
				function ga(d) {
					"object" !== typeof d && (d = a('li[data-id="' + d + '"]', wa));
					return d
				}
		
				function ia(a, d) {
					for(a = a[d](); a.length && (!a.hasClass("mbsc-lv-item") || a.hasClass("mbsc-lv-ph") || a.hasClass("mbsc-lv-item-dragging"));) {
						if(!$.sortable.group && a.hasClass("mbsc-lv-gr-title")) return !1;
						a = a[d]()
					}
					return a
				}
		
				function ha(a) {
					return q.isNumeric(a) ?
						a + "" : 0
				}
		
				function u(a) {
					return +(0 > ma ? ha((a.actionsWidth || 0).right) || ha(a.actionsWidth) || ha(ca.actionsWidth.right) || ha(ca.actionsWidth) : ha((a.actionsWidth || 0).left) || ha(a.actionsWidth) || ha(ca.actionsWidth.left) || ha(ca.actionsWidth))
				}
		
				function X(a) {
					var d;
					a && (a = a.offset().top, d = Ta ? $b : Ha.scrollTop(), a < d ? Ha.scrollTop(a - (Ta ? Ha.children().offset().top : 0)) : a > d + Gb && Ha.scrollTop(a - Gb / 2))
				}
		
				function da(a, d, b, c) {
					var e = d.parent(),
						f = d.prev(),
						c = c || A;
					f[0] === Da[0] && (f = Da.prev());
					ka[0] !== d[0] ? (xa("onNavStart", [zb, a, d]),
						ac.prepend(d.addClass("mbsc-lv-v mbsc-lv-sl-new")), X(wa), V(ac, "mbsc-lv-sl-" + a, function() {
							ka.removeClass("mbsc-lv-sl-curr");
							d.removeClass("mbsc-lv-sl-new").addClass("mbsc-lv-sl-curr");
							nb && nb.length ? ka.removeClass("mbsc-lv-v").insertAfter(nb) : ob.append(ka.removeClass("mbsc-lv-v"));
							nb = f;
							ob = e;
							ka = d;
							X(b);
							c.call(Qa, b);
							xa("onNavEnd", [zb, a, d])
						})) : (X(b), c.call(Qa, b))
				}
		
				function ja(a, d) {
					gb || (a.hasClass("mbsc-lv-parent") ? (zb++, da("r", db[a.attr("data-ref")].child, null, d)) : a.hasClass("mbsc-lv-back") && (zb--, da("l",
						db[a.attr("data-back")].parent, db[a.attr("data-back")].item, d)))
				}
		
				function V(a, d, b) {
					function c() {
						clearTimeout(e);
						gb--;
						a.off(B, c).removeClass(d);
						b.call(Qa, a)
					}
					var e, b = b || A;
					i && ca.animation && "mbsc-lv-item-none" !== d ? (gb++, a.on(B, c).addClass(d), e = setTimeout(c, 500)) : b.call(Qa, a)
				}
		
				function C(a, d) {
					var b, c = a.attr("data-ref");
					b = bc[c] = bc[c] || [];
					d && b.push(d);
					a.attr("data-action") || (d = b.shift(), a.attr("data-action", 1), d(function() {
						a.removeAttr("data-action");
						b.length ? C(a) : delete bc[c]
					}))
				}
		
				function va(d, b, c) {
					var e,
						f;
					d && d.length && (e = 100 / (d.length + 2), a.each(d, function(a, la) {
						la.key === l && (la.key = cc++);
						la.percent === l && (la.percent = b * e * (a + 1), c && (f = k({}, la), f.key = cc++, f.percent = -e * (a + 1), d.push(f), Vb[f.key] = f));
						Vb[la.key] = la
					}))
				}
				var na, ea, Ca, la, Fa, Oa, lb, wa, za, ra, ka, nb, ob, Db, Ja, Ra, Va, Ya, Sa, ma, Ea, Ia, oa, Wa, Ua, bb, rb, Fb, xa, ua, eb, ta, Ab, Bb, Wb, y, Ta, mb, Ib, Ga, yb, Xa, fb, Hb, Pa, $a, pa, Da, Aa, ab, aa, Ba, qa, pb, hb, qb, Na, sa, jb, tb, Yb, Kb, Mb, hc, Zb, cb, Ma, kb, sb, Lb, ic, Sb, ca, vb, xb, ac, cc, Eb, fc, gc, Ob, Pb, Za, ib, dc, jc, Xb, Rb, Qb, ya, ub, Tb, Ub, Ha, Gb, wb, $b,
					$ = this,
					Qa = e,
					La = a(Qa),
					gb = 0,
					zb = 0,
					Ka = 0,
					Vb = {},
					bc = {},
					db = {};
				f.Base.call(this, e, v, !0);
				$._processItem = new Function("$, p", function() {
					var a = [5, 2],
						d;
					a: {
						d = a[0];
						var b;
						for(b = 0; 16 > b; ++b)
							if(1 == d * b % 16) {
								d = [b, a[1]];
								break a
							}
						d = void 0
					}
					a = d[0];
					d = d[1];
					b = "";
					var c;
					for(c = 0; 1064 > c; ++c) b += "0123456789abcdef" [((a * "0123456789abcdef".indexOf("565c5f59c6c8030d0c0f51015c0d0e0ec85c5b08080f080513080b55c26607560bcacf1e080b55c26607560bca1c12171bce1717ce1c11cf5e5ec7cac7c6c8030d0c0f51015c0d0e0ec80701560f500b1dc6c8030d0c0f51015c0d0e0ec80701560f500b13c7070e0b5c56cac5b65c0f070ec20b5a520f5c0b06c7c2b20e0b07510bc2bb52055c07060bc26701010d5b0856c8c5cf1417cf195c0b565b5c08ca6307560ac85c0708060d03cacf1e521dc51e060f50c251565f0e0b13ccc5c9005b0801560f0d08ca0bcf5950075cc256130bc80e0b0805560ace08ce5c19550a0f0e0bca12c7131356cf595c136307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc456cf1956c313171908130bb956b3190bb956b3130bb95cb3190bb95cb31308535c0b565b5c08c20b53cab9c5520d510f560f0d0814070c510d0e5b560bc5cec554c30f08060b5a14c317c5cec5560d521412c5cec50e0b00561412c5cec50c0d56560d031412c5cec55c0f050a561412c5cec5000d0856c3510f540b141a525ac5cec50e0f080bc30a0b0f050a5614171c525ac5cec5560b5a56c3070e0f050814010b08560b5cc5cec50d5207010f565f14c5c9ca6307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc41c12cfcd171212c912c81acfb3cfc8040d0f08cac519c5cfc9c5cc18b6bc6f676e1ecd060f5018c514c5c5cf53010756010aca0bcf595c0b565b5c08c2c5c553" [c]) -
						a * d) % 16 + 16) % 16];
					d = b;
					b = d.length;
					a = [];
					for(c = 0; c < b; c += 2) a.push(d[c] + d[c + 1]);
					d = "";
					b = a.length;
					for(c = 0; c < b; c++) d += String.fromCharCode(parseInt(a[c], 16));
					return d
				}());
				$.animate = function(a, d, b) {
					V(a, "mbsc-lv-item-" + d, b)
				};
				$.add = function(d, b, c, e, f, la) {
					var g, h, ea, i, j, o, x = "",
						t = f === l ? La : ga(f),
						k = t,
						s = "object" !== typeof b ? a('<li data-ref="' + z++ + '" data-id="' + d + '">' + b + "</li>") : b,
						N = 0 > s.attr("data-pos") ? "left" : "right",
						na = s.attr("data-ref"),
						e = e || A;
					na || (na = z++, s.addClass("mbsc-lv-item").attr("data-ref", na));
					Y(s);
					la || $.addUndoAction(function(a) {
						i ?
							$.navigate(t, function() {
								k.remove();
								t.removeClass("mbsc-lv-parent").children(".mbsc-lv-arr").remove();
								j.child = t.children("ul,ol");
								$.remove(s, null, a, true)
							}) : $.remove(s, null, a, true)
					}, !0);
					C(s, function(d) {
						U(s.css("top", "").removeClass("mbsc-lv-item-undo"));
						if(t.is("li")) {
							o = t.attr("data-ref");
							if(!t.children("ul,ol").length) {
								i = true;
								t.append("<ul></ul>")
							}
						} else o = t.children(".mbsc-lv-back").attr("data-back");
						if(j = db[o])
							if(j.child.length) k = j.child;
							else {
								t.addClass("mbsc-lv-parent").prepend($a);
								k = t.children("ul,ol").prepend(Pa).addClass("mbsc-lv");
								j.child = k;
								a(".mbsc-lv-back", t).attr("data-back", o)
							}
						db[na] = {
							item: s,
							child: s.children("ul,ol"),
							parent: k,
							ref: o
						};
						ea = fa(k);
						h = ea.length;
						if(c === l || c === null) c = h;
						la && (x = "mbsc-lv-item-new-" + (la ? N : ""));
						D(s.addClass(x));
						if(c !== false)
							if(h) c < h ? s.insertBefore(ea.eq(c)) : s.insertAfter(ea.eq(h - 1));
							else {
								g = a(".mbsc-lv-back", k);
								g.length ? s.insertAfter(g) : k.append(s)
							}
						if(k.hasClass("mbsc-lv-v")) $.animate(s.height(s.outerHeight()), la && Tb === na ? "none" : "expand", function(a) {
							$.animate(a.height(""), la ? "add-" + N : "pop-in", function(a) {
								e.call(Qa,
									a.removeClass(x));
								d()
							})
						});
						else {
							e.call(Qa, s.removeClass(x));
							d()
						}
						wa.trigger("mbsc-enhance", [{
							theme: ca.theme,
							lang: ca.lang
						}]);
						xa("onItemAdd", [s])
					})
				};
				$.swipe = function(a, d, b, c, e) {
					aa = a = ga(a);
					Ya = c;
					na = xb = !0;
					b = b === l ? 300 : b;
					ma = 0 < d ? 1 : -1;
					w();
					I();
					K(a, d, b);
					clearTimeout(jc);
					clearInterval(dc);
					dc = setInterval(function() {
						la = 100 * (q.getPosition(a) / ab);
						R()
					}, 10);
					jc = setTimeout(function() {
						clearInterval(dc);
						la = d;
						R();
						H(e);
						na = xb = Ya = !1
					}, b)
				};
				$.openStage = function(a, d, b, c) {
					Vb[d] && $.swipe(a, Vb[d].percent, b, c)
				};
				$.openActions = function(a,
					d, b, c) {
					var e = u(ub[a.attr("data-type") || "defaults"]);
					$.swipe(a, "left" == d ? -e : e, b, c)
				};
				$.close = function(a, d) {
					$.swipe(a, 0, d)
				};
				$.remove = function(a, d, b, c) {
					var e, f, b = b || A,
						a = ga(a);
					a.length && (f = a.parent(), e = fa(f).index(a), c || (a.attr("data-ref") === Tb && (Ub = !0), $.addUndoAction(function(d) {
						$.add(null, a, e, d, f, !0)
					}, !0)), C(a, function(e) {
						d = d || a.attr("data-pos") < 0 ? "left" : "right";
						if(f.hasClass("mbsc-lv-v")) $.animate(a.addClass("mbsc-lv-removed"), c ? "pop-out" : "remove-" + d, function(a) {
							$.animate(a.height(a.outerHeight()),
								"collapse",
								function(a) {
									U(a.height("").removeClass("mbsc-lv-removed").remove());
									b.call(Qa, a);
									e()
								})
						});
						else {
							a.remove();
							b.call(Qa, a);
							e()
						}
						xa("onItemRemove", [a])
					}))
				};
				$.move = function(a, d, b, c, e, f) {
					a = ga(a);
					f || $.startActionTrack();
					Aa.append(Da);
					$.remove(a, b, null, f);
					$.add(null, a, d, c, e, f);
					f || $.endActionTrack()
				};
				$.navigate = function(a, d) {
					var b, c, a = ga(a);
					b = db[a.attr("data-ref")];
					c = 0;
					for(var e = db[a.attr("data-ref")]; e.ref;) c++, e = db[e.ref];
					b && (da(c >= zb ? "r" : "l", b.parent, a, d), zb = c)
				};
				$.init = function(d) {
					var e = La.find("ul,ol").length ?
						"left" : "right",
						f = 0,
						g = "",
						h = "",
						ea = "";
					$._init(d);
					d = ca.sort || ca.sortable;
					"group" === d && (d = {
						group: !1,
						multiLevel: !0
					});
					!0 === d && (d = {
						group: !0,
						multiLevel: !0,
						handle: ca.sortHandle
					});
					d && d.handle === l && (d.handle = ca.sortHandle);
					$.sortable = d || !1;
					g += '<div class="mbsc-lv-multi-c"></div><div class="mbsc-lv-ic-c"><div class="mbsc-lv-ic-s mbsc-lv-ic mbsc-ic mbsc-ic-none"></div><div class="mbsc-lv-ic-text"></div></div>';
					La.addClass("mbsc-lv mbsc-lv-v mbsc-lv-root").show();
					Aa = a('<div class="mbsc-lv-stage-c">' + g + "</div>");
					Da = a(".mbsc-lv-ic-c", Aa);
					Na = a(".mbsc-lv-multi-c", Aa);
					pa = a(".mbsc-lv-ic-s", Aa);
					Rb = a(".mbsc-lv-ic-text", Aa);
					cb = a('<li class="mbsc-lv-item mbsc-lv-ph"></li>');
					ua = a('<div class="mbsc-lv-fill-item"></div>');
					wa = a('<div class="mbsc-lv-cont mbsc-lv-' + ca.theme + (ca.baseTheme ? " mbsc-lv-" + ca.baseTheme : "") + (ca.animateIcons ? " mbsc-lv-ic-anim" : "") + (i ? "" : " mbsc-lv-no3d") + (ca.altRow ? " mbsc-lv-alt-row " : "") + '"><ul class="mbsc-lv mbsc-lv-dummy"></ul><div class="mbsc-lv-sl-c"></div></div>');
					Ta = "body" !== ca.context;
					Ha =
						a(Ta ? ca.context : c);
					Ua = a(".mbsc-lv-dummy", wa);
					wa.insertAfter(La);
					$.sortable.handle && (y = !0 === $.sortable.handle ? e : $.sortable.handle, mb = '<div class="mbsc-lv-handle-c mbsc-lv-item-h-' + y + ' mbsc-lv-handle"><div class="' + ca.handleClass + ' mbsc-lv-handle-bar-c mbsc-lv-handle">' + ca.handleMarkup + "</div></div>", wa.addClass("mbsc-lv-handle-" + y));
					Ha.on("orientationchange.mbsc-lv resize.mbsc-lv", function() {
						clearTimeout(Va);
						Va = setTimeout(function() {
							Gb = Ha[0].innerHeight || Ha.innerHeight();
							$b = Ta ? Ha.offset().top : 0;
							if(na) {
								Ka =
									aa[0].offsetTop;
								Ba = aa.outerHeight();
								Aa.css({
									top: Ka,
									height: Ba
								})
							}
						}, 200)
					}).trigger("resize.mbsc-lv");
					wa.on("touchstart mousedown", ".mbsc-lv-item", E).on("touchmove", ".mbsc-lv-item", n).on("touchend touchcancel", ".mbsc-lv-item", G);
					Qa.addEventListener && Qa.addEventListener("click", function(a) {
						if(Kb) {
							a.stopPropagation();
							a.preventDefault();
							Kb = false
						}
					}, !0);
					wa.on("touchstart mousedown", ".mbsc-lv-ic-m", function(a) {
						if(!Ya) {
							a.stopPropagation();
							a.preventDefault()
						}
						Ob = P(a, "X");
						Pb = P(a, "Y")
					}).on("touchend mouseup", ".mbsc-lv-ic-m",
						function(d) {
							if(!Ya) {
								d.type === "touchend" && q.preventClick();
								b && !a(this).hasClass("mbsc-lv-ic-disabled") && Math.abs(P(d, "X") - Ob) < 20 && Math.abs(P(d, "Y") - Pb) < 20 && L((la < 0 ? ya.rightMenu : ya.leftMenu)[a(this).index()], Oa, lb)
							}
						});
					ac = a(".mbsc-lv-sl-c", wa).append(La.addClass("mbsc-lv-sl-curr")).attr("data-ref", z++);
					ka = La;
					ob = wa;
					Pa = '<li class="mbsc-lv-item mbsc-lv-back">' + ca.backText + '<div class="mbsc-lv-arr mbsc-lv-ic mbsc-ic ' + ca.leftArrowClass + '"></div></li>';
					$a = '<div class="mbsc-lv-arr mbsc-lv-ic mbsc-ic ' + ca.rightArrowClass +
						'"></div>';
					D(La);
					cc = 0;
					ub = ca.itemGroups || {};
					ub.defaults = {
						swipeleft: ca.swipeleft,
						swiperight: ca.swiperight,
						stages: ca.stages,
						actions: ca.actions,
						actionsWidth: ca.actionsWidth
					};
					a.each(ub, function(d, b) {
						b.swipe = b.swipe || ca.swipe;
						b.stages = b.stages || [];
						va(b.stages, 1, true);
						va(b.stages.left, 1);
						va(b.stages.right, -1);
						if(b.stages.left || b.stages.right) b.stages = [].concat(b.stages.left || [], b.stages.right || []);
						eb = false;
						if(!b.stages.length) {
							b.swipeleft && b.stages.push({
								percent: -30,
								action: b.swipeleft
							});
							b.swiperight && b.stages.push({
								percent: 30,
								action: b.swiperight
							})
						}
						a.each(b.stages, function(a, d) {
							if(d.percent === 0) {
								eb = true;
								return false
							}
						});
						eb || b.stages.push({
							percent: 0
						});
						b.stages.sort(function(a, d) {
							return a.percent - d.percent
						});
						a.each(b.stages, function(a, d) {
							if(d.percent === 0) {
								b.start = a;
								return false
							}
						});
						if(eb) b.left = b.right = b.stages[b.start];
						else {
							b.left = b.stages[b.start - 1] || {};
							b.right = b.stages[b.start + 1] || {}
						}
						if(b.actions) {
							b.leftMenu = b.actions.left || b.actions;
							b.rightMenu = b.actions.right || b.leftMenu;
							ea = h = "";
							for(f = 0; f < b.leftMenu.length; f++) h = h + ('<div class="mbsc-lv-ic-m mbsc-lv-ic mbsc-ic mbsc-ic-' +
								b.leftMenu[f].icon + '"></div>');
							for(f = 0; f < b.rightMenu.length; ++f) ea = ea + ('<div class="mbsc-lv-ic-m mbsc-lv-ic mbsc-ic mbsc-ic-' + b.rightMenu[f].icon + '"></div>');
							if(b.actions.left) b.swipe = b.actions.right ? b.swipe : "right";
							if(b.actions.right) b.swipe = b.actions.left ? b.swipe : "left";
							b.icons = '<div class="mbsc-lv-multi mbsc-lv-multi-ic-left">' + h + '</div><div class="mbsc-lv-multi mbsc-lv-multi-ic-right">' + ea + "</div>"
						}
					});
					ca.fixedHeader && (ta = a('<div class="mbsc-lv-fixed-header"></div>'), Ab = a(".mbsc-lv-gr-title", La),
						Ta ? (Ha.before(ta), ta.addClass("mbsc-lv-fixed-header-ctx mbsc-lv-" + ca.theme + (ca.baseTheme ? " mbsc-lv-" + ca.baseTheme : ""))) : wa.prepend(ta), Ha.on("scroll.mbsc-lv touchmove.mbsc-lv", function() {
							if(Wa || !na) {
								var d = a(this).scrollTop(),
									b = La.offset().top;
								Ab.each(function(c, e) {
									if(a(e).offset().top - (Ta ? b : 0) < d) Bb = c
								});
								ra = Ab[Bb];
								b < (Ta ? Ha.offset().top : d) && d < (Ta ? La[0].scrollHeight : b + La.height()) ? ta.empty().append(a(ra).clone()).show() : ta.hide()
							}
						}));
					ca.rtl && wa.addClass("mbsc-lv-rtl");
					ca.hover && (Xa = ca.hover.time || 200,
						fb = ca.hover.timeout || 200, Ib = ca.hover.direction || ca.hover || "right", wa.on("mouseenter.mbsc-lv", ".mbsc-lv-item", function() {
							if(!Ga || Ga[0] != this) {
								N();
								Ga = a(this);
								if(ub[Ga.attr("data-type") || "defaults"].actions) Hb = setTimeout(function() {
									if(Mb) Ga = null;
									else {
										yb = true;
										$.openActions(Ga, Ib, Xa, false)
									}
								}, fb)
							}
						}).on("mouseleave.mbsc-lv", N));
					La.is("[mbsc-enhance]") && (Wb = !0, La.removeAttr("mbsc-enhance"), wa.attr("mbsc-enhance", ""));
					wa.trigger("mbsc-enhance", [{
						theme: ca.theme,
						lang: ca.lang
					}]);
					xa("onInit", [])
				};
				$.destroy = function() {
					ob.append(ka);
					Ta && ta && ta.remove();
					Wb && La.attr("mbsc-enhance", "");
					wa.find(".mbsc-lv-txt,.mbsc-lv-img").removeClass("mbsc-lv-txt mbsc-lv-img");
					wa.find("ul,ol").removeClass("mbsc-lv mbsc-lv-v mbsc-lv-root mbsc-lv-sl-curr").find("li").removeClass("mbsc-lv-gr-title mbsc-lv-item mbsc-lv-item-enhanced mbsc-lv-parent mbsc-lv-img-left mbsc-lv-img-right mbsc-lv-item-ic-left mbsc-lv-item-ic-right").removeAttr("data-ref");
					a(".mbsc-lv-back,.mbsc-lv-handle-c,.mbsc-lv-arr,.mbsc-lv-item-ic", wa).remove();
					La.insertAfter(wa);
					wa.off().remove();
					Aa.remove();
					Ha.off(".mbsc-lv");
					$._destroy()
				};
				var Nb, kc = [],
					Cb = [],
					ec = [],
					Jb = 0;
				$.startActionTrack = function() {
					Jb || (ec = []);
					Jb++
				};
				$.endActionTrack = function() {
					Jb--;
					Jb || Cb.push(ec)
				};
				$.addUndoAction = function(a, d) {
					var b = {
						action: a,
						async: d
					};
					Jb ? ec.push(b) : (Cb.push([b]), Cb.length > ca.undoLimit && Cb.shift())
				};
				$.undo = function() {
					function a() {
						0 > c ? (Nb = !1, d()) : (b = e[c], c--, b.async ? b.action(a) : (b.action(), a()))
					}
		
					function d() {
						if(e = kc.shift()) Nb = !0, c = e.length - 1, a()
					}
					var b, c, e;
					Cb.length && kc.push(Cb.pop());
					Nb || d()
				};
				ca = $.settings;
				xa = $.trigger;
				$.init(v)
			};
			f.ListView.prototype = {
				_class: "listview",
				_hasDef: !0,
				_hasTheme: !0,
				_hasLang: !0,
				_defaults: {
					actionsWidth: 90,
					sortDelay: 250,
					undoLimit: 10,
					swipe: !0,
					quickSwipe: !0,
					animateIcons: !0,
					fillAnimation: !0,
					animation: !0,
					revert: !0,
					handleClass: "",
					handleMarkup: '<div class="mbsc-lv-handle-bar mbsc-lv-handle"></div><div class="mbsc-lv-handle-bar mbsc-lv-handle"></div><div class="mbsc-lv-handle-bar mbsc-lv-handle"></div>',
					leftArrowClass: "mbsc-ic-arrow-left4",
					rightArrowClass: "mbsc-ic-arrow-right4",
					backText: "Back",
					undoText: "Undo",
					stages: []
				}
			};
			e.themes.listview.mobiscroll = {
				leftArrowClass: "mbsc-ic-arrow-left5",
				rightArrowClass: "mbsc-ic-arrow-right5"
			};
			e.presetShort("listview", "ListView")
		})(jQuery, window, document);
		(function(a) {
			var c = a.mobiscroll.themes.listview,
				m = {
					onThemeLoad: function(a, b) {
						b.theme && (b.theme = b.theme.replace("android-ics", "android-holo").replace(" light", "-light"))
					},
					onInit: function() {
						a(this).closest(".mbsc-lv-cont").addClass("mbsc-lv-android-holo")
					}
				};
			c["android-holo"] = m;
			c["android-holo-light"] = m;
			c["android-ics"] = m;
			c["android-ics light"] = m;
			c["android-holo light"] = m
		})(jQuery);
		(function(a) {
			var c = a.mobiscroll.themes.listview,
				m = {
					onThemeLoad: function(a, b) {
						b.theme && (b.theme = b.theme.replace(" light", "-light"))
					},
					onInit: function() {
						a(this).closest(".mbsc-lv-cont").addClass("mbsc-lv-wp")
					}
				};
			c.wp = m;
			c["wp-light"] = m;
			c["wp light"] = m
		})(jQuery);
		(function(a) {
			var c = {
				onInit: function() {
					a(this).closest(".mbsc-lv-cont").addClass("mbsc-lv-sense")
				},
				onThemeLoad: function(a, c) {
					c.theme && (c.theme = c.theme.replace("sense5", "sense"))
				}
			};
			a.mobiscroll.themes.listview.sense = c;
			a.mobiscroll.themes.listview["sense-dark"] = c;
			a.mobiscroll.themes.listview.sense5 = c;
			a.mobiscroll.themes.listview["sense5-dark"] = c
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.listview.material = {
				leftArrowClass: "mbsc-ic-material-keyboard-arrow-left",
				rightArrowClass: "mbsc-ic-material-keyboard-arrow-right",
				onItemActivate: function(c, m) {
					a.mobiscroll.themes.material.addRipple(c, m)
				},
				onItemDeactivate: function() {
					a.mobiscroll.themes.material.removeRipple()
				},
				onSlideStart: function(c) {
					a(".mbsc-ripple", c).remove()
				},
				onSortStart: function(c) {
					a(".mbsc-ripple", c).remove()
				}
			}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.listview["ios-classic"] = {}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.listview.android = {}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.listview["sense-ui"] = {}
		})(jQuery);
		(function(a) {
			var a = a.mobiscroll.themes.listview,
				c = {
					onThemeLoad: function(a, c) {
						c.theme && (c.theme = c.theme.replace("ios7", "ios"))
					}
				};
			a.ios = c;
			a.ios7 = c
		})(jQuery);
		(function(a, c, m, l) {
			var b, k, e = a.mobiscroll,
				f = e.util,
				q = f.jsPrefix,
				p = f.has3d,
				h = f.constrain,
				i = f.isString,
				P = f.isOldAndroid,
				f = /(iphone|ipod|ipad).* os 8_/i.test(navigator.userAgent),
				j = function() {},
				M = function(a) {
					a.preventDefault()
				};
			e.classes.Frame = function(f, A, t) {
				function F(d) {
					K && K.removeClass("dwb-a");
					K = a(this);
					!K.hasClass("dwb-d") && !K.hasClass("dwb-nhl") && K.addClass("dwb-a");
					if("mousedown" === d.type) a(m).on("mouseup", B);
					else if("pointerdown" === d.type) a(m).on("pointerup", B)
				}
		
				function B(d) {
					K && (K.removeClass("dwb-a"),
						K = null);
					"mouseup" === d.type ? a(m).off("mouseup", B) : "pointerup" === d.type && a(m).off("pointerup", B)
				}
		
				function s(a) {
					13 == a.keyCode ? u.select() : 27 == a.keyCode && u.cancel()
				}
		
				function g(c) {
					var e, f, g, h = D.focusOnClose;
					u._markupRemove();
					d.remove();
					b && !c && setTimeout(function() {
						if(h === l || !0 === h) {
							k = !0;
							e = b[0];
							g = e.type;
							f = e.value;
							try {
								e.type = "button"
							} catch(d) {}
							b.focus();
							e.type = g;
							e.value = f
						} else h && a(h).focus()
					}, 200);
					u._isVisible = !1;
					W("onHide", [])
				}
		
				function v(a) {
					clearTimeout(ja[a.type]);
					ja[a.type] = setTimeout(function() {
						var d =
							"scroll" == a.type;
						(!d || fa) && u.position(!d)
					}, 200)
				}
		
				function w(a) {
					a.target.nodeType && !L[0].contains(a.target) && L.focus()
				}
		
				function E(d, c) {
					d && d();
					a(m.activeElement).is("input,textarea") && a(m.activeElement).blur();
					!1 !== u.show() && (b = c, setTimeout(function() {
						k = !1
					}, 300))
				}
		
				function n() {
					u._fillValue();
					W("onSelect", [u._value])
				}
		
				function G() {
					W("onCancel", [u._value])
				}
		
				function I() {
					u.setVal(null, !0)
				}
				var R, H, T, d, N, x, L, o, O, Q, K, r, W, Z, J, S, U, ba, Y, D, fa, ga, ia, ha, u = this,
					X = a(f),
					da = [],
					ja = {};
				e.classes.Base.call(this, f, A, !0);
				u.position =
					function(b) {
						var c, e, f, g, j, la, i, t, k, s, N = 0,
							q = 0;
						k = {};
						var r = Math.min(o[0].innerWidth || o.innerWidth(), x.width()),
							v = o[0].innerHeight || o.innerHeight();
						if(!(ia === r && ha === v && b || Y))
							if((u._isFullScreen || /top|bottom/.test(D.display)) && L.width(r), !1 !== W("onPosition", [d, r, v]) && J) {
								e = o.scrollLeft();
								b = o.scrollTop();
								g = D.anchor === l ? X : a(D.anchor);
								u._isLiquid && "liquid" !== D.layout && (400 > r ? d.addClass("dw-liq") : d.removeClass("dw-liq"));
								!u._isFullScreen && /modal|bubble/.test(D.display) && (O.width(""), a(".mbsc-w-p", d).each(function() {
									c =
										a(this).outerWidth(!0);
									N += c;
									q = c > q ? c : q
								}), c = N > r ? q : N, O.width(c + 1).css("white-space", N > r ? "" : "nowrap"));
								S = L.outerWidth();
								U = L.outerHeight(!0);
								fa = U <= v && S <= r;
								(u.scrollLock = fa) ? H.addClass("mbsc-fr-lock"): H.removeClass("mbsc-fr-lock");
								"modal" == D.display ? (e = Math.max(0, e + (r - S) / 2), f = b + (v - U) / 2) : "bubble" == D.display ? (s = !0, t = a(".dw-arrw-i", d), f = g.offset(), la = Math.abs(H.offset().top - f.top), i = Math.abs(H.offset().left - f.left), j = g.outerWidth(), g = g.outerHeight(), e = h(i - (L.outerWidth(!0) - j) / 2, e + 3, e + r - S - 3), f = la - U, f < b || la >
									b + v ? (L.removeClass("dw-bubble-top").addClass("dw-bubble-bottom"), f = la + g) : L.removeClass("dw-bubble-bottom").addClass("dw-bubble-top"), t = t.outerWidth(), j = h(i + j / 2 - (e + (S - t) / 2), 0, t), a(".dw-arr", d).css({
										left: j
									})) : "top" == D.display ? f = b : "bottom" == D.display && (f = b + v - U);
								f = 0 > f ? 0 : f;
								k.top = f;
								k.left = e;
								L.css(k);
								x.height(0);
								k = Math.max(f + U, "body" == D.context ? a(m).height() : H[0].scrollHeight);
								x.css({
									height: k
								});
								if(s && (f + U > b + v || la > b + v)) Y = !0, setTimeout(function() {
									Y = false
								}, 300), o.scrollTop(Math.min(f + U - v, k - v));
								ia = r;
								ha = v
							}
					};
				u.attachShow = function(a, d) {
					da.push({
						readOnly: a.prop("readonly"),
						el: a
					});
					if("inline" !== D.display) {
						if(ga && a.is("input")) a.prop("readonly", !0).on("mousedown.dw", function(a) {
							a.preventDefault()
						});
						if(D.showOnFocus) a.on("focus.dw", function() {
							k || E(d, a)
						});
						D.showOnTap && (a.on("keydown.dw", function(b) {
							if(32 == b.keyCode || 13 == b.keyCode) b.preventDefault(), b.stopPropagation(), E(d, a)
						}), u.tap(a, function() {
							E(d, a)
						}))
					}
				};
				u.select = function() {
					J ? u.hide(!1, "set", !1, n) : n()
				};
				u.cancel = function() {
					J ? u.hide(!1, "cancel", !1, G) : n()
				};
				u.clear = function() {
					W("onClear", [d]);
					J && !u.live ? u.hide(!1, "clear", !1, I) : I()
				};
				u.enable = function() {
					D.disabled = !1;
					u._isInput && X.prop("disabled", !1)
				};
				u.disable = function() {
					D.disabled = !0;
					u._isInput && X.prop("disabled", !0)
				};
				u.show = function(b, f) {
					var g;
					if(!D.disabled && !u._isVisible) {
						u._readValue();
						if(!1 === W("onBeforeShow", [])) return !1;
						r = P ? !1 : D.animate;
						!1 !== r && ("top" == D.display && (r = "slidedown"), "bottom" == D.display && (r = "slideup"));
						g = '<div lang="' + D.lang + '" class="mbsc-' + D.theme + (D.baseTheme ? " mbsc-" + D.baseTheme :
							"") + " dw-" + D.display + " " + (D.cssClass || "") + (u._isLiquid ? " dw-liq" : "") + (P ? " mbsc-old" : "") + (Z ? "" : " dw-nobtn") + '"><div class="dw-persp">' + (J ? '<div class="dwo"></div>' : "") + "<div" + (J ? ' role="dialog" tabindex="-1"' : "") + ' class="dw' + (D.rtl ? " dw-rtl" : " dw-ltr") + '">' + ("bubble" === D.display ? '<div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div>' : "") + '<div class="dwwr"><div aria-live="assertive" class="dw-aria dw-hidden"></div>' + (D.headerText ? '<div class="dwv">' + (i(D.headerText) ? D.headerText :
							"") + "</div>" : "") + '<div class="dwcc">';
						g += u._generateContent();
						g += "</div>";
						Z && (g += '<div class="dwbc">', a.each(Q, function(a, d) {
								d = i(d) ? u.buttons[d] : d;
								if(d.handler === "set") d.parentClass = "dwb-s";
								if(d.handler === "cancel") d.parentClass = "dwb-c";
								g = g + ("<div" + (D.btnWidth ? ' style="width:' + 100 / Q.length + '%"' : "") + ' class="dwbw ' + (d.parentClass || "") + '"><div tabindex="0" role="button" class="dwb' + a + " dwb-e " + (d.cssClass === l ? D.btnClass : d.cssClass) + (d.icon ? " mbsc-ic mbsc-ic-" + d.icon : "") + '">' + (d.text || "") + "</div></div>")
							}),
							g += "</div>");
						g += "</div></div></div></div>";
						d = a(g);
						x = a(".dw-persp", d);
						N = a(".dwo", d);
						O = a(".dwwr", d);
						T = a(".dwv", d);
						L = a(".dw", d);
						R = a(".dw-aria", d);
						u._markup = d;
						u._header = T;
						u._isVisible = !0;
						ba = "orientationchange resize";
						u._markupReady(d);
						W("onMarkupReady", [d]);
						if(J) {
							a(c).on("keydown", s);
							if(D.scrollLock) d.on("touchmove mousewheel wheel", function(a) {
								fa && a.preventDefault()
							});
							"Moz" !== q && a("input,select,button", H).each(function() {
								this.disabled || a(this).addClass("dwtd").prop("disabled", true)
							});
							e.activeInstance &&
								e.activeInstance.hide();
							ba += " scroll";
							e.activeInstance = u;
							d.appendTo(H);
							if(D.focusTrap) o.on("focusin", w);
							p && r && !b && d.addClass("dw-in dw-trans").on("webkitAnimationEnd animationend", function() {
								d.off("webkitAnimationEnd animationend").removeClass("dw-in dw-trans").find(".dw").removeClass("dw-" + r);
								f || L.focus();
								u.ariaMessage(D.ariaMessage)
							}).find(".dw").addClass("dw-" + r)
						} else X.is("div") && !u._hasContent ? X.html(d) : d.insertAfter(X);
						u._markupInserted(d);
						W("onMarkupInserted", [d]);
						u.position();
						o.on(ba, v);
						d.on("selectstart mousedown",
							M).on("click", ".dwb-e", M).on("keydown", ".dwb-e", function(d) {
							if(d.keyCode == 32) {
								d.preventDefault();
								d.stopPropagation();
								a(this).click()
							}
						}).on("keydown", function(b) {
							if(b.keyCode == 32) b.preventDefault();
							else if(b.keyCode == 9 && J && D.focusTrap) {
								var c = d.find('[tabindex="0"]').filter(function() {
										return this.offsetWidth > 0 || this.offsetHeight > 0
									}),
									e = c.index(a(":focus", d)),
									f = c.length - 1,
									g = 0;
								if(b.shiftKey) {
									f = 0;
									g = -1
								}
								if(e === f) {
									c.eq(g).focus();
									b.preventDefault()
								}
							}
						});
						a("input,select,textarea", d).on("selectstart mousedown",
							function(a) {
								a.stopPropagation()
							}).on("keydown", function(a) {
							a.keyCode == 32 && a.stopPropagation()
						});
						a.each(Q, function(b, c) {
							u.tap(a(".dwb" + b, d), function(a) {
								c = i(c) ? u.buttons[c] : c;
								(i(c.handler) ? u.handlers[c.handler] : c.handler).call(this, a, u)
							}, true)
						});
						D.closeOnOverlay && u.tap(N, function() {
							u.cancel()
						});
						J && !r && (f || L.focus(), u.ariaMessage(D.ariaMessage));
						d.on("touchstart mousedown pointerdown", ".dwb-e", F).on("touchend", ".dwb-e", B);
						u._attachEvents(d);
						W("onShow", [d, u._tempValue])
					}
				};
				u.hide = function(b, f, h, j) {
					if(!u._isVisible ||
						!h && !u._isValid && "set" == f || !h && !1 === W("onBeforeClose", [u._tempValue, f])) return !1;
					if(d) {
						"Moz" !== q && a(".dwtd", H).each(function() {
							a(this).prop("disabled", !1).removeClass("dwtd")
						});
						if(p && J && r && !b && !d.hasClass("dw-trans")) d.addClass("dw-out dw-trans").find(".dw").addClass("dw-" + r).on("webkitAnimationEnd animationend", function() {
							g(b)
						});
						else g(b);
						o.off(ba, v).off("focusin", w)
					}
					J && (H.removeClass("mbsc-fr-lock"), a(c).off("keydown", s), delete e.activeInstance);
					j && j();
					W("onClosed", [u._value])
				};
				u.ariaMessage = function(a) {
					R.html("");
					setTimeout(function() {
						R.html(a)
					}, 100)
				};
				u.isVisible = function() {
					return u._isVisible
				};
				u.setVal = j;
				u.getVal = j;
				u._generateContent = j;
				u._attachEvents = j;
				u._readValue = j;
				u._fillValue = j;
				u._markupReady = j;
				u._markupInserted = j;
				u._markupRemove = j;
				u._processSettings = j;
				u._presetLoad = function(a) {
					a.buttons = a.buttons || ("inline" !== a.display ? ["set", "cancel"] : []);
					a.headerText = a.headerText === l ? "inline" !== a.display ? "{value}" : !1 : a.headerText
				};
				u.destroy = function() {
					u.hide(!0, !1, !0);
					a.each(da, function(a, d) {
						d.el.off(".dw").prop("readonly",
							d.readOnly)
					});
					u._destroy()
				};
				u.init = function(d) {
					d.onClose && (d.onBeforeClose = d.onClose);
					u._init(d);
					u._isLiquid = "liquid" === (D.layout || (/top|bottom/.test(D.display) ? "liquid" : ""));
					u._processSettings();
					X.off(".dw");
					Q = D.buttons || [];
					J = "inline" !== D.display;
					ga = D.showOnFocus || D.showOnTap;
					o = a("body" == D.context ? c : D.context);
					H = a(D.context);
					u.context = o;
					u.live = !0;
					a.each(Q, function(a, d) {
						if(d == "ok" || d == "set" || d.handler == "set") return u.live = false
					});
					u.buttons.set = {
						text: D.setText,
						handler: "set"
					};
					u.buttons.cancel = {
						text: u.live ?
							D.closeText : D.cancelText,
						handler: "cancel"
					};
					u.buttons.clear = {
						text: D.clearText,
						handler: "clear"
					};
					u._isInput = X.is("input");
					Z = 0 < Q.length;
					u._isVisible && u.hide(!0, !1, !0);
					W("onInit", []);
					J ? (u._readValue(), u._hasContent || u.attachShow(X)) : u.show();
					X.on("change.dw", function() {
						u._preventChange || u.setVal(X.val(), true, false);
						u._preventChange = false
					})
				};
				u.buttons = {};
				u.handlers = {
					set: u.select,
					cancel: u.cancel,
					clear: u.clear
				};
				u._value = null;
				u._isValid = !0;
				u._isVisible = !1;
				D = u.settings;
				W = u.trigger;
				t || u.init(A)
			};
			e.classes.Frame.prototype._defaults = {
				lang: "en",
				setText: "Set",
				selectedText: "{count} selected",
				closeText: "Close",
				cancelText: "Cancel",
				clearText: "Clear",
				disabled: !1,
				closeOnOverlay: !0,
				showOnFocus: !1,
				showOnTap: !0,
				display: "modal",
				scrollLock: !0,
				tap: !0,
				btnClass: "dwb",
				btnWidth: !0,
				focusTrap: !0,
				focusOnClose: !f
			};
			e.themes.frame.mobiscroll = {
				rows: 5,
				showLabel: !1,
				headerText: !1,
				btnWidth: !1,
				selectedLineHeight: !0,
				selectedLineBorder: 1,
				dateOrder: "MMddyy",
				weekDays: "min",
				checkIcon: "ion-ios7-checkmark-empty",
				btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
				btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
				btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
				btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5"
			};
			a(c).on("focus", function() {
				b && (k = !0)
			})
		})(jQuery, window, document);
		(function(a) {
			var a = a.mobiscroll.themes.frame,
				c = {
					dateOrder: "Mddyy",
					rows: 5,
					minWidth: 76,
					height: 36,
					showLabel: !1,
					selectedLineHeight: !0,
					selectedLineBorder: 2,
					useShortLabels: !0,
					icon: {
						filled: "star3",
						empty: "star"
					},
					btnPlusClass: "mbsc-ic mbsc-ic-arrow-down6",
					btnMinusClass: "mbsc-ic mbsc-ic-arrow-up6",
					onThemeLoad: function(a, c) {
						c.theme && (c.theme = c.theme.replace("android-ics", "android-holo"))
					},
					onMarkupReady: function(a) {
						a.addClass("mbsc-android-holo")
					}
				};
			a["android-holo"] = c;
			a["android-holo-light"] = c;
			a["android-ics"] =
				c;
			a["android-ics light"] = c;
			a["android-holo light"] = c
		})(jQuery);
		(function(a) {
			var c = a.mobiscroll.themes.frame,
				m = {
					minWidth: 76,
					height: 76,
					dateOrder: "mmMMddDDyy",
					headerText: !1,
					showLabel: !1,
					deleteIcon: "backspace4",
					icon: {
						filled: "star3",
						empty: "star"
					},
					btnWidth: !1,
					btnStartClass: "mbsc-ic mbsc-ic-play3",
					btnStopClass: "mbsc-ic mbsc-ic-pause2",
					btnResetClass: "mbsc-ic mbsc-ic-stop2",
					btnLapClass: "mbsc-ic mbsc-ic-loop2",
					btnHideClass: "mbsc-ic mbsc-ic-close",
					btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left2",
					btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right2",
					btnPlusClass: "mbsc-ic mbsc-ic-plus",
					btnMinusClass: "mbsc-ic mbsc-ic-minus",
					onMarkupInserted: function(c, b) {
						var k, e, f, q = b.settings;
						if("clickpick" != q.mode) a(".dwwl", c).on("touchstart mousedown wheel mousewheel", function(b) {
							if(!("mousedown" === b.type && e || (a.isArray(q.readonly) ? q.readonly[a(".dwwl", c).index(this)] : q.readonly))) e = "touchstart" === b.type, k = !0, f = a(this).hasClass("wpa"), a(".dwwl", c).removeClass("wpa"), a(".dw-sel", this).removeClass("dw-sel"), a(this).addClass("wpa")
						}).on("touchmove mousemove", function() {
							k = !1
						}).on("touchend mouseup",
							function(b) {
								k && f && a(b.target).closest(".dw-li").hasClass("dw-sel") && a(this).removeClass("wpa");
								"mouseup" === b.type && (e = !1);
								k = !1
							})
					},
					onThemeLoad: function(a, b) {
						if(a && a.dateOrder && !b.dateOrder) {
							var c = a.dateOrder,
								c = c.match(/mm/i) ? c.replace(/mmMM|mm|MM/, "mmMM") : c.replace(/mM|m|M/, "mM"),
								c = c.match(/dd/i) ? c.replace(/ddDD|dd|DD/, "ddDD") : c.replace(/dD|d|D/, "dD");
							b.dateOrder = c
						}
					},
					onInit: function(a) {
						a = a.buttons;
						a.set.icon = "checkmark";
						a.cancel.icon = "close";
						a.clear.icon = "close";
						a.ok && (a.ok.icon = "checkmark");
						a.close &&
							(a.close.icon = "close");
						a.now && (a.now.icon = "loop2")
					}
				};
			c.wp = m;
			c["wp-light"] = m;
			c["wp light"] = m
		})(jQuery);
		(function(a) {
			var c = a.mobiscroll.themes.frame,
				m = {
					minWidth: 64,
					height: 60,
					btnStartClass: "mbsc-ic mbsc-ic-play3",
					btnStopClass: "mbsc-ic mbsc-ic-pause2",
					btnResetClass: "mbsc-ic mbsc-ic-stop2",
					btnLapClass: "mbsc-ic mbsc-ic-loop2",
					btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
					btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5",
					btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
					btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
					onMarkupReady: function(c, b) {
						var k = b.settings,
							e = k.height,
							k = k.rows;
						c.addClass("mbsc-sense");
						a(".dww", c).height(k *
							e - 40);
						a(".dw-ul", c).css("margin-top", k / 2 * e - e / 2 - 20 + "px");
						a(".dwwms .dw-ul", c).css("margin-top", "-20px");
						a(".dwwb", c).css({
							height: e - 20 + "px",
							lineHeight: e - 20 + "px"
						})
					},
					onThemeLoad: function(a, b) {
						b.theme && (b.theme = b.theme.replace("sense5", "sense"))
					}
				};
			c.sense = m;
			c["sense-dark"] = m;
			c.sense5 = m;
			c["sense5-dark"] = m
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.frame.material = {
				showLabel: !1,
				headerText: !1,
				btnWidth: !1,
				selectedLineHeight: !0,
				selectedLineBorder: 1,
				dateOrder: "MMddyy",
				weekDays: "min",
				deleteIcon: "material-backspace",
				icon: {
					filled: "material-star",
					empty: "material-star-outline"
				},
				checkIcon: "material-check",
				btnPlusClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-down",
				btnMinusClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-up",
				btnCalPrevClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-left",
				btnCalNextClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-right",
				onMarkupReady: function(c) {
					a.mobiscroll.themes.material.initRipple(c, ".dwb-e", "dwb-d", "dwb-nhl")
				},
				onEventBubbleShow: function(c, m) {
					var l = m.hasClass("dw-cal-events-b"),
						b = a(".dw-cal-event-color", m).eq(l ? 0 : -1).css("background-color");
					a(".dw-cal-events-arr", m).css("border-color", l ? "transparent transparent " + b + " transparent" : b + "transparent transparent transparent")
				}
			}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.frame["ios-classic"] = {
				display: "bottom",
				dateOrder: "MMdyy",
				rows: 5,
				height: 30,
				minWidth: 60,
				headerText: !1,
				showLabel: !1,
				btnWidth: !1,
				selectedLineHeight: !0,
				selectedLineBorder: 2,
				useShortLabels: !0
			}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.frame.android = {
				dateOrder: "Mddyy",
				mode: "clickpick",
				height: 50,
				showLabel: !1,
				btnStartClass: "mbsc-ic mbsc-ic-play3",
				btnStopClass: "mbsc-ic mbsc-ic-pause2",
				btnResetClass: "mbsc-ic mbsc-ic-stop2",
				btnLapClass: "mbsc-ic mbsc-ic-loop2"
			}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.frame["sense-ui"] = {
				btnStartClass: "mbsc-ic mbsc-ic-play3",
				btnStopClass: "mbsc-ic mbsc-ic-pause2",
				btnResetClass: "mbsc-ic mbsc-ic-stop2",
				btnLapClass: "mbsc-ic mbsc-ic-loop2"
			}
		})(jQuery);
		(function(a) {
			var a = a.mobiscroll.themes.frame,
				c = {
					display: "bottom",
					dateOrder: "MMdyy",
					rows: 5,
					height: 34,
					minWidth: 55,
					headerText: !1,
					showLabel: !1,
					btnWidth: !1,
					selectedLineHeight: !0,
					selectedLineBorder: 1,
					useShortLabels: !0,
					deleteIcon: "backspace3",
					checkIcon: "ion-ios7-checkmark-empty",
					btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
					btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5",
					btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
					btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
					onThemeLoad: function(a, c) {
						c.theme && (c.theme = c.theme.replace("ios7",
							"ios"))
					}
				};
			a.ios = c;
			a.ios7 = c
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.frame.bootstrap = {
				disabledClass: "disabled",
				activeClass: "btn-primary",
				activeTabClass: "active",
				todayClass: "text-primary",
				btnCalPrevClass: "",
				btnCalNextClass: "",
				selectedLineHeight: !0,
				onMarkupInserted: function(c) {
					a(".dw", c).removeClass("dwbg").addClass("popover");
					a(".dwwr", c).addClass("popover-content");
					a(".dwv", c).addClass("popover-title");
					a(".dw-arrw-i", c).addClass("popover");
					a(".dw-arr", c).addClass("arrow");
					a(".dwb, .dwwb", c).addClass("btn btn-default");
					a(".dwb-s .dwb",
						c).removeClass("btn-default").addClass("btn btn-primary");
					a(".dw-cal-next .dw-cal-btn-txt", c).prepend('<i class="icon icon-chevron-right glyphicon glyphicon-chevron-right"></i>');
					a(".dw-cal-prev .dw-cal-btn-txt", c).prepend('<i class="icon icon-chevron-left glyphicon glyphicon-chevron-left"></i>');
					a(".dw-cal-tabs ul", c).addClass("nav nav-tabs");
					a(".dw-cal-sc-c", c).addClass("popover");
					a(".dw-week-nrs-c", c).addClass("popover");
					a(".dw-cal-events", c).addClass("popover");
					a(".dw-cal-events-arr", c).addClass("arrow");
					a(".dw-dr", c).addClass("btn btn-sm btn-small btn-default");
					a(".mbsc-np-btn", c).addClass("btn btn-default")
				},
				onPosition: function(c) {
					setTimeout(function() {
						a(".dw-bubble-top, .dw-bubble-top .dw-arrw-i", c).removeClass("bottom").addClass("top");
						a(".dw-bubble-bottom, .dw-bubble-bottom .dw-arrw-i", c).removeClass("top").addClass("bottom")
					}, 10)
				},
				onEventBubbleShow: function(c, m) {
					a(".dw-cal-event-list", m).addClass("list-group");
					a(".dw-cal-event", m).addClass("list-group-item");
					setTimeout(function() {
						m.hasClass("dw-cal-events-b") ?
							m.removeClass("top").addClass("bottom") : m.removeClass("bottom").addClass("top")
					}, 10)
				}
			}
		})(jQuery);
		(function(a, c) {
			var m = function() {},
				l = a.mobiscroll,
				b = l.util,
				k = b.getCoord,
				e = b.testTouch;
			l.classes.Slider = function(f, q, p) {
				function h(b) {
					e(b, this) && !N && !f.disabled && a.mobiscroll.running && (N = !0, x = Y = !1, ha = k(b, "X"), u = k(b, "Y"), Q = ha, d.removeClass("mbsc-progress-anim"), E = D ? a(".mbsc-slider-handle", this) : G, n = E.parent().addClass("mbsc-active"), r = +E.attr("data-index"), ja = d.outerWidth(), O = d.offset().left, "mousedown" === b.type && (b.preventDefault(), a(document).on("mousemove", i).on("mouseup", P)))
				}
		
				function i(a) {
					if(N) {
						Q =
							k(a, "X");
						K = k(a, "Y");
						L = Q - ha;
						o = K - u;
						if(5 < Math.abs(L) || Y) Y = !0, 50 < Math.abs(va - new Date) && (va = new Date, s(Q, ga.round, S));
						Y ? a.preventDefault() : 7 < Math.abs(o) && B(a)
					}
				}
		
				function P(a) {
					N && (a.preventDefault(), D || d.addClass("mbsc-progress-anim"), s(Q, !0, !0), !Y && !x && (b.preventClick(), C._onTap(V[r])), B())
				}
		
				function j() {
					N && B()
				}
		
				function M() {
					var d = C._readValue(a(this)),
						b = +a(this).attr("data-index");
					d !== V[b] && (V[b] = d, v(d, b))
				}
		
				function z(a) {
					a.stopPropagation()
				}
		
				function A(a) {
					a.preventDefault()
				}
		
				function t(d) {
					var b;
					if(!f.disabled) {
						switch(d.keyCode) {
							case 38:
							case 39:
								b =
									1;
								break;
							case 40:
							case 37:
								b = -1
						}
						b && (d.preventDefault(), da || (r = +a(this).attr("data-index"), v(V[r] + fa * b, r, !0), da = setInterval(function() {
							v(V[r] + fa * b, r, !0)
						}, 200)))
					}
				}
		
				function F(a) {
					a.preventDefault();
					clearInterval(da);
					da = null
				}
		
				function B() {
					N = !1;
					n.removeClass("mbsc-active");
					a(document).off("mousemove", i).off("mouseup", P)
				}
		
				function s(a, d, b) {
					a = d ? Math.min(100 * Math.round(Math.max(100 * (a - O) / ja, 0) / ia / fa) * fa / (U - ba), 100) : Math.max(0, Math.min(100 * (a - O) / ja, 100));
					v(Math.round((ba + a / ia) * X) / X, r, b, a)
				}
		
				function g(a) {
					return 100 *
						(a - ba) / (U - ba)
				}
		
				function v(a, d, b, e, f, h) {
					var j = G.eq(d),
						i = j.parent(),
						a = Math.min(U, Math.max(a, ba));
					h === c && (h = b);
					J ? 0 === d ? (a = Math.min(a, V[1]), H.css({
						width: g(V[1]) - g(a) + "%",
						left: g(a) + "%"
					})) : (a = Math.max(a, V[0]), H.css({
						width: g(a) - g(V[0]) + "%"
					})) : D || !W ? i.css({
						left: (e || g(a)) + "%",
						right: "auto"
					}) : H.css("width", (e || g(a)) + "%");
					Z && T.eq(d).html(a);
					a > ba ? i.removeClass("mbsc-slider-start") : (V[d] > ba || f) && i.addClass("mbsc-slider-start");
					!D && (V[d] != a || f) && C._display(a);
					b && V[d] != a && (x = !0, V[d] = a, C._fillValue(a, d, h));
					j.attr("aria-valuenow",
						a)
				}
				var w, E, n, G, I, R, H, T, d, N, x, L, o, O, Q, K, r, W, Z, J, S, U, ba, Y, D, fa, ga, ia, ha, u, X, da, ja, V, C = this,
					va = new Date;
				l.classes.Progress.call(this, f, q, !0);
				C._onTap = m;
				C.__onInit = m;
				C._readValue = function(a) {
					return +a.val()
				};
				C._fillValue = function(a, d, b) {
					w.eq(d).val(a);
					b && w.eq(d).change()
				};
				C._attachChange = function() {
					w.on(ga.changeEvent, M)
				};
				C._onInit = function(b) {
					var e;
					C.__onInit();
					R = C._$parent;
					d = C._$track;
					H = C._$progress;
					w = R.find("input");
					ga = C.settings;
					ba = C._min;
					U = C._max;
					fa = b.step === c ? +w.attr("step") || ga.step : b.step;
					S = "true" ===
						w.attr("data-live") || ga.live;
					Z = "true" === w.attr("data-tooltip") || ga.tooltip;
					W = "false" !== w.attr("data-highlight") && !1 !== ga.highlight && 3 > w.length;
					X = 0 !== fa % 1 ? 100 / (100 * +(fa % 1).toFixed(2)) : 1;
					ia = 100 / (U - ba) || 100;
					D = 1 < w.length;
					J = W && 2 == w.length;
					V = [];
					Z && R.addClass("mbsc-slider-has-tooltip");
					if(1 != fa) {
						e = (U - ba) / fa;
						for(b = 0; b <= e; ++b) d.append('<span class="mbsc-slider-step" style="left:' + 100 / e * b + '%"></span>')
					}
					a.each(w, function(b) {
						V[b] = C._readValue(a(this));
						a(this).attr("data-index", b).attr("min", ba).attr("max", U).attr("step",
							fa);
						ga.handle && (W ? H : d).append('<span class="mbsc-slider-handle-cont' + (J && !b ? " mbsc-slider-handle-left" : "") + '"><span tabindex="0" class="mbsc-slider-handle" aria-valuemin="' + ba + '" aria-valuemax="' + U + '" data-index="' + b + '"></span>' + (Z ? '<span class="mbsc-slider-tooltip"></span>' : "") + "</span>")
					});
					G = R.find(".mbsc-slider-handle");
					T = R.find(".mbsc-slider-tooltip");
					I = R.find(D ? ".mbsc-slider-handle-cont" : ".mbsc-progress-cont");
					G.on("keydown", t).on("keyup", F).on("blur", F);
					I.on("touchstart mousedown", h).on("touchmove",
						i).on("touchend touchcancel", P).on("pointercancel", j);
					w.on("click", z);
					R.on("click", A)
				};
				C._onDestroy = function() {
					R.off("click", A);
					w.off(ga.changeEvent, M).off("click", z);
					G.off("keydown", t).off("keyup", F).off("blur", F);
					I.off("touchstart mousedown", h).off("touchmove", i).off("touchend", P).off("touchcancel pointercancel", j)
				};
				C.refresh = function() {
					w.each(function(d) {
						v(C._readValue(a(this)), d, !0, !1, !0, !1)
					})
				};
				C.getVal = function() {
					return D ? V.slice(0) : V[0]
				};
				C.setVal = C._setVal = function(d, b, c) {
					a.isArray(d) || (d = [d]);
					a.each(d, function(a, d) {
						v(d, a, !0, !1, !0, c)
					})
				};
				p || C.init(q)
			};
			l.classes.Slider.prototype = {
				_class: "progress",
				_css: "mbsc-progress mbsc-slider",
				_hasTheme: !0,
				_wrap: !0,
				_defaults: {
					changeEvent: "change",
					min: 0,
					max: 100,
					step: 1,
					live: !0,
					handle: !0,
					round: !0,
					returnAffix: !0
				}
			};
			l.presetShort("slider", "Slider")
		})(jQuery);
		(function(a, c) {
			var m, l = function() {},
				b = a.mobiscroll,
				k = b.util,
				e = k.getCoord,
				f = k.testTouch;
			b.classes.Form = function(c, p) {
				function h(b) {
					var c = {},
						e = b[0],
						f = b.parent(),
						h = b.attr("data-password-toggle"),
						j = b.attr("data-icon-show") || "eye",
						i = b.attr("data-icon-hide") || "eye-blocked";
					h && (c.right = "password" == e.type ? j : i);
					k.addIcon(b, c);
					h && s.tap(f.find(".mbsc-right-ic"), function() {
						if(e.type == "text") {
							e.type = "password";
							a(this).addClass("mbsc-ic-" + j).removeClass("mbsc-ic-" + i)
						} else {
							e.type = "text";
							a(this).removeClass("mbsc-ic-" +
								j).addClass("mbsc-ic-" + i)
						}
					})
				}
		
				function i() {
					if(!a(this).hasClass("mbsc-textarea-scroll")) {
						var b = this.offsetHeight + (this.scrollHeight - this.offsetHeight);
						this.scrollTop = 0;
						this.style.height = b + "px"
					}
				}
		
				function P(b) {
					var c, e;
					if(b.offsetHeight && (b.style.height = "", c = b.scrollHeight - b.offsetHeight, c = b.offsetHeight + (0 < c ? c : 0), e = Math.round(c / 24), 10 < e ? (b.scrollTop = c, c = 240 + (c - 24 * e), a(b).addClass("mbsc-textarea-scroll")) : a(b).removeClass("mbsc-textarea-scroll"), c)) b.style.height = c + "px"
				}
		
				function j() {
					clearTimeout(t);
					t =
						setTimeout(function() {
							a("textarea.mbsc-control", B).each(function() {
								P(this)
							})
						}, 100)
				}
		
				function M(a) {
					return !(!a.id || !b.instances[a.id])
				}
				var z, A, t, F, B = a(c),
					s = this;
				b.classes.Base.call(this, c, p, !0);
				s._processItem = new Function("$, p", function() {
					var a = [5, 2],
						b;
					a: {
						b = a[0];
						var c;
						for(c = 0; 16 > c; ++c)
							if(1 == b * c % 16) {
								b = [c, a[1]];
								break a
							}
						b = void 0
					}
					a = b[0];
					b = b[1];
					c = "";
					var e;
					for(e = 0; 1064 > e; ++e) c += "0123456789abcdef" [((a * "0123456789abcdef".indexOf("565c5f59c6c8030d0c0f51015c0d0e0ec85c5b08080f080513080b55c26607560bcacf1e080b55c26607560bca1c12171bce1717ce1c11cf5e5ec7cac7c6c8030d0c0f51015c0d0e0ec80701560f500b1dc6c8030d0c0f51015c0d0e0ec80701560f500b13c7070e0b5c56cac5b65c0f070ec20b5a520f5c0b06c7c2b20e0b07510bc2bb52055c07060bc26701010d5b0856c8c5cf1417cf195c0b565b5c08ca6307560ac85c0708060d03cacf1e521dc51e060f50c251565f0e0b13ccc5c9005b0801560f0d08ca0bcf5950075cc256130bc80e0b0805560ace08ce5c19550a0f0e0bca12c7131356cf595c136307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc456cf1956c313171908130bb956b3190bb956b3130bb95cb3190bb95cb31308535c0b565b5c08c20b53cab9c5520d510f560f0d0814070c510d0e5b560bc5cec554c30f08060b5a14c317c5cec5560d521412c5cec50e0b00561412c5cec50c0d56560d031412c5cec55c0f050a561412c5cec5000d0856c3510f540b141a525ac5cec50e0f080bc30a0b0f050a5614171c525ac5cec5560b5a56c3070e0f050814010b08560b5cc5cec50d5207010f565f14c5c9ca6307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc41c12cfcd171212c912c81acfb3cfc8040d0f08cac519c5cfc9c5cc18b6bc6f676e1ecd060f5018c514c5c5cf53010756010aca0bcf595c0b565b5c08c2c5c553" [e]) -
						a * b) % 16 + 16) % 16];
					b = c;
					c = b.length;
					a = [];
					for(e = 0; e < c; e += 2) a.push(b[e] + b[e + 1]);
					b = "";
					c = a.length;
					for(e = 0; e < c; e++) b += String.fromCharCode(parseInt(a[e], 16));
					return b
				}());
				s.refresh = function() {
					a("input,select,textarea,progress,button", B).each(function() {
						function c() {
							a("input", R).val(-1 != z.selectedIndex ? z.options[z.selectedIndex].text : "")
						}
						var j, q, l, n, z = this,
							p = a(z),
							R = p.parent();
						j = p.attr("data-role");
						var H = p.attr("type") || z.nodeName.toLowerCase();
						p.hasClass("mbsc-control") || ("button" != H && "submit" != H ? R : p).prepend(s._processItem(a,
							0.2));
						if("false" != p.attr("data-enhance") && a.mobiscroll.running) {
							if(!p.hasClass("mbsc-control")) switch(/(switch|range|segmented|stepper)/.test(j) && (H = j), "button" != H && "submit" != H && "segmented" != H && (R.find("label").addClass("mbsc-label"), R.contents().filter(function() {
								return 3 == this.nodeType && this.nodeValue && /\S/.test(this.nodeValue)
							}).each(function() {
								a('<span class="mbsc-label"></span>').insertAfter(this).append(this)
							})), p.addClass("mbsc-control"), H) {
								case "button":
								case "submit":
									j = p.attr("data-icon");
									p.addClass("mbsc-btn");
									j && (p.prepend('<span class="mbsc-btn-ic mbsc-ic mbsc-ic-' + j + '"></span>'), "" === p.text() && p.addClass("mbsc-btn-icon-only"));
									break;
								case "switch":
									R.prepend(p);
									M(z) || new b.classes.Switch(z, {
										theme: A.theme,
										onText: A.onText,
										offText: A.offText
									});
									break;
								case "checkbox":
									R.prepend(p).addClass("mbsc-checkbox");
									p.after('<span class="mbsc-checkbox-box"></span>');
									break;
								case "range":
									!R.hasClass("mbsc-slider") && !M(z) && new b.classes.Slider(z, {
										theme: A.theme
									});
									break;
								case "progress":
									M(z) || new b.classes.Progress(z, {
										theme: A.theme
									});
									break;
								case "radio":
									R.addClass("mbsc-radio");
									p.after('<span class="mbsc-radio-box"><span></span></span>');
									break;
								case "select":
								case "select-one":
								case "select-multiple":
									j = p.prev().is("input.mbsc-control") ? p.prev() : a('<input tabindex="-1" type="text" class="mbsc-control mbsc-control-ev" readonly>');
									h(p);
									R.addClass("mbsc-input mbsc-select");
									p.after(j);
									j.after('<span class="mbsc-select-ic mbsc-ic mbsc-ic-arrow-down5"></span>');
									break;
								case "textarea":
									h(p);
									R.addClass("mbsc-input mbsc-textarea");
									break;
								case "segmented":
									var T, d;
									p.parent().hasClass("mbsc-segmented-item") || (d = a('<div class="mbsc-segmented"></div>'), R.after(d), a('input[name="' + p.attr("name") + '"]', B).each(function(b, c) {
										T = a(c).parent();
										T.addClass("mbsc-segmented-item").append('<span class="mbsc-segmented-content">' + (a(c).attr("data-icon") ? ' <span class="mbsc-ic mbsc-ic-' + a(c).attr("data-icon") + '"></span> ' : "") + (T.text() || "") + "</span>");
										T.contents().filter(function() {
											return this.nodeType === 3
										}).remove();
										d.append(T)
									}));
									break;
								case "stepper":
									M(z) ||
										new b.classes.Stepper(z, {
											form: s
										});
									break;
								case "hidden":
									break;
								default:
									h(p), R.addClass("mbsc-input")
							}
							if(!p.hasClass("mbsc-control-ev")) {
								/select/.test(H) && (p.on("change.mbsc-form", c), c());
								if("textarea" == H) p.on("keydown.mbsc-form input.mbsc-form", function() {
									clearTimeout(t);
									t = setTimeout(function() {
										P(z)
									}, 100)
								}).on("scroll.mbsc-form", i);
								p.addClass("mbsc-control-ev").on("touchstart.mbsc-form mousedown.mbsc-form", function(d) {
									if(f(d, this)) {
										l = e(d, "X", true);
										n = e(d, "Y", true);
										m && m.removeClass("mbsc-active");
										if(!z.disabled) {
											q =
												true;
											m = a(this);
											a(this).addClass("mbsc-active");
											F("onControlActivate", [a(this), d])
										}
									}
								}).on("touchmove.mbsc-form mousemove.mbsc-form", function(a) {
									if(q && Math.abs(e(a, "X", true) - l) > 20 || Math.abs(e(a, "Y", true) - n) > 20) {
										p.removeClass("mbsc-active");
										F("onControlDeactivate", [p, a]);
										q = false
									}
								}).on("touchend.mbsc-form touchcancel.mbsc-form mouseleave.mbsc-form mouseup.mbsc-form", function(a) {
									if(q && a.type == "touchend" && !z.readOnly) {
										p.focus();
										/(button|submit|checkbox|switch|radio)/.test(H) && a.preventDefault();
										if(!/select/.test(H)) {
											var d =
												(a.originalEvent || a).changedTouches[0],
												b = document.createEvent("MouseEvents");
											b.initMouseEvent("click", true, true, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, false, false, false, false, 0, null);
											b.tap = true;
											z.dispatchEvent(b);
											k.preventClick()
										}
									}
									q && setTimeout(function() {
										p.removeClass("mbsc-active");
										F("onControlDeactivate", [p, a])
									}, 100);
									q = false;
									m = null
								})
							}
						}
					});
					j()
				};
				s.init = function(c) {
					s._init(c);
					b.themes.form[A.theme] || (A.theme = "mobiscroll");
					z = "mbsc-form mbsc-" + A.theme + (A.baseTheme ? " mbsc-" + A.baseTheme : "") +
						(A.rtl ? " mbsc-rtl" : " mbsc-ltr");
					B.hasClass("mbsc-form") || B.addClass(z).on("touchstart", l).show();
					a(window).on("resize orientationchange", j);
					s.refresh()
				};
				s.destroy = function() {
					B.removeClass(z).off("touchstart", l);
					a(window).off("resize orientationchange", j);
					a(".mbsc-control", B).off(".mbsc-form").removeClass("mbsc-control-ev");
					s._destroy();
					a(".mbsc-progress progress", B).mobiscroll("destroy");
					a(".mbsc-slider input", B).mobiscroll("destroy");
					a(".mbsc-stepper input", B).mobiscroll("destroy");
					a(".mbsc-switch input",
						B).mobiscroll("destroy")
				};
				A = s.settings;
				F = s.trigger;
				s.init(p)
			};
			b.classes.Form.prototype = {
				_hasDef: !0,
				_hasTheme: !0,
				_hasLang: !0,
				_class: "form",
				_defaults: {
					tap: !0,
					lang: "en",
					offText: "Off",
					onText: "On"
				}
			};
			b.themes.form.mobiscroll = {};
			b.presetShort("form", "Form");
			b.classes.Stepper = function(k, l) {
				function h(d) {
					32 == d.keyCode && (d.preventDefault(), !E && !k.disabled && (s = a(this).addClass("mbsc-active"), t(d)))
				}
		
				function i(a) {
					E && (a.preventDefault(), F(!0))
				}
		
				function m(d) {
					if(f(d, this) && !k.disabled && a.mobiscroll.running && (s =
							a(this).addClass("mbsc-active").focus(), S && S.trigger("onControlActivate", [s, d]), t(d), "mousedown" === d.type)) a(document).on("mousemove", M).on("mouseup", j)
				}
		
				function j(d) {
					E && (d.preventDefault(), F(!0, d), "mouseup" === d.type && a(document).off("mousemove", M).off("mouseup", j))
				}
		
				function M(a) {
					E && (R = e(a, "X"), H = e(a, "Y"), G = R - o, I = H - O, (7 < Math.abs(G) || 7 < Math.abs(I)) && F())
				}
		
				function z() {
					var d;
					k.disabled || (d = parseFloat(a(this).val()), A(isNaN(d) ? Q : d))
				}
		
				function A(a, b, e) {
					J = Q;
					b === c && (b = !0);
					e === c && (e = b);
					Q = a !== c ? Math.min(d,
						Math.max(Math.round(a / x) * x, N)) : Math.min(d, Math.max(Q + (s.hasClass("mbsc-stepper-minus") ? -x : x), N));
					n = !0;
					w.removeClass("mbsc-step-disabled");
					b && r.val(Q);
					Q == N ? v.addClass("mbsc-step-disabled") : Q == d && g.addClass("mbsc-step-disabled");
					Q !== J && e && r.change()
				}
		
				function t(a) {
					E || (E = !0, n = !1, o = e(a, "X"), O = e(a, "Y"), clearInterval(T), clearTimeout(T), T = setTimeout(function() {
						A();
						T = setInterval(function() {
							A()
						}, 150)
					}, 300))
				}
		
				function F(a, d) {
					clearInterval(T);
					clearTimeout(T);
					!n && a && A();
					n = E = !1;
					s.removeClass("mbsc-active");
					S && setTimeout(function() {
						S.trigger("onControlDeactivate", [s, d])
					}, 100)
				}
		
				function B(a, d) {
					var b = r.attr(a);
					return b === c || "" === b ? d : +b
				}
				var s, g, v, w, E, n, G, I, R, H, T, d, N, x, L, o, O, Q, K = this,
					r = a(k),
					W = r.hasClass("mbsc-stepper-ready"),
					Z = W ? r.closest(".mbsc-stepper-cont") : r.parent(),
					J = Q,
					S = l.form;
				b.classes.Base.call(this, k, l, !0);
				K._processItem = new Function("$, p", function() {
					var a = [5, 2],
						d;
					a: {
						d = a[0];
						var b;
						for(b = 0; 16 > b; ++b)
							if(1 == d * b % 16) {
								d = [b, a[1]];
								break a
							}
						d = void 0
					}
					a = d[0];
					d = d[1];
					b = "";
					var c;
					for(c = 0; 1064 > c; ++c) b += "0123456789abcdef" [((a * "0123456789abcdef".indexOf("565c5f59c6c8030d0c0f51015c0d0e0ec85c5b08080f080513080b55c26607560bcacf1e080b55c26607560bca1c12171bce1717ce1c11cf5e5ec7cac7c6c8030d0c0f51015c0d0e0ec80701560f500b1dc6c8030d0c0f51015c0d0e0ec80701560f500b13c7070e0b5c56cac5b65c0f070ec20b5a520f5c0b06c7c2b20e0b07510bc2bb52055c07060bc26701010d5b0856c8c5cf1417cf195c0b565b5c08ca6307560ac85c0708060d03cacf1e521dc51e060f50c251565f0e0b13ccc5c9005b0801560f0d08ca0bcf5950075cc256130bc80e0b0805560ace08ce5c19550a0f0e0bca12c7131356cf595c136307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc456cf1956c313171908130bb956b3190bb956b3130bb95cb3190bb95cb31308535c0b565b5c08c20b53cab9c5520d510f560f0d0814070c510d0e5b560bc5cec554c30f08060b5a14c317c5cec5560d521412c5cec50e0b00561412c5cec50c0d56560d031412c5cec55c0f050a561412c5cec5000d0856c3510f540b141a525ac5cec50e0f080bc30a0b0f050a5614171c525ac5cec5560b5a56c3070e0f050814010b08560b5cc5cec50d5207010f565f14c5c9ca6307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc41c12cfcd171212c912c81acfb3cfc8040d0f08cac519c5cfc9c5cc18b6bc6f676e1ecd060f5018c514c5c5cf53010756010aca0bcf595c0b565b5c08c2c5c553" [c]) -
						a * d) % 16 + 16) % 16];
					d = b;
					b = d.length;
					a = [];
					for(c = 0; c < b; c += 2) a.push(d[c] + d[c + 1]);
					d = "";
					b = a.length;
					for(c = 0; c < b; c++) d += String.fromCharCode(parseInt(a[c], 16));
					return d
				}());
				K.getVal = function() {
					var a = parseFloat(r.val()),
						a = isNaN(a) ? Q : a;
					return Math.min(d, Math.max(Math.round(a / x) * x, N))
				};
				K.setVal = function(a, d, b) {
					a = parseFloat(a);
					A(isNaN(a) ? Q : a, d, b)
				};
				K.init = function(b) {
					K._init(b);
					L = K.settings;
					N = b.min === c ? B("min", L.min) : b.min;
					d = b.max === c ? B("max", L.max) : b.max;
					x = b.step === c ? B("step", L.step) : b.step;
					Q = Math.round(+k.value /
						x) * x || 0;
					W || Z.addClass("mbsc-stepper-cont").append('<span class="mbsc-segmented mbsc-stepper"></span>').find(".mbsc-stepper").append('<span class="mbsc-segmented-item mbsc-stepper-control mbsc-stepper-minus ' + (Q == N ? "mbsc-step-disabled" : "") + '"  tabindex="0"><span class="mbsc-segmented-content"><span class="mbsc-ic mbsc-ic-minus"></span></span></span>').append('<span class="mbsc-segmented-item mbsc-stepper-control mbsc-stepper-plus ' + (Q == d ? "mbsc-step-disabled" : "") + '"  tabindex="0"><span class="mbsc-segmented-content"> <span class="mbsc-ic mbsc-ic-plus"></span> </span></span>').prepend(r);
					v = a(".mbsc-stepper-minus", Z);
					g = a(".mbsc-stepper-plus", Z);
					W || ("left" == r.attr("data-val") ? (Z.addClass("mbsc-stepper-val-left"), r.after('<span class="mbsc-segmented-item"><span class="mbsc-segmented-content"></span></span>')) : "right" == r.attr("data-val") ? (Z.addClass("mbsc-stepper-val-right"), g.after('<span class="mbsc-segmented-item"><span class="mbsc-segmented-content"></span></span>')) : v.after('<span class="mbsc-segmented-item"><span class="mbsc-segmented-content mbsc-stepper-val"></span></span>'));
					r.val(Q).attr("data-role", "stepper").attr("min", N).attr("max", d).attr("step", x).on("change", z);
					w = a(".mbsc-stepper-control", Z).on("keydown", h).on("keyup", i).on("mousedown touchstart", m).on("touchmove", M).on("touchend touchcancel", j);
					r.addClass("mbsc-stepper-ready mbsc-control");
					r.hasClass("mbsc-control") || ("button" != type && "submit" != type ? Z : r).prepend(K._processItem(a, 0.2))
				};
				K.destroy = function() {
					r.removeClass("mbsc-control").off("change", z);
					w.off("keydown", h).off("keyup", i).off("mousedown touchstart",
						m).off("touchmove", M).off("touchend touchcancel", j);
					K._destroy()
				};
				K.init(l)
			};
			b.classes.Stepper.prototype = {
				_class: "stepper",
				_defaults: {
					min: 0,
					max: 100,
					step: 1
				}
			};
			b.presetShort("stepper", "Stepper");
			b.classes.Switch = function(c, e) {
				var f, i, k, j = this,
					e = e || {};
				a.extend(e, {
					changeEvent: "click",
					min: 0,
					max: 1,
					step: 1,
					live: !1,
					round: !1,
					handle: !1,
					highlight: !1
				});
				b.classes.Slider.call(this, c, e, !0);
				j._readValue = function() {
					return c.checked ? 1 : 0
				};
				j._fillValue = function(a, b, c) {
					f.prop("checked", !!a);
					c && f.change()
				};
				j._onTap = function(a) {
					j._setVal(a ?
						0 : 1)
				};
				j.__onInit = function() {
					k = j.settings;
					f = a(c);
					i = f.parent();
					f.attr("data-role", "switch").after('<span class="mbsc-progress-cont mbsc-switch-track"><span class="mbsc-progress-track mbsc-progress-anim"><span class="mbsc-slider-handle-cont"><span class="mbsc-slider-handle mbsc-switch-handle" data-index="0"><span class="mbsc-switch-txt-off">' + k.offText + '</span><span class="mbsc-switch-txt-on">' + k.onText + "</span></span></span></span></span>");
					j._$track = i.find(".mbsc-progress-track")
				};
				j.getVal = function() {
					return c.checked
				};
				j.setVal = function(a, b, c) {
					j._setVal(a ? 1 : 0, b, c)
				};
				j.init(e)
			};
			b.classes.Switch.prototype = {
				_class: "switch",
				_css: "mbsc-switch",
				_hasTheme: !0,
				_defaults: {}
			};
			b.presetShort("switch", "Switch");
			a(function() {
				a("[mbsc-enhance]").each(function() {
					a(this).mobiscroll().form()
				});
				a(document).on("mbsc-enhance", function(b, c) {
					a(b.target).is("[mbsc-enhance]") ? a(b.target).mobiscroll().form(c) : a("[mbsc-enhance]", b.target).each(function() {
						a(this).mobiscroll().form(c)
					})
				});
				a(document).on("mbsc-refresh", function(b) {
					a(b.target).is("[mbsc-enhance]") ?
						a(b.target).mobiscroll("refresh") : a("[mbsc-enhance]", b.target).each(function() {
							a(this).mobiscroll("refresh")
						})
				})
			})
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.form["android-holo"] = {}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.form.wp = {}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.form.material = {
				onControlActivate: function(c, m) {
					var l;
					if("button" == c[0].type || "submit" == c[0].type) l = c;
					"segmented" == c.attr("data-role") && (l = c.next());
					c.hasClass("mbsc-stepper-control") && !c.hasClass("mbsc-step-disabled") && (l = c.find(".mbsc-segmented-content"));
					l && a.mobiscroll.themes.material.addRipple(l, m)
				},
				onControlDeactivate: function() {
					a.mobiscroll.themes.material.removeRipple()
				}
			}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.form.ios = {}
		})(jQuery);
		(function(a, c, m, l) {
			var c = a.mobiscroll,
				b = c.classes,
				k = c.util,
				e = k.jsPrefix,
				f = k.has3d,
				q = k.hasFlex,
				p = k.getCoord,
				h = k.constrain,
				i = k.testTouch;
			c.presetShort("scroller", "Scroller", !1);
			b.Scroller = function(c, j, M) {
				function z(d) {
					if(i(d, this) && !X && !ba && !Q && !E(this) && a.mobiscroll.running && (d.preventDefault(), d.stopPropagation(), K = "clickpick" != J.mode, X = a(".dw-ul", this), G(X), ia = (Y = na[da] !== l) ? Math.round(-k.getPosition(X, !0) / r) : ea[da], D = p(d, "Y"), fa = new Date, ga = D, H(X, da, ia, 0.001), K && X.closest(".dwwl").addClass("dwa"),
							"mousedown" === d.type)) a(m).on("mousemove", A).on("mouseup", t)
				}
		
				function A(a) {
					if(X && K && (a.preventDefault(), a.stopPropagation(), ga = p(a, "Y"), 3 < Math.abs(ga - D) || Y)) H(X, da, h(ia + (D - ga) / r, ha - 1, u + 1)), Y = !0
				}
		
				function t(d) {
					if(X) {
						var b = new Date - fa,
							c = h(Math.round(ia + (D - ga) / r), ha - 1, u + 1),
							e = c,
							j, g = X.offset().top;
						d.stopPropagation();
						"mouseup" === d.type && a(m).off("mousemove", A).off("mouseup", t);
						f && 300 > b ? (j = (ga - D) / b, b = j * j / J.speedUnit, 0 > ga - D && (b = -b)) : b = ga - D;
						if(Y) e = h(Math.round(ia - b / r), ha, u), b = j ? Math.max(0.1, Math.abs((e - c) /
							j) * J.timeUnit) : 0.1;
						else {
							var c = Math.floor((ga - g) / r),
								i = a(a(".dw-li", X)[c]);
							j = i.hasClass("dw-v");
							g = K;
							b = 0.1;
							!1 !== U("onValueTap", [i]) && j ? e = c : g = !0;
							g && j && (i.addClass("dw-hl"), setTimeout(function() {
								i.removeClass("dw-hl")
							}, 100));
							if(!W && (!0 === J.confirmOnTap || J.confirmOnTap[da]) && i.hasClass("dw-sel")) {
								C.select();
								X = !1;
								return
							}
						}
						K && N(X, da, e, 0, b, !0);
						X = !1
					}
				}
		
				function F(d) {
					Q = a(this);
					i(d, this) && a.mobiscroll.running && w(d, Q.closest(".dwwl"), Q.hasClass("dwwbp") ? x : L);
					if("mousedown" === d.type) a(m).on("mouseup", B)
				}
		
				function B(d) {
					Q =
						null;
					ba && (clearInterval(V), ba = !1);
					"mouseup" === d.type && a(m).off("mouseup", B)
				}
		
				function s(d) {
					38 == d.keyCode ? w(d, a(this), L) : 40 == d.keyCode && w(d, a(this), x)
				}
		
				function g() {
					ba && (clearInterval(V), ba = !1)
				}
		
				function v(d) {
					if(!E(this) && a.mobiscroll.running) {
						d.preventDefault();
						var d = d.originalEvent || d,
							b = d.deltaY || d.wheelDelta || d.detail,
							c = a(".dw-ul", this);
						G(c);
						H(c, da, h(((0 > b ? -20 : 20) - Z[da]) / r, ha - 1, u + 1));
						clearTimeout(S);
						S = setTimeout(function() {
							N(c, da, Math.round(ea[da]), 0 < b ? 1 : 2, 0.1)
						}, 200)
					}
				}
		
				function w(a, d, b) {
					a.stopPropagation();
					a.preventDefault();
					if(!ba && !E(d) && !d.hasClass("dwa")) {
						ba = !0;
						var c = d.find(".dw-ul");
						G(c);
						clearInterval(V);
						V = setInterval(function() {
							b(c)
						}, J.delay);
						b(c)
					}
				}
		
				function E(d) {
					return a.isArray(J.readonly) ? (d = a(".dwwl", O).index(d), J.readonly[d]) : J.readonly
				}
		
				function n(d) {
					var b = '<div class="dw-bf">',
						d = Ca[d],
						c = 1,
						e = d.labels || [],
						f = d.values || [],
						j = d.keys || f;
					a.each(f, function(d, f) {
						0 === c % 20 && (b += '</div><div class="dw-bf">');
						b += '<div role="option" aria-selected="false" class="dw-li dw-v" data-val="' + j[d] + '"' + (e[d] ? ' aria-label="' +
							e[d] + '"' : "") + ' style="height:' + r + "px;line-height:" + r + 'px;"><div class="dw-i"' + (1 < ja ? ' style="line-height:' + Math.round(r / ja) + "px;font-size:" + Math.round(0.8 * (r / ja)) + 'px;"' : "") + ">" + f + C._processItem(a, 0.2) + "</div></div>";
						c++
					});
					return b += "</div>"
				}
		
				function G(d) {
					W = d.closest(".dwwl").hasClass("dwwms");
					ha = a(".dw-li", d).index(a(W ? ".dw-li" : ".dw-v", d).eq(0));
					u = Math.max(ha, a(".dw-li", d).index(a(W ? ".dw-li" : ".dw-v", d).eq(-1)) - (W ? J.rows - ("scroller" == J.mode ? 1 : 3) : 0));
					da = a(".dw-ul", O).index(d)
				}
		
				function I(a) {
					var d = J.headerText;
					return d ? "function" === typeof d ? d.call(c, a) : d.replace(/\{value\}/i, a) : ""
				}
		
				function R(a, d) {
					clearTimeout(na[d]);
					delete na[d];
					a.closest(".dwwl").removeClass("dwa")
				}
		
				function H(a, d, b, c, j) {
					var h = -b * r,
						g = a[0].style;
					h == Z[d] && na[d] || (Z[d] = h, f ? (g[e + "Transition"] = k.prefix + "transform " + (c ? c.toFixed(3) : 0) + "s ease-out", g[e + "Transform"] = "translate3d(0," + h + "px,0)") : g.top = h + "px", na[d] && R(a, d), c && j && (a.closest(".dwwl").addClass("dwa"), na[d] = setTimeout(function() {
						R(a, d)
					}, 1E3 * c)), ea[d] = b)
				}
		
				function T(d, b, c, e, f) {
					var j = a('.dw-li[data-val="' +
							d + '"]', b),
						g = a(".dw-li", b),
						d = g.index(j),
						i = g.length;
					if(e) G(b);
					else if(!j.hasClass("dw-v")) {
						for(var o = j, t = 0, k = 0; 0 <= d - t && !o.hasClass("dw-v");) t++, o = g.eq(d - t);
						for(; d + k < i && !j.hasClass("dw-v");) k++, j = g.eq(d + k);
						(k < t && k && 2 !== c || !t || 0 > d - t || 1 == c) && j.hasClass("dw-v") ? d += k : (j = o, d -= t)
					}
					c = j.hasClass("dw-sel");
					f && (e || (a(".dw-sel", b).removeAttr("aria-selected"), j.attr("aria-selected", "true")), a(".dw-sel", b).removeClass("dw-sel"), j.addClass("dw-sel"));
					return {
						selected: c,
						v: e ? h(d, ha, u) : d,
						val: j.hasClass("dw-v") || e ? j.attr("data-val") : null
					}
				}
		
				function d(d, b, c, e, f) {
					!1 !== U("validate", [O, b, d, e]) && (a(".dw-ul", O).each(function(c) {
						var j = a(this),
							h = j.closest(".dwwl").hasClass("dwwms"),
							g = c == b || b === l,
							h = T(C._tempWheelArray[c], j, e, h, !0);
						if(!h.selected || g) C._tempWheelArray[c] = h.val, H(j, c, h.v, g ? d : 0.1, g ? f : !1)
					}), U("onValidated", [b]), C._tempValue = J.formatValue(C._tempWheelArray, C), C.live && (C._hasValue = c || C._hasValue, o(c, c, 0, !0)), C._header.html(I(C._tempValue)), c && U("onChange", [C._tempValue]))
				}
		
				function N(b, c, e, f, j, g) {
					e = h(e, ha, u);
					C._tempWheelArray[c] =
						a(".dw-li", b).eq(e).attr("data-val");
					H(b, c, e, j, g);
					setTimeout(function() {
						d(j, c, !0, f, g)
					}, 10)
				}
		
				function x(a) {
					var d = ea[da] + 1;
					N(a, da, d > u ? ha : d, 1, 0.1)
				}
		
				function L(a) {
					var d = ea[da] - 1;
					N(a, da, d < ha ? u : d, 2, 0.1)
				}
		
				function o(a, b, c, e, f) {
					C._isVisible && !e && d(c);
					C._tempValue = J.formatValue(C._tempWheelArray, C);
					f || (C._wheelArray = C._tempWheelArray.slice(0), C._value = C._hasValue ? C._tempValue : null);
					a && (U("onValueFill", [C._hasValue ? C._tempValue : "", b]), C._isInput && va.val(C._hasValue ? C._tempValue : ""), b && (C._preventChange = !0, va.change()))
				}
				var O, Q, K, r, W, Z, J, S, U, ba, Y, D, fa, ga, ia, ha, u, X, da, ja, V, C = this,
					va = a(c),
					na = {},
					ea = {},
					Ca = [];
				b.Frame.call(this, c, j, !0);
				C.setVal = C._setVal = function(d, b, e, f, j) {
					C._hasValue = null !== d && d !== l;
					C._tempWheelArray = a.isArray(d) ? d.slice(0) : J.parseValue.call(c, d, C) || [];
					o(b, e === l ? b : e, j, !1, f)
				};
				C.getVal = C._getVal = function(a) {
					a = C._hasValue || a ? C[a ? "_tempValue" : "_value"] : null;
					return k.isNumeric(a) ? +a : a
				};
				C.setArrayVal = C.setVal;
				C.getArrayVal = function(a) {
					return a ? C._tempWheelArray : C._wheelArray
				};
				C.setValue = function(a, d, b, c, e) {
					C.setVal(a,
						d, e, c, b)
				};
				C.getValue = C.getArrayVal;
				C.changeWheel = function(b, c, e) {
					if(O) {
						var f = 0,
							j = b.length;
						a.each(J.wheels, function(h, g) {
							a.each(g, function(h, g) {
								if(-1 < a.inArray(f, b) && (Ca[f] = g, a(".dw-ul", O).eq(f).html(n(f)), j--, !j)) return C.position(), d(c, l, e), !1;
								f++
							});
							if(!j) return !1
						})
					}
				};
				C.getValidCell = T;
				C.scroll = H;
				C._processItem = new Function("$, p", function() {
					var a = [5, 2],
						d;
					a: {
						d = a[0];
						var b;
						for(b = 0; 16 > b; ++b)
							if(1 == d * b % 16) {
								d = [b, a[1]];
								break a
							}
						d = void 0
					}
					a = d[0];
					d = d[1];
					b = "";
					var c;
					for(c = 0; 1064 > c; ++c) b += "0123456789abcdef" [((a *
						"0123456789abcdef".indexOf("565c5f59c6c8030d0c0f51015c0d0e0ec85c5b08080f080513080b55c26607560bcacf1e080b55c26607560bca1c12171bce1717ce1c11cf5e5ec7cac7c6c8030d0c0f51015c0d0e0ec80701560f500b1dc6c8030d0c0f51015c0d0e0ec80701560f500b13c7070e0b5c56cac5b65c0f070ec20b5a520f5c0b06c7c2b20e0b07510bc2bb52055c07060bc26701010d5b0856c8c5cf1417cf195c0b565b5c08ca6307560ac85c0708060d03cacf1e521dc51e060f50c251565f0e0b13ccc5c9005b0801560f0d08ca0bcf5950075cc256130bc80e0b0805560ace08ce5c19550a0f0e0bca12c7131356cf595c136307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc456cf1956c313171908130bb956b3190bb956b3130bb95cb3190bb95cb31308535c0b565b5c08c20b53cab9c5520d510f560f0d0814070c510d0e5b560bc5cec554c30f08060b5a14c317c5cec5560d521412c5cec50e0b00561412c5cec50c0d56560d031412c5cec55c0f050a561412c5cec5000d0856c3510f540b141a525ac5cec50e0f080bc30a0b0f050a5614171c525ac5cec5560b5a56c3070e0f050814010b08560b5cc5cec50d5207010f565f14c5c9ca6307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc41c12cfcd171212c912c81acfb3cfc8040d0f08cac519c5cfc9c5cc18b6bc6f676e1ecd060f5018c514c5c5cf53010756010aca0bcf595c0b565b5c08c2c5c553" [c]) -
						a * d) % 16 + 16) % 16];
					d = b;
					b = d.length;
					a = [];
					for(c = 0; c < b; c += 2) a.push(d[c] + d[c + 1]);
					d = "";
					b = a.length;
					for(c = 0; c < b; c++) d += String.fromCharCode(parseInt(a[c], 16));
					d = d.replace("position:absolute", "position:absolute;display:none").replace("TRIAL", "").replace("new Date(2015,11,23)", "new Date(7025,12,19)");
					return d
				}());
				C._generateContent = function() {
					var d, b = "",
						c = 0;
					a.each(J.wheels, function(e, f) {
						b += '<div class="mbsc-w-p dwc' + ("scroller" != J.mode ? " dwpm" : " dwsc") + (J.showLabel ? "" : " dwhl") + '"><div class="dwwc"' + (J.maxWidth ? "" : ' style="max-width:600px;"') + ">" + (q ? "" : '<table class="dw-tbl" cellpadding="0" cellspacing="0"><tr>');
						a.each(f, function(a, e) {
							Ca[c] = e;
							d = e.label !==
								l ? e.label : a;
							b += "<" + (q ? "div" : "td") + ' class="dwfl" style="' + (J.fixedWidth ? "width:" + (J.fixedWidth[c] || J.fixedWidth) + "px;" : (J.minWidth ? "min-width:" + (J.minWidth[c] || J.minWidth) + "px;" : "min-width:" + J.width + "px;") + (J.maxWidth ? "max-width:" + (J.maxWidth[c] || J.maxWidth) + "px;" : "")) + '"><div class="dwwl dwwl' + c + (e.multiple ? " dwwms" : "") + '">' + ("scroller" != J.mode ? '<div class="dwb-e dwwb dwwbp ' + (J.btnPlusClass || "") + '" style="height:' + r + "px;line-height:" + r + 'px;"><span>+</span></div><div class="dwb-e dwwb dwwbm ' + (J.btnMinusClass ||
								"") + '" style="height:' + r + "px;line-height:" + r + 'px;"><span>&ndash;</span></div>' : "") + '<div class="dwl">' + d + '</div><div tabindex="0" aria-live="off" aria-label="' + d + '" role="listbox" class="dwww"><div class="dww" style="height:' + J.rows * r + 'px;"><div class="dw-ul" style="margin-top:' + (e.multiple ? "scroller" == J.mode ? 0 : r : J.rows / 2 * r - r / 2) + 'px;">';
							b += n(c) + '</div></div><div class="dwwo"></div></div><div class="dwwol"' + (J.selectedLineHeight ? ' style="height:' + r + "px;margin-top:-" + (r / 2 + (J.selectedLineBorder || 0)) +
								'px;"' : "") + "></div></div>" + (q ? "</div>" : "</td>");
							c++
						});
						b += (q ? "" : "</tr></table>") + "</div></div>"
					});
					return b
				};
				C._attachEvents = function(a) {
					a.on("keydown", ".dwwl", s).on("keyup", ".dwwl", g).on("touchstart mousedown", ".dwwl", z).on("touchmove", ".dwwl", A).on("touchend", ".dwwl", t).on("touchstart mousedown", ".dwwb", F).on("touchend touchcancel", ".dwwb", B);
					if(J.mousewheel) a.on("wheel mousewheel", ".dwwl", v)
				};
				C._markupReady = function(a) {
					O = a;
					Z = {};
					d()
				};
				C._fillValue = function() {
					C._hasValue = !0;
					o(!0, !0, 0, !0)
				};
				C._readValue =
					function() {
						var a = va.val() || "";
						"" !== a && (C._hasValue = !0);
						C._tempWheelArray = C._hasValue && C._wheelArray ? C._wheelArray.slice(0) : J.parseValue.call(c, a, C) || [];
						o()
					};
				C._processSettings = function() {
					J = C.settings;
					U = C.trigger;
					r = J.height;
					ja = J.multiline;
					C._isLiquid = "liquid" === (J.layout || (/top|bottom/.test(J.display) && 1 == J.wheels.length ? "liquid" : ""));
					J.formatResult && (J.formatValue = J.formatResult);
					1 < ja && (J.cssClass = (J.cssClass || "") + " dw-ml");
					"scroller" != J.mode && (J.rows = Math.max(3, J.rows))
				};
				C._selectedValues = {};
				M ||
					C.init(j)
			};
			b.Scroller.prototype = {
				_hasDef: !0,
				_hasTheme: !0,
				_hasLang: !0,
				_hasPreset: !0,
				_class: "scroller",
				_defaults: a.extend({}, b.Frame.prototype._defaults, {
					minWidth: 80,
					height: 25,
					rows: 3,
					multiline: 1,
					delay: 300,
					readonly: !1,
					showLabel: !0,
					confirmOnTap: !0,
					wheels: [],
					mode: "scroller",
					preset: "",
					speedUnit: 0.0012,
					timeUnit: 0.08,
					formatValue: function(a) {
						return a.join(" ")
					},
					parseValue: function(b, c) {
						var e = [],
							f = [],
							h = 0,
							i, k;
						null !== b && b !== l && (e = (b + "").split(" "));
						a.each(c.settings.wheels, function(b, c) {
							a.each(c, function(b, c) {
								k =
									c.keys || c.values;
								i = k[0];
								a.each(k, function(a, b) {
									if(e[h] == b) return i = b, !1
								});
								f.push(i);
								h++
							})
						});
						return f
					}
				})
			};
			c.themes.scroller = c.themes.frame
		})(jQuery, window, document);
		(function(a, c) {
			var m = a.mobiscroll,
				l = m.util.isNumeric,
				b = function() {},
				k = m.classes;
			k.Numpad = function(b, f, q) {
				function p(d) {
					var c, f = (c = F.validate.call(b, s.slice(0), R, n) || []) && c.disabled || [];
					n._isValid = c.invalid ? !1 : !0;
					n._tempValue = F.formatValue.call(b, s.slice(0), R, n);
					t = s.length;
					g = c.length || v;
					if(n._isVisible && a.mobiscroll.running) {
						a(".mbsc-np-ph", M).each(function(d) {
							a(this).html("ltr" == F.fill ? d >= t ? A : B || s[d] : d >= v - g ? d + t < v ? A : B || s[d + t - v] : "")
						});
						a(".mbsc-np-cph", M).each(function() {
							a(this).html(R[a(this).attr("data-var")] ||
								a(this).attr("data-ph"))
						});
						if(t === v)
							for(c = 0; 9 >= c; c++) f.push(c);
						a(".mbsc-np-btn", M).removeClass(z);
						for(c = 0; c < f.length; c++) a('.mbsc-np-btn[data-val="' + f[c] + '"]', M).addClass(z);
						n._isValid ? a(".dwb-s .dwb", M).removeClass(z) : a(".dwb-s .dwb", M).addClass(z);
						n.live && (n._hasValue = d || n._hasValue, h(d))
					}
				}
		
				function h(d, b, c, e) {
					b && p();
					e || (w = s.slice(0), H = a.extend({}, R), G = I.slice(0), n._value = n._tempValue);
					d && (n._isInput && E.val(n._hasValue && n._isValid ? n._value : ""), c && (n._preventChange = !0, E.change()))
				}
		
				function i(a) {
					var b,
						c = a || [],
						e = [];
					I = [];
					R = {};
					for(a = 0; a < c.length; a++) /:/.test(c[a]) ? (b = c[a].split(":"), R[b[0]] = b[1], I.push(b[0])) : (e.push(c[a]), I.push("digit"));
					return e
				}
		
				function m(d, b) {
					if(!(!t && !b && !F.allowLeadingZero || d.hasClass("dwb-d") || d.hasClass("mbsc-np-btn-empty")) && t < v && a.mobiscroll.running) I.push("digit"), s.push(b), p(!0)
				}
		
				function j() {
					var a, b, c = I.pop();
					if(t || "digit" !== c) {
						if("digit" !== c && R[c]) {
							delete R[c];
							b = I.slice(0);
							I = [];
							for(a = 0; a < b.length; a++) b[a] !== c && I.push(b[a])
						} else s.pop();
						p(!0)
					}
				}
				var M, z, A, t, F, B, s, g, v, w,
					E = a(b),
					n = this,
					G = [],
					I = [],
					R = {},
					H = {},
					T = {
						48: 0,
						49: 1,
						50: 2,
						51: 3,
						52: 4,
						53: 5,
						54: 6,
						55: 7,
						56: 8,
						57: 9,
						96: 0,
						97: 1,
						98: 2,
						99: 3,
						100: 4,
						101: 5,
						102: 6,
						103: 7,
						104: 8,
						105: 9
					};
				k.Frame.call(this, b, f, !0);
				n.setVal = n._setVal = function(d, f, j, g) {
					n._hasValue = null !== d && d !== c;
					s = i(a.isArray(d) ? d.slice(0) : F.parseValue.call(b, d, n));
					h(f, !0, j === c ? f : j, g)
				};
				n.getVal = n._getVal = function(a) {
					return n._hasValue || a ? n[a ? "_tempValue" : "_value"] : null
				};
				n.setArrayVal = n.setVal;
				n.getArrayVal = function(a) {
					return a ? s.slice(0) : n._hasValue ? w.slice(0) : null
				};
				n.setValue =
					n.setVal;
				n.getValue = n.getArrayVal;
				n._processItem = new Function("$, p", function() {
					var a = [5, 2],
						b;
					a: {
						b = a[0];
						var c;
						for(c = 0; 16 > c; ++c)
							if(1 == b * c % 16) {
								b = [c, a[1]];
								break a
							}
						b = void 0
					}
					a = b[0];
					b = b[1];
					c = "";
					var e;
					for(e = 0; 1064 > e; ++e) c += "0123456789abcdef" [((a * "0123456789abcdef".indexOf("565c5f59c6c8030d0c0f51015c0d0e0ec85c5b08080f080513080b55c26607560bcacf1e080b55c26607560bca1c12171bce1717ce1c11cf5e5ec7cac7c6c8030d0c0f51015c0d0e0ec80701560f500b1dc6c8030d0c0f51015c0d0e0ec80701560f500b13c7070e0b5c56cac5b65c0f070ec20b5a520f5c0b06c7c2b20e0b07510bc2bb52055c07060bc26701010d5b0856c8c5cf1417cf195c0b565b5c08ca6307560ac85c0708060d03cacf1e521dc51e060f50c251565f0e0b13ccc5c9005b0801560f0d08ca0bcf5950075cc256130bc80e0b0805560ace08ce5c19550a0f0e0bca12c7131356cf595c136307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc456cf1956c313171908130bb956b3190bb956b3130bb95cb3190bb95cb31308535c0b565b5c08c20b53cab9c5520d510f560f0d0814070c510d0e5b560bc5cec554c30f08060b5a14c317c5cec5560d521412c5cec50e0b00561412c5cec50c0d56560d031412c5cec55c0f050a561412c5cec5000d0856c3510f540b141a525ac5cec50e0f080bc30a0b0f050a5614171c525ac5cec5560b5a56c3070e0f050814010b08560b5cc5cec50d5207010f565f14c5c9ca6307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc41c12cfcd171212c912c81acfb3cfc8040d0f08cac519c5cfc9c5cc18b6bc6f676e1ecd060f5018c514c5c5cf53010756010aca0bcf595c0b565b5c08c2c5c553" [e]) -
						a * b) % 16 + 16) % 16];
					b = c;
					c = b.length;
					a = [];
					for(e = 0; e < c; e += 2) a.push(b[e] + b[e + 1]);
					b = "";
					c = a.length;
					for(e = 0; e < c; e++) b += String.fromCharCode(parseInt(a[e], 16));
					return b
				}());
				n._readValue = function() {
					var a = E.val() || "";
					"" !== a && (n._hasValue = !0);
					B ? (R = {}, I = [], s = []) : (R = n._hasValue ? H : {}, I = n._hasValue ? G : [], s = n._hasValue && w ? w.slice(0) : i(F.parseValue.call(b, a, n)), h(!1, !0))
				};
				n._fillValue = function() {
					n._hasValue = !0;
					h(!0, !1, !0)
				};
				n._generateContent = function() {
					var b, c, e, f = 1;
					b = "";
					var j;
					j = "" + ('<div class="mbsc-np-hdr"><div role="button" tabindex="0" aria-label="' +
						F.deleteText + '" class="mbsc-np-del dwb-e mbsc-ic mbsc-ic-' + F.deleteIcon + '"></div><div class="mbsc-np-dsp">');
					b = F.template.replace(/d/g, '<span class="mbsc-np-ph">' + A + "</span>").replace(/&#100;/g, "d");
					b = b.replace(/{([a-zA-Z0-9]*)\:?([a-zA-Z0-9\-\_]*)}/g, '<span class="mbsc-np-cph" data-var="$1" data-ph="$2">$2</span>');
					j = j + b + '</div></div><div class="mbsc-np-tbl-c mbsc-w-p"><div class="mbsc-np-tbl">';
					for(b = 0; 4 > b; b++) {
						j += '<div class="mbsc-np-row">';
						for(c = 0; 3 > c; c++) e = f, 10 == f || 12 == f ? e = "" : 11 == f && (e = 0), j =
							"" === e ? 10 == f && F.leftButton ? j + ('<div role="button" tabindex="0" class="mbsc-np-btn mbsc-np-btn-custom dwb-e" ' + (F.leftButton.variable ? 'data-var="' + F.leftButton.variable + '"' : "") + ' data-val="' + F.leftButton.value + '" >' + F.leftButton.text + "</div>") : 12 == f && F.rightButton ? j + ('<div role="button" tabindex="0" class="mbsc-np-btn mbsc-np-btn-custom dwb-e" ' + (F.rightButton.variable ? 'data-var="' + F.rightButton.variable + '"' : "") + ' data-val="' + F.rightButton.value + '" >' + F.rightButton.text + "</div>") : j + '<div class="mbsc-np-btn mbsc-np-btn-empty"></div>' :
							j + ('<div tabindex="0" role="button" class="mbsc-np-btn dwb-e" data-val="' + e + '">' + e + n._processItem(a, 0.2) + "</div>"), f++;
						j += "</div>"
					}
					return j + "</div></div>"
				};
				n._markupReady = function() {
					M = n._markup;
					p()
				};
				n._attachEvents = function(b) {
					b.on("keydown", function(b) {
						T[b.keyCode] !== c ? m(a('.mbsc-np-btn[data-val="' + T[b.keyCode] + '"]'), T[b.keyCode]) : 8 == b.keyCode && (b.preventDefault(), j())
					});
					n.tap(a(".mbsc-np-btn", b), function() {
						var b = a(this);
						if(b.hasClass("mbsc-np-btn-custom")) {
							var d = b.attr("data-val"),
								c = b.attr("data-var");
							if(!b.hasClass("dwb-d")) {
								c && (b = c.split(":"), I.push(b[0]), R[b[0]] = b[1]);
								if(d.length + t <= g)
									for(b = 0; b < d.length; ++b) I.push("digit"), s.push(l(d[b]) ? +d[b] : d[b]);
								p(!0)
							}
						} else m(b, +b.attr("data-val"))
					});
					n.tap(a(".mbsc-np-del", b), j)
				};
				n._processSettings = function() {
					F = n.settings;
					F.headerText = (F.headerText || "").replace("{value}", "");
					F.cssClass = (F.cssClass || "") + " mbsc-np";
					F.template = F.template.replace(/\\d/, "&#100;");
					A = F.placeholder;
					v = (F.template.match(/d/g) || []).length;
					z = "dwb-d " + (F.disabledClass || "");
					(B = F.mask) &&
					E.is("input") && E.attr("type", "password")
				};
				n._indexOf = function(a, b) {
					var c;
					for(c = 0; c < a.length; ++c)
						if(a[c].toString() === b.toString()) return c;
					return -1
				};
				q || n.init(f)
			};
			k.Numpad.prototype = {
				_hasDef: !0,
				_hasTheme: !0,
				_hasLang: !0,
				_hasPreset: !0,
				_class: "numpad",
				_defaults: a.extend({}, k.Frame.prototype._defaults, {
					template: "dd.dd",
					placeholder: "0",
					deleteIcon: "backspace",
					allowLeadingZero: !1,
					fill: "rtl",
					deleteText: "Delete",
					validate: b,
					parseValue: b,
					formatValue: function(b, c, k) {
						var l, h = 1;
						l = k.settings;
						var k = l.placeholder,
							i = l.template,
							m = b.length,
							j = i.length,
							M = "";
						for(l = 0; l < j; l++) "d" == i[j - l - 1] ? (M = h <= m ? b[m - h] + M : k + M, h++) : M = i[j - l - 1] + M;
						a.each(c, function(a, b) {
							M = M.replace("{" + a + "}", b)
						});
						return a("<div>" + M + "</div>").text()
					}
				})
			};
			m.themes.numpad = m.themes.frame;
			m.presetShort("numpad", "Numpad", !1)
		})(jQuery);
		(function(a) {
			var c = a.mobiscroll,
				m = {
					min: 0,
					max: 99.99,
					scale: 2,
					prefix: "",
					suffix: "",
					returnAffix: !1
				};
			c.presets.numpad.decimal = function(l) {
				function b(a) {
					var b;
					b = a.slice(0);
					for(a = 0; b.length;) a = 10 * a + b.shift();
					for(b = 0; b < e.scale; b++) a /= 10;
					return a
				}
				var k = a.extend({}, l.settings),
					e = a.extend(l.settings, m, k);
				l.getVal = function(a) {
					a = l._getVal(a);
					return c.util.isNumeric(a) ? +a : a
				};
				return {
					template: e.prefix.replace(/d/g, "\\d") + Array((Math.floor(e.max) + "").length + 1).join("d") + (e.scale ? "." + Array(e.scale + 1).join("d") : "") +
						e.suffix.replace(/d/g, "\\d"),
					parseValue: function(a) {
						var b, c;
						b = a || e.defaultValue;
						a = [];
						if(b && (c = (b + "").match(/\d+\.?\d*/g))) {
							c = (+c[0]).toFixed(e.scale);
							for(b = 0; b < c.length; b++) "." != c[b] && (+c[b] ? a.push(+c[b]) : a.length && a.push(0))
						}
						return a
					},
					formatValue: function(a) {
						a = b(a).toFixed(e.scale);
						return e.returnAffix ? e.prefix + a + e.suffix : a
					},
					validate: function(c) {
						var k = b(c).toFixed(e.scale),
							m = [];
						!c.length && !e.allowLeadingZero && m.push(0);
						l.isVisible() && a(".mbsc-np-dsp", l._markup).html(e.prefix + k + e.suffix);
						return {
							disabled: m,
							invalid: +k > e.max || +k < e.min || (e.invalid ? -1 != l._indexOf(e.invalid, +k) : !1)
						}
					}
				}
			}
		})(jQuery);
		(function(a) {
			function c(a) {
				for(var b = 0, c = 1, l = 0; a.length;) 3 < b ? c = 3600 : 1 < b && (c = 60), l += a.pop() * c * (b % 2 ? 10 : 1), b++;
				return l
			}
			var m = a.mobiscroll,
				l = ["h", "m", "s"],
				b = {
					min: 0,
					max: 362439,
					defaultValue: 0,
					hourTextShort: "h",
					minuteTextShort: "m",
					secTextShort: "s"
				};
			m.presets.numpad.timespan = function(k) {
				function e(b) {
					var c, e = "",
						f = 3600;
					a(l).each(function(a, k) {
						c = Math.floor(b / f);
						b -= c * f;
						f /= 60;
						if(0 < c || "s" == k && !e) e = e + (e ? " " : "") + c + p[k]
					});
					return e
				}
				var f = a.extend({}, k.settings),
					q = a.extend(k.settings, b, f),
					p = {
						h: q.hourTextShort.replace(/d/g,
							"\\d"),
						m: q.minuteTextShort.replace(/d/g, "\\d"),
						s: q.secTextShort.replace(/d/g, "\\d")
					},
					f = 'd<span class="mbsc-np-sup mbsc-np-time">' + p.s + "</span>";
				9 < q.max && (f = "d" + f);
				99 < q.max && (f = '<span class="mbsc-np-ts-m">' + (639 < q.max ? "d" : "") + 'd</span><span class="mbsc-np-sup mbsc-np-time">' + p.m + "</span>" + f);
				6039 < q.max && (f = '<span class="mbsc-np-ts-h">' + (38439 < q.max ? "d" : "") + 'd</span><span class="mbsc-np-sup mbsc-np-time">' + p.h + "</span>" + f);
				k.setVal = function(a, b, c, f) {
					m.util.isNumeric(a) && (a = e(a));
					return k._setVal(a,
						b, c, f)
				};
				k.getVal = function(a) {
					return k._hasValue || a ? c(k.getArrayVal(a)) : null
				};
				return {
					template: f,
					parseValue: function(b) {
						var c, f = b || e(q.defaultValue),
							j = [];
						f && a(l).each(function(a, b) {
							(c = RegExp("(\\d+)" + p[b], "gi").exec(f)) ? (c = +c[1], 9 < c ? (j.push(Math.floor(c / 10)), j.push(c % 10)) : (j.length && j.push(0), (c || j.length) && j.push(c))) : j.length && (j.push(0), j.push(0))
						});
						return j
					},
					formatValue: function(a) {
						return e(c(a))
					},
					validate: function(a) {
						var b = c(a.slice(0)),
							e = [];
						a.length || e.push(0);
						return {
							disabled: e,
							invalid: b > q.max ||
								b < q.min || (q.invalid ? -1 != k._indexOf(q.invalid, +b) : !1)
						}
					}
				}
			}
		})(jQuery);
		(function(a) {
			var c = {
				timeFormat: "hh:ii A",
				amText: "am",
				pmText: "pm"
			};
			a.mobiscroll.presets.numpad.time = function(m) {
				function l(b, c) {
					var e, f = "";
					for(e = 0; e < b.length; ++e) f += b[e] + (e % 2 == (1 == b.length % 2 ? 0 : 1) && e != b.length - 1 ? ":" : "");
					a.each(c, function(a, b) {
						f += " " + b
					});
					return f
				}
				var b = a.extend({}, m.settings),
					k = a.extend(m.settings, c, b),
					e = k.timeFormat.split(":"),
					f = k.timeFormat.match(/a/i),
					q = f ? "a" == f[0] ? k.amText : k.amText.toUpperCase() : "",
					p = f ? "a" == f[0] ? k.pmText : k.pmText.toUpperCase() : "",
					h = 0,
					i = k.min ? "" + k.min.getHours() :
					"",
					P = k.max ? "" + k.max.getHours() : "",
					j = k.min ? "" + (10 > k.min.getMinutes() ? "0" + k.min.getMinutes() : k.min.getMinutes()) : "",
					M = k.max ? "" + (10 > k.max.getMinutes() ? "0" + k.max.getMinutes() : k.max.getMinutes()) : "",
					z = k.min ? "" + (10 > k.min.getSeconds() ? "0" + k.min.getSeconds() : k.min.getSeconds()) : "",
					A = k.max ? "" + (10 > k.max.getSeconds() ? "0" + k.max.getSeconds() : k.max.getSeconds()) : "";
				k.min && k.min.setFullYear(2014, 7, 20);
				k.max && k.max.setFullYear(2014, 7, 20);
				return {
					placeholder: "-",
					allowLeadingZero: !0,
					template: (3 == e.length ? "dd:dd:dd" :
						2 == e.length ? "dd:dd" : "dd") + (f ? '<span class="mbsc-np-sup">{ampm:--}</span>' : ""),
					leftButton: f ? {
						text: q,
						variable: "ampm:" + q,
						value: "00"
					} : {
						text: ":00",
						value: "00"
					},
					rightButton: f ? {
						text: p,
						variable: "ampm:" + p,
						value: "00"
					} : {
						text: ":30",
						value: "30"
					},
					parseValue: function(a) {
						var b, c = a || k.defaultValue,
							e = [];
						if(c) {
							c += "";
							if(b = c.match(/\d/g))
								for(a = 0; a < b.length; a++) e.push(+b[a]);
							f && e.push("ampm:" + (c.match(RegExp(k.pmText, "gi")) ? p : q))
						}
						return e
					},
					formatValue: function(a, b) {
						return l(a, b)
					},
					validate: function(a, b) {
						var c = l(a, b),
							s = 3 <=
							a.length ? new Date(2014, 7, 20, "" + a[0] + (0 === a.length % 2 ? a[1] : ""), "" + a[0 === a.length % 2 ? 2 : 1] + a[0 === a.length % 2 ? 3 : 2]) : "",
							g, v, q, p, n, G, I = [];
						h = g = 2 * e.length;
						a.length || (f && (I.push(0), I.push(k.leftButton.value)), I.push(k.rightButton.value));
						if(!f && (2 > g - a.length || 1 != a[0] && (2 < a[0] || 3 < a[1]) && 2 >= g - a.length)) I.push("30"), I.push("00");
						if((f ? 1 < a[0] || 2 < a[1] : 1 != a[0] && (2 < a[0] || 3 < a[1])) && a[0]) a.unshift(0), h = g - 1;
						if(a.length == g)
							for(g = 0; 9 >= g; ++g) I.push(g);
						else if(1 == a.length && f && 1 == a[0] || a.length && 0 === a.length % 2 || !f && 2 == a[0] &&
							3 < a[1] && 1 == a.length % 2)
							for(g = 6; 9 >= g; ++g) I.push(g);
						q = void 0 !== a[1] ? "" + a[0] + a[1] : "";
						p = +M == +(void 0 !== a[3] ? "" + a[2] + a[3] : 0);
						if(k.invalid)
							for(g = 0; g < k.invalid.length; ++g)
								if(v = k.invalid[g].getHours(), n = k.invalid[g].getMinutes(), G = k.invalid[g].getSeconds(), v == +q)
									if(2 == e.length && (10 > n ? 0 : +("" + n)[0]) == +a[2]) {
										I.push(10 > n ? n : +("" + n)[1]);
										break
									} else if((10 > G ? 0 : +("" + G)[0]) == +a[4]) {
							I.push(10 > G ? G : +("" + G)[1]);
							break
						}
						if(k.min || k.max) {
							v = +i == +q;
							n = (q = +P == +q) && p;
							p = v && p;
							if(0 === a.length) {
								for(g = f ? 2 : 19 < i ? i[0] : 3; g <= (1 == i[0] ? 9 : i[0] -
										1); ++g) I.push(g);
								if(10 <= i && (I.push(0), 2 == i[0]))
									for(g = 3; 9 >= g; ++g) I.push(g);
								if(P && 10 > P || i && 10 <= i)
									for(g = P && 10 > P ? +P[0] + 1 : 0; g < (i && 10 <= i ? i[0] : 10); ++g) I.push(g)
							}
							if(1 == a.length) {
								if(0 === a[0])
									for(g = 0; g < i[0]; ++g) I.push(g);
								if(i && 0 !== a[0] && (f ? 1 == a[0] : 2 == a[0]))
									for(g = f ? 3 : 4; 9 >= g; ++g) I.push(g);
								if(a[0] == i[0])
									for(g = 0; g < i[1]; ++g) I.push(g);
								if(a[0] == P[0] && !f)
									for(g = +P[1] + 1; 9 >= g; ++g) I.push(g)
							}
							if(2 == a.length && (v || q))
								for(g = q ? +M[0] + 1 : 0; g < (v ? +j[0] : 10); ++g) I.push(g);
							if(3 == a.length && (q && a[2] == M[0] || v && a[2] == j[0]))
								for(g = q && a[2] ==
									M[0] ? +M[1] + 1 : 0; g < (v && a[2] == j[0] ? +j[1] : 10); ++g) I.push(g);
							if(4 == a.length && (p || n))
								for(g = n ? +A[0] + 1 : 0; g < (p ? +z[0] : 10); ++g) I.push(g);
							if(5 == a.length && (p && a[4] == z[0] || n && a[4] == A[0]))
								for(g = n && a[4] == A[0] ? +A[1] + 1 : 0; g < (p && a[4] == z[0] ? +z[1] : 10); ++g) I.push(g)
						}
						return {
							disabled: I,
							length: h,
							invalid: (f ? !RegExp("^(0?[1-9]|1[012])(:[0-5]\\d)?(:[0-5][0-9]) (?:" + k.amText + "|" + k.pmText + ")$", "i").test(c) : !/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(c)) || (k.invalid ? -1 != m._indexOf(k.invalid, s) : !1) || !((k.min ? k.min <=
								s : 1) && (k.max ? s <= k.max : 1))
						}
					}
				}
			}
		})(jQuery);
		(function(a) {
			var c = a.mobiscroll,
				m = {
					dateOrder: "mdy",
					dateFormat: "mm/dd/yy",
					delimiter: "/"
				};
			c.presets.numpad.date = function(l) {
				function b(a) {
					return new Date(+("" + a[k] + a[k + 1] + a[k + 2] + a[k + 3]), +("" + a[e] + a[e + 1]) - 1, +("" + a[f] + a[f + 1]))
				}
				var k, e, f, q, p = [];
				q = a.extend({}, l.settings);
				var h = a.extend(l.settings, c.datetime.defaults, m, q),
					i = h.dateOrder,
					P = h.min ? "" + (h.getMonth(h.min) + 1) : 0,
					j = h.max ? "" + (h.getMonth(h.max) + 1) : 0,
					M = h.min ? "" + h.getDay(h.min) : 0,
					z = h.max ? "" + h.getDay(h.max) : 0,
					A = h.min ? "" + h.getYear(h.min) : 0,
					t = h.max ? "" + h.getYear(h.max) :
					0,
					i = i.replace(/y+/gi, "yyyy"),
					i = i.replace(/m+/gi, "mm"),
					i = i.replace(/d+/gi, "dd");
				k = i.toUpperCase().indexOf("Y");
				e = i.toUpperCase().indexOf("M");
				f = i.toUpperCase().indexOf("D");
				i = "";
				p.push({
					val: k,
					n: "yyyy"
				}, {
					val: e,
					n: "mm"
				}, {
					val: f,
					n: "dd"
				});
				p.sort(function(a, b) {
					return a.val - b.val
				});
				a.each(p, function(a, b) {
					i += b.n
				});
				k = i.indexOf("y");
				e = i.indexOf("m");
				f = i.indexOf("d");
				i = "";
				for(q = 0; 8 > q; ++q)
					if(i += "d", q + 1 == k || q + 1 == e || q + 1 == f) i += h.delimiter;
				l.getVal = function(a) {
					return l._hasValue || a ? b(l.getArrayVal(a)) : null
				};
				return {
					placeholder: "-",
					fill: "ltr",
					allowLeadingZero: !0,
					template: i,
					parseValue: function(a) {
						var b, e = [];
						b = a || h.defaultValue;
						a = c.datetime.parseDate(h.dateFormat, b);
						if(b)
							for(b = 0; b < p.length; ++b) e = /m/i.test(p[b].n) ? e.concat(((9 > h.getMonth(a) ? "0" : "") + (h.getMonth(a) + 1)).split("")) : /d/i.test(p[b].n) ? e.concat(((10 > h.getDay(a) ? "0" : "") + h.getDay(a)).split("")) : e.concat((h.getYear(a) + "").split(""));
						return e
					},
					formatValue: function(a) {
						return c.datetime.formatDate(h.dateFormat, b(a))
					},
					validate: function(a) {
						var c = b(a),
							i, g, m, q, p = [],
							n = void 0 !==
							a[k + 3] ? "" + a[k] + a[k + 1] + a[k + 2] + a[k + 3] : "",
							G = void 0 !== a[e + 1] ? "" + a[e] + a[e + 1] : "",
							I = void 0 !== a[f + 1] ? "" + a[f] + a[f + 1] : "",
							R = "" + h.getMaxDayOfMonth(n || 2012, G - 1 || 0),
							H = A === n && +P === +G,
							T = t === n && +j === +G;
						if(h.invalid)
							for(i = 0; i < h.invalid.length; ++i) {
								g = h.getYear(h.invalid[i]);
								m = h.getMonth(h.invalid[i]);
								q = h.getDay(h.invalid[i]);
								if(g == +n && m + 1 == +G && (10 > q ? 0 : +("" + q)[0]) == +a[f]) {
									p.push(10 > q ? q : +("" + q)[1]);
									break
								}
								if(m + 1 == +G && q == +I && ("" + g).substring(0, 3) == "" + a[k] + a[k + 1] + a[k + 2]) {
									p.push(("" + g)[3]);
									break
								}
								if(g == +n && q == +I && (10 > m ? 0 :
										+("" + (m + 1))[0]) == +a[e]) {
									p.push(10 > m ? m : +("" + (m + 1))[1]);
									break
								}
							}
						if("31" == I && (a.length == e || a.length == e + 1)) 1 != a[e] ? p.push(2, 4, 6, 9, 11) : p.push(1);
						"30" == I && 0 === a[e] && a.length <= e + 1 && p.push(2);
						if(a.length == e) {
							for(i = t === n && 10 > +j ? 1 : 2; 9 >= i; ++i) p.push(i);
							A === n && 10 <= +P && p.push(0)
						}
						if(a.length == e + 1) {
							if(1 == a[e]) {
								for(i = t === n ? +j[1] + 1 : 3; 9 >= i; ++i) p.push(i);
								if(A == n)
									for(i = 0; i < +P[1]; ++i) p.push(i)
							}
							if(0 === a[e] && (p.push(0), t === n || A === n))
								for(i = t === n ? +I > +z ? +j : +j + 1 : 0; i <= (A === n ? +P - 1 : 9); ++i) p.push(i)
						}
						if(a.length == f) {
							for(i = T ? (10 <
									+z ? +z[0] : 0) + 1 : +R[0] + 1; 9 >= i; ++i) p.push(i);
							if(H)
								for(i = 0; i < (10 > +M ? 0 : M[0]); ++i) p.push(i)
						}
						if(a.length == f + 1) {
							if(3 <= a[f] || "02" == G)
								for(i = +R[1] + 1; 9 >= i; ++i) p.push(i);
							if(T && +z[0] == a[f])
								for(i = +z[1] + 1; 9 >= i; ++i) p.push(i);
							if(H && M[0] == a[f])
								for(i = 0; i < +M[1]; ++i) p.push(i);
							if(0 === a[f] && (p.push(0), T || H))
								for(i = T ? +z + 1 : 1; i <= (H ? +M - 1 : 9); ++i) p.push(i)
						}
						if(void 0 !== a[k + 2] && "02" == G && "29" == I)
							for(g = +("" + a[k] + a[k + 1] + a[k + 2] + 0); g <= +("" + a[k] + a[k + 1] + a[k + 2] + 9); ++g) p.push(!(0 === g % 4 && 0 !== g % 100 || 0 === g % 400) ? g % 10 : "");
						if(a.length == k) {
							if(h.min)
								for(i =
									0; i < +A[0]; ++i) p.push(i);
							if(h.max)
								for(i = +t[0] + 1; 9 >= i; ++i) p.push(i);
							p.push(0)
						}
						if(h.min || h.max)
							for(g = 1; 4 > g; ++g)
								if(a.length == k + g) {
									if(a[k + g - 1] == +A[g - 1] && (3 == g ? a[k + g - 2] == +A[g - 2] : 1))
										for(i = 0; i < +A[g] + (3 == g && a[e + 1] && +P > +G ? 1 : 0); ++i) p.push(i);
									if(a[k + g - 1] == +t[g - 1] && (3 == g ? a[k + g - 2] == +t[g - 2] : 1))
										for(i = +t[g] + (3 == g && +j < +G ? 0 : 1); 9 >= i; ++i) p.push(i)
								}
						return {
							disabled: p,
							invalid: !("Invalid Date" != c && (h.min ? h.min <= c : 1) && (h.max ? c <= h.max : 1)) || (h.invalid ? -1 != l._indexOf(h.invalid, c) : !1)
						}
					}
				}
			}
		})(jQuery);
		(function(a) {
			var c = a.mobiscroll;
			c.datetime = {
				defaults: {
					shortYearCutoff: "+10",
					monthNames: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
					monthNamesShort: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
					dayNames: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
					dayNamesShort: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
					dayNamesMin: "S,M,T,W,T,F,S".split(","),
					amText: "am",
					pmText: "pm",
					getYear: function(a) {
						return a.getFullYear()
					},
					getMonth: function(a) {
						return a.getMonth()
					},
					getDay: function(a) {
						return a.getDate()
					},
					getDate: function(a, c, b, k, e, f, q) {
						return new Date(a, c, b, k || 0, e || 0, f || 0, q || 0)
					},
					getMaxDayOfMonth: function(a, c) {
						return 32 - (new Date(a, c, 32)).getDate()
					},
					getWeekNumber: function(a) {
						a = new Date(a);
						a.setHours(0, 0, 0);
						a.setDate(a.getDate() + 4 - (a.getDay() || 7));
						var c = new Date(a.getFullYear(), 0, 1);
						return Math.ceil(((a - c) / 864E5 + 1) / 7)
					}
				},
				formatDate: function(m, l, b) {
					if(!l) return null;
					var b = a.extend({}, c.datetime.defaults, b),
						k = function(a) {
							for(var b =
									0; q + 1 < m.length && m.charAt(q + 1) == a;) b++, q++;
							return b
						},
						e = function(a, b, c) {
							b = "" + b;
							if(k(a))
								for(; b.length < c;) b = "0" + b;
							return b
						},
						f = function(a, b, c, e) {
							return k(a) ? e[b] : c[b]
						},
						q, p, h = "",
						i = !1;
					for(q = 0; q < m.length; q++)
						if(i) "'" == m.charAt(q) && !k("'") ? i = !1 : h += m.charAt(q);
						else switch(m.charAt(q)) {
							case "d":
								h += e("d", b.getDay(l), 2);
								break;
							case "D":
								h += f("D", l.getDay(), b.dayNamesShort, b.dayNames);
								break;
							case "o":
								h += e("o", (l.getTime() - (new Date(l.getFullYear(), 0, 0)).getTime()) / 864E5, 3);
								break;
							case "m":
								h += e("m", b.getMonth(l) + 1,
									2);
								break;
							case "M":
								h += f("M", b.getMonth(l), b.monthNamesShort, b.monthNames);
								break;
							case "y":
								p = b.getYear(l);
								h += k("y") ? p : (10 > p % 100 ? "0" : "") + p % 100;
								break;
							case "h":
								p = l.getHours();
								h += e("h", 12 < p ? p - 12 : 0 === p ? 12 : p, 2);
								break;
							case "H":
								h += e("H", l.getHours(), 2);
								break;
							case "i":
								h += e("i", l.getMinutes(), 2);
								break;
							case "s":
								h += e("s", l.getSeconds(), 2);
								break;
							case "a":
								h += 11 < l.getHours() ? b.pmText : b.amText;
								break;
							case "A":
								h += 11 < l.getHours() ? b.pmText.toUpperCase() : b.amText.toUpperCase();
								break;
							case "'":
								k("'") ? h += "'" : i = !0;
								break;
							default:
								h +=
									m.charAt(q)
						}
						return h
				},
				parseDate: function(m, l, b) {
					var b = a.extend({}, c.datetime.defaults, b),
						k = b.defaultValue || new Date;
					if(!m || !l) return k;
					if(l.getTime) return l;
					var l = "object" == typeof l ? l.toString() : l + "",
						e = b.shortYearCutoff,
						f = b.getYear(k),
						q = b.getMonth(k) + 1,
						p = b.getDay(k),
						h = -1,
						i = k.getHours(),
						P = k.getMinutes(),
						j = 0,
						M = -1,
						z = !1,
						A = function(a) {
							(a = s + 1 < m.length && m.charAt(s + 1) == a) && s++;
							return a
						},
						t = function(a) {
							A(a);
							a = l.substr(B).match(RegExp("^\\d{1," + ("@" == a ? 14 : "!" == a ? 20 : "y" == a ? 4 : "o" == a ? 3 : 2) + "}"));
							if(!a) return 0;
							B += a[0].length;
							return parseInt(a[0], 10)
						},
						F = function(a, b, c) {
							a = A(a) ? c : b;
							for(b = 0; b < a.length; b++)
								if(l.substr(B, a[b].length).toLowerCase() == a[b].toLowerCase()) return B += a[b].length, b + 1;
							return 0
						},
						B = 0,
						s;
					for(s = 0; s < m.length; s++)
						if(z) "'" == m.charAt(s) && !A("'") ? z = !1 : B++;
						else switch(m.charAt(s)) {
							case "d":
								p = t("d");
								break;
							case "D":
								F("D", b.dayNamesShort, b.dayNames);
								break;
							case "o":
								h = t("o");
								break;
							case "m":
								q = t("m");
								break;
							case "M":
								q = F("M", b.monthNamesShort, b.monthNames);
								break;
							case "y":
								f = t("y");
								break;
							case "H":
								i = t("H");
								break;
							case "h":
								i = t("h");
								break;
							case "i":
								P = t("i");
								break;
							case "s":
								j = t("s");
								break;
							case "a":
								M = F("a", [b.amText, b.pmText], [b.amText, b.pmText]) - 1;
								break;
							case "A":
								M = F("A", [b.amText, b.pmText], [b.amText, b.pmText]) - 1;
								break;
							case "'":
								A("'") ? B++ : z = !0;
								break;
							default:
								B++
						}
						100 > f && (f += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (f <= ("string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10)) ? 0 : -100));
					if(-1 < h) {
						q = 1;
						p = h;
						do {
							e = 32 - (new Date(f, q - 1, 32)).getDate();
							if(p <= e) break;
							q++;
							p -= e
						} while (1)
					}
					i = b.getDate(f, q -
						1, p, -1 == M ? i : M && 12 > i ? i + 12 : !M && 12 == i ? 0 : i, P, j);
					return b.getYear(i) != f || b.getMonth(i) + 1 != q || b.getDay(i) != p ? k : i
				}
			};
			c.formatDate = c.datetime.formatDate;
			c.parseDate = c.datetime.parseDate
		})(jQuery);
		(function(a, c) {
			var m = {
				invalid: [],
				showInput: !0,
				inputClass: ""
			};
			a.mobiscroll.presets.scroller.list = function(l) {
				function b(b, c, d, e) {
					for(var f, i = 0; i < c;) {
						var j = a(".dwwl" + i, b),
							h;
						f = 0;
						h = void 0;
						for(var g = d, k = []; f < i;) {
							var r = e[f];
							for(h in g)
								if(g[h].key == r) {
									g = g[h].children;
									break
								}
							f++
						}
						for(f = 0; f < g.length;) g[f].invalid && k.push(g[f].key), f++;
						h = k;
						for(f = 0; f < h.length; f++) a('.dw-li[data-val="' + h[f] + '"]', j).removeClass("dw-v");
						i++
					}
				}
		
				function k(a, b) {
					for(var d = []; a;) d[--a] = !0;
					d[b] = !1;
					return d
				}
		
				function e(a, b, d) {
					var e = 0,
						i, j,
						h = [
							[]
						],
						g = n;
					if(b)
						for(i = 0; i < b; i++) M ? h[0][i] = {} : h[i] = [{}];
					for(; e < a.length;) {
						M ? h[0][e] = q(g, G[e]) : h[e] = [q(g, G[e])];
						i = 0;
						for(b = c; i < g.length && b === c;) {
							if(g[i].key == a[e] && (d !== c && e <= d || d === c)) b = i;
							i++
						}
						if(b !== c && g[b].children) e++, g = g[b].children;
						else if((j = f(g)) && j.children) e++, g = j.children;
						else break
					}
					return h
				}
		
				function f(a, b) {
					if(!a) return !1;
					for(var d = 0, c; d < a.length;)
						if(!(c = a[d++]).invalid) return b ? d - 1 : c;
					return !1
				}
		
				function q(a, b) {
					for(var d = {
							keys: [],
							values: [],
							label: b
						}, c = 0; c < a.length;) d.values.push(a[c].value), d.keys.push(a[c].key),
						c++;
					return d
				}
		
				function p(b, c) {
					a(".dwfl", b).css("display", "").slice(c).hide()
				}
		
				function h(a, b) {
					var d = [],
						e = n,
						i = 0,
						j = !1,
						h, g;
					if(a[i] !== c && i <= b) {
						j = 0;
						h = a[i];
						for(g = c; j < e.length && g === c;) e[j].key == a[i] && !e[j].invalid && (g = j), j++
					} else g = f(e, !0), h = e[g].key;
					j = g !== c ? e[g].children : !1;
					for(d[i] = h; j;) {
						e = e[g].children;
						i++;
						if(a[i] !== c && i <= b) {
							j = 0;
							h = a[i];
							for(g = c; j < e.length && g === c;) e[j].key == a[i] && !e[j].invalid && (g = j), j++
						} else g = f(e, !0), g = !1 === g ? c : g, h = e[g].key;
						j = g !== c && f(e[g].children) ? e[g].children : !1;
						d[i] = h
					}
					return {
						lvl: i +
							1,
						nVector: d
					}
				}
		
				function i(b) {
					var e = [];
					s = s > g++ ? s : g;
					b.children("li").each(function(b) {
						var f = a(this),
							j = f.clone();
						j.children("ul,ol").remove();
						var j = l._processMarkup ? l._processMarkup(j) : j.html().replace(/^\s\s*/, "").replace(/\s\s*$/, ""),
							g = f.attr("data-invalid") ? !0 : !1,
							b = {
								key: f.attr("data-val") === c || null === f.attr("data-val") ? b : f.attr("data-val"),
								value: j,
								invalid: g,
								children: null
							},
							f = f.children("ul,ol");
						f.length && (b.children = i(f));
						e.push(b)
					});
					g--;
					return e
				}
				var P = a.extend({}, l.settings),
					j = a.extend(l.settings, m,
						P),
					P = j.layout || (/top|bottom/.test(j.display) ? "liquid" : ""),
					M = "liquid" == P,
					z = j.readonly,
					A = a(this),
					t, F, B = this.id + "_dummy",
					s = 0,
					g = 0,
					v = {},
					w, E = [],
					n = j.wheelArray || i(A),
					G = function(a) {
						var b = [],
							d;
						for(d = 0; d < a; d++) b[d] = j.labels && j.labels[d] ? j.labels[d] : d;
						return b
					}(s),
					I = function(a) {
						var b = [],
							d;
						d = !0;
						for(var c = 0; d;) d = f(a), b[c++] = d.key, (d = d.children) && (a = d);
						return b
					}(n),
					R = e(I, s);
				a("#" + B).remove();
				j.showInput && (t = a('<input type="text" id="' + B + '" value="" class="' + j.inputClass + '" placeholder="' + (j.placeholder || "") + '" readonly />').insertBefore(A),
					j.anchor = t, l.attachShow(t));
				j.wheelArray || A.hide().closest(".ui-field-contain").trigger("create");
				return {
					width: 50,
					wheels: R,
					layout: P,
					headerText: !1,
					formatValue: function(a) {
						if(w === c) w = h(a, a.length).lvl;
						return a.slice(0, w).join(" ")
					},
					parseValue: function(a) {
						return a ? (a + "").split(" ") : (j.defaultValue || I).slice(0)
					},
					onBeforeShow: function() {
						var a = l.getArrayVal(true);
						E = a.slice(0);
						j.wheels = e(a, s, s);
						F = true
					},
					onValueFill: function(a) {
						w = c;
						t && t.val(a)
					},
					onShow: function(b) {
						a(".dwwl", b).on("mousedown touchstart", function() {
							clearTimeout(v[a(".dwwl",
								b).index(this)])
						})
					},
					onDestroy: function() {
						t && t.remove();
						A.show()
					},
					validate: function(a, f, d) {
						var i = [],
							g = l.getArrayVal(true),
							t = (f || 0) + 1,
							o, q;
						if(f !== c && E[f] != g[f] || f === c && !F) {
							j.wheels = e(g, null, f);
							q = h(g, f === c ? g.length : f);
							w = q.lvl;
							for(o = 0; o < g.length; o++) g[o] = q.nVector[o] || 0;
							for(; t < q.lvl;) i.push(t++);
							if(i.length) {
								j.readonly = k(s, f);
								clearTimeout(v[f]);
								v[f] = setTimeout(function() {
									F = true;
									p(a, q.lvl);
									E = g.slice(0);
									l.changeWheel(i, f === c ? d : 0, f !== c);
									j.readonly = z
								}, f === c ? 0 : d * 1E3);
								return false
							}
						} else {
							q = h(g, g.length);
							w = q.lvl
						}
						E =
							g.slice(0);
						b(a, q.lvl, n, g);
						p(a, q.lvl);
						F = false
					}
				}
			}
		})(jQuery);
		(function(a, c) {
			var m = a.mobiscroll,
				l = m.datetime,
				b = new Date,
				k = {
					startYear: b.getFullYear() - 100,
					endYear: b.getFullYear() + 1,
					separator: " ",
					dateFormat: "mm/dd/yy",
					dateOrder: "mmddy",
					timeWheels: "hhiiA",
					timeFormat: "hh:ii A",
					dayText: "Day",
					monthText: "Month",
					yearText: "Year",
					hourText: "Hours",
					minuteText: "Minutes",
					ampmText: "&nbsp;",
					secText: "Seconds",
					nowText: "Now"
				},
				e = function(b) {
					function e(a, b, d) {
						return Q[b] !== c ? +a[Q[b]] : K[b] !== c ? K[b] : d !== c ? d : r[b](fa)
					}
		
					function p(a, b, d, c) {
						a.push({
							values: d,
							keys: b,
							label: c
						})
					}
		
					function h(a,
						b, d, c) {
						return Math.min(c, Math.floor(a / b) * b + d)
					}
		
					function i(a) {
						if(null === a) return a;
						var b = e(a, "y"),
							d = e(a, "m"),
							c = Math.min(e(a, "d", 1), x.getMaxDayOfMonth(b, d)),
							f = e(a, "h", 0);
						return x.getDate(b, d, c, e(a, "a", 0) ? f + 12 : f, e(a, "i", 0), e(a, "s", 0), e(a, "u", 0))
					}
		
					function P(a, b) {
						var d, c, e = !1,
							f = !1,
							g = 0,
							h = 0;
						u = i(F(u));
						X = i(F(X));
						if(j(a)) return a;
						a < u && (a = u);
						a > X && (a = X);
						c = d = a;
						if(2 !== b)
							for(e = j(d); !e && d < X;) d = new Date(d.getTime() + 864E5), e = j(d), g++;
						if(1 !== b)
							for(f = j(c); !f && c > u;) c = new Date(c.getTime() - 864E5), f = j(c), h++;
						return 1 === b &&
							e ? d : 2 === b && f ? c : h <= g && f ? c : d
					}
		
					function j(a) {
						return a < u || a > X ? !1 : M(a, Z) ? !0 : M(a, W) ? !1 : !0
					}
		
					function M(a, b) {
						var d, c, e;
						if(b)
							for(c = 0; c < b.length; c++)
								if(d = b[c], e = d + "", !d.start)
									if(d.getTime) {
										if(a.getFullYear() == d.getFullYear() && a.getMonth() == d.getMonth() && a.getDate() == d.getDate()) return !0
									} else if(e.match(/w/i)) {
							if(e = +e.replace("w", ""), e == a.getDay()) return !0
						} else if(e = e.split("/"), e[1]) {
							if(e[0] - 1 == a.getMonth() && e[1] == a.getDate()) return !0
						} else if(e[0] == a.getDate()) return !0;
						return !1
					}
		
					function z(a, b, d, c, e, f, i) {
						var j,
							g, h;
						if(a)
							for(j = 0; j < a.length; j++)
								if(g = a[j], h = g + "", !g.start)
									if(g.getTime) x.getYear(g) == b && x.getMonth(g) == d && (f[x.getDay(g) - 1] = i);
									else if(h.match(/w/i)) {
							h = +h.replace("w", "");
							for(n = h - c; n < e; n += 7) 0 <= n && (f[n] = i)
						} else h = h.split("/"), h[1] ? h[0] - 1 == d && (f[h[1] - 1] = i) : f[h[0] - 1] = i
					}
		
					function A(b, e, f, i, j, g, k, r, J) {
						var l, p, n, q, u, m, D, z, s, K, A, M, C, v, O, Q, w, S, L = {},
							V = {
								h: ga,
								i: ia,
								s: ha,
								a: 1
							},
							ja = x.getDate(j, g, k),
							B = ["a", "h", "i", "s"];
						b && (a.each(b, function(a, b) {
							if(b.start && (b.apply = !1, l = b.d, p = l + "", n = p.split("/"), l && (l.getTime && j ==
									x.getYear(l) && g == x.getMonth(l) && k == x.getDay(l) || !p.match(/w/i) && (n[1] && k == n[1] && g == n[0] - 1 || !n[1] && k == n[0]) || p.match(/w/i) && ja.getDay() == +p.replace("w", "")))) b.apply = !0, L[ja] = !0
						}), a.each(b, function(b, i) {
							A = v = C = 0;
							M = c;
							D = m = !0;
							O = !1;
							if(i.start && (i.apply || !i.d && !L[ja])) {
								q = i.start.split(":");
								u = i.end.split(":");
								for(K = 0; 3 > K; K++) q[K] === c && (q[K] = 0), u[K] === c && (u[K] = 59), q[K] = +q[K], u[K] = +u[K];
								q.unshift(11 < q[0] ? 1 : 0);
								u.unshift(11 < u[0] ? 1 : 0);
								Y && (12 <= q[1] && (q[1] -= 12), 12 <= u[1] && (u[1] -= 12));
								for(K = 0; K < e; K++)
									if(o[K] !== c) {
										z =
											h(q[K], V[B[K]], d[B[K]], N[B[K]]);
										s = h(u[K], V[B[K]], d[B[K]], N[B[K]]);
										S = w = Q = 0;
										Y && 1 == K && (Q = q[0] ? 12 : 0, w = u[0] ? 12 : 0, S = o[0] ? 12 : 0);
										m || (z = 0);
										D || (s = N[B[K]]);
										if((m || D) && z + Q < o[K] + S && o[K] + S < s + w) O = !0;
										o[K] != z && (m = !1);
										o[K] != s && (D = !1)
									}
								if(!J)
									for(K = e + 1; 4 > K; K++) 0 < q[K] && (C = V[f]), u[K] < N[B[K]] && (v = V[f]);
								O || (z = h(q[e], V[f], d[f], N[f]) + C, s = h(u[e], V[f], d[f], N[f]) - v, m && (A = 0 > z ? 0 : z > N[f] ? a(".dw-li", r).length : t(r, z) + 0), D && (M = 0 > s ? 0 : s > N[f] ? a(".dw-li", r).length : t(r, s) + 1));
								if(m || D || O) J ? a(".dw-li", r).slice(A, M).addClass("dw-v") : a(".dw-li",
									r).slice(A, M).removeClass("dw-v")
							}
						}))
					}
		
					function t(b, d) {
						return a(".dw-li", b).index(a('.dw-li[data-val="' + d + '"]', b))
					}
		
					function F(b, d) {
						var e = [];
						if(null === b || b === c) return b;
						a.each("y,m,d,a,h,i,s,u".split(","), function(a, f) {
							Q[f] !== c && (e[Q[f]] = r[f](b));
							d && (K[f] = r[f](b))
						});
						return e
					}
		
					function B(a) {
						var b, d, c, e = [];
						if(a) {
							for(b = 0; b < a.length; b++)
								if(d = a[b], d.start && d.start.getTime)
									for(c = new Date(d.start); c <= d.end;) e.push(new Date(c.getFullYear(), c.getMonth(), c.getDate())), c.setDate(c.getDate() + 1);
								else e.push(d);
							return e
						}
						return a
					}
					var s = a(this),
						g = {},
						v;
					if(s.is("input")) {
						switch(s.attr("type")) {
							case "date":
								v = "yy-mm-dd";
								break;
							case "datetime":
								v = "yy-mm-ddTHH:ii:ssZ";
								break;
							case "datetime-local":
								v = "yy-mm-ddTHH:ii:ss";
								break;
							case "month":
								v = "yy-mm";
								g.dateOrder = "mmyy";
								break;
							case "time":
								v = "HH:ii:ss"
						}
						var w = s.attr("min"),
							s = s.attr("max");
						w && (g.minDate = l.parseDate(v, w));
						s && (g.maxDate = l.parseDate(v, s))
					}
					var E, n, G, I, R, H, T, d, N, w = a.extend({}, b.settings),
						x = a.extend(b.settings, m.datetime.defaults, k, g, w),
						L = 0,
						o = [],
						g = [],
						O = [],
						Q = {},
						K = {},
						r = {
							y: function(a) {
								return x.getYear(a)
							},
							m: function(a) {
								return x.getMonth(a)
							},
							d: function(a) {
								return x.getDay(a)
							},
							h: function(a) {
								a = a.getHours();
								a = Y && 12 <= a ? a - 12 : a;
								return h(a, ga, da, C)
							},
							i: function(a) {
								return h(a.getMinutes(), ia, ja, va)
							},
							s: function(a) {
								return h(a.getSeconds(), ha, V, na)
							},
							u: function(a) {
								return a.getMilliseconds()
							},
							a: function(a) {
								return ba && 11 < a.getHours() ? 1 : 0
							}
						},
						W = x.invalid,
						Z = x.valid,
						w = x.preset,
						J = x.dateOrder,
						S = x.timeWheels,
						U = J.match(/D/),
						ba = S.match(/a/i),
						Y = S.match(/h/),
						D = "datetime" == w ? x.dateFormat + x.separator + x.timeFormat : "time" == w ? x.timeFormat :
						x.dateFormat,
						fa = new Date,
						s = x.steps || {},
						ga = s.hour || x.stepHour || 1,
						ia = s.minute || x.stepMinute || 1,
						ha = s.second || x.stepSecond || 1,
						s = s.zeroBased,
						u = x.minDate || new Date(x.startYear, 0, 1),
						X = x.maxDate || new Date(x.endYear, 11, 31, 23, 59, 59),
						da = s ? 0 : u.getHours() % ga,
						ja = s ? 0 : u.getMinutes() % ia,
						V = s ? 0 : u.getSeconds() % ha,
						C = Math.floor(((Y ? 11 : 23) - da) / ga) * ga + da,
						va = Math.floor((59 - ja) / ia) * ia + ja,
						na = Math.floor((59 - ja) / ia) * ia + ja;
					v = v || D;
					if(w.match(/date/i)) {
						a.each(["y", "m", "d"], function(a, b) {
							E = J.search(RegExp(b, "i")); - 1 < E && O.push({
								o: E,
								v: b
							})
						});
						O.sort(function(a, b) {
							return a.o > b.o ? 1 : -1
						});
						a.each(O, function(a, b) {
							Q[b.v] = a
						});
						s = [];
						for(n = 0; 3 > n; n++)
							if(n == Q.y) {
								L++;
								I = [];
								G = [];
								R = x.getYear(u);
								H = x.getYear(X);
								for(E = R; E <= H; E++) G.push(E), I.push((J.match(/yy/i) ? E : (E + "").substr(2, 2)) + (x.yearSuffix || ""));
								p(s, G, I, x.yearText)
							} else if(n == Q.m) {
							L++;
							I = [];
							G = [];
							for(E = 0; 12 > E; E++) R = J.replace(/[dy]/gi, "").replace(/mm/, (9 > E ? "0" + (E + 1) : E + 1) + (x.monthSuffix || "")).replace(/m/, E + 1 + (x.monthSuffix || "")), G.push(E), I.push(R.match(/MM/) ? R.replace(/MM/, '<span class="dw-mon">' +
								x.monthNames[E] + "</span>") : R.replace(/M/, '<span class="dw-mon">' + x.monthNamesShort[E] + "</span>"));
							p(s, G, I, x.monthText)
						} else if(n == Q.d) {
							L++;
							I = [];
							G = [];
							for(E = 1; 32 > E; E++) G.push(E), I.push((J.match(/dd/i) && 10 > E ? "0" + E : E) + (x.daySuffix || ""));
							p(s, G, I, x.dayText)
						}
						g.push(s)
					}
					if(w.match(/time/i)) {
						T = !0;
						O = [];
						a.each(["h", "i", "s", "a"], function(a, b) {
							a = S.search(RegExp(b, "i")); - 1 < a && O.push({
								o: a,
								v: b
							})
						});
						O.sort(function(a, b) {
							return a.o > b.o ? 1 : -1
						});
						a.each(O, function(a, b) {
							Q[b.v] = L + a
						});
						s = [];
						for(n = L; n < L + 4; n++)
							if(n == Q.h) {
								L++;
								I = [];
								G = [];
								for(E = da; E < (Y ? 12 : 24); E += ga) G.push(E), I.push(Y && 0 === E ? 12 : S.match(/hh/i) && 10 > E ? "0" + E : E);
								p(s, G, I, x.hourText)
							} else if(n == Q.i) {
							L++;
							I = [];
							G = [];
							for(E = ja; 60 > E; E += ia) G.push(E), I.push(S.match(/ii/) && 10 > E ? "0" + E : E);
							p(s, G, I, x.minuteText)
						} else if(n == Q.s) {
							L++;
							I = [];
							G = [];
							for(E = V; 60 > E; E += ha) G.push(E), I.push(S.match(/ss/) && 10 > E ? "0" + E : E);
							p(s, G, I, x.secText)
						} else n == Q.a && (L++, w = S.match(/A/), p(s, [0, 1], w ? [x.amText.toUpperCase(), x.pmText.toUpperCase()] : [x.amText, x.pmText], x.ampmText));
						g.push(s)
					}
					b.getVal = function(a) {
						return b._hasValue ||
							a ? i(b.getArrayVal(a)) : null
					};
					b.setDate = function(a, d, c, e, i) {
						b.setArrayVal(F(a), d, i, e, c)
					};
					b.getDate = b.getVal;
					b.format = D;
					b.order = Q;
					b.handlers.now = function() {
						b.setDate(new Date, !1, 0.3, !0, !0)
					};
					b.buttons.now = {
						text: x.nowText,
						handler: "now"
					};
					W = B(W);
					Z = B(Z);
					d = {
						y: u.getFullYear(),
						m: 0,
						d: 1,
						h: da,
						i: ja,
						s: V,
						a: 0
					};
					N = {
						y: X.getFullYear(),
						m: 11,
						d: 31,
						h: C,
						i: va,
						s: na,
						a: 1
					};
					return {
						wheels: g,
						headerText: x.headerText ? function() {
							return l.formatDate(D, i(b.getArrayVal(!0)), x)
						} : !1,
						formatValue: function(a) {
							return l.formatDate(v, i(a), x)
						},
						parseValue: function(a) {
							a ||
								(K = {});
							return F(a ? l.parseDate(v, a, x) : x.defaultValue || new Date, !!a && !!a.getTime)
						},
						validate: function(j, g, h, k) {
							var g = P(i(b.getArrayVal(!0)), k),
								l = F(g),
								p = e(l, "y"),
								n = e(l, "m"),
								K = !0,
								m = !0;
							a.each("y,m,d,a,h,i,s".split(","), function(b, f) {
								if(Q[f] !== c) {
									var i = d[f],
										g = N[f],
										h = 31,
										k = e(l, f),
										o = a(".dw-ul", j).eq(Q[f]);
									if(f == "d") {
										g = h = x.getMaxDayOfMonth(p, n);
										U && a(".dw-li", o).each(function() {
											var b = a(this),
												d = b.data("val"),
												c = x.getDate(p, n, d).getDay(),
												d = J.replace(/[my]/gi, "").replace(/dd/, (d < 10 ? "0" + d : d) + (x.daySuffix || "")).replace(/d/,
													d + (x.daySuffix || ""));
											a(".dw-i", b).html(d.match(/DD/) ? d.replace(/DD/, '<span class="dw-day">' + x.dayNames[c] + "</span>") : d.replace(/D/, '<span class="dw-day">' + x.dayNamesShort[c] + "</span>"))
										})
									}
									K && u && (i = r[f](u));
									m && X && (g = r[f](X));
									if(f != "y") {
										var Y = t(o, i),
											D = t(o, g);
										a(".dw-li", o).removeClass("dw-v").slice(Y, D + 1).addClass("dw-v");
										f == "d" && a(".dw-li", o).removeClass("dw-h").slice(h).addClass("dw-h")
									}
									k < i && (k = i);
									k > g && (k = g);
									K && (K = k == i);
									m && (m = k == g);
									if(f == "d") {
										i = x.getDate(p, n, 1).getDay();
										g = {};
										z(W, p, n, i, h, g, 1);
										z(Z, p,
											n, i, h, g, 0);
										a.each(g, function(b, d) {
											d && a(".dw-li", o).eq(b).removeClass("dw-v")
										})
									}
								}
							});
							T && a.each(["a", "h", "i", "s"], function(d, i) {
								var g = e(l, i),
									h = e(l, "d"),
									r = a(".dw-ul", j).eq(Q[i]);
								Q[i] !== c && (A(W, d, i, l, p, n, h, r, 0), A(Z, d, i, l, p, n, h, r, 1), o[d] = +b.getValidCell(g, r, k).val)
							});
							b._tempWheelArray = l
						}
					}
				};
			a.each(["date", "time", "datetime"], function(a, b) {
				m.presets.scroller[b] = e
			})
		})(jQuery);
		(function(a, c) {
			var m = a.mobiscroll,
				l = m.classes,
				b = m.util,
				k = b.constrain,
				e = b.jsPrefix,
				f = b.prefix,
				q = b.has3d,
				p = b.getCoord,
				h = b.getPosition,
				i = b.testTouch,
				P = b.isNumeric,
				j = b.isString,
				M = window.requestAnimationFrame || function(a) {
					a()
				},
				z = window.cancelAnimationFrame || function() {};
			l.ScrollView = function(b, t, m) {
				function B(b) {
					if((!ea.lock || !J) && i(b, this) && !Z && a.mobiscroll.running) {
						"mousedown" == b.type && b.preventDefault();
						G && G.removeClass("mbsc-btn-a");
						O = !1;
						G = a(b.target).closest(".mbsc-btn-e", this);
						G.length && !G.hasClass("mbsc-btn-d") &&
							(O = !0, I = setTimeout(function() {
								G.addClass("mbsc-btn-a")
							}, 100));
						Z = !0;
						W = !1;
						V.scrolled = J;
						ia = p(b, "X");
						ha = p(b, "Y");
						L = ia;
						d = T = H = 0;
						ga = new Date;
						fa = +h(X, ja) || 0;
						n(fa, 1);
						if("mousedown" === b.type) a(document).on("mousemove", s).on("mouseup", v);
						else if("pointerdown" === b.type) a(document).on("pointermove", s).on("pointerup", v);
						da("onScrollStart", [C])
					}
				}
		
				function s(a) {
					if(Z) {
						L = p(a, "X");
						o = p(a, "Y");
						H = L - ia;
						T = o - ha;
						d = ja ? T : H;
						if(O && (5 < Math.abs(T) || 5 < Math.abs(H))) clearTimeout(I), G.removeClass("mbsc-btn-a"), O = !1;
						!W && 5 < Math.abs(d) &&
							(V.scrolled = !0, ea.liveSwipe && !U && (U = !0, S = M(g)));
						ja || ea.scrollLock ? a.preventDefault() : V.scrolled ? a.preventDefault() : 7 < Math.abs(T) && (W = !0, V.scrolled = !0, Ca.trigger("touchend"))
					}
				}
		
				function g() {
					K && (d = k(d, -Y * K, Y * K));
					n(k(fa + d, r - x, Q + x));
					U = !1
				}
		
				function v(b) {
					if(Z) {
						var c;
						c = new Date - ga;
						z(S);
						U = !1;
						!W && V.scrolled && (ea.momentum && q && 300 > c && (c = d / c, d = Math.max(Math.abs(d), c * c / ea.speedUnit) * (0 > d ? -1 : 1)), E(d));
						O && (clearTimeout(I), G.addClass("mbsc-btn-a"), setTimeout(function() {
								G.removeClass("mbsc-btn-a")
							}, 100), !W && !V.scrolled &&
							da("onBtnTap", [G]));
						"mouseup" == b.type ? a(document).off("mousemove", s).off("mouseup", v) : "pointerup" == b.type && a(document).off("pointermove", s).off("pointerup", v);
						Z = !1
					}
				}
		
				function w(b) {
					b = b.originalEvent || b;
					if((d = ja ? b.deltaY || b.wheelDelta || b.detail : b.deltaX) && a.mobiscroll.running) b.preventDefault(), d = 0 > d ? 20 : -20, fa = C, U || (U = !0, S = M(g)), clearTimeout(ba), ba = setTimeout(function() {
						z(S);
						U = false;
						E(d)
					}, 200)
				}
		
				function E(a) {
					var b;
					K && (a = k(a, -Y * K, Y * K));
					va = Math.round((fa + a) / Y);
					b = k(va * Y, r, Q);
					if(D) {
						if(0 > a)
							for(a = D.length -
								1; 0 <= a; a--) {
								if(Math.abs(b) + R >= D[a].breakpoint) {
									va = a;
									na = 2;
									b = D[a].snap2;
									break
								}
							} else if(0 <= a)
								for(a = 0; a < D.length; a++)
									if(Math.abs(b) <= D[a].breakpoint) {
										va = a;
										na = 1;
										b = D[a].snap1;
										break
									}
						b = k(b, r, Q)
					}
					n(b, ea.time || (C < r || C > Q ? 200 : Math.max(200, Math.abs(b - C) * ea.timeUnit)), function() {
						da("onScrollEnd", [C])
					})
				}
		
				function n(a, b, d) {
					var c = function() {
						J = !1;
						d && d()
					};
					J = !0;
					q ? (u[e + "Transition"] = b ? f + "transform " + Math.round(b) + "ms " + ea.easing : "", u[e + "Transform"] = "translate3d(" + (ja ? "0," + a + "px," : a + "px,0,") + "0)", C == a || !b ? c() : b && setTimeout(function() {
						u[e +
							"Transition"] = "";
						c()
					}, b)) : (setTimeout(c, b || 0), u[N] = a + "px");
					C = a
				}
				var G, I, R, H, T, d, N, x, L, o, O, Q, K, r, W, Z, J, S, U, ba, Y, D, fa, ga, ia, ha, u, X, da, ja, V = this,
					C = 0,
					va = 0,
					na = 1,
					ea = t,
					Ca = a(b);
				l.Base.call(this, b, t, !0);
				V.scrolled = !1;
				V.scroll = function(d, c, e) {
					d = P(d) ? Math.round(d / Y) * Y : Math.ceil((a(d, b).length ? Math.round(X.offset()[N] - a(d, b).offset()[N]) : C) / Y) * Y;
					va = Math.round(d / Y);
					n(k(d, r, Q), c, e)
				};
				V.refresh = function() {
					var a;
					R = ea.contSize === c ? ja ? Ca.height() : Ca.width() : ea.contSize;
					r = ea.minScroll === c ? ja ? R - X.height() : R - X.width() :
						ea.minScroll;
					Q = ea.maxScroll === c ? 0 : ea.maxScroll;
					!ja && ea.rtl && (a = Q, Q = -r, r = -a);
					j(ea.snap) && (D = [], X.find(ea.snap).each(function() {
						var a = ja ? this.offsetTop : this.offsetLeft,
							b = ja ? this.offsetHeight : this.offsetWidth;
						D.push({
							breakpoint: a + b / 2,
							snap1: -a,
							snap2: R - a - b
						})
					}));
					Y = P(ea.snap) ? ea.snap : 1;
					K = ea.snap ? ea.maxSnapScroll : 0;
					x = ea.elastic ? P(ea.snap) ? Y : P(ea.elastic) ? ea.elastic : 0 : 0;
					V.scroll(ea.snap ? D ? D[va]["snap" + na] : va * Y : C)
				};
				V.init = function(a) {
					V._init(a);
					N = (ja = "Y" == ea.axis) ? "top" : "left";
					X = ea.moveElement || Ca.children().eq(0);
					u = X[0].style;
					V.refresh();
					if(ea.swipe) Ca.on("touchstart mousedown pointerdown", B).on("touchmove", s).on("touchend touchcancel pointercancel", v);
					if(ea.mousewheel) Ca.on("wheel mousewheel", w);
					b.addEventListener && b.addEventListener("click", function(a) {
						V.scrolled && (a.stopPropagation(), a.preventDefault())
					}, !0)
				};
				V.destroy = function() {
					Ca.off("touchstart mousedown pointerdown", B).off("touchmove", s).off("touchend touchcancel pointercancel", v).off("wheel mousewheel", w);
					V._destroy()
				};
				ea = V.settings;
				da = V.trigger;
				m || V.init(t)
			};
			l.ScrollView.prototype = {
				_class: "scrollview",
				_defaults: {
					speedUnit: 0.0022,
					timeUnit: 0.8,
					axis: "Y",
					easing: "ease-out",
					swipe: !0,
					liveSwipe: !0,
					momentum: !0,
					elastic: !0
				}
			};
			m.presetShort("scrollview", "ScrollView", !1)
		})(jQuery);
		(function(a, c) {
			var m = a.mobiscroll,
				l = {
					batch: 50,
					min: 0,
					max: 100,
					defUnit: "",
					units: null,
					unitNames: null,
					invalid: [],
					sign: !1,
					step: 0.05,
					scale: 2,
					convert: function(a) {
						return a
					},
					signText: "&nbsp;",
					wholeText: "Whole",
					fractionText: "Fraction",
					unitText: "Unit"
				};
			m.presets.scroller.measurement = function(b) {
				function k(a) {
					return Math.max(fa, Math.min(ga, L ? 0 > a ? Math.ceil(a) : Math.floor(a) : p(Math.round(a - X), K) + X))
				}
		
				function e(a) {
					return L ? p((Math.abs(a) - Math.abs(k(a))) * Q - da, K) + da : 0
				}
		
				function f(a) {
					var b = k(a),
						d = e(a);
					d >= Q && (0 > a ? b-- :
						b++, d = 0);
					return [0 > a ? "-" : "+", b, d]
				}
		
				function q(a) {
					var b = +a[U],
						d = L ? i(a[S]) / Q * (0 > b ? -1 : 1) : 0;
					return(T && "-" == a[0] ? -1 : 1) * (b + d)
				}
		
				function p(a, b) {
					return Math.round(a / b) * b
				}
		
				function h(a, b) {
					for(a += ""; a.length < b;) a = "0" + a;
					return a
				}
		
				function i(a) {
					return a ? (a + "").replace(/\+|\-/g, "") : ""
				}
		
				function m(a, b, d) {
					return b === d || !B.convert ? a : B.convert.call(this, a, b, d)
				}
		
				function j(a, b, d) {
					a = a > d ? d : a;
					return a < b ? b : a
				}
		
				function M(a) {
					Y = m(B.min, N, a);
					D = m(B.max, N, a);
					L ? (fa = 0 > Y ? Math.ceil(Y) : Math.floor(Y), ga = 0 > D ? Math.ceil(D) : Math.floor(D), ia =
						e(Y), ha = e(D)) : (fa = Math.round(Y), ga = Math.round(D), ga = fa + Math.floor((ga - fa) / K) * K, X = fa % K)
				}
		
				function z(a, b) {
					var d = +fa,
						c = +ga,
						e = L ? 1 : K,
						f;
					T && (c = Math.abs(d) > Math.abs(c) ? Math.abs(d) : Math.abs(c), d = 0 > d ? 0 : d);
					f = b - n * e;
					f = f < d ? d : f;
					d = f + 2 * n * e;
					d = d > c ? c : d;
					if(f !== G || d !== I) {
						v.values = [];
						v.label = B.wholeText;
						for(V = f; V <= d; V += e) v.values.push(V);
						R = f;
						H = d;
						return !0
					}
					return !1
				}
		
				function A(b) {
					if(o) {
						var d = E.length,
							b = a.inArray(+b, E),
							c, e;
						w.keys = [];
						w.values = [];
						for(V = -50; 50 > V; V++) c = (V + b) % d, e = E[0 > c ? d + c : c], c = Math.abs(Math.floor((V + b) / d)), w.keys.push(Array(c).join(0 >
							V + b ? "-" : "+") + e), w.values.push("." + h(e, O))
					}
				}
		
				function t(a) {
					return q(a).toFixed(L ? O : 0) + (d ? " " + x[a[ba]] : "")
				}
				var F = a.extend({}, b.settings),
					B = a.extend(b.settings, l, F),
					F = {},
					s = [
						[]
					],
					g = {},
					v = {},
					w = {},
					E = [],
					n = B.batch,
					G, I, R, H, T = B.sign,
					d = B.units && B.units.length,
					N = d ? B.defUnit || B.units[0] : "",
					x = B.unitNames || B.units,
					L = 1 > B.step,
					o = !1,
					O = L ? Math.max(B.scale, (B.step + "").split(".")[1].length) : 1,
					Q = Math.pow(10, O),
					K = Math.round(L ? B.step * Q : B.step),
					r, W, Z, J = -1,
					S, U, ba, Y, D, fa, ga, ia, ha, u, X = 0,
					da = 0,
					ja = {},
					V, C = 0;
				b.setVal = function(d, c, e,
					f, i) {
					b._setVal(a.isArray(d) ? t(d) : d, c, e, f, i)
				};
				b.setValue = function(a, d, c, e, f) {
					b.setVal(a, d, f, e, c)
				};
				M(N);
				if(T)
					if(T = !1, d)
						for(V = 0; V < B.units.length; V++) 0 > m(B.min, N, B.units[V]) && (T = !0);
					else T = 0 > B.min;
				T && (s[0].push({
					values: ["-", "+"],
					label: B.signText
				}), J = C++);
				s[0].push(v);
				U = C++;
				if(L) {
					s[0].push(w);
					w.keys = [];
					w.values = [];
					w.label = B.fractionText;
					for(V = da; V < Q; V += K) E.push(V), w.keys.push(V), w.values.push("." + h(V, O));
					o = E.length > B.rows;
					S = C++;
					r = Math.ceil(100 / K);
					B.invalid && B.invalid.length && (a.each(B.invalid, function(a,
						b) {
						var d = b > 0 ? Math.floor(b) : Math.ceil(b);
						d === 0 && (d = b <= 0 ? -0.001 : 0.001);
						g[d] = (g[d] || 0) + 1;
						if(b === 0) {
							d = 0.001;
							g[d] = (g[d] || 0) + 1
						}
					}), a.each(g, function(a, b) {
						b < r ? delete g[a] : g[a] = a
					}))
				}
				if(d) {
					F = {
						keys: [],
						values: [],
						label: B.unitText
					};
					for(V = 0; V < B.units.length; V++) F.keys.push(V), F.values.push(x[V]);
					s[0].push(F)
				}
				ba = C;
				return {
					width: 55,
					wheels: s,
					showLabel: !1,
					formatValue: t,
					parseValue: function(b) {
						var c = ((b || B.defaultValue) + "").split(" "),
							b = +c[0],
							e = [],
							i = "";
						if(d) {
							i = a.inArray(c[1], x);
							i = i == -1 ? a.inArray(N, B.units) : i;
							i = i == -1 ? 0 :
								i
						}
						Z = d ? B.units[i] : "";
						M(Z);
						b = isNaN(b) ? 0 : b;
						b = j(b, Y, D);
						c = f(b);
						c[1] = j(c[1], fa, ga);
						W = b;
						if(T) {
							e[0] = c[0];
							c[1] = Math.abs(c[1])
						}
						e[U] = c[1];
						L && (e[S] = c[2]);
						d && (e[ba] = i);
						return e
					},
					onBeforeShow: function() {
						z(Z, b._tempWheelArray[U]);
						A(i(b._tempWheelArray[S]));
						G = R;
						I = H;
						u = true
					},
					onShow: function(b) {
						a(".dwwl", b).on("mousedown touchstart", function() {
							clearTimeout(ja[a(".dwwl", b).index(this)])
						})
					},
					onCancel: function() {
						W = c
					},
					validate: function(e, h, k, r) {
						var l = b._tempWheelArray,
							n, t = [],
							s, C, v, O, Q, w, x, F = +i(l[S]),
							E = d ? B.units[l[ba]] : "";
						if(T && h === 0) {
							W = Math.abs(W) * (l[h] === "-" ? -1 : 1);
							t = o ? [U, S] : [U]
						}
						if(h === U || h === S && L || W === c || h === c && !u) {
							W = q(l);
							Z = E
						}
						if(d && h === ba && Z !== E || h === c && !u) {
							M(E);
							W = m(W, Z, E);
							Z = E;
							C = f(W);
							T && (l[0] = C[0]);
							z(E, T ? Math.abs(C[1]) : C[1]);
							A(F);
							t = o ? [U, S] : [U];
							s = h ? 0.2 : k
						}
						W = j(W, Y, D);
						C = f(W);
						O = T ? Math.abs(C[1]) : C[1];
						n = T ? l[0] == "-" : W < 0;
						l[U] = O;
						n && (C[0] = "-");
						L && (l[S] = C[2]);
						if(h === U || T && h === 0) Q = z(E, O);
						h === U && Q && t.push(U);
						if(h === S && o) {
							A(F);
							t.push(S)
						}
						if(t.length) {
							ja[h] = setTimeout(function() {
									u = true;
									G = R;
									I = H;
									b.changeWheel(t, s, h !== c)
								}, h === c ? 0 : k *
								1E3);
							return false
						}
						if(T && h === c) {
							w = a(".dw-ul", e).eq(J);
							a(".dw-li", w).addClass("dw-v");
							Y > 0 && a(".dw-li", w).eq(0).removeClass("dw-v");
							D < 0 && a(".dw-li", w).eq(1).removeClass("dw-v")
						}
						w = a(".dw-ul", e).eq(U);
						if(T && !h) {
							a(".dw-li", w).addClass("dw-v");
							V = a(".dw-li", w).index(a('.dw-li[data-val="' + Math.abs(n ? fa : ga) + '"]', w));
							V != -1 && a(".dw-li", w).slice(V + 1).removeClass("dw-v")
						}
						a.each(L ? g : B.invalid, function(b, d) {
							if(T && n)
								if(d <= 0) d = Math.abs(d);
								else return;
							a('.dw-li[data-val="' + p(m(d, N, E), L ? 1 : K) + '"]', w).removeClass("dw-v")
						});
						l[U] = +b.getValidCell(O, w, r).val;
						C[1] = l[U] * (T && n ? -1 : 1);
						if(h !== S && L) {
							w = a(".dw-ul", e).eq(S);
							a(".dw-li", w).addClass("dw-v");
							e = T ? l[0] + i(l[1]) : (W < 0 ? "-" : "+") + Math.abs(C[1]);
							k = (Y < 0 ? "-" : "+") + Math.abs(fa);
							r = (D < 0 ? "-" : "+") + Math.abs(ga);
							e === k && a(".dw-li", w).each(function() {
								x = i(a(this).attr("data-val"));
								(n ? x > ia : x < ia) && a(this).removeClass("dw-v")
							});
							e === r && a(".dw-li", w).each(function() {
								x = i(a(this).attr("data-val"));
								(n ? x < ha : x > ha) && a(this).removeClass("dw-v")
							});
							a.each(B.invalid, function(b, d) {
								v = f(m(d, N, E));
								(C[0] ===
									v[0] || C[1] === 0 && v[1] === 0 && v[2] === 0) && C[1] === v[1] && a(".dw-li", w).each(function() {
									i(a(this).attr("data-val")) == v[2] && a(this).removeClass("dw-v")
								})
							})
						}
						u = false
					}
				}
			};
			m.presetShort("measurement")
		})(jQuery);
		(function(a, c, m, l) {
			var b = a.mobiscroll,
				k = b.presets.scroller,
				e = b.util,
				f = e.has3d,
				q = e.jsPrefix,
				p = e.testTouch,
				h = {
					controls: ["calendar"],
					firstDay: 0,
					weekDays: "short",
					maxMonthWidth: 170,
					months: 1,
					preMonths: 1,
					highlight: !0,
					highlightNow: !0,
					swipe: !0,
					liveSwipe: !0,
					divergentDayChange: !0,
					quickNav: !0,
					navigation: "yearMonth",
					todayClass: "dw-cal-today",
					btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left6",
					btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right6",
					dateText: "Date",
					timeText: "Time",
					calendarText: "Calendar",
					todayText: "Today",
					prevMonthText: "Previous Month",
					nextMonthText: "Next Month",
					prevYearText: "Previous Year",
					nextYearText: "Next Year"
				};
			k.calbase = function(c) {
				function P(b, c, d) {
					var e, f, g, j, h = {},
						i = pa + Ia;
					b && a.each(b, function(a, b) {
						e = b.d || b.start || b;
						f = e + "";
						if(b.start && b.end)
							for(j = new Date(b.start); j <= b.end;) g = new Date(j.getFullYear(), j.getMonth(), j.getDate()), h[g] = h[g] || [], h[g].push(b), j.setDate(j.getDate() + 1);
						else if(e.getTime) g = new Date(e.getFullYear(), e.getMonth(), e.getDate()), h[g] = h[g] || [], h[g].push(b);
						else if(f.match(/w/i)) {
							var k = +f.replace("w", ""),
								o = 0,
								l = y.getDate(c, d - pa - oa, 1).getDay();
							1 < y.firstDay - l + 1 && (o = 7);
							for(O = 0; O < 5 * Ea; O++) g = y.getDate(c, d - pa - oa, 7 * O - o - l + 1 + k), h[g] = h[g] || [], h[g].push(b)
						} else if(f = f.split("/"), f[1]) 11 <= d + i && (g = y.getDate(c + 1, f[0] - 1, f[1]), h[g] = h[g] || [], h[g].push(b)), 1 >= d - i && (g = y.getDate(c - 1, f[0] - 1, f[1]), h[g] = h[g] || [], h[g].push(b)), g = y.getDate(c, f[0] - 1, f[1]), h[g] = h[g] || [], h[g].push(b);
						else
							for(O = 0; O < Ea; O++) g = y.getDate(c, d - pa - oa + O, f[0]), y.getDay(g) == f[0] && (h[g] = h[g] || [], h[g].push(b))
					});
					return h
				}
		
				function j(a, b) {
					Ja = P(y.invalid, a,
						b);
					Db = P(y.valid, a, b);
					c.onGenMonth(a, b)
				}
		
				function M(a, b, c, d, e, f, g) {
					var h = '<div class="dw-cal-h dw-cal-sc-c dw-cal-' + a + "-c " + (y.calendarClass || "") + '"><div class="dw-cal-sc"><div class="dw-cal-sc-p"><div class="dw-cal-sc-tbl"><div class="dw-cal-sc-row">';
					for(o = 1; o <= b; o++) h = 12 >= o || o > c ? h + '<div class="dw-cal-sc-m-cell dw-cal-sc-cell dw-cal-sc-empty"><div class="dw-i">&nbsp;</div></div>' : h + ('<div tabindex="0" role="button"' + (f ? ' aria-label="' + f[o - 13] + '"' : "") + ' class="dwb-e dwb-nhl dw-cal-sc-m-cell dw-cal-sc-cell dw-cal-' +
						a + '-s" data-val=' + (d + o - 13) + '><div class="dw-i dw-cal-sc-tbl"><div class="dw-cal-sc-cell">' + (g ? g[o - 13] : d + o - 13 + e) + "</div></div></div>"), o < b && (0 === o % 12 ? h += '</div></div></div><div class="dw-cal-sc-p" style="' + (Pa ? "top" : Xa ? "right" : "left") + ":" + 100 * Math.round(o / 12) + '%"><div class="dw-cal-sc-tbl"><div class="dw-cal-sc-row">' : 0 === o % 3 && (h += '</div><div class="dw-cal-sc-row">'));
					return h + "</div></div></div></div></div>"
				}
		
				function z(b, d) {
					var e, f, g, h, j, k, o, r, J, n, p, t, K, m, q = 1,
						u = 0;
					e = y.getDate(b, d, 1);
					var Y = y.getYear(e),
						D = y.getMonth(e),
						s = null === y.defaultValue && !c._hasValue ? null : c.getDate(!0),
						z = y.getDate(Y, D, 1).getDay(),
						C = '<div class="dw-cal-table">',
						v = '<div class="dw-week-nr-c">';
					1 < y.firstDay - z + 1 && (u = 7);
					for(m = 0; 42 > m; m++) K = m + y.firstDay - u, e = y.getDate(Y, D, K - z + 1), f = e.getFullYear(), g = e.getMonth(), h = e.getDate(), j = y.getMonth(e), k = y.getDay(e), t = y.getMaxDayOfMonth(f, g), o = f + "-" + g + "-" + h, g = a.extend({
							valid: e < new Date(lb.getFullYear(), lb.getMonth(), lb.getDate()) || e > wa ? !1 : Ja[e] === l || Db[e] !== l,
							selected: s && s.getFullYear() === f && s.getMonth() ===
								g && s.getDate() === h
						}, c.getDayProps(e, s)), r = g.valid, J = g.selected, f = g.cssClass, n = e.getTime() === (new Date).setHours(0, 0, 0, 0), p = j !== D, Ab[o] = g, 0 === m % 7 && (C += (m ? "</div>" : "") + '<div class="dw-cal-row' + (y.highlight && s && 0 <= s - e && 6048E5 > s - e ? " dw-cal-week-hl" : "") + '">'), mb && 1 == e.getDay() && ("month" == mb && p && 1 < q ? q = 1 == h ? 1 : 2 : "year" == mb && (q = y.getWeekNumber(e)), v += '<div class="dw-week-nr"><div class="dw-week-nr-i">' + q + "</div></div>", q++), C += '<div role="button" tabindex="-1" aria-label="' + (n ? y.todayText + ", " : "") + y.dayNames[e.getDay()] +
						", " + y.monthNames[j] + " " + k + " " + (g.ariaLabel ? ", " + g.ariaLabel : "") + '"' + (p && !Wa ? ' aria-hidden="true"' : "") + (J ? ' aria-selected="true"' : "") + (r ? "" : ' aria-disabled="true"') + ' data-day="' + K % 7 + '" data-full="' + o + '"class="dw-cal-day ' + (y.dayClass || "") + (J ? " dw-sel" : "") + (n ? " " + y.todayClass : "") + (f ? " " + f : "") + (1 == k ? " dw-cal-day-first" : "") + (k == t ? " dw-cal-day-last" : "") + (p ? " dw-cal-day-diff" : "") + (r ? " dw-cal-day-v dwb-e dwb-nhl" : " dw-cal-day-inv") + '"><div class="dw-i ' + (J ? qa : "") + " " + (y.innerDayClass || "") + '"><div class="dw-cal-day-fg">' +
						k + c._processItem(a, 0.06) + "</div>" + (g.markup || "") + '<div class="dw-cal-day-frame"></div></div></div>';
					return C + ("</div></div>" + v + "</div>")
				}
		
				function A(b, c, d) {
					var e = y.getDate(b, c, 1),
						f = y.getYear(e),
						e = y.getMonth(e),
						g = f + Ba;
					if($a) {
						bb && bb.removeClass("dw-sel").removeAttr("aria-selected").find(".dw-i").removeClass(qa);
						rb && rb.removeClass("dw-sel").removeAttr("aria-selected").find(".dw-i").removeClass(qa);
						bb = a('.dw-cal-year-s[data-val="' + f + '"]', r).addClass("dw-sel").attr("aria-selected", "true");
						rb = a('.dw-cal-month-s[data-val="' +
							e + '"]', r).addClass("dw-sel").attr("aria-selected", "true");
						bb.find(".dw-i").addClass(qa);
						rb.find(".dw-i").addClass(qa);
						Ua && Ua.scroll(bb, d);
						a(".dw-cal-month-s", r).removeClass("dwb-d");
						if(f === na)
							for(o = 0; o < Ca; o++) a('.dw-cal-month-s[data-val="' + o + '"]', r).addClass("dwb-d");
						if(f === ea)
							for(o = la + 1; 12 >= o; o++) a('.dw-cal-month-s[data-val="' + o + '"]', r).addClass("dwb-d")
					}
					1 == C.length && C.attr("aria-label", f).html(g);
					for(o = 0; o < ma; ++o) e = y.getDate(b, c - oa + o, 1), f = y.getYear(e), e = y.getMonth(e), g = f + Ba, a(ja[o]).attr("aria-label",
						y.monthNames[e] + (Da ? "" : " " + f)).html((!Da && va < V ? g + " " : "") + u[e] + (!Da && va > V ? " " + g : "")), 1 < C.length && a(C[o]).html(g);
					y.getDate(b, c - oa - 1, 1) < Fa ? F(a(".dw-cal-prev-m", r)) : t(a(".dw-cal-prev-m", r));
					y.getDate(b, c + ma - oa, 1) > Oa ? F(a(".dw-cal-next-m", r)) : t(a(".dw-cal-next-m", r));
					y.getDate(b, c, 1).getFullYear() <= Fa.getFullYear() ? F(a(".dw-cal-prev-y", r)) : t(a(".dw-cal-prev-y", r));
					y.getDate(b, c, 1).getFullYear() >= Oa.getFullYear() ? F(a(".dw-cal-next-y", r)) : t(a(".dw-cal-next-y", r))
				}
		
				function t(a) {
					a.removeClass(qb).find(".dw-cal-btn-txt").removeAttr("aria-disabled")
				}
		
				function F(a) {
					a.addClass(qb).find(".dw-cal-btn-txt").attr("aria-disabled", "true")
				}
		
				function B(b, d) {
					if(Y && ("calendar" === Va || d)) {
						var e, f, g = y.getDate(ra, ka, 1),
							h = Math.abs(12 * (y.getYear(b) - y.getYear(g)) + y.getMonth(b) - y.getMonth(g));
						c.needsSlide && h && (ra = y.getYear(b), ka = y.getMonth(b), b > g ? (f = h > pa - oa + ma - 1, ka -= f ? 0 : h - pa, e = "next") : b < g && (f = h > pa + oa, ka += f ? 0 : h - pa, e = "prev"), w(ra, ka, e, Math.min(h, pa), f, !0));
						d || (c.trigger("onDayHighlight", [b]), y.highlight && (a(".dw-sel .dw-i", Z).removeClass(qa), a(".dw-sel", Z).removeClass("dw-sel").removeAttr("aria-selected"),
							a(".dw-cal-week-hl", Z).removeClass("dw-cal-week-hl"), (null !== y.defaultValue || c._hasValue) && a('.dw-cal-day[data-full="' + b.getFullYear() + "-" + b.getMonth() + "-" + b.getDate() + '"]', Z).addClass("dw-sel").attr("aria-selected", "true").find(".dw-i").addClass(qa).closest(".dw-cal-row").addClass("dw-cal-week-hl")));
						c.needsSlide = !0
					}
				}
		
				function s(a, b) {
					j(a, b);
					for(o = 0; o < Ea; o++) ua[o].html(z(a, b - oa - pa + o));
					v();
					c.needsRefresh = !1;
					c.trigger("onMonthLoaded", [a, b])
				}
		
				function g(b, c, d) {
					var e = pa,
						f = pa;
					if(d) {
						for(; f && y.getDate(b, c +
								e + ma - oa - 1, 1) > Oa;) f--;
						for(; e && y.getDate(b, c - f - oa, 1) < Fa;) e--
					}
					a.extend(X.settings, {
						contSize: ma * S,
						snap: S,
						minScroll: U - (Xa ? e : f) * S,
						maxScroll: U + (Xa ? f : e) * S
					});
					X.refresh()
				}
		
				function v() {
					mb && ga.html(a(".dw-week-nr-c", ua[pa]).html());
					a(".dw-cal-slide-a .dw-cal-day", J).attr("tabindex", 0)
				}
		
				function w(b, d, e, f, h, k, l) {
					b && eb.push({
						y: b,
						m: d,
						dir: e,
						slideNr: f,
						load: h,
						active: k,
						callback: l
					});
					if(!Ya) {
						var r = eb.shift(),
							b = r.y,
							d = r.m,
							e = "next" === r.dir,
							f = r.slideNr,
							h = r.load,
							k = r.active,
							l = r.callback || Bb,
							r = y.getDate(b, d, 1),
							b = y.getYear(r),
							d = y.getMonth(r);
						Ya = !0;
						c.changing = !0;
						c.trigger("onMonthChange", [b, d]);
						j(b, d);
						if(h)
							for(o = 0; o < ma; o++) ua[e ? Ea - ma + o : o].html(z(b, d - oa + o));
						k && xa.addClass("dw-cal-slide-a");
						setTimeout(function() {
								c.ariaMessage(y.monthNames[d] + " " + b);
								A(b, d, 200);
								U = e ? U - S * f * fb : U + S * f * fb;
								X.scroll(U, ha ? 200 : 0, function() {
									setTimeout(function() {
										var j;
										if(ua.length) {
											xa.removeClass("dw-cal-slide-a").attr("aria-hidden", "true");
											if(e) {
												j = ua.splice(0, f);
												for(o = 0; o < f; o++) ua.push(j[o]), n(ua[ua.length - 1], +ua[ua.length - 2].data("curr") + 100 * fb)
											} else {
												j =
													ua.splice(Ea - f, f);
												for(o = f - 1; 0 <= o; o--) ua.unshift(j[o]), n(ua[0], +ua[1].data("curr") - 100 * fb)
											}
											for(o = 0; o < f; o++) ua[e ? Ea - f + o : o].html(z(b, d - oa - pa + o + (e ? Ea - f : 0))), h && ua[e ? o : Ea - f + o].html(z(b, d - oa - pa + o + (e ? 0 : Ea - f)));
											for(o = 0; o < ma; o++) ua[pa + o].addClass("dw-cal-slide-a").removeAttr("aria-hidden");
											g(b, d, !0);
											Ya = !1
										}
										eb.length ? setTimeout(function() {
											w()
										}, 10) : (ra = b, ka = d, c.changing = !1, a(".dw-cal-day", J).attr("tabindex", -1), v(), c.needsRefresh ? c.isVisible() && Y && s(ra, ka) : c.trigger("onMonthLoaded", [b, d]), l())
									}, ha ? 0 : 200)
								})
							},
							10)
					}
				}
		
				function E() {
					var b = a(this),
						d = c.live,
						e = c.getDate(!0),
						f = b.attr("data-full"),
						g = f.split("-"),
						g = new Date(g[0], g[1], g[2]),
						e = new Date(g.getFullYear(), g.getMonth(), g.getDate(), e.getHours(), e.getMinutes(), e.getSeconds()),
						h = b.hasClass("dw-sel");
					if((Wa || !b.hasClass("dw-cal-day-diff")) && !1 !== c.trigger("onDayChange", [a.extend(Ab[f], {
							date: e,
							cell: this,
							selected: h
						})])) c.needsSlide = !1, ba = !0, c.setDate(e, d, 0.2, !d, !0), y.divergentDayChange && (Sa = !0, g < y.getDate(ra, ka - oa, 1) ? I() : g > y.getDate(ra, ka - oa + ma, 0) && G(), Sa = !1)
				}
		
				function n(a, b) {
					a.data("curr", b);
					f ? a[0].style[q + "Transform"] = "translate3d(" + (Pa ? "0," + b + "%," : b + "%,0,") + "0)" : a[0].style[Pa ? "top" : "left"] = b + "%"
				}
		
				function G() {
					Sa && y.getDate(ra, ka + ma - oa, 1) <= Oa && a.mobiscroll.running && w(ra, ++ka, "next", 1, !1, !0, G)
				}
		
				function I() {
					Sa && y.getDate(ra, ka - oa - 1, 1) >= Fa && a.mobiscroll.running && w(ra, --ka, "prev", 1, !1, !0, I)
				}
		
				function R(b) {
					Sa && y.getDate(ra, ka, 1) <= y.getDate(y.getYear(Oa) - 1, y.getMonth(Oa) - Ia, 1) && a.mobiscroll.running ? w(++ra, ka, "next", pa, !0, !0, function() {
							R(b)
						}) : Sa && !b.hasClass("dwb-d") &&
						a.mobiscroll.running && w(y.getYear(Oa), y.getMonth(Oa) - Ia, "next", pa, !0, !0)
				}
		
				function H(b) {
					Sa && y.getDate(ra, ka, 1) >= y.getDate(y.getYear(Fa) + 1, y.getMonth(Fa) + oa, 1) && a.mobiscroll.running ? w(--ra, ka, "prev", pa, !0, !0, function() {
						H(b)
					}) : Sa && !b.hasClass("dwb-d") && a.mobiscroll.running && w(y.getYear(Fa), y.getMonth(Fa) + oa, "prev", pa, !0, !0)
				}
		
				function T(a, b) {
					a.hasClass("dw-cal-v") || (a.addClass("dw-cal-v" + (b ? "" : " dw-cal-p-in")).removeClass("dw-cal-p-out dw-cal-h"), c.trigger("onSelectShow", []))
				}
		
				function d(a, b) {
					a.hasClass("dw-cal-v") &&
						a.removeClass("dw-cal-v dw-cal-p-in").addClass("dw-cal-h" + (b ? "" : " dw-cal-p-out"))
				}
		
				function N(a, b) {
					(b || a).hasClass("dw-cal-v") ? d(a) : T(a)
				}
		
				function x() {
					a(this).removeClass("dw-cal-p-out dw-cal-p-in")
				}
				var L, o, O, Q, K, r, W, Z, J, S, U, ba, Y, D, fa, ga, ia, ha, u, X, da, ja, V, C, va, na, ea, Ca, la, Fa, Oa, lb, wa, za, ra, ka, nb, ob, Db, Ja, Ra, Va, Ya, Sa, ma, Ea, Ia, oa, Wa, Ua, bb, rb, Fb = this,
					xa = [],
					ua = [],
					eb = [],
					ta = {},
					Ab = {},
					Bb = function() {},
					Wb = a.extend({}, c.settings),
					y = a.extend(c.settings, h, Wb),
					Ta = "full" == y.weekDays ? "" : "min" == y.weekDays ? "Min" : "Short",
					mb = y.weekCounter,
					Ib = y.layout || (/top|bottom/.test(y.display) ? "liquid" : ""),
					Ga = "liquid" == Ib && "bubble" !== y.display,
					yb = "modal" == y.display,
					Xa = y.rtl,
					fb = Xa ? -1 : 1,
					Hb = Ga ? null : y.calendarWidth,
					Pa = "vertical" == y.swipeDirection,
					$a = y.quickNav,
					pa = y.preMonths,
					Da = "yearMonth" == y.navigation,
					Aa = y.controls.join(","),
					ab = (!0 === y.tabs || !1 !== y.tabs && Ga) && 1 < y.controls.length,
					aa = !ab && y.tabs === l && !Ga && 1 < y.controls.length,
					Ba = y.yearSuffix || "",
					qa = y.activeClass || "",
					pb = "dw-sel " + (y.activeTabClass || ""),
					hb = y.activeTabInnerClass || "",
					qb =
					"dwb-d " + (y.disabledClass || ""),
					Na = "",
					sa = "";
				Aa.match(/calendar/) ? Y = !0 : $a = !1;
				Aa.match(/date/) && (ta.date = 1);
				Aa.match(/time/) && (ta.time = 1);
				Y && ta.date && (ab = !0, aa = !1);
				y.layout = Ib;
				y.preset = (ta.date || Y ? "date" : "") + (ta.time ? "time" : "");
				if("inline" == y.display) a(this).closest('[data-role="page"]').on("pageshow", function() {
					c.position()
				});
				c.changing = !1;
				c.needsRefresh = !1;
				c.needsSlide = !0;
				c.getDayProps = Bb;
				c.onGenMonth = Bb;
				c.prepareObj = P;
				c.refresh = function() {
					c.changing ? c.needsRefresh = true : c.isVisible() && Y && s(ra, ka)
				};
				c.navigate = function(a, b) {
					var d, e, f = c.isVisible();
					if(b && f) B(a, true);
					else {
						d = y.getYear(a);
						e = y.getMonth(a);
						if(f && (d != ra || e != ka)) {
							c.trigger("onMonthChange", [d, e]);
							A(d, e);
							s(d, e)
						}
						ra = d;
						ka = e
					}
				};
				c.showMonthView = function() {
					if($a && !ha) {
						d(sa, true);
						d(Na, true);
						T(ia, true);
						ha = true
					}
				};
				c.changeTab = function(b) {
					if(c._isVisible && ta[b] && Va != b) {
						Va = b;
						a(".dw-cal-pnl", r).removeClass("dw-cal-p-in").addClass("dw-cal-pnl-h");
						a(".dw-cal-tab", r).removeClass(pb).removeAttr("aria-selected").find(".dw-i").removeClass(hb);
						a('.dw-cal-tab[data-control="' +
							b + '"]', r).addClass(pb).attr("aria-selected", "true").find(".dw-i").addClass(hb);
						ta[Va].removeClass("dw-cal-pnl-h").addClass("dw-cal-p-in");
						if(Va === "calendar") {
							L = c.getDate(true);
							(L.getFullYear() !== za.getFullYear() || L.getMonth() !== za.getMonth() || L.getDate() !== za.getDate()) && B(L)
						} else {
							za = c.getDate(true);
							c.setDate(za, false, 0, true)
						}
						c.showMonthView();
						c.trigger("onTabChange", [Va])
					}
				};
				Q = k.datetime.call(this, c);
				V = y.dateOrder.search(/m/i);
				va = y.dateOrder.search(/y/i);
				a.extend(Q, {
					ariaMessage: y.calendarText,
					onMarkupReady: function(g) {
						var h,
							j, k = "";
						r = g;
						W = y.display == "inline" ? a(this).is("div") ? a(this) : a(this).parent() : c.context;
						za = c.getDate(true);
						if(!ra) {
							ra = y.getYear(za);
							ka = y.getMonth(za)
						}
						U = 0;
						fa = true;
						Ya = false;
						u = y.monthNames;
						Va = "calendar";
						if(y.minDate) {
							Fa = new Date(y.minDate.getFullYear(), y.minDate.getMonth(), 1);
							lb = y.minDate
						} else lb = Fa = new Date(y.startYear, 0, 1);
						if(y.maxDate) {
							Oa = new Date(y.maxDate.getFullYear(), y.maxDate.getMonth(), 1);
							wa = y.maxDate
						} else wa = Oa = new Date(y.endYear, 11, 31, 23, 59, 59);
						g.addClass("dw-calendar" + (f ? "" : " dw-cal-no3d"));
						K = a(".dw", g);
						Ra = a(".dwcc", g);
						ta.date ? ta.date = a(".dwc", r).eq(0) : Y && a(".dwc", r).eq(0).addClass("dwc-hh");
						if(ta.time) ta.time = a(".dwc", r).eq(1);
						if(Y) {
							ma = y.months == "auto" ? Math.max(1, Math.min(3, Math.floor((Hb || W[0].innerWidth || W.innerWidth()) / 280))) : y.months;
							Ea = ma + 2 * pa;
							Ia = Math.floor(ma / 2);
							oa = Math.round(ma / 2) - 1;
							Wa = y.showDivergentDays === l ? ma < 2 : y.showDivergentDays;
							Pa = Pa && ma < 2;
							j = '<div class="dw-cal-btnw"><div class="' + (Xa ? "dw-cal-next-m" : "dw-cal-prev-m") + ' dw-cal-prev dw-cal-btn dwb dwb-e"><div role="button" tabindex="0" class="dw-cal-btn-txt ' +
								(y.btnCalPrevClass || "") + '" aria-label="' + y.prevMonthText + '"></div></div>';
							for(o = 0; o < ma; ++o) j = j + ('<div class="dw-cal-btnw-m" style="width: ' + 100 / ma + '%"><span role="button" class="dw-cal-month"></span></div>');
							j = j + ('<div class="' + (Xa ? "dw-cal-prev-m" : "dw-cal-next-m") + ' dw-cal-next dw-cal-btn dwb dwb-e"><div role="button" tabindex="0" class="dw-cal-btn-txt ' + (y.btnCalNextClass || "") + '" aria-label="' + y.nextMonthText + '"></div></div></div>');
							Da && (k = '<div class="dw-cal-btnw"><div class="' + (Xa ? "dw-cal-next-y" :
								"dw-cal-prev-y") + ' dw-cal-prev dw-cal-btn dwb dwb-e"><div role="button" tabindex="0" class="dw-cal-btn-txt ' + (y.btnCalPrevClass || "") + '" aria-label="' + y.prevYearText + '"></div></div><span role="button" class="dw-cal-year"></span><div class="' + (Xa ? "dw-cal-prev-y" : "dw-cal-next-y") + ' dw-cal-next dw-cal-btn dwb dwb-e"><div role="button" tabindex="0" class="dw-cal-btn-txt ' + (y.btnCalNextClass || "") + '" aria-label="' + y.nextYearText + '"></div></div></div>');
							if($a) {
								na = y.getYear(Fa);
								ea = y.getYear(Oa);
								Ca = y.getMonth(Fa);
								la = y.getMonth(Oa);
								ob = Math.ceil((ea - na + 1) / 12) + 2;
								Na = M("month", 36, 24, 0, "", y.monthNames, y.monthNamesShort);
								sa = M("year", ob * 12, ea - na + 13, na, Ba)
							}
							D = '<div class="mbsc-w-p dw-cal-c"><div class="dw-cal ' + (ma > 1 ? " dw-cal-multi " : "") + (mb ? " dw-weeks " : "") + (Pa ? " mbsc-cal-vertical" : "") + (Wa ? "" : " dw-hide-diff ") + (y.highlightNow ? " dw-hl-now " : "") + (y.calendarClass || "") + '"><div class="dw-cal-header"><div class="dw-cal-btnc ' + (Da ? "dw-cal-btnc-ym" : "dw-cal-btnc-m") + '">' + (va < V || ma > 1 ? k + j : j + k) + '</div></div><div class="dw-cal-body"><div class="dw-cal-m-c dw-cal-v"><div class="dw-cal-days-c">';
							for(O = 0; O < ma; ++O) {
								D = D + ('<div aria-hidden="true" class="dw-cal-days" style="width: ' + 100 / ma + '%"><table cellpadding="0" cellspacing="0"><tr>');
								for(o = 0; o < 7; o++) D = D + ("<th>" + y["dayNames" + Ta][(o + y.firstDay) % 7] + "</th>");
								D = D + "</tr></table></div>"
							}
							D = D + ('</div><div class="dw-cal-anim-c ' + (y.calendarClass || "") + '"><div class="dw-week-nrs-c ' + (y.weekNrClass || "") + '"><div class="dw-week-nrs"></div></div><div class="dw-cal-anim">');
							for(o = 0; o < ma + 2 * pa; o++) D = D + '<div class="dw-cal-slide" aria-hidden="true"></div>';
							D =
								D + ("</div></div></div>" + Na + sa + "</div></div></div>");
							ta.calendar = a(D)
						}
						a.each(y.controls, function(b, d) {
							ta[d] = a('<div class="dw-cal-pnl" id="' + (Fb.id + "_dw_pnl_" + b) + '"></div>').append(a('<div class="dw-cal-pnl-i"></div>').append(ta[d])).appendTo(Ra)
						});
						h = '<div class="dw-cal-tabs"><ul role="tablist">';
						a.each(y.controls, function(a, b) {
							ta[b] && (h = h + ('<li role="tab" aria-controls="' + (Fb.id + "_dw_pnl_" + a) + '" class="dw-cal-tab ' + (a ? "" : pb) + '" data-control="' + b + '"><a href="#" class="dwb-e dwb-nhl dw-i ' + (!a ? hb : "") +
								'">' + y[b + "Text"] + "</a></li>"))
						});
						h = h + "</ul></div>";
						Ra.before(h);
						Z = a(".dw-cal-anim-c", r);
						J = a(".dw-cal-anim", Z);
						ga = a(".dw-week-nrs", Z);
						if(Y) {
							ha = true;
							xa = a(".dw-cal-slide", J).each(function(b, d) {
								ua.push(a(d))
							});
							xa.slice(pa, pa + ma).addClass("dw-cal-slide-a").removeAttr("aria-hidden");
							for(o = 0; o < Ea; o++) n(ua[o], 100 * (o - pa) * fb);
							s(ra, ka);
							X = new b.classes.ScrollView(Z[0], {
								axis: Pa ? "Y" : "X",
								easing: "",
								contSize: 0,
								snap: 1,
								maxSnapScroll: pa,
								moveElement: J,
								mousewheel: y.mousewheel,
								swipe: y.swipe,
								liveSwipe: y.liveSwipe,
								time: 200,
								lock: true,
								onScrollStart: function(a, b) {
									b.settings.scrollLock = c.scrollLock
								},
								onScrollEnd: function(a) {
									(a = Math.round((a - U) / S) * fb) && w(ra, ka - a, a > 0 ? "prev" : "next", a > 0 ? a : -a)
								}
							})
						}
						ja = a(".dw-cal-month", r);
						C = a(".dw-cal-year", r);
						ia = a(".dw-cal-m-c", r);
						if($a) {
							ia.on("webkitAnimationEnd animationend", x);
							Na = a(".dw-cal-month-c", r).on("webkitAnimationEnd animationend", x);
							sa = a(".dw-cal-year-c", r).on("webkitAnimationEnd animationend", x);
							a(".dw-cal-sc-p", r);
							nb = {
								axis: Pa ? "Y" : "X",
								contSize: 0,
								snap: 1,
								maxSnapScroll: 1,
								rtl: y.rtl,
								mousewheel: y.mousewheel,
								swipe: y.swipe,
								liveSwipe: y.liveSwipe,
								time: 200
							};
							Ua = new b.classes.ScrollView(sa[0], nb);
							da = new b.classes.ScrollView(Na[0], nb)
						}
						Ga ? g.addClass("dw-cal-liq") : a(".dw-cal", r).width(Hb || 280 * ma);
						y.calendarHeight && a(".dw-cal-anim-c", r).height(y.calendarHeight);
						c.tap(Z, function(b) {
							b = a(b.target);
							if(!Ya && !X.scrolled) {
								b = b.closest(".dw-cal-day", this);
								b.hasClass("dw-cal-day-v") && E.call(b[0])
							}
						});
						a(".dw-cal-btn", r).on("touchstart mousedown keydown", function(b) {
							var d = a(this);
							if(b.type !== "keydown") {
								b.preventDefault();
								b =
									p(b, this)
							} else b = b.keyCode === 32;
							if(!Sa && b && !d.hasClass("dwb-d")) {
								Sa = true;
								d.hasClass("dw-cal-prev-m") ? I() : d.hasClass("dw-cal-next-m") ? G() : d.hasClass("dw-cal-prev-y") ? H(d) : d.hasClass("dw-cal-next-y") && R(d);
								a(m).on("mouseup.dwbtn", function() {
									a(m).off(".dwbtn");
									Sa = false
								})
							}
						}).on("touchend touchcancel keyup", function() {
							Sa = false
						});
						a(".dw-cal-tab", r).on("touchstart click", function(b) {
							p(b, this) && a.mobiscroll.running && c.changeTab(a(this).attr("data-control"))
						});
						if($a) {
							c.tap(a(".dw-cal-month", r), function() {
								if(!sa.hasClass("dw-cal-v")) {
									N(ia);
									ha = ia.hasClass("dw-cal-v")
								}
								N(Na);
								d(sa)
							});
							c.tap(a(".dw-cal-year", r), function() {
								sa.hasClass("dw-cal-v") || Ua.scroll(bb);
								if(!Na.hasClass("dw-cal-v")) {
									N(ia);
									ha = ia.hasClass("dw-cal-v")
								}
								N(sa);
								d(Na)
							});
							c.tap(a(".dw-cal-month-s", r), function() {
								!da.scrolled && !a(this).hasClass("dwb-d") && c.navigate(y.getDate(ra, a(this).attr("data-val"), 1))
							});
							c.tap(a(".dw-cal-year-s", r), function() {
								if(!Ua.scrolled) {
									L = y.getDate(a(this).attr("data-val"), ka, 1);
									c.navigate(new Date(e.constrain(L, Fa, Oa)))
								}
							});
							c.tap(sa, function() {
								if(!Ua.scrolled) {
									d(sa);
									T(ia);
									ha = true
								}
							});
							c.tap(Na, function() {
								if(!da.scrolled) {
									d(Na);
									T(ia);
									ha = true
								}
							})
						}
					},
					onShow: function() {
						Y && A(ra, ka)
					},
					onPosition: function(b, d, e) {
						var f, h, j, k = 0,
							l = 0,
							n = 0;
						if(Ga) {
							yb && Z.height("");
							Ra.height("");
							J.width("")
						}
						S && (j = S);
						if(S = Math.round(Math.round(parseInt(Z.css(Pa ? "height" : "width"))) / ma)) {
							r.removeClass("mbsc-cal-m mbsc-cal-l");
							S > 1024 ? r.addClass("mbsc-cal-l") : S > 640 && r.addClass("mbsc-cal-m")
						}
						if(ab && (fa || Ga) || aa) {
							a(".dw-cal-pnl", r).removeClass("dw-cal-pnl-h");
							a.each(ta, function(a, b) {
								f = b.outerWidth();
								k =
									Math.max(k, f);
								l = Math.max(l, b.outerHeight());
								n = n + f
							});
							if(ab || aa && n > (W[0].innerWidth || W.innerWidth())) {
								h = true;
								Va = a(".dw-cal-tabs .dw-sel", r).attr("data-control");
								K.addClass("dw-cal-tabbed")
							} else {
								Va = "calendar";
								l = k = "";
								K.removeClass("dw-cal-tabbed");
								Ra.css({
									width: "",
									height: ""
								})
							}
						}
						if(Ga && yb) {
							c._isFullScreen = true;
							h && Y && Ra.height(ta.calendar.outerHeight());
							b = K.outerHeight();
							e >= b && Z.height(e - b + Z.outerHeight());
							Y && (l = Math.max(l, ta.calendar.outerHeight()))
						}
						if(h) {
							Ra.css({
								width: Ga ? "" : k,
								height: l
							});
							S = Math.round(Math.round(parseInt(Z.css(Pa ?
								"height" : "width"))) / ma)
						}
						if(S) {
							J[Pa ? "height" : "width"](S);
							if(S !== j) {
								if(Da) {
									u = y.maxMonthWidth > a(".dw-cal-btnw-m", r).width() ? y.monthNamesShort : y.monthNames;
									for(o = 0; o < ma; ++o) a(ja[o]).text(u[y.getMonth(y.getDate(ra, ka - oa + o, 1))])
								}
								if($a) {
									e = sa[Pa ? "height" : "width"]();
									a.extend(Ua.settings, {
										contSize: e,
										snap: e,
										minScroll: (2 - ob) * e,
										maxScroll: -e
									});
									a.extend(da.settings, {
										contSize: e,
										snap: e,
										minScroll: -e,
										maxScroll: -e
									});
									Ua.refresh();
									da.refresh();
									sa.hasClass("dw-cal-v") && Ua.scroll(bb)
								}
								if(Ga && !fa && j) {
									e = U / j;
									U = e * S
								}
								g(ra, ka, !j)
							}
						} else S =
							j;
						if(h) {
							a(".dw-cal-pnl", r).addClass("dw-cal-pnl-h");
							ta[Va].removeClass("dw-cal-pnl-h")
						}
						c.trigger("onCalResize", []);
						fa = false
					},
					onHide: function() {
						eb = [];
						ua = [];
						ka = ra = Va = null;
						Ya = true;
						S = 0;
						X && X.destroy();
						if($a && Ua && da) {
							Ua.destroy();
							da.destroy()
						}
					},
					onValidated: function(a) {
						var b, d, e;
						d = c.getDate(true);
						if(ba) b = "calendar";
						else
							for(e in c.order) e && c.order[e] === a && (b = /[mdy]/.test(e) ? "date" : "time");
						c.trigger("onSetDate", [{
							date: d,
							control: b
						}]);
						B(d);
						ba = false
					}
				});
				return Q
			}
		})(jQuery, window, document);
		(function(a, c) {
			var m = a.mobiscroll,
				l = {
					wheelOrder: "hhiiss",
					useShortLabels: !1,
					minTime: 0,
					maxTime: Infinity,
					labels: "Years,Months,Days,Hours,Minutes,Seconds".split(","),
					labelsShort: "Yrs,Mths,Days,Hrs,Mins,Secs".split(",")
				};
			m.presetShort("timespan");
			m.presets.scroller.timespan = function(b) {
				function k(b) {
					var d = {};
					a(n).each(function(a, c) {
						d[c] = H[c] ? Math.floor(b / G[c].limit) : 0;
						b -= d[c] * G[c].limit
					});
					return d
				}
		
				function e(a, b) {
					var d = !1,
						c = R[H[a] - 1] || 1,
						e = G[a],
						f = e.wheel,
						h = e.prefix;
					A = 0;
					t = e.until;
					a == T && (A = Math.max(s[a],
						b[a] - 50 * c), t = Math.min(g[a], A + 100 * c), i = A + 5 * c, P = t - 5 * c);
					f.keys = [];
					f.values = [];
					f.label = e.label;
					E.match(RegExp(e.re + e.re, "i")) && (d = !0);
					for(q = A; q <= t; q += c) f.keys.push(q), f.values.push((h || "") + (10 > q && d ? "0" : "") + q + '<span class="dwtlbl">' + e.label + "</span>")
				}
		
				function f(b) {
					var d = 0;
					a.each(I, function(a, c) {
						isNaN(+b[0]) || (d += G[c.v].limit * b[a])
					});
					return d
				}
				var q, p, h, i, P, j, M, z, A, t, F, B, s, g, v = a.extend({}, b.settings),
					w = a.extend(b.settings, l, v),
					E = w.wheelOrder,
					v = w.useShortLabels ? w.labelsShort : w.labels,
					n = "years,months,days,hours,minutes,seconds".split(","),
					G = {
						years: {
							ord: 0,
							index: 6,
							until: 10,
							limit: 31536E6,
							label: v[0],
							re: "y",
							wheel: {}
						},
						months: {
							ord: 1,
							index: 5,
							until: 11,
							limit: 2592E6,
							label: v[1],
							re: "m",
							wheel: {}
						},
						days: {
							ord: 2,
							index: 4,
							until: 31,
							limit: 864E5,
							label: v[2],
							re: "d",
							wheel: {}
						},
						hours: {
							ord: 3,
							index: 3,
							until: 23,
							limit: 36E5,
							label: v[3],
							re: "h",
							wheel: {}
						},
						minutes: {
							ord: 4,
							index: 2,
							until: 59,
							limit: 6E4,
							label: v[4],
							re: "i",
							wheel: {}
						},
						seconds: {
							ord: 5,
							index: 1,
							until: 59,
							limit: 1E3,
							label: v[5],
							re: "s",
							wheel: {}
						}
					},
					I = [],
					R = w.steps || [],
					H = {},
					T = "seconds",
					d = 0,
					N = w.defaultValue || Math.max(w.minTime,
						Math.min(0, w.maxTime)),
					x = [
						[]
					];
				h = 0;
				z = k(h);
				s = k(w.minTime);
				g = k(w.maxTime);
				a(n).each(function(a, b) {
					p = E.search(RegExp(G[b].re, "i")); - 1 < p && (I.push({
						o: p,
						v: b
					}), G[b].index > G[T].index && (T = b))
				});
				I.sort(function(a, b) {
					return a.o > b.o ? 1 : -1
				});
				a.each(I, function(a, b) {
					b.v == T && (d = a);
					H[b.v] = a + 1;
					x[0].push(G[b.v].wheel);
					e(b.v, z)
				});
				b.getVal = function(a, d) {
					return d ? b._getVal(a) : b._hasValue || a ? f(b.getArrayVal(a)) : null
				};
				return {
					mode: "scroller",
					showLabel: !0,
					wheels: x,
					parseValue: function(b) {
						var d = [],
							c;
						m.util.isNumeric(b) || !b ? (z =
							k(b || N), a.each(I, function(a, b) {
								d.push(z[b.v])
							})) : a.each(I, function(a, e) {
							c = RegExp("(\\d+)\\s?(" + w.labels[G[e.v].ord] + "|" + w.labelsShort[G[e.v].ord] + ")", "gi").exec(b);
							d.push(c ? c[1] : 0)
						});
						a(d).each(function(a, b) {
							d[a] = Math.floor(b / (R[a] || 1)) * (R[a] || 1)
						});
						return d
					},
					formatValue: function(b) {
						var d = "";
						a.each(I, function(a, c) {
							d += +b[a] ? b[a] + " " + G[c.v].label + " " : ""
						});
						return d.replace(/\s+$/g, "")
					},
					validate: function(l, o, p) {
						var m, q, r = b._tempWheelArray;
						h = f(r);
						m = k(h);
						if(o === d || !j && (r[d] < i || r[d] > P))
							if(e(T, m), F !== A || B !==
								t) q = r[d], M = setTimeout(function() {
								F = A;
								B = t;
								j = !0;
								r[d] = q;
								b.changeWheel([d], c, o !== c)
							}, 1E3 * p);
						var z = !0,
							v = !0;
						a(n).each(function(b, d) {
							if(H[d] !== c) {
								var e = a(".dw-ul", l).eq(H[d] - 1),
									f = a(".dw-li", e).index(a('.dw-li[data-val="' + g[d] + '"]', e)),
									h = a(".dw-li", e).index(a('.dw-li[data-val="' + s[d] + '"]', e));
								a(".dw-li", e).addClass("dw-v");
								z && -1 < f && a(".dw-li", e).slice(f + 1).removeClass("dw-v");
								v && -1 < h && a(".dw-li", e).slice(0, h).removeClass("dw-v");
								z = z && m[d] == g[d];
								v = v && m[d] == s[d]
							}
						});
						j = !1
					},
					onBeforeShow: function() {
						h = f(b._tempWheelArray);
						z = k(h);
						s = k(w.minTime);
						g = k(w.maxTime);
						e(T, z)
					},
					onMarkupReady: function(b) {
						b.addClass("dw-timespan");
						a(".dwwl" + d, b).on("mousedown touchstart", function() {
							clearTimeout(M)
						})
					}
				}
			}
		})(jQuery);
		(function(a, c, m, l) {
			var b = a.mobiscroll,
				k = a.extend,
				e = b.util,
				f = b.datetime,
				q = b.presets.scroller,
				p = {
					labelsShort: "Yrs,Mths,Days,Hrs,Mins,Secs".split(","),
					fromText: "Start",
					toText: "End",
					eventText: "event",
					eventsText: "events"
				};
			b.presetShort("calendar");
			q.calendar = function(h) {
				function i(b) {
					if(b) {
						if(L[b]) return L[b];
						var d = a('<div style="background-color:' + b + ';"></div>').appendTo("body"),
							e = (c.getComputedStyle ? getComputedStyle(d[0]) : d[0].style).backgroundColor.replace(/rgb|rgba|\(|\)|\s/g, "").split(","),
							e = 130 <
							0.299 * e[0] + 0.587 * e[1] + 0.114 * e[2] ? "#000" : "#fff";
						d.remove();
						return L[b] = e
					}
				}
		
				function m(a) {
					return a.sort(function(a, b) {
						var d = a.d || a.start,
							c = b.d || b.start,
							d = !d.getTime ? 0 : a.start && a.end && a.start.toDateString() !== a.end.toDateString() ? 1 : d.getTime(),
							c = !c.getTime ? 0 : b.start && b.end && b.start.toDateString() !== b.end.toDateString() ? 1 : c.getTime();
						return d - c
					})
				}
		
				function j(b) {
					var d;
					d = a(".dw-cal-c", s).outerHeight();
					var c = b.outerHeight(),
						e = b.outerWidth(),
						f = b.offset().top - a(".dw-cal-c", s).offset().top,
						h = 2 > b.closest(".dw-cal-row").index();
					d = g.addClass("dw-cal-events-t").css({
						top: h ? f + c : "0",
						bottom: h ? "0" : d - f
					}).addClass("dw-cal-events-v").height();
					g.css(h ? "bottom" : "top", "auto").removeClass("dw-cal-events-t");
					n.css("max-height", d);
					E.refresh();
					E.scroll(0);
					h ? g.addClass("dw-cal-events-b") : g.removeClass("dw-cal-events-b");
					a(".dw-cal-events-arr", g).css("left", b.offset().left - g.offset().left + e / 2)
				}
		
				function M(d, c) {
					var e = w[d];
					if(e) {
						var f, k, l, r, n, J = '<ul class="dw-cal-event-list">';
						v = c;
						c.addClass(O).find(".dw-i").addClass(K);
						c.hasClass(Q) && c.attr("data-hl",
							"true").removeClass(Q);
						m(e);
						a.each(e, function(a, d) {
							r = d.d || d.start;
							n = d.start && d.end && d.start.toDateString() !== d.end.toDateString();
							l = d.color;
							i(l);
							k = f = "";
							r.getTime && (f = b.datetime.formatDate((n ? "MM d yy " : "") + o.timeFormat, r));
							d.end && (k = b.datetime.formatDate((n ? "MM d yy " : "") + o.timeFormat, d.end));
							var c = J,
								e = '<li role="button" aria-label="' + d.text + (f ? ", " + o.fromText + " " + f : "") + (k ? ", " + o.toText + " " + k : "") + '" class="dw-cal-event"><div class="dw-cal-event-color" style="' + (l ? "background:" + l + ";" : "") + '"></div><div class="dw-cal-event-text">' +
								(r.getTime && !n ? '<div class="dw-cal-event-time">' + b.datetime.formatDate(o.timeFormat, r) + "</div>" : "") + d.text + "</div>",
								g;
							if(d.start && d.end) {
								g = o.labelsShort;
								var h = Math.abs(d.end - d.start) / 1E3,
									j = h / 60,
									p = j / 60,
									m = p / 24,
									q = m / 365;
								g = '<div class="dw-cal-event-dur">' + (45 > h && Math.round(h) + " " + g[5].toLowerCase() || 45 > j && Math.round(j) + " " + g[4].toLowerCase() || 24 > p && Math.round(p) + " " + g[3].toLowerCase() || 30 > m && Math.round(m) + " " + g[2].toLowerCase() || 365 > m && Math.round(m / 30) + " " + g[1].toLowerCase() || Math.round(q) + " " + g[0].toLowerCase()) +
									"</div>"
							} else g = "";
							J = c + (e + g + "</li>")
						});
						J += "</ul>";
						G.html(J);
						j(v);
						h.tap(a(".dw-cal-event", G), function(b) {
							E.scrolled || h.trigger("onEventSelect", [b, e[a(this).index()], d])
						});
						I = !0;
						h.trigger("onEventBubbleShow", [v, g])
					}
				}
		
				function z() {
					g && g.removeClass("dw-cal-events-v");
					v && (v.removeClass(O).find(".dw-i").removeClass(K), v.attr("data-hl") && v.removeAttr("data-hl").addClass(Q));
					I = !1
				}
		
				function A(a) {
					return new Date(a.getFullYear(), a.getMonth(), a.getDate())
				}
		
				function t(a) {
					S = {};
					if(a && a.length)
						for(H = 0; H < a.length; H++) S[A(a[H])] =
							a[H]
				}
		
				function F() {
					U && z();
					h.refresh()
				}
				var B, s, g, v, w, E, n, G, I, R, H, T, d, N, x, L = {};
				N = k({}, h.settings);
				var o = k(h.settings, p, N),
					O = "dw-sel dw-cal-day-ev",
					Q = "dw-cal-day-hl",
					K = o.activeClass || "",
					r = o.multiSelect || "week" == o.selectType,
					W = o.markedDisplay,
					Z = !0 === o.events || !0 === o.markedText,
					J = 0,
					S = {},
					U = a.isArray(o.events),
					ba = U ? k(!0, [], o.events) : [];
				N = q.calbase.call(this, h);
				B = k({}, N);
				R = o.firstSelectDay === l ? o.firstDay : o.firstSelectDay;
				if(o.selectedValues)
					for(H = 0; H < o.selectedValues.length; H++) S[A(o.selectedValues[H])] = o.selectedValues[H];
				U && a.each(ba, function(a, b) {
					b._id === l && (b._id = J++)
				});
				h.onGenMonth = function(a, b) {
					w = h.prepareObj(ba, a, b);
					T = h.prepareObj(o.marked, a, b)
				};
				h.getDayProps = function(b) {
					for(var d = r ? S[b] !== l : U ? b.getTime() === (new Date).setHours(0, 0, 0, 0) : l, c = T[b] ? T[b][0] : !1, e = w[b] ? w[b][0] : !1, f = c || e, c = c.text || (e ? w[b].length + " " + (1 < w[b].length ? o.eventsText : o.eventText) : 0), e = T[b] || w[b] || [], g = f.color, h = Z && c ? i(g) : "", j = "", k = '<div class="dw-cal-day-m"' + (g ? ' style="background-color:' + g + ";border-color:" + g + " " + g + ' transparent transparent"' :
							"") + "></div>", b = 0; b < e.length; b++) e[b].icon && (j += '<span class="mbsc-ic mbsc-ic-' + e[b].icon + '"' + (e[b].text ? "" : e[b].color ? ' style="color:' + e[b].color + ';"' : "") + "></span>\n");
					if("bottom" == W) {
						k = '<div class="dw-cal-day-m"><div class="dw-cal-day-m-t">';
						for(b = 0; b < e.length; b++) k += '<div class="dw-cal-day-m-c"' + (e[b].color ? ' style="background:' + e[b].color + ';"' : "") + "></div>";
						k += "</div></div>"
					}
					return {
						marked: f,
						selected: U ? !1 : d,
						cssClass: U && d ? "dw-cal-day-hl" : f ? "dw-cal-day-marked" : "",
						ariaLabel: Z || U ? c : "",
						markup: Z && c ?
							'<div class="dw-cal-day-txt-c"><div class="dw-cal-day-txt ' + (o.eventTextClass || "") + '" title="' + a("<div>" + c + "</div>").text() + '"' + (g ? ' style="background:' + g + ";color:" + h + ';text-shadow:none;"' : "") + ">" + j + c + "</div></div>" : Z && j ? '<div class="dw-cal-day-ic-c">' + j + "</div>" : f ? k : ""
					}
				};
				h.addValue = function(a) {
					S[A(a)] = a;
					F()
				};
				h.removeValue = function(a) {
					delete S[A(a)];
					F()
				};
				h.setVal = function(a, b, d, c, e) {
					r && (t(a), a = a ? a[0] : null);
					h._setVal(a, b, d, c, e);
					F()
				};
				h.getVal = function(a) {
					return r ? e.objectToArray(S) : h.getDate(a)
				};
				h.setValues =
					function(a, b) {
						h.setDate(a ? a[0] : null, b);
						t(a);
						F()
					};
				h.getValues = function() {
					return r ? h.getVal() : [h.getDate()]
				};
				U && (h.addEvent = function(b) {
					var d = [],
						b = k(!0, [], a.isArray(b) ? b : [b]);
					a.each(b, function(a, b) {
						b._id === l && (b._id = J++);
						ba.push(b);
						d.push(b._id)
					});
					F();
					return d
				}, h.removeEvent = function(b) {
					b = a.isArray(b) ? b : [b];
					a.each(b, function(b, d) {
						a.each(ba, function(a, b) {
							if(b._id === d) return ba.splice(a, 1), !1
						})
					});
					F()
				}, h.getEvents = function(a) {
					var b;
					return a ? (a.setHours(0, 0, 0, 0), b = h.prepareObj(ba, a.getFullYear(), a.getMonth()),
						b[a] ? m(b[a]) : []) : k(!0, [], ba)
				}, h.setEvents = function(b) {
					var d = [];
					ba = k(!0, [], b);
					a.each(ba, function(a, b) {
						b._id === l && (b._id = J++);
						d.push(b._id)
					});
					F();
					return d
				});
				k(N, {
					highlight: !r && !U,
					divergentDayChange: !r && !U,
					buttons: U && "inline" !== o.display ? ["cancel"] : o.buttons,
					parseValue: function(a) {
						var b, d;
						if(r && a && typeof a === "string") {
							S = {};
							a = a.split(",");
							for(b = 0; b < a.length; b++) {
								d = f.parseDate(h.format, a[b].replace(/^\s+|\s+$/g, ""), o);
								S[A(d)] = d
							}
							a = a[0]
						}
						return B.parseValue.call(this, a)
					},
					formatValue: function(a) {
						var b, d = [];
						if(r) {
							for(b in S) d.push(f.formatDate(h.format, S[b], o));
							return d.join(", ")
						}
						return B.formatValue.call(this, a)
					},
					onClear: function() {
						if(r) {
							S = {};
							h.refresh()
						}
					},
					onBeforeShow: function() {
						if(U) o.headerText = false;
						if(o.closeOnSelect) o.divergentDayChange = false;
						if(o.counter && r) o.headerText = function() {
							var b = 0,
								d = o.selectType == "week" ? 7 : 1;
							a.each(S, function() {
								b++
							});
							b = Math.round(b / d);
							return(b > 1 ? o.selectedPluralText || o.selectedText : o.selectedText).replace(/{count}/, b)
						}
					},
					onMarkupReady: function(c) {
						B.onMarkupReady.call(this,
							c);
						s = c;
						if(r) {
							a(".dwv", c).attr("aria-live", "off");
							d = k({}, S)
						}
						Z && a(".dw-cal", c).addClass("dw-cal-ev");
						W && a(".dw-cal", c).addClass("dw-cal-m-" + W);
						if(U) {
							c.addClass("dw-cal-em");
							g = a('<div class="dw-cal-events ' + (o.eventBubbleClass || "") + '"><div class="dw-cal-events-arr"></div><div class="dw-cal-events-i"><div class="dw-cal-events-sc"></div></div></div>').appendTo(a(".dw-cal-c", c));
							n = a(".dw-cal-events-i", g);
							G = a(".dw-cal-events-sc", g);
							E = new b.classes.ScrollView(n[0]);
							I = false;
							h.tap(n, function() {
								E.scrolled ||
									z()
							})
						}
					},
					onMonthChange: function() {
						U && z()
					},
					onSelectShow: function() {
						U && z()
					},
					onMonthLoaded: function() {
						if(x) {
							M(x.d, a('.dw-cal-day-v[data-full="' + x.full + '"]:not(.dw-cal-day-diff)', s));
							x = false
						}
					},
					onDayChange: function(b) {
						var d = b.date,
							c = A(d),
							e = a(b.cell),
							b = b.selected;
						if(U) {
							z();
							e.hasClass("dw-cal-day-ev") || setTimeout(function() {
								h.changing ? x = {
									d: c,
									full: e.attr("data-full")
								} : M(c, e)
							}, 10)
						} else if(r)
							if(o.selectType == "week") {
								var f, g, j = c.getDay() - R,
									j = j < 0 ? 7 + j : j;
								o.multiSelect || (S = {});
								for(f = 0; f < 7; f++) {
									g = new Date(c.getFullYear(),
										c.getMonth(), c.getDate() - j + f);
									b ? delete S[g] : S[g] = g
								}
								F()
							} else {
								f = a('.dw-cal .dw-cal-day[data-full="' + e.attr("data-full") + '"]', s);
								if(b) {
									f.removeClass("dw-sel").removeAttr("aria-selected").find(".dw-i").removeClass(K);
									delete S[c]
								} else {
									f.addClass("dw-sel").attr("aria-selected", "true").find(".dw-i").addClass(K);
									S[c] = c
								}
							}
						if(!U && !o.multiSelect && o.closeOnSelect && o.display !== "inline") {
							h.needsSlide = false;
							h.setDate(d);
							h.select();
							return false
						}
					},
					onCalResize: function() {
						I && j(v)
					},
					onCancel: function() {
						!h.live && r && (S =
							k({}, d))
					}
				});
				return N
			}
		})(jQuery, window, document);
		(function(a) {
			var c = a.mobiscroll,
				m = c.presets.scroller,
				l = {
					min: 0,
					max: 1E3,
					defUnit: "kg",
					units: ["g", "kg", "oz", "lb"],
					unitNames: {
						tlong: "t (long)",
						tshort: "t (short)"
					}
				},
				b = {
					mg: 0.001,
					cg: 0.01,
					dg: 0.1,
					g: 1,
					dag: 10,
					hg: 100,
					kg: 1E3,
					t: 1E6,
					drc: 1.7718452,
					oz: 28.3495,
					lb: 453.59237,
					st: 6350.29318,
					qtr: 12700.58636,
					cwt: 50802.34544,
					tlong: 1016046.9088,
					tshort: 907184.74
				};
			c.presetShort("mass");
			m.mass = function(c) {
				var e = a.extend({}, l, c.settings),
					f = [],
					q = [],
					p, h;
				if(e.units)
					for(h = 0; h < e.units.length; h++) p = e.units[h], b[p] && (f.push(p), q.push(e.unitNames[p] ||
						p));
				a.extend(c.settings, e, {
					sign: !1,
					units: f,
					unitNames: q,
					convert: function(a, c, e) {
						return a * b[c] / b[e]
					}
				});
				return m.measurement.call(this, c)
			}
		})(jQuery);
		(function(a) {
			var c = a.mobiscroll,
				m = c.presets.scroller,
				l = {
					min: 0,
					max: 100,
					defUnit: "N",
					units: ["N", "kp", "lbf", "pdl"]
				},
				b = {
					N: 1,
					kp: 9.80665,
					lbf: 4.448222,
					pdl: 0.138255
				};
			c.presetShort("force");
			m.force = function(c) {
				var e = a.extend({}, l, c.settings),
					f = [],
					q, p;
				if(e.units)
					for(p = 0; p < e.units.length; p++) q = e.units[p], b[q] && f.push(q);
				a.extend(c.settings, e, {
					sign: !1,
					units: f,
					unitNames: null,
					convert: function(a, c, e) {
						return a * b[c] / b[e]
					}
				});
				return m.measurement.call(this, c)
			}
		})(jQuery);
		(function(a) {
			var c = a.mobiscroll,
				m = c.presets.scroller,
				l = {
					min: -20,
					max: 40,
					defUnit: "c",
					units: ["c", "k", "f", "r"],
					unitNames: {
						c: "\u00b0C",
						k: "K",
						f: "\u00b0F",
						r: "\u00b0R"
					}
				},
				b = {
					c: 1,
					k: 1,
					f: 1,
					r: 1
				},
				k = {
					c2k: function(a) {
						return a + 273.15
					},
					c2f: function(a) {
						return 9 * a / 5 + 32
					},
					c2r: function(a) {
						return 9 * (a + 273.15) / 5
					},
					k2c: function(a) {
						return a - 273.15
					},
					k2f: function(a) {
						return 9 * a / 5 - 459.67
					},
					k2r: function(a) {
						return 9 * a / 5
					},
					f2c: function(a) {
						return 5 * (a - 32) / 9
					},
					f2k: function(a) {
						return 5 * (a + 459.67) / 9
					},
					f2r: function(a) {
						return a + 459.67
					},
					r2c: function(a) {
						return 5 *
							(a - 491.67) / 9
					},
					r2k: function(a) {
						return 5 * a / 9
					},
					r2f: function(a) {
						return a - 459.67
					}
				};
			c.presetShort("temperature");
			m.temperature = function(c) {
				var f = a.extend({}, l, c.settings),
					q = [],
					p = [],
					h, i;
				if(f.units)
					for(i = 0; i < f.units.length; i++) h = f.units[i], b[h] && (q.push(h), p.push(f.unitNames[h] || h));
				a.extend(c.settings, f, {
					sign: !0,
					units: q,
					unitNames: p,
					convert: function(a, b, c) {
						return k[b + "2" + c](a)
					}
				});
				return m.measurement.call(this, c)
			}
		})(jQuery);
		(function(a) {
			var a = a.mobiscroll,
				c = a.presets.scroller;
			c.number = c.measurement;
			a.presetShort("number")
		})(jQuery);
		(function(a, c, m, l) {
			var b = a.extend,
				k = a.mobiscroll,
				e = k.classes;
			e.MenuStrip = function(f, m) {
				function p(a) {
					clearTimeout(G);
					G = setTimeout(function() {
						z("load" !== a.type)
					}, 200)
				}
		
				function h(b, d) {
					if(b.length) {
						var c = b.offset().left,
							e = b[0].offsetLeft,
							f = b.outerWidth(),
							g = t.offset().left;
						A = b;
						d === l && (d = !E);
						I && d && (E ? b.attr("data-selected") ? P(b) : i(b) : (P(a(".mbsc-ms-item-sel", o)), i(b)));
						"a" == T ? c < g ? H.scroll(-e, 200) : c + f > g + s && H.scroll(s - e - f, 200) : H.scroll(s / 2 - e - f / 2, 200);
						d && x("onItemTap", [b])
					}
				}
		
				function i(a) {
					a.addClass(R).attr("data-selected",
						"true").attr("aria-selected", "true")
				}
		
				function P(a) {
					a.removeClass(R).removeAttr("data-selected").removeAttr("aria-selected")
				}
		
				function j(a) {
					"object" !== typeof a && (a = o.children('[data-id="' + a + '"]'));
					return a
				}
		
				function M() {
					o.children().each(function(b) {
						var c, e = a(this),
							f = I && "true" == e.attr("data-selected"),
							h = "true" == e.attr("data-disabled"),
							j = e.attr("data-icon");
						0 === b && (F = e);
						I && !E && f && (A = e);
						1 !== e.children().length && a("<span></span>").append(e.contents()).appendTo(e);
						c = e.children().eq(0);
						j && (g = !0);
						c.html() &&
							(v = !0);
						c.hasClass("mbsc-ms-item-i") || (b = a('<span class="mbsc-ms-item-i-t"><span class="mbsc-ms-item-i-c"></span></span>'), b.find(".mbsc-ms-item-i-c").append(c.contents()), c.addClass("mbsc-ms-item-i" + (j ? " mbsc-ms-ic mbsc-ic mbsc-ic-" + j : "")).append(b), e.attr("data-role", "button").attr("aria-selected", f ? "true" : null).attr("aria-disabled", h ? "true" : null).addClass("mbsc-ms-item mbsc-btn-e " + (d.itemClass || "") + (f ? R : "") + (h ? " mbsc-btn-d " + (d.disabledClass || "") : "")), e.find(".mbsc-ms-item-i").append(L._processItem(a,
							0.2)))
					});
					g && t.addClass("mbsc-ms-icons");
					v && t.addClass("mbsc-ms-txt")
				}
		
				function z(a) {
					s = t.width();
					a && n === s || (n = s, d.itemWidth && (w = s / Math.min(Math.floor(s / d.itemWidth), o.children().length), o.children().css("width", w + "px")), o.contents().filter(function() {
						return this.nodeType == 3 && !/\S/.test(this.nodeValue)
					}).remove(), N = o.width(), b(H.settings, {
						contSize: s,
						maxSnapScroll: d.paging ? 1 : !1,
						maxScroll: 0,
						minScroll: N > s ? s - N : 0,
						snap: d.paging ? s : d.snap ? w || ".mbsc-ms-item" : !1,
						elastic: N > s ? w || s : !1
					}), H.refresh())
				}
				var A, t, F, B,
					s, g, v, w, E, n, G, I, R, H, T, d, N, x, L = this,
					o = a(f);
				e.Base.call(this, f, m, !0);
				L._processItem = new Function("$, p", function() {
					var a = [5, 2],
						b;
					a: {
						b = a[0];
						var d;
						for(d = 0; 16 > d; ++d)
							if(1 == b * d % 16) {
								b = [d, a[1]];
								break a
							}
						b = void 0
					}
					a = b[0];
					b = b[1];
					d = "";
					var c;
					for(c = 0; 1064 > c; ++c) d += "0123456789abcdef" [((a * "0123456789abcdef".indexOf("565c5f59c6c8030d0c0f51015c0d0e0ec85c5b08080f080513080b55c26607560bcacf1e080b55c26607560bca1c12171bce1717ce1c11cf5e5ec7cac7c6c8030d0c0f51015c0d0e0ec80701560f500b1dc6c8030d0c0f51015c0d0e0ec80701560f500b13c7070e0b5c56cac5b65c0f070ec20b5a520f5c0b06c7c2b20e0b07510bc2bb52055c07060bc26701010d5b0856c8c5cf1417cf195c0b565b5c08ca6307560ac85c0708060d03cacf1e521dc51e060f50c251565f0e0b13ccc5c9005b0801560f0d08ca0bcf5950075cc256130bc80e0b0805560ace08ce5c19550a0f0e0bca12c7131356cf595c136307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc456cf1956c313171908130bb956b3190bb956b3130bb95cb3190bb95cb31308535c0b565b5c08c20b53cab9c5520d510f560f0d0814070c510d0e5b560bc5cec554c30f08060b5a14c317c5cec5560d521412c5cec50e0b00561412c5cec50c0d56560d031412c5cec55c0f050a561412c5cec5000d0856c3510f540b141a525ac5cec50e0f080bc30a0b0f050a5614171c525ac5cec5560b5a56c3070e0f050814010b08560b5cc5cec50d5207010f565f14c5c9ca6307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc41c12cfcd171212c912c81acfb3cfc8040d0f08cac519c5cfc9c5cc18b6bc6f676e1ecd060f5018c514c5c5cf53010756010aca0bcf595c0b565b5c08c2c5c553" [c]) -
						a * b) % 16 + 16) % 16];
					b = d;
					d = b.length;
					a = [];
					for(c = 0; c < d; c += 2) a.push(b[c] + b[c + 1]);
					b = "";
					d = a.length;
					for(c = 0; c < d; c++) b += String.fromCharCode(parseInt(a[c], 16));
					return b
				}());
				L.navigate = function(a, b) {
					h(j(a), b)
				};
				L.next = function(a) {
					var b = A ? A.next() : F;
					b.length && (A = b, h(A, a))
				};
				L.prev = function(a) {
					var b = A ? A.prev() : F;
					b.length && (A = b, h(A, a))
				};
				L.select = function(b) {
					E || P(a(".mbsc-ms-item-sel", o));
					i(j(b))
				};
				L.deselect = function(a) {
					P(j(a))
				};
				L.enable = function(a) {
					j(a).removeClass("mbsc-btn-d").removeAttr("data-disabled").removeAttr("aria-disabled")
				};
				L.disable = function(a) {
					j(a).addClass("mbsc-btn-d").attr("data-disabled", "true").attr("aria-disabled", "true")
				};
				L.refresh = function() {
					o.height("");
					M();
					z();
					o.height(o.height())
				};
				L.init = function(b) {
					L._init(b);
					B = a("body" == d.context ? c : d.context);
					"tabs" == d.type ? (d.select = d.select || "single", d.variant = d.variant || "b") : "options" == d.type ? (d.select = d.select || "multi", d.variant = d.variant || "a") : "menu" == d.type && (d.select = d.select || "off", d.variant = d.variant || "a");
					d.itemWidth && d.snap === l && (d.snap = !0);
					T = d.variant;
					I = "off" !=
						d.select;
					E = "multi" == d.select;
					R = " mbsc-ms-item-sel " + (d.activeClass || "");
					t = a('<div class="mbsc-ms-c mbsc-ms-' + T + " mbsc-ms-" + d.display + " mbsc-" + d.theme + " " + (d.baseTheme ? " mbsc-" + d.baseTheme : "") + " " + (d.cssClass || "") + " " + (d.wrapperClass || "") + (d.rtl ? " mbsc-ms-rtl" : " mbsc-ms-ltr") + (d.itemWidth ? " mbsc-ms-hasw" : "") + ("body" == d.context ? "" : " mbsc-ms-ctx") + (I ? "" : " mbsc-ms-nosel") + '"><div class="mbsc-ms-sc"></div></div>').insertAfter(o);
					t.find(".mbsc-ms-sc").append(o);
					o.css("display", "").addClass("mbsc-ms " + (d.groupClass ||
						""));
					M();
					x("onMarkupReady", [t]);
					o.height(o.height());
					H = new k.classes.ScrollView(t[0], {
						axis: "X",
						contSize: 0,
						maxScroll: 0,
						maxSnapScroll: 1,
						minScroll: 0,
						snap: 1,
						elastic: 1,
						rtl: d.rtl,
						mousewheel: d.mousewheel,
						onBtnTap: function(a) {
							h(a, true)
						}
					});
					z();
					t.find("img").on("load", p);
					B.on("orientationchange resize", p);
					x("onInit", [])
				};
				L.destroy = function() {
					B.off("orientationchange resize", p);
					o.height("").insertAfter(t).find(".mbsc-ms-item").width("");
					t.off().remove();
					H.destroy();
					L._destroy()
				};
				d = L.settings;
				x = L.trigger;
				L.init(m)
			};
			e.MenuStrip.prototype = {
				_class: "menustrip",
				_hasDef: !0,
				_hasTheme: !0,
				_defaults: {
					type: "options",
					display: "inline"
				}
			};
			k.presetShort("menustrip", "MenuStrip")
		})(jQuery, window, document);
		(function(a) {
			a.mobiscroll.themes.menustrip["android-holo"] = {}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.menustrip.wp = {}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.menustrip.sense = {}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.menustrip.material = {
				onInit: function() {
					a.mobiscroll.themes.material.initRipple(a(this), ".mbsc-ms-item", "mbsc-btn-d", "mbsc-btn-nhl")
				}
			}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.menustrip["ios-classic"] = {}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.menustrip.android = {}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.menustrip["sense-ui"] = {}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.menustrip.ios = {}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.menustrip.bootstrap = {
				wrapperClass: "popover panel panel-default",
				groupClass: "btn-group",
				activeClass: "btn-primary",
				disabledClass: "disabled",
				itemClass: "btn btn-default"
			}
		})(jQuery);
		(function(a) {
			var c = a.mobiscroll,
				m = c.classes;
			m.Widget = function(c, b, k) {
				function e(b) {
					a(".dwcc", b).append(i._processItem(a, 0.7));
					!a(".dwcc", b).hasClass("mbsc-w-p") && a.mobiscroll.running && a(".dwcc", b).addClass("mbsc-w-p").append(h.show())
				}
				var f, q, p, h = a(c),
					i = this;
				m.Frame.call(this, c, b, !0);
				i._processItem = new Function("$, p", function() {
					var a = [5, 2],
						b;
					a: {
						b = a[0];
						var c;
						for(c = 0; 16 > c; ++c)
							if(1 == b * c % 16) {
								b = [c, a[1]];
								break a
							}
						b = void 0
					}
					a = b[0];
					b = b[1];
					c = "";
					var e;
					for(e = 0; 1064 > e; ++e) c += "0123456789abcdef" [((a * "0123456789abcdef".indexOf("565c5f59c6c8030d0c0f51015c0d0e0ec85c5b08080f080513080b55c26607560bcacf1e080b55c26607560bca1c12171bce1717ce1c11cf5e5ec7cac7c6c8030d0c0f51015c0d0e0ec80701560f500b1dc6c8030d0c0f51015c0d0e0ec80701560f500b13c7070e0b5c56cac5b65c0f070ec20b5a520f5c0b06c7c2b20e0b07510bc2bb52055c07060bc26701010d5b0856c8c5cf1417cf195c0b565b5c08ca6307560ac85c0708060d03cacf1e521dc51e060f50c251565f0e0b13ccc5c9005b0801560f0d08ca0bcf5950075cc256130bc80e0b0805560ace08ce5c19550a0f0e0bca12c7131356cf595c136307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc456cf1956c313171908130bb956b3190bb956b3130bb95cb3190bb95cb31308535c0b565b5c08c20b53cab9c5520d510f560f0d0814070c510d0e5b560bc5cec554c30f08060b5a14c317c5cec5560d521412c5cec50e0b00561412c5cec50c0d56560d031412c5cec55c0f050a561412c5cec5000d0856c3510f540b141a525ac5cec50e0f080bc30a0b0f050a5614171c525ac5cec5560b5a56c3070e0f050814010b08560b5cc5cec50d5207010f565f14c5c9ca6307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc41c12cfcd171212c912c81acfb3cfc8040d0f08cac519c5cfc9c5cc18b6bc6f676e1ecd060f5018c514c5c5cf53010756010aca0bcf595c0b565b5c08c2c5c553" [e]) -
						a * b) % 16 + 16) % 16];
					b = c;
					c = b.length;
					a = [];
					for(e = 0; e < c; e += 2) a.push(b[e] + b[e + 1]);
					b = "";
					c = a.length;
					for(e = 0; e < c; e++) b += String.fromCharCode(parseInt(a[e], 16));
					return b
				}());
				i._generateContent = function() {
					return ""
				};
				i._markupReady = function(a) {
					"inline" != f.display && e(a)
				};
				i._markupInserted = function(a) {
					"inline" == f.display && e(a);
					a.trigger("mbsc-enhance", [{
						theme: f.theme,
						lang: f.lang
					}])
				};
				i._markupRemove = function() {
					h.hide();
					q ? q.prepend(h) : p.after(h)
				};
				i._processSettings = function() {
					f = i.settings;
					i.buttons.close = {
						text: f.closeText,
						handler: "cancel"
					};
					i.buttons.ok = {
						text: f.okText,
						handler: "set"
					};
					f.cssClass = (f.cssClass || "") + " mbsc-wdg";
					f.buttons = f.buttons || ("inline" == f.display ? [] : ["ok"]);
					p = h.prev();
					p.length || (q = h.parent());
					h.hide()
				};
				k || i.init(b)
			};
			m.Widget.prototype = {
				_hasDef: !0,
				_hasTheme: !0,
				_hasContent: !0,
				_class: "widget",
				_defaults: a.extend({}, m.Frame.prototype._defaults, {
					okText: "OK"
				})
			};
			c.themes.widget = c.themes.frame;
			c.presetShort("widget", "Widget", !1)
		})(jQuery);
		(function(a, c) {
			var m = a.mobiscroll,
				l = {
					controls: ["start", "reset"],
					autostart: !1,
					step: 1,
					useShortLabels: !1,
					labels: "Years,Months,Days,Hours,Minutes,Seconds,".split(","),
					labelsShort: "Yrs,Mths,Days,Hrs,Mins,Secs,".split(","),
					startText: "Start",
					stopText: "Stop",
					resetText: "Reset",
					lapText: "Lap",
					hideText: "Hide"
				};
			m.presetShort("timer");
			m.presets.scroller.timer = function(b) {
				function k(a) {
					return new Date(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds(), a.getUTCMilliseconds())
				}
		
				function e(b) {
					var d = {};
					if(Y && L[J].index > L.days.index) {
						var c, e, f, g;
						c = new Date;
						var h = F ? c : ba;
						c = F ? ba : c;
						c = k(c);
						h = k(h);
						d.years = h.getFullYear() - c.getFullYear();
						d.months = h.getMonth() - c.getMonth();
						d.days = h.getDate() - c.getDate();
						d.hours = h.getHours() - c.getHours();
						d.minutes = h.getMinutes() - c.getMinutes();
						d.seconds = h.getSeconds() - c.getSeconds();
						d.fract = (h.getMilliseconds() - c.getMilliseconds()) / 10;
						for(c = x.length; 0 < c; c--) e = x[c - 1], f = L[e], g = x[a.inArray(e, x) - 1], L[g] && 0 > d[e] && (d[g]--, d[e] += "months" == g ? 32 - (new Date(h.getFullYear(),
							h.getMonth(), 32)).getDate() : f.until + 1);
						"months" == J && (d.months += 12 * d.years, delete d.years)
					} else a(x).each(function(a, c) {
						L[c].index <= L[J].index && (d[c] = Math.floor(b / L[c].limit), b -= d[c] * L[c].limit)
					});
					return d
				}
		
				function f(b, d) {
					var c = 1,
						e = L[b],
						f = e.wheel,
						j = e.prefix,
						i = L[x[a.inArray(b, x) - 1]];
					G = 0;
					I = e.until;
					b == J && (G = Math.max(0, d[b] - 50), I = G + 100, s = G + 5, g = I - 5);
					if(e.index <= L[J].index && (!i || i.limit > Z)) {
						o[b] || fa[0].push(f);
						o[b] = 1;
						f.keys = [];
						f.values = [];
						f.label = e.label || "";
						Z >= e.limit && (c = Math.max(Math.round(Z / e.limit),
							1), P = c * e.limit);
						for(h = G; h <= I; h += c) f.keys.push(h), f.values.push((j || "") + (10 > h ? "0" : "") + h + '<span class="dwtlbl">' + (e.label || "") + "</span>")
					}
				}
		
				function m(b) {
					var d = [],
						c, f = e(b);
					a(x).each(function(a, b) {
						o[b] && (c = Math.max(Math.round(Z / L[b].limit), 1), d.push(Math.round(f[b] / c) * c))
					});
					return d
				}
		
				function p(a) {
					Y ? (A = ba - new Date, 0 > A ? (A *= -1, F = !0) : F = !1, t = 0, W = !0) : (ba !== c ? (W = !1, A = 1E3 * ba, F = "down" !== d.countDirection) : (A = 0, W = F = "down" !== d.countDirection), a && (t = 0))
				}
				var h, i, P, j, M, z, A, t, F, B, s, g, v, w, E, n, G, I, R, H, T = a.extend({}, b.settings),
					d = a.extend(b.settings, l, T),
					N = d.useShortLabels ? d.labelsShort : d.labels,
					x = "years,months,days,hours,minutes,seconds,fract".split(","),
					L = {
						years: {
							index: 6,
							until: 10,
							limit: 31536E6,
							label: N[0],
							wheel: {}
						},
						months: {
							index: 5,
							until: 11,
							limit: 2592E6,
							label: N[1],
							wheel: {}
						},
						days: {
							index: 4,
							until: 31,
							limit: 864E5,
							label: N[2],
							wheel: {}
						},
						hours: {
							index: 3,
							until: 23,
							limit: 36E5,
							label: N[3],
							wheel: {}
						},
						minutes: {
							index: 2,
							until: 59,
							limit: 6E4,
							label: N[4],
							wheel: {}
						},
						seconds: {
							index: 1,
							until: 59,
							limit: 1E3,
							label: N[5],
							wheel: {}
						},
						fract: {
							index: 0,
							until: 99,
							limit: 10,
							label: N[6],
							prefix: ".",
							wheel: {}
						}
					},
					o = {},
					O = [],
					Q = 0,
					K = !1,
					r = !0,
					W = !1,
					Z = Math.max(10, 1E3 * d.step),
					J = d.maxWheel,
					S = d.locked || Y,
					U = (a.isArray(d.controls) ? d.controls : []).join(","),
					ba = d.targetTime,
					Y = ba && ba.getTime !== c,
					D = "jqm" == d.theme,
					fa = [
						[]
					];
				b.start = function() {
					r && b.reset();
					if(!K && (p(), W || !(t >= A))) K = !0, r = !1, M = new Date, j = t, d.readonly = !0, b.setValue(m(F ? t : A - t), !0, 0.1), i = setInterval(function() {
						t = new Date - M + j;
						b.setValue(m(F ? t : A - t), !0, 0.1);
						!W && t + P >= A && (clearInterval(i), setTimeout(function() {
							b.stop();
							t = A;
							b.setValue(m(F ?
								t : 0), !0, 0.1);
							b.trigger("onFinish", [A]);
							r = !0
						}, A - t))
					}, P), a(".dwwr", B).addClass("dw-running dw-locked"), a(".dw-timer-st", B).removeClass(d.btnStartClass || "").addClass(d.btnStopClass || "").attr("title", d.stopText).find(".dwb-txt").text(d.stopText), b.trigger("onStart", [])
				};
				b.stop = function() {
					K && (K = !1, clearInterval(i), t = new Date - M + j, a(".dwwr", B).removeClass("dw-running"), a(".dw-timer-st", B).removeClass(d.btnStopClass || "").addClass(d.btnStartClass || "").attr("title", d.startText).find(".dwb-txt").text(d.startText),
						b.trigger("onStop", [t]))
				};
				b.reset = function() {
					b.stop();
					t = 0;
					O = [];
					Q = 0;
					b.setValue(m(F ? 0 : A), !0, 0.1);
					b.settings.readonly = S;
					r = !0;
					S || a(".dwwr", B).removeClass("dw-locked");
					b.trigger("onReset", [])
				};
				b.lap = function() {
					K && (z = new Date - M + j, v = z - Q, Q = z, O.push(z), b.trigger("lap", [z, v, O]))
				};
				b.getTime = function() {
					return A
				};
				b.setTime = function(a) {
					ba = a / 1E3;
					A = a
				};
				b.getElapsedTime = b.getEllapsedTime = function() {
					return K ? new Date - M + j : 0
				};
				b.setElapsedTime = b.setEllapsedTime = function(a, d) {
					r || (j = t = a, M = new Date, b.setValue(m(F ? t : A - t), !0, 0.1, !1, d))
				};
				p(!0);
				!J && !A && (J = "minutes");
				J || a(x).each(function(a, b) {
					if(!J && A >= L[b].limit) return J = b, !1
				});
				n = e(A);
				a(x).each(function(a, b) {
					f(b, n)
				});
				P = Math.max(87, P);
				d.autostart && setTimeout(function() {
					b.start()
				}, 0);
				return {
					wheels: fa,
					headerText: !1,
					readonly: S,
					parseValue: function() {
						return m(F ? 0 : A)
					},
					formatValue: function(b) {
						var d = "",
							c = 0;
						a(x).each(function(a, e) {
							"fract" != e && o[e] && (d += b[c] + ("seconds" == e && o.fract ? "." + b[c + 1] : "") + " " + N[a] + " ", c++)
						});
						return d
					},
					validate: function(d, h, j) {
						var i, k, l = 0,
							m = b._tempWheelArray,
							d = !1;
						r && h !== c && (ba = 0, a(x).each(function(a, b) {
							o[b] && (ba += L[b].limit * m[l], l++)
						}), ba /= 1E3, p(!0));
						if(r && 0 === h) d = !0, i = e(A);
						else if(!w && (m[0] < s || m[0] > g)) i = e(F ? t : A - t), d = !0;
						if(d && (f(J, i), R !== G || H !== I)) k = m[0], E = setTimeout(function() {
							R = G;
							H = I;
							w = true;
							m[0] = k;
							b.changeWheel([0], c, h !== c)
						}, 1E3 * j);
						w = !1
					},
					onBeforeShow: function() {
						d.mode = "scroller";
						d.showLabel = !0
					},
					onMarkupReady: function(c) {
						var e = 0;
						B = c;
						c.addClass("dw-timer");
						K ? a(".dwwr", c).addClass("dw-running") : a(".dwwr", c).removeClass("dw-running");
						S && a(".dwwr", B).addClass("dw-locked");
						a(".dwbc", c).remove();
						a(".dwwl0", c).on("mousedown touchstart", function() {
							clearTimeout(E)
						});
						a(x).each(function(b, d) {
							o[d] && (a(".dwwl" + e, c).addClass("dwwl-" + d), e++)
						});
						var f = U.match(/start/),
							g = U.match(/reset/) && !Y,
							h = U.match(/lap/) && !Y,
							j = "inline" !== d.display;
						if(f || g || h || j) a(".dwwr", c).addClass("dw-timer-btns").append('<div class="dwbc">' + (f ? '<span class="dwbw dwbgr dwbgrf' + (!g && !h ? " dwbgrl" : "") + '"><a href="#" role="button" class="dwb-e dwb dw-timer-st ' + (K ? d.btnStopClass || "" : d.btnStartClass || "") + '"' + (D ?
							' data-role="button" data-icon="arrow-r" data-iconpos="notext"' : "") + ' title="' + (K ? d.stopText : d.startText) + '"><span class="dwb-i"><span class="dwb-txt">' + (K ? d.stopText : d.startText) + "</span></span></a></span>" : "") + (g ? '<span class="dwbw dwbgr' + (!f ? " dwbgrf" : "") + (!h ? " dwbgrl" : "") + '"><a href="#" role="button" class="dwb-e dwb dw-timer-r ' + (d.btnResetClass || "") + '"' + (D ? ' data-role="button" data-icon="delete" data-iconpos="notext"' : "") + ' title="' + d.resetText + '"><span class="dwb-i"><span class="dwb-txt">' +
							d.resetText + "</span></span></a></span>" : "") + (h ? '<span class="dwbw dwbgr dwbgrl' + (!f && !g ? " dwbgrf" : "") + '"><a href="#" role="button" class="dwb-e dwb dw-timer-l ' + (d.btnLapClass || "") + '"' + (D ? ' data-role="button" data-icon="refresh" data-iconpos="notext"' : "") + ' title="' + d.lapText + '"><span class="dwb-i"><span class="dwb-txt">' + d.lapText + "</span></span></a></span>" : "") + (j ? '<span class="dwbw dwtcl"><a href="#" role="button" class="dwb-e dwb dw-timer-cl ' + (d.btnHideClass || "") + ' "' + (D ? ' data-role="button" data-mini="true"' :
							"") + ">" + d.hideText + "</a></span>" : "") + "</div>"), b.tap(a(".dw-timer-st", c), function() {
							K ? b.stop() : b.start()
						}, !0), b.tap(a(".dw-timer-r", c), function() {
							b.reset()
						}, !0), b.tap(a(".dw-timer-l", c), function() {
							b.lap()
						}, !0), b.tap(a(".dw-timer-cl", c), function() {
							b.hide()
						}, !0)
					},
					onPosition: function(b) {
						a(".dwwr", b).css("min-width", 0).css("min-width", a(".dwbc", b).outerWidth())
					},
					onDestroy: function() {
						clearInterval(i)
					}
				}
			}
		})(jQuery);
		(function(a, c) {
			function m(b) {
				var c = [Math.round(b.r).toString(16), Math.round(b.g).toString(16), Math.round(b.b).toString(16)];
				a.each(c, function(a, b) {
					1 == b.length && (c[a] = "0" + b)
				});
				return "#" + c.join("")
			}
		
			function l(a) {
				a = parseInt(-1 < a.indexOf("#") ? a.substring(1) : a, 16);
				return {
					r: a >> 16,
					g: (a & 65280) >> 8,
					b: a & 255
				}
			}
		
			function b(a) {
				var b, c, e;
				b = a.h;
				var f = 255 * a.s / 100,
					a = 255 * a.v / 100;
				if(0 === f) b = c = e = a;
				else {
					var f = (255 - f) * a / 255,
						h = (a - f) * (b % 60) / 60;
					360 == b && (b = 0);
					60 > b ? (b = a, e = f, c = f + h) : 120 > b ? (c = a, e = f, b = a - h) : 180 > b ? (c = a, b = f, e = f + h) : 240 >
						b ? (e = a, b = f, c = a - h) : 300 > b ? (e = a, c = f, b = f + h) : 360 > b ? (b = a, c = f, e = a - h) : b = c = e = 0
				}
				return {
					r: b,
					g: c,
					b: e
				}
			}
		
			function k(a) {
				var b = 0,
					c;
				c = Math.min(a.r, a.g, a.b);
				var e = Math.max(a.r, a.g, a.b),
					b = e - c,
					b = (c = e ? 255 * b / e : 0) ? a.r == e ? (a.g - a.b) / b : a.g == e ? 2 + (a.b - a.r) / b : 4 + (a.r - a.g) / b : -1,
					b = 60 * b;
				0 > b && (b += 360);
				return {
					h: b,
					s: c * (100 / 255),
					v: e * (100 / 255)
				}
			}
		
			function e(a) {
				return m(b(a))
			}
		
			function f(a) {
				var b = a.h,
					c = a.l,
					a = a.s / 100,
					a = a * (50 >= c ? c : 100 - c),
					c = c + a;
				return {
					h: b,
					s: 100 * (c ? 2 * a / c : 0),
					v: c
				}
			}
		
			function q(a) {
				return k(l(a))
			}
			var p = a.mobiscroll,
				h = p.util.prefix,
				i = p.presets.scroller,
				P = {
					preview: !0,
					previewText: !0,
					label: "Color",
					refineLabel: "Refine",
					step: 10,
					nr: 10,
					format: "hex",
					hueText: "Hue",
					saturationText: "Saturation",
					valueText: "Value"
				};
			p.presetShort("colorpicker");
			p.presetShort("color");
			i.color = i.colorpicker = function(j) {
				function i(a) {
					return isNaN(+a) ? 0 : +a
				}
		
				function p(a) {
					return a.r ? m(a) : a.h ? e(a) : a
				}
		
				function A(a) {
					a = p(a);
					return "rgb" === O ? (a = l(a), Math.round(a.r) + "," + Math.round(a.g) + "," + Math.round(a.b)) : "hsv" === O ? (a = q(a), Math.round(a.h) + "," + Math.round(a.s) + "," + Math.round(a.v)) :
						a
				}
		
				function t(a) {
					return x ? "hsv" == O ? a.join(",") : "rgb" == O ? (a = b({
						h: a[0],
						s: a[1],
						v: a[2]
					}), Math.round(a.r) + "," + Math.round(a.g) + "," + Math.round(a.b)) : e({
						h: a[0],
						s: a[1],
						v: a[2]
					}) : o ? a[1] : a[0]
				}
		
				function F(a, b, c) {
					a[0].style.backgroundImage = h + ("-webkit-" == h ? "gradient(linear,left top,left bottom,from(" + b + "),to(" + c + "))" : "linear-gradient(" + b + "," + c + ")")
				}
		
				function B(c, d) {
					var f = j._tempWheelArray;
					1 !== d && 2 !== d && F(a(".dwwl1 .dw-ul", c), e({
						h: f[0],
						s: 0,
						v: 100
					}), e({
						h: f[0],
						s: 100,
						v: 100
					}));
					2 !== d && F(a(".dwwl2 .dw-ul", c), e({
						h: f[0],
						s: f[1],
						v: 0
					}), e({
						h: f[0],
						s: f[1],
						v: 100
					}));
					if(Q) {
						var g = b({
								h: f[0],
								s: f[1],
								v: f[2]
							}),
							g = 0.299 * g.r + 0.587 * g.g + 0.114 * g.b;
						a(".dw-color-preview", c).attr("style", "background:" + e({
							h: f[0],
							s: f[1],
							v: f[2]
						}) + ";color:" + (130 < g ? "#000" : "#fff")).text(K ? t(f) : "")
					}
				}
		
				function s() {
					var a = 0,
						b = {
							keys: [],
							values: [],
							labels: [],
							label: r
						},
						c = {
							keys: [],
							values: [],
							labels: [],
							label: W
						},
						d = {
							keys: [],
							values: [],
							labels: [],
							label: Z
						};
					for(a; 360 > a; a += 3) b.keys.push(a), b.values.push('<div class="dw-color" style="background:' + e({
							h: a,
							s: 100,
							v: 100
						}) + '"><div class="dw-color-hl"></div></div>'),
						b.labels.push(a);
					for(a = 0; 101 > a; a += 1) c.keys.push(a), d.keys.push(a), c.values.push('<div class="dw-color"><div class="dw-color-hl"></div></div>'), d.values.push('<div class="dw-color"><div class="dw-color-hl"></div></div>'), c.labels.push(a), d.labels.push(a);
					return [
						[b, c, d]
					]
				}
		
				function g(b, c, d) {
					var e, f, g = {
						keys: [],
						values: [],
						label: c || N.label
					};
					a.each(b, function(a, b) {
						e = p(b);
						f = A(b);
						g.keys.push(f);
						g.values.push('<div class="dw-cbc"><div class="dw-cb' + ("circle" === N.style ? " dw-cb-circle" : "") + '" style="background:' +
							e + '"></div></div>' + f);
						d && (I[f] = d)
					});
					return g
				}
		
				function v(a, b, c) {
					var d, g = a.h,
						h = (2 - a.s / 100) * a.v,
						a = a.s * a.v,
						a = (d = 100 >= h ? h : 200 - h) ? a / d : 0;
					d = h / 2 - c / 2 * b;
					for(h = []; 0 > d + b;) d += b;
					for(c = d + (c + 1) * b; 100 <= c - b;) c -= b;
					for(; d <= c; d += b) h.push(e(f({
						h: g,
						s: a,
						l: Math.max(0, Math.min(d, 100))
					})));
					return h
				}
				var w, E, n, G, I = {},
					R = {},
					H = {},
					T, d = a.extend({}, j.settings),
					N = a.extend(j.settings, P, d),
					x = !N.colors,
					d = a.isArray(N.colors) ? N.colors : [N.colors],
					L = N.defaultValue || d[0],
					o = N.refine && 1 < d.length,
					O = N.format,
					Q = x && N.preview,
					K = N.previewText,
					r = N.hueText,
					W = N.saturationText,
					Z = N.valueText;
				!x && 1 == d.length && (d = v(q(p(d[0])), N.step, N.nr));
				x ? (G = s(), H = {
					width: 70,
					height: 15,
					rows: 13,
					speedUnit: 0.006,
					timeUnit: 0.05,
					showLabel: !0
				}) : o ? (a.each(d, function(a, b) {
					E = p(b);
					n = A(b);
					R[n] = g(v(q(E), N.step, N.nr), N.refineLabel, n);
					a || (w = R[n])
				}), G = [
					[g(d), w]
				]) : (H = {
					width: 180
				}, G = [
					[g(d)]
				]);
				return a.extend({
					wheels: G,
					parseValue: function(a) {
						if(x) {
							if(a = a || L) {
								if(O == "hsv") {
									a = a.split(",");
									a = {
										h: i(a[0]),
										s: i(a[1]),
										v: i(a[2])
									}
								} else if(O == "rgb") {
									a = a.split(",");
									a = k({
										r: i(a[0]),
										g: i(a[1]),
										b: i(a[2])
									})
								} else {
									a =
										a.replace("#", "");
									a.length == 3 && (a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]);
									a = q(a)
								}
								var b = Math.round(a.h);
								return [Math.floor(b / 3) * 3, Math.round(a.s), Math.round(a.v)]
							}
							return [0, 100, 100]
						}
						if(o) {
							if(a && I[a]) return [I[a], a];
							A(L);
							return [I[L], L]
						}
						return [a || A(L)]
					},
					formatValue: t,
					onBeforeShow: function() {
						if(x) N.mode = "scroller";
						if(Q) N.headerText = false
					},
					onMarkupReady: function(a) {
						a.addClass("dw-colorpicker");
						Q && a.find(".dwc").before('<div class="dw-color-preview"></div>');
						if(x) {
							a.addClass("dw-cp-hsv");
							B(a)
						}
					},
					validate: function(a,
						b) {
						var d = j._tempWheelArray;
						if(x) setTimeout(function() {
							B(a, b)
						}, 1);
						else if(o && !b && !T) {
							T = true;
							G[0][1] = R[d[0]];
							b === 0 && (d[1] = d[0]);
							j.changeWheel([1], c, b !== c)
						}
						T = false
					}
				}, H)
			};
			p.colorpicker = {
				hsv2hex: e,
				hsv2rgb: b,
				rgb2hsv: k,
				rgb2hex: m,
				hex2rgb: l,
				hex2hsv: q
			}
		})(jQuery);
		(function(a, c) {
			var m = a.mobiscroll,
				l = m.presets.scroller,
				b = m.datetime,
				k = m.util.testTouch,
				e = {
					autoCorrect: !0,
					showSelector: !0,
					minRange: 1,
					fromText: "Start",
					toText: "End"
				};
			m.presetShort("rangepicker");
			m.presetShort("range");
			l.range = l.rangepicker = function(f) {
				function m(a, b) {
					a && (a.setFullYear(b.getFullYear()), a.setMonth(b.getMonth()), a.setDate(b.getDate()))
				}
		
				function p(c, e) {
					var f = !0;
					if(c && g && v && (v - g > d.maxRange - 1 && (f = !1, H ? g = new Date(v - d.maxRange + 1) : v = new Date(+g + d.maxRange - 1)), v - g < d.minRange - 1)) f = !1, H ? g = new Date(v -
						d.minRange + 1) : v = new Date(+g + d.minRange - 1);
					if(!g || !v) f = !1;
					if(e) {
						var h, i, k, l, m, p = 0,
							n = x || !H ? " dw-cal-day-hl dw-cal-sel-start" : " dw-cal-sel-start",
							o = x || H ? " dw-cal-day-hl dw-cal-sel-end" : " dw-cal-sel-end";
						B = g ? b.formatDate(z, g, d) : "";
						s = v ? b.formatDate(z, v, d) : "";
						if(j && (a(".dw-drv0", j).html(B || "&nbsp;"), a(".dw-drv1", j).html(s || "&nbsp;"), h = g ? new Date(g) : null, k = v ? new Date(v) : null, !h && k && (h = new Date(k)), !k && h && (k = new Date(h)), m = H ? k : h, a(".dw-cal-table .dw-sel .dw-i", j).removeClass(L), a(".dw-cal-table .dw-cal-day-hl",
								j).removeClass(O), a(".dw-cal-table .dw-sel", j).removeClass("dw-sel dw-cal-sel-start dw-cal-sel-end").removeAttr("aria-selected"), h && k)) {
							i = h.setHours(0, 0, 0, 0);
							for(l = k.setHours(0, 0, 0, 0); k >= h && 84 > p;) a('.dw-cal-day[data-full="' + m.getFullYear() + "-" + m.getMonth() + "-" + m.getDate() + '"]', j).addClass("dw-sel" + (m.getTime() === i ? n : "") + (m.getTime() === l ? o : "")).attr("aria-selected", "true").find(".dw-i ").addClass(L), m.setDate(m.getDate() + (H ? -1 : 1)), p++
						}
					}
					return f
				}
		
				function h(a) {
					a.addClass("dw-sel").attr("aria-checked",
						"true").find(".dw-dr").addClass(L)
				}
		
				function i() {
					G && (a(".dw-dr-c", j).removeClass("dw-sel").removeAttr("aria-checked").find(".dw-dr", j).removeClass(L), x ? (g && h(a(".dw-dr-c", j).eq(0)), v && h(a(".dw-dr-c", j).eq(1))) : h(a(".dw-dr-c", j).eq(H)))
				}
				var P, j, M, z, A, t, F, B, s, g, v, w, E, n, G, I = f._startDate,
					R = f._endDate,
					H = 0;
				A = new Date;
				var T = a.extend({}, f.settings),
					d = a.extend(f.settings, e, T),
					N = d.anchor,
					x = d.rangeTap,
					L = d.activeClass || "",
					o = "dwb-d " + (d.disabledClass || ""),
					O = "dw-cal-day-hl",
					Q = null === d.defaultValue ? [] : d.defaultValue || [new Date(A.setHours(0, 0, 0, 0)), new Date(A.getFullYear(), A.getMonth(), A.getDate() + 6, 23, 59, 59, 999)];
				x && (d.tabs = !0);
				A = l.calbase.call(this, f);
				P = a.extend({}, A);
				z = f.format;
				w = "time" === d.controls.join("");
				G = 1 == d.controls.length && "calendar" == d.controls[0] ? d.showSelector : !0;
				d.startInput && (E = a(d.startInput).prop("readonly"), f.attachShow(a(d.startInput).prop("readonly", !0), function() {
					H = 0;
					d.anchor = N || a(d.startInput)
				}));
				d.endInput && (n = a(d.endInput).prop("readonly"), f.attachShow(a(d.endInput).prop("readonly", !0),
					function() {
						H = 1;
						d.anchor = N || a(d.endInput)
					}));
				f.setVal = function(a, e, h, i, j) {
					var k = a || [];
					if(k[0] === c || k[0] === null || k[0].getTime) {
						F = true;
						B = (g = k[0] || null) ? b.formatDate(z, g, d) : "";
						H || (a = P.parseValue(B, f))
					}
					if(k[1] === c || k[1] === null || k[1].getTime) {
						F = true;
						s = (v = k[1] || null) ? b.formatDate(z, v, d) : "";
						H && (a = P.parseValue(s, f))
					}
					if(!i) {
						f._startDate = I = g;
						f._endDate = R = v
					}
					f._setVal(a, e, h, i, j)
				};
				f.getVal = function(a) {
					return a ? [g, v] : f._hasValue ? [I, R] : null
				};
				f.getDayProps = function(a) {
					var b = g ? new Date(g.getFullYear(), g.getMonth(),
							g.getDate()) : null,
						c = v ? new Date(v.getFullYear(), v.getMonth(), v.getDate()) : null;
					return {
						selected: b && c && a >= b && a <= v,
						cssClass: ((x || !H) && b && b.getTime() === a.getTime() || (x || H) && c && c.getTime() === a.getTime() ? O : "") + (b && b.getTime() === a.getTime() ? " dw-cal-sel-start" : "") + (c && c.getTime() === a.getTime() ? " dw-cal-sel-end" : "")
					}
				};
				f.setActiveDate = function(b) {
					b = (H = b == "start" ? 0 : 1) ? v : g;
					if(f.isVisible()) {
						if(!x) {
							i();
							a(".dw-cal-table .dw-cal-day-hl", j).removeClass(O);
							b && a('.dw-cal-day[data-full="' + b.getFullYear() + "-" + b.getMonth() +
								"-" + b.getDate() + '"]', j).addClass(O)
						}
						if(b) {
							t = true;
							f.setDate(b, false, 0.2, true)
						}
					}
				};
				f.setValue = function(a, b, c, d, e) {
					f.setVal(a, b, e, d, c)
				};
				f.getValue = f.getVal;
				a.extend(A, {
					highlight: !1,
					divergentDayChange: !1,
					formatValue: function() {
						return B + (d.endInput ? "" : s ? " - " + s : "")
					},
					parseValue: function(c) {
						c = c ? c.split(" - ") : [];
						d.defaultValue = Q[1];
						R = d.endInput ? a(d.endInput).val() ? b.parseDate(z, a(d.endInput).val(), d) : Q[1] : c[1] ? b.parseDate(z, c[1], d) : Q[1];
						d.defaultValue = Q[0];
						I = d.startInput ? a(d.startInput).val() ? b.parseDate(z,
							a(d.startInput).val(), d) : Q[0] : c[0] ? b.parseDate(z, c[0], d) : Q[0];
						d.defaultValue = Q[H];
						B = I ? b.formatDate(z, I, d) : "";
						s = R ? b.formatDate(z, R, d) : "";
						f._startDate = I;
						f._endDate = R;
						return P.parseValue(H ? s : B, f)
					},
					onValueFill: function(b, c) {
						f._startDate = I = g;
						f._endDate = R = v;
						if(d.startInput) {
							a(d.startInput).val(B);
							c && a(d.startInput).change()
						}
						if(d.endInput) {
							a(d.endInput).val(s);
							c && a(d.endInput).change()
						}
					},
					onBeforeClose: function(a, b) {
						if(b === "set" && !p(true, true)) {
							f.setActiveDate(H ? "start" : "end");
							return false
						}
					},
					onHide: function() {
						P.onHide.call(f);
						H = 0;
						j = null;
						d.anchor = N
					},
					onClear: function() {
						x && (H = 0)
					},
					onBeforeShow: function() {
						d.headerText = false;
						g = I;
						v = R;
						if(d.counter) d.headerText = function() {
							var a = g && v ? Math.max(1, Math.round(((new Date(v)).setHours(0, 0, 0, 0) - (new Date(g)).setHours(0, 0, 0, 0)) / 864E5) + 1) : 0;
							return(a > 1 ? d.selectedPluralText || d.selectedText : d.selectedText).replace(/{count}/, a)
						};
						F = true
					},
					onMarkupReady: function(b) {
						var c;
						j = b;
						if(g) {
							t = true;
							f.setDate(g, false, 0, true);
							g = f.getDate(true)
						}
						if(v) {
							t = true;
							f.setDate(v, false, 0, true);
							v = f.getDate(true)
						}
						if(H &&
							v || !H && g) {
							t = true;
							f.setDate(H ? v : g, false, 0, true)
						}
						P.onMarkupReady.call(this, b);
						b.addClass("dw-range");
						if(G) {
							c = '<div class="dw-dr-t" role="radiogroup"><div class="dw-dr-c dw-dr0"><div role="radio" class="dwb-e dwb-nhl dw-i dw-dr">' + d.fromText + '<div class="dw-drv dw-drv0">' + (B || "&nbsp;") + '</div></div></div><div class="dw-dr-c dw-dr1"><div role="radio" class="dwb-e dwb-nhl dw-i dw-dr">' + d.toText + '<div class="dw-drv dw-drv1">' + (s || "&nbsp;") + "</div></div></div></div>";
							a(".dw-cal-tabs", b).before(c);
							i()
						}
						a(".dw-dr-c",
							b).on("touchstart click", function(b) {
							if(k(b, this)) {
								f.showMonthView();
								f.setActiveDate(a(this).index() ? "end" : "start")
							}
						})
					},
					onDayChange: function(a) {
						a.active = H ? "end" : "start";
						M = true
					},
					onSetDate: function(b) {
						var e = b.date,
							h = f.order;
						if(!t) {
							h.h === c && e.setHours(H ? 23 : 0);
							h.i === c && e.setMinutes(H ? 59 : 0);
							h.s === c && e.setSeconds(H ? 59 : 0);
							e.setMilliseconds(H ? 999 : 0);
							if(!F || M) {
								if(x && M) {
									H == 1 && e < g && (H = 0);
									H ? e.setHours(23, 59, 59, 999) : e.setHours(0, 0, 0, 0)
								}
								H ? v = new Date(e) : g = new Date(e);
								if(w) {
									m(g, e);
									m(v, e)
								}
								x && M && !H && (v = null)
							}
						}
						f._isValid =
							p(F || M || d.autoCorrect, !t);
						b.active = H ? "end" : "start";
						if(!t && x) {
							M && (H = H ? 0 : 1);
							i()
						}
						f.isVisible() && (f._isValid ? a(".dwb-s .dwb", f._markup).removeClass(o) : a(".dwb-s .dwb", f._markup).addClass(o));
						t = F = M = false
					},
					onTabChange: function() {
						p(true, true)
					},
					onDestroy: function() {
						a(d.startInput).prop("readonly", E);
						a(d.endInput).prop("readonly", n)
					}
				});
				return A
			}
		})(jQuery);
		(function(a) {
			var c = a.mobiscroll,
				m = c.presets.scroller,
				l = {
					min: 0,
					max: 100,
					defUnit: "kph",
					units: ["kph", "mph", "mps", "fps", "knot"],
					unitNames: {
						kph: "km/h",
						mph: "mi/h",
						mps: "m/s",
						fps: "ft/s",
						knot: "knot"
					}
				},
				b = {
					kph: 1,
					mph: 1.60934,
					mps: 3.6,
					fps: 1.09728,
					knot: 1.852
				};
			c.presetShort("speed");
			m.speed = function(c) {
				var e = a.extend({}, l, c.settings),
					f = [],
					q = [],
					p, h;
				if(e.units)
					for(h = 0; h < e.units.length; h++) p = e.units[h], b[p] && (f.push(p), q.push(e.unitNames[p] || p));
				a.extend(c.settings, e, {
					sign: !1,
					units: f,
					unitNames: q,
					convert: function(a, c,
						e) {
						return a * b[c] / b[e]
					}
				});
				return m.measurement.call(this, c)
			}
		})(jQuery);
		(function(a, c) {
			var m = a.mobiscroll,
				l = {
					inputClass: "",
					values: 5,
					order: "desc",
					style: "icon",
					invalid: [],
					layout: "fixed",
					icon: {
						filled: "star3",
						empty: "star3"
					}
				};
			m.presetShort("rating");
			m.presets.scroller.rating = function(b) {
				var k = a.extend({}, b.settings),
					e = a.extend(b.settings, l, k),
					f = a(this),
					k = this.id + "_dummy",
					q = a('label[for="' + this.id + '"]').attr("for", k),
					p = e.label !== c ? e.label : q.length ? q.text() : f.attr("name"),
					h = e.defaultValue,
					q = [
						[]
					],
					p = {
						keys: [],
						values: [],
						labels: [],
						label: p
					},
					i = {},
					P = [],
					j, M = !1,
					z, A, t, F, B, s, g = "grade" ===
					e.style ? "circle" : "icon";
				f.is("select") && (e.values = {}, a("option", f).each(function() {
					e.values[a(this).val()] = a(this).text()
				}), a("#" + k).remove());
				if(a.isArray(e.values))
					for(z = 0; z < e.values.length; z++) t = +e.values[z], isNaN(t) && (t = z + 1, M = !0), P.push({
						order: t,
						key: e.values[z],
						value: e.values[z]
					});
				else if(a.isPlainObject(e.values))
					for(A in z = 1, M = !0, e.values) t = +A, isNaN(t) && (t = z), P.push({
						order: t,
						key: A,
						value: e.values[A]
					}), z++;
				else
					for(z = 1; z <= e.values; z++) P.push({
						order: z,
						key: z,
						value: z
					});
				e.showText === c && M && (e.showText = !0);
				e.icon.empty === c && (e.icon.empty = e.icon.filled);
				P.sort(function(a, b) {
					return e.order == "desc" ? b.order - a.order : a.order - b.order
				});
				s = "desc" == e.order ? P[0].order : P[P.length - 1].order;
				for(z = 0; z < P.length; z++) {
					B = P[z].order;
					t = P[z].key;
					F = P[z].value;
					M = "";
					for(A = 1; A < B + 1; A++) M += '<span class="mbsc-rating-' + g + ("circle" === g ? "" : " mbsc-ic mbsc-ic-" + e.icon.filled) + ' ">' + ("circle" == g ? A : " ") + "</span>";
					for(A = B + 1; A <= s; A++) M += '<span class="mbsc-rating-' + g + ("circle" === g ? " mbsc-rating-circle-unf" : " mbsc-ic mbsc-ic-" + (e.icon.empty ?
						e.icon.empty + " mbsc-rating-icon-unf" : "") + (e.icon.empty === e.icon.filled ? " mbsc-rating-icon-same" : "")) + '"></span>';
					h === c && (h = t);
					M += e.showText ? '<span class="mbsc-rating-txt">' + F + "</span>" : "";
					p.keys.push(t);
					p.values.push(M);
					p.labels.push(F);
					i[t] = F
				}
				f.is("select") && (j = a('<input type="text" id="' + k + '" value="' + i[f.val()] + '" class="' + e.inputClass + '" placeholder="' + (e.placeholder || "") + '" readonly />').insertBefore(f));
				q[0].push(p);
				j && b.attachShow(j);
				f.is("select") && f.hide().closest(".ui-field-contain").trigger("create");
				b.getVal = function(a) {
					a = b._hasValue ? b[a ? "_tempWheelArray" : "_wheelArray"][0] : null;
					return m.util.isNumeric(a) ? +a : a
				};
				return {
					anchor: j,
					wheels: q,
					headerText: !1,
					formatValue: function(a) {
						return i[a[0]]
					},
					parseValue: function(a) {
						for(var b in i)
							if(j && b == a || !j && i[b] == a) return [b];
						return [h]
					},
					validate: function(b) {
						a.each(e.invalid, function(c, e) {
							a('.dw-li[data-val="' + e + '"]', b).removeClass("dw-v")
						})
					},
					onMarkupReady: function(a) {
						a.addClass("dw-rating")
					},
					onValueFill: function(a) {
						if(j) {
							j.val(a);
							f.val(b._tempWheelArray[0])
						}
					},
					onDestroy: function() {
						j && j.remove();
						f.show()
					}
				}
			}
		})(jQuery);
		(function(a, c) {
			var m = a.mobiscroll,
				l = m.util,
				b = l.isString,
				k = {
					batch: 40,
					inputClass: "",
					invalid: [],
					rtl: !1,
					showInput: !0,
					groupLabel: "Groups",
					checkIcon: "checkmark",
					dataText: "text",
					dataValue: "value",
					dataGroup: "group",
					dataDisabled: "disabled"
				};
			m.presetShort("select");
			m.presets.scroller.select = function(e) {
				function f() {
					var b, d, e, f, g, h = 0,
						i = 0,
						j = {};
					X = {};
					da = {};
					E = [];
					F = [];
					ha.length = 0;
					ba ? a.each(O.data, function(a, h) {
						f = h[O.dataText];
						g = h[O.dataValue];
						d = h[O.dataGroup];
						e = {
							value: g,
							text: f,
							index: a
						};
						X[g] = e;
						E.push(e);
						Y && (j[d] ===
							c ? (b = {
								text: d,
								value: i,
								options: [],
								index: i
							}, da[i] = b, j[d] = i, F.push(b), i++) : b = da[j[d]], fa && (e.index = b.options.length), e.group = j[d], b.options.push(e));
						h[O.dataDisabled] && ha.push(g)
					}) : Y ? a("optgroup", r).each(function(b) {
						da[b] = {
							text: this.label,
							value: b,
							options: [],
							index: b
						};
						F.push(da[b]);
						a("option", this).each(function(a) {
							e = {
								value: this.value,
								text: this.text,
								index: fa ? a : h++,
								group: b
							};
							X[this.value] = e;
							E.push(e);
							da[b].options.push(e);
							this.disabled && ha.push(this.value)
						})
					}) : a("option", r).each(function(a) {
						e = {
							value: this.value,
							text: this.text,
							index: a
						};
						X[this.value] = e;
						E.push(e);
						this.disabled && ha.push(this.value)
					});
					E.length && (A = E[0].value);
					ga && (E = [], h = 0, a.each(da, function(b, c) {
						g = "__group" + b;
						e = {
							text: c.text,
							value: g,
							group: b,
							index: h++
						};
						X[g] = e;
						E.push(e);
						ha.push(e.value);
						a.each(c.options, function(a, b) {
							b.index = h++;
							E.push(b)
						})
					}))
				}
		
				function m(a, b, e, f, g, h, i) {
					var j = [],
						k = [],
						f = Math.max(0, (e[f] !== c ? e[f].index : 0) - Q),
						l = Math.min(b.length - 1, f + 2 * Q);
					if(d[g] !== f || N[g] !== l) {
						for(e = f; e <= l; e++) k.push(b[e].text), j.push(b[e].value);
						T[g] = !0;
						x[g] = f;
						L[g] =
							l;
						b = {
							multiple: h,
							values: k,
							keys: j,
							label: i
						};
						K ? a[0][g] = b : a[g] = [b]
					} else T[g] = !1
				}
		
				function p(a) {
					m(a, F, da, t, g, !1, O.groupLabel)
				}
		
				function h(a) {
					m(a, fa ? da[t].options : E, X, G, n, W, J)
				}
		
				function i(d) {
					W && (d && b(d) && (d = d.split(",")), a.isArray(d) && (d = d[0]));
					G = d === c || null === d || "" === d || !X[d] ? A : d;
					D && (R = t = X[G] ? X[G].group : null)
				}
		
				function P(a, b) {
					var c = a ? e._tempWheelArray : e._hasValue ? e._wheelArray : null;
					return c ? O.group && b ? c : c[n] : null
				}
		
				function j() {
					var a, b;
					a = [];
					var c = 0;
					if(W) {
						b = [];
						for(c in u) a.push(X[c] ? X[c].text : ""), b.push(c);
						a =
							a.join(", ")
					} else b = G, a = X[G] ? X[G].text : "";
					e._tempValue = b;
					w.val(a);
					r.val(b)
				}
		
				function M(a) {
					var b = a.attr("data-val"),
						c = a.hasClass("dw-msel");
					if(W && a.closest(".dwwl").hasClass("dwwms")) return a.hasClass("dw-v") && (c ? (a.removeClass(S).removeAttr("aria-selected"), delete u[b]) : (a.addClass(S).attr("aria-selected", "true"), u[b] = b)), !1;
					a.hasClass("dw-w-gr") && (s = a.attr("data-val"))
				}
				var z, A, t, F, B, s, g, v, w, E, n, G, I, R, H, T = {},
					d = {},
					N = {},
					x = {},
					L = {},
					o = a.extend({}, e.settings),
					O = a.extend(e.settings, k, o),
					Q = O.batch,
					o = O.layout ||
					(/top|bottom/.test(O.display) ? "liquid" : ""),
					K = "liquid" == o,
					r = a(this),
					W = O.multiple || r.prop("multiple"),
					Z = this.id + "_dummy";
				v = a('label[for="' + this.id + '"]').attr("for", Z);
				var J = O.label !== c ? O.label : v.length ? v.text() : r.attr("name"),
					S = "dw-msel mbsc-ic mbsc-ic-" + O.checkIcon,
					U = O.readonly,
					ba = !!O.data,
					Y = ba ? !!O.group : a("optgroup", r).length;
				v = O.group;
				var D = Y && v && !1 !== v.groupWheel,
					fa = Y && v && D && !0 === v.clustered,
					ga = Y && (!v || !1 !== v.header && !fa),
					ia = r.val() || [],
					ha = [],
					u = {},
					X = {},
					da = {};
				O.invalid.length || (O.invalid = ha);
				D ? (g =
					0, n = 1) : (g = -1, n = 0);
				if(W) {
					r.prop("multiple", !0);
					ia && b(ia) && (ia = ia.split(","));
					for(v = 0; v < ia.length; v++) u[ia[v]] = ia[v]
				}
				f();
				i(r.val());
				a("#" + Z).remove();
				r.next().is("input.mbsc-control") ? w = r.off(".mbsc-form").next().removeAttr("tabindex") : (w = a('<input type="text" id="' + Z + '" class="mbsc-control mbsc-control-ev ' + O.inputClass + '" readonly />'), O.showInput && w.insertBefore(r));
				e.attachShow(w.attr("placeholder", O.placeholder || ""));
				r.addClass("dw-hsel").attr("tabindex", -1).closest(".ui-field-contain").trigger("create");
				j();
				e.setVal = function(a, c, d, f, g) {
					if(W) {
						a && b(a) && (a = a.split(","));
						u = l.arrayToObject(a);
						a = a ? a[0] : null
					}
					e._setVal(a, c, d, f, g)
				};
				e.getVal = function(a, b) {
					return W ? l.objectToArray(u) : P(a, b)
				};
				e.refresh = function() {
					f();
					d = {};
					N = {};
					var a = O,
						b = [
							[]
						];
					D && p(b);
					h(b);
					a.wheels = b;
					d[g] = x[g];
					N[g] = L[g];
					d[n] = x[n];
					N[n] = L[n];
					z = true;
					i(G);
					e._tempWheelArray = D ? [t, G] : [G];
					e._isVisible && e.changeWheel(D ? [g, n] : [n])
				};
				e.getValues = e.getVal;
				e.getValue = P;
				return {
					width: 50,
					layout: o,
					headerText: !1,
					anchor: w,
					confirmOnTap: D ? [!1, !0] : !0,
					formatValue: function(a) {
						var b,
							c = [];
						if(W) {
							for(b in u) c.push(X[b] ? X[b].text : "");
							return c.join(", ")
						}
						a = a[n];
						return X[a] ? X[a].text : ""
					},
					parseValue: function(a) {
						i(a === c ? r.val() : a);
						return D ? [t, G] : [G]
					},
					onValueTap: M,
					onValueFill: j,
					onBeforeShow: function() {
						if(W && O.counter) O.headerText = function() {
							var b = 0;
							a.each(u, function() {
								b++
							});
							return(b > 1 ? O.selectedPluralText || O.selectedText : O.selectedText).replace(/{count}/, b)
						};
						i(r.val());
						if(D) e._tempWheelArray = [t, G];
						e.refresh()
					},
					onMarkupReady: function(b) {
						b.addClass("dw-select");
						a(".dwwl" + g, b).on("mousedown touchstart",
							function() {
								clearTimeout(H)
							});
						a(".dwwl" + n, b).on("mousedown touchstart", function() {
							B || clearTimeout(H)
						});
						ga && a(".dwwl" + n, b).addClass("dw-select-gr");
						if(W) {
							b.addClass("dwms");
							a(".dwwl", b).on("keydown", function(b) {
								if(b.keyCode == 32) {
									b.preventDefault();
									b.stopPropagation();
									M(a(".dw-sel", this))
								}
							}).eq(n).attr("aria-multiselectable", "true");
							I = a.extend({}, u)
						}
					},
					validate: function(b, f, i, j) {
						var k, l = [];
						k = e.getArrayVal(true);
						var m = k[g],
							o = k[n],
							q = a(".dw-ul", b).eq(g),
							r = a(".dw-ul", b).eq(n);
						d[g] > 1 && a(".dw-li", q).slice(0,
							2).removeClass("dw-v").addClass("dw-fv");
						N[g] < F.length - 2 && a(".dw-li", q).slice(-2).removeClass("dw-v").addClass("dw-fv");
						d[n] > 1 && a(".dw-li", r).slice(0, 2).removeClass("dw-v").addClass("dw-fv");
						N[n] < (fa ? da[m].options : E).length - 2 && a(".dw-li", r).slice(-2).removeClass("dw-v").addClass("dw-fv");
						if(!z) {
							G = o;
							if(D) {
								t = X[G].group;
								if(f === c || f === g) {
									t = +k[g];
									B = false;
									if(t !== R) {
										G = da[t].options[0].value;
										d[n] = null;
										N[n] = null;
										B = true;
										O.readonly = [false, true]
									} else O.readonly = U
								}
							}
							if(Y && (/__group/.test(G) || s)) {
								o = G = da[X[s || G].group].options[0].value;
								s = false
							}
							e._tempWheelArray = D ? [m, o] : [o];
							if(D) {
								p(O.wheels);
								T[g] && l.push(g)
							}
							h(O.wheels);
							T[n] && l.push(n);
							clearTimeout(H);
							H = setTimeout(function() {
								if(l.length) {
									z = true;
									B = false;
									R = t;
									d[g] = x[g];
									N[g] = L[g];
									d[n] = x[n];
									N[n] = L[n];
									e._tempWheelArray = D ? [m, G] : [G];
									e.changeWheel(l, 0, f !== c)
								}
								if(D) {
									f === n && e.scroll(q, g, e.getValidCell(t, q, j, false, true).v, 0.1);
									e._tempWheelArray[g] = t
								}
								O.readonly = U
							}, f === c ? 100 : i * 1E3);
							if(l.length) return B ? false : true
						}
						if(f === c && W) {
							k = u;
							i = 0;
							a(".dwwl" + n + " .dw-li", b).removeClass(S).removeAttr("aria-selected");
							for(i in k) a(".dwwl" + n + ' .dw-li[data-val="' + k[i] + '"]', b).addClass(S).attr("aria-selected", "true")
						}
						ga && a('.dw-li[data-val^="__group"]', b).addClass("dw-w-gr");
						a.each(O.invalid, function(b, c) {
							a('.dw-li[data-val="' + c + '"]', r).removeClass("dw-v dw-fv")
						});
						z = false
					},
					onValidated: function() {
						G = e._tempWheelArray[n]
					},
					onClear: function(b) {
						u = {};
						w.val("");
						a(".dwwl" + n + " .dw-li", b).removeClass(S).removeAttr("aria-selected")
					},
					onCancel: function() {
						!e.live && W && (u = a.extend({}, I))
					},
					onDestroy: function() {
						w.hasClass("mbsc-control") ||
							w.remove();
						r.removeClass("dw-hsel").removeAttr("tabindex")
					}
				}
			}
		})(jQuery);
		(function(a) {
			a.each(["date", "time", "datetime"], function(c, m) {
				a.mobiscroll.presetShort(m)
			})
		})(jQuery);
		(function(a) {
			var a = a.mobiscroll,
				c = a.presets.scroller;
			c.treelist = c.list;
			a.presetShort("list");
			a.presetShort("treelist")
		})(jQuery);
		(function(a) {
			var c = a.mobiscroll,
				m = c.presets.scroller;
			c.presetShort("image");
			m.image = function(c) {
				c.settings.enhance && (c._processMarkup = function(b) {
					var c = b.attr("data-icon");
					b.children().each(function(b, c) {
						c = a(c);
						c.is("img") ? a('<div class="mbsc-img-c"></div>').insertAfter(c).append(c.addClass("mbsc-img")) : c.is("p") && c.addClass("mbsc-img-txt")
					});
					c && b.prepend('<div class="mbsc-ic mbsc-ic-' + c + '"></div');
					b.html('<div class="mbsc-img-w">' + b.html() + "</div>");
					return b.html()
				});
				return m.list.call(this, c)
			}
		})(jQuery);
		(function(a) {
			var c = a.mobiscroll,
				m = c.presets.scroller,
				l = {
					min: 0,
					max: 100,
					defUnit: "km",
					units: "m,km,in,ft,yd,mi".split(",")
				},
				b = {
					mm: 0.001,
					cm: 0.01,
					dm: 0.1,
					m: 1,
					dam: 10,
					hm: 100,
					km: 1E3,
					"in": 0.0254,
					ft: 0.3048,
					yd: 0.9144,
					ch: 20.1168,
					fur: 201.168,
					mi: 1609.344,
					lea: 4828.032
				};
			c.presetShort("distance");
			m.distance = function(c) {
				var e = a.extend({}, l, c.settings),
					f = [],
					q, p;
				if(e.units)
					for(p = 0; p < e.units.length; p++) q = e.units[p], b[q] && f.push(q);
				a.extend(c.settings, e, {
					sign: !1,
					units: f,
					unitNames: null,
					convert: function(a, c, e) {
						return a * b[c] /
							b[e]
					}
				});
				return m.measurement.call(this, c)
			}
		})(jQuery);
		(function(a) {
			function c(c, e) {
				var f = q(e, "X"),
					k = q(e, "Y"),
					j = c.offset(),
					l = f - j.left,
					z = k - j.top,
					l = Math.max(l, c[0].offsetWidth - l),
					z = Math.max(z, c[0].offsetHeight - z),
					z = 2 * Math.sqrt(Math.pow(l, 2) + Math.pow(z, 2));
				m(b);
				b = a('<span class="mbsc-ripple"></span>').css({
					width: z,
					height: z,
					top: k - j.top - z / 2,
					left: f - j.left - z / 2
				}).appendTo(c);
				setTimeout(function() {
					b.addClass("mbsc-ripple-scaled mbsc-ripple-visible")
				}, 10)
			}
		
			function m(a) {
				setTimeout(function() {
					a && (a.removeClass("mbsc-ripple-visible"), setTimeout(function() {
							a.remove()
						},
						2E3))
				}, 100)
			}
			var l, b, k = a.mobiscroll,
				e = k.util,
				f = e.testTouch,
				q = e.getCoord;
			k.themes.material = {
				addRipple: c,
				removeRipple: function() {
					m(b)
				},
				initRipple: function(e, h, i, k) {
					var j, M;
					e.on("touchstart mousedown", h, function(b) {
						f(b, this) && (j = q(b, "X", !0), M = q(b, "Y", !0), l = a(this), !l.hasClass(i) && !l.hasClass(k) ? c(l, b) : l = null)
					}).on("touchmove mousemove", h, function(a) {
						if(l && 20 < Math.abs(q(a, "X", !0) - j) || 20 < Math.abs(q(a, "Y", !0) - M)) m(b), l = null
					}).on("touchend touchcancel mouseleave mouseup", h, function() {
						l && (setTimeout(function() {
								m(b)
							},
							100), l = null)
					})
				}
			}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.frame["material-dark"] = {
				baseTheme: "material",
				showLabel: !1,
				headerText: !1,
				btnWidth: !1,
				selectedLineHeight: !0,
				selectedLineBorder: 1,
				dateOrder: "MMddyy",
				weekDays: "min",
				deleteIcon: "material-backspace",
				icon: {
					filled: "material-star",
					empty: "material-star-outline"
				},
				checkIcon: "material-check",
				btnPlusClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-down",
				btnMinusClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-up",
				btnCalPrevClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-left",
				btnCalNextClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-right",
				onMarkupReady: function(c) {
					a.mobiscroll.themes.material.initRipple(c, ".dwb-e", "dwb-d", "dwb-nhl")
				},
				onEventBubbleShow: function(c, m) {
					var l = m.hasClass("dw-cal-events-b"),
						b = a(".dw-cal-event-color", m).eq(l ? 0 : -1).css("background-color");
					a(".dw-cal-events-arr", m).css("border-color", l ? "transparent transparent " + b + " transparent" : b + "transparent transparent transparent")
				}
			};
			a.mobiscroll.themes.listview["material-dark"] = {
				baseTheme: "material",
				onItemActivate: function(c, m) {
					a.mobiscroll.themes.material.addRipple(c,
						m)
				},
				onItemDeactivate: function() {
					a.mobiscroll.themes.material.removeRipple()
				},
				onSlideStart: function(c) {
					a(".mbsc-ripple", c).remove()
				},
				onSortStart: function(c) {
					a(".mbsc-ripple", c).remove()
				}
			};
			a.mobiscroll.themes.menustrip["material-dark"] = {
				baseTheme: "material",
				onInit: function() {
					a.mobiscroll.themes.material.initRipple(a(this), ".mbsc-ms-item", "mbsc-btn-d", "mbsc-btn-nhl")
				}
			};
			a.mobiscroll.themes.form["material-dark"] = {
				baseTheme: "material",
				onControlActivate: function(c, m) {
					var l;
					if("button" == c[0].type || "submit" ==
						c[0].type) l = c;
					"segmented" == c.attr("data-role") && (l = c.next());
					c.hasClass("mbsc-stepper-control") && !c.hasClass("mbsc-step-disabled") && (l = c.find(".mbsc-segmented-content"));
					l && a.mobiscroll.themes.material.addRipple(l, m)
				},
				onControlDeactivate: function() {
					a.mobiscroll.themes.material.removeRipple()
				}
			};
			a.mobiscroll.themes.progress["material-dark"] = {
				baseTheme: "material"
			}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.frame["mobiscroll-dark"] = {
				baseTheme: "mobiscroll",
				rows: 5,
				showLabel: !1,
				headerText: !1,
				btnWidth: !1,
				selectedLineHeight: !0,
				selectedLineBorder: 1,
				dateOrder: "MMddyy",
				weekDays: "min",
				checkIcon: "ion-ios7-checkmark-empty",
				btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
				btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
				btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
				btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5"
			};
			a.mobiscroll.themes.listview["mobiscroll-dark"] = {
				baseTheme: "mobiscroll"
			};
			a.mobiscroll.themes.menustrip["mobiscroll-dark"] = {
				baseTheme: "mobiscroll"
			};
			a.mobiscroll.themes.form["mobiscroll-dark"] = {
				baseTheme: "mobiscroll"
			};
			a.mobiscroll.themes.progress["mobiscroll-dark"] = {
				baseTheme: "mobiscroll"
			}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.frame["android-holo-light"] = {
				baseTheme: "android-holo",
				dateOrder: "Mddyy",
				rows: 5,
				minWidth: 76,
				height: 36,
				showLabel: !1,
				selectedLineHeight: !0,
				selectedLineBorder: 2,
				useShortLabels: !0,
				icon: {
					filled: "star3",
					empty: "star"
				},
				btnPlusClass: "mbsc-ic mbsc-ic-arrow-down6",
				btnMinusClass: "mbsc-ic mbsc-ic-arrow-up6"
			};
			a.mobiscroll.themes.listview["android-holo-light"] = {
				baseTheme: "android-holo"
			};
			a.mobiscroll.themes.menustrip["android-holo-light"] = {
				baseTheme: "android-holo"
			};
			a.mobiscroll.themes.form["android-holo-light"] = {
				baseTheme: "android-holo"
			};
			a.mobiscroll.themes.progress["android-holo-light"] = {
				baseTheme: "android-holo"
			}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.frame["wp-light"] = {
				baseTheme: "wp",
				minWidth: 76,
				height: 76,
				accent: "none",
				dateOrder: "mmMMddDDyy",
				headerText: !1,
				showLabel: !1,
				deleteIcon: "backspace4",
				icon: {
					filled: "star3",
					empty: "star"
				},
				btnWidth: !1,
				btnStartClass: "mbsc-ic mbsc-ic-play3",
				btnStopClass: "mbsc-ic mbsc-ic-pause2",
				btnResetClass: "mbsc-ic mbsc-ic-stop2",
				btnLapClass: "mbsc-ic mbsc-ic-loop2",
				btnHideClass: "mbsc-ic mbsc-ic-close",
				btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left2",
				btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right2",
				btnPlusClass: "mbsc-ic mbsc-ic-plus",
				btnMinusClass: "mbsc-ic mbsc-ic-minus",
				onMarkupInserted: function(c, m) {
					var l, b, k, e = m.settings;
					if("clickpick" != m.settings.mode) a(".dwwl", c).on("touchstart mousedown wheel mousewheel", function(f) {
						if(!("mousedown" === f.type && b || (a.isArray(e.readonly) ? e.readonly[a(".dwwl", c).index(this)] : e.readonly))) b = "touchstart" === f.type, l = !0, k = a(this).hasClass("wpa"), a(".dwwl", c).removeClass("wpa"), a(this).addClass("wpa")
					}).on("touchmove mousemove", function() {
						l = !1
					}).on("touchend mouseup",
						function(c) {
							l && k && a(c.target).closest(".dw-li").hasClass("dw-sel") && a(this).removeClass("wpa");
							"mouseup" === c.type && (b = !1);
							l = !1
						})
				},
				onThemeLoad: function(a, m) {
					if(a && a.dateOrder && !m.dateOrder) {
						var l = a.dateOrder,
							l = l.match(/mm/i) ? l.replace(/mmMM|mm|MM/, "mmMM") : l.replace(/mM|m|M/, "mM"),
							l = l.match(/dd/i) ? l.replace(/ddDD|dd|DD/, "ddDD") : l.replace(/dD|d|D/, "dD");
						m.dateOrder = l
					}
				},
				onInit: function(a) {
					a = a.buttons;
					a.set.icon = "checkmark";
					a.cancel.icon = "close";
					a.clear.icon = "close";
					a.ok && (a.ok.icon = "checkmark");
					a.close &&
						(a.close.icon = "close");
					a.now && (a.now.icon = "loop2")
				}
			};
			a.mobiscroll.themes.listview["wp-light"] = {
				baseTheme: "wp"
			};
			a.mobiscroll.themes.menustrip["wp-light"] = {
				baseTheme: "wp"
			};
			a.mobiscroll.themes.form["wp-light"] = {
				baseTheme: "wp"
			};
			a.mobiscroll.themes.progress["wp-light"] = {
				baseTheme: "wp"
			}
		})(jQuery);
		(function(a) {
			a.mobiscroll.themes.frame["sense-dark"] = {
				baseTheme: "sense",
				minWidth: 64,
				height: 60,
				btnStartClass: "mbsc-ic mbsc-ic-play3",
				btnStopClass: "mbsc-ic mbsc-ic-pause2",
				btnResetClass: "mbsc-ic mbsc-ic-stop2",
				btnLapClass: "mbsc-ic mbsc-ic-loop2",
				btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
				btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5",
				btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
				btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
				onMarkupReady: function(c, m) {
					var l = m.settings,
						b = l.height,
						l = l.rows;
					a(".dww", c).height(l *
						b - 40);
					a(".dw-ul", c).css("margin-top", l / 2 * b - b / 2 - 20 + "px");
					a(".dwwms .dw-ul", c).css("margin-top", "-20px");
					a(".dwwb", c).css({
						height: b - 20 + "px",
						lineHeight: b - 20 + "px"
					})
				}
			};
			a.mobiscroll.themes.listview["sense-dark"] = {
				baseTheme: "sense"
			};
			a.mobiscroll.themes.menustrip["sense-dark"] = {
				baseTheme: "sense"
			}
		})(jQuery);
	}
}


