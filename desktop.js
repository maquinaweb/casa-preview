'use strict';
const $ = s => document.querySelector(s);
const icons = {
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
 lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 2v3"/>',
 arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
 desktop:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
 tasks:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="m8 9 1 1 2-2m2 1h3M8 14h8M8 17h5"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 10h18M7 14h2m4 0h2m2 0h1M7 17h2m4 0h2"/>',
 finance:'<path d="M4 20V11m5 9V7m5 13v-6m5 6V4M3 20h18"/>',
 folder:'<path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M7 13h10m-10 4h7"/>',
 chat:'<path d="M21 11a8 8 0 0 1-8 8H8l-5 3v-8a8 8 0 0 1 8-8h2a8 8 0 0 1 8 5Z"/><path d="M7 11h10m-10 4h6"/>',
 sliders:'<path d="M4 6h5m4 0h7M4 12h9m4 0h3M4 18h2m4 0h10"/><circle cx="11" cy="6" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="8" cy="18" r="2"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 grip:'<path d="M9 5h.01M15 5h.01M9 12h.01M15 12h.01M9 19h.01M15 19h.01" stroke-width="3"/>',
 upload:'<path d="M12 16V3m-4 4 4-4 4 4M4 15v5h16v-5"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
 casa:'<path d="M4 11 12 4l8 7v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M10 21v-6h4v6"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M19 5l-1.5 1.5m-11 11L5 19"/>',
 cart:'<circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.5L21 8H6"/>',
 box:'<path d="M3 8 12 4l9 4v8l-9 4-9-4Z"/><path d="m3 8 9 4 9-4M12 12v8"/>',
 bell:'<path d="M18 9a6 6 0 1 0-12 0c0 6-2.5 6-2.5 8h17c0-2-2.5-2-2.5-8"/><path d="M10 21h4"/>',
 spark:'<path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.4l-1.9-5.6L4.5 11 10.1 9Z"/><path d="M18.5 3.5v3m1.5-1.5h-3"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 repeat:'<path d="M4 9a5 5 0 0 1 5-5h9m0 0-3-3m3 3-3 3"/><path d="M20 15a5 5 0 0 1-5 5H6m0 0 3 3m-3-3 3-3"/>',
 wallet:'<path d="M3 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1"/><rect x="3" y="8" width="18" height="12" rx="3"/><path d="M16 14h2"/>',
 doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5M9 13h6m-6 4h4"/>',
 plane:'<path d="M10.5 13.5 3 11l18-7-7 18-2.5-7.5Z"/><path d="m10.5 13.5 4-4"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4.5 4.5"/>',
 chevron:'<path d="m9 5 7 7-7 7"/>',
 prato:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4"/>',
 fora:'<path d="M5 3v8a3 3 0 0 0 6 0V3M8 11v10"/><path d="M17 3c-1.5 2-2 4-2 6s.7 3 2 3 2-1 2-3-.5-4-2-6Zm0 9v9"/>'
};
function svg(name){return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]||icons.desktop}</svg>`;}
document.querySelectorAll('[data-icon]').forEach(e=>e.innerHTML=svg(e.dataset.icon));
// Os dez aplicativos do Casa, mais os dois do sistema (ajustes e perfil).
const apps=[
 {id:'inicio',name:'Casa',icon:'casa',colors:['#e0a469','#bb6b45']},
 {id:'hoje',name:'Hoje',icon:'sun',colors:['#f3bd72','#dd8a4e']},
 {id:'dinheiro',name:'Dinheiro',icon:'wallet',colors:['#7fc0b3','#3d8b7e']},
 {id:'tarefas',name:'Tarefas',icon:'tasks',colors:['#8fc7a8','#3f8f73']},
 {id:'compras',name:'Compras',icon:'cart',colors:['#8bb8d6','#4a7ea6']},
 {id:'agenda',name:'Agenda',icon:'calendar',colors:['#e5a0a0','#c06a6f']},
 {id:'avisos',name:'Avisos',icon:'bell',colors:['#c6a4d8','#8e63b0']},
 {id:'comida',name:'Comida',icon:'prato',colors:['#e8ab8e','#c46f52']},
 {id:'documentos',name:'Documentos',icon:'doc',colors:['#a9b6cc','#61708f']},
 {id:'viagens',name:'Viagens',icon:'plane',colors:['#8fc2d8','#4d8fa8']},
 {id:'assistente',name:'Assistente',icon:'spark',colors:['#d9bb7e','#b08b56']},
 {id:'ajustes',name:'Ajustes',icon:'sliders',colors:['#b6a99c','#7d7268']},
 {id:'perfil',name:'Meu perfil',icon:'user',colors:['#efcfa9','#b68b73'],launcher:false}
];
const widgetTypes={hoje:{title:'Hoje na casa',icon:'sun'},dinheiro:{title:'Dinheiro do mês',icon:'wallet'},tarefas:{title:'Tarefas de hoje',icon:'tasks'},compras:{title:'Lista de compras',icon:'cart'},agenda:{title:'Próximos',icon:'calendar'},avisos:{title:'Avisos',icon:'bell'}};
const defaultPrefs=()=>({wallpaper:'oceano',customImage:null,glass:12,widgets:{hoje:true,dinheiro:true,tarefas:true,compras:true,agenda:false,avisos:false},positions:{},dockMagnify:true});
let prefs=defaultPrefs();
try{const saved=JSON.parse(localStorage.getItem('casa.mesa.v1')||'null');if(saved&&typeof saved==='object'){prefs={...prefs,...saved,widgets:{...prefs.widgets,...saved.widgets},positions:saved.positions||{}};if(!['oceano','aurora','grafite','entardecer','custom'].includes(prefs.wallpaper))prefs.wallpaper='oceano';prefs.glass=Math.max(5,Math.min(35,Number(prefs.glass)||12));if(typeof prefs.customImage!=='string'||!/^data:image\/(png|jpeg|webp);base64,/.test(prefs.customImage))prefs.customImage=null;}}
catch{}
const windows=new Map();let z=10;let focusedId=null;let desktopSnapshot=[];
function esc(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function notify(text){$('#toast').textContent=text;$('#toast').classList.add('visible');clearTimeout(notify.timer);notify.timer=setTimeout(()=>$('#toast').classList.remove('visible'),3200);}
function savePrefs(){try{localStorage.setItem('casa.mesa.v1',JSON.stringify(prefs));return true;}catch{notify('Não foi possível salvar. Tente uma imagem menor ou permita o armazenamento do navegador.');return false;}}
/* Três formatos, não dois. O layout original só perguntava "é celular?",
   e respondia pela largura — o que joga um celular dobrável aberto (~717 a
   884px) e um tablet em retrato (~768 a 834px) no modo de computador, com
   janela arrastável e dock que amplia no ponteiro. Esses aparelhos são
   toque com tela grande. Então:
     isMobile()    até 680px  — uma coluna, tela cheia
     isTablet()    681–1180   — toque com espaço: duas colunas, barra de abas
     semPonteiro() até 1180   — NÃO tem mouse: nada de arrastar nem de ampliar
   Acima de 1180px é a mesa do Layout Operacional, intacta.               */
function isMobile(){return matchMedia('(max-width:680px)').matches;}
function isTablet(){return matchMedia('(min-width:681px) and (max-width:1180px)').matches;}
function semPonteiro(){return matchMedia('(max-width:1180px)').matches;}
function iconButton(app,inDock){return `<button class="app-button" data-app="${app.id}" onclick="${app.id==='inicio'?'showDesktop()':`openApp('${app.id}')`}" aria-label="${app.id==='inicio'?'Mostrar a tela inicial':`Abrir ${app.name}`}"><span class="app-icon" style="--icon-a:${app.colors[0]};--icon-b:${app.colors[1]}">${svg(app.icon)}</span><span class="app-label">${app.name}</span></button>`;}
$('#dock').innerHTML=apps.filter(a=>a.launcher!==false).map(a=>(a.id==='ajustes'?'<span class="dock-divider" aria-hidden="true"></span>':'')+iconButton(a,true)).join('');
$('#desktopApps').innerHTML=apps.filter(a=>a.launcher!==false&&a.id!=='inicio'&&a.id!=='ajustes').map(a=>iconButton(a,false)).join('');
function updateDock(){document.querySelectorAll('#dock .app-button').forEach(button=>{const w=windows.get(button.dataset.app);button.classList.toggle('running',!!w);button.classList.toggle('minimized',!!w?.minimized);button.classList.toggle('active',button.dataset.app===focusedId);button.setAttribute('aria-label',button.dataset.app==='inicio'?'Mostrar a tela inicial':`${w?.minimized?'Restaurar':w?'Ativar':'Abrir'} ${apps.find(a=>a.id===button.dataset.app).name}`);});$('#activeApp').textContent=focusedId?apps.find(a=>a.id===focusedId).name:'Início';}
function measureArea(){const area=$('#windows');return {width:area.clientWidth,height:area.clientHeight};}
function clampWindow(w){if(semPonteiro()||w.maximized)return;const area=measureArea();w.width=Math.max(Math.min(380,area.width-16),Math.min(w.width,area.width-16));w.height=Math.max(Math.min(260,area.height-16),Math.min(w.height,area.height-16));w.x=Math.max(8,Math.min(w.x,area.width-w.width-8));w.y=Math.max(8,Math.min(w.y,area.height-w.height-8));positionWindow(w);}
function positionWindow(w){Object.assign(w.el.style,{left:w.x+'px',top:w.y+'px',width:w.width+'px',height:w.height+'px'});}
function focusWindow(id,keyboard=false){const w=windows.get(id);if(!w)return;w.minimized=false;w.el.hidden=false;focusedId=id;w.el.style.zIndex=++z;windows.forEach(item=>item.el.classList.toggle('focused',item.id===id));updateDock();if(keyboard)w.el.querySelector('.window-titlebar').focus({preventScroll:true});}
function focusNext(){const next=[...windows.values()].filter(w=>!w.minimized).sort((a,b)=>Number(b.el.style.zIndex)-Number(a.el.style.zIndex))[0];if(next)focusWindow(next.id);else{focusedId=null;updateDock();}}
function openApp(id){if(id==='inicio'){showDesktop();return;}const app=apps.find(a=>a.id===id);if(!app)return;if(windows.has(id)){focusWindow(id,true);return;}if(id==='ajustes'&&!$('#ajustes'))createSettings();if(id==='perfil'&&!$('#perfil'))createUserProfile();const content=document.getElementById(id);if(!content)return;const area=measureArea();const count=windows.size;const width=Math.min(['ajustes','perfil'].includes(id)?590:820,area.width-60);const height=Math.min(['ajustes','perfil'].includes(id)?650:535,area.height-35);const x=Math.max(20,(area.width-width)/2+((count%4)-1)*24);const y=Math.max(12,35+(count%4)*27);
 const el=document.createElement('section');el.className='app-window';el.setAttribute('role','region');el.setAttribute('aria-label',`Janela: ${app.name}`);el.dataset.window=id;
 el.innerHTML=`<header class="window-titlebar" tabindex="0" aria-label="Mover janela ${app.name}. Use as setas quando selecionada; Enter maximiza."><div class="window-controls"><button class="win-close" title="Fechar" aria-label="Fechar ${app.name}"><span>×</span></button><button class="win-min" title="Minimizar" aria-label="Minimizar ${app.name}"><span>−</span></button><button class="win-max" title="Maximizar ou restaurar" aria-label="Maximizar ${app.name}"><span>+</span></button></div><span class="window-title">${svg(app.icon)}${app.name}</span><span class="window-caption">Casa · demonstração</span></header><div class="window-content"></div><button class="window-resize" aria-label="Redimensionar ${app.name}. Use as setas quando selecionado." title="Arraste para redimensionar"></button>`;
 const w={id,el,x,y,width,height,minimized:false,maximized:false};windows.set(id,w);el.querySelector('.window-content').append(content);$('#windows').append(el);clampWindow(w);el.addEventListener('pointerdown',()=>focusWindow(id));el.addEventListener('focusin',()=>{if(focusedId!==id)focusWindow(id);});el.querySelector('.win-close').onclick=()=>closeWindow(id);el.querySelector('.win-min').onclick=()=>minimizeWindow(id);el.querySelector('.win-max').onclick=()=>toggleMaximize(id);
 const bar=el.querySelector('.window-titlebar');bar.addEventListener('dblclick',e=>{if(!e.target.closest('button'))toggleMaximize(id);});bar.addEventListener('pointerdown',e=>startWindowGesture(e,w,false));el.querySelector('.window-resize').addEventListener('pointerdown',e=>startWindowGesture(e,w,true));
 bar.addEventListener('keydown',e=>{if(e.target!==bar)return;if(e.key==='Enter'){e.preventDefault();toggleMaximize(id);}if(e.key.startsWith('Arrow')&&!semPonteiro()&&!w.maximized){e.preventDefault();const step=e.shiftKey?40:10;w.x+=e.key==='ArrowRight'?step:e.key==='ArrowLeft'?-step:0;w.y+=e.key==='ArrowDown'?step:e.key==='ArrowUp'?-step:0;clampWindow(w);}});
 el.querySelector('.window-resize').addEventListener('keydown',e=>{if(!e.key.startsWith('Arrow')||w.maximized||semPonteiro())return;e.preventDefault();w.width+=e.key==='ArrowRight'?20:e.key==='ArrowLeft'?-20:0;w.height+=e.key==='ArrowDown'?20:e.key==='ArrowUp'?-20:0;clampWindow(w);});focusWindow(id,true);
 // Gancho genérico: casa-apps.js decide o que fazer ao abrir cada tela.
 // Evita ter que mexer nesta rotina de novo a cada aplicativo novo.
 if(typeof aoAbrirApp==='function')aoAbrirApp(id);
}
function focusLauncher(id){const launcher=id==='perfil'?$('#userMenu'):document.querySelector(`#dock [data-app="${id}"]`);launcher?.focus({preventScroll:true});}
function closeWindow(id){const w=windows.get(id);if(!w)return;$('#appStorage').append(document.getElementById(id));w.el.remove();windows.delete(id);desktopSnapshot=desktopSnapshot.filter(x=>x!==id);if(focusedId===id)focusNext();updateDock();focusLauncher(id);}
function minimizeWindow(id){const w=windows.get(id);if(!w)return;w.minimized=true;w.el.hidden=true;if(focusedId===id)focusNext();updateDock();focusLauncher(id);}
function toggleMaximize(id){const w=windows.get(id);if(!w)return;w.maximized=!w.maximized;w.el.classList.toggle('maximized',w.maximized);w.el.querySelector('.win-max').setAttribute('aria-label',`${w.maximized?'Restaurar':'Maximizar'} ${apps.find(a=>a.id===id).name}`);if(!w.maximized)clampWindow(w);focusWindow(id);}
function showDesktop(){const visible=[...windows.values()].filter(w=>!w.minimized);if(visible.length){desktopSnapshot=visible.sort((a,b)=>Number(a.el.style.zIndex)-Number(b.el.style.zIndex)).map(w=>w.id);visible.forEach(w=>{w.minimized=true;w.el.hidden=true;});focusedId=null;updateDock();}else if(desktopSnapshot.length){desktopSnapshot.forEach(id=>{if(windows.has(id))focusWindow(id);});desktopSnapshot=[];}document.querySelector('#dock [data-app="inicio"]').focus({preventScroll:true});}
function startWindowGesture(e,w,resize){if(e.button!==0||semPonteiro()||w.maximized||(!resize&&e.target.closest('button')))return;e.preventDefault();focusWindow(w.id);const start={x:e.clientX,y:e.clientY,left:w.x,top:w.y,width:w.width,height:w.height};const handle=e.currentTarget;handle.setPointerCapture(e.pointerId);w.el.classList.add('dragging');const move=event=>{if(resize){w.width=start.width+event.clientX-start.x;w.height=start.height+event.clientY-start.y;}else{w.x=start.left+event.clientX-start.x;w.y=start.top+event.clientY-start.y;}clampWindow(w);};const end=()=>{w.el.classList.remove('dragging');handle.removeEventListener('pointermove',move);handle.removeEventListener('pointerup',end);handle.removeEventListener('pointercancel',end);};handle.addEventListener('pointermove',move);handle.addEventListener('pointerup',end);handle.addEventListener('pointercancel',end);}
const dock=$('#dock'),dockZone=$('#dockZone');
function resetDock(){dock.querySelectorAll('.app-button').forEach(b=>{b.style.setProperty('--scale','1');b.style.setProperty('--lift','0px');b.style.setProperty('--shift','0px');});}
dockZone.addEventListener('pointermove',e=>{if(semPonteiro()||!prefs.dockMagnify||e.pointerType==='touch')return;const bounds=dock.getBoundingClientRect();const buttons=[...dock.querySelectorAll('.app-button')];const strengths=buttons.map(b=>{const center=bounds.left+b.offsetLeft+b.offsetWidth/2;const d=Math.abs(e.clientX-center);return d<145?(1+Math.cos(d/145*Math.PI))/2:0;});buttons.forEach((b,i)=>{const strength=strengths[i];const shift=buttons.reduce((sum,_,j)=>sum+(j<i?1:j>i?-1:0)*strengths[j]*10,0);b.style.setProperty('--scale',String(1+strength*.58));b.style.setProperty('--lift',strength*9+'px');b.style.setProperty('--shift',shift+'px');});});dockZone.addEventListener('pointerleave',resetDock);
// Atalhos de leitura dos dados de exemplo. Usados pelos widgets e pelas telas.
function membro(id){return dadosExemplo.familia.membros.find(m=>m.id===id)||null;}
function nomeDe(id){return membro(id)?.nome||'livre';}
function tarefasDeHoje(){return dadosExemplo.tarefas.filter(t=>t.hoje&&!t.concluida);}
function emFalta(){return dadosExemplo.despensa.filter(i=>i.situacao==='falta');}
function noFim(){return dadosExemplo.despensa.filter(i=>i.situacao==='pouco');}
function comprasAbertas(){return dadosExemplo.listaAtiva.itens.filter(i=>!i.comprado);}
function avisosNaoLidos(){return dadosExemplo.avisos.filter(a=>!a.lido);}
function diaRelativo(emDias){const d=new Date();d.setDate(d.getDate()+Number(emDias||0));return d;}
function rotuloDoDia(emDias){if(Number(emDias)===0)return 'Hoje';if(Number(emDias)===1)return 'Amanhã';const nome=new Intl.DateTimeFormat('pt-BR',{weekday:'long'}).format(diaRelativo(emDias));return nome.charAt(0).toLocaleUpperCase('pt-BR')+nome.slice(1);}
function dataDoDia(emDias){return new Intl.DateTimeFormat('pt-BR',{weekday:'long',day:'numeric',month:'long'}).format(diaRelativo(emDias));}
/* --- dinheiro: quem vê o quê ------------------------------------------
   Regra que não se quebra: lançamento privado de OUTRA pessoa não aparece
   e não entra em nenhuma soma que esta pessoa enxerga. Se entrasse, bastaria
   subtrair os visíveis do total para descobrir o valor escondido.
   Consequência assumida: o total que o Pai vê e o que a Mãe vê podem ser
   diferentes. É o preço de não deixar deduzir.                            */
