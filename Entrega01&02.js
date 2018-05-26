var x = 100, y = 250;//Variáveis para a Movimentação da Elipse
var qX=125 ,qY= 200;//Dimensões do obstáculo próximo a elipse
function setup() {
  createCanvas(512, 512);
}
function Obstaculo(){
 fill(255, 85, 85);//Define as cores dos obstáculos
 rect(qX,qY,80,80,20)//Obstáculo proximo a elipse
 rect(300,400,80,80,20)//Obstáculos extra 1
 rect(150,400,80,80,20)//Obstáculos extra 2 
 rect(300,25,80,80,20)//Obstáculos extra 3
 rect(150,25,80,80,20)//Obstáculos extra 4
 noFill();
}
function Movimento(){//Função Responsavél pela movimentação da elipse pelas setas do teclado
  if (keyIsDown(LEFT_ARROW))
    x-=5;

  if (keyIsDown(RIGHT_ARROW))
    x+=5;

  if (keyIsDown(UP_ARROW))
    y-=5;

  if (keyIsDown(DOWN_ARROW))
    y+=5;
    noFill();
    stroke(0, 0, 255);//Define a cor de contorno da elipse
    ellipse(x,y,30,30)
    noStroke();
}
function draw() {
  background(180,255,140);
  Movimento();
  Obstaculo();
}
