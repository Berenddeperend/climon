import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'angular-highcharts';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  chart;

  constructor( private http: HttpClient ) {}

  ngOnInit() {

    this.http.get('http://localhost:4000/').subscribe(data => {
      let _temps = [];
      let _stamps = [];
      let _locations = [];

      for(let item in data) {
        _temps.push(Number((data[item].temperature).toFixed(1)));
        _stamps.push(moment(data[item].timestamp).format('dd HH:mm'));
        _locations.push(data[item].location);
      }


      this.chart = new Chart({
        chart: {
          type: 'spline'
        },
        // boost: {
        //   enabled: true,
        //   useGPUTranslations: true
        // },
        title: {
          text: 'Temperatuur in Berend\'s woonkamer'
        },
        yAxis: {
          title: {
            text: 'Temperatuur'
          }
        },
        xAxis: {
          title: {
            text: 'Timestamp'
          },
          type: 'datetime',
          categories: _stamps
        },
        plotOptions: {
          spline: {
            dataLabels: {
              enabled: false
            },
            marker: {
              enabled: false
            }
          }
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'Thuis',
          data: _temps
        }]
      });
    });
  }
}
