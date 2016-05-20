/*global jQuery:false */
var error_msg_box = null;
var googlemap_refreshed = false;

jQuery(document).ready(function () {
    jQuery('#opt_block .opt_header span').click(function () {
        if (jQuery(this).hasClass('vis')) {
            jQuery(this).removeClass('vis').parents('#opt_block').animate({'marginRight': 0}, 700, 'easeInCubic');
        }
        else {
            jQuery(this).addClass('vis').parents('#opt_block').animate({'marginRight': 222}, 700, 'easeInCubic');
        }
    });
    jQuery('.patterns_select li a').click(function () {
        var src = jQuery(this).find('img').attr('src');
        jQuery('body').addClass('colored').removeClass('image_bg').css({'background': 'url(' + src + ')'});
        setCookie('body_pt', src, 9999999, '/');
        deleteCookie('body_img', '/');
        deleteCookie('body_bg', '/');
        return false;
    });
    jQuery('.bg_select li a').click(function () {
        var src = jQuery(this).find('img').attr('src');
        jQuery('body').addClass('image_bg').css({'background': 'url(' + src + ')'});
        setCookie('body_img', src, 9999999, '/');
        deleteCookie('body_bg', '/');
        deleteCookie('body_pt', '/');
        return false;
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

    // Video and Audio tag wrapper
    jQuery('video,audio').mediaelementplayer(/* Options */);

    // Pretty photo
    jQuery("a[href$='jpg'],a[href$='jpeg'],a[href$='png'],a[href$='gif']").attr('rel', 'prettyPhoto');
    jQuery("a[rel^='prettyPhoto']").click(function (e) {
        if (jQuery(window).width() < 480) {
            e.stopImmediatePropagation();
            window.location = jQuery(this).attr('href');
        }
        e.preventDefault();
        return false;
    });
    jQuery("a[rel^='prettyPhoto']").prettyPhoto({
        social_tools: '',
        theme: 'light_rounded'
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
            } else if (tab.hasClass('contact_section_title')) {			// Contact
                // Google map refresh
                if (!googlemap_refreshed) {
                    if (window.googlemap_refresh) {
                        googlemap_refresh();
                    }
                    googlemap_refreshed = true;
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

    // ----------------------- Shortcodes setup -------------------
    jQuery('div.sc_infobox_closeable').click(function () {
        jQuery(this).fadeOut();
    });

    jQuery('.sc_tooltip_parent').hover(function () {
            var obj = jQuery(this);
            obj.find('.sc_tooltip').stop().animate({'marginTop': '5'}, 100).show();
        },
        function () {
            var obj = jQuery(this);
            obj.find('.sc_tooltip').stop().animate({'marginTop': '0'}, 100).hide();
        });
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
    var b;
    b = a.tools.tabs.slideshow = {
        conf: {
            next: ".forward",
            prev: ".backward",
            disabledClass: "disabled",
            autoplay: !1,
            autopause: !0,
            interval: 3e3,
            clickable: !0,
            api: !1
        }
    };
    function c(b, c) {
        var d = this, e = b.add(this), f = b.data("tabs"), g, h = !0;

        function i(c) {
            var d = a(c);
            return d.length < 2 ? d : b.parent().find(c)
        }

        var j = i(c.next).click(function () {
            f.next()
        }), k = i(c.prev).click(function () {
            f.prev()
        });

        function l() {
            g = setTimeout(function () {
                f.next()
            }, c.interval)
        }

        a.extend(d, {
            getTabs: function () {
                return f
            }, getConf: function () {
                return c
            }, play: function () {
                if (g)return d;
                var b = a.Event("onBeforePlay");
                e.trigger(b);
                if (b.isDefaultPrevented())return d;
                h = !1, e.trigger("onPlay"), e.bind("onClick", l), l();
                return d
            }, pause: function () {
                if (!g)return d;
                var b = a.Event("onBeforePause");
                e.trigger(b);
                if (b.isDefaultPrevented())return d;
                g = clearTimeout(g), e.trigger("onPause"), e.unbind("onClick", l);
                return d
            }, resume: function () {
                h || d.play()
            }, stop: function () {
                d.pause(), h = !0
            }
        }), a.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","), function (b, e) {
            a.isFunction(c[e]) && a(d).bind(e, c[e]), d[e] = function (b) {
                return a(d).bind(e, b)
            }
        }), c.autopause && f.getTabs().add(j).add(k).add(f.getPanes()).hover(d.pause, d.resume), c.autoplay && d.play(), c.clickable && f.getPanes().click(function () {
            f.next()
        });
        if (!f.getConf().rotate) {
            var m = c.disabledClass;
            f.getIndex() || k.addClass(m), f.onBeforeClick(function (a, b) {
                k.toggleClass(m, !b), j.toggleClass(m, b == f.getTabs().length - 1)
            })
        }
    }

    a.fn.slideshow = function (d) {
        var e = this.data("slideshow");
        if (e)return e;
        d = a.extend({}, b.conf, d), this.each(function () {
            e = new c(a(this), d), a(this).data("slideshow", e)
        });
        return d.api ? e : this
    }
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
/*!
 * MediaElement.js
 * HTML5 <video> and <audio> shim and player
 * http://mediaelementjs.com/
 *
 * Creates a JavaScript object that mimics HTML5 MediaElement API
 * for browsers that don't understand HTML5 or can't play the provided codec
 * Can play MP4 (H.264), Ogg, WebM, FLV, WMV, WMA, ACC, and MP3
 *
 * Copyright 2010-2013, John Dyer (http://j.hn)
 * License: MIT
 *
 */
var mejs = mejs || {};
mejs.version = "2.11.3";
mejs.meIndex = 0;
mejs.plugins = {
    silverlight: [{
        version: [3, 0],
        types: ["video/mp4", "video/m4v", "video/mov", "video/wmv", "audio/wma", "audio/m4a", "audio/mp3", "audio/wav", "audio/mpeg"]
    }],
    flash: [{
        version: [9, 0, 124],
        types: ["video/mp4", "video/m4v", "video/mov", "video/flv", "video/rtmp", "video/x-flv", "audio/flv", "audio/x-flv", "audio/mp3", "audio/m4a", "audio/mpeg", "video/youtube", "video/x-youtube"]
    }],
    youtube: [{version: null, types: ["video/youtube", "video/x-youtube", "audio/youtube", "audio/x-youtube"]}],
    vimeo: [{
        version: null, types: ["video/vimeo",
            "video/x-vimeo"]
    }]
};
mejs.Utility = {
    encodeUrl: function (a) {
        return encodeURIComponent(a)
    }, escapeHTML: function (a) {
        return a.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")
    }, absolutizeUrl: function (a) {
        var b = document.createElement("div");
        b.innerHTML = '<a href="' + this.escapeHTML(a) + '">x</a>';
        return b.firstChild.href
    }, getScriptPath: function (a) {
        for (var b = 0, c, d = "", e = "", f, g, h = document.getElementsByTagName("script"), l = h.length, j = a.length; b < l; b++) {
            f = h[b].src;
            c = f.lastIndexOf("/");
            if (c > -1) {
                g = f.substring(c +
                    1);
                f = f.substring(0, c + 1)
            } else {
                g = f;
                f = ""
            }
            for (c = 0; c < j; c++) {
                e = a[c];
                e = g.indexOf(e);
                if (e > -1) {
                    d = f;
                    break
                }
            }
            if (d !== "")break
        }
        return d
    }, secondsToTimeCode: function (a, b, c, d) {
        if (typeof c == "undefined")c = false; else if (typeof d == "undefined")d = 25;
        var e = Math.floor(a / 3600) % 24, f = Math.floor(a / 60) % 60, g = Math.floor(a % 60);
        a = Math.floor((a % 1 * d).toFixed(3));
        return (b || e > 0 ? (e < 10 ? "0" + e : e) + ":" : "") + (f < 10 ? "0" + f : f) + ":" + (g < 10 ? "0" + g : g) + (c ? ":" + (a < 10 ? "0" + a : a) : "")
    }, timeCodeToSeconds: function (a, b, c, d) {
        if (typeof c == "undefined")c = false; else if (typeof d ==
            "undefined")d = 25;
        a = a.split(":");
        b = parseInt(a[0], 10);
        var e = parseInt(a[1], 10), f = parseInt(a[2], 10), g = 0, h = 0;
        if (c)g = parseInt(a[3]) / d;
        return h = b * 3600 + e * 60 + f + g
    }, convertSMPTEtoSeconds: function (a) {
        if (typeof a != "string")return false;
        a = a.replace(",", ".");
        var b = 0, c = a.indexOf(".") != -1 ? a.split(".")[1].length : 0, d = 1;
        a = a.split(":").reverse();
        for (var e = 0; e < a.length; e++) {
            d = 1;
            if (e > 0)d = Math.pow(60, e);
            b += Number(a[e]) * d
        }
        return Number(b.toFixed(c))
    }, removeSwf: function (a) {
        var b = document.getElementById(a);
        if (b && /object|embed/i.test(b.nodeName))if (mejs.MediaFeatures.isIE) {
            b.style.display =
                "none";
            (function () {
                b.readyState == 4 ? mejs.Utility.removeObjectInIE(a) : setTimeout(arguments.callee, 10)
            })()
        } else b.parentNode.removeChild(b)
    }, removeObjectInIE: function (a) {
        if (a = document.getElementById(a)) {
            for (var b in a)if (typeof a[b] == "function")a[b] = null;
            a.parentNode.removeChild(a)
        }
    }
};
mejs.PluginDetector = {
    hasPluginVersion: function (a, b) {
        var c = this.plugins[a];
        b[1] = b[1] || 0;
        b[2] = b[2] || 0;
        return c[0] > b[0] || c[0] == b[0] && c[1] > b[1] || c[0] == b[0] && c[1] == b[1] && c[2] >= b[2] ? true : false
    },
    nav: window.navigator,
    ua: window.navigator.userAgent.toLowerCase(),
    plugins: [],
    addPlugin: function (a, b, c, d, e) {
        this.plugins[a] = this.detectPlugin(b, c, d, e)
    },
    detectPlugin: function (a, b, c, d) {
        var e = [0, 0, 0], f;
        if (typeof this.nav.plugins != "undefined" && typeof this.nav.plugins[a] == "object") {
            if ((c = this.nav.plugins[a].description) && !(typeof this.nav.mimeTypes != "undefined" && this.nav.mimeTypes[b] && !this.nav.mimeTypes[b].enabledPlugin)) {
                e = c.replace(a, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split(".");
                for (a = 0; a < e.length; a++)e[a] = parseInt(e[a].match(/\d+/), 10)
            }
        } else if (typeof window.ActiveXObject != "undefined")try {
            if (f = new ActiveXObject(c))e = d(f)
        } catch (g) {
        }
        return e
    }
};
mejs.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function (a) {
    var b = [];
    if (a = a.GetVariable("$version")) {
        a = a.split(" ")[1].split(",");
        b = [parseInt(a[0], 10), parseInt(a[1], 10), parseInt(a[2], 10)]
    }
    return b
});
mejs.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl", function (a) {
    var b = [0, 0, 0, 0], c = function (d, e, f, g) {
        for (; d.isVersionSupported(e[0] + "." + e[1] + "." + e[2] + "." + e[3]);)e[f] += g;
        e[f] -= g
    };
    c(a, b, 0, 1);
    c(a, b, 1, 1);
    c(a, b, 2, 1E4);
    c(a, b, 2, 1E3);
    c(a, b, 2, 100);
    c(a, b, 2, 10);
    c(a, b, 2, 1);
    c(a, b, 3, 1);
    return b
});
mejs.MediaFeatures = {
    init: function () {
        var a = this, b = document, c = mejs.PluginDetector.nav, d = mejs.PluginDetector.ua.toLowerCase(), e, f = ["source", "track", "audio", "video"];
        a.isiPad = d.match(/ipad/i) !== null;
        a.isiPhone = d.match(/iphone/i) !== null;
        a.isiOS = a.isiPhone || a.isiPad;
        a.isAndroid = d.match(/android/i) !== null;
        a.isBustedAndroid = d.match(/android 2\.[12]/) !== null;
        a.isIE = c.appName.toLowerCase().indexOf("microsoft") != -1;
        a.isChrome = d.match(/chrome/gi) !== null;
        a.isFirefox = d.match(/firefox/gi) !== null;
        a.isWebkit = d.match(/webkit/gi) !==
            null;
        a.isGecko = d.match(/gecko/gi) !== null && !a.isWebkit;
        a.isOpera = d.match(/opera/gi) !== null;
        a.hasTouch = "ontouchstart" in window;
        a.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
        for (c = 0; c < f.length; c++)e = document.createElement(f[c]);
        a.supportsMediaTag = typeof e.canPlayType !== "undefined" || a.isBustedAndroid;
        a.hasSemiNativeFullScreen = typeof e.webkitEnterFullscreen !== "undefined";
        a.hasWebkitNativeFullScreen = typeof e.webkitRequestFullScreen !== "undefined";
        a.hasMozNativeFullScreen = typeof e.mozRequestFullScreen !== "undefined";
        a.hasTrueNativeFullScreen = a.hasWebkitNativeFullScreen || a.hasMozNativeFullScreen;
        a.nativeFullScreenEnabled = a.hasTrueNativeFullScreen;
        if (a.hasMozNativeFullScreen)a.nativeFullScreenEnabled = e.mozFullScreenEnabled;
        if (this.isChrome)a.hasSemiNativeFullScreen = false;
        if (a.hasTrueNativeFullScreen) {
            a.fullScreenEventName = a.hasWebkitNativeFullScreen ? "webkitfullscreenchange" : "mozfullscreenchange";
            a.isFullScreen = function () {
                if (e.mozRequestFullScreen)return b.mozFullScreen;
                else if (e.webkitRequestFullScreen)return b.webkitIsFullScreen
            };
            a.requestFullScreen = function (g) {
                if (a.hasWebkitNativeFullScreen)g.webkitRequestFullScreen(); else a.hasMozNativeFullScreen && g.mozRequestFullScreen()
            };
            a.cancelFullScreen = function () {
                if (a.hasWebkitNativeFullScreen)document.webkitCancelFullScreen(); else a.hasMozNativeFullScreen && document.mozCancelFullScreen()
            }
        }
        if (a.hasSemiNativeFullScreen && d.match(/mac os x 10_5/i)) {
            a.hasNativeFullScreen = false;
            a.hasSemiNativeFullScreen = false
        }
    }
};
mejs.MediaFeatures.init();
mejs.HtmlMediaElement = {
    pluginType: "native", isFullScreen: false, setCurrentTime: function (a) {
        this.currentTime = a
    }, setMuted: function (a) {
        this.muted = a
    }, setVolume: function (a) {
        this.volume = a
    }, stop: function () {
        this.pause()
    }, setSrc: function (a) {
        for (var b = this.getElementsByTagName("source"); b.length > 0;)this.removeChild(b[0]);
        if (typeof a == "string")this.src = a; else {
            var c;
            for (b = 0; b < a.length; b++) {
                c = a[b];
                if (this.canPlayType(c.type)) {
                    this.src = c.src;
                    break
                }
            }
        }
    }, setVideoSize: function (a, b) {
        this.width = a;
        this.height = b
    }
};
mejs.PluginMediaElement = function (a, b, c) {
    this.id = a;
    this.pluginType = b;
    this.src = c;
    this.events = {};
    this.attributes = {}
};
mejs.PluginMediaElement.prototype = {
    pluginElement: null,
    pluginType: "",
    isFullScreen: false,
    playbackRate: -1,
    defaultPlaybackRate: -1,
    seekable: [],
    played: [],
    paused: true,
    ended: false,
    seeking: false,
    duration: 0,
    error: null,
    tagName: "",
    muted: false,
    volume: 1,
    currentTime: 0,
    play: function () {
        if (this.pluginApi != null) {
            this.pluginType == "youtube" ? this.pluginApi.playVideo() : this.pluginApi.playMedia();
            this.paused = false
        }
    },
    load: function () {
        if (this.pluginApi != null) {
            this.pluginType != "youtube" && this.pluginApi.loadMedia();
            this.paused =
                false
        }
    },
    pause: function () {
        if (this.pluginApi != null) {
            this.pluginType == "youtube" ? this.pluginApi.pauseVideo() : this.pluginApi.pauseMedia();
            this.paused = true
        }
    },
    stop: function () {
        if (this.pluginApi != null) {
            this.pluginType == "youtube" ? this.pluginApi.stopVideo() : this.pluginApi.stopMedia();
            this.paused = true
        }
    },
    canPlayType: function (a) {
        var b, c, d, e = mejs.plugins[this.pluginType];
        for (b = 0; b < e.length; b++) {
            d = e[b];
            if (mejs.PluginDetector.hasPluginVersion(this.pluginType, d.version))for (c = 0; c < d.types.length; c++)if (a == d.types[c])return "probably"
        }
        return ""
    },
    positionFullscreenButton: function (a, b, c) {
        this.pluginApi != null && this.pluginApi.positionFullscreenButton && this.pluginApi.positionFullscreenButton(a, b, c)
    },
    hideFullscreenButton: function () {
        this.pluginApi != null && this.pluginApi.hideFullscreenButton && this.pluginApi.hideFullscreenButton()
    },
    setSrc: function (a) {
        if (typeof a == "string") {
            this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(a));
            this.src = mejs.Utility.absolutizeUrl(a)
        } else {
            var b, c;
            for (b = 0; b < a.length; b++) {
                c = a[b];
                if (this.canPlayType(c.type)) {
                    this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(c.src));
                    this.src = mejs.Utility.absolutizeUrl(a);
                    break
                }
            }
        }
    },
    setCurrentTime: function (a) {
        if (this.pluginApi != null) {
            this.pluginType == "youtube" ? this.pluginApi.seekTo(a) : this.pluginApi.setCurrentTime(a);
            this.currentTime = a
        }
    },
    setVolume: function (a) {
        if (this.pluginApi != null) {
            this.pluginType == "youtube" ? this.pluginApi.setVolume(a * 100) : this.pluginApi.setVolume(a);
            this.volume = a
        }
    },
    setMuted: function (a) {
        if (this.pluginApi != null) {
            if (this.pluginType == "youtube") {
                a ? this.pluginApi.mute() : this.pluginApi.unMute();
                this.muted = a;
                this.dispatchEvent("volumechange")
            } else this.pluginApi.setMuted(a);
            this.muted = a
        }
    },
    setVideoSize: function (a, b) {
        if (this.pluginElement.style) {
            this.pluginElement.style.width = a + "px";
            this.pluginElement.style.height = b + "px"
        }
        this.pluginApi != null && this.pluginApi.setVideoSize && this.pluginApi.setVideoSize(a, b)
    },
    setFullscreen: function (a) {
        this.pluginApi != null && this.pluginApi.setFullscreen && this.pluginApi.setFullscreen(a)
    },
    enterFullScreen: function () {
        this.pluginApi != null && this.pluginApi.setFullscreen && this.setFullscreen(true)
    },
    exitFullScreen: function () {
        this.pluginApi != null && this.pluginApi.setFullscreen &&
        this.setFullscreen(false)
    },
    addEventListener: function (a, b) {
        this.events[a] = this.events[a] || [];
        this.events[a].push(b)
    },
    removeEventListener: function (a, b) {
        if (!a) {
            this.events = {};
            return true
        }
        var c = this.events[a];
        if (!c)return true;
        if (!b) {
            this.events[a] = [];
            return true
        }
        for (i = 0; i < c.length; i++)if (c[i] === b) {
            this.events[a].splice(i, 1);
            return true
        }
        return false
    },
    dispatchEvent: function (a) {
        var b, c, d = this.events[a];
        if (d) {
            c = Array.prototype.slice.call(arguments, 1);
            for (b = 0; b < d.length; b++)d[b].apply(null, c)
        }
    },
    hasAttribute: function (a) {
        return a in
            this.attributes
    },
    removeAttribute: function (a) {
        delete this.attributes[a]
    },
    getAttribute: function (a) {
        if (this.hasAttribute(a))return this.attributes[a];
        return ""
    },
    setAttribute: function (a, b) {
        this.attributes[a] = b
    },
    remove: function () {
        mejs.Utility.removeSwf(this.pluginElement.id);
        mejs.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id)
    }
};
mejs.MediaPluginBridge = {
    pluginMediaElements: {}, htmlMediaElements: {}, registerPluginElement: function (a, b, c) {
        this.pluginMediaElements[a] = b;
        this.htmlMediaElements[a] = c
    }, unregisterPluginElement: function (a) {
        delete this.pluginMediaElements[a];
        delete this.htmlMediaElements[a]
    }, initPlugin: function (a) {
        var b = this.pluginMediaElements[a], c = this.htmlMediaElements[a];
        if (b) {
            switch (b.pluginType) {
                case "flash":
                    b.pluginElement = b.pluginApi = document.getElementById(a);
                    break;
                case "silverlight":
                    b.pluginElement = document.getElementById(b.id);
                    b.pluginApi = b.pluginElement.Content.MediaElementJS
            }
            b.pluginApi != null && b.success && b.success(b, c)
        }
    }, fireEvent: function (a, b, c) {
        var d, e;
        a = this.pluginMediaElements[a];
        b = {type: b, target: a};
        for (d in c) {
            a[d] = c[d];
            b[d] = c[d]
        }
        e = c.bufferedTime || 0;
        b.target.buffered = b.buffered = {
            start: function () {
                return 0
            }, end: function () {
                return e
            }, length: 1
        };
        a.dispatchEvent(b.type, b)
    }
};
mejs.MediaElementDefaults = {
    mode: "auto",
    plugins: ["flash", "silverlight", "youtube", "vimeo"],
    enablePluginDebug: false,
    type: "",
    pluginPath: mejs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
    flashName: "flashmediaelement.swf",
    flashStreamer: "",
    enablePluginSmoothing: false,
    enablePseudoStreaming: false,
    pseudoStreamingStartQueryParam: "start",
    silverlightName: "silverlightmediaelement.xap",
    defaultVideoWidth: 480,
    defaultVideoHeight: 270,
    pluginWidth: -1,
    pluginHeight: -1,
    pluginVars: [],
    timerRate: 250,
    startVolume: 0.8,
    success: function () {
    },
    error: function () {
    }
};
mejs.MediaElement = function (a, b) {
    return mejs.HtmlMediaElementShim.create(a, b)
};
mejs.HtmlMediaElementShim = {
    create: function (a, b) {
        var c = mejs.MediaElementDefaults, d = typeof a == "string" ? document.getElementById(a) : a, e = d.tagName.toLowerCase(), f = e === "audio" || e === "video", g = f ? d.getAttribute("src") : d.getAttribute("href");
        e = d.getAttribute("poster");
        var h = d.getAttribute("autoplay"), l = d.getAttribute("preload"), j = d.getAttribute("controls"), k;
        for (k in b)c[k] = b[k];
        g = typeof g == "undefined" || g === null || g == "" ? null : g;
        e = typeof e == "undefined" || e === null ? "" : e;
        l = typeof l == "undefined" || l === null || l === "false" ?
            "none" : l;
        h = !(typeof h == "undefined" || h === null || h === "false");
        j = !(typeof j == "undefined" || j === null || j === "false");
        k = this.determinePlayback(d, c, mejs.MediaFeatures.supportsMediaTag, f, g);
        k.url = k.url !== null ? mejs.Utility.absolutizeUrl(k.url) : "";
        if (k.method == "native") {
            if (mejs.MediaFeatures.isBustedAndroid) {
                d.src = k.url;
                d.addEventListener("click", function () {
                    d.play()
                }, false)
            }
            return this.updateNative(k, c, h, l)
        } else if (k.method !== "")return this.createPlugin(k, c, e, h, l, j); else {
            this.createErrorMessage(k, c, e);
            return this
        }
    },
    determinePlayback: function (a, b, c, d, e) {
        var f = [], g, h, l, j = {
            method: "",
            url: "",
            htmlMediaElement: a,
            isVideo: a.tagName.toLowerCase() != "audio"
        }, k;
        if (typeof b.type != "undefined" && b.type !== "")if (typeof b.type == "string")f.push({
            type: b.type,
            url: e
        }); else for (g = 0; g < b.type.length; g++)f.push({type: b.type[g], url: e}); else if (e !== null) {
            l = this.formatType(e, a.getAttribute("type"));
            f.push({type: l, url: e})
        } else for (g = 0; g < a.childNodes.length; g++) {
            h = a.childNodes[g];
            if (h.nodeType == 1 && h.tagName.toLowerCase() == "source") {
                e = h.getAttribute("src");
                l = this.formatType(e, h.getAttribute("type"));
                h = h.getAttribute("media");
                if (!h || !window.matchMedia || window.matchMedia && window.matchMedia(h).matches)f.push({
                    type: l,
                    url: e
                })
            }
        }
        if (!d && f.length > 0 && f[0].url !== null && this.getTypeFromFile(f[0].url).indexOf("audio") > -1)j.isVideo = false;
        if (mejs.MediaFeatures.isBustedAndroid)a.canPlayType = function (m) {
            return m.match(/video\/(mp4|m4v)/gi) !== null ? "maybe" : ""
        };
        if (c && (b.mode === "auto" || b.mode === "auto_plugin" || b.mode === "native")) {
            if (!d) {
                g = document.createElement(j.isVideo ?
                    "video" : "audio");
                a.parentNode.insertBefore(g, a);
                a.style.display = "none";
                j.htmlMediaElement = a = g
            }
            for (g = 0; g < f.length; g++)if (a.canPlayType(f[g].type).replace(/no/, "") !== "" || a.canPlayType(f[g].type.replace(/mp3/, "mpeg")).replace(/no/, "") !== "") {
                j.method = "native";
                j.url = f[g].url;
                break
            }
            if (j.method === "native") {
                if (j.url !== null)a.src = j.url;
                if (b.mode !== "auto_plugin")return j
            }
        }
        if (b.mode === "auto" || b.mode === "auto_plugin" || b.mode === "shim")for (g = 0; g < f.length; g++) {
            l = f[g].type;
            for (a = 0; a < b.plugins.length; a++) {
                e = b.plugins[a];
                h = mejs.plugins[e];
                for (c = 0; c < h.length; c++) {
                    k = h[c];
                    if (k.version == null || mejs.PluginDetector.hasPluginVersion(e, k.version))for (d = 0; d < k.types.length; d++)if (l == k.types[d]) {
                        j.method = e;
                        j.url = f[g].url;
                        return j
                    }
                }
            }
        }
        if (b.mode === "auto_plugin" && j.method === "native")return j;
        if (j.method === "" && f.length > 0)j.url = f[0].url;
        return j
    }, formatType: function (a, b) {
        return a && !b ? this.getTypeFromFile(a) : b && ~b.indexOf(";") ? b.substr(0, b.indexOf(";")) : b
    }, getTypeFromFile: function (a) {
        a = a.split("?")[0];
        a = a.substring(a.lastIndexOf(".") +
            1).toLowerCase();
        return (/(mp4|m4v|ogg|ogv|webm|webmv|flv|wmv|mpeg|mov)/gi.test(a) ? "video" : "audio") + "/" + this.getTypeFromExtension(a)
    }, getTypeFromExtension: function (a) {
        switch (a) {
            case "mp4":
            case "m4v":
                return "mp4";
            case "webm":
            case "webma":
            case "webmv":
                return "webm";
            case "ogg":
            case "oga":
            case "ogv":
                return "ogg";
            default:
                return a
        }
    }, createErrorMessage: function (a, b, c) {
        var d = a.htmlMediaElement, e = document.createElement("div");
        e.className = "me-cannotplay";
        try {
            e.style.width = d.width + "px";
            e.style.height = d.height + "px"
        } catch (f) {
        }
        e.innerHTML =
            c !== "" ? '<a href="' + a.url + '"><img src="' + c + '" width="100%" height="100%" /></a>' : '<a href="' + a.url + '"><span>' + mejs.i18n.t("Download File") + "</span></a>";
        d.parentNode.insertBefore(e, d);
        d.style.display = "none";
        b.error(d)
    }, createPlugin: function (a, b, c, d, e, f) {
        c = a.htmlMediaElement;
        var g = 1, h = 1, l = "me_" + a.method + "_" + mejs.meIndex++, j = new mejs.PluginMediaElement(l, a.method, a.url), k = document.createElement("div"), m;
        j.tagName = c.tagName;
        for (m = 0; m < c.attributes.length; m++) {
            var n = c.attributes[m];
            n.specified == true && j.setAttribute(n.name,
                n.value)
        }
        for (m = c.parentNode; m !== null && m.tagName.toLowerCase() != "body";) {
            if (m.parentNode.tagName.toLowerCase() == "p") {
                m.parentNode.parentNode.insertBefore(m, m.parentNode);
                break
            }
            m = m.parentNode
        }
        if (a.isVideo) {
            g = b.videoWidth > 0 ? b.videoWidth : c.getAttribute("width") !== null ? c.getAttribute("width") : b.defaultVideoWidth;
            h = b.videoHeight > 0 ? b.videoHeight : c.getAttribute("height") !== null ? c.getAttribute("height") : b.defaultVideoHeight;
            g = mejs.Utility.encodeUrl(g);
            h = mejs.Utility.encodeUrl(h)
        } else if (b.enablePluginDebug) {
            g =
                320;
            h = 240
        }
        j.success = b.success;
        mejs.MediaPluginBridge.registerPluginElement(l, j, c);
        k.className = "me-plugin";
        k.id = l + "_container";
        a.isVideo ? c.parentNode.insertBefore(k, c) : document.body.insertBefore(k, document.body.childNodes[0]);
        d = ["id=" + l, "isvideo=" + (a.isVideo ? "true" : "false"), "autoplay=" + (d ? "true" : "false"), "preload=" + e, "width=" + g, "startvolume=" + b.startVolume, "timerrate=" + b.timerRate, "flashstreamer=" + b.flashStreamer, "height=" + h, "pseudostreamstart=" + b.pseudoStreamingStartQueryParam];
        if (a.url !== null)a.method ==
        "flash" ? d.push("file=" + mejs.Utility.encodeUrl(a.url)) : d.push("file=" + a.url);
        b.enablePluginDebug && d.push("debug=true");
        b.enablePluginSmoothing && d.push("smoothing=true");
        b.enablePseudoStreaming && d.push("pseudostreaming=true");
        f && d.push("controls=true");
        if (b.pluginVars)d = d.concat(b.pluginVars);
        switch (a.method) {
            case "silverlight":
                k.innerHTML = '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + l + '" name="' + l + '" width="' + g + '" height="' + h + '" class="mejs-shim"><param name="initParams" value="' +
                    d.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + b.pluginPath + b.silverlightName + '" /></object>';
                break;
            case "flash":
                if (mejs.MediaFeatures.isIE) {
                    a = document.createElement("div");
                    k.appendChild(a);
                    a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' +
                        l + '" width="' + g + '" height="' + h + '" class="mejs-shim"><param name="movie" value="' + b.pluginPath + b.flashName + "?x=" + new Date + '" /><param name="flashvars" value="' + d.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>'
                } else k.innerHTML = '<embed id="' + l + '" name="' + l + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' +
                    b.pluginPath + b.flashName + '" flashvars="' + d.join("&") + '" width="' + g + '" height="' + h + '" class="mejs-shim"></embed>';
                break;
            case "youtube":
                b = a.url.substr(a.url.lastIndexOf("=") + 1);
                youtubeSettings = {
                    container: k,
                    containerId: k.id,
                    pluginMediaElement: j,
                    pluginId: l,
                    videoId: b,
                    height: h,
                    width: g
                };
                mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0]) ? mejs.YouTubeApi.createFlash(youtubeSettings) : mejs.YouTubeApi.enqueueIframe(youtubeSettings);
                break;
            case "vimeo":
                j.vimeoid = a.url.substr(a.url.lastIndexOf("/") + 1);
                k.innerHTML =
                    '<iframe src="http://player.vimeo.com/video/' + j.vimeoid + '?portrait=0&byline=0&title=0" width="' + g + '" height="' + h + '" frameborder="0" class="mejs-shim"></iframe>'
        }
        c.style.display = "none";
        return j
    }, updateNative: function (a, b) {
        var c = a.htmlMediaElement, d;
        for (d in mejs.HtmlMediaElement)c[d] = mejs.HtmlMediaElement[d];
        b.success(c, c);
        return c
    }
};
mejs.YouTubeApi = {
    isIframeStarted: false, isIframeLoaded: false, loadIframeApi: function () {
        if (!this.isIframeStarted) {
            var a = document.createElement("script");
            a.src = "//www.youtube.com/player_api";
            var b = document.getElementsByTagName("script")[0];
            b.parentNode.insertBefore(a, b);
            this.isIframeStarted = true
        }
    }, iframeQueue: [], enqueueIframe: function (a) {
        if (this.isLoaded)this.createIframe(a); else {
            this.loadIframeApi();
            this.iframeQueue.push(a)
        }
    }, createIframe: function (a) {
        var b = a.pluginMediaElement, c = new YT.Player(a.containerId,
            {
                height: a.height,
                width: a.width,
                videoId: a.videoId,
                playerVars: {controls: 0},
                events: {
                    onReady: function () {
                        a.pluginMediaElement.pluginApi = c;
                        mejs.MediaPluginBridge.initPlugin(a.pluginId);
                        setInterval(function () {
                            mejs.YouTubeApi.createEvent(c, b, "timeupdate")
                        }, 250)
                    }, onStateChange: function (d) {
                        mejs.YouTubeApi.handleStateChange(d.data, c, b)
                    }
                }
            })
    }, createEvent: function (a, b, c) {
        c = {type: c, target: b};
        if (a && a.getDuration) {
            b.currentTime = c.currentTime = a.getCurrentTime();
            b.duration = c.duration = a.getDuration();
            c.paused = b.paused;
            c.ended = b.ended;
            c.muted = a.isMuted();
            c.volume = a.getVolume() / 100;
            c.bytesTotal = a.getVideoBytesTotal();
            c.bufferedBytes = a.getVideoBytesLoaded();
            var d = c.bufferedBytes / c.bytesTotal * c.duration;
            c.target.buffered = c.buffered = {
                start: function () {
                    return 0
                }, end: function () {
                    return d
                }, length: 1
            }
        }
        b.dispatchEvent(c.type, c)
    }, iFrameReady: function () {
        for (this.isIframeLoaded = this.isLoaded = true; this.iframeQueue.length > 0;)this.createIframe(this.iframeQueue.pop())
    }, flashPlayers: {}, createFlash: function (a) {
        this.flashPlayers[a.pluginId] =
            a;
        var b, c = "//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" + a.pluginId + "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";
        if (mejs.MediaFeatures.isIE) {
            b = document.createElement("div");
            a.container.appendChild(b);
            b.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + a.pluginId + '" width="' + a.width + '" height="' + a.height + '" class="mejs-shim"><param name="movie" value="' +
                c + '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>'
        } else a.container.innerHTML = '<object type="application/x-shockwave-flash" id="' + a.pluginId + '" data="' + c + '" width="' + a.width + '" height="' + a.height + '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="always"><param name="wmode" value="transparent"></object>'
    }, flashReady: function (a) {
        var b = this.flashPlayers[a], c =
            document.getElementById(a), d = b.pluginMediaElement;
        d.pluginApi = d.pluginElement = c;
        mejs.MediaPluginBridge.initPlugin(a);
        c.cueVideoById(b.videoId);
        a = b.containerId + "_callback";
        window[a] = function (e) {
            mejs.YouTubeApi.handleStateChange(e, c, d)
        };
        c.addEventListener("onStateChange", a);
        setInterval(function () {
            mejs.YouTubeApi.createEvent(c, d, "timeupdate")
        }, 250)
    }, handleStateChange: function (a, b, c) {
        switch (a) {
            case -1:
                c.paused = true;
                c.ended = true;
                mejs.YouTubeApi.createEvent(b, c, "loadedmetadata");
                break;
            case 0:
                c.paused = false;
                c.ended = true;
                mejs.YouTubeApi.createEvent(b, c, "ended");
                break;
            case 1:
                c.paused = false;
                c.ended = false;
                mejs.YouTubeApi.createEvent(b, c, "play");
                mejs.YouTubeApi.createEvent(b, c, "playing");
                break;
            case 2:
                c.paused = true;
                c.ended = false;
                mejs.YouTubeApi.createEvent(b, c, "pause");
                break;
            case 3:
                mejs.YouTubeApi.createEvent(b, c, "progress")
        }
    }
};
function onYouTubePlayerAPIReady() {
    mejs.YouTubeApi.iFrameReady()
}
function onYouTubePlayerReady(a) {
    mejs.YouTubeApi.flashReady(a)
}
window.mejs = mejs;
window.MediaElement = mejs.MediaElement;
(function (a, b) {
    var c = {locale: {strings: {}}, methods: {}};
    c.locale.getLanguage = function () {
        return {language: navigator.language}
    };
    c.locale.INIT_LANGUAGE = c.locale.getLanguage();
    c.methods.checkPlain = function (d) {
        var e, f, g = {"&": "&amp;", '"': "&quot;", "<": "&lt;", ">": "&gt;"};
        d = String(d);
        for (e in g)if (g.hasOwnProperty(e)) {
            f = RegExp(e, "g");
            d = d.replace(f, g[e])
        }
        return d
    };
    c.methods.formatString = function (d, e) {
        for (var f in e) {
            switch (f.charAt(0)) {
                case "@":
                    e[f] = c.methods.checkPlain(e[f]);
                    break;
                case "!":
                    break;
                default:
                    e[f] =
                        '<em class="placeholder">' + c.methods.checkPlain(e[f]) + "</em>"
            }
            d = d.replace(f, e[f])
        }
        return d
    };
    c.methods.t = function (d, e, f) {
        if (c.locale.strings && c.locale.strings[f.context] && c.locale.strings[f.context][d])d = c.locale.strings[f.context][d];
        if (e)d = c.methods.formatString(d, e);
        return d
    };
    c.t = function (d, e, f) {
        if (typeof d === "string" && d.length > 0) {
            var g = c.locale.getLanguage();
            f = f || {context: g.language};
            return c.methods.t(d, e, f)
        } else throw{name: "InvalidArgumentException", message: "First argument is either not a string or empty."};
    };
    b.i18n = c
})(document, mejs);
(function (a) {
    a.de = {
        Fullscreen: "Vollbild",
        "Go Fullscreen": "Vollbild an",
        "Turn off Fullscreen": "Vollbild aus",
        Close: "Schlie\u00dfen"
    }
})(mejs.i18n.locale.strings);
(function (a) {
    a.zh = {
        Fullscreen: "\u5168\u87a2\u5e55",
        "Go Fullscreen": "\u5168\u5c4f\u6a21\u5f0f",
        "Turn off Fullscreen": "\u9000\u51fa\u5168\u5c4f\u6a21\u5f0f",
        Close: "\u95dc\u9589"
    }
})(mejs.i18n.locale.strings);

