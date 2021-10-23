let bassIntro = new Howl({
  src: ['sounds/bass.wav'],
  volume: 1.0,
  onend: function () {
    let thunder = new Howl({
        src: ['sounds/thunder.wav']
    });
    thunder.play();
  }
});
let rainBackground = new Howl({
        src: ['sounds/light rain.wav'],
        loop:true
    });

window.onload = function() {
setTimeout(function() {
bassIntro.play();
setTimeout(function() {
    let start = document.getElementById("start");
    let storm = document.getElementById("storm");
    let ender = document.getElementById("ender");
    let end = document.getElementById("end");
    let akali = document.getElementById("akali");
    let transitionAkali = document.getElementById("transitionAkali");
    
    document.getElementById("transition").style.display = "block";
    document.getElementsByClassName("container")[0].style.backgroundColor = "black";
    
    end.style.display = "block";
    storm.style.display = "block";
    ender.style.display = "block";
    
    akali.style.display = "none";
    transitionAkali.style.display = "block";
    
    start.style.fontFamily = "Qahiri";
    end.style.fontFamily = "'Qahiri'";
    
    //opacity is for mobile layout, due to the jam rules
    end.style.opacity = "1";
    storm.style.opacity = "1";
    ender.style.opacity = "1";


}, 3750);
setTimeout(function() {
    document.getElementById("cursor").style.display = "block";
    rainBackground.play();
}, 5500);
}, 1000);
};
