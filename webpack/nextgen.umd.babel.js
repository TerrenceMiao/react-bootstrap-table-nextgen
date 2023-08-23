import * as path from "path";
import umdConfig from "./webpack.umd.babel";

module.exports = {
  ...umdConfig,
  entry: {
    "react-bootstrap-table-nextgen/dist/react-bootstrap-table-nextgen":
      "./packages/react-bootstrap-table-nextgen/index.ts",
    "react-bootstrap-table-nextgen/dist/react-bootstrap-table-nextgen.min":
      "./packages/react-bootstrap-table-nextgen/index.ts",
  },
  output: {
    path: path.join(__dirname, "../packages"),
    filename: "[name].js",
    library: "ReactBootstrapTableNextgen",
    libraryTarget: "umd",
  },
};
