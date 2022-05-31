let yV = 0;
let xH = 0;
let vel = 0;
let track = [] 
let spectrum = []
let cantTrack = 4
let vSlider;
let tSlider;
let tamSlider = 150;
let tamSpectrum = 5;
let tamSpectrumPixel = 1;

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
    tSlider = createSlider(1, 20, 1, 0.01);
    tSlider.style('width', tamSlider+'px');
    tSlider.position(width - (width/20) - tamSlider, 200);
}
  
function draw(){
    vel = vSlider.value();
    tamSpectrum = tSlider.value();
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
            let xV = map(i, 0, spectrum[t].length, 0, width*2*tamSpectrum);
            let alphaSVert = spectrum[t][i];
            if(xV >= width){alphaSVert = 0;}
            if(t === 0){fill(spectrum[t][i], 0, 0, alphaSVert);}
            if(t === 1){fill(0, spectrum[t][i], 0, alphaSVert);}
            if(t === 2){fill(0, 0, spectrum[t][i], alphaSVert);}
            if(t === 3){fill(132, spectrum[t][i], 164, alphaSVert);}
            if(i === 1){tamSpectrumPixel = xV}
            rect(xV, yV, tamSpectrumPixel,tamSpectrumPixel)
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
                let yH = map(i, 0, spectrum[t].length, height, -height*tamSpectrum);
                let alphaSHor = spectrum[t][i];
                if(yH <= 0){alphaSVert = 0;}
                if(t === 0){fill(alphaSHor, 0, 0, alphaSHor)}
                if(t === 1){fill(0, alphaSHor, 0, alphaSHor)}
                if(t === 2){fill(0, 0, alphaSHor, alphaSHor)}
                if(t === 3){fill(alphaSHor, 0, alphaSHor, alphaSHor)}
                if(i === 1){tamSpectrumPixel = tamSpectrum}
                rect(xH, yH, tamSpectrumPixel,tamSpectrumPixel)
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
            
            let xV = map(i, 0, spectrum[t].length, 0, width/(cantTrack/tamSpectrum));
            let alphaSVerInd = spectrum[t][i];
            if(xV >= width/cantTrack){alphaSVerInd = 0;}
            if(t === 0){fill(alphaSVerInd, 0, 0, alphaSVerInd)}
            if(t === 1){fill(0, alphaSVerInd, 0, alphaSVerInd)}
            if(t === 2){fill(0, 0, alphaSVerInd, alphaSVerInd)}
            if(t === 3){fill(alphaSVerInd, 0, alphaSVerInd, alphaSVerInd)}

            if(i === 1){tamSpectrumPixel = xV}
            rect(xV, yV, tamSpectrumPixel,tamSpectrumPixel)
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
        if(xH >= width){xH=0;background(0, 255);}
        
        //
        push();
        translate(0,(height/cantTrack)*t);
        console.log(-((height/cantTrack)*t));
        for (let i = 0; i< spectrum[t].length; i++){

            let yH = map(i, 0, spectrum[t].length, (height/cantTrack), -(1*tamSpectrum));
            let alphaSHorInd = spectrum[t][i];
            if(yH <= 0){alphaSHorInd = 0;}
            if(t === 0){fill(alphaSHorInd, 0, 0, alphaSHorInd)}
            if(t === 1){fill(0, alphaSHorInd, 0, alphaSHorInd)}
            if(t === 2){fill(0, 0, alphaSHorInd, alphaSHorInd)}
            if(t === 3){fill(alphaSHorInd, 0, alphaSHorInd, alphaSHorInd)}
                        
            if(i === 1){tamSpectrumPixel = tamSpectrum/cantTrack}
            rect(xH, yH, tamSpectrumPixel,tamSpectrumPixel)
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