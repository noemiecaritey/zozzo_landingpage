(function () {
  'use strict';
  var DESIGN_WIDTH = 1440;

  // --- Mise à l'échelle proportionnelle de la maquette 1440px à la largeur de l'écran
  var fit = document.getElementById('fit');
  var stage = document.getElementById('stage');
  var designHeight = stage ? (parseFloat(stage.style.height) || stage.offsetHeight) : 0;
  function resize() {
    if (!fit || !stage) return;
    var s = document.documentElement.clientWidth / DESIGN_WIDTH;
    var mobile = document.documentElement.clientWidth <= 900;
    // téléphone : si la page est plus courte que l'écran, on descend le pied de page pour qu'il reste collé en bas
    var shift = 0;
    if (mobile) shift = Math.max(0, (window.innerHeight - 68 - (designHeight - 98) * s) / s);
    stage.style.setProperty('--ft-shift', shift + 'px');
    stage.style.height = (designHeight + shift) + 'px';
    stage.style.transform = 'scale(' + s + ')';
    fit.style.height = Math.ceil((designHeight + shift) * s) + 'px';
    // téléphone : le header de la maquette est remplacé par le header à 3 barres (voir plus bas)
    fit.style.marginTop = document.documentElement.clientWidth <= 900 ? (-98 * s) + 'px' : '';
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('load', function () {
    resize();
    // si on arrive avec une ancre (#fonctionnalites…), recaler après la mise à l'échelle
    if (location.hash) {
      var id = location.hash.slice(1);
      var el = document.getElementById(id);
      if (document.documentElement.clientWidth <= 900) el = document.getElementById(id + '-m') || el;
      if (el) el.scrollIntoView();
    }
  });

  // --- Effets au scroll (apparition en fondu au fil de la page)
  var items = Array.prototype.slice.call(document.querySelectorAll('.rv'));
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduce) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      var batch = entries.filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left; });
      batch.forEach(function (e, i) {
        e.target.style.setProperty('--d', Math.min(i * 0.08, 0.5) + 's'); // léger décalage entre éléments
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
    // filet de sécurité : si un élément n'a pas été révélé après le chargement, on l'affiche
    window.addEventListener('load', function () {
      setTimeout(function () {
        items.forEach(function (el) {
          if (!el.classList.contains('in')) {
            var r = el.getBoundingClientRect();
            if (r.bottom < 0 || r.top < window.innerHeight) el.classList.add('in');
          }
        });
      }, 2500);
    });
  }

  // --- Carrousel « Les fonctionnalités » (version bureau + version téléphone)
  Array.prototype.forEach.call(document.querySelectorAll('.carousel, .m-carousel'), function (carousel) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('.slide, .m-slide'));
    var current = 0;
    var show = function (i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (sl, k) {
        var on = k === current;
        sl.classList.toggle('is-active', on);
        sl.setAttribute('aria-hidden', on ? 'false' : 'true');
      });
    };
    carousel.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.arrow, .m-arrow');
      if (b) show(current + parseInt(b.getAttribute('data-dir'), 10));
    });
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') show(current + 1);
      if (e.key === 'ArrowLeft') show(current - 1);
    });
    // balayage au doigt
    var x0 = null;
    carousel.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    }, { passive: true });
  });

  // --- Téléphone : menu (3 barres)
  var burger = document.querySelector('.m-burger');
  var menu = document.getElementById('m-menu');
  if (burger && menu) {
    var closeBtn = menu.querySelector('.m-close');
    var setMenu = function (open) {
      menu.hidden = !open;
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) closeBtn.focus(); else burger.focus();
    };
    burger.addEventListener('click', function () { setMenu(true); });
    closeBtn.addEventListener('click', function () { setMenu(false); });
    menu.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('a')) { menu.hidden = true; burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });
    window.addEventListener('resize', function () { if (document.documentElement.clientWidth > 900 && !menu.hidden) setMenu(false); });
  }

  // --- Formulaires : pas encore de back-end, on évite le rechargement de la page
  // Pas de serveur : le formulaire ouvre le mail de l'utilisateur, prérempli, à destination de l'équipe.
  var CONTACT_EMAIL = 'zozzoapplsf@gmail.com';
  function openMail(subject, body) {
    window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }
  var contactForm = document.getElementById('contact-form');
  var mContact = document.querySelector('.m-form');
  [contactForm, mContact].forEach(function (form) {
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var g = function (n) { var el = form.elements[n]; return el ? el.value.trim() : ''; };
      var statut = g('statut');
      openMail('Contact ZOZZO – ' + g('prenom') + ' ' + g('nom'),
        'Nom : ' + g('nom') + '\r\nPrénom : ' + g('prenom') + '\r\nStatut : ' + (statut || 'non précisé') + '\r\n\r\nMessage :\r\n' + g('message'));
    });
  });
  [document.getElementById('nl-form'), document.querySelector('.m-nl')].forEach(function (form) {
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var m = form.elements.email || document.getElementById('nl-email');
      openMail('Inscription à la newsletter ZOZZO', 'Merci d’inscrire cette adresse à la newsletter : ' + (m ? m.value.trim() : ''));
    });
  });
  document.querySelectorAll('select').forEach(function (sel) {
    sel.addEventListener('change', function () { sel.classList.toggle('is-set', sel.value !== ''); });
  });
})();
