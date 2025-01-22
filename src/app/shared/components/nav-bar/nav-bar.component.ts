import { Component, effect, HostListener, inject, OnInit, Signal } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

import { PUBLIC_ROUTES, PRIVATES_ROUTES } from '@constants/index';
import { SessionStore } from '../../../core/store/session.store';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  #store = inject(SessionStore);
  #router = inject(Router);
  showMenuMovile = false;
  routes = PUBLIC_ROUTES;
  showNav = true;
  isLogued = false

  #subs: Subscription[] = [];

  constructor() {
    this.#subs.push(
      this.#router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (this.showMenuMovile) {
            this.showMenuMovile = false;
          }
        }
      })
    );
    effect(() => {
      this.isLogued = this.#store.isLogged()
      this.setRoutes()
    })
  }

  ngOnInit(): void {
    this.setRoutes()
  }

  ngOnDestroy(): void {
    this.#subs.forEach((sub) => sub.unsubscribe());
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (window.innerWidth > 768 && this.showMenuMovile) {
      this.showMenuMovile = false;
    }
  }

  toggleMenu() {
    this.showMenuMovile = !this.showMenuMovile;
  }

  setRoutes() {
    if (this.isLogued) {
      this.routes = PRIVATES_ROUTES;
    } else {
      this.routes = PUBLIC_ROUTES
    }
  }
}
