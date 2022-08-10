/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./style/style.scss":
/*!**************************!*\
  !*** ./style/style.scss ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./modules/addNewCar.ts":
/*!******************************!*\
  !*** ./modules/addNewCar.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addNewCar = void 0;
const api_1 = __webpack_require__(/*! ./api */ "./modules/api.ts");
const createCarElement_1 = __webpack_require__(/*! ./createCarElement */ "./modules/createCarElement.ts");
const addNewCarButton = document.querySelector('.add-car-button');
const newcarNameInput = document.querySelector('.new-car-name');
const newCarColorInput = document.querySelector('.new-car-color');
function addNewCar() {
    addNewCarButton.addEventListener('click', (event) => {
        (0, api_1.addCarApi)(api_1.garage, {
            name: newcarNameInput.value,
            color: newCarColorInput.value,
        }).then((value) => {
            (0, createCarElement_1.createCarElement)(value);
        }).then(() => (0, api_1.showCars)(api_1.garage));
    });
}
exports.addNewCar = addNewCar;


/***/ }),

/***/ "./modules/api.ts":
/*!************************!*\
  !*** ./modules/api.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteWinner = exports.updateWinner = exports.createWinnerFirst = exports.getWinners = exports.getWinner = exports.driveCarApi = exports.stopCarApi = exports.startCarApi = exports.updateCar = exports.showCar = exports.showCarsWinners = exports.showCars = exports.deleteCar = exports.addCarApi = exports.winners = exports.engine = exports.garage = void 0;
const driveCar_1 = __webpack_require__(/*! ./driveCar */ "./modules/driveCar.ts");
const url = 'http://127.0.0.1:3000';
exports.garage = `${url}/garage`;
exports.engine = `${url}/engine`;
exports.winners = `${url}/winners`;
const addCarApi = async (url, car) => {
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
exports.addCarApi = addCarApi;
const deleteCar = async (url, id) => {
    const result = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
    const data = await result.json();
};
exports.deleteCar = deleteCar;
const showCars = async (url) => {
    const result = await fetch(`${url}`, {
        method: 'GET',
    });
    const data = await result.json();
    return data;
};
exports.showCars = showCars;
const showCarsWinners = async (url, property) => {
    const result = await fetch(`${url}`, {
        method: 'GET',
    });
    const car = await result.json();
    const carsArr = [];
    for (let i = 0; i < property.length; i++) {
        for (let j = 0; j < car.length; j++) {
            property[i].id === +car[j].id ? carsArr.push(car[j]) : null;
        }
    }
    return { property, carsArr };
};
exports.showCarsWinners = showCarsWinners;
const showCar = async (url, property) => {
    const id = (await property.f.then((value) => +value.id)).valueOf();
    const result = await fetch(`${url}/${id}`, {
        method: 'GET',
    });
    const car = await result.json();
    return { car, property };
};
exports.showCar = showCar;
const updateCar = async (url, car, id) => {
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
exports.updateCar = updateCar;
const startCarApi = async (url, id) => {
    const result = await fetch(`${url}?id=${id}&status=started`, {
        method: 'PATCH',
    });
    const data = await result.json();
    return { id, data };
};
exports.startCarApi = startCarApi;
const stopCarApi = async (url, id) => {
    const result = await fetch(`${url}?id=${id}&status=stopped`, {
        method: 'PATCH',
    });
    const data = await result.json();
    return { id, data };
};
exports.stopCarApi = stopCarApi;
const driveCarApi = async (url, id, propertyCar) => {
    const car = (0, driveCar_1.animateCar)(propertyCar, id);
    (0, driveCar_1.animateStopCar)(id);
    const result = await fetch(`${url}?id=${id}&status=drive`, {
        method: 'PATCH',
    });
    if (result.status !== 200) {
        car.style.animationPlayState = 'paused';
    }
    const data = await result.json();
    return { id, propertyCar };
};
exports.driveCarApi = driveCarApi;
const getWinner = async (url, id, time) => {
    const result = await fetch(`${url}/${id}`, {
        method: 'GET',
    });
    const data = await result.json();
    let firstWin = true;
    if (result.status === 404) {
        const obj = {
            f: (0, exports.createWinnerFirst)(exports.winners, id, time, 1),
            firstWin,
        };
        return obj;
    }
    else {
        firstWin = false;
        const obj = {
            f: (0, exports.updateWinner)(url, time, data),
            firstWin,
        };
        return obj;
    }
};
exports.getWinner = getWinner;
const getWinners = async (url) => {
    const result = await fetch(`${url}`, {
        method: 'GET',
    });
    const data = await result.json();
    return data;
};
exports.getWinners = getWinners;
const createWinnerFirst = async (url, id, time, wins) => {
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
exports.createWinnerFirst = createWinnerFirst;
const updateWinner = async (url, time, value) => {
    let car;
    if (value.time > time) {
        car = {
            wins: value.wins + 1,
            time,
        };
    }
    else {
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
exports.updateWinner = updateWinner;
const deleteWinner = async (url, id) => {
    const result = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
};
exports.deleteWinner = deleteWinner;


/***/ }),

/***/ "./modules/changePages.ts":
/*!********************************!*\
  !*** ./modules/changePages.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderTableElement = exports.changeWinnersAndGarageBlock = exports.changePages = exports.winnersPageNumber = exports.prevPageButton = exports.nextPageButton = void 0;
const api_1 = __webpack_require__(/*! ./api */ "./modules/api.ts");
const createCarElement_1 = __webpack_require__(/*! ./createCarElement */ "./modules/createCarElement.ts");
const createHtmlElements_1 = __webpack_require__(/*! ./createHtmlElements */ "./modules/createHtmlElements.ts");
exports.nextPageButton = document.querySelector('.next-page');
exports.prevPageButton = document.querySelector('.prev-page');
const nextPageButtonWinners = document.querySelector('.next-page-winners');
const prevPageButtonWinners = document.querySelector('.prev-page-winners');
const pageNumberElement = document.querySelector('.page-number');
const winnersBlock = document.querySelector('.winners-block');
exports.winnersPageNumber = document.querySelector('.winners-page-number');
const winnersButton = document.querySelector('.winners-button');
const garageButton = document.querySelector('.garage-button');
function changePages() {
    const garageList = document.querySelector('.garage-list');
    exports.nextPageButton.setAttribute('id', garageList.id);
    let pageNumber = +garageList.id.split('_').at(-1);
    exports.nextPageButton.addEventListener('click', (event) => {
        const garageListArr = Array.from(createCarElement_1.garageBlock.children).filter(item => item.tagName === 'DIV');
        if (!event.currentTarget.classList.contains('next-page-button-not-active')) {
            pageNumber >= garageListArr.length ? null : pageNumber++;
            exports.prevPageButton.classList.remove('prev-page-button-not-active');
            const garageListItem = Array.from(createCarElement_1.garageBlock.children).find(item => item.id === `page_${pageNumber}`);
            garageListItem.classList.remove('garage-list-not-active');
            garageListItem.classList.add('garage-list');
            garageListItem.previousElementSibling?.classList.add('garage-list-not-active');
            garageListItem.previousElementSibling?.classList.remove('garage-list');
            pageNumberElement.textContent = `Page#${pageNumber}`;
            pageNumber === garageListArr.length - 1 ? event.currentTarget.classList.add('next-page-button-not-active') : null;
        }
    });
    exports.prevPageButton.addEventListener('click', (event) => {
        const garageListItem = Array.from(createCarElement_1.garageBlock.children).find(item => item.id === `page_${pageNumber}`);
        if (!event.currentTarget.classList.contains('prev-page-button-not-active')) {
            pageNumber === 1 ? null : pageNumber--;
            exports.nextPageButton.classList.remove('next-page-button-not-active');
            garageListItem.classList.add('garage-list');
            garageListItem.classList.remove('garage-list-not-active');
            garageListItem.nextElementSibling?.classList.remove('garage-list');
            garageListItem.nextElementSibling?.classList.add('garage-list-not-active');
            pageNumberElement.textContent = `Page#${pageNumber}`;
            pageNumber === 1 ? event.currentTarget.classList.add('prev-page-button-not-active') : null;
        }
    });
    nextPageButtonWinners.addEventListener('click', event => {
        const garageListArr = Array.from(createCarElement_1.garageBlock.children).filter(item => item.tagName === 'DIV');
        prevPageButtonWinners.classList.remove('prev-page-button-winners-not-active');
        if (+exports.winnersPageNumber.textContent < garageListArr.length - 1 && !nextPageButtonWinners.classList.contains('next-page-button-winners-not-active')) {
            exports.winnersPageNumber.textContent = String(+exports.winnersPageNumber.textContent + 1);
            renderTableElement();
        }
        else {
            nextPageButtonWinners.classList.add('next-page-button-winners-not-active');
        }
    });
    prevPageButtonWinners.addEventListener('click', event => {
        nextPageButtonWinners.classList.remove('next-page-button-winners-not-active');
        if (exports.winnersPageNumber.textContent !== '1') {
            exports.winnersPageNumber.textContent = String(+exports.winnersPageNumber.textContent - 1);
            exports.winnersPageNumber.textContent === '1' ? prevPageButtonWinners.classList.add('prev-page-button-winners-not-active') : null;
            renderTableElement();
        }
    });
}
exports.changePages = changePages;
function changeWinnersAndGarageBlock() {
    winnersButton.addEventListener('click', (event) => {
        winnersBlock.classList.add('winners-block-active');
        winnersButton.classList.add('winner-active');
        garageButton.classList.remove('garage-active');
    });
    garageButton.addEventListener('click', (event) => {
        winnersBlock.classList.remove('winners-block-active');
        garageButton.classList.add('garage-active');
        winnersButton.classList.remove('winner-active');
    });
}
exports.changeWinnersAndGarageBlock = changeWinnersAndGarageBlock;
function renderTableElement() {
    (0, api_1.getWinners)(api_1.winners)
        .then(value => (0, api_1.showCarsWinners)(api_1.garage, value))
        .then(value => {
        const carPropertyArr = Array.from(document.querySelectorAll('.car-property'));
        for (const item of carPropertyArr) {
            item.remove();
        }
        for (let i = 0; i < value.property.length; i++) {
            if ((+exports.winnersPageNumber.textContent * 10 - 9) <= value.property[i].id && value.property[i].id <= (+exports.winnersPageNumber.textContent * 10)) {
                (0, createHtmlElements_1.createTableRow)(value.carsArr[i], value.property[i]);
            }
        }
    });
}
exports.renderTableElement = renderTableElement;


/***/ }),

