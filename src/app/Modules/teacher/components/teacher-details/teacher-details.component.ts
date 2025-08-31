import { Component } from '@angular/core';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ITeacherFullDTO } from '../../../../core/models/Teachers/dtos/teacher-full-dto.interface';
import { IApiResponseT } from '../../../../core/Common/models/response/api-response-t.interface';
import { ItemOverviewComponentBase } from '../../../../shared/classes/item-overview-component-base.abstract';
import { OrderStatus } from '../../../../core/enums/OrderStatus.enum';

@Component({
    selector: 'app-teacher-details',
    templateUrl: './teacher-details.component.html',
    styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent extends ItemOverviewComponentBase<ITeacherFullDTO> {
    dataObservable: Observable<IApiResponseT<ITeacherFullDTO>> = this.activatedRoute.paramMap.pipe(
        map((pm) => pm.get('id') as string),
        switchMap((id) => {
            if (id === 'mock' || id === 'demo') {
                const now = new Date();
                const mock: ITeacherFullDTO = {
                    id: 'teacher-1',
                    createdOn: now,
                    createdBy: 'mock',
                    isDeleted: false,
                    name: 'مدرس تجريبي',
                    phoneNumber: '0100 111 2222',
                    account: {
                        id: 'tacc-1',
                        createdOn: now,
                        createdBy: 'mock',
                        isDeleted: false,
                        number: '2201',
                        name: 'حساب المدرس',
                        type: undefined as any,
                        totalDebit: 300,
                        totalCredit: 1200,
                        balance: -900
                    },
                    orders: [
                        {
                            id: 't-ord-1',
                            createdOn: now,
                            createdBy: 'mock',
                            isDeleted: false,
                            totalPrice: 700,
                            finalPrice: 650,
                            rest: 250,
                            paid: 400,
                            discountPercent: 7,
                            discount: 50,
                            remarks: 'طلب للطالب أحمد',
                            status: OrderStatus.غير_مكتمل,
                            clientType: {} as any,
                            client: {} as any
                        }
                    ],
                    notes: [
                        {
                            id: 'n-1',
                            name: 'مذكرة رياضيات',
                            quantity: 2,
                            finalPrice: 300,
                            clientId: 'c-1',
                            client: 'أحمد',
                            reservationRequired: false,
                            teacherPrice: 120,
                            stage: 'ثالثة إعدادي',
                            term: 'الأول',
                            actualPrice: 350,
                            originalPrice: 400,
                            earning: 50,
                            filePath: '',
                            fileName: '',
                            finalPriceWithoutTeacherPrice: 180
                        }
                    ]
                } as ITeacherFullDTO;
                return of({ data: mock });
            }
            return this.unitOfWorkService.teacher.getById({ id });
        }),
        catchError((err) => {
            this.toastrService.error('تعذر تحميل بيانات المدرس');
            this.router.navigate(['../'], { relativeTo: this.activatedRoute }).catch(() => {
                this.router.navigate(['/teachers']);
            });
            return of({ data: {} as ITeacherFullDTO });
        }),
        shareReplay(1)
    );

    baseOnInit(): void {}

    baseOnDestroy(): void {}
}
