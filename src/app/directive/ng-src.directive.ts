import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[ngSrc]'
})
export class NgSrcDirective implements OnInit {
  @Input() ngSrc!: string;
  @Input() fallback!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.checkImage(this.ngSrc);
  }

  private checkImage(imagePath: string) {
    const img = new Image();
    img.onload = () => this.renderer.setAttribute(this.el.nativeElement, 'src', imagePath);
    img.onerror = () => this.renderer.setAttribute(this.el.nativeElement, 'src', this.fallback);
    img.src = imagePath;
  }
}
