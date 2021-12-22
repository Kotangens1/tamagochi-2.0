console.log("Файл .js подключён!");

hungry_fill = document.querySelector(".hungry_fill");
health_fill = document.querySelector(".health_fill");
care_fill = document.querySelector(".care_fill");

hungry_color = document.querySelector(".hungry")
health_color = document.querySelector(".health")
care_color = document.querySelector(".care")


hungry_value = document.querySelector(".hungry_value");
health_value = document.querySelector(".health_value");
care_value = document.querySelector(".care_value");

var audio_moore = new Audio();
audio_moore.src = "mp3/moore.mp3";
var hungry = 20, malady = 0; apathy = 60;  // malady - это болезненность. Вообще все эти параметры увеличиваются с каждым разом, чтобы не нарушать логику анимации
                                         // А так, у кота эти четыре индикатора уменьшаются, обратная логика типо
var hungry_plus = 1, malady_plus = 20, apathy_plus = 20;  //Эти переменные устанавливают прибавляемое значение и определяют скорость, с какой каждая потребность будет уменьшаться
var malady_min = 20, apathy_min = 40;   //Эти переменные регулируют насколько возрастают показатель заботы и здоровья при уходе за котом

//function endDrop(event) {

//  console.log("Конец перетаскивания");
//}
//function allowDrop(event){
//  event.preventDefault();
//}

//drag_ob.ondragstart = drag;  //Событие, которое срабатывает при начале перетаскивания
//function drag(event){
//  console.log("Ты взял предмет");
  //dataTransfer - добавляет данные в нужном формате при перетаскивании
  //event.target.id - id объекта, в котором сработало событие
  //-event.dataTransfer.setData('id',event.target.id);
  //Т.е. когда событие "начало перетаскивания" срабатывает - создаётся переманная id, в которую перемещается id объекта
//}
//drop_zone.ondrop = drop;
//.ondrop - событие когда объект опустился в зону перетаскивания

//function drop(event){
  //-let itemId = event.dataTransfer.getData('id');
  //event - событие; dataTransfer - объект, который содержит информацию, задействованную в операции перетаскивания
  //event.dataTransfer.getData - возвращает данные
//  feed();
  //event.target. - свойство target объекта Event ссылается на объект, который отправил событие
  //.append - Метод вставляет указанное содержимое как последний элемент в каждом из элементов коллекции

//}


//////////////////////////////////////////////////Кормёжка




function timer() {
  if (hungry < 100)
  {
    hungry = hungry + hungry_plus;
    
  }
  if (malady < 100 && hungry > 40 && apathy > 50)
  {
    malady = malady + malady_plus;
    console.log("- 5 от здоровья");
  }
  if (apathy < 100 && hungry > 40 )
  {
    apathy = apathy + apathy_plus;
  }


  status();
//  if (hungry_fill < 40){
//    health_fill = health_fill - 10;
}
//  if (health_fill == 0){
//    clearInterval(timer_all);
//  }



function text_change(index) {
  if (index == 0) {
    fridge_txt0.innerHTML = `${array_shop[index].volume} шт`;
  }
  if (index == 1) {
    fridge_txt1.innerHTML = `${array_shop[index].volume} шт`;
  }
  if (index == 2) {
    fridge_txt2.innerHTML = `${array_shop[index].volume} шт`;
  }
  if (index == 3) {
    fridge_txt3.innerHTML = `${array_shop[index].volume} шт`;
  }
}

function status() {       //Обновления статуса. Определяется, какие числа послать в стили или исходный документ
  hungry_fill.style.height = `calc(50px*(${hungry}/100))`; //Обновляю ползунок голода
  health_fill.style.height = `calc(50px*(${malady}/100))`;
  care_fill.style.height = `calc(50px*(${apathy}/100))`;


  if (hungry > 0) 
  {
    hungry_color.style.background =`#5258DE`;
  }
  if (hungry > 40) 
  {
    hungry_color.style.background =`#DE52BF`;
  }
  if (hungry > 70) 
  {
    hungry_color.style.background =`#DE5252`;
  }

  if (malady > 0 && hungry == 0){
    malady = 0;
  }
  if (malady > 0) 
  {
    health_color.style.background =`#5258DE`;
  }
  if (malady > 40) 
  {
    health_color.style.background =`#DE52BF`;
  }
  if (malady > 70) 
  {
    health_color.style.background =`#DE5252`;
  }

  if (apathy >= 0) 
  {
    care_color.style.background =`#5258DE`;
  }
  if (apathy > 40) 
  {
    care_color.style.background =`#DE52BF`;
  }
  if (apathy > 70) 
  {
    care_color.style.background =`#DE5252`;
  }
 

  hungry_value.innerHTML = `${100 - hungry}`;
  health_value.innerHTML = `${100 - malady}`;
  care_value.innerHTML = `${100 - apathy}`;

//  fridge_txt_array[index].innerHTML = `${array_shop[index].volume} шт`;
}

function fondle_cat() {
  console.log("МУР");
  audio_moore.play();
  if (apathy > 0) 
  {
    if ((apathy - apathy_min) > 0)
    {
      apathy = 0;
      
    }
    else {
      apathy = apathy - apathy_min;
    }
  }
  status();
}



hungry_fill.style.height = `calc(50px*(${hungry}/100))`;  //Благодаря след. коду на странице при включении уже всё есть
health_fill.style.height = `calc(50px*(${malady}/100))`;
care_fill.style.height = `calc(50px*(${apathy}/100))`;

hungry_value.innerHTML = `${100 - hungry}`;
health_value.innerHTML = `${100 - malady}`;
care_value.innerHTML = `${100 - apathy}`;

setInterval(timer,1000);
