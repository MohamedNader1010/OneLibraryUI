import { IDashboard } from '../../../core/data/models/dashboard/dashboard.interface';

import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DashboardService } from '../../../core/data/services/dashboard.service';

import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { IDashboardStatistics } from '../../../core/data/models/dashboard/dashboard-statistics.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public dashboardData!: IDashboard;
  public dashboardStatistics!: IDashboardStatistics | null;
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels: string[] = [];
  public pieChartDatasets = [
    {
      data: [0, 0],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private _dashboardService: DashboardService, private _translateService: TranslateService) {}

  ngOnInit() {
    this._getDashboardData();
  }
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: this.translateWord('totalOrderStatus'),
      },
    ],
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
  private _getDashboardData() {
    forkJoin([this._dashboardService.getDashboardData(), this._dashboardService.getStatistics()]).subscribe(([data, statisticsResponse]) => {
      this.dashboardData = data.body;
      this.dashboardStatistics = statisticsResponse.body;
      this._setBarChartData(data.body);
      this._setPieChartData(data.body);
    });
  }

  private _setBarChartData(dashboardData: IDashboard) {
    this.barChartData.labels?.push(this.translateWord('هالك'), this.translateWord('جاهز'), this.translateWord('استلم'), this.translateWord('حجز'), this.translateWord('مرتجع'));

    this.barChartData.datasets[0].data.push(
      dashboardData.totalOrderDetailsStatus.totalGoneOrders,
      dashboardData.totalOrderDetailsStatus.totalReadyOrders,
      dashboardData.totalOrderDetailsStatus.totalReceivedOrders,
      dashboardData.totalOrderDetailsStatus.totalReservedOrders,
      dashboardData.totalOrderDetailsStatus.totalReturnedOrders,
    );
  }
  private _setPieChartData(dashboardData: IDashboard) {
    this.pieChartLabels = [this.translateWord('completed'), this.translateWord('incompleted')];
    this.pieChartDatasets[0].data = [dashboardData.completedAndInCompletedOrders.totalCompletedOrders, dashboardData.completedAndInCompletedOrders.totalInCompletedOrders];
  }

  private translateWord(word: string): string {
    return this._translateService.instant(word);
  }
}
