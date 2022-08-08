import { garageBlock } from './createCarElement';
const nextPageButton = document.querySelector('.next-page') as HTMLButtonElement;
const prevPageButton = document.querySelector('.prev-page') as HTMLButtonElement;
const pageNumberElement = document.querySelector('.page-number') as HTMLSpanElement;

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
}