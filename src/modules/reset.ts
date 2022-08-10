import { stopCarApi, engine } from './api';
import { raceButton } from './race';
import { nextPageButton, prevPageButton } from './changePages';

export const resetButton = document.querySelector('.reset') as HTMLButtonElement;

export function reset() {
  resetButton.addEventListener('click', (event) => {
    raceButton.classList.remove('race-not-active');
    if (!resetButton.classList.contains('reset-not-active')) {
      const garageList = document.querySelector('.garage-list') as HTMLDivElement;
      const pageNumber = +garageList.id.split('_').at(-1)!;
      resetButton.classList.add('reset-not-active');
      nextPageButton.classList.remove('next-page-button-not-active');
      pageNumber !== 1 ? prevPageButton.classList.remove('prev-page-button-not-active') : null;
      const startButtonArr = Array.from(document.querySelectorAll('.start-button')) ;
      const stopButtonArr = Array.from(document.querySelectorAll('.stop-button')) ;
      const selecttButtonArr = Array.from(document.querySelectorAll('.select-button')) ;
      const removeButtonArr = Array.from(document.querySelectorAll('.remove-button')) ;

  
      for (const key in Array.from(garageList.children)) {
        Array.from((garageList.children)[key].children).forEach(elem => {
          if (elem.tagName === 'svg') {
            stopCarApi(engine, +elem.id).then((value) => {
              (elem as SVGAElement).style.animation = '0.1s stopCar';
              
              startButtonArr.forEach(item => {
                value.id === +item.id ? item.classList.remove('start-button-not-active') : null;
              });
              stopButtonArr.forEach(item => {
                value.id === +item.id ? item.classList.add('stop-button-not-active') : null;
              });
              selecttButtonArr.forEach(item => {
                value.id === +item.id ? item.classList.remove('select-not-active') : null;
              });
              removeButtonArr.forEach(item => {
                value.id === +item.id ? item.classList.remove('reset-not-active') : null;
              });
            });
          }
        });
      }
    }
  });
}

