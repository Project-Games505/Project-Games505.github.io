/* MMORPG 3D — comportamento do site. Sem dependências.
   Dados editáveis sem mexer em código: status.json (estado do servidor) e config.json (e-mail, downloads). */
(function () {
  'use strict';

  var reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var m = function (k) { return I18N.msg(k); };
  var estado = {
    status: null, config: null, vitrine: null, novidades: null, wiki: null, vivo: null,
    precoPago: 0, recusas: 0, classe: 'cavaleiro', acesa: false,
    categoriaVitrine: 'destaques', modalCardId: null
  };

  var CAT_VITRINE = {
    destaques: ['capital-aurora', 'capital-nocturna', 'reputacao-e-portoes', 'juramento', 'gruta-das-raizes', 'horta'],
    reinos: ['juramento', 'capital-aurora', 'capital-nocturna', 'reputacao-e-portoes', 'guildas'],
    inicio: ['combate', 'guardiao-de-ossos', 'coleta', 'horta', 'constelacoes'],
    masmorras: ['areas-de-caca', 'chefoes', 'gruta-das-raizes', 'instancias', 'guardiao-da-gruta', 'provacoes', 'subterraneo', 'guardiao-do-lago'],
    social: ['mercado', 'amigos-e-sussurro', 'duelo', 'reviver-em-grupo', 'guildas', 'horta', 'coleta']
  };

  function guardar(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function carregarJson(url) {
    return fetch(url + '?t=' + Date.now(), { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    });
  }
  function el(tag, classe, texto) {
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto != null) e.textContent = texto;
    return e;
  }

  /* ---------- Aviso de desenvolvimento (fechável na sessão) ---------- */
  function iniciarAvisoDev() {
    var box = $('#aviso-dev'), btn = $('#btn-fechar-dev');
    if (!box || !btn) return;
    try { if (sessionStorage.getItem('devBannerClosed') === '1') box.hidden = true; } catch (e) {}
    btn.addEventListener('click', function () {
      box.hidden = true;
      try { sessionStorage.setItem('devBannerClosed', '1'); } catch (e) {}
    });
  }

  /* ---------- Tema Luz / Sombra ---------- */
  function aplicarTema(t) {
    document.documentElement.dataset.modo = t;
    var b = $('#btn-tema');
    b.setAttribute('aria-pressed', String(t === 'sombra'));
    var txt = $('.btn-tema-txt');
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
    aplicarTema(document.documentElement.dataset.modo || 'sombra');
    I18N.onChange(function () { aplicarTema(document.documentElement.dataset.modo); });

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

  /* ---------- Abas acessíveis reutilizáveis ---------- */
  function abas(lista, aoEscolher) {
    if (!lista) return { selecionar: function () {} };
    var botoes = $$('[role="tab"]', lista);
    function escolher(b, foco) {
      if (!b || b.hidden) return;
      botoes.forEach(function (x) {
        var sel = x === b;
        x.setAttribute('aria-selected', String(sel)); x.tabIndex = sel ? 0 : -1;
      });
      if (foco) b.focus();
      aoEscolher(b);
    }
    botoes.forEach(function (b) {
      b.addEventListener('click', function () { escolher(b); });
      b.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        var visiveis = botoes.filter(function (x) { return !x.hidden; });
        var idx = visiveis.indexOf(b);
        if (idx < 0) return;
        e.preventDefault();
        escolher(visiveis[(idx + d + visiveis.length) % visiveis.length], true);
      });
    });
    return {
      selecionar: function (selector) {
        var alvo = lista.querySelector(selector);
        if (alvo && !alvo.hidden) escolher(alvo, false);
      }
    };
  }

  /* ---------- Abas: Bardo × Livro, Mundo, Crônicas, Central do Aventureiro ---------- */
  var ctrlCronicas = null, ctrlHub = null;
  function iniciarAbasSecoes() {
    abas($('.versoes-abas'), function (b) {
      var bardo = b.id === 'aba-bardo';
      $('#painel-bardo').hidden = !bardo; $('#painel-livro').hidden = bardo;
    });

    abas($('#mundo-abas'), function (b) {
      var mapa = b.getAttribute('data-mundo') === 'mapa';
      $('#mundo-painel-mapa').hidden = !mapa;
      $('#mundo-painel-galeria').hidden = mapa;
    });

    ctrlCronicas = abas($('#cronicas-abas'), function (b) {
      var alvo = b.getAttribute('data-cr');
      $$('.cr-painel').forEach(function (p) { p.hidden = p.id !== 'cr-' + alvo; });
    });

    ctrlHub = abas($('#hub-abas'), function (b) {
      var alvo = b.getAttribute('data-hub');
      $$('.hub-painel').forEach(function (p) { p.hidden = p.id !== 'hub-' + alvo; });
    });

    // Deep-links preservados (#ranking, #novidades, #tutoriais, #wiki, #o-que-dorme, #reinos)
    function sincronizarHash() {
      var h = (window.location.hash || '').replace(/^#/, '');
      if (!h) return;
      if (h === 'ranking' || h === 'novidades' || h === 'tutoriais') ctrlHub.selecionar('[data-hub="' + h + '"]');
      else if (h === 'wiki' || h.indexOf('wiki-') === 0) {
        ctrlHub.selecionar('[data-hub="wiki"]');
        if (h.indexOf('wiki-') === 0) {
          var det = $('#' + h);
          if (det) det.open = true;
        }
      } else if (h === 'o-que-dorme') ctrlCronicas.selecionar('[data-cr="cap3"]');
      else if (h === 'reinos') ctrlCronicas.selecionar('[data-cr="reinos"]');
    }
    window.addEventListener('hashchange', sincronizarHash);
    sincronizarHash();
  }

  /* ---------- Classes ---------- */
  function desenharClasse() {
    var d = m('classes')[estado.classe];
    $('#classe-nome').textContent = d[0];
    $('#classe-desc').textContent = d[1];
    $('#classe-esquiva').textContent = d[2];
    $('#classe-arma').textContent = d[3];
    $('#classe-passiva').textContent = d[4];
    $('#classe-subs').textContent = d[5] ? (m('subsPrefix') + d[5]) : '';
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
    if (!sec) return;
    function mover(x, y) {
      px = x; py = y;
      if (pendente) return; pendente = true;
      requestAnimationFrame(function () {
        var r = sec.getBoundingClientRect();
        sec.style.setProperty('--x', (px - r.left) + 'px'); sec.style.setProperty('--y', (py - r.top) + 'px');
        pendente = false;
      });
    }
    function soPonteiro(e) { if (e.pointerType !== 'touch') mover(e.clientX, e.clientY); }
    sec.addEventListener('pointermove', soPonteiro, { passive: true });
    sec.addEventListener('pointerdown', soPonteiro, { passive: true });

    if (!reduzido && !window.matchMedia('(hover: hover)').matches) {
      var t0 = performance.now(), atual = null, dedo = null, dedoAte = 0, visivel = false, rodando = false;
      function dedoEm(e) {
        var r = sec.getBoundingClientRect(), tc = e.touches[0];
        if (!tc) return;
        dedo = { x: tc.clientX - r.left, y: tc.clientY - r.top }; dedoAte = performance.now() + 2600;
      }
      sec.addEventListener('touchstart', dedoEm, { passive: true });
      sec.addEventListener('touchmove', dedoEm, { passive: true });
      function quadro(agora) {
        if (!visivel) { rodando = false; return; }
        if (!estado.acesa && !sec.hidden) {
          var r = sec.getBoundingClientRect(), s = (agora - t0) / 1000;
          var alvo = {
            x: r.width * (0.5 + 0.3 * Math.sin(s * 0.5)),
            y: r.height * (0.45 + 0.25 * Math.sin(s * 0.37 + 1))
          };
          if (dedo && agora < dedoAte) alvo = dedo; else dedo = null;
          if (!atual) atual = { x: alvo.x, y: alvo.y };
          atual.x += (alvo.x - atual.x) * 0.1; atual.y += (alvo.y - atual.y) * 0.1;
          sec.style.setProperty('--x', atual.x + 'px'); sec.style.setProperty('--y', atual.y + 'px');
        }
        requestAnimationFrame(quadro);
      }
      function ligar() { if (!rodando) { rodando = true; requestAnimationFrame(quadro); } }
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (es) { visivel = es[0].isIntersecting; if (visivel) ligar(); }).observe(sec);
      } else { visivel = true; ligar(); }
    }

    var btnLuz = $('#btn-acender');
    function textoLuz() { btnLuz.textContent = estado.acesa ? m('lightOn') : m('lightOff'); }
    btnLuz.addEventListener('click', function () {
      estado.acesa = !estado.acesa; sec.classList.toggle('acesa', estado.acesa); textoLuz();
    });
    I18N.onChange(textoLuz);

    var tarja = $('#tarja'), aviso = $('#tarja-aviso');
    tarja.addEventListener('click', function () {
      var frases = m('refusals');
      aviso.textContent = frases[estado.recusas % frases.length];
      estado.recusas++;
      tarja.classList.remove('recusa'); void tarja.offsetWidth; tarja.classList.add('recusa');
    });
    I18N.onChange(function () { if (estado.recusas) aviso.textContent = m('refusals')[(estado.recusas - 1) % m('refusals').length]; });

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

  function iniciarReinos() {
    $$('.reino').forEach(function (r) {
      r.addEventListener('click', function () { r.classList.toggle('tocado'); });
    });
  }

  /* ---------- Mapa em névoa ---------- */
  function iniciarMapa() {
    var nevoa = $('#nevoa'), contador = $('#mapa-contador'), mapa = $('#mapa');
    if (!nevoa) return;
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
      var elc = celulas[l * cols + c];
      if (elc.classList.contains('limpa')) return;
      elc.classList.add('limpa'); limpas++; texto();
    }
    mapa.addEventListener('pointermove', function (e) { limpar(e.clientX, e.clientY); }, { passive: true });
    mapa.addEventListener('pointerdown', function (e) { limpar(e.clientX, e.clientY); }, { passive: true });
    mapa.addEventListener('touchmove', function (e) { var t = e.touches[0]; if (t) limpar(t.clientX, t.clientY); }, { passive: true });
    I18N.onChange(texto);
    texto();
  }

  /* ---------- Trailer: volume baixo (25%) com fade-in suave de 1,2 s e salvo no aparelho ---------- */
  function iniciarVideo() {
    var v = $('#video-despertar');
    if (!v) return;
    var padrao = 0.25, salvo = null;
    try { salvo = parseFloat(localStorage.getItem('volumeTrailer')); } catch (e) {}
    var alvo = (salvo >= 0 && salvo <= 1) ? salvo : padrao;
    v.volume = alvo;
    var meu = null, primeira = true;
    function escrever(x) { meu = x; v.volume = x; }
    v.addEventListener('play', function () {
      if (!primeira) return;
      primeira = false;
      if (reduzido) return;
      var meta = alvo, t0 = Date.now();
      escrever(0);
      var timer = setInterval(function () {
        var k = Math.min(1, (Date.now() - t0) / 1200);
        escrever(meta * k);
        if (k >= 1) clearInterval(timer);
      }, 50);
    });
    v.addEventListener('volumechange', function () {
      if (meu !== null && Math.abs(v.volume - meu) < 0.001) return;
      meu = null; alvo = v.volume;
      if (!v.muted) guardar('volumeTrailer', String(alvo));
    });
  }

  function iniciarDespertar() {
    var sec = $('#despertar');
    if (!sec || reduzido || !('IntersectionObserver' in window)) return;
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
  function dataLocal(iso) {
    var p = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
    return p ? new Date(+p[1], +p[2] - 1, +p[3]) : new Date(iso);
  }
  function dataCurta(iso) {
    var d = dataLocal(iso);
    return isNaN(d) ? '' : d.toLocaleDateString(I18N.lang === 'en' ? 'en-GB' : 'pt-BR');
  }
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

    var vivoOn = estado.vivo && estado.vivo.serverOnline && typeof estado.vivo.onlineNow === 'number' ? estado.vivo.onlineNow : null;
    var onlineNum = vivoOn !== null ? vivoOn : (typeof s.jogadoresOnline === 'number' && st === 'online' ? s.jogadoresOnline : null);
    $('#st-jogadores').textContent = onlineNum !== null ? String(onlineNum) : m('playersHidden');
    $('#st-versao').textContent = s.versao || '—';
    $('#rodape-versao').textContent = s.versao || '';
    var nota = $('#st-nota');
    if (s.atualizadoEm) {
      var d = dataLocal(s.atualizadoEm);
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
        .then(desenharStatus).then(function () { if (!estado.vivo && estado.ranking !== undefined) desenharContador(); });
    }
    I18N.onChange(desenharStatus);
    buscar();
    setInterval(function () { if (!document.hidden) buscar(); }, 60000);
  }

  /* ---------- Downloads e contato (config.json) ---------- */
  var configPronta = Promise.resolve();
  function sistema() {
    var ua = navigator.userAgent || '';
    if (/android/i.test(ua)) return 'android';
    if (/windows/i.test(ua)) return 'windows';
    return '';
  }
  function emailValido(e) { return typeof e === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e); }
  function urlDaConta(c) {
    var conta = c.conta || {};
    if (typeof conta.url === 'string' && /^https:\/\//.test(conta.url)) return conta.url;
    if (typeof conta.exclusaoUrl === 'string' && /^https:\/\//.test(conta.exclusaoUrl)) {
      try { return new URL(conta.exclusaoUrl).origin + '/conta/'; } catch (e) { return ''; }
    }
    return '';
  }
  function desenharConfig() {
    var c = estado.config || {}, dl = c.downloads || {}, email = c.contato && c.contato.email;
    ['windows', 'android'].forEach(function (os) {
      var info = dl[os] || {}, a = $('#dl-' + os), meta = $('#dl-' + os + '-meta');
      var base = os === 'windows' ? '64 bits · Windows 10+' : 'APK · arm64 · Android 8+';
      if (info.url) {
        a.href = info.url; a.removeAttribute('aria-disabled'); a.textContent = m('download') + (info.versao ? ' ' + info.versao : '');
        a.setAttribute('download', '');
        var quando = info.data ? dataCurta(info.data) : '';
        meta.textContent = base + (info.tamanho ? ' · ' + info.tamanho : '') + (quando ? ' · ' + m('released') + quando : '');
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
    var contaUrl = urlDaConta(c);
    [['#nav-conta', '#nav-conta'], ['#rodape-conta', '#rodape-conta-link']].forEach(function (par) {
      var caixa = $(par[0]), link = $(par[1]);
      if (!caixa || !link) return;
      caixa.hidden = !contaUrl;
      if (contaUrl) link.href = contaUrl;
    });
    if (c.contato && c.contato.discord) {
      var p = $('.contato-discord');
      p.textContent = '';
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
    configPronta = carregarJson('config.json').then(function (c) { estado.config = c; }, function () { estado.config = null; });
    configPronta.then(desenharConfig);
  }

  /* ---------- API pública do AccountService ---------- */
  function apiUrl() {
    var u = estado.config && estado.config.api && estado.config.api.url;
    return typeof u === 'string' && /^(https:\/\/|http:\/\/localhost(:\d+)?(\/|$))/.test(u) ? u.replace(/\/+$/, '') : '';
  }
  function carregarApi(caminho) {
    return fetch(apiUrl() + caminho, { mode: 'cors', credentials: 'omit' }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    });
  }

  /* ---------- Guia do Mundo (Vitrine filtrável + Modal completo) ---------- */
  function filtrarVitrine(cards, cat) {
    if (cat === 'todos') return cards;
    if (cat === 'breve') return cards.filter(function (c) { return c.estado === 'em breve'; });
    var ids = CAT_VITRINE[cat] || [];
    var mapa = {};
    cards.forEach(function (c) { mapa[c.id] = c; });
    var lista = ids.map(function (id) { return mapa[id]; }).filter(Boolean);
    return lista.length ? lista : cards;
  }

  function nivelRotulo(c) {
    if (c.estado === 'em breve') return m('vtSoon');
    if (c.nivel) return m('vtLevel').replace('{n}', c.nivel);
    return '';
  }

  function cartaoVitrine(c) {
    var en = I18N.lang === 'en' ? I18N.vitrineEn(c.id) : null;
    var titulo = en ? en.t : c.titulo;
    var gancho = en ? en.g : c.gancho;
    var emBreve = c.estado === 'em breve';
    var card = el('article', 'vt-card' + (emBreve ? ' vt-breve' : ''));
    card.setAttribute('data-id', c.id);

    var selos = el('div', 'vt-selos-topo');
    var nvTxt = nivelRotulo(c);
    if (nvTxt) selos.appendChild(el('span', 'vt-selo' + (emBreve ? ' vt-selo-breve' : ''), nvTxt));
    if (c.foto && c.fotoNota) {
      var rotulo = c.fotoNota.indexOf('provis') === 0 ? m('vtProvisional') : (c.fotoNota.indexOf('ilustr') === 0 ? m('vtIllustrative') : '');
      if (rotulo) selos.appendChild(el('span', 'vt-selo vt-selo-nota', rotulo));
    }

    if (c.foto) {
      var fig = el('figure', 'vt-foto');
      var img = el('img');
      img.src = 'img/vitrine/' + c.foto; img.alt = titulo; img.loading = 'lazy'; img.width = 1280; img.height = 720;
      fig.appendChild(img);
      fig.appendChild(selos);
      card.appendChild(fig);
    } else if (!emBreve && c.fotoFalta) {
      var falta = el('div', 'vt-falta');
      var txt = el('span');
      txt.appendChild(el('strong', null, m('vtPhoto') + ' '));
      txt.appendChild(document.createTextNode(en && en.f ? en.f : c.fotoFalta));
      falta.appendChild(txt);
      falta.appendChild(selos);
      card.appendChild(falta);
    }

    var corpo = el('div', 'vt-corpo');
    if (!c.foto && (emBreve || !c.fotoFalta) && nvTxt) {
      corpo.appendChild(el('span', 'vt-selo' + (emBreve ? ' vt-selo-breve' : ''), nvTxt));
    }
    corpo.appendChild(el('h3', null, titulo));
    corpo.appendChild(el('p', 'vt-gancho', gancho));

    var onde = en && en.o ? en.o : c.onde;
    var quando = en && en.w ? en.w : c.quando;
    if (onde || quando) {
      var acesso = el('div', 'vt-onde');
      if (onde) {
        var lo = el('p');
        lo.appendChild(el('strong', null, m('vtWhere') + ' '));
        lo.appendChild(document.createTextNode(onde));
        acesso.appendChild(lo);
      }
      if (quando) {
        var lw = el('p');
        lw.appendChild(el('strong', null, m('vtWhen') + ' '));
        lw.appendChild(document.createTextNode(quando));
        acesso.appendChild(lw);
      }
      corpo.appendChild(acesso);
    }

    var btn = el('button', 'vt-abrir', m('vtOpenGuide'));
    btn.type = 'button';
    btn.addEventListener('click', function () { abrirModalGuia(c.id); });
    corpo.appendChild(btn);

    card.appendChild(corpo);
    return card;
  }

  function desenharVitrine() {
    var grade = $('#vt-grade');
    if (!grade || !estado.vitrine) return;
    grade.textContent = '';
    filtrarVitrine(estado.vitrine, estado.categoriaVitrine).forEach(function (c) {
      grade.appendChild(cartaoVitrine(c));
    });
  }

  /* ---------- Modal do Guia Completo (textContent apenas — nunca innerHTML vindo de JSON) ---------- */
  function abrirModalGuia(id) {
    if (!estado.vitrine) return;
    var c = estado.vitrine.filter(function (x) { return x.id === id; })[0];
    if (!c) return;
    estado.modalCardId = id;
    var en = I18N.lang === 'en' ? I18N.vitrineEn(c.id) : null;
    var titulo = en ? en.t : c.titulo;
    var gancho = en ? en.g : c.gancho;
    var topicos = en && en.p ? en.p : (c.topicos || []);
    var onde = en && en.o ? en.o : c.onde;
    var quando = en && en.w ? en.w : c.quando;

    $('#gm-nivel').textContent = nivelRotulo(c);
    $('#gm-cat').textContent = c.estado === 'em breve' ? m('vtSoon') : '';
    $('#gm-titulo').textContent = titulo;
    $('#gm-gancho').textContent = gancho;

    var meta = $('#gm-meta');
    meta.textContent = '';
    if (onde) {
      var b1 = el('div', 'gm-meta-box');
      b1.appendChild(el('strong', null, m('vtWhere')));
      b1.appendChild(document.createTextNode(onde));
      meta.appendChild(b1);
    }
    if (quando) {
      var b2 = el('div', 'gm-meta-box');
      b2.appendChild(el('strong', null, m('vtWhen')));
      b2.appendChild(document.createTextNode(quando));
      meta.appendChild(b2);
    }
    meta.hidden = !meta.children.length;

    var corpo = $('#gm-corpo');
    corpo.textContent = '';

    if (topicos.length) {
      corpo.appendChild(el('h4', null, m('vtHighlights')));
      var ult = el('ul');
      topicos.forEach(function (t) { ult.appendChild(el('li', null, t)); });
      corpo.appendChild(ult);
    }

    if (c.guia && c.guia.length) {
      if (I18N.lang === 'en' && m('vtEnNote')) corpo.appendChild(el('p', 'gm-aviso-en', m('vtEnNote')));
      c.guia.forEach(function (bloco) {
        if (bloco.tipo === 'h') corpo.appendChild(el('h4', null, bloco.texto));
        else if (bloco.tipo === 'p') corpo.appendChild(el('p', null, bloco.texto));
        else if (bloco.tipo === 'ul' || bloco.tipo === 'ol') {
          var l = el(bloco.tipo);
          (bloco.itens || []).forEach(function (it) { l.appendChild(el('li', null, it)); });
          corpo.appendChild(l);
        } else if (bloco.tipo === 'tabela') {
          var wrap = el('div', 'gm-tabela-wrap');
          var tbl = el('table', 'gm-tabela');
          var thead = el('thead'), trh = el('tr');
          (bloco.cabecalho || []).forEach(function (h) { trh.appendChild(el('th', null, h)); });
          thead.appendChild(trh); tbl.appendChild(thead);
          var tbody = el('tbody');
          (bloco.linhas || []).forEach(function (row) {
            var tr = el('tr');
            row.forEach(function (cel) { tr.appendChild(el('td', null, cel)); });
            tbody.appendChild(tr);
          });
          tbl.appendChild(tbody); wrap.appendChild(tbl);
          corpo.appendChild(wrap);
        }
      });
    }

    var modal = $('#guia-modal');
    modal.hidden = false;
    document.body.classList.add('modal-aberto');
    $('#gm-fechar').focus();
  }
  function fecharModalGuia() {
    var modal = $('#guia-modal');
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('modal-aberto');
    estado.modalCardId = null;
  }
  function iniciarModalGuia() {
    var modal = $('#guia-modal'), fechar = $('#gm-fechar');
    if (!modal) return;
    fechar.addEventListener('click', fecharModalGuia);
    modal.addEventListener('click', function (e) { if (e.target === modal) fecharModalGuia(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharModalGuia(); });
    I18N.onChange(function () { if (estado.modalCardId) abrirModalGuia(estado.modalCardId); });
  }

  /* ---------- Novidades ---------- */
  function desenharNovidades() {
    var lista = $('#nv-lista');
    if (!lista || !estado.novidades) return;
    lista.textContent = '';
    estado.novidades.forEach(function (n) {
      var li = el('li', 'nv-item');
      li.appendChild(el('h3', null, n.titulo));
      if (n.resumo) li.appendChild(el('p', null, n.resumo));
      lista.appendChild(li);
    });
  }

  /* ---------- Ranking ---------- */
  var CLASSES_RK = ['cavaleiro', 'patrulheiro', 'mago', 'barbaro', 'ladino'];
  function desenharRanking() {
    var corpo = $('#rk-corpo'), tabela = $('#rk-tabela'), vazio = $('#rk-vazio'), nota = $('#rk-nota'), podio = $('#rk-podio');
    if (!corpo) return;
    var r = estado.ranking;
    corpo.textContent = ''; podio.textContent = '';
    if (r === 'erro') {
      tabela.hidden = true; podio.hidden = true; vazio.hidden = false; vazio.textContent = m('rkError'); nota.textContent = '';
      return;
    }
    if (!r) return;
    var linhas = r.entries || [];
    tabela.hidden = linhas.length === 0;
    podio.hidden = linhas.length === 0;
    vazio.hidden = linhas.length !== 0;
    if (!linhas.length) vazio.textContent = m('rkEmpty');
    var nomes = m('classes');

    linhas.slice(0, 3).forEach(function (e, i) {
      var chave = CLASSES_RK[e.characterClass];
      var clsNome = chave && nomes[chave] ? nomes[chave][0] : m('rkNoClass');
      var card = el('div', 'rk-podio-card' + (i === 0 ? ' ouro' : ''));
      var esq = el('div');
      esq.appendChild(el('span', 'rk-podio-pos', '#' + e.rank));
      esq.appendChild(el('strong', null, e.displayName));
      esq.appendChild(el('span', 'rk-podio-sub', clsNome + (e.ascended ? ' · ' + m('rkAscended') : '')));
      card.appendChild(esq);
      card.appendChild(el('span', 'rk-podio-nv', (I18N.lang === 'en' ? 'Lv. ' : 'Nv. ') + e.level));
      podio.appendChild(card);
    });

    linhas.forEach(function (e) {
      var tr = document.createElement('tr');
      tr.appendChild(el('td', 'rk-pos', String(e.rank)));
      var nome = el('td', 'rk-nome', e.displayName);
      if (e.ascended) nome.appendChild(el('span', 'rk-selo', m('rkAscended')));
      tr.appendChild(nome);
      var chave = CLASSES_RK[e.characterClass];
      tr.appendChild(el('td', 'rk-classe', chave && nomes[chave] ? nomes[chave][0] : m('rkNoClass')));
      tr.appendChild(el('td', 'rk-nivel', String(e.level)));
      corpo.appendChild(tr);
    });
    var d = r.generatedAt ? new Date(r.generatedAt) : NaN;
    nota.textContent = isNaN(d) ? '' : m('rkUpdated') + d.toLocaleString(I18N.lang === 'en' ? 'en-GB' : 'pt-BR', { dateStyle: 'medium', timeStyle: 'short' }) + ' · ' + (r.totalCount || 0) + m('rkTotal');
  }
  function iniciarRanking() {
    I18N.onChange(desenharRanking);
    I18N.onChange(desenharFlutuante);
    function doArquivo() { return carregarJson('data/ranking.json'); }
    configPronta
      .then(function () { return apiUrl() ? carregarApi('/ranking?top=20').catch(doArquivo) : doArquivo(); })
      .then(function (d) { estado.ranking = d || {}; }, function () { estado.ranking = 'erro'; })
      .then(function () { desenharRanking(); desenharFlutuante(); desenharContador(); });
  }

  /* ---------- Faixa fixa compacta: Top 5 + Baixar ---------- */
  function desenharFlutuante() {
    var caixa = $('#fl-ranking'), lista = $('#fl-top5'), lider = $('#fl-lider');
    var r = estado.ranking;
    if (!caixa || !r || r === 'erro' || !(r.entries || []).length) { if (caixa) caixa.hidden = true; return; }
    lista.textContent = '';
    r.entries.slice(0, 5).forEach(function (e) {
      var li = el('li');
      li.appendChild(el('span', 'fl-nome', e.displayName));
      li.appendChild(el('span', 'fl-nv', (I18N.lang === 'en' ? 'lv ' : 'nv ') + e.level));
      lista.appendChild(li);
    });
    lider.textContent = '· 1º ' + r.entries[0].displayName;
    caixa.hidden = false;
  }
  function iniciarFlutuante() {
    var fl = $('#flutuante'), caixa = $('#fl-ranking'), btn = $('#fl-abrir');
    if (!fl) return;
    var celular = window.matchMedia('(max-width: 760px)');
    function aberto() { return celular.matches ? caixa.classList.contains('aberto') : !caixa.classList.contains('recolhido'); }
    function marcar() { btn.setAttribute('aria-expanded', String(aberto())); }
    btn.addEventListener('click', function () {
      if (celular.matches) caixa.classList.toggle('aberto'); else caixa.classList.toggle('recolhido');
      marcar();
    });
    $$('#fl-lista a').forEach(function (a) {
      a.addEventListener('click', function () {
        caixa.classList.remove('aberto'); caixa.classList.add('recolhido'); marcar();
      });
    });
    document.addEventListener('click', function (e) {
      if (!caixa.contains(e.target)) {
        if (celular.matches) caixa.classList.remove('aberto');
        else caixa.classList.add('recolhido');
        marcar();
      }
    });
    if (celular.addEventListener) celular.addEventListener('change', marcar);
    marcar();

    if (!('IntersectionObserver' in window)) return;
    var vendo = {};
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { vendo[e.target.id || 'hero'] = e.isIntersecting; });
      fl.classList.toggle('sem-cta', !!(vendo.hero || vendo.baixar));
    });
    var acoes = $('.hero-acoes'), baixar = $('#baixar');
    if (acoes) io.observe(acoes);
    if (baixar) io.observe(baixar);
  }

  /* ---------- Contador animado do hero ---------- */
  function contar(dd, alvo) {
    var de = Number(dd.getAttribute('data-contar')) || 0;
    dd.setAttribute('data-contar', String(alvo));
    var fmt = function (v) { return Math.round(v).toLocaleString(I18N.lang === 'en' ? 'en-GB' : 'pt-BR'); };
    if (reduzido || de === alvo) { dd.textContent = fmt(alvo); return; }
    var t0 = null, dur = 1200;
    function passo(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / dur), suave = 1 - Math.pow(1 - k, 3);
      dd.textContent = fmt(de + (alvo - de) * suave);
      if (k < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }
  function desenharContador() {
    var vivo = estado.vivo, r = estado.ranking && estado.ranking !== 'erro' ? estado.ranking : null, st = estado.status;
    var valores = {
      online: vivo ? (vivo.serverOnline && typeof vivo.onlineNow === 'number' ? vivo.onlineNow : null)
                   : (st && st.estado === 'online' && typeof st.jogadoresOnline === 'number' ? st.jogadoresOnline : null),
      ativos: vivo && vivo.activeLast24h > 0 ? vivo.activeLast24h : null,
      herois: vivo ? vivo.heroesTotal : (r ? r.totalCount : null),
      nivel: vivo ? vivo.highestLevel : (r && r.entries && r.entries.length ? r.entries[0].level : null)
    };
    var algum = false;
    Object.keys(valores).forEach(function (k) {
      var item = $('#hc-' + k), v = valores[k];
      if (!item) return;
      var tem = typeof v === 'number' && v > 0;
      item.hidden = !tem;
      if (tem) { algum = true; contar(item.querySelector('dd'), v); }
    });
    $('#hero-contador').hidden = !algum;
    if (estado.status) desenharStatus();
  }
  function iniciarContador() {
    function buscar() {
      if (!apiUrl()) { desenharContador(); return; }
      carregarApi('/stats/live').then(function (v) { estado.vivo = v; }, function () { estado.vivo = null; }).then(desenharContador);
    }
    configPronta.then(function () {
      buscar();
      setInterval(function () { if (!document.hidden) buscar(); }, 60000);
    });
  }

  /* ---------- Vitrine viva (tilt + parallax suave) ---------- */
  function iniciarVitrineViva() {
    var grade = $('#vt-grade');
    if (!grade || reduzido) return;
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      grade.addEventListener('pointermove', function (e) {
        var card = e.target.closest && e.target.closest('.vt-card');
        if (!card) return;
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.classList.add('tilt');
        card.style.setProperty('--ry', (x * 4).toFixed(2) + 'deg');
        card.style.setProperty('--rx', (-y * 4).toFixed(2) + 'deg');
      });
      grade.addEventListener('pointerout', function (e) {
        var card = e.target.closest && e.target.closest('.vt-card');
        if (card && !card.contains(e.relatedTarget)) { card.classList.remove('tilt'); card.style.removeProperty('--rx'); card.style.removeProperty('--ry'); }
      });
    }
    var pendente = false;
    function mover() {
      pendente = false;
      var meio = window.innerHeight / 2;
      $$('.vt-foto img', grade).forEach(function (img) {
        var r = img.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var d = (r.top + r.height / 2 - meio) * -0.04;
        img.style.setProperty('--parallax', Math.max(-10, Math.min(10, d)).toFixed(1) + 'px');
      });
    }
    window.addEventListener('scroll', function () { if (!pendente) { pendente = true; requestAnimationFrame(mover); } }, { passive: true });
  }

  /* ---------- Fragmentos do Grimório ---------- */
  var FRAG_MARCOS = [0.15, 0.30, 0.45, 0.60, 0.75, 0.90];
  var FRAG_WIKI = ['a-idade-das-asas', 'a-idade-das-asas', 'a-idade-das-asas', 'a-vila-do-poco', 'os-reinos', 'o-despertar'];
  function iniciarFragmentos() {
    var barra = $('#fragmentos-barra'), aviso = $('#fragmento-aviso');
    if (!barra) return;
    var lidos = [];
    try { lidos = JSON.parse(localStorage.getItem('fragmentos') || '[]').filter(function (i) { return i >= 0 && i < FRAG_MARCOS.length; }); } catch (e) { lidos = []; }
    var total = FRAG_MARCOS.length, timer = null;
    function desenharBarra() { barra.style.width = (lidos.length / total * 100) + '%'; }
    function mostrar(i) {
      var completo = lidos.length === total;
      $('#fragmento-conta').textContent = completo ? m('frDone') : m('frCount').replace('{n}', lidos.length).replace('{t}', total);
      $('#fragmento-texto').textContent = m('fragments')[i];
      var link = $('#fragmento-link'), slug = FRAG_WIKI[i];
      var temWiki = !$('#aba-wiki').hidden && estado.wiki && estado.wiki.some(function (w) { return w.slug === slug; });
      link.hidden = !temWiki;
      if (temWiki) {
        link.href = '#wiki-' + slug;
        link.onclick = function () {
          if (ctrlHub) ctrlHub.selecionar('[data-hub="wiki"]');
          var d = $('#wiki-' + slug); if (d) d.open = true;
        };
      }
      aviso.hidden = false;
      clearTimeout(timer);
      timer = setTimeout(function () { aviso.hidden = true; }, completo ? 6500 : 4800);
    }
    var pendente = false;
    function conferir() {
      pendente = false;
      var alto = document.documentElement.scrollHeight - window.innerHeight;
      if (alto <= 0) return;
      var feito = window.scrollY / alto;
      for (var i = 0; i < total; i++) {
        if (feito >= FRAG_MARCOS[i] && lidos.indexOf(i) < 0) {
          lidos.push(i);
          guardar('fragmentos', JSON.stringify(lidos));
          desenharBarra();
          mostrar(i);
          break;
        }
      }
    }
    aviso.addEventListener('click', function (e) { if (e.target.id !== 'fragmento-link') aviso.hidden = true; });
    window.addEventListener('scroll', function () { if (!pendente) { pendente = true; requestAnimationFrame(conferir); } }, { passive: true });
    desenharBarra();
  }

  /* ---------- Carregamento da Vitrine e Novidades ---------- */
  function iniciarVitrine() {
    abas($('#vt-filtros'), function (b) {
      estado.categoriaVitrine = b.getAttribute('data-cat');
      desenharVitrine();
    });
    I18N.onChange(desenharVitrine);
    carregarJson('data/vitrine.json')
      .then(function (d) { estado.vitrine = d.cards || []; desenharVitrine(); },
            function () { var e = $('#vt-erro'); if (e) { e.textContent = m('vtError'); e.hidden = false; } });

    I18N.onChange(desenharNovidades);
    function doChangelog() { return carregarJson('data/novidades.json').then(function (d) { return d.novidades || []; }); }
    configPronta
      .then(function () {
        if (!apiUrl()) return doChangelog();
        return carregarApi('/news?limit=8').then(function (d) {
          var itens = (d.items || []).map(function (n) { return { titulo: n.title, resumo: n.summary }; });
          return itens.length ? itens : doChangelog();
        }, doChangelog);
      })
      .then(function (lista) { estado.novidades = lista; desenharNovidades(); },
            function () { var e = $('#nv-erro'); if (e) { e.textContent = m('vtError'); e.hidden = false; } });
  }

  /* ---------- Wiki (GET /wiki e /wiki/{slug}) ---------- */
  function paragrafos(texto) {
    return String(texto || '').replace(/\r\n?/g, '\n').split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean);
  }
  function abrirPaginaWiki(det, slug) {
    var corpo = det.querySelector('.wk-corpo');
    if (corpo.getAttribute('data-ok')) return;
    corpo.textContent = '';
    corpo.appendChild(el('p', null, m('wkLoading')));
    carregarApi('/wiki/' + encodeURIComponent(slug)).then(function (pg) {
      corpo.textContent = '';
      paragrafos(pg.body).forEach(function (p) { corpo.appendChild(el('p', null, p)); });
      corpo.setAttribute('data-ok', '1');
      document.dispatchEvent(new CustomEvent('wiki:lida', { detail: { slug: slug } }));
    }, function () {
      corpo.textContent = '';
      corpo.appendChild(el('p', 'vt-erro', m('wkError')));
    });
  }
  function desenharWiki(itens) {
    var lista = $('#wk-lista');
    if (!lista) return;
    lista.textContent = '';
    var categoria = null;
    itens.forEach(function (w) {
      if (w.category !== categoria && itens.some(function (x) { return x.category !== w.category; })) {
        categoria = w.category;
        lista.appendChild(el('p', 'wk-categoria', categoria));
      }
      var det = el('details', 'wk-item');
      det.id = 'wiki-' + w.slug;
      var sum = el('summary');
      sum.appendChild(el('h3', null, w.title));
      sum.appendChild(el('p', null, w.summary));
      det.appendChild(sum);
      det.appendChild(el('div', 'wk-corpo'));
      det.addEventListener('toggle', function () { if (det.open) abrirPaginaWiki(det, w.slug); });
      lista.appendChild(det);
    });
    estado.wiki = itens;
  }
  function iniciarWiki() {
    configPronta.then(function () {
      if (!apiUrl()) return;
      carregarApi('/wiki').then(function (d) {
        var itens = d.items || [];
        if (!itens.length) return;
        desenharWiki(itens);
        $('#aba-wiki').hidden = false;
      }, function () {});
    });
  }

  /* ---------- Início ---------- */
  I18N.init();
  iniciarAvisoDev();
  iniciarTema();
  iniciarMenu();
  iniciarAbasSecoes();
  iniciarClasses();
  iniciarEscuro();
  iniciarReinos();
  iniciarMapa();
  iniciarDespertar();
  iniciarVideo();
  iniciarStatus();
  iniciarConfig();
  iniciarVitrine();
  iniciarModalGuia();
  iniciarWiki();
  iniciarRanking();
  iniciarFlutuante();
  iniciarContador();
  iniciarVitrineViva();
  iniciarFragmentos();
})();
