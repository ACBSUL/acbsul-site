/* ============================================================
   ACB Sul — shared site chrome + interactions
   ============================================================ */
(function(){
  "use strict";

  /* ---- Business data (edite aqui) ---- */
  const BIZ = {
    phoneDisplay: "(51) 3377-3626",
    phoneHref: "tel:+555133773626",
    waNumber: "5551991234567", // PLACEHOLDER — trocar pelo WhatsApp real
    email: "contato@acbsulcompressores.com.br",
    address: "Rua Santa Catarina, 304 — Porto Alegre/RS",
    hours: "Seg–Sex · 8h–12h / 13h–17h",
    coverage: "Atuação em todo o RS e SC"
  };
  window.ACB_BIZ = BIZ;

  function wa(msg){
    return "https://wa.me/" + BIZ.waNumber + "?text=" + encodeURIComponent(msg || "Olá! Gostaria de falar com um especialista da ACB Sul.");
  }
  window.acbWa = wa;

  /* ---- Icons ---- */
  const I = {
    wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.605zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',
    phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .37 1.96.72 2.88a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.11-.45c.92.35 1.88.59 2.88.72A2 2 0 0 1 22 16.92z"/></svg>',
    pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>',
    clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>',
    arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    chevL:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    chevR:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
    pin2:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>'
  };
  window.ACB_ICONS = I;

  /* ---- Nav ---- */
  const NAV = [
    {label:"Início", href:"index.html", key:"home"},
    {label:"Empresa", href:"#", key:"empresa"},
    {label:"Produtos", href:"produtos.html", key:"produtos"},
    {label:"Peças", href:"#", key:"pecas"},
    {label:"Serviços", href:"#", key:"servicos"},
    {label:"Locação", href:"#", key:"locacao"},
    {label:"Contato", href:"#contato", key:"contato"}
  ];

  /* base path so it works from any page (all pages at root here) */
  const BASE = "";

  function header(active){
    const links = NAV.map(n=>`<a href="${n.href}" class="${n.key===active?'active':''}">${n.label}</a>`).join("");
    return `
    <div class="topbar">
      <div class="container">
        <div class="tb-left">
          <span>${I.pin} ${BIZ.address}</span>
          <span>${I.clock} ${BIZ.hours}</span>
        </div>
        <div class="tb-right">
          <a class="always" href="${BIZ.phoneHref}">${I.phone}<span class="mono">${BIZ.phoneDisplay}</span></a>
        </div>
      </div>
    </div>
    <header class="site-header">
      <div class="container">
        <a class="brand" href="index.html" aria-label="ACB Sul — página inicial">
          <img src="assets/logo-acbsul.svg" alt="ACB Sul Compressores — Distribuidor Autorizado Atlas Copco">
        </a>
        <nav class="main-nav">${links}</nav>
        <div class="header-cta">
          <a class="btn btn-ghost" href="#contato">Solicitar Orçamento</a>
          <a class="btn btn-wa" href="${wa('Olá! Gostaria de falar com um especialista da ACB Sul.')}" target="_blank" rel="noopener">${I.wa}<span class="hide-md">WhatsApp</span></a>
        </div>
        <button class="menu-toggle" aria-label="Abrir menu" id="menuToggle">${I.menu}</button>
      </div>
    </header>
    <div class="mobile-drawer" id="mobileDrawer">
      <div class="panel">
        <div class="md-top">
          <img src="assets/logo-acbsul-light.svg" alt="ACB Sul">
          <button class="md-close" id="mdClose" aria-label="Fechar menu">&times;</button>
        </div>
        ${NAV.map(n=>`<a class="ml" href="${n.href}">${n.label}</a>`).join("")}
        <div class="md-cta">
          <a class="btn btn-wa btn-block" href="${wa()}" target="_blank" rel="noopener">${I.wa} Falar no WhatsApp</a>
          <a class="btn btn-primary btn-block" href="#contato">Solicitar Orçamento</a>
        </div>
      </div>
    </div>`;
  }

  function entityFooterBlock(){
    return `
    <section class="entity-block">
      <div class="container">
        <div class="eb-mark">
          <img src="assets/logo-acbsul-light.svg" alt="ACB Sul Compressores e Geradores">
          <span class="eb-seal">◇ Distribuidor Autorizado Atlas Copco</span>
        </div>
        <p>A <b>ACB Sul Compressores</b> é distribuidora autorizada <b>Atlas Copco</b> e especialista em compressores industriais, geradores e ar comprimido em Porto Alegre/RS, com mais de <b>40 anos</b> de mercado. Oferece venda, locação, peças originais e assistência técnica especializada para indústrias em todo o <b>Rio Grande do Sul e Santa Catarina</b>.</p>
      </div>
    </section>`;
  }
  window.acbEntityBlock = entityFooterBlock;

  function footer(){
    return `
    <div class="divider-stripe"></div>
    <footer class="site-footer">
      <div class="container">
        <div class="f-grid">
          <div>
            <img class="f-logo" src="assets/logo-acbsul-light.svg" alt="ACB Sul Compressores">
            <p class="f-about">Compressores industriais, geradores e assistência técnica Atlas Copco. Tecnologia robusta, peças originais e atendimento técnico especializado para a indústria gaúcha e catarinense.</p>
            <span class="f-seal">◇ Distribuidor Autorizado Atlas Copco</span>
          </div>
          <div>
            <h4>Navegação</h4>
            <ul>
              <li><a href="index.html">Início</a></li>
              <li><a href="#">Empresa</a></li>
              <li><a href="produtos.html">Produtos</a></li>
              <li><a href="#">Peças</a></li>
              <li><a href="#">Serviços</a></li>
              <li><a href="#">Locação</a></li>
            </ul>
          </div>
          <div>
            <h4>Produtos</h4>
            <ul>
              <li><a href="produtos.html">Compressores de Parafuso</a></li>
              <li><a href="produtos.html">Compressores de Pistão</a></li>
              <li><a href="produtos.html">Portáteis</a></li>
              <li><a href="produtos-geradores.html">Geradores de Energia</a></li>
              <li><a href="produtos.html">Tratamento de Ar</a></li>
              <li><a href="produtos.html">Bombas de Vácuo</a></li>
            </ul>
          </div>
          <div>
            <h4>Contato</h4>
            <ul class="f-contact">
              <li>${I.pin}<span><b>Sede — Porto Alegre/RS</b>${BIZ.address}</span></li>
              <li>${I.phone}<span><b>${BIZ.phoneDisplay}</b>${BIZ.coverage}</span></li>
              <li>${I.mail}<span>${BIZ.email}</span></li>
              <li>${I.clock}<span>${BIZ.hours}</span></li>
            </ul>
          </div>
        </div>
        <div class="f-bottom">
          <span>© ${new Date().getFullYear()} ACB Sul Compressores e Geradores · CNPJ 00.000.000/0001-00</span>
          <span class="mono">Atlas Copco® é marca registrada de seus respectivos titulares.</span>
        </div>
      </div>
    </footer>`;
  }

  function waFloat(){
    return `
    <a class="wa-float" href="${wa('Olá! Vim pelo site e gostaria de falar com um especialista da ACB Sul.')}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
      <span class="wa-pulse"></span>
      <span class="wa-ico">${I.wa}</span>
      <span class="wa-txt">Falar no WhatsApp</span>
    </a>`;
  }

  /* ---- Mount ---- */
  function mount(){
    const active = document.body.getAttribute("data-page") || "";
    const hSlot = document.getElementById("site-header-slot");
    const fSlot = document.getElementById("site-footer-slot");
    if(hSlot) hSlot.innerHTML = header(active);
    if(fSlot) fSlot.innerHTML = footer();
    const eSlot = document.getElementById("entity-slot");
    if(eSlot) eSlot.innerHTML = entityFooterBlock();
    if(!document.querySelector(".wa-float")) document.body.insertAdjacentHTML("beforeend", waFloat());

    // mobile menu
    const drawer = document.getElementById("mobileDrawer");
    const toggle = document.getElementById("menuToggle");
    const close = document.getElementById("mdClose");
    if(toggle&&drawer){
      toggle.addEventListener("click",()=>{drawer.classList.add("open");document.body.style.overflow="hidden";});
      const shut=()=>{drawer.classList.remove("open");document.body.style.overflow="";};
      close&&close.addEventListener("click",shut);
      drawer.addEventListener("click",e=>{if(e.target===drawer)shut();});
      drawer.querySelectorAll("a").forEach(a=>a.addEventListener("click",shut));
    }
    // category WhatsApp links: <a data-wa-msg="..."> -> real wa.me href
    document.querySelectorAll("[data-wa-msg]").forEach(a=>{
      a.setAttribute("href", wa(a.getAttribute("data-wa-msg")));
      a.setAttribute("target","_blank"); a.setAttribute("rel","noopener");
    });

    initAccordions();
    initHeroCarousels();
    initReveal();
    initLeadForms();
    initGallery();
  }

  /* ---- Product gallery ---- */
  function initGallery(){
    document.querySelectorAll("[data-gallery]").forEach(g=>{
      const main=g.querySelector(".gal-main img");
      const thumbs=[...g.querySelectorAll(".gal-thumb")];
      thumbs.forEach(t=>{
        t.addEventListener("click",()=>{
          const src=t.getAttribute("data-src");
          const alt=t.getAttribute("data-alt")||"";
          if(main){main.src=src;main.alt=alt;}
          thumbs.forEach(x=>x.classList.remove("active"));
          t.classList.add("active");
        });
      });
    });
  }

  /* ---- Accordion ---- */
  function initAccordions(){
    document.querySelectorAll(".faq-item .faq-q").forEach(q=>{
      q.addEventListener("click",()=>{
        const item=q.closest(".faq-item");
        const a=item.querySelector(".faq-a");
        const open=item.classList.contains("open");
        if(open){item.classList.remove("open");a.style.maxHeight=0;}
        else{item.classList.add("open");a.style.maxHeight=a.scrollHeight+"px";}
      });
    });
  }

  /* ---- Hero carousel ---- */
  function initHeroCarousels(){
    document.querySelectorAll("[data-carousel]").forEach(car=>{
      const slides=[...car.querySelectorAll(".hero-slide")];
      const dotsWrap=car.querySelector(".hero-dots");
      if(slides.length<=1) {return;}
      let i=0,timer;
      if(dotsWrap){
        dotsWrap.innerHTML=slides.map((_,k)=>`<button aria-label="Slide ${k+1}" data-k="${k}"></button>`).join("");
      }
      const dots=dotsWrap?[...dotsWrap.children]:[];
      function go(n){
        i=(n+slides.length)%slides.length;
        slides.forEach((s,k)=>s.classList.toggle("active",k===i));
        dots.forEach((d,k)=>d.classList.toggle("active",k===i));
      }
      function next(){go(i+1);} function prev(){go(i-1);}
      function reset(){clearInterval(timer);timer=setInterval(next,6000);}
      dots.forEach(d=>d.addEventListener("click",()=>{go(+d.dataset.k);reset();}));
      const nb=car.querySelector(".hero-arrow.next"), pb=car.querySelector(".hero-arrow.prev");
      nb&&nb.addEventListener("click",()=>{next();reset();});
      pb&&pb.addEventListener("click",()=>{prev();reset();});
      go(0);reset();
    });
  }

  /* ---- Reveal on scroll ---- */
  function initReveal(){
    const els=document.querySelectorAll(".fade-up");
    if(!els.length)return;
    const io=new IntersectionObserver((ents)=>{
      ents.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});
    },{threshold:.12,rootMargin:"0px 0px -40px 0px"});
    els.forEach(el=>io.observe(el));
  }

  /* ---- Lead form ---- */
  function initLeadForms(){
    document.querySelectorAll("form[data-leadform]").forEach(form=>{
      form.addEventListener("submit",e=>{
        e.preventDefault();
        let ok=true;
        form.querySelectorAll("[required]").forEach(inp=>{
          const field=inp.closest(".field");
          let valid=inp.value.trim()!=="";
          if(valid && inp.type==="email"){valid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value);}
          field&&field.classList.toggle("error",!valid);
          if(!valid)ok=false;
        });
        if(!ok){form.querySelector(".field.error input,.field.error select,.field.error textarea")?.focus();return;}
        const success=form.parentElement.querySelector(".form-success");
        if(success){form.style.display="none";success.classList.add("show");}
      });
      form.querySelectorAll("input,select,textarea").forEach(inp=>{
        inp.addEventListener("input",()=>inp.closest(".field")?.classList.remove("error"));
      });
    });
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount);
  else mount();
})();
