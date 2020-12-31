document.addEventListener('DOMContentLoaded', function() {
    hide_sections(); // скроем все неактивные секции

    /**
     * переключение кнопок меню
     */
    let menu = document.querySelector(".header__menu");
    menu.addEventListener("click", function(event){
        //скрываем выделение у всех кнопок
        hover_out();
        let target = event.target;
        if(target.classList.contains("btn")){
            event.preventDefault();
            //активируем нажатую кнопку
            target.classList.add('hover');
            //активируем нужную секцию
            let id_section = target.getAttribute("data-target");
            console.log(id_section);
            active_section(id_section);
            if(id_section == "skills"){
                showProgressBars();
            }
        }
    });

    /**
     * Нажатие кнопки напишите мне
     */
    let btn_contact_us = document.querySelector('#contacts-us');
    if(btn_contact_us != null){
        btn_contact_us.addEventListener('click', ()=>{
            /**
             * Скрыть все модалки
             */
            hide_modals();
            /**
             * Открыть форму для обратной связи
             */
            opect_contact_form();
        });
    }
    /**
     * Нажатие кнопки Контакты
     */
    let btn_contact = document.querySelector("#btn-contact");
    if(btn_contact != null){
        btn_contact.addEventListener("click",()=>{
            hover_out();
            btn_contact.classList.add('hover');
            /**
             * Скрыть все модалки
             */
            hide_modals();
            /**
             * Открыть форму для обратной связи
             */
            opect_contact_form();
        });
    }

    /**
     * Открыть форму для обратной связи
     */
    function opect_contact_form(){
        let contacts = document.querySelector('#contacts');
        if(contacts !== null) {
            contacts.style.display = 'block';
            close_contacts_form(contacts);
        }
    }
            
    /**
     * Закрытие формы контакты
     */
    function close_contacts_form(form){
        if(form !== null) {
            /**
             * Ищим кнопку закрыть
             */
            let close = form.querySelector('.close');
            if(close != null){
                close.addEventListener('click', ()=>{
                    /**
                     * закрываем форму
                     */
                    form.style.display ="none";
                    
                    /**
                     * отключаем зеленый цвет у кнопки контакты
                     */
                    let btn_contact = document.querySelector('#btn-contact');
                    if(btn_contact != null){
                        btn_contact.classList.remove('hover');
                    }
                });
            }
        }
    }

    /**
     * Скрыть все модалки
     */
    function hide_modals(){
        let modals = document.querySelectorAll('.modal');
            modals.forEach((modal)=>{
                modal.style.display = 'none';
            });
    }
    /**
     * убрать у всех класс активной кнопки
     */
    function hover_out(){
        let btns = document.querySelectorAll(".btn");
        if(btns != null){
            btns.forEach((btn) => {
                btn.classList.remove("hover");
            });
        } 
    }
    /**
     * убираем у всех секций активный класс  
     */
    function remove_active_class(){
        let sections = document.querySelectorAll('section');
        if(sections != null){
            sections.forEach(function(item){
                item.classList.remove("active");
            });
        }
    }
    /**
     * Найти все блоки с тегом SECTION и если нет класса ACTIVE скрыть
     */
    function hide_sections(){
        let sections = document.querySelectorAll('section');
        if(sections != null){
            sections.forEach(function(item){
               if(!item.classList.contains("active")){
                    item.style.display = "none";
               }else{
                    item.style.display = "block";
                    /**
                     * Если блок скилов стал активным запустить анимацию
                     */
                    // if(item.getAttribute('id') == "skills"){
                    //     showProgressBars();
                    // }
               }
            });
        }
    }
    /**
     * Включаем видмость выбранному блоку
     */
    function active_section(id_section){
        let section = document.querySelector("#"+id_section);
        if(section != null){
            //убираем у все остальных активный класс
            remove_active_class();
            //поставить флаг активировной секции
            section.classList.add("active");
            //отобразить секцию
            hide_sections();
        }
    }
    /**
     * Функция проверки находится ли элемент в зоне видомости
     */
    function isVisible(elem) {

        let coords = elem.getBoundingClientRect();
      
        let windowHeight = document.documentElement.clientHeight;
      
        // верхний край элемента виден?
        let topVisible = coords.top > 0 && coords.top < windowHeight;
      
        // нижний край элемента виден?
        let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
      
        return topVisible || bottomVisible;
    }

    /**
     * ПРАГРЕСС БАРЫ
     */
    /**
     * Срабатывание скрипта при прокрутки для нужного места на странице
     */
    //window.addEventListener('scroll', showProgressBars);
    
    function showProgressBars() {
        /**
         * Прогресс бары
         * 1) находим все прогресс-бары
         * 2) отправляем найденный массив на перебор 
         * 3) у каждого элемента находим атрибут data-progres
         * 4) прибавляем по 1 к style.widht progres-bar с задержкой(задержка в css)
         */
        let progress_bars = document.querySelectorAll(".progres-bar");
        if(progress_bars.length > 0){
            for(let i = 0; i< progress_bars.length; i++){
                let progres = progress_bars[i];
                if(progres.hasAttribute('data-progres')){
                    /**
                     * Проверка попал ли в зону видимости
                     */
                    // if(isVisible(progres)){
                        
                    // }
                    progres.style.width = progres.getAttribute('data-progres')+"%";
                }
            }
        }
    }

    /**
     * Открытие модалок для скилов
     */
    let btn_skills = document.querySelectorAll('.skills__lists-wrapper');
    if(btn_skills != null){
        btn_skills.forEach((btn)=>{
            btn.addEventListener('click', (e)=>{
                let id_modal = btn.getAttribute('data-target');
                open_modal(id_modal);
            });
        });
    }

    /**
     * открытие модалки по айди
     * @param {*} id_modal 
     */
    function open_modal(id_modal){
        let modal = document.querySelector('#'+id_modal);
        if(modal != null){
            modal.style.display = "block";
        }
    }
    /**
     * Реакция на нажатия кнопки закрытия модалки
     */
    function close_modal(){
        let modals = document.querySelectorAll('.modal');
        if(modals != null){
            modals.forEach((modal)=>{
                modal.addEventListener("click", (event)=>{
                    let target = event.target;
                    console.log(target);
                    if(target.classList.contains('close')){
                        modal.style.display = 'none';
                    }
                    if(target.parentNode.classList.contains('close')){
                        modal.style.display = 'none';
                    }
                    if(target.parentNode.parentNode.classList.contains('close')){
                        modal.style.display = 'none';
                    }
                });
            });
        }
    }
    close_modal();
});