/***/ "./modules/createCarElement.ts":
/*!*************************************!*\
  !*** ./modules/createCarElement.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createCarElement = exports.createCarsElement = exports.garageBlock = void 0;
const api_1 = __webpack_require__(/*! ./api */ "./modules/api.ts");
const driveCar_1 = __webpack_require__(/*! ./driveCar */ "./modules/driveCar.ts");
const removeCar_1 = __webpack_require__(/*! ./removeCar */ "./modules/removeCar.ts");
const createHtmlElements_1 = __webpack_require__(/*! ./createHtmlElements */ "./modules/createHtmlElements.ts");
const updateCar_1 = __webpack_require__(/*! ./updateCar */ "./modules/updateCar.ts");
const changePages_1 = __webpack_require__(/*! ./changePages */ "./modules/changePages.ts");
exports.garageBlock = document.querySelector('.garage');
function createCarsElement() {
    (0, api_1.showCars)(api_1.garage).then(value => {
        for (const key of value) {
            const elem = document.createElement('div');
            elem.innerHTML = (0, createHtmlElements_1.svg)(key.color, key.name, key.id);
            elem.classList.add('car-element');
            const cars = document.querySelectorAll('.car');
            if (cars.length % 7 === 0 && cars.length !== 0) {
                const garageList = document.createElement('div');
                garageList.setAttribute('id', `page_${cars.length / 7 + 1}`);
                garageList.classList.add('garage-list-not-active');
                exports.garageBlock.append(garageList);
            }
            exports.garageBlock.lastElementChild.append(elem);
        }
        (0, updateCar_1.findSelectCar)();
        (0, removeCar_1.removeCar)();
        (0, driveCar_1.startCar)();
    }).then(() => (0, changePages_1.renderTableElement)());
}
exports.createCarsElement = createCarsElement;
function createCarElement(car) {
    const elem = document.createElement('div');
    elem.innerHTML = (0, createHtmlElements_1.svg)(car.color, car.name, car.id);
    elem.classList.add('car-element');
    const cars = document.querySelectorAll('.car');
    if (cars.length % 7 === 0) {
        const garageList = document.createElement('div');
        garageList.setAttribute('id', `page_${cars.length / 7 + 1}`);
        garageList.classList.add('garage-list-not-active');
        exports.garageBlock.append(garageList);
    }
    exports.garageBlock.lastElementChild.append(elem);
    (0, updateCar_1.findSelectCar)();
    (0, removeCar_1.removeCar)();
    (0, driveCar_1.startCar)();
}
exports.createCarElement = createCarElement;