/*!
 * MediaElementPlayer
 * http://mediaelementjs.com/
 *
 * Creates a controller bar for HTML5 <video> add <audio> tags
 * using jQuery and MediaElement.js (HTML5 Flash/Silverlight wrapper)
 *
 * Copyright 2010-2012, John Dyer (http://j.hn/)
 * License: MIT
 *
 */
if (typeof jQuery != "undefined")mejs.$ = jQuery; else if (typeof ender != "undefined")mejs.$ = ender;
(function (f) {
    mejs.MepDefaults = {
        poster: "",
        defaultVideoWidth: 480,
        defaultVideoHeight: 270,
        videoWidth: -1,
        videoHeight: -1,
        defaultAudioWidth: 400,
        defaultAudioHeight: 30,
        defaultSeekBackwardInterval: function (a) {
            return a.duration * 0.05
        },
        defaultSeekForwardInterval: function (a) {
            return a.duration * 0.05
        },
        audioWidth: -1,
        audioHeight: -1,
        startVolume: 0.8,
        loop: false,
        autoRewind: true,
        enableAutosize: true,
        alwaysShowHours: false,
        showTimecodeFrameCount: false,
        framesPerSecond: 25,
        autosizeProgress: true,
        alwaysShowControls: false,
        hideVideoControlsOnLoad: false,
        clickToPlayPause: true,
        iPadUseNativeControls: false,
        iPhoneUseNativeControls: false,
        AndroidUseNativeControls: false,
        features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"],
        isVideo: true,
        enableKeyboard: true,
        pauseOtherPlayers: true,
        keyActions: [{
            keys: [32, 179], action: function (a, b) {
                b.paused || b.ended ? b.play() : b.pause()
            }
        }, {
            keys: [38], action: function (a, b) {
                b.setVolume(Math.min(b.volume + 0.1, 1))
            }
        }, {
            keys: [40], action: function (a, b) {
                b.setVolume(Math.max(b.volume - 0.1, 0))
            }
        }, {
            keys: [37, 227], action: function (a,
                                               b) {
                if (!isNaN(b.duration) && b.duration > 0) {
                    if (a.isVideo) {
                        a.showControls();
                        a.startControlsTimer()
                    }
                    var c = Math.max(b.currentTime - a.options.defaultSeekBackwardInterval(b), 0);
                    b.setCurrentTime(c)
                }
            }
        }, {
            keys: [39, 228], action: function (a, b) {
                if (!isNaN(b.duration) && b.duration > 0) {
                    if (a.isVideo) {
                        a.showControls();
                        a.startControlsTimer()
                    }
                    var c = Math.min(b.currentTime + a.options.defaultSeekForwardInterval(b), b.duration);
                    b.setCurrentTime(c)
                }
            }
        }, {
            keys: [70], action: function (a) {
                if (typeof a.enterFullScreen != "undefined")a.isFullScreen ?
                    a.exitFullScreen() : a.enterFullScreen()
            }
        }]
    };
    mejs.mepIndex = 0;
    mejs.players = {};
    mejs.MediaElementPlayer = function (a, b) {
        if (!(this instanceof mejs.MediaElementPlayer))return new mejs.MediaElementPlayer(a, b);
        this.$media = this.$node = f(a);
        this.node = this.media = this.$media[0];
        if (typeof this.node.player != "undefined")return this.node.player; else this.node.player = this;
        if (typeof b == "undefined")b = this.$node.data("mejsoptions");
        this.options = f.extend({}, mejs.MepDefaults, b);
        this.id = "mep_" + mejs.mepIndex++;
        mejs.players[this.id] =
            this;
        this.init();
        return this
    };
    mejs.MediaElementPlayer.prototype = {
        hasFocus: false, controlsAreVisible: true, init: function () {
            var a = this, b = mejs.MediaFeatures, c = f.extend(true, {}, a.options, {
                success: function (e, g) {
                    a.meReady(e, g)
                }, error: function (e) {
                    a.handleError(e)
                }
            }), d = a.media.tagName.toLowerCase();
            a.isDynamic = d !== "audio" && d !== "video";
            a.isVideo = a.isDynamic ? a.options.isVideo : d !== "audio" && a.options.isVideo;
            if (b.isiPad && a.options.iPadUseNativeControls || b.isiPhone && a.options.iPhoneUseNativeControls) {
                a.$media.attr("controls",
                    "controls");
                if (b.isiPad && a.media.getAttribute("autoplay") !== null) {
                    a.media.load();
                    a.media.play()
                }
            } else if (!(b.isAndroid && a.options.AndroidUseNativeControls)) {
                a.$media.removeAttr("controls");
                a.container = f('<div id="' + a.id + '" class="mejs-container ' + (mejs.MediaFeatures.svg ? "svg" : "no-svg") + '"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>').addClass(a.$media[0].className).insertBefore(a.$media);
                a.container.addClass((b.isAndroid ? "mejs-android " : "") + (b.isiOS ? "mejs-ios " : "") + (b.isiPad ? "mejs-ipad " : "") + (b.isiPhone ? "mejs-iphone " : "") + (a.isVideo ? "mejs-video " : "mejs-audio "));
                if (b.isiOS) {
                    b = a.$media.clone();
                    a.container.find(".mejs-mediaelement").append(b);
                    a.$media.remove();
                    a.$node = a.$media = b;
                    a.node = a.media = b[0]
                } else a.container.find(".mejs-mediaelement").append(a.$media);
                a.controls = a.container.find(".mejs-controls");
                a.layers = a.container.find(".mejs-layers");
                b = a.isVideo ? "video" : "audio";
                d = b.substring(0,
                        1).toUpperCase() + b.substring(1);
                a.width = a.options[b + "Width"] > 0 || a.options[b + "Width"].toString().indexOf("%") > -1 ? a.options[b + "Width"] : a.media.style.width !== "" && a.media.style.width !== null ? a.media.style.width : a.media.getAttribute("width") !== null ? a.$media.attr("width") : a.options["default" + d + "Width"];
                a.height = a.options[b + "Height"] > 0 || a.options[b + "Height"].toString().indexOf("%") > -1 ? a.options[b + "Height"] : a.media.style.height !== "" && a.media.style.height !== null ? a.media.style.height : a.$media[0].getAttribute("height") !==
                null ? a.$media.attr("height") : a.options["default" + d + "Height"];
                a.setPlayerSize(a.width, a.height);
                c.pluginWidth = a.height;
                c.pluginHeight = a.width
            }
            mejs.MediaElement(a.$media[0], c);
            typeof a.container != "undefined" && a.container.trigger("controlsshown")
        }, showControls: function (a) {
            var b = this;
            a = typeof a == "undefined" || a;
            if (!b.controlsAreVisible) {
                if (a) {
                    b.controls.css("visibility", "visible").stop(true, true).fadeIn(200, function () {
                        b.controlsAreVisible = true;
                        b.container.trigger("controlsshown")
                    });
                    b.container.find(".mejs-control").css("visibility",
                        "visible").stop(true, true).fadeIn(200, function () {
                        b.controlsAreVisible = true
                    })
                } else {
                    b.controls.css("visibility", "visible").css("display", "block");
                    b.container.find(".mejs-control").css("visibility", "visible").css("display", "block");
                    b.controlsAreVisible = true;
                    b.container.trigger("controlsshown")
                }
                b.setControlsSize()
            }
        }, hideControls: function (a) {
            var b = this;
            a = typeof a == "undefined" || a;
            if (b.controlsAreVisible)if (a) {
                b.controls.stop(true, true).fadeOut(200, function () {
                    f(this).css("visibility", "hidden").css("display",
                        "block");
                    b.controlsAreVisible = false;
                    b.container.trigger("controlshidden")
                });
                b.container.find(".mejs-control").stop(true, true).fadeOut(200, function () {
                    f(this).css("visibility", "hidden").css("display", "block")
                })
            } else {
                b.controls.css("visibility", "hidden").css("display", "block");
                b.container.find(".mejs-control").css("visibility", "hidden").css("display", "block");
                b.controlsAreVisible = false;
                b.container.trigger("controlshidden")
            }
        }, controlsTimer: null, startControlsTimer: function (a) {
            var b = this;
            a = typeof a != "undefined" ?
                a : 1500;
            b.killControlsTimer("start");
            b.controlsTimer = setTimeout(function () {
                b.hideControls();
                b.killControlsTimer("hide")
            }, a)
        }, killControlsTimer: function () {
            if (this.controlsTimer !== null) {
                clearTimeout(this.controlsTimer);
                delete this.controlsTimer;
                this.controlsTimer = null
            }
        }, controlsEnabled: true, disableControls: function () {
            this.killControlsTimer();
            this.hideControls(false);
            this.controlsEnabled = false
        }, enableControls: function () {
            this.showControls(false);
            this.controlsEnabled = true
        }, meReady: function (a, b) {
            var c = this,
                d = mejs.MediaFeatures, e = b.getAttribute("autoplay");
            e = !(typeof e == "undefined" || e === null || e === "false");
            var g;
            if (!c.created) {
                c.created = true;
                c.media = a;
                c.domNode = b;
                if (!(d.isAndroid && c.options.AndroidUseNativeControls) && !(d.isiPad && c.options.iPadUseNativeControls) && !(d.isiPhone && c.options.iPhoneUseNativeControls)) {
                    c.buildposter(c, c.controls, c.layers, c.media);
                    c.buildkeyboard(c, c.controls, c.layers, c.media);
                    c.buildoverlays(c, c.controls, c.layers, c.media);
                    c.findTracks();
                    for (g in c.options.features) {
                        d = c.options.features[g];
                        if (c["build" + d])try {
                            c["build" + d](c, c.controls, c.layers, c.media)
                        } catch (k) {
                        }
                    }
                    c.container.trigger("controlsready");
                    c.setPlayerSize(c.width, c.height);
                    c.setControlsSize();
                    if (c.isVideo) {
                        if (mejs.MediaFeatures.hasTouch)c.$media.bind("touchstart", function () {
                            if (c.controlsAreVisible)c.hideControls(false); else c.controlsEnabled && c.showControls(false)
                        }); else {
                            c.media.addEventListener("click", function () {
                                if (c.options.clickToPlayPause)c.media.paused ? c.media.play() : c.media.pause()
                            });
                            c.container.bind("mouseenter mouseover",
                                function () {
                                    if (c.controlsEnabled)if (!c.options.alwaysShowControls) {
                                        c.killControlsTimer("enter");
                                        c.showControls();
                                        c.startControlsTimer(2500)
                                    }
                                }).bind("mousemove", function () {
                                if (c.controlsEnabled) {
                                    c.controlsAreVisible || c.showControls();
                                    c.options.alwaysShowControls || c.startControlsTimer(2500)
                                }
                            }).bind("mouseleave", function () {
                                c.controlsEnabled && !c.media.paused && !c.options.alwaysShowControls && c.startControlsTimer(1E3)
                            })
                        }
                        c.options.hideVideoControlsOnLoad && c.hideControls(false);
                        e && !c.options.alwaysShowControls &&
                        c.hideControls();
                        c.options.enableAutosize && c.media.addEventListener("loadedmetadata", function (j) {
                            if (c.options.videoHeight <= 0 && c.domNode.getAttribute("height") === null && !isNaN(j.target.videoHeight)) {
                                c.setPlayerSize(j.target.videoWidth, j.target.videoHeight);
                                c.setControlsSize();
                                c.media.setVideoSize(j.target.videoWidth, j.target.videoHeight)
                            }
                        }, false)
                    }
                    a.addEventListener("play", function () {
                        for (var j in mejs.players) {
                            var l = mejs.players[j];
                            l.id != c.id && c.options.pauseOtherPlayers && !l.paused && !l.ended && l.pause();
                            l.hasFocus = false
                        }
                        c.hasFocus = true
                    }, false);
                    c.media.addEventListener("ended", function () {
                        if (c.options.autoRewind)try {
                            c.media.setCurrentTime(0)
                        } catch (j) {
                        }
                        c.media.pause();
                        c.setProgressRail && c.setProgressRail();
                        c.setCurrentRail && c.setCurrentRail();
                        if (c.options.loop)c.media.play(); else!c.options.alwaysShowControls && c.controlsEnabled && c.showControls()
                    }, false);
                    c.media.addEventListener("loadedmetadata", function () {
                        c.updateDuration && c.updateDuration();
                        c.updateCurrent && c.updateCurrent();
                        if (!c.isFullScreen) {
                            c.setPlayerSize(c.width,
                                c.height);
                            c.setControlsSize()
                        }
                    }, false);
                    setTimeout(function () {
                        c.setPlayerSize(c.width, c.height);
                        c.setControlsSize()
                    }, 50);
                    c.globalBind("resize", function () {
                        c.isFullScreen || mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen || c.setPlayerSize(c.width, c.height);
                        c.setControlsSize()
                    });
                    c.media.pluginType == "youtube" && c.container.find(".mejs-overlay-play").hide()
                }
                if (e && a.pluginType == "native") {
                    a.load();
                    a.play()
                }
                if (c.options.success)typeof c.options.success == "string" ? window[c.options.success](c.media,
                    c.domNode, c) : c.options.success(c.media, c.domNode, c)
            }
        }, handleError: function (a) {
            this.controls.hide();
            this.options.error && this.options.error(a)
        }, setPlayerSize: function (a, b) {
            if (typeof a != "undefined")this.width = a;
            if (typeof b != "undefined")this.height = b;
            if (this.height.toString().indexOf("%") > 0 || this.$node.css("max-width") === "100%" || this.$node[0].currentStyle && this.$node[0].currentStyle.maxWidth === "100%") {
                var c = this.isVideo ? this.media.videoWidth && this.media.videoWidth > 0 ? this.media.videoWidth : this.options.defaultVideoWidth :
                    this.options.defaultAudioWidth, d = this.isVideo ? this.media.videoHeight && this.media.videoHeight > 0 ? this.media.videoHeight : this.options.defaultVideoHeight : this.options.defaultAudioHeight, e = this.container.parent().closest(":visible").width();
                c = this.isVideo || !this.options.autosizeProgress ? parseInt(e * d / c, 10) : d;
                if (this.container.parent()[0].tagName.toLowerCase() === "body") {
                    e = f(window).width();
                    c = f(window).height()
                }
                if (c != 0 && e != 0) {
                    this.container.width(e).height(c);
                    this.$media.add(this.container.find(".mejs-shim")).width("100%").height("100%");
                    this.isVideo && this.media.setVideoSize && this.media.setVideoSize(e, c);
                    this.layers.children(".mejs-layer").width("100%").height("100%")
                }
            } else {
                this.container.width(this.width).height(this.height);
                this.layers.children(".mejs-layer").width(this.width).height(this.height)
            }
        }, setControlsSize: function () {
            var a = 0, b = 0, c = this.controls.find(".mejs-time-rail"), d = this.controls.find(".mejs-time-total");
            this.controls.find(".mejs-time-current");
            this.controls.find(".mejs-time-loaded");
            var e = c.siblings();
            if (this.options && !this.options.autosizeProgress)b = parseInt(c.css("width"));
            if (b === 0 || !b) {
                e.each(function () {
                    var g = f(this);
                    if (g.css("position") != "absolute" && g.is(":visible"))a += f(this).outerWidth(true)
                });
                b = this.controls.width() - a - (c.outerWidth(true) - c.width())
            }
            c.width(b);
            d.width(b - (d.outerWidth(true) - d.width()));
            this.setProgressRail && this.setProgressRail();
            this.setCurrentRail && this.setCurrentRail()
        }, buildposter: function (a, b, c, d) {
            var e = f('<div class="mejs-poster mejs-layer"></div>').appendTo(c);
            b = a.$media.attr("poster");
            if (a.options.poster !== "")b = a.options.poster;
            b !== "" && b != null ? this.setPoster(b) : e.hide();
            d.addEventListener("play", function () {
                e.hide()
            }, false)
        }, setPoster: function (a) {
            var b = this.container.find(".mejs-poster"), c = b.find("img");
            if (c.length == 0)c = f('<img width="100%" height="100%" />').appendTo(b);
            c.attr("src", a)
        }, buildoverlays: function (a, b, c, d) {
            var e = this;
            if (a.isVideo) {
                var g = f('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>').hide().appendTo(c), k = f('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>').hide().appendTo(c),
                    j = f('<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button"></div></div>').appendTo(c).click(function () {
                        if (e.options.clickToPlayPause)d.paused ? d.play() : d.pause()
                    });
                d.addEventListener("play", function () {
                    j.hide();
                    g.hide();
                    b.find(".mejs-time-buffering").hide();
                    k.hide()
                }, false);
                d.addEventListener("playing", function () {
                    j.hide();
                    g.hide();
                    b.find(".mejs-time-buffering").hide();
                    k.hide()
                }, false);
                d.addEventListener("seeking", function () {
                        g.show();
                        b.find(".mejs-time-buffering").show()
                    },
                    false);
                d.addEventListener("seeked", function () {
                    g.hide();
                    b.find(".mejs-time-buffering").hide()
                }, false);
                d.addEventListener("pause", function () {
                    mejs.MediaFeatures.isiPhone || j.show()
                }, false);
                d.addEventListener("waiting", function () {
                    g.show();
                    b.find(".mejs-time-buffering").show()
                }, false);
                d.addEventListener("loadeddata", function () {
                    g.show();
                    b.find(".mejs-time-buffering").show()
                }, false);
                d.addEventListener("canplay", function () {
                    g.hide();
                    b.find(".mejs-time-buffering").hide()
                }, false);
                d.addEventListener("error", function () {
                    g.hide();
                    b.find(".mejs-time-buffering").hide();
                    k.show();
                    k.find("mejs-overlay-error").html("Error loading this resource")
                }, false)
            }
        }, buildkeyboard: function (a, b, c, d) {
            this.globalBind("keydown", function (e) {
                if (a.hasFocus && a.options.enableKeyboard)for (var g = 0, k = a.options.keyActions.length; g < k; g++)for (var j = a.options.keyActions[g], l = 0, q = j.keys.length; l < q; l++)if (e.keyCode == j.keys[l]) {
                    e.preventDefault();
                    j.action(a, d, e.keyCode);
                    return false
                }
                return true
            });
            this.globalBind("click", function (e) {
                if (f(e.target).closest(".mejs-container").length ==
                    0)a.hasFocus = false
            })
        }, findTracks: function () {
            var a = this, b = a.$media.find("track");
            a.tracks = [];
            b.each(function (c, d) {
                d = f(d);
                a.tracks.push({
                    srclang: d.attr("srclang") ? d.attr("srclang").toLowerCase() : "",
                    src: d.attr("src"),
                    kind: d.attr("kind"),
                    label: d.attr("label") || "",
                    entries: [],
                    isLoaded: false
                })
            })
        }, changeSkin: function (a) {
            this.container[0].className = "mejs-container " + a;
            this.setPlayerSize(this.width, this.height);
            this.setControlsSize()
        }, play: function () {
            this.media.play()
        }, pause: function () {
            this.media.pause()
        },
        load: function () {
            this.media.load()
        }, setMuted: function (a) {
            this.media.setMuted(a)
        }, setCurrentTime: function (a) {
            this.media.setCurrentTime(a)
        }, getCurrentTime: function () {
            return this.media.currentTime
        }, setVolume: function (a) {
            this.media.setVolume(a)
        }, getVolume: function () {
            return this.media.volume
        }, setSrc: function (a) {
            this.media.setSrc(a)
        }, remove: function () {
            var a, b;
            for (a in this.options.features) {
                b = this.options.features[a];
                if (this["clean" + b])try {
                    this["clean" + b](this)
                } catch (c) {
                }
            }
            this.media.pluginType === "native" ?
                this.$media.prop("controls", true) : this.media.remove();
            this.isDynamic || this.$node.insertBefore(this.container);
            delete mejs.players[this.id];
            this.container.remove();
            this.globalUnbind();
            delete this.node.player
        }
    };
    (function () {
        function a(c, d) {
            var e = {d: [], w: []};
            f.each((c || "").split(" "), function (g, k) {
                e[b.test(k) ? "w" : "d"].push(k + "." + d)
            });
            e.d = e.d.join(" ");
            e.w = e.w.join(" ");
            return e
        }

        var b = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
        mejs.MediaElementPlayer.prototype.globalBind =
            function (c, d, e) {
                c = a(c, this.id);
                c.d && f(document).bind(c.d, d, e);
                c.w && f(window).bind(c.w, d, e)
            };
        mejs.MediaElementPlayer.prototype.globalUnbind = function (c, d) {
            c = a(c, this.id);
            c.d && f(document).unbind(c.d, d);
            c.w && f(window).unbind(c.w, d)
        }
    })();
    if (typeof jQuery != "undefined")jQuery.fn.mediaelementplayer = function (a) {
        a === false ? this.each(function () {
            var b = jQuery(this).data("mediaelementplayer");
            b && b.remove();
            jQuery(this).removeData("mediaelementplayer")
        }) : this.each(function () {
            jQuery(this).data("mediaelementplayer",
                new mejs.MediaElementPlayer(this, a))
        });
        return this
    };
    f(document).ready(function () {
        f(".mejs-player").mediaelementplayer()
    });
    window.MediaElementPlayer = mejs.MediaElementPlayer
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, {playpauseText: "Play/Pause"});
    f.extend(MediaElementPlayer.prototype, {
        buildplaypause: function (a, b, c, d) {
            var e = f('<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="' + this.id + '" title="' + this.options.playpauseText + '" aria-label="' + this.options.playpauseText + '"></button></div>').appendTo(b).click(function (g) {
                g.preventDefault();
                d.paused ? d.play() : d.pause();
                return false
            });
            d.addEventListener("play", function () {
                    e.removeClass("mejs-play").addClass("mejs-pause")
                },
                false);
            d.addEventListener("playing", function () {
                e.removeClass("mejs-play").addClass("mejs-pause")
            }, false);
            d.addEventListener("pause", function () {
                e.removeClass("mejs-pause").addClass("mejs-play")
            }, false);
            d.addEventListener("paused", function () {
                e.removeClass("mejs-pause").addClass("mejs-play")
            }, false)
        }
    })
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, {stopText: "Stop"});
    f.extend(MediaElementPlayer.prototype, {
        buildstop: function (a, b, c, d) {
            f('<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="' + this.id + '" title="' + this.options.stopText + '" aria-label="' + this.options.stopText + '"></button></div>').appendTo(b).click(function () {
                d.paused || d.pause();
                if (d.currentTime > 0) {
                    d.setCurrentTime(0);
                    d.pause();
                    b.find(".mejs-time-current").width("0px");
                    b.find(".mejs-time-handle").css("left",
                        "0px");
                    b.find(".mejs-time-float-current").html(mejs.Utility.secondsToTimeCode(0));
                    b.find(".mejs-currenttime").html(mejs.Utility.secondsToTimeCode(0));
                    c.find(".mejs-poster").show()
                }
            })
        }
    })
})(mejs.$);
(function (f) {
    f.extend(MediaElementPlayer.prototype, {
        buildprogress: function (a, b, c, d) {
            f('<div class="mejs-time-rail"><span class="mejs-time-total"><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span><span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span></span></div>').appendTo(b);
            b.find(".mejs-time-buffering").hide();
            var e =
                this, g = b.find(".mejs-time-total");
            c = b.find(".mejs-time-loaded");
            var k = b.find(".mejs-time-current"), j = b.find(".mejs-time-handle"), l = b.find(".mejs-time-float"), q = b.find(".mejs-time-float-current"), p = function (h) {
                h = h.pageX;
                var m = g.offset(), r = g.outerWidth(true), n = 0, o = n = 0;
                if (d.duration) {
                    if (h < m.left)h = m.left; else if (h > r + m.left)h = r + m.left;
                    o = h - m.left;
                    n = o / r;
                    n = n <= 0.02 ? 0 : n * d.duration;
                    t && n !== d.currentTime && d.setCurrentTime(n);
                    if (!mejs.MediaFeatures.hasTouch) {
                        l.css("left", o);
                        q.html(mejs.Utility.secondsToTimeCode(n));
                        l.show()
                    }
                }
            }, t = false;
            g.bind("mousedown", function (h) {
                if (h.which === 1) {
                    t = true;
                    p(h);
                    e.globalBind("mousemove.dur", function (m) {
                        p(m)
                    });
                    e.globalBind("mouseup.dur", function () {
                        t = false;
                        l.hide();
                        e.globalUnbind(".dur")
                    });
                    return false
                }
            }).bind("mouseenter", function () {
                e.globalBind("mousemove.dur", function (h) {
                    p(h)
                });
                mejs.MediaFeatures.hasTouch || l.show()
            }).bind("mouseleave", function () {
                if (!t) {
                    e.globalUnbind(".dur");
                    l.hide()
                }
            });
            d.addEventListener("progress", function (h) {
                a.setProgressRail(h);
                a.setCurrentRail(h)
            }, false);
            d.addEventListener("timeupdate", function (h) {
                a.setProgressRail(h);
                a.setCurrentRail(h)
            }, false);
            e.loaded = c;
            e.total = g;
            e.current = k;
            e.handle = j
        }, setProgressRail: function (a) {
            var b = a != undefined ? a.target : this.media, c = null;
            if (b && b.buffered && b.buffered.length > 0 && b.buffered.end && b.duration)c = b.buffered.end(0) / b.duration; else if (b && b.bytesTotal != undefined && b.bytesTotal > 0 && b.bufferedBytes != undefined)c = b.bufferedBytes / b.bytesTotal; else if (a && a.lengthComputable && a.total != 0)c = a.loaded / a.total;
            if (c !== null) {
                c = Math.min(1,
                    Math.max(0, c));
                this.loaded && this.total && this.loaded.width(this.total.width() * c)
            }
        }, setCurrentRail: function () {
            if (this.media.currentTime != undefined && this.media.duration)if (this.total && this.handle) {
                var a = Math.round(this.total.width() * this.media.currentTime / this.media.duration), b = a - Math.round(this.handle.outerWidth(true) / 2);
                this.current.width(a);
                this.handle.css("left", b)
            }
        }
    })
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, {duration: -1, timeAndDurationSeparator: " <span> | </span> "});
    f.extend(MediaElementPlayer.prototype, {
        buildcurrent: function (a, b, c, d) {
            f('<div class="mejs-time"><span class="mejs-currenttime">' + (a.options.alwaysShowHours ? "00:" : "") + (a.options.showTimecodeFrameCount ? "00:00:00" : "00:00") + "</span></div>").appendTo(b);
            this.currenttime = this.controls.find(".mejs-currenttime");
            d.addEventListener("timeupdate", function () {
                a.updateCurrent()
            }, false)
        }, buildduration: function (a,
                                    b, c, d) {
            if (b.children().last().find(".mejs-currenttime").length > 0)f(this.options.timeAndDurationSeparator + '<span class="mejs-duration">' + (this.options.duration > 0 ? mejs.Utility.secondsToTimeCode(this.options.duration, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25) : (a.options.alwaysShowHours ? "00:" : "") + (a.options.showTimecodeFrameCount ? "00:00:00" : "00:00")) + "</span>").appendTo(b.find(".mejs-time")); else {
                b.find(".mejs-currenttime").parent().addClass("mejs-currenttime-container");
                f('<div class="mejs-time mejs-duration-container"><span class="mejs-duration">' + (this.options.duration > 0 ? mejs.Utility.secondsToTimeCode(this.options.duration, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25) : (a.options.alwaysShowHours ? "00:" : "") + (a.options.showTimecodeFrameCount ? "00:00:00" : "00:00")) + "</span></div>").appendTo(b)
            }
            this.durationD = this.controls.find(".mejs-duration");
            d.addEventListener("timeupdate", function () {
                    a.updateDuration()
                },
                false)
        }, updateCurrent: function () {
            if (this.currenttime)this.currenttime.html(mejs.Utility.secondsToTimeCode(this.media.currentTime, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25))
        }, updateDuration: function () {
            this.container.toggleClass("mejs-long-video", this.media.duration > 3600);
            if (this.durationD && (this.options.duration > 0 || this.media.duration))this.durationD.html(mejs.Utility.secondsToTimeCode(this.options.duration > 0 ? this.options.duration :
                this.media.duration, this.options.alwaysShowHours, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25))
        }
    })
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, {
        muteText: "Mute Toggle",
        hideVolumeOnTouchDevices: true,
        audioVolume: "horizontal",
        videoVolume: "vertical"
    });
    f.extend(MediaElementPlayer.prototype, {
        buildvolume: function (a, b, c, d) {
            if (!(mejs.MediaFeatures.hasTouch && this.options.hideVolumeOnTouchDevices)) {
                var e = this, g = e.isVideo ? e.options.videoVolume : e.options.audioVolume, k = g == "horizontal" ? f('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + e.id + '" title="' + e.options.muteText +
                        '" aria-label="' + e.options.muteText + '"></button></div><div class="mejs-horizontal-volume-slider"><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></div>').appendTo(b) : f('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + e.id + '" title="' + e.options.muteText + '" aria-label="' + e.options.muteText + '"></button><div class="mejs-volume-slider"><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></div></div>').appendTo(b),
                    j = e.container.find(".mejs-volume-slider, .mejs-horizontal-volume-slider"), l = e.container.find(".mejs-volume-total, .mejs-horizontal-volume-total"), q = e.container.find(".mejs-volume-current, .mejs-horizontal-volume-current"), p = e.container.find(".mejs-volume-handle, .mejs-horizontal-volume-handle"), t = function (n, o) {
                        if (!j.is(":visible") && typeof o == "undefined") {
                            j.show();
                            t(n, true);
                            j.hide()
                        } else {
                            n = Math.max(0, n);
                            n = Math.min(n, 1);
                            n == 0 ? k.removeClass("mejs-mute").addClass("mejs-unmute") : k.removeClass("mejs-unmute").addClass("mejs-mute");
                            if (g == "vertical") {
                                var s = l.height(), u = l.position(), v = s - s * n;
                                p.css("top", Math.round(u.top + v - p.height() / 2));
                                q.height(s - v);
                                q.css("top", u.top + v)
                            } else {
                                s = l.width();
                                u = l.position();
                                s = s * n;
                                p.css("left", Math.round(u.left + s - p.width() / 2));
                                q.width(Math.round(s))
                            }
                        }
                    }, h = function (n) {
                        var o = null, s = l.offset();
                        if (g == "vertical") {
                            o = l.height();
                            parseInt(l.css("top").replace(/px/, ""), 10);
                            o = (o - (n.pageY - s.top)) / o;
                            if (s.top == 0 || s.left == 0)return
                        } else {
                            o = l.width();
                            o = (n.pageX - s.left) / o
                        }
                        o = Math.max(0, o);
                        o = Math.min(o, 1);
                        t(o);
                        o == 0 ? d.setMuted(true) :
                            d.setMuted(false);
                        d.setVolume(o)
                    }, m = false, r = false;
                k.hover(function () {
                    j.show();
                    r = true
                }, function () {
                    r = false;
                    !m && g == "vertical" && j.hide()
                });
                j.bind("mouseover", function () {
                    r = true
                }).bind("mousedown", function (n) {
                    h(n);
                    e.globalBind("mousemove.vol", function (o) {
                        h(o)
                    });
                    e.globalBind("mouseup.vol", function () {
                        m = false;
                        e.globalUnbind(".vol");
                        !r && g == "vertical" && j.hide()
                    });
                    m = true;
                    return false
                });
                k.find("button").click(function () {
                    d.setMuted(!d.muted)
                });
                d.addEventListener("volumechange", function () {
                    if (!m)if (d.muted) {
                        t(0);
                        k.removeClass("mejs-mute").addClass("mejs-unmute")
                    } else {
                        t(d.volume);
                        k.removeClass("mejs-unmute").addClass("mejs-mute")
                    }
                }, false);
                if (e.container.is(":visible")) {
                    t(a.options.startVolume);
                    a.options.startVolume === 0 && d.setMuted(true);
                    d.pluginType === "native" && d.setVolume(a.options.startVolume)
                }
            }
        }
    })
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, {
        usePluginFullScreen: true, newWindowCallback: function () {
            return ""
        }, fullscreenText: mejs.i18n.t("Fullscreen")
    });
    f.extend(MediaElementPlayer.prototype, {
        isFullScreen: false,
        isNativeFullScreen: false,
        docStyleOverflow: null,
        isInIframe: false,
        buildfullscreen: function (a, b, c, d) {
            if (a.isVideo) {
                a.isInIframe = window.location != window.parent.location;
                if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
                    c = function () {
                        if (mejs.MediaFeatures.isFullScreen()) {
                            a.isNativeFullScreen = true;
                            a.setControlsSize()
                        } else {
                            a.isNativeFullScreen =
                                false;
                            a.exitFullScreen()
                        }
                    };
                    mejs.MediaFeatures.hasMozNativeFullScreen ? a.globalBind(mejs.MediaFeatures.fullScreenEventName, c) : a.container.bind(mejs.MediaFeatures.fullScreenEventName, c)
                }
                var e = this, g = f('<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="' + e.id + '" title="' + e.options.fullscreenText + '" aria-label="' + e.options.fullscreenText + '"></button></div>').appendTo(b);
                if (e.media.pluginType === "native" || !e.options.usePluginFullScreen && !mejs.MediaFeatures.isFirefox)g.click(function () {
                    mejs.MediaFeatures.hasTrueNativeFullScreen &&
                    mejs.MediaFeatures.isFullScreen() || a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen()
                }); else {
                    var k = null;
                    if (function () {
                            var h = document.createElement("x"), m = document.documentElement, r = window.getComputedStyle;
                            if (!("pointerEvents" in h.style))return false;
                            h.style.pointerEvents = "auto";
                            h.style.pointerEvents = "x";
                            m.appendChild(h);
                            r = r && r(h, "").pointerEvents === "auto";
                            m.removeChild(h);
                            return !!r
                        }() && !mejs.MediaFeatures.isOpera) {
                        var j = false, l = function () {
                            if (j) {
                                for (var h in q)q[h].hide();
                                g.css("pointer-events",
                                    "");
                                e.controls.css("pointer-events", "");
                                j = false
                            }
                        }, q = {};
                        b = ["top", "left", "right", "bottom"];
                        var p, t = function () {
                            var h = g.offset().left - e.container.offset().left, m = g.offset().top - e.container.offset().top, r = g.outerWidth(true), n = g.outerHeight(true), o = e.container.width(), s = e.container.height();
                            for (p in q)q[p].css({position: "absolute", top: 0, left: 0});
                            q.top.width(o).height(m);
                            q.left.width(h).height(n).css({top: m});
                            q.right.width(o - h - r).height(n).css({top: m, left: h + r});
                            q.bottom.width(o).height(s - n - m).css({
                                top: m +
                                n
                            })
                        };
                        e.globalBind("resize", function () {
                            t()
                        });
                        p = 0;
                        for (c = b.length; p < c; p += 1)q[b[p]] = f('<div class="mejs-fullscreen-hover" />').appendTo(e.container).mouseover(l).hide();
                        g.mouseover(function () {
                            if (!e.isFullScreen) {
                                var h = g.offset(), m = a.container.offset();
                                d.positionFullscreenButton(h.left - m.left, h.top - m.top, false);
                                g.css("pointer-events", "none");
                                e.controls.css("pointer-events", "none");
                                for (p in q)q[p].show();
                                t();
                                j = true
                            }
                        });
                        d.addEventListener("fullscreenchange", function () {
                            l()
                        })
                    } else g.mouseover(function () {
                        if (k !==
                            null) {
                            clearTimeout(k);
                            delete k
                        }
                        var h = g.offset(), m = a.container.offset();
                        d.positionFullscreenButton(h.left - m.left, h.top - m.top, true)
                    }).mouseout(function () {
                        if (k !== null) {
                            clearTimeout(k);
                            delete k
                        }
                        k = setTimeout(function () {
                            d.hideFullscreenButton()
                        }, 1500)
                    })
                }
                a.fullscreenBtn = g;
                e.globalBind("keydown", function (h) {
                    if ((mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || e.isFullScreen) && h.keyCode == 27)a.exitFullScreen()
                })
            }
        },
        cleanfullscreen: function (a) {
            a.exitFullScreen()
        },
        containerSizeTimeout: null,
        enterFullScreen: function () {
            var a = this;
            if (!(a.media.pluginType !== "native" && (mejs.MediaFeatures.isFirefox || a.options.usePluginFullScreen))) {
                docStyleOverflow = document.documentElement.style.overflow;
                document.documentElement.style.overflow = "hidden";
                normalHeight = a.container.height();
                normalWidth = a.container.width();
                if (a.media.pluginType === "native")if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
                    mejs.MediaFeatures.requestFullScreen(a.container[0]);
                    a.isInIframe && setTimeout(function c() {
                        if (a.isNativeFullScreen)f(window).width() !==
                        screen.width ? a.exitFullScreen() : setTimeout(c, 500)
                    }, 500)
                } else if (mejs.MediaFeatures.hasSemiNativeFullScreen) {
                    a.media.webkitEnterFullscreen();
                    return
                }
                if (a.isInIframe) {
                    var b = a.options.newWindowCallback(this);
                    if (b !== "")if (mejs.MediaFeatures.hasTrueNativeFullScreen)setTimeout(function () {
                        if (!a.isNativeFullScreen) {
                            a.pause();
                            window.open(b, a.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no")
                        }
                    }, 250); else {
                        a.pause();
                        window.open(b, a.id,
                            "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no");
                        return
                    }
                }
                a.container.addClass("mejs-container-fullscreen").width("100%").height("100%");
                a.containerSizeTimeout = setTimeout(function () {
                    a.container.css({width: "100%", height: "100%"});
                    a.setControlsSize()
                }, 500);
                if (a.pluginType === "native")a.$media.width("100%").height("100%"); else {
                    a.container.find(".mejs-shim").width("100%").height("100%");
                    a.media.setVideoSize(f(window).width(), f(window).height())
                }
                a.layers.children("div").width("100%").height("100%");
                a.fullscreenBtn && a.fullscreenBtn.removeClass("mejs-fullscreen").addClass("mejs-unfullscreen");
                a.setControlsSize();
                a.isFullScreen = true
            }
        },
        exitFullScreen: function () {
            clearTimeout(this.containerSizeTimeout);
            if (this.media.pluginType !== "native" && mejs.MediaFeatures.isFirefox)this.media.setFullscreen(false); else {
                if (mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || this.isFullScreen))mejs.MediaFeatures.cancelFullScreen();
                document.documentElement.style.overflow = docStyleOverflow;
                this.container.removeClass("mejs-container-fullscreen").width(normalWidth).height(normalHeight);
                if (this.pluginType === "native")this.$media.width(normalWidth).height(normalHeight); else {
                    this.container.find("object embed").width(normalWidth).height(normalHeight);
                    this.media.setVideoSize(normalWidth, normalHeight)
                }
                this.layers.children("div").width(normalWidth).height(normalHeight);
                this.fullscreenBtn.removeClass("mejs-unfullscreen").addClass("mejs-fullscreen");
                this.setControlsSize();
                this.isFullScreen = false
            }
        }
    })
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, {
        startLanguage: "",
        tracksText: "Captions/Subtitles",
        hideCaptionsButtonWhenEmpty: true,
        toggleCaptionsButtonWhenOnlyOne: false,
        slidesSelector: ""
    });
    f.extend(MediaElementPlayer.prototype, {
        hasChapters: false, buildtracks: function (a, b, c, d) {
            if (a.tracks.length != 0) {
                a.chapters = f('<div class="mejs-chapters mejs-layer"></div>').prependTo(c).hide();
                a.captions = f('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover"><span class="mejs-captions-text"></span></div></div>').prependTo(c).hide();
                a.captionsText = a.captions.find(".mejs-captions-text");
                a.captionsButton = f('<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="' + this.id + '" title="' + this.options.tracksText + '" aria-label="' + this.options.tracksText + '"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="' + a.id + '_captions" id="' + a.id + '_captions_none" value="none" checked="checked" /><label for="' + a.id + '_captions_none">None</label></li></ul></div></div>').appendTo(b);
                for (b = c = 0; b <
                a.tracks.length; b++)a.tracks[b].kind == "subtitles" && c++;
                this.options.toggleCaptionsButtonWhenOnlyOne && c == 1 ? a.captionsButton.on("click", function () {
                    a.setTrack(a.selectedTrack == null ? a.tracks[0].srclang : "none")
                }) : a.captionsButton.hover(function () {
                    f(this).find(".mejs-captions-selector").css("visibility", "visible")
                }, function () {
                    f(this).find(".mejs-captions-selector").css("visibility", "hidden")
                }).on("click", "input[type=radio]", function () {
                    lang = this.value;
                    a.setTrack(lang)
                });
                a.options.alwaysShowControls ? a.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover") :
                    a.container.bind("controlsshown", function () {
                        a.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover")
                    }).bind("controlshidden", function () {
                        d.paused || a.container.find(".mejs-captions-position").removeClass("mejs-captions-position-hover")
                    });
                a.trackToLoad = -1;
                a.selectedTrack = null;
                a.isLoadingTrack = false;
                for (b = 0; b < a.tracks.length; b++)a.tracks[b].kind == "subtitles" && a.addTrackButton(a.tracks[b].srclang, a.tracks[b].label);
                a.loadNextTrack();
                d.addEventListener("timeupdate", function () {
                        a.displayCaptions()
                    },
                    false);
                if (a.options.slidesSelector != "") {
                    a.slidesContainer = f(a.options.slidesSelector);
                    d.addEventListener("timeupdate", function () {
                        a.displaySlides()
                    }, false)
                }
                d.addEventListener("loadedmetadata", function () {
                    a.displayChapters()
                }, false);
                a.container.hover(function () {
                    if (a.hasChapters) {
                        a.chapters.css("visibility", "visible");
                        a.chapters.fadeIn(200).height(a.chapters.find(".mejs-chapter").outerHeight())
                    }
                }, function () {
                    a.hasChapters && !d.paused && a.chapters.fadeOut(200, function () {
                        f(this).css("visibility", "hidden");
                        f(this).css("display", "block")
                    })
                });
                a.node.getAttribute("autoplay") !== null && a.chapters.css("visibility", "hidden")
            }
        }, setTrack: function (a) {
            var b;
            if (a == "none") {
                this.selectedTrack = null;
                this.captionsButton.removeClass("mejs-captions-enabled")
            } else for (b = 0; b < this.tracks.length; b++)if (this.tracks[b].srclang == a) {
                this.selectedTrack == null && this.captionsButton.addClass("mejs-captions-enabled");
                this.selectedTrack = this.tracks[b];
                this.captions.attr("lang", this.selectedTrack.srclang);
                this.displayCaptions();
                break
            }
        },
        loadNextTrack: function () {
            this.trackToLoad++;
            if (this.trackToLoad < this.tracks.length) {
                this.isLoadingTrack = true;
                this.loadTrack(this.trackToLoad)
            } else {
                this.isLoadingTrack = false;
                this.checkForTracks()
            }
        }, loadTrack: function (a) {
            var b = this, c = b.tracks[a];
            f.ajax({
                url: c.src, dataType: "text", success: function (d) {
                    c.entries = typeof d == "string" && /<tt\s+xml/ig.exec(d) ? mejs.TrackFormatParser.dfxp.parse(d) : mejs.TrackFormatParser.webvvt.parse(d);
                    c.isLoaded = true;
                    b.enableTrackButton(c.srclang, c.label);
                    b.loadNextTrack();
                    c.kind ==
                    "chapters" && b.media.addEventListener("play", function () {
                        b.media.duration > 0 && b.displayChapters(c)
                    }, false);
                    c.kind == "slides" && b.setupSlides(c)
                }, error: function () {
                    b.loadNextTrack()
                }
            })
        }, enableTrackButton: function (a, b) {
            if (b === "")b = mejs.language.codes[a] || a;
            this.captionsButton.find("input[value=" + a + "]").prop("disabled", false).siblings("label").html(b);
            this.options.startLanguage == a && f("#" + this.id + "_captions_" + a).click();
            this.adjustLanguageBox()
        }, addTrackButton: function (a, b) {
            if (b === "")b = mejs.language.codes[a] ||
                a;
            this.captionsButton.find("ul").append(f('<li><input type="radio" name="' + this.id + '_captions" id="' + this.id + "_captions_" + a + '" value="' + a + '" disabled="disabled" /><label for="' + this.id + "_captions_" + a + '">' + b + " (loading)</label></li>"));
            this.adjustLanguageBox();
            this.container.find(".mejs-captions-translations option[value=" + a + "]").remove()
        }, adjustLanguageBox: function () {
            this.captionsButton.find(".mejs-captions-selector").height(this.captionsButton.find(".mejs-captions-selector ul").outerHeight(true) +
                this.captionsButton.find(".mejs-captions-translations").outerHeight(true))
        }, checkForTracks: function () {
            var a = false;
            if (this.options.hideCaptionsButtonWhenEmpty) {
                for (i = 0; i < this.tracks.length; i++)if (this.tracks[i].kind == "subtitles") {
                    a = true;
                    break
                }
                if (!a) {
                    this.captionsButton.hide();
                    this.setControlsSize()
                }
            }
        }, displayCaptions: function () {
            if (typeof this.tracks != "undefined") {
                var a, b = this.selectedTrack;
                if (b != null && b.isLoaded)for (a = 0; a < b.entries.times.length; a++)if (this.media.currentTime >= b.entries.times[a].start &&
                    this.media.currentTime <= b.entries.times[a].stop) {
                    this.captionsText.html(b.entries.text[a]);
                    this.captions.show().height(0);
                    return
                }
                this.captions.hide()
            }
        }, setupSlides: function (a) {
            this.slides = a;
            this.slides.entries.imgs = [this.slides.entries.text.length];
            this.showSlide(0)
        }, showSlide: function (a) {
            if (!(typeof this.tracks == "undefined" || typeof this.slidesContainer == "undefined")) {
                var b = this, c = b.slides.entries.text[a], d = b.slides.entries.imgs[a];
                if (typeof d == "undefined" || typeof d.fadeIn == "undefined")b.slides.entries.imgs[a] =
                    d = f('<img src="' + c + '">').on("load", function () {
                        d.appendTo(b.slidesContainer).hide().fadeIn().siblings(":visible").fadeOut()
                    }); else if (!d.is(":visible") && !d.is(":animated")) {
                    console.log("showing existing slide");
                    d.fadeIn().siblings(":visible").fadeOut()
                }
            }
        }, displaySlides: function () {
            if (typeof this.slides != "undefined") {
                var a = this.slides, b;
                for (b = 0; b < a.entries.times.length; b++)if (this.media.currentTime >= a.entries.times[b].start && this.media.currentTime <= a.entries.times[b].stop) {
                    this.showSlide(b);
                    break
                }
            }
        },
        displayChapters: function () {
            var a;
            for (a = 0; a < this.tracks.length; a++)if (this.tracks[a].kind == "chapters" && this.tracks[a].isLoaded) {
                this.drawChapters(this.tracks[a]);
                this.hasChapters = true;
                break
            }
        }, drawChapters: function (a) {
            var b = this, c, d, e = d = 0;
            b.chapters.empty();
            for (c = 0; c < a.entries.times.length; c++) {
                d = a.entries.times[c].stop - a.entries.times[c].start;
                d = Math.floor(d / b.media.duration * 100);
                if (d + e > 100 || c == a.entries.times.length - 1 && d + e < 100)d = 100 - e;
                b.chapters.append(f('<div class="mejs-chapter" rel="' + a.entries.times[c].start +
                    '" style="left: ' + e.toString() + "%;width: " + d.toString() + '%;"><div class="mejs-chapter-block' + (c == a.entries.times.length - 1 ? " mejs-chapter-block-last" : "") + '"><span class="ch-title">' + a.entries.text[c] + '</span><span class="ch-time">' + mejs.Utility.secondsToTimeCode(a.entries.times[c].start) + "&ndash;" + mejs.Utility.secondsToTimeCode(a.entries.times[c].stop) + "</span></div></div>"));
                e += d
            }
            b.chapters.find("div.mejs-chapter").click(function () {
                b.media.setCurrentTime(parseFloat(f(this).attr("rel")));
                b.media.paused &&
                b.media.play()
            });
            b.chapters.show()
        }
    });
    mejs.language = {
        codes: {
            af: "Afrikaans",
            sq: "Albanian",
            ar: "Arabic",
            be: "Belarusian",
            bg: "Bulgarian",
            ca: "Catalan",
            zh: "Chinese",
            "zh-cn": "Chinese Simplified",
            "zh-tw": "Chinese Traditional",
            hr: "Croatian",
            cs: "Czech",
            da: "Danish",
            nl: "Dutch",
            en: "English",
            et: "Estonian",
            tl: "Filipino",
            fi: "Finnish",
            fr: "French",
            gl: "Galician",
            de: "German",
            el: "Greek",
            ht: "Haitian Creole",
            iw: "Hebrew",
            hi: "Hindi",
            hu: "Hungarian",
            is: "Icelandic",
            id: "Indonesian",
            ga: "Irish",
            it: "Italian",
            ja: "Japanese",
            ko: "Korean",
            lv: "Latvian",
            lt: "Lithuanian",
            mk: "Macedonian",
            ms: "Malay",
            mt: "Maltese",
            no: "Norwegian",
            fa: "Persian",
            pl: "Polish",
            pt: "Portuguese",
            ro: "Romanian",
            ru: "Russian",
            sr: "Serbian",
            sk: "Slovak",
            sl: "Slovenian",
            es: "Spanish",
            sw: "Swahili",
            sv: "Swedish",
            tl: "Tagalog",
            th: "Thai",
            tr: "Turkish",
            uk: "Ukrainian",
            vi: "Vietnamese",
            cy: "Welsh",
            yi: "Yiddish"
        }
    };
    mejs.TrackFormatParser = {
        webvvt: {
            pattern_identifier: /^([a-zA-z]+-)?[0-9]+$/,
            pattern_timecode: /^([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
            parse: function (a) {
                var b = 0;
                a = mejs.TrackFormatParser.split2(a, /\r?\n/);
                for (var c = {text: [], times: []}, d, e; b < a.length; b++)if (this.pattern_identifier.exec(a[b])) {
                    b++;
                    if ((d = this.pattern_timecode.exec(a[b])) && b < a.length) {
                        b++;
                        e = a[b];
                        for (b++; a[b] !== "" && b < a.length;) {
                            e = e + "\n" + a[b];
                            b++
                        }
                        e = f.trim(e).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
                        c.text.push(e);
                        c.times.push({
                            start: mejs.Utility.convertSMPTEtoSeconds(d[1]) == 0 ? 0.2 : mejs.Utility.convertSMPTEtoSeconds(d[1]),
                            stop: mejs.Utility.convertSMPTEtoSeconds(d[3]), settings: d[5]
                        })
                    }
                }
                return c
            }
        }, dfxp: {
            parse: function (a) {
                a = f(a).filter("tt");
                var b = 0;
                b = a.children("div").eq(0);
                var c = b.find("p");
                b = a.find("#" + b.attr("style"));
                var d, e;
                a = {text: [], times: []};
                if (b.length) {
                    e = b.removeAttr("id").get(0).attributes;
                    if (e.length) {
                        d = {};
                        for (b = 0; b < e.length; b++)d[e[b].name.split(":")[1]] = e[b].value
                    }
                }
                for (b = 0; b < c.length; b++) {
                    var g;
                    e = {start: null, stop: null, style: null};
                    if (c.eq(b).attr("begin"))e.start = mejs.Utility.convertSMPTEtoSeconds(c.eq(b).attr("begin"));
                    if (!e.start && c.eq(b - 1).attr("end"))e.start = mejs.Utility.convertSMPTEtoSeconds(c.eq(b - 1).attr("end"));
                    if (c.eq(b).attr("end"))e.stop = mejs.Utility.convertSMPTEtoSeconds(c.eq(b).attr("end"));
                    if (!e.stop && c.eq(b + 1).attr("begin"))e.stop = mejs.Utility.convertSMPTEtoSeconds(c.eq(b + 1).attr("begin"));
                    if (d) {
                        g = "";
                        for (var k in d)g += k + ":" + d[k] + ";"
                    }
                    if (g)e.style = g;
                    if (e.start == 0)e.start = 0.2;
                    a.times.push(e);
                    e = f.trim(c.eq(b).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
                        "<a href='$1' target='_blank'>$1</a>");
                    a.text.push(e);
                    if (a.times.start == 0)a.times.start = 2
                }
                return a
            }
        }, split2: function (a, b) {
            return a.split(b)
        }
    };
    if ("x\n\ny".split(/\n/gi).length != 3)mejs.TrackFormatParser.split2 = function (a, b) {
        var c = [], d = "", e;
        for (e = 0; e < a.length; e++) {
            d += a.substring(e, e + 1);
            if (b.test(d)) {
                c.push(d.replace(b, ""));
                d = ""
            }
        }
        c.push(d);
        return c
    }
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, {
        contextMenuItems: [{
            render: function (a) {
                if (typeof a.enterFullScreen == "undefined")return null;
                return a.isFullScreen ? "Turn off Fullscreen" : "Go Fullscreen"
            }, click: function (a) {
                a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen()
            }
        }, {
            render: function (a) {
                return a.media.muted ? "Unmute" : "Mute"
            }, click: function (a) {
                a.media.muted ? a.setMuted(false) : a.setMuted(true)
            }
        }, {isSeparator: true}, {
            render: function () {
                return "Download Video"
            }, click: function (a) {
                window.location.href = a.media.currentSrc
            }
        }]
    });
    f.extend(MediaElementPlayer.prototype, {
        buildcontextmenu: function (a) {
            a.contextMenu = f('<div class="mejs-contextmenu"></div>').appendTo(f("body")).hide();
            a.container.bind("contextmenu", function (b) {
                if (a.isContextMenuEnabled) {
                    b.preventDefault();
                    a.renderContextMenu(b.clientX - 1, b.clientY - 1);
                    return false
                }
            });
            a.container.bind("click", function () {
                a.contextMenu.hide()
            });
            a.contextMenu.bind("mouseleave", function () {
                a.startContextMenuTimer()
            })
        }, cleancontextmenu: function (a) {
            a.contextMenu.remove()
        }, isContextMenuEnabled: true,
        enableContextMenu: function () {
            this.isContextMenuEnabled = true
        }, disableContextMenu: function () {
            this.isContextMenuEnabled = false
        }, contextMenuTimeout: null, startContextMenuTimer: function () {
            var a = this;
            a.killContextMenuTimer();
            a.contextMenuTimer = setTimeout(function () {
                a.hideContextMenu();
                a.killContextMenuTimer()
            }, 750)
        }, killContextMenuTimer: function () {
            var a = this.contextMenuTimer;
            if (a != null) {
                clearTimeout(a);
                delete a
            }
        }, hideContextMenu: function () {
            this.contextMenu.hide()
        }, renderContextMenu: function (a, b) {
            for (var c =
                this, d = "", e = c.options.contextMenuItems, g = 0, k = e.length; g < k; g++)if (e[g].isSeparator)d += '<div class="mejs-contextmenu-separator"></div>'; else {
                var j = e[g].render(c);
                if (j != null)d += '<div class="mejs-contextmenu-item" data-itemindex="' + g + '" id="element-' + Math.random() * 1E6 + '">' + j + "</div>"
            }
            c.contextMenu.empty().append(f(d)).css({top: b, left: a}).show();
            c.contextMenu.find(".mejs-contextmenu-item").each(function () {
                var l = f(this), q = parseInt(l.data("itemindex"), 10), p = c.options.contextMenuItems[q];
                typeof p.show != "undefined" &&
                p.show(l, c);
                l.click(function () {
                    typeof p.click != "undefined" && p.click(c);
                    c.contextMenu.hide()
                })
            });
            setTimeout(function () {
                c.killControlsTimer("rev3")
            }, 100)
        }
    })
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, {postrollCloseText: mejs.i18n.t("Close")});
    f.extend(MediaElementPlayer.prototype, {
        buildpostroll: function (a, b, c) {
            var d = this.container.find('link[rel="postroll"]').attr("href");
            if (typeof d !== "undefined") {
                a.postroll = f('<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">' + this.options.postrollCloseText + '</a><div class="mejs-postroll-layer-content"></div></div>').prependTo(c).hide();
                this.media.addEventListener("ended",
                    function () {
                        f.ajax({
                            dataType: "html", url: d, success: function (e) {
                                c.find(".mejs-postroll-layer-content").html(e)
                            }
                        });
                        a.postroll.show()
                    }, false)
            }
        }
    })
})(mejs.$);


