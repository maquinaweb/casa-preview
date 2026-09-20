'use strict';
/* ==========================================================================
   assistente.js — a tela do agente da família.

   Não existe modelo de IA aqui. É uma conversa encenada com as frases de
   `dadosExemplo.assistente`, para mostrar três coisas:
     1. ele responde sobre a casa;
     2. ele registra pelo texto — e o registro aparece de verdade nas outras
        telas (Compras e Tarefas mudam junto);
     3. ele avisa sem ser chamado.
   Mais duas regras visíveis: pede confirmação antes de apagar, e não conta
   o que a pessoa não pode ver.
   ========================================================================== */

// Cópia de trabalho: a conversa cresce durante a demonstração e volta ao
// original quando a pessoa toca em "recomeçar".
let conversaAtual = dadosExemplo.assistente.conversa.map(m=>({...m}));

function horaAgora(){return new Intl.DateTimeFormat('pt-BR',{hour:'2-digit',minute:'2-digit'}).format(new Date());}

/* Os valores de dinheiro no texto do agente são escritos como {entrou},
   {saiu} e {aPagar} nos dados, e calculados aqui na hora — do ponto de vista
   de quem está falando com ele. Assim o número nunca fica velho quando o
   dono editar `dados-exemplo.js`, e nunca mostra mais do que a permissão. */
function comValores(texto,quemFala){
  const r = resumoDinheiro(quemFala);
  return String(texto||'')
    .replace(/\{entrou\}/g,brl(r.entrou))
    .replace(/\{saiu\}/g,brl(r.saiu))
    .replace(/\{aPagar\}/g,brl(r.aPagar))
    .replace(/\{sobra\}/g,brl(r.sobra));
}
// listaAuto:'aPagar' monta a lista das contas em aberto na hora.
function listaAutomatica(nome){
  if(nome!=='aPagar') return null;
  return contasAVencer(99).map(c=>`${c.descricao} — ${brl(c.valor)} · ${rotuloVencimento(c.emDias)}`);
}

function bolha(m){
  const doAgente = m.de==='agente';
  const quem = doAgente ? null : membro(m.de);
  // O agente responde com a permissão de QUEM PERGUNTOU — é a mensagem
  // logo acima da dele na conversa.
  const perguntou = doAgente
    ? (conversaAtual[m.indice-1]?.de && conversaAtual[m.indice-1].de!=='agente'
        ? conversaAtual[m.indice-1].de : dadosExemplo.hoje.usuario)
    : m.de;
  const classes = ['casa-bolha', doAgente?'agente':'pessoa', m.tipo||'', m.cadeado?'cadeado':''].filter(Boolean).join(' ');
  return `
  <div class="${classes}">
    <div class="casa-bolha-topo">
      ${doAgente
        ? `<span class="casa-inicial agente" aria-hidden="true">${svg('spark')}</span><b>${esc(dadosExemplo.assistente.nome)}</b>`
        : `<span class="casa-inicial" style="background:${quem?quem.cor:'#999'}" aria-hidden="true">${esc(quem?quem.inicial:'?')}</span><b>${esc(quem?quem.nome:m.de)}</b>`}
      ${m.tipo==='proativo'?'<span class="casa-tag proativo">avisou sozinho</span>':''}
      ${m.cadeado?`<span class="casa-tag cadeado">${svg('lock')}não pode mostrar</span>`:''}
      <span class="casa-hora-bolha">${esc(m.hora||horaAgora())}</span>
    </div>
    <p>${esc(comValores(m.texto,perguntou))}</p>
    ${(()=>{const lista=m.lista||listaAutomatica(m.listaAuto);
      return lista?`<ul class="casa-bolha-lista">${lista.map(l=>`<li>${esc(comValores(l,perguntou))}</li>`).join('')}</ul>`:'';})()}
    ${m.nota?`<p class="casa-bolha-nota">${svg('lock')}<span>${esc(m.nota)}</span></p>`:''}
    ${m.cartao?`
      <div class="casa-registro">
        <span class="casa-registro-icone ${esc(m.cartao.tipo)}" aria-hidden="true">${svg(m.cartao.tipo==='compras'?'cart':'tasks')}</span>
        <div><b>${esc(m.cartao.titulo)}</b><span>${esc(m.cartao.detalhe)}</span></div>
        <span class="casa-registro-ok">${svg('check')}registrado</span>
      </div>`:''}
    ${m.tipo==='confirmacao'&&!m.respondida?`
      <div class="casa-confirmacao">
        <span>${svg('lock')}Apagar é definitivo. O agente não faz sozinho.</span>
        <div>
          <button class="casa-botao-min destaque" onclick="responderConfirmacao(${m.indice},true)">Pode apagar</button>
          <button class="casa-botao-min" onclick="responderConfirmacao(${m.indice},false)">Deixa como está</button>
        </div>
      </div>`:''}
  </div>`;
}

function telaAssistente(){
  return `
  <div class="panel-header"><h2>${esc(dadosExemplo.assistente.nome)}</h2><button class="link-button" onclick="recomecarConversa()">recomeçar</button></div>
  <div class="casa-corpo">
    <div class="casa-conversa" id="conversa">${conversaAtual.map((m,i)=>bolha({...m,indice:i})).join('')}</div>
    <div class="casa-sugestoes" aria-label="Frases de exemplo">
      <span class="casa-sugestoes-titulo">experimente perguntar</span>
      ${dadosExemplo.assistente.sugestoes.map((s,i)=>`<button class="casa-sugestao" onclick="usarSugestao(${i})">${esc(s.texto)}</button>`).join('')}
    </div>
    <form class="casa-composer" onsubmit="falarComAgente(event)">
      <input id="falaAgente" aria-label="Escreva para o assistente" placeholder="Escreva como você falaria no WhatsApp" maxlength="140" autocomplete="off">
      <button class="small-button" type="submit" aria-label="Enviar">${svg('arrow')}<span class="so-desktop">Enviar</span></button>
    </form>
  </div>
  <p class="casa-rodape">No sistema pronto essa conversa acontece no aplicativo de mensagem que a família já usa
  todo dia; esta janela é só para quem preferir aqui dentro. Conversa encenada, com frases escritas à mão —
  mas o que ele registra aparece de verdade nas telas de Compras, Tarefas e Dinheiro.</p>`;
}

