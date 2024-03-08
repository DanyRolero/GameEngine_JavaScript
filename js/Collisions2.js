// Helpers
const toRadians = (degrees) => degrees * Math.PI / 180;
const toDegrees = (radians) => radians * 180 / Math.PI;

// .1 - .3 > -0.19999999999999998
// fixFloat(.1 - .3) > -0.2
const fixFloat = (number, precision=Math.log10(1/Number.EPSILON)) => number ? parseFloat(number.toFixed(precision)) : 0;


//----------------------------------------------------------------------------------------------------
class Vector {
  constructor({x=0,y=0}={}) {
    this.x = x;
    this.y = y;
  }


  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  // Add(5)
  // Add(Vector)
  // Add({x, y})
  Add(factor) {
    const f = typeof factor === 'object'
      ? { x:0, y:0, ...factor}
      : {x:factor, y:factor}
    return new Vector({
      x: this.x + f.x,
      y: this.y + f.y,
    })
  }

  Minus(factor) {
    const f = typeof factor === 'object'
      ? { x:0, y:0, ...factor}
      : {x:factor, y:factor}
    return new Vector({
      x: this.x - f.x,
      y: this.y - f.y,
    })
  }

  // Multiply(5)
  // Multiply(Vector)
  // Multiply({x, y})
  Multiply(factor) {

    // @LATER: Use an helper in order to transform `factor`
    //  into a Vector of same Dimensions than this
    const f = typeof factor === 'object'
      ? { x:0, y:0, ...factor}
      : {x:factor, y:factor}

    return new Vector({
      x: this.x * f.x,
      y: this.y * f.y,
    })
  }

  Rotate(theta) {
    // https://en.wikipedia.org/wiki/Rotation_matrix#In_two_dimensions
    return new Vector({
      x: this.x * Math.cos(theta) - this.y * Math.sin(theta),
      y: this.x * Math.sin(theta) + this.y * Math.cos(theta),
    });
  }


  // Todo: Use scalar product

  Project(line) {
    let dotvalue = line.direction.x * (this.x - line.origin.x) + line.direction.y * (this.y - line.origin.y);
    return new Vector({
      x: line.origin.x + line.direction.x * dotvalue,
      y: line.origin.y + line.direction.y * dotvalue,
    })
  }
}

//----------------------------------------------------------------------------------------------------
class Line {
  constructor({x=0,y=0, dx=0, dy=0}) {
    this.origin = new Vector({x,y});
    this.direction = new Vector({x:dx,y:dy});
  }
}


//----------------------------------------------------------------------------------------------------
class Rect {
  constructor({
    x=0, y=0, w=10, h=10,
    // 0 is Horizontal to right (following OX) - Rotate clockwise
    theta=null, angle=0, // theta (rad) or angle (deg)
    rgb='0,0,0'
  }) {
    this.center = new Vector({x,y});
    this.size = new Vector({x:w,y:h});
    this.theta = theta || toRadians(angle);
    this.rgb = rgb;
  }

  getAxis() {
    const OX = new Vector({x:1, y:0});
    const OY = new Vector({x:0, y:1});
    const RX = OX.Rotate(this.theta);
    const RY = OY.Rotate(this.theta);
    return [
      new Line({...this.center, dx: RX.x, dy: RX.y}),
      new Line({...this.center, dx: RY.x, dy: RY.y}),
    ];
  }

  getCorners() {
    const axis = this.getAxis();
    const RX = axis[0].direction.Multiply(this.size.x/2);
    const RY = axis[1].direction.Multiply(this.size.y/2);
    return [
      this.center.Add(RX).Add(RY),
      this.center.Add(RX).Add(RY.Multiply(-1)),
      this.center.Add(RX.Multiply(-1)).Add(RY.Multiply(-1)),
      this.center.Add(RX.Multiply(-1)).Add(RY),
    ]
  }
}


//----------------------------------------------------------------------------------------------------
// Demo App
//----------------------------------------------------------------------------------------------------

