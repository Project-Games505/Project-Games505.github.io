# Site do MMORPG 3D

Landing page pública (pt-BR e EN): status do servidor, história sem spoiler, reinos, classes, tutoriais,
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

Os botões de download podem apontar para um asset de Release do repo público (ex.:
`https://github.com/Project-Games505/Project-Games505.github.io/releases/download/v0.6.0/mmorpg3d.apk`).
O multiplayer continua restrito ao playtest pelo servidor; o modo offline é livre.

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

Conferir desktop e celular, Luz/Sombra, PT/EN e "reduzir movimento" do sistema (desliga lanterna, tremor e
animações).
