// Mark JS as available (reveal animations only hide content when JS works)
document.documentElement.classList.add('js');

// ---------- Typing animation ----------
(function () {
    var el = document.getElementById('typed');
    if (!el) return;
    var words = ['Web Designer', 'Front-End Developer', 'Social Media Manager', 'Excel Specialist'];
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { el.textContent = words[0]; return; }

    var w = 0, i = 0, deleting = false;
    function tick() {
        var word = words[w];
        el.textContent = word.slice(0, i);
        var delay = deleting ? 45 : 90;
        if (!deleting && i === word.length) { deleting = true; delay = 1400; }
        else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
        else { i += deleting ? -1 : 1; }
        setTimeout(tick, delay);
    }
    tick();
})();

// ---------- Scroll reveal ----------
(function () {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        items.forEach(function (e) { e.classList.add('visible'); });
        return;
    }
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    items.forEach(function (e) { io.observe(e); });
})();

// ---------- Mobile menu ----------
(function () {
    var btn = document.querySelector('.menu-btn');
    var nav = document.getElementById('nav');
    if (!btn || !nav) return;
    function setOpen(open) {
        nav.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setOpen(false); });
})();

// ---------- Highlight current section in nav ----------
(function () {
    var links = document.querySelectorAll('nav a');
    var sections = [];
    links.forEach(function (a) {
        var s = document.querySelector(a.getAttribute('href'));
        if (s) sections.push({ a: a, s: s });
    });
    function update() {
        var y = window.scrollY + 140;
        var current = null;
        sections.forEach(function (o) { if (o.s.offsetTop <= y) current = o; });
        links.forEach(function (a) { a.classList.remove('active'); });
        if (current) current.a.classList.add('active');
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
})();

// ---------- WhatsApp contact form ----------
(function () {
    var form = document.getElementById('waForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = document.getElementById('cname').value.trim();
        var msg = document.getElementById('cmsg').value.trim();
        var text = 'Hi Darshan, I am ' + name + '. ' + msg;
        window.open('https://wa.me/919586930070?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
})();

// ---------- Footer year ----------
var y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
