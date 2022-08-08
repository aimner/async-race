import { driveCarApi, startCarApi, engine } from './api';

const raceButton = document.querySelector('.race') as HTMLButtonElement;

export function race() {
  raceButton.addEventListener('click', (event) => {
    const garageList = document.querySelector('.garage-list') as HTMLDivElement

    for(let key in Array.from(garageList.children)) {
      Array.from((garageList.children)[key].children).forEach(elem => {
         if(elem.tagName === 'svg') {
          startCarApi(engine, +elem.id).then(
            (value) => driveCarApi(engine, value.id, value.data),
          );
         }
      })
    }

  });
}
