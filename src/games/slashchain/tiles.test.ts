import { rotate } from "./tile";

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
