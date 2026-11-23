/* MMORPG 3D — Wiki oficial (site/wiki.html). Sem dependências; lê data/wiki.json + GET /wiki do painel para Contos das Tavernas. */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }

  function carregarJson(url) {
    return fetch(url + '?t=' + Date.now(), { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    });
  }

  /* ---------- Tema Luz / Sombra (compartilhado com index.html) ---------- */
  function aplicarTema(t) {
    document.documentElement.dataset.modo = t;
    var b = $('#btn-tema');
    if (b) {
      b.setAttribute('aria-pressed', String(t === 'sombra'));
      var txt = $('.btn-tema-txt', b);
      if (txt) txt.textContent = t === 'sombra' ? 'Luz' : 'Sombra';
    }
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'sombra' ? '#0d0c14' : '#f6f0e2');
  }
  function iniciarTema() {
    var b = $('#btn-tema');
    if (b) {
      b.addEventListener('click', function () {
        var novo = document.documentElement.dataset.modo === 'sombra' ? 'luz' : 'sombra';
        aplicarTema(novo);
        try { localStorage.setItem('tema', novo); } catch (e) {}
      });
    }
    aplicarTema(document.documentElement.dataset.modo || 'sombra');

    var raiz = document.documentElement, pendente = false, gx = 0, gy = 0;
    window.addEventListener('pointermove', function (e) {
      gx = e.clientX; gy = e.clientY;
      if (pendente) return; pendente = true;
      requestAnimationFrame(function () {
        raiz.style.setProperty('--gx', gx + 'px'); raiz.style.setProperty('--gy', gy + 'px'); pendente = false;
      });
    }, { passive: true });
  }

  /* ---------- Navegação por categoria + hash ---------- */
  var ativa = 'regioes';
  function abrirSecao(id, atualizarHash) {
    var alvo = $('#sec-' + id);
    if (!alvo) id = 'regioes';
    ativa = id;
    $('#wiki-resultados').hidden = true;
    $$('.wiki-sec[data-sec]').forEach(function (s) { s.hidden = s.getAttribute('data-sec') !== id; });
    $$('#wiki-nav [role="tab"]').forEach(function (b) {
      var sel = b.getAttribute('data-sec') === id;
      b.setAttribute('aria-selected', String(sel));
      b.tabIndex = sel ? 0 : -1;
    });
    if (atualizarHash && history.replaceState) history.replaceState(null, '', '#' + id);
  }

  function iniciarNav() {
    var botoes = $$('#wiki-nav [role="tab"]');
    botoes.forEach(function (b, i) {
      b.addEventListener('click', function () {
        $('#wiki-busca').value = '';
        $('#wiki-busca-conta').hidden = true;
        abrirSecao(b.getAttribute('data-sec'), true);
      });
      b.addEventListener('keydown', function (e) {
        var d = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : ((e.key === 'ArrowUp' || e.key === 'ArrowLeft') ? -1 : 0);
        if (!d) return;
        e.preventDefault();
        var prox = botoes[(i + d + botoes.length) % botoes.length];
        prox.focus();
        abrirSecao(prox.getAttribute('data-sec'), true);
      });
    });

    function lerHash() {
      var h = (window.location.hash || '').replace(/^#/, '');
      if (h && $('#sec-' + h)) abrirSecao(h, false);
    }
    window.addEventListener('hashchange', lerHash);
    lerHash();
  }

  /* ---------- Renderização de tabelas com textContent ---------- */
  function preencherTabela(tbodyId, linhas, colunas) {
    var tb = $(tbodyId);
    if (!tb) return;
    tb.textContent = '';
    (linhas || []).forEach(function (item) {
      var tr = document.createElement('tr');
      colunas.forEach(function (fn) {
        var td = document.createElement('td');
        var val = fn(item);
        if (val && typeof val === 'object' && val.destaque) {
          td.className = 'wk-dest';
          td.textContent = val.texto;
        } else {
          td.textContent = String(val == null ? '—' : val);
        }
        tr.appendChild(td);
      });
      tb.appendChild(tr);
    });
  }

  /* ---------- Índice de busca instantânea ---------- */
  var indice = [];
  function adicionarIndice(sec, cat, titulo, texto) {
    indice.push({ sec: sec, cat: cat, titulo: titulo, texto: texto, norm: (cat + ' ' + titulo + ' ' + texto).toLowerCase() });
  }

  function montarIndiceBase(d) {
    indice = [];
    (d.regioes || []).forEach(function (r) {
      adicionarIndice('regioes', 'Mapa & Regiões', r.nome + ' (Nv. médio ' + r.nivelMedio + ' · faixa ' + r.faixa + ')',
        'Hub: ' + r.hub + ' · Hunts: ' + r.hunts + ' · Chefes: ' + r.chefes);
    });
    adicionarIndice('reinos', 'Capitais & Reinos', 'Capital de Aurora — NPCs, Contratos e Portões',
      'Sir Corwin (Estepe Nv. 20), Marechal da Coroa (contratos diários), Tesoureiro (doar materiais para reputação), Intendente (casa no Honrado), Sacerdote (bênção), Mestre de Armas (refazer atributos), Rei Aldric e Rainha Solenne (Exaltado).');
    adicionarIndice('reinos', 'Capitais & Reinos', 'Capital de Nocturna — NPCs, Contratos e Portões',
      'Vesna (Estepe Nv. 20), Mestre dos Sussurros (contratos diários), Tesoureiro (doar materiais para reputação), Intendente (casa no Honrado), Guardiã das Chaves (bênção), Mestre de Armas (refazer atributos), Senhora Morgaine e Regente Velado (Exaltado).');
    (d.guildas || []).forEach(function (g) {
      adicionarIndice('reinos', 'Guildas (Estepe Nv. 20+)', g.guilda + ' — ' + g.mestre, 'Título final: ' + g.titulo);
    });
    (d.armas || []).forEach(function (a) {
      adicionarIndice('armas', 'Armas & Forja', a.tipo + ' (' + a.recurso + ')',
        'Loja T1: ' + a.lojaT1 + ' · Ossos: ' + a.ossos + ' · Taxas T1–T4: ' + a.taxaT1 + ' / ' + a.taxaT2 + ' / ' + a.taxaT3 + ' / ' + a.taxaT4);
    });
    adicionarIndice('armas', 'Drops & Poções', 'Chance de drop e Poções de vida',
      '2% lacaios, 3% guerreiros/arqueiros, 4% conjuradores, 50% chefes. Poções de vida sem teto na mochila, recarga de 5 s.');
    adicionarIndice('oficios', 'Ofícios · Coleta', 'Nós de Coleta (Ervas e Minérios)',
      'Segurar 2 segundos (tecla E). T1 nível 1 (90 s), T2 nível 5 (180 s), T3 nível 25 (240 s). Grupo a 20 m ganha XP.');
    adicionarIndice('oficios', 'Ofícios · Horta', 'Horta da Vila & Caderno do Hortelão',
      'Hortelão atrás do Teleportador na Vila do Poço. 4 a 8 parcelas (Coleta 5, 10, 25 e 50). Sementes T1 5g (20 min), T2 11g (2 h), T3 27g (6 h). Caderno paga 115 g.');
    adicionarIndice('oficios', 'Ofícios · Produção', 'Produção nas Bancadas (Forja, Encantar, Alquimia)',
      '+0,2 de qualidade por nível acima do 1 (até +10). Travas: nível do herói, teto da região e grau da cidade.');
    adicionarIndice('chefes', 'Chefes & Masmorras', 'Gruta das Raízes & Guardião da Gruta (Nv. 15–18)',
      'Cadeia da Oda no Refúgio das Corujas → Capitã da Guarda. Puzzle de 3 pilares (Coruja, Lua, Raiz, Osso).');
    adicionarIndice('chefes', 'Chefes & Masmorras', 'As Provações (Nv. 50 e 100) — Guardiã das Provações',
      'Arena solo na praça da Vila do Poço, sem perda de XP; todo XP fica guardado e libera +1 nível bônus ao vencer.');
    adicionarIndice('chefes', 'Chefes & Masmorras', 'Subterrâneo & Guardião do Lago Escuro (Nv. 60–100 / Chefe Nv. 70)',
      'Boca do poço com Tocha ou Lanterna da Lua. Vencer o Guardião do Lago evolui a Lanterna do grupo.');
    adicionarIndice('interface', 'Interface & Social', 'Menu do Herói, Mercado, Grupo e Eventos',
      'Adicionar amigo, Sussurrar, Convidar para grupo, Duelo, Denunciar, Escrivão do Mercado, Procurar grupo, Eventos do mundo, Reviver em grupo.');
    adicionarIndice('interface', 'Atalhos & Constelações', 'Atalhos (I, 1–4, E), Constelações e Evolução de Classes',
      'Touro, Raposa, Coruja, Montanha e Lanterna no botão Céu. Nova jornada de classes: Aprendiz (1–10) → Classe (10) → Subclasse (50).');
  }

  function iniciarBusca() {
    var input = $('#wiki-busca'), conta = $('#wiki-busca-conta'), box = $('#wiki-resultados');
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      if (!q) {
        conta.hidden = true;
        abrirSecao(ativa, false);
        return;
      }
      var hits = indice.filter(function (it) { return it.norm.indexOf(q) >= 0; });
      conta.textContent = hits.length + (hits.length === 1 ? ' resultado' : ' resultados');
      conta.hidden = false;
      $$('.wiki-sec[data-sec]').forEach(function (s) { s.hidden = true; });
      box.hidden = false;
      box.textContent = '';

      box.appendChild(el('p', 'capitulo-num', 'Busca na Wiki'));
      box.appendChild(el('h1', null, 'Resultados para “' + input.value.trim() + '”'));
      if (!hits.length) {
        box.appendChild(el('p', 'wiki-nota', 'Nada encontrado. Tente “Tesoureiro”, “Honrado”, “Horta”, “Rei-Múmia”, “Espada” ou “Constelações”.'));
        return;
      }
      var lista = el('div', 'wiki-hits');
      hits.forEach(function (h) {
        var btn = el('button', 'wiki-hit');
        btn.type = 'button';
        btn.appendChild(el('span', 'wiki-hit-cat', h.cat));
        btn.appendChild(el('strong', null, h.titulo));
        btn.appendChild(el('span', 'wiki-hit-txt', h.texto));
        btn.addEventListener('click', function () {
          input.value = '';
          conta.hidden = true;
          abrirSecao(h.sec, true);
        });
        lista.appendChild(btn);
      });
      box.appendChild(lista);
    });
  }

  /* ---------- Contos das Tavernas (GET /wiki ao vivo do painel admin) ---------- */
  function paragrafos(texto) {
    return String(texto || '').replace(/\r\n?/g, '\n').split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean);
  }
  function iniciarLore(apiBase) {
    var lista = $('#wk-lore-lista'), status = $('#wk-lore-status');
    if (!apiBase) {
      status.textContent = 'Os contos das tavernas aparecem aqui quando o servidor de conteúdo está online.';
      return;
    }
    fetch(apiBase + '/wiki', { mode: 'cors', credentials: 'omit' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) {
        var itens = d.items || [];
        if (!itens.length) { status.textContent = 'Nenhum conto publicado ainda.'; return; }
        lista.textContent = '';
        itens.forEach(function (w) {
          adicionarIndice('lore', 'Contos das Tavernas', w.title, w.summary || '');
          var det = el('details', 'wk-item');
          var sum = el('summary');
          sum.appendChild(el('h3', null, w.title));
          sum.appendChild(el('p', null, w.summary));
          det.appendChild(sum);
          var corpo = el('div', 'wk-corpo');
          det.appendChild(corpo);
          det.addEventListener('toggle', function () {
            if (!det.open || corpo.getAttribute('data-ok')) return;
            corpo.textContent = '';
            corpo.appendChild(el('p', null, 'Abrindo o relato…'));
            fetch(apiBase + '/wiki/' + encodeURIComponent(w.slug), { mode: 'cors', credentials: 'omit' })
              .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
              .then(function (pg) {
                corpo.textContent = '';
                paragrafos(pg.body).forEach(function (p) { corpo.appendChild(el('p', null, p)); });
                corpo.setAttribute('data-ok', '1');
              }, function () {
                corpo.textContent = '';
                corpo.appendChild(el('p', 'vt-erro', 'Não foi possível abrir este relato agora.'));
              });
          });
          lista.appendChild(det);
        });
      }, function () {
        status.textContent = 'Os contos das tavernas carregam ao vivo na versão publicada do site.';
      });
  }

  /* ---------- Inicialização ---------- */
  iniciarTema();
  iniciarNav();
  iniciarBusca();

  carregarJson('data/wiki.json').then(function (d) {
    preencherTabela('#wk-regioes', d.regioes, [
      function (r) { return { destaque: true, texto: r.nome }; },
      function (r) { return 'Nv. ' + r.nivelMedio; },
      function (r) { return r.faixa; },
      function (r) { return r.hunts; },
      function (r) { return r.hub; },
      function (r) { return r.chefes; }
    ]);
    preencherTabela('#wk-portoes-aurora', d.portoesAurora, [
      function (p) { return { destaque: true, texto: p.patente }; },
      function (p) { return p.libera; }
    ]);
    preencherTabela('#wk-portoes-nocturna', d.portoesNocturna, [
      function (p) { return { destaque: true, texto: p.patente }; },
      function (p) { return p.libera; }
    ]);
    preencherTabela('#wk-guildas', d.guildas, [
      function (g) { return { destaque: true, texto: g.guilda }; },
      function (g) { return g.mestre; },
      function (g) { return g.titulo; }
    ]);
    preencherTabela('#wk-armas', d.armas, [
      function (a) { return { destaque: true, texto: a.tipo }; },
      function (a) { return a.recurso; },
      function (a) { return a.lojaT1; },
      function (a) { return a.ossos; },
      function (a) { return a.taxaT1; },
      function (a) { return a.taxaT2; },
      function (a) { return a.taxaT3; },
      function (a) { return a.taxaT4; }
    ]);
    preencherTabela('#wk-coleta', d.oficios.coleta, [
      function (c) { return { destaque: true, texto: c.tier }; },
      function (c) { return c.materiais; },
      function (c) { return c.recarga; },
      function (c) { return c.nivel; },
      function (c) { return c.xp; }
    ]);
    preencherTabela('#wk-horta', d.oficios.horta, [
      function (h) { return { destaque: true, texto: h.tier }; },
      function (h) { return h.semente; },
      function (h) { return h.tempo; },
      function (h) { return h.colheita; }
    ]);
    preencherTabela('#wk-caderno', d.oficios.caderno, [
      function (c) { return c.pagina; },
      function (c) { return { destaque: true, texto: c.ouro }; }
    ]);
    preencherTabela('#wk-prod-xp', d.oficios.producaoXp, [
      function (p) { return p.acao; },
      function (p) { return { destaque: true, texto: p.xp }; }
    ]);
    montarIndiceBase(d);
  });

  carregarJson('config.json').then(function (c) {
    var u = c && c.api && c.api.url;
    var ok = typeof u === 'string' && /^(https:\/\/|http:\/\/localhost(:\d+)?(\/|$))/.test(u) ? u.replace(/\/+$/, '') : '';
    iniciarLore(ok);
  }, function () { iniciarLore(''); });
})();
