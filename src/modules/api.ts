import { animateCar, animateStopCar } from './driveCar';
import { ICar, IPropertyCar } from './typesAndInterface';

const url = 'http://127.0.0.1:3000';

export const garage = `${url}/garage`;
export const engine = `${url}/engine`;
export const winners = `${url}/winners`;

export const controller = new AbortController();

export const addCarApi = async (url: string, car: ICar) => {
  const result = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const data = await result.json();

  return data;
};



export const deleteCar = async (url: string, id: number) => {
  const result = await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });
  const data = await result.json();
  console.log(data);
};



export const showCars = async (url: string) => {
  const result = await fetch(`${url}`, {
    method: 'GET',
  });
  const data = await result.json();
  console.log(data);
  return data;
};



const showCar = async (url: string, id = 1) => {
  const result = await fetch(`${url}/${id}`, {
    method: 'GET',
  });
  const data = await result.json();
  console.log(data);
};


export const updateCar = async (url: string, car: ICar, id: number) => {
  const result = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const data = await result.json();
  console.log(data);
  return data;
};


export const startCarApi = async (url: string, id: number) => {
  const result = await fetch(`${url}?id=${id}&status=started`, {
    method: 'PATCH',
  });
  const data = await result.json();
  console.log(data);
  return { id, data };
};

export const stopCarApi = async (url: string, id: number) => {
  const result = await fetch(`${url}?id=${id}&status=stopped`, {
    method: 'PATCH',
  });
  const data = await result.json();
  
  return { id, data };
};


export const driveCarApi = async (url: string, id: number, propertyCar: IPropertyCar) => {


  const idInterval = animateCar(propertyCar, id);
  animateStopCar(controller, idInterval, id)
  const result = await fetch(`${url}?id=${id}&status=drive`, {
    method: 'PATCH',
    signal: controller.signal
  });
  if (result.status === 200) {
    console.log('Finish');
  } else {
    console.log('BREAK ENGINE');
    clearInterval(idInterval);
  }
  const data = await result.json();

  console.log(data);
};
