# Casa — protótipo navegável

**Isto é material de conversa, não software.** Todos os dados são inventados, nada é
salvo fora do navegador, não existe login, banco nem internet. O selo "DEMO" no canto
superior direito fica lá o tempo todo por isso.

## Como abrir

Abra `casa-preview.html` no navegador — dois cliques, sem instalar nada. No celular, mande o
arquivo (ou a pasta inteira) e abra do mesmo jeito.

Na tela de entrada é só clicar em **Entrar** — os campos não fazem nada.

## Três formatos, decididos pela largura

| Largura | O que acontece |
|---|---|
| até 680px — celular | uma coluna, tela cheia, barra de abas embaixo |
| 681 a 1180px — **dobrável aberto e tablet** | duas colunas, lista à esquerda e detalhe à direita, barra de abas embaixo. **Toque, não mouse**: nada de arrastar janela nem de dock que amplia |
| acima de 1180px — computador | a mesa do Layout Operacional: janelas arrastáveis, dock com ampliação |

Quem decide o número de colunas é a **largura da janela**, não a da tela. Por isso dobrar
o celular, girar o tablet ou redimensionar a janela reorganiza tudo sozinho **sem perder
o que estava aberto** — se você estava vendo uma tarefa, continua vendo aquela tarefa.

## As nove telas

| Tela | O que mostra |
|---|---|
| **Hoje** | O resumo do dia: tarefas de hoje, o que vence esta semana, o que vem hoje e amanhã, o que falta na despensa, a lista de compras e os avisos |
| **Dinheiro** | Quatro números em cima — entrou, saiu, falta pagar e **sobra** — e só. Abaixo: o que falta pagar, onde está o dinheiro e os últimos lançamentos. Cada lançamento tem um nível de visibilidade: **os dois veem**, **só o valor** ou **só eu**. O seletor "vendo como" troca de pessoa e recalcula tudo |
| **Tarefas** | Tarefas com e sem responsável, prazo, repetição e checklist. Tarefa livre tem botão "assumir" |
| **Compras e despensa** | Lista ativa (marca e desmarca), listas reutilizáveis ("mercado do mês") e a despensa com o que está em falta |
| **Agenda** | A semana com compromissos e tarefas com prazo na mesma lista |
| **Avisos** | Avisos ligados a um registro — sem chat geral |
| **Documentos** | Busca no topo, porque ninguém navega pasta. Contratos, notas, fotos e garantias, com tipo, dono e data. **Validade é o ponto**: seguro do carro e garantia da geladeira aparecem com o prazo e geram aviso sozinhos |
| **Viagens** | A viagem tem dois momentos do mesmo conteúdo: **planejando** (lugares que alguém quis, marcados como vamos/talvez) e **acontecendo** (o que foi combinado virou roteiro por dia, e cada item lembra de quem foi a ideia). Tem convidado externo com acesso só àquela viagem |
| **Assistente** | O agente da família: responde, registra pelo texto e avisa sem ser chamado |

## Trocar os nomes da família

Abra **`dados-exemplo.js`**. Ele é o único arquivo com nome de gente ou de item.
No começo dele está a família:

```js
membros: [
  { id: 'pai',   nome: 'Pai',   inicial: 'P', ... },
  ...
]
```

Troque `nome` e `inicial`. **Não troque o `id`** — o resto do arquivo aponta para ele.
Logo abaixo estão as tarefas, as listas, a despensa, a agenda, os avisos e o diálogo do
assistente, todos comentados em português. Salve e recarregue a página.

## O que dá para fazer mexendo

- marcar e desmarcar tarefa e item de compra;
- assumir uma tarefa que está sem dono;
- jogar item da despensa na lista de compras, e usar uma lista salva inteira;
- escrever item novo na lista: uma digitação e Enter;
- criar tarefa só com o título;
- conversar com o assistente: tocar numa frase pronta ou digitar. **O que ele registra
  aparece de verdade nas telas de Compras e Tarefas** — é o mesmo dado;
- **trocar o "vendo como" na tela de Dinheiro** e ver os totais mudarem: é o jeito mais
  rápido de mostrar que transparência e privacidade convivem;
- lançar um gasto em três toques: quanto, o que foi, lançar. Quem lançou e a data o
  sistema preenche; quem pode ver já vem em "os dois veem" e muda com um toque;
- marcar conta do mês como paga e ver a "sobra" mudar junto;
- mandar ele apagar algo, e ver que ele pergunta antes;
- **procurar um documento** por parte do nome, pelo tipo ou por quem guardou;
- **abrir a viagem que está acontecendo** e ver o roteiro do dia dizendo de quem veio cada ideia;
- na viagem em planejamento, tocar num lugar para alternar entre vamos / talvez / fica para a próxima.

Recarregar a página devolve tudo ao começo.

## O tom da tela de Dinheiro

Ela mostra, não cobra. Sem vermelho de alarme, sem orçamento, sem meta, sem ranking de
quem gastou mais, sem categoria obrigatória. O critério de tudo que está lá: **se os dois
não forem olhar aquilo toda semana, não entra.**

## A regra do dinheiro, em uma frase

Lançamento **privado** de outra pessoa não aparece **e não entra na soma que você vê**.
Se entrasse, bastaria subtrair os lançamentos visíveis do total para descobrir o valor
escondido. O preço disso é que o total que o Pai vê e o que a Mãe vê são diferentes —
e isso está escrito na tela, não escondido.

## Arquivos

| Arquivo | O que é |
|---|---|
| `casa-preview.html` | A página. Carrega os scripts nesta ordem, que importa |
| `dados-exemplo.js` | **Todo** o conteúdo fictício. É onde se mexe |
| `desktop.js` / `desktop.css` | A base do Layout Operacional: janelas, dock, cartões |
| `casa-apps.js` | Oito das nove telas |
| `assistente.js` | A tela do agente |
| `casa.css` | Cores de casa e os alvos de toque do celular |
| `account.js` / `account.css` | Entrada e perfil, vindos da base |

Os scripts vivem em escopo global e dependem da ordem em que o `casa-preview.html` os carrega.
Não converta para módulo e não reordene.
