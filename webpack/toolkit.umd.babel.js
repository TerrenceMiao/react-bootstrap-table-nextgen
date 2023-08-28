import * as path from "path";
import umdConfig from "./webpack.umd.babel";

module.exports = {
  ...umdConfig,
  entry: {
    "react-bootstrap-table-nextgen-toolkit/dist/react-bootstrap-table-nextgen-toolkit":
      "./packages/react-bootstrap-table-nextgen-toolkit/index.ts",
    "react-bootstrap-table-nextgen-toolkit/dist/react-bootstrap-table-nextgen-toolkit.min":
      "./packages/react-bootstrap-table-nextgen-toolkit/index.ts",
  },
  output: {
    path: path.join(__dirname, "../packages"),
    filename: "[name].js",
    library: "ReactBootstrapTableNextgenToolkit",
    libraryTarget: "umd",
  },
};
