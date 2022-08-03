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
  const road = document.querySelector('.road') as HTMLDivElement;
  const carArr = Array.from(document.querySelectorAll('.car')) ;
  const car = carArr.find(item => +item.id === id) as SVGAElement;
  let time = propertyCar.distance / propertyCar.velocity;
  let coord = 0;
  const speed = (road.offsetWidth - 100) / (time / 16);
  const timeRunCar = setInterval(() => {
    coord += speed;
    car.style.marginLeft = `${coord}px`;
    time = time - 16;
    if (time < 0) clearInterval(timeRunCar);
  }, 16);
  return timeRunCar;
}


export function animateStopCar(cont: AbortController, idInterval: NodeJS.Timer, id: number) {
    const carArr = Array.from(document.querySelectorAll('.car')) ;
    const car = carArr.find(item => +item.id === id) as SVGAElement;
    const stopButtonsArr = Array.from(document.querySelectorAll('.stop-button')); 
    console.log(car)
    stopButtonsArr.forEach(item => {
        item.addEventListener('click', (event) => {
            cont.abort()
            clearInterval(idInterval)

            stopCarApi(engine, +(event.currentTarget as HTMLButtonElement).id)
            .then(() => car.style.marginLeft = `0px`);
        });
      });
    
}