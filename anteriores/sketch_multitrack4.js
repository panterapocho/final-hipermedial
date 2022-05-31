//FINAL HIPERMEDIAL

//Tomas Lilli - Federico Bascher

// -.-.-.-.-.-.--.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-..-.-.-.-.-.-.-.

let cantTrack = 8;
let track = []
let playTracks = 0;
let movY = 0;
let movX = 0;
let vel = 1;
let esp = 0;
let canvas

function preload() {
    
    background(255);
    textAlign(CENTER, CENTER);
    text('cargando tracks', width/2, height/2);

    soundFormats('mp3');

    for(let i = 0 ;i < cantTrack; i++){
                                        track[i] = {
                                                    sonido: loadSound('tracksEEH2019-00'+(i+1)),
                                                    vol: 0,
                                                    paneo: 0,
                                                    fft: new p5.FFT(),
                                                    spectrum: [],
                                                    colorTrack: []
                                                }

                                        track[i].fft.setInput(track[i].sonido)
                                    }
    getAudioContext().suspend();
    print("tracks cargados");
    background(255);
    textAlign(CENTER, CENTER);
    text('tracks cargados', width/2, height/2);

}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('anim')
    background(255);
    textAlign(CENTER, CENTER);
    text('Hacer click para comenzar', width/2, height/2);
}

function mousePressed () {
    userStartAudio();
    background(0);
    playTracks++;
    if(playTracks>=3){playTracks=1;}
    if(playTracks===1){for(let i = 0 ;i < track.length; i++){track[i].sonido.play();}}
    if(playTracks===2){for(let i = 0 ;i < track.length; i++){track[i].sonido.pause();}}
}

function draw() {
    trackMouse();
    if(sVstate === 1){scrollVertical();stroke(255);textSize(48);text('Scroll Vertical', 100, 100);}
    if(sVstate === 2){scrollHorizontal();textSize(48);text('Scroll Vertical', 100, 100);}
    if(sVstate === 3){scrollVerticalTotal();textSize(48);text('Scroll Vertical', 100, 100);}
    if(sVstate === 4){scrollHorizontalTotal();textSize(48);text('Scroll Vertical', 100, 100);}
}

function keyPressed(){
    print(key)
    if(key==='1'){sVstate = 1;print('sVstate = '+sVstate);}
    if(key==='2'){sVstate = 2;print('sVstate = '+sVstate);}
    if(key==='3'){sVstate = 3;print('sVstate = '+sVstate);}
    if(key==='4'){sVstate = 4;print('sVstate = '+sVstate);}
}

function trackMouse(){
    track[0].vol = map(mouseY,0,height,0,1);
    track[1].vol = map(mouseY,0,height,0,1);
    track[2].vol = map(mouseY,0,height,0,1);
    track[3].vol = map(mouseY,0,height,0,1);
    track[4].vol = map(mouseY,0,height,1,0);
    track[5].vol = map(mouseY,0,height,1,0);
    track[6].vol = map(mouseY,0,height,1,0);
    track[7].vol = map(mouseY,0,height,1,0);

    track[0].paneo = map(mouseX,0,width,0,-1);
    track[1].paneo = map(mouseX,0,width,0,1);
    track[2].paneo = map(mouseX,0,width,0,-1);
    track[3].paneo = map(mouseX,0,width,0,1);
    track[4].paneo = map(mouseX,0,width,0,-1);
    track[5].paneo = map(mouseX,0,width,0,1);
    track[6].paneo = map(mouseX,0,width,0,-1);
    track[7].paneo = map(mouseX,0,width,0,1);
}

