(function() {
    if (document.getElementById("pageTurnerMenu")) {
        document.getElementById("pageTurnerMenu").remove();
    }

    const styleElement = document.createElement("style");
    styleElement.textContent = `.page-turner-menu {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 320px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        z-index: 10000;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: white;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
        transition: all 0.3s ease;
    }
    .menu-header {
        padding: 20px;
        text-align: center;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        cursor: grab;
    }
    .menu-header:active {
        cursor: grabbing;
    }
    .menu-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 5px;
    }
    .menu-subtitle {
        font-size: 12px;
        opacity: 0.8;
    }
    .menu-content {
        padding: 20px;
    }
    .input-group {
        margin-bottom: 20px;
    }
    .input-label {
        display: block;
        font-size: 14px;
        margin-bottom: 8px;
        font-weight: 500;
    }
    .input-field {
        width: 100%;
        padding: 12px 16px;
        border: none;
        border-radius: 8px;
        background: rgba(255,255,255,0.1);
        color: white;
        font-size: 16px;
        backdrop-filter: blur(5px);
        transition: all 0.3s ease;
    }
    .input-field::placeholder {
        color: rgba(255,255,255,0.6);
    }
    .input-field:focus {
        outline: none;
        background: rgba(255,255,255,0.2);
        transform: scale(1.02);
    }
    .button {
        width: 100%;
        padding: 14px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 10px;
        position: relative;
        overflow: hidden;
    }
    .button-start {
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
    }
    .button-start:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(76, 175, 80, 0.4);
    }
    .button-stop {
        background: linear-gradient(135deg, #f44336, #d32f2f);
        color: white;
    }
    .button-stop:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(244, 67, 54, 0.4);
    }
    .button-stop:disabled {
        background: #666;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
    .status-panel {
        background: rgba(0,0,0,0.2);
        border-radius: 8px;
        padding: 15px;
        margin-top: 15px;
    }
    .status-title {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
    }
    .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 8px;
        animation: pulse 2s infinite;
    }
    .status-idle { background: #ff9800; }
    .status-running { background: #4CAF50; }
    .status-error { background: #f44336; }
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
    .status-info {
        font-size: 12px;
        line-height: 1.4;
        opacity: 0.9;
    }
    .progress-bar {
        width: 100%;
        height: 4px;
        background: rgba(255,255,255,0.2);
        border-radius: 2px;
        margin-top: 10px;
        overflow: hidden;
    }
    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #4CAF50, #8BC34A);
        width: 0%;
        transition: width 0.3s ease;
    }
    .minimize-btn {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 20px;
        height: 20px;
        border: none;
        background: rgba(255,255,255,0.2);
        color: white;
        border-radius: 50%;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.3s ease;
    }
    .minimize-btn:hover {
        background: rgba(255,255,255,0.3);
        transform: scale(1.1);
    }
    .close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        border: none;
        background: rgba(255,255,255,0.2);
        color: white;
        border-radius: 50%;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.3s ease;
    }
    .close-btn:hover {
        background: rgba(255,0,0,0.6);
        transform: scale(1.1);
    }
    .menu-minimized {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    .menu-minimized .menu-content,
    .menu-minimized .menu-header {
        display: none;
    }
    .expand-indicator {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        cursor: pointer;
    }
    .menu-minimized .expand-indicator {
        display: block;
    }`;
    document.head.appendChild(styleElement);

    document.body.insertAdjacentHTML("beforeend", `
        <div class="page-turner-menu" id="pageTurnerMenu">
            <button class="minimize-btn" onclick="window.toggleMinimize()">−</button>
            <button class="close-btn" onclick="window.closeMenu()">×</button>
            <div class="expand-indicator" onclick="window.toggleMinimize()">📖</div>
            
            <div class="menu-header">
                <div class="menu-title">🚀 Auto Reader</div>
                <div class="menu-subtitle">Feito Por iUnknownBr</div>
            </div>
            
            <div class="menu-content">
                <div class="input-group">
                    <label class="input-label">⏱️ Tempo total (minutos)</label>
                    <input type="number" class="input-field" id="tempoTotal" placeholder="Ex: 30" min="0.1" step="0.1">
                </div>
                
                <button class="button button-start" onclick="window.iniciarPassagem()">
                    ▶️ Iniciar Passagem
                </button>
                <button class="button button-stop" onclick="window.pararPassagem()" disabled id="stopBtn">
                    ⏹️ Parar Passagem
                </button>
                
                <div class="status-panel">
                    <div class="status-title">
                        <div class="status-indicator status-idle" id="statusIndicator"></div>
                        Status: <span id="statusText">Aguardando</span>
                    </div>
                    <div class="status-info" id="statusInfo">
                        Insira o tempo desejado e clique em "Iniciar Passagem"
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progressFill"></div>
                    </div>
                </div>
            </div>
        </div>
    `);

    let intervalId = null;
    let currentPage = 0;
    let totalPages = 0;
    let pagesTurned = 0;
    let isMinimized = false;

    window.toggleMinimize = function() {
        const menu = document.getElementById('pageTurnerMenu');
        isMinimized = !isMinimized;
        if (isMinimized) {
            menu.classList.add("menu-minimized");
        } else {
            menu.classList.remove('menu-minimized');
        }
    };

    window.closeMenu = function() {
        if (intervalId) {
            clearInterval(intervalId);
        }
        document.getElementById("pageTurnerMenu").remove();
        console.log("📖 Menu fechado. Para reabrir, execute o script novamente.");
    };

    function updateStatus(status, text, info) {
        const indicator = document.getElementById("statusIndicator");
        const statusText = document.getElementById("statusText");
        const statusInfo = document.getElementById("statusInfo");
        
        if (indicator && statusText && statusInfo) {
            indicator.className = "status-indicator status-" + status;
            statusText.textContent = text;
            statusInfo.textContent = info;
        }
    }

    function updateProgress(current, total) {
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            const percentage = total > 0 ? current / total * 100 : 0;
            progressFill.style.width = percentage + '%';
        }
    }

    function getPageInfo() {
        const pageElement = document.querySelector("span.sc-nrcsN.gqbRXz");
        if (!pageElement) return null;
        
        const pageText = pageElement.textContent.trim();
        const pageMatch = pageText.match(/(\d+)\s+de\s+(\d+)/);
        
        if (!pageMatch) {
            console.log("❌ Formato da página não reconhecido:", pageText);
            return null;
        }
        
        return {
            current: parseInt(pageMatch[1]),
            total: parseInt(pageMatch[2])
        };
    }

    function turnPage() {
        const nextButton = document.querySelector("span[data-testid=\"bonsai-icon-caret-right\"]");
        if (!nextButton) return false;
        
        const buttonElement = nextButton.closest("button") || nextButton.parentElement;
        return buttonElement ? (buttonElement.click(), true) : (nextButton.click(), true);
    }

    window.iniciarPassagem = function() {
        const timeInput = document.getElementById("tempoTotal");
        const totalMinutes = parseFloat(timeInput.value);
        
        if (!totalMinutes || totalMinutes <= 0) {
            alert("Por favor, insira um tempo válido!");
            return;
        }
        
        const pageInfo = getPageInfo();
        if (!pageInfo) {
            updateStatus("error", "Erro", "Não foi possível encontrar as informações da página");
            return;
        }
        
        currentPage = pageInfo.current;
        totalPages = pageInfo.total;
        const pagesRemaining = totalPages - currentPage;
        
        if (pagesRemaining <= 0) {
            updateStatus("idle", "Concluído", "Você já está na última página!");
            return;
        }
        
        const intervalTime = totalMinutes * 60 * 1000 / pagesRemaining;
        pagesTurned = 0;
        
        updateStatus("running", 'Executando', "Passando " + pagesRemaining + " páginas em " + totalMinutes + " min");
        updateProgress(0, pagesRemaining);
        
        const stopButton = document.getElementById("stopBtn");
        const startButton = document.querySelector(".button-start");
        
        if (stopButton) stopButton.disabled = false;
        if (startButton) startButton.disabled = true;
        
        intervalId = setInterval(() => {
            const currentPageInfo = getPageInfo();
            
            if (!currentPageInfo) {
                window.pararPassagem();
                updateStatus('error', "Erro", "Erro ao obter informações da página");
                return;
            }
            
            if (currentPageInfo.current >= currentPageInfo.total) {
                window.pararPassagem();
                updateStatus('idle', "Concluído", "Todas as " + pagesTurned + " páginas foram passadas!");
                updateProgress(pagesTurned, pagesTurned);
                return;
            }
            
            if (turnPage()) {
                pagesTurned++;
                updateStatus("running", "Executando", "Página " + currentPageInfo.current + " → " + (currentPageInfo.current + 1) + " (" + pagesTurned + '/' + pagesRemaining + ')');
                updateProgress(pagesTurned, pagesRemaining);
            } else {
                window.pararPassagem();
                updateStatus("error", "Erro", "Não foi possível passar para a próxima página");
            }
        }, intervalTime);
    };

    window.pararPassagem = function() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        
        const stopButton = document.getElementById("stopBtn");
        const startButton = document.querySelector('.button-start');
        
        if (stopButton) stopButton.disabled = true;
        if (startButton) startButton.disabled = false;
        
        if (pagesTurned > 0) {
            updateStatus("idle", "Parado", "Processo interrompido. " + pagesTurned + " páginas foram passadas.");
        } else {
            updateStatus("idle", "Aguardando", "Processo parado. Pronto para nova execução.");
        }
    };

    let isDragging = false;
    let dragStartX, dragStartY, dragOffsetX, dragOffsetY, lastX, lastY;
    const menu = document.getElementById('pageTurnerMenu');
    const menuHeader = menu.querySelector(".menu-header");

    function startDrag(e) {
        if (e.target.closest(".input-field") || e.target.closest(".button")) return;
        
        dragOffsetX = e.clientX - lastX;
        dragOffsetY = e.clientY - lastY;
        
        if (e.target === menuHeader || menuHeader.contains(e.target)) {
            isDragging = true;
        }
    }

    function handleDrag(e) {
        if (isDragging) {
            e.preventDefault();
            lastX = e.clientX - dragOffsetX;
            lastY = e.clientY - dragOffsetY;
            menu.style.transform = "translate(" + lastX + "px, " + lastY + "px)";
        }
    }

    function endDrag() {
        isDragging = false;
    }

    menuHeader.addEventListener('mousedown', startDrag);
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", endDrag);

    console.log("🚀 Menu interativo carregado com sucesso!");
    console.log("🚀 Feito Por iUnknownBr");
    console.log("�📖 O menu está visível no canto superior direito da tela.");
    console.log("🎛️ Use os controles do menu para iniciar a passagem automática.");
    
    updateStatus("idle", "Aguardando", "Insira o tempo desejado e clique em \"Iniciar Passagem\"");
})();
