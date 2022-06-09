//key: window number, property: window mapdata color
GAME.windowsData = {
	1: [255,96,0],
	2: [255,128,0],
	3: [255,160,0],
	4: [255,192,0]
};

//create tile type for each window
Object.keys(GAME.windowsData).forEach(windowId => {

	let tileName = 'window'+windowId;

	new TileType(tileName, GAME.windowsData[windowId], {
		onLoad: (object)=>{
			
			let sprite = new PIXI.Sprite(GAME.currentMap.spritesheet.textures[tileName]);
			sprite.x = TILESIZE * object.x;
			sprite.y = TILESIZE * object.y;
			GAME.level.windowLayer.addChild(sprite);
			
		//check to see if there's no window on the tile above this one, if so: add a window to that space (to cover the 2-tile high character)
			let windowList = [...GAME.currentMap.window1,...GAME.currentMap.window2,...GAME.currentMap.window3,...GAME.currentMap.window4,...GAME.currentMap.windowWalls];
			let windowAbove = windowList.find(w => {
				//to see if the w (window) matches, we first have to know if it's already been converted to a pixi object, because if it has the x and y have been multiplied by the TILESIZE
				if (w.hasOwnProperty('_eventsCount')) return w.x == object.x*TILESIZE && w.y == (object.y-1)*TILESIZE
				else return w.x == object.x && w.y == object.y-1
			});
			if (!windowAbove) {
				let aboveWindowSprite = new PIXI.Sprite(GAME.currentMap.spritesheet.textures[tileName]);
				aboveWindowSprite.x = TILESIZE * object.x;
				aboveWindowSprite.y = TILESIZE * (object.y-1);
				GAME.level.windowLayer.addChild(aboveWindowSprite);
			}

			return sprite;
		}
	});

});


//window wall tiles - acts like a wall, but also prevents the top windows from being spawned
new TileType('windowWalls', [32, 32, 32], {
	onLoad: (object)=>{
		console.log('window wall', object)

		//inject walls into walls array
		GAME.currentMap.walls.push({x: object.x*TILESIZE, y: object.y*TILESIZE});
	}
});

