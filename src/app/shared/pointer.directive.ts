import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPointer]'
})
export class PointerDirective {

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.setCursor('pointer');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setCursor('default');
  }

  private setCursor(cursorType: string) {
    this.el.nativeElement.style.cursor = cursorType;
  }

}
