import _ from "../utils";

export interface RowProps {
  clickToEdit?: string;
  dbclickToEdit?: string;
  editable?: boolean;
  editingRowIdx?: number | null;
  editingColIdx?: number;
  EditingCellComponent?: any;
  tabIndexStart?: number;
  tabIndexCell?: boolean;
  rowIndex?: number;
  className?: string;
  style?: React.CSSProperties;
  attrs?: Record<string, any>;
  columns?: any[];
  row?: Record<string, any>;
  selectRow?: any;
  selected?: boolean;
  selectable?: boolean;
  expandRow?: any;
  expanded?: boolean;
  expandable?: boolean;
  visibleColumnSize?: number;
  keyField?: string;
  value?: any;
}

export default function RowShouldUpdater<T extends new(...args: any[]) => any>(
  ExtendBase: T
) {
  return class extends ExtendBase {
    shouldUpdateByCellEditing(nextProps: RowProps) {
      if (!(this.props.clickToEdit || this.props.dbclickToEdit)) return false;
      return (
        nextProps.editingRowIdx === nextProps.rowIndex ||
        (this.props.editingRowIdx === nextProps.rowIndex &&
          nextProps.editingRowIdx === null) ||
        this.props.editingRowIdx === nextProps.rowIndex
      );
    }

    shouldUpdatedBySelfProps(nextProps: RowProps) {
      return (
        this.props.className !== nextProps.className ||
        !_.isEqual(this.props.style, nextProps.style) ||
        !_.isEqual(this.props.attrs, nextProps.attrs)
      );
    }

    // Only use for simple-row
    shouldUpdateByColumnsForSimpleCheck(nextProps: RowProps) {
      if (this.props.columns.length !== nextProps.columns!.length) {
        return true;
      }
      for (let i = 0; i < this.props.columns.length; i += 1) {
        if (!_.isEqual(this.props.columns[i], nextProps.columns![i])) {
          return true;
        }
      }
      return false;
    }

    shouldUpdatedByNormalProps(nextProps: RowProps) {
      const shouldUpdate =
        this.props.rowIndex !== nextProps.rowIndex ||
        this.props.editable !== nextProps.editable ||
        !_.isEqual(this.props.row, nextProps.row) ||
        this.props.columns.length !== nextProps.columns!.length;

      return shouldUpdate;
    }

    shouldUpdateChild(nextProps: RowProps) {
      return (
        this.shouldUpdateByCellEditing(nextProps) ||
        this.shouldUpdatedByNormalProps(nextProps)
      );
    }

    shouldRowContentUpdate(nextProps: RowProps) {
      return (
        this.shouldUpdateChild(nextProps) ||
        this.shouldUpdateByColumnsForSimpleCheck(nextProps)
      );
    }
  };
}
