import { driveCarApi, engine, startCarApi, stopCarApi, controller } from './api';
import { IPropertyCar } from './typesAndInterface';




export function startCar() {
  const startButtonsArr = Array.from(document.querySelectorAll('.start-button')); 
  startButtonsArr.forEach(item => {
    item.addEventListener('click', (event) => {
      startCarApi(engine, +(event.currentTarget as HTMLButtonElement).id)
        .then((value) => driveCarApi(engine, value.id, value.data));
    });
  });
}


export function animateCar(propertyCar: IPropertyCar, id: number) {
  // const road = document.querySelector('.road') as HTMLDivElement;
  const carArr = Array.from(document.querySelectorAll('.car')) ;
  const car = carArr.find(item => +item.id === id) as SVGAElement;
  const time = propertyCar.distance / propertyCar.velocity;
  // let coord = 0;
  // const speed = (road.offsetWidth - 100) / (time / 16);
  car.style.animation = `${time}ms backwheel linear forwards`;
  // const timeRunCar = setInterval(() => {
  //   coord += speed;
  //   car.style.marginLeft = `${coord}px`;
  //   time = time - 16;
  //   if (time < 0) clearInterval(timeRunCar);
  // }, 16);
  // return timeRunCar;
  return car;
}


export function animateStopCar(cont: AbortController, id: number) {
  const carArr = Array.from(document.querySelectorAll('.car')) ;
  const car = carArr.find(item => +item.id === id) as SVGAElement;
  const stopButtonsArr = Array.from(document.querySelectorAll('.stop-button')); 
  stopButtonsArr.forEach(item => {
    item.addEventListener('click', (event) => {
      console.log(123);
      if ((event.target as HTMLButtonElement).id === car.id) {
        // clearInterval(idInterval)
        stopCarApi(engine, +(event.currentTarget as HTMLButtonElement).id)
          .then(() => {
            car.style.animation = '0.1s stopCar';
          });
      }
    });
  });
    
}