(function () {
    var is_webkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
        is_opera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
        is_ie = navigator.userAgent.toLowerCase().indexOf('msie') > -1;

    if (( is_webkit || is_opera || is_ie ) && 'undefined' !== typeof( document.getElementById )) {
        var eventMethod = ( window.addEventListener ) ? 'addEventListener' : 'attachEvent';
        window[eventMethod]('hashchange', function () {
            var element = document.getElementById(location.hash.substring(1));

            if (element) {
                if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName))
                    element.tabIndex = -1;

                element.focus();
            }
        }, false);
    }
})();

//=============================================================
//==  Stylesheets manipulations
//=============================================================
function setStateStyleSheet(title, state) {
    var i, a;
    for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
            if (a.getAttribute("title") == title) a.disabled = !state;
        }
    }
}

function getStateStyleSheet(title, state) {
    var i, a, rez = -1;
    for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
            if (a.getAttribute("title") == title) {
                rez = a.disabled ? 0 : 1;
                break;
            }
        }
    }
    return rez;
}

function setActiveStyleSheet(title, disableOther) {
    var i, a, main;
    for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
            if (disableOther) a.disabled = true;
            if (a.getAttribute("title") == title) a.disabled = false;
        }
    }
}

function getActiveStyleSheet() {
    var i, a;
    for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
    }
    return null;
}

