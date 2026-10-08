/* Idiomas. O texto em pt-BR mora no próprio HTML (data-i18n); aqui fica o inglês e as frases montadas pelo JS.
   Nomes próprios seguem docs/LIVROS_EN.md: Aurora, Nocturna e Lúmen não traduzem. */
(function () {
  'use strict';

  var EN = {
    'skip': 'Skip to content',
    'nav.story': 'Story', 'nav.kingdoms': 'Kingdoms', 'nav.game': 'Gameplay', 'nav.tutorials': 'Guides',
    'nav.awakening': 'The Awakening', 'nav.download': 'Download', 'nav.contact': 'Contact', 'nav.open': 'Open menu',
    'theme.label': 'Switch between Light and Shadow', 'theme.dark': 'Shadow', 'theme.light': 'Light',

    'hero.kicker': 'Online action RPG · PC and Android',
    'hero.title1': 'Something sleeps', 'hero.title2': 'beneath the Well.',
    'hero.sub': 'Five classes, two rival kingdoms and a village that sings so the thing below never wakes. The beginning of the story is here. The rest, only by playing.',
    'hero.cta': 'Download the game', 'hero.trailer': 'Watch the trailer', 'hero.scroll': 'Scroll down',

    'status.loading': 'Asking the server…', 'status.title': 'State of the realm', 'status.server': 'Server',
    'status.players': 'Heroes online', 'status.version': 'Version', 'status.offline': 'Offline mode',
    'status.offlineOk': 'Open to everyone',
    'status.note': 'Multiplayer is in closed playtest. The whole game works offline, no account needed.',

    'ch1.num': 'Chapter I', 'ch1.title': 'The Age of Wings',
    'ch1.p1': 'Before the kingdoms, the sky had masters. Where the <b>Lords on High</b> landed, stone turned to glass. The peoples paid tribute in cattle, in gold and, in bad years, in people.',
    'ch1.p2': 'The <b>Ancients</b> refused to pay. They were not stronger. They were more patient. They learned that a Lord on High cannot be killed — the fire only moves elsewhere. But everything that lives also sleeps.',
    'ch1.p3': 'So they wrote a lullaby. Every word, kept in the <b>Grimoires</b>, took a piece of the writer’s body: years, the colour of the eyes, a hand. Magic in this world was never free.',
    'ch1.bardTab': 'As the bard sings it', 'ch1.bookTab': 'As the book tells it',
    'ch1.bardSrc': '<i>The Ballad of the Thousand Ancients</i> — sung in Aurora’s taverns',
    'ch1.bard': 'A thousand were the Ancients bold,<br>a thousand shields held high,<br>and every dragon, one by one,<br>came crashing from the sky.<br><br>So raise your cup to the Ancients bold —<br>a bard can tell no lie!<br>(And he who says they were but few<br>can buy the round — goodbye.)',
    'ch1.bookSrc': 'From the books of the Village of the Well',
    'ch1.book': 'The Ancients were few and patient, and killed no dragon at all. They put them to sleep — and paid with their own bodies.',
    'ch1.bookHint': 'In the game, every ballad has a matching book. Find both and you learn what really happened.',

    'ch2.num': 'Chapter II', 'ch2.title': 'The Village of the Well',
    'ch2.p1': 'Every story starts in a small village with a well in the middle. Children play in the square, the Captain of the Guard counts the spears, the villagers draw water as if it were any other day.',
    'ch2.p2': 'Nobody remembers who dug the well. The old folk say it was not dug: it was <i>left</i>, like a door someone forgot to close on the way out.',
    'ch2.p3': 'And there is <b>Lúmen</b>, a small light that lives in a lantern and does not like the dark down there. They say the moon sent her to watch over something.',
    'ch2.hook': 'But lately, the camps around the village have started moving again at night…',
    'ch2.imgAlt': 'The Village of the Well at dusk, wooden houses around the well', 'ch2.cap': 'The Village of the Well, where the open world begins.',

    'song.title': 'The bucket-hauling song',
    'song.intro': 'A grandmother sang this while hauling the bucket, and always stopped at the same line.',
    'song.v1': 'Down the rope and down the light,', 'song.v2': 'down the name that none may say;',
    'song.v3': 'who lights the moon beneath the ground', 'song.v4': 'comes home with no shadow — and glad to stay.',
    'song.cutLabel': 'The rest of the song has been erased',
    'song.end': 'She said the song ended there. She lied. Whoever wants the rest must go down with a light of their own.',

    'ch3.num': 'Chapter III', 'ch3.title': 'What sleeps',
    'ch3.p1': 'The skeletons in the camps do not walk like ordinary dead. They move to a rhythm, as if someone were <i>dreaming</i> them into motion.',
    'ch3.phrase': '“It sleeps, and the bones obey.”',
    'ch3.p2': 'That is what the survivors repeat. Nobody knows what sleeps. Those who know will not say the name — because saying it aloud is what wakes it.',
    'ch3.nameLabel': 'The name:', 'ch3.nameBtn': 'Erased name. Try to read it',
    'ch3.grimoire': 'Open the Grimoire', 'ch3.price': 'All magic has a price. This one costs a year.',
    'ch3.page': 'At the bottom of the Root Grotto, a <b>stone Guardian</b> watches over a closed Grimoire. It is not the threat. It is the <b>lock</b>.',
    'ch3.end': 'What happens when the lock falls, the books do not say. You will have to go down.',
    'ch3.light': 'Light the lantern (show everything)',

    'kg.title': 'Two kingdoms. One oath.',
    'kg.auroraTag': 'The surface · the Crown', 'kg.aurora': 'Crown of Aurora',
    'kg.auroraP': 'Those who stayed above raised a white wall with iron crossbows and levied the <b>Sky Tithe</b> so it would never fall. The dragon vanished. The tithe stayed.',
    'kg.auroraS': 'The King wants war. He thinks Nocturna is hiding something.',
    'kg.noctTag': 'The underground · the Veiled City', 'kg.noct': 'Nocturna',
    'kg.noctP': 'Those who fled the fire into the giant cavern — and every exile after them. It lives on moon lanterns and favours.',
    'kg.noctS': 'The Regent wears a veil. They say he <i>listens</i> to something down there.',
    'kg.oath': 'At level 20 you swear to one of them. You can switch only once — and switching has a name: <b>betrayal</b>.',

    'gp.kicker': 'Gameplay', 'gp.title': 'Choose how you fight',
    'gp.lead': 'Isometric action combat: a three-hit combo, perfect dodges, an ultimate and every hit validated by the server. Each class has its own dodge.',
    'cls.knight': 'Knight', 'cls.ranger': 'Ranger', 'cls.mage': 'Mage', 'cls.barb': 'Barbarian', 'cls.rogue': 'Rogue',
    'cls.dodge': 'Dodge', 'cls.weapon': 'Starting weapon', 'cls.passive': 'Passive',
    'ft.world': '12 regions', 'ft.worldP': 'Fields, desert, frost, ash, volcano, swamps, necropolis… from level 1 to 100, and heroes go up to 500.',
    'ft.bosses': 'Bosses with phases', 'ft.bossesP': 'Charges, adds, reward rooms and a generated Grotto to explore.',
    'ft.econ': 'Economy per city', 'ft.econP': 'Every city has its own treasury, tax and prices that rise and fall. Forging, repair, enchanting and alchemy.',
    'ft.guild': 'Guilds and lore', 'ft.guildP': 'Three guilds, books to read in-game, rune stones and ancient echoes that empower your ultimate.',
    'gal.arena': 'Skeleton arena on the tutorial island', 'gal.arenaC': 'The Weapon Master’s Island',
    'gal.boss': 'The Guardian’s arena on the tutorial island', 'gal.bossC': 'The first boss arena',
    'gal.oasis': 'Crimson Oasis, the desert city', 'gal.oasisC': 'Crimson Oasis, in the desert',

    'map.title': 'The map you have not walked yet',
    'map.lead': 'Swipe or move the mouse to push the fog away from a few regions. The whole map only appears by walking it.',
    'map.alt': 'World map divided into biomes',

    'tut.kicker': 'First steps', 'tut.title': 'Guides',
    'tut.lead': 'The game teaches everything on the Weapon Master’s Island, without ever locking you in. Here is the short version for those who want to arrive prepared.',
    't1.t': 'The Weapon Master’s Island', 't1.a': 'Follow the rings on the ground: they show the next step.',
    't1.b': 'Open the chest, face the skeleton arena and buy your first weapon.', 't1.c': 'Defeat the island’s Guardian. Already know how to play? You can skip the tutorial from the start.',
    't2.t': 'Combat and dodging', 't2.a': 'Chain attacks for the three-hit combo. You can attack while moving.',
    't2.b': 'Dodge at the last moment: a perfect dodge opens room for a counterattack.', 't2.c': 'Fill your Fury, Focus or Mana bar and unleash the ultimate.',
    't3.t': 'Backpack and gear', 't3.a': 'Press <kbd>I</kbd> (or the backpack button) to open the inventory.',
    't3.b': 'Wear head, chest, hands, feet, ring and amulet pieces. The tier changes the colour of the piece.', 't3.c': 'Put a weapon or potion on the hotbar (keys <kbd>1</kbd>–<kbd>4</kbd>).',
    't4.t': 'Market and workbench', 't4.a': 'Each city has its own prices: buy cheap in one hub and sell in another.',
    't4.b': 'At the workbench: forge, repair, enchant, disenchant and brew alchemy.', 't4.c': 'Taxes go to the city treasury — and the treasury runs out.',
    't5.t': 'Map and Teleporter', 't5.a': 'Get close to a hub to unlock it on the map.',
    't5.b': 'Talk to the Teleporter to travel between unlocked hubs.', 't5.c': 'Inside the safe zone, monsters will not target you.',
    't6.t': 'Party and quests', 't6.a': 'Start with the Captain of the Guard, in the Village of the Well.',
    't6.b': 'The quest journal and the on-screen “next objective” show where to go.', 't6.c': 'Form a party to share the hunt (online).',
    't7.t': 'Kingdoms and reputation', 't7.a': 'At level 20, swear to Aurora or Nocturna.',
    't7.b': 'Daily contracts raise your reputation and open the capital’s gates.', 't7.c': 'Fortresses change hands in the weekly territory war.',
    't8.t': 'Constellations and progress', 't8.a': 'Open the Sky button to invest attributes in the constellations.',
    't8.b': 'Dying costs XP — blessings soften the loss.', 't8.c': 'While you are away, your hero rests and earns rested XP.',

    'aw.kicker': 'Server event', 'aw.title': 'The Awakening', 'aw.tremor': 'The ground trembles beneath the Village of the Well.',
    'aw.p': 'Every so often, what sleeps stirs. The whole server is warned. Skeletons across the world rise stronger. And the heroes go down together.',
    'aw.f1': 'Tremor', 'aw.f1p': 'the warning spreads across the world', 'aw.f2': 'Awakening', 'aw.f2p': 'the bones obey',
    'aw.f3': 'The fight', 'aw.f3p': 'everyone in the same arena', 'aw.f4p': 'only those who went down know',
    'aw.next': 'Next Awakening: to be announced.', 'aw.cap': 'The Awakening trailer (10 s).',

    'dl.kicker': 'Downloads', 'dl.title': 'Go down with your own light', 'dl.soon': 'Coming soon', 'dl.yours': 'Your system',
    'dl.note': '<b>Multiplayer is in closed playtest.</b> Anyone can play offline. Online access, for now, is only for playtesters — want in? Write to us.',

    'ct.title': 'Send a raven',
    'ct.lead': 'A question, a bug, want to join the playtest or just tell us what you thought of the story? Write to us.',
    'ct.soon': 'Game e-mail coming soon', 'ct.discord': 'Discord community: coming soon.',
    'ct.lucas': 'networking, world, backend and interface', 'ct.dinho': 'combat, enemies, quests, economy and story',

    'ft.credits': 'Made in Unity with our own server. Third-party assets in the public domain (CC0): <a href="https://kaylousberg.itch.io/" rel="noopener">KayKit</a>, <a href="https://kenney.nl/" rel="noopener">Kenney</a>, <a href="https://ambientcg.com/" rel="noopener">ambientCG</a> and the track <i>Medieval: Harvest Season</i> (RandomMind).',
    'ft.top': 'Back to top'
  };

  // Frases montadas pelo main.js (os dois idiomas aqui)
  var MSG = {
    pt: {
      statusPlaytest: 'Playtest fechado', statusOnline: 'Online', statusOffline: 'Em manutenção', statusUnknown: 'Sem notícia',
      seloPlaytest: 'Playtest fechado · modo offline liberado', seloOnline: 'Servidor online', seloOffline: 'Servidor em manutenção',
      seloUnknown: 'Sem notícia do servidor', updated: 'Atualizado em ',
      playersHidden: 'só no playtest',
      refusals: ['Não diga. Dizer é o que acorda.', 'A tarja não sai. Nem deve.', 'Quem leu esse nome não voltou para contar.', 'Só no fim da história. Lá embaixo.'],
      grimoire1: 'Preço pago: 1 ano da sua vida.', grimoireN: 'Preço pago: {n} anos da sua vida. O Grimório agradece.',
      grimoireClose: 'Fechar o Grimório', grimoireOpen: 'Abrir o Grimório',
      fog: '{n} de {t} regiões reveladas', fogAll: 'Você afastou a névoa. O resto do mundo, só andando.',
      download: 'Baixar', soon: 'Em breve', ask: 'Pedir acesso',
      email: 'Escrever para ', emailSubject: 'Contato pelo site — MMORPG 3D',
      next: 'Próximo Despertar: ', nextNone: 'Próximo Despertar: a anunciar.',
      lightOn: 'Apagar a lanterna', lightOff: 'Acender a lanterna (mostrar tudo)',
      classes: {
        cavaleiro: ['Cavaleiro', 'Aço e escudo. Encara de perto, aguenta a pancada e segura a linha do grupo.', 'Rolamento', 'Espada', 'Guarda: −10% de dano recebido de frente'],
        patrulheiro: ['Patrulheiro', 'Arco e paciência. Acerta de longe e não deixa o bicho chegar perto.', 'Avanço (para onde aponta; sem direção, foge do bicho)', 'Arco', 'Olho de Águia: +15% de alcance à distância'],
        mago: ['Mago', 'Cajado e vontade. Dano mágico à distância, pouca vida — e toda magia cobra seu preço.', 'Piscar (some e reaparece)', 'Cajado', 'Mente Afiada: habilidades recarregam 10% mais rápido'],
        barbaro: ['Bárbaro', 'Corpo a corpo pesado. Quanto menos vida, mais dano: o Bárbaro fica perigoso quando está quase caindo.', 'Arrancada (invulnerável por um instante)', 'Machado', 'Fúria de Sangue: até +25% de dano conforme a vida cai'],
        ladino: ['Ladino', 'Dano alto num alvo só e muita mobilidade. Some na sombra e reaparece pelas costas.', 'Passo nas Sombras', 'Adaga', 'Pelas Costas: +30% de chance de crítico pelas costas']
      }
    },
    en: {
      statusPlaytest: 'Closed playtest', statusOnline: 'Online', statusOffline: 'Under maintenance', statusUnknown: 'No word',
      seloPlaytest: 'Closed playtest · offline mode open', seloOnline: 'Server online', seloOffline: 'Server under maintenance',
      seloUnknown: 'No word from the server', updated: 'Updated ',
      playersHidden: 'playtest only',
      refusals: ['Do not say it. Saying it is what wakes it.', 'The bar will not come off. Nor should it.', 'Whoever read that name never came back to tell.', 'Only at the end of the story. Down there.'],
      grimoire1: 'Price paid: 1 year of your life.', grimoireN: 'Price paid: {n} years of your life. The Grimoire thanks you.',
      grimoireClose: 'Close the Grimoire', grimoireOpen: 'Open the Grimoire',
      fog: '{n} of {t} regions revealed', fogAll: 'You pushed the fog away. The rest of the world, only by walking.',
      download: 'Download', soon: 'Coming soon', ask: 'Request access',
      email: 'Write to ', emailSubject: 'Contact from the website — MMORPG 3D',
      next: 'Next Awakening: ', nextNone: 'Next Awakening: to be announced.',
      lightOn: 'Put out the lantern', lightOff: 'Light the lantern (show everything)',
      classes: {
        cavaleiro: ['Knight', 'Steel and shield. Fights up close, takes the beating and holds the party’s line.', 'Roll', 'Sword', 'Guard: −10% damage taken from the front'],
        patrulheiro: ['Ranger', 'Bow and patience. Strikes from afar and never lets the beast get close.', 'Dash (where you aim; with no direction, away from the beast)', 'Bow', 'Eagle Eye: +15% ranged reach'],
        mago: ['Mage', 'Staff and will. Ranged magic damage, little health — and every spell has its price.', 'Blink (vanish and reappear)', 'Staff', 'Sharp Mind: abilities recharge 10% faster'],
        barbaro: ['Barbarian', 'Heavy melee. The less health, the more damage: a Barbarian is most dangerous when almost down.', 'Rush (invulnerable for an instant)', 'Axe', 'Blood Fury: up to +25% damage as health drops'],
        ladino: ['Rogue', 'High single-target damage and lots of mobility. Vanishes into shadow and reappears behind you.', 'Shadow Step', 'Dagger', 'Backstab: +30% critical chance from behind']
      }
    }
  };

  var PT = {};       // innerHTML original de cada chave, colhido do HTML
  var PT_ATTR = {};  // atributos originais
  var lang = 'pt';
  var ouvintes = [];

  function colher() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (!(k in PT)) PT[k] = el.innerHTML;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (par) {
        var p = par.split(':'); var k = p[1];
        if (!(k in PT_ATTR)) PT_ATTR[k] = el.getAttribute(p[0]) || '';
      });
    });
  }

  function aplicar(novo) {
    lang = novo === 'en' ? 'en' : 'pt';
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      var v = lang === 'en' ? EN[k] : PT[k];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (par) {
        var p = par.split(':'); var k = p[1];
        var v = lang === 'en' ? EN[k] : PT_ATTR[k];
        if (v != null) el.setAttribute(p[0], v);
      });
    });
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    try { localStorage.setItem('idioma', lang); } catch (e) {}
    ouvintes.forEach(function (fn) { fn(lang); });
  }

  function inicial() {
    try {
      var s = localStorage.getItem('idioma');
      if (s === 'pt' || s === 'en') return s;
    } catch (e) {}
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'pt';
    return /^pt/i.test(nav) ? 'pt' : 'en';
  }

  window.I18N = {
    get lang() { return lang; },
    msg: function (k) { return MSG[lang][k]; },
    ptText: function (k) { return PT[k]; },
    enText: function (k) { return EN[k]; },
    onChange: function (fn) { ouvintes.push(fn); },
    set: aplicar,
    init: function () {
      colher();
      document.querySelectorAll('[data-lang]').forEach(function (b) {
        b.addEventListener('click', function () { aplicar(b.getAttribute('data-lang')); });
      });
      aplicar(inicial());
    }
  };
})();
