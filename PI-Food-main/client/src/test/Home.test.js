import Home from "../components/Home/Home";
import Enzyme, {shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({adapter: new Adapter()});

describe('Home',()=>{
    it("should have an option RESET",()=>{
        const wrapper = shallow(<Home/>)
        const title = wrapper.find('div a')
        expect(title.text()).toBe("RESET")
    })
    
})