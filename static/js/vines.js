/*
 * Decorative aged-green vines in the four corners.
 * Phase 1 (~3s): each corner flourish draws itself in, leaves unfurl.
 * Phase 2 (~4 min): stems creep very slowly along the left/right edges
 * until the top and bottom vines meet in the middle.
 */
(function () {
    var SVGNS = 'http://www.w3.org/2000/svg';
    var INTRO_MS = 2800;
    var GROW_MS = 240000;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var STEM = '#5e6236';
    var LEAVES = ['#6b7f3e', '#7a8a4a', '#58703a', '#8a9a5b', '#6f7d45', '#8d8a52'];

    var start = performance.now();
    var svg, corners = [], timer = null, raf = null;

    function rng(seed) {
        return function () {
            seed |= 0; seed = seed + 0x6D2B79F5 | 0;
            var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
            t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
    }

    function el(name, attrs, parent) {
        var e = document.createElementNS(SVGNS, name);
        for (var k in attrs) e.setAttribute(k, attrs[k]);
        if (parent) parent.appendChild(e);
        return e;
    }

    function build() {
        if (svg) svg.remove();
        corners = [];
        var W = window.innerWidth, H = window.innerHeight;
        var wide = W > 900;
        var s = wide ? 1 : 0.55;
        var m = wide ? 22 : 5;

        svg = el('svg', {
            'class': 'vines', 'aria-hidden': 'true', focusable: 'false',
            width: W, height: H, viewBox: '0 0 ' + W + ' ' + H
        });
        var defs = el('defs', {}, svg);
        var f = el('filter', { id: 'vine-rough', x: '-5%', y: '-5%', width: '110%', height: '110%' }, defs);
        el('feTurbulence', { type: 'fractalNoise', baseFrequency: '0.035', numOctaves: '2', seed: '7', result: 'n' }, f);
        el('feDisplacementMap', { 'in': 'SourceGraphic', in2: 'n', scale: '2.2', xChannelSelector: 'R', yChannelSelector: 'G' }, f);

        var root = el('g', { filter: 'url(#vine-rough)' }, svg);

        [[0, 0], [1, 0], [0, 1], [1, 1]].forEach(function (c, i) {
            var right = c[0], bottom = c[1];
            var sx = right ? -1 : 1, sy = bottom ? -1 : 1;
            var ox = right ? W - m : m, oy = bottom ? H - m : m;
            var map = function (x, y) {
                return (ox + sx * x * s).toFixed(1) + ' ' + (oy + sy * y * s).toFixed(1);
            };
            var rand = rng(1234 + i * 977);

            // Corner flourish (local coords: x inward from side, y inward from top/bottom)
            var flourish = 'M' + map(175, 9) +
                ' C' + map(145, -1) + ' ' + map(112, 19) + ' ' + map(82, 9) +
                ' C' + map(56, 1) + ' ' + map(36, 3) + ' ' + map(21, 15) +
                ' C' + map(9, 25) + ' ' + map(5, 41) + ' ' + map(7, 62);

            // Stem down/up the side to just past the vertical middle
            // On phones, only the corner flourish (no creeping side stems)
            var endY = wide ? (H / 2 - m) / s + 8 : 0;
            var period = 85, amp = 6;
            var d = flourish;
            for (var y = 66; y <= endY; y += 4) {
                var x = 7 + amp * Math.sin((y - 62) / period * Math.PI * 2) * Math.min(1, (y - 62) / 40);
                d += ' L' + map(x, y);
            }

            var g = el('g', {}, root);
            var path = el('path', {
                d: d, fill: 'none', stroke: STEM, 'stroke-width': (2.3 * s).toFixed(2),
                'stroke-linecap': 'round', 'stroke-linejoin': 'round'
            }, g);
            var fp = el('path', { d: flourish }, null);
            g.appendChild(fp);
            var L1 = fp.getTotalLength();
            fp.remove();
            var L = path.getTotalLength();
            path.style.strokeDasharray = L + ' ' + L;
            path.style.strokeDashoffset = L;

            // Leaves and tendrils along the path
            var items = [];
            var side = 1;
            for (var dist = 16; dist < L - 6; dist += (30 + rand() * 18) * s) {
                var p = path.getPointAtLength(dist);
                var q = path.getPointAtLength(Math.min(L, dist + 2));
                var ang = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI;
                side = -side;
                var outer = el('g', {
                    transform: 'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ') rotate(' +
                        (ang + side * (40 + rand() * 25)).toFixed(1) + ')'
                }, g);
                var inner = el('g', { 'class': 'vine-bit' }, outer);
                var k = (0.8 + rand() * 0.55) * s;
                inner.style.setProperty('--k', k.toFixed(3));

                if (rand() < 0.16) {
                    // curly tendril
                    var r = 1 + rand() * 0.5;
                    el('path', {
                        d: 'M0 0 C6 -1 12 2 13 7 C14 12 9 14 6.5 11.5 C4.5 9.5 6.5 7 8.5 8.2',
                        fill: 'none', stroke: STEM, 'stroke-width': (1.1 / r).toFixed(2),
                        'stroke-linecap': 'round', transform: 'scale(' + r.toFixed(2) + (side < 0 ? ' -' : ' ') + r.toFixed(2) + ')'
                    }, inner);
                } else {
                    var col = LEAVES[Math.floor(rand() * LEAVES.length)];
                    el('path', { d: 'M0 0 L3 0', stroke: STEM, 'stroke-width': '1.1', 'stroke-linecap': 'round' }, inner);
                    el('path', {
                        d: 'M3 0 C6 -5.5 14 -7.5 21 -1 C14 5 6.5 5 3 0 Z',
                        fill: col, 'fill-opacity': (0.7 + rand() * 0.25).toFixed(2)
                    }, inner);
                    el('path', {
                        d: 'M4 0 C9 -1 14 -1.2 19.5 -1', fill: 'none', stroke: STEM,
                        'stroke-width': '0.6', 'stroke-opacity': '0.55'
                    }, inner);
                }
                items.push({ d: dist, node: inner, on: false });
            }
            corners.push({ path: path, L: L, L1: L1, items: items });
        });

        document.body.insertBefore(svg, document.body.firstChild);
        tick();
    }

    function drawnLength(c, t) {
        if (reduceMotion) return c.L;
        if (t < INTRO_MS) {
            var u = t / INTRO_MS;
            return c.L1 * (1 - Math.pow(1 - u, 3));
        }
        var v = Math.min(1, (t - INTRO_MS) / GROW_MS);
        return c.L1 + (c.L - c.L1) * (1 - Math.pow(1 - v, 1.6));
    }

    function tick() {
        var t = performance.now() - start;
        var done = true;
        corners.forEach(function (c) {
            var len = drawnLength(c, t);
            c.path.style.strokeDashoffset = Math.max(0, c.L - len);
            if (len < c.L) done = false;
            c.items.forEach(function (it) {
                if (!it.on && it.d <= len) {
                    it.on = true;
                    it.node.style.transitionDuration = reduceMotion ? '0s' : (t < INTRO_MS ? '0.9s' : '6s');
                    it.node.classList.add('on');
                }
            });
        });
        if (done) { stop(); return; }
        if (t < INTRO_MS) {
            raf = requestAnimationFrame(tick);
        } else if (!timer) {
            timer = setInterval(tick, 250);
        }
    }

    function stop() {
        if (raf) cancelAnimationFrame(raf);
        if (timer) clearInterval(timer);
        raf = timer = null;
    }

    var resizeT;
    window.addEventListener('resize', function () {
        clearTimeout(resizeT);
        resizeT = setTimeout(function () { stop(); build(); }, 200);
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', build);
    } else {
        build();
    }
})();
