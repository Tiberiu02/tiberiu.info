function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

function dfs(x, y, maze, n, m) {
	var d = [[-1, 0], [0, 1], [1, 0], [0, -1]];
	shuffle(d);

	for (var i = 0; i < 4; i ++)
		if (x + 2 * d[i][0] > 0 && x + 2 * d[i][0] < n && y + 2 * d[i][1] > 0 && y + 2 * d[i][1] < m
		&& maze[x + 2 * d[i][0]][y + 2 * d[i][1]] == undefined) {
			maze[x + d[i][0]][y + d[i][1]] = true;
			maze[x + 2 * d[i][0]][y + 2 * d[i][1]] = true;
			dfs(x + 2 * d[i][0], y + 2 * d[i][1], maze, n, m);
		} 
}

function bfs(x, y, maze, n, m) {
	var queue = [];
	queue.push([n - 1, m - 1]);

	while (queue.length) {
		var pos = Math.min(queue.length - 1, Math.floor(queue.length + Math.log(queue.length + 1) - Math.log(Math.random() * queue.length + 1) - 1));

		var t = queue[pos];
		queue.splice(pos, 1);

		var x = t[0];
		var y = t[1];

		if (maze[x][y] != undefined)
			continue;
		maze[x][y] = true;
		
		var oldX = t[2];
		var oldY = t[3];
		if (oldX != undefined && oldY != undefined)
			maze[oldX][oldY] = true;

		var d = [[-1, 0], [0, 1], [1, 0], [0, -1]];
		shuffle(d);

		for (var i = 0; i < 4; i ++)
			if (x + 2 * d[i][0] > 0 && x + 2 * d[i][0] < n && y + 2 * d[i][1] > 0 && y + 2 * d[i][1] < m
			&& maze[x + 2 * d[i][0]][y + 2 * d[i][1]] != true) {
				queue.push([x + 2 * d[i][0], y + 2 * d[i][1], x + d[i][0], y + d[i][1]]);
			} 
	}
}

function Maze(n, m, type) {
	var f = new Array(2 * n + 1);
	for (var i = 0; i < 2 * n + 1; i ++) {
		f[i] = new Array(2 * m + 1);
	}


	if (type == 0) {
		f[2 * n - 1][2 * m - 1] = true;
		dfs(n * 2 - 1, m * 2 - 1, f, n * 2, m * 2);
	} else {
		bfs(1, 1, f, n * 2, m * 2);
	}

	f[0][1] = f[n * 2][m * 2 - 1] = true;


	var maze = [];
	for (var i = 0; i <= 2 * n; i += 2) {
		maze.push([]);
		for (var j = 0; j <= 2 * m; j += 2)
			maze[i / 2].push([i < n * 2 && f[i + 1][j] == undefined, j < m * 2 && f[i][j + 1] == undefined]);
	}

	return maze;
}

CanvasRenderingContext2D.prototype.drawMaze = function(n, m, maze, width)
{
	this.beginPath();
	for (var i = 0; i <= n; i ++)
		for (var j = 0; j <= m; j ++) {
			if (maze[i][j][0]) {
				this.moveTo(1+i * (width + 1), 1+j * (width + 1));
				this.lineTo(1+(i + 1) * (width + 1), 1+j * (width + 1));
			}
			if (maze[i][j][1]) {
				this.moveTo(1+i * (width + 1), 1+j * (width + 1));
				this.lineTo(1+i * (width + 1), 1+(j + 1) * (width + 1));
			}
		}
	this.lineWidth = 1;
	this.stroke();
}

