import * as path from "path";
import umdConfig from "./webpack.umd.babel";

module.exports = {
  ...umdConfig,
  entry: {
    "react-bootstrap-table-nextgen-filter/dist/react-bootstrap-table-nextgen-filter":
      "./packages/react-bootstrap-table-nextgen-filter/index.ts",
    "react-bootstrap-table-nextgen-filter/dist/react-bootstrap-table-nextgen-filter.min":
      "./packages/react-bootstrap-table-nextgen-filter/index.ts",
  },
  output: {
    path: path.join(__dirname, "../packages"),
    filename: "[name].js",
    library: "ReactBootstrapTableNextgenFilter",
    libraryTarget: "umd",
  },
};
