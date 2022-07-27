import { showCars, garage } from './api';
import { svg } from './svg';
import { ICar } from './types';


const garageList = document.querySelector('.garage-list') as HTMLDivElement;

export function createCarsElement() {
  showCars(garage).then(value => {
    for (const key of value) {
      const elem = document.createElement('div'); 
      elem.innerHTML = svg(key.color, key.name);
      elem.classList.add('car-element');
      garageList.append(elem);
    }
  });
}


export function createCarElement(car: ICar) {
  const elem = document.createElement('div'); 
  elem.innerHTML = svg(car.color, car.name);
  elem.classList.add('car-element');
  garageList.append(elem);
}

