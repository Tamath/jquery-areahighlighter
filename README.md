#jquery-areahighlighter

##Overview
Plugin allows to create and manipulate custom highlighted areas on different

##Requirements
Area Highlighter needs (jQuery UI Draggable)[http://jqueryui.com/draggable/] to drag areas around and (jQuery UI Resizable)[http://jqueryui.com/resizable/] to resize them.

##Basic
To initilize highlighter, just pass list of areas to it

```
var highlighter = $('.container').areahighlighter({
	areas: [
		{ id:1, x:10, y:10, radius:5, caption:'example' },
		{ id:'string-id', x:100, y:150, radius:20, caption:'string id example' },
		{ id:3, x:200, y:160, radius:50, caption:'not draggable example', draggable: false },
		{ id:4, x:120, y:100, radius:30, caption:'not resizable example', resizable: false },
	]
});
```
##Strctures
* area
```
  {
    id: <id>,
    x: <x-coordinate of center>,
    y: <y-coordinate of center>,
    radius: <circle radius>,
    caption: <title text>,
    draggable: <allow dragging of area>,
    resizable: <allow resizing>,
    visible: <show area>
  }
```
* areas
```
  [ <area1>, <area2>, ... ]
```

##Methods
* <area> .areahighlighter("getArea", areaId)<br>
  Returns one area
* <areas> .areahighlighter("getAreas")<br>
  Returns list of areas
* .areahighlighter("showArea", areaId)<br>
  Shows one area
* .areahighlighter("showAreas")<br>
  Shows all areas
* .areahighlighter("hideArea", areaId)<br>
  Hides one area
* .areahighlighter("hideAreas")<br>
  Hides all areas
* .areahighlighter("addArea", area)<br>
  Adds area to object
* .areahighlighter("removeArea", areaId)<br>
  Removes area from object and internal list
* .areahighlighter("updateArea", area)<br>
  Updates area properties. Possible to update id too
