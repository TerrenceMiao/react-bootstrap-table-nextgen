import _ from "./utils";

const events: string[] = [
  "onClick",
  "onDoubleClick",
  "onMouseEnter",
  "onMouseLeave",
  "onContextMenu",
  "onAuxClick"
];

interface CellEventDelegaterProps {
  column: any;
  columnIndex?: number;
  index: number;
}

export default function CellEventDelegater<
  T extends new(...args: any[]) => any
>(ExtendBase: T) {
  return class extends ExtendBase {
    constructor(...props: any[]) {
      super(...props);
      this.createDefaultEventHandler =
        this.createDefaultEventHandler.bind(this);
    }

    createDefaultEventHandler(
      cb: (e: any, column: any, columnIndex: number) => void
    ) {
      return (e: any) => {
        const { column, columnIndex, index }: CellEventDelegaterProps =
          this.props;
        cb(e, column, typeof columnIndex !== "undefined" ? columnIndex : index);
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
