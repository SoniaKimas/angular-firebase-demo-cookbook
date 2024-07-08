import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppinglistService } from '../../shopping-list/shoppinglist.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit {


  // @Input() currentRecipe: Recipe;
  currentRecipe: Recipe;

  id: number;

  constructor(
    private slService: ShoppinglistService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.currentRecipe = this.recipeService.getRecipeByIndex(this.id);
        }
      );
  }

  onToShoppingList() {
    this.slService.addIngredients(this.currentRecipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'],{relativeTo:this.route});
    //this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
