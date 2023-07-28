const sectionSeleccionarAtaque = document.getElementById('Seleccionar-Ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonPaisJugador =  document.getElementById('boton-pais')


const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarPais = document.getElementById('seleccionar-Pais')
const spanPaisJugador = document.getElementById('pais-jugador')
const spanImagenJugador = document.getElementById('imagen-jugador')

const spanPaisEnemigo = document.getElementById('pais-enemigo')
const spanImagenEnemigo = document.getElementById('imagen-enemigo')


const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataque-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataque-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa') 

let jugadorId = null
let enemigoId = null
let paises = []
let paisesEnemigos = []
let opcionDePaises
let ataqueJugador = []
let ataqueEnemigo = []
let ataquesPais
let ataquesPaisEnemigo 
let inputRusia 
let inputUcrania 
let inputEstadosUnidos 
let inputChina
let inputVenezuela
let inputReinoUnido
let imagenJugador
let imagenEnemigo
let paisJugador
let paisJugadorObjeto
let botonFuego 
let botonAgua 
let botonTierra
let botones = [] 
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 5
let vidasEnemigo = 5
let lienzo = mapa.getContext('2d')
let intervalo
let mapBackGround = new Image()
mapBackGround.src = './assest/mapamundial.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 40
const anchoMaximoDelMapa = 400

if(anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 40
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Pais {
    constructor(nombre, foto, vida, tipo, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.tipo = tipo
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarPais() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        ) 
    }
}


let rusia = new Pais('Rusia', './Assest/rusia.png', 5, 'Potencia', './Assest/soldadoRusia.png')
let ucrania = new Pais('Ucrania', './Assest/ucrania1.png', 5, 'subDesarrollada', './Assest/soldadoUcrania.png')
let estadosUnidos = new Pais('EEUU', './Assest/usa.png', 5, 'Potencia', './Assest/soldadoEeuu.png')
let china = new Pais('China', './Assest/China.png', 5, 'Potencia', './Assest/soldadoChina.jpg')
let venezuela = new Pais('Venezuela','./Assest/Venezuela.png', 5, 'subDesarrollada', './Assest/soldadoVenezuela.png')
let reinoUnido = new Pais('ReinoUnido', './Assest/reinoUnido.png', 5, 'Potencia', './Assest/soldadoUk.png')


const RUSIA_ATAQUES = [
    {nombre: '💧', id: 'boton-agua' },
    {nombre: '💧', id: 'boton-agua' },
    {nombre: '💧', id: 'boton-agua' },
    {nombre: '🔥', id: 'boton-fuego' },
    {nombre: '🪴', id: 'boton-tierra' },
]

rusia.ataques.push(...RUSIA_ATAQUES)

const UCRANIA_ATAQUES = [
    {nombre: '🪴', id: 'boton-tierra' },
    {nombre: '🪴', id: 'boton-tierra' },
    {nombre: '🪴', id: 'boton-tierra' },
    {nombre: '💧', id: 'boton-agua' },
    {nombre: '🔥', id: 'boton-fuego' },
]

ucrania.ataques.push(...UCRANIA_ATAQUES)

const ESTADOSUNIDOS_ATAQUES = [ 
    {nombre: '🔥', id: 'boton-fuego' },
    {nombre: '🔥', id: 'boton-fuego' },
    {nombre: '🔥', id: 'boton-fuego' },
    {nombre: '💧', id: 'boton-agua' },
    {nombre: '🪴', id: 'boton-tierra' },
]

estadosUnidos.ataques.push(...ESTADOSUNIDOS_ATAQUES)

const CHINA_ATAQUES = [ 
    {nombre: '🔥', id: 'boton-fuego' },
    {nombre: '🔥', id: 'boton-fuego' },
    {nombre: '💧', id: 'boton-agua' },
    {nombre: '🪴', id: 'boton-tierra' },
    {nombre: '🪴', id: 'boton-tierra' },
]

china.ataques.push(...CHINA_ATAQUES)

const VENEZUELA_ATAQUES = [ 
    {nombre: '🔥', id: 'boton-fuego' },
    {nombre: '💧', id: 'boton-agua' },
    {nombre: '🪴', id: 'boton-tierra' },
    {nombre: '🔥', id: 'boton-fuego' },
    {nombre: '💧', id: 'boton-agua' },
]

venezuela.ataques.push(...VENEZUELA_ATAQUES)

const REINOUNIDO_ATAQUES = [ 
    {nombre: '🔥', id: 'boton-fuego' },
    {nombre: '💧', id: 'boton-agua' },
    {nombre: '💧', id: 'boton-agua' },
    {nombre: '🪴', id: 'boton-tierra' },
    {nombre: '🪴', id: 'boton-tierra' },
]

reinoUnido.ataques.push(...REINOUNIDO_ATAQUES)


paises.push(rusia,ucrania,estadosUnidos,china,venezuela,reinoUnido)


function iniciarJuego (){
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionVerMapa.style.display = 'none'


    paises.forEach((pais) => {
       opcionDePaises = `
       <input type="radio" name="País" id=${pais.nombre} />
       <label class="tarjeta-de-pais" for=${pais.nombre}>
           <p>${pais.nombre}</p>
           <img src=${pais.foto} alt=${pais.nombre}>
       </label> 
       `
    contenedorTarjetas.innerHTML += opcionDePaises

        inputRusia = document.getElementById('Rusia')
        inputEstadosUnidos = document.getElementById('EEUU')
        inputUcrania = document.getElementById('Ucrania')
        inputChina = document.getElementById('China')
        inputVenezuela = document.getElementById('Venezuela')
        inputReinoUnido = document.getElementById('ReinoUnido')
    })
    botonPaisJugador.addEventListener('click', seleccionarPaisJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.1.54:8080/unirse")
        .then(function (res) {
            if(res.ok) {
                res.text() 
                    .then(function(respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        }) 
}

function seleccionarPaisJugador() {
    if(inputRusia.checked){
        spanPaisJugador.innerHTML = inputRusia.id 
        imagenJugador =  `<img src=${rusia.foto} alt=${rusia.nombre}>`
        spanImagenJugador.innerHTML =imagenJugador
        paisJugador = inputRusia.id 
    } else if(inputEstadosUnidos.checked){
        spanPaisJugador.innerHTML = inputEstadosUnidos.id
        imagenJugador = `<img src=${estadosUnidos.foto} alt=${estadosUnidos.nombre}>`
        spanImagenJugador.innerHTML =imagenJugador
        paisJugador = inputEstadosUnidos.id
    } else if(inputUcrania.checked){
        spanPaisJugador.innerHTML = inputUcrania.id
        imagenJugador = `<img src=${ucrania.foto} alt=${ucrania.nombre}>`
        spanImagenJugador.innerHTML =imagenJugador
        paisJugador = inputUcrania.id
    } else if(inputChina.checked) {
        spanPaisJugador.innerHTML = inputChina.id 
        imagenJugador =  `<img src=${china.foto} alt=${china.nombre}>`
        spanImagenJugador.innerHTML =imagenJugador
        paisJugador = inputChina.id    
    } else if(inputVenezuela.checked) {
        spanPaisJugador.innerHTML = inputVenezuela.id 
        imagenJugador =  `<img src=${venezuela.foto} alt=${venezuela.nombre}>`
        spanImagenJugador.innerHTML =imagenJugador
        paisJugador = inputVenezuela.id    
    } else if(inputReinoUnido.checked) {
        spanPaisJugador.innerHTML = inputReinoUnido.id 
        imagenJugador =  `<img src=${reinoUnido.foto} alt=${reinoUnido.nombre}>`
        spanImagenJugador.innerHTML =imagenJugador
        paisJugador = inputReinoUnido.id    
    } else {
        alert("Debes seleccionar un País")
        return
        //location.reload()
    }

    sectionSeleccionarPais.style.display = 'none'
    seleccionarPais(paisJugador) 
    extraerAtaques(paisJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarPais(paisJugador) {
    fetch(`http://192.168.1.54:8080/pais/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            pais: paisJugador
        })

    })
}

function extraerAtaques(paisJugador){ 
    let ataques
    let tipo  
    for (let i = 0; i < paises.length; i++) {
        if(paisJugador === paises[i].nombre) {
            ataques = paises[i].ataques
            tipo = paises[i].tipo
        }
    }
    mostrarAtaques(ataques, tipo)
}

function mostrarAtaques(ataques, tipo){
    ataques.forEach((ataque) => {
        ataquesPais = `
        <button id=${ataque.id}  class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        
    contenedorAtaques.innerHTML += ataquesPais
    
    })
     
    if(tipo === 'Potencia') {
            ataquesPais = `
            <button id='boton-fuego'  class="boton-de-ataque BAtaque">🔥</button>
            `
        contenedorAtaques.innerHTML = ataquesPais + contenedorAtaques.innerHTML
        }

        botonFuego = document.getElementById('boton-fuego')
        botonAgua = document.getElementById('boton-agua')
        botonTierra = document.getElementById('boton-tierra')
        botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') { 
                ataqueJugador.push('FUEGO🔥')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if(e.target.textContent == '💧') {
                ataqueJugador.push('AGUA💧')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA🪴')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques() {
    fetch(`http://192.168.1.54:8080/pais/${jugadorId}/ataques` , {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.1.54:8080/pais/${enemigoId}/ataques`)
        .then(function (res) {
            if(res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if(ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}


function electionEnemy(enemigo) {
    spanPaisEnemigo.innerHTML = enemigo.nombre
    ataquesPaisEnemigo = enemigo.ataques
    console.log(ataquesPaisEnemigo)
    imagenEnemigo = `<img src=${enemigo.foto} alt=${enemigo.nombre}>`
    spanImagenEnemigo.innerHTML = imagenEnemigo

    /* let paisEnemigo = aleatorio(0, paises.length -1)
   
    spanPaisEnemigo.innerHTML = paises[paisEnemigo].nombre
    
    ataquesPaisEnemigo = paises[paisEnemigo].ataques */
    secuenciaAtaque()

}

function ataqueAleatorioEnemy() {
    /* let ataqueAleatorio = aleatorio(0, ataquesPaisEnemigo.length -1) */
    for (let a = 0; a < ataquesPaisEnemigo.length; a++) {
        if(ataquesPaisEnemigo[a].nombre === '🔥'){
            ataqueEnemigo.push('FUEGO🔥')
            console.log(ataqueEnemigo)
        } else if(ataquesPaisEnemigo[a].nombre === '💧'){
            ataqueEnemigo.push('AGUA💧')
            console.log(ataqueEnemigo)
        } else {
            ataqueEnemigo.push('TIERRA🪴')
            console.log(ataqueEnemigo)
        }
        
    }
    /* let ataqueAleatorio = aleatorio(0, ataquesPaisEnemigo.length -1)

    if(ataquesPaisEnemigo[ataqueAleatorio].nombre === '🔥') {
        ataqueEnemigo.push('FUEGO🔥')
        console.log(ataqueEnemigo)
    } else if(ataquesPaisEnemigo[ataqueAleatorio].nombre === '💧') {
        ataqueEnemigo.push('AGUA💧')
        console.log(ataqueEnemigo)
    } else if(ataquesPaisEnemigo[ataqueAleatorio].nombre === '🪴') {
        ataqueEnemigo.push('TIERRA🪴')
        console.log(ataqueEnemigo)
    } */
    
    /* let ataqueAleatorio = aleatorio(0, ataquesPaisEnemigo.length -1)
    for (let ata = 0; ata < ataquesPaisEnemigo.length; ata++) {
        if(ataquesPaisEnemigo[ata] === ataquesPaisEnemigo[ataqueAleatorio]) {
            ataqueEnemigo.push(ataquesPaisEnemigo[ataqueAleatorio].nombre)
        }
        console.log(ataqueEnemigo)
    } */

    /* if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO🔥')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA💧')
    } else {
        ataqueEnemigo.push('TIERRA🪴')
    }
    console.log(ataqueEnemigo) */
    iniciarPelea()
}

function iniciarPelea() {
    if(ataqueJugador.length === 5){
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje('EMPATE')  
        } else if (ataqueJugador[index] === 'FUEGO🔥' && ataqueEnemigo[index] === 'TIERRA🪴') {
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'AGUA💧' && ataqueEnemigo[index] === 'FUEGO🔥') {
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'TIERRA🪴' && ataqueEnemigo[index] === 'AGUA💧') {
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje('PERDISTE')
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    } 
    
   /*  if(ataqueJugador == ataqueEnemigo) {
        crearMensaje('EMPATE')
    } else if (ataqueJugador == 'FUEGO🔥' && ataqueEnemigo == 'TIERRA🪴') {
        crearMensaje('GANASTE')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'AGUA💧' && ataqueEnemigo == 'FUEGO🔥') {
        crearMensaje('GANASTE')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'TIERRA🪴' && ataqueEnemigo == 'AGUA💧') {
        crearMensaje('GANASTE')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje('PERDISTE')   
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador 
    }  */  
    revisarVictorias() 
}

function revisarVictorias(){
    if(victoriasEnemigo == victoriasJugador) {
        crearMensajeFinal('EMPATARON LA BATALLA, VUELVE A INTENTAR LA VICTORIA')
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('FELICIDADES GANASTE LA BATALLA')
    } else {
        crearMensajeFinal('Lo siento, PERDISTE LA BATALLA')
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    
     /*    if(resultadoFinal == 'FELICIDADES GANASTE LA BATALLA') {
        let sectionMensajes = document.getElementById('mensajes')
        let mensajeGanador = document.createElement('p')
        mensajeGanador.innerHTML = ' SIGUE DERROTANDO AL ENEMIGO, CONQUISTA EL MUNDO'
        sectionMensajes.appendChild(mensajeGanador)
    } else if(resultadoFinal == 'Lo siento, PERDISTE LA BATALLA') {
        let sectionMensajes = document.getElementById('mensajes')
        let mensajePerdedor = document.createElement('p')
        mensajePerdedor.innerHTML = ' NO ERES APTO PARA LA GUERRA'
        sectionMensajes.appendChild(mensajePerdedor)    
    } */
    sectionReiniciar.style.display = 'block'
}
function reiniciarJuego() {
    location.reload()
}
function aleatorio(min,max) {
    return Math.floor(Math.random() * (max - min + 1 ) + min)
}

function pintarCanvas() {
        paisJugadorObjeto.x = paisJugadorObjeto.x + paisJugadorObjeto.velocidadX
        paisJugadorObjeto.y = paisJugadorObjeto.y + paisJugadorObjeto.velocidadY 
        lienzo.clearRect(0, 0, mapa.width, mapa.height)
        lienzo.drawImage(
            mapBackGround,
            0,
            0,
            mapa.width,
            mapa.height,
        )
        enviarPosicion (paisJugadorObjeto.x, paisJugadorObjeto.y)

        paisesEnemigos.forEach(function (pais) {
            pais.pintarPais()
            revisarColision(pais)

        })
        paisJugadorObjeto.pintarPais()

}

function enviarPosicion(x, y) {
    fetch(`http://192.168.1.54:8080/pais/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    paisesEnemigos = enemigos.map(function (enemigo) {
                        let paisEnemigo = null
                        const paisNombre = enemigo.pais.nombre || ""                   
                        if (paisNombre === "Rusia") {
                            paisEnemigo = new Pais('Rusia', './Assest/rusia.png', 5, 'Potencia', './Assest/soldadoRusia.png', enemigo.id)
                        } else if (paisNombre === "Ucrania") {
                            paisEnemigo = new Pais('Ucrania', './Assest/ucrania1.png', 5, 'subDesarrollada', './Assest/soldadoUcrania.png', enemigo.id)
                        } else if (paisNombre === "EEUU") {
                            paisEnemigo = new Pais('EEUU', './Assest/usa.png', 5, 'Potencia', './Assest/soldadoEeuu.png', enemigo.id)
                        } else if (paisNombre === "China") {
                            paisEnemigo = new Pais('China', './Assest/China.png', 5, 'Potencia', './Assest/soldadoChina.jpg', enemigo.id)
                        } else if (paisNombre === "Venezuela") {
                            paisEnemigo = new Pais('Venezuela','./Assest/Venezuela.png', 5, 'subDesarrollada', './Assest/soldadoVenezuela.png', enemigo.id)
                        } else if (paisNombre === "ReinoUnido") {
                            paisEnemigo = new Pais('ReinoUnido', './Assest/reinoUnido.png', 5, 'Potencia', './Assest/soldadoUk.png', enemigo.id)
                        }

                        paisEnemigo.x = enemigo.x || 0
                        paisEnemigo.y = enemigo.y || 0

                        return paisEnemigo
                     })
                })
        }
    })
}

function moverDerecha() {
    paisJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    paisJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    paisJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    paisJugadorObjeto.velocidadY = - 5
}

function detenerMovimiento() {
    paisJugadorObjeto.velocidadX = 0
    paisJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;
        default:
            break;
    }
    
}

function iniciarMapa() {
    paisJugadorObjeto = obtenerMapaPais(paisJugador)
    intervalo = setInterval(pintarCanvas,50)
    
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerMapaPais () {
    for (let i = 0; i < paises.length; i++) {
        if(paisJugador === paises[i].nombre) {
            return paises[i]
        }
        
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquieraEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    const arribaPais = paisJugadorObjeto.y
    const abajoPais = paisJugadorObjeto.y + paisJugadorObjeto.alto
    const izquierdaPais = paisJugadorObjeto.x
    const derechaPais = paisJugadorObjeto.x + paisJugadorObjeto.ancho

    if (
        abajoPais < arribaEnemigo ||
        arribaPais > abajoEnemigo ||
        derechaPais < izquieraEnemigo ||
        izquierdaPais > derechaEnemigo
    ) {
        return;
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detecto una colision');

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    electionEnemy(enemigo)
}

window.addEventListener('load', iniciarJuego)