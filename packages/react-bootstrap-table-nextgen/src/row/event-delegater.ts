import _ from '../utils';
import Const from '../const';

const events = [
  'onClick',
  'onDoubleClick',
  'onMouseEnter',
  'onMouseLeave',
  'onContextMenu',
  'onAuxClick'
];

export default (ExtendBase: any) => class RowEventDelegater extends ExtendBase {
    constructor(props: any) {
      super(props);
      this.clickNum = 0;
      this.createDefaultEventHandler = this.createDefaultEventHandler.bind(this);
      this.createClickEventHandler = this.createClickEventHandler.bind(this);
    }

    createClickEventHandler(cb: any) {
      return (e: any) => {
        const {
          row,
          selected,
          keyField,
          selectable,
          expandable,
          rowIndex,
          expanded,
          expandRow,
          selectRow,
          DELAY_FOR_DBCLICK
        } = this.props;
        const clickFn = () => {
          if (cb) {
            cb(e, row, rowIndex);
          }
          const key = _.get(row, keyField);
          if (expandRow && expandable && !expandRow.expandByColumnOnly) {
            if (
              (selectRow.mode !== Const.ROW_SELECT_DISABLED && selectRow.clickToExpand) ||
              selectRow.mode === Const.ROW_SELECT_DISABLED
            ) {
              expandRow.onRowExpand(key, !expanded, rowIndex, e);
            }
          }
          if (selectRow.clickToSelect && selectable) {
            selectRow.onRowSelect(key, !selected, rowIndex, e);
          }
        };

        if (DELAY_FOR_DBCLICK) {
          this.clickNum += 1;
          _.debounce(() => {
            if (this.clickNum === 1) {
              clickFn();
            }
            this.clickNum = 0;
          }, DELAY_FOR_DBCLICK)();
        } else {
          clickFn();
        }
      };
    }

    createDefaultEventHandler(cb: any) {
      return (e: any) => {
        const { row, rowIndex } = this.props;
        cb(e, row, rowIndex);
      };
    }

    delegate(attrs = {}) {
      const newAttrs = { ...attrs };
      Object.keys(attrs).forEach((attr) => {
        if (_.contains(events, attr)) {
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          newAttrs[attr] = this.createDefaultEventHandler(attrs[attr]);
        }
      });
      return newAttrs;
    }
  };
