import { updateBodys } from "./physics";

export class Simulation {
  constructor(canvas, bodys) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.initialBodys = JSON.parse(JSON.stringify(bodys));
    this.canvas.width = window.innerWidth / 2;
    this.canvas.height = window.innerHeight;

    this.updateEvent = new CustomEvent("bodys-update", { bodys: this.bodys });

    this.reset();
    this.draw();
  }

  run() {
    this.setPaused(true);
    this.draw();
  }

  reset() {
    this.setPaused(true);
    this.bodys = JSON.parse(JSON.stringify(this.initialBodys));
    for (let i = 0; i < this.bodys.length; i++) {
      this.bodys[i].history = [];
    }
  }

  togglePause() {
    this.setPaused(!this.paused);
  }

  setPaused(value) {
    this.paused = value;
    document.dispatchEvent(
      new CustomEvent("pause-update", {
        detail: { paused: this.paused },
      })
    );
  }

  update() {
    updateBodys(this.bodys);
    document.dispatchEvent(
      new CustomEvent("bodys-update", {
        detail: { bodys: this.bodys },
      })
    );
  }

  draw() {
    this.canvas.width = window.innerWidth / 2;
    this.canvas.height = window.innerHeight;

    if (!this.paused) {
      this.update();
    }
    this.ctx.font = "25px Arial";

    this.bodys.forEach(({ name, radius, history, x, y }) => {
      if (history.length > 1) {
        this.ctx.beginPath();
        this.ctx.moveTo(history[0][0], history[0][1]);
        for (let i = 0; i < history.length - 2; i++) {
          this.ctx.lineTo(history[i][0], history[i][1]);
          this.ctx.moveTo(history[i][0], history[i][1]);
        }
        this.ctx.closePath();
        this.ctx.strokeStyle = "#4b6bfb";
        this.ctx.stroke();
      }

      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.ctx.closePath();
      this.ctx.fillStyle = "#181a2a";
      this.ctx.fill();
      this.ctx.strokeStyle = "#f9fafb";
      this.ctx.stroke();
      this.ctx.fillStyle = "#f9fafb";
      this.ctx.fillText(name, x - 10, y + 10);
    });

    requestAnimationFrame(this.draw.bind(this));
  }
}
