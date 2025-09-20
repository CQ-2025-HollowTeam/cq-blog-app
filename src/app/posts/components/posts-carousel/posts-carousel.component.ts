import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, input, OnInit, PLATFORM_ID, viewChild } from '@angular/core';
import Swiper from 'swiper';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { isPlatformBrowser } from '@angular/common';
import { Post } from '../../interfaces/post.interface';
import { CardLayout, PostCardComponent } from '../post-card/post-card.component';

@Component({
  selector: 'posts-carousel',
  imports: [PostCardComponent],
  templateUrl: './posts-carousel.component.html',
  styleUrl: './posts-carousel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsCarouselComponent implements AfterViewInit {

  posts = input.required<Post[]>();
  layoutType = input.required<CardLayout>();
  spaceBetween = input.required<number>();

  private platformId = inject(PLATFORM_ID);
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');
  swiper: Swiper | undefined = undefined;

  cardLayout = CardLayout;

  autoplaySpeed = 2000;
  manualSpeed = 500;
  autoplayDelay = 5000;

  ngAfterViewInit () {
    //Para que se ejecute solo en entorno de navegador y no servidor
    if(!isPlatformBrowser(this.platformId)) return;
    this.swiperInit();
  }

  swiperInit() {
    const element = this.swiperDiv().nativeElement;
    if(!element) return;

    this.swiper = new Swiper(element, {
      modules: [Pagination, Navigation, Autoplay],
      direction: 'horizontal',
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: this.autoplayDelay,
        pauseOnMouseEnter: true,
        disableOnInteraction: true,
      },
      speed: this.autoplaySpeed,
      spaceBetween: this.spaceBetween(),      
    });

    this.setupAutoplaySpeed();
  } 

  private setupAutoplaySpeed(): void {
    if (!this.swiper) return;

    this.swiper.on('autoplayStart', () => {
      this.swiper!.params.speed = this.autoplaySpeed;
    });

    this.swiper.on('autoplayStop', () => {
      this.swiper!.params.speed = this.manualSpeed;
    });
  }

}
