/* ACB Sul — chat de pré-atendimento antes do WhatsApp (mesmo modelo da Stark Strong).
   Todo botão de WhatsApp do site (a[data-wa-msg], inclusive o flutuante) abre
   este chat em vez de ir direto ao wa.me.

   Fluxo: WhatsApp → nome → assunto (5 opções). Botão com assunto próprio
   (produto, gerador, assistência...) pula a etapa do assunto.
   O TELEFONE É GRAVADO ASSIM QUE É INFORMADO (origem "chat-whatsapp", sem
   e-mail): quem desiste depois fica no painel como "Chat não concluído". Nome
   e assunto completam o mesmo lead (o servidor casa por visitante + telefone).
   No fim: dispara o Contato (Pixel + Google Ads) e abre o WhatsApp com a
   mensagem "Olá, eu me chamo NOME ...". O WhatsApp abre na hora do clique
   (senão o celular bloqueia a nova aba); o lead segue em segundo plano.
   Se este arquivo não carregar, os botões continuam indo direto ao WhatsApp. */
(function () {
  'use strict';
  if (window.acbChat) return;

  var ASSUNTOS = [
    'Comprar um equipamento',
    'Alugar um equipamento (locação)',
    'Assistência técnica ou manutenção',
    'Peças originais',
    'Outros assuntos'
  ];
  /* mensagens "genéricas" (sem assunto definido) → mostram as opções */
  var GENERICA = /Gostaria de falar com a ACB Sul|Vim pelo site e gostaria de/i;

  var SVG_X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  var SVG_SEND = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"/></svg>';

  var painel, corpo, form, input, enviar;
  var etapa = 'whatsapp', nome = '', whats = '', iniciado = false;
  var ctx = { msg: '', num: '', assunto: null, posicao: 'pagina' };

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function rolar() { corpo.scrollTop = corpo.scrollHeight; }
  function bolha(txt, tipo) { var b = el('div', 'wz-msg wz-msg--' + tipo); b.textContent = txt; corpo.appendChild(b); rolar(); return b; }
  function fala(txt, ms) {
    return new Promise(function (ok) {
      var t = el('div', 'wz-typing', '<i></i><i></i><i></i>');
      corpo.appendChild(t); rolar();
      setTimeout(function () { t.remove(); bolha(txt, 'bot'); ok(); }, ms || 700);
    });
  }
  function travar(sim, ph) {
    input.disabled = sim; enviar.disabled = sim;
    if (ph) input.placeholder = ph;
    if (!sim) input.focus();
  }
  function digitos(s) { return String(s).replace(/\D/g, ''); }
  /* mesma regra do servidor (src/lib/antispam.ts): DDD existente e celular com 9 */
  var DDDS = ' 11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99 ';
  function telOk(s) {
    var n = digitos(s);
    if ((n.length === 12 || n.length === 13) && n.indexOf('55') === 0) n = n.slice(2);
    if (n.length === 11 && n[0] === '0') n = n.slice(1);
    if (n.length !== 10 && n.length !== 11) return false;
    if (DDDS.indexOf(' ' + n.slice(0, 2) + ' ') < 0) return false;
    return n.length === 10 || n[2] === '9';
  }

  function montar() {
    painel = el('section', 'wz-panel');
    painel.hidden = true;
    painel.setAttribute('aria-label', 'Atendimento ACB Sul');
    painel.innerHTML =
      '<header class="wz-head">' +
        '<span class="wz-head__avatar"><img src="/logo-acbsul-atlas-copco.svg" alt="" width="40" height="40"></span>' +
        '<span class="wz-head__info"><strong>ACB Sul · Atendimento</strong><span class="wz-head__status"><i></i> Online agora</span></span>' +
        '<button class="wz-head__close" type="button" aria-label="Fechar atendimento">' + SVG_X + '</button>' +
      '</header>' +
      '<div class="wz-body" role="log" aria-live="polite"></div>' +
      '<div class="wz-foot">' +
        '<form class="wz-form" autocomplete="off">' +
          '<input class="wz-input" type="text" placeholder="Escreva sua resposta..." aria-label="Sua resposta">' +
          '<button class="wz-send" type="submit" aria-label="Enviar">' + SVG_SEND + '</button>' +
        '</form>' +
        '<p class="wz-foot__note">Ao enviar, você concorda em ser contatado pela ACB Sul.</p>' +
      '</div>';
    document.body.appendChild(painel);
    corpo = painel.querySelector('.wz-body');
    form = painel.querySelector('.wz-form');
    input = painel.querySelector('.wz-input');
    enviar = painel.querySelector('.wz-send');
    painel.querySelector('.wz-head__close').addEventListener('click', fechar);
    form.addEventListener('submit', responder);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !painel.hidden) fechar(); });
  }

  function abrir(link) {
    if (!painel) montar();
    if (!iniciado) {
      var msg = link.getAttribute('data-wa-msg') || '';
      ctx.msg = msg;
      ctx.num = link.getAttribute('data-wa-num') || '';
      ctx.posicao = link.classList.contains('wa-float') ? 'flutuante' : 'pagina';
      ctx.assunto = (link.classList.contains('wa-float') || GENERICA.test(msg) || !msg) ? null : msg;
    }
    painel.hidden = false;
    painel.classList.add('is-in');
    document.documentElement.classList.add('wz-aberto');
    iniciar();
  }
  function fechar() {
    painel.hidden = true;
    painel.classList.remove('is-in');
    document.documentElement.classList.remove('wz-aberto');
  }

  function iniciar() {
    if (iniciado) { if (!input.disabled) input.focus(); return; }
    iniciado = true;
    travar(true);
    fala('Olá! Sou o atendimento da ACB Sul e vou iniciar o seu atendimento por aqui!', 600)
      .then(function () { return fala('Para começar, qual é o seu WhatsApp com DDD?', 800); })
      .then(function () { input.type = 'tel'; travar(false, 'Ex.: (51) 99999-9999'); });
  }

  function responder(e) {
    e.preventDefault();
    var txt = input.value.trim();
    if (!txt) return;

    if (etapa === 'whatsapp') {
      bolha(txt, 'user'); input.value = '';
      if (!telOk(txt)) { fala('Esse número não parece válido. Envie com DDD, ex.: (51) 99999-9999.', 500); return; }
      whats = txt; etapa = 'nome'; travar(true, 'Aguarde...');
      salvarLead(null); /* grava o telefone já, antes de pedir o resto */
      fala('Anotado! E qual é o seu nome?', 800)
        .then(function () { input.type = 'text'; travar(false, 'Escreva seu nome...'); });
      return;
    }

    if (etapa === 'nome') {
      bolha(txt, 'user'); input.value = '';
      if (txt.length < 2) { fala('Pode me dizer seu nome, por favor?', 500); return; }
      nome = txt; travar(true, 'Aguarde...');
      if (ctx.assunto) { concluir(ctx.assunto); return; } /* clique do envio = gesto do usuário */
      etapa = 'assunto';
      salvarLead(null); /* completa o nome */
      fala('Prazer, ' + nome.split(' ')[0] + '! Por último: qual é o objetivo do seu contato?', 800).then(mostrarOpcoes);
      return;
    }

    if (etapa === 'assunto') {
      bolha(txt, 'user'); input.value = '';
      fala('Escolha uma das opções acima para eu te encaminhar. 🙂', 500);
    }
  }

  function mostrarOpcoes() {
    var box = el('div', 'wz-opts');
    ASSUNTOS.forEach(function (a) {
      var b = el('button', 'wz-opt'); b.type = 'button'; b.textContent = a;
      b.addEventListener('click', function () {
        box.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
        bolha(a, 'user');
        concluir(a);
      });
      box.appendChild(b);
    });
    corpo.appendChild(box); rolar();
    travar(true, 'Escolha uma opção acima');
  }

  /* chamado direto no clique (gesto do usuário) — não pode ter await antes do window.open */
  function concluir(assunto) {
    etapa = 'fim';
    var semOla = String(assunto).replace(/^Olá!?\s*/i, '');
    var texto = ctx.assunto
      ? 'Olá, eu me chamo ' + nome + '. ' + semOla
      : 'Olá, eu me chamo ' + nome + ' e gostaria de falar sobre: ' + assunto + '.';
    var numero = digitos(ctx.num) || digitos((window.ACB_BIZ && window.ACB_BIZ.waNumber) || '') || '555133773626';
    var url = 'https://wa.me/' + numero + '?text=' + encodeURIComponent(texto);

    window.open(url, '_blank', 'noopener');
    salvarLead(assunto);
    try { if (window.acbTrack && window.acbTrack.contato) window.acbTrack.contato(ctx.posicao); } catch (e) { }

    bolha('Perfeito! Abrindo o WhatsApp com a sua mensagem. 👍', 'bot');
    var a = el('a', 'wz-opt wz-opt--link');
    a.href = url; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = 'Não abriu? Toque aqui para abrir o WhatsApp';
    corpo.appendChild(a); rolar();
    travar(true, 'Atendimento encaminhado');
  }

  /* envios em fila (telefone → nome → assunto), com novas tentativas se a rede falhar */
  var fila = Promise.resolve();
  var chatId = 'chat-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);

  function enviarLead(dados, tentativa) {
    return fetch('/api/leads', {
      method: 'POST', keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    }).then(function (r) { if (r.status >= 500) throw new Error('http ' + r.status); })
      .catch(function () {
        if (tentativa >= 3) return;
        return new Promise(function (ok) { setTimeout(ok, 1500 * tentativa); })
          .then(function () { return enviarLead(dados, tentativa + 1); });
      });
  }

  /* assunto null = chat ainda em andamento (só telefone, ou telefone + nome) */
  function salvarLead(assunto) {
    var dados = {};
    try { if (window.acbTrack && window.acbTrack.dadosLead) dados = window.acbTrack.dadosLead(); } catch (e) { }
    delete dados.event_id; /* sem Lead na Meta: o chat conta como Contato, como antes */
    var tema = assunto || ctx.assunto;
    dados.nome = nome;
    dados.telefone = whats;
    dados.origem = 'chat-whatsapp';
    dados.etapa_chat = assunto ? 'fim' : 'parcial';
    dados.produto = tema ? String(tema).replace(/^Olá!?\s*/i, '').slice(0, 200) : '';
    dados.interesse = !assunto ? 'Chat não concluído' : ctx.assunto ? 'Chat WhatsApp (botão da página)' : assunto;
    dados.visitante_id = dados.visitante_id || chatId;
    dados.pagina = dados.pagina || location.href;
    /* anti-robô do servidor: exige 3 s desde que a página abriu */
    var falta = Math.max(0, 3100 - performance.now());
    fila = fila.then(function () {
      return new Promise(function (ok) { setTimeout(ok, falta); });
    }).then(function () {
      dados._t = Math.round(performance.now());
      return enviarLead(dados, 1);
    });
  }

  window.acbChat = { abrir: abrir };

  /* intercepta TODO botão de WhatsApp do site (fase de captura) */
  document.addEventListener('click', function (ev) {
    var t = ev.target;
    if (!t || !t.closest) return;
    var link = t.closest('a[data-wa-msg]');
    if (!link || (painel && painel.contains(link))) return;
    ev.preventDefault();
    abrir(link);
  }, true);
})();