function getPreferredStyleSheet() {
    var i, a;
    for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("rel").indexOf("alt") == -1 && a.getAttribute("title"))
            return a.getAttribute("title");
    }
    return null;
}


//=============================================================
//==  ListBox & ComboBox manipulations
//=============================================================
function addListBoxItem(box, val, text) {
    var item = new Option();
    item.value = val;
    item.text = text;
    box.options.add(item);
}

function clearListBox(box) {
    for (var i = box.options.length - 1; i >= 0; i--)
        box.options[i] = null;
}

function delListBoxItemByValue(box, val) {
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].value == val) {
            box.options[i] = null;
            break;
        }
    }
}

function delListBoxItemByText(box, txt) {
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].text == txt) {
            box.options[i] = null;
            break;
        }
    }
}

function findListBoxItemByValue(box, val) {
    var idx = -1;
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].value == val) {
            idx = i;
            break;
        }
    }
    return idx;
}

function findListBoxItemByText(box, txt) {
    var idx = -1;
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].text == txt) {
            idx = i;
            break;
        }
    }
    return idx;
}

function selectListBoxItemByValue(box, val) {
    for (var i = 0; i < box.options.length; i++) {
        box.options[i].selected = (val == box.options[i].value);
    }
}

function selectListBoxItemByText(box, txt) {
    for (var i = 0; i < box.options.length; i++) {
        box.options[i].selected = (txt == box.options[i].text);
    }
}