const Settings = {

  root:null,
  TemplateSettings: null,

  rectSettings: [], // Settings per rect {el: DOM Element, refs: {}, settings: {}}
  settings: {}, // Global settings

  init ({settings, rects, onPlay, onPause, onRectChange}) {

    Settings.root = document.getElementById('rect-settings');
    Settings.TemplateSettings = document.getElementById('rect-settings-template');

    Settings.settings = settings;

    // Clean
    Settings.root.innerHTML = "";
    // Create from Template
    Settings.rectSettings = rects.map((rect, idx) => {
      return cloneTemplate({rect, idx});
    });

    // Append all
    Settings.rectSettings.forEach(rectSetting => {
      Settings.root.appendChild(rectSetting.el);

      addRectSettingEvents(rectSetting, onRectChange);
    });

    // Actions
    Array.from(document.getElementsByClassName('action')).forEach(action => {
      action.addEventListener('click', () => {
        if (action.dataset.action == "play") {
          onPlay && onPlay();
        }
        else if (action.dataset.action == "pause") {
          onPause && onPause();
        }
      })
    })
  },

  // Values has been updated
  refresh(rects) {
    Settings.rectSettings.forEach(rectSetting => {
      refreshSetting({
          ...rectSetting,
        settings: rects[rectSetting.idx],
      });
    });
  },
  
  // Manually refresh settings for moving rect.
  refreshOnMove(rect) {
    // Manually redraw settings.
    document.querySelector('#rect-1 input[type="range"].x').value = parseInt(rect.x);
    document.querySelector('#rect-1 input[type="range"].y').value = parseInt(rect.y);
    document.querySelector('#rect-1 .x-value').innerHTML = parseInt(rect.x);
    document.querySelector('#rect-1 .y-value').innerHTML = parseInt(rect.y);
  },
  
  get(key){
    return Settings.settings[key];
  },

};

const cloneTemplate = ({rect, idx}) => {

  let el = Settings.TemplateSettings.cloneNode(true);

  const classes = [
    'title',
    'x', 'y', 'w', 'h', 'angle', 'speed',
    'x-value', 'y-value', 'w-value', 'h-value', 'angle-value', 'speed-value',
    'axes', 'corners'
  ];

  let rectSetting = {
      el,
      refs: Object.fromEntries(classes.map(key => [key, Array.from(el.getElementsByClassName(key))[0]])),
      idx,
      settings: rect
  }

  // Attr
  el.id = `rect-${idx}`;
  el.style=`--primary-color:rgb(${rect.rgb})`;

  // Title
  rectSetting.refs.title.innerHTML = rect.label;

  refreshSetting(rectSetting);

  return rectSetting;
}

// Refresh DOM
const toLi = arr => `<ul>${arr.map(item => `<li>${item}</li>`).join('')}</ul>`;
const renderLabel = (label, value) => `<span class="label">${label}:</span> ${fixFloat(value, 2)}`;
const refreshSetting = ({ refs, settings}, skipInputs=false) => {
  const classes = [
    'x', 'y', 'w', 'h', 'angle', 'speed',
  ];
  classes.forEach(key => {
    if (!skipInputs) {
      refs[key].value = parseInt(settings[key]) || 0;
    }
    refs[`${key}-value`].innerHTML = fixFloat(settings[key], 2);
  });
};

const addRectSettingEvents = (rectSetting, onRectChange) => {
  const classes= [
    'x', 'y', 'w', 'h', 'angle', 'speed',
  ];
  rectSetting.el.querySelectorAll('input[type="range"]').forEach(input => {
    input.addEventListener('input', () => {
      // Update rect with settings
      const rect = {
        ...rectSetting.settings,
        ...Object.fromEntries(classes.map(key => [
          key,
          parseFloat(rectSetting.refs[key].value),
        ])),
      };

      // Refresh labels (without inputs)
      refreshSetting({...rectSetting, settings: rect}, true);

      // Propagate
      onRectChange({
        idx: rectSetting.idx,
        rect,
      })
    });
  })
};

const CanvasResize = (function({canvas, onRezise, x, y}={}) {
  // resize the canvas to fill browser window dynamically
  window.addEventListener("resize", resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth * (x || 1);
    canvas.height = window.innerHeight * (y || 1);

    onRezise && onRezise();
  }
  resizeCanvas();
});


