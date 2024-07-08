import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppinglistService } from '../shoppinglist.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  //@Output() onAddIngredient = new EventEmitter<Ingredient>();

  @ViewChild('f', { static: false }) slForm: NgForm;

  private indexChanged: Subscription;

  editMode = false;
  editItemIndex: number;
  editItem: Ingredient;

  constructor(private shlistService: ShoppinglistService) { }

  ngOnDestroy(): void {
    this.indexChanged.unsubscribe();
  }

  ngOnInit(): void {
    this.indexChanged =
      this.shlistService.startedEditing.subscribe(
        (index: number) => {
          this.editItemIndex = index;
          this.editMode = true;
          this.editItem = this.shlistService.getIngredient(index);
          this.slForm.setValue({
            nameInput: this.editItem.name,
            amountInput: this.editItem.amount
          })
        }
      );
  }

  deleteIngredient() {
    this.shlistService.deleteIngredient(this.editItemIndex);
    this.clearForm();
  }

  clearForm() {
    this.editMode = false;
    this.editItemIndex = null;
    this.editItem = null;
    this.slForm.reset();
  }

  onSubmit(slForm: NgForm) {
    const newIngredient = new Ingredient(
      slForm.value.nameInput,
      slForm.value.amountInput
    );

    if (this.editMode) {
      this.shlistService.updateIngredient(
        this.editItemIndex,
        newIngredient);
    }else {
      this.shlistService.addIngredient(newIngredient);
    };
    this.clearForm();
  }
}
