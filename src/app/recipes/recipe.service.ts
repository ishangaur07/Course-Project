import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class RecipeService{
  recipeChanged = new Subject<Recipe[]>();
  //  private recipes:Recipe[] = [
  //       new Recipe(
  //         'Shaahi Paneer',
  //         'This is a test',
  //         "https://profusioncurry.com/wp-content/uploads/2022/07/Shahi-paneer-recipe-served-with-garnishes.jpg",
  //         [
  //           new Ingredient('Meat',1),
  //           new Ingredient('French Fries',20)
  //         ]),
  //         new Recipe(
  //           'Daal Makhni',
  //           'This is a test',
  //           "https://j6e2i8c9.rocketcdn.me/wp-content/uploads/2020/11/Dal-Makhanai-recipe-1.jpg"
  //           ,[
  //           new Ingredient('Buns',1),
  //           new Ingredient('Meat',20)
  //           ])
      
  //       ];

  private recipes:Recipe[] = [];
        constructor(private slService:ShoppingListService) {
          
        }

    setRecipes(recipes:Recipe[]){
      this.recipes= recipes;
      this.recipeChanged.next(this.recipes.slice())
    }
    getRecipe(){
        return this.recipes.slice();
    }

    getRecipes(index:number){
      return this.recipes[index];
    }

    addIngredientToShoppingList(ingredients:Ingredient[]){
      this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe:Recipe){
      this.recipes.push(recipe);
      this.recipeChanged.next(this.recipes.slice())
    }
    updateRecipe(index:number,newRecipe:Recipe){
      this.recipes[index] = newRecipe;
      this.recipeChanged.next(this.recipes.slice())

    }

    deleteRecipe(index:number){
      this.recipes.splice(index,1);
      this.recipeChanged.next(this.recipes.slice());
    }
}