const Canvas = {

  canvas: null,
  ctx: null,

  init(canvas) {
    Canvas.canvas = canvas;
    Canvas.ctx = Canvas.canvas.getContext('2d');

    return Canvas.canvas;
  },

  clean() {
    Canvas.ctx.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
  },

  draw(rects) {
    // Get isColligind using lib function (no visual)
    const isColliding = isRectCollide(rects[0], rects[1]);

    // Visual Example:
    Canvas.clean();
    // Map in order to use Class Rect
    const rs = rects.map(rect => new Rect(rect))

    rs.forEach((rect, idx) => {
      Canvas.drawRect(rect, isColliding);
      Canvas.drawAxis(rect);
      Canvas.drawCorners(rect);
    });

      Canvas.drawProjections({rect: rs[0], onRect: rs[1]}) 
      Canvas.drawProjections({rect: rs[1], onRect: rs[0]});
  },

  drawRect(rect, isColliding) {
    Canvas.ctx.save();
    // Draw Rect
    Canvas.ctx.translate(rect.center.x, rect.center.y);
    Canvas.ctx.rotate( rect.theta );
    Canvas.ctx.fillStyle = `rgba( ${isColliding ? '255,0,0' : rect.rgb },.2)`;
    Canvas.ctx.fillRect(rect.size.x / -2, rect.size.y / -2, rect.size.x, rect.size.y);
    Canvas.ctx.restore();
  },

  drawAxis(rect) {
    const axis = rect.getAxis();
      axis.forEach(a => {
      Canvas.drawLine({
        from: a.origin.Add(a.direction.Multiply(-1000)),
        to: a.origin.Add(a.direction.Multiply(1000)),
        rgb: rect.rgb,
      });
    });
  },

  drawLine({
    from, to,
    rgb=null, rgba=null
  }) {
    Canvas.ctx.save();
    Canvas.ctx.translate(from.x, from.y);
    Canvas.ctx.beginPath();
    Canvas.ctx.strokeStyle = rgba ? `rgba(${rgba})` : `rgba(${rgb}, 1)`;
    Canvas.ctx.moveTo(0, 0);
    Canvas.ctx.lineTo(to.x - from.x, to.y - from.y);
    Canvas.ctx.stroke();
    Canvas.ctx.restore();
  },

  drawCorners(rect) {
    rect.getCorners().forEach(corner => {
      Canvas.drawPoint({...corner, rgb: rect.rgb});
    })
  },
  drawPoint({x,y, rgb}) {
    Canvas.ctx.save();
    Canvas.ctx.translate(x, y);

    Canvas.ctx.beginPath();
    Canvas.ctx.fillStyle = `rgba(${rgb},1)`;
    Canvas.ctx.arc(0, 0, 2, 0, Math.PI*2, true);
    Canvas.ctx.closePath();
    Canvas.ctx.fill();

    Canvas.ctx.restore();
  },

  drawProjections({rect, onRect}) {
    const lines = onRect.getAxis();
    const corners = rect.getCorners();

    lines.forEach((line, dimension) => {
      let futhers = {min:null, max:null};
      // Size of onRect half size on line direction
      const rectHalfSize = (dimension === 0 ? onRect.size.x : onRect.size.y) / 2;

      corners.forEach(corner => {
        const projected = corner.Project(line);
        const CP = projected.Minus(onRect.center);
        // Sign: Same directon of OnRect axis : true.
        const sign = (CP.x * line.direction.x) + (CP.y * line.direction.y) > 0;
        const signedDistance = CP.magnitude * (sign ? 1 : -1);

        if (!futhers.min || futhers.min.signedDistance > signedDistance) {
          futhers.min = {signedDistance, corner, projected};
        }
        if (!futhers.max || futhers.max.signedDistance < signedDistance) {
          futhers.max = {signedDistance, corner, projected};
        }
      });

      // Draw min/max projecteds corners
      Canvas.drawPoint({...futhers.min.projected, rgb: rect.rgb});
      Canvas.drawLine({from: futhers.min.corner, to: futhers.min.projected, rgba: `${rect.rgb},.2`});

      Canvas.drawPoint({...futhers.max.projected, rgb: rect.rgb});
      Canvas.drawLine({from: futhers.max.corner, to: futhers.max.projected, rgba: `${rect.rgb},.2`});

      // Projection collide ?

      const projectionCollide = (futhers.min.signedDistance < 0 && futhers.max.signedDistance > 0
        || Math.abs(futhers.min.signedDistance) < rectHalfSize
        || Math.abs(futhers.max.signedDistance) < rectHalfSize);

      const w = Canvas.ctx.lineWidth;
      Canvas.ctx.lineWidth = 2;
      // Draw projection line on other Rect axis
      Canvas.drawLine({
        from: futhers.min.projected,
        to: futhers.max.projected,
        rgb: projectionCollide ? '255,0,0' : rect.rgb,
      });
      Canvas.ctx.lineWidth = w;
    });


  },

};