/***/ }),

/***/ "./modules/createHtmlElements.ts":
/*!***************************************!*\
  !*** ./modules/createHtmlElements.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.changeTableRow = exports.createTableRow = exports.createTableElement = exports.svg = void 0;
const changePages_1 = __webpack_require__(/*! ./changePages */ "./modules/changePages.ts");
const tableWinners = document.querySelector('.winners-table');
function svg(color, carBrand, carId) {
    const svgFile = `
    <span>${carBrand}</span>
    <div class="control-block-car">
    <button id='${carId}' class="select-button">Select</button>
    <button id='${carId}' class="remove-button">Remove</button>
    <button id='${carId}' class="start-button ">Start</button>
    <button id='${carId}' class="stop-button stop-button-not-active">Stop</button>
    </div>
    <div class="heght"></div>
    <svg id='${carId}' class="car" version="1.0" xmlns="http://www.w3.org/2000/svg" width="1280.000000pt" height="640.000000pt"
    viewBox="0 0 1280.000000 640.000000" preserveAspectRatio="xMidYMid meet">
    <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)" fill=${color} stroke="none">
      <path d="M3565 5336 c-106 -30 -101 -26 -108 -111 -4 -42 -9 -80 -12 -85 -6
-10 -246 -105 -590 -234 -448 -167 -1052 -415 -1173 -483 -78 -43 -193 -91
-250 -104 -23 -5 -98 -14 -165 -19 -67 -6 -167 -19 -222 -30 -154 -31 -340
-49 -563 -57 l-203 -6 -43 -66 c-59 -91 -60 -95 -26 -130 37 -37 38 -65 3
-150 -25 -62 -27 -78 -31 -256 l-4 -190 -38 -32 c-91 -78 -133 -209 -134 -418
0 -194 11 -396 26 -482 13 -71 14 -74 72 -122 69 -58 130 -129 158 -184 64
-126 534 -211 1384 -250 l92 -4 -6 119 c-6 142 8 256 49 383 112 352 394 622
756 722 90 26 112 28 278 28 165 0 188 -2 278 -27 201 -56 361 -152 504 -302
140 -145 222 -293 274 -492 21 -79 24 -109 23 -279 -1 -127 -6 -214 -16 -263
l-15 -73 3006 7 c1653 4 3007 8 3009 9 1 1 -8 37 -20 81 -19 67 -22 105 -22
259 -1 166 1 187 27 279 117 421 467 736 885 797 119 17 325 7 432 -21 239
-63 453 -205 601 -399 70 -92 154 -267 185 -386 24 -88 27 -119 27 -260 1
-116 -4 -181 -16 -234 -10 -41 -16 -75 -15 -76 2 -1 62 2 133 6 266 16 458 45
525 79 48 24 97 81 127 146 l24 52 -16 157 c-15 152 -15 163 4 284 63 388 50
680 -35 802 -134 193 -526 336 -1429 519 -737 149 -1322 209 -2033 210 -228 0
-226 0 -347 85 -187 131 -1045 607 -1471 815 -383 187 -788 281 -1439 332
-208 17 -1106 16 -1400 0 -121 -7 -314 -19 -430 -27 -302 -22 -286 -22 -341
10 -140 81 -187 94 -269 71z m1885 -333 c6 -37 38 -238 71 -446 32 -209 66
-422 75 -474 9 -52 15 -96 13 -97 -11 -9 -1699 29 -1951 44 -206 13 -417 36
-485 54 -98 26 -198 119 -249 231 -35 75 -36 172 -5 255 17 45 30 61 68 86 83
54 135 80 253 127 341 136 858 230 1460 267 269 16 270 16 511 18 l227 2 12
-67z m630 47 c264 -18 777 -110 1029 -186 186 -56 445 -188 756 -387 211 -134
274 -181 250 -185 -75 -12 -133 -50 -162 -106 -19 -35 -21 -136 -4 -179 l11
-27 -907 2 -906 3 -59 160 c-110 302 -298 878 -298 916 0 6 95 2 290 -11z" />
      <path d="M2633 3125 c-223 -40 -410 -141 -568 -306 -132 -138 -213 -283 -262
-467 -22 -83 -26 -119 -26 -247 -1 -169 10 -236 65 -382 87 -230 271 -436 493
-551 85 -44 178 -78 271 -98 107 -23 312 -23 419 1 392 84 699 375 802 761 23
86 26 120 27 254 1 158 -5 199 -46 330 -98 310 -355 567 -668 669 -150 50
-354 64 -507 36z m350 -301 c249 -56 457 -247 543 -499 25 -72 28 -95 28 -220
1 -153 -15 -228 -74 -345 -94 -186 -283 -337 -485 -386 -96 -24 -268 -24 -360
0 -320 84 -544 355 -562 681 -20 359 209 673 558 765 94 24 253 26 352 4z" />
      <path d="M2600 2697 c-36 -13 -85 -36 -109 -51 l-44 -28 116 -115 c81 -82 120
-114 131 -110 14 6 16 29 16 167 0 186 6 178 -110 137z" />
      <path d="M2920 2561 c0 -139 2 -162 16 -168 11 -4 50 28 130 108 l115 114 -28
22 c-34 28 -138 70 -193 79 l-40 7 0 -162z" />
      <path d="M2282 2448 c-28 -36 -92 -191 -92 -225 0 -10 34 -13 165 -13 151 0
165 1 165 18 0 15 -206 232 -221 232 -4 0 -11 -6 -17 -12z" />
      <path d="M3222 2351 c-62 -59 -112 -115 -112 -124 0 -15 17 -17 165 -17 131 0
165 3 165 13 0 40 -69 205 -95 227 -7 6 -48 -27 -123 -99z" />
      <path d="M2781 2332 c-12 -22 11 -62 34 -62 8 0 21 10 29 22 20 28 4 58 -29
58 -13 0 -29 -8 -34 -18z" />
      <path d="M2749 2161 c-32 -33 -37 -67 -14 -110 29 -57 104 -64 151 -14 53 57
9 153 -71 153 -27 0 -44 -8 -66 -29z" />
      <path d="M2570 2125 c-26 -32 13 -81 48 -59 24 16 27 45 6 61 -23 17 -39 16
-54 -2z" />
      <path d="M3006 2124 c-20 -19 -20 -38 -2 -54 23 -19 61 -8 64 18 7 44 -32 67
-62 36z" />
      <path d="M2190 1975 c0 -29 41 -140 72 -194 l31 -53 117 117 c71 71 116 123
113 131 -4 11 -40 14 -169 14 -141 0 -164 -2 -164 -15z" />
      <path d="M3110 1972 c0 -9 51 -68 114 -131 l114 -114 31 54 c30 51 71 165 71
195 0 11 -31 14 -165 14 -151 0 -165 -1 -165 -18z" />
      <path d="M2780 1901 c-7 -15 -5 -24 8 -41 32 -40 85 -4 62 41 -14 25 -56 25
-70 0z" />
      <path d="M2562 1697 c-61 -62 -112 -115 -112 -119 0 -18 208 -108 249 -108 7
0 11 54 11 164 0 140 -2 165 -16 170 -9 3 -16 6 -17 6 -1 0 -53 -51 -115 -113z" />
      <path d="M2933 1803 c-15 -6 -19 -333 -4 -333 46 0 251 88 251 108 0 9 -223
232 -230 231 -3 0 -11 -3 -17 -6z" />
      <path d="M10700 3119 c-390 -84 -696 -376 -797 -759 -31 -117 -41 -292 -24
-411 33 -227 150 -453 318 -609 267 -250 643 -344 993 -249 117 32 283 118
380 196 487 396 518 1128 67 1560 -97 93 -166 140 -290 198 -137 64 -235 86
-407 91 -120 3 -162 0 -240 -17z m445 -313 c238 -81 409 -258 486 -506 30 -96
33 -289 5 -388 -110 -400 -513 -637 -911 -536 -149 38 -313 147 -402 267 -176
238 -203 533 -71 797 34 69 60 103 138 180 77 78 111 104 181 139 129 65 207
81 364 77 109 -3 143 -7 210 -30z" />
      <path d="M10703 2700 c-54 -19 -153 -71 -153 -80 0 -3 51 -57 114 -119 80 -80
119 -112 130 -108 14 5 16 29 16 167 l0 160 -27 -1 c-16 0 -52 -9 -80 -19z" />
      <path d="M11020 2561 c0 -139 2 -162 16 -168 22 -8 247 216 234 232 -17 20
-163 84 -207 91 l-43 7 0 -162z" />
      <path d="M10366 2424 c-29 -44 -76 -165 -76 -194 0 -19 7 -20 165 -20 126 0
165 3 165 13 0 7 -51 63 -114 126 l-114 114 -26 -39z" />
      <path d="M11313 2348 c-61 -62 -109 -119 -106 -125 6 -15 333 -19 333 -4 0 45
-88 241 -108 241 -4 0 -57 -51 -119 -112z" />
      <path d="M10882 2338 c-17 -17 -15 -32 7 -52 16 -14 23 -15 41 -6 31 17 24 64
-10 68 -14 2 -31 -3 -38 -10z" />
      <path d="M10846 2159 c-68 -81 17 -194 110 -144 89 48 56 175 -46 175 -30 0
-44 -6 -64 -31z" />
      <path d="M10670 2126 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20
-54 2z" />
      <path d="M11106 2127 c-21 -16 -18 -45 7 -61 37 -23 77 35 41 61 -10 7 -21 13
-24 13 -3 0 -14 -6 -24 -13z" />
      <path d="M10290 1970 c0 -29 43 -141 74 -195 l28 -48 116 116 c81 81 113 120
109 131 -6 14 -29 16 -167 16 -152 0 -160 -1 -160 -20z" />
      <path d="M11207 1978 c-3 -7 47 -66 111 -130 l116 -118 27 43 c27 44 79 177
79 203 0 12 -28 14 -164 14 -122 0 -166 -3 -169 -12z" />
      <path d="M10881 1901 c-14 -25 -5 -48 20 -56 27 -9 51 13 47 44 -4 34 -51 43
-67 12z" />
      <path d="M10662 1697 c-61 -62 -112 -115 -112 -119 0 -20 201 -108 247 -108
10 0 13 34 13 164 0 140 -2 165 -16 170 -9 3 -16 6 -17 6 -1 0 -53 -51 -115
-113z" />
      <path d="M11033 1803 c-10 -3 -13 -47 -13 -169 0 -90 4 -164 8 -164 36 0 186
61 239 98 16 10 -216 242 -234 235z" />
    </g>
  </svg>
  <img src='./assets/flagpole.svg' class='flagpole'>
  <div class='road'></div>
  `;
    return svgFile;
}
exports.svg = svg;
function svgPicture(color) {
    return `
      <svg style="width: 40px; height:40px" version="1.0" xmlns="http://www.w3.org/2000/svg" width="1280.000000pt" height="640.000000pt"
    viewBox="0 0 1280.000000 640.000000" preserveAspectRatio="xMidYMid meet">
    <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)" fill=${color} stroke="none">
      <path d="M3565 5336 c-106 -30 -101 -26 -108 -111 -4 -42 -9 -80 -12 -85 -6
-10 -246 -105 -590 -234 -448 -167 -1052 -415 -1173 -483 -78 -43 -193 -91
-250 -104 -23 -5 -98 -14 -165 -19 -67 -6 -167 -19 -222 -30 -154 -31 -340
-49 -563 -57 l-203 -6 -43 -66 c-59 -91 -60 -95 -26 -130 37 -37 38 -65 3
-150 -25 -62 -27 -78 -31 -256 l-4 -190 -38 -32 c-91 -78 -133 -209 -134 -418
0 -194 11 -396 26 -482 13 -71 14 -74 72 -122 69 -58 130 -129 158 -184 64
-126 534 -211 1384 -250 l92 -4 -6 119 c-6 142 8 256 49 383 112 352 394 622
756 722 90 26 112 28 278 28 165 0 188 -2 278 -27 201 -56 361 -152 504 -302
140 -145 222 -293 274 -492 21 -79 24 -109 23 -279 -1 -127 -6 -214 -16 -263
l-15 -73 3006 7 c1653 4 3007 8 3009 9 1 1 -8 37 -20 81 -19 67 -22 105 -22
259 -1 166 1 187 27 279 117 421 467 736 885 797 119 17 325 7 432 -21 239
-63 453 -205 601 -399 70 -92 154 -267 185 -386 24 -88 27 -119 27 -260 1
-116 -4 -181 -16 -234 -10 -41 -16 -75 -15 -76 2 -1 62 2 133 6 266 16 458 45
525 79 48 24 97 81 127 146 l24 52 -16 157 c-15 152 -15 163 4 284 63 388 50
680 -35 802 -134 193 -526 336 -1429 519 -737 149 -1322 209 -2033 210 -228 0
-226 0 -347 85 -187 131 -1045 607 -1471 815 -383 187 -788 281 -1439 332
-208 17 -1106 16 -1400 0 -121 -7 -314 -19 -430 -27 -302 -22 -286 -22 -341
10 -140 81 -187 94 -269 71z m1885 -333 c6 -37 38 -238 71 -446 32 -209 66
-422 75 -474 9 -52 15 -96 13 -97 -11 -9 -1699 29 -1951 44 -206 13 -417 36
-485 54 -98 26 -198 119 -249 231 -35 75 -36 172 -5 255 17 45 30 61 68 86 83
54 135 80 253 127 341 136 858 230 1460 267 269 16 270 16 511 18 l227 2 12
-67z m630 47 c264 -18 777 -110 1029 -186 186 -56 445 -188 756 -387 211 -134
274 -181 250 -185 -75 -12 -133 -50 -162 -106 -19 -35 -21 -136 -4 -179 l11
-27 -907 2 -906 3 -59 160 c-110 302 -298 878 -298 916 0 6 95 2 290 -11z" />
      <path d="M2633 3125 c-223 -40 -410 -141 -568 -306 -132 -138 -213 -283 -262
-467 -22 -83 -26 -119 -26 -247 -1 -169 10 -236 65 -382 87 -230 271 -436 493
-551 85 -44 178 -78 271 -98 107 -23 312 -23 419 1 392 84 699 375 802 761 23
86 26 120 27 254 1 158 -5 199 -46 330 -98 310 -355 567 -668 669 -150 50
-354 64 -507 36z m350 -301 c249 -56 457 -247 543 -499 25 -72 28 -95 28 -220
1 -153 -15 -228 -74 -345 -94 -186 -283 -337 -485 -386 -96 -24 -268 -24 -360
0 -320 84 -544 355 -562 681 -20 359 209 673 558 765 94 24 253 26 352 4z" />
      <path d="M2600 2697 c-36 -13 -85 -36 -109 -51 l-44 -28 116 -115 c81 -82 120
-114 131 -110 14 6 16 29 16 167 0 186 6 178 -110 137z" />
      <path d="M2920 2561 c0 -139 2 -162 16 -168 11 -4 50 28 130 108 l115 114 -28
22 c-34 28 -138 70 -193 79 l-40 7 0 -162z" />
      <path d="M2282 2448 c-28 -36 -92 -191 -92 -225 0 -10 34 -13 165 -13 151 0
165 1 165 18 0 15 -206 232 -221 232 -4 0 -11 -6 -17 -12z" />
      <path d="M3222 2351 c-62 -59 -112 -115 -112 -124 0 -15 17 -17 165 -17 131 0
165 3 165 13 0 40 -69 205 -95 227 -7 6 -48 -27 -123 -99z" />
      <path d="M2781 2332 c-12 -22 11 -62 34 -62 8 0 21 10 29 22 20 28 4 58 -29
58 -13 0 -29 -8 -34 -18z" />
      <path d="M2749 2161 c-32 -33 -37 -67 -14 -110 29 -57 104 -64 151 -14 53 57
9 153 -71 153 -27 0 -44 -8 -66 -29z" />
      <path d="M2570 2125 c-26 -32 13 -81 48 -59 24 16 27 45 6 61 -23 17 -39 16
-54 -2z" />
      <path d="M3006 2124 c-20 -19 -20 -38 -2 -54 23 -19 61 -8 64 18 7 44 -32 67
-62 36z" />
      <path d="M2190 1975 c0 -29 41 -140 72 -194 l31 -53 117 117 c71 71 116 123
113 131 -4 11 -40 14 -169 14 -141 0 -164 -2 -164 -15z" />
      <path d="M3110 1972 c0 -9 51 -68 114 -131 l114 -114 31 54 c30 51 71 165 71
195 0 11 -31 14 -165 14 -151 0 -165 -1 -165 -18z" />
      <path d="M2780 1901 c-7 -15 -5 -24 8 -41 32 -40 85 -4 62 41 -14 25 -56 25
-70 0z" />
      <path d="M2562 1697 c-61 -62 -112 -115 -112 -119 0 -18 208 -108 249 -108 7
0 11 54 11 164 0 140 -2 165 -16 170 -9 3 -16 6 -17 6 -1 0 -53 -51 -115 -113z" />
      <path d="M2933 1803 c-15 -6 -19 -333 -4 -333 46 0 251 88 251 108 0 9 -223
232 -230 231 -3 0 -11 -3 -17 -6z" />
      <path d="M10700 3119 c-390 -84 -696 -376 -797 -759 -31 -117 -41 -292 -24
-411 33 -227 150 -453 318 -609 267 -250 643 -344 993 -249 117 32 283 118
380 196 487 396 518 1128 67 1560 -97 93 -166 140 -290 198 -137 64 -235 86
-407 91 -120 3 -162 0 -240 -17z m445 -313 c238 -81 409 -258 486 -506 30 -96
33 -289 5 -388 -110 -400 -513 -637 -911 -536 -149 38 -313 147 -402 267 -176
238 -203 533 -71 797 34 69 60 103 138 180 77 78 111 104 181 139 129 65 207
81 364 77 109 -3 143 -7 210 -30z" />
      <path d="M10703 2700 c-54 -19 -153 -71 -153 -80 0 -3 51 -57 114 -119 80 -80
119 -112 130 -108 14 5 16 29 16 167 l0 160 -27 -1 c-16 0 -52 -9 -80 -19z" />
      <path d="M11020 2561 c0 -139 2 -162 16 -168 22 -8 247 216 234 232 -17 20
-163 84 -207 91 l-43 7 0 -162z" />
      <path d="M10366 2424 c-29 -44 -76 -165 -76 -194 0 -19 7 -20 165 -20 126 0
165 3 165 13 0 7 -51 63 -114 126 l-114 114 -26 -39z" />
      <path d="M11313 2348 c-61 -62 -109 -119 -106 -125 6 -15 333 -19 333 -4 0 45
-88 241 -108 241 -4 0 -57 -51 -119 -112z" />
      <path d="M10882 2338 c-17 -17 -15 -32 7 -52 16 -14 23 -15 41 -6 31 17 24 64
-10 68 -14 2 -31 -3 -38 -10z" />
      <path d="M10846 2159 c-68 -81 17 -194 110 -144 89 48 56 175 -46 175 -30 0
-44 -6 -64 -31z" />
      <path d="M10670 2126 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20
-54 2z" />
      <path d="M11106 2127 c-21 -16 -18 -45 7 -61 37 -23 77 35 41 61 -10 7 -21 13
-24 13 -3 0 -14 -6 -24 -13z" />
      <path d="M10290 1970 c0 -29 43 -141 74 -195 l28 -48 116 116 c81 81 113 120
109 131 -6 14 -29 16 -167 16 -152 0 -160 -1 -160 -20z" />
      <path d="M11207 1978 c-3 -7 47 -66 111 -130 l116 -118 27 43 c27 44 79 177
79 203 0 12 -28 14 -164 14 -122 0 -166 -3 -169 -12z" />
      <path d="M10881 1901 c-14 -25 -5 -48 20 -56 27 -9 51 13 47 44 -4 34 -51 43
-67 12z" />
      <path d="M10662 1697 c-61 -62 -112 -115 -112 -119 0 -20 201 -108 247 -108
10 0 13 34 13 164 0 140 -2 165 -16 170 -9 3 -16 6 -17 6 -1 0 -53 -51 -115
-113z" />
      <path d="M11033 1803 c-10 -3 -13 -47 -13 -169 0 -90 4 -164 8 -164 36 0 186
61 239 98 16 10 -216 242 -234 235z" />
    </g>
  </svg>`;
}
function createTableElement(car, property) {
    const tableElement = ` 
      <td>${document.querySelector('tbody')?.children.length}</td>
      <td>${svgPicture(car.color)}</td>
      <td>${car.name}</td>
      <td>${property.wins}</td>
      <td>${property.time}</td>
      `;
    return tableElement;
}
exports.createTableElement = createTableElement;
function createTableRow(car, property) {
    const tableRow = document.createElement('tr');
    tableRow.classList.add('car-property');
    tableRow.innerHTML = createTableElement(car, property);
    tableRow.setAttribute('id', `${property.id}`);
    if ((+changePages_1.winnersPageNumber.textContent * 10 - 9) <= property.id && property.id <= (+changePages_1.winnersPageNumber.textContent * 10)) {
        tableWinners.append(tableRow);
    }
}
exports.createTableRow = createTableRow;
function changeTableRow(car, property) {
    const tableRowArr = Array.from(document.querySelectorAll('.car-property'));
    const tableRow = tableRowArr.find(item => +item.id === property.id);
    tableRow.innerHTML = createTableElement(car, property);
    tableRow.setAttribute('id', `${property.id}`);
    tableWinners.append(tableRow);
}
exports.changeTableRow = changeTableRow;


