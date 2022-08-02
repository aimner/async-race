import { deleteCar, garage } from "./api";

export function removeCar() {
     const deleteButtonsArr = Array.from(document.querySelectorAll('.remove-button')) as HTMLDivElement[] 
     console.log(deleteButtonsArr)
     deleteButtonsArr.forEach(item => {
        item.addEventListener('click', (event) => {
            deleteCar(garage, +(event.currentTarget as HTMLButtonElement).id);
            (event.currentTarget as HTMLButtonElement).parentElement!.remove()
        })
     })
}