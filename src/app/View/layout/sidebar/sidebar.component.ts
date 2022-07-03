import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from './menu-item';
import MetisMenu from 'metismenujs';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {



  @ViewChild('sidebarToggler')
  sidebarToggler!: ElementRef;

  menuItems: MenuItem[] = [];
  @ViewChild('sidebarMenu')
   sidebarMenu!: ElementRef;

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {

        /**
         * Activating the current active item dropdown
         */
        this._activateMenuDropdown();

        /**
         * closing the sidebar
         */
        if (window.matchMedia('(max-width: 991px)').matches) {
          this.document.body.classList.remove('sidebar-open');
        }

      }
    });

  }



  ngOnInit(): void {
  }


  ngAfterViewInit() {
    // activate menu item
    new MetisMenu(this.sidebarMenu.nativeElement);

    this._activateMenuDropdown();
  }

  /**
   * Toggle sidebar on hamburger button click
   */
  toggleSidebar(e: Event) {
    this.sidebarToggler.nativeElement.classList.toggle('active');
    this.sidebarToggler.nativeElement.classList.toggle('not-active');
    if (window.matchMedia('(min-width: 992px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-folded');
    } else if (window.matchMedia('(max-width: 991px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-open');
    }
  }


  /**
   * Toggle settings-sidebar
   */
  toggleSettingsSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('settings-open');
  }


  /**
   * Open sidebar when hover (in folded folded state)
   */
  operSidebarFolded() {
    if (this.document.body.classList.contains('sidebar-folded')){
      this.document.body.classList.add("open-sidebar-folded");
    }
  }


  /**
   * Fold sidebar after mouse leave (in folded state)
   */
  closeSidebarFolded() {
    if (this.document.body.classList.contains('sidebar-folded')){
      this.document.body.classList.remove("open-sidebar-folded");
    }
  }

  /**
   * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
   */
  iconSidebar(mq: MediaQueryList) {
    if (mq.matches) {
      this.document.body.classList.add('sidebar-folded');
    } else {
      this.document.body.classList.remove('sidebar-folded');
    }
  }


  /**
   * Switching sidebar light/dark
   */
  onSidebarThemeChange(event: Event) {
    this.document.body.classList.remove('sidebar-light', 'sidebar-dark');
    this.document.body.classList.add((<HTMLInputElement>event.target).value);
    this.document.body.classList.remove('settings-open');
  }


  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }


  /**
   * Reset the menus then hilight current active menu item
   */
  _activateMenuDropdown() {
    this.resetMenuItems();
    this.activateMenuItems();
  }


  /**
   * Resets the menus
   */
  resetMenuItems() {

    const links = document.getElementsByClassName('nav-link-ref');

    for (let i = 0; i < links.length; i++) {
      const menuItemEl = links[i];
      menuItemEl.classList.remove('mm-active');
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
          parentEl.classList.remove('mm-active');
          const parent2El = parentEl.parentElement;

          if (parent2El) {
            parent2El.classList.remove('mm-show');
          }

          const parent3El = parent2El?.parentElement;
          if (parent3El) {
            parent3El.classList.remove('mm-active');

            if (parent3El.classList.contains('side-nav-item')) {
              const firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');

              if (firstAnchor) {
                firstAnchor.classList.remove('mm-active');
              }
            }

            const parent4El = parent3El.parentElement;
            if (parent4El) {
              parent4El.classList.remove('mm-show');

              const parent5El = parent4El.parentElement;
              if (parent5El) {
                parent5El.classList.remove('mm-active');
              }
            }
          }
      }
    }
  };


  /**
   * Toggles the menu items
   */
  activateMenuItems() {

    const links: any = document.getElementsByClassName('nav-link-ref');

    let menuItemEl = null;

    for (let i = 0; i < links.length; i++) {
      // tslint:disable-next-line: no-string-literal
        if (window.location.pathname === links[i]['pathname']) {

            menuItemEl = links[i];

            break;
        }
    }

    if (menuItemEl) {
        menuItemEl.classList.add('mm-active');
        const parentEl = menuItemEl.parentElement;

        if (parentEl) {
            parentEl.classList.add('mm-active');

            const parent2El = parentEl.parentElement;
            if (parent2El) {
                parent2El.classList.add('mm-show');
            }

            const parent3El = parent2El.parentElement;
            if (parent3El) {
                parent3El.classList.add('mm-active');

                if (parent3El.classList.contains('side-nav-item')) {
                    const firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');

                    if (firstAnchor) {
                        firstAnchor.classList.add('mm-active');
                    }
                }

                const parent4El = parent3El.parentElement;
                if (parent4El) {
                    parent4El.classList.add('mm-show');

                    const parent5El = parent4El.parentElement;
                    if (parent5El) {
                        parent5El.classList.add('mm-active');
                    }
                }
            }
        }
    }
  };



}

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'Web Apps',
    isTitle: true
  },
  {
    label: 'Email',
    icon: 'mail',
    subItems: [
      {
        label: 'Inbox',
        link: '/apps/email/inbox',
      },
      {
        label: 'Read',
        link: '/apps/email/read'
      },
      {
        label: 'Compose',
        link: '/apps/email/compose'
      },
    ]
  },
  {
    label: 'Chat',
    icon: 'message-square',
    link: '/apps/chat',
  },
  {
    label: 'Calendar',
    icon: 'calendar',
    link: '/apps/calendar',
    badge: {
      variant: 'primary',
      text: 'Event',
    }
  },
  {
    label: 'Components',
    isTitle: true
  },
  {
    label: 'UI Kit',
    icon: 'feather',
    subItems: [
      {
        label: 'Accordion',
        link: '/ui-components/accordion',
      },
      {
        label: 'Alerts',
        link: '/ui-components/alerts',
      },
      {
        label: 'Badges',
        link: '/ui-components/badges',
      },
      {
        label: 'Breadcrumbs',
        link: '/ui-components/breadcrumbs',
      },
      {
        label: 'Buttons',
        link: '/ui-components/buttons',
      },
      {
        label: 'Button group',
        link: '/ui-components/button-group',
      },
      {
        label: 'Cards',
        link: '/ui-components/cards',
      },
      {
        label: 'Carousel',
        link: '/ui-components/carousel',
      },
      {
        label: 'Collapse',
        link: '/ui-components/collapse',
      },
      {
        label: 'Datepicker',
        link: '/ui-components/datepicker',
      },
      {
        label: 'Dropdowns',
        link: '/ui-components/dropdowns',
      },
      {
        label: 'List group',
        link: '/ui-components/list-group',
      },
      {
        label: 'Media object',
        link: '/ui-components/media-object',
      },
      {
        label: 'Modal',
        link: '/ui-components/modal',
      },
      {
        label: 'Navs',
        link: '/ui-components/navs',
      },
      {
        label: 'Navbar',
        link: '/ui-components/navbar',
      },
      {
        label: 'Pagination',
        link: '/ui-components/pagination',
      },
      {
        label: 'Popovers',
        link: '/ui-components/popovers',
      },
      {
        label: 'Progress',
        link: '/ui-components/progress',
      },
      {
        label: 'Rating',
        link: '/ui-components/rating',
      },
      {
        label: 'Scrollbar',
        link: '/ui-components/scrollbar',
      },
      {
        label: 'Spinners',
        link: '/ui-components/spinners',
      },
      {
        label: 'Timepicker',
        link: '/ui-components/timepicker',
      },
      {
        label: 'Tooltips',
        link: '/ui-components/tooltips',
      },
      {
        label: 'Typeadhed',
        link: '/ui-components/typeahead',
      },
    ]
  },
  {
    label: 'Advanced UI',
    icon: 'anchor',
    subItems: [
      {
        label: 'Cropper',
        link: '/advanced-ui/cropper',
      },
      {
        label: 'Owl carousel',
        link: '/advanced-ui/owl-carousel',
      },
      {
        label: 'SortableJs',
        link: '/advanced-ui/sortablejs',
      },
      {
        label: 'Sweet alert',
        link: '/advanced-ui/sweet-alert',
      },
    ]
  },
  {
    label: 'Forms',
    icon: 'file-text',
    subItems: [
      {
        label: 'Basic elements',
        link: '/form-elements/basic-elements'
      },
      {
        label: 'Advanced elements',
        subItems: [
          {
            label: 'Form validation',
            link: '/advanced-form-elements/form-validation'
          },
          {
            label: 'Input mask',
            link: '/advanced-form-elements/input-mask'
          },
          {
            label: 'Ng-select',
            link: '/advanced-form-elements/ng-select'
          },
          {
            label: 'Ngx-chips',
            link: '/advanced-form-elements/ngx-chips'
          },
          {
            label: 'Ngx-color-picker',
            link: '/advanced-form-elements/ngx-color-picker'
          },
          {
            label: 'Ngx-dropzone',
            link: '/advanced-form-elements/ngx-dropzone-wrapper'
          },
        ]
      },
      {
        label: 'Editors',
        link: '/form-elements/editors'
      },
      {
        label: 'Wizard',
        link: '/form-elements/wizard'
      },
    ]
  },
  {
    label: 'Charts & graphs',
    icon: 'pie-chart',
    subItems: [
      {
        label: 'ApexCharts',
        link: '/charts-graphs/apexcharts',
      },
      {
        label: 'ChartJs',
        link: '/charts-graphs/chartjs',
      },
    ]
  },
  {
    label: 'Tables',
    icon: 'layout',
    subItems: [
      {
        label: 'Basic tables',
        link: '/tables/basic-table',
      },
      {
        label: 'Data table',
        link: '/tables/data-table',
      },
      {
        label: 'Ngx-datatable',
        link: '/tables/ngx-datatable'
      }
    ]
  },
  {
    label: 'Icons',
    icon: 'smile',
    subItems: [
      {
        label: 'Feather icons',
        link: '/icons/feather-icons',
      },
      {
        label: 'Mdi icons',
        link: '/icons/mdi-icons',
      }
    ]
  },
  {
    label: 'Pages',
    isTitle: true
  },
  {
    label: 'Special pages',
    icon: 'book',
    subItems: [
      {
        label: 'Blank page',
        link: '/general/blank-page',
      },
      {
        label: 'Faq',
        link: '/general/faq',
      },
      {
        label: 'Invoice',
        link: '/general/invoice',
      },
      {
        label: 'Profile',
        link: '/general/profile',
      },
      {
        label: 'Pricing',
        link: '/general/pricing',
      },
      {
        label: 'Timeline',
        link: '/general/timeline',
      }
    ]
  },
  {
    label: 'Authentication',
    icon: 'unlock',
    subItems: [
      {
        label: 'Login',
        link: '/auth/login',
      },
      {
        label: 'Register',
        link: '/auth/register',
      },
    ]
  },
  {
    label: 'Error',
    icon: 'cloud-off',
    subItems: [
      {
        label: '404',
        link: '/error/404',
      },
      {
        label: '500',
        link: '/error/500',
      },
    ]
  },
];
