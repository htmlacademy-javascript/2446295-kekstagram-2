const SERVER_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

// Функция для получения данных
const getData = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/data`);
    if (!response.ok) {
      throw new Error('Не удалось загрузить данные с сервера');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Ошибка при загрузке данных: ' + error.message);
  }
};

// Функция для отправки данных
const sendData = async (data) => {
  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      body: data,
    });
    if (!response.ok) {
      throw new Error('Не удалось отправить данные на сервер');
    }
    return response;
  } catch (error) {
    throw new Error('Ошибка при отправке данных: ' + error.message);
  }
};

export { getData, sendData };
