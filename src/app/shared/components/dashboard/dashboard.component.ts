import { DashboardData } from './../../interfaces/dashboardData';

import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DashboardService } from '../../../core/data/services/dashboard.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public dashboardData!: DashboardData;
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
        label: this.tranlateWord('totalOrderStatus'),
      },
    ],
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
  private _getDashboardData() {
    this._dashboardService.getDashboardData().subscribe((data) => {
      this.dashboardData = data.body;
      this._setBarChartData(data.body);
      this._setPieChartData(data.body);
    });
  }

  private _setBarChartData(dashboardData: DashboardData) {
    this.barChartData.labels?.push(this.tranlateWord('هالك'), this.tranlateWord('جاهز'), this.tranlateWord('استلم'), this.tranlateWord('حجز'), this.tranlateWord('مرتجع'));

    this.barChartData.datasets[0].data.push(
      dashboardData.totalOrderDetailsStatus.totalGoneOrders,
      dashboardData.totalOrderDetailsStatus.totalReadyOrders,
      dashboardData.totalOrderDetailsStatus.totalReceivedOrders,
      dashboardData.totalOrderDetailsStatus.totalReservedOrders,
      dashboardData.totalOrderDetailsStatus.totalReturnedOrders,
    );
  }
  private _setPieChartData(dashboardData: DashboardData) {
    this.pieChartLabels = [this.tranlateWord('completed'), this.tranlateWord('incompleted')];
    this.pieChartDatasets[0].data = [dashboardData.completedAndInCompletedOrders.totalCompletedOrders, dashboardData.completedAndInCompletedOrders.totalInCompletedOrders];
  }

  private tranlateWord(word: string): string {
    return this._translateService.instant(word);
  }
}
