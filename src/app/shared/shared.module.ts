import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { CommonModule } from "@angular/common";
import { DropdownDirective } from "./dropdown.directive";
import { PointerDirective } from "./pointer.directive";
import { LoggingService } from "../services/logging.service";

@NgModule({
 declarations: [
  LoadingSpinnerComponent,
  AlertComponent,
  DropdownDirective,
  PointerDirective
 ],
 imports: [CommonModule],
 exports: [
  LoadingSpinnerComponent,
  AlertComponent,
  PointerDirective,
  DropdownDirective,
  CommonModule
 ],
 providers: [LoggingService]
})
export class SharedModule{}