function brl(valor){return Number(valor||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});}
// Quem está olhando. A tela de Dinheiro deixa trocar, para os dois verem
// que os números mudam conforme a permissão de cada um.
let verComo=dadosExemplo.hoje.usuario;
function nivelDeAcesso(lancamento,quemOlha){
 if(lancamento.quem===quemOlha)return 'tudo';            // o próprio dono sempre vê
 if(lancamento.visibilidade==='aberto')return 'tudo';
 if(lancamento.visibilidade==='total')return 'valor';    // vê quanto, não vê o quê
 return 'nada';                                          // privado de outra pessoa
}
function lancamentosVisiveis(quemOlha){return dadosExemplo.dinheiro.lancamentos.filter(l=>nivelDeAcesso(l,quemOlha)!=='nada');}
function resumoDinheiro(quemOlha){
 const visiveis=lancamentosVisiveis(quemOlha);
 const soma=(t)=>visiveis.filter(l=>l.tipo===t).reduce((s,l)=>s+l.valor,0);
 const entrou=soma('entrada'),saiu=soma('saida');
 // "sobra" já desconta o que ainda vence: é o número que a pessoa quer saber.
 const aPagar=dadosExemplo.dinheiro.aPagar.filter(c=>!c.pago).reduce((s,c)=>s+c.valor,0);
 return {entrou,saiu,aPagar,sobra:entrou-saiu-aPagar};
}
function contasAVencer(dias){return dadosExemplo.dinheiro.aPagar.filter(c=>!c.pago&&c.emDias<=dias).sort((a,b)=>a.emDias-b.emDias);}
function rotuloVencimento(emDias){const d=Number(emDias);if(d<0)return 'venceu';if(d===0)return 'vence hoje';if(d===1)return 'vence amanhã';return 'vence em '+d+' dias';}
function proximosDaAgenda(quantos){const saida=[];for(const dia of dadosExemplo.agenda){for(const item of dia.itens){saida.push({...item,dia:rotuloDoDia(dia.emDias)});if(saida.length>=quantos)return saida;}}return saida;}
function widgetBody(id){
 if(id==='hoje'){const hoje=tarefasDeHoje();const prox=proximosDaAgenda(1)[0];const falta=emFalta();
  return `<div class="widget-count"><strong>${hoje.length}</strong><span>${hoje.length===1?'tarefa para hoje':'tarefas para hoje'}</span></div>
  ${prox?`<div class="widget-event"><span class="event-line"></span><div><strong>${esc(prox.particular?'Compromisso particular':prox.titulo)}</strong><p>${esc(prox.dia)} · ${esc(prox.hora)}${prox.quem?' — '+esc(nomeDe(prox.quem)):''}</p></div></div>`:''}
  <div class="widget-note">${falta.length?esc(falta.map(i=>i.nome).join(' e '))+' em falta na despensa':'Despensa em dia.'}</div>
  <div class="widget-footer"><span>${avisosNaoLidos().length} avisos novos</span><button onclick="openApp('hoje')">Abrir Hoje ↗</button></div>`;}
 if(id==='dinheiro'){const r=resumoDinheiro(verComo);const prox=contasAVencer(7)[0];
  return `<div class="widget-count"><strong>${brl(r.sobra)}</strong><span>sobram este mês</span></div>
  <div class="widget-dinheiro"><span>entrou<b>${brl(r.entrou)}</b></span><span>saiu<b>${brl(r.saiu)}</b></span></div>
  ${prox?`<div class="widget-note">${esc(prox.descricao)} ${esc(rotuloVencimento(prox.emDias))} · ${brl(prox.valor)}</div>`:'<div class="widget-note">Nada para pagar.</div>'}
  <div class="widget-footer"><span>o que você vê</span><button onclick="openApp('dinheiro')">Abrir ↗</button></div>`;}
 if(id==='tarefas'){const hoje=tarefasDeHoje();
  return `<div class="widget-count"><strong>${hoje.length}</strong><span>para hoje</span></div>
  ${hoje.slice(0,3).map(t=>`<div class="widget-task"><button class="check" onclick="alternarTarefa('${t.id}')" aria-label="Concluir ${esc(t.titulo)}"></button><span>${esc(t.titulo)}</span></div>`).join('')||'<div class="empty-widget">Tudo em dia por aqui.</div>'}
  <div class="widget-footer"><span>${dadosExemplo.tarefas.filter(t=>t.concluida).length} concluídas</span><button onclick="openApp('tarefas')">Abrir tarefas ↗</button></div>`;}
 if(id==='compras'){const abertos=comprasAbertas();
  return `<div class="widget-count"><strong>${abertos.length}</strong><span>itens na lista</span></div>
  ${abertos.slice(0,3).map(i=>`<div class="widget-task"><button class="check" onclick="alternarCompra('${esc(i.nome)}')" aria-label="Marcar ${esc(i.nome)} como comprado"></button><span>${esc(i.nome)}</span></div>`).join('')||'<div class="empty-widget">Lista vazia.</div>'}
  <div class="widget-footer"><span>${esc(dadosExemplo.listaAtiva.nome)}</span><button onclick="openApp('compras')">Abrir lista ↗</button></div>`;}
 if(id==='agenda')return `<div class="widget-date">Próximos da semana</div>
  ${proximosDaAgenda(2).map(i=>`<div class="widget-event"><span class="event-line"></span><div><strong>${esc(i.particular?'Compromisso particular':i.titulo)}</strong><p>${esc(i.dia)} · ${esc(i.hora)}${i.quem?' — '+esc(nomeDe(i.quem)):''}</p></div></div>`).join('')}
  <div class="widget-footer"><span>Compromissos e prazos</span><button onclick="openApp('agenda')">Ver semana ↗</button></div>`;
 const novos=avisosNaoLidos();
 return `<div class="widget-message"><b>${novos.length} ${novos.length===1?'aviso novo':'avisos novos'}</b><p>${esc(novos[0]?.titulo||'Nada por aqui.')}</p>${novos[0]?`<span class="widget-badge">${esc(novos[0].origem)}</span>`:''}</div><div class="widget-footer"><span>Ligados aos registros</span><button onclick="openApp('avisos')">Abrir avisos ↗</button></div>`;}
