import './style/style.scss';

import { createCarsElement } from './modules/createCarElement';
import { updateNewCar } from './modules/updateCar';
import { addNewCar } from './modules/addNewCar';
import { race } from './modules/race';
import { reset } from './modules/reset';
import { generate } from './modules/generate';
import { changePages, changeWinnersAndGarageBlock, renderTableElement } from './modules/changePages';







createCarsElement();
updateNewCar();
addNewCar();
race();
reset();
generate();
changePages();
changeWinnersAndGarageBlock();


// alert('День добрый:) Не доделал ещё победителей и стили, если не затруднит, проверьте работу чуть позже. Заранее спасибо');
