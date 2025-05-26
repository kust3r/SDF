(function() {
    function getNextButton() {
        return document.querySelector('button[aria-label*="próxima"], button[title*="próxima"], a[aria-label*="próxima"], a[title*="próxima"], span[aria-label*="próxima"], .next, .next-page');
    }

    function getPrevButton() {
        return document.querySelector('button[aria-label*="anterior"], button[title*="anterior"], a[aria-label*="anterior"], a[title*="anterior"], span[aria-label*="anterior"], .prev, .prev-page');
    }

    function clickButton(button) {
        if (button) {
            button.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
            button.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
            button.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
            button.click();
            return true;
        }
        return false;
    }

    async function pageNavigationLoop() {
        console.log("Script iniciado! Ele detectará cliques/movimento para evitar pausas.");
        while (true) {
            const pagesToMove = Math.floor(Math.random() * 5) + 1;
            console.log(`Indo ${pagesToMove} página(s) pra frente...`);
            for (let i = 0; i < pagesToMove; i++) {
                const nextButton = getNextButton();
                if (!clickButton(nextButton)) {
                    console.log("❌ Não encontrou o botão de próxima página!");
                    console.log("[PAUSADO] Usuário inativo — esperando movimento/clique...");
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            console.log(`Voltando ${pagesToMove} página(s)...`);
            for (let i = 0; i < pagesToMove; i++) {
                const prevButton = getPrevButton();
                if (!clickButton(prevButton)) {
                    console.log("❌ Não encontrou o botão de página anterior!");
                    console.log("[PAUSADO] Usuário inativo — esperando movimento/clique...");
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    pageNavigationLoop();
})();
