import { addCarApi, garage, showCars } from './api';
import { createCarElement } from './createCarElement';

const addNewCarButton = document.querySelector('.add-car-button') as HTMLButtonElement;
const newcarNameInput = document.querySelector('.new-car-name') as HTMLInputElement;
const newCarColorInput = document.querySelector('.new-car-color') as HTMLInputElement;



export function addNewCar() {
  addNewCarButton.addEventListener('click', (event) => {
    addCarApi(garage, {
      name: newcarNameInput.value,
      color: newCarColorInput.value,
    }).then((value) => {
      createCarElement(value);
    }).then(() => showCars(garage));

  });
}