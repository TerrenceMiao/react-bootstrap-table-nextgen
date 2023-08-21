import { ROW_SELECT_DISABLED } from "../..";
import _ from "../utils";

const events: string[] = [
  "onClick",
  "onDoubleClick",
  "onMouseEnter",
  "onMouseLeave",
  "onContextMenu",
  "onAuxClick",
];

interface RowEventDelegaterProps {
  row: any;
  selected: boolean;
  keyField: string;
  selectable: boolean;
  expandable: boolean;
  rowIndex: number;
  expanded: boolean;
  expandRow: any;
  selectRow: any;
  DELAY_FOR_DBCLICK: number;
}

export default function RowEventDelegater<
  T extends new (...args: any[]) => any
>(ExtendBase: T) {
  return class extends ExtendBase {
    clickNum: number = 0;

    constructor(...props: any[]) {
      super(...props);
      this.createDefaultEventHandler =
        this.createDefaultEventHandler.bind(this);
      this.createClickEventHandler = this.createClickEventHandler.bind(this);
    }

    createClickEventHandler(
      cb: (e: Event, row: any, rowIndex: number) => void
    ) {
      return (e: Event) => {
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
          DELAY_FOR_DBCLICK,
        }: RowEventDelegaterProps = this.props;

        const clickFn = () => {
          if (cb) {
            cb(e, row, rowIndex);
          }

          const key = _.get(row, keyField);

          if (expandRow && expandable && !expandRow.expandByColumnOnly) {
            if (
              (selectRow.mode !== ROW_SELECT_DISABLED &&
                selectRow.clickToExpand) ||
              selectRow.mode === ROW_SELECT_DISABLED
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

    createDefaultEventHandler(
      cb: (e: Event, row: any, rowIndex: number) => void
    ) {
      return (e: Event) => {
        const { row, rowIndex }: RowEventDelegaterProps = this.props;
        cb(e, row, rowIndex);
      };
    }

    delegate(attrs: Record<string, any> = {}): Record<string, any> {
      const newAttrs: Record<string, any> = { ...attrs };
      Object.keys(attrs).forEach((attr) => {
        if (_.includes(events, attr)) {
          newAttrs[attr] = this.createDefaultEventHandler(attrs[attr]);
        }
      });
      return newAttrs;
    }
  };
}
