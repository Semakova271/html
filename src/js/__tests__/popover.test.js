const { JSDOM } = require('jsdom');
const Popover = require('../popover');

describe('Popover Widget', () => {
  let window;
  let document;
  let topBtn;
  let bottomBtn;

  beforeAll(() => {
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            .popover-container {
              position: absolute;
              display: none;
            }
          </style>
        </head>
        <body>
          <button id="topBtn">Top Button</button>
          <button id="bottomBtn">Bottom Button</button>
        </body>
      </html>
    `, {
      runScripts: 'dangerously',
      resources: 'usable',
    });

    window = dom.window;
    document = window.document;

    global.window = window;
    global.document = document;

    topBtn = document.getElementById('topBtn');
    bottomBtn = document.getElementById('bottomBtn');

    new Popover(topBtn, {
      title: 'Popover сверху',
      content: 'Это popover, расположенный сверху от элемента',
      position: 'top',
    });

    new Popover(bottomBtn, {
      title: 'Popover снизу',
      content: 'Это popover, расположенный снизу от элемента',
      position: 'bottom',
    });
  });

  test('Popover появляется при клике на кнопку', () => {
    topBtn.click();
    const popover = document.querySelector('.popover-container');
    expect(popover.style.display).toBe('block');
  });

  test('Popover содержит правильный заголовок и контент', () => {
    topBtn.click();
    const title = document.querySelector('.popover-header').textContent;
    const content = document.querySelector('.popover-body').textContent;
    expect(title).toBe('Popover сверху');
    expect(content).toBe('Это popover, расположенный сверху от элемента');
  });

  test('Popover закрывается при повторном клике на кнопку', () => {
    topBtn.click(); // Открываем
    topBtn.click(); // Закрываем
    const popover = document.querySelector('.popover-container');
    expect(popover.style.display).toBe('none');
  });

  test('Popover закрывается при клике вне области', () => {
    topBtn.click(); // Открываем
    document.body.click(); // Кликаем вне области
    const popover = document.querySelector('.popover-container');
    expect(popover.style.display).toBe('none');
  });

  test('Одновременно открыт только один popover', () => {
    topBtn.click(); // Открываем первый

    // Проверяем, что открыт
    let popovers = document.querySelectorAll('.popover-container');
    let visibleCount = Array.from(popovers).filter((p) => p.style.display === 'block').length;
    expect(visibleCount).toBe(1);

    bottomBtn.click(); // Открываем второй

    // Проверяем, что открыт только один
    popovers = document.querySelectorAll('.popover-container');
    visibleCount = Array.from(popovers).filter((p) => p.style.display === 'block').length;
    expect(visibleCount).toBe(1);
  });
});
