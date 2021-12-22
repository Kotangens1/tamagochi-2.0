console.log("Файл с JS подключён!");

const shop_money = document.querySelector(".shop_money");
const i_have_wrapper = document.querySelector(".i_have_wrapper");

var a = 0;
var money = 100;
var volume = 4;
var audio_shop_pay = new Audio();
audio_shop_pay.src = "mp3/shop_pay.mp3"


let array_shop;
array_shop_begin = [
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





///////////////////Функции

function updating_variables(index) {
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

const fillHtmlList = () => {   //Функция без аргументов
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

const buy = index => {  ///Функция покупки. Вызов в кнопке shop_buy с разными индексами
//  if (money >= array_shop[index].price) {
//    money = money - array_shop[index].price;
///    array_shop[index].volume = array_shop[index].volume + 1;
//  }
  audio_shop_pay.play();
  if (array_shop[index].volume == 0) {
    i_have_wrapper.innerHTML += add_item(index); //Добавление блока кода, в холодильнике
    const volume0 = document.querySelector("#volume0");
    const volume1 = document.querySelector("#volume1");
    const volume2 = document.querySelector("#volume2");
    const volume3 = document.querySelector("#volume3");
  };

  array_shop[index].volume = array_shop[index].volume + 1;
  localStorage.setItem('array_shop',JSON.stringify(array_shop));
//  localStorage.setItem('money',JSON.stringify(money));
  console.log(array_shop[index].name);

  updating_variables(index);

}



/////////////////////////код
if (localStorage.array_shop) {
  console.log("В Локальном хранилище есть массива");
  a = 1;
};
!localStorage.array_shop ? array_shop = array_shop_begin: array_shop = JSON.parse(localStorage.getItem('array_shop'));
console.log(array_shop);
console.log(array_shop[2].name);
if (a==1) {
  fillHtmlList();
}
