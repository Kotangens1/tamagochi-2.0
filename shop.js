console.log("Файл с JS подключён!");

const API_URL = 'http://localhost:5000';

const array_shop_begin = [
  {
    name: "cake",
    price: 30,
    plus:5,
    volume: 0
  },
  {
    name: "sandwich",
    price: 20,
    plus:5,
    volume: 0
  },
  {
    name: "pizza",
    price: 30,
    plus:5,
    volume: 0
  },
  {
    name: "porridge",
    price: 10,
    plus:20,
    volume: 0
  }
];

let array_shop = array_shop_begin;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

const setLocation = (page) => {
  const separatedByRoute = window.location.href.split('/');
  window.location.href = separatedByRoute[separatedByRoute.length - 1] = page;
}

const fetchUserProducts = async () => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'GET',
    cache: 'no-cache',
    headers: getHeaders(),
  });

  return await response.json();
};

const shop_money = document.querySelector(".shop_money");
const i_have_wrapper = document.querySelector(".i_have_wrapper");

const goToHomeButton = document.querySelector(".link_home");

goToHomeButton.addEventListener('click', () => {
  setLocation('index.html');
});

const postUserProducts = async (products) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify(products),
    headers: getHeaders(),
  });
  return await response.json();
};

var a = 0;
var money = 100;
var volume = 4;
var audio_shop_pay = new Audio();
audio_shop_pay.src = "mp3/shop_pay.mp3"





///////////////////Функции

function updating_variables(index) {
  const volume0 = document.querySelector("#volume0");
  const volume1 = document.querySelector("#volume1");
  const volume2 = document.querySelector("#volume2");
  const volume3 = document.querySelector("#volume3");
  //shop_money.innerHTML =`Money: ${money}`;
  if (index == 0) {
    volume0.innerHTML = `${array_shop[index].volume} шт`;
  }
  if (index == 1) {
    volume1.innerHTML = `${array_shop[index].volume} шт`;
  }
  if (index == 2) {
    volume2.innerHTML = `${array_shop[index].volume} шт`;
  }
  if (index == 3) {
    volume3.innerHTML = `${array_shop[index].volume} шт`;
  }

}






///////////////Функции, которые используют другие функции



const add_item = index => {
  return `
  <div class="i_have_item">
    <img src="svg/${array_shop[index].name}.svg" class="shop_img_mini">
    <div class="i_have_item_txt" id="volume${index}">${array_shop[index].volume} шт</div>
  </div>
  `
}

const fillHtmlList = (array_shop) => {   //Функция без аргументов
  //i_have_wrapper.innerHTML = "";  //Обратимся к свойству объекта div(поле для готовых задач) и присвоим ему пустоту. Это свойство берёт весь блок
  //Если у объекта tasks свойство length больше нуля выполняется команда
    array_shop.forEach((el,index) => {
      if (array_shop[index].volume > 0) {
        i_have_wrapper.innerHTML += add_item(index);
      } //Метод .forEach выполняет указанную функцию один раз для каждого элемента в массиве
      //Функция : (item,index) => {todosWrapper.innerHTML += createTemplate(item, index);}
      //Для каждого элемента массива tasks выполняется -> зайти в блок с задачами и добавить кое что
      //Кое что - это вызов функции с двумя аргументами. Вызывается функция добавления кода в блок .todos-wrapper2


    });
    //Далее к пустому массиву привязывается блок .todos-wrapper это конкретная задача со своими кнопками удалить и отметить
    //i_have_wrapper = document.querySelectorAll('.i_have_wrapper');
    //Т.е., помимо того, что мы вставили код, мы и связали его с объектом в файле JS

}

const initialSteps = () => {
  fetchUserProducts().then(({ message, products }) => {
    if (message === 'Пользователь не авторизован') {
      return setLocation('authorization.html');
    }
    if (!!products.length) {
      array_shop = products
      fillHtmlList(array_shop);
    } else {
      return array_shop = array_shop_begin;
    }
  }).catch((error) => console.log('error', error));
};

initialSteps();

const buy = index => {  ///Функция покупки. Вызов в кнопке shop_buy с разными индексами
//  if (money >= array_shop[index].price) {
//    money = money - array_shop[index].price;
///    array_shop[index].volume = array_shop[index].volume + 1;
//  }
  audio_shop_pay.play();
  if (array_shop[index].volume == 0) {
    i_have_wrapper.innerHTML += add_item(index); //Добавление блока кода, в холодильнике
    // const volume0 = document.querySelector("#volume0");
    // const volume1 = document.querySelector("#volume1");
    // const volume2 = document.querySelector("#volume2");
    // const volume3 = document.querySelector("#volume3");
  };

  // if (array_shop) {
  console.log('array_shop started', array_shop);

  array_shop[index].volume = array_shop[index].volume + 1;
  // }
  console.log('array_shop ended', index, array_shop[index].volume, array_shop);
  postUserProducts(array_shop).then(({ message }) => {
    if (message === 'Пользователь не авторизован') {
      return setLocation('authorization.html');
    }
  });
  // localStorage.setItem('array_shop',JSON.stringify(array_shop));
//  localStorage.setItem('money',JSON.stringify(money));
//   console.log(array_shop[index].name);

  updating_variables(index);

}



/////////////////////////код
// if (localStorage.array_shop) {
//   console.log("В Локальном хранилище есть массива");
//   a = 1;
// };
// !localStorage.array_shop ? array_shop = array_shop_begin: array_shop = JSON.parse(localStorage.getItem('array_shop'));
// console.log(array_shop);
// console.log(array_shop[2].name);
// if (a==1) {
  fillHtmlList(array_shop);
// }
// setInterval(fillHtmlList,5000);

