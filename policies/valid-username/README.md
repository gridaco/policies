# Username validation

```bash
yarn add @policies/grida-valid-username
```

```ts
import { prevalidate, flat } from "@policies/grida-valid-username";

const username = "Some extraord!nary Us3rnamé";

prevalidate(username); // -> valid: false, type: "invalid-characters"
flat(username); // -> some-extraordnary-us3rname
prevalidate(flat(username)); // -> valid: true
```

**Invalidations**

```ts
export type InvalidationType =
  | "already-taken"
  | "too-long"
  | "blank-space"
  | "start-with-hyphen"
  | "end-with-hyphen"
  | "consecutive-hyphens"
  | "invalid-character"
  | "unknown";
```

**The regex**

```ts
/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
```

## Blocked

**Bad words**

- https://github.com/RobertJGabriel/Google-profanity-words
- https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words
- https://www.freewebheaders.com/full-list-of-bad-words-banned-by-google/

```

```
