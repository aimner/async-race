import { garage, getWinners, showCarsWinners, winners } from './api';
import { garageBlock } from './createCarElement';
import { createTableRow } from './createHtmlElements';



export const nextPageButton = document.querySelector('.next-page') as HTMLButtonElement;
export const prevPageButton = document.querySelector('.prev-page') as HTMLButtonElement;
const nextPageButtonWinners = document.querySelector('.next-page-winners') as HTMLButtonElement;
const prevPageButtonWinners = document.querySelector('.prev-page-winners') as HTMLButtonElement;
const pageNumberElement = document.querySelector('.page-number') as HTMLSpanElement;
const winnersBlock = document.querySelector('.winners-block') as Element;
export const winnersPageNumber = document.querySelector('.winners-page-number') as HTMLSpanElement;


const winnersButton = document.querySelector('.winners-button') as HTMLButtonElement;
const garageButton = document.querySelector('.garage-button') as HTMLButtonElement;

export function changePages() {
  const garageList = document.querySelector('.garage-list') as HTMLDivElement;
  nextPageButton.setAttribute('id', garageList.id);
  let pageNumber = +garageList.id.split('_').at(-1)!;
  nextPageButton.addEventListener('click', (event) => {
    const garageListArr = Array.from(garageBlock.children).filter(item => (item as HTMLDivElement).tagName === 'DIV') as HTMLDivElement[];
    if (!(event.currentTarget as HTMLButtonElement).classList.contains('next-page-button-not-active')) {
      pageNumber >= garageListArr.length ? null : pageNumber++;
      prevPageButton.classList.remove('prev-page-button-not-active');
      const garageListItem = Array.from(garageBlock.children).find(item => (item as HTMLDivElement).id === `page_${pageNumber}`) as HTMLDivElement;
      garageListItem.classList.remove('garage-list-not-active');
      garageListItem.classList.add('garage-list');
      garageListItem.previousElementSibling?.classList.add('garage-list-not-active');
      garageListItem.previousElementSibling?.classList.remove('garage-list');
      pageNumberElement.textContent = `Page#${pageNumber}`;
      pageNumber === garageListArr.length - 1 ? (event.currentTarget as HTMLButtonElement).classList.add('next-page-button-not-active') : null;
    }
  });
  prevPageButton.addEventListener('click', (event) => {
    const garageListItem = Array.from(garageBlock.children).find(item => (item as HTMLDivElement).id === `page_${pageNumber}`) as HTMLDivElement;
    if (!(event.currentTarget as HTMLButtonElement).classList.contains('prev-page-button-not-active')) {
      pageNumber === 1 ? null : pageNumber--;
      nextPageButton.classList.remove('next-page-button-not-active');
      garageListItem.classList.add('garage-list');
      garageListItem.classList.remove('garage-list-not-active');
      garageListItem.nextElementSibling?.classList.remove('garage-list');
      garageListItem.nextElementSibling?.classList.add('garage-list-not-active');
      pageNumberElement.textContent = `Page#${pageNumber}`;
      pageNumber === 1 ? (event.currentTarget as HTMLButtonElement).classList.add('prev-page-button-not-active') : null;
    }
  });
  nextPageButtonWinners.addEventListener('click', event => {
    const garageListArr = Array.from(garageBlock.children).filter(item => (item as HTMLDivElement).tagName === 'DIV') as HTMLDivElement[];
    prevPageButtonWinners.classList.remove('prev-page-button-winners-not-active');
    if (+winnersPageNumber.textContent! < garageListArr.length - 1 &&  !nextPageButtonWinners.classList.contains('next-page-button-winners-not-active')) {
      winnersPageNumber.textContent = String(+winnersPageNumber.textContent! + 1);
      renderTableElement();
    } else {
      nextPageButtonWinners.classList.add('next-page-button-winners-not-active');
    }
  });
  prevPageButtonWinners.addEventListener('click', event => {
    nextPageButtonWinners.classList.remove('next-page-button-winners-not-active');
    if (winnersPageNumber.textContent !== '1') {
      winnersPageNumber.textContent = String(+winnersPageNumber.textContent! - 1);
      winnersPageNumber.textContent === '1' ? prevPageButtonWinners.classList.add('prev-page-button-winners-not-active') : null;
      renderTableElement();
    }
  });
}


export function changeWinnersAndGarageBlock() {
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


export function renderTableElement() {
  getWinners(winners)
    .then(value => showCarsWinners(garage, value))
    .then(value => {
      const carPropertyArr = Array.from(document.querySelectorAll('.car-property')); 
      for (const item of carPropertyArr) {
        item.remove();
      }
      for (let i = 0; i < value.property.length; i++) {
        if ((+winnersPageNumber.textContent! * 10 - 9) <= value.property[i].id && value.property[i].id <= (+winnersPageNumber.textContent! * 10)) {
          createTableRow(value.carsArr[i], value.property[i]);
        }
      }
    });
}