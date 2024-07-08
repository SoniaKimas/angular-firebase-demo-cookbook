import { Component, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from './shoppinglist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent implements OnDestroy {


  ingredients: Ingredient[];

  private ingredChanged: Subscription;

  constructor(private slService: ShoppinglistService) { }

  ngOnDestroy(): void {
    this.ingredChanged.unsubscribe();
  }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.ingredChanged = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

}
