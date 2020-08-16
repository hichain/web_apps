import { CellSet } from "../infinite_board";

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
