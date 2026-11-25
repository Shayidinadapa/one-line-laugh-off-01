# One-Line Laugh-Off

[![make.fun](https://make.fun/badge/u-zkhiel-one-line-laugh-off-714618ae.svg)](https://make.fun/bounty/u-zkhiel-one-line-laugh-off-714618ae)
[![rank](https://make.fun/badge/u-zkhiel-one-line-laugh-off-714618ae/Shayidinadapa/one-line-laugh-off-01/rank.svg)](https://make.fun/bounty/u-zkhiel-one-line-laugh-off-714618ae)
[![reward](https://make.fun/badge/u-zkhiel-one-line-laugh-off-714618ae/Shayidinadapa/one-line-laugh-off-01/reward.svg)](https://make.fun/bounty/u-zkhiel-one-line-laugh-off-714618ae)

Entry for the [One-Line Laugh-Off](https://make.fun/bounty/u-zkhiel-one-line-laugh-off-714618ae) bounty on [make.fun](https://make.fun).

## What it does

`main.ts` writes exactly one funny line to `/output/entry.txt`:

> My smart fridge emailed me a diet plan, so I unplugged it and ate the evidence.

The program validates the line before writing: exactly one line, non-blank,
no control characters, and 1–200 characters (the bounty gate). It honours
`MAKEFUN_OUTPUT_DIR` (or `OUTPUT_DIR`), defaulting to `/output`, and refuses
to write into the current directory. After writing, it reads the file back and
checks the content round-trips exactly.

## Run

```sh
node --experimental-strip-types main.ts
```

or with an explicit output directory:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node --experimental-strip-types main.ts
```

## License

MIT — see [LICENSE](LICENSE).
