document.addEventListener("DOMContentLoaded",()=>{
    const width=8;
    const container=document.querySelector(".container");
    const squares=[];
    let score=0;
    Display=document.getElementById("score");
    const candyImage=[
        "url(https://raw.githubusercontent.com/kubowania/candy-crush/master/images/blue-candy.png)",
        "url(https://github.com/kubowania/candy-crush/blob/master/images/green-candy.png?raw=true)",
        "url(https://github.com/kubowania/candy-crush/blob/master/images/orange-candy.png?raw=true)",
        "url(https://github.com/kubowania/candy-crush/blob/master/images/purple-candy.png?raw=true)",
        "url(https://github.com/kubowania/candy-crush/blob/master/images/red-candy.png?raw=true)",
        "url(https://github.com/kubowania/candy-crush/blob/master/images/yellow-candy.png?raw=true)"
    ]
    let st1=document.querySelector("#st1");
    let st2=document.querySelector("#st2");
    let st3=document.querySelector("#st3");
    //candy Generator
    function CnadyCreater(){ 
        for(let i=0;i<width*width;i++){
            const square=document.createElement("div");
            let rendomColor=Math.floor(Math.random()*candyImage.length);
            square.style.backgroundImage=candyImage[rendomColor];
            square.setAttribute('draggable',true);
            square.setAttribute("id",i);
            container.appendChild(square);
            squares.push(square);
        }
    }
    CnadyCreater();
    
    //drag Candy
    let colorDraged;
    let colorReplaced;
    let DreagId;
    let RplaceId;
    squares.forEach(square => square.addEventListener("dragstart",dragStart));
    squares.forEach(square => square.addEventListener("dragend",dragEnd));
    squares.forEach(square => square.addEventListener("dragover",dragOver));
    squares.forEach(square => square.addEventListener("dragenter",dragEnter));
    squares.forEach(square => square.addEventListener("dragleave",dragLeave));
    squares.forEach(square => square.addEventListener("drop",dragDrop));
    function dragStart(){
    colorDraged=this.style.backgroundImage;
     DreagId=parseInt(this.id);
}
function dragEnd(){
    let validMoves=[ DreagId-1, DreagId-width, DreagId+1, DreagId+width ]
    let validMove=validMoves.includes(RplaceId)
    if(RplaceId && validMove){
        RplaceId=null;
    }else if(RplaceId && !validMove){
        squares[RplaceId].style.backgroundImage=colorReplaced;
        squares[DreagId].style.backgroundImage=colorDraged;
    }else squares[DreagId].style.backgroundImage=colorDraged;
}
function dragOver(e){
    e.preventDefault()
}
function dragEnter(e){
    e.preventDefault()
}
function dragLeave(){
    
}
function dragDrop(){
    colorReplaced=this.style.backgroundImage;
    RplaceId=parseInt(this.id);
    this.style.backgroundImage=colorDraged;
    squares[DreagId].style.backgroundImage=colorReplaced;
}
 //drop candies once some have been cleared
 function moveIntoSquareBelow() {
    for (i = 0; i < 55; i++) {
        if (squares[i + width].style.backgroundImage === "") {
            squares[i + width].style.backgroundImage =
                squares[i].style.backgroundImage;
            squares[i].style.backgroundImage = "";
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
            const isFirstRow = firstRow.includes(i);
            if (isFirstRow && squares[i].style.backgroundImage === "") {
                let randomImage=Math.floor(Math.random()*candyImage.length)
                squares[i].style.backgroundImage=candyImage[randomImage]
            }
        }
    }
}

//check row for four
function checkRowForFour() {
    for (i = 0; i < 60; i++) {
        let rowOfFour = [i, i + 1, i + 2, i + 3];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === "";
        const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55];
        if (notValid.includes(i)) continue;

        if (rowOfFour.every((index) =>squares[index].style.backgroundImage === decidedColor &&!isBlank))
         {
            score += 4;
            Display.innerHTML = score;
            rowOfFour.forEach((index) => {
                squares[index].style.backgroundImage = "";
            });
        }
    }
}
checkRowForFour();

//for column of Four
function checkColumnForFour() {
    for (i = 0; i < 39; i++) {
        let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === "";
        if (
            columnOfFour.every(
                (index) =>
                    squares[index].style.backgroundImage === decidedColor &&
                    !isBlank
            )
        ) {
            score += 4;
            Display.innerHTML = score;
            columnOfFour.forEach((index) => {
                squares[index].style.backgroundImage = "";
            });
        }
    }
}
checkColumnForFour();

//for row of Three
function checkRowForThree() {
    for (i = 0; i < 61; i++) {
        let rowOfThree = [i, i + 1, i + 2];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === "";
        const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55];
        if (notValid.includes(i)) continue;

        if (rowOfThree.every((index) =>squares[index].style.backgroundImage === decidedColor &&!isBlank)) 
        {
            score += 3;
            Display.innerHTML = score;
            rowOfThree.forEach((index) => {
                squares[index].style.backgroundImage = "";
            });
        }
    }
}
checkRowForThree();

//for column of Three
function checkColumnForThree() {
    for (i = 0; i < 47; i++) {
        let columnOfThree = [i, i + width, i + width * 2];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === "";
         if (columnOfThree.every((index) =>squares[index].style.backgroundImage === decidedColor &&!isBlank)) 
        {
            score += 3;
            Display.innerHTML = score;
            columnOfThree.forEach((index) => {
                squares[index].style.backgroundImage = "";
            });
        }
    }
}
checkColumnForThree();
//score rang circles:
function rangeScore(){
if(score>300){
    st1.style.backgroundColor="yellow";
}
if(score>700){
    st2.style.backgroundColor="yellow";
}
if(score>100){
    st3.style.backgroundColor="yellow";
}
}
rangeScore();
window.setInterval(function () {
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
    moveIntoSquareBelow();
    rangeScore()
}, 100);
});