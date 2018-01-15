import { getStyle } from './comm.js'

export const loadMore = {
  directives: {
    'load-more': {
      bind: (el, binding) => {
        let windowHeight = window.screen.height;
        let startY, endY;
        let scrolType = el.attributes.type && el.attributes.type.value;
        let scrollEl, height, bottomH;
        if (scrolType == 2) {
          scrollEl = el;
          height = document.getElementById('M_scrollPanel').clientHeight;
        } else {
          scrollEl = document.body;
        }
        el.addEventListener('touchstart', (e) => {
          startY = e.touches[0].clientY;
        }, false)

        el.addEventListener('touchmove', (e) => {
          endY = e.touches[0].clientY;
        }, false)

        el.addEventListener('touchend', () => {
          loadMore();
        }, false)

        const loadMore = () => {
          let isScrollBottom;
          if (scrolType == 2) {
            isScrollBottom = scrollEl.scrollTop >= height - windowHeight - 2 + getStyle(scrollEl, 'bottom');
          } else {
            isScrollBottom = scrollEl.scrollTop >= scrollEl.clientHeight - windowHeight - 2;
          }
          if (endY < startY && isScrollBottom) {
            binding.value();
          }
        }
      }
    }
  }
}
