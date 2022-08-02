import { ICar } from './typesAndInterface';

const url = 'http://127.0.0.1:3000';

export const garage = `${url}/garage`;
export const engine = `${url}/engine`;
export const winners = `${url}/winners`;

// const obj: ICar = {
//   name: 'BMW',
//   color: 'RED',
// };


export const addCarApi = async (url: string, car: ICar) => {
  const result = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const data = await result.json();
    // console.log(data);
  return data;
};

// showText(garage, obj)

export const deleteCar = async (url: string, id: number) => {
  const result = await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });
  const data = await result.json();
  console.log(data);
};

// deleteText(garage)

export const showCars = async (url: string) => {
  const result = await fetch(`${url}`, {
    method: 'GET',
  });
  const data = await result.json();
  console.log(data);
  return data;
};

//   showCars(garage);

const showCar = async (url: string, id = 1) => {
  const result = await fetch(`${url}/${id}`, {
    method: 'GET',
  });
  const data = await result.json();
  console.log(data);
};
  //   showCar(garage, 3)
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
  return data
};
//   updateCar(garage, obj, 1)

