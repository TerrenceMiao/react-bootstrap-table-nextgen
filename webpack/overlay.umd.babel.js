import * as path from "path";
import umdConfig from "./webpack.umd.babel";

module.exports = {
  ...umdConfig,
  entry: {
    "react-bootstrap-table-nextgen-overlay/dist/react-bootstrap-table-nextgen-overlay":
      "./packages/react-bootstrap-table-nextgen-overlay/index.js",
    "react-bootstrap-table-nextgen-overlay/dist/react-bootstrap-table-nextgen-overlay.min":
      "./packages/react-bootstrap-table-nextgen-overlay/index.js",
  },
  output: {
    path: path.join(__dirname, "../packages"),
    filename: "[name].js",
    library: "ReactBootstraptable-nextgenOverlay",
    libraryTarget: "umd",
  },
};