function getListBoxValues(box) {
    var delim = arguments[1] ? arguments[1] : ',';
    var str = '';
    for (var i = 0; i < box.options.length; i++) {
        str += (str ? delim : '') + box.options[i].value;
    }
    return str;
}

function getListBoxTexts(box) {
    var delim = arguments[1] ? arguments[1] : ',';
    var str = '';
    for (var i = 0; i < box.options.length; i++) {
        str += (str ? delim : '') + box.options[i].text;
    }
    return str;
}

function sortListBox(box) {
    var temp_opts = new Array();
    var temp = new Option();
    for (var i = 0; i < box.options.length; i++) {
        temp_opts[i] = box.options[i].clone();
    }
    for (var x = 0; x < temp_opts.length - 1; x++) {
        for (var y = (x + 1); y < temp_opts.length; y++) {
            if (temp_opts[x].text > temp_opts[y].text) {
                temp = temp_opts[x];
                temp_opts[x] = temp_opts[y];
                temp_opts[y] = temp;
            }
        }
    }
    for (var i = 0; i < box.options.length; i++) {
        box.options[i] = temp_opts[i].clone();
    }
}

function getListBoxSelectedIndex(box) {
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].selected)
            return i;
    }
    return -1;
}

function getListBoxSelectedValue(box) {
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].selected) {
            return box.options[i].value;
        }
    }
    return null;
}

