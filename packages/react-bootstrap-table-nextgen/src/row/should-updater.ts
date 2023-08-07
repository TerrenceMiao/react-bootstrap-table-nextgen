/* eslint react/prop-types: 0 */
import _ from '../utils';

export default (ExtendBase: any) => class RowShouldUpdater extends ExtendBase {
    shouldUpdateByCellEditing(nextProps: any) {
      if (!(this.props.clickToEdit || this.props.dbclickToEdit)) return false;
      return (
        nextProps.editingRowIdx === nextProps.rowIndex ||
        (this.props.editingRowIdx === nextProps.rowIndex &&
        nextProps.editingRowIdx === null) ||
        this.props.editingRowIdx === nextProps.rowIndex
      );
    }

    shouldUpdatedBySelfProps(nextProps: any) {
      return (
        this.props.className !== nextProps.className ||
        !_.isEqual(this.props.style, nextProps.style) ||
        !_.isEqual(this.props.attrs, nextProps.attrs)
      );
    }

    // Only use for simple-row
    shouldUpdateByColumnsForSimpleCheck(nextProps: any) {
      if (this.props.columns.length !== nextProps.columns.length) {
        return true;
      }
      for (let i = 0; i < this.props.columns.length; i += 1) {
        if (!_.isEqual(this.props.columns[i], nextProps.columns[i])) {
          return true;
        }
      }
      return false;
    }

    shouldUpdatedByNormalProps(nextProps: any) {
      const shouldUpdate =
        this.props.rowIndex !== nextProps.rowIndex ||
        this.props.editable !== nextProps.editable ||
        !_.isEqual(this.props.row, nextProps.row) ||
        this.props.columns.length !== nextProps.columns.length;

      return shouldUpdate;
    }

    shouldUpdateChild(nextProps: any) {
      return this.shouldUpdateByCellEditing(nextProps) ||
        this.shouldUpdatedByNormalProps(nextProps);
    }

    shouldRowContentUpdate(nextProps: any) {
      return this.shouldUpdateChild(nextProps) ||
        this.shouldUpdateByColumnsForSimpleCheck(nextProps);
    }
  };
