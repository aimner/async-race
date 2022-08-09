import { IWinners } from './typesAndInterface';
import { garage, getWinners, showCarsWinners, winners } from './api';
import { garageBlock } from './createCarElement';
import { createTableRow } from './createHtmlElements';



const nextPageButton = document.querySelector('.next-page') as HTMLButtonElement;
const prevPageButton = document.querySelector('.prev-page') as HTMLButtonElement;
const nextPageButtonWinners = document.querySelector('.next-page-winners') as HTMLButtonElement;
const prevPageButtonWinners = document.querySelector('.prev-page-winners') as HTMLButtonElement;
const pageNumberElement = document.querySelector('.page-number') as HTMLSpanElement;
const winnersBlock = document.querySelector('.winners-block') as Element;
const winnersPageNumber = document.querySelector('.winners-page-number') as HTMLSpanElement;


const winnersButton = document.querySelector('.winners-button') as HTMLButtonElement;
const garageButton = document.querySelector('.garage-button') as HTMLButtonElement;

export function changePages() {
  const garageList = document.querySelector('.garage-list') as HTMLDivElement;
  nextPageButton.setAttribute('id', garageList.id);
  let pageNumber = parseFloat(garageList.id.split('').reverse().join(''));
  nextPageButton.addEventListener('click', (event) => {
    const garageListArr = Array.from(garageBlock.children).filter(item => (item as HTMLDivElement).tagName === 'DIV') as HTMLDivElement[];
    pageNumber >= garageListArr.length ? null : pageNumber++;
    const garageListItem = Array.from(garageBlock.children).find(item => (item as HTMLDivElement).id === `page_${pageNumber}`) as HTMLDivElement;
    garageListItem.classList.remove('garage-list-not-active');
    garageListItem.classList.add('garage-list');

    garageListItem.previousElementSibling?.classList.add('garage-list-not-active');
    garageListItem.previousElementSibling?.classList.remove('garage-list');
    pageNumberElement.textContent = `Page#${pageNumber}`;
    console.log(garageListItem);
  });
  prevPageButton.addEventListener('click', (event) => {
    console.log(pageNumber);
    pageNumber === 1 ? null : pageNumber--;
    console.log(pageNumber);
    const garageListItem = Array.from(garageBlock.children).find(item => (item as HTMLDivElement).id === `page_${pageNumber}`) as HTMLDivElement;
    garageListItem.classList.add('garage-list');
    garageListItem.classList.remove('garage-list-not-active');
    garageListItem.nextElementSibling?.classList.remove('garage-list');
    garageListItem.nextElementSibling?.classList.add('garage-list-not-active');
    pageNumberElement.textContent = `Page#${pageNumber}`;
    console.log(garageListItem);
  });
  nextPageButtonWinners.addEventListener('click', event => {
    const garageListArr = Array.from(garageBlock.children).filter(item => (item as HTMLDivElement).tagName === 'DIV') as HTMLDivElement[];
    console.log(garageListArr.length);
    if (+winnersPageNumber.textContent! < garageListArr.length) {
      winnersPageNumber.textContent = String(+winnersPageNumber.textContent! + 1);
      renderTableElement();
    }
  });
  prevPageButtonWinners.addEventListener('click', event => {
    if (winnersPageNumber.textContent !== '1') {
      winnersPageNumber.textContent = String(+winnersPageNumber.textContent! - 1);
      renderTableElement();
    }
  });
}


export function changeWinnersAndGarageBlock() {
  winnersButton.addEventListener('click', (event) => {
    winnersBlock.classList.add('winners-block-active');
  });

  garageButton.addEventListener('click', (event) => {
    winnersBlock.classList.remove('winners-block-active');
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
        if ((+winnersPageNumber.textContent! * 7 - 6) <= value.property[i].id && value.property[i].id <= (+winnersPageNumber.textContent! * 7)) {
        // console.log(value.property[i].id)
          createTableRow(value.carsArr[i], value.property[i]);
        }
      }
    });
}