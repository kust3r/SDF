// ====== CONFIGURAÇÃO ====== //
const DELAY_ENTRE_PAGINAS = 1000; // 1 segundo
const TEMPO_MAX_INATIVIDADE = 5000; // 5 segundos

// ====== VARIÁVEIS GLOBAIS ====== //
let lastActivity = Date.now();
let isRunning = true;
let intervalId = null;

// ====== DETECTA ATIVIDADE (CLIQUES/MOVIMENTO) ====== //
document.addEventListener('click', () => { lastActivity = Date.now(); });
document.addEventListener('mousemove', () => { lastActivity = Date.now(); });

// ====== FUNÇÃO PARA VIRAR PÁGINAS ====== //
function virarPaginas() {
    if (!isRunning) return;

    // Verifica se o usuário está inativo (se sim, pausa temporariamente)
    const usuarioAtivo = (Date.now() - lastActivity) < TEMPO_MAX_INATIVIDADE;
    if (!usuarioAtivo) {
        console.log("[PAUSADO] Usuário inativo - esperando movimento/clique...");
        return;
    }

    // Escolhe um número aleatório de páginas (1 a 5)
    const qtdPaginas = Math.floor(Math.random() * 5) + 1;
    console.log(`Indo ${qtdPaginas} página(s) pra frente...`);

    // Encontra os botões de próxima/anterior (AJUSTE OS SELETORES CONFORME SEU SITE!)
    const btnProximo = document.querySelector('button.next, .proximo, [aria-label="Next"]');
    const btnAnterior = document.querySelector('button.prev, .anterior, [aria-label="Previous"]');

    // Função auxiliar para clicar em um botão
    function clickButton(btn) {
        if (btn) {
            btn.click();
            return true;
        }
        return false;
    }

    // Avança as páginas
    for (let i = 0; i < qtdPaginas; i++) {
        if (!clickButton(btnProximo)) {
            console.error("Não encontrou o botão de próxima página!");
            return;
        }
    }

    // Volta as páginas depois de 1 segundo
    setTimeout(() => {
        console.log(`Voltando ${qtdPaginas} página(s)...`);
        for (let i = 0; i < qtdPaginas; i++) {
            if (!clickButton(btnAnterior)) {
                console.error("Não encontrou o botão de página anterior!");
                return;
            }
        }
    }, DELAY_ENTRE_PAGINAS);
}

// ====== INICIA O PROCESSO ====== //
intervalId = setInterval(virarPaginas, DELAY_ENTRE_PAGINAS + 2000);

console.log("✅ Script iniciado! Ele detectará cliques/movimento para evitar pausas.");

// ====== PARA O SCRIPT (execute no console quando quiser parar) ====== //
// clearInterval(intervalId);
