import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[sbAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit()
  {
    this.el.nativeElement.focus();
    console.log('ok');
    
  }

}
