(function() {
    // Função para encontrar o botão de próxima página (ajuste o seletor conforme necessário)
    function getNextButton() {
        return document.querySelector('button.next-page, .pagination-next, [data-testid="next-page"], span[data-testid="bonsai-icon-caret-right"]') || 
               document.querySelector('a[aria-label="Next"], a[title="Next"]');
    }

    // Função para encontrar o botão de página anterior (ajuste o seletor conforme necessário)
    function getPrevButton() {
        return document.querySelector('button.prev-page, .pagination-prev, [data-testid="prev-page"], span[data-testid="bonsai-icon-caret-left"]') || 
               document.querySelector('a[aria-label="Previous"], a[title="Previous"]');
    }

    // Função para clicar em um botão
    function clickButton(button) {
        if (button) {
            button.click();
            return true;
        }
        return false;
    }

    // Função principal que executa o loop de navegação
    async function pageNavigationLoop() {
        while (true) {
            // Escolhe um número aleatório de páginas para avançar (1 a 5)
            const pagesToMove = Math.floor(Math.random() * 5) + 1;
            
            console.log(`Avançando ${pagesToMove} página(s)`);
            
            // Avança as páginas
            for (let i = 0; i < pagesToMove; i++) {
                const nextButton = getNextButton();
                if (!clickButton(nextButton)) {
                    console.log('Não foi possível encontrar o botão de próxima página');
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1 segundo
            }
            
            console.log(`Voltando ${pagesToMove} página(s)`);
            
            // Volta as páginas
            for (let i = 0; i < pagesToMove; i++) {
                const prevButton = getPrevButton();
                if (!clickButton(prevButton)) {
                    console.log('Não foi possível encontrar o botão de página anterior');
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1 segundo
            }
            
            // Espera 1 segundo antes de começar novamente
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    // Inicia o loop
    pageNavigationLoop();
})();
