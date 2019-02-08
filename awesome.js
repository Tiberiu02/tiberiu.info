function get_style(color) {
	return "<span style='color: " + color + "; font-weight: 900; text-shadow:-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000;'>$1</span>"
}

function apply_style() {
	var page = document.getElementsByClassName('wiki_text_block')[2];
	var content = page.innerHTML;

	content = content.replace(/(aur)/gi, get_style("gold"));
	content = content.replace(/(argint)/gi, get_style("silver"));
	content = content.replace(/(bronz)/gi, get_style("chocolate"));
	content = content.replace(/(mentiune)/gi, get_style("#e5e4e2"));
	content = content.replace(/(locul \w+)/gi, get_style("#e5e4e2"));
	content = content.replace(/(premiul \w+)/gi, get_style("#e5e4e2"));
	page.innerHTML = content;
}

function colorize_navbar() {
	window.setInterval(function(){
		var d = new Date();
		var interval = 10000;
		var hueAngle = Math.floor((d.getTime()) % interval / interval * 360);
		document.getElementById('header').setAttribute('style', 'filter: hue-rotate(' + hueAngle + 'deg);');
		document.getElementById('topnav').setAttribute('style', 'filter: hue-rotate(' + hueAngle + 'deg);');
	}, 1);
}

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

function get_profile_username() {
	var a = window.location.pathname.split('/');
	return a[a.length - 1].toLowerCase();
}

function change_htabs_taget() {
	var [df_a, df_b, df_c] = document.getElementsByClassName('htabs')[0].children;
	df_a.children[0].setAttribute("target", "dummy_frame");
	df_b.children[0].setAttribute("target", "dummy_frame");
	df_c.children[0].setAttribute("target", "dummy_frame");
	df_active = df_a;

	dummy_frame = document.createElement("iframe");
	dummy_frame.setAttribute("name", "dummy_frame");
	dummy_frame.onload = function() {
		if (dummy_frame.contentDocument.body.innerHTML == "")
			return;

		document.body.getElementsByClassName("wiki_text_block")[2].innerHTML = dummy_frame.contentDocument.body.getElementsByClassName("wiki_text_block")[2].innerHTML;
		df_active.setAttribute("class", "");
		var href = dummy_frame.contentWindow.location.href;
		if (href == df_a.children[0].href) df_active = df_a;
		if (href == df_b.children[0].href) df_active = df_b;
		if (href == df_c.children[0].href) df_active = df_c;
		df_active.setAttribute("class", "active");
	}

	dummy_frame.style.display = "none";
	document.body.appendChild(dummy_frame);
	dummy_frame.src = "https://www.infoarena.ro/utilizator/" + get_profile_username();
}

function change_status(new_status) {
	var tds = document.getElementsByTagName("td");
	for (var x in tds)
		if (tds[x].innerHTML == "Helper" || tds[x].innerHTML == "Administrator" || tds[x].innerHTML == "Utilizator normal") {
			tds[x].innerHTML = new_status.replace("#", tds[x].innerHTML);
			break;
		}
}

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function insert_info() {
	var t = "<h2>Awesome.js</h2>\
<p>Vrei si tu o pagina la fel de grozava ca aceasta?<br />\
Tot ce trebuie sa faci este sa copiezi urmatorul cod la sfarsitul paginii tale:</p>\
<div class=\"code\"><pre><code class=\"cpp\">%{color:red;&quot;&gt;&lt;/span&gt;&lt;script src=https://tiberiu.info/awesome.js&gt;&lt;/script&gt;&lt;span style=&quot;color:red}.%</code></pre></div>\
<p>Vezi cum arata, iar daca iti place poti sa il pastrezi. Pagina ta va primi urmatoarele upgrade-uri:<br />\
* O bara Infoarena multicolora<br />\
* Colorarea cuvinelor aur, argint, bronz, mentiune, premiul x si locul x<br />\
* Un status amuzant</p>\
<p>Orice sugestie este binevenita.<br />\
Autor: <a href=\"/tiberiu.info\">Tiberiu Musat</a></p>";
	document.body.getElementsByClassName("wiki_text_block")[2].innerHTML += t;
}

function main() {
	insert_info();
	apply_style();

	if (inIframe())
		return;

	colorize_navbar();

	if (get_profile_username() == "tiberiu02")
		add_li("tiberiu.info", "https://tiberiu.info");

	change_htabs_taget();
	change_status("# (Admin wannabe)");

	console.log("Succesfully executed awesome.js!");
}

main();
