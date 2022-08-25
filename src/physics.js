export const G = 6.6742 * 10 ** -11;

export function updateBodys(bodys) {
  for (let i = 0; i < bodys.length; i++) {
    if (bodys[i].fixed) continue;
    for (let j = 0; j < bodys.length; j++) {
      if (i === j) continue;
      const bA = bodys[i];
      const bB = bodys[j];
      const d = Math.sqrt((bB.x - bA.x) ** 2 + (bB.y - bA.y) ** 2);

      const fX = (G * bodys[i].mass * bodys[j].mass * (bA.x - bB.x)) / d ** 3;
      const fY = (G * bodys[i].mass * bodys[j].mass * (bA.y - bB.y)) / d ** 3;

      let a = [fX / bodys[i].mass, fY / bodys[i].mass];

      let v = [bA.v[0] + a[0], bA.v[1] + a[1]];

      if (d <= bodys[i].radius + bodys[j].radius) {
        a = [0, 0];
        v = [0, 0];
      }

      bodys[i] = {
        ...bA,
        a,
        v,
      };
    }
  }

  for (let i = 0; i < bodys.length; i++) {
    if (bodys[i].fixed) continue;
    bodys[i].x = bodys[i].x - bodys[i].v[0];
    bodys[i].y = bodys[i].y - bodys[i].v[1];
    bodys[i].history.push([bodys[i].x, bodys[i].y]);
  }

  return bodys;
}