/***/ }),

/***/ "./modules/driveCar.ts":
/*!*****************************!*\
  !*** ./modules/driveCar.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.animateStopCar = exports.animateCar = exports.startCar = void 0;
const api_1 = __webpack_require__(/*! ./api */ "./modules/api.ts");
function startCar() {
    const startButtonsArr = Array.from(document.querySelectorAll('.start-button'));
    startButtonsArr.forEach(item => {
        item.addEventListener('click', (event) => {
            if (!item.classList.contains('start-button-not-active')) {
                (0, api_1.startCarApi)(api_1.engine, +event.currentTarget.id)
                    .then((value) => {
                    item.classList.add('start-button-not-active');
                    item.nextElementSibling.classList.remove('stop-button-not-active');
                    (0, api_1.driveCarApi)(api_1.engine, value.id, value.data);
                });
            }
        });
    });
}
exports.startCar = startCar;
function animateCar(propertyCar, id) {
    const carArr = Array.from(document.querySelectorAll('.car'));
    const car = carArr.find(item => +item.id === id);
    const time = propertyCar.distance / propertyCar.velocity;
    car.style.animation = `${time}ms backwheel linear forwards`;
    return car;
}
exports.animateCar = animateCar;
function animateStopCar(id) {
    const carArr = Array.from(document.querySelectorAll('.car'));
    const car = carArr.find(item => +item.id === id);
    const stopButtonsArr = Array.from(document.querySelectorAll('.stop-button'));
    stopButtonsArr.forEach(item => {
        item.addEventListener('click', (event) => {
            if (item.id === car.id && !item.classList.contains('stop-button-not-active')) {
                (0, api_1.stopCarApi)(api_1.engine, +event.currentTarget.id)
                    .then(() => {
                    car.style.animation = '0.1s stopCar';
                })
                    .then(() => {
                    item.classList.add('stop-button-not-active');
                    item.previousElementSibling.classList.remove('start-button-not-active');
                });
            }
        });
    });
}
exports.animateStopCar = animateStopCar;


