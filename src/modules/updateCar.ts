import { IUpdateCar } from './typesAndInterface';
import { updateCar, garage } from './api';
import { svg } from './svg';

const updateNewCarButton = document.querySelector('.update-car-button') as HTMLButtonElement;
const updateCarNameInput = document.querySelector('.update-car-name') as HTMLInputElement;
const updateCarColorInput = document.querySelector('.update-car-color') as HTMLInputElement;



export function updateNewCar() {
  updateNewCarButton.addEventListener('click', (event) => {
    let selectedButtonsArr = Array.from(document.querySelectorAll('.select-button')) as HTMLButtonElement[];
    let button = selectedButtonsArr.find(item => item.classList.contains('select-button-active')) as HTMLButtonElement
    updateCar(garage, {
          name: updateCarNameInput.value,
          color: updateCarColorInput.value
      }, +((button as HTMLButtonElement).id))
      .then((value) => updateCarColorAndText(button, value))
  });
}


export function findSelectCar() {
  let selectedButtonsArr = Array.from(document.querySelectorAll('.select-button')) as HTMLButtonElement[]
  selectedButtonsArr.forEach(item => {
    item.addEventListener('click', (event) => {
      selectedButtonsArr.forEach(elem => {
        elem.classList.remove('select-button-active')
      })
      item.classList.add('select-button-active')
    })
  })
}


function updateCarColorAndText(button: HTMLButtonElement, value: IUpdateCar) {
         (button.parentElement as HTMLDivElement).innerHTML = svg(value.color, value.name, value.id)
}


