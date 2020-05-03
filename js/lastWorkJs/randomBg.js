const body = document.querySelector("body");

const BG__FULL = "bgFull";

function randomNumber(){
    const number = Math.floor(Math.random() * 10);
    return number;
}

function pageImg(number){
    const bodyImg = new Image();
    bodyImg.src = `./imges/${number}.jpeg`;
    bodyImg.classList.add(BG__FULL);
    body.append(bodyImg);
}

function initBg(){
    const ranNum = randomNumber();
    pageImg(ranNum);
};

initBg();