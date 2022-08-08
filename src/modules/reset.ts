import { stopCarApi, engine } from './api';

const resetButton = document.querySelector('.reset') as HTMLButtonElement;

export function reset() {
  resetButton.addEventListener('click', (event) => {

    const garageList = document.querySelector('.garage-list') as HTMLDivElement

    for(let key in Array.from(garageList.children)) {
      Array.from((garageList.children)[key].children).forEach(elem => {
         if(elem.tagName === 'svg') {
          stopCarApi(engine, +elem.id).then(() => {
            (elem as SVGAElement).style.animation = '0.1s stopCar';
          });
         }
      })
    }
  });
}
