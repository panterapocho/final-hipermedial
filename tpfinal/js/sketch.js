let yV = 0;
let xH = 0;
let vel = 0;
let track = [] 
let spectrum = []
let cantTrack = 4
let vSlider;
let tamSlider = 150;

function preload(){

    for(let i = 0 ;i < cantTrack; i++){
        track[i] = {
                    sonido: loadSound('tracks/tracksEEH2019-00'+(i+1)+'.mp3'),
                    vol: 0,
                    paneo: 0,
                    fft: new p5.FFT(),
                    spectrum: [],
                    colorTrack: []
                }
        track[i].fft.setInput(track[i].sonido)
    }
}
  
function setup(){
    let cnv = createCanvas(windowWidth,windowHeight);
    cnv.mouseClicked(togglePlay);
    background(0)
    fill(255)
    textSize((width+height)/150)
    textAlign(RIGHT,TOP)
    text('click para comenzar', width - (width/20), 10);
    text('con las teclas "1" y "2" se elige modo de reproduccion (1 = vertical, 2 = horizontal)',width - (width/20), 30);
    text('con el slider se puede variar la velocidad de reproduccion del espectrograma', width - (width/20), 50);
    text('control de velocidad', width - (width/20), 85)
    vSlider = createSlider(0.05, 1, 0.075, 0.001);
    vSlider.style('width', tamSlider+'px');
    vSlider.position(width - (width/20) - tamSlider, 100);
}
  
function draw(){
    vel = vSlider.value();
    trackMouse();
    if(keyCode == 49){sVertical();}
    if(keyCode == 50){sHorizontal();}
    if(keyCode == 51){sVerticalIND();}
    if(keyCode == 52){sHorizontalIND();}
    /*
    console.log('keyCode: '+keyCode)
    console.log('key: '+key)
    console.log('vel: '+vel)
    */
}

function keyPressed(){
    if(keyCode == 49 || keyCode == 50 || keyCode == 51 || keyCode == 52){background(0,255);}
}

function sVertical(){
    for (let t = 0; t< track.length; t++){
        track[t].sonido.setVolume(track[t].vol);
        track[t].sonido.pan(track[t].paneo);
        spectrum[t] = track[t].fft.analyze();
        noStroke();
        fill(255, 0, 255);
        yV+=vel;
        if(yV >= height){yV=0;background(0, 255)}
        
        //
        
        for (let i = 0; i< spectrum[t].length; i++){
            let xV = map(i, 0, spectrum[t].length, 0, width*2);
            if(t === 0){fill(255, 0, 0, spectrum[t][i]);}
            if(t === 1){fill(0, 255, 0, spectrum[t][i]);}
            if(t === 2){fill(0, 0, 255, spectrum[t][i]);}
            if(t === 3){fill(132, 150, 164, spectrum[t][i]);}
            
            rect(xV, yV, 2,2)
        }
    }
}

function sHorizontal(){
        for (let t = 0; t< track.length; t++){
            track[t].sonido.setVolume(track[t].vol);
            track[t].sonido.pan(track[t].paneo);
            spectrum[t] = track[t].fft.analyze();
            noStroke();
            fill(255, 0, 255);
            xH+=vel;
            if(xH >= width){xH=0;background(0, 255)}
            
            //
            
            for (let i = 0; i< spectrum[t].length; i++){
                let yH = map(i, 0, spectrum[t].length, height, -height);
                if(t === 0){fill(255, 0, 0, spectrum[t][i])}
                if(t === 1){fill(0, 255, 0, spectrum[t][i])}
                if(t === 2){fill(0, 0, 255, spectrum[t][i])}
                if(t === 3){fill(132, 150, 164, spectrum[t][i])}
                
                rect(xH, yH, 1, spectrum[t].length/height)
            }
        }
}


function sVerticalIND(){
    for (let t = 0; t< track.length; t++){
        track[t].sonido.setVolume(track[t].vol);
        track[t].sonido.pan(track[t].paneo);
        spectrum[t] = track[t].fft.analyze();
        noStroke();
        fill(255, 0, 255);
        yV+=vel;
        if(yV >= height){yV=0;background(0, 255)}
        
        //
        push();
        translate((width/cantTrack)*t,0);
        for (let i = 0; i< spectrum[t].length; i++){
            let xV = map(i, 0, spectrum[t].length, 0, width/cantTrack);
            if(t === 0){fill(255, 0, 0, spectrum[t][i]);}
            if(t === 1){fill(0, 255, 0, spectrum[t][i]);}
            if(t === 2){fill(0, 0, 255, spectrum[t][i]);}
            if(t === 3){fill(132, 150, 164, spectrum[t][i]);}
            
            rect(xV, yV, 2,2)
        }
        pop();
    }
}

function sHorizontalIND(){
    for (let t = 0; t< track.length; t++){
        track[t].sonido.setVolume(track[t].vol);
        track[t].sonido.pan(track[t].paneo);
        spectrum[t] = track[t].fft.analyze();
        noStroke();
        fill(255, 0, 255);
        xH+=vel;
        if(xH >= windowWidth){xH=0;background(0, 255);}
        
        //
        push();
        translate(0,0+(height/cantTrack)*t);
        console.log(-((height/cantTrack)*t));
        for (let i = 0; i< spectrum[t].length; i++){
            let yH = map(i, 0, spectrum[t].length, (height/cantTrack), 0);
            if(t === 0){fill(255, 0, 0, spectrum[t][i]);}
            if(t === 1){fill(0, 255, 0, spectrum[t][i]);}
            if(t === 2){fill(0, 0, 255, spectrum[t][i]);}
            if(t === 3){fill(132, 150, 164, spectrum[t][i]);}
            
            rect(xH, yH, 1, spectrum[t].length/height);
        }
        pop();
    }
}

function togglePlay() {
      //vel = 0.075;
      for(let i = 0 ;i < track.length; i++){
            if (track[i].sonido.isPlaying()) {track[i].sonido.pause();} else {track[i].sonido.loop();}
      }
  }
  
function trackMouse(){
    track[0].vol = map(mouseY,0,height,0,1);
    track[1].vol = map(mouseY,0,height,0,1);
    track[2].vol = map(mouseY,0,height,1,0);
    track[3].vol = map(mouseY,0,height,1,0);

    track[0].paneo = map(mouseX,0,width,0,-0.5);
    track[1].paneo = map(mouseX,0,width,0,0.5);
    track[2].paneo = map(mouseX,0,width,0,-0.5);
    track[3].paneo = map(mouseX,0,width,0,0.5);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }