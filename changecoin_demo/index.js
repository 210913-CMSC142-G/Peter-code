//
// CODE STARTS HERE
//
let c = 0;
let list = [];
let root = "";
let x = 0;
let y = 0;
let prevx = false;
let prevy = false;
let sf = 1;

function setup() {
  const canvas = createCanvas(
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  );
  c = count(S, m, n, [], "", "");
}

window.addEventListener("wheel", function (e) {
  if (e.deltaY < 0) sf *= 1.05;
  else sf *= 0.95;
});

function mouseReleased() {
  prevx = false;
  prevy = false;
}

function mouseDragged() {
  if (prevx && prevy) {
    x += mouseX - prevx;
    y += mouseY - prevy;
  }
  prevx = mouseX;
  prevy = mouseY;
}

function draw() {
  translate(x, y);
  scale(sf);
  background(0);
  fill(255);
  textSize(25);
  text(`Total: ${c}`, 5, 25);
  let yy = 25;
  list.forEach((l, i) => text(l, 5, yy * (i + 2)));
  textSize(15);
  push();
  translate(width / 1.75, -400);
  rotate(Math.PI / 2);
  print2D();
  stroke(255);
  root.renderLines();
  pop();
}

function count(S, m, n, l, p, d) {
  const c = new bt(`C({${S.filter((s, i) => i < m)}},${n})`);
  if (p == "") {
    root = c;
  } else {
    d === 0 ? (p.l = c) : (p.r = c);
  }
  if (n == 0) {
    list.push(l);
    return 1;
  }
  if (n < 0) return 0;
  if (m <= 0 && n >= 1) return 0;
  let ll = [...l, S[m - 1]];
  return count(S, m - 1, n, l, c, 0) + count(S, m, n - S[m - 1], ll, c, 1);
}

class bt {
  constructor(v) {
    this.v = v;
    this.l = "";
    this.r = "";
    this.x = "";
    this.y = "";
  }

  renderLines() {
    let q = [];
    q.push(this);
    while (q.length > 0) {
      let n = q.shift();
      line(n.x, n.y, n.l.x, n.l.y);
      line(n.x, n.y, n.r.x, n.r.y);
      if (n.l != "") q.push(n.l);
      if (n.r != "") q.push(n.r);
    }
  }
}

function print2DUtil(node, x, y) {
  stroke(255);
  x += root.v.length * 10;
  if (node.r != "") y = print2DUtil(node.r, x, y);
  y += 30;
  push();
  noStroke();
  if (node.v.includes("-") || node.v.includes("{}")) fill(255, 0, 0);
  if (node.v.includes("},0)")) fill(0, 255, 0);
  translate(x, y);
  rotate(-Math.PI / 2);
  text(node.v, 0, 0);
  pop();
  node.x = x;
  node.y = y;
  stroke(255, 0, 0);
  ellipse(x, y, 5, 5);
  stroke(255);
  if (node.l != "") y = print2DUtil(node.l, x, y);
  return y;
}
function print2D() {
  print2DUtil(root, width / 4, 40);
}