/***/ }),

/***/ "./modules/generate.ts":
/*!*****************************!*\
  !*** ./modules/generate.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generate = void 0;
const api_1 = __webpack_require__(/*! ./api */ "./modules/api.ts");
const createCarElement_1 = __webpack_require__(/*! ./createCarElement */ "./modules/createCarElement.ts");
const generateButton = document.querySelector('.generate');
const carBrand = [
    'Acura', 'Alfa Romeo', 'Alpine', 'Apollo', 'Apple', 'Aston Martin', 'Audi', 'Automobili Pininfarina', 'Bentley', 'BMW', 'Bollinger',
    'Brilliance', 'Bugatti', 'Buick', 'BYD', 'Cadillac', 'Chana', 'Chery', 'Chevrolet', 'Chrysler', 'Citroen', 'Continental', 'CUPRA',
    'Dacia', 'Daewoo', 'Daihatsu', 'Datsun', 'Detroit Electric', 'Dodge', 'DS Automobiles', 'FAW', 'Ferrari', 'Fiat', 'Fisker', 'Ford',
    'Foxtron', 'Geely', 'Genesis', 'GMC', 'Great Wall', 'Haval', 'Honda', 'Hummer', 'Hyundai', 'Ineos', 'Infiniti', 'Iran Khodro', 'JAC',
    'Jaguar', 'Jeep', 'JETOUR', 'KIA', 'Koenigsegg', 'Lada', 'Lamborghini', 'Lancia', 'Land Rover', 'Lexus', 'Lifan', 'Lincoln', 'Lordstown',
    'Lotus', 'Lucid', 'LvChi', 'Lynk & Co', 'Maserati', 'Maybach', 'Mazda', 'MCLaren', 'Mercedes-Benz', 'MG', 'MINI', 'Mitsubishi', 'Nikola',
    'NIO', 'Nissan', 'Opel', 'Pagani', 'Peugeot', 'Polestar', 'Porsche', 'Qoros', 'Range Rover', 'Ravon', 'Renault', 'Rimac', 'Rivian',
    'Rolls-Royce', 'Saab', 'Saipa', 'SEAT', 'Skoda', 'smart', 'SsangYong', 'SSC North America', 'Stellantis', 'Subaru', 'Suzuki', 'Tata',
    'Tesla', 'Torsus', 'Toyota', 'VinFast', 'Volkswagen', 'Volvo', 'Xpeng', 'Zotye',
];
const carModal = [
    'Durango', 'Ram', 'Challenger', 'Charger', 'Grand Caravan', 'X7', 'X5', 'X3', 'X6 M', 'X6', 'X1', 'X4', 'C3 Aircross', 'C5 Aircross', 'Duster', 'CR-V', 'Corolla',
    'C4 Cactus', 'DS3 Crossback', 'C1', 'C3', 'Berlingo Multispace', 'DS4 Crossback', 'UX 250h', 'NX 300h', 'LC 500', 'RX 350/200t', 'Rapid', 'Largus',
    'IS 200t', 'LS 500h', 'RX', 'ES 200/250/350', 'Hatchback', 'CX-5', 'Sedan', 'CX-30', 'CX-9', 'CX-3', 'MX-5 Roadster', 'Phantom', 'Camry', 'Polo',
    'Cullinan', 'Ghost', 'Dawn', 'Duster', 'Arkana', 'Sandero', 'Logan', 'Trafic Fourgon', 'Logan MCV', 'Captur', 'Kadjar', 'RAV4', 'Rio', 'Creta', 'Solaris',
];
const leters = ['A', 'B', 'C', 'D', 'E', 'F'];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
function generate() {
    generateButton.addEventListener('click', (event) => {
        for (let i = 0; i < 100; i++) {
            const randomNumber = Math.ceil(Math.random() * 2);
            let color = '#';
            for (let i = 0; i < 6; i++) {
                randomNumber === 2 ? color += String(leters[Math.floor(Math.random() * leters.length)]) : color += String(numbers[Math.floor(Math.random() * numbers.length)]);
            }
            const carName = carBrand[Math.floor(Math.random() * carBrand.length)] + carModal[Math.floor(Math.random() * carModal.length)];
            (0, api_1.addCarApi)(api_1.garage, {
                name: carName,
                color: color,
            }).then((value) => {
                (0, createCarElement_1.createCarElement)(value);
            }).then(() => (0, api_1.showCars)(api_1.garage));
        }
    });
}
exports.generate = generate;


