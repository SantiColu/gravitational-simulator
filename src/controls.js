import { configs } from "./config";

export class Controls {
  constructor(simulation) {
    this.simulation = simulation;
    this.pauseButton = document.getElementById("pauseButton");
    this.resetButton = document.getElementById("resetButton");
    this.selectScenario = document.getElementById("select-scenario");

    this.realTimeData = document.getElementById("realTimeData");

    this.bodyEditorContainer = document.getElementById("bodyEditor-collapse");
    this.bodyEditorTitle = document.getElementById("bodyEditor-title");
    this.bodyEditorData = document.getElementById("bodyEditor-data");
    this.bodyEditorCheck = document.getElementById("bodyEditor-checkbox");

    this.addEventListeners();
    this.updateBodyData();
    this.udpateEditableData();
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

    this.selectScenario.addEventListener("change", (e) => {
      const bodys = configs[e.target.value];
      this.simulation.restart(bodys);
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

  udpateEditableData() {
    this.bodyEditorData.innerHTML = this.simulation.initialBodys.reduce(
      (prev, curr) =>
        prev +
        ` 
    <div class="collapse collapse-arrow border border-base-300 rounded-box">
      <input type="checkbox" />
      <div class="collapse-title text-xl font-medium">
        Cuerpo: ${curr.name}
      </div>
      <div class="collapse-content flex">
        <div class="grid grid-cols-2 gap-10">
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text mr-3">Fijo:</span> 
              <input type="checkbox" ${
                curr.fixed ? 'checked="checked"' : ""
              }  class="checkbox" />
            </label>
            <label class="label cursor-pointer">
              <span class="label-text mr-3">Masa:</span> 
              <input type="text" placeholder="Masa del cuerpo" value="${
                curr.mass
              }" class="input input-sm input-bordered w-full max-w-xs" />
            </label>
            <div class="flex items-center justify-between">
              <span class="label-text mr-3">Posicion:</span> 
              <div class="flex">
                <label class="label cursor-pointer">
                  <span class="label-text mr-3">X:</span> 
                  <input type="text" value="${
                    curr.x
                  }" class="input input-sm input-bordered w-20 max-w-xs" />
                </label>
                <label class="label cursor-pointer">
                  <span class="label-text mr-3">Y:</span> 
                  <input type="text" value="${
                    curr.y
                  }" class="input input-sm input-bordered w-20 max-w-xs" />
                </label>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="label-text mr-3">Velocidad:</span> 
              <div class="flex">
                <label class="label cursor-pointer">
                  <span class="label-text mr-3">X:</span> 
                  <input type="text" value="${
                    curr.v[0]
                  }" class="input input-sm input-bordered w-20 max-w-xs" />
                </label>
                <label class="label cursor-pointer">
                  <span class="label-text mr-3">Y:</span> 
                  <input type="text" value="${
                    curr.v[1]
                  }" class="input input-sm input-bordered w-20 max-w-xs" />
                </label>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="label-text mr-3">Aceleracion:</span> 
              <div class="flex">
                <label class="label cursor-pointer">
                  <span class="label-text mr-3">X:</span> 
                  <input type="text" value="${
                    curr.a[0]
                  }" class="input input-sm input-bordered w-20 max-w-xs" />
                </label>
                <label class="label cursor-pointer">
                  <span class="label-text mr-3">Y:</span> 
                  <input type="text" value="${
                    curr.a[1]
                  }" class="input input-sm input-bordered w-20 max-w-xs" />
                </label>
              </div>
            </div>
          </div>
          <div>
            <label class="label cursor-pointer">
              <span class="label-text mr-3">Nombre:</span> 
              <input type="text" placeholder="Nombre del cuerpo" value="${
                curr.name
              }" class="input input-sm input-bordered w-full max-w-xs" />
            </label>
          </div>
        </div>
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
