function switchingTile(keyCode)
{
	var number = keyCode-48;
	if(number>=1 && number<=9)
		number = 9*(now_page-1) + number;
		selected = number-1;
}

function loading(csv)
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

function getCoord(ID, arr)
{
	arr[0] = parseInt(ID.split("-")[1]);
	arr[1] = parseInt(ID.split("-")[2]);
}


function cutImageUp(img, arr, cutWidth, cutHeight)
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



function coloring(event)
{
	if(selected != -1)
		event.target.setAttribute('src', arr[selected]);
	else
		event.target.removeAttribute('src');
}

function drawingRECT(sx, sy, dx, dy)
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
			document.getElementById('cell-'+j.toString()+'-'+i.toString()).setAttribute('src', arr[selected]);
		}
	}
}

function converting(numGaro, numSero)
{
	var ans = document.getElementById("answer");
	ans.innerHTML = "";
	for(var i=0; i<numGaro; i++)
	{
		for(var j=0; j<numSero; j++)
		{
			var cell = document.getElementById('cell-'+i.toString()+'-'+j.toString());
			if(cell.src == "")
				ans.innerHTML += "-1";
			else
				ans.innerHTML += arr.indexOf(cell.src).toString();
			if(j<numSero-1)
				ans.innerHTML += ", ";
		}
		ans.innerHTML += "<br>";
	}
}

function makingTileSet(numGaro, numSero, arr)
{
	var index = 0;
	var page, row;
	for(var i = 0; i<numGaro; i++)
	{
		for(var j = 0; j<numSero; j++)
		{
			if(index%9==0)
			{
				page = document.createElement('div');
				page.setAttribute('id', 'tilePage-'+Math.floor(index/9).toString());
				document.getElementById('collection').appendChild(page);
				tilePageList.push(page);
			}
			if(index%3==0)
			{
				row = document.createElement('div');
				row.setAttribute('style', "display:flex");
				page.appendChild(row);
			}
			var piece = document.createElement('img');
			piece.src = arr[index];
			piece.id = 'tile-'+index.toString();
			piece.setAttribute('style', 'margin-left:5px; margin-bottom:5px;');
			piece.addEventListener('click', function(event){selected = parseInt(event.target.id.substring(5, event.target.id.length));});
			row.appendChild(piece);
			index++;
		}
	}
	for(var i=1; i<tilePageList.length; i++)
		tilePageList[i].setAttribute('style', 'display: none;');
	document.getElementById('pageteller').innerHTML = now_page.toString() + ' / ' + tilePageList.length.toString();
}

function switchingPage(prevornext)
{
	tilePageList[now_page-1].setAttribute('style', 'display: none;');
	now_page += prevornext;
	if(now_page == 0) now_page = tilePageList.length;
	else if(now_page > tilePageList.length) now_page = 1;
	tilePageList[now_page-1].removeAttribute('style');
	document.getElementById("pageteller").innerHTML = now_page.toString() + ' / ' + tilePageList.length.toString();
		
}


function makingMap(numGaro, numSero, width, height)
{
	for(var i=0; i<numGaro; i++)
	{
		var row = document.createElement('div');
		row.setAttribute('style', "display:flex");
		row.setAttribute('class', "maprow");
		document.getElementById('map').appendChild(row);
		for(var j=0; j<numSero; j++)
		{
			var cell = document.createElement('img');
			cell.id = 'cell-'+i.toString()+'-'+j.toString();
			cell.setAttribute('class', 'cells');
			cell.setAttribute('alt', '');
			//cell.setAttribute('draggable', 'true');
			cell.addEventListener('click', coloring);
			cell.addEventListener('dragstart', function(event){console.log('dragstart @'+event.target.id); getCoord(event.target.id, src);});
			cell.addEventListener('dragover', function(event){event.preventDefault()});
			cell.addEventListener('drop', function(event){console.log('drop @'+event.target.id); getCoord(event.target.id, dst); drawingRECT(src[0], src[1], dst[0], dst[1]);});
			row.appendChild(cell);
		}
	}
	$('.cells').css({
    "background-color": "white",
    "width": width.toString()+"px",
	"height": height.toString()+"px",
	"border": "1px black solid"
	});
}

function switchingTileSize(new_width, new_height)
{
	sizeWidth = new_width;
	sizeHeight = new_height;
	document.getElementById('collection').removeChild();
	makingTileSet(image.height/sizeHeight, image.width/sizeWidth, arr);
}


function switchingMapSize(new_Garo, new_Sero)
{
	if(new_Garo > numGaro && new_Sero > numSero)
	{
		var mr = document.getElementsByClassName("maprow");
		for(var i=0; i<numGaro; i++)
		{
			for(var j=numSero; j<new_Sero; j++)
			{
				var cell = document.createElement('img');
				cell.id = 'cell-'+i.toString()+'-'+j.toString();
				cell.setAttribute('class', 'cells');
				cell.setAttribute('alt', '');
				cell.addEventListener('click', coloring);
				cell.addEventListener('dragstart', function(event){console.log('dragstart @'+event.target.id); getCoord(event.target.id, src);});
				cell.addEventListener('dragover', function(event){event.preventDefault()});
				cell.addEventListener('drop', function(event){console.log('drop @'+event.target.id); getCoord(event.target.id, dst); drawingRECT(src[0], src[1], dst[0], dst[1]);});
				mr[i].appendChild(cell);
			}
		}
		for(var i=numGaro; i<new_Garo; i++)
		{
			var row = document.createElement('div');
			row.setAttribute('style', "display:flex");
			row.setAttribute('class', "maprow");
			document.getElementById('map').appendChild(row);
			for( var j=0; j<new_Sero; j++)
			{
				var cell = document.createElement('img');
				cell.id = 'cell-'+i.toString()+'-'+j.toString();
				cell.setAttribute('class', 'cells');
				cell.setAttribute('alt', '');
				cell.addEventListener('click', coloring);
				cell.addEventListener('dragstart', function(event){console.log('dragstart @'+event.target.id); getCoord(event.target.id, src);});
				cell.addEventListener('dragover', function(event){event.preventDefault()});
				cell.addEventListener('drop', function(event){console.log('drop @'+event.target.id); getCoord(event.target.id, dst); drawingRECT(src[0], src[1], dst[0], dst[1]);});
				row.appendChild(cell);
			}
		}
	}
	else if(new_Garo <= numGaro && new_Sero <= numSero)
	{
		for(var i=0; i<new_Garo; i++)
		{
			for(var j=new_Sero; j<numSero; j++)
			{
				var cell = document.getElementById('cell-'+i.toString()+'-'+j.toString());
				cell.remove();
			}
		}
		for(var i=new_Garo; i<numGaro; i++)
		{
			for(var j=0; j<numSero; j++)
			{
				var cell = document.getElementById('cell-'+i.toString()+'-'+j.toString());
				cell.remove();
			}
		}
	}
	/*
	else if(new_Garo > numGaro && new_Sero <= numSero)
	{
		alert("love yukika");
	 	for(var i=numGaro; i<new_Garo; i++)
		{
			
		}
	}
	else if(new_Garo <= numGaro && new_Sero > numSero)
	{
		alert("test");
	}
	*/
	$('.cells').css({
    "background-color": "white",
    "width": sizeWidth.toString()+"px",
	"height": sizeHeight.toString()+"px",
	"border": "1px black solid"
	});
	numSero = new_Sero;
	numGaro = new_Garo;
}