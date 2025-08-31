import { Component } from '@angular/core';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ItemOverviewComponentBase } from '../../../../shared/classes/item-overview-component-base.abstract';
import { IApiResponseT } from '../../../../core/Common/models/response/api-response-t.interface';
import { IClientFullDTO } from '../../../../core/models/Clients/dtos/client-full-dto.interface';
import { OrderStatus } from '../../../../core/enums/OrderStatus.enum';

@Component({
    selector: 'app-client-details',
    templateUrl: './client-details.component.html',
    styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent extends ItemOverviewComponentBase<IClientFullDTO> {
    dataObservable: Observable<IApiResponseT<IClientFullDTO>> = this.activatedRoute.paramMap.pipe(
        map((pm) => pm.get('id') as string),
        switchMap((id) => {
            if (id === 'mock' || id === 'demo') {
                const now = new Date();
                const mock: IClientFullDTO = {
                    id: 'client-1',
                    createdOn: now,
                    createdBy: 'mock',
                    isDeleted: false,
                    name: 'عميل تجريبي',
                    phoneNumber: '0100 000 0000',
                    account: {
                        id: 'acc-1',
                        createdOn: now,
                        createdBy: 'mock',
                        isDeleted: false,
                        number: '1101',
                        name: 'حساب العميل',
                        type: undefined as any,
                        totalDebit: 1250,
                        totalCredit: 800,
                        balance: 450
                    },
                    clientType: {
                        id: 'ctype-1',
                        createdOn: now,
                        createdBy: 'mock',
                        isDeleted: false,
                        name: 'عادي',
                        phoneNumber: '—',
                        clientType: {} as any,
                        total: 0,
                        paid: 0,
                        rest: 0
                    } as any,
                    orders: [
                        {
                            id: 'ord-1',
                            createdOn: now,
                            createdBy: 'mock',
                            isDeleted: false,
                            totalPrice: 500,
                            finalPrice: 450,
                            rest: 150,
                            paid: 300,
                            discountPercent: 10,
                            discount: 50,
                            remarks: 'أول طلب',
                            status: OrderStatus.غير_مكتمل,
                            clientType: {} as any,
                            client: {} as any
                        },
                        {
                            id: 'ord-2',
                            createdOn: now,
                            createdBy: 'mock',
                            isDeleted: false,
                            totalPrice: 900,
                            finalPrice: 800,
                            rest: 0,
                            paid: 800,
                            discountPercent: 5,
                            discount: 100,
                            remarks: 'مدفوع بالكامل',
                            status: OrderStatus.اكتمل,
                            clientType: {} as any,
                            client: {} as any
                        }
                    ]
                } as IClientFullDTO;
                return of({ data: mock });
            }
            return this.unitOfWorkService.client.getById({ id });
        }),
        catchError((err) => {
            this.toastrService.error('تعذر تحميل بيانات العميل');
            this.router.navigate(['../'], { relativeTo: this.activatedRoute }).catch(() => {
                this.router.navigate(['/clients']);
            });
            return of({ data: {} as IClientFullDTO });
        }),
        shareReplay(1)
    );

    baseOnInit(): void {}

    baseOnDestroy(): void {}
}
