export interface ICar {
  name: string,
  color: string
}


export interface IUpdateCar {
  name: string,
  color: string,
  id: string
}

export interface IPropertyCar {
  velocity: number,
  distance: number
}

export interface IWinners {
  id: number,
  time: number,
  wins: number
}

export interface IWinnersNew {
  time: number,
  wins: number
}