/***/ }),

/***/ "./modules/race.ts":
/*!*************************!*\
  !*** ./modules/race.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.race = exports.raceButton = void 0;
const api_1 = __webpack_require__(/*! ./api */ "./modules/api.ts");
const createHtmlElements_1 = __webpack_require__(/*! ./createHtmlElements */ "./modules/createHtmlElements.ts");
const reset_1 = __webpack_require__(/*! ./reset */ "./modules/reset.ts");
const changePages_1 = __webpack_require__(/*! ./changePages */ "./modules/changePages.ts");
exports.raceButton = document.querySelector('.race');
async function race() {
    exports.raceButton.addEventListener('click', (event) => {
        if (!exports.raceButton.classList.contains('race-not-active')) {
            changePages_1.nextPageButton.classList.add('next-page-button-not-active');
            changePages_1.prevPageButton.classList.add('prev-page-button-not-active');
            exports.raceButton.classList.add('race-not-active');
            const startButtonArr = Array.from(document.querySelectorAll('.start-button'));
            const stopButtonArr = Array.from(document.querySelectorAll('.stop-button'));
            const selecttButtonArr = Array.from(document.querySelectorAll('.select-button'));
            const removeButtonArr = Array.from(document.querySelectorAll('.remove-button'));
            const garageList = document.querySelector('.garage-list');
            const promiseArr = [];
            for (const key in Array.from(garageList.children)) {
                Array.from((garageList.children)[key].children).forEach(elem => {
                    if (elem.tagName === 'svg') {
                        const result = (0, api_1.startCarApi)(api_1.engine, +elem.id)
                            .then(value => {
                            startButtonArr.forEach(item => {
                                value.id === +item.id ? item.classList.add('start-button-not-active') : null;
                            });
                            stopButtonArr.forEach(item => {
                                value.id === +item.id ? item.classList.add('stop-button-not-active') : null;
                            });
                            selecttButtonArr.forEach(item => {
                                value.id === +item.id ? item.classList.add('select-not-active') : null;
                            });
                            removeButtonArr.forEach(item => {
                                value.id === +item.id ? item.classList.add('reset-not-active') : null;
                            });
                            return value;
                        })
                            .then((value) => (0, api_1.driveCarApi)(api_1.engine, value.id, value.data));
                        promiseArr.push(result);
                    }
                });
            }
            Promise.any(promiseArr)
                .then(value => (0, api_1.getWinner)(api_1.winners, value.id, +(value.propertyCar.distance / value.propertyCar.velocity / 1000).toFixed(2)))
                .then(value => (0, api_1.showCar)(api_1.garage, value))
                .then(async (value) => {
                if (value.property.firstWin) {
                    (0, createHtmlElements_1.createTableRow)(value.car, (await value.property.f.then(value => value)).valueOf());
                }
                else {
                    (0, createHtmlElements_1.changeTableRow)(value.car, (await value.property.f.then(value => value)).valueOf());
                }
            })
                .then(() => reset_1.resetButton.classList.remove('reset-not-active'));
        }
    });
}
exports.race = race;


