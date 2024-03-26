import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green'],
        datasets: [{
          data: [300, 500, 100, 400],
          backgroundColor: ['red', 'blue', 'yellow', 'green']
        }]
      }
      // options: {
      //   title: {
      //     display: true,
      //     text: 'Pie Chart Example'
      //   }
      // }
    });
  }

}