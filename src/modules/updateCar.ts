import { addCarApi, garage, showCars } from './api';
import { createCarElement } from './createCarElement';

const updateNewCarButton = document.querySelector('.update-car-button') as HTMLButtonElement;
const updateCarNameInput = document.querySelector('.update-car-name') as HTMLInputElement;
const updateCarColorInput = document.querySelector('.update-car-color') as HTMLInputElement;



export function updateNewCar() {
  updateNewCarButton.addEventListener('click', (event) => {
    console.log(updateCarNameInput.value, updateCarColorInput.value);
    // addCarApi(garage, {
    //     name: updateCarNameInput.value,
    //     color: updateCarColorInput.value
    // }).then((value) => {
    //     createCarElement(value)
    // }).then(() => showCars(garage))

  });
}