function getListBoxSelectedText(box) {
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].selected) {
            return box.options[i].text;
        }
    }
    return null;
}

function getListBoxSelectedOption(box) {
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].selected) {
            return box.options[i];
        }
    }
    return null;
}


//=============================================================
//==  Radiobuttons manipulations
//=============================================================
function getRadioGroupValue(radioGroupObj) {
    for (var i = 0; i < radioGroupObj.length; i++)
        if (radioGroupObj[i].checked) return radioGroupObj[i].value;
    return null;
}

function setRadioGroupCheckedByNum(radioGroupObj, num) {
    for (var i = 0; i < radioGroupObj.length; i++)
        if (radioGroupObj[i].checked && i != num) radioGroupObj[i].checked = false;
        else if (i == num) radioGroupObj[i].checked = true;
}

function setRadioGroupCheckedByValue(radioGroupObj, val) {
    for (var i = 0; i < radioGroupObj.length; i++)
        if (radioGroupObj[i].checked && radioGroupObj[i].value != val) radioGroupObj[i].checked = false;
        else if (radioGroupObj[i].value == val) radioGroupObj[i].checked = true;
}


//=============================================================
//==  Array manipulations
//=============================================================
function sortArray(thearray) {
    var caseSensitive = arguments[1] ? arguments[1] : false;
    for (var x = 0; x < thearray.length - 1; x++) {
        for (var y = (x + 1); y < thearray.length; y++) {
            if (caseSensitive) {
                if (thearray[x] > thearray[y]) {
                    tmp = thearray[x];
                    thearray[x] = thearray[y];
                    thearray[y] = tmp;
                }
            } else {
                if (thearray[x].toLowerCase() > thearray[y].toLowerCase()) {
                    tmp = thearray[x];
                    thearray[x] = thearray[y];
                    thearray[y] = tmp;
                }
            }
        }
    }
}


