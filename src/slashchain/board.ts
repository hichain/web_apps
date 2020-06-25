import { LineCell, TileCell } from "./components";

export class Board {
	lineCells: Array<LineCell> = [];
	tileCells: Array<TileCell> = [ new TileCell(0, 0) ];
};
