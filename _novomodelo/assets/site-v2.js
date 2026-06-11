/* ============================================================
   ACB Sul — V2 interactions (ref. Cruzeiro)
   ============================================================ */
(function(){
  "use strict";
  const BIZ = {
    phone:"(51) 3377-3626",
    waNumber:"5551991234567", // PLACEHOLDER — trocar pelo WhatsApp real
    email:"comercial@acbsulcompressores.com.br"
  };
  function wa(msg){return "https://wa.me/"+BIZ.waNumber+"?text="+encodeURIComponent(msg||"Olá! Gostaria de falar com a ACB Sul.");}
  window.acbWa = wa;

  /* ---- icons ---- */
  const SVG = {
    wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.605zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',
    arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>',
    menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12h18M3 6h18M3 18h18"></path></svg>',
    phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .37 1.96.72 2.88a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.11-.45c.92.35 1.88.59 2.88.72A2 2 0 0 1 22 16.92z"></path></svg>',
    mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-10 5L2 7"></path></svg>',
    pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>'
  };

  const NAV = [
    {label:"Início", href:"index-v2.html"},
    {label:"Linhas", href:"index-v2.html#linhas"},
    {label:"Produtos", href:"produtos.html", key:"produtos"},
    {label:"Processo", href:"index-v2.html#processo"},
    {label:"FAQ", href:"index-v2.html#faq"}
  ];

  function buildNav(active){
    const links=NAV.map(n=>`<a href="${n.href}"${n.key&&n.key===active?' class="active"':''}>${n.label}</a>`).join("");
    return `<div class="nav-wrap" id="navWrap"><nav class="navbar">
      <a class="nav-brand" href="index-v2.html" aria-label="ACB Sul"><img src="assets/logo-acbsul-light.svg" alt="ACB Sul — Distribuidor Atlas Copco"></a>
      <div class="nav-links">${links}</div>
      <div class="nav-cta"><a class="nav-pill" href="index-v2.html#contato">Orçamento Técnico</a></div>
      <button class="nav-burger" id="burger" aria-label="Abrir menu">${SVG.menu}</button>
    </nav></div>
    <div class="drawer" id="drawer"><div class="panel">
      <div class="dtop"><img src="assets/logo-acbsul-light.svg" alt="ACB Sul"><button class="dclose" aria-label="Fechar">&times;</button></div>
      ${NAV.map(n=>`<a class="dl" href="${n.href}">${n.label}</a>`).join("")}
      <div class="dcta">
        <a class="btn btn-wa btn-block" data-wa-msg="Olá! Gostaria de falar com a ACB Sul.">${SVG.wa} WhatsApp</a>
        <a class="btn btn-accent btn-block" href="index-v2.html#contato"><span class="ai">${SVG.arrow}</span>Orçamento</a>
      </div>
    </div></div>`;
  }

  function buildFooter(){
    return `<footer class="footer"><div class="container">
      <div class="fgrid">
        <div>
          <img class="flogo" src="assets/logo-acbsul-light.svg" alt="ACB Sul Compressores e Geradores">
          <p class="fabout">Compressores industriais, geradores e assistência técnica Atlas Copco. Tecnologia robusta, peças originais e suporte técnico para a indústria gaúcha e catarinense.</p>
          <span class="fseal">◇ Distribuidor Autorizado Atlas Copco</span>
        </div>
        <div><h4>Navegação</h4><ul>
          <li><a href="index-v2.html#linhas">Linhas de Produto</a></li>
          <li><a href="produtos.html">Catálogo completo</a></li>
          <li><a href="index-v2.html#diferenciais">Diferenciais</a></li>
          <li><a href="index-v2.html#processo">Processo</a></li>
          <li><a href="index-v2.html#faq">FAQ</a></li>
        </ul></div>
        <div><h4>Contato</h4><ul class="fcontact">
          <li>${SVG.pin}<span><b>Sede — Porto Alegre/RS</b>Rua Santa Catarina, 304</span></li>
          <li>${SVG.phone}<span><b>${BIZ.phone}</b>Seg–Sex · 8h–12h / 13h–17h</span></li>
          <li>${SVG.mail}<span>${BIZ.email}</span></li>
        </ul></div>
      </div>
      <div class="fbottom">
        <span>© ${new Date().getFullYear()} ACB Sul Compressores e Geradores · CNPJ 00.000.000/0001-00</span>
        <span>Atlas Copco® é marca registrada de seus respectivos titulares.</span>
      </div>
    </div></footer>`;
  }

  function buildWaFloat(){
    return `<a class="wa-float" data-wa-msg="Olá! Vim pelo site e gostaria de falar com a ACB Sul." aria-label="WhatsApp"><span class="wi">${SVG.wa}</span><span class="wt">Falar no WhatsApp</span></a>`;
  }

  function ready(fn){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",fn):fn();}

  ready(function(){
    /* inject shared chrome (catalog pages) */
    const hSlot=document.getElementById("v2-header");
    if(hSlot) hSlot.innerHTML=buildNav(document.body.getAttribute("data-page"));
    const fSlot=document.getElementById("v2-footer");
    if(fSlot) fSlot.innerHTML=buildFooter();
    if(!document.querySelector(".wa-float")) document.body.insertAdjacentHTML("beforeend",buildWaFloat());

    /* nav scroll state */
    const navWrap=document.querySelector(".nav-wrap");
    const onScroll=()=>{navWrap&&navWrap.classList.toggle("scrolled",window.scrollY>30);};
    onScroll();window.addEventListener("scroll",onScroll,{passive:true});

    /* mobile drawer */
    const drawer=document.getElementById("drawer");
    const burger=document.getElementById("burger");
    if(burger&&drawer){
      const open=()=>{drawer.classList.add("open");document.body.style.overflow="hidden";};
      const shut=()=>{drawer.classList.remove("open");document.body.style.overflow="";};
      burger.addEventListener("click",open);
      drawer.addEventListener("click",e=>{if(e.target===drawer||e.target.closest(".dclose")||e.target.closest("a"))shut();});
    }

    /* whatsapp links */
    document.querySelectorAll("[data-wa-msg]").forEach(a=>{
      a.href=wa(a.getAttribute("data-wa-msg"));a.target="_blank";a.rel="noopener";
    });

    /* accordion */
    document.querySelectorAll(".faq-q").forEach(q=>{
      q.addEventListener("click",()=>{
        const item=q.closest(".faq-item");const a=item.querySelector(".faq-a");
        const isOpen=item.classList.contains("open");
        item.parentElement.querySelectorAll(".faq-item.open").forEach(o=>{o.classList.remove("open");o.querySelector(".faq-a").style.maxHeight=0;});
        if(!isOpen){item.classList.add("open");a.style.maxHeight=a.scrollHeight+"px";}
      });
    });

    /* testimonials carousel */
    const car=document.querySelector("[data-tcarousel]");
    if(car){
      const track=car.querySelector(".ttrack");
      const data=window.ACB_TESTIMONIALS||[];
      const perDesktop=3;
      let start=0;
      const isMobile=()=>window.matchMedia("(max-width:900px)").matches;
      function render(){
        const per=isMobile()?1:perDesktop;
        track.innerHTML="";
        for(let i=0;i<per;i++){
          const t=data[(start+i)%data.length];
          const el=document.createElement("article");
          el.className="tcard";
          const initials=t.name.split(" ").filter(Boolean).slice(0,2).map(s=>s[0]).join("").toUpperCase();
          const av=t.avatar?`<img src="${t.avatar}" alt="${t.name}">`:`<span class="avi">${initials}</span>`;
          el.innerHTML=`<div class="stars">★★★★★</div>
            <p class="quote">“${t.quote}”</p>
            <div class="who"><span class="av">${av}</span>
            <span><b>${t.name}</b><span>${t.role}</span></span></div>`;
          track.appendChild(el);
        }
      }
      const prev=car.querySelector(".tprev"),next=car.querySelector(".tnext");
      prev&&prev.addEventListener("click",()=>{start=(start-1+data.length)%data.length;render();});
      next&&next.addEventListener("click",()=>{start=(start+1)%data.length;render();});
      let rt;window.addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(render,150);});
      render();
    }

    /* lead forms */
    document.querySelectorAll("form[data-leadform]").forEach(form=>{
      form.addEventListener("submit",e=>{
        e.preventDefault();let ok=true;
        form.querySelectorAll("[required]").forEach(inp=>{
          const f=inp.closest(".field");let valid=inp.value.trim()!=="";
          if(valid&&inp.type==="email")valid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value);
          f&&f.classList.toggle("error",!valid);if(!valid)ok=false;
        });
        if(!ok){form.querySelector(".field.error input,.field.error select,.field.error textarea")?.focus();return;}
        const ok2=form.parentElement.querySelector(".form-ok");
        if(ok2){form.style.display="none";ok2.classList.add("show");}
      });
      form.querySelectorAll("input,select,textarea").forEach(inp=>inp.addEventListener("input",()=>inp.closest(".field")?.classList.remove("error")));
    });

    /* reveal */
    const els=document.querySelectorAll(".fade-up");
    if(els.length){
      const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}}),{threshold:.12,rootMargin:"0px 0px -40px 0px"});
      els.forEach(el=>io.observe(el));
    }

    /* product gallery */
    document.querySelectorAll("[data-gallery]").forEach(g=>{
      const main=g.querySelector(".gal-main img");
      g.querySelectorAll(".gal-thumb").forEach(t=>{
        t.addEventListener("click",()=>{
          const src=t.getAttribute("data-src");if(!src)return;
          if(main){main.src=src;main.alt=t.getAttribute("data-alt")||"";}
          g.querySelectorAll(".gal-thumb").forEach(x=>x.classList.remove("active"));
          t.classList.add("active");
        });
      });
    });
  });
})();
