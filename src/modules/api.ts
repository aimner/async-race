import { animateCar, animateStopCar } from './driveCar';
import { reset } from './reset';
import { ICar, IPropertyCar, IWinners, IWinnersNew } from './typesAndInterface';

const url = 'http://127.0.0.1:3000';

export const garage = `${url}/garage`;
export const engine = `${url}/engine`;
export const winners = `${url}/winners`;

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
  // console.log(data);
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

export const driveCarApi = async (
  url: string,
  id: number,
  propertyCar: IPropertyCar,
) => {
  const car = animateCar(propertyCar, id);
  animateStopCar(id);
  const result = await fetch(`${url}?id=${id}&status=drive`, {
    method: 'PATCH',
  });
  if (result.status !== 200) {
    console.log('BREAK ENGINE');
    car.style.animationPlayState = 'paused';
  }
  const data = await result.json();
  return { id, propertyCar };
};

export const getWinner = async (url: string, id: number, time: number) => {
  const result = await fetch(`${url}/${id}`, {
    method: 'GET',
  });
  const data = await result.json();
  // console.log(data)
  if (result.status === 404) {
    console.log('CAR not found');
    createWinnerFirst(winners, id, time, 1);
  } else {
    console.log(data);
    updateWinner(url, time, data);
  }
  // return { id, data };
};

export const createWinnerFirst = async (
  url: string,
  id: number,
  time: number,
  wins: number,
) => {
  const car = {
    id,
    wins,
    time,
  };

  const result = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const data = await result.json();
  // console.log(data)
};

export const updateWinner = async (
  url: string,
  time: number,
  value: IWinners,
) => {
  let car: IWinnersNew;
  if (value.time > time) {
    car = {
      // id: value.id,
      wins: value.wins + 1,
      time,
    };
  } else {
    car = {
      // id: value.id,
      wins: value.wins + 1,
      time: value.time,
    };
  }

  const result = await fetch(`${url}/${value.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const data = await result.json();
  console.log('CARS UPDATE');
};
