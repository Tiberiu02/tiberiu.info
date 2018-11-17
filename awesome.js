function get_style(color) {
	return "<span style='color: " + color + "; font-weight: 900; text-shadow:-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000;'>$1</span>"
}

var page = document.getElementsByClassName('wiki_text_block')[2];
var content = page.innerHTML;

content = content.replace(/(aur)/gi, get_style("gold"));
content = content.replace(/(argint)/gi, get_style("silver"));
content = content.replace(/(bronz)/gi, get_style("chocolate"));
content = content.replace(/(locul \w+)/gi, get_style("#e5e4e2"));
page.innerHTML = content;

window.setInterval(function(){
	var d = new Date();
	var interval = 10000;
	var hueAngle = Math.floor((d.getTime()) % interval / interval * 360);
	document.getElementById('header').setAttribute('style', 'filter: hue-rotate(' + hueAngle + 'deg);');
	document.getElementById('topnav').setAttribute('style', 'filter: hue-rotate(' + hueAngle + 'deg);');
}, 1);

function add_li(txt, lnk) {
	var htabs = document.getElementsByClassName('htabs')[0];
	var li = document.createElement('li');
	li.setAttribute('style', 'padding: 0px 0px 0px 5px;');
	var n = document.createElement('strong');
	n.setAttribute('style', 'color: red;');
	n.appendChild(document.createTextNode('New! '));
	var a = document.createElement('a');
	a.appendChild(n);
	a.appendChild(document.createTextNode(txt));
	a.setAttribute('href', lnk);
	a.setAttribute('target', '_blank');
	
	li.appendChild(a);
	htabs.appendChild(li);
}

if (window.location.pathname == "/utilizator/tiberiu02")
	add_li("tiberiu.info", "https://tiberiu.info");
add_li("Vreau si eu!", "https://tiberiu.info/join.txt");

var [a, b, c] = document.getElementsByClassName('htabs')[0].children;
a.children[0].setAttribute("target", "awframe");
b.children[0].setAttribute("target", "awframe");
c.children[0].setAttribute("target", "awframe");
var active = a;

var iframe = document.createElement("iframe");
iframe.setAttribute("name", "awframe");
iframe.onload = function() {
	document.body.getElementsByClassName("wiki_text_block")[2].innerHTML = iframe.contentDocument.body.getElementsByClassName("wiki_text_block")[2].innerHTML;
	active.setAttribute("class", "");
	var href = iframe.contentWindow.location.href;
	if (href == a.children[0].href) active = a;
	if (href == b.children[0].href) active = b;
	if (href == c.children[0].href) active = c;
	active.setAttribute("class", "active");
}

iframe.style.display = "none";
document.body.appendChild(iframe);
iframe.src = "https://www.infoarena.ro/utilizator/Tiberiu02";

var tds = document.getElementsByTagName("td");
for (var x in tds)
	if (tds[x].innerHTML == "Helper") {
		tds[x].innerHTML = "Helper (Admin wannabe)";
		break;
	}
