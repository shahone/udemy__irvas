import {checkNumInputs} from './checkNumInputs';

export const forms = (state) => {
  const form = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input'),
    windows = document.querySelectorAll('[data-modal]');

  checkNumInputs('input[name="user_phone"]');

  // сброс форм
  const resetInputs = () => {
    inputs.forEach(item => item.value = '');
  };

  const message = {
    loading: 'идет отправка...',
    success: 'отправлено',
    failure: 'ошибка',
  };
  // берем форму
  form.forEach(item => {
    item.addEventListener('submit', (e) => {
      e.preventDefault(); // отключаем перезагрузку после отправки
      // создаём окно со статусом отправки
      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.appendChild(statusMessage);
      // собираем данные
      // объект FormData собират все введённые данные
      const formData = new FormData(item);
      if (item.getAttribute('data-calc') === 'end') {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }
      // функция отправки
      const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        //фетч отправляет данные на сервер. происходит обработка, а на это нужно время. код не ждет - работает дальше.
        //Это может привести к ошибке.
        //Чтобы это не произошло призываем код подождать с помощью async/await
        //async указывает что код асинхронный
        //await что именно ждем
        let result = await fetch(url, {
          method: 'POST',
          body: data
        });

        return await result.text(); //text() — если серверный файл возвращает текстовые данные
      };
      // отправляем
      postData('assets/server.php', formData) // получаем промис
        // дожидаемся, выполняем
        .then(res => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        // если что-то пощло не так
        .catch(() => statusMessage.textContent = message.failure)
        // выполняется в любом случае
        .finally(() => {
          resetInputs();
          setTimeout(() => {
            // statusMessage.remove();
            windows.forEach(item => {
              item.style.display = 'none';
            });
          }, 5000);
        });

    });
  });
};