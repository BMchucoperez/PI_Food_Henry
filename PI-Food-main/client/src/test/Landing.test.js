import Landing from "../components/Landing/Landing";
import Enzyme, {shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({adapter: new Adapter()});

describe('Landing',()=>{
    it("should have an title Healthy Cooking Guide",()=>{
        const wrapper = shallow(<Landing/>)
        const title = wrapper.find('div h1')
        expect(title.text()).toBe("Healthy Cooking Guide")
    })
    it("should have a button OPEN",()=>{
        const wrapper = shallow(<Landing/>)
        const button = wrapper.find('div Link button')
        expect(button.text()).toBe("OPEN")
    })
})