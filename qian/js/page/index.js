require(['./js/config.js'], function() {
    require(['swiper'], function(swiper) {
        console.log(swiper)


        var btn = document.querySelector('#btn');
        btn.onclick = function() {
            var name = document.querySelector('#name').value,
                age = document.querySelector('#age').value,
                site = document.querySelector('#site').value,
                idnumber = document.querySelector('#idnumber').value;
            console.log(name, age, site, idnumber)
        }
    })
})