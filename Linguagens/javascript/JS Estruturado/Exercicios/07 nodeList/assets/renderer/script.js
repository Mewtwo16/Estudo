

(function(){

const paragrafos = document.querySelector('.paragrafos')
const ps = paragrafos.querySelectorAll('p');

const estilosBody = getComputedStyle(document.body);
const backgroudColorBody = estilosBody.backgroundColor;

for(let i = 0; i < ps.length; i++){
    ps[i].style.backgroundColor = backgroudColorBody;
    ps[i].style.color = "red";
}



})();