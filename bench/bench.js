import { Bench } from "tinybench";
import { add } from "../out-dir/add.js";

const bench = new Bench({ time: 100 });

bench
  .add("simple task: wasm add task", () => {
    const c = add(1, 2);
  })
  .add("simple task: node native add task", () => {
    const c = 1 + 2;
  });

await bench.warmup(); // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
await bench.run();

console.table(bench.table());

// Output:
// ┌─────────┬─────────────────────────────────────┬──────────────┬───────────────────┬──────────┬─────────┐
// │ (index) │ Task Name                           │ ops/sec      │ Average Time (ns) │ Margin   │ Samples │
// ├─────────┼─────────────────────────────────────┼──────────────┼───────────────────┼──────────┼─────────┤
// │ 0       │ 'simple task: wasm add task'        │ '566,964'    │ 1763.778806638367 │ '±2.15%' │ 56697   │
// │ 1       │ 'simple task: node native add task' │ '10,262,025' │ 97.44664457209738 │ '±5.28%' │ 1026203 │
// └─────────┴─────────────────────────────────────┴──────────────┴───────────────────┴──────────┴─────────┘
