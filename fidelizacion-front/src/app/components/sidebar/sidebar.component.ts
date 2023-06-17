import { Component, OnInit } from '@angular/core';

declare interface SubMenu{
  menu_padre: string;
  path : string;
  title: string
}

export const SUBMENU: SubMenu[] = [
  { menu_padre: 'Bolsa de Puntos' , path: '/bolsa', title: 'Registrar'},
  { menu_padre: 'Bolsa de Puntos' , path: '/DebitarBolsa', title: 'Debitar'}
];

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}


export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/bolsa', title: 'Registrar Puntos',  icon:'education_atom', class: '' },
    { path: '/debitarBolsa', title: 'Debitar Puntos',  icon:'location_map-big', class: '' },
    { path: '/reportes', title: 'Reportes',  icon:'ui-1_bell-53', class: ''},

    //{ path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    { path: '/cliente', title: 'Clientes',  icon:'users_single-02', class: ''},
    { path: '/concepto', title: 'Conceptos',  icon:'design_bullet-list-67', class: '' },
    { path: '/regla', title: 'Reglas',  icon:'files_paper', class: ''},
    { path: '/vencimiento', title: 'Vencimientos',  icon:'tech_watch-time', class: ''},
    { path: '/consulta', title: 'Consultas',  icon:'objects_globe', class: ''},
    //{ path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
    //{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  submenuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.submenuItems = SUBMENU.filter(submenuItems => submenuItems);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
