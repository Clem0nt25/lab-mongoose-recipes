const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async () => {
    const newRecipe = await Recipe.create({
      title: 'My New Recipe',
      level: 'Amateur Chef',
      ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
      cuisine: 'International',
      dishType: 'main_course',
      image: 'https://example.com/my-new-recipe.jpg',
      duration: 60,
      creator: 'Me',
      created: new Date(),
    })
    // console logging the title 
    console.log(newRecipe.title)    
  })
  .then(async () => {
    const newRecipes = await Recipe.insertMany(data)
    return newRecipes
  })
  .then(newRecipes => {
    // console logging the title of each recipe
    newRecipes.forEach(recipe => {
      console.log(recipe.title)
  })})
  .then(async () => {
    const updatedRecipe = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, { new: true })
    console.log("Successfully updated!")
  })
  .then(async () => {
    const deleteRecipe = await Recipe.deleteOne({title: "Carrot Cake"})
    console.log("Successfully deleted!")
  })
  .then(() => {
    mongoose.connection.close()
    console.log('Disconnected from the database')
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  
  



