import { Directive } from '@angular/core';
import { AfterViewInit, ElementRef, Input } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';

register();

@Directive({
  selector: '[appSwiper]',
  standalone: true,
})
export class SwiperDirective implements AfterViewInit {
  private readonly swiperElement: HTMLElement;
  @Input('config')
  config?: SwiperOptions;

  constructor(private element: ElementRef<HTMLElement>) {
    this.swiperElement = element.nativeElement;
  }

  ngAfterViewInit(): void {
    Object.assign(this.element.nativeElement, this.config);
    //@ts-ignore - We ignore this because there is no initialize method on the HTMLElement
    this.element.nativeElement.initialize();
  }
}
