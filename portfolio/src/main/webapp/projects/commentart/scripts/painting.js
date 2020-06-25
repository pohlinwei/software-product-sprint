/** Paints to be used for painting. */
const paints = [];

/** 
 * Paints the art using `newPaints`. 
 */
const paintArt = (newPaints) => {
  const painting = document.getElementById('painting');
  paints.push(...newPaints);

  let paintIndex = 0;
  setInterval(() => {
    if (paints.length === 0) {
      return;
    }

    painting.style.backgroundColor = paints[paintIndex];
    paintIndex = (paintIndex + 1) % paints.length;
  }, 2000);
}

/** 
 * Updates painting. 
 * @param {Array<string>} newPaints The array of new paints that is to be used.
 */
const updatePainting = (newPaints) => {
  paints.length = 0;
  paints.push(...newPaints);
}
