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
// check row for three
function checkRowforThree(){
    for(i=0;i<61;i++){
        let notvalid=[6,7,14,15,22,30,31,39,38,46,47,54,55]
        let rowOfThree=[i,i+1,i+2];
        let decideColor=squares[i].style.backgroundImage;
        const isBlank=squares[i].style.backgroundImage==='';
        if(notvalid.includes(i)) continue

        if(rowOfThree.every(index=>squares[index].style.backgroundImage===decideColor &&!isBlank))
        {   score +=3;
            Display.innerHTML=score;
            rowOfThree.forEach(index => {
                squares[index].style.backgroundImage=''
            })
        }
    }
}
checkRowforThree()

//check column of three
function checkColumnforThree(){
    for(i=0;i<47;i++){
        let columnOfThree=[i,i+width,i+width*2];
        let decideColor=squares[i].style.backgroundImage;
        const isBlank=squares[i].style.backgroundImage==='';
        if(columnOfThree.every(index=>squares[index].style.backgroundImage === decideColor && !isBlank))
        { 
            score +=3;
            Display.innerHTML=score;
            columnOfThree.forEach(index => {
                squares[index].style.backgroundImage=''
            })
        }
    }
}
checkColumnforThree()

// check row for four
function checkRowforFour(){
    for(i=0;i<60;i++){
        let notvalid=[5,6,7,13,14,15,22,23,29,30,31,39,38,45,46,47,53,54,55]
        let rowOfFour=[i,i+1,i+2,i+3];
        let decideColor=squares[i].style.backgroundImage;
        const isBlank=squares[i].style.backgroundImage==='';
        if(notvalid.includes(i)) continue
        
        if(rowOfFour.every(index=>squares[index].style.backgroundImage===decideColor &&!isBlank))
        { score +=4;
            Display.innerHTML=score;
            rowOfFour.forEach(index => {
                squares[index].style.backgroundImage=''
            })
        }
    }
}
checkRowforFour()

//check column of four
function checkColumnforFour(){
    for(i=0;i<47;i++){
        let columnOfFour=[i,i+width,i+width+2,i+width+3];
        let decideColor=squares[i].style.backgroundImage;
        const isBlank=squares[i].style.backgroundImage==='';
        if(columnOfFour.every(index=>squares[index].style.backgroundImage===decideColor &&!isBlank))
        { score +=4;
            Display.innerHTML=score;
            columnOfFour.forEach(index => {
                squares[index].style.backgroundImage=''
            })
        }
    }
}
function MoveDown(){
    for(i=0;i<55;i++){
        if(squares[i + width].style.backgroundImage === ''){
            squares[i + width].style.backgroundImage=squares[i].style.backgroundImage
            squares[i].style.backgroundImage=''
            const firstrow=[0,1,2,3,4,5,6,7]
            const isfirst=firstrow.includes(i)
                if(isfirst&&squares[i].style.backgroundImage===''){
                    let randomImage=Math.floor(Math.random()*candyImage.length)
                    squares[i].style.backgroundImage=candyImage[randomImage]
                }
        }
    }
}

checkColumnforFour()
window.setInterval(function(){
    checkRowforThree()
    checkColumnforThree()
    checkRowforFour()
    MoveDown()
    checkColumnforFour()
},100)
})