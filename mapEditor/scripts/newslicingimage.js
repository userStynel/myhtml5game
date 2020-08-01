function getCoord(obj, arr) // 클릭한 DOM 객체를 가져와서 좌표값을 추출해서 위치 배열에 넣음
{
	if(obj == '[object HTMLImageElement]')
		obj = obj.parentNode;
	arr[X] = parseInt(obj.id.split("-")[1]);
	arr[Y] = parseInt(obj.id.split("-")[2]);
}

function switchingTile(keyCode) // 키보드를 누르면 현재 선택한 타일을 변경
{
	var number = keyCode-48;
	if(number>=1 && number<=9)
		number = 9*(now_page-1) + number;
		selected = number-1;
}

function showGrid(value) // 맵의 격자를 켜거나 끔
{
	if(value)
	{
		$('.cells').css({
    	"background-color": "white",
    	"width": sizeWidth.toString()+"px",
		"height": sizeHeight.toString()+"px",
		"border": "1px black solid"
		});
	}
	else
	{
		$('.cells').css({
    	"background-color": "white",
    	"width": sizeWidth.toString()+"px",
		"height": sizeHeight.toString()+"px",
		"border": "0px black solid"
		});
	}
}

function loading(csv) // csv 파일을 불러와 맵에 적용시킴
{
	var lines = csv.split("\n");
	for(var i=0; i<lines.length; i++)
	{
		for(var j=0; j<lines[i].split(",").length; j++)
		{
			var v = parseInt(lines[i].split(",")[j]);
			if(v!=-1)
				document.getElementById("cell-"+i.toString()+'-'+j.toString()).src = arr[v];
		}
	}
}


function cutImageUp(img, arr, cutWidth, cutHeight) // 타일맵을 타일로 조각해서 저장함
{
	for(var i=0; i<img.height/cutHeight; i++)
	{
		for(var j=0; j<img.width/cutWidth; j++)
		{
			var canvas = document.createElement('canvas');
			canvas.width = cutWidth;
			canvas.height = cutHeight;
			var context = canvas.getContext('2d');
		context.drawImage(img, j*cutWidth, i*cutHeight, cutWidth, cutHeight, 0, 0, canvas.width, canvas.height);
			arr.push(canvas.toDataURL());
		}
	}
}



function coloring(obj) // 맵의 빈 칸에 타일을 채움
{
	var target = obj;
	if(obj == '[object HTMLImageElement]')
		target = event.target.parentNode;
	if(target.querySelector('.tile') == undefined)
	{
		var img = document.createElement('img');
		img.setAttribute('class', 'tile');
		target.appendChild(img);
	}
	target = target.querySelector('.tile');
	if(selectedObject[1] == -1)
		target.remove();
	else
		target.src = tileList[selectedObject[selectedObject[0]]];
}

function drawingRECT(sx, sy, dx, dy) // 드래그 한 영역만큼 타일을 채움
{
	if(sx > dx)
	{
		var temp;
		temp = sx;
		sx = dx;
		dx = temp;
	}
	if(sy > dy)
	{
		var temp;
		temp = sy;
		sy = dy;
		dy = temp;
	}
	for(var i=sy; i<=dy; i++)
	{
		for(var j=sx; j<=dx; j++)
		{
			var cell = document.getElementById('cell-'+j.toString()+'-'+i.toString());
			coloring(cell);
		}
	}
}

function converting(numGaro, numSero) // 맵을 csv 형식으로 변환함
{
	var ans = document.getElementById("csvResult");
	ans.innerHTML = "";
	for(var i=0; i<numSero; i++)
	{
		for(var j=0; j<numGaro; j++)
		{
			var cell = document.getElementById('cell-'+j.toString()+'-'+i.toString());
			cell = cell.querySelector('.tile');
			if(cell == undefined || cell.src == "")
				ans.innerHTML += "-1";
			else
				ans.innerHTML += tileList.indexOf(cell.src).toString();
			if(j<numSero-1)
				ans.innerHTML += ", ";
		}
		ans.innerHTML += "\n";
	}
}

