import { Component, HostListener, OnInit } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { RESPONSIVE_OPTIONS } from '@constants/index';
import { PRODUCTS } from '../../../core/mocks/products';
import { Product, TypeSeverity } from '@interfaces/index';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-carrusel-home',
  templateUrl: './carrusel-home.component.html',
  styleUrl: './carrusel-home.component.css',
  imports: [NgStyle, Carousel, ButtonModule, Tag],
})
export class CarruselHomeComponent implements OnInit {
  products: Product[] = [];
  responsiveOptions = RESPONSIVE_OPTIONS;

  numVisible = 1;
  numScroll = 1;

  ngOnInit() {
    this.products = PRODUCTS;
    this.onResize()
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (window.innerWidth <= 450) {
      this.numVisible = 1;
      this.numScroll = 1;
    }
    if (window.innerWidth > 450) {
      this.numVisible = 2;
      this.numScroll = 2;
    }
    if (window.innerWidth > 680) {
      this.numVisible = 3;
      this.numScroll = 3;
    }
  }

  getSeverity(status: string): TypeSeverity {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'success';
    }
  }
}
