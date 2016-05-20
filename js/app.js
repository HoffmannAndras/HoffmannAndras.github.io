jQuery(document).ready(function () {
    jQuery('#opt_block .opt_header span').click(function () {
        if (jQuery(this).hasClass('vis')) {
            jQuery(this).removeClass('vis').parents('#opt_block').animate({'marginRight': 0}, 700, 'easeInCubic');
        }
        else {
            jQuery(this).addClass('vis').parents('#opt_block').animate({'marginRight': 222}, 700, 'easeInCubic');
        }
    });
    // toTop link setup
    "use strict";
    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() >= 110) {
            jQuery('#toTop').show();
        } else {
            jQuery('#toTop').hide();
        }
    });
    jQuery('#toTop').click(function (e) {
        jQuery('body,html').animate({scrollTop: 0}, 800);
        e.preventDefault();
    });
    // Section tabs
    jQuery('#mainpage_accordion_area').tabs('section > .section_body', {
        tabs: 'section > .section_header > .section_title',
        effect: 'slide',
        slideUpSpeed: 600,
        slideDownSpeed: 600,
        onClick: function (e, tabIndex) {
            var tabs = jQuery('#mainpage_accordion_area section > .section_header > .section_title');
            var tab = tabs.eq(tabIndex);
            if (tab.hasClass('resume_section_title')) {					// Resume
                jQuery('.widget_skills .skills_row').each(function () {
                    var wd = jQuery(this).find('.progress').attr('rel');
                    if (jQuery(this).find('.progress').width() === 0) {
                        jQuery(this).find('.progress').animate({'width': wd}, 700);
                    }
                    jQuery('.svg').addClass('vis');
                });
                if (jQuery('#resume .section_body').css('display') === 'none') {
                    jQuery('#resume .section_body').parent().removeClass('open');
                }
                else {
                    jQuery('#resume .section_body').parent().addClass('open');
                }
            } else if (tab.hasClass('portfolio_section_title')) {		// Portfolio
                // Isotope refresh
                if (jQuery('.portfolio_items.isotope').length > 0 && jQuery('.portfolio_items.isotope:hidden').length === 0) {
                    jQuery('.portfolio_items').isotope({filter: getIsotopeFilter()});
                }
            }

            return false;
        },
        currentClose: true,
        anotherClose: false,
        initialIndex: -1
    });
    jQuery('.cleared .widget_skills .skills_row').each(function () {
        var wd = jQuery(this).find('.progress').attr('rel');
        if (jQuery(this).find('.progress').width() === 0) {
            jQuery(this).find('.progress').css({'width': wd}, 700);
        }
        jQuery('.svg').addClass('vis');
    });
    jQuery('#profile:not(.printable) .profile_section_header h2').click(function () {
        if (jQuery(this).find('.section_name').hasClass('show')) {
            jQuery(this).find('.section_name').animate({'width': '135', 'opacity': '1'},
                550, 'easeOutCubic').removeClass('show');
        } else {
            jQuery(this).find('.section_name').animate({'width': '0', 'opacity': '0'},
                250, 'easeOutCubic').addClass('show');
        }
        jQuery(this).parent().toggleClass('opened').next('.profile_section_body').stop().slideToggle({
            duration: 450, easing: 'easeOutCubic'
        });
        return false;
    });

    jQuery('#mainpage_accordion_area h2.section_title').click(function () {
        var ofs = jQuery(this).offset().top;
        jQuery('html, body').animate({'scrollTop': ofs - 50});
    });


    jQuery('.profile_row .age').text(Math.abs(new Date(Date.now() - new Date(1985, 5, 7).getTime()).getUTCFullYear() - 1970));
});

