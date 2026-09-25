(function(){'use strict';
var tog=document.querySelector('.bc-tog'),links=document.querySelector('.bc-links');
if(tog&&links){tog.addEventListener('click',function(){var o=links.classList.toggle('open');tog.setAttribute('aria-expanded',o?'true':'false');});}
document.querySelectorAll('.bc-dd button').forEach(function(b){var m=b.parentElement.querySelector('.bc-menu');if(!m)return;
b.addEventListener('click',function(e){e.preventDefault();var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});});
document.addEventListener('click',function(e){document.querySelectorAll('.bc-menu.open').forEach(function(m){if(!m.parentElement.contains(e.target)){m.classList.remove('open');var b=m.parentElement.querySelector('button');if(b)b.setAttribute('aria-expanded','false');}});});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){document.querySelectorAll('.bc-menu.open').forEach(function(m){m.classList.remove('open');});if(links)links.classList.remove('open');}});+/* Lead form -> Google Apps Script Web App (see apps-script-lead-form.gs.txt). Paste the deployed URL below. */
var LEAD_ENDPOINT='';
var PHONE='(713) 555-0138';
document.querySelectorAll('form.bc-lead').forEach(function(f){var st=f.querySelector('.bc-status');
f.addEventListener('submit',function(e){e.preventDefault();
if(f.querySelector('input[name=website]').value){return;}
var name=f.querySelector('[name=name]').value.trim(),phone=f.querySelector('[name=phone]').value.trim();
function show(t,c){if(st){st.textContent=t;st.className='bc-status '+c;st.hidden=false;}}
if(!name||phone.replace(/\D/g,'').length<10){show('Please add your name and a 10-digit phone number so we can call you back.','err');return;}
if(!LEAD_ENDPOINT){show('Our online form is not switched on yet. Please call '+PHONE+' and we will take your request right away.','err');return;}
var b=f.querySelector('button[type=submit]'),t=b.textContent;b.disabled=true;b.textContent='Sending…';
fetch(LEAD_ENDPOINT,{method:'POST',mode:'no-cors',body:new FormData(f)}).then(function(){f.reset();show('Thanks — we have your request and will call you back the same business day.','ok');b.textContent='Sent';}).catch(function(){show('Something went wrong. Please call '+PHONE+'.','err');b.disabled=false;b.textContent=t;});
});});
})();
