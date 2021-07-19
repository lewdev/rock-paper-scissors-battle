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
TOUCH_DISTANCE = 5,
R='🧱',
P='📃',
S='✂️',
gameOn = false,
emojis = [R, P, S],
pieces = (new Array(90)).fill().map(() => ({o:'', x: 0, y: 0})),
myInterval = null,
myTimeout = null;
let init = () => {
  let o;
  for (i = 0; i < 90; i++) {
    o = pieces[i];
    o.o = emojis[i % 3];
    o.x = r() * innerWidth;
    o.y = r() * innerHeight
  }
  gameOn = true;
  clearTimeout(myTimeout);
  c.font = SIZE + 'px serif';
};
const resize = () => {a.width = innerWidth; a.height = innerHeight;}
w.addEventListener('resize', resize);
resize();

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
let drawScore = (o, y) => {
  c.fillStyle = "black";
  c.fillText(o + ' ' + (pieceMap[o] ? pieceMap[o].length : 0), 30, y);
};
let targets, closest, xVelocity, yVelocity, pangle;
let update = () => {
  if (!gameOn) return;
  clear();
  pieces.map(p => {
    //find closest opposing piece
    targets = pieces.filter(p2 => p2.o && ((
      p.o === R && p2.o === S)
      || (p.o === P && p2.o === R)
      || (p.o === S && p2.o === P)
    ));
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
  pieces.map(p => c.fillText(p.o, p.x - SIZE / 2, p.y + SIZE / 2));
  pieces.map(p => {
    // if (p.x < 0) p.x = 0;
    // if (p.x > innerWidth) p.x = innerWidth
    // if (p.y < 0) p.y = 0;
    // if (p.y > innerHeight) p.y = innerHeight;
    targets = pieces.filter(t => p.o && ((p.o === R && t.o === S)
      || (p.o === P && t.o === R)
      || (p.o === S && t.o === P))
    );
    if (targets.length > 0) {
      targets.sort((a, b) => dist(p, a) - dist(p, b));
      closest = targets[0];
      // if (dist(p, closest) < TOUCH_DISTANCE) closest.remove = 1;
      if (dist(p, closest) < TOUCH_DISTANCE) {
        closest.o = '';
        c.fillText('💥', p.x - SIZE / 2, p.y + SIZE / 2);
      }
    }
  });
  emojis.map((o, i) => {
    pieceMap[o] = pieces.filter(p => p.o === o);
    drawScore(o, 70 + (i * 70));
  });

  //check end condition
  if (isEndGame()) {
    gameOn = false;
    myTimeout = setTimeout(init, 6000);
  }
};
setInterval(update, FPS);
let isEndGame = () => emojis.filter(o => didWin(o)).length === 1;
let isDead = o => !pieceMap[o] || pieceMap[o].length === 0;
let didWin = p => {
  if (emojis.filter(o => o !== p && isDead(o)).length === 2) {
    c.font = (innerWidth / 6) + 'px serif';
    str = p + ' WINS';
    x = innerWidth / 2 - c.measureText(str).width / 2;//centered
    y = innerHeight / 2;//centered
    c.fillText(str, x, y);
    return true;
  }
  return false;
};
//restart on click, touch, or keypress
d.onclick=d.ontouchend=d.onkeyup=init;

onload = () => init();