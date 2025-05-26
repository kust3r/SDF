(function () {
  // botão de próxima página
  function getNextButton() {
    return document.querySelector('button.next-page, .pagination-next, [data-testid="next-page"], span[data-testid="bonsai-icon-caret-right"]') ||
      document.querySelector('a[aria-label="Next"], a[title="Next"]');
  }

  // botão de página anterior
  function getPrevButton() {
    return document.querySelector('button.prev-page, .pagination-prev, [data-testid="prev-page"], span[data-testid="bonsai-icon-caret-left"]') ||
      document.querySelector('a[aria-label="Previous"], a[title="Previous"]');
  }

  // simula clique de mouse realista
  function simulateClick(el) {
    if (!el) return false;

    const eventOptions = {
      bubbles: true,
      cancelable: true,
      view: window
    };

    ['mouseover', 'mousedown', 'mouseup', 'click'].forEach(type => {
      const event = new MouseEvent(type, eventOptions);
      el.dispatchEvent(event);
    });

    return true;
  }

  // elemento que será clicado em cada página (AJUSTE O SELETOR AQUI)
  function getElementToClick() {
    return document.querySelector('.elemento-a-ser-clicado, button.exemplo, .algum-outro-seletor');
  }

  // clica no botão, se existir
  function clickButton(button) {
    if (button) {
      button.click();
      return true;
    }
    return false;
  }

  // loop principal
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

        await new Promise(r => setTimeout(r, 1000));

        const el = getElementToClick();
        if (!simulateClick(el)) {
          console.log('Não foi possível clicar no elemento alvo');
        } else {
          console.log('Clique simulado após avanço');
        }

        await new Promise(r => setTimeout(r, 1000));
      }

      console.log(`Voltando ${pagesToMove} página(s)`);

      for (let i = 0; i < pagesToMove; i++) {
        const prevButton = getPrevButton();
        if (!clickButton(prevButton)) {
          console.log('Não foi possível encontrar o botão de página anterior');
          return;
        }

        await new Promise(r => setTimeout(r, 1000));

        const el = getElementToClick();
        if (!simulateClick(el)) {
          console.log('Não foi possível clicar no elemento alvo');
        } else {
          console.log('Clique simulado após retrocesso');
        }

        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  // iniciar
  pageNavigationLoop();
})();
