CanvasRenderingContext2D.prototype.drawModel= function(model, x, y, angle) {
  this.save();
  this.translate(x, y);
  if (angle !== undefined)
    this.rotate(angle);
  var i, j;
  for (j = 0; j < model.length; j ++) {
    this.beginPath();
    this.moveTo(model[j][1][0], model[j][1][1]);
    for (i = 2; i < model[j].length; i ++)
      this.lineTo(model[j][i][0], model[j][i][1]);
    this.fillStyle = model[j][0];
    this.fill();
    this.closePath();
  }
  this.restore();
}

CanvasRenderingContext2D.prototype.clear = function(color) {
  this.save();
  this.setTransform(1, 0, 0, 1, 0, 0);
  if (color === undefined)
    this.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
  else {
    this.fillStyle = color;
    this.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
  }
  this.restore();
}

CanvasRenderingContext2D.prototype.setVortex = function(x, y) {
  this.setTransform(1, 0, 0, 1, 0, 0);
  this.translate(x * this.canvas.clientWidth, y * this.canvas.clientHeight);
}

CanvasRenderingContext2D.prototype.get3DPoint = function(x, y, z, angleX, angleY) {
  var x0, y0, z0;

  x0 = Math.sqrt( x*x + z*z ) * Math.sin( Math.atan2( x, z ) + angleX );
  y0 = Math.sqrt( x0*x0 + y*y ) * Math.cos( Math.atan2( x0, y ) + angleY );
  x0 = Math.sqrt( x0*x0 + y*y ) * Math.sin( Math.atan2( x0, y ) + angleY );
  
  z0 = Math.sqrt( x*x + z*z ) * Math.cos( Math.atan2( x, z ) + angleX );

  var X, Y;
  X = ( Math.atan2( z0, x0 ) ) / Math.PI * 3000;
  Y = ( Math.atan2( y0, x0 ) ) / Math.PI * 3000;
  
  return {x:X, y:Y};
}

CanvasRenderingContext2D.prototype.line3D = function(x1, y1, z1, x2, y2, z2, angleX, angleY, p1, p2) {
  if (p1 == undefined)  
    p1 = this.get3DPoint(x1, y1, z1, angleX, angleY);
  if (p2 == undefined)  
    p2 = this.get3DPoint(x2, y2, z2, angleX, angleY);

  if (Math.abs(p1.x - p2.x) > 4 || Math.abs(p1.y - p2.y) > 4) {
    var xm = (x1 + x2) / 2;
    var ym = (y1 + y2) / 2;
    var zm = (z1 + z2) / 2;

    var pm = this.get3DPoint(xm, ym, zm, angleX, angleY)

    this.line3D(x1, y1, z1, xm, ym, zm, angleX, angleY, p1, pm);
    this.line3D(xm, ym, zm, x2, y2, z2, angleX, angleY, pm, p2);
  } else {
    this.lineTo(p2.x, p2.y);
  }
}

CanvasRenderingContext2D.prototype.draw3DModel = function(model, x, y, z, angleX, angleY) {
  if ( angleX == undefined )
    angleX = 0;
  if ( angleY == undefined )
    angleY = 0;

  this.save();
  var i, j, p;
  for (j = 0; j < model.length; j ++) {
    this.beginPath();
    p = this.get3DPoint(model[j][1][0] - x, model[j][1][1] - y, model[j][1][2] - z, angleX, angleY);
    this.moveTo(p.x, p.y);
    for (i = 2; i < model[j].length; i ++) {
      this.line3D(model[j][i - 1][0] - x, model[j][i - 1][1] - y, model[j][i - 1][2] - z, model[j][i][0] - x, model[j][i][1] - y, model[j][i][2] - z, angleX, angleY);
    }
    this.strokeStyle = model[j][0];
    this.stroke();
    this.closePath();
  }
  this.restore();
}

CanvasRenderingContext2D.prototype.drawLoadingBar = function(x, y, sx, sy, status, color, border) {
  this.save();
  this.setTransform(1, 0, 0, 1, 0, 0);
  if (color === undefined)
    color = "#FFF";
  if (border === undefined)
    border = 4;
  
  this.beginPath();
  this.rect(x + border / 2, y + border / 2, sx - border, sy - border);
  this.lineWidth = border;
  this.strokeStyle = color;
  this.stroke();
  
  this.fillStyle = color;
  this.fillRect(x + border * 1.5, y + border * 1.5, (sx - border * 3) * status, (sy - border * 3));
  
  this.restore();
}

CanvasRenderingContext2D.prototype.drawGrid = function(rx, ry, d, w, color) {
  rx = Math.floor(rx);
  ry = Math.floor(ry);
  d = Math.floor(d);
  w = Math.floor(w);
  
  this.save();
  this.setTransform(1, 0, 0, 1, 0, 0);
  var width = this.canvas.clientWidth;
  var height = this.canvas.clientHeight;
  rx %= d;
  ry %= d;
  var x, y;
  this.beginPath();
  for (x = rx; x <= width; x += d) {
    this.moveTo(x, 0);
    this.lineTo(x, height);
  }
  for (y = ry; y <= height; y += d) {
    this.moveTo(0, y);
    this.lineTo(width, y);
  }
  this.strokeStyle = color;
  this.strokeWidth = w;
  this.stroke();
  this.restore();
}