function scrollVertical(){
    for(let i = 0 ;i < track.length; i++){

        track[i].sonido.setVolume(track[i].vol);

        track[i].sonido.pan(track[i].paneo);

        track[i].spectrum = track[i].fft.analyze(1024);

        track[i].spectrum.lenght = 1024

        //print("track["+i+"].spectrum.lenght:"+track[i].spectrum.lenght);

        for (let n = 0; n< track[i].spectrum.length; n++){  
                                                            
                                                            track[0].colorTrack = color(map(track[0].spectrum[n],0,track[0].spectrum.length,0,255),0,0,map(track[0].spectrum[n],0,track[0].spectrum.length,0,255));
                                                            track[1].colorTrack = color(map(track[1].spectrum[n],0,track[1].spectrum.length,0,255),0,0,map(track[1].spectrum[n],0,track[1].spectrum.length,0,255));
                                                            track[2].colorTrack = color(0,map(track[2].spectrum[n],0,track[2].spectrum.length,255,0),0,map(track[2].spectrum[n],0,track[2].spectrum.length,0,255));
                                                            track[3].colorTrack = color(0,map(track[3].spectrum[n],0,track[3].spectrum.length,255,0),0,map(track[3].spectrum[n],0,track[3].spectrum.length,0,255));
                                                            track[4].colorTrack = color(0,0,map(track[4].spectrum[n],0,track[4].spectrum.length,0,255),map(track[4].spectrum[n],0,track[4].spectrum.length,0,255));
                                                            track[5].colorTrack = color(0,0,map(track[5].spectrum[n],0,track[5].spectrum.length,0,255),map(track[5].spectrum[n],0,track[5].spectrum.length,0,255));
                                                            track[6].colorTrack = color(map(track[6].spectrum[n],0,track[6].spectrum.length,255,0),127,map(track[6].spectrum[n],0,track[6].spectrum.length,0,255),map(track[6].spectrum[n],0,track[6].spectrum.length,0,255));
                                                            track[7].colorTrack = color(map(track[7].spectrum[n],0,track[7].spectrum.length,255,0),127,map(track[7].spectrum[n],0,track[7].spectrum.length,0,255),map(track[7].spectrum[n],0,track[7].spectrum.length,0,255));
                                              
                                                            esp = map(n, 0, track[i].spectrum.length, 0, width/cantTrack);   //!!!!!!!!!!!!!!!!!!(i/(bands/(1+a/10)))+a;

                                                            noFill();

                                                            stroke(track[i].colorTrack);

                                                            ellipse(esp+(i*(width/cantTrack)),movY,1,1);

                                                        }
    }

    movY+=vel;

    if(movY>=height){
                    background(0);
                    movY=0;
                    }
}

function scrollHorizontal(){
    for(let i = 0 ;i < track.length; i++){

        track[i].sonido.setVolume(track[i].vol);

        track[i].sonido.pan(track[i].paneo);

        track[i].spectrum = track[i].fft.analyze(1024);

        //print("track["+i+"].spectrum.lenght:"+track[i].spectrum.lenght);

        for (let n = 0; n< track[i].spectrum.length; n++){
                                                            track[0].colorTrack = color(map(track[0].spectrum[n],0,track[0].spectrum.length,0,255),0,0,map(track[0].spectrum[n],0,track[0].spectrum.length,0,255));
                                                            track[1].colorTrack = color(map(track[1].spectrum[n],0,track[1].spectrum.length,0,255),0,0,map(track[1].spectrum[n],0,track[1].spectrum.length,0,255));
                                                            track[2].colorTrack = color(0,map(track[2].spectrum[n],0,track[2].spectrum.length,255,0),0,map(track[2].spectrum[n],0,track[2].spectrum.length,0,255));
                                                            track[3].colorTrack = color(0,map(track[3].spectrum[n],0,track[3].spectrum.length,255,0),0,map(track[3].spectrum[n],0,track[3].spectrum.length,0,255));
                                                            track[4].colorTrack = color(0,0,map(track[4].spectrum[n],0,track[4].spectrum.length,0,255),map(track[4].spectrum[n],0,track[4].spectrum.length,0,255));
                                                            track[5].colorTrack = color(0,0,map(track[5].spectrum[n],0,track[5].spectrum.length,0,255),map(track[5].spectrum[n],0,track[5].spectrum.length,0,255));
                                                            track[6].colorTrack = color(map(track[6].spectrum[n],0,track[6].spectrum.length,255,0),0,map(track[6].spectrum[n],0,track[6].spectrum.length,0,255),map(track[6].spectrum[n],0,track[6].spectrum.length,0,255));
                                                            track[7].colorTrack = color(map(track[7].spectrum[n],0,track[7].spectrum.length,255,0),0,map(track[7].spectrum[n],0,track[7].spectrum.length,0,255),map(track[7].spectrum[n],0,track[7].spectrum.length,0,255));
                                              
                                                            esp = map(n, 0, track[i].spectrum.length, 0, height/cantTrack);   //!!!!!!!!!!!!!!!!!!(i/(bands/(1+a/10)))+a;

                                                            noFill();

                                                            stroke(track[i].colorTrack);

                                                            ellipse(movX, esp+(i*(height/cantTrack)),1,1);

                                                        }
    }

    movX+=vel;

    if(movX>=width){
                    background(0);
                    movX=0;
                    }
}

