/* MMORPG 3D — comportamento do site. Sem dependências.
   Dados editáveis sem mexer em código: status.json (estado do servidor) e config.json (e-mail, downloads). */
(function () {
  'use strict';

  var reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var m = function (k) { return I18N.msg(k); };
  var estado = { status: null, config: null, precoPago: 0, recusas: 0, classe: 'cavaleiro', acesa: false };

  function guardar(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function carregarJson(url) {
    return fetch(url + '?t=' + Date.now(), { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    });
  }

  /* ---------- Tema Luz / Sombra ---------- */
  function aplicarTema(t) {
    document.documentElement.dataset.modo = t;
    var b = $('#btn-tema');
    b.setAttribute('aria-pressed', String(t === 'sombra'));
    var txt = $('.btn-tema-txt');
    // o botão mostra o tema para onde se vai
    txt.textContent = t === 'sombra'
      ? (I18N.lang === 'en' ? I18N.enText('theme.light') : 'Luz')
      : (I18N.lang === 'en' ? I18N.enText('theme.dark') : 'Sombra');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', t === 'sombra' ? '#0d0c14' : '#f6f0e2');
  }
  function iniciarTema() {
    $('#btn-tema').addEventListener('click', function () {
      var novo = document.documentElement.dataset.modo === 'sombra' ? 'luz' : 'sombra';
      aplicarTema(novo); guardar('tema', novo);
    });
    aplicarTema(document.documentElement.dataset.modo || 'luz');
    I18N.onChange(function () { aplicarTema(document.documentElement.dataset.modo); });

    // Lanterna global (tema Sombra, mouse)
    var raiz = document.documentElement, pendente = false, gx = 0, gy = 0;
    window.addEventListener('pointermove', function (e) {
      gx = e.clientX; gy = e.clientY;
      if (pendente) return; pendente = true;
      requestAnimationFrame(function () {
        raiz.style.setProperty('--gx', gx + 'px'); raiz.style.setProperty('--gy', gy + 'px'); pendente = false;
      });
    }, { passive: true });
  }

  /* ---------- Menu no celular ---------- */
  function iniciarMenu() {
    var btn = $('#btn-menu'), menu = $('#menu');
    function fechar() { menu.classList.remove('aberto'); btn.setAttribute('aria-expanded', 'false'); }
    btn.addEventListener('click', function () {
      var abrir = !menu.classList.contains('aberto');
      menu.classList.toggle('aberto', abrir); btn.setAttribute('aria-expanded', String(abrir));
    });
    $$('#menu a').forEach(function (a) { a.addEventListener('click', fechar); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });
  }

  /* ---------- Aparecer ao rolar ---------- */
  function iniciarAparecer() {
    var alvos = $$('.aparece, .versos li');
    if (reduzido || !('IntersectionObserver' in window)) { alvos.forEach(function (el) { el.classList.add('visivel'); }); return; }
    document.documentElement.classList.add('anima');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        // versos entram um depois do outro
        var atraso = el.parentElement.classList.contains('versos') ? Array.prototype.indexOf.call(el.parentElement.children, el) * 700 : 0;
        setTimeout(function () { el.classList.add('visivel'); }, atraso);
        io.unobserve(el);
      });
    }, { threshold: 0.25 });
    alvos.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Cap. I: o céu escurece ---------- */
  function iniciarAnoitecer() {
    var sec = $('.cap-asas');
    if (!sec) return;
    function atualizar() {
      var r = sec.getBoundingClientRect(), h = window.innerHeight;
      var p = Math.min(1, Math.max(0, (h * 0.55 - r.top) / (r.height * 0.75)));
      if (reduzido) p = 1;
      sec.style.setProperty('--p', p.toFixed(3));
      sec.classList.toggle('anoitecendo', p > 0.48);
    }
    window.addEventListener('scroll', function () { requestAnimationFrame(atualizar); }, { passive: true });
    window.addEventListener('resize', atualizar);
    atualizar();
  }

  /* ---------- Abas acessíveis (bardo × livro, classes) ---------- */
  function abas(lista, aoEscolher) {
    var botoes = $$('[role="tab"]', lista);
    function escolher(b, foco) {
      botoes.forEach(function (x) {
        var sel = x === b;
        x.setAttribute('aria-selected', String(sel)); x.tabIndex = sel ? 0 : -1;
      });
      if (foco) b.focus();
      aoEscolher(b);
    }
    botoes.forEach(function (b, i) {
      b.addEventListener('click', function () { escolher(b); });
      b.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        escolher(botoes[(i + d + botoes.length) % botoes.length], true);
      });
    });
  }
  function iniciarVersoes() {
    abas($('.versoes-abas'), function (b) {
      var bardo = b.id === 'aba-bardo';
      $('#painel-bardo').hidden = !bardo; $('#painel-livro').hidden = bardo;
    });
  }

  /* ---------- Classes ---------- */
  function desenharClasse() {
    var d = m('classes')[estado.classe];
    $('#classe-nome').textContent = d[0]; $('#classe-desc').textContent = d[1];
    $('#classe-esquiva').textContent = d[2]; $('#classe-arma').textContent = d[3]; $('#classe-passiva').textContent = d[4];
    $('#classe-ico').setAttribute('href', '#ico-' + estado.classe);
  }
  function iniciarClasses() {
    abas($('.classes-abas'), function (b) { estado.classe = b.getAttribute('data-classe'); desenharClasse(); });
    I18N.onChange(desenharClasse);
    desenharClasse();
  }

  /* ---------- Cap. III: lanterna, nome proibido, Grimório ---------- */
  function iniciarEscuro() {
    var sec = $('.cap-dorme'), pendente = false, px = 0, py = 0;
    function mover(x, y) {
      px = x; py = y;
      if (pendente) return; pendente = true;
      requestAnimationFrame(function () {
        var r = sec.getBoundingClientRect();
        sec.style.setProperty('--x', (px - r.left) + 'px'); sec.style.setProperty('--y', (py - r.top) + 'px');
        pendente = false;
      });
    }
    sec.addEventListener('pointermove', function (e) { mover(e.clientX, e.clientY); }, { passive: true });
    sec.addEventListener('pointerdown', function (e) { mover(e.clientX, e.clientY); }, { passive: true });
    // sem mouse: a lanterna vagueia sozinha devagar
    if (!reduzido && !window.matchMedia('(hover: hover)').matches) {
      var t0 = performance.now();
      (function vagar(t) {
        if (!estado.acesa && !sec.dataset.tocou) {
          var r = sec.getBoundingClientRect(), s = (t - t0) / 1000;
          sec.style.setProperty('--x', (r.width * (0.5 + 0.32 * Math.sin(s * 0.5))) + 'px');
          sec.style.setProperty('--y', (r.height * (0.45 + 0.28 * Math.sin(s * 0.37 + 1))) + 'px');
        }
        requestAnimationFrame(vagar);
      })(t0);
      sec.addEventListener('touchstart', function () { sec.dataset.tocou = '1'; }, { passive: true });
    }

    var btnLuz = $('#btn-acender');
    function textoLuz() { btnLuz.textContent = estado.acesa ? m('lightOn') : m('lightOff'); }
    btnLuz.addEventListener('click', function () {
      estado.acesa = !estado.acesa; sec.classList.toggle('acesa', estado.acesa); textoLuz();
    });
    I18N.onChange(textoLuz);

    // O nome que ninguém diz
    var tarja = $('#tarja'), aviso = $('#tarja-aviso');
    tarja.addEventListener('click', function () {
      var frases = m('refusals');
      aviso.textContent = frases[estado.recusas % frases.length];
      estado.recusas++;
      tarja.classList.remove('recusa'); void tarja.offsetWidth; tarja.classList.add('recusa');
    });
    I18N.onChange(function () { if (estado.recusas) aviso.textContent = m('refusals')[(estado.recusas - 1) % m('refusals').length]; });

    // Grimório: abrir cobra um ano (a página escurece um pouco, até um limite)
    var btnG = $('#btn-grimorio'), pag = $('#grimorio-pagina'), conta = $('#grimorio-conta'), rotulo = $('[data-i18n="ch3.grimoire"]', btnG);
    function textoConta() {
      if (!estado.precoPago) { conta.textContent = ''; return; }
      conta.textContent = estado.precoPago === 1 ? m('grimoire1') : m('grimoireN').replace('{n}', estado.precoPago);
    }
    function textoBotao() { rotulo.textContent = pag.hidden ? m('grimoireOpen') : m('grimoireClose'); }
    btnG.addEventListener('click', function () {
      var abrir = pag.hidden;
      pag.hidden = !abrir; btnG.setAttribute('aria-expanded', String(abrir));
      if (abrir) {
        estado.precoPago++;
        document.body.style.setProperty('--preco', Math.min(estado.precoPago, 6));
      }
      textoConta(); textoBotao();
    });
    I18N.onChange(function () { textoConta(); textoBotao(); });
  }

  /* ---------- Reinos: toque mostra o segredo ---------- */
  function iniciarReinos() {
    $$('.reino').forEach(function (r) {
      r.addEventListener('click', function () { r.classList.toggle('tocado'); });
    });
  }

  /* ---------- Mapa em névoa ---------- */
  function iniciarMapa() {
    var nevoa = $('#nevoa'), contador = $('#mapa-contador'), mapa = $('#mapa');
    var cols = 8, lins = 5, total = cols * lins, limite = 9, limpas = 0;
    for (var i = 0; i < total; i++) nevoa.appendChild(document.createElement('span'));
    var celulas = $$('span', nevoa);
    function texto() {
      contador.textContent = limpas >= limite ? m('fogAll') : m('fog').replace('{n}', limpas).replace('{t}', total);
    }
    function limpar(x, y) {
      if (limpas >= limite) return;
      var r = nevoa.getBoundingClientRect();
      var c = Math.floor((x - r.left) / (r.width / cols)), l = Math.floor((y - r.top) / (r.height / lins));
      if (c < 0 || l < 0 || c >= cols || l >= lins) return;
      var el = celulas[l * cols + c];
      if (el.classList.contains('limpa')) return;
      el.classList.add('limpa'); limpas++; texto();
    }
    mapa.addEventListener('pointermove', function (e) { limpar(e.clientX, e.clientY); }, { passive: true });
    mapa.addEventListener('pointerdown', function (e) { limpar(e.clientX, e.clientY); }, { passive: true });
    mapa.addEventListener('touchmove', function (e) { var t = e.touches[0]; limpar(t.clientX, t.clientY); }, { passive: true });
    I18N.onChange(texto);
    texto();
  }

  /* ---------- Despertar: a página treme uma vez ao chegar ---------- */
  function iniciarDespertar() {
    var sec = $('#despertar');
    if (reduzido || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      setTimeout(function () {
        $('main').classList.add('tremendo');
        if (navigator.vibrate) { try { navigator.vibrate([60, 40, 90]); } catch (e) {} }
        setTimeout(function () { $('main').classList.remove('tremendo'); }, 1200);
      }, 400);
    }, { threshold: 0.45 });
    io.observe(sec);
  }

  /* ---------- Status do servidor (status.json) ---------- */
  function desenharStatus() {
    var s = estado.status, ponto = $('.selo-status .ponto'), selo = $('#selo-status-txt');
    ponto.classList.remove('online', 'offline');
    if (!s) {
      selo.textContent = m('seloUnknown'); $('#st-servidor').textContent = m('statusUnknown');
      return;
    }
    var st = s.estado;
    if (st === 'online') { ponto.classList.add('online'); selo.textContent = m('seloOnline'); $('#st-servidor').textContent = m('statusOnline'); }
    else if (st === 'manutencao') { ponto.classList.add('offline'); selo.textContent = m('seloOffline'); $('#st-servidor').textContent = m('statusOffline'); }
    else { selo.textContent = m('seloPlaytest'); $('#st-servidor').textContent = m('statusPlaytest'); }
    $('#st-jogadores').textContent = typeof s.jogadoresOnline === 'number' && st === 'online' ? String(s.jogadoresOnline) : m('playersHidden');
    $('#st-versao').textContent = s.versao || '—';
    $('#rodape-versao').textContent = s.versao || '';
    var nota = $('#st-nota');
    if (s.atualizadoEm) {
      var d = new Date(s.atualizadoEm);
      if (!isNaN(d)) {
        var base = I18N.lang === 'en' ? I18N.enText('status.note') : I18N.ptText('status.note');
        nota.textContent = base + ' ' + m('updated') + d.toLocaleDateString(I18N.lang === 'en' ? 'en-GB' : 'pt-BR') + '.';
      }
    }
    var prox = $('#proximo-despertar');
    if (s.proximoDespertar) {
      var dp = new Date(s.proximoDespertar);
      prox.textContent = isNaN(dp) ? m('nextNone') : m('next') + dp.toLocaleString(I18N.lang === 'en' ? 'en-GB' : 'pt-BR', { dateStyle: 'medium', timeStyle: 'short' });
    } else prox.textContent = m('nextNone');
  }
  function iniciarStatus() {
    function buscar() {
      carregarJson('status.json')
        .then(function (s) { estado.status = s; }, function () { estado.status = null; })
        .then(desenharStatus);
    }
    I18N.onChange(desenharStatus);
    buscar();
    setInterval(function () { if (!document.hidden) buscar(); }, 60000);
  }

  /* ---------- Downloads e contato (config.json) ---------- */
  function sistema() {
    var ua = navigator.userAgent || '';
    if (/android/i.test(ua)) return 'android';
    if (/windows/i.test(ua)) return 'windows';
    return '';
  }
  function emailValido(e) { return typeof e === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e); }
  function desenharConfig() {
    var c = estado.config || {}, dl = c.downloads || {}, email = c.contato && c.contato.email;
    ['windows', 'android'].forEach(function (os) {
      var info = dl[os] || {}, a = $('#dl-' + os), meta = $('#dl-' + os + '-meta');
      var base = os === 'windows' ? '64 bits · Windows 10+' : 'APK · arm64 · Android 8+';
      if (info.url) {
        a.href = info.url; a.removeAttribute('aria-disabled'); a.textContent = m('download') + (info.versao ? ' ' + info.versao : '');
        a.setAttribute('download', '');
        meta.textContent = base + (info.tamanho ? ' · ' + info.tamanho : '');
      } else {
        a.href = '#contato'; a.setAttribute('aria-disabled', 'true'); a.removeAttribute('download');
        a.textContent = emailValido(email) ? m('ask') : m('soon');
        meta.textContent = base;
      }
    });
    var btn = $('#btn-email'), txt = $('#email-txt');
    if (emailValido(email)) {
      btn.href = 'mailto:' + email + '?subject=' + encodeURIComponent(m('emailSubject'));
      btn.removeAttribute('aria-disabled'); txt.textContent = m('email') + email;
    } else {
      btn.href = '#contato'; btn.setAttribute('aria-disabled', 'true');
      txt.textContent = I18N.lang === 'en' ? I18N.enText('ct.soon') : I18N.ptText('ct.soon');
    }
    if (c.contato && c.contato.discord) {
      var p = $('.contato-discord');
      p.innerHTML = '';
      var link = document.createElement('a');
      link.href = c.contato.discord; link.rel = 'noopener'; link.textContent = 'Discord';
      p.appendChild(link);
    }
  }
  function iniciarConfig() {
    var meu = sistema();
    if (meu) { var card = $('.download[data-os="' + meu + '"]'); if (card) card.classList.add('recomendado'); }
    $$('[aria-disabled="true"]').forEach(function (a) {
      a.addEventListener('click', function (e) { if (a.getAttribute('aria-disabled') === 'true' && a.id === 'btn-email') e.preventDefault(); });
    });
    I18N.onChange(desenharConfig);
    carregarJson('config.json').then(function (c) { estado.config = c; }, function () { estado.config = null; }).then(desenharConfig);
  }

  /* ---------- Início ---------- */
  I18N.init();
  iniciarTema();
  iniciarMenu();
  iniciarAparecer();
  iniciarAnoitecer();
  iniciarVersoes();
  iniciarClasses();
  iniciarEscuro();
  iniciarReinos();
  iniciarMapa();
  iniciarDespertar();
  iniciarStatus();
  iniciarConfig();
})();
