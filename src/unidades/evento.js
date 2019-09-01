const nombreEvento = {};
const presionar = (o) => {
    const keys = Object.keys(nombreEvento);
    keys.forEach(i => {
        clearTimeout(nombreEvento[i]);
        nombreEvento[i] = null;
    });
    if(!o.callback) return;
    const limpiar = () => { clearTimeout(nombreEvento[o.key]); }
    o.callback(limpiar);
    if(o.unaVez === true) return;
    let inicia = o.inicia || 100;
    const intervalo = o.intervalo || 50;
    const iteracion = () => {
        nombreEvento[o.key] = setTimeout(() => {
            inicia = null;
            iteracion();
            o.callback(limpiar);
        }, inicia || intervalo);
    };
    iteracion();
};
const soltar = (o) => {
    clearTimeout(nombreEvento[o.key]);
    nombreEvento[o.key] = null;
    if(!o.callback) return;
    o.callback();
};
const limpiarTodo = () => {
    const keys = Object.keys(nombreEvento);
    keys.forEach(i => {
        clearTimeout(nombreEvento[i]);
        nombreEvento[i] = null;
    });
};
export default { soltar, presionar, limpiarTodo };