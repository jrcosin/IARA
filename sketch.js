let img;
let hue = 0;
let tintSpeed = 1;
let word = "IARA"
let words = ["COLECTIVO" , "DE" , "PALBRAS"];
let index = 0;
let fade = 0;
let fadeSpeed = 5;
let r = 0;
let g = 0;
let b = 0;
let x;
let y;
let button; 
    


function preload() {
  img = loadImage('IARA1.jpg')

}


/*function mouseClicked() {
  console.log("Coordenadas del mouse: ", mouseX, mouseY);
}*/

  

function setup() {
  createCanvas(400, 400);
  img.resize(width, height);
  frameRate (5);
  button = createButton("Escúchame");
  button.position(10, 300);
  button.mousePressed(changeText);
   // Configurar el oscilador
  osc = new p5.Oscillator();
  osc.setType('sine'); // Tipo de forma de onda del oscilador (por ejemplo, 'sine', 'triangle', 'square', 'sawtooth')
  osc.freq(440); // Frecuencia del oscilador (440 Hz es el La central)
  osc.amp(0.5); // Amplitud del oscilador (valor entre 0 y 1)
  
  // Iniciar el oscilador
  osc.start();

}

function changeText() {
  button.html("¡Me estás escuchando!");
}

function generateRandomCoordinates() {
  let insideSquare = true;
  while (insideSquare) {
    x = random(width);
    y = random(height);
    
    // Verificar si las coordenadas están fuera del cuadrado
    if (x < 166 || x > 344 || y < 85 || y > 238) {
      insideSquare = false;
    }
  }
}

function palabraAparicion() {

  fade += fadeSpeed;
  fade = constrain(fade, 0, 255);
  generateRandomCoordinates();
  fill(r,g,b, fade);
  textSize(50);
  textAlign(LEFT, TOP);
  text(words[index], x , y );

 
}
  
function colorAlAzar() {
     r = random(255);
     g = random(255);
     b = random(255);
}

function nombreAparicion() {
  fade += fadeSpeed;
  fade = constrain(fade, 0, 255);
  generateRandomCoordinates();
  // Dibujar la letra actual con la opacidad actual
  colorAlAzar();
  fill(r, g, b, fade);
  textSize(100);
  textAlign(LEFT, TOP);
  text(word[index], x , y );
  
  // Cambiar a la siguiente letra cuando la opacidad máxima se alcance
  if (fade === 255) {
    index = (index + 1) % words.length;
    fade = 0;
}
}
function applyGlitch() {
  for (let i = 0; i < 1000; i++) {
    let x = floor(random(400));
    let y = floor(random(400));
    let col = get(x, y);
    let offsetX = floor(random(-20, 20));
    let offsetY = floor(random(-20, 20));
    set(x + offsetX, y + offsetY, col);
  }
}

function tintGradual(){
   hue = (hue + tintSpeed) % 360;
  tint(hue, 255, 255);
}

function draw() {
  background(200);
  image(img, 0, 0);
  //applyGlitch(); 
  tintGradual();
  updatePixels();
  nombreAparicion();
  palabraAparicion();
  let frequency = map(mouseX, 0, width, 100, 1200); // Mapear la posición del mouse a una frecuencia
  osc.freq(frequency); // Actualizar la frecuencia del oscilador
}

