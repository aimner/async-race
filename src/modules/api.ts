import { animateCar, animateStopCar } from './driveCar';
import {
  ICar,
  IPropertyCar,
  IWinners,
  IWinnersNew,
  IUpdateCar,
  IUpdateWinner,
} from './typesAndInterface';

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
};

export const showCars = async (url: string) => {
  const result = await fetch(`${url}`, {
    method: 'GET',
  });
  const data = await result.json();
  return data;
};

export const showCarsWinners = async (url: string, property: IWinners[]) => {
  const result = await fetch(`${url}`, {
    method: 'GET',
  });
  const car: IUpdateCar[] = await result.json();
  const carsArr: IUpdateCar[] = [];
  for (let i = 0; i < property.length; i++) {
    for (let j = 0; j < car.length; j++) {
      property[i].id === +car[j].id ? carsArr.push(car[j]) : null;
    }
  }
  return { property, carsArr };
};

export const showCar = async (url: string, property: IUpdateWinner) => {
  const id = (await property.f.then((value) => +value.id)).valueOf();
  const result = await fetch(`${url}/${id}`, {
    method: 'GET',
  });
  const car: IUpdateCar = await result.json();
  return { car, property };
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
  return data;
};

export const startCarApi = async (url: string, id: number) => {
  const result = await fetch(`${url}?id=${id}&status=started`, {
    method: 'PATCH',
  });
  const data = await result.json();
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

  let firstWin = true;
  if (result.status === 404) {
    const obj = {
      f: createWinnerFirst(winners, id, time, 1),
      firstWin,
    };
    return obj;
  } else {
    firstWin = false;
    const obj = {
      f: updateWinner(url, time, data),
      firstWin,
    };
    return obj;
  }
};

export const getWinners = async (url: string) => {
  const result = await fetch(`${url}`, {
    method: 'GET',
  });
  const data = await result.json();
  return data;
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
  return data;
};

export const updateWinner = async (
  url: string,
  time: number,
  value: IWinners,
) => {
  let car: IWinnersNew;
  if (value.time > time) {
    car = {
      wins: value.wins + 1,
      time,
    };
  } else {
    car = {
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
  return data;
};

export const deleteWinner = async (url: string, id: number) => {
  const result = await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });
};