function selectedtile(newselect) // 타일을 클릭해서 바꿈
{
	if(event.target == '[object HTMLDivElement]')
		newselect = parseInt(event.target.id.split("-")[1]);
	if(event.target == '[object HTMLImageElement]')
		newselect = parseInt(event.target.parentNode.id.split("-")[1]);
	if(selectedObject[1] != -1)
	{
		document.getElementById('tile-'+selectedObject[1].toString()).removeAttribute('class');
		document.getElementById('tile-'+selectedObject[1].toString()).setAttribute('class', 'object-wrapper notselected');
	}
	if(selectedObject[1] != newselect)
	{
		selectedObject[1] = newselect;
		document.getElementById('tile-'+selectedObject[1].toString()).removeAttribute('class');
		document.getElementById('tile-'+selectedObject[1].toString()).setAttribute('class', 'object-wrapper selected');
	}
	else
		selectedObject[1] = -1;
}


function makingTileSet() // 조각 낸 타일을 화면에 표시함
{
	var page, line;
	for(var i=0; i<tileList.length; i++)
	{
		if(i%10 == 0)
		{
			page = document.createElement('div');
			if(i==0)
				page.setAttribute('class', 'page selected');
			else
				page.setAttribute('class', 'page notselected');
			tilePageList.push(page);
			document.getElementById('tile-collector').appendChild(page);
		}
		if(i%5 == 0)
		{
			line = document.createElement("div");
			line.setAttribute('class', 'line');
			page.appendChild(line);
		}
		var tile = document.createElement('div');
		tile.setAttribute('id', 'tile-'+i.toString());
		tile.addEventListener('click', function(event){selectedtile(event)});
		var img = document.createElement('img');
		img.src = tileList[i];
		tile.setAttribute('class', 'object-wrapper notselected');
		tile.appendChild(img);
		line.appendChild(tile);
	}
	var left_btn, right_btn, pageteller;
	var footer;
	left_btn = document.createElement('img');
	left_btn.setAttribute('src', './mapEditor/icon/left_btn.png');
	left_btn.setAttribute('style', 'width:16px; height:16px');
	right_btn = document.createElement('img');
	right_btn.setAttribute('src', './mapEditor/icon/right_btn.png');
	right_btn.setAttribute('style', 'width:16px; height:16px');
	pageteller = document.createElement('p');
	pageteller.innerHTML = '[ ' + now_page.toString() + ' / ' + tilePageList.length.toString() + ' ] ';
	pageteller.setAttribute('style', "font-size: 15px; font-family: 'Recursive', sans-serif;");
	footer = document.createElement('div');
	footer.setAttribute('class', 'line');
	document.getElementById('tile-collector').appendChild(footer);
	footer.appendChild(left_btn);
	footer.appendChild(pageteller);
	footer.appendChild(right_btn);
	document.getElementById('tile-collector').appendChild(document.createElement('hr'));	
}


function switchingPage(prevornext) // 타일 페이지를 바꿈
{
	tilePageList[now_page-1].setAttribute('style', 'display: none;');
	now_page += prevornext;
	if(now_page == 0) now_page = tilePageList.length;
	else if(now_page > tilePageList.length) now_page = 1;
	tilePageList[now_page-1].removeAttribute('style');
	document.getElementById("pageteller").innerHTML = now_page.toString() + ' / ' + tilePageList.length.toString();
		
}


function makingMap(numGaro, numSero, width, height) // 맵을 바꿈
{
	for(var i=0; i<numGaro; i++)
	{
		var line = document.createElement("div");
		line.setAttribute('class', 'line');
		document.getElementById('map').appendChild(line);
		for(var j=0; j<numSero; j++)
		{
			var cell = document.createElement('div');
			cell.setAttribute('id', 'cell-'+j.toString()+'-'+i.toString());
			cell.setAttribute('class', 'cells');
			cell.addEventListener('click', function(event){coloring(event.target);})
			cell.addEventListener('dragstart', function(event){getCoord(event.target, src);});
			cell.addEventListener('dragover', function(event){event.preventDefault()});
			cell.addEventListener('drop', function(event){getCoord(event.target, dst); drawingRECT(src[X], src[Y], dst[X], dst[Y])});
			line.appendChild(cell);
		}
	}
	$('.cells').css({
    "background-color": "white",
    "width": width.toString()+"px",
	"height": height.toString()+"px",
	"border": "1px black solid"
	});
}
