var x = 50, y = 250;//variáveis para movimento do jogador
var qx=100, qy= 200;//posição (fixa) do obstáculo azul próximo ao jogador
var x1=0,y1=0,x2=0,y2=0,x3=0,y3=0,x4=0,y4=0; // variaveis que guardam as posições (aleatorias) dos osbtaculos
var ex=50, ey=200; // variaveis para movimento do inimigo
var dx = 0, dy = 0;//posição do disparo
var disparo = false;//estado para determinar o disparo;
var d1, d2, d3, d4,d5; // variaveis para colisoes entre os objetos do jogo
var vidas=3, pont=0; // inicia as variaveis que contam as vidas e os pontos
	function setup() {
		x1=random(70,500); y1=random(10,500); // define posição aleatoria do obstaculo vermelho
		x2=random(70,500); y2=random(10,500); // define posiçao aleatoria do obstaculo verde
		x3=random(70,500); y3=random(10,500); // define posiçao aleatoria do obstaculo rosa
		x4=random(70,500); y4=random(10,500); // define posiçao aleatoria do obstaculo amarelo
		ex=random(500); ey=-random(500); // define posiçao aleatoria do inimigo
		createCanvas(512,512);
	}
	function Obstaculo(){ // define os obstaculos e as colisoes do jogador com eles
		fill(0, 0, 255);// azul
		rect(qx,qy,80,80)//Obstáculo proximo a elipse
		noFill();
		fill(255,0,0); // vermelho
		rect(x1,y1,80,80)//Obstáculo extra 1
		noFill();
		fill(0,255,0); // verde
		rect(x2,y2,80,80)//Obstáculo extra 2
		noFill();
		fill(255,0,255); // rosa
		rect(x3,y3,80,80)//Obstáculo extra 3
		noFill();
		fill(255,215,0); // amarelo
		rect(x4,y4,80,80)//Obstáculo extra 4
		noFill();
		textSize(12)
		fill(0,0,0);
		d1 = int(dist(x,y,qx+40,qy+40));
		if(d1<=60){
			text("COLIDIU COM AZUL!",10,500);
			return true;
		}
		d2 = int(dist(x,y,x1+40,y1+40));
		if(d2<=60){
			text("COLIDIU COM VERMELHO!",10,500);
			return true;
		}
		d3 = int(dist(x,y,x2+40,y2+40));
		if(d3<=60){
			text("COLIDIU COM VERDE!",10,500);
			return true;
		}
		d4 = int(dist(x,y,x3+40,y3+40));
		if(d4<=60){
			text("COLIDIU COM ROSA!",10,500);
			return true;
		}
		d5 = int(dist(x,y,x4+40,y4+40));
		if(d5<=60){
			text("COLIDIU COM AMARELO!",10,500);
			return true;
		}
		noFill();
		return false;
	}
	function Vidas(){ // conta as vidas
		textSize(14);
		fill(50,100,45);
		textAlign(LEFT); // alinhar texto na borda esquerda
		d1=int(dist(x,y,ex+10,ey+10)); // calcula a distancia entre jogador e inimigo
		if(d1<=30){ // se a distancia for menor ou igual que a soma dos raios
			vidas = vidas-1; // perde uma vida quando inimigo colidir com jogador
			if (vidas==0){
			textAlign(CENTER);
			vidas == text('FIM DE JOGO',380,80);;
			noLoop();
			}
		}
		text("RESTAM: "+vidas+" VIDAS", 380, 40);
		noFill();
	}
	function Pontuacao(){ //conta a pontuaçao
		textSize(12);
		fill(50,100,45);
		textAlign(LEFT);
		d1=int(dist(dx,dy,ex+10,ey+10));
		if(d1<=12){
			pont=pont+10;
		}
		text("PONTUAÇÃO: "+pont, 380,60);
		noFill();
	}
	function Movimento_Atirar(){//função responsavél pela movimentação do jogador e pelos disparos
		if (keyIsDown(LEFT_ARROW)){
			x-=5;
		}
		if (keyIsDown(RIGHT_ARROW)){
			x+=5;
		}
		if (keyIsDown(UP_ARROW)){
			y-=5;
		}
		if (keyIsDown(DOWN_ARROW)){
			y+=5;
		}
		if(keyIsDown(32) && (!disparo)){//Quando a tecla de espaço(Código Decimal ASCII - 32)
			disparo = true;//Muda o estado do disparo
			dx  = x;//iguala com a posição do jogador(ellipse)
			dy  = y;//iguala com a posição do jogador(ellipse)
		}
		if(disparo){//quando disparo é true, ele movimenta cria a elipse e efetua o disparo;
			dy= dy-10;//Faz o disparo percorrer o trajeto;
			if(dy<0){//quando o trajeto eh maior que o tamanho da tela;
				disparo =false;//retorna para o estado inicial e espera o comando para alterar o estado;
			}
		}
		if(disparo){//Gera o desenho do disparo;
			noFill() // retira preenchimento das formas subsequentes
			stroke(0, 0, 0); //Define a cor do disparo
			ellipse(dx,dy,5,5);//O disparo tem o formato de elipse
			noStroke();
		}
		noFill() // retira preenchimento das formas subsequentes
		stroke(17, 50, 255); //Define a cor de contorno das formas subsequentes
		ellipse(x,y,40,40);//Jogador;
		noStroke(); // tira o contorno de tudo que tiver apos essa função
		}
	function Inimigo(){
		if (ey<512){ // enquanto a coordenada X da elipse for menor que 512 (tamanho do quadro horizontal)
			ey=ey+1;  // a própria coordenada X tomará como valor ela mesma mais algum valor (p/ fazer o movimento).
			} else{
				ey=-random(512);//determina uma posição aleatória do inimigo
				ex=random(512);//determina uma posição aleatória do inimigo

			}
		// do inicio da função Inimigo ate aqui, o codigo faz o movimento da elipse inimiga
		fill(150,100,50);
		noStroke();
		ellipse(ex,ey,20,20); // cria a figura inimiga
		noFill();

	}
	function draw() {
		background(180,255,140);
		Vidas();
		Pontuacao();
		Movimento_Atirar();
		Obstaculo();
		Inimigo();
	}
