import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn:'root'
})
export class DataStorageService{
    constructor(private http:HttpClient,
        private recipeService:RecipeService,
        private authService:AuthService){

    }
    storeRecipes(){
        const recipes = this.recipeService.getRecipe();
       this.http.put('https://course-project-7e2b8-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(
        response =>{
            console.log(response);    
        }
       );
    }

    fetchRecipes(){
       return this.authService.user.pipe(take(1),exhaustMap(user=>{
            return this.http.get<Recipe[]>
            ('https://course-project-7e2b8-default-rtdb.firebaseio.com/recipes.json?auth=' + user.token
            );
        }),
        map(response=>{
            return response.map(response =>{
                return {...response,ingredients:response.ingredients ? response.ingredients:[]
                };
            });
        }),
        tap(response=>{
            this.recipeService.setRecipes(response);
        })
        )
      
        
       
    }



}