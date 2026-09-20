'use strict';
/* ==========================================================================
   casa-apps.js — seis das sete telas do Casa. A sétima, o Assistente,
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
const selecao = { tarefas:null };

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
        <span class="casa-icone-aviso ${esc(a.tipo)}" aria-hidden="true">${svg({despensa:'box',conta:'wallet',tarefa:'tasks',agenda:'calendar'}[a.tipo]||'bell')}</span>
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

/* ------------------------------------------------------------- ações   */
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
const telas = {hoje:telaHoje, dinheiro:telaDinheiro, tarefas:telaTarefas, compras:telaCompras, agenda:telaAgenda, avisos:telaAvisos};

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
