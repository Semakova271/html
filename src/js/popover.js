class Popover {
  constructor(element, options = {}) {
    this.element = element;
    this.title = options.title || 'Popover title';
    this.content = options.content || 'And here\'s some amazing content. It\'s very engaging. Right?';
    this.position = options.position || 'top';
    this.popover = null;

    this.init();
  }

  init() {
    this.createPopover();

    this.element.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    document.addEventListener('click', (e) => {
      if (this.popover.style.display === 'block'
        && !this.popover.contains(e.target)
        && !this.element.contains(e.target)) {
        this.hide();
      }
    });
  }

  createPopover() {
    this.popover = document.createElement('div');
    this.popover.className = 'popover-container';
    this.popover.style.display = 'none';

    const header = document.createElement('div');
    header.className = 'popover-header';
    header.textContent = this.title;

    const body = document.createElement('div');
    body.className = 'popover-body';
    body.textContent = this.content;

    const arrow = document.createElement('div');
    arrow.className = 'popover-arrow';

    this.popover.appendChild(header);
    this.popover.appendChild(body);
    this.popover.appendChild(arrow);

    document.body.appendChild(this.popover);
  }

  toggle() {
    if (this.popover.style.display === 'block') {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    this.positionPopover();
    this.popover.style.display = 'block';
  }

  hide() {
    this.popover.style.display = 'none';
  }

  positionPopover() {
    const elemRect = this.element.getBoundingClientRect();
    const popoverRect = this.popover.getBoundingClientRect();
    const { scrollY } = window;
    const { scrollX } = window;

    const arrow = this.popover.querySelector('.popover-arrow');
    arrow.style.border = 'none';

    switch (this.position) {
      case 'top':
        this.popover.style.top = `${elemRect.top + scrollY - popoverRect.height - 10}px`;
        this.popover.style.left = `${elemRect.left + scrollX + elemRect.width / 2 - popoverRect.width / 2}px`;
        arrow.style.transform = 'rotate(225deg)';
        arrow.style.bottom = '-10px';
        arrow.style.top = 'auto';
        arrow.style.left = `${popoverRect.width / 2 - 10}px`;
        arrow.style.borderRight = '1px solid #ddd';
        arrow.style.borderBottom = '1px solid #ddd';
        break;

      case 'bottom':
        this.popover.style.top = `${elemRect.bottom + scrollY + 10}px`;
        this.popover.style.left = `${elemRect.left + scrollX + elemRect.width / 2 - popoverRect.width / 2}px`;
        arrow.style.transform = 'rotate(45deg)';
        arrow.style.top = '-10px';
        arrow.style.bottom = 'auto';
        arrow.style.left = `${popoverRect.width / 2 - 10}px`;
        arrow.style.borderRight = '1px solid #ddd';
        arrow.style.borderBottom = '1px solid #ddd';
        break;

      case 'left':
        this.popover.style.top = `${elemRect.top + scrollY + elemRect.height / 2 - popoverRect.height / 2}px`;
        this.popover.style.left = `${elemRect.left + scrollX - popoverRect.width - 10}px`;
        arrow.style.transform = 'rotate(-45deg)';
        arrow.style.top = `${popoverRect.height / 2 - 10}px`;
        arrow.style.right = '-10px';
        arrow.style.left = 'auto';
        arrow.style.borderRight = '1px solid #ddd';
        arrow.style.borderBottom = '1px solid #ddd';
        break;

      case 'right':
        this.popover.style.top = `${elemRect.top + scrollY + elemRect.height / 2 - popoverRect.height / 2}px`;
        this.popover.style.left = `${elemRect.right + scrollX + 10}px`;
        arrow.style.transform = 'rotate(135deg)';
        arrow.style.top = `${popoverRect.height / 2 - 10}px`;
        arrow.style.left = '-10px';
        arrow.style.borderRight = '1px solid #ddd';
        arrow.style.borderBottom = '1px solid #ddd';
        break;
      default:
        // Позиция по умолчанию
        this.popover.style.top = `${elemRect.top + scrollY - popoverRect.height - 10}px`;
        this.popover.style.left = `${elemRect.left + scrollX + elemRect.width / 2 - popoverRect.width / 2}px`;
    }
  }
}

module.exports = Popover;
