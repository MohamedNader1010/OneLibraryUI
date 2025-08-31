import { Component, inject } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

import { TranslateService } from '@ngx-translate/core';
import { finalize, forkJoin } from 'rxjs';
import { DestroyableComponentBase } from '../../classes/destroyable-component-base.abstract';
import { UnitOfWorkService } from '../../../core/services/unit-of-work.service';
import { IDashBoardDataDTO } from '../../../core/models/DashBoard/dtos/dashboard-data-dto.interface';
import { IDashboardStatisticsDTO } from '../../../core/models/DashBoard/dtos/dashboard-statistics-dto.interface';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent extends DestroyableComponentBase {
    unitOfWorkService = inject(UnitOfWorkService);
    translateService = inject(TranslateService);

    dashboardData!: IDashBoardDataDTO;
    dashboardStatistics!: IDashboardStatisticsDTO | null;
    pieChartOptions: ChartOptions<'pie'> = {
        responsive: true
    };
    pieChartLabels: string[] = [];
    pieChartDatasets = [
        {
            data: [0, 0]
        }
    ];
    pieChartLegend = true;
    pieChartPlugins = [];
    isLoading = true;

    baseOnInit() {
        this.isLoading = true;
        forkJoin([this.unitOfWorkService.dashboard.getDashboardData(), this.unitOfWorkService.dashboard.getStatistics()])
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe({
                next: ([dataResponse, statisticsResponse]) => {
                    this.dashboardData = dataResponse.data;
                    this.dashboardStatistics = statisticsResponse.data;
                    this.setBarChartData(dataResponse.data);
                    this.setPieChartData(dataResponse.data);
                }
            });
    }

    barChartLegend = true;
    barChartPlugins = [];
    barChartData: ChartConfiguration<'bar'>['data'] = {
        labels: [],
        datasets: [
            {
                data: [],
                label: this.translateWord('totalOrderStatus')
            }
        ]
    };
    barChartOptions: ChartConfiguration<'bar'>['options'] = {
        responsive: true
    };

    setBarChartData(dashboardData: IDashBoardDataDTO) {
        this.barChartData.labels?.push(
            this.translateWord('هالك'),
            this.translateWord('جاهز'),
            this.translateWord('استلم'),
            this.translateWord('حجز'),
            this.translateWord('مرتجع')
        );

        this.barChartData.datasets[0].data.push(
            dashboardData.totalOrderDetailsStatus.totalGoneOrders,
            dashboardData.totalOrderDetailsStatus.totalReadyOrders,
            dashboardData.totalOrderDetailsStatus.totalReceivedOrders,
            dashboardData.totalOrderDetailsStatus.totalReservedOrders,
            dashboardData.totalOrderDetailsStatus.totalReturnedOrders
        );
    }
    setPieChartData(dashboardData: IDashBoardDataDTO) {
        this.pieChartLabels = [this.translateWord('completed'), this.translateWord('incompleted')];
        this.pieChartDatasets[0].data = [
            dashboardData.completedAndInCompletedOrders.totalCompletedOrders,
            dashboardData.completedAndInCompletedOrders.totalInCompletedOrders
        ];
    }

    translateWord(word: string): string {
        return this.translateService.instant(word);
    }

    baseOnDestroy(): void {
        this.unitOfWorkService.unsubscribe();
    }
}
