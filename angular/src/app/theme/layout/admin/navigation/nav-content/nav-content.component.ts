// angular import
import { Component, OnInit, inject, output } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
// project import
import { environment } from 'src/environments/environment';
import { NavigationItem, NavigationItems } from '../navigation';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavCollapseComponent } from './nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './nav-group/nav-group.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-content',
  imports: [SharedModule, NavCollapseComponent, NavGroupComponent, NavItemComponent],
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit {
  public navigationItems: NavigationItem[] = [];
  private userRole: string = '';
  private location = inject(Location);
  private locationStrategy = inject(LocationStrategy);
  
  // version
  title = 'Demo application for version numbering';
  currentApplicationVersion = environment.appVersion;
  
  // public props
  wrapperWidth!: number;
  windowWidth: number;
  NavMobCollapse = output();

  // constructor
  constructor(private authService: AuthService) {
    this.windowWidth = window.innerWidth;
  }

  // life cycle event
  ngOnInit() {
    this.userRole = this.authService.getCurrentUserRole(); // ex: 'admin'
    this.navigationItems = this.filterItemsByRole(NavigationItems);
    
    if (this.windowWidth < 992) {
      document.querySelector('.pcoded-navbar')?.classList.add('menupos-static');
    }
  }

  // public method
  navMob() {
    if (this.windowWidth < 992 && document.querySelector('app-navigation.pcoded-navbar')?.classList.contains('mob-open')) {
      this.NavMobCollapse.emit();
    }
  }

  fireOutClick() {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;
      if (parent?.classList.contains('pcoded-hasmenu')) {
        parent.classList.add('pcoded-trigger');
        parent.classList.add('active');
      } else if (up_parent?.classList.contains('pcoded-hasmenu')) {
        up_parent.classList.add('pcoded-trigger');
        up_parent.classList.add('active');
      } else if (last_parent?.classList.contains('pcoded-hasmenu')) {
        last_parent.classList.add('pcoded-trigger');
        last_parent.classList.add('active');
      }
    }
  }

  private filterItemsByRole(items: NavigationItem[]): NavigationItem[] {
    return items
      .map(item => {
        // If item has children, recursively filter them
        if (item.children && item.children.length > 0) {
          const filteredChildren = this.filterItemsByRole(item.children);
          return { ...item, children: filteredChildren };
        }
        return item;
      })
      .filter(item => {
        // If item has children, only show it if it has at least one visible child
        if (item.children && item.children.length > 0) {
          return item.children.length > 0;
        }
        
        // For leaf items, check role permissions
        // If no roles specified, item is visible to all users
        if (!item.roles || item.roles.length === 0) {
          return true;
        }
        
        // Check if user's role is in the allowed roles
        return item.roles.includes(this.userRole);
      });
  }

  // Helper method to check if user has specific role (optional utility)
  hasRole(role: string): boolean {
    return this.userRole === role;
  }

  // Helper method to check if user has any of the specified roles (optional utility)
  hasAnyRole(roles: string[]): boolean {
    return roles.includes(this.userRole);
  }
}