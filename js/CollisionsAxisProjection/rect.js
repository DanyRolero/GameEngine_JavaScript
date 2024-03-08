class Rect {

  // 0 is Horizontal to right (following OX) - Rotate clockwise
  // theta (rad) or angle (deg)
  constructor({ x=0, y=0, width=10, height=10, theta=null, angle=0, rgb='0,0,0' }) {
    let cx = x + width >> 1;
    let cy = y + height >> 1;

    this.center = new Vector({cx, cy});
    this.size = new Vector({x:width,y:height});
    this.theta = theta || this.toRadians(angle);
    this.rgb = rgb;
  }

  //----------------------------------------------------------------------------------------------------
  getAxis() {
    const OX = new Vector({x:1, y:0});
    const OY = new Vector({x:0, y:1});
    const RX = OX.Rotate2(this.angle);
    const RY = OY.Rotate2(this.angle);
    return [
      new Line({...this.center, dx: RX.x, dy: RX.y}),
      new Line({...this.center, dx: RY.x, dy: RY.y}),
    ];
  }

  //----------------------------------------------------------------------------------------------------
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

  toRadians(degrees) {
    return degrees * Math.PI / 180;
  }
}