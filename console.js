(function() {
    function getNextButton() {
        return document.querySelector('button.next-page, .pagination-next, [data-testid="next-page"], span[data-testid="bonsai-icon-caret-right"]') || 
               document.querySelector('a[aria-label="Next"], a[title="Next"]');
    }

    function getPrevButton() {
        return document.querySelector('button.prev-page, .pagination-prev, [data-testid="prev-page"], span[data-testid="bonsai-icon-caret-left"]') || 
               document.querySelector('a[aria-label="Previous"], a[title="Previous"]');
    }

    function clickButton(button) {
        if (button) {
            button.click();
            return true;
        }
        return false;
    }

    async function pageNavigationLoop() {
        while (true) {
            const pagesToMove = Math.floor(Math.random() * 5) + 1;
            console.log(`Avançando ${pagesToMove} página(s)`);

            for (let i = 0; i < pagesToMove; i++) {
                const nextButton = getNextButton();
                if (!clickButton(nextButton)) {
                    console.log('Não foi possível encontrar o botão de próxima página');
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            console.log(`Voltando ${pagesToMove} página(s)`);

            for (let i = 0; i < pagesToMove; i++) {
                const prevButton = getPrevButton();
                if (!clickButton(prevButton)) {
                    console.log('Não foi possível encontrar o botão de página anterior');
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    pageNavigationLoop();
})();
