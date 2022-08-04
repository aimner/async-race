import { driveCarApi, startCarApi, engine } from "./api";

const raceButton = document.querySelector(".race") as HTMLButtonElement;

export function race() {
  raceButton.addEventListener("click", (event) => {
    const carsElement = Array.from(
      document.querySelectorAll(".car")
    ) as SVGElement[];
    carsElement.forEach((item) => {
        console.log(item)
      startCarApi(engine, +item.id).then(
        (value) => driveCarApi(engine, value.id, value.data)
      );
    });
  });
}
