var x = 50, y = 250;//variáveis para movimento do jogador
var qx=100, qy= 200;//posição (fixa) do obstáculo azul próximo ao jogador
var x1=0,y1=0,x2=0,y2=0,x3=0,y3=0,x4=0,y4=0; // variaveis que guardam as posições (aleatorias) dos osbtaculos
//------------------------------------------------------
var inimigosX = [],inimigosY = [];//Posição do inimigo
var qtdeI = 5;//quantidade de inimigos;
var velocidade;//velocidade do inimigo
var dI;//Distancia do inimigo para o tiro e o jogador
//-----------------------------------------------------
var dx = 0, dy = 0;//posição do disparo
var disparo = false;//estado para determinar o disparo;
var d1, d2, d3; // variaveis para colisoes entre os objetos do jogo
var vidas=3, pont= 0; // inicia as variaveis que contam as vidas e os pontos
var telaFundo, jogador, inimigo;
//---------------------variaveis para animaçao-----------------------------------------
var anima;//armazena a animação
var moveImage = [];//Vetor das imagens
var contFrame = 0;//frame das imagens
var velAnima = 5;//velocidade da animação
var sprite = 0;//inicia a animação
const PATH = "FrameT/Frame";//pasta de armazenamento das imagens;
//-------------------Estados das Telas do Jogo-------------------------
var Play = false;

var Start = true;

var GameOver = false;
//---------------------------------------------------------------------
function preload(){//Função que adiciona imagens(Ver como faz)
	telaFundo = loadImage('fundo1.png'); // carrega imagem da tela de fundo
	jogador = loadImage('JOGADORONE.png');//carrega imagem do jogador
	inimigo = loadImage('inimigo.png');//carrega imagem do inimigo
	StartImage = loadImage('StartGame1.png');//Carrega a tela de inicio do jogo
	GameOverImage = loadImage('GameOver.png');//carrega a tela de fim do jogo
	Som = loadSound('SpaceSound.MPEG');//carrega o som de fundo do jogo;
	SomGO = loadSound('GameOver.wav');//carrega o som de game over;
	Tiro = loadImage('TirosNave.png');//carrega imagem do tiro;
	for(a=0;a<16;a++){
		moveImage[a] = loadImage(PATH+a+'.png'); // carrega a imagem do inimigo explodindo
	}
}
 function Animacao(){
	 contFrame++;
	 if(contFrame%velAnima>=0){
		image(moveImage[sprite],inimigosX[i],inimigosY[i]); //entao desenha o inimigo como forma de explosao
		sprite++;
	 }
	 	if(contFrame > 15){
	 		sprite = 0;
		}
}

function setStart(){
	image(StartImage,20,225);
	if(keyIsPressed && keyCode === ENTER){
		Play = true;
		Start = false;
		GameOver = false;
	}
}
function setGameOver(){
	image(telaFundo,0,0);//coloca a imagem de fundo do jogo
	image(GameOverImage,0,150);//exibe a imagem de game over quando as vidas chegam a zero;
	SomGO.setVolume(2.0);//Define o volume do som de game over
	SomGO.play();//Da inicio ao som de game over
	Som.stop();//para com a musica de fundo do jogo
}
function setup() {
	x1=random(70,300); y1=random(10,300); // define posição aleatoria do obstaculo vermelho
	x2=random(70,300); y2=random(10,300); // define posiçao aleatoria do obstaculo verd
	// frameRate(60);
	createCanvas(512,512);
	for(i=0;i<qtdeI;i++){
		inimigosX[i] = random(25, width-25);
		inimigosY[i] = -random(height);
	}
	velocidade = 2;
	Som.setVolume(0.2);
	Som.play();
}


// function Obstaculo(){ // define os obstaculos e as colisoes do jogador com eles
// 	fill(0, 0, 255);// azul
// 	rect(qx,qy,80,80)//Obstáculo proximo a elipse
// 	noFill();
// 	fill(255,0,0); // vermelho
// 	rect(x1,y1,80,80)//Obstáculo extra 1
// 	noFill();
// 	fill(0,255,0); // verde
// 	rect(x2,y2,80,80)//Obstáculo extra 2
// 	noFill();
// 	textSize(12)
// 	fill(0,0,0);
// 	d1 = int(dist(x,y,qx+40,qy+40));
// 	if(d1<=60){
// 		text("COLIDIU COM AZUL!",10,500);
// 		return true;
// 	}
// 	d2 = int(dist(x,y,x1+40,y1+40));
// 	if(d2<=60){
// 		text("COLIDIU COM VERMELHO!",10,500);
// 		return true;
// 	}
// 	d3 = int(dist(x,y,x2+40,y2+40));
// 	if(d3<=60){
// 		text("COLIDIU COM VERDE!",10,500);
// 		return true;
// 	}
// 	noFill();
// 	return false;
// }

