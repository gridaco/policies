const _USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const RESERVED_KEYWORDS = require("./exclude.json");

export function validateWithRegex(username: string): boolean {
  return _USERNAME_REGEX.test(username);
}

export function validateWithReservedKeyworkds(username: string): boolean {
  // if not included, return true - valid
  // if included, return false - invalid
  return !RESERVED_KEYWORDS.includes(username);
}

/**
 * prevalidation with regex and reserved keywords. post validation should be done with database conflicton check, which this module does not handle.
 * @param username
 * @returns
 */
export function prevalidate(
  username: string,
): {
  valid: boolean;
  reason?: string;
} {
  if (!validateWithRegex(username)) {
    return {
      valid: false,
      reason:
        "Username can contain only alphanumeric characters, single hyphens. (cannot begin or end with a hyphen)",
    };
  }

  if (!validateWithReservedKeyworkds(username)) {
    return {
      valid: false,
      // even if it's reserved username, the message shall display as "already taken."
      reason: "this username is already taken",
    };
  }
  return {
    valid: true,
  };
}
