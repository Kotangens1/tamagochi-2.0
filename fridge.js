console.log("Файл JS холодильник подключен");

//Название функций drag&drop вида "dragend", (не ondragend)

const API_URL = 'http://localhost:5000';

let array_shop = [];

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

const fetchUserProducts = async () => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'GET',
    cache: 'no-cache',
    headers: getHeaders(),
  });

  return await response.json();
};

const postUserProducts = async (products) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify(products),
    headers: getHeaders(),
  });

  return await response.json();
};

const fridge_open_wrapper = document.querySelector(".fridge_open_wrapper");
const body_cat = document.querySelector(".body_cat");

drop_zone = document.querySelector(".cat");

var audio_meow_feed = new Audio();
var audio_eating = new Audio();
audio_meow_feed.src = 'mp3/adult_meow_hungry.mp3';

let drag_ob = [];
var a = 0;
var b = 0;
let fridge_txt_array = [];

drop_zone.ondragover = dragover;
drop_zone.ondragleave = dragleave;
drop_zone.ondrop = drop;


const add_item = index => {
  return `
  <div class="fridge_item_wrapper">
    <img src="svg/${array_shop[index].name}.svg" class="fridge_img" id="${[index]}" ondragstart="dragstart(${[index]})"  draggable="true">
    <div class="fridge_txt${index}" id="fridge_txt">${array_shop[index].volume} шт</div>
  </div>
  `
}

const fillHtmlList = (array_shop, re) => {
  console.log('array_shop', array_shop, re)
  array_shop?.forEach((el,index) => {
      if (array_shop[index].volume > 0) {
        fridge_open_wrapper.innerHTML += add_item(index);

        drag_ob[index] = document.querySelector(`${array_shop[index].name}`);
        console.log(fridge_txt_array);
        fridge_txt0 = document.querySelector(`.fridge_txt0`);
        fridge_txt1 = document.querySelector(`.fridge_txt1`);
        fridge_txt2 = document.querySelector(`.fridge_txt2`);
        fridge_txt3 = document.querySelector(`.fridge_txt3`);
      }

    });
}

const initialSteps = () => {
  fetchUserProducts().then(({ message, products }) => {
    if (message === 'Пользователь не авторизован') {
      return setLocation('authorization.html');
    }
    // console.log('products', products);
    array_shop = products;
    fillHtmlList(products);
  }).catch((error) => console.log('error', error));
};

initialSteps();


function dragstart(index) {  //Начало перетаскивания один раз
  console.log(array_shop[index].name);


  event.dataTransfer.setData('product_index',event.target.id);

}



function dragover(event) {
  event.preventDefault(); //Разрешаю перенос
  if (audio_meow_feed.paused == true) { //Если аудио на паузе, оно включается, так я избегаю повторного включения
    audio_meow_feed.currentTime = 0; //Так аудио воспроизводиться с начала
    audio_meow_feed.play();
    body_cat.src = "cat/cat_1_adult_front.svg";
  }


}
function dragleave() {
  body_cat.src = "cat/cat_1_adult.svg";
  //console.log("оп");
}
function drop(event) {
  let product_index = event.dataTransfer.getData('product_index'); //Получаю индекс перетаскиваемого элемента

  console.log (`${array_shop[product_index].plus} - плюс от еды, ${product_index} - индекс`)
  if (hungry  >= 0) {
    if ((hungry - array_shop[product_index].plus) < 0)
    {
      hungry = 0;
    }
    if ((hungry - array_shop[product_index].plus) >= 0) {
      hungry = hungry - array_shop[product_index].plus; //Голод уменьшается
    }
    
    console.log(hungry);
    array_shop[product_index].volume = array_shop[product_index].volume - 1; //кол-во продукта уменьшается
    // localStorage.setItem('array_shop',JSON.stringify(array_shop)); //Обновляю массив в JSON
    postUserProducts(array_shop).then(({ message }) => {
      if (message === 'Пользователь не авторизован') {
        return setLocation('authorization.html');
      }
    });
    text_change(product_index); //Обновляю статус индикаторов
    audio_meow_feed.paused;
    audio_eating.src = `mp3/eating_${array_shop[product_index].name}.mp3`;
    audio_eating.play();
    body_cat.src = "cat/cat_1_adult.svg";
  }
  
}







// if (localStorage.array_shop) {
//   console.log("В Локальном хранилище есть массива");
//   a = 1;
// };
// !localStorage.array_shop ? array_shop = []: array_shop = JSON.parse(localStorage.getItem('array_shop'));
// if (a==1) {
//   fillHtmlList();
// }
fillHtmlList(array_shop);
