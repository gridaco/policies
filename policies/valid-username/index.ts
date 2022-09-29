import * as diacritics from "diacritics";
const _USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const RESERVED_KEYWORDS = require("./exclude.json");

/**
 * true is good to go
 * @param username
 * @returns
 */
function _validate(username: string): boolean {
  return _USERNAME_REGEX.test(username);
}

/**
 * true is good to go
 * @param username
 * @returns
 */
function _validate_reserved(username: string): boolean {
  // if not included, return true - valid
  // if included, return false - invalid
  return !RESERVED_KEYWORDS.includes(username);
}

export type InvalidationType =
  | "already-taken"
  | "too-long"
  | "too-short"
  | "blank-space"
  | "start-with-hyphen"
  | "end-with-hyphen"
  | "consecutive-hyphens"
  | "invalid-character"
  | "unknown";

type Validation =
  | {
      valid: true;
    }
  | {
      valid: false;
      type: InvalidationType;
      char?: string;
    };

/**
 * prevalidation with regex and reserved keywords. post validation should be done with database conflicton check, which this module does not handle.
 * @param username
 * @returns
 */
export function prevalidate(username: string): Validation {
  if (!_validate(username)) {
    return {
      valid: false,
      ...why_not(username),
    };
  }

  if (!_validate_reserved(username)) {
    return {
      valid: false,
      // even if it's reserved username, the message shall display as "already taken."
      type: "already-taken",
    };
  }
  return {
    valid: true,
  };
}

/**
 * analyze username and return why it's invalid
 *
 * regex : /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i
 * - cannot start with hyphen
 * - cannot end with hyphen
 * - cannot contain consecutive hyphens
 * - cannot contain special characters
 * - cannot contain blank spaces
 * - cannot contain dots
 * - cannot contain underscores
 * - cannot contain unicode characters
 * - cannot contain CJK characters
 * - cannot contain emojis
 * - cannot contain non-alphanumeric characters
 * - cannot contain more than 38 characters
 *
 *
 * @param invalid
 * @returns
 */
function why_not(invalid: string): {
  type: InvalidationType;
  char?: string;
} {
  // assuming that the input is already prevalidated, and invalid

  if (invalid.length < 1) {
    return {
      type: "too-short",
    };
  }

  if (invalid.length > 38) {
    return {
      type: "too-long",
    };
  }

  if (invalid.includes(" ")) {
    return {
      type: "blank-space",
      char: " ",
    };
  }

  if (invalid.startsWith("-")) {
    return {
      type: "start-with-hyphen",
      char: "-",
    };
  }

  if (invalid.endsWith("-")) {
    return { type: "end-with-hyphen", char: "-" };
  }

  if (invalid.includes("--")) {
    return { type: "consecutive-hyphens", char: "--" };
  }

  for (const special_char of common_invalid_special_characters) {
    if (invalid.includes(special_char)) {
      return { type: "invalid-character", char: special_char };
    }
  }

  return { type: "unknown" };
}

function alternatives(username: string) {
  if (username.startsWith("-")) {
    return username.replace("-", "");
  }

  if (username.endsWith("-")) {
    return username.slice(0, -1);
  }

  return username;
}

/**
 * force flat the givven name and make it a valid username
 * (this does not support unicode characters including CJK characters)
 * @param name
 */
export function flat(name: string) {
  // alphanumeric only
  name = diacritics.remove(name);

  // replace special characters with hyphens
  for (const special_char of common_invalid_special_characters) {
    // with escape & global flag
    name = name.replace(new RegExp(`\\${special_char}`, "g"), "-");
  }

  // replace spaces with hyphens
  name = name.replace(/\s+/g, "-");

  // replace consecutive hyphens with single hyphen
  name = name.replace(/--+/g, "-");

  // remove leading and trailing hyphens
  name = name.replace(/^-+|-+$/g, "");

  // remove all non-ascii characters
  name = name.replace(/[^\x00-\x7F]/g, "");

  // lowercase
  name = name.toLowerCase();

  return name;
}

/**
 * special characters that are not allowed in username ('-' is allowed)
 */
const common_invalid_special_characters = [
  "/",
  "_",
  "'",
  '"',
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "+",
  "=",
  "{",
  "}",
  "[",
  "]",
  "|",
  "\\",
  ":",
  ";",
  "<",
  ">",
  ",",
  ".",
  "?",
  "~",
  "`",
];
