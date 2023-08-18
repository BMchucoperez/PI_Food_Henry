import CreateRecipe from "../components/createdRecipes/CreateRecipe";
import Enzyme, {shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({adapter: new Adapter()});

describe('CreateRecipe',()=>{
    it("should have an title CREATE YOUR OWN RECIPE",()=>{
        const wrapper = shallow(<CreateRecipe/>)
        const title = wrapper.find('div h1')
        expect(title.text()).toBe("CREATE YOUR OWN RECIPE")
    })
    it("should have a button OPEN",()=>{
        const wrapper = shallow(<CreateRecipe/>)
        const button = wrapper.find('div div div button')
        expect(button.text()).toBe("CREATE RECIPE")
    })
})