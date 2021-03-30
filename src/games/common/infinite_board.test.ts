import { CellSet, InfiniteBoard } from "./infinite_board";

describe("CellSet", () => {
  test("has", () => {
    const cells = new CellSet([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ]);
    expect(cells.has({ x: 0, y: 0 })).toBeTruthy();
  });
  test("add", () => {
    const cells = new CellSet();
    cells.add({ x: 0, y: 1 });
    expect(Array.from(cells)).toContainEqual({ x: 0, y: 1 });
  });
  test("delete", () => {
    const cells = new CellSet([{ x: -1, y: -1 }]);
    cells.delete({ x: -1, y: -1 });
    expect(Array.from(cells)).not.toContainEqual({ x: -1, y: -1 });
  });
  test("range", () => {
    const cells = new CellSet([
      { x: 0, y: 0 },
      { x: -1, y: -1 },
      { x: 1, y: 1 },
    ]);
    expect(cells.range()).toEqual({
      minX: -1,
      maxX: 1,
      minY: -1,
      maxY: 1,
    });
  });
});

describe("InfiniteBoard", () => {
  test("get", () => {
    const board = new InfiniteBoard([[{ x: 0, y: 0 }, 0]]);
    expect(board.get({ x: 0, y: 0 })).toEqual(0);
  });
  test("has", () => {
    const board = new InfiniteBoard([
      [{ x: -1, y: -1 }, "a"],
      [{ x: -3, y: 3 }, "b"],
    ]);
    expect(board.has({ x: -3, y: 3 })).toBeTruthy();
  });
  test("set and get", () => {
    const board = new InfiniteBoard([[{ x: 0, y: 0 }, "0,0"]]);
    board.set({ x: -1, y: -1 }, "-1,-1");
    expect(board.get({ x: -1, y: -1 })).toEqual("-1,-1");
  });
  test("delete and has", () => {
    const board = new InfiniteBoard([[{ x: -2, y: -2 }, 4]]);
    board.delete({ x: -2, y: -2 });
    expect(board.has({ x: -2, y: -2 })).toBeFalsy();
  });
  test("adjucent cells (1)", () => {
    const board = new InfiniteBoard([
      [{ x: 0, y: 0 }, 0],
      [{ x: -1, y: 0 }, 0],
      [{ x: 0, y: -1 }, 0],
    ]);
    const adjucentCells = board.adjucentCells();
    expect(adjucentCells.toArray()).toEqual(
      expect.arrayContaining([
        { x: -1, y: -1 },
        { x: -2, y: 0 },
        { x: -1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: -1 },
        { x: 0, y: -2 },
      ])
    );
  });
  test("adjucent cells (2)", () => {
    const board = new InfiniteBoard([
      [{ x: 0, y: 0 }, 0],
      [{ x: 1, y: 1 }, 0],
    ]);
    const adjucentCells = board.adjucentCells();
    expect(adjucentCells.toArray()).toEqual(
      expect.arrayContaining([
        { x: 0, y: -1 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 2, y: 1 },
        { x: 1, y: 2 },
      ])
    );
  });
});
