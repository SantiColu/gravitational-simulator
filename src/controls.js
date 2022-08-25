export class Controls {
  constructor(simulation) {
    this.simulation = simulation;
    this.pauseButton = document.getElementById("pauseButton");
    this.resetButton = document.getElementById("resetButton");
    this.realTimeData = document.getElementById("realTimeData");

    this.bodyEditorContainer = document.getElementById("bodyEditor-collapse");
    this.bodyEditorTitle = document.getElementById("bodyEditor-title");
    this.bodyEditorData = document.getElementById("bodyEditor-data");
    this.bodyEditorCheck = document.getElementById("bodyEditor-checkbox");

    this.addEventListeners();
    this.updateBodyData();
  }

  addEventListeners() {
    this.pauseButton.addEventListener("click", () => {
      this.simulation.togglePause();
    });

    this.resetButton.addEventListener("click", () => {
      this.simulation.reset();
    });

    document.addEventListener("pause-update", ({ detail: { paused } }) => {
      this.pauseButton.innerHTML = paused
        ? `<i class="bi bi-play-fill"></i>`
        : `<i class="bi bi-pause"></i>`;

      if (paused) {
        this.bodyEditorCheck.disabled = false;
        this.bodyEditorContainer.classList.remove("collapse-close");
        this.bodyEditorTitle.classList.remove("text-gray-400");
        this.bodyEditorTitle.innerHTML = `Modificar cuerpos`;
      } else {
        this.bodyEditorCheck.disabled = true;
        this.bodyEditorContainer.classList.add("collapse-close");
        this.bodyEditorTitle.classList.add("text-gray-400");
        this.bodyEditorTitle.innerHTML += `<div class="badge badge-secondary ml-5"> No es posible con la simulacion en curso</div>`;
      }
    });

    document.addEventListener("bodys-update", () => {
      this.updateBodyData();
    });
  }

  updateBodyData() {
    this.realTimeData.innerHTML = this.simulation.bodys.reduce(
      (prev, curr) =>
        prev +
        `
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Cuerpo: ${curr.name} ${
          curr.fixed ? "<u>(Fijo)</u>" : ""
        }</h2>
        <p><b>Posicion:</b> \u003C${Math.trunc(curr.x)}, ${Math.trunc(
          curr.y
        )}\u003E</p>
        <p><b>Velocidad:</b> ${arrToVector(curr.v)}</p>
        <p><b>Aceleracion:</b> ${arrToVector(curr.a)}</p>
      </div>
    </div>
    `,
      ""
    );
  }
}

function arrToVector(arr) {
  return `\u003C${arr[0].toFixed(3)}, ${arr[1].toFixed(3)}\u003E`;
}
