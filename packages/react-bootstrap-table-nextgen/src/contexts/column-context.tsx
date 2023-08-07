/* eslint react/prop-types: 0 */
/* eslint react/prefer-stateless-function: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';

export default () => {
  const ColumnManagementContext = React.createContext();

  class ColumnManagementProvider extends React.Component {
    static propTypes = {
      columns: PropTypes.array.isRequired,
      toggles: PropTypes.object
    }

    static defaultProps = {
      toggles: null
    }

    props: any;

    render() {
      let toggleColumn;
      const { columns, toggles } = this.props;
      if (toggles) {
        toggleColumn = columns.filter((column: any) => toggles[column.dataField]);
      } else {
        toggleColumn = columns.filter((column: any) => !column.hidden);
      }
      return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ColumnManagementContext.Provider value={ { columns: toggleColumn } }>
          { this.props.children }
        </ColumnManagementContext.Provider>
      );
    }
  }

  return {
    Provider: ColumnManagementProvider,
    Consumer: ColumnManagementContext.Consumer
  };
};
