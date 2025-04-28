import * as esbuild from "esbuild";

const plugin = {
  name: "browser-plugin",
  setup(build) {
    build.onResolve({ filter: /.*/ }, args => {
      if (
          !/^(#|\/|\.\/|\.\.\/)/.test(args.path) &&
          args.path !== "websocket" &&
          args.path !== "async-mutex" &&
          args.path !== "uuid" &&
          args.path !== "json-bigint"
      ) {
          // console.log(args.path)
          return { external: true };
      }
    })
  }
}

esbuild.build({
  target: ["esnext"],
  bundle: true,
  minify: true,
  format: "esm",
  plugins: [plugin],
  entryPoints: ["./lib/index.js"],
  outfile: "./lib/bundle.js",
});
