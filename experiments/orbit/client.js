var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");

updateCanvasSize();

var x1 = 0, y1 = 0, z1 = 0;
var vx1 = -10 / 27.0, vy1 = -80 / 27.0, vz1 = 0;
var rad1 = 3;
var m1 = 27;

var x2 = 0, y2 = 0, z2 = 30;
var vx2 = 10, vy2 = 80, vz2 = 0;
var rad2 = 1;
var m2 = 1;

var k = 400;

var cx = -100, cy = 0, cz = 0;
var ax = 0, ay = 0;

var angle = 0;

var spt = 0.001;

var up = 0, dn = 0;

function physics() {
	if (up) {
		angle += 20 * spt;
		setAngle(angle);
		return;
	}
	if (dn) {
		angle -= 20 * spt;
		setAngle(angle);
		return;
	}
	
	x1 += vx1 * spt;
	y1 += vy1 * spt;
	z1 += vz1 * spt;
	
	x2 += vx2 * spt;
	y2 += vy2 * spt;
	z2 += vz2 * spt;
	
	var dx = x2 - x1;
	var dy = y2 - y1;
	var dz = z2 - z1;
	var r = Math.sqrt(dx * dx + dy * dy + dz * dz);
	dx /= r, dy /= r, dz /= r;
	
	var f = k * ( m1 + m2 ) / r;
	
	vx1 += spt * dx * f / m1;
	vy1 += spt * dy * f / m1;
	vz1 += spt * dz * f / m1;
	
	vx2 -= spt * dx * f / m2;
	vy2 -= spt * dy * f / m2;
	vz2 -= spt * dz * f / m2;
	
}

function setAngle(alpha) {
	cx = -100 * Math.cos(alpha);
	cy = 100 * Math.sin(alpha);
	ay = -alpha;
}

window.setInterval(physics, 1);

function render() {
	ctx.clear();
	ctx.sphere(x1 - cx, y1 - cy, z1 - cz, rad1, ax, ay);
	ctx.sphere(x2 - cx, y2 - cy, z2 - cz, rad2, ax, ay);
	ctx.beginPath();
	//ctx.line3D(x1 - cx, y1 - cy, z1 - cz, x2 - cx, y2 - cy, z2 - cz, ax, ay);
	ctx.stroke();
	ctx.beginPath();
	ctx.line3D(20 - cx, 0 - cy, 20 - cz, 20 - cx, 0 - cy, -20 - cz, ax, ay);
	ctx.line3D(20 - cx, 0 - cy, -20 - cz, -20 - cx, 0 - cy, -20 - cz, ax, ay);
	ctx.line3D(-20 - cx, 0 - cy, -20 - cz, -20 - cx, 0 - cy, 20 - cz, ax, ay);
	ctx.line3D(-20 - cx, 0 - cy, 20 - cz, 20 - cx, 0 - cy, 20 - cz, ax, ay);
	//ctx.line3D(-20 - cx, 0 - cy, -20 - cz, 20 - cx, 0 - cy, 20 - cz, ax, ay);
	//ctx.line3D(20 - cx, 0 - cy, -20 - cz, -20 - cx, 0 - cy, 20 - cz, ax, ay);
	ctx.stroke();
	window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);


function updateCanvasSize() { // Is called when the window is resized
	canvas.width = window.innerWidth - 30;
	canvas.height = window.innerHeight - 30;
	ctx.setVortex(0.5, 0.5);
}

function clickStart(ev) {
	if (ev.which == 1)
		up = 1;
	else
		dn = 1;
}

function clickStop(ev) {
	if (ev.which == 1)
		up = 0;
	else
		dn = 0;
}

canvas.addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
    return false;
}, false);