//=============================================================
//==  String functions
//=============================================================
function inList(list, str) {
    var delim = arguments[2] ? arguments[2] : '|';
    var icase = arguments[3] ? arguments[3] : true;
    var retval = false;
    if (icase) {
        str = str.toLowerCase();
        list = list.toLowerCase();
    }
    parts = list.split(delim);
    for (var i = 0; i < parts.length; i++) {
        if (parts[i] == str) {
            retval = true;
            break;
        }
    }
    return retval;
}

function alltrim(str) {
    var dir = arguments[1] ? arguments[1] : 'a';
    var rez = '';
    var i, start = 0, end = str.length - 1;
    if (dir == 'a' || dir == 'l') {
        for (i = 0; i < str.length; i++) {
            if (str.substr(i, 1) != ' ') {
                start = i;
                break;
            }
        }
    }
    if (dir == 'a' || dir == 'r') {
        for (i = str.length - 1; i >= 0; i--) {
            if (str.substr(i, 1) != ' ') {
                end = i;
                break;
            }
        }
    }
    return str.substring(start, end + 1);
}

function ltrim(str) {
    return alltrim(str, 'l');
}

function rtrim(str) {
    return alltrim(str, 'r');
}

function padl(str, len) {
    var char = arguments[2] ? arguments[2] : ' ';
    var rez = str.substr(0, len);
    if (rez.length < len) {
        for (var i = 0; i < len - str.length; i++)
            rez += char;
    }
    return rez;
}

function padr(str, len) {
    var char = arguments[2] ? arguments[2] : ' ';
    var rez = str.substr(0, len);
    if (rez.length < len) {
        for (var i = 0; i < len - str.length; i++)
            rez = char + rez;
    }
    return rez;
}

function padc(str, len) {
    var char = arguments[2] ? arguments[2] : ' ';
    var rez = str.substr(0, len);
    if (rez.length < len) {
        for (var i = 0; i < Math.floor((len - str.length) / 2); i++)
            rez = char + rez + char;
    }
    return rez + (rez.length < len ? char : '');
}

function replicate(str, num) {
    rez = '';
    for (var i = 0; i < num; i++) {
        rez += str;
    }
    return rez;
}


//=============================================================
//==  Numbers functions
//=============================================================

// Clear number from any characters and append it with 0 to desired precision
function clearNumber(num) {
    var precision = arguments[1] ? arguments[1] : 0;
    var defa = arguments[2] ? arguments[2] : 0;
    var res = '';
    var float = -1;
    num = "" + num;
    if (num == "") num = "" + defa;
    for (var i = 0; i < num.length; i++) {
        if (float == 0) break;
        else if (float > 0) float--;
        var ch = num.substr(i, 1);
        if (ch == '.') {
            if (precision > 0) {
                res += ch;
            }
            float = precision;
        } else if ((ch >= 0 && ch <= 9) || (ch == '-' && i == 0))
            res += ch;
    }
    if (precision > 0 && float != 0) {
        if (float == -1) {
            res += '.';
            float = precision;
        }
        for (i = float; i > 0; i--)
            res += '0';
    }
    //if (isNaN(res)) res = clearNumber(defa, precision, defa);
    return res;
}

function dec2hex(n) {
    return Number(n).toString(16);
}

function hex2dec(hex) {
    return parseInt(hex, 16);
}

function roundNumber(num) {
    var precision = arguments[1] ? arguments[1] : 0;
    var p = Math.pow(10, precision);
    return Math.round(num * p) / p;
}

//=============================================================
//==  Color manipulations
//=============================================================
function rgb2hex(color) {
    var aRGB;
    color = color.replace(/\s/g, "").toLowerCase();
    if (color == 'rgba(0,0,0,0)' || color == 'rgba(0%,0%,0%,0%)')
        color = 'transparent';
    if (color.indexOf('rgba(') == 0)
        aRGB = color.match(/^rgba\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
    else
        aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);

    if (aRGB) {
        color = '';
        for (var i = 1; i <= 3; i++)
            color += Math.round((aRGB[i][aRGB[i].length - 1] == "%" ? 2.55 : 1) * parseInt(aRGB[i])).toString(16).replace(/^(.)$/, '0$1');
    } else
        color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');
    return (color.substr(0, 1) != '#' ? '#' : '') + color;
}

