'use strict';
/* ==========================================================================
   casa-apps.js — nove das dez telas do Casa. A décima, o Assistente,
   está em assistente.js.

   Tudo aqui lê de `dadosExemplo` (dados-exemplo.js). Nenhum nome de pessoa
   ou item está escrito neste arquivo.

   TRÊS FORMATOS, MESMO HTML
   As telas são escritas uma vez e se reorganizam pela LARGURA DA JANELA
   (container query em casa.css), não pela largura da tela:
     estreito  → uma coluna; em Tarefas, a lista vira tela cheia e o detalhe
                 abre por cima, com botão de voltar (igual app de mensagem);
     largo     → duas colunas, lista à esquerda e detalhe à direita.
   Como quem manda é a largura da janela, dobrar o celular ou girar o tablet
   reorganiza sozinho, sem perder o que estava aberto: o estado é JavaScript
   e o layout é CSS.

   PADRÕES COPIADOS DE APP QUE A PESSOA JÁ USA (lei de Jakob)
   barra de abas embaixo com ícone E rótulo · botão flutuante de adicionar no
   canto inferior direito · deslizar a linha para concluir · contador no ícone
   de avisos · tela vazia que ensina em vez de ficar em branco.
   ========================================================================== */

/* -------------------------------------------------------------- pedaços */
// Texto que vai virar string JavaScript dentro de um atributo onclick.
function jsStr(valor){return esc(String(valor).replace(/\\/g,'\\\\').replace(/'/g,"\\'"));}
function quemChip(id){
  const m = membro(id);
  if(!m) return `<span class="casa-chip casa-chip-livre">${svg('user')}livre</span>`;
  return `<span class="casa-quem"><span class="casa-inicial" style="background:${m.cor}">${esc(m.inicial)}</span>${esc(m.nome)}</span>`;
}
function chip(texto,classe){return `<span class="casa-chip ${classe||''}">${esc(texto)}</span>`;}
function chipIcone(icone,texto,classe){return `<span class="casa-chip ${classe||''}">${svg(icone)}${esc(texto)}</span>`;}
function botaoCheck(marcado,rotulo,acao){
  return `<button class="casa-check" role="checkbox" aria-checked="${marcado}" aria-label="${esc(rotulo)}" onclick="${acao}"><span aria-hidden="true">${svg('check')}</span></button>`;
}
// Tela vazia não fica em branco: ela ensina o que fazer e por quê.
function vazio(titulo,dica,icone){
  return `<div class="casa-vazio">${svg(icone||'check')}<strong>${esc(titulo)}</strong>${dica?`<span>${esc(dica)}</span>`:''}</div>`;
}
// Botão flutuante, canto inferior direito — onde todo aplicativo põe "adicionar".
function fab(rotulo,acao){
  return `<button class="casa-fab" onclick="${acao}" aria-label="${esc(rotulo)}">${svg('plus')}<span>${esc(rotulo)}</span></button>`;
}
// Duas colunas quando a janela é larga; empilhado quando é estreita.
// mestre: a coluna da esquerda some quando há item selecionado na tela estreita.
function duasColunas(esquerda,direita,mestre,temSelecao){
  return `<div class="casa-duas ${mestre?'mestre':''} ${temSelecao?'tem-selecao':''}">
    <div class="casa-painel-lista">${esquerda}</div>
    <div class="casa-painel-detalhe">${direita}</div>
  </div>`;
}
function voltar(tela,rotulo){
  return `<button class="casa-voltar" onclick="voltarLista('${tela}')">‹ ${esc(rotulo)}</button>`;
}

// O que está selecionado em cada tela. Sobrevive a dobrar, girar e
// redimensionar, porque é estado de JavaScript e não depende do layout.
const selecao = { tarefas:null, documentos:null, viagens:null, comida:null };

/* ---------------------------------------------------------------- HOJE  */
// A tela mais importante. Poucos blocos, cada um com nome — a pessoa segura
// umas quatro coisas na cabeça de cada vez, então nada de lista solta longa.
function telaHoje(){
  const u = membro(dadosExemplo.hoje.usuario);
  const hora = new Date().getHours();
  const s = dadosExemplo.hoje.saudacoes;
  const saudacao = hora < 12 ? s.manha : hora < 18 ? s.tarde : s.noite;
  const hoje = tarefasDeHoje();
  const falta = emFalta();
  const pouco = noFim();
  const compromissos = (dadosExemplo.agenda.find(d=>Number(d.emDias)===0)?.itens||[]).filter(i=>i.tipo==='compromisso');
  const amanha = dadosExemplo.agenda.find(d=>Number(d.emDias)===1)?.itens||[];
  const avisos = avisosNaoLidos();
  const compras = comprasAbertas();
  const r = resumoDinheiro(verComo);
  const contas = contasAVencer(7);

  return `
  <header class="casa-hero">
    <span class="casa-eyebrow">${esc(dataDoDia(0))}</span>
    <h2>${esc(saudacao)}${u?', '+esc(u.nome):''}.</h2>
    <p>${hoje.length} ${hoje.length===1?'tarefa para hoje':'tarefas para hoje'}${falta.length?' · '+falta.length+(falta.length===1?' item em falta':' itens em falta'):''}${amanha.length?' · '+amanha.length+(amanha.length===1?' coisa amanhã':' coisas amanhã'):''}</p>
  </header>

  <div class="casa-blocos">
  <section class="casa-bloco">
    <div class="casa-bloco-head"><h3>${svg('tasks')}Para fazer hoje</h3><button class="link-button" onclick="openApp('tarefas')">ver todas</button></div>
    ${hoje.length ? hoje.map(t=>linhaTarefa(t,false)).join('')
      : vazio('Nada marcado para hoje.','Quando alguém criar uma tarefa para hoje, ela aparece aqui.','tasks')}
  </section>

  <section class="casa-bloco">
    <div class="casa-bloco-head"><h3>${svg('wallet')}Dinheiro</h3><button class="link-button" onclick="openApp('dinheiro')">abrir</button></div>
    <p class="casa-resumo-linha"><strong>${brl(r.sobra)}</strong> sobram este mês, já tirando o que falta pagar</p>
    ${contas.slice(0,2).map(c=>`
      <div class="casa-linha">
        <span class="casa-bolinha" aria-hidden="true"></span>
        <div class="casa-linha-texto"><strong>${esc(c.descricao)}</strong>
          <span class="casa-meta">${esc(rotuloVencimento(c.emDias))}</span></div>
        <span class="casa-valor">${brl(c.valor)}</span>
      </div>`).join('')}
  </section>

  <section class="casa-bloco">
    <div class="casa-bloco-head"><h3>${svg('cart')}Falta comprar</h3><button class="link-button" onclick="openApp('compras')">abrir lista</button></div>
    ${compras.length
      ? `<p class="casa-resumo-linha"><strong>${compras.length}</strong> ${compras.length===1?'coisa na lista':'coisas na lista'} — ${esc(compras.slice(0,3).map(i=>i.nome).join(', '))}${compras.length>3?'…':''}</p>`
      : vazio('Lista vazia.','Escreva o que acabou e some tudo de uma vez no mercado.','cart')}
    ${falta.concat(pouco).slice(0,3).map(i=>`
      <div class="casa-linha">
        <span class="casa-bolinha ${i.situacao}" aria-hidden="true"></span>
        <div class="casa-linha-texto"><strong>${esc(i.nome)}</strong>
          <span class="casa-meta">${i.situacao==='falta'?'acabou':'está no fim'}${i.detalhe?' · '+esc(i.detalhe):''}</span></div>
        ${naListaDeCompras(i.nome)
          ? chip('já está na lista','casa-chip-ok')
          : `<button class="casa-botao-min" onclick="jogarNaLista('${jsStr(i.nome)}')">${svg('plus')}lista</button>`}
      </div>`).join('')}
  </section>

  <section class="casa-bloco">
    <div class="casa-bloco-head"><h3>${svg('prato')}Comida</h3><button class="link-button" onclick="abrirComida()">trocar</button></div>
    ${(()=>{const d=diaDeHoje();if(!d)return '';
      return REFEICOES.map(([chave,rotulo])=>`
      <div class="casa-linha">
        <span class="casa-hora">${rotulo}</span>
        <button class="casa-linha-abrir" onclick="abrirComida()">
          <strong>${esc(resumoRefeicao(d[chave]))}</strong>
        </button>
      </div>`).join('');})()}
  </section>

  <section class="casa-bloco">
    <div class="casa-bloco-head"><h3>${svg('calendar')}Hoje e amanhã</h3><button class="link-button" onclick="openApp('agenda')">ver a semana</button></div>
    ${[...compromissos.map(i=>({...i,quando:'Hoje'})), ...amanha.map(i=>({...i,quando:'Amanhã'}))].map(i=>`
      <div class="casa-linha">
        <span class="casa-hora">${esc(i.hora)}</span>
        <div class="casa-linha-texto">
          <strong>${i.particular?'Compromisso particular':esc(i.titulo)}${i.particular?svg('lock'):''}</strong>
          <span class="casa-meta">${esc(i.quando)}${i.particular?' · só quem tem permissão vê o que é':''}</span>
        </div>
        ${i.particular?'':quemChip(i.quem)}
      </div>`).join('') || vazio('Nada nos próximos dois dias.','','calendar')}
  </section>

  <section class="casa-bloco">
    <div class="casa-bloco-head"><h3>${svg('bell')}Avisos${avisos.length?`<span class="casa-badge">${avisos.length}</span>`:''}</h3><button class="link-button" onclick="openApp('avisos')">ver todos</button></div>
    ${avisos.length ? avisos.slice(0,3).map(a=>`
      <div class="casa-linha">
        <span class="casa-bolinha aviso" aria-hidden="true"></span>
        <div class="casa-linha-texto"><strong>${esc(a.titulo)}</strong><span class="casa-meta">${esc(a.origem)} · ${esc(a.quando)}</span></div>
      </div>`).join('') : vazio('Nenhum aviso novo.','Avisos nascem de uma tarefa, de uma conta ou de um item que acabou.','bell')}
  </section>
  </div>

  <p class="casa-rodape">Protótipo com dados inventados. Nada aqui é a sua casa de verdade — ainda.</p>`;
}

/* ------------------------------------------------------------ DINHEIRO  */
function adultos(){return dadosExemplo.familia.membros.filter(m=>m.papel==='responsável');}
function oOutroAdulto(quemOlha){return adultos().find(m=>m.id!==quemOlha)||null;}

// Estado só da tela: o que está aberto e o nível escolhido no lançar rápido.
let mostrarPagas = false;
let mostrarTudo = false;
let nivelNovo = 'aberto';

// Como cada nível se chama para gente, não para contador.
const NIVEIS = [
  { id:'aberto',  curto:'os dois veem' },
  { id:'total',   curto:'só o valor'   },
  { id:'privado', curto:'só eu'        }
];

function nomeDaConta(id){return dadosExemplo.dinheiro.contas.find(c=>c.id===id)?.nome||'conta';}

// Um cadeado pequeno e uma frase curta. Nada de aviso de segurança na cara.
function linhaLancamento(l,quemOlha){
  const mascarado = nivelDeAcesso(l,quemOlha)==='valor';
  const proprio = l.quem===quemOlha;
  const outro = oOutroAdulto(quemOlha);
  let rodape;
  if(mascarado)                                rodape = `${nomeDe(l.quem)} · só o valor aparece`;
  else if(proprio&&l.visibilidade==='total')   rodape = `você · ${outro?outro.nome:'a outra pessoa'} vê só o valor`;
  else if(proprio&&l.visibilidade==='privado') rodape = 'você · só você vê';
  else                                         rodape = nomeDe(l.quem);
  const temCadeado = mascarado || (proprio && l.visibilidade!=='aberto');
  return `
  <div class="casa-linha ${mascarado?'mascarado':''}">
    <span class="casa-dia-num">${esc(l.dia)}</span>
    <div class="casa-linha-texto">
      <strong>${mascarado?'Gasto pessoal':esc(l.descricao)}${temCadeado?svg('lock'):''}</strong>
      <span class="casa-meta">${esc(rodape)}</span>
    </div>
    <span class="casa-valor ${l.tipo}">${l.tipo==='entrada'?'+':'−'} ${brl(l.valor)}</span>
  </div>`;
}

function telaDinheiro(){
  const olho = verComo;
  const r = resumoDinheiro(olho);
  const d = dadosExemplo.dinheiro;
  const visiveis = lancamentosVisiveis(olho);
  const aPagar = d.aPagar.filter(c=>!c.pago).sort((a,b)=>a.emDias-b.emDias);
  const pagas  = d.aPagar.filter(c=>c.pago);
  // "Últimos" é do mais recente para o mais antigo. Como os três níveis de
  // visibilidade estão entre os últimos do mês, a lista curta já mostra os três.
  const recentes = visiveis.slice().sort((a,b)=>Number(b.dia)-Number(a.dia));
  const lista  = mostrarTudo ? recentes : recentes.slice(0,6);

  const esquerda = `
  <div class="casa-numeros">
    <div class="casa-numero"><span>Entrou</span><strong>${brl(r.entrou)}</strong></div>
    <div class="casa-numero"><span>Saiu</span><strong>${brl(r.saiu)}</strong></div>
    <div class="casa-numero"><span>Falta pagar</span><strong>${brl(r.aPagar)}</strong></div>
    <div class="casa-numero destaque"><span>Sobra</span><strong>${brl(r.sobra)}</strong><small>já tirando o que falta pagar</small></div>
  </div>

  <p class="casa-nota-leve">${svg('lock')}<span>São os números que você vê. O que a outra pessoa guardou só para ela fica de fora — e não dá para descobrir subtraindo.</span></p>

  <form class="casa-lancar" onsubmit="lancarDinheiro(event)">
    <input id="lancValor" inputmode="decimal" placeholder="Quanto?" aria-label="Valor" maxlength="12" autocomplete="off">
    <input id="lancDesc" placeholder="O que foi?" aria-label="O que foi" maxlength="60" autocomplete="off">
    <button class="small-button" type="submit" aria-label="Lançar">${svg('plus')}<span class="so-desktop">Lançar</span></button>
  </form>
  <div class="casa-niveis">
    <span>quem vê</span>
    ${NIVEIS.map(n=>`<button type="button" class="${n.id===nivelNovo?'ativa':''}" onclick="escolherNivel('${n.id}')" aria-pressed="${n.id===nivelNovo}">${esc(n.curto)}</button>`).join('')}
  </div>

  <div class="section-label">O que falta pagar</div>
  ${aPagar.map(c=>`
    <div class="casa-linha">
      ${botaoCheck(false,'Marcar '+c.descricao+' como paga',`alternarPagamento('${c.id}')`)}
      <div class="casa-linha-texto"><strong>${esc(c.descricao)}</strong>
        <span class="casa-meta">${esc(rotuloVencimento(c.emDias))}${c.quem&&c.quem!=='casa'?' · '+esc(nomeDe(c.quem)):''}</span></div>
      <span class="casa-valor">${brl(c.valor)}</span>
    </div>`).join('') || vazio('Nada para pagar este mês.','Tudo em dia por aqui.','wallet')}
  ${pagas.length?`<button class="link-button casa-ver-mais" onclick="alternarPagas()">${mostrarPagas?'esconder':'ver'} o que já foi pago (${pagas.length})</button>`:''}
  ${mostrarPagas?pagas.map(c=>`
    <div class="casa-linha feito">
      ${botaoCheck(true,'Desmarcar '+c.descricao,`alternarPagamento('${c.id}')`)}
      <div class="casa-linha-texto"><strong class="riscado">${esc(c.descricao)}</strong></div>
      <span class="casa-valor">${brl(c.valor)}</span>
    </div>`).join(''):''}`;

  const direita = `
  <div class="section-label">Onde está o dinheiro</div>
  <div class="casa-contas">
    ${d.contas.map(c=>`<div class="casa-conta-tile">
      <span>${esc(c.nome)}</span><strong>${brl(c.saldo)}</strong>
      <small>${c.tipo==='cartao'?'fatura'+(c.vence?' · '+esc(c.vence):''):'saldo'}</small>
    </div>`).join('')}
  </div>

  <div class="section-label">Últimos lançamentos</div>
  ${lista.map(l=>linhaLancamento(l,olho)).join('')}
  ${visiveis.length>6?`<button class="link-button casa-ver-mais" onclick="alternarTudo()">${mostrarTudo?'mostrar menos':'ver todos os '+visiveis.length}</button>`:''}`;

  return `
  <div class="panel-header"><h2>Dinheiro</h2><span class="pill">${esc(d.mes)}</span></div>
  <div class="casa-olho">
    <span>demonstração · vendo a tela de</span>
    ${adultos().map(m=>`<button type="button" class="${m.id===olho?'ativa':''}" onclick="trocarOlho('${m.id}')" aria-pressed="${m.id===olho}">${esc(m.nome)}</button>`).join('')}
  </div>
  ${duasColunas(esquerda,direita,false,false)}
  <p class="casa-rodape">Protótipo: sem banco, sem importação de extrato, sem categoria obrigatória.
  O que está aqui é a conversa sobre o que cada um vê.</p>
  ${fab('Novo gasto',"focarLancamento()")}`;
}

/* ------------------------------------------------------------- TAREFAS  */
// Lista à esquerda, tarefa aberta à direita — como aplicativo de mensagem.
// Na tela estreita a lista ocupa tudo e o detalhe abre por cima.
function linhaTarefa(t,comSeta){
  const escolhida = selecao.tarefas===t.id;
  return `
  <div class="casa-linha casa-linha-tarefa ${t.concluida?'feito':''} ${escolhida?'escolhida':''}" data-deslizar="tarefa:${t.id}">
    ${botaoCheck(t.concluida,(t.concluida?'Reabrir ':'Concluir ')+t.titulo,`alternarTarefa('${t.id}')`)}
    <button class="casa-linha-abrir" onclick="selecionarTarefa('${t.id}')">
      <strong class="${t.concluida?'riscado':''}">${esc(t.titulo)}</strong>
      <span class="casa-meta">${esc(t.prazo||'sem prazo')}${t.repete?' · '+esc(t.repete.toLowerCase()):''}</span>
    </button>
    ${t.responsavel?quemChip(t.responsavel):`<span class="casa-chip casa-chip-livre">livre</span>`}
    ${comSeta?`<span class="casa-seta" aria-hidden="true">${svg('chevron')}</span>`:''}
  </div>`;
}
function detalheTarefa(t){
  if(!t) return `<div class="casa-painel-vazio">${svg('tasks')}<strong>Escolha uma tarefa</strong><span>Toque em qualquer linha da lista para ver o detalhe aqui.</span></div>`;
  return `
  ${voltar('tarefas','Todas as tarefas')}
  <article class="casa-cartao aberto">
    <div class="casa-cartao-topo">
      ${botaoCheck(t.concluida,(t.concluida?'Reabrir ':'Concluir ')+t.titulo,`alternarTarefa('${t.id}')`)}
      <div class="casa-linha-texto">
        <strong class="${t.concluida?'riscado':''}">${esc(t.titulo)}</strong>
        <span class="casa-meta">${esc(t.prazo||'sem prazo')}${t.nota?' · '+esc(t.nota):''}</span>
      </div>
    </div>
    <div class="casa-chips">
      ${t.responsavel?quemChip(t.responsavel):chip('ninguém assumiu','casa-chip-livre')}
      ${t.repete?chipIcone('repeat',t.repete,''):''}
      ${t.lista?chipIcone('cart','lista: '+t.lista,''):''}
    </div>
    ${t.responsavel?'':`<button class="casa-botao-min destaque casa-acao-larga" onclick="assumirTarefa('${t.id}')">Assumir esta tarefa</button>`}
    ${t.checklist?`<div class="section-label">Passo a passo</div>
      <ul class="casa-checklist">${t.checklist.map((c,i)=>`
      <li>${botaoCheck(c.ok,c.texto,`alternarChecklist('${t.id}',${i})`)}<span class="${c.ok?'riscado':''}">${esc(c.texto)}</span></li>`).join('')}
      <li class="casa-checklist-conta">${t.checklist.filter(c=>c.ok).length} de ${t.checklist.length} feitos</li></ul>`:''}
  </article>
  <p class="casa-dica">Concluir não depende da aprovação de ninguém.</p>`;
}
function telaTarefas(){
  const lista = dadosExemplo.tarefas;
  const hoje = lista.filter(t=>t.hoje&&!t.concluida);
  const livres = lista.filter(t=>!t.responsavel&&!t.concluida&&!t.hoje);
  const outras = lista.filter(t=>!t.concluida&&!t.hoje&&t.responsavel);
  const feitas = lista.filter(t=>t.concluida);
  const abertas = hoje.length+livres.length+outras.length;
  const atual = lista.find(t=>t.id===selecao.tarefas) || hoje[0] || livres[0] || outras[0] || feitas[0] || null;

  const grupo = (titulo,itens)=>itens.length?`<div class="section-label">${titulo}</div>${itens.map(t=>linhaTarefa(t,true)).join('')}`:'';
  const esquerda = abertas||feitas.length ? `
    ${grupo('Para hoje',hoje)}
    ${grupo('Ninguém assumiu',livres)}
    ${grupo('Próximos dias',outras)}
    ${grupo('Já feitas',feitas)}`
    : vazio('Nenhuma tarefa ainda.','Toque em "Nova tarefa" ali embaixo. Só o título é obrigatório — o resto fica para depois.','tasks');

  return `
  <div class="panel-header"><h2>Tarefas da casa</h2><span class="pill">${abertas} ${abertas===1?'em aberto':'em aberto'}</span></div>
  ${duasColunas(esquerda,detalheTarefa(atual),true,selecao.tarefas!==null)}
  ${fab('Nova tarefa',"abrirNovaTarefa()")}`;
}

/* ------------------------------------------------------------- COMPRAS  */
// Estreito: três abas, como a pessoa já viu em todo lugar.
// Largo: a lista fica à esquerda e a despensa à direita, lado a lado —
// que é como se usa de verdade (olha o armário, joga na lista).
function telaCompras(){
  const l = dadosExemplo.listaAtiva;
  const abertos = l.itens.filter(i=>!i.comprado);
  const comprados = l.itens.filter(i=>i.comprado);

  const esquerda = `
  <section data-painel="lista">
    <form class="casa-composer" onsubmit="adicionarCompra(event)">
      <input id="novoItem" aria-label="Adicionar item à lista" placeholder="O que faltou?" maxlength="60" autocomplete="off">
      <button class="small-button" type="submit">${svg('plus')}<span class="so-desktop">Adicionar</span></button>
    </form>
    <div class="section-label">${esc(l.nome)}</div>
    ${abertos.map(i=>`
      <div class="casa-linha" data-deslizar="compra:${jsStr(i.nome)}">
        ${botaoCheck(false,'Marcar '+i.nome+' como comprado',`alternarCompra('${jsStr(i.nome)}')`)}
        <div class="casa-linha-texto"><strong>${esc(i.nome)}</strong>${i.detalhe||i.origem?`<span class="casa-meta">${esc([i.detalhe,i.origem].filter(Boolean).join(' · '))}</span>`:''}</div>
      </div>`).join('') || vazio('Nada na lista.','Escreva aí em cima o que acabou. Uma palavra e Enter bastam.','cart')}
    ${comprados.length?`<div class="section-label">Já no carrinho</div>${comprados.map(i=>`
      <div class="casa-linha feito" data-deslizar="compra:${jsStr(i.nome)}">
        ${botaoCheck(true,'Desmarcar '+i.nome,`alternarCompra('${jsStr(i.nome)}')`)}
        <div class="casa-linha-texto"><strong class="riscado">${esc(i.nome)}</strong></div>
      </div>`).join('')}`:''}
  </section>`;

  const direita = `
  <section data-painel="despensa" hidden>
    <div class="section-label">O que tem em casa</div>
    ${dadosExemplo.despensa.map(i=>`
      <div class="casa-linha">
        <span class="casa-bolinha ${i.situacao}" aria-hidden="true"></span>
        <div class="casa-linha-texto"><strong>${esc(i.nome)}</strong>
          <span class="casa-meta">${esc(i.local)}${i.detalhe?' · '+esc(i.detalhe):''}</span></div>
        ${i.situacao==='ok'
          ? chip('tem','casa-chip-ok')
          : naListaDeCompras(i.nome)
            ? chip('na lista','casa-chip-ok')
            : `<button class="casa-botao-min" onclick="jogarNaLista('${jsStr(i.nome)}')">${svg('plus')}lista</button>`}
      </div>`).join('')}
  </section>
  <section data-painel="salvas" hidden>
    <div class="section-label">Listas que se repetem</div>
    ${dadosExemplo.listasSalvas.map(s=>`
      <article class="casa-cartao">
        <div class="casa-cartao-topo">
          <div class="casa-linha-texto"><strong>${esc(s.nome)}</strong><span class="casa-meta">${s.itens.length} itens · ${esc(s.usada)}</span></div>
          <button class="casa-botao-min destaque" onclick="usarLista('${jsStr(s.nome)}')">usar</button>
        </div>
        <div class="casa-chips">${s.itens.slice(0,6).map(i=>chip(i,'')).join('')}${s.itens.length>6?chip('+'+(s.itens.length-6),''):''}</div>
      </article>`).join('')}
  </section>`;

  return `
  <div class="panel-header"><h2>Compras</h2><span class="pill">${abertos.length} ${abertos.length===1?'item':'itens'}</span></div>
  <nav class="casa-tabs" aria-label="Seções de compras">
    <button type="button" class="ativa" data-aba="lista" onclick="trocarAba(this,'lista')" aria-selected="true">Lista</button>
    <button type="button" data-aba="despensa" onclick="trocarAba(this,'despensa')" aria-selected="false">Despensa</button>
    <button type="button" data-aba="salvas" onclick="trocarAba(this,'salvas')" aria-selected="false">Listas salvas</button>
  </nav>
  ${duasColunas(esquerda,direita,false,false)}
  ${fab('Adicionar',"focarNovoItem()")}`;
}

/* -------------------------------------------------------------- AGENDA  */
function telaAgenda(){
  return `
  <div class="panel-header"><h2>A semana</h2><span class="pill">compromisso e prazo juntos</span></div>
  <div class="casa-colunas">
  ${dadosExemplo.agenda.map(dia=>`
    <section class="casa-dia">
      <div class="casa-dia-head"><strong>${esc(rotuloDoDia(dia.emDias))}</strong><span>${esc(dataDoDia(dia.emDias))}</span></div>
      ${dia.itens.length?dia.itens.map(i=>`
        <div class="casa-linha">
          <span class="casa-hora">${esc(i.hora)}</span>
          <span class="casa-trilho ${esc(i.tipo)}" aria-hidden="true"></span>
          <div class="casa-linha-texto">
            <strong>${i.particular?'Compromisso particular':esc(i.titulo)}${i.particular?svg('lock'):''}</strong>
            <span class="casa-meta">${i.particular?'só quem tem permissão vê o que é':esc({compromisso:'compromisso',tarefa:'tarefa com prazo',conta:'conta a pagar'}[i.tipo]||i.tipo)}</span>
          </div>
          ${i.particular?'':quemChip(i.quem)}
        </div>`).join(''):`<p class="casa-dia-livre">dia livre</p>`}
    </section>`).join('')}
  </div>`;
}

/* -------------------------------------------------------------- AVISOS  */
function telaAvisos(){
  const novos = dadosExemplo.avisos.filter(a=>!a.lido);
  const velhos = dadosExemplo.avisos.filter(a=>a.lido);
  const cartao = a=>`
    <article class="casa-cartao aviso ${a.lido?'lido':''}">
      <div class="casa-cartao-topo">
        <span class="casa-icone-aviso ${esc(a.tipo)}" aria-hidden="true">${svg({despensa:'box',conta:'wallet',tarefa:'tasks',agenda:'calendar',documento:'doc'}[a.tipo]||'bell')}</span>
        <div class="casa-linha-texto">
          <strong>${esc(a.titulo)}</strong>
          <span class="casa-meta">${esc(a.detalhe)}</span>
        </div>
        ${a.lido?'':`<button class="casa-botao-min" onclick="marcarLido('${a.id}')" aria-label="Marcar aviso como lido">ok</button>`}
      </div>
      <div class="casa-chips">
        ${chip(a.origem,'casa-chip-origem')}${chip(a.quando,'')}
        ${a.acao?`<button class="casa-botao-min destaque" onclick="acaoDoAviso('${a.id}')">${esc(a.acao.texto)}</button>`:''}
      </div>
    </article>`;
  return `
  <div class="panel-header"><h2>Avisos</h2>${novos.length?`<span class="pill">${novos.length} ${novos.length===1?'novo':'novos'}</span>`:''}</div>
  <div class="casa-colunas">
    ${novos.length?novos.map(cartao).join('')
      :vazio('Nenhum aviso novo.','Aviso aqui sempre vem de algum lugar: uma tarefa, uma conta ou um item que acabou.','bell')}
    ${velhos.length?`<div class="casa-coluna-titulo section-label">Já vistos</div>${velhos.map(cartao).join('')}`:''}
  </div>
  <p class="casa-rodape">Não existe conversa solta aqui: comentário mora dentro do registro a que pertence.
  Cada pessoa escolhe onde recebe e com quanta antecedência — nesta demonstração isso é só um desenho.</p>`;
}

/* --------------------------------------------------------------- COMIDA */
/* "Cardápio" é palavra de restaurante — em casa o que existe é "o que vai
   ter pra janta?". Daí o nome do app e os rótulos: Almoço e Janta.

   O que mata este tipo de módulo é exigir planejar a semana num domingo.
   Então anotar depois é tão fácil quanto planejar antes, e dia em branco
   é normal: nada de cobrança visual, nada de aviso.                      */
const ESTADOS_COMIDA = [
  { id:'casa',  rotulo:'em casa', icone:'prato' },
  { id:'fora',  rotulo:'fora',    icone:'fora'  },
  { id:'sobra', rotulo:'sobra',   icone:'box'   }
];
const REFEICOES = [ ['almoco','Almoço'], ['janta','Janta'] ];

function diaDeComida(id){return dadosExemplo.comida.dias.find(d=>d.id===id)||null;}
function diaDeHoje(){return dadosExemplo.comida.dias.find(d=>Number(d.emDias)===0)||null;}
function resumoRefeicao(r){
  if(!r||!r.estado) return 'a combinar';
  if(r.estado==='fora')  return r.oque?('fora · '+r.oque.toLocaleLowerCase('pt-BR')):'fora';
  if(r.estado==='sobra') return 'sobra';
  return r.oque || 'em casa';
}
// Elo com a despensa, sem cadastro de receita: usa os ingredientes quando
// existem e, quando não, procura o próprio nome do prato na despensa.
function faltaParaOPrato(r){
  if(!r||r.estado!=='casa') return [];
  const nomes = r.ingredientes && r.ingredientes.length
    ? r.ingredientes
    : (r.oque? [r.oque] : []);
  return dadosExemplo.despensa.filter(i=>i.situacao==='falta'
    && nomes.some(n=>n.toLocaleLowerCase('pt-BR').includes(i.nome.toLocaleLowerCase('pt-BR'))
                  || i.nome.toLocaleLowerCase('pt-BR').includes(n.toLocaleLowerCase('pt-BR'))));
}
function blocoRefeicao(dia,chave,rotulo){
  const r = dia[chave];
  const falta = faltaParaOPrato(r);
  return `
  <div class="casa-refeicao">
    <div class="casa-refeicao-topo">
      <strong>${rotulo}</strong>
      <span class="casa-meta">${esc(resumoRefeicao(r))}</span>
    </div>
    <div class="casa-estados">
      ${ESTADOS_COMIDA.map(e=>`<button type="button" class="${r.estado===e.id?'ativa':''}"
        aria-pressed="${r.estado===e.id}"
        onclick="definirEstado('${dia.id}','${chave}','${e.id}')">${svg(e.icone)}${e.rotulo}</button>`).join('')}
      ${r.estado?`<button type="button" class="casa-limpar-estado" onclick="definirEstado('${dia.id}','${chave}','')" aria-label="Deixar em branco">limpar</button>`:''}
    </div>
    ${r.estado==='casa'||r.estado==='sobra'?`
      <input class="casa-prato" value="${esc(r.oque||'')}" maxlength="60" autocomplete="off"
        placeholder="${r.estado==='sobra'?'sobra do quê?':'o que foi?'}"
        aria-label="O que foi o ${rotulo.toLocaleLowerCase('pt-BR')}"
        onchange="definirPrato('${dia.id}','${chave}',this.value)">`:''}
    ${r.estado==='fora'?`
      <input class="casa-prato" value="${esc(r.oque||'')}" maxlength="60" autocomplete="off"
        placeholder="saiu ou pediu o quê?" aria-label="O que foi"
        onchange="definirPrato('${dia.id}','${chave}',this.value)">
      ${r.gasto!=null
        ? `<p class="casa-dica">${svg('wallet')}Gasto de ${brl(r.gasto)} lançado em Dinheiro.</p>`
        : `<form class="casa-gasto" onsubmit="lancarComidaFora(event,'${dia.id}','${chave}')">
             <input inputmode="decimal" placeholder="Gastou quanto? (opcional)" maxlength="12"
               aria-label="Valor gasto" autocomplete="off">
             <button class="casa-botao-min" type="submit">lançar</button>
           </form>`}`:''}
    ${falta.length?`<p class="casa-dica falta">${svg('cart')}Falta ${esc(falta.map(i=>i.nome.toLocaleLowerCase('pt-BR')).join(' e '))}.
      <button class="casa-botao-min" onclick="jogarNaLista('${jsStr(falta[0].nome)}')">${svg('plus')}lista</button></p>`:''}
    ${!r.estado?`<p class="casa-dica">Pode deixar em branco. Ninguém precisa decidir hoje.</p>`:''}
  </div>`;
}
function detalheDia(dia){
  if(!dia) return `<div class="casa-painel-vazio">${svg('prato')}<strong>Escolha um dia</strong><span>Toque num dia para dizer o que teve, ou o que vai ter.</span></div>`;
  return `
  ${voltar('comida','A semana toda')}
  <header class="casa-hero pequeno">
    <span class="casa-eyebrow">${esc(dataDoDia(dia.emDias))}</span>
    <h2>${esc(rotuloDoDia(dia.emDias))}</h2>
  </header>
  ${REFEICOES.map(([chave,rotulo])=>blocoRefeicao(dia,chave,rotulo)).join('')}`;
}
function telaComida(){
  const dias = dadosExemplo.comida.dias;
  const atual = diaDeComida(selecao.comida) || diaDeHoje() || dias[0] || null;
  const esquerda = dias.map(d=>`
    <div class="casa-linha ${selecao.comida===d.id?'escolhida':''}">
      <button class="casa-linha-abrir" onclick="selecionarDia('${d.id}')">
        <strong>${esc(rotuloDoDia(d.emDias))}</strong>
        <span class="casa-meta">Almoço ${esc(resumoRefeicao(d.almoco))} · Janta ${esc(resumoRefeicao(d.janta))}</span>
      </button>
      <span class="casa-seta" aria-hidden="true">${svg('chevron')}</span>
    </div>`).join('');
  return `
  <div class="panel-header"><h2>Comida</h2><span class="pill">esta semana</span></div>
  ${duasColunas(esquerda,detalheDia(atual),true,selecao.comida!==null)}
  <p class="casa-rodape">Anotar depois vale tanto quanto planejar antes. Dia em branco é dia normal —
  o sistema não cobra ninguém por isso.</p>
  ${fab('O que teve hoje',"anotarHoje()")}`;
}

/* ---------------------------------------------------------- DOCUMENTOS  */
// Busca em cima, porque ninguém navega pasta — todo mundo procura.
// Validade é o que faz o módulo valer: documento que vence e ninguém lembra.
let buscaDoc = '';
const ROTULO_TIPO = { pdf:'PDF', foto:'Foto', planilha:'Planilha' };

function docsVisiveis(){
  return dadosExemplo.documentos.filter(d=>nivelDeAcesso(d,verComo)!=='nada');
}
function docsFiltrados(){
  const termo = buscaDoc.trim().toLocaleLowerCase('pt-BR');
  if(!termo) return docsVisiveis();
  return docsVisiveis().filter(d=>d.nome.toLocaleLowerCase('pt-BR').includes(termo)
    || (ROTULO_TIPO[d.tipo]||'').toLocaleLowerCase('pt-BR').includes(termo)
    || nomeDe(d.quem).toLocaleLowerCase('pt-BR').includes(termo));
}
function docsQueVencem(){
  return docsVisiveis().filter(d=>d.venceEmDias!=null).sort((a,b)=>a.venceEmDias-b.venceEmDias);
}
function linhaDocumento(d){
  const soNome = nivelDeAcesso(d,verComo)==='valor';   // vê que existe, não abre
  const proprio = d.quem===verComo;
  const cadeado = soNome || (proprio && d.visibilidade!=='aberto');
  return `
  <div class="casa-linha ${selecao.documentos===d.id?'escolhida':''}">
    <span class="casa-tipo ${esc(d.tipo)}" aria-hidden="true">${svg(d.tipo==='foto'?'grid':d.tipo==='planilha'?'finance':'doc')}</span>
    <button class="casa-linha-abrir" onclick="selecionarDoc('${d.id}')">
      <strong>${esc(d.nome)}${cadeado?svg('lock'):''}</strong>
      <span class="casa-meta">${esc(ROTULO_TIPO[d.tipo]||d.tipo)} · ${d.quem==='casa'?'da casa':esc(nomeDe(d.quem))} · ${esc(d.data)}</span>
    </button>
    ${d.venceEmDias!=null?chip('vence em '+d.venceEmDias+' dias','casa-chip-vence'):''}
  </div>`;
}
function detalheDocumento(d){
  if(!d) return `<div class="casa-painel-vazio">${svg('doc')}<strong>Escolha um documento</strong><span>Toque em qualquer arquivo da lista para ver os detalhes aqui.</span></div>`;
  const soNome = nivelDeAcesso(d,verComo)==='valor';
  const proprio = d.quem===verComo;
  const outro = oOutroAdulto(verComo);
  return `
  ${voltar('documentos','Todos os documentos')}
  <article class="casa-cartao aberto">
    <div class="casa-cartao-topo">
      <span class="casa-tipo grande ${esc(d.tipo)}" aria-hidden="true">${svg(d.tipo==='foto'?'grid':d.tipo==='planilha'?'finance':'doc')}</span>
      <div class="casa-linha-texto">
        <strong>${esc(d.nome)}</strong>
        <span class="casa-meta">${esc(ROTULO_TIPO[d.tipo]||d.tipo)} · ${esc(d.tamanho)} · guardado em ${esc(d.data)}</span>
      </div>
    </div>
    <div class="casa-chips">
      ${d.quem==='casa'?chip('da casa','casa-chip-ok'):quemChip(d.quem)}
      ${d.venceEmDias!=null?chip('vence em '+d.venceEmDias+' dias','casa-chip-vence'):chip('sem validade','')}
      ${d.visibilidade==='aberto'?chip('a casa toda vê','casa-vis-aberto')
        :d.visibilidade==='total'
          ? `<span class="casa-chip casa-vis-total">${svg('lock')}${proprio?`${outro?outro.nome:'a outra pessoa'} vê o nome, não abre`:'você vê o nome, não abre'}</span>`
          : `<span class="casa-chip casa-vis-privado">${svg('lock')}só ${proprio?'você':esc(nomeDe(d.quem))}</span>`}
    </div>
    ${d.venceEmDias!=null?`<p class="casa-nota-leve">${svg('bell')}<span>Faltando ${d.venceEmDias} dias, a casa já foi avisada. O aviso nasce da data, não de alguém lembrar.</span></p>`:''}
    ${soNome
      ? `<p class="casa-dica">${esc(nomeDe(d.quem))} guardou este arquivo como "só o nome". Você sabe que ele existe; abrir, não.</p>`
      : `<button class="casa-botao-min destaque casa-acao-larga" onclick="notify('Protótipo: nenhum arquivo de verdade para abrir.')">${svg('arrow')}Abrir arquivo</button>`}
  </article>`;
}
function telaDocumentos(){
  const lista = docsFiltrados();
  const vencendo = docsQueVencem();
  const atual = dadosExemplo.documentos.find(d=>d.id===selecao.documentos&&nivelDeAcesso(d,verComo)!=='nada') || lista[0] || null;

  const esquerda = `
  <div class="casa-busca">
    ${svg('search')}
    <input id="buscaDoc" type="search" value="${esc(buscaDoc)}" placeholder="Procurar documento"
      aria-label="Procurar documento" autocomplete="off" oninput="filtrarDocumentos(this.value)">
    ${buscaDoc?`<button class="casa-limpar" onclick="filtrarDocumentos('')" aria-label="Limpar busca">×</button>`:''}
  </div>
  ${!buscaDoc&&vencendo.length?`<div class="section-label">Vence em breve</div>${vencendo.map(linhaDocumento).join('')}`:''}
  <div class="section-label">${buscaDoc?`${lista.length} ${lista.length===1?'resultado':'resultados'}`:'Todos os documentos'}</div>
  ${lista.length?lista.map(linhaDocumento).join('')
    :vazio('Nada com esse nome.','Procure por parte do nome, pelo tipo ("PDF", "foto") ou por quem guardou.','search')}`;

  return `
  <div class="panel-header"><h2>Documentos</h2><span class="pill">${docsVisiveis().length} arquivos</span></div>
  ${duasColunas(esquerda,detalheDocumento(atual),true,selecao.documentos!==null)}
  <p class="casa-rodape">Protótipo: os arquivos não existem de verdade. O que está aqui é a ideia —
  achar pela busca e ser avisado antes de vencer.</p>
  ${fab('Guardar arquivo',"notify('Protótipo: guardar arquivo de verdade fica para o sistema.')")}`;
}

/* ------------------------------------------------------------- VIAGENS  */
// A mecânica que o dono descreveu: a viagem tem dois momentos do mesmo
// conteúdo. Planejando, é vontade solta. Quando acontece, o que foi acordado
// VIRA ROTEIRO — e cada item do roteiro lembra de quem foi a ideia.
const QUEREM = { vamos:{rotulo:'vamos', classe:'casa-vis-aberto'},
                 talvez:{rotulo:'talvez', classe:'casa-chip-livre'},
                 nao:{rotulo:'fica para a próxima', classe:''} };

function cartaoViagem(v){
  const escolhida = selecao.viagens===v.id;
  const vamos = v.lugares.filter(l=>l.querem==='vamos').length;
  return `
  <div class="casa-linha ${escolhida?'escolhida':''}">
    <span class="casa-tipo ${v.estado==='acontecendo'?'agora':''}" aria-hidden="true">${svg('plane')}</span>
    <button class="casa-linha-abrir" onclick="selecionarViagem('${v.id}')">
      <strong>${esc(v.nome)}</strong>
      <span class="casa-meta">${esc(v.quando)} · ${vamos} ${vamos===1?'lugar combinado':'lugares combinados'}</span>
    </button>
    ${v.estado==='acontecendo'?chip('acontecendo','casa-chip-agora'):chip('planejando','casa-chip-livre')}
  </div>`;
}
function blocoParticipantes(v){
  return `
  <div class="casa-chips">
    ${v.participantes.map(id=>quemChip(id)).join('')}
    ${v.convidados.map(c=>`<span class="casa-chip casa-chip-convidado">${svg('lock')}${esc(c.nome)} · convidada · ${esc(c.acesso)}</span>`).join('')}
  </div>
  ${v.convidados.length?`<p class="casa-dica">${svg('lock')} Convidado vê só esta viagem, e só ${esc(v.convidados[0].ate)}. O resto da casa continua fechado para ele.</p>`:''}`;
}
function blocoLugares(v,titulo){
  const ordem = ['vamos','talvez','nao'];
  return `<div class="section-label">${titulo}</div>
  ${ordem.map(q=>{
    const desses = v.lugares.filter(l=>l.querem===q);
    if(!desses.length) return '';
    return desses.map(l=>`
      <div class="casa-linha">
        <span class="casa-bolinha ${q==='vamos'?'ok':q==='talvez'?'pouco':''}" aria-hidden="true"></span>
        <div class="casa-linha-texto"><strong class="${q==='nao'?'riscado':''}">${esc(l.nome)}</strong>
          <span class="casa-meta">ideia ${esc(nomeDe(l.quemSugeriu))}</span></div>
        <button class="casa-botao-min ${q==='vamos'?'destaque':''}" onclick="alternarLugar('${v.id}','${l.id}')">${esc(QUEREM[q].rotulo)}</button>
      </div>`).join('');
  }).join('')}`;
}
function blocoReservas(v){
  return `<div class="section-label">Reservas e passagens</div>
  ${v.reservas.map((res,i)=>`
    <div class="casa-linha">
      ${botaoCheck(res.feito,(res.feito?'Desmarcar ':'Marcar ')+res.nome,`alternarReserva('${v.id}',${i})`)}
      <div class="casa-linha-texto"><strong class="${res.feito?'':''}">${esc(res.nome)}</strong>
        <span class="casa-meta">${esc(res.tipo)}${res.feito?' · confirmado':' · ainda falta'}</span></div>
      ${res.anexo?chip(res.anexo,'casa-chip-anexo'):''}
    </div>`).join('')}`;
}
function blocoPreparacao(v){
  if(!v.preparacao.length) return '';
  return `<div class="section-label">Antes de sair</div>
  ${v.preparacao.map((t,i)=>`
    <div class="casa-linha">
      ${botaoCheck(t.ok,(t.ok?'Desmarcar ':'Marcar ')+t.texto,`alternarPreparo('${v.id}',${i})`)}
      <div class="casa-linha-texto"><strong class="${t.ok?'riscado':''}">${esc(t.texto)}</strong></div>
    </div>`).join('')}`;
}
function blocoDespesas(v){
  const total = v.despesas.reduce((s,d)=>s+d.valor,0);
  return `<div class="section-label">Quanto já saiu</div>
  ${v.despesas.length?`
    ${v.despesas.map(d=>`
      <div class="casa-linha">
        <div class="casa-linha-texto"><strong>${esc(d.oque)}</strong><span class="casa-meta">${esc(nomeDe(d.quem))}</span></div>
        <span class="casa-valor">${brl(d.valor)}</span>
      </div>`).join('')}
    <p class="casa-resumo-linha"><strong>${brl(total)}</strong> de ${brl(v.orcamento)} que a casa separou</p>`
   :`<p class="casa-resumo-linha">Nada gasto ainda. A casa separou <strong>${brl(v.orcamento)}</strong>.</p>`}`;
}
function detalheViagem(v){
  if(!v) return `<div class="casa-painel-vazio">${svg('plane')}<strong>Escolha uma viagem</strong><span>Toque numa viagem da lista para ver o plano ou o roteiro.</span></div>`;
  const cabecalho = `
    ${voltar('viagens','Todas as viagens')}
    <header class="casa-hero pequeno">
      <span class="casa-eyebrow">${v.estado==='acontecendo'?'acontecendo agora':'ainda planejando'}</span>
      <h2>${esc(v.nome)}</h2>
      <p>${esc(v.quando)}</p>
    </header>
    ${blocoParticipantes(v)}`;

  if(v.estado==='acontecendo'){
    const hoje = v.roteiro.find(d=>d.dia==='Hoje');
    return `${cabecalho}
    <p class="casa-nota-leve">${svg('check')}<span>O que a família combinou virou este roteiro. Nada do plano foi jogado fora — ele virou hora e ordem.</span></p>
    ${v.roteiro.map(d=>`
      <div class="section-label">${esc(d.dia)}</div>
      ${d.itens.map(i=>{
        const origem = i.veioDe ? v.lugares.find(l=>l.id===i.veioDe) : null;
        return `
        <div class="casa-linha ${d.dia==='Hoje'?'':'passado'}">
          <span class="casa-hora">${esc(i.hora)}</span>
          <span class="casa-trilho compromisso" aria-hidden="true"></span>
          <div class="casa-linha-texto"><strong>${esc(i.titulo)}</strong>
            ${origem?`<span class="casa-meta">${svg('spark')}veio da ideia ${esc(nomeDe(origem.quemSugeriu))}, lá no plano</span>`
                     :`<span class="casa-meta">do roteiro</span>`}</div>
        </div>`;}).join('')}`).join('')}
    ${blocoDespesas(v)}
    ${blocoReservas(v)}`;
  }

  return `${cabecalho}
  <p class="casa-nota-leve">${svg('spark')}<span>Fase de juntar vontade: cada um joga o que quer conhecer. Quando a viagem chegar, o que ficou em "vamos" vira o roteiro do dia.</span></p>
  ${blocoLugares(v,'Lugares que alguém quis')}
  ${blocoReservas(v)}
  ${blocoPreparacao(v)}
  ${blocoDespesas(v)}`;
}
function telaViagens(){
  const lista = dadosExemplo.viagens;
  const atual = lista.find(v=>v.id===selecao.viagens) || lista[0] || null;
  const esquerda = lista.length
    ? lista.map(cartaoViagem).join('')
    : vazio('Nenhuma viagem ainda.','Comece jogando aqui os lugares que alguém quer conhecer. Vira roteiro quando a viagem chegar.','plane');
  return `
  <div class="panel-header"><h2>Viagens</h2><span class="pill">${lista.length} ${lista.length===1?'viagem':'viagens'}</span></div>
  ${duasColunas(esquerda,detalheViagem(atual),true,selecao.viagens!==null)}
  ${fab('Nova viagem',"notify('Protótipo: criar viagem fica para o sistema.')")}`;
}

/* ------------------------------------------------------------- ações   */
function selecionarDia(id){
  selecao.comida = id;
  redesenhar('comida');
  document.getElementById('comida')?.closest('.window-content')?.scrollTo({top:0});
}
function abrirComida(){anotarHoje();}
function anotarHoje(){
  const hoje = diaDeHoje();
  if(!hoje) return;
  selecao.comida = hoje.id;
  redesenhar('comida');
  if(!windows.has('comida')) openApp('comida'); else focusWindow('comida');
}
function definirEstado(idDia,chave,estado){
  const dia = diaDeComida(idDia);
  if(!dia||!dia[chave]) return;
  dia[chave].estado = estado || null;
  if(!estado) dia[chave].oque = '';
  if(estado==='sobra'&&!dia[chave].oque) dia[chave].oque = 'O que sobrou do almoço';
  atualizarTudo();
  redesenhar('comida');
}
function definirPrato(idDia,chave,texto){
  const dia = diaDeComida(idDia);
  if(!dia||!dia[chave]) return;
  dia[chave].oque = String(texto||'').trim();
  atualizarTudo();
  redesenhar('comida');
}
// Comer fora é das maiores despesas variáveis de uma casa. O sistema oferece
// lançar, e não insiste: sem valor, não acontece nada.
function lancarComidaFora(evento,idDia,chave){
  evento.preventDefault();
  const campo = evento.target.querySelector('input');
  const valor = Number(String(campo.value).trim().replace(/\./g,'').replace(',','.'));
  const dia = diaDeComida(idDia);
  if(!dia||!valor||valor<=0){notify('Sem valor, sem lançamento — e está tudo bem.');return;}
  dia[chave].gasto = valor;
  dadosExemplo.dinheiro.lancamentos.unshift({
    id:'l'+Date.now(), tipo:'saida',
    descricao: dia[chave].oque || 'Comida fora', valor, quem: verComo,
    conta: dadosExemplo.dinheiro.contas.find(c=>c.dono===verComo)?.id||'cc-casa',
    dia: String(new Date().getDate()).padStart(2,'0'), visibilidade:'aberto'
  });
  notify(`${dia[chave].oque||'Comida fora'} — ${brl(valor)} lançado em Dinheiro.`);
  atualizarTudo();
  redesenhar('comida');
}
// Usada também pelo assistente: "hoje a janta é pizza".
function registrarJanta(texto,estado){
  const hoje = diaDeHoje();
  if(!hoje) return;
  hoje.janta.estado = estado || 'casa';
  hoje.janta.oque = texto;
}
function filtrarDocumentos(termo){
  buscaDoc = termo;
  selecao.documentos = null;
  redesenhar('documentos');
  // Redesenhar troca o campo: devolve o foco e o cursor no fim, senão
  // a pessoa perde a digitação no segundo caractere.
  const campo = $('#buscaDoc');
  if(campo){campo.focus();campo.setSelectionRange(campo.value.length,campo.value.length);}
}
function selecionarDoc(id){
  selecao.documentos = id;
  redesenhar('documentos');
  document.getElementById('documentos')?.closest('.window-content')?.scrollTo({top:0});
}
function selecionarViagem(id){
  selecao.viagens = id;
  redesenhar('viagens');
  document.getElementById('viagens')?.closest('.window-content')?.scrollTo({top:0});
}
function alternarLugar(idViagem,idLugar){
  const v = dadosExemplo.viagens.find(v=>v.id===idViagem);
  const l = v?.lugares.find(l=>l.id===idLugar);
  if(!l) return;
  const ordem = ['vamos','talvez','nao'];
  l.querem = ordem[(ordem.indexOf(l.querem)+1)%ordem.length];
  notify(`${l.nome}: ${QUEREM[l.querem].rotulo}.`);
  redesenhar('viagens');
}
function alternarReserva(idViagem,i){
  const v = dadosExemplo.viagens.find(v=>v.id===idViagem);
  if(!v||!v.reservas[i]) return;
  v.reservas[i].feito = !v.reservas[i].feito;
  redesenhar('viagens');
}
function alternarPreparo(idViagem,i){
  const v = dadosExemplo.viagens.find(v=>v.id===idViagem);
  if(!v||!v.preparacao[i]) return;
  v.preparacao[i].ok = !v.preparacao[i].ok;
  redesenhar('viagens');
}

function naListaDeCompras(nome){
  return dadosExemplo.listaAtiva.itens.some(i=>i.nome.toLocaleLowerCase('pt-BR')===String(nome).toLocaleLowerCase('pt-BR'));
}
function alternarTarefa(id){
  const t = dadosExemplo.tarefas.find(t=>t.id===id);
  if(!t) return;
  t.concluida = !t.concluida;
  notify(t.concluida?`Feito: ${t.titulo}.`:`${t.titulo} voltou para a lista.`);
  atualizarTudo();
}
function selecionarTarefa(id){
  selecao.tarefas = id;
  redesenhar('tarefas');
  // Tocar numa tarefa a partir da tela Hoje leva para Tarefas com ela aberta.
  // Item que responde ao toque e não vai a lugar nenhum é pior que item morto.
  if(!windows.has('tarefas')) openApp('tarefas'); else focusWindow('tarefas');
  document.getElementById('tarefas')?.closest('.window-content')?.scrollTo({top:0});
}
function voltarLista(tela){
  selecao[tela] = null;
  redesenhar(tela);
}
function assumirTarefa(id){
  const t = dadosExemplo.tarefas.find(t=>t.id===id);
  if(!t) return;
  t.responsavel = dadosExemplo.hoje.usuario;
  if(t.nota==='Ninguém assumiu ainda.') t.nota='';
  notify(`${nomeDe(t.responsavel)} assumiu: ${t.titulo}.`);
  atualizarTudo();
}
function alternarChecklist(id,indice){
  const t = dadosExemplo.tarefas.find(t=>t.id===id);
  if(!t||!t.checklist||!t.checklist[indice]) return;
  t.checklist[indice].ok = !t.checklist[indice].ok;
  atualizarTudo();
}
function alternarCompra(nome){
  const item = dadosExemplo.listaAtiva.itens.find(i=>i.nome===nome);
  if(!item) return;
  item.comprado = !item.comprado;
  notify(item.comprado?`${item.nome} foi para o carrinho.`:`${item.nome} voltou para a lista.`);
  atualizarTudo();
}
function adicionarItemNaLista(nome,origem){
  if(!nome) return false;
  if(naListaDeCompras(nome)){notify(`${nome} já estava na lista.`);return false;}
  dadosExemplo.listaAtiva.itens.unshift({nome,detalhe:'',origem:origem||'',comprado:false});
  return true;
}
function adicionarCompra(evento){
  evento.preventDefault();
  const campo = $('#novoItem');
  const nome = campo.value.trim();
  if(!nome) return;
  if(adicionarItemNaLista(nome,'adicionado agora')) notify(`${nome} entrou na lista.`);
  campo.value='';
  atualizarTudo();
  $('#novoItem')?.focus();
}
function focarNovoItem(){const c=$('#novoItem');if(c){c.scrollIntoView({block:'center'});c.focus();}}
function focarLancamento(){const c=$('#lancValor');if(c){c.scrollIntoView({block:'center'});c.focus();}}
function jogarNaLista(nome){
  if(adicionarItemNaLista(nome,'veio da despensa')) notify(`${nome} entrou na lista de compras.`);
  atualizarTudo();
}
function usarLista(nomeDaLista){
  const salva = dadosExemplo.listasSalvas.find(s=>s.nome===nomeDaLista);
  if(!salva) return;
  let entraram = 0;
  salva.itens.forEach(i=>{if(adicionarItemNaLista(i,'de '+salva.nome)) entraram++;});
  notify(entraram?`${entraram} ${entraram===1?'item entrou':'itens entraram'} na lista.`:'Tudo dessa lista já estava lá.');
  atualizarTudo();
}
function marcarLido(id){
  const a = dadosExemplo.avisos.find(a=>a.id===id);
  if(!a) return;
  a.lido = true;
  atualizarTudo();
}
function acaoDoAviso(id){
  const a = dadosExemplo.avisos.find(a=>a.id===id);
  if(!a||!a.acao) return;
  const [tipo,valor] = String(a.acao.cmd).split(':');
  if(tipo==='lista') jogarNaLista(valor);
  if(tipo==='assumir') assumirTarefa(valor);
  a.lido = true;
  delete a.acao;
  atualizarTudo();
}
/* --- dinheiro --- */
function trocarOlho(quem){
  verComo = quem;
  atualizarTudo();
  notify(`Agora você está vendo como ${nomeDe(quem)}.`);
}
function alternarPagamento(id){
  const c = dadosExemplo.dinheiro.aPagar.find(c=>c.id===id);
  if(!c) return;
  c.pago = !c.pago;
  notify(c.pago?`${c.descricao} marcada como paga.`:`${c.descricao} voltou para as contas em aberto.`);
  atualizarTudo();
}
function escolherNivel(id){
  nivelNovo = id;
  redesenhar('dinheiro');
  $('#lancValor')?.focus();
}
function alternarPagas(){mostrarPagas=!mostrarPagas;redesenhar('dinheiro');}
function alternarTudo(){mostrarTudo=!mostrarTudo;redesenhar('dinheiro');}

// Três toques: quanto, o que foi, lançar. Quem lançou e a data o sistema
// preenche; o nível de visibilidade já vem escolhido e muda com um toque.
function lancarDinheiro(evento){
  evento.preventDefault();
  const valor = Number($('#lancValor').value.trim().replace(/\./g,'').replace(',','.'));
  const descricao = $('#lancDesc').value.trim();
  if(!valor||valor<=0){$('#lancValor').focus();notify('Falta o valor.');return;}
  if(!descricao){$('#lancDesc').focus();notify('Falta dizer o que foi.');return;}
  const quem = verComo;
  dadosExemplo.dinheiro.lancamentos.unshift({
    id:'l'+Date.now(), tipo:'saida', descricao, valor, quem,
    conta: dadosExemplo.dinheiro.contas.find(c=>c.dono===quem)?.id||'cc-casa',
    dia: String(new Date().getDate()).padStart(2,'0'),
    visibilidade: nivelNovo
  });
  notify(`${descricao} — ${brl(valor)}.`);
  atualizarTudo();
  $('#lancValor')?.focus();
}

function abrirNovaTarefa(){$('#taskDialog').showModal();$('#taskName').focus();}
function criarTarefa(evento){
  evento.preventDefault();
  const titulo = $('#taskName').value.trim();
  if(!titulo) return;
  registrarTarefa(titulo, $('#taskDue').value.trim());
  notify(`Tarefa criada: ${titulo}.`);
  evento.target.reset();
  $('#taskDialog').close();
  atualizarTudo();
}
// Usada também pelo assistente quando ele transforma uma frase em tarefa.
function registrarTarefa(titulo,prazo){
  dadosExemplo.tarefas.unshift({
    id:'t'+Date.now(), titulo, responsavel:null,
    prazo: prazo||'sem prazo', hoje: /hoje/i.test(prazo||''), repete:'', concluida:false
  });
}
function trocarAba(botao,alvo){
  const tela = botao.closest('.view');
  tela.querySelectorAll('[data-aba]').forEach(b=>{
    const ativa = b===botao;
    b.classList.toggle('ativa',ativa);
    b.setAttribute('aria-selected',String(ativa));
  });
  tela.querySelectorAll('[data-painel]').forEach(p=>{p.hidden = p.dataset.painel!==alvo;});
  tela.closest('.window-content')?.scrollTo({top:0});
}

/* ------------------------------------------- deslizar para concluir ----
   Gesto que a pessoa já conhece de aplicativo de e-mail e de mensagem.
   Só no toque, e só na horizontal: se o dedo for para cima ou para baixo,
   a rolagem ganha e o gesto é cancelado.                                  */
function ligarDeslizar(){
  let linha=null, x0=0, y0=0, dx=0, decidiu=false, valendo=false;
  const alvoDe = el => el.closest('[data-deslizar]');
  document.addEventListener('pointerdown',e=>{
    if(!semPonteiro()||e.button!==0||e.target.closest('button')) return;
    const el = alvoDe(e.target); if(!el) return;
    linha=el; x0=e.clientX; y0=e.clientY; dx=0; decidiu=false; valendo=false;
  },{passive:true});
  document.addEventListener('pointermove',e=>{
    if(!linha) return;
    const ax=e.clientX-x0, ay=e.clientY-y0;
    if(!decidiu){
      if(Math.abs(ax)<8&&Math.abs(ay)<8) return;
      decidiu=true; valendo=Math.abs(ax)>Math.abs(ay);
      if(valendo) linha.classList.add('deslizando');
    }
    if(!valendo) return;
    dx=Math.max(-20,Math.min(140,ax));
    linha.style.transform=`translateX(${dx}px)`;
    linha.classList.toggle('vai-concluir',dx>70);
  },{passive:true});
  const soltar=()=>{
    if(!linha) return;
    const el=linha, passou=dx>70;
    el.style.transform=''; el.classList.remove('deslizando','vai-concluir');
    linha=null;
    if(!passou) return;
    const [tipo,valor]=String(el.dataset.deslizar).split(/:(.+)/);
    if(tipo==='tarefa') alternarTarefa(valor);
    if(tipo==='compra') alternarCompra(valor);
  };
  document.addEventListener('pointerup',soltar,{passive:true});
  document.addEventListener('pointercancel',soltar,{passive:true});
}

/* ------------------------------------------------------- montar/atualizar */
const telas = {hoje:telaHoje, dinheiro:telaDinheiro, tarefas:telaTarefas, compras:telaCompras,
               comida:telaComida, agenda:telaAgenda, avisos:telaAvisos,
               documentos:telaDocumentos, viagens:telaViagens};

function redesenhar(id){
  const alvo = document.getElementById(id);
  if(!alvo||!telas[id]) return;
  // Preserva a aba aberta em Compras ao redesenhar.
  const abaAtiva = alvo.querySelector('[data-aba].ativa')?.dataset.aba;
  alvo.innerHTML = telas[id]();
  if(abaAtiva&&abaAtiva!=='lista'){
    const botao = alvo.querySelector(`[data-aba="${abaAtiva}"]`);
    if(botao) trocarAba(botao,abaAtiva);
  }
}
function atualizarTudo(){
  Object.keys(telas).forEach(redesenhar);
  Object.keys(widgetTypes).forEach(id=>{if(prefs.widgets[id])refreshWidget(id);});
  pintarSaudacao();
  pintarContador();
}
// Contador no ícone de Avisos, como em qualquer aplicativo de celular.
function pintarContador(){
  const n = avisosNaoLidos().length;
  document.querySelectorAll('[data-app="avisos"]').forEach(b=>{
    let selo = b.querySelector('.app-badge');
    if(!n){ selo?.remove(); return; }
    if(!selo){ selo=document.createElement('span'); selo.className='app-badge'; b.append(selo); }
    selo.textContent = n>9?'9+':String(n);
    selo.setAttribute('aria-label',`${n} avisos novos`);
  });
}
function pintarSaudacao(){
  const f = dadosExemplo.familia;
  const u = membro(dadosExemplo.hoje.usuario);
  const hora = new Date().getHours();
  const s = dadosExemplo.hoje.saudacoes;
  $('#desktopEyebrow').textContent = `CASA DA FAMÍLIA ${f.nome.toLocaleUpperCase('pt-BR')}`;
  $('#desktopTitle').textContent = `${hora<12?s.manha:hora<18?s.tarde:s.noite}${u?', '+u.nome:''}.`;
  const sub = $('#loginSubtitle');
  if(sub) sub.textContent = `Veja o que a família ${f.nome} combinou para hoje.`;
}
// Gancho chamado por openApp() no desktop.js.
function aoAbrirApp(id){
  if(telas[id]) redesenhar(id);
  if(id==='assistente'&&typeof aoAbrirAssistente==='function') aoAbrirAssistente();
}
function montarTelas(){
  for(const [id,montar] of Object.entries(telas)){
    const div = document.createElement('div');
    div.id = id;
    div.className = 'view casa-view';
    div.innerHTML = montar();
    $('#appStorage').append(div);
  }
}
montarTelas();
pintarSaudacao();
pintarContador();
ligarDeslizar();
