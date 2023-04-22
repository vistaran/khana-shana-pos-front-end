import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
    selector: 'sb-charts-area',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './charts-area.component.html',
    styleUrls: ['charts-area.component.scss'],
})
export class ChartsAreaComponent implements OnInit, AfterViewInit {
    @ViewChild('myAreaChart') myAreaChart!: ElementRef<HTMLCanvasElement>;
    chart!: Chart;

    constructor(
        private ref: ChangeDetectorRef
    ) { }
    ngOnInit() {
        setInterval(() => {
            this.updateChart();
            this.ref.detectChanges();
        }, 10000);
    }

    ngAfterViewInit() {
        this.chart = new Chart(this.myAreaChart.nativeElement, {
            type: 'line',
            data: {
                labels: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                datasets: [
                    {
                        label: 'Sessions',
                        lineTension: 0.3,
                        backgroundColor: 'rgba(0, 161, 68,0.2)',
                        borderColor: 'rgba(0, 147, 0,1)',
                        pointRadius: 5,
                        pointBackgroundColor: 'rgba(0, 147, 0,1)',
                        pointBorderColor: 'rgba(255,255,255,0.8)',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(0, 147, 0,1)',
                        pointHitRadius: 50,
                        pointBorderWidth: 2,
                        data: [
                            20,
                            25,
                            30,
                            35,
                            20,
                            30,
                            35,
                            40,
                            45,
                            50,
                            55,
                            Math.floor(Math.random() * (100 - 50 + 1) + 50)
                        ],
                    },
                ],
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            time: {
                                unit: 'day',
                            },
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                maxTicksLimit: 7,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                min: 0,
                                max: 150,
                                maxTicksLimit: 5,
                            },
                            gridLines: {
                                color: 'rgba(0, 0, 0, .125)',
                            },
                        },
                    ],
                },
                legend: {
                    display: false,
                },
            },
        });
    }

    updateChart() {
        this.chart.data = {
            labels: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            datasets: [
                {
                    label: 'Sessions',
                    lineTension: 0.3,
                    backgroundColor: 'rgba(0, 161, 68,0.2)',
                    borderColor: 'rgba(0, 147, 0,1)',
                    pointRadius: 5,
                    pointBackgroundColor: 'rgba(0, 147, 0,1)',
                    pointBorderColor: 'rgba(255,255,255,0.8)',
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(0, 147, 0,1)',
                    pointHitRadius: 50,
                    pointBorderWidth: 2,
                    data: [
                        20,
                        25,
                        30,
                        35,
                        20,
                        30,
                        35,
                        40,
                        45,
                        Math.floor(Math.random() * (100 - 50 + 1) + 50),
                        Math.floor(Math.random() * (100 - 50 + 1) + 50),
                        Math.floor(Math.random() * (100 - 50 + 1) + 50)
                    ]
                }
            ]
        };
        this.chart.update();
    }
}
