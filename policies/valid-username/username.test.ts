import { prevalidate } from "./index";

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

test.each(_valids)("allow valid usernames", valid => {
  expect(prevalidate(valid).valid).toBe(true);
});

test.each(_invalids)("block valid usernames", invalid => {
  expect(prevalidate(invalid).valid).toBe(false);
});
