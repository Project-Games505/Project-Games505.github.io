/* Idiomas. O texto em pt-BR mora no próprio HTML (data-i18n); aqui fica o inglês e as frases montadas pelo JS.
   Nomes próprios seguem docs/LIVROS_EN.md: Aurora, Nocturna e Lúmen não traduzem. */
(function () {
  'use strict';

  var EN = {
    'skip': 'Skip to content',
    'dev.aria': 'Development notice',
    'dev.badge': 'In development',
    'dev.banner': 'The game is in active development — bugs, balance tweaks and unexpected maintenance may happen.',
    'dev.more': 'Learn more',
    'dev.close': 'Dismiss notice',

    'nav.awakening': 'The Awakening', 'nav.vitrine': 'World Guide', 'nav.game': 'Combat',
    'nav.story': 'Story', 'nav.community': 'Community', 'nav.contact': 'Contact',
    'nav.account': 'My account', 'nav.download': 'Download', 'nav.open': 'Open menu',
    'nav.ranking': 'Leaderboard', 'nav.tutorials': 'First steps',
    'theme.label': 'Switch between Light and Shadow', 'theme.dark': 'Shadow', 'theme.light': 'Light',

    'hero.kicker': 'Online action RPG · PC and Android · In development',
    'hero.title1': 'Something sleeps', 'hero.title2': 'beneath the Well.',
    'hero.sub': 'Two rival kingdoms, capitals with reputation and gates, isometric action combat and a village that sings so the thing below never wakes. Play online or offline — the start is here, the rest only by playing.',
    'hero.cta': 'Download the game', 'hero.trailer': 'Watch the trailer',

    'status.loading': 'Asking the server…', 'status.title': 'State of the realm', 'status.server': 'Server',
    'status.players': 'Heroes online', 'status.version': 'Version', 'status.offline': 'Offline mode',
    'status.offlineOk': 'Open, no account needed',
    'status.note': 'Open development build: the online server is free to play with an account, and offline mode works with no account.',

    'aw.kicker': 'Server event · Trailer', 'aw.title': 'The Awakening', 'aw.tremor': 'The ground trembles beneath the Village of the Well.',
    'aw.p': 'Every so often, what sleeps stirs. The whole server is warned. Skeletons across the world rise stronger. And the heroes go down together.',
    'aw.f1': 'Tremor', 'aw.f1p': 'the warning spreads across the world', 'aw.f2': 'Awakening', 'aw.f2p': 'the bones obey',
    'aw.f3': 'The fight', 'aw.f3p': 'everyone in the same arena', 'aw.f4p': 'only those who went down know',
    'aw.next': 'Next Awakening: to be announced.', 'aw.cap': 'The Awakening trailer (10 s) · starts at a soft volume.',

    'vt.kicker': 'World Guide', 'vt.title': 'What’s already in the game',
    'vt.lead': 'Where to go, what level you need, who to talk to and the full step-by-step guide for every place. Features still in progress are marked “coming soon”.',
    'vt.filterAria': 'Filter the world guide',
    'vt.f.highlights': 'Highlights', 'vt.f.kingdoms': 'Capitals & Kingdoms', 'vt.f.start': 'Early Journey',
    'vt.f.dungeons': 'Dungeons & Bosses', 'vt.f.social': 'Crafts & Social', 'vt.f.soon': 'Coming soon', 'vt.f.all': 'Show all',
    'gm.close': 'Close guide',

    'gp.kicker': 'Combat & Progression', 'gp.title': 'Fighting styles and the hero’s journey',
    'gp.lead': 'Isometric action combat: three-hit combos, perfect dodges, weapon mastery and server-validated hits. Any hero can equip weapons by meeting vocation, level and attribute requirements.',
    'jc.title': 'Class progression revamp', 'jc.badge': 'In development · partially live',
    'jc.lead': 'Today all 5 classes are already playable with their own dodge and passive. Under the new progression being built, every hero will grow into their class while playing:',
    'jc.s1n': 'Lv. 1–10', 'jc.s1t': 'Apprentice', 'jc.s1p': 'Start without a fixed class and try out starter weapons on the island and early maps.',
    'jc.s2n': 'Lv. 10', 'jc.s2t': 'Class Choice', 'jc.s2p': 'Talk to the Weapon Master in the Well Village to unlock vocation, dodge, passive and skill tree.',
    'jc.s3n': 'Lv. 50', 'jc.s3t': 'Subclass', 'jc.s3p': 'Beat the Level 50 Trial and pick 1 of 2 specializations that change real combat rules.',

    'cls.knight': 'Knight', 'cls.ranger': 'Ranger', 'cls.mage': 'Mage', 'cls.barb': 'Barbarian', 'cls.rogue': 'Rogue',
    'cls.dodge': 'Dodge', 'cls.weapon': 'Vocation', 'cls.passive': 'Passive',
    'world.title': 'Explore the open world', 'world.aria': 'World views',
    'world.tabMap': 'Fogged map', 'world.tabGallery': 'Regions & Gallery',
    'ft.world': '12 regions', 'ft.worldP': 'Fields, desert, frost, ash, volcano, swamps, necropolis… from level 1 to 100, and heroes go up to 500.',
    'ft.bosses': 'Bosses with phases', 'ft.bossesP': 'Charges, adds, reward rooms and a generated Grotto to explore.',
    'ft.econ': 'Economy per city', 'ft.econP': 'Every city has its own treasury, tax and prices that rise and fall. Forging, repair, enchanting and alchemy.',
    'ft.guild': 'Guilds and lore', 'ft.guildP': 'Three guilds, books to read in-game, rune stones and ancient echoes that empower your ultimate.',
    'gal.arena': 'Skeleton arena on the tutorial island', 'gal.arenaC': 'The Weapon Master’s Island',
    'gal.boss': 'The Guardian’s arena on the tutorial island', 'gal.bossC': 'The first boss arena',
    'gal.oasis': 'Crimson Oasis, the desert city', 'gal.oasisC': 'Crimson Oasis, in the desert',
    'map.lead': 'Swipe or move the mouse to push the fog away from a few regions. The whole map only appears by walking it.',
    'map.alt': 'World map divided into biomes',

    'cr.kicker': 'Spoiler-free story', 'cr.title': 'The Chronicles of the Well',
    'cr.lead': 'Flip through the chapters of the past before you go down. The rest of the story, only by playing.',
    'cr.aria': 'Story chapters',
    'cr.tab1': 'Ch. I · Wings', 'cr.tab2': 'Ch. II · The Village', 'cr.tab3': 'Ch. III · What sleeps', 'cr.tab4': 'Two Kingdoms',

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

    'kg.auroraTag': 'The surface · the Crown', 'kg.aurora': 'Crown of Aurora',
    'kg.auroraP': 'Those who stayed above raised a white wall with iron crossbows and levied the <b>Sky Tithe</b> so it would never fall. The dragon vanished. The tithe stayed.',
    'kg.auroraS': 'The King wants war. He thinks Nocturna is hiding something.',
    'kg.noctTag': 'The underground · the Veiled City', 'kg.noct': 'Nocturna',
    'kg.noctP': 'Those who fled the fire into the giant cavern — and every exile after them. It lives on moon lanterns and favours.',
    'kg.noctS': 'The Regent wears a veil. They say he <i>listens</i> to something down there.',
    'kg.oath': 'At level 20 you swear to one of them at the Steppe Camp. You can switch only once — and switching has a name: <b>betrayal</b>.',

    'com.kicker': 'Community & Guides', 'com.title': 'Adventurer’s Hub', 'com.aria': 'Adventurer Hub sections',
    'rk.lead': 'The strongest heroes on the server, by level. Same leaderboard as in the game, without the team’s test accounts.',
    'rk.hero': 'Hero', 'rk.class': 'Class', 'rk.level': 'Level',
    'nv.kicker': 'News', 'nv.lead': 'News from the team and the latest changes to the game (written in Portuguese).',
    'wk.kicker': 'Wiki', 'wk.lead': 'What the taverns tell about this world (written in Portuguese). Tap a chapter to read it.',

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
    't7.t': 'Kingdoms, contracts and gates', 't7.a': 'At level 20, swear to Aurora (Sir Corwin) or Nocturna (Vesna) at the Steppe Camp.',
    't7.b': 'In your capital, run daily contracts (Crown Marshal / Master of Whispers) and donate materials to the Treasurer to climb from Honored to Exalted.',
    't7.c': 'The lower city offers blessings, attribute resets and housing (Honored). The fortress war is coming soon.',
    't8.t': 'Constellations and progress', 't8.a': 'Open the Sky button to invest attributes in the constellations.',
    't8.b': 'Dying costs XP — blessings soften the loss.', 't8.c': 'While you are away, your hero rests and earns rested XP.',

    'hc.online': 'heroes in the world now', 'hc.active': 'adventurers in the last 24 h', 'hc.heroes': 'heroes on the leaderboard', 'hc.top': 'highest level right now',
    'fl.label': 'Leaderboard and download', 'fl.title': 'Top 5', 'fl.more': 'See the full leaderboard', 'fl.join': 'Join the top 100 →',
    'fr.more': 'Read more in the wiki',

    'dl.kicker': 'Downloads', 'dl.title': 'Go down with your own light', 'dl.soon': 'Coming soon', 'dl.iosmeta': 'iPhone and iPad', 'dl.yours': 'Your system',
    'dl.devTitle': 'Game in active development',
    'dl.note': 'This project is built by a small indie team and evolves constantly. Because of that, <b>bugs, server restarts, balance tweaks or unexpected hiccups may happen</b>. Offline mode works even without a connection — and if you spot anything odd, send it through the in-game <b>Feedback</b> button.',

    'ct.title': 'Send a raven',
    'ct.lead': 'A question, a bug, an idea or just want to tell us what you thought of the story? Write to us — or use the Feedback button inside the game.',
    'ct.soon': 'Game e-mail coming soon', 'ct.discord': 'Discord community: coming soon.',
    'ct.lucas': 'networking, world, backend and interface', 'ct.dinho': 'combat, enemies, quests, economy and story',

    'ft.credits': 'Made in Unity with our own server. Third-party assets in the public domain (CC0): <a href="https://kaylousberg.itch.io/" rel="noopener">KayKit</a>, <a href="https://kenney.nl/" rel="noopener">Kenney</a>, <a href="https://ambientcg.com/" rel="noopener">ambientCG</a> and the track <i>Medieval: Harvest Season</i> (RandomMind).',
    'ft.top': 'Back to top', 'ft.delete': 'Delete account', 'ft.account': 'My account', 'ft.privacy': 'Privacy', 'ft.terms': 'Terms of use'
  };

  var MSG = {
    pt: {
      statusPlaytest: 'Em teste', statusOnline: 'Online', statusOffline: 'Em manutenção', statusUnknown: 'Sem notícia',
      seloPlaytest: 'Servidor em teste · offline liberado', seloOnline: 'Servidor online', seloOffline: 'Servidor em manutenção',
      seloUnknown: 'Sem notícia do servidor', updated: 'Atualizado em ',
      playersHidden: '—',
      rkEmpty: 'Ninguém no ranking ainda. Seja o primeiro herói a entrar aqui.', rkError: 'O ranking não carregou agora. Tente de novo mais tarde.',
      rkUpdated: 'Atualizado em ', rkTotal: ' heróis no total.', rkAscended: 'Ascendido', rkNoClass: '—',
      refusals: ['Não diga. Dizer é o que acorda.', 'A tarja não sai. Nem deve.', 'Quem leu esse nome não voltou para contar.', 'Só no fim da história. Lá embaixo.'],
      grimoire1: 'Preço pago: 1 ano da sua vida.', grimoireN: 'Preço pago: {n} anos da sua vida. O Grimório agradece.',
      grimoireClose: 'Fechar o Grimório', grimoireOpen: 'Abrir o Grimório',
      fog: '{n} de {t} regiões reveladas', fogAll: 'Você afastou a névoa. O resto do mundo, só andando.',
      vtSoon: 'Em breve', vtWhere: 'Onde começar:', vtWhen: 'Nível / requisito:', vtPhoto: 'foto:', vtProvisional: 'foto provisória', vtIllustrative: 'foto ilustrativa',
      vtError: 'Não deu para carregar agora.', vtLevel: 'Nv. {n}+', vtOpenGuide: 'Abrir guia completo →', vtHighlights: 'Resumo rápido', vtEnNote: '',
      frCount: 'Fragmento {n} de {t} do Grimório', frDone: 'Grimório completo! O resto da história, só jogando.',
      fragments: [
        'Antes dos reinos, o céu tinha donos. Os Senhores do Alto pousavam e a pedra virava vidro.',
        'Os Antigos não eram mais fortes. Eram mais pacientes: descobriram que tudo o que vive também dorme.',
        'Cada palavra da canção de ninar cobrou um pedaço de quem a escreveu. A magia deste mundo nunca foi de graça.',
        'Dorme, e os ossos obedecem. Quem sabe o nome não diz: dizer em voz alta é o que acorda.',
        'Aurora ergueu uma muralha branca. Nocturna desceu para a caverna. O fogo sumiu; o dízimo ficou.',
        'De tempos em tempos, a terra treme sob a Vila do Poço. E os heróis descem juntos.'
      ],
      wkLoading: 'Abrindo o livro…', wkError: 'Esta página não abriu agora. Tente de novo.',
      download: 'Baixar', released: 'lançado em ', soon: 'Em breve', ask: 'Pedir acesso',
      email: 'Escrever para ', emailSubject: 'Contato pelo site — MMORPG 3D',
      next: 'Próximo Despertar: ', nextNone: 'Próximo Despertar: a anunciar.',
      lightOn: 'Apagar a lanterna', lightOff: 'Acender a lanterna (mostrar tudo)',
      subsPrefix: 'Subclasses previstas (Nv. 50): ',
      classes: {
        cavaleiro: ['Cavaleiro', 'Aço e escudo. Encara de perto, aguenta a pancada e segura a linha do grupo.', 'Rolamento', 'Espada e Escudo', 'Guarda: −10% de dano recebido de frente', 'Bastião · Vingador'],
        patrulheiro: ['Patrulheiro', 'Arco e paciência. Acerta de longe e não deixa o bicho chegar perto.', 'Salto / Avanço', 'Arco e Besta', 'Olho de Águia: +15% de alcance à distância', 'Atirador · Batedor'],
        mago: ['Mago', 'Cajado e vontade. Dano mágico à distância, pouca vida — e toda magia cobra seu preço.', 'Piscar (teleporte)', 'Cajado e Grimório', 'Mente Afiada: habilidades recarregam 10% mais rápido', 'Elementalista · Necromante'],
        barbaro: ['Bárbaro', 'Corpo a corpo pesado. Quanto menos vida, mais dano: o Bárbaro fica perigoso quando está quase caindo.', 'Arrancada (invulnerável por um instante)', 'Machado (2 mãos)', 'Fúria de Sangue: até +25% de dano conforme a vida cai', 'Berserker · Senhor da Guerra'],
        ladino: ['Ladino', 'Dano alto num alvo só e muita mobilidade. Some na sombra e reaparece pelas costas.', 'Passo nas Sombras', 'Adaga', 'Pelas Costas: +30% de chance de crítico pelas costas', 'Assassino · Envenenador']
      }
    },
    en: {
      statusPlaytest: 'Testing', statusOnline: 'Online', statusOffline: 'Under maintenance', statusUnknown: 'No word',
      seloPlaytest: 'Server in testing · offline mode open', seloOnline: 'Server online', seloOffline: 'Server under maintenance',
      seloUnknown: 'No word from the server', updated: 'Updated ',
      playersHidden: '—',
      rkEmpty: 'No one on the leaderboard yet. Be the first hero to appear here.', rkError: 'The leaderboard did not load right now. Try again later.',
      rkUpdated: 'Updated ', rkTotal: ' heroes in total.', rkAscended: 'Ascended', rkNoClass: '—',
      refusals: ['Do not say it. Saying it is what wakes it.', 'The bar will not come off. Nor should it.', 'Whoever read that name never came back to tell.', 'Only at the end of the story. Down there.'],
      grimoire1: 'Price paid: 1 year of your life.', grimoireN: 'Price paid: {n} years of your life. The Grimoire thanks you.',
      grimoireClose: 'Close the Grimoire', grimoireOpen: 'Open the Grimoire',
      fog: '{n} of {t} regions revealed', fogAll: 'You pushed the fog away. The rest of the world, only by walking.',
      vtSoon: 'Coming soon', vtWhere: 'Where to start:', vtWhen: 'Level / requirement:', vtPhoto: 'photo:', vtProvisional: 'provisional photo', vtIllustrative: 'illustrative photo',
      vtError: 'Could not load right now.', vtLevel: 'Lv. {n}+', vtOpenGuide: 'Open full guide →', vtHighlights: 'Quick summary',
      vtEnNote: 'Detailed step-by-step section below is currently written in Portuguese.',
      frCount: 'Grimoire fragment {n} of {t}', frDone: 'Grimoire complete! The rest of the story, only by playing.',
      fragments: [
        'Before the kingdoms, the sky had masters. Where the Lords on High landed, stone turned to glass.',
        'The Ancients were not stronger. They were more patient: they found out that everything that lives also sleeps.',
        'Every word of the lullaby took a piece of whoever wrote it. Magic in this world was never free.',
        'It sleeps, and the bones obey. Those who know the name do not say it: saying it aloud is what wakes it.',
        'Aurora raised a white wall. Nocturna went down into the cave. The fire is gone; the tithe remained.',
        'Every so often, the ground trembles beneath the Village of the Well. And the heroes go down together.'
      ],
      wkLoading: 'Opening the book…', wkError: 'This page did not open right now. Try again.',
      download: 'Download', released: 'released ', soon: 'Coming soon', ask: 'Request access',
      email: 'Write to ', emailSubject: 'Contact from the website — MMORPG 3D',
      next: 'Next Awakening: ', nextNone: 'Next Awakening: to be announced.',
      lightOn: 'Put out the lantern', lightOff: 'Light the lantern (show everything)',
      subsPrefix: 'Planned subclasses (Lv. 50): ',
      classes: {
        cavaleiro: ['Knight', 'Steel and shield. Fights up close, takes the beating and holds the party’s line.', 'Roll', 'Sword & Shield', 'Guard: −10% damage taken from the front', 'Bastion · Avenger'],
        patrulheiro: ['Ranger', 'Bow and patience. Strikes from afar and never lets the beast get close.', 'Leap / Dash', 'Bow & Crossbow', 'Eagle Eye: +15% ranged reach', 'Marksman · Scout'],
        mago: ['Mage', 'Staff and will. Ranged magic damage, little health — and every spell has its price.', 'Blink (teleport)', 'Staff & Grimoire', 'Sharp Mind: abilities recharge 10% faster', 'Elementalist · Necromancer'],
        barbaro: ['Barbarian', 'Heavy melee. The less health, the more damage: a Barbarian is most dangerous when almost down.', 'Rush (invulnerable for an instant)', 'Greataxe', 'Blood Fury: up to +25% damage as health drops', 'Berserker · Warlord'],
        ladino: ['Rogue', 'High single-target damage and lots of mobility. Vanishes into shadow and reappears behind you.', 'Shadow Step', 'Dagger', 'Backstab: +30% critical chance from behind', 'Assassin · Poisoner']
      }
    }
  };

  // Cards de "O que já tem no jogo" em inglês (rascunho para revisão)
  var EN_REVISADO = false;
  var VT_EN = {
    'juramento': { t: 'The oath at level 20', g: 'At level 20 you pick a side, and your cape takes the kingdom’s colour.',
      o: 'Talk to Sir Corwin (Aurora) or Vesna (Nocturna) at the Steppe Camp, from level 20.',
      w: 'From level 20.',
      p: ['Two envoys wait at the Steppe Camp, beside the Teleporter', 'Nothing is sworn without confirming first', 'The choice is per hero, and the only switch resets your reputation'],
      f: 'Sir Corwin and Vesna side by side at the Steppe Camp, Teleporter in the background' },
    'capital-aurora': { t: 'The capital of Aurora', g: 'A real capital, with a throne room and the royal couple waiting on their feet.',
      o: 'Swear to Aurora at level 20 with Sir Corwin at the Steppe Camp: only those who swore enter their own capital.',
      w: 'After the oath, from level 20.',
      p: ['King Aldric and Queen Solenne wait before the two sun thrones', 'Lower city with Priest, Weapon Master, Treasurer (reputation donations) and Steward (house at Honored)', 'Daily contracts with the Crown Marshal unlock gates up to Exalted'] },
    'capital-nocturna': { t: 'The capital of Nocturna', g: 'Underground there is a veiled city, and whoever rules it wears a veil.',
      o: 'Swear to Nocturna at level 20 with Vesna at the Steppe Camp: only those who swore enter their own capital.',
      w: 'After the oath, from level 20.',
      p: ['Lady Morgaine and the Veiled Regent wait before the crescent-moon throne', 'Lower city with Keeper of Keys, Weapon Master, Treasurer (reputation donations) and Steward (house at Honored)', 'Daily contracts with the Master of Whispers unlock gates up to Exalted'],
      f: 'Nocturna’s throne room with Lady Morgaine and the Veiled Regent' },
    'reputacao-e-portoes': { t: 'Reputation and gates', g: 'The more you serve the kingdom, the more doors open, from the courtyard to the throne.',
      o: 'After the oath, in your capital: the court is in the lower city, and the contracts courtyard asks you to be Honored.',
      w: 'After the oath (level 20): the courtyard asks for Honored, the hall door Revered and the throne door Exalted.',
      p: ['Daily kingdom contracts pay reputation', 'The hall door and the throne door only open with the right reputation', 'The lower-city court offers blessings, a house and takes material donations'] },
    'combate': { t: 'Combat', g: 'Dodge at the last instant and your ultimate charges faster.',
      o: 'Practice on the Weapon Master’s Island, at the start of the game.',
      w: 'From the very first step, in the tutorial.',
      p: ['Three-hit combo with sword and bow', 'Each weapon has its own resource: Fury, Focus or Mana', 'The perfect dodge fills the ultimate gauge'] },
    'gruta-das-raizes': { t: 'The Root Grotto and its puzzle', g: 'Turn the rune pillars until the combination matches and the chest opens.',
      o: 'Finish Oda’s chain at the Owls’ Refuge; the Guard Captain unlocks the Grotto, at the end of Owlwood.',
      w: 'The Guard Captain unlocks the Grotto at level 15.',
      p: ['Rooms full of packs, and spike traps that shake before they strike', 'Three pillars that turn and an inscription on the stone with the combination', 'It is optional and pays once per hero'] },
    'guardiao-da-gruta': { t: 'The Guardian of the Grotto', g: 'At the bottom of the Grotto, a stone guardian hurls rocks and watches over the lock.',
      o: 'It waits at the end of the Root Grotto, past the guardian’s ward.',
      w: 'The Grotto unlocks at level 15, and the Guardian is level 18.',
      p: ['Charge, thrown rock and phases in the fight', 'The arena door opens after the ward guardians fall', 'Defeating it starts the main quest'],
      f: 'The stone Guardian in the Grotto arena, hurling a rock' },
    'areas-de-caca': { t: 'Hunting grounds', g: 'Every region has its hunting grounds, with a sign at the entrance and a boss at the back.',
      o: 'Look for the signs with name and level at the regions’ entrances; Varek, on the Steppe, points the way to the Quarry.',
      w: 'Each entrance sign shows the area’s level: check before going in.',
      p: ['A sign with name and level at the entrance', 'An elite-affix boss at the back, the region’s peak hunt', 'In Owlwood: the Bone Clearing, the Huntresses’ Camp and the Owls’ Tomb'],
      f: 'Entrance sign of a hunting ground with the pack in view' },
    'subterraneo': { t: 'The Underdeep', g: 'Down there it is pitch black: you only see what your own light shows.',
      o: 'The way in is through the mouth of the well; bring light.',
      w: 'Meant for levels 60 to 100.',
      p: ['Plain torch and Moon Lantern: light is your sight', 'Enemies outside your light vanish from screen and radar', 'Lúmen caged or freed changes the light you carry'] },
    'guardiao-do-lago': { t: 'The Guardian of the Dark Lake', g: 'At the bottom of the Underdeep, one of the Ancients sings over still water and calls creatures that exist only in moonlight.',
      o: 'It waits at the far north of the Underdeep.',
      w: 'The boss is level 70.',
      p: ['Dreamed creatures that only show for those who carry the Lantern', 'Defeating it raises the Moon Lantern of the whole group that fought', 'It returns after a while and drops boss loot'] },
    'provacoes': { t: 'The Trials', g: 'Your level stops until you beat the Trial, and falling there costs nothing.',
      o: 'Talk to the Keeper of the Trials, in the Well Village square, beside the Teleporter.',
      w: 'Your level stops at 50 and at 100 until you beat the Trial.',
      p: ['XP keeps coming in and is stored meanwhile', 'A solo arena, with unlimited attempts', 'Winning releases the stored XP and opens more floors of the Bottomless Well'],
      f: 'The Trial arena with the Guardian and the stored XP bar on screen' },
    'guardiao-de-ossos': { t: 'The Bone Guardian', g: 'The first boss waits on the tutorial island, with a cutscene and music.',
      o: 'It is the end of the tutorial, on the Weapon Master’s Island: the very first step of the game.',
      w: 'From the start: it is the end of the tutorial.',
      p: ['An arena on the Weapon Master’s Island, where the game teaches everything', 'A cutscene and its own music', 'At the end of the tutorial you name your hero and it becomes your account’s hero'] },
    'coleta': { t: 'Gathering herbs and ore', g: 'Walk up to an herb or a rock, hold, and the material goes straight to your backpack.',
      o: 'Walk up to an herb bush or an ore rock on the map and hold “gather” (key E on PC).',
      w: 'From the start. Materials ask for Gathering level 1, 5 and 25, by tier.',
      p: ['No fighting needed: just get close and hold the button', 'Whoever arrives first gets the material; the party nearby earns Gathering experience', 'Each spot returns after a while, and farther regions ask for more Gathering level'] },
    'horta': { t: 'The village garden', g: 'The village has a garden that is only yours, and it grows even with the game closed.',
      o: 'In the Well Village, behind the Teleporter, talk to the Gardener.',
      w: 'From the start. More plots open at Gathering levels 5, 10, 25 and 50.',
      p: ['Plant the seed your Gathering level allows and come back to harvest', 'Every Gathering milestone opens one more plot', 'The Gardener’s notebook pays gold for each page you complete'] },
    'mercado': { t: 'The market between heroes', g: 'Buy and sell between heroes by tapping the screen, at the Clerk beside the Teleporter.',
      o: 'Talk to the Market Clerk, beside any Teleporter.',
      w: 'At any hub with a Teleporter, in online mode (free account).',
      p: ['The Buy tab shows the cheapest offers first', 'The Sell tab shows what you receive, fee already taken out', 'The Mine tab cancels and withdraws what you bought or sold'],
      f: 'The market screen open at the Clerk, offers listed' },
    'constelacoes': { t: 'Constellations', g: 'Your attributes become constellations: every point you invest lights a star.',
      o: 'Open the attributes panel and tap the Sky button.',
      w: 'Whenever you have attribute points to invest.',
      p: ['The Sky button in the attributes panel', 'The Bull, the Fox, the Owl, the Mountain and the Lantern', 'Tapping a constellation invests a point in it'],
      f: 'The Sky screen with the five constellations and some lit stars' },
    'guildas': { t: 'Guilds', g: 'Three guilds take anyone, and each one ends with a title.',
      o: 'Talk to the masters at the Steppe Camp, beside the Teleporter.',
      w: 'Open to any kingdom; the quest targets start around level 20.',
      p: ['The Blade Brotherhood, the Veiled Hand and the Arcane Circle', 'The masters stand at the Steppe Camp, beside the Teleporter', 'Each guild is a quest chain with a title at the end'],
      f: 'The three guild masters at the Steppe Camp' },
    'amigos-e-sussurro': { t: 'Friends and whispers', g: 'Add friends, see who is in the game and whisper only to them.',
      o: 'Tap a hero and choose Add friend, or open Menu > Friends.',
      w: 'Online mode (free account), at any level.',
      p: ['The list shows who is in the game now and in which region', '/s Name message whispers, /r answers whoever whispered last', 'Blocking removes the person from the list and cuts whispers and requests'] },
    'duelo': { t: 'Duels', g: 'Challenge another hero to a duel where nobody loses anything.',
      o: 'Tap a hero, open their menu and choose Challenge to a duel.',
      w: 'At any level and anywhere in the open world, in online mode.',
      p: ['A circle on the ground and a countdown', 'Nobody dies: everyone returns with the health they had', 'Wins count towards achievements and a title'],
      f: 'Two heroes inside the duel circle, countdown on screen' },
    'reviver-em-grupo': { t: 'Reviving in a party', g: 'Fell while playing in a party? A friend lifts you right there.',
      o: 'Play in a party: a fallen ally is lifted by whoever gets close and taps Revive.',
      w: 'Playing in a party in online mode.',
      p: ['The ally gets close, taps Revive and holds', 'The death screen shows how much time the party still has', 'Whoever is reviving and gets hit loses the progress'],
      f: 'An ally reviving a fallen hero, progress bar visible' },
    'chefoes': { t: 'The big bosses', g: 'From the tutorial to the bottom of the Underdeep, every important place has a boss waiting.',
      o: 'Start with the Bone Guardian, in the tutorial; the others are in the Grotto, the Underdeep, the Steppe, the Labyrinth and the hunting grounds.',
      w: 'The Bone Guardian is in the tutorial; the Grotto unlocks at level 15; the Dark Lake Guardian is level 70.',
      p: ['Guardians of the tutorial, the Grotto and the Underdeep; the Raider Chief on the Steppe and the Stone Golem in the Labyrinth', 'Every hunting ground has an elite boss at the back', 'In a party, defeating the boss counts for everyone who fought'] },
    'instancias': { t: 'Instances', g: 'Some adventures open a copy just for you, away from the rest of the world.',
      o: 'The Root Grotto opens through a portal at the end of Owlwood; the Trial, through the Keeper of the Trials in the Well Village.',
      w: 'The Grotto unlocks at level 15; the Trials appear at levels 50 and 100.',
      p: ['The Root Grotto opens through the portal, alone or with the party, and every visit is a fresh copy', 'The Trial arena is solo: each player gets their own', 'The tutorial takes place on an island of its own'] },
    'eventos-do-mundo': { t: 'Sentinel Watch & Merchant Caravan', g: 'Now and then the Well Village gets visitors: elite beasts at the fence and a merchant on the road.',
      o: 'Well Village and Owlwood road, right past the palisade.',
      w: 'Scheduled server events; type /eventos in chat to check the next one.',
      p: ['Sentinel Watch: three elite beasts prowl near the village fence', 'Merchant Caravan: one Magic piece for sale per hero', 'Use /eventos to see the countdown'] },
    'mini-instancias': { t: 'Mini-instances', g: 'Short dungeons, to play in a few minutes, are in the plan.',
      p: ['Today only the approved plan exists', 'There is no short dungeon to play yet', 'The Grotto and the Trial already show how a copy of your own works'] },
    'chefes-de-regiao': { t: 'Region bosses', g: 'The region bosses already have a face and a level; the fight is coming.',
      p: ['Mummy King, Frost Colossus, Lord of Ashes, Magma Titan and Lich', 'Today they exist only as a model and a level', 'They have no fight of their own yet'] },
    'chefe-do-poco': { t: 'The Bottomless Well boss', g: 'The Bottomless Well will get a boss worthy of it.',
      p: ['Today only the model and the level exist', 'There is no fight yet', 'The Well’s floors open with the Trials'] },
    'guerra-de-reinos': { t: 'The kingdom war', g: 'Aurora and Nocturna will fight over fortresses, but the war has not started.',
      p: ['Today only the code foundation exists', 'There is no war to play yet', 'Before it, pick your side with the oath'] }
  };

  var PT = {};
  var PT_ATTR = {};
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
    vitrineEn: function (id) { return VT_EN[id] || null; },
    enRevisado: EN_REVISADO,
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
