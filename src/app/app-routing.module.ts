import { NgModule } from "@angular/core";
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'recipes',
    loadChildren: () =>
    import("./recipes/recipes.module").then(m => m.RecipesModule)
  },
  { path: 'shoppinglist',
   loadChildren: () =>
    import("./shopping-list/shoppinglist.module").then(m => m.ShoppingListModule)
  },
  { path: 'auth',
    loadChildren: () =>
    import('./auth/auth.module').then(m => m.AuthModule)
   },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true}) // suport for older browsers
    RouterModule.forRoot(appRoutes)
    //RouterModule.forRoot(appRoutes,{preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
