import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-teacher-profit-sub-table',
    templateUrl: './teacher-profit-sub-table.component.html',
    styleUrls: ['../../table/table.component.css', './teacher-profit-sub-table.component.css']
})
export class TeacherProfitSubTableComponent {
    @Input() data: any[] = []; //todo: TeacherProfitNote
    displayedColumns: string[] = [
        'name',
        'totalItemsSold',
        'totalItemsSoldForOthers',
        'totalItemsSoldForTeacher',
        'teacherPrice',
        'totalEarning'
    ];
    getTotal = (propertyName: string): number =>
        this.data.map((t: any) => t[propertyName] || 0).reduce((acc: number, value: number) => acc + Number(value), 0);
}
