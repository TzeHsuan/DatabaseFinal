//navigationbar
var barChioce = document.querySelectorAll("nav a");
var len = barChioce.length;
for(var i = 0; i < len; i++) {
    barChioce[i].dataset.num = i
}

console.log(document.body.clientWidth)
var nav = document.querySelector(".navbar");
var box = document.querySelector(".hoverbox");
nav.addEventListener("mouseover", function(e) {
    if (e.target.nodeName !== "A") {return};
    var num = e.target.dataset.num;
    box.style.opacity = 1;
    box.style.left = num*15 + "%";
}, false)
nav.addEventListener("mouseout", function() {
    box.style.opacity = 0;
}, false)

//slide caruosel
var sliders = document.getElementsByClassName("slider");
//var dot = document.getElementById("dot");
var slidelen = [sliders[0].children.length, sliders[1].children.length];
var indexs = [0, 0];
var next = document.getElementById("next"), previous = document.getElementById("previous");

var textbox = document.getElementById("text");
var interest_strings = ["Finance", "Workout", "Music", "Dance", "Drawing", "Boxing"];

//dot.children[0].classList.toggle("dot-active");

//abdoned idea
nav.addEventListener("mouseover", function(e) {
    if (e.target.nodeName !== "A") {return;}
    var num = e.target.dataset.num;
    if (num <= slidelen[0]) { setIndex(num, 0) }
}, false)

next.addEventListener("click", function(e) {
    if (indexs[1] <= slidelen[0]) { setIndex(indexs[1] + 1, 1) }
}, false)
previous.addEventListener("click", function(e) {
    if (indexs[1] > 0) { setIndex(indexs[1] - 1, 1) }
}, false)

//setDotClick();

function setIndex(num, sliderNum) {
    if (num >= slidelen[sliderNum]) { return };
    //dot.children[n].classList.toggle("dot-active");
    indexs[sliderNum] = num;
    if (sliderNum) textbox.innerHTML = interest_strings[num];
    calculateWidth(indexs[sliderNum], sliderNum);
    //dot.children[n].classList.toggle("dot-active");
}
function calculateWidth(index, sliderNum) {
    const imgWidth = sliders[sliderNum].offsetWidth;
    const recomputedWidth = index * imgWidth;
    sliders[sliderNum].scrollLeft = recomputedWidth;
}/*
function setDotClick() {
    for (var i = 0; i < dot.children.length; i++) {
        li = dot.children[i];
        li.addEventListener("click", setIndex(i), false);
    }
}*/


/*reference that is so god damn OOP
nav.addEventListener("mouseover", function(e) {
    if (e.target.nodeName !== "A") {return;}
    var num = e.target.dataset.num;
    if (num <= slidelen) { slideProxy.index = num; }
}, false)
//setDotClick();

const slideProp = { index:0 }
const slideHandler = {
    set(obj, prop, value) {
        if (prop === "index") {
            if (value < 0 || value >= slidelen) {return};
            //setDotInactive();
            obj[prop] = value;
            calculateWidth();
            //setDotActive();
        }
    }
} 

const slideProxy = new Proxy(slideProp, slideHandler)
//setDotActive();

function calculateWidth() {
    const imgWidth = slider.offsetWidth;
    const recomputedWidth = slideProxy.index * imgWidth;
    slider.scrollLeft = recomputedWidth;
}
/*
function setDotInactive() {
    const li = {index} = slideProp;
    dot.children[index].classList.toggle("dot-active"); }
function setDotActive() {
    const li = {index} = slideProp;
    dot.children[index].classList.toggle("dot-active"); }
function setDotClick() {
    for (var i = 0; i < dot.children.length; i++) {
        li = dot.children[i];
        li.addEventListener("click", ()=>slideProxy.index = i, false);
    }
}*/

//設定進度條的數值
var rProgressBar = document.getElementsByClassName("r-progress");
var rChoice = [60, 80, 45, 85, 65 ,45];
var gProgressBar = document.getElementsByClassName("g-progress");
var gChoice = [88, 90, 65 ,40];

function setProgress() {
    for (var i = 0; i < rProgressBar.length; i++) {
        rProgressBar[i].style = "background: conic-gradient(#FFCDB2 0 "+ rChoice[i] +"%, #B5838D 0 100%);"
    }
    for (var i = 0; i < gProgressBar.length; i++) {
        gProgressBar[i].style = "width: " + gChoice[i] + "%";
    }
}

setProgress();

//向網頁製作者寄送email
var mailTo = document.getElementById("mailTo");
var initSubject='',initBody='';
 
function submitHandler(){
    var body = ""+bodyText.value+'%0A%0A%0A';
    body += "From: "+nameText.value+'%0A';
    body += "Email: "+emailText.value+'%0A';
    body += "Tel: "+telText.value;
    
    mailTo.href="mailto:wilsonliao1226@gmail.com?subject="+subText.value+"&body="+body;
    mailTo.click();
}
function init(){
    subText.value=initSubject;
    toText.value=initTo;
    bodyText.value=initBody;
}

//Scroll to top button
let mybutton = document.getElementById("myBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.documentElement.scrollTop = 0;
}


var log_sta = false;
var online = document.getElementById('online');
var offline = document.getElementById('offline');
function check_status() {
    console.log("checked");
    if (login_status) {
        online.style.display='block';
        offline.style.display='none';
    } else {
        online.style.display='none';
        offline.style.display='block';
    }
}
check_status();