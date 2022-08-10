import { driveCarApi, engine, startCarApi, stopCarApi } from './api';
import { IPropertyCar } from './typesAndInterface';




export function startCar() {
  const startButtonsArr = Array.from(document.querySelectorAll('.start-button')) ; 
  startButtonsArr.forEach(item => {
    item.addEventListener('click', (event) => {
      if (!item.classList.contains('start-button-not-active')) {
        startCarApi(engine, +(event.currentTarget as HTMLButtonElement).id)
          .then((value) => {
            item.classList.add('start-button-not-active');
            item.nextElementSibling!.classList.remove('stop-button-not-active');
            driveCarApi(engine, value.id, value.data);
          });
      }
    });
  });
}


export function animateCar(propertyCar: IPropertyCar, id: number) {
  const carArr = Array.from(document.querySelectorAll('.car')) ;
  const car = carArr.find(item => +item.id === id) as SVGAElement;
  const time = propertyCar.distance / propertyCar.velocity;
  car.style.animation = `${time}ms backwheel linear forwards`;
  return car;
}


export function animateStopCar(id: number) {
  const carArr = Array.from(document.querySelectorAll('.car'));
  const car = carArr.find(item => +item.id === id) as SVGAElement;
  const stopButtonsArr = Array.from(document.querySelectorAll('.stop-button')) ; 
  stopButtonsArr.forEach(item => {
    item.addEventListener('click', (event) => {
      if (item.id === car.id && !item.classList.contains('stop-button-not-active')) {
        stopCarApi(engine, +(event.currentTarget as HTMLButtonElement).id)
          .then(() => {
            car.style.animation = '0.1s stopCar';
          })
          .then(() => {
            item.classList.add('stop-button-not-active');
            item.previousElementSibling!.classList.remove('start-button-not-active');
          });
      }
    });
  });
    
}

