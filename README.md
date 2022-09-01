# policies

List of bridged policies as code

## Not all policy related codes are included.

Only publically available policies as code are listed here.
We use the exact same package on our production, keeping things clean and clear.

Although, security related policies are kepted private, accessible to only few people.

## Usage

```
yarn add @policies/<policy-name>
```

## Policies

**General**

- [valid-username](./valid-username) - a logic used to validate username on sigup

**Bridged Specific**

- [@policies/grida-valid-username](https://www.npmjs.com/package/@policies/grida-valid-username) - a logic used to validate username on sigup with bridged specific reserved keywords.
