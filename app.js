new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos = [];
        },
        atacar: function () {
            danio = this.getRandomInt(this.rangoAtaque[0], this.rangoAtaque[1]);

            this.saludMonstruo -= danio;
            this.logEventos(true, danio);

            if(this.verificarGanador()) {
                return 0;
            }
            else {
                this.ataqueDelMonstruo();
            }

            return danio;
        },

        ataqueEspecial: function () {
            danio = this.getRandomInt(this.rangoAtaqueEspecial[0], this.rangoAtaqueEspecial[1]);

            this.saludMonstruo -= danio;
            this.logEventos(true, danio);

            if(this.verificarGanador()) {
                return 0;
            }
            else {
                this.ataqueDelMonstruo();
            }

            return danio;
        },

        curar: function () {
            this.saludJugador <= 90? this.saludJugador += 10 : this.saludJugador = 100;

            this.ataqueDelMonstruo();
        },

        /*registrarEvento(evento) {
        },*/
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false;
        },

        ataqueDelMonstruo: function () {
            danio = this.getRandomInt(this.rangoAtaqueDelMonstruo[0], this.rangoAtaqueDelMonstruo[1]);
            this.saludJugador -= danio;
            this.logEventos(false, danio);
            this.verificarGanador()
            return danio;

        },

        /*calcularHeridas: function (rango) {
            return 0

        },*/
        verificarGanador: function () {
            if(this.saludMonstruo <= 0){
                console.log("Ganaste!");
                confirm("Ganaste! Jugar de nuevo?")? this.empezarPartida() : this.hayUnaPartidaEnJuego = false;
                return true;
            }
            else if(this.saludJugador <= 0){
                console.log("Perdiste!");
                confirm("Perdiste! Jugar de nuevo?")? this.empezarPartida() : this.hayUnaPartidaEnJuego = false;
                return true;
            }
            
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        },
        logEventos(esJugador, danio){
            if(esJugador){
                this.turnos.unshift({esJugador: true, text: "El jugador golpea al monstruo por "+danio+" puntos."});
            }
            else{
                this.turnos.unshift({esJugador: false, text: "El monstruo golpea al jugador por "+danio+" puntos."});
            }
        }
    }
});