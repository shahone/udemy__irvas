export const tabs = (headerSelector, tabSelector, tabLink, contentSelector, activeClass, display = 'block') => {

  const header = document.querySelector(headerSelector),
    tab = document.querySelectorAll(tabSelector),
    link = document.querySelectorAll(tabLink),
    content = document.querySelectorAll(contentSelector);

  function hideContent() {
    content.forEach(item => {
      item.style.display = 'none';
    });

    link.forEach (item => {
      item.classList.remove(activeClass);
    });
  }
  function showContent(i = 0) {
    content[i].style.display = display;
    link[i].classList.add(activeClass);
  }

  hideContent();
  showContent();

  header.addEventListener('click', (e) => {
    const target = e.target;
    if (target && (target.classList.contains(tabSelector.replace(/\./, '')) || target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {
      tab.forEach((item, i) => {
        if (target == item || target.parentNode == item) {
          hideContent();
          showContent(i);
        }
      });
    }

  });
};