function _rgb2hex(r, g, b) {
    return '#' +
        Number(r).toString(16).toUpperCase().replace(/^(.)$/, '0$1') +
        Number(g).toString(16).toUpperCase().replace(/^(.)$/, '0$1') +
        Number(b).toString(16).toUpperCase().replace(/^(.)$/, '0$1');
}

function split_rgb(color) {
    color = rgb2hex(color);
    var matches = color.match(/^#?([\dabcdef]{2})([\dabcdef]{2})([\dabcdef]{2})$/i);
    if (!matches) return false;
    for (var i = 1, rgb = new Array(3); i <= 3; i++)
        rgb[i - 1] = parseInt(matches[i], 16);
    return rgb;
}

function iColorPicker() {
    var colors = arguments[0] ? arguments[0] :
    '#f00,#ff0,#0f0,#0ff,#00f,#f0f,#fff,#ebebeb,#e1e1e1,#d7d7d7,#cccccc,#c2c2c2,#b7b7b7,#acacac,#a0a0a0,#959595,'
    + '#ee1d24,#fff100,#00a650,#00aeef,#2f3192,#ed008c,#898989,#7d7d7d,#707070,#626262,#555,#464646,#363636,#262626,#111,#000,'
    + '#f7977a,#fbad82,#fdc68c,#fff799,#c6df9c,#a4d49d,#81ca9d,#7bcdc9,#6ccff7,#7ca6d8,#8293ca,#8881be,#a286bd,#bc8cbf,#f49bc1,#f5999d,'
    + '#f16c4d,#f68e54,#fbaf5a,#fff467,#acd372,#7dc473,#39b778,#16bcb4,#00bff3,#438ccb,#5573b7,#5e5ca7,#855fa8,#a763a9,#ef6ea8,#f16d7e,'
    + '#ee1d24,#f16522,#f7941d,#fff100,#8fc63d,#37b44a,#00a650,#00a99e,#00aeef,#0072bc,#0054a5,#2f3192,#652c91,#91278f,#ed008c,#ee105a,'
    + '#9d0a0f,#a1410d,#a36209,#aba000,#588528,#197b30,#007236,#00736a,#0076a4,#004a80,#003370,#1d1363,#450e61,#62055f,#9e005c,#9d0039,'
    + '#790000,#7b3000,#7c4900,#827a00,#3e6617,#045f20,#005824,#005951,#005b7e,#003562,#002056,#0c004b,#30004a,#4b0048,#7a0045,#7a0026';
    var colorsList = colors.split(',');
    var tbl = '<table class="colorPickerTable"><thead>';
    for (var i = 0; i < colorsList.length; i++) {
        if (i % 16 == 0) tbl += (i > 0 ? '</tr>' : '') + '<tr>';
        tbl += '<td style="background-color:' + colorsList[i] + '"></td>';
    }
    tbl += '</tr></thead><tbody><tr><td style="border:1px solid #000;background:#fff;cursor:pointer;height:60px;-moz-background-clip:-moz-initial;-moz-background-origin:-moz-initial;-moz-background-inline-policy:-moz-initial;" colspan="16" align="center" id="colorPreview"><span style="color:#000;border:1px solid rgb(0, 0, 0);padding:5px;background-color:#fff;font:11px Arial, Helvetica, sans-serif;"></span></td></tr></tbody></table>';
    tbl += '<style>#iColorPicker input{margin:2px}</style>';

    jQuery(document.createElement("div"))
        .attr("id", "iColorPicker")
        .css('display', 'none')
        .html(tbl)
        .appendTo("body")
        .on('mouseover', 'thead td', function () {
            var aaa = rgb2hex(jQuery(this).css('background-color'));
            jQuery('#colorPreview').css('background', aaa);
            jQuery('#colorPreview span').text(aaa);
        })
        .on('click', 'thead td', function () {
            var id = jQuery('#iColorPicker').data('fieldId');
            var func = jQuery('#iColorPicker').data('func');
            var aaa = rgb2hex(jQuery(this).css('background-color'));
            if (id) jQuery("#" + id).val(aaa).css("background", aaa).trigger('change');
            if (func != null && func != 'undefined') func(id, aaa);
            jQuery("#iColorPickerBg").hide();
            jQuery("#iColorPicker").fadeOut();
        });
    jQuery(document.createElement("div"))
        .attr("id", "iColorPickerBg")
        .click(function () {
            jQuery("#iColorPickerBg").hide();
            jQuery("#iColorPicker").fadeOut();
        })
        .appendTo("body");
    jQuery('#iColorPicker td')
        .css({
            'width': '12px',
            'height': '14px',
            'border': '1px solid #000',
            'cursor': 'pointer'
        });
    jQuery('#iColorPicker table')
        .css({'border-collapse': 'collapse'});
    jQuery('#iColorPicker')
        .css({
            'border': '1px solid #ccc',
            'background': '#333',
            'padding': '5px',
            'color': '#fff',
            'z-index': 999999
        });
    jQuery('#colorPreview')
        .css({'height': '50px'});
}

function iColorShow(id, id2, func) {
    var eICP = jQuery("#" + id2).offset();
    jQuery("#iColorPicker")
        .data({fieldId: id, func: func})
        .css({
            'top': eICP.top + jQuery("#" + id).outerHeight() + "px",
            'left': eICP.left - jQuery("#" + id).outerWidth() + "px",
            'position': 'absolute'
        })
        .fadeIn("fast");
    jQuery("#iColorPickerBg")
        .css({
            'position': 'fixed',
            'top': 0,
            'left': 0,
            'width': '100%',
            'height': '100%'
        })
        .fadeIn("fast");

    var def = jQuery("#" + id).val();
    jQuery('#colorPreview span').text(def);
    jQuery('#colorPreview').css('background', def);
    jQuery('#color').val(def);
}


//=============================================================
//==  Cookies manipulations
//=============================================================
function getCookie(name) {
    var defa = arguments[1] != 'undefined' ? arguments[1] : null;
    var start = document.cookie.indexOf(name + '=');
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return defa;
    }
    if (start == -1)
        return defa;
    var end = document.cookie.indexOf(';', len);
    if (end == -1)
        end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}


function setCookie(name, value, expires, path, domain, secure) {
    var today = new Date();
    today.setTime(today.getTime());
    if (expires) {
        expires = expires * 1000;		// * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + '='
        + escape(value)
        + ((expires) ? ';expires=' + expires_date.toGMTString() : '')
        + ((path) ? ';path=' + path : '')
        + ((domain) ? ';domain=' + domain : '')
        + ((secure) ? ';secure' : '');
}


function deleteCookie(name, path, domain) {
    if (getCookie(name))
        document.cookie = name + '=' + ((path) ? ';path=' + path : '')
            + ((domain) ? ';domain=' + domain : '')
            + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}


//=============================================================
//==  Date manipulations
//=============================================================

// Return array[Year, Month, Day, Hours, Minutes, Seconds]
// from string: Year[-/.]Month[-/.]Day[T ]Hours:Minutes:Seconds
function dateParse(dt) {
    dt = dt.replace(/\//g, '-').replace(/\./g, '-').replace(/T/g, ' ').split('+')[0];
    var dt2 = dt.split(' ');
    var d = dt2[0].split('-');
    var t = dt2[1].split(':');
    d.push(t[0], t[1], t[2]);
    return d;
}

function dateDifference(dt1, dt2, short, sec) {
    var dt2 = arguments[1] !== undefined ? arguments[1] : '';
    var short = arguments[2] !== undefined ? arguments[2] : true;
    var sec = arguments[3] !== undefined ? arguments[3] : false;
    var a1 = dateParse(dt1);
    dt1 = Date.UTC(a1[0], a1[1], a1[2], a1[3], a1[4], a1[5]);
    if (dt2 == '') {
        dt2 = new Date();
        var a2 = [dt2.getFullYear(), dt2.getMonth() + 1, dt2.getDate(), dt2.getHours(), dt2.getMinutes(), dt2.getSeconds()];
    } else
        var a2 = dateParse(dt2);
    dt2 = Date.UTC(a2[0], a2[1], a2[2], a2[3], a2[4], a2[5]);
    var diff = Math.round((dt2 - dt1) / 1000);
    var days = Math.floor(diff / (24 * 3600));
    diff -= days * 24 * 3600;
    var hours = Math.floor(diff / 3600);
    diff -= hours * 3600;
    var minutes = Math.floor(diff / 60);
    diff -= minutes * 60;
    rez = '';
    if (days > 0)
        rez += (rez != '' ? ' ' : '') + days + ' day' + (days > 1 ? 's' : '');
    if ((!short || rez == '') && hours > 0)
        rez += (rez != '' ? ' ' : '') + hours + ' hour' + (hours > 1 ? 's' : '');
    if ((!short || rez == '') && minutes > 0)
        rez += (rez != '' ? ' ' : '') + minutes + ' minute' + (minutes > 1 ? 's' : '');
    if (sec || rez == '')
        rez += rez != '' || sec ? (' ' + diff + ' second' + (diff > 1 ? 's' : '')) : 'less then minute';
    return rez;
}


//=============================================================
//==  Form validation
//=============================================================
/*
 // Usage example:
 var error = formValidate(jQuery(form_selector), {				// -------- Options
 error_message_show: true,									// Display or not error message
 error_message_time: 5000,									// Time to display error message
 error_message_class: 'sc_infobox sc_infobox_style_error',	// Class, appended to error message block
 error_message_text: 'Global error text',					// Global error message text (if don't write message in checked field)
 error_fields_class: 'error_fields_class',					// Class, appended to error fields
 exit_after_first_error: false,								// Cancel validation and exit after first error
 rules: [
 {
 field: 'author',																// Checking field name
 min_length: { value: 1,	 message: 'The author name can\'t be empty' },			// Min character count (0 - don't check), message - if error occurs
 max_length: { value: 60, message: 'Too long author name'}						// Max character count (0 - don't check), message - if error occurs
 },
 {
 field: 'email',
 min_length: { value: 7,	 message: 'Too short (or empty) email address' },
 max_length: { value: 60, message: 'Too long email address'},
 mask: { value: '^([a-z0-9_\\-]+\\.)*[a-z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$', message: 'Not valid email address'}
 },
 {
 field: 'comment',
 min_length: { value: 1,	 message: 'The comment text can\'t be empty' },
 max_length: { value: 200, message: 'Too long comment'}
 },
 {
 field: 'pwd1',
 min_length: { value: 5,	 message: 'The password can\'t be less then 5 characters' },
 max_length: { value: 20, message: 'Too long password'}
 },
 {
 field: 'pwd2',
 equal_to: { value: 'pwd1',	 message: 'The passwords in both fields must be equals' }
 }
 ]
 });
 */

function formValidate(form, opt) {
    var error_msg = '';
    form.find(":input").each(function () {
        if (error_msg != '' && opt.exit_after_first_error) return;
        for (var i = 0; i < opt.rules.length; i++) {
            if (jQuery(this).attr("name") == opt.rules[i].field) {
                var val = jQuery(this).val();
                var error = false;
                if (typeof(opt.rules[i].min_length) == 'object') {
                    if (opt.rules[i].min_length.value > 0 && val.length < opt.rules[i].min_length.value) {
                        if (error_msg == '') jQuery(this).get(0).focus();
                        error_msg += '<p class="error_item">' + (typeof(opt.rules[i].min_length.message) != 'undefined' ? opt.rules[i].min_length.message : opt.error_message_text ) + '</p>'
                        error = true;
                    }
                }
                if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].max_length) == 'object') {
                    if (opt.rules[i].max_length.value > 0 && val.length > opt.rules[i].max_length.value) {
                        if (error_msg == '') jQuery(this).get(0).focus();
                        error_msg += '<p class="error_item">' + (typeof(opt.rules[i].max_length.message) != 'undefined' ? opt.rules[i].max_length.message : opt.error_message_text ) + '</p>'
                        error = true;
                    }
                }
                if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].mask) == 'object') {
                    if (opt.rules[i].mask.value != '') {
                        var regexp = new RegExp(opt.rules[i].mask.value);
                        if (!regexp.test(val)) {
                            if (error_msg == '') jQuery(this).get(0).focus();
                            error_msg += '<p class="error_item">' + (typeof(opt.rules[i].mask.message) != 'undefined' ? opt.rules[i].mask.message : opt.error_message_text ) + '</p>'
                            error = true;
                        }
                    }
                }
                if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].equal_to) == 'object') {
                    if (opt.rules[i].equal_to.value != '' && val != jQuery(jQuery(this).get(0).form[opt.rules[i].equal_to.value]).val()) {
                        if (error_msg == '') jQuery(this).get(0).focus();
                        error_msg += '<p class="error_item">' + (typeof(opt.rules[i].equal_to.message) != 'undefined' ? opt.rules[i].equal_to.message : opt.error_message_text ) + '</p>'
                        error = true;
                    }
                }
                if (opt.error_fields_class != '') jQuery(this).toggleClass(opt.error_fields_class, error);
            }
        }
    });
    if (error_msg != '' && opt.error_message_show) {
        error_msg_box = form.find(".result");
        if (error_msg_box.length == 0) {
            error_msg_box = form.parent().find(".result");
            if (error_msg_box.length == 0) {
                form.append('<div class="result"></div>');
                error_msg_box = form.find(".result");
            }
        }
        if (opt.error_message_class) error_msg_box.toggleClass(opt.error_message_class, true);
        error_msg_box.html(error_msg).fadeIn();
        setTimeout("error_msg_box.fadeOut()", opt.error_message_time);
    }
    return error_msg != '';
}


//=============================================================
//==  Debug functions
//=============================================================
function objDisplay(obj) {
    var html = arguments[1] ? arguments[1] : false;				// Tags decorate
    var recursive = arguments[2] ? arguments[2] : false;		// Show inner objects (arrays)
    var showMethods = arguments[3] ? arguments[3] : false;		// Show object's methods
    var level = arguments[4] ? arguments[4] : 0;				// Nesting level (for inner use only)
    var dispStr = "";
    var addStr = "";
    if (level > 0) {
        dispStr += (obj === null ? "null" : "Object") + (html ? "\n<br />" : "\n");
        addStr = replicate(html ? '&nbsp;' : ' ', level * 2);
    }
    if (obj !== null) {
        for (var prop in obj) {
            if (!showMethods && typeof(obj[prop]) == 'function')	// || prop=='innerHTML' || prop=='outerHTML' || prop=='innerText' || prop=='outerText')
                continue;
            if (recursive && (typeof(obj[prop]) == 'object' || typeof(obj[prop]) == 'array') && obj[prop] != obj)
                dispStr += addStr + (html ? "<b>" : "") + prop + (html ? "</b>" : "") + '=' + objDisplay(obj[prop], html, recursive, showMethods, level + 1);
            else
                dispStr += addStr + (html ? "<b>" : "") + prop + (html ? "</b>" : "") + '=' + (typeof(obj[prop]) == 'string' ? '"' : '') + obj[prop] + (typeof(obj[prop]) == 'string' ? '"' : '') + (html ? "\n<br />" : "\n");
        }
    }
    return dispStr;
}