/***/ }),

/***/ "./modules/removeCar.ts":
/*!******************************!*\
  !*** ./modules/removeCar.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.removeCar = void 0;
const api_1 = __webpack_require__(/*! ./api */ "./modules/api.ts");
const changePages_1 = __webpack_require__(/*! ./changePages */ "./modules/changePages.ts");
function removeCar() {
    const deleteButtonsArr = Array.from(document.querySelectorAll('.remove-button'));
    deleteButtonsArr.forEach(item => {
        item.addEventListener('click', (event) => {
            (0, api_1.deleteCar)(api_1.garage, +event.currentTarget.id);
            (0, api_1.deleteWinner)(api_1.winners, +event.currentTarget.id).then(() => (0, changePages_1.renderTableElement)());
            event.currentTarget.parentElement.parentElement.remove();
        });
    });
}
exports.removeCar = removeCar;


/***/ }),

/***/ "./modules/reset.ts":
/*!**************************!*\
  !*** ./modules/reset.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reset = exports.resetButton = void 0;
const api_1 = __webpack_require__(/*! ./api */ "./modules/api.ts");
const race_1 = __webpack_require__(/*! ./race */ "./modules/race.ts");
const changePages_1 = __webpack_require__(/*! ./changePages */ "./modules/changePages.ts");
exports.resetButton = document.querySelector('.reset');
function reset() {
    exports.resetButton.addEventListener('click', (event) => {
        race_1.raceButton.classList.remove('race-not-active');
        if (!exports.resetButton.classList.contains('reset-not-active')) {
            const garageList = document.querySelector('.garage-list');
            const pageNumber = +garageList.id.split('_').at(-1);
            exports.resetButton.classList.add('reset-not-active');
            changePages_1.nextPageButton.classList.remove('next-page-button-not-active');
            pageNumber !== 1 ? changePages_1.prevPageButton.classList.remove('prev-page-button-not-active') : null;
            const startButtonArr = Array.from(document.querySelectorAll('.start-button'));
            const stopButtonArr = Array.from(document.querySelectorAll('.stop-button'));
            const selecttButtonArr = Array.from(document.querySelectorAll('.select-button'));
            const removeButtonArr = Array.from(document.querySelectorAll('.remove-button'));
            for (const key in Array.from(garageList.children)) {
                Array.from((garageList.children)[key].children).forEach(elem => {
                    if (elem.tagName === 'svg') {
                        (0, api_1.stopCarApi)(api_1.engine, +elem.id).then((value) => {
                            elem.style.animation = '0.1s stopCar';
                            startButtonArr.forEach(item => {
                                value.id === +item.id ? item.classList.remove('start-button-not-active') : null;
                            });
                            stopButtonArr.forEach(item => {
                                value.id === +item.id ? item.classList.add('stop-button-not-active') : null;
                            });
                            selecttButtonArr.forEach(item => {
                                value.id === +item.id ? item.classList.remove('select-not-active') : null;
                            });
                            removeButtonArr.forEach(item => {
                                value.id === +item.id ? item.classList.remove('reset-not-active') : null;
                            });
                        });
                    }
                });
            }
        }
    });
}
exports.reset = reset;