function redesenharAssistente(rolar){
  const alvo = document.getElementById('assistente');
  if(!alvo) return;
  alvo.innerHTML = telaAssistente();
  if(rolar!==false) rolarConversa();
}
function rolarConversa(){
  const caixa = document.getElementById('conversa');
  if(caixa) caixa.scrollTop = caixa.scrollHeight;
}
function aoAbrirAssistente(){redesenharAssistente(true);}

function dizer(m){conversaAtual.push(m);}

/* Aplica o efeito de uma fala: cria item de compra ou tarefa de verdade. */
function aplicarAcao(acao,textoDigitado){
  if(!acao) return;
  const [tipo,resto] = String(acao).split(':');
  if(tipo==='compra'){
    adicionarItemNaLista(resto,'o assistente colocou');
    notify(`${resto} entrou na lista de compras.`);
  }
  if(tipo==='tarefa'){
    const [titulo,prazo] = String(resto).split('|');
    registrarTarefa(titulo,prazo||'sem prazo');
    notify(`Tarefa criada: ${titulo}.`);
  }
  if(tipo==='auto-compra'){
    // Veio de texto livre: usa a última palavra com mais de três letras.
    const nome = palavraItem(textoDigitado);
    adicionarItemNaLista(nome,'o assistente colocou');
    notify(`${nome} entrou na lista de compras.`);
    return {tipo:'compras',titulo:nome,detalhe:'entrou em '+dadosExemplo.listaAtiva.nome};
  }
  if(tipo==='auto-tarefa'){
    const titulo = textoDigitado.charAt(0).toLocaleUpperCase('pt-BR')+textoDigitado.slice(1);
    registrarTarefa(titulo,'sem prazo');
    notify('Tarefa criada.');
    return {tipo:'tarefa',titulo,detalhe:'sem prazo · sem responsável'};
  }
}
function palavraItem(frase){
  const palavras = String(frase).replace(/[.,!?]/g,'').split(/\s+/).filter(p=>p.length>3);
  const nome = palavras[palavras.length-1] || String(frase).trim() || 'Item';
  return nome.charAt(0).toLocaleUpperCase('pt-BR')+nome.slice(1);
}

function usarSugestao(indice){
  const s = dadosExemplo.assistente.sugestoes[indice];
  if(!s) return;
  dizer({de:dadosExemplo.hoje.usuario, hora:horaAgora(), texto:s.texto});
  aplicarAcao(s.acao);
  dizer({de:'agente', hora:horaAgora(), texto:s.resposta, lista:s.lista, listaAuto:s.listaAuto, nota:s.nota, cartao:s.cartao});
  atualizarTudo();
  redesenharAssistente(true);
}

function falarComAgente(evento){
  evento.preventDefault();
  const campo = $('#falaAgente');
  const texto = campo.value.trim();
  if(!texto) return;
  campo.value = '';
  dizer({de:dadosExemplo.hoje.usuario, hora:horaAgora(), texto});

  const alvo = texto.toLocaleLowerCase('pt-BR');
  const regra = dadosExemplo.assistente.respostasLivres.find(r=>r.palavras.some(p=>alvo.includes(p)));
  if(!regra){
    dizer({de:'agente', hora:horaAgora(), texto:dadosExemplo.assistente.semResposta});
  }else{
    const cartao = regra.acaoAuto ? aplicarAcao('auto-'+regra.acaoAuto, texto) : null;
    dizer({de:'agente', hora:horaAgora(), texto:regra.resposta, lista:regra.lista, listaAuto:regra.listaAuto, nota:regra.nota, cartao, cadeado:regra.cadeado});
  }
  atualizarTudo();
  redesenharAssistente(true);
}

function responderConfirmacao(indice,confirmou){
  const m = conversaAtual[indice];
  if(!m||m.respondida) return;
  m.respondida = true;
  dizer({de:dadosExemplo.hoje.usuario, hora:horaAgora(), texto:confirmou?'pode apagar':'deixa como está'});
  dizer({de:'agente', hora:horaAgora(), texto:confirmou?m.confirmar:m.cancelar});
  if(confirmou){
    // Só agora ele apaga — e apaga de verdade, na tela de Tarefas.
    const alvo = dadosExemplo.tarefas.findIndex(t=>m.confirmar.includes(t.titulo));
    if(alvo>=0) dadosExemplo.tarefas.splice(alvo,1);
    notify('Tarefa apagada pelo assistente, depois do seu sim.');
  }
  atualizarTudo();
  redesenharAssistente(true);
}

function recomecarConversa(){
  conversaAtual = dadosExemplo.assistente.conversa.map(m=>({...m, respondida:false}));
  redesenharAssistente(true);
  notify('Conversa voltou ao começo.');
}

// Monta a tela e a guarda junto das outras, no mesmo sistema de janelas.
(function montarAssistente(){
  const div = document.createElement('div');
  div.id = 'assistente';
  div.className = 'view casa-view';
  div.innerHTML = telaAssistente();
  $('#appStorage').append(div);
})();
