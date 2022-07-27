import './style/style.scss';

import { showCars, garage } from './modules/api';
import { createCarsElement } from './modules/createCarElement';
import { updateNewCar } from './modules/updateCar';
import { addNewCar } from './modules/addNewCar';




// showCars(garage)

createCarsElement();
updateNewCar();
addNewCar();