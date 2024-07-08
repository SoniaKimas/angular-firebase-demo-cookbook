import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, exhaustMap, map, take, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipService: RecipeService,
    private authService: AuthService
  ) { }

  storeRecipes() {
    const recipes = this.recipService.getRecipes();
    // in firebase in put request any data will be overriden
    this.http.put(
      'https://recipebook-kimas-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes
    ).subscribe(
      response => {
        console.log(response);
      }
    );

  }


  getRecipes() {


      return this.http.get<Recipe[]>(
          'https://recipebook-kimas-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipService.setRecipes(recipes);
        })
      );
  }
}
