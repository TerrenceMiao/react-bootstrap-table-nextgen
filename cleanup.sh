#!/bin/sh

rm -rf node_modules

rm -rf packages/react-bootstrap-table-nextgen/dist
rm -rf packages/react-bootstrap-table-nextgen/lib
rm -rf packages/react-bootstrap-table-nextgen/node_modules
find packages/react-bootstrap-table-nextgen -type f -name "*.js" -exec rm {} \;

rm -rf packages/react-bootstrap-table-nextgen-editor/dist
rm -rf packages/react-bootstrap-table-nextgen-editor/lib
rm -rf packages/react-bootstrap-table-nextgen-editor/node_modules
find packages/react-bootstrap-table-nextgen-editor -type f -name "*.js" -exec rm {} \;

rm -rf packages/react-bootstrap-table-nextgen-example/node_modules
find packages/react-bootstrap-table-nextgen-example/src -type f -name "*.js" -exec rm {} \;
find packages/react-bootstrap-table-nextgen-example/test -type f -name "*.js" -exec rm {} \;

rm -rf packages/react-bootstrap-table-nextgen-filter/dist
rm -rf packages/react-bootstrap-table-nextgen-filter/lib
rm -rf packages/react-bootstrap-table-nextgen-filter/node_modules
find packages/react-bootstrap-table-nextgen-filter -type f -name "*.js" -exec rm {} \;

rm -rf packages/react-bootstrap-table-nextgen-overlay/dist
rm -rf packages/react-bootstrap-table-nextgen-overlay/lib
rm -rf packages/react-bootstrap-table-nextgen-overlay/node_modules
find packages/react-bootstrap-table-nextgen-overlay -type f -name "*.js" -exec rm {} \;

rm -rf packages/react-bootstrap-table-nextgen-paginator/dist
rm -rf packages/react-bootstrap-table-nextgen-paginator/lib
rm -rf packages/react-bootstrap-table-nextgen-paginator/node_modules
find packages/react-bootstrap-table-nextgen-paginator -type f -name "*.js" -exec rm {} \;

rm -rf packages/react-bootstrap-table-nextgen-toolkit/dist
rm -rf packages/react-bootstrap-table-nextgen-toolkit/lib
rm -rf packages/react-bootstrap-table-nextgen-toolkit/node_modules
find packages/react-bootstrap-table-nextgen-toolkit -type f -name "*.js" -exec rm {} \;

find . -type f -name "*.js.map" -exec rm {} \;
find . -type f -name "*.d.ts" -exec rm {} \;
