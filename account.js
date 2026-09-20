'use strict';
// This entry screen is a visual demonstration, not an authentication boundary.
const profileColors={areia:{name:'Areia',bg:'#e6c39a',ink:'#493b34'},terra:{name:'Terra',bg:'#d9a58f',ink:'#4d332b'},oliva:{name:'Oliva',bg:'#bdc79c',ink:'#3f4630'},rosa:{name:'Rosa',bg:'#e0b6c2',ink:'#503742'}};
// O nome e o papel iniciais vêm de dados-exemplo.js — troque lá, não aqui.
const membroInicial=membro(dadosExemplo.hoje.usuario)||dadosExemplo.familia.membros[0];
let userProfile={name:membroInicial.nome,email:'',team:membroInicial.papel+' · família '+dadosExemplo.familia.nome,color:'areia'};
try{
  const saved=JSON.parse(localStorage.getItem('casa.perfil.v1')||'null');
  if(saved&&typeof saved==='object'){
    for(const key of ['name','email','team'])if(typeof saved[key]==='string')userProfile[key]=saved[key].slice(0,key==='email'?160:80);
    if(profileColors[saved.color])userProfile.color=saved.color;
    if(!userProfile.name.trim())userProfile.name=membroInicial.nome;
  }
}catch{}
function profileInitials(name){return name.trim().split(/\s+/).filter(Boolean).slice(0,2).map(word=>Array.from(word)[0]).join('').toLocaleUpperCase('pt-BR');}
function paintProfile(){
  const theme=profileColors[userProfile.color];
  const button=$('#userMenu');
  button.textContent=profileInitials(userProfile.name);
  button.style.background=theme.bg;button.style.color=theme.ink;
  button.setAttribute('aria-label',`Perfil de ${userProfile.name}`);
  button.title=`${userProfile.name} · Meu perfil`;
  if($('#profileSummaryName'))$('#profileSummaryName').textContent=userProfile.name;
  if($('#profileSummaryTeam'))$('#profileSummaryTeam').textContent=userProfile.team||('família '+dadosExemplo.familia.nome);
}
function enterDesktop(event){
  event.preventDefault();
  // Discard demo credentials immediately; do not transmit or persist them.
  $('#loginForm').reset();
  $('#loginScreen').hidden=true;
  document.body.classList.add('desktop-ready');
  $('#desktopShell').inert=false;
  $('#desktopShell').removeAttribute('aria-hidden');
  placeWidgets();windows.forEach(clampWindow);
  // No toque, a pessoa cai direto no Hoje — ninguém abre um aplicativo de casa
  // para olhar uma área de trabalho. No computador, a mesa continua sendo a entrada.
  if(semPonteiro()){openApp('hoje');}
  else $('#userMenu').focus({preventScroll:true});
  if(window.matchMedia('(min-width: 900px)').matches&&document.fullscreenEnabled&&!document.fullscreenElement)document.documentElement.requestFullscreen().catch(()=>{});
}
function leaveDesktop(){
  if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});
  if($('#taskDialog').open)$('#taskDialog').close();
  windows.forEach(w=>{w.minimized=true;w.el.hidden=true;});
  focusedId=null;desktopSnapshot=[];updateDock();resetDock();
  $('#loginForm').reset();
  $('#desktopShell').inert=true;
  $('#desktopShell').setAttribute('aria-hidden','true');
  document.body.classList.remove('desktop-ready');
  $('#loginScreen').hidden=false;
  $('#loginForm .login-submit').focus({preventScroll:true});
}
function createUserProfile(){
  const view=document.createElement('div');view.id='perfil';view.className='view profile-view';
  view.innerHTML=`<div class="profile-summary"><span class="profile-avatar" id="profilePreview" aria-hidden="true"></span><div><h2 id="profileSummaryName"></h2><p id="profileSummaryTeam"></p></div><span class="pill">Perfil de demonstração</span></div>
  <form id="profileForm" onsubmit="saveUserProfile(event)">
    <div class="profile-fields"><label for="profileName">Nome de exibição<input id="profileName" value="${esc(userProfile.name)}" maxlength="80" required autocomplete="off" oninput="this.setCustomValidity('');previewProfile()"></label><label for="profileEmail">E-mail de contato<input id="profileEmail" type="email" value="${esc(userProfile.email)}" maxlength="160" placeholder="Opcional" autocomplete="off"></label><label for="profileTeam">Papel na casa<input id="profileTeam" value="${esc(userProfile.team)}" maxlength="80" placeholder="Ex.: responsável" autocomplete="off"></label></div>
    <fieldset class="profile-colors"><legend>Cor do avatar</legend>${Object.entries(profileColors).map(([id,color])=>`<label class="profile-color" title="${color.name}"><input type="radio" name="avatarColor" value="${id}" ${userProfile.color===id?'checked':''} onchange="previewProfile()"><span style="background:${color.bg}" aria-hidden="true"></span><span>${color.name}</span></label>`).join('')}</fieldset>
    <div class="profile-save"><p>Protótipo: as preferências ficam só neste navegador.</p><button type="submit" class="small-button">Salvar alterações</button></div>
  </form>
  <div class="profile-actions"><button type="button" class="profile-action" onclick="openApp('ajustes')"><span>${svg('sliders')}<span>Ajustar a tela inicial<small>Fundo, cartões e atalhos</small></span></span>${svg('arrow')}</button><button type="button" class="profile-action logout-action" onclick="leaveDesktop()"><span>${svg('lock')}<span>Sair da demonstração<small>Voltar à tela de entrada</small></span></span>${svg('arrow')}</button></div>`;
  $('#appStorage').append(view);paintProfile();previewProfile();
}
function previewProfile(){
  const color=document.querySelector('input[name="avatarColor"]:checked')?.value||userProfile.color;
  const theme=profileColors[color]||profileColors.areia;
  const avatar=$('#profilePreview');
  avatar.textContent=profileInitials($('#profileName').value)||'C';
  avatar.style.background=theme.bg;avatar.style.color=theme.ink;
}
function saveUserProfile(event){
  event.preventDefault();
  const name=$('#profileName').value.trim();
  if(!name){$('#profileName').setCustomValidity('Informe um nome de exibição.');$('#profileName').reportValidity();return;}
  const next={name,email:$('#profileEmail').value.trim(),team:$('#profileTeam').value.trim(),color:document.querySelector('input[name="avatarColor"]:checked')?.value||'areia'};
  try{localStorage.setItem('casa.perfil.v1',JSON.stringify(next));}catch{notify('Não foi possível salvar o perfil neste navegador.');return;}
  userProfile=next;paintProfile();previewProfile();notify('Perfil atualizado.');
}
paintProfile();
