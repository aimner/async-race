import { deleteCar, garage, winners, deleteWinner } from './api';
import { renderTableElement } from './changePages';

export function removeCar() {
  const deleteButtonsArr = Array.from(document.querySelectorAll('.remove-button'));  
  // console.log(deleteButtonsArr);
  deleteButtonsArr.forEach(item => {
    item.addEventListener('click', (event) => {
      deleteCar(garage, +(event.currentTarget as HTMLButtonElement).id);
      deleteWinner(winners, +(event.currentTarget as HTMLButtonElement).id).then(() => renderTableElement());
      (event.currentTarget as HTMLButtonElement).parentElement!.parentElement!.remove();
    });
  });
}