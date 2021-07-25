let listMusics = document.querySelector('.list-musics');
let btnLibrary = document.querySelector('.btn-library');
let pointer = document.querySelector('.pointer');
let Library = document.querySelector('.Library');
let Player = document.querySelector('.Player');

let currentId = 0;

let musics = [
    {
        id: 0,
        name: 'Radioactive',
        performers: 'Imagine Dragons',
        src_img: 'img_perfomers/Imagine_Dragons_-_Radioactive.jpg',
        src_audio: 'audio/Radioactive_Imagine-Dragons.mp3'
    },
    {
        id: 1,
        name: 'Plain Jane',
        performers: 'A$AP Ferg',
        src_img: 'img_perfomers/A$AP_Ferg_Plain_Jane.jpg',
        src_audio: 'audio/Plain_Jane_A$AP_Ferg.mp3'
    },
    {
        id: 2,
        name: 'Apologize',
        performers: 'One Republic',
        src_img: 'img_perfomers/One_Republic_Apologize.jpg',
        src_audio: 'audio/Apologize_One_Republic.mp3'
    }
];

// выводм все мелодии в плейлист
musics.map(item => {
    const music = `<li class="music" id="${item.id}">
                <img  alt="фото альбьома" src="${item.src_img}"/>
                <div class="description">
                    <p class="name">${item.name}</p>
                    <p class="perfomers">${item.performers}</p>
                </div>
            </li>`;

    listMusics.insertAdjacentHTML('beforeend', music);
});


let arrayMusic = document.querySelectorAll('.music');
let elementFocus = arrayMusic[currentId];


let imgMusic = document.querySelector('.img-music');
let audioName = document.querySelector('.audio-name');
let audioPerformers = document.querySelector('.audio-perfomers');


window.addEventListener('load', function () {
    elementFocus.classList.add('focus');
    audio.src =  musics[currentId].src_audio;
    imgMusic.src = musics[currentId].src_img;
    audioName.textContent = musics[currentId].name;
    audioPerformers.textContent = musics[currentId].performers;
});

// события на раскрытия плейлиста
btnLibrary.addEventListener('click', function(e) {
    Library.classList.toggle('active');
    pointer.classList.toggle('rotate');
    Player.classList.toggle('shift');
});


// создаём событие на воспроизведение мелодии по выбору музыки из плейлиста
let audio = document.querySelector('audio');
let btnPlay = document.querySelector('.btn-play');
arrayMusic.forEach(item => {
    item.addEventListener('click', function(event) { 
       
        currentId = parseInt(event.currentTarget.id, 10);

        newElementFocus = event.currentTarget; // берём элемент, на который мы нажали

        // если прошлый элемент и новый окажутся одинаковыми
        if (newElementFocus.id === elementFocus.id) {
            // то проверяем на повторное нажатие через класс start и при необходимости его убираем или добавляем
            if (audio.classList.contains('start')) {
                btnPlay.src = 'https://s2.svgbox.net/hero-solid.svg?ic=play&color=000000';
                audio.classList.remove('start');
                audio.pause();
                imgMusic.classList.remove('rotate-img');
            } else {
                btnPlay.src = 'https://s2.svgbox.net/hero-solid.svg?ic=pause&color=000000';
                audio.classList.add('start');
                audio.play();
                imgMusic.classList.add('rotate-img');
            }
        } else {

            audio.src =  musics[currentId].src_audio;
            imgMusic.src = musics[currentId].src_img;
            audioName.textContent = musics[currentId].name;
            audioPerformers.textContent = musics[currentId].performers;
            
            btnPlay.src = 'https://s2.svgbox.net/hero-solid.svg?ic=pause&color=000000';

            elementFocus.classList.remove('focus'); // убираем focus у прошлого элемента
            elementFocus = newElementFocus;
            elementFocus.classList.add('focus');

            audio.classList.add('start');
            audio.play();
            imgMusic.classList.add('rotate-img');
        }
    })
});


/* модернизация кода:
   1) создание функции для проигрывания мелодии и устнановки её на паузу
   3) реализации работы других кнопок
*/

// реализация проигрования мелодии
btnPlay.addEventListener('click', function() {
    if(audio.classList.contains('start')) {
        btnPlay.src = 'https://s2.svgbox.net/hero-solid.svg?ic=play&color=000000';
        audio.classList.remove('start');
        audio.pause();
        imgMusic.classList.remove('rotate-img');
    } else {
        btnPlay.src = 'https://s2.svgbox.net/hero-solid.svg?ic=pause&color=000000';
        audio.classList.add('start');
        audio.play();
        imgMusic.classList.add('rotate-img');
    }
});


// реализация прогресса проигрования мелодии
let progress = document.querySelector('.progress');
audio.addEventListener('timeupdate', function() {
    let position = audio.currentTime / audio.duration;
    progress.style.width = position * 100 + '%';
});


// возвращаем прогресс в 0 позицию при окончании прогрывания мелодии
audio.addEventListener('ended', function() {
    progress.style.width = 0 + '%';
    btnPlay.src = 'https://s2.svgbox.net/hero-solid.svg?ic=play&color=000000';
});


let btnRepeat = document.querySelector('.btn-repeat');
btnRepeat.addEventListener('click', function() {
    if(audio.hasAttribute('loop')) {
        btnRepeat.src = 'https://s2.svgbox.net/hero-solid.svg?ic=refresh&color=000000';
        audio.removeAttribute('loop');
    } else {
        btnRepeat.src = 'https://s2.svgbox.net/hero-solid.svg?ic=refresh&color=D3B9FF';
        audio.setAttribute('loop', 'loop');
    }
});


let btnBack = document.querySelector('.btn-back');
let btnNext = document.querySelector('.btn-next');

btnBack.addEventListener('click', function() {

    if ((currentId - 1) < 0) {
        currentId = musics.length - 1;
    } else {
        currentId -= 1;
    }
    
    elementFocus.classList.remove('focus');
    elementFocus = arrayMusic[currentId];
    elementFocus.classList.add('focus');

    audio.src =  musics[currentId].src_audio;
    imgMusic.src = musics[currentId].src_img;
    audioName.textContent = musics[currentId].name;
    audioPerformers.textContent = musics[currentId].performers;
    
    if (audio.classList.contains('start')) {
        audio.play();
        imgMusic.classList.add('rotate-img');
    }
});

btnNext.addEventListener('click', function() {

    if ((currentId + 1) > musics.length - 1) {
        currentId = 0;
    } else {
        currentId += 1;
    }
    
    elementFocus.classList.remove('focus');
    elementFocus = arrayMusic[currentId];
    elementFocus.classList.add('focus');

    audio.src =  musics[currentId].src_audio;
    imgMusic.src = musics[currentId].src_img;
    audioName.textContent = musics[currentId].name;
    audioPerformers.textContent = musics[currentId].performers;
      
    if (audio.classList.contains('start')) {
        audio.play();
        imgMusic.classList.add('rotate-img');
    }
});


