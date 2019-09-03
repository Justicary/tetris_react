import almacen from '../almacen';

// Uso Web Audio API
const AudioContext = (
    window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.oAudioContext ||
    window.msAudioContext
);
export const tenemosWebAudioAPI = { datos: !!AudioContext && window.location.protocol.indexOf('http') !== -1 };
export const musica = {};
// Método sin nombre... será un método default??
(() => {
    if(!tenemosWebAudioAPI.datos) return;
    const url = __dirname + '/musica.mp3';
    const contexto = new AudioContext();
    const requiero = new XMLHttpRequest();
    requiero.open('GET', url, true);
    requiero.responseType = 'arraybuffer';
    requiero.onload = () => {
        contexto.decodeAudioData(requiero.response, (buf) => {
            const getFuente = () => {
                const fuente = contexto.createBufferSource();
                fuente.buffer = buf;
                fuente.connect(contexto.destination);
                return fuente;
            };
            musica.inicializa = () => { musica.iniciar = () => {} };
            musica.iniciar = () => {
                musica.inicializa();
                if(!almacen.getState().get('musica')) return;
                getFuente().start(0, 3.7202, 3.6224); // Propiedades del sonido
            };
            musica.despejado = () => {
                if(!almacen.getState().get('musica')) return;
                getFuente().start(0, 0, 0.7675); // Propiedades del sonido
            };
            musica.soltar = () => {
                if(!almacen.getState().get('musica')) return;
                getFuente().start(0, 1.2558, 0.3546); // Propiedades del sonido                
            };
            musica.perdiste = () => {
                if(!almacen.getState().get('musica')) return;
                getFuente().start(0, 8.1276, 1.1437); // Propiedades del sonido                
            };
            musica.rotar = () => {
                if(!almacen.getState().get('musica')) return;
                getFuente().start(0, 2.2471, 0.0807); // Propiedades del sonido                
            };
            musica.mover = () => {
                if(!almacen.getState().get('musica')) return;
                getFuente().start(0, 2.9088, 0.1437); // Propiedades del sonido                
            };
        },(error) => {
            if(window.console && window.console.error) {
                window.console.error(`URL: ${url} ERROR: `, error);
                tenemosWebAudioAPI.datos = false;
            };
        });
    };
    requiero.send();
})();