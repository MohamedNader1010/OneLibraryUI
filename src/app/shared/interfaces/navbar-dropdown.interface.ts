import { INavbarDropdownItem as INavbarItem } from './navbar-dropdown-item.interface';

export interface INavbarItems {
  title: string;
  visible: boolean;
  routerLink?: string;
  items?: INavbarItem[];
  exact?: boolean;
}
