import * as path from "path";
import umdConfig from "./webpack.umd.babel";

module.exports = {
  ...umdConfig,
  entry: {
    "react-bootstrap-table-nextgen-paginator/dist/react-bootstrap-table-nextgen-paginator":
      "./packages/react-bootstrap-table-nextgen-paginator/index.js",
    "react-bootstrap-table-nextgen-paginator/dist/react-bootstrap-table-nextgen-paginator.min":
      "./packages/react-bootstrap-table-nextgen-paginator/index.js",
  },
  output: {
    path: path.join(__dirname, "../packages"),
    filename: "[name].js",
    library: "ReactBootstrapTableNextgenPaginator",
    libraryTarget: "umd",
  },
};