/***/ }),

/***/ "./modules/updateCar.ts":
/*!******************************!*\
  !*** ./modules/updateCar.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findSelectCar = exports.updateNewCar = void 0;
const api_1 = __webpack_require__(/*! ./api */ "./modules/api.ts");
const createHtmlElements_1 = __webpack_require__(/*! ./createHtmlElements */ "./modules/createHtmlElements.ts");
const removeCar_1 = __webpack_require__(/*! ./removeCar */ "./modules/removeCar.ts");
const driveCar_1 = __webpack_require__(/*! ./driveCar */ "./modules/driveCar.ts");
const updateNewCarButton = document.querySelector('.update-car-button');
const updateCarNameInput = document.querySelector('.update-car-name');
const updateCarColorInput = document.querySelector('.update-car-color');
function updateNewCar() {
    updateNewCarButton.addEventListener('click', (event) => {
        const selectedButtonsArr = Array.from(document.querySelectorAll('.select-button'));
        const button = selectedButtonsArr.find(item => item.classList.contains('select-button-active'));
        (0, api_1.updateCar)(api_1.garage, {
            name: updateCarNameInput.value,
            color: updateCarColorInput.value,
        }, +((button).id))
            .then((value) => updateCarColorAndText(button, value));
    });
}
exports.updateNewCar = updateNewCar;
function findSelectCar() {
    const selectedButtonsArr = Array.from(document.querySelectorAll('.select-button'));
    selectedButtonsArr.forEach(item => {
        item.addEventListener('click', (event) => {
            selectedButtonsArr.forEach(elem => {
                elem.classList.remove('select-button-active');
            });
            item.classList.add('select-button-active');
        });
    });
}
exports.findSelectCar = findSelectCar;
function updateCarColorAndText(button, value) {
    button.parentElement.parentElement.innerHTML = (0, createHtmlElements_1.svg)(value.color, value.name, value.id);
    findSelectCar();
    (0, removeCar_1.removeCar)();
    (0, driveCar_1.startCar)();
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!******************!*\
  !*** ./index.ts ***!
  \******************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./style/style.scss */ "./style/style.scss");
const createCarElement_1 = __webpack_require__(/*! ./modules/createCarElement */ "./modules/createCarElement.ts");
const updateCar_1 = __webpack_require__(/*! ./modules/updateCar */ "./modules/updateCar.ts");
const addNewCar_1 = __webpack_require__(/*! ./modules/addNewCar */ "./modules/addNewCar.ts");
const race_1 = __webpack_require__(/*! ./modules/race */ "./modules/race.ts");
const reset_1 = __webpack_require__(/*! ./modules/reset */ "./modules/reset.ts");
const generate_1 = __webpack_require__(/*! ./modules/generate */ "./modules/generate.ts");
const changePages_1 = __webpack_require__(/*! ./modules/changePages */ "./modules/changePages.ts");
(0, createCarElement_1.createCarsElement)();
(0, updateCar_1.updateNewCar)();
(0, addNewCar_1.addNewCar)();
(0, race_1.race)();
(0, reset_1.reset)();
(0, generate_1.generate)();
(0, changePages_1.changePages)();
(0, changePages_1.changeWinnersAndGarageBlock)();
// alert('День добрый:) Не доделал ещё победителей и стили, если не затруднит, проверьте работу чуть позже. Заранее спасибо');

})();

/******/ })()
;