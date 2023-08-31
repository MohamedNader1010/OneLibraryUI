import { DashboardData } from './../../interfaces/dashboardData';

import {
  Component,
  OnInit,
} from "@angular/core";
import {   ChartConfiguration, ChartOptions } from "chart.js";
import { DashboardService } from "../../services/dashboard.service";

import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public dashboardData!: DashboardData;
  //pie chart
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
  //bar chart
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
    this.barChartData.labels?.push(
      this.tranlateWord(dashboardData.totalOrderDetailsStatus.totalGoneOrders.key),
      this.tranlateWord(dashboardData.totalOrderDetailsStatus.totalPreparedOrders.key),
      this.tranlateWord(dashboardData.totalOrderDetailsStatus.totalReadyOrders.key),
      this.tranlateWord(dashboardData.totalOrderDetailsStatus.totalReceivedOrders.key),
      this.tranlateWord(dashboardData.totalOrderDetailsStatus.totalReservedOrders.key),
      this.tranlateWord(dashboardData.totalOrderDetailsStatus.totalReturnedOrders.key),
    );

    this.barChartData.datasets[0].data.push(
      dashboardData.totalOrderDetailsStatus.totalGoneOrders.value,
      dashboardData.totalOrderDetailsStatus.totalPreparedOrders.value,
      dashboardData.totalOrderDetailsStatus.totalReadyOrders.value,
      dashboardData.totalOrderDetailsStatus.totalReceivedOrders.value,
      dashboardData.totalOrderDetailsStatus.totalReservedOrders.value,
      dashboardData.totalOrderDetailsStatus.totalReturnedOrders.value,
    );
  }
  private _setPieChartData(dashboardData: DashboardData) {
    this.pieChartLabels = [
      this.tranlateWord(dashboardData.completedAndInCompletedOrders.totalCompletedOrders.key),
      this.tranlateWord(dashboardData.completedAndInCompletedOrders.totalInCompletedOrders.key),
    ];
    this.pieChartDatasets[0].data = [dashboardData.completedAndInCompletedOrders.totalCompletedOrders.value, dashboardData.completedAndInCompletedOrders.totalInCompletedOrders.value];
  }

  private tranlateWord(word: string): string {
    return this._translateService.instant(word);
  }
}
