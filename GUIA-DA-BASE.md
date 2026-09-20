# Guia da base

Esta pasta é uma cópia do protótipo do **Layout Operacional**
(`projetos/plataforma-maquinaweb/prototipo-os/`), com os aplicativos trocados pelos nove
do **Casa**. O original não foi alterado.

## Estrutura original preservada

`desktop.js` continua com o registro `apps`, o conjunto `icons`, o dock, a abertura e a
movimentação das janelas e os widgets. `desktop.css` continua definindo seus tamanhos,
animações e o corte de 680px que desmonta a metáfora de mesa no celular. Mantenha esses
componentes ao criar novas telas.

## Nova tela

1. Acrescente o aplicativo ao array `apps` em `desktop.js` com identificador, nome,
   ícone e cores.
2. Escreva a função que devolve o HTML da tela em `casa-apps.js` e registre-a no objeto
   `telas` — o `montarTelas()` cria a `view` dentro de `#appStorage` sozinho.
   Para tela que some valores de dinheiro, use `resumoDinheiro(quemOlha)` e
   `nivelDeAcesso()` de `desktop.js`: eles são o único lugar onde a regra de quem vê
   o quê é decidida. Nunca some `dadosExemplo.dinheiro.lancamentos` direto.
3. Use os estilos de `casa.css` (`.casa-bloco`, `.casa-linha`, `.casa-cartao`,
   `.casa-chip`, `.casa-check`).
4. **Não altere `openApp`, `startWindowGesture` nem a ampliação do dock** para mudanças
   de conteúdo. O `openApp` chama `aoAbrirApp(id)` no fim: é ali que uma tela nova pede
   para ser redesenhada ao abrir, sem tocar na rotina de janelas.

## Documentos e Viagens

Os dois últimos entraram pelo caminho documentado, sem tocar em `openApp`,
`startWindowGesture` nem no dock: entrada no array `apps`, função de tela em
`casa-apps.js`, registro em `telas`, dados em `dados-exemplo.js`.

Em Documentos, a visibilidade reaproveita `nivelDeAcesso()` — os objetos usam o campo
`quem` justamente para isso. A leitura do nível do meio muda: no dinheiro é "vê o valor",
aqui é "vê o nome, não abre".

Em Viagens, o vínculo entre os dois momentos é o campo `veioDe` de cada item do roteiro,
que aponta para o `id` de um lugar sugerido. É o que permite mostrar "veio da ideia da
Filha" no roteiro.

## Os três formatos

`desktop.js` tem três perguntas, não uma:

- `isMobile()` — até 680px;
- `isTablet()` — 681 a 1180px: toque com tela grande (dobrável aberto, tablet);
- `semPonteiro()` — até 1180px: **não tem mouse**. É esta que desliga arrastar janela,
  redimensionar e a ampliação do dock.

O original só tinha `isMobile()`, e por isso tratava qualquer coisa acima de 680px como
computador com ponteiro — o que jogava dobrável e tablet no modo errado.

Dentro das telas, o número de colunas vem de **container query** sobre `.window-content`,
não de media query: o que manda é a largura da janela. Use `duasColunas(esq, dir, mestre,
temSelecao)` de `casa-apps.js`.

## Widgets e tela cheia

Os cartões da tela inicial preservam o movimento livre do original: arrastar troca de
posição, encaixa perto da borda e a posição fica salva no navegador. No computador a
entrada pede tela cheia; o navegador pode recusar, e Esc sai.

## O que foi tocado na base, e por quê

- **`desktop.js`** — troca dos `apps`, dos `icons` e dos widgets (é o conteúdo do
  sistema); chave do `localStorage` de `maquinaweb.desktop.v2` para `casa.mesa.v1`, para
  os dois protótipos não brigarem pelo mesmo espaço; as rotinas de tarefa e de mensagem
  da MáquinaWeb saíram; `openApp` ganhou uma linha, o gancho `aoAbrirApp`.
- **`desktop.css`** — só o `@import` da fonte do Google foi removido. Protótipo não faz
  chamada de rede, e aquele import deixava a tela em branco sem internet. As pilhas de
  fonte caem para a do sistema.
- **`account.js`** — nome e papel iniciais vêm de `dados-exemplo.js`; chave do
  `localStorage` para `casa.perfil.v1`.
- **`account.css`, `desktop.css` (o resto)** — intactos. Toda a mudança visual do Casa
  está em `casa.css`, que carrega depois e só sobrescreve.
- **Removidos da cópia** — `componentes.js`, `componentes.css` e o aplicativo
  **Componentes**: catálogo de biblioteca visual não tem o que fazer numa conversa de
  família. Continuam no protótipo original.