// App 

let rects = [
  {x:200, y: 250, w:250, h:200, angle: 60, speed: -10, rgb: '50,100,225', label:"Fixed Rect"},
  {x:350, y: 100, w:50, h:125, angle: -10, rgb: '220,150,5', label:"Cursor Rect"},
];

const App = {
  runId: null,
  init() {
    let canvas = document.getElementById("canvas");
    Canvas.init(canvas);

    CanvasResize({
      canvas,
      onRezise: App.draw,
      x: .5
    });

    Settings.init({
      settings: {FPS: 60},
      rects,
      onPlay: App.play,
      onPause: App.pause,
      onRectChange: App.updateRectFromSettings,
    });

    canvas.addEventListener('mousemove', e => {
      rects[1].x = e.offsetX;
      rects[1].y = e.offsetY;
      App.draw();
      Settings.refreshOnMove(rects[1]);
    });

    App.play();
  },

  play() {
    if (!App.runId) {
      App.runId = setInterval(App.run, 1000 / Settings.get('FPS'));
    }
  },
  pause() {
    if (App.runId) {
      clearInterval(App.runId);
      App.runId = null;
    }
  },
  run() {
    rects = rects.map(rotateRect)
    Settings.refresh(rects);
    App.draw();

    // Test and log result (without any display)
    if (isRectCollide(rects[0], rects[1]))
      console.log("Both rects are colliding");
    else
      console.log("Both rects are NOT colliding");
  },

  draw() {
    Canvas.draw(rects);
  },

  updateRectFromSettings({rect, idx}) {
    rects[idx] = rect;
    App.draw();
  }
};

const rotateRect = (rect) => {
  if (rect.speed) {
    rect.angle += rect.speed / Settings.get('FPS');
  }
  rect.angle %= 360;
  return rect;
};


//--------------------------------------------------------------------------------------------------------------
const isRectCollide = (rectA, rectB) => {
  
  const rA = typeof rectA !== Rect ? new Rect(rectA) : rectA;
  const rB = typeof rectB !== Rect ? new Rect(rectB) : rectB;
  
  return isProjectionCollide({rect: rA, onRect: rB})
   && isProjectionCollide({rect: rB, onRect: rA});
};

const isProjectionCollide = ({rect, onRect}) => {
  const lines = onRect.getAxis();
  const corners = rect.getCorners();

  let isCollide = true;

  lines.forEach((line, dimension) => {
    let futhers = {min:null, max:null};
    // Size of onRect half size on line direction
    const rectHalfSize = (dimension === 0 ? onRect.size.x : onRect.size.y) / 2;
    corners.forEach(corner => {
      const projected = corner.Project(line);
      const CP = projected.Minus(onRect.center);
      // Sign: Same directon of OnRect axis : true.
      const sign = (CP.x * line.direction.x) + (CP.y * line.direction.y) > 0;
      const signedDistance = CP.magnitude * (sign ? 1 : -1);

      if (!futhers.min || futhers.min.signedDistance > signedDistance) {
        futhers.min = {signedDistance, corner, projected};
      }
      if (!futhers.max || futhers.max.signedDistance < signedDistance) {
        futhers.max = {signedDistance, corner, projected};
      }
    });

    if (!(futhers.min.signedDistance < 0 && futhers.max.signedDistance > 0
      || Math.abs(futhers.min.signedDistance) < rectHalfSize
      || Math.abs(futhers.max.signedDistance) < rectHalfSize)) {
        isCollide = false;
      }
  });
  return isCollide;
};

// Finaly run 
App.init();