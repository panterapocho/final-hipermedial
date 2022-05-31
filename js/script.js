const contenedorIndex = document.querySelector('.tpfinal')
const titulosTP = document.querySelector('.titulos_tpfinal')
const boton_descripcionTP = document.querySelector('.botonDescTp')
let boton_canvas = document.createElement('button');
let pTxt = []
let imgFotos = []
let cargaCanvas
let divAnim
let logo
const descripcionTP = [
'haciendo click en "IR AL TP", aparecerá un canvas con la indicación: "hacer click para comenzar".',
'Al hacer click sobre el canvas, comenzarán a reproducirse los 4 stems stereo de un track multipista grabado por el Ensamble Electronico Hybrido en Estudiosaurio (Villa Luro, Buenos Aires) durante el año 2019.', 
'Durante la reproduccion del track se podrá afectar ciertos parametros de cada stem en la mezcla, interactuando con el mouse.',
'Mientras, al presionar una de las teclas numericas del 1 al 4, podrán verse en simultaneo los espectrogramas de cada una de las pistas que componen cada stem.',
'Presionando la tecla 1, los espectrogramas de cada stem stereo se verán superpuestos (cada stem con un color), corriendo en sentido vertical de arriba hacia abajo.',
'Presionando la tecla 2, los espectrogramas de cada stem stereo se verán superpuestos (cada stem con un color), corriendo en sentido horizontal de izquierda a derecha.',
'Presionando la tecla 3, los espectrogramas de cada stem stereo se verán por separado, corriendo en sentido vertical de arriba hacia abajo.',
'Presionando la tecla 4, los espectrogramas de cada stem stereo se verán por separado, corriendo en sentido horizontal de izquierda a derecha.',
'En la esquina superior derecha, aparecerá un slider con el cual se podrá modificar la velocidad de reproducción del espectrograma',
'Abajo, otro slider permite modificar la resolucion del espectrograma',
'Al desplazar el mouse sobre el canvas, el track tendrá modificaciones en la mezcla.',
'Moviendo el mouse sobre el eje vertical se controlan los volumenes de 2 grupos de pistas.', 
'(si el mouse se encuentra hacia el borde superior de la pantalla se escucharan solo dos pistas, mientras que si se encuentra en el borde inferior de la pantalla se escucharan unicamente las otras dos.)',
'Desplazando el mouse sobre el eje horizontal se controla el paneo de las pistas',
'(si el mouse se encuentra todo hacia la izquierda se escucharán con su apertura stereo original centrada, si en cambio se encuentra todo hacia la derecha, se correra el centro de cada stem stereo).',
'Ubicando el mouse en la mitad de la pantalla, se escucharán ambos grupos de pistas.', 
'Para escuchar el track "completo y centrado" se debe ubicar el mouse sobre el margen izquierdo y a 1/2 de la altura del canvas.'
]
let fotos = ['img/cdp8.jpg','img/cdp9.jpg','img/cdp10.jpg','img/cdp5.jpg']


boton_descripcionTP.addEventListener('click', function () { 
        titulosTP.remove();
        boton_canvas.textContent = 'IR AL TP'
        boton_canvas.src = 'canvas.html'
        
        boton_descripcionTP.remove();
        logo = document.createElement('img')
        logo.src = 'img/INVERT_TAPA_HYBRIDOS_BANDCAMP.jpg'
        logo.width = 500
        contenedorIndex.append(logo)
        for(let i = 0; i < descripcionTP.length; i++){
            if(i === 4){imgFotos[i] = document.createElement('img');
                        imgFotos[i].src = fotos[0];
                        imgFotos[i].width = 500;
                        contenedorIndex.append(imgFotos[i]);}
            
            if(i === 5){imgFotos[i] = document.createElement('img');
                        imgFotos[i].src = fotos[1];
                        imgFotos[i].width = 500;
                        contenedorIndex.append(imgFotos[i]);}
            
            if(i === 6){imgFotos[i] = document.createElement('img');
                        imgFotos[i].src = fotos[2];
                        imgFotos[i].width = 500;
                        contenedorIndex.append(imgFotos[i]);}

            if(i === 7){imgFotos[i] = document.createElement('img');
                        imgFotos[i].src = fotos[3];
                        imgFotos[i].width = 500;
                        contenedorIndex.append(imgFotos[i]);}
            
            pTxt[i] = document.createElement('p')
            pTxt[i].textContent = descripcionTP[i]
            contenedorIndex.append(pTxt[i])
            
        }
        contenedorIndex.append(boton_canvas)
    }
)

boton_canvas.addEventListener('click', function(){
    boton_descripcionTP.remove()
    logo.remove()
    for(let i = 0; i < descripcionTP.length; i++){
    pTxt[i].remove()
    }
    document.location.href = "canvas.html"
    boton_canvas.remove()
    /*
    divAnim = document.createElement('div')
    divAnim.id = 'anim'
    cargaCanvas = document.createElement('script')
    cargaCanvas.src = 'js/sketch.js'
    divAnim.append(cargaCanvas)
    // divAnim.appendChild(cargaCanvas)
    contenedorIndex.append(divAnim)
    */
})