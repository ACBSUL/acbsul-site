/* ============================================================================
   Tracking — Framework FOP adaptado para GERAÇÃO DE LEADS (sem venda online)
   ACB Sul Compressores · vanilla, sem GTM, sem dependências
   Base: tracking.js do projeto sapabap (Aline Explica SAP).

   Carregado no <head> pelo SiteLayout (só site público; o /admin não carrega),
   SEM defer, logo depois de window.ACB_TRACK e do gtag do Google.

   Funil (Meta)                       Google (GA4 / Ads)
     1 PageView        carga            page_view (automático do gtag)
     2 ViewContent     25% ou 10s       view_item
     3 Contact         clique WhatsApp  contato_whatsapp + conversão Ads (secundária)
     4 Lead            form salvo       generate_lead + conversão Ads (PRINCIPAL)
     - Rolagem         20..100%         —   (evento personalizado, só navegador)

   Todo evento Meta leva event_id único, espelhado no servidor (/api/capi;
   o Lead sai de /api/leads, com e-mail e telefone) para deduplicação.
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.ACB_TRACK;
  if (!CFG || !CFG.pixel) return;

  var PIXEL = CFG.pixel;
  var CAPI = CFG.capi || '/api/capi';
  var C = CFG.content || {};
  var ADS = CFG.ads || {};           /* { id: 'AW-...', lead: 'AW-.../label', contato: 'AW-.../label' } */

  function gtagSeguro() {
    if (typeof window.gtag === 'function') window.gtag.apply(null, arguments);
  }

  /* ---------- utilidades ------------------------------------------------- */

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'e' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12);
  }
  function leCookie(nome) {
    var m = document.cookie.match(new RegExp('(?:^|;\\s*)' + nome + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  }
  function guarda(chave, valor, dias) {
    try { localStorage.setItem(chave, valor); } catch (e) { }
    document.cookie = chave + '=' + encodeURIComponent(valor) +
      ';path=/;max-age=' + (dias * 86400) + ';SameSite=Lax';
  }
  function recupera(chave) {
    var v = '';
    try { v = localStorage.getItem(chave) || ''; } catch (e) { }
    return v || leCookie(chave);
  }
  function limpa(s) { return String(s).replace(/[^a-zA-Z0-9_~-]/g, '-'); }

  /* ---------- 1. visitante: external_id anônimo e estável (180 dias) ------ */

  var UID = recupera('_acb_uid');
  if (!UID) UID = uuid();
  guarda('_acb_uid', UID, 180);

  /* ---------- 2. origem da visita (UTM + ids de clique), 90 dias --------- */

  var CHAVES_UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var CHAVES_CLIQUE = ['fbclid', 'gclid', 'gbraid', 'wbraid'];

  var origem = (function () {
    var q = new URLSearchParams(location.search);
    var novo = {}, achou = false;
    CHAVES_UTM.concat(CHAVES_CLIQUE).forEach(function (k) {
      var v = q.get(k);
      if (v) { novo[k] = v; achou = true; }
    });
    if (achou) {           /* último clique em anúncio vence */
      novo.ts = Date.now();
      guarda('_acb_src', JSON.stringify(novo), 90);
      return novo;
    }
    try { return JSON.parse(recupera('_acb_src') || '{}'); } catch (e) { return {}; }
  })();

  /* de onde veio: utm_source > fbclid (meta) > gclid (google) > referrer > direto */
  var FONTE = (function () {
    if (origem.utm_source) return limpa(origem.utm_source);
    if (origem.fbclid) return 'meta';
    if (origem.gclid || origem.gbraid || origem.wbraid) return 'google';
    try {
      var host = document.referrer ? new URL(document.referrer).hostname : '';
      if (host && host !== location.hostname) {
        return limpa(host.replace(/^(www|l|lm|m)\./, '').split('.')[0]);
      }
    } catch (e) { }
    return 'direto';
  })();

  function paramsOrigem() {
    var p = { fonte: FONTE };
    if (origem.utm_campaign) p.campanha = origem.utm_campaign;
    if (origem.utm_content) p.anuncio = origem.utm_content;
    return p;
  }

  /* ---------- 3. _fbp e _fbc first-party, ANTES do pixel ------------------ */

  var DOMINIO = (function () {
    var partes = location.hostname.split('.');
    if (partes.length < 2 || /^[0-9.]+$/.test(location.hostname)) return '';
    for (var i = partes.length - 2; i >= 0; i--) {
      var cand = partes.slice(i).join('.');
      document.cookie = '_acb_t=1;domain=' + cand + ';path=/;max-age=60;SameSite=Lax';
      if (leCookie('_acb_t')) {
        document.cookie = '_acb_t=;domain=' + cand + ';path=/;max-age=0';
        return cand;
      }
    }
    return '';
  })();
  function cookieRaiz(nome, valor, dias) {
    document.cookie = nome + '=' + valor + (DOMINIO ? ';domain=' + DOMINIO : '') +
      ';path=/;max-age=' + (dias * 86400) + ';SameSite=Lax';
  }

  var FBP = leCookie('_fbp');
  if (!FBP) {
    FBP = 'fb.1.' + Date.now() + '.' + String(Math.floor(Math.random() * 1e10)).padStart(10, '0');
    cookieRaiz('_fbp', FBP, 90);
  }
  var FBC = leCookie('_fbc');
  var fbclidAgora = new URLSearchParams(location.search).get('fbclid');
  if (fbclidAgora) {
    FBC = 'fb.1.' + Date.now() + '.' + fbclidAgora;
    cookieRaiz('_fbc', FBC, 90);
  } else if (!FBC && origem.fbclid) {
    FBC = 'fb.1.' + (origem.ts || Date.now()) + '.' + origem.fbclid;
    cookieRaiz('_fbc', FBC, 90);
  }

  /* ---------- 4. Pixel: snippet oficial + init ---------------------------- */

  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = !0;
    t.src = v; s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s)
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  /* autoConfig desligado: evita SubscribedButtonClick e PageView extra sem
     event_id. E-mail/telefone do formulário vão pelo servidor no Lead. */
  fbq('set', 'autoConfig', false, PIXEL);
  fbq('init', PIXEL, { external_id: UID });

  /* ---------- 5. envio: Pixel + CAPI com o MESMO event_id ---------------- */

  var FILA = '_acb_fila';
  function lerFila() { try { return JSON.parse(localStorage.getItem(FILA) || '[]'); } catch (e) { return []; } }
  function salvarFila(f) { try { localStorage.setItem(FILA, JSON.stringify(f.slice(-20))); } catch (e) { } }

  function postar(corpo) {
    return fetch(CAPI, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify(corpo),
      keepalive: true
    }).then(function (r) {
      if (r.status >= 500) throw new Error('capi ' + r.status);
      return true;
    });
  }
  function enviaComRetry(corpo, tentativa) {
    return postar(corpo)['catch'](function () {
      if (tentativa < 1) {
        return new Promise(function (ok) { setTimeout(ok, 1500); })
          .then(function () { return enviaComRetry(corpo, tentativa + 1); });
      }
      var f = lerFila(); f.push(corpo); salvarFila(f);
      return false;
    });
  }
  function paraCapi(nome, params, id) {
    if (!CAPI || !window.fetch) return;
    enviaComRetry({
      event_name: nome,
      event_id: id,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: location.href,
      external_id: UID,
      fbp: FBP,
      fbc: FBC || '',
      custom_data: params || {},
      utm: origem
    }, 0);
  }
  /* reenvia o que ficou pendente (até 24h — a Meta só deduplica em 48h) */
  (function () {
    if (!CAPI || !window.fetch) return;
    var pendentes = lerFila();
    if (!pendentes.length) return;
    salvarFila([]);
    var limite = Math.floor(Date.now() / 1000) - 86400;
    pendentes.forEach(function (c) { if (c && c.event_time > limite) enviaComRetry(c, 1); });
  })();

  function dispara(nome, params) {
    var id = uuid();
    fbq('trackSingle', PIXEL, nome, params || {}, { eventID: id });
    paraCapi(nome, params, id);
    return id;
  }
  function disparaCustom(nome, params) {
    fbq('trackSingleCustom', PIXEL, nome, params || {}, { eventID: uuid() });
  }

  /* ---------- 6. PageView ------------------------------------------------ */

  (function () {
    var id = uuid();
    var p = paramsOrigem();
    fbq('track', 'PageView', p, { eventID: id });
    paraCapi('PageView', p, id);
  })();

  /* ---------- 7. parâmetros de conteúdo ---------------------------------- */

  var maiorMarco = 0;
  function conteudo() {
    var p = paramsOrigem();
    if (maiorMarco) p.rolagem = maiorMarco;
    p.content_name = C.name || document.title;
    p.content_category = C.category || location.pathname.split('/')[1] || 'home';
    p.content_type = 'product';
    p.content_ids = [C.id || location.pathname];
    return p;
  }

  /* ---------- 8. degraus por rolagem / tempo ------------------------------ */

  var feitos = {};
  function umaVez(nome, fn) {
    if (feitos[nome]) return;
    feitos[nome] = true;
    fn();
  }

  function viewContent() {
    var p = conteudo();
    dispara('ViewContent', p);
    gtagSeguro('event', 'view_item', {
      items: [{ item_id: p.content_ids[0], item_name: p.content_name, item_category: p.content_category }]
    });
  }
  var DEGRAUS = [
    { nome: 'ViewContent', scroll: 25, tempo: 10000, fn: viewContent }
  ];
  DEGRAUS.forEach(function (d) {
    setTimeout(function () { umaVez(d.nome, d.fn); }, d.tempo);
  });

  function percentualLido() {
    var raiz = document.documentElement;
    var altura = Math.max(document.body.scrollHeight, raiz.scrollHeight) - window.innerHeight;
    if (altura <= 0) return 100;
    var pct = ((window.pageYOffset || raiz.scrollTop) / altura) * 100;
    return Math.max(0, Math.min(100, Math.round(pct)));
  }

  /* um único evento "Rolagem" com o percentual (a Meta prioriza só 8 eventos
     por domínio no iOS — os lugares ficam para Lead e Contact) */
  var MARCOS = [20, 40, 60, 70, 80, 90, 100];
  function marcaRolagem(pct) {
    for (var i = 0; i < MARCOS.length; i++) {
      var m = MARCOS[i];
      if (pct < m) break;
      umaVez('rolagem' + m, function (marco) {
        return function () {
          maiorMarco = marco;
          var p = paramsOrigem();
          p.percentual = marco;
          p.content_name = C.name || document.title;
          disparaCustom('Rolagem', p);
        };
      }(m));
    }
  }
  var agendado = false;
  function verificaScroll() {
    var pct = percentualLido();
    marcaRolagem(pct);
    DEGRAUS.forEach(function (d) { if (pct >= d.scroll) umaVez(d.nome, d.fn); });
  }
  window.addEventListener('scroll', function () {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(function () { agendado = false; verificaScroll(); });
  }, { passive: true });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(verificaScroll, 1200); });
  } else {
    setTimeout(verificaScroll, 1200);
  }

  /* ---------- 10. clique no WhatsApp = Contact --------------------------- */

  document.addEventListener('click', function (ev) {
    var alvo = ev.target;
    if (!alvo || !alvo.closest) return;
    var link = alvo.closest('a[href*="wa.me"], a[data-wa-msg]');
    if (!link) return;
    /* no máximo 1 Contact a cada 5 min por visitante (evita inflar com
       cliques repetidos) */
    var agora = Date.now(), ult = 0;
    try { ult = Number(sessionStorage.getItem('_acb_wa_ts') || 0); } catch (e) { }
    if (agora - ult < 5 * 60 * 1000) return;
    try { sessionStorage.setItem('_acb_wa_ts', String(agora)); } catch (e) { }

    var p = paramsOrigem();
    p.content_name = C.name || document.title;
    p.content_category = C.category || location.pathname.split('/')[1] || 'home';
    p.canal = 'whatsapp';
    p.posicao_botao = link.classList.contains('wa-float') ? 'flutuante' : 'pagina';
    dispara('Contact', p);
    gtagSeguro('event', 'contato_whatsapp', { posicao_botao: p.posicao_botao, pagina: location.pathname });
    if (ADS.contato) gtagSeguro('event', 'conversion', { send_to: ADS.contato });
  }, true);

  /* ---------- 11. Lead (chamado pelo site-v2.js) -------------------------- */

  /* dados extras que vão junto do formulário para /api/leads: o servidor
     salva a origem no banco e manda o Lead à Meta com o MESMO event_id */
  function dadosLead() {
    var d = {
      event_id: uuid(),
      fonte: FONTE,
      pagina: location.href,
      visitante_id: UID,
      fbp: FBP,
      fbc: FBC || ''
    };
    CHAVES_UTM.concat(CHAVES_CLIQUE).forEach(function (k) { if (origem[k]) d[k] = origem[k]; });
    return d;
  }

  /* lead salvo com sucesso: Pixel (mesmo event_id do servidor) + Google */
  function leadEnviado(dados) {
    if (!dados || !dados.event_id) return;
    var p = paramsOrigem();
    p.content_name = dados.produto || 'Contato direto (home)';
    p.content_category = dados.categoria || dados.origem || 'formulario';
    fbq('trackSingle', PIXEL, 'Lead', p, { eventID: dados.event_id });

    /* Conversões otimizadas do Google: e-mail e telefone (o gtag faz o hash) */
    var tel = String(dados.telefone || '').replace(/\D/g, '');
    if (tel && !/^55/.test(tel) && (tel.length === 10 || tel.length === 11)) tel = '55' + tel;
    gtagSeguro('set', 'user_data', {
      email: String(dados.email || '').trim().toLowerCase(),
      phone_number: tel ? '+' + tel : undefined
    });
    gtagSeguro('event', 'generate_lead', {
      form_name: dados.produto ? 'produto' : 'contato-direto',
      item_name: dados.produto || undefined
    });
    if (ADS.lead) gtagSeguro('event', 'conversion', { send_to: ADS.lead, transaction_id: dados.event_id });
  }

  /* ---------- 12. api pública -------------------------------------------- */

  window.acbTrack = { dispara: dispara, dadosLead: dadosLead, leadEnviado: leadEnviado };

})();
