export default function validation({ name, summary, health_score, steps, image, diets }, recipe) {
    let error = {};
    let RegExpression = /^https?:\/\/.*\.(jpg|png|gif)$/
    const titleSearch = (name) => recipe.some(recipe => recipe.title === name);

    //NAME
    if (!name) {
        error.name = "A name is required"
    }
    
    if (titleSearch(name)) {
        error.name = "A recipe with that name is already existing"
    }
    if (name.length > 200) {
        error.name = "The name can't be longer than 30 characters"
    }

    //SUMMARY
    if (!summary) {
        error.summary = "A summary is required"
    }
    else if(summary.length < 30) {
        error.summary = "The summary can't be less than 30 characters."
    }
    if (summary.length > 2300) {
        error.summary = "The summary can't be longer than 2300 characters"
    }

    //HEALTH SCORE health_score
    if (!health_score) {
        error.health_score = "A health score is required"
    }
    else if(health_score.length > 3){
        error.health_score = "The health score can't be longer than 3 characters"
    }
    if(health_score <= 0){
        error.health_score = "Health score can't be less than or equal to 0"
    }
    //STEPS
    if (!steps) {
        error.steps = "The steps are required"
    }
    else if (steps.length < 50) {
        error.steps = "The steps can't be less than 50 characters."
    }
    if(steps.length > 3000) {
        error.steps = "The steps can't be longer than 3000 characters"
    }
    
    //IMAGE
    if(!image){
        error.image = "A image is required"
    }
    if (!RegExpression.test(image)) {
        error.image = "Image URL does not meet the requirement (JPG, GIF, PNG)"
    }
    //DIETS
    if (!diets.length) {
        error.diets = 'You must choose a diet'
    }
    
    return error
}