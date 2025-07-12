const Popover = require('./popover');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');

  try {
    new Popover(document.getElementById('topBtn'), {
      title: 'Popover сверху',
      content: 'Это popover, расположенный сверху от элемента',
      position: 'top',
    });

    new Popover(document.getElementById('bottomBtn'), {
      title: 'Popover снизу',
      content: 'Это popover, расположенный снизу от элемента',
      position: 'bottom',
    });

    new Popover(document.getElementById('leftBtn'), {
      title: 'Popover слева',
      content: 'Это popover, расположенный слева от элемента',
      position: 'left',
    });

    new Popover(document.getElementById('rightBtn'), {
      title: 'Popover справа',
      content: 'Это popover, расположенный справа от элемента',
      position: 'right',
    });

    console.log('All popovers initialized');
  } catch (error) {
    console.error('Error initializing popovers:', error);
  }
});
