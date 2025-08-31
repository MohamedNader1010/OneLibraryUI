import { Component, Input, OnInit } from '@angular/core';
import { INavbarItems } from '../../../../interfaces/navbar-dropdown.interface';

@Component({
    selector: 'app-navbar-dropdown',
    templateUrl: './navbar-dropdown.component.html',
    styleUrls: ['./navbar-dropdown.component.css']
})
export class NavbarDropdownComponent implements OnInit {
    @Input() navItems!: INavbarItems[];
    ngOnInit() {}
}