function defaultWidgetPosition(id){const order=Object.keys(widgetTypes).filter(key=>prefs.widgets[key]);const index=order.indexOf(id);const area=$('#desktop');const compact=window.innerHeight<730;const top=compact?143:185;const heights={hoje:252,dinheiro:236,tarefas:248,compras:248,agenda:216,avisos:198};const freeHeight=area.clientHeight-top-55;let col=0,y=top;for(const key of order){if(y+heights[key]>top+freeHeight&&y>top){col++;y=top;}if(key===id)return{x:42+col*314,y};y+=heights[key]+17;}return{x:42+index*314,y:top};}
function constrainWidget(el,pos){const area=$('#desktop');const width=area.clientWidth;return{x:Math.max(10,Math.min(Number(pos.x)||10,width-el.offsetWidth-10)),y:Math.max(10,Math.min(Number(pos.y)||10,Math.max(10,area.clientHeight-el.offsetHeight-45)))};}
function placeWidgets(){if(semPonteiro())return;document.querySelectorAll('.widget').forEach(el=>{const id=el.dataset.widget;const pos=constrainWidget(el,prefs.positions[id]||defaultWidgetPosition(id));el.style.left=pos.x+'px';el.style.top=pos.y+'px';});}
function renderWidgets(){const container=$('#widgets');container.innerHTML='';for(const [id,type] of Object.entries(widgetTypes)){if(!prefs.widgets[id])continue;const el=document.createElement('section');el.className='widget';el.dataset.widget=id;el.setAttribute('aria-label',`Widget ${type.title}`);el.innerHTML=`<header class="widget-head" tabindex="0" aria-label="Mover widget ${type.title}. Use as setas quando selecionado.">${svg(type.icon)}<h2>${type.title}</h2><span class="widget-handle">${svg('grip')}</span><button class="widget-remove" title="Remover widget" aria-label="Remover widget ${type.title}" onclick="toggleWidget('${id}',false)">×</button></header><div class="widget-body">${widgetBody(id)}</div>`;container.append(el);const header=el.querySelector('.widget-head');header.addEventListener('pointerdown',e=>startWidgetDrag(e,id,el));header.addEventListener('keydown',e=>{if(e.target!==header||!e.key.startsWith('Arrow')||semPonteiro())return;e.preventDefault();const p={x:parseFloat(el.style.left),y:parseFloat(el.style.top)};p.x+=e.key==='ArrowRight'?15:e.key==='ArrowLeft'?-15:0;p.y+=e.key==='ArrowDown'?15:e.key==='ArrowUp'?-15:0;prefs.positions[id]=constrainWidget(el,p);placeWidgets();savePrefs();});}placeWidgets();updateClock();}
function refreshWidget(id){const el=document.querySelector(`[data-widget="${id}"] .widget-body`);if(el)el.innerHTML=widgetBody(id);placeWidgets();}
function toggleWidget(id,enabled){if(!widgetTypes[id])return;prefs.widgets[id]=!!enabled;savePrefs();renderWidgets();const input=document.querySelector(`[data-widget-toggle="${id}"]`);if(input)input.checked=enabled;}
function startWidgetDrag(e,id,el){
 if(e.button!==0||e.target.closest('button')||semPonteiro())return;
 e.preventDefault();
 const start={x:e.clientX,y:e.clientY,left:parseFloat(el.style.left),top:parseFloat(el.style.top)};
 const handle=e.currentTarget;handle.setPointerCapture(e.pointerId);
 const move=event=>{const pos=constrainWidget(el,{x:start.left+event.clientX-start.x,y:start.top+event.clientY-start.y});el.style.left=pos.x+'px';el.style.top=pos.y+'px';prefs.positions[id]=pos;};
 const end=()=>{
  const position={x:parseFloat(el.style.left),y:parseFloat(el.style.top)};
  const others=[...document.querySelectorAll('.widget')].filter(item=>item!==el);
  const center={x:position.x+el.offsetWidth/2,y:position.y+el.offsetHeight/2};
  const occupied=others.find(item=>{const x=parseFloat(item.style.left),y=parseFloat(item.style.top);return center.x>=x&&center.x<=x+item.offsetWidth&&center.y>=y&&center.y<=y+item.offsetHeight});
  if(occupied){
   const otherId=occupied.dataset.widget;
   prefs.positions[otherId]={x:start.left,y:start.top};
   prefs.positions[id]={x:parseFloat(occupied.style.left),y:parseFloat(occupied.style.top)};
  }else{
   const snap=(value,candidates)=>{const close=candidates.find(candidate=>Math.abs(value-candidate)<=20);return close===undefined?value:close};
   const xs=[42],ys=[window.innerHeight<730?143:185];
   others.forEach(item=>{const x=parseFloat(item.style.left),y=parseFloat(item.style.top);xs.push(x,x+item.offsetWidth+16,x-el.offsetWidth-16);ys.push(y,y+item.offsetHeight+16,y-el.offsetHeight-16)});
   prefs.positions[id]=constrainWidget(el,{x:snap(position.x,xs),y:snap(position.y,ys)});
  }
  placeWidgets();savePrefs();
  handle.removeEventListener('pointermove',move);handle.removeEventListener('pointerup',end);handle.removeEventListener('pointercancel',end);
 };
 handle.addEventListener('pointermove',move);handle.addEventListener('pointerup',end);handle.addEventListener('pointercancel',end);
}
function updateClock(){const now=new Date();const hm=new Intl.DateTimeFormat('pt-BR',{hour:'2-digit',minute:'2-digit'}).format(now);$('#topClock').textContent=isMobile()?hm:new Intl.DateTimeFormat('pt-BR',{weekday:'short',day:'numeric',month:'short'}).format(now)+' · '+hm;$('#longDate').textContent=new Intl.DateTimeFormat('pt-BR',{weekday:'long',day:'numeric',month:'long'}).format(now);if($('#widgetClock'))$('#widgetClock').textContent=hm;if($('#widgetDate'))$('#widgetDate').textContent=new Intl.DateTimeFormat('pt-BR',{weekday:'long',day:'numeric',month:'long'}).format(now);}
function applyPrefs(){document.body.dataset.wallpaper=prefs.wallpaper;document.documentElement.style.setProperty('--glass',String(prefs.glass/100));const wp=$('.wallpaper');wp.style.backgroundImage=prefs.wallpaper==='custom'&&prefs.customImage?`url("${prefs.customImage}")`:'';resetDock();}
function createSettings(){const div=document.createElement('div');div.id='ajustes';div.className='view';div.innerHTML=`<h2>A casa do seu jeito</h2><p class="settings-intro">Fundo, atalhos e o que aparece na tela inicial.</p><section class="settings-group"><h3>Plano de fundo</h3><div class="wallpaper-options">${[['oceano','Aconchego','linear-gradient(130deg,#2b1d24,#6e4038,#a9724a)'],['aurora','Manhã','linear-gradient(130deg,#1e3340,#4a7a72,#8b9a63)'],['grafite','Noite','linear-gradient(130deg,#151824,#3c3650)'],['entardecer','Fim de tarde','linear-gradient(130deg,#2f2a49,#8a5470,#d99a82)']].map(([id,name,bg])=>`<button class="wallpaper-choice" data-wallpaper-choice="${id}" aria-pressed="${prefs.wallpaper===id}" onclick="setWallpaper('${id}')"><span class="swatch" style="background:${bg}"></span>${name}</button>`).join('')}</div><label class="upload-label">${svg('upload')} Sua imagem <input type="file" id="wallpaperUpload" accept="image/png,image/jpeg,image/webp" aria-label="Escolher imagem de fundo" onchange="uploadWallpaper(this)"></label><p class="upload-status" id="uploadStatus">PNG, JPG ou WebP, até 2 MB. A imagem fica apenas neste navegador.</p></section><section class="settings-group"><h3>O que aparece na tela inicial</h3>${Object.entries(widgetTypes).map(([id,t])=>`<label class="settings-row"><span>${t.title}<small>${{hoje:'O resumo do dia da casa',dinheiro:'O que entrou, o que saiu e o que falta pagar',tarefas:'Marque o que já foi feito',compras:'O que ainda falta comprar',agenda:'Compromissos e prazos próximos',avisos:'Lembretes ligados aos registros'}[id]}</small></span><input data-widget-toggle="${id}" type="checkbox" ${prefs.widgets[id]?'checked':''} onchange="toggleWidget('${id}',this.checked)"></label>`).join('')}<label class="settings-row"><span>Opacidade dos widgets</span><input type="range" min="5" max="35" value="${prefs.glass}" aria-label="Opacidade dos widgets" oninput="prefs.glass=Number(this.value);applyPrefs()" onchange="savePrefs()"></label></section><section class="settings-group"><h3>Dock</h3><label class="settings-row"><span>Ampliar ao aproximar o mouse<small>O ícone e seus vizinhos crescem suavemente.</small></span><input type="checkbox" ${prefs.dockMagnify?'checked':''} onchange="prefs.dockMagnify=this.checked;savePrefs();resetDock()"></label></section><div class="settings-foot"><p>No computador, arraste os cartões pelo título para organizar a tela inicial. As preferências ficam só neste navegador.</p><button class="secondary-button" onclick="resetLayout()">Reorganizar cartões</button></div>`;$('#appStorage').append(div);}
function setWallpaper(id){if(!['oceano','aurora','grafite','entardecer'].includes(id))return;prefs.wallpaper=id;applyPrefs();savePrefs();document.querySelectorAll('[data-wallpaper-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.wallpaperChoice===id)));$('#uploadStatus').textContent='Plano de fundo atualizado. Preferência salva neste navegador.';}
function uploadWallpaper(input){const file=input.files?.[0];if(!file)return;if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>2*1024*1024){notify('Escolha uma imagem PNG, JPG ou WebP de até 2 MB.');input.value='';return;}const reader=new FileReader();reader.onload=()=>{const image=new Image();image.onload=()=>{const previous={wallpaper:prefs.wallpaper,customImage:prefs.customImage};prefs.customImage=String(reader.result);prefs.wallpaper='custom';if(!savePrefs()){Object.assign(prefs,previous);return;}applyPrefs();document.querySelectorAll('[data-wallpaper-choice]').forEach(b=>b.setAttribute('aria-pressed','false'));$('#uploadStatus').textContent='Imagem aplicada e salva neste navegador.';};image.onerror=()=>notify('Essa imagem não pôde ser aberta. Escolha outro arquivo.');image.src=String(reader.result);};reader.onerror=()=>notify('Não foi possível ler a imagem.');reader.readAsDataURL(file);}
function resetLayout(){prefs.positions={};savePrefs();placeWidgets();notify('Cartões reorganizados.');}
/* Ao voltar do toque para o computador, a janela precisa ser redimensionada:
   o tamanho dela foi calculado com a largura antiga e, vindo do celular,
   ela reapareceria minúscula no meio da mesa. O conteúdo não se perde —
   só a geometria é recalculada. */
let modoAnterior=semPonteiro();
function reacomodarJanelas(){
  const area=measureArea();let i=0;
  windows.forEach(w=>{
    w.width=Math.min(['ajustes','perfil'].includes(w.id)?590:820,area.width-60);
    w.height=Math.min(['ajustes','perfil'].includes(w.id)?650:535,area.height-35);
    w.x=Math.max(20,(area.width-w.width)/2+((i%4)-1)*24);
    w.y=Math.max(12,35+(i%4)*27);
    i++;clampWindow(w);
  });
}
window.addEventListener('resize',()=>{
  const agora=semPonteiro();
  if(agora!==modoAnterior){modoAnterior=agora;if(!agora)reacomodarJanelas();}
  windows.forEach(clampWindow);placeWidgets();resetDock();updateClock();
});
// As telas dos aplicativos são montadas em casa-apps.js, que carrega depois deste arquivo.
applyPrefs();renderWidgets();updateDock();setInterval(updateClock,15000);
