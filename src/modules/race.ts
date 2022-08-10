import { IPropertyCar, IWinners } from './typesAndInterface';
import { driveCarApi, startCarApi, engine, getWinner, winners, showCar, garage } from './api';
import { createTableRow, changeTableRow } from './createHtmlElements';
import { resetButton } from './reset';
import { nextPageButton, prevPageButton } from './changePages';

const popap = document.querySelector('.popap') as HTMLDivElement;
const popapCarName = document.querySelector('.popap-car-name') as HTMLDivElement;
const popapCarTime = document.querySelector('.popap-car-time') as HTMLDivElement;


export const raceButton = document.querySelector('.race') as HTMLButtonElement;

export async function race() {
  raceButton.addEventListener('click', (event) => {
    if (!raceButton.classList.contains('race-not-active')) {
      nextPageButton.classList.add('next-page-button-not-active');
      prevPageButton.classList.add('prev-page-button-not-active');
      raceButton.classList.add('race-not-active');
      const startButtonArr = Array.from(document.querySelectorAll('.start-button')) ;
      const stopButtonArr = Array.from(document.querySelectorAll('.stop-button')) ;
      const selecttButtonArr = Array.from(document.querySelectorAll('.select-button')) ;
      const removeButtonArr = Array.from(document.querySelectorAll('.remove-button')) ;
      const garageList = document.querySelector('.garage-list') as HTMLDivElement;
      const promiseArr: Promise<{
        id: number;
        propertyCar: IPropertyCar;
      }>[] = [];
      for (const key in Array.from(garageList.children)) {
        Array.from((garageList.children)[key].children).forEach(elem => {
          if (elem.tagName === 'svg') {
            const result = startCarApi(engine, +elem.id)
              .then(value => {
                startButtonArr.forEach(item => {
                  value.id === +item.id ? item.classList.add('start-button-not-active') : null;
                });
                stopButtonArr.forEach(item => {
                  value.id === +item.id ? item.classList.add('stop-button-not-active') : null;
                });
                selecttButtonArr.forEach(item => {
                  value.id === +item.id ? item.classList.add('select-not-active') : null;
                });
                removeButtonArr.forEach(item => {
                  value.id === +item.id ? item.classList.add('reset-not-active') : null;
                });

                return value;
              })
              .then(
                (value) => driveCarApi(engine, value.id, value.data),
              );
            promiseArr.push(result);
          }
        });
      }
      Promise.any(promiseArr)
        .then(value => getWinner(winners, value.id, +(value.propertyCar.distance / value.propertyCar.velocity / 1000).toFixed(2)))
        .then(value => showCar(garage, value))
        .then(async value => {
          if (value.property.firstWin) {
            createTableRow(value.car, (await value.property.f.then(value => value)).valueOf());
          } else {
            changeTableRow(value.car, (await value.property.f.then(value => value)).valueOf());
          }
          return value;
        }).then( async value => {
          popap.classList.add('popap-active');
          popapCarName.textContent = `${value.car.name} Win!`;
          popapCarTime.textContent = `${String(((await value.property.f.then(value => value).valueOf()) as IWinners).time)} s.`;
          setTimeout(() => popap.classList.remove('popap-active'), 3000);
        })
        .then(() => resetButton.classList.remove('reset-not-active'));
    }
  });
}
