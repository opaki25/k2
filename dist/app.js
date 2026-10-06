const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
$('#year').textContent=new Date().getFullYear();
$('.menu').addEventListener('click',()=>{const open=$('#nav').classList.toggle('open');$('.menu').setAttribute('aria-expanded',open)});
$$('nav a').forEach(a=>a.addEventListener('click',()=>{$('#nav').classList.remove('open');$('.menu').setAttribute('aria-expanded','false')}));
function filter(value){$$('[data-filter]').forEach(b=>{const active=b.dataset.filter===value;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active)});$$('[data-category]').forEach(c=>c.hidden=value!=='all'&&c.dataset.category!==value)}
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>filter(b.dataset.filter)));
$$('[data-jump-filter]').forEach(b=>b.addEventListener('click',()=>filter(b.dataset.jumpFilter)));
$$('[data-plan]').forEach(b=>b.addEventListener('click',()=>selectTrip(b.dataset.plan)));
$$('.close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));
$$('[data-trip]').forEach(c=>c.addEventListener('click',()=>{$('#detail-title').textContent=c.dataset.trip;$('#detail-description').textContent=c.dataset.description;$('#detail-img').src='assets/'+c.dataset.image+'.jpg';$('#detail-img').alt=c.querySelector('img').alt;$('#detail-link').dataset.trip=c.dataset.trip;$('#detail').showModal()}));
$$('[data-gallery]').forEach(c=>c.addEventListener('click',()=>{$('#gallery img').src=c.querySelector('img').src;$('#gallery img').alt=c.querySelector('img').alt;$('#gallery').showModal()}));
$$('[data-contact]').forEach(b=>b.addEventListener('click',()=>{$('#contact-title').textContent=b.dataset.contact+' — coming soon';$('#contact').showModal()}));
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&matchMedia('(pointer: fine)').matches){const stage=$('.elephant-stage');$('.hero').addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();stage.style.transform=`perspective(1000px) rotateY(${(e.clientX-r.left-r.width/2)/150}deg) rotateX(${-(e.clientY-r.top-r.height/2)/180}deg)`});$('.hero').addEventListener('pointerleave',()=>stage.style.transform='')}
const bookingForm=$('#trip-form'),fields=bookingForm.elements;
let bookingStep=0;
const localNow=new Date();const today=[localNow.getFullYear(),String(localNow.getMonth()+1).padStart(2,'0'),String(localNow.getDate()).padStart(2,'0')].join('-');
fields.start.min=today;fields.end.min=today;
function bookingData(){const d=Object.fromEntries(new FormData(bookingForm));d.flexible=d.request==='Quote request'&&fields.flexible.checked;return d;}
function syncDates(){const quote=fields.request.value==='Quote request';$('#flexible-wrap').hidden=!quote;if(!quote)fields.flexible.checked=false;const flexible=quote&&fields.flexible.checked;[fields.start,fields.end].forEach(f=>{f.required=!flexible;f.disabled=flexible});fields.end.min=fields.start.value||today;}
function showBookingStep(step,focus=true){bookingStep=step;$$('[data-step]').forEach((p,i)=>p.hidden=i!==step);$$('[data-progress]').forEach((p,i)=>{p.classList.toggle('complete',i<step);if(i===step)p.setAttribute('aria-current','step');else p.removeAttribute('aria-current')});$('#booking-back').hidden=step===0;$('#booking-next').hidden=step===2;$('#booking-next').innerHTML=step===0?'Your details <span>→</span>':'Review request <span>→</span>';$('#booking-back').textContent=step===2?'← Edit details':'← Back';$('#booking-error').hidden=true;if(focus){const title=$(`[data-step="${step}"] legend`);title.tabIndex=-1;title.focus({preventScroll:true});$('.booking-card').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}}
function selectTrip(trip){fields.trip.value=trip;showBookingStep(0,false);}
$('#detail-link').addEventListener('click',()=>{selectTrip($('#detail-link').dataset.trip);$('#detail').close()});
fields.start.addEventListener('change',syncDates);fields.flexible.addEventListener('change',syncDates);$$('input[name="request"]').forEach(r=>r.addEventListener('change',syncDates));
$('#booking-back').addEventListener('click',()=>showBookingStep(bookingStep-1));
bookingForm.addEventListener('submit',e=>{e.preventDefault();if(bookingStep===2)return;syncDates();const panel=$(`[data-step="${bookingStep}"]`);for(const field of panel.querySelectorAll('input,select,textarea')){if(!field.disabled&&!field.checkValidity()){field.reportValidity();return;}}
 const d=bookingData();let error=bookingStep===0?K2Booking.dateError(d,today):'';if(bookingStep===1&&(!d.name.trim()||d.phone.replace(/\D/g,'').length<7))error='Please enter your name and a valid phone number with country code.';
 if(error){$('#booking-error').textContent=error;$('#booking-error').hidden=false;return;}
 if(bookingStep===1){$('#booking-summary').replaceChildren();for(const [key,value]of K2Booking.rows(d)){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=key;dd.textContent=value;$('#booking-summary').append(dt,dd);}$('#send-request').href='https://wa.me/256789660032?text='+encodeURIComponent(K2Booking.message(d));$('#handoff-status').hidden=true;}
 showBookingStep(bookingStep+1);
});
$('#send-request').addEventListener('click',()=>$('#handoff-status').hidden=false);
syncDates();
