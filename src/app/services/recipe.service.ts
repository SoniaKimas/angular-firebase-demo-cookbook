import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Green Beans with Cherry Tomatoes',
  //     'These beans are briefly boiled and tossed with cherry tomatoes in a buttery basil sauce to make the most yummy green beans ever!',
  //     'https://www.allrecipes.com/thmb/FJzOo7SahM885C6C0YAulte11sw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/5991887-green-beans-with-cherry-tomatoes-Robert-Guimont-4x3-1-c5816c984bee400d99d5a1cf72cc18aa.jpg',
  //     [
  //       new Ingredient('Green Beans',20),
  //       new Ingredient('Cherry Tomatoes',30)
  //     ]
  //   ),

  //   new Recipe(
  //     "Chef John's Caramel Apple Pie",
  //     'To me, this caramel apple pie recipe is the purest and most intensely flavored apple pie there is. e is poured over the apples and the lattice crust.',
  //     'https://www.allrecipes.com/thmb/mUs9Q6jjreJ6lbhuX_jXu3GxyEY=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/220997-Chef-Johns-Caramel-Apple-Pie-ddmfs-4x3_8609-844ab8a809ba42e18197f5c8adbe8867.jpg',
  //     [
  //       new Ingredient('Apple',5),
  //       new Ingredient('Sugar',100),
  //       new Ingredient('Flour',50)
  //     ]
  //   ),
  // ];

  private _selectedRecipe = new Subject<Recipe>();
  public get selectedRecipe() {
    return this._selectedRecipe;
  }
  public set selectedRecipe(value) {
    this._selectedRecipe = value;
  }

  constructor() { }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeByIndex(index: number){
    return this.recipes[index];
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, value: any) {
    this.recipes[id] = value;
    this.recipeChanged.next(this.recipes.slice());
  }

}
