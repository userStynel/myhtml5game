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

function test(elem)
{
	preselected = selected;
	selected = parseInt(elem.id.substring(5, elem.id.length));
	//elem.setAttribute('style', 'border:1px solid black');
	//alert(selected);
}

function coloring(elem)
{
	elem.setAttribute('src', arr[selected-1]);
	/*
	if(preselected != -1)
	{
		document.getElementById('tile-'+preselected.toString()).setAttribute('style', '');
	}
	*/
}


function converting(numGaro, numSero)
{
	var ans = document.getElementById("answer");
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
	for(var i = 0; i<numGaro; i++)
	{
		var row = document.createElement('div');
		row.setAttribute('style', "display:flex");
		document.getElementById('collection').appendChild(row);
		for(var j = 0; j<numSero; j++)
		{
			var piece = document.createElement('img');
			piece.src = arr[index++];
			piece.id = 'tile-'+index.toString();
			piece.setAttribute('style', 'margin-left:5px; margin-bottom:5px;');
			piece.setAttribute('onclick', 'test(this)');
			row.appendChild(piece);
		}
	}
}

function makingMap(numGaro, numSero, width, height)
{
	for(var i=0; i<numGaro; i++)
	{
		var row = document.createElement('div');
		row.setAttribute('style', "display:flex");
		document.getElementById('map').appendChild(row);
		for(var j=0; j<numSero; j++)
		{
			var cell = document.createElement('img');
			cell.id = 'cell-'+i.toString()+'-'+j.toString();
			cell.setAttribute('class', 'cells');
			cell.setAttribute('onclick', 'coloring(this)');
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