const root=document.documentElement;const themeToggle=document.getElementById('theme-toggle');const menu=document.getElementById('menu-toggle');const nav=document.getElementById('nav-links');

themeToggle.addEventListener('click',()=>{const light=root.dataset.theme==='light';root.dataset.theme=light?'dark':'light';themeToggle.textContent=light?'◐':'◑';localStorage.setItem('theme',root.dataset.theme)});
const saved=localStorage.getItem('theme');if(saved){root.dataset.theme=saved;themeToggle.textContent=saved==='light'?'◑':'◐'}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.textContent=open?'Close':'Menu'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu'}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();
