/**
 * jQuery Area Highlighter plugin
 * version: 1.0.0
 * usage: 
 * $('.element-with-highlights').areahighlighter({
 *     areas : [
 *         { id: 1, x: 10, y: 20, radius: 15, caption: "some caption", visible: true },
 *         ...
 *     ]
 * });
 */
(function ($){
	var target = $();
	var areas = {};
	
	/**
	 * Main function. Possible actions are: getAreas, showAreas, showArea, hideAreas, hideArea, addArea
	 */
	$.fn.areahighlighter = function (action, area) {
		if ( typeof action === 'object' ) {
			target = this;
			var options = $.fn.extend({
				areas : []
			}, action);
			for ( var i=0; i<options.areas.length; i++ ) {
				addArea(options.areas[i].id, options.areas[i].x, options.areas[i].y, options.areas[i].radius, options.areas[i].caption, options.areas[i].visible);
			}
		}else{
			switch ( action ) {
				case 'getAreas':
					return areas;
					break;
				case 'showAreas':
					showAreas();
					break;
				case 'showArea':
					showArea(area);
					break;
				case 'hideAreas':
					hideAreas();
					break;
				case 'hideArea':
					hideArea(area);
					break;
				case 'addArea':
					addArea(area.id, area.x, area.y, area.radius, area.caption, area.visible);
					break;
			}
		}
		return this;
	};
	
	/**
	 * Internal function. Adds event handlers etc to area helper element
	 */
	function handleArea(area) {
		area.helper.draggable({
			stop : function (event, ui) {
				area.top = ui.position.top+area.radius/2;
				area.left = ui.position.left+area.radius/2;
			},
			containment: "parent"
		});
	}
	
	/**
	 * Adds area to target
	 */
	function addArea(id, x, y, radius, caption, visible) {
		var area = {
			helper: $('<div title="'+caption+'" class="areahighlighter-helper" style="border-radius:'+radius+'px;top:'+(x-radius/2)+'px;left:'+(y-radius/2)+'px;width:'+(radius*2)+'px;height:'+(radius*2)+'px;display:'+(visible?'block':'none')+';"></div>').appendTo(target),
			top: x,
			left: y,
			radius : radius,
			caption : caption,
			visible : visible
		};
		areas[id] = area;
		handleArea(area);
	}
	
	/**
	 * Show one area
	 */
	function showArea(areaId) {
		if ( areas[areaId] ) {
			areas[areaId].visible = true;
			areas[areaId].helper.show();
		}
	}
	
	/**
	 * Show all areas
	 */
	function showAreas() {
		for ( var id in areas ) {
			showArea(id);
		}
	}
	
	/**
	 * Hide one area
	 */
	function hideArea(areaId) {
		if ( areas[areaId] ) {
			areas[areaId].visible = false;
			areas[areaId].helper.hide();
		}
	}
	
	/**
	 * Hide all areas
	 */
	function hideAreas() {
		for ( var id in areas ) {
			hideArea(id);
		}
	}
}(jQuery));