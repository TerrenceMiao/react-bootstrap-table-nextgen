// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

export const shallowWithContext = (elem: any, context = {}) => {
  const wrapper = shallow(elem);
  const Children = wrapper.props().children(context);
  return shallow(Children);
};
