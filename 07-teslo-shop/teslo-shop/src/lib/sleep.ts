
// Realiza una pausa de la ejecución donde es llamada del tiempo indicado
export const sleep = (ms: number = 1000) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};