var x = 100, y = 250;//Variáveis para a Movimentação da Elipse dependente do teclado
var qX=125, qY= 200;//Dimensões do obstáculo próximo a elipse
var ex=50, ey=200; // variaveis para movimento da elipse independente
var dx = 0, dy = 0;//posição do disparo
var disparo = false;//estado para determinar o disparo;
	function setup() {
		ex=random(512);
		ey=-random(512);
		createCanvas(512,512);
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
	function Movimento_Atirar(){//Função Responsavél pela movimentação da elipse pelas setas do teclado
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
			dy= dy-5;//Faz o disparo percorrer o trajeto;
			if(dy<0){//quando o trajeto eh maior que o tamanho da tela;
				disparo =false;//retorna para o estado inicial e espera o comando para alterar o estado;
			}
		}
		if(disparo){//Gera o desenho do disparo;
			noFill() // preenche as formas subsequentes
			stroke(0, 0, 0); //Define a cor do disparo
			ellipse(dx,dy,5,5);//O disparo tem o formado de elipse
			noStroke();
		}
		noFill() // preenche as formas subsequentes
		stroke(17, 50, 255); //Define a cor de contorno das formas subsequentes
		ellipse(x,y,40,40);//Jogador;
		noStroke(); // tira o contorno de tudo que tiver apos essa função
	}
	function Inimigo(){
		if (ey<512){ // enquanto a coordenada X da elipse for menor que 512 (tamanho do quadro horixontal)
			ey=ey+4;  // a própria coordenada X tomará como valor ela mesma mais algum valor (p/ fazer o movimento).
			} else{
				ey=-random(512);//determina uma posição aleatória do inimigo
				ex=random(512);//determina uma posição aleatória do inimigo
			}
		// do inicio da função ElipseIndependente ate aqui, o codigo faz o movimento da elipse independente
		fill(150,100,50);
		noStroke();
		ellipse(ex,ey,20,20); // cria a figura elipse
		noFill();
	}
	function draw() {
		background(180,255,140);
		Movimento_Atirar();
		Obstaculo();
		Inimigo();
	}
