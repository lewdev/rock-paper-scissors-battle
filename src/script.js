//a = document.createElement("canvas");
//---------------------------------------------------
let c = a.getContext("2d"), // no more $type conditional
w=window,
d = document,
M=Math,
r = M.random,
FPS = 20,//50fps
SIZE = 40,
PIECES_COUNT = 30,
SPEED = 3,
KILL_DISTANCE = 5,
R='🧱',
P='📃',
S='✂️',
emojis = [R, P, S],
pieces = null,
myInterval = null,
myTimeout = null;
window.resize = () => { a.width = innerWidth; a.height = innerHeight; };
window.resize();
let init = () => {
  pieces = [];
  emojis.map(o => createPieces(o));
  clearInterval(myInterval);
  clearTimeout(myTimeout);
  myInterval = setInterval(update, FPS); //30 fps
};
c.font = SIZE + 'px serif';
let createPieces = o => {for (i=0;i<PIECES_COUNT;i++) pieces.push({o, x: r() * innerWidth, y: r() * innerHeight})}

let clear = () => {
  c.fillStyle = "#888";
  c.rect(0, 0, innerWidth, innerHeight);
  c.fill();
};

let dist = (p1, p2) => {
  let a = p1.x - p2.x,
  b = p1.y - p2.y;
  return M.sqrt(a * a + b * b);
};

let angle = (p1, p2) => M.atan2(p2.y - p1.y, p2.x - p1.x);

let drawLine = (p1, p2) => {
  c.beginPath();
  c.strokeStyle = "red";
  c.lineWidth = 3;
  c.moveTo(p1.x, p1.y);
  c.lineTo(p2.x, p2.y);
  c.stroke();
};
let pieceMap = {};
let isDead = o => !pieceMap[o] || pieceMap[o].length === 0;
let didWin = p => {
  if (emojis.filter(o => o !== p && isDead(o)).length === 2) {
    str = p + ' WINS';
    x = innerWidth / 2 - c.measureText(str).width / 2;//centered
    y = innerHeight - 100;//bottom
    c.fillText(str, x, y);
    return true;
  }
  return false;
};
let drawScore = (o, y) => {
  c.fillStyle = "black";
  c.fillText(o + ' ' + (pieceMap[o] ? pieceMap[o].length : 0), 30, y);
};
let targets, closest, xVelocity, yVelocity, pangle;
let update = () => {
  clear();
  pieces.map(p => {
    //find closest opposing piece
    targets = pieces.filter(p2 => (p.o === R && p2.o === S)
      || (p.o === P && p2.o === R)
      || (p.o === S && p2.o === P)
    );
    if (targets.length > 0) {
      targets.sort((a, b) => dist(p, a) - dist(p, b));
      closest = targets[0];
      // debug.closest = JSON.stringify(closest);
      pangle = angle(p, closest) + ((r() * 0.4) - 0.2);
      xVelocity = SPEED * M.cos(pangle);
      yVelocity = SPEED * M.sin(pangle);
      p.x += xVelocity;
      p.y += yVelocity;
      //drawLine(p, closest);
    }
  });
  //collision detection
  pieces.map(p => {
    if (p.x < 0) p.x = 0;
    if (p.x > innerWidth) p.x = innerWidth
    if (p.y < 0) p.y = 0;
    if (p.y > innerHeight) p.y = innerHeight;
    targets = pieces.filter(t => (p.o === R && t.o === S)
      || (p.o === P && t.o === R)
      || (p.o === S && t.o === P)
    );
    if (targets.length > 0) {
      targets.sort((a, b) => dist(p, a) - dist(p, b));
      closest = targets[0];
      if (dist(p, closest) < KILL_DISTANCE) closest.remove = 1;
    }
  });
  pieces.map(p => c.fillText(p.o, p.x - SIZE / 2, p.y + SIZE / 2));
  pieces = pieces.filter(p => {
    if (p.remove) c.fillText('💥', p.x - SIZE / 2, p.y + SIZE / 2);
    return !p.remove;
  });
  //end condition
  emojis.map(o => pieceMap[o] = pieces.filter(p => p.o === o));
  emojis.map((o, i) => drawScore(o, 70 + (i * 70)));
  if (emojis.filter(o => didWin(o)).length === 1) {
    clearInterval(myInterval);
    myTimeout = setTimeout(init, 6000);
  }
};
d.onclick=d.ontouchend=d.onkeyup=init;

onload = init;