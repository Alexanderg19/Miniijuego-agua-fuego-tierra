const express = require("express")
const cors = require("cors")
const app = express()

http://LAPTOP-0GI28PUN.local:8080

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarPais(pais) {
        this.pais = pais
    }

    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques) {
        this.ataques = ataques
    }
}

class Pais {
    constructor(nombre) {
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)
    
    res.setHeader("Access-Control-Allow-Origin" , "*")

    res.send(id)
})

app.post("/pais/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.pais || ""
    const pais = new Pais(nombre)

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarPais(pais)
    }

    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/pais/:jugadorId/posicion", (req, res)  => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

app.post("/pais/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }

    res.end()
})

app.get("/pais/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)  
    res.send({
        ataques: jugador.ataques || []
    })  
})

app.listen(8080, () => {
    console.log('servidor funcionando')
})