function Vidas(){ // conta as vidas
	textSize(12);
	fill(255,255,255);
	textAlign(LEFT); // alinhar texto na borda esquerda
	for(i=0;i<qtdeI;i++){
		dI=int(dist(x,y,inimigosX[i],inimigosY[i])); // calcula a distancia entre jogador e inimigo
		if(dI<=30){ // se a distancia for menor ou igual que a soma dos raios
			inimigosY[i]=0;
			inimigosX[i]=random(15,500);
			vidas = vidas-1; // perde uma vida quando inimigo colidir com jogador
			if(vidas==0){
				textAlign(LEFT);
				vidas == text('FIM DE JOGO',380,80);
				setGameOver();
				noLoop();
			}
		}
	}
		text("RESTAM: "+vidas+" VIDAS", 380, 40);
		noFill();
}

function Pontuacao(){ //conta a pontuaçao
	textSize(12);
	fill(255,255,255);
	textAlign(LEFT);
	for(i=0;i<qtdeI;i++){
		dI=int(dist(dx,dy,inimigosX[i],inimigosY[i]));
		if(dI<=12){ // se disparo colidir com inimigo
			Animacao();
			if(disparo==true){ // e se disparo estiver ativo
			  inimigosY[i]=0; // o inimigo tem que ir pra posição 0 no eixo Y
				inimigosX[i]=random(15,500);//Quando o tiro atinge o inimigo, coloca ele em uma posição aleatoria no eixo X
				disparo = false;// desativa o disparo
			}
			pont=pont+1;
			if(pont%5==0 && pont!=0){ // se a pontuaçao for divisivel por 5 e for diferente de zero
				vidas=vidas+1; // A cada 5 pontos adiciona uma vida
			}
		}
	}
	text("PONTUAÇÃO: "+pont, 380,60);
	noFill();
}

function Fases(){//(Exibir na tela a passagem de fases)
	textSize(12);
	fill(255,255,255);
	if(pont<10){
		textAlign(LEFT);
		text("NÍVEL 1", 380,20);
	}
	if(pont>=10 && pont<20){
		velocidade=3;
		textAlign(LEFT);
		text("NÍVEL 2", 380,20);
	}
	if(pont>=20 && pont<30){
		velocidade=4;
		textAlign(LEFT);
		text("NÍVEL 3", 380,20);
	}
	if(pont>=30 && pont<40){
		velocidade=5;
		textAlign(LEFT);
		text("NÍVEL 4", 380,20);
	}
	if(pont>=40){
		velocidade=velocidade+0.001 ;
		textAlign(LEFT);
		text("NÍVEL 5",380,20);
	}
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
		dy= dy-20;//Faz o disparo percorrer o trajeto;
		if(dy<0){//quando o trajeto eh maior que o tamanho da tela;
			disparo =false;//retorna para o estado inicial e espera o comando para alterar o estado;
		}
	}
	if(disparo){//Gera o desenho do disparo;
		image(Tiro,dx,dy,5,5);//Design do Tiro;
	}
	noFill(); // retira preenchimento das formas subsequentes
	stroke(17, 50, 255); //Define a cor de contorno das formas subsequentes
	image(jogador,x,y,40,50);//Jogador;
	if(x>=500){//Colisão com as extremidades do Canvas
		x=x-10;
	}
	if(y>=500){//Colisão com as extremidades do Canvas
		y = y-10;
	}
	if(x<=5){//Colisão com as extremidades do Canvas
		x=x+10;
	}
	if(y<=5){//Colisão com as extremidades do Canvas
		y = y+10;
	}
	noStroke(); // tira o contorno de tudo que tiver apos essa função
}

function DesenhaInimigo(){
	for(i=0;i<qtdeI;i++){
		image(inimigo,inimigosX[i],inimigosY[i],20,20); // cria a figura inimiga
	}
}

function MovimentoInimigo(){
	for(i=0;i<qtdeI;i++){
		inimigosY[i] = inimigosY[i] + velocidade;
	}
	for(i=0;i<qtdeI;i++){
		if (inimigosY[i] > height){
				inimigosY[i] = -random(height);
				inimigosX[i] = random(25, width-25);
		}
	}
}

function Inimigo(){
	DesenhaInimigo();
	MovimentoInimigo();
	Fases();
}

function setPlay(){
	Vidas();
	Pontuacao();
	Movimento_Atirar();
	Inimigo();
}

function draw() {
	background(telaFundo);
	if(Play){
		setPlay();
	}if(Start){
		setStart();
	}if(GameOver){
		setGameOver();
	}
}
