import { showCars, garage } from './api';
import { startCar } from './driveCar';
import { removeCar } from './removeCar';
import { svg } from './createHtmlElements';
import { IUpdateCar } from './typesAndInterface';
import { findSelectCar } from './updateCar';
import { renderTableElement } from './changePages';


export const garageBlock = document.querySelector('.garage') as HTMLDivElement;

export function createCarsElement() {
  showCars(garage).then(value => {
    for (const key of value) {
      const elem = document.createElement('div'); 
      elem.innerHTML = svg(key.color, key.name, key.id);
      elem.classList.add('car-element');
      const cars = document.querySelectorAll('.car');
      if (cars.length % 7 === 0 && cars.length !== 0) {
        // console.log(cars.length);
        const garageList = document.createElement('div'); 
        garageList.setAttribute('id', `page_${cars.length / 7 + 1}`);
        garageList.classList.add('garage-list-not-active');
        garageBlock.append(garageList);
      }
      (garageBlock.lastElementChild as HTMLDivElement).append(elem);
    }
    findSelectCar();
    removeCar();
    startCar();
 
    
  }).then(() => renderTableElement());
}


export function createCarElement(car: IUpdateCar) {

  const elem = document.createElement('div'); 
  elem.innerHTML = svg(car.color, car.name, car.id);
  elem.classList.add('car-element');
  const cars = document.querySelectorAll('.car');

  if (cars.length % 7 === 0) {
    const garageList = document.createElement('div'); 
    garageList.setAttribute('id', `page_${cars.length / 7 + 1}`);
    garageList.classList.add('garage-list-not-active');
    garageBlock.append(garageList);
  }
  
  (garageBlock.lastElementChild as HTMLDivElement).append(elem);
  findSelectCar();
  removeCar();
  startCar();
}

