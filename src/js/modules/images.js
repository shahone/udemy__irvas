export const images = () => {
  const imgPopup = document.createElement('div'),
    workSection = document.querySelector('.works'),
    bigImg = document.createElement('img');

  workSection.appendChild(imgPopup);
  imgPopup.classList.add('popup');
  imgPopup.style.justifyContent = 'center';
  imgPopup.style.alignItems = 'center';
  imgPopup.style.display = 'none';

  imgPopup.appendChild(bigImg);
  bigImg.style.cssText = `
    max-width: 720px;
    max-height: 540px;
    object-fit: cover;
  `;


  workSection.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target && e.target.classList.contains('preview')) {
      document.body.style.overflow = 'hidden';
      imgPopup.style.display = 'flex';
      const path = e.target.parentNode.getAttribute('href');
      bigImg.setAttribute('src', path);
    }

    if (e.target && e.target.matches('div.popup')) {
      imgPopup.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
};