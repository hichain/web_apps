import { rotate, tileParser } from "../tiles";

describe("rotate tile", () => {
  test("square (dir+1)", () => {
    const tile = rotate(0x99, 1);
    expect(tile).toBe(0x99);
  });
  test("square (dir+4)", () => {
    const tile = rotate(0x99, 4);
    expect(tile).toBe(0x99);
  });
  test("pin (dir+2)", () => {
    const tile = rotate(0xa6, 2);
    expect(tile).toBe(0x6a);
  });
  test("power (dir-1)", () => {
    const tile = rotate(0x59, -1);
    expect(tile).toBe(0x9a);
  });
  test("parallel (dir-6)", () => {
    const tile = rotate(0xaa, -6);
    expect(tile).toBe(0xaa);
  });
  test("square (dir+100)", () => {
    const tile = rotate(0x99, 100);
    expect(tile).toBe(0x99);
  });
});

describe("parse tile", () => {
  test("square", () => {
    const tile = tileParser.parse(0x99);
    const results = Array(4)
      .fill(null)
      .map((_, i) => ({
        name: "square",
        dir: i,
      }));
    expect(results).toContainEqual(tile);
  });
  test("pin (dir+1)", () => {
    const tile = tileParser.parse(0x56);
    expect(tile).toEqual({
      name: "pin",
      dir: 1,
    });
  });
  test("power (dir+2)", () => {
    const tile = tileParser.parse(0x95);
    expect(tile).toEqual({
      name: "power",
      dir: 2,
    });
  });
});
