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
	 * Main function. Possible actions are:
     * getAreas, showAreas, showArea, hideAreas,
     * hideArea, addArea, removeArea, updateArea
	 */
	$.fn.areahighlighter = function (action, area, data) {
		if ( typeof action === 'object' ) {
			target = this;
			var options = $.fn.extend({
				areas : []
			}, action);
			for ( var i=0; i<options.areas.length; i++ ) {
				addArea(options.areas[i]);
			}
		}else{
			switch ( action ) {
                case 'getArea':
                    if ( areas[area] ) {
                        return areas[area];
                    }
                    break;
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
					addArea(area);
					break;
                case 'removeArea':
                    removeArea(area);
                    break;
                case 'updateArea':
                    updateArea(area, data);
                    break;
			}
		}
		return this;
	};
	
	/**
	 * Internal function. Adds event handlers etc to area helper element
	 */
	function handleArea(area) {
        if ( area.draggable==true && area.helper.is('.ui-draggable')==false ) {
            area.helper.draggable({
                stop : function (event, ui) {
                    area.y = ui.position.top+area.radius;
                    area.x = ui.position.left+area.radius;
                },
                containment: "parent"
            });
        } else if( area.draggable==false && area.helper.is('.ui-draggable')==true ) {
            area.helper.draggable('destroy');
        }
        if ( area.resizable==true && area.helper.is('.ui-resizable')==false ) {
            area.helper.resizable({
                handles: 'all',
                aspectRatio: true,
                resize: function (event, ui) {
                    area.helper.css('border-radius', Math.ceil(ui.size.width/2));
                },
                stop: function (event, ui) {
                    area.radius = Math.ceil(ui.size.width/2);
                }
            });
        } else if( area.resizable==false && area.helper.is('.ui-resizable')==true ) {
            area.helper.resizable('destroy');
        }
	}
	
	/**
	 * Adds area to target
     *
     * @param data
	 */
	function addArea(data) {
        var area = $.fn.extend({}, {
            id: data.length,
            x: 0,
            y: 0,
            radius: 10,
            caption: '',
            visible: true,
            draggable: true,
            resizable: true
        }, data);
        area.helper =
            $('<div title="'+area.caption+'" class="areahighlighter-helper" style="border-radius:'+area.radius+'px;left:'+(area.x-area.radius)+'px;top:'+(area.y-area.radius)+'px;width:'+(area.radius*2)+'px;height:'+(area.radius*2)+'px;display:'+(area.visible?'block':'none')+';"></div>')
            .appendTo(target);
		areas[area.id] = area;
		handleArea(area);
	}
	
	/**
	 * Show one area
     *
     * @param areaId
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
     *
     * @param areaId
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

    /**
     * Removes area helper and data
     *
     * @param areaId
     */
    function removeArea(areaId) {
        if ( areas[areaId] ) {
            areas[areaId].helper.remove();
            delete areas[areaId];
        }
    }

    /**
     * Updates area data
     *
     * @param areaId
     * @param data
     */
    function updateArea(areaId, data) {
        if ( areas[areaId] ) {
            var properties = ['caption','x','y','radius','draggable'];
            for ( var i in properties ) {
                if ( typeof data[properties[i]] !== 'undefined' ) {
                    areas[areaId][properties[i]] = data[properties[i]];
                    if ( properties[i]=='caption' ) {
                        areas[areaId].helper.attr('title', data['caption']);
                    }
                }
            }
            if ( typeof data['id'] !== 'undefined' ) {
                areas[data['id']] = areas[areaId];
                delete areas[areaId];
                areaId = data['id'];
            }
            handleArea(areas[areaId]);
        }
    }
}(jQuery));