import { shallow } from "enzyme";

export const shallowWithContext = (elem: any, context = {}): any => {
  const wrapper = shallow(elem);
  const Children = wrapper.props().children as any;
  return shallow(Children(context));
};
