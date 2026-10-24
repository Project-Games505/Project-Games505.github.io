# Site do MMORPG 3D

Landing page pública (pt-BR e EN): status do servidor, história sem spoiler, reinos, classes, o que tem no jogo, tutoriais, ranking do playtest, novidades,
o Despertar, downloads e contato. Plano e decisões em [../docs/PLANO_LANDING_PAGE.md](../docs/PLANO_LANDING_PAGE.md).

HTML + CSS + JS puro, sem build. Publicado pelo GitHub Pages no repo público
`Project-Games505/Project-Games505.github.io` → **https://project-games505.github.io/**
(o repo do jogo é privado e o Pages grátis só publica repo público). A fonte fica aqui em `site/`; para
publicar, copie o conteúdo desta pasta para a raiz da `main` do repo público.

## Mexer sem tocar em código

| O que | Arquivo | Campo |
|---|---|---|
| Estado do servidor | `status.json` | `estado`: `playtest` \| `online` \| `manutencao`; `jogadoresOnline` (número, só aparece com `online`); `versao`; `proximoDespertar` (data ISO ou `null`); `atualizadoEm` |
| E-mail de contato | `config.json` | `contato.email` — vazio mostra "E-mail do jogo em breve" |
| Discord | `config.json` | `contato.discord` — URL do convite; vazio mostra "em breve" |
| Downloads | `config.json` | `downloads.windows` / `downloads.android`: `url`, `versao`, `tamanho` — sem `url` o botão fica "Em breve" (ou "Pedir acesso" quando há e-mail) |
| Formulário de exclusão de conta | `config.json` | `conta.exclusaoUrl` — endereço **https** público do `excluir-conta.html` servido pelo AccountService (ADR-50). Vazio: `excluir-conta.html` daqui mostra só o pedido por e-mail |

**Exclusão de conta (Google Play):** o link a cadastrar na Play Console ("Exclusão de conta → URL") é
`https://project-games505.github.io/excluir-conta.html`. Ele explica o caminho pelo jogo e pela web e leva ao
formulário do AccountService quando `conta.exclusaoUrl` estiver preenchido.

Os botões de download podem apontar para um asset de Release do repo público (ex.:
`https://github.com/Project-Games505/Project-Games505.github.io/releases/download/v0.6.0/mmorpg3d.apk`).
O multiplayer continua restrito ao playtest pelo servidor; o modo offline é livre.

## Vitrine ("O que tem no jogo") e Novidades

Plano: [../docs/PLANO_VITRINE.md](../docs/PLANO_VITRINE.md); auditoria e ganchos (rascunho para aprovação):
[../docs/VITRINE_FUNCIONALIDADES.md](../docs/VITRINE_FUNCIONALIDADES.md).

- `data/vitrine.json` e `data/novidades.json` são **gerados, não se editam à mão**: `python tools/gerar-vitrine.py` (da raiz do
  repositório) lê `docs/MINIGUIAS/*.md` e `docs/CHANGELOG.md`. `--check` só confere se os JSON commitados estão em dia.
- **Card novo ou texto de card:** edite o miniguia (bloco `<!-- vitrine -->` logo depois do título: `gancho`, `onde` (como achar ou começar) e `quando` (nível ou requisito), os dois obrigatórios se completo, 3 `topicos`,
  `foto` ou `foto-falta`, `estado: completo | em breve`) e rode o gerador. O título `# Miniguia:` fica na 1ª linha: o
  `MiniguiasTests` depende disso. A ordem dos cards está em `ORDEM`, no gerador.
- **Foto:** arquivo existente em `img/vitrine/`; sem foto, `foto-falta` descreve a cena e a landing mostra "foto: …".
  `foto-nota: provisória` / `ilustrativa` aparece como selo na foto.
- **Novidades:** as 8 seções `###` mais novas do CHANGELOG, mesmas regras da tela de Novidades do jogo (`WhatsNew.cs`):
  título sem o parêntese final, 1ª frase do 1º item (até 140 letras), `<!-- sem-tela -->` fica de fora. Só em português.
- **Inglês:** os cards em inglês estão em `js/i18n.js` (`VT_EN`, por `id` do miniguia). **Rascunho para revisão**
  (`EN_REVISADO = false`). Card novo sem entrada em `VT_EN` aparece em português no site em inglês.
- Sem os JSON (ou com erro), as duas seções ficam ocultas.
- Testes: `python -m unittest` (na raiz).

**Padrão:** o tema é a Sombra (escolha salva em `localStorage` vale depois). **Trailer:** volume inicial 30 %, entra com fade de ~1,2 s e o volume escolhido pela pessoa fica salvo (`volumeTrailer`).

**Cache:** `index.html` chama `css/style.css`, `js/i18n.js` e `js/main.js` com `?v=AAAAMMDDx`. Ao mudar qualquer um desses três, troque o `v` (o Pages deixa o navegador guardar os arquivos por ~10 min e a página nova ficava com script velho).

## Ranking do playtest

- `data/ranking.json` é **gerado, não se edita à mão**: `.\tools\gerar-ranking-site.ps1 [-Api <AccountService>] [-ServiceKey <chave>] [-Top 20]`
  lê `GET /leaderboard/site` (X-Service-Key) e grava só nome do herói, classe, nível e Ascendido — sem login, e-mail, conta nem
  contas de teste (ADR-55). O site não chama a API (ela fica na tailnet); publique o site depois de gerar.
- JSON vazio mostra "Ninguém no ranking ainda"; sem o arquivo, "O ranking não carregou agora". Textos em `MSG.pt/en` (`rk*`) e `EN` (`rk.*`).
- Mapa completo (offline × online × site × contas de teste): [../docs/RANKING.md](../docs/RANKING.md).

## Textos e idiomas

- O pt-BR está no próprio `index.html` (atributos `data-i18n`). O inglês está em `js/i18n.js` (`EN`), com as
  mesmas chaves. Frases montadas pelo JS (classes, status, Grimório) ficam em `MSG.pt` / `MSG.en`.
- Nomes próprios seguem `docs/LIVROS_EN.md` (Aurora, Nocturna e Lúmen não traduzem).
- **Spoiler:** nunca escrever o nome do que dorme nem que o herói quebra a tranca (tabela no plano).

## Imagens

Em `img/`, já reduzidas (WebP ≤ 150 KB, trailer MP4 ≈ 1,4 MB). Saíram de `docs/screenshots/` e de
`Assets/Resources/Menu/TrailerDespertar.mp4`. `hero-vila.webp` é a captura da vila recortada sem a HUD.

## Testar local

```bash
cd site && python3 -m http.server 8765   # abrir http://localhost:8765
```

No celular (sem hover) a lanterna do Cap. III vagueia sozinha, desce com a rolagem e vai até o dedo quando ele encosta ou arrasta;
com mouse ela segue o ponteiro. Conferir desktop e celular, Luz/Sombra, PT/EN e "reduzir movimento" do sistema (desliga lanterna, tremor e
animações).
