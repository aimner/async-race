import { showCars, garage } from './api';
import { removeCar } from './removeCar';
import { svg } from './svg';
import { IUpdateCar } from './typesAndInterface';
import { findSelectCar } from './updateCar';


const garageList = document.querySelector('.garage-list') as HTMLDivElement;

export function createCarsElement() {
  showCars(garage).then(value => {
    for (const key of value) {
      const elem = document.createElement('div'); 
      elem.innerHTML = svg(key.color, key.name, key.id);
      elem.classList.add('car-element');
      garageList.append(elem);
    }
    findSelectCar();
    removeCar();
  });
}


export function createCarElement(car: IUpdateCar) {
  const elem = document.createElement('div'); 
  elem.innerHTML = svg(car.color, car.name, car.id);
  elem.classList.add('car-element');
  garageList.append(elem);
  findSelectCar();
  removeCar();
}

