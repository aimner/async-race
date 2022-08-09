import { IPropertyCar } from './typesAndInterface';
import { driveCarApi, startCarApi, engine, getWinner, winners, showCar, garage } from './api';
import { createTableRow, changeTableRow } from './createHtmlElements';




const raceButton = document.querySelector('.race') as HTMLButtonElement;

export async function race() {
  raceButton.addEventListener('click', (event) => {
    const garageList = document.querySelector('.garage-list') as HTMLDivElement;
    const promiseArr: Promise<{
      id: number;
      propertyCar: IPropertyCar;
    }>[] = [];
    for (const key in Array.from(garageList.children)) {
      Array.from((garageList.children)[key].children).forEach(elem => {
        if (elem.tagName === 'svg') {

          const result = startCarApi(engine, +elem.id).then(
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
          console.log('CREATE');
          return createTableRow(value.car, (await value.property.f.then(value => value)).valueOf());
        } else {
          console.log('UPDATE');
          return changeTableRow(value.car, (await value.property.f.then(value => value)).valueOf());
        }
      });

  });
}
