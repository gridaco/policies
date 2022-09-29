import { prevalidate } from "../index";
import * as assert from "assert";

const _valids = [
  //
  "uesrname",
  "uesr-name",
  "USerNaMe",
  "1234567",
  "softmarshmallow",
];

const _invalids = [
  //
  "_username",
  "user.name",
  "username@example.com",
  "u_s_e_r_n_a_m_e",
  "username_",
  "user--name",
  "username-",
  "bridged", // reserved keyword
  "fuck", // bad keyword
];

test.each(_valids)("allow valid usernames", (name) => {
  const { valid } = prevalidate(name);
  expect(valid).toBe(true);
});

test.each(_invalids)("block invalid usernames", (invalid) => {
  const validation = prevalidate(invalid);
  expect(validation.valid).toBe(false);
});

test("block bad word", () => {
  const validation = prevalidate("fuck");
  assert(validation.valid === false);
  expect(validation.type).toBe("already-taken");
});

test("block --", () => {
  const validation = prevalidate("user--name");
  assert(validation.valid === false);
  expect(validation.type).toBe("consecutive-hyphens");
});

test("block starts with -", () => {
  const validation = prevalidate("-username");
  assert(validation.valid === false);
  expect(validation.type).toBe("start-with-hyphen");
});

test("block .", () => {
  const validation = prevalidate("uu.jj");
  assert(validation.valid === false);
  expect(validation.type).toBe("invalid-character");
  expect(validation.char).toBe(".");
});
