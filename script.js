const menuButton = document.querySelector('[data-menu]');
const menuClose = document.querySelector('[data-menu-close]');
const overlay = document.querySelector('[data-overlay]');
const nav = document.querySelector('[data-nav]');

if (menuButton && nav) {
  const openMenu = () => {
    nav.classList.add('is-open');
    document.body.classList.add('nav-open');
    if (overlay) {
      overlay.hidden = false;
      // 다음 프레임에 클래스를 붙여 트랜지션이 자연스럽게 재생되도록 함
      requestAnimationFrame(() => overlay.classList.add('is-visible'));
    }
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', '메뉴 닫기');
  };

  const closeMenu = () => {
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    if (overlay) {
      overlay.classList.remove('is-visible');
      const hide = () => {
        overlay.hidden = true;
        overlay.removeEventListener('transitionend', hide);
      };
      overlay.addEventListener('transitionend', hide);
    }
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '메뉴 열기');
  };

  menuButton.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (menuClose) {
    menuClose.addEventListener('click', closeMenu);
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // 메뉴 안의 링크를 누르면 닫기
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // ESC 키로 닫기
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // 데스크톱 폭으로 넓어지면 열린 상태를 초기화
  const desktopQuery = window.matchMedia('(min-width: 981px)');
  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) {
      closeMenu();
    }
  });
}
