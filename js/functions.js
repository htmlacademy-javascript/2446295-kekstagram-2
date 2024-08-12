//функция, которая проверяет длину строки
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

//Функция для проверки, является ли строка палиндромом.
function isPalindrome(str) {
  const normalizedStr = str.toLowerCase().replace(/[^a-zа-яё0-9]/gi, '');

  let reversedStr = '';

// Цикл проходит по нормализованной строке с конца к началу
  for (let i = normalizedStr.length - 1; i >= 0; i--) {
    reversedStr += normalizedStr[i];
  }

  return normalizedStr === reversedStr;
}

//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:
function extractNumbers(input) {
  let extractedNumbers = '';

  if (typeof input === 'number') {
    input = input.toString(); // Преобразуем число в строку
  }

  for (let char of input) {
    if (!isNaN(parseInt(char))) { // Проверяем, является ли символ числом
      extractedNumbers += char; // Добавляем числовой символ к результату
    }
  }

  // Возвращаем результат или NaN, если не удалось извлечь числа
  if (extractedNumbers === '') {
    return NaN;
  }

  return parseInt(extractedNumbers); // Преобразуем строку чисел в число
}

function parseTime(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}
