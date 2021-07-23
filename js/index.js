let listMusics = document.querySelector('.list-musics');
let btnLibrary = document.querySelector('.btn-library');
let pointer = document.querySelector('.pointer');
let Library = document.querySelector('.Library');

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

// события на раскрытия плейлиста
btnLibrary.addEventListener('click', function(e) {
    Library.classList.toggle('active');
    pointer.classList.toggle('rotate');
});


// создаём событие на воспроизведение мелодии по выбору музыки из плейлиста
let audio = document.querySelector('audio');
let arrayMusic = document.querySelectorAll('.music');
arrayMusic.forEach(item => {
    item.addEventListener('click', function(event) { 
        // ищем объект с нужным id и элементы audio даём ссылку на мелодию из этого же объекта
        let music = musics.find(music => music.id === parseInt(event.currentTarget.id, 10));
        audio.src =  music.src_audio;
       
        // проверка на повторное нажатие
        // если на элементе фокус (то есть с этого элемента воспроизводится музыка)
        // то останавливаем музыку и снимаем фокус с этого элемента
        if(document.getElementById(`${event.currentTarget.id}`).classList.contains('focus')) {
            document.getElementById(`${event.currentTarget.id}`).classList.remove('focus');
            btnPlay.src = 'https://s2.svgbox.net/hero-solid.svg?ic=play&color=000000';
            audio.pause();
            audio.classList.remove('start');
        } else {
            // если нужный элемент не соержит фокуса, то устанавливаем его на нём и воспроизводим мелодию
            if(document.querySelector(`.focus`)) {
                document.querySelector(`.focus`).classList.remove('focus');
            }
            audio.play();
            audio.classList.add('start');
            btnPlay.src = 'https://s2.svgbox.net/hero-solid.svg?ic=pause&color=000000';
            document.getElementById(`${event.currentTarget.id}`).classList.add('focus');
        }
    })
})


/* модернизация кода:
   1) создание функции для проигрывания мелодии и устнановки её на паузу
   2) отображение фотки альбома, названия мелодии и группы исполнителей
   3) реализации работы других кнопок
*/
// реализация проигрования мелодии
let btnPlay = document.querySelector('.btn-play');
btnPlay.addEventListener('click', function() {
    // если у проигрывателя нет класса start, то устанавливаем его меняя вид и запускаю audio
    if(!audio.classList.contains('start')) {
        btnPlay.src = 'https://s2.svgbox.net/hero-solid.svg?ic=pause&color=000000';
        audio.play();
        audio.classList.add('start');
    } else {
        btnPlay.src = 'https://s2.svgbox.net/hero-solid.svg?ic=play&color=000000';
        audio.pause();
        audio.classList.remove('start');
    }
})

