import { driveCarApi, startCarApi, engine, getWinner, winners } from './api';




const raceButton = document.querySelector('.race') as HTMLButtonElement;

export async function race() {
  raceButton.addEventListener('click', (event) => {
    const garageList = document.querySelector('.garage-list') as HTMLDivElement;
    const promiseArr: any[] = [];
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
    Promise.any(promiseArr).then(value => getWinner(winners, value.id, +(value.propertyCar.distance / value.propertyCar.velocity / 1000).toFixed(2)));

  });
}
// export function race() {
//   raceButton.addEventListener('click', (event) => {
//     const garageList = document.querySelector('.garage-list') as HTMLDivElement

//     for(let key in Array.from(garageList.children)) {
//       Array.from((garageList.children)[key].children).forEach(elem => {
//          if(elem.tagName === 'svg') {
//           startCarApi(engine, +elem.id).then(
//             (value) => driveCarApi(engine, value.id, value.data),
//           );
//          }
//       })
//     }

//   });
// }
