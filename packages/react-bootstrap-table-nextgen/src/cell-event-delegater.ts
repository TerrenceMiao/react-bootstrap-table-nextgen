import _ from './utils';

const events = [
  'onClick',
  'onDoubleClick',
  'onMouseEnter',
  'onMouseLeave',
  'onContextMenu',
  'onAuxClick'
];

export default (ExtendBase: any) => class CellEventDelegater extends ExtendBase {
    constructor(props: any) {
      super(props);
      this.createDefaultEventHandler = this.createDefaultEventHandler.bind(this);
    }

    createDefaultEventHandler(cb: any) {
      return (e: any) => {
        const { column, columnIndex, index } = this.props;
        cb(e, column, typeof columnIndex !== 'undefined' ? columnIndex : index);
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
