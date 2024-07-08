import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy{


  collapsed=true;
  isAuthenticated: boolean;

  private userSub: Subscription;
  // @Output() recipesClicked = new EventEmitter<string>();

  constructor(
    private dsService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; // comun way to ensure a var is a boolean // not not is *self
    })
  }

  // onElementClick(selected: string){
  //   this.recipesClicked.emit(selected)
  // }

  onSaveData() {
    this.dsService.storeRecipes();
  }

  onFetchData() {
    this.dsService.getRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
