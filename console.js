(function() {
    function getNextButton() {
        return document.querySelector('button.next-page, .pagination-next, [data-testid="next-page"], span[data-testid="bonsai-icon-caret-right"]') || 
               document.querySelector('a[aria-label="Next"], a[title="Next"]');
    }

    function getPrevButton() {
        return document.querySelector('button.prev-page, .pagination-prev, [data-testid="prev-page"], span[data-testid="bonsai-icon-caret-left"]') || 
               document.querySelector('a[aria-label="Previous"], a[title="Previous"]');
    }

    function simulateMouseClick(element) {
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const options = { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y };
        element.dispatchEvent(new MouseEvent('mouseover', options));
        element.dispatchEvent(new MouseEvent('mousedown', options));
        element.dispatchEvent(new MouseEvent('mouseup', options));
        element.dispatchEvent(new MouseEvent('click', options));
        return true;
    }

    async function pageNavigationLoop() {
        while (true) {
            const pagesToMove = Math.floor(Math.random() * 5) + 1;
            console.log(`Avançando ${pagesToMove} página(s)`);

            for (let i = 0; i < pagesToMove; i++) {
                const nextButton = getNextButton();
                if (!simulateMouseClick(nextButton)) {
                    console.log('Não foi possível encontrar o botão de próxima página');
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            console.log(`Voltando ${pagesToMove} página(s)`);

            for (let i = 0; i < pagesToMove; i++) {
                const prevButton = getPrevButton();
                if (!simulateMouseClick(prevButton)) {
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
