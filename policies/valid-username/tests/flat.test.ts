import { flat } from "../index";

test("1", () => {
  expect(flat("Albert Einstein")).toBe("albert-einstein");
});

test("diacritics", () => {
  expect(flat("Iлｔèｒｎåｔïｏｎɑｌíƶａｔï߀ԉ")).toBe("internationalizati0n");
});

test("special chars", () => {
  expect(flat("Universe!@#$$%!!!")).toBe("universe");
});

test("special chars", () => {
  expect(flat("Univ!  !erse!@#$$%!!!")).toBe("univ-erse");
});

test("CJK", () => {
  expect(flat("정우주")).toBe("");
});
