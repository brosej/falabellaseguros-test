const matrizPrueba = [
  [2, 5, 7],
  [3, 4, 5],
  [4, 1, 3]
];

const obtenerSumaMaxima2x2 = (matriz) => {
  let sumaMaxima = 0;

  // le restamos 1 al length de la matriz y al de cada arreglo para iterar en cuadros 2x2
  for (let i = 0; i < matriz.length - 1; i++) {
    for (let j = 0; j < matriz[i].length - 1; j++) {

      const sumaCuadro =
        matriz[i][j] + matriz[i][j + 1] +
        matriz[i + 1][j] + matriz[i + 1][j + 1];

      // asignamos a la variable la suma máxima encontrada
      if (sumaCuadro > sumaMaxima) {
        sumaMaxima = sumaCuadro;
      }
    }
  }

  return sumaMaxima;
};


console.log('Resultado esperado: 21');
console.log('Resultado obtenido:', obtenerSumaMaxima2x2(matrizPrueba));