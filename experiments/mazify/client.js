var canvas = document.getElementById("maze");
var ctx = canvas.getContext("2d");

var cellSize;
var mSize;
var offset;

var mX;
var mY;

var size;
var maze;

var isPlaying;

var mazeDiff = 0;
var mazeType = 0;

function drawMaze() {
  size = [10, 25, 50][mazeDiff];
	document.getElementById("difficulty").innerHTML = ["n easy", " medium", " hard"][mazeDiff];

	maze = Maze(size, size, mazeType);
	
  canvas.width = canvas.height = 502 + size;

	ctx.drawMaze(size, size, maze, 500 / size);

	cellSize = 500 / size + 1;
	offset = Math.floor(cellSize * 0.8);
	mSize = cellSize - 2 * offset + 1;

	isPlaying = false;
	document.getElementById("controls").style.display = "none";
	document.getElementById("playButton").style.display = "block";
}

function play() {
	isPlaying = true;
	
	ctx.fillStyle = "green";
	ctx.fillRect(offset, offset, mSize, mSize);

	mX = mY = 0;

	document.getElementById("controls").style.display = "block";
	document.getElementById("playButton").style.display = "none";
}

$(document).keyup(function(e) {
  if (37 <= e.keyCode && e.keyCode <= 40)
		move([[-1, 0], [0, -1], [1, 0], [0, 1]][e.keyCode - 37]);
});

function move(d)
{
	if (!isPlaying)
		return;

	var dX = d[0];
	var dY = d[1];

	var newX = mX + dX;
	var newY = mY + dY;

	if (newX < 0 || size <= newX || newY < 0 || size <= newY)
		return;

	if (dX == 1 && dY == 0 && maze[newX][newY][1]
	|| dX == 0 && dY == 1 && maze[newX][newY][0]
	|| dX == -1 && dY == 0 && maze[mX][mY][1]
	|| dX == 0 && dY == -1 && maze[mX][mY][0])
		return;


	ctx.fillStyle = "white";
	ctx.fillRect(cellSize * mX + offset, cellSize * mY + offset, mSize, mSize);
	
	mX = newX;
	mY = newY;

	ctx.fillStyle = "green";
	ctx.fillRect(cellSize * mX + offset, cellSize * mY + offset, mSize, mSize);
}
