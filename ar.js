(() => {
  // ====== cria e adiciona estilo =======
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    #pageTurnerMenu {
      position: fixed;
      top: 80px;
      right: 20px;
      width: 320px;
      background: #222;
      color: #eee;
      font-family: Arial, sans-serif;
      border-radius: 8px;
      box-shadow: 0 0 12px rgba(0,0,0,0.7);
      user-select: none;
      z-index: 999999;
    }
    #pageTurnerMenu.menu-minimized {
      width: 160px;
      height: 40px;
      overflow: hidden;
    }
    #pageTurnerMenu .menu-header {
      background: #111;
      padding: 8px 12px;
      cursor: grab;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 8px 8px 0 0;
      font-weight: bold;
      font-size: 14px;
    }
    #pageTurnerMenu .menu-header button {
      background: transparent;
      border: none;
      color: #eee;
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      padding: 0 6px;
    }
    #pageTurnerMenu .menu-content {
      padding: 12px;
      font-size: 13px;
      line-height: 1.3;
    }
    #pageTurnerMenu label {
      display: block;
      margin-bottom: 6px;
      font-weight: normal;
      font-size: 12px;
    }
    #pageTurnerMenu input[type=number] {
      width: 60px;
      padding: 4px 6px;
      border-radius: 4px;
      border: none;
      font-size: 13px;
      margin-bottom: 10px;
    }
    #pageTurnerMenu button.button-start,
    #pageTurnerMenu button#stopBtn {
      width: 100%;
      padding: 8px 0;
      margin-top: 6px;
      border-radius: 6px;
      border: none;
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s ease;
    }
    #pageTurnerMenu button.button-start {
      background: #28a745;
      color: white;
    }
    #pageTurnerMenu button.button-start:disabled {
      background: #555;
      cursor: not-allowed;
    }
    #pageTurnerMenu button#stopBtn {
      background: #dc3545;
      color: white;
      display: none;
    }
    #pageTurnerMenu button#stopBtn:enabled {
      display: block;
    }
    #pageTurnerMenu .status {
      margin-top: 10px;
      font-size: 12px;
      font-weight: normal;
      display: flex;
      align-items: center;
    }
    #pageTurnerMenu .status-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 6px;
      background: gray;
    }
    #pageTurnerMenu .status-running {
      background: limegreen;
    }
    #pageTurnerMenu .status-error {
      background: crimson;
    }
    #pageTurnerMenu .status-idle {
      background: gray;
    }
    #pageTurnerMenu .progress-bar {
      margin-top: 8px;
      height: 6px;
      background: #444;
      border-radius: 4px;
      overflow: hidden;
    }
    #pageTurnerMenu .progress-fill {
      height: 100%;
      width: 0%;
      background: #28a745;
      transition: width 0.3s ease;
    }
  `;
  document.head.appendChild(styleElement);

  // ====== cria o menu =======
  const menu = document.createElement("div");
  menu.id = "pageTurnerMenu";
  menu.innerHTML = `
    <div class="menu-header">
      <span>Auto Passar Página</span>
      <div>
        <button title="Minimizar" onclick="toggleMinimize()">-</button>
        <button title="Fechar" onclick="closeMenu()">x</button>
      </div>
    </div>
    <div class="menu-content">
      <label for="intervalSeconds">Intervalo (segundos):</label>
      <input type="number" id="intervalSeconds" min="0.1" step="0.1" value="0.5" />
      <button class="button-start" onclick="iniciarPassagem()">Iniciar</button>
      <button id="stopBtn" disabled onclick="pararPassagem()">Parar</button>
      <div class="status">
        <div id="statusIndicator" class="status-indicator status-idle"></div>
        <div id="statusText">Parado</div>
      </div>
      <div class="progress-bar">
        <div id="progressFill" class="progress-fill"></div>
      </div>
    </div>
  `;
  document.body.appendChild(menu);

  // ====== variáveis =======
  let intervalId = null;
  let pagesToTurn = 0;
  let pagesTurnedForward = 0;
  let pagesTurnedBack = 0;
  let phase = "idle"; // "idle", "forward", "back", "waiting"
  let isMinimized = false;

  // ====== pega info da página atual =======
  function getPageInfo() {
    // ajustar conforme o seu site. Exemplo: texto "Página 3 / 10"
    const pageTextEl = document.querySelector(".pagination-info"); 
    if (!pageTextEl) return null;
    const text = pageTextEl.textContent.trim();
    const match = text.match(/Página (\d+) \/ (\d+)/i);
    if (!match) return null;
    return {
      current: parseInt(match[1], 10),
      total: parseInt(match[2], 10),
    };
  }

  // ====== clicar no botão próxima página =======
  function nextPage() {
    // ajustar seletor do botão conforme o site
    const nextBtn = document.querySelector("button.next-page");
    if (nextBtn && !nextBtn.disabled) {
      nextBtn.click();
      return true;
    }
    return false;
  }

  // ====== clicar no botão página anterior =======
  function prevPage() {
    // ajustar seletor do botão conforme o site
    const prevBtn = document.querySelector("button.prev-page");
    if (prevBtn && !prevBtn.disabled) {
      prevBtn.click();
      return true;
    }
    return false;
  }

  // ====== atualizar status e barra =======
  function updateStatus(text, indicatorClass, progressPercent = 0) {
    const statusText = document.getElementById("statusText");
    const statusIndicator = document.getElementById("statusIndicator");
    const progressFill = document.getElementById("progressFill");
    statusText.textContent = text;
    statusIndicator.className = `status-indicator ${indicatorClass}`;
    progressFill.style.width = `${progressPercent}%`;
  }

  // ====== função principal do ciclo =======
  async function cyclePages() {
    if (phase === "idle") return;

    const pageInfo = getPageInfo();
    if (!pageInfo) {
      updateStatus("Erro ao obter info da página", "status-error");
      phase = "idle";
      pararPassagem();
      return;
    }

    if (phase === "forward") {
      if (pagesTurnedForward < pagesToTurn && pageInfo.current < pageInfo.total) {
        const clicked = nextPage();
        if (clicked) {
          pagesTurnedForward++;
          updateStatus(`Indo pra frente: ${pagesTurnedForward} / ${pagesToTurn}`, "status-running", (pagesTurnedForward / pagesToTurn) * 50);
        } else {
          updateStatus("Não pode avançar mais", "status-error");
          phase = "back";
          return;
        }
      } else {
        phase = "back";
      }
    } else if (phase === "back") {
      if (pagesTurnedBack < pagesToTurn && pageInfo.current > 1) {
        const clicked = prevPage();
        if (clicked) {
          pagesTurnedBack++;
          updateStatus(`Voltando: ${pagesTurnedBack} / ${pagesToTurn}`, "status-running", 50 + (pagesTurnedBack / pagesToTurn) * 50);
        } else {
          updateStatus("Não pode voltar mais", "status-error");
          phase = "waiting";
          return;
        }
      } else {
        phase = "waiting";
      }
    } else if (phase === "waiting") {
      updateStatus("Esperando 1s para novo ciclo...", "status-idle", 100);
      await new Promise(r => setTimeout(r, 1000));

      // sorteia novo número de páginas e reinicia contadores
      pagesToTurn = Math.floor(Math.random() * 5) + 1;
      pagesTurnedForward = 0;
      pagesTurnedBack = 0;
      phase = "forward";

      updateStatus(`Novo ciclo: passando até ${pagesToTurn} páginas`, "status-idle", 0);
    }
  }

  // ====== loop chamado pelo setInterval =======
  function loop() {
    if (phase === "idle") return;
    cyclePages();
  }

  // ====== iniciar =======
  window.iniciarPassagem = function () {
    if (phase !== "idle") return;

    pagesToTurn = Math.floor(Math.random() * 5) + 1;
    pagesTurnedForward = 0;
    pagesTurnedBack = 0;
    phase = "forward";

    document.querySelector(".button-start").disabled = true;
    const stopBtn = document.getElementById("stopBtn");
    stopBtn.disabled = false;

    updateStatus(`Iniciado: passando até ${pagesToTurn} páginas`, "status-running", 0);

    const intervalSeconds = parseFloat(document.getElementById("intervalSeconds").value);
    const intervalMs = Math.max(intervalSeconds, 0.1) * 1000;

    intervalId = setInterval(loop, intervalMs);
  };

  // ====== parar =======
  window.pararPassagem = function () {
    phase = "idle";
    clearInterval(intervalId);
    intervalId = null;

    document.querySelector(".button-start").disabled = false;
    const stopBtn = document.getElementById("stopBtn");
    stopBtn.disabled = true;

    updateStatus("Parado", "status-idle", 0);
  };

  // ====== minimizar/restaurar menu =======
  window.toggleMinimize = function () {
    const menu = document.getElementById("pageTurnerMenu");
    isMinimized = !isMinimized;
    if (isMinimized) {
      menu.classList.add("menu-minimized");
    } else {
      menu.classList.remove("menu-minimized");
    }
  };

  // ====== fechar menu =======
  window.closeMenu = function () {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    const menu = document.getElementById("pageTurnerMenu");
    menu.remove();
    styleElement.remove();
  };

  // ====== drag para mover menu =======
  (() => {
    const menu = document.getElementById("pageTurnerMenu");
    const header = menu.querySelector(".menu-header");
    let isDragging = false;
    let startX, startY;

    header.style.userSelect = "none";

    header.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX - menu.offsetLeft;
      startY = e.clientY - menu.offsetTop;
      document.body.style.userSelect = "none";
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
      document.body.style.userSelect = "";
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      menu.style.left = e.clientX - startX + "px";
      menu.style.top = e.clientY - startY + "px";
      menu.style.right = "auto";
      menu.style.bottom = "auto";
      menu.style.position = "fixed";
    });
  })();
})();