function scrollHorizontalTotal(){
    for(let i = 0 ;i < track.length; i++){

        track[i].sonido.setVolume(track[i].vol);

        track[i].sonido.pan(track[i].paneo);

        track[i].spectrum = track[i].fft.analyze(1024);

        //print("track["+i+"].spectrum.lenght:"+track[i].spectrum.lenght);

        for (let n = 0; n< track[i].spectrum.length; n++){
                                                            track[0].colorTrack = color(map(track[0].spectrum[n],0,track[0].spectrum.length,0,255),0,0,map(track[0].spectrum[n],0,track[0].spectrum.length,0,255));
                                                            track[1].colorTrack = color(map(track[1].spectrum[n],0,track[1].spectrum.length,0,255),0,0,map(track[1].spectrum[n],0,track[1].spectrum.length,0,255));
                                                            track[2].colorTrack = color(0,map(track[2].spectrum[n],0,track[2].spectrum.length,255,0),0,map(track[2].spectrum[n],0,track[2].spectrum.length,0,255));
                                                            track[3].colorTrack = color(0,map(track[3].spectrum[n],0,track[3].spectrum.length,255,0),0,map(track[3].spectrum[n],0,track[3].spectrum.length,0,255));
                                                            track[4].colorTrack = color(0,0,map(track[4].spectrum[n],0,track[4].spectrum.length,0,255),map(track[4].spectrum[n],0,track[4].spectrum.length,0,255));
                                                            track[5].colorTrack = color(0,0,map(track[5].spectrum[n],0,track[5].spectrum.length,0,255),map(track[5].spectrum[n],0,track[5].spectrum.length,0,255));
                                                            track[6].colorTrack = color(map(track[6].spectrum[n],0,track[6].spectrum.length,255,0),0,map(track[6].spectrum[n],0,track[6].spectrum.length,0,255),map(track[6].spectrum[n],0,track[6].spectrum.length,0,255));
                                                            track[7].colorTrack = color(map(track[7].spectrum[n],0,track[7].spectrum.length,255,0),0,map(track[7].spectrum[n],0,track[7].spectrum.length,0,255),map(track[7].spectrum[n],0,track[7].spectrum.length,0,255));
                                              
                                                            esp = map(n, 0, track[i].spectrum.length, 0, height);   //!!!!!!!!!!!!!!!!!!(i/(bands/(1+a/10)))+a;

                                                            noFill();

                                                            stroke(track[i].colorTrack);

                                                            ellipse(movX, esp,1,1);

                                                        }
    }

    movX+=vel;

    if(movX>=width){
                    background(0);
                    movX=0;
                    }

}

function scrollVerticalTotal(){
    for(let i = 0 ;i < track.length; i++){

    track[i].sonido.setVolume(track[i].vol);

    track[i].sonido.pan(track[i].paneo);

    track[i].spectrum = track[i].fft.analyze(1024);

    //print("track["+i+"].spectrum.lenght:"+track[i].spectrum.lenght);

    for (let n = 0; n< track[i].spectrum.length; n++){
                                                        track[0].colorTrack = color(map(track[0].spectrum[n],0,track[0].spectrum.length,0,255),0,0,map(track[0].spectrum[n],0,track[0].spectrum.length,0,255));
                                                        track[1].colorTrack = color(map(track[1].spectrum[n],0,track[1].spectrum.length,0,255),0,0,map(track[1].spectrum[n],0,track[1].spectrum.length,0,255));
                                                        track[2].colorTrack = color(0,map(track[2].spectrum[n],0,track[2].spectrum.length,255,0),0,map(track[2].spectrum[n],0,track[2].spectrum.length,0,255));
                                                        track[3].colorTrack = color(0,map(track[3].spectrum[n],0,track[3].spectrum.length,255,0),0,map(track[3].spectrum[n],0,track[3].spectrum.length,0,255));
                                                        track[4].colorTrack = color(0,0,map(track[4].spectrum[n],0,track[4].spectrum.length,0,255),map(track[4].spectrum[n],0,track[4].spectrum.length,0,255));
                                                        track[5].colorTrack = color(0,0,map(track[5].spectrum[n],0,track[5].spectrum.length,0,255),map(track[5].spectrum[n],0,track[5].spectrum.length,0,255));
                                                        track[6].colorTrack = color(map(track[6].spectrum[n],0,track[6].spectrum.length,255,0),0,map(track[6].spectrum[n],0,track[6].spectrum.length,0,255),map(track[6].spectrum[n],0,track[6].spectrum.length,0,255));
                                                        track[7].colorTrack = color(map(track[7].spectrum[n],0,track[7].spectrum.length,255,0),0,map(track[7].spectrum[n],0,track[7].spectrum.length,0,255),map(track[7].spectrum[n],0,track[7].spectrum.length,0,255));
                                          
                                                        esp = map(n, 0, track[i].spectrum.length, 0, width);   //!!!!!!!!!!!!!!!!!!(i/(bands/(1+a/10)))+a;

                                                        noFill();

                                                        stroke(track[i].colorTrack);

                                                        ellipse(esp,movY,1,1);

                                                    }
}

movY+=vel;

if(movY>=height){
                background(0);
                movY=0;
                }
}