jQuery(window).scroll(function () {
    "use strict";
    if (jQuery('#resume').length === 0) {
        return;
    }
    var top = jQuery(document).scrollTop();
    if (jQuery('#resume').offset().top - 60 < top || parseInt(jQuery('#resume_buttons').css('top'), 10) > 0) {
        var pr_h = jQuery('#resume_buttons').parent().height() - 60;
        top = Math.min(pr_h, Math.max(0, top - jQuery('#resume').offset().top + 50));
        jQuery('#resume_buttons').css({'top': top});
    }
});

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend(jQuery.easing,
    {
        def: 'easeOutQuad',
        swing: function (x, t, b, c, d) {
            //alert(jQuery.easing.default);
            return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
        },
        easeInQuad: function (x, t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        easeInQuart: function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOutQuart: function (x, t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        easeInQuint: function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOutQuint: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOutQuint: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },
        easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOutSine: function (x, t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        easeInExpo: function (x, t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOutExpo: function (x, t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOutExpo: function (x, t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOutCirc: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        easeInElastic: function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOutElastic: function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        easeInOutElastic: function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        },
        easeInBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        easeInBounce: function (x, t, b, c, d) {
            return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOutBounce: function (x, t, b, c, d) {
            if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
            return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    });

/**
 * Isotope v1.5.25
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time purchase of a commercial license
 * http://isotope.metafizzy.co/docs/license.html
 *
 * Non-commercial use is licensed under the MIT License
 *
 * Copyright 2013 Metafizzy
 */
(function (a, b, c) {
    "use strict";
    var d = a.document, e = a.Modernizr, f = function (a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
    }, g = "Moz Webkit O Ms".split(" "), h = function (a) {
        var b = d.documentElement.style, c;
        if (typeof b[a] == "string")return a;
        a = f(a);
        for (var e = 0, h = g.length; e < h; e++) {
            c = g[e] + a;
            if (typeof b[c] == "string")return c
        }
    }, i = h("transform"), j = h("transitionProperty"), k = {
        csstransforms: function () {
            return !!i
        }, csstransforms3d: function () {
            var a = !!h("perspective");
            if (a) {
                var c = " -o- -moz- -ms- -webkit- -khtml- ".split(" "), d = "@media (" + c.join("transform-3d),(") + "modernizr)", e = b("<style>" + d + "{#modernizr{height:3px}}" + "</style>").appendTo("head"), f = b('<div id="modernizr" />').appendTo("html");
                a = f.height() === 3, f.remove(), e.remove()
            }
            return a
        }, csstransitions: function () {
            return !!j
        }
    }, l;
    if (e)for (l in k)e.hasOwnProperty(l) || e.addTest(l, k[l]); else {
        e = a.Modernizr = {_version: "1.6ish: miniModernizr for Isotope"};
        var m = " ", n;
        for (l in k)n = k[l](), e[l] = n, m += " " + (n ? "" : "no-") + l;
        b("html").addClass(m)
    }
    if (e.csstransforms) {
        var o = e.csstransforms3d ? {
            translate: function (a) {
                return "translate3d(" + a[0] + "px, " + a[1] + "px, 0) "
            }, scale: function (a) {
                return "scale3d(" + a + ", " + a + ", 1) "
            }
        } : {
            translate: function (a) {
                return "translate(" + a[0] + "px, " + a[1] + "px) "
            }, scale: function (a) {
                return "scale(" + a + ") "
            }
        }, p = function (a, c, d) {
            var e = b.data(a, "isoTransform") || {}, f = {}, g, h = {}, j;
            f[c] = d, b.extend(e, f);
            for (g in e)j = e[g], h[g] = o[g](j);
            var k = h.translate || "", l = h.scale || "", m = k + l;
            b.data(a, "isoTransform", e), a.style[i] = m
        };
        b.cssNumber.scale = !0, b.cssHooks.scale = {
            set: function (a, b) {
                p(a, "scale", b)
            }, get: function (a, c) {
                var d = b.data(a, "isoTransform");
                return d && d.scale ? d.scale : 1
            }
        }, b.fx.step.scale = function (a) {
            b.cssHooks.scale.set(a.elem, a.now + a.unit)
        }, b.cssNumber.translate = !0, b.cssHooks.translate = {
            set: function (a, b) {
                p(a, "translate", b)
            }, get: function (a, c) {
                var d = b.data(a, "isoTransform");
                return d && d.translate ? d.translate : [0, 0]
            }
        }
    }
    var q, r;
    e.csstransitions && (q = {
        WebkitTransitionProperty: "webkitTransitionEnd",
        MozTransitionProperty: "transitionend",
        OTransitionProperty: "oTransitionEnd otransitionend",
        transitionProperty: "transitionend"
    }[j], r = h("transitionDuration"));
    var s = b.event, t = b.event.handle ? "handle" : "dispatch", u;
    s.special.smartresize = {
        setup: function () {
            b(this).bind("resize", s.special.smartresize.handler)
        }, teardown: function () {
            b(this).unbind("resize", s.special.smartresize.handler)
        }, handler: function (a, b) {
            var c = this, d = arguments;
            a.type = "smartresize", u && clearTimeout(u), u = setTimeout(function () {
                s[t].apply(c, d)
            }, b === "execAsap" ? 0 : 100)
        }
    }, b.fn.smartresize = function (a) {
        return a ? this.bind("smartresize", a) : this.trigger("smartresize", ["execAsap"])
    }, b.Isotope = function (a, c, d) {
        this.element = b(c), this._create(a), this._init(d)
    };
    var v = ["width", "height"], w = b(a);
    b.Isotope.settings = {
        resizable: !0,
        layoutMode: "masonry",
        containerClass: "isotope",
        itemClass: "isotope-item",
        hiddenClass: "isotope-hidden",
        hiddenStyle: {opacity: 0, scale: .001},
        visibleStyle: {opacity: 1, scale: 1},
        containerStyle: {position: "relative", overflow: "hidden"},
        animationEngine: "best-available",
        animationOptions: {queue: !1, duration: 800},
        sortBy: "original-order",
        sortAscending: !0,
        resizesContainer: !0,
        transformsEnabled: !0,
        itemPositionDataEnabled: !1
    }, b.Isotope.prototype = {
        _create: function (a) {
            this.options = b.extend({}, b.Isotope.settings, a), this.styleQueue = [], this.elemCount = 0;
            var c = this.element[0].style;
            this.originalStyle = {};
            var d = v.slice(0);
            for (var e in this.options.containerStyle)d.push(e);
            for (var f = 0, g = d.length; f < g; f++)e = d[f], this.originalStyle[e] = c[e] || "";
            this.element.css(this.options.containerStyle), this._updateAnimationEngine(), this._updateUsingTransforms();
            var h = {
                "original-order": function (a, b) {
                    return b.elemCount++, b.elemCount
                }, random: function () {
                    return Math.random()
                }
            };
            this.options.getSortData = b.extend(this.options.getSortData, h), this.reloadItems(), this.offset = {
                left: parseInt(this.element.css("padding-left") || 0, 10),
                top: parseInt(this.element.css("padding-top") || 0, 10)
            };
            var i = this;
            setTimeout(function () {
                i.element.addClass(i.options.containerClass)
            }, 0), this.options.resizable && w.bind("smartresize.isotope", function () {
                i.resize()
            }), this.element.delegate("." + this.options.hiddenClass, "click", function () {
                return !1
            })
        }, _getAtoms: function (a) {
            var b = this.options.itemSelector, c = b ? a.filter(b).add(a.find(b)) : a, d = {position: "absolute"};
            return c = c.filter(function (a, b) {
                return b.nodeType === 1
            }), this.usingTransforms && (d.left = 0, d.top = 0), c.css(d).addClass(this.options.itemClass), this.updateSortData(c, !0), c
        }, _init: function (a) {
            this.$filteredAtoms = this._filter(this.$allAtoms), this._sort(), this.reLayout(a)
        }, option: function (a) {
            if (b.isPlainObject(a)) {
                this.options = b.extend(!0, this.options, a);
                var c;
                for (var d in a)c = "_update" + f(d), this[c] && this[c]()
            }
        }, _updateAnimationEngine: function () {
            var a = this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, ""), b;
            switch (a) {
                case"css":
                case"none":
                    b = !1;
                    break;
                case"jquery":
                    b = !0;
                    break;
                default:
                    b = !e.csstransitions
            }
            this.isUsingJQueryAnimation = b, this._updateUsingTransforms()
        }, _updateTransformsEnabled: function () {
            this._updateUsingTransforms()
        }, _updateUsingTransforms: function () {
            var a = this.usingTransforms = this.options.transformsEnabled && e.csstransforms && e.csstransitions && !this.isUsingJQueryAnimation;
            a || (delete this.options.hiddenStyle.scale, delete this.options.visibleStyle.scale), this.getPositionStyles = a ? this._translate : this._positionAbs
        }, _filter: function (a) {
            var b = this.options.filter === "" ? "*" : this.options.filter;
            if (!b)return a;
            var c = this.options.hiddenClass, d = "." + c, e = a.filter(d), f = e;
            if (b !== "*") {
                f = e.filter(b);
                var g = a.not(d).not(b).addClass(c);
                this.styleQueue.push({$el: g, style: this.options.hiddenStyle})
            }
            return this.styleQueue.push({$el: f, style: this.options.visibleStyle}), f.removeClass(c), a.filter(b)
        }, updateSortData: function (a, c) {
            var d = this, e = this.options.getSortData, f, g;
            a.each(function () {
                f = b(this), g = {};
                for (var a in e)!c && a === "original-order" ? g[a] = b.data(this, "isotope-sort-data")[a] : g[a] = e[a](f, d);
                b.data(this, "isotope-sort-data", g)
            })
        }, _sort: function () {
            var a = this.options.sortBy, b = this._getSorter, c = this.options.sortAscending ? 1 : -1, d = function (d, e) {
                var f = b(d, a), g = b(e, a);
                return f === g && a !== "original-order" && (f = b(d, "original-order"), g = b(e, "original-order")), (f > g ? 1 : f < g ? -1 : 0) * c
            };
            this.$filteredAtoms.sort(d)
        }, _getSorter: function (a, c) {
            return b.data(a, "isotope-sort-data")[c]
        }, _translate: function (a, b) {
            return {translate: [a, b]}
        }, _positionAbs: function (a, b) {
            return {left: a, top: b}
        }, _pushPosition: function (a, b, c) {
            b = Math.round(b + this.offset.left), c = Math.round(c + this.offset.top);
            var d = this.getPositionStyles(b, c);
            this.styleQueue.push({
                $el: a,
                style: d
            }), this.options.itemPositionDataEnabled && a.data("isotope-item-position", {x: b, y: c})
        }, layout: function (a, b) {
            var c = this.options.layoutMode;
            this["_" + c + "Layout"](a);
            if (this.options.resizesContainer) {
                var d = this["_" + c + "GetContainerSize"]();
                this.styleQueue.push({$el: this.element, style: d})
            }
            this._processStyleQueue(a, b), this.isLaidOut = !0
        }, _processStyleQueue: function (a, c) {
            var d = this.isLaidOut ? this.isUsingJQueryAnimation ? "animate" : "css" : "css", f = this.options.animationOptions, g = this.options.onLayout, h, i, j, k;
            i = function (a, b) {
                b.$el[d](b.style, f)
            };
            if (this._isInserting && this.isUsingJQueryAnimation)i = function (a, b) {
                h = b.$el.hasClass("no-transition") ? "css" : d, b.$el[h](b.style, f)
            }; else if (c || g || f.complete) {
                var l = !1, m = [c, g, f.complete], n = this;
                j = !0, k = function () {
                    if (l)return;
                    var b;
                    for (var c = 0, d = m.length; c < d; c++)b = m[c], typeof b == "function" && b.call(n.element, a, n);
                    l = !0
                };
                if (this.isUsingJQueryAnimation && d === "animate")f.complete = k, j = !1; else if (e.csstransitions) {
                    var o = 0, p = this.styleQueue[0], s = p && p.$el, t;
                    while (!s || !s.length) {
                        t = this.styleQueue[o++];
                        if (!t)return;
                        s = t.$el
                    }
                    var u = parseFloat(getComputedStyle(s[0])[r]);
                    u > 0 && (i = function (a, b) {
                        b.$el[d](b.style, f).one(q, k)
                    }, j = !1)
                }
            }
            b.each(this.styleQueue, i), j && k(), this.styleQueue = []
        }, resize: function () {
            this["_" + this.options.layoutMode + "ResizeChanged"]() && this.reLayout()
        }, reLayout: function (a) {
            this["_" + this.options.layoutMode + "Reset"](), this.layout(this.$filteredAtoms, a)
        }, addItems: function (a, b) {
            var c = this._getAtoms(a);
            this.$allAtoms = this.$allAtoms.add(c), b && b(c)
        }, insert: function (a, b) {
            this.element.append(a);
            var c = this;
            this.addItems(a, function (a) {
                var d = c._filter(a);
                c._addHideAppended(d), c._sort(), c.reLayout(), c._revealAppended(d, b)
            })
        }, appended: function (a, b) {
            var c = this;
            this.addItems(a, function (a) {
                c._addHideAppended(a), c.layout(a), c._revealAppended(a, b)
            })
        }, _addHideAppended: function (a) {
            this.$filteredAtoms = this.$filteredAtoms.add(a), a.addClass("no-transition"), this._isInserting = !0, this.styleQueue.push({
                $el: a,
                style: this.options.hiddenStyle
            })
        }, _revealAppended: function (a, b) {
            var c = this;
            setTimeout(function () {
                a.removeClass("no-transition"), c.styleQueue.push({
                    $el: a,
                    style: c.options.visibleStyle
                }), c._isInserting = !1, c._processStyleQueue(a, b)
            }, 10)
        }, reloadItems: function () {
            this.$allAtoms = this._getAtoms(this.element.children())
        }, remove: function (a, b) {
            this.$allAtoms = this.$allAtoms.not(a), this.$filteredAtoms = this.$filteredAtoms.not(a);
            var c = this, d = function () {
                a.remove(), b && b.call(c.element)
            };
            a.filter(":not(." + this.options.hiddenClass + ")").length ? (this.styleQueue.push({
                $el: a,
                style: this.options.hiddenStyle
            }), this._sort(), this.reLayout(d)) : d()
        }, shuffle: function (a) {
            this.updateSortData(this.$allAtoms), this.options.sortBy = "random", this._sort(), this.reLayout(a)
        }, destroy: function () {
            var a = this.usingTransforms, b = this.options;
            this.$allAtoms.removeClass(b.hiddenClass + " " + b.itemClass).each(function () {
                var b = this.style;
                b.position = "", b.top = "", b.left = "", b.opacity = "", a && (b[i] = "")
            });
            var c = this.element[0].style;
            for (var d in this.originalStyle)c[d] = this.originalStyle[d];
            this.element.unbind(".isotope").undelegate("." + b.hiddenClass, "click").removeClass(b.containerClass).removeData("isotope"), w.unbind(".isotope")
        }, _getSegments: function (a) {
            var b = this.options.layoutMode, c = a ? "rowHeight" : "columnWidth", d = a ? "height" : "width", e = a ? "rows" : "cols", g = this.element[d](), h, i = this.options[b] && this.options[b][c] || this.$filteredAtoms["outer" + f(d)](!0) || g;
            h = Math.floor(g / i), h = Math.max(h, 1), this[b][e] = h, this[b][c] = i
        }, _checkIfSegmentsChanged: function (a) {
            var b = this.options.layoutMode, c = a ? "rows" : "cols", d = this[b][c];
            return this._getSegments(a), this[b][c] !== d
        }, _masonryReset: function () {
            this.masonry = {}, this._getSegments();
            var a = this.masonry.cols;
            this.masonry.colYs = [];
            while (a--)this.masonry.colYs.push(0)
        }, _masonryLayout: function (a) {
            var c = this, d = c.masonry;
            a.each(function () {
                var a = b(this), e = Math.ceil(a.outerWidth(!0) / d.columnWidth);
                e = Math.min(e, d.cols);
                if (e === 1)c._masonryPlaceBrick(a, d.colYs); else {
                    var f = d.cols + 1 - e, g = [], h, i;
                    for (i = 0; i < f; i++)h = d.colYs.slice(i, i + e), g[i] = Math.max.apply(Math, h);
                    c._masonryPlaceBrick(a, g)
                }
            })
        }, _masonryPlaceBrick: function (a, b) {
            var c = Math.min.apply(Math, b), d = 0;
            for (var e = 0, f = b.length; e < f; e++)if (b[e] === c) {
                d = e;
                break
            }
            var g = this.masonry.columnWidth * d, h = c;
            this._pushPosition(a, g, h);
            var i = c + a.outerHeight(!0), j = this.masonry.cols + 1 - f;
            for (e = 0; e < j; e++)this.masonry.colYs[d + e] = i
        }, _masonryGetContainerSize: function () {
            var a = Math.max.apply(Math, this.masonry.colYs);
            return {height: a}
        }, _masonryResizeChanged: function () {
            return this._checkIfSegmentsChanged()
        }, _fitRowsReset: function () {
            this.fitRows = {x: 0, y: 0, height: 0}
        }, _fitRowsLayout: function (a) {
            var c = this, d = this.element.width(), e = this.fitRows;
            a.each(function () {
                var a = b(this), f = a.outerWidth(!0), g = a.outerHeight(!0);
                e.x !== 0 && f + e.x > d && (e.x = 0, e.y = e.height), c._pushPosition(a, e.x, e.y), e.height = Math.max(e.y + g, e.height), e.x += f
            })
        }, _fitRowsGetContainerSize: function () {
            return {height: this.fitRows.height}
        }, _fitRowsResizeChanged: function () {
            return !0
        }, _cellsByRowReset: function () {
            this.cellsByRow = {index: 0}, this._getSegments(), this._getSegments(!0)
        }, _cellsByRowLayout: function (a) {
            var c = this, d = this.cellsByRow;
            a.each(function () {
                var a = b(this), e = d.index % d.cols, f = Math.floor(d.index / d.cols), g = (e + .5) * d.columnWidth - a.outerWidth(!0) / 2, h = (f + .5) * d.rowHeight - a.outerHeight(!0) / 2;
                c._pushPosition(a, g, h), d.index++
            })
        }, _cellsByRowGetContainerSize: function () {
            return {height: Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) * this.cellsByRow.rowHeight + this.offset.top}
        }, _cellsByRowResizeChanged: function () {
            return this._checkIfSegmentsChanged()
        }, _straightDownReset: function () {
            this.straightDown = {y: 0}
        }, _straightDownLayout: function (a) {
            var c = this;
            a.each(function (a) {
                var d = b(this);
                c._pushPosition(d, 0, c.straightDown.y), c.straightDown.y += d.outerHeight(!0)
            })
        }, _straightDownGetContainerSize: function () {
            return {height: this.straightDown.y}
        }, _straightDownResizeChanged: function () {
            return !0
        }, _masonryHorizontalReset: function () {
            this.masonryHorizontal = {}, this._getSegments(!0);
            var a = this.masonryHorizontal.rows;
            this.masonryHorizontal.rowXs = [];
            while (a--)this.masonryHorizontal.rowXs.push(0)
        }, _masonryHorizontalLayout: function (a) {
            var c = this, d = c.masonryHorizontal;
            a.each(function () {
                var a = b(this), e = Math.ceil(a.outerHeight(!0) / d.rowHeight);
                e = Math.min(e, d.rows);
                if (e === 1)c._masonryHorizontalPlaceBrick(a, d.rowXs); else {
                    var f = d.rows + 1 - e, g = [], h, i;
                    for (i = 0; i < f; i++)h = d.rowXs.slice(i, i + e), g[i] = Math.max.apply(Math, h);
                    c._masonryHorizontalPlaceBrick(a, g)
                }
            })
        }, _masonryHorizontalPlaceBrick: function (a, b) {
            var c = Math.min.apply(Math, b), d = 0;
            for (var e = 0, f = b.length; e < f; e++)if (b[e] === c) {
                d = e;
                break
            }
            var g = c, h = this.masonryHorizontal.rowHeight * d;
            this._pushPosition(a, g, h);
            var i = c + a.outerWidth(!0), j = this.masonryHorizontal.rows + 1 - f;
            for (e = 0; e < j; e++)this.masonryHorizontal.rowXs[d + e] = i
        }, _masonryHorizontalGetContainerSize: function () {
            var a = Math.max.apply(Math, this.masonryHorizontal.rowXs);
            return {width: a}
        }, _masonryHorizontalResizeChanged: function () {
            return this._checkIfSegmentsChanged(!0)
        }, _fitColumnsReset: function () {
            this.fitColumns = {x: 0, y: 0, width: 0}
        }, _fitColumnsLayout: function (a) {
            var c = this, d = this.element.height(), e = this.fitColumns;
            a.each(function () {
                var a = b(this), f = a.outerWidth(!0), g = a.outerHeight(!0);
                e.y !== 0 && g + e.y > d && (e.x = e.width, e.y = 0), c._pushPosition(a, e.x, e.y), e.width = Math.max(e.x + f, e.width), e.y += g
            })
        }, _fitColumnsGetContainerSize: function () {
            return {width: this.fitColumns.width}
        }, _fitColumnsResizeChanged: function () {
            return !0
        }, _cellsByColumnReset: function () {
            this.cellsByColumn = {index: 0}, this._getSegments(), this._getSegments(!0)
        }, _cellsByColumnLayout: function (a) {
            var c = this, d = this.cellsByColumn;
            a.each(function () {
                var a = b(this), e = Math.floor(d.index / d.rows), f = d.index % d.rows, g = (e + .5) * d.columnWidth - a.outerWidth(!0) / 2, h = (f + .5) * d.rowHeight - a.outerHeight(!0) / 2;
                c._pushPosition(a, g, h), d.index++
            })
        }, _cellsByColumnGetContainerSize: function () {
            return {width: Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth}
        }, _cellsByColumnResizeChanged: function () {
            return this._checkIfSegmentsChanged(!0)
        }, _straightAcrossReset: function () {
            this.straightAcross = {x: 0}
        }, _straightAcrossLayout: function (a) {
            var c = this;
            a.each(function (a) {
                var d = b(this);
                c._pushPosition(d, c.straightAcross.x, 0), c.straightAcross.x += d.outerWidth(!0)
            })
        }, _straightAcrossGetContainerSize: function () {
            return {width: this.straightAcross.x}
        }, _straightAcrossResizeChanged: function () {
            return !0
        }
    }, b.fn.imagesLoaded = function (a) {
        function h() {
            a.call(c, d)
        }

        function i(a) {
            var c = a.target;
            c.src !== f && b.inArray(c, g) === -1 && (g.push(c), --e <= 0 && (setTimeout(h), d.unbind(".imagesLoaded", i)))
        }

        var c = this, d = c.find("img").add(c.filter("img")), e = d.length, f = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", g = [];
        return e || h(), d.bind("load.imagesLoaded error.imagesLoaded", i).each(function () {
            var a = this.src;
            this.src = f, this.src = a
        }), c
    };
    var x = function (b) {
        a.console && a.console.error(b)
    };
    b.fn.isotope = function (a, c) {
        if (typeof a == "string") {
            var d = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var c = b.data(this, "isotope");
                if (!c) {
                    x("cannot call methods on isotope prior to initialization; attempted to call method '" + a + "'");
                    return
                }
                if (!b.isFunction(c[a]) || a.charAt(0) === "_") {
                    x("no such method '" + a + "' for isotope instance");
                    return
                }
                c[a].apply(c, d)
            })
        } else this.each(function () {
            var d = b.data(this, "isotope");
            d ? (d.option(a), d._init(c)) : b.data(this, "isotope", new b.Isotope(a, this, c))
        });
        return this
    }
})(window, jQuery);

var pp_alreadyInitialized = false;
/*
 * jReject (jQuery Browser Rejection Plugin)
 * Version 1.0.2
 * URL: http://jreject.turnwheel.com/
 * Description: jReject is a easy method of rejecting specific browsers on your site
 * Author: Steven Bower (TurnWheel Designs) http://turnwheel.com/
 * Copyright: Copyright (c) 2009-2013 Steven Bower under dual MIT/GPLv2 license.
 */

(function ($) {
    $.reject = function (options) {
        var opts = $.extend(true, {
            reject: { // Rejection flags for specific browsers
                all: false, // Covers Everything (Nothing blocked)
                msie5: true, msie6: true // Covers MSIE 5-6 (Blocked by default)
                /*
                 * Possibilities are endless...
                 *
                 * // MSIE Flags (Global, 5-8)
                 * msie, msie5, msie6, msie7, msie8,
                 * // Firefox Flags (Global, 1-3)
                 * firefox, firefox1, firefox2, firefox3,
                 * // Konqueror Flags (Global, 1-3)
                 * konqueror, konqueror1, konqueror2, konqueror3,
                 * // Chrome Flags (Global, 1-4)
                 * chrome, chrome1, chrome2, chrome3, chrome4,
                 * // Safari Flags (Global, 1-4)
                 * safari, safari2, safari3, safari4,
                 * // Opera Flags (Global, 7-10)
                 * opera, opera7, opera8, opera9, opera10,
                 * // Rendering Engines (Gecko, Webkit, Trident, KHTML, Presto)
                 * gecko, webkit, trident, khtml, presto,
                 * // Operating Systems (Win, Mac, Linux, Solaris, iPhone)
                 * win, mac, linux, solaris, iphone,
                 * unknown // Unknown covers everything else
                 */
            },
            display: [], // What browsers to display and their order (default set below)
            browserShow: true, // Should the browser options be shown?
            browserInfo: { // Settings for which browsers to display
                firefox: {
                    text: 'Mozilla Firefox', // Text below the icon
                    url: 'http://www.mozilla.com/firefox/' // URL For icon/text link
                },
                chrome: {
                    text: 'Google Chrome',
                    url: 'http://www.google.com/chrome/'
                },
                safari: {
                    text: 'Safari',
                    url: 'http://www.apple.com/safari/download/'
                },
                opera: {
                    text: 'Opera',
                    url: 'http://www.opera.com/download/'
                },
                msie: {
                    text: 'Internet Explorer',
                    url: 'http://www.microsoft.com/windows/Internet-explorer/'
                },
                gcf: {
                    text: 'Google Chrome Frame',
                    url: 'http://code.google.com/chrome/chromeframe/',
                    // This browser option will only be displayed for MSIE
                    allow: {all: false, msie: true}
                }
            },

            // Header of pop-up window
            header: 'Did you know that your Internet Browser is out of date?',
            // Paragraph 1
            paragraph1: 'Your browser is out of date, and may not be compatible with ' +
            'our website. A list of the most popular web browsers can be ' +
            'found below.',
            // Paragraph 2
            paragraph2: 'Just click on the icons to get to the download page',
            close: true, // Allow closing of window
            // Message displayed below closing link
            closeMessage: 'By closing this window you acknowledge that your experience ' +
            'on this website may be degraded',
            closeLink: 'Close This Window', // Text for closing link
            closeURL: '#', // Close URL
            closeESC: true, // Allow closing of window with esc key

            // If cookies should be used to remmember if the window was closed
            // See cookieSettings for more options
            closeCookie: false,
            // Cookie settings are only used if closeCookie is true
            cookieSettings: {
                // Path for the cookie to be saved on
                // Should be root domain in most cases
                path: '/',
                // Expiration Date (in seconds)
                // 0 (default) means it ends with the current session
                expires: 0
            },

            imagePath: './images/', // Path where images are located
            overlayBgColor: '#000', // Background color for overlay
            overlayOpacity: 0.8, // Background transparency (0-1)

            // Fade in time on open ('slow','medium','fast' or integer in ms)
            fadeInTime: 'fast',
            // Fade out time on close ('slow','medium','fast' or integer in ms)
            fadeOutTime: 'fast',

            // Google Analytics Link Tracking (Optional)
            // Set to true to enable
            // Note: Analytics tracking code must be added separately
            analytics: false
        }, options);

        // Set default browsers to display if not already defined
        if (opts.display.length < 1) {
            opts.display = ['chrome', 'firefox', 'safari', 'opera', 'gcf', 'msie'];
        }

        // beforeRject: Customized Function
        if ($.isFunction(opts.beforeReject)) {
            opts.beforeReject();
        }

        // Disable 'closeESC' if closing is disabled (mutually exclusive)
        if (!opts.close) {
            opts.closeESC = false;
        }

        // This function parses the advanced browser options
        var browserCheck = function (settings) {
            // Check 1: Look for 'all' forced setting
            // Check 2: Operating System (eg. 'win','mac','linux','solaris','iphone')
            // Check 3: Rendering engine (eg. 'webkit', 'gecko', 'trident')
            // Check 4: Browser name (eg. 'firefox','msie','chrome')
            // Check 5: Browser+major version (eg. 'firefox3','msie7','chrome4')
            return (settings['all'] ? true : false) ||
                (settings[$.os.name] ? true : false) ||
                (settings[$.layout.name] ? true : false) ||
                (settings[$.browser.name] ? true : false) ||
                (settings[$.browser.className] ? true : false);
        };

        // Determine if we need to display rejection for this browser, or exit
        if (!browserCheck(opts.reject)) {
            // onFail: Customized Function
            if ($.isFunction(opts.onFail)) {
                opts.onFail();
            }

            return false;
        }

        // If user can close and set to remmember close, initiate cookie functions
        if (opts.close && opts.closeCookie) {
            // Local global setting for the name of the cookie used
            var COOKIE_NAME = 'jreject-close';

            // Cookies Function: Handles creating/retrieving/deleting cookies
            // Cookies are only used for opts.closeCookie parameter functionality
            var _cookie = function (name, value) {
                // Save cookie
                if (typeof value != 'undefined') {
                    var expires = '';

                    // Check if we need to set an expiration date
                    if (opts.cookieSettings.expires !== 0) {
                        var date = new Date();
                        date.setTime(date.getTime() + (opts.cookieSettings.expires * 1000));
                        expires = "; expires=" + date.toGMTString();
                    }

                    // Get path from settings
                    var path = opts.cookieSettings.path || '/';

                    // Set Cookie with parameters
                    document.cookie = name + '=' +
                        encodeURIComponent((!value) ? '' : value) + expires +
                        '; path=' + path;

                    return true;
                }
                // Get cookie
                else {
                    var cookie, val = null;

                    if (document.cookie && document.cookie !== '') {
                        var cookies = document.cookie.split(';');

                        // Loop through all cookie values
                        var clen = cookies.length;
                        for (var i = 0; i < clen; ++i) {
                            cookie = $.trim(cookies[i]);

                            // Does this cookie string begin with the name we want?
                            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                                var len = name.length;
                                val = decodeURIComponent(cookie.substring(len + 1));
                                break;
                            }
                        }
                    }

                    // Returns cookie value
                    return val;
                }
            };

            // If cookie is set, return false and don't display rejection
            if (_cookie(COOKIE_NAME)) {
                return false;
            }
        }

        // Load background overlay (jr_overlay) + Main wrapper (jr_wrap) +
        // Inner Wrapper (jr_inner) w/ opts.header (jr_header) +
        // opts.paragraph1/opts.paragraph2 if set
        var html = '<div id="jr_overlay"></div><div id="jr_wrap"><div id="jr_inner">' +
            '<h1 id="jr_header">' + opts.header + '</h1>' +
            (opts.paragraph1 === '' ? '' : '<p>' + opts.paragraph1 + '</p>') +
            (opts.paragraph2 === '' ? '' : '<p>' + opts.paragraph2 + '</p>');

        if (opts.browserShow) {
            html += '<ul>';

            var displayNum = 0;

            // Generate the browsers to display
            for (var x in opts.display) {
                var browser = opts.display[x]; // Current Browser
                var info = opts.browserInfo[browser] || false; // Browser Information

                // If no info exists for this browser
                // or if this browser is not suppose to display to this user
                if (!info || (info['allow'] != undefined && !browserCheck(info['allow']))) {
                    continue;
                }

                var url = info.url || '#'; // URL to link text/icon to

                // Generate HTML for this browser option
                html += '<li id="jr_' + browser + '"><div class="jr_icon"></div>' +
                    '<div><a href="' + url + '">' + (info.text || 'Unknown') + '</a>' +
                    '</div></li>';

                ++displayNum;
            }

            html += '</ul>';
        }

        // Close list and #jr_list
        html += '<div id="jr_close">' +
            // Display close links/message if set
            (opts.close ? '<a href="' + opts.closeURL + '">' + opts.closeLink + '</a>' +
            '<p>' + opts.closeMessage + '</p>' : '') + '</div>' +
            // Close #jr_inner and #jr_wrap
            '</div></div>';

        var element = $('<div>' + html + '</div>'); // Create element
        var size = _pageSize(); // Get page size
        var scroll = _scrollSize(); // Get page scroll

        // This function handles closing this reject window
        // When clicked, fadeOut and remove all elements
        element.bind('closejr', function () {
            // Make sure the permission to close is granted
            if (!opts.close) {
                return false;
            }

            // Customized Function
            if ($.isFunction(opts.beforeClose)) {
                opts.beforeClose();
            }

            // Remove binding function so it
            // doesn't get called more than once
            $(this).unbind('closejr');

            // Fade out background and modal wrapper
            $('#jr_overlay,#jr_wrap').fadeOut(opts.fadeOutTime, function () {
                $(this).remove(); // Remove element from DOM

                // afterClose: Customized Function
                if ($.isFunction(opts.afterClose)) {
                    opts.afterClose();
                }
            });

            // Show elements that were hidden for layering issues
            var elmhide = 'embed.jr_hidden, object.jr_hidden, select.jr_hidden, applet.jr_hidden';
            $(elmhide).show().removeClass('jr_hidden');

            // Set close cookie for next run
            if (opts.closeCookie) {
                _cookie(COOKIE_NAME, 'true');
            }

            return true;
        });

        // Tracks clicks in Google Analytics (category 'External Links')
        // only if opts.analytics is enabled
        var analytics = function (url) {
            if (!opts.analytics) return false;

            // Get just the hostname
            var host = url.split(/\/+/g)[1];

            // Send external link event to Google Analaytics
            // Attempts both versions of analytics code. (Newest first)
            try {
                // Newest analytics code
                _gaq.push(['_trackEvent', 'External Links', host, url]);
            } catch (e) {
                try {
                    // Older analytics code
                    pageTracker._trackEvent('External Links', host, url);
                } catch (e) {
                }
            }
        };

        // Called onClick for browser links (and icons)
        // Opens link in new window
        var openBrowserLinks = function (url) {
            // Send link to analytics if enabled
            analytics(url);

            // Open window, generate random id value
            window.open(url, 'jr_' + Math.round(Math.random() * 11));

            return false;
        };

        /*
         * Trverse through element DOM and apply JS variables
         * All CSS elements that do not require JS will be in
         * css/jquery.jreject.css
         */

        // Creates 'background' (div)
        element.find('#jr_overlay').css({
            width: size[0],
            height: size[1],
            background: opts.overlayBgColor,
            opacity: opts.overlayOpacity
        });

        // Wrapper for our pop-up (div)
        element.find('#jr_wrap').css({
            top: scroll[1] + (size[3] / 4),
            left: scroll[0]
        });

        // Wrapper for inner centered content (div)
        element.find('#jr_inner').css({
            minWidth: displayNum * 100,
            maxWidth: displayNum * 140,
            // min/maxWidth not supported by IE
            width: $.layout.name == 'trident' ? displayNum * 155 : 'auto'
        });

        element.find('#jr_inner li').css({ // Browser list items (li)
            background: 'transparent url("' + opts.imagePath + 'background_browser.gif")' +
            'no-repeat scroll left top'
        });

        element.find('#jr_inner li .jr_icon').each(function () {
            // Dynamically sets the icon background image
            var self = $(this);
            self.css('background', 'transparent url(' + opts.imagePath + 'browser_' +
                (self.parent('li').attr('id').replace(/jr_/, '')) + '.gif)' +
                ' no-repeat scroll left top');

            // Send link clicks to openBrowserLinks
            self.click(function () {
                var url = $(this).next('div').children('a').attr('href');
                openBrowserLinks(url);
            });
        });

        element.find('#jr_inner li a').click(function () {
            openBrowserLinks($(this).attr('href'));
            return false;
        });

        // Bind closing event to trigger closejr
        // to be consistant with ESC key close function
        element.find('#jr_close a').click(function () {
            $(this).trigger('closejr');

            // If plain anchor is set, return false so there is no page jump
            if (opts.closeURL === '#') {
                return false;
            }
        });

        // Set focus (fixes ESC key issues with forms and other focus bugs)
        $('#jr_overlay').focus();

        // Hide elements that won't display properly
        $('embed, object, select, applet').each(function () {
            if ($(this).is(':visible')) {
                $(this).hide().addClass('jr_hidden');
            }
        });

        // Append element to body of document to display
        $('body').append(element.hide().fadeIn(opts.fadeInTime));

        // Handle window resize/scroll events and update overlay dimensions
        $(window).bind('resize scroll', function () {
            var size = _pageSize(); // Get size

            // Update overlay dimensions based on page size
            $('#jr_overlay').css({
                width: size[0],
                height: size[1]
            });

            var scroll = _scrollSize(); // Get page scroll

            // Update modal position based on scroll
            $('#jr_wrap').css({
                top: scroll[1] + (size[3] / 4),
                left: scroll[0]
            });
        });

        // Add optional ESC Key functionality
        if (opts.closeESC) {
            $(document).bind('keydown', function (event) {
                // ESC = Keycode 27
                if (event.keyCode == 27) {
                    element.trigger('closejr');
                }
            });
        }

        // afterReject: Customized Function
        if ($.isFunction(opts.afterReject)) {
            opts.afterReject();
        }

        return true;
    };

// Based on compatibility data from quirksmode.com
    var _pageSize = function () {
        var xScroll = window.innerWidth && window.scrollMaxX ?
        window.innerWidth + window.scrollMaxX :
            (document.body.scrollWidth > document.body.offsetWidth ?
                document.body.scrollWidth : document.body.offsetWidth);

        var yScroll = window.innerHeight && window.scrollMaxY ?
        window.innerHeight + window.scrollMaxY :
            (document.body.scrollHeight > document.body.offsetHeight ?
                document.body.scrollHeight : document.body.offsetHeight);

        var windowWidth = window.innerWidth ? window.innerWidth :
            (document.documentElement && document.documentElement.clientWidth ?
                document.documentElement.clientWidth : document.body.clientWidth);

        var windowHeight = window.innerHeight ? window.innerHeight :
            (document.documentElement && document.documentElement.clientHeight ?
                document.documentElement.clientHeight : document.body.clientHeight);

        return [
            xScroll < windowWidth ? xScroll : windowWidth, // Page Width
            yScroll < windowHeight ? windowHeight : yScroll, // Page Height
            windowWidth, windowHeight
        ];
    };


// Based on compatibility data from quirksmode.com
    var _scrollSize = function () {
        return [
            // scrollSize X
            window.pageXOffset ? window.pageXOffset : (document.documentElement &&
            document.documentElement.scrollTop ?
                document.documentElement.scrollLeft : document.body.scrollLeft),

            // scrollSize Y
            window.pageYOffset ? window.pageYOffset : (document.documentElement &&
            document.documentElement.scrollTop ?
                document.documentElement.scrollTop : document.body.scrollTop)
        ];
    };
})(jQuery);

/*
 * jQuery Browser Plugin
 * Version 2.4 / jReject 1.0.x
 * URL: http://jquery.thewikies.com/browser
 * Description: jQuery Browser Plugin extends browser detection capabilities and
 * can assign browser selectors to CSS classes.
 * Author: Nate Cavanaugh, Minhchau Dang, Jonathan Neal, & Gregory Waxman
 * Updated By: Steven Bower for use with jReject plugin
 * Copyright: Copyright (c) 2008 Jonathan Neal under dual MIT/GPL license.
 */

(function ($) {
    $.browserTest = function (a, z) {
        var u = 'unknown',
            x = 'X',
            m = function (r, h) {
                for (var i = 0; i < h.length; i = i + 1) {
                    r = r.replace(h[i][0], h[i][1]);
                }

                return r;
            }, c = function (i, a, b, c) {
                var r = {
                    name: m((a.exec(i) || [u, u])[1], b)
                };

                r[r.name] = true;

                if (!r.opera) {
                    r.version = (c.exec(i) || [x, x, x, x])[3];
                }
                else {
                    r.version = window.opera.version();
                }

                if (/safari/.test(r.name)) {
                    var safariversion = /(safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/;
                    var res = safariversion.exec(i)
                    if (res && res[3] && res[3] < 400) {
                        r.version = '2.0';
                    }
                }

                else if (r.name === 'presto') {
                    r.version = ($.browser.version > 9.27) ? 'futhark' : 'linear_b';
                }

                r.versionNumber = parseFloat(r.version, 10) || 0;
                var minorStart = 1;

                if (r.versionNumber < 100 && r.versionNumber > 9) {
                    minorStart = 2;
                }

                r.versionX = (r.version !== x) ? r.version.substr(0, minorStart) : x;
                r.className = r.name + r.versionX;

                return r;
            };

        a = (/Opera|Navigator|Minefield|KHTML|Chrome|CriOS/.test(a) ? m(a, [
            [/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/, ''],
            ['Chrome Safari', 'Chrome'],
            ['CriOS', 'Chrome'],
            ['KHTML', 'Konqueror'],
            ['Minefield', 'Firefox'],
            ['Navigator', 'Netscape']
        ]) : a).toLowerCase();

        $.browser = $.extend((!z) ? $.browser : {}, c(a,
            /(camino|chrome|crios|firefox|netscape|konqueror|lynx|msie|opera|safari)/,
            [],
            /(camino|chrome|crios|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));

        $.layout = c(a, /(gecko|konqueror|msie|opera|webkit)/, [
            ['konqueror', 'khtml'],
            ['msie', 'trident'],
            ['opera', 'presto']
        ], /(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);

        $.os = {
            name: (/(win|mac|linux|sunos|solaris|iphone|ipad)/.exec(navigator.platform.toLowerCase()) || [u])[0].replace('sunos', 'solaris')
        };

        if (!z) {
            $('html').addClass([$.os.name, $.browser.name, $.browser.className,
                $.layout.name, $.layout.className].join(' '));
        }
    };

    $.browserTest(navigator.userAgent);
}(jQuery));

/*!
 * jQuery Tools v1.2.6 - The missing UI library for the Web
 *
 * tabs/tabs.js
 * tabs/tabs.slideshow.js
 * tooltip/tooltip.js
 * tooltip/tooltip.dynamic.js
 * tooltip/tooltip.slide.js
 *
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 *
 * http://flowplayer.org/tools/
 *
 */


(function ($) {

    // static constructs
    $.tools = $.tools || {
            version: '1.2.6'
        };

    $.tools.tabs = {

        conf: {
            tabs: 'a',
            current: 'current',
            onBeforeClick: null,
            onClick: null,
            effect: 'default',
            initialIndex: 0,
            event: 'click',
            rotate: false,

            // slide effect
            slideUpSpeed: 400,
            slideDownSpeed: 400,

            // 1.2
            history: false,
            currentClose: false,
            anotherClose: true
        },

        addEffect: function (name, fn) {
            effects[name] = fn;
        }

    };

    var effects = {

        // simple "toggle" effect
        'default': function (i, done) {
            var conf = this.getConf(),
                panes = this.getPanes();
            if (conf.anotherClose) panes.hide();
            panes.eq(i).show();
            //done.call();
        },

        /*
         configuration:
         - fadeOutSpeed (positive value does "crossfading")
         - fadeInSpeed
         */
        fade: function (i, done) {

            var conf = this.getConf(),
                speed = conf.fadeOutSpeed,
                panes = this.getPanes();

            if (conf.anotherClose) {
                if (speed) {
                    panes.fadeOut(speed);
                } else {
                    panes.hide();
                }
            }

            panes.eq(i).fadeIn(conf.fadeInSpeed, done);
        },

        // for basic accordions
        slide: function (i, clickOnCurrent, done) {
            var conf = this.getConf(),
                panes = this.getPanes();
            if (!conf.anotherClose) {
                panes.eq(i).slideToggle(conf.slideDownSpeed, done);
            } else {
                if (clickOnCurrent && conf.currentClose) {
                    panes.eq(i).slideToggle(conf.slideDownSpeed, done);
                } else {
                    panes.slideUp(conf.slideUpSpeed);
                    panes.eq(i).slideDown(conf.slideDownSpeed, done);
                }
            }
        },

        /**
         * AJAX effect
         */
        ajax: function (i, done) {
            this.getPanes().eq(0).load(this.getTabs().eq(i).attr("href"), done);
        }
    };

    /**
     * Horizontal accordion
     *
     * @deprecated will be replaced with a more robust implementation
     */

    var
        /**
         * @type {Boolean}
         *
         * Mutex to control horizontal animation
         * Disables clicking of tabs while animating
         * They mess up otherwise as currentPane gets set *after* animation is done
         */
        animating,
        /**
         * @type {Number}
         *
         * Initial width of tab panes
         */
        w;

    $.tools.tabs.addEffect("horizontal", function (i, done) {
        if (animating) return; // don't allow other animations
        var nextPane = this.getPanes().eq(i),
            currentPane = this.getCurrentPane();

        // store original width of a pane into memory
        w || (w = this.getPanes().eq(0).width());
        animating = true;

        nextPane.show(); // hidden by default
        // animate current pane's width to zero
        // animate next pane's width at the same time for smooth animation
        currentPane.animate({
            width: 0
        }, {
            step: function (now) {
                nextPane.css("width", w - now);
            },
            complete: function () {
                $(this).hide();
                done.call();
                animating = false;
            }
        });
        // Dirty hack... onLoad, currentPant will be empty and nextPane will be the first pane
        // If this is the case, manually run callback since the animation never occured, and reset animating
        if (!currentPane.length) {
            done.call();
            animating = false;
        }
    });


    function Tabs(root, paneSelector, conf) {

        var self = this,
            trigger = root.add(this),
            tabs = root.find(conf.tabs),
            panes = paneSelector.jquery ? paneSelector : root.find(paneSelector),
            current;

        // make sure tabs and panes are found
        if (!tabs.length) {
            tabs = root.children();
        }
        if (!panes.length) {
            panes = root.parent().find(paneSelector);
        }
        if (!panes.length) {
            panes = $(paneSelector);
        }


        // public methods
        $.extend(this, {
            click: function (i, e) {

                var tab = tabs.eq(i);
                var clickOnCurrent = false;

                if (typeof i == 'string' && i.replace("#", "")) {
                    tab = tabs.filter("[href*=" + i.replace("#", "") + "]");
                    i = Math.max(tabs.index(tab), 0);
                }

                if (conf.rotate) {
                    var last = tabs.length - 1;
                    if (i < 0) {
                        return self.click(last, e);
                    }
                    if (i > last) {
                        return self.click(0, e);
                    }
                }

                if (!tab.length) {
                    if (current >= 0) return self;
                    if (conf.initialIndex < 0) return self;
                    i = conf.initialIndex;
                    tab = tabs.eq(i);
                }

                // current tab is being clicked
                if (i === current) clickOnCurrent = true;
                if (clickOnCurrent && !conf.currentClose) {
                    return self;
                }

                // possibility to cancel click action
                e = e || $.Event();
                e.type = "onBeforeClick";
                //trigger.trigger(e, [i]);
                // Direct call handler instead trigger (incorrect work in IE8
                if ($.isFunction(conf.onBeforeClick)) {
                    conf.onBeforeClick(e, i);
                }
                if (e.isDefaultPrevented()) {
                    return;
                }

                // call the effect
                effects[conf.effect].call(self, i, clickOnCurrent, function () {
                    current = i;
                    // onClick callback
                    e.type = "onClick";
                    //trigger.trigger(e, [i]);
                    // Direct call handler instead trigger (incorrect work in IE8
                    if ($.isFunction(conf.onClick)) {
                        conf.onClick(e, i);
                    }
                });

                // default behaviour
                if (clickOnCurrent && conf.currentClose) {
                    tab.toggleClass(conf.current);
                }
                else {
                    if (conf.anotherClose) tabs.removeClass(conf.current);
                    tab.toggleClass(conf.current);
                }

                return self;
            },

            getConf: function () {
                return conf;
            },

            getTabs: function () {
                return tabs;
            },

            getPanes: function () {
                return panes;
            },

            getCurrentPane: function () {
                return panes.eq(current);
            },

            getCurrentTab: function () {
                return tabs.eq(current);
            },

            getIndex: function () {
                return current;
            },

            next: function () {
                return self.click(current + 1);
            },

            prev: function () {
                return self.click(current - 1);
            },

            destroy: function () {
                tabs.unbind(conf.event).removeClass(conf.current);
                panes.find("a[href^=#]").unbind("click.T");
                return self;
            }

        });

        // callbacks
        $.each("onBeforeClick,onClick".split(","), function (i, name) {

            // configuration
            // Direct call handler (see upper) instead trigger (incorrect work in IE8)
            /*
             if ($.isFunction(conf[name])) {
             $(self).bind(name, conf[name]);
             }
             */

            // API
            self[name] = function (fn) {
                if (fn) {
                    $(self).bind(name, fn);
                }
                return self;
            };
        });


        if (conf.history && $.fn.history) {
            $.tools.history.init(tabs);
            conf.event = 'history';
        }

        // setup click actions for each tab
        tabs.each(function (i) {
            $(this).bind(conf.event, function (e) {
                self.click(i, e);
                return e.preventDefault();
            });
        });

        // cross tab anchor link
        panes.find("a[href^=#]").bind("click.T", function (e) {
            self.click($(this).attr("href"), e);
        });

        // open initial tab
        if (location.hash && conf.tabs == "a" && root.find("[href=" + location.hash + "]").length) {
            self.click(location.hash);

        } else {
            if (conf.initialIndex === 0 || conf.initialIndex > 0) {
                panes.hide();
                self.click(conf.initialIndex);
            }
        }

    }


    // jQuery plugin implementation
    $.fn.tabs = function (paneSelector, conf) {

        // return existing instance
        var el = this.data("tabs");
        if (el) {
            el.destroy();
            this.removeData("tabs");
        }

        if ($.isFunction(conf)) {
            conf = {
                onBeforeClick: conf
            };
        }

        // setup conf
        conf = $.extend({}, $.tools.tabs.conf, conf);


        this.each(function () {
            el = new Tabs($(this), paneSelector, conf);
            $(this).data("tabs", el);
        });

        return conf.api ? el : this;
    };

})(jQuery);

(function (a) {
    a.tools = a.tools || {version: "v1.2.6"}, a.tools.tooltip = {
        conf: {
            effect: "toggle",
            fadeOutSpeed: "fast",
            predelay: 0,
            delay: 30,
            opacity: 1,
            tip: 0,
            fadeIE: !1,
            position: ["top", "center"],
            offset: [0, 0],
            relative: !1,
            cancelDefault: !0,
            events: {
                def: "mouseenter,mouseleave",
                input: "focus,blur",
                widget: "focus mouseenter,blur mouseleave",
                tooltip: "mouseenter,mouseleave"
            },
            layout: "<div/>",
            tipClass: "tooltip"
        }, addEffect: function (a, c, d) {
            b[a] = [c, d]
        }
    };
    var b = {
        toggle: [function (a) {
            var b = this.getConf(), c = this.getTip(), d = b.opacity;
            d < 1 && c.css({opacity: d}), c.show(), a.call()
        }, function (a) {
            this.getTip().hide(), a.call()
        }], fade: [function (b) {
            var c = this.getConf();
            !a.browser.msie || c.fadeIE ? this.getTip().fadeTo(c.fadeInSpeed, c.opacity, b) : (this.getTip().show(), b())
        }, function (b) {
            var c = this.getConf();
            !a.browser.msie || c.fadeIE ? this.getTip().fadeOut(c.fadeOutSpeed, b) : (this.getTip().hide(), b())
        }]
    };

    function c(b, c, d) {
        var e = d.relative ? b.position().top : b.offset().top, f = d.relative ? b.position().left : b.offset().left, g = d.position[0];
        e -= c.outerHeight() - d.offset[0], f += b.outerWidth() + d.offset[1], /iPad/i.test(navigator.userAgent) && (e -= a(window).scrollTop());
        var h = c.outerHeight() + b.outerHeight();
        g == "center" && (e += h / 2), g == "bottom" && (e += h), g = d.position[1];
        var i = c.outerWidth() + b.outerWidth();
        g == "center" && (f -= i / 2), g == "left" && (f -= i);
        return {top: e, left: f}
    }

    function d(d, e) {
        var f = this, g = d.add(f), h, i = 0, j = 0, k = d.attr("title"), l = d.attr("data-tooltip"), m = b[e.effect], n, o = d.is(":input"), p = o && d.is(":checkbox, :radio, select, :button, :submit"), q = d.attr("type"), r = e.events[q] || e.events[o ? p ? "widget" : "input" : "def"];
        if (!m)throw"Nonexistent effect \"" + e.effect + "\"";
        r = r.split(/,\s*/);
        if (r.length != 2)throw"Tooltip: bad events configuration for " + q;
        d.bind(r[0], function (a) {
            clearTimeout(i), e.predelay ? j = setTimeout(function () {
                f.show(a)
            }, e.predelay) : f.show(a)
        }).bind(r[1], function (a) {
            clearTimeout(j), e.delay ? i = setTimeout(function () {
                f.hide(a)
            }, e.delay) : f.hide(a)
        }), k && e.cancelDefault && (d.removeAttr("title"), d.data("title", k)), a.extend(f, {
            show: function (b) {
                if (!h) {
                    l ? h = a(l) : e.tip ? h = a(e.tip).eq(0) : k ? h = a(e.layout).addClass(e.tipClass).appendTo(document.body).hide().append(k) : (h = d.next(), h.length || (h = d.parent().next()));
                    if (!h.length)throw"Cannot find tooltip for " + d
                }
                if (f.isShown())return f;
                h.stop(!0, !0);
                var o = c(d, h, e);
                e.tip && h.html(d.data("title")), b = a.Event(), b.type = "onBeforeShow", g.trigger(b, [o]);
                if (b.isDefaultPrevented())return f;
                o = c(d, h, e), h.css({
                    position: "absolute",
                    top: o.top,
                    left: o.left
                }), n = !0, m[0].call(f, function () {
                    b.type = "onShow", n = "full", g.trigger(b)
                });
                var p = e.events.tooltip.split(/,\s*/);
                h.data("__set") || (h.unbind(p[0]).bind(p[0], function () {
                    clearTimeout(i), clearTimeout(j)
                }), p[1] && !d.is("input:not(:checkbox, :radio), textarea") && h.unbind(p[1]).bind(p[1], function (a) {
                    a.relatedTarget != d[0] && d.trigger(r[1].split(" ")[0])
                }), e.tip || h.data("__set", !0));
                return f
            }, hide: function (c) {
                if (!h || !f.isShown())return f;
                c = a.Event(), c.type = "onBeforeHide", g.trigger(c);
                if (!c.isDefaultPrevented()) {
                    n = !1, b[e.effect][1].call(f, function () {
                        c.type = "onHide", g.trigger(c)
                    });
                    return f
                }
            }, isShown: function (a) {
                return a ? n == "full" : n
            }, getConf: function () {
                return e
            }, getTip: function () {
                return h
            }, getTrigger: function () {
                return d
            }
        }), a.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","), function (b, c) {
            a.isFunction(e[c]) && a(f).bind(c, e[c]), f[c] = function (b) {
                b && a(f).bind(c, b);
                return f
            }
        })
    }

    a.fn.tooltip = function (b) {
        var c = this.data("tooltip");
        if (c)return c;
        b = a.extend(!0, {}, a.tools.tooltip.conf, b), typeof b.position == "string" && (b.position = b.position.split(/,?\s/)), this.each(function () {
            c = new d(a(this), b), a(this).data("tooltip", c)
        });
        return b.api ? c : this
    }
})(jQuery);
(function (a) {
    var b = a.tools.tooltip;
    b.dynamic = {conf: {classNames: "top right bottom left"}};
    function c(b) {
        var c = a(window), d = c.width() + c.scrollLeft(), e = c.height() + c.scrollTop();
        return [b.offset().top <= c.scrollTop(), d <= b.offset().left + b.width(), e <= b.offset().top + b.height(), c.scrollLeft() >= b.offset().left]
    }

    function d(a) {
        var b = a.length;
        while (b--)if (a[b])return !1;
        return !0
    }

    a.fn.dynamic = function (e) {
        typeof e == "number" && (e = {speed: e}), e = a.extend({}, b.dynamic.conf, e);
        var f = a.extend(!0, {}, e), g = e.classNames.split(/\s/), h;
        this.each(function () {
            var b = a(this).tooltip().onBeforeShow(function (b, e) {
                var i = this.getTip(), j = this.getConf();
                h || (h = [j.position[0], j.position[1], j.offset[0], j.offset[1], a.extend({}, j)]), a.extend(j, h[4]), j.position = [h[0], h[1]], j.offset = [h[2], h[3]], i.css({
                    visibility: "hidden",
                    position: "absolute",
                    top: e.top,
                    left: e.left
                }).show();
                var k = a.extend(!0, {}, f), l = c(i);
                if (!d(l)) {
                    l[2] && (a.extend(j, k.top), j.position[0] = "top", i.addClass(g[0])), l[3] && (a.extend(j, k.right), j.position[1] = "right", i.addClass(g[1])), l[0] && (a.extend(j, k.bottom), j.position[0] = "bottom", i.addClass(g[2])), l[1] && (a.extend(j, k.left), j.position[1] = "left", i.addClass(g[3]));
                    if (l[0] || l[2])j.offset[0] *= -1;
                    if (l[1] || l[3])j.offset[1] *= -1
                }
                i.css({visibility: "visible"}).hide()
            });
            b.onBeforeShow(function () {
                var a = this.getConf(), b = this.getTip();
                setTimeout(function () {
                    a.position = [h[0], h[1]], a.offset = [h[2], h[3]]
                }, 0)
            }), b.onHide(function () {
                var a = this.getTip();
                a.removeClass(e.classNames)
            }), ret = b
        });
        return e.api ? ret : this
    }
})(jQuery);
(function (a) {
    var b = a.tools.tooltip;
    a.extend(b.conf, {
        direction: "up",
        bounce: !1,
        slideOffset: 10,
        slideInSpeed: 200,
        slideOutSpeed: 200,
        slideFade: !a.browser.msie
    });
    var c = {up: ["-", "top"], down: ["+", "top"], left: ["-", "left"], right: ["+", "left"]};
    b.addEffect("slide", function (a) {
        var b = this.getConf(), d = this.getTip(), e = b.slideFade ? {opacity: b.opacity} : {}, f = c[b.direction] || c.up;
        e[f[1]] = f[0] + "=" + b.slideOffset, b.slideFade && d.css({opacity: 0}), d.show().animate(e, b.slideInSpeed, a)
    }, function (b) {
        var d = this.getConf(), e = d.slideOffset, f = d.slideFade ? {opacity: 0} : {}, g = c[d.direction] || c.up, h = "" + g[0];
        d.bounce && (h = h == "+" ? "-" : "+"), f[g[1]] = h + "=" + e, this.getTip().animate(f, d.slideOutSpeed, function () {
            a(this).hide(), b.call()
        })
    })
})(jQuery);
