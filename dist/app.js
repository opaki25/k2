const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
$('#year').textContent=new Date().getFullYear();
$('.menu').addEventListener('click',()=>{const open=$('#nav').classList.toggle('open');$('.menu').setAttribute('aria-expanded',open)});
$$('nav a').forEach(a=>a.addEventListener('click',()=>{$('#nav').classList.remove('open');$('.menu').setAttribute('aria-expanded','false')}));
function filter(value){$$('[data-filter]').forEach(b=>{const active=b.dataset.filter===value;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active)});$$('[data-category]').forEach(c=>c.hidden=value!=='all'&&c.dataset.category!==value)}
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>filter(b.dataset.filter)));
$$('[data-jump-filter]').forEach(b=>b.addEventListener('click',()=>filter(b.dataset.jumpFilter)));
$$('[data-plan]').forEach(b=>b.addEventListener('click',()=>$('#trip-form select').value=b.dataset.plan));
$$('.close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));
$$('[data-trip]').forEach(c=>c.addEventListener('click',()=>{$('#detail-title').textContent=c.dataset.trip;$('#detail-description').textContent=c.dataset.description;$('#detail-img').src='assets/'+c.dataset.image+'.jpg';$('#detail-img').alt=c.querySelector('img').alt;$('#detail-link').href='https://wa.me/256789660032?text='+encodeURIComponent('Hello K2! I’m interested in '+c.dataset.trip+'. Could you help me plan a trip?');$('#detail').showModal()}));
$$('[data-gallery]').forEach(c=>c.addEventListener('click',()=>{$('#gallery img').src=c.querySelector('img').src;$('#gallery img').alt=c.querySelector('img').alt;$('#gallery').showModal()}));
$$('[data-contact]').forEach(b=>b.addEventListener('click',()=>{$('#contact-title').textContent=b.dataset.contact+' — coming soon';$('#contact').showModal()}));
$('#trip-form').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.target),message=`Hello K2! My name is ${data.get('name')}. I’d like to plan: ${data.get('trip')}. Travellers: ${data.get('travellers')}. ${data.get('notes')||''}`;window.open('https://wa.me/256789660032?text='+encodeURIComponent(message),'_blank','noopener,noreferrer')});
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&matchMedia('(pointer: fine)').matches){const stage=$('.elephant-stage');$('.hero').addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();stage.style.transform=`perspective(1000px) rotateY(${(e.clientX-r.left-r.width/2)/150}deg) rotateX(${-(e.clientY-r.top-r.height/2)/180}deg)`});$('.hero').addEventListener('pointerleave',()=>stage.style.transform='')}
