console.log ("Авторизация подключена");

enter_btn = document.querySelector(".enter");
create_acc = document.querySelector(".create_acc");
reg_btn = document.querySelector(".reg_btn");
reg_btn2 = document.querySelector(".reg_btn2");




enter_btn.addEventListener('click', ()=> {   ///Взаимодействие с кнопкой
    alert("Вас нет в базе данных");
  })

  create_acc.addEventListener('click', ()=> {   ///Взаимодействие с кнопкой
    alert("Вы пытаетесь зарегестрироваться");
})


reg_btn.addEventListener('click', ()=> {   ///Взаимодействие с кнопкой
    alert("переключение между регистрацией и авторизацией");
  })

reg_btn2.addEventListener('click', ()=> {   ///Взаимодействие с кнопкой
    alert("переключение между регистрацией и авторизацией");
})




