let pyramid = {
  color: { r: 15, g: 230, b: 126 },
  points: [
    { x: 310, y: 80 },
    { x: 150, y: 320 },
    { x: 470, y: 320 }
  ] 
}

let cont = 0;
let alfa = 100;

function setup() {
  let canvas = createCanvas(620, 400)
  canvas.parent('anim')

}

function draw() {
  blendMode(DIFFERENCE)
  background(pyramid.color.b, pyramid.color.g,pyramid.color.r,alfa)
  for(let i = 0 ;i < 3; i++){
    let n = i + 1
    if(n >= 3){n = 0;}
    stroke(pyramid.color.r, pyramid.color.g, pyramid.color.b)
    //stokeWeigth(10)
    line(pyramid.points[i].x + map(mouseX, 0 , width, -100 , 100),pyramid.points[i].y + map(mouseY, 0 , height, -100 , 100),pyramid.points[n].x - map(mouseX, 0 , width, 100 , -100),pyramid.points[n].y - map(mouseY, 0 , height, 100 , -100))
    stroke(pyramid.color.g, pyramid.color.b, pyramid.color.r)
    //strokeWeight(1)
    line(0, 0, pyramid.points[n].x - map(mouseX, 0 , width, 100 , -100),pyramid.points[n].y - map(mouseY, 0 , height, 100 , -100))
    line(width, 0, pyramid.points[n].x - map(mouseX, 0 , width, 100 , -100),pyramid.points[n].y - map(mouseY, 0 , height, 100 , -100))
    line(0, height, pyramid.points[n].x - map(mouseX, 0 , width, 100 , -100),pyramid.points[n].y - map(mouseY, 0 , height, 100 , -100))
    line(width, height, pyramid.points[n].x - map(mouseX, 0 , width, 100 , -100),pyramid.points[n].y - map(mouseY, 0 , height, 100 , -100))
    stroke(pyramid.color.b, pyramid.color.r, pyramid.color.g)
    line(width/2, height/2, pyramid.points[n].x - map(mouseX, 0 , width, 100 , -100),pyramid.points[n].y - map(mouseY, 0 , height, 100 , -100))
    line(width/2, height/2, pyramid.points[n].x - map(mouseX, 0 , width, 100 , -100),pyramid.points[n].y - map(mouseY, 0 , height, 100 , -100))
    line(width/2, height/2, pyramid.points[n].x - map(mouseX, 0 , width, 100 , -100),pyramid.points[n].y - map(mouseY, 0 , height, 100 , -100))
    line(width/2, height/2, pyramid.points[n].x - map(mouseX, 0 , width, 100 , -100),pyramid.points[n].y - map(mouseY, 0 , height, 100 , -100))
  }
}

function mousePressed(){
  cont++;
  if(cont==2){cont = 0} 
  if(cont==1){alfa = 0}
  if(cont==0){
              alfa = 255
              pyramid.color.r = random(255);
              pyramid.color.g = random(255);
              pyramid.color.b = random(255);
              for(let i = 0 ;i < 3; i++){
                                          pyramid.points[i].x = random(width)
                                          pyramid.points[i].y = random(height)
                                        }
            }
}