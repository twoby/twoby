# Two Separated Binary

Caution: in alpha. Import `encode` and `decode`. Convert a typed array to/from "Two Separated Binary".

Supported binary formats:

- For 8-bit integers, use `Uint8Array` as input.

## Installation

Install with a package manager:

```
pnpm add twoby
```

Or, run `npm install` or `yarn add`, based on your preference.


## Contributing

The published copy lives [on GitHub][gh_twoby]. Make any pull request against the main branch.

### Package manager

I build and test with [pnpm][pnpm]. I've tried `npm`, `yarn@1`, `yarn@berry`, but The [`uvu` testing library][npm_uvu] currently [recommendeds][uvu_use_pnpm] `pnpm`.

[gh_twoby]: https://github.com/twoby/twoby
[uvu_use_pnpm]: https://github.com/lukeed/uvu/issues/144#issuecomment-939316208
[npm_uvu]: https://www.npmjs.com/package/uvu
[pnpm]: https://pnpm.io
