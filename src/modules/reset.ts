import { stopCarApi, engine } from "./api";

const resetButton = document.querySelector(".reset") as HTMLButtonElement;

export function reset() {
  resetButton.addEventListener("click", (event) => {
    const carsElement = Array.from(
      document.querySelectorAll(".car")
    ) as SVGElement[];
    carsElement.forEach((item) => {
      stopCarApi(engine, +item.id).then(() => {
        item.style.animation = "0.1s stopCar";
      });
    });
  });
}
