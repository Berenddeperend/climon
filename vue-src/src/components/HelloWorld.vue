<template>
  <div class="hello">
    <p>Dit zijn de models:</p>



    <el-select v-model="selectedModel" placeholder="Select">
      <el-option
        v-for="model in models"
        :key="model"
        :value="model">
      </el-option>
    </el-select>

    <el-date-picker
      v-model="dateRange"
      type="datetimerange"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date">
    </el-date-picker>

    <input type="date">


    <div id="chart"></div>

    <table>
      <tr>
        <th>Tijdstip</th>
        <th>humidity</th>
        <th>temperature</th>
      </tr>
      <tr v-for="(item, index) in data" :key="index">
        <td>{{item.time}}</td>
        <td>{{item.humidity}}</td>
        <td>{{item.temperature}}</td>
      </tr>
    </table>

  </div>
</template>

<script>

import Highcharts from 'highcharts';
import { format } from 'date-fns'

let chart;
const url = "http://localhost:4000";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
  	return {
      models: [],
      selectedModel: null,
      data: null,
      temperatures: null,
      timestamps: null,
      dateRange: null
    }
  },
  methods: {
  	getCollections() {
  	  fetch(`${url}/api/collections`)
        .then(res => res.json())
        .then(json => {
	        this.models = json;
        });
    },
    onSelectModel(event) {
  		console.log(event.target.value);
  		this.fetchAllFromCollection(event.target.value);
    },

    fetchAllFromCollection(collection) {
      // fetch(`http://localhost:4000/climon/data/${collection}`)
      // fetch(`${url}/api/${collection}/query`)
      fetch(`${url}/api/climon/query`, {
        headers: {
          "query": "SELECT * FROM lucht" 
        }
      })
          .then(res => res.json())
          .then(json => {
            this.data = json;


            this.temperatures = json.map(entry => entry.temperature )
            this.humidity = json.map(entry => entry.humidity )
            this.timestamps = json.map(entry => format(entry.time, 'dd Do MMM HH:mm') )

            // chart.update({
            //   categories: [...this.timestamps]
            // }, )

            // chart.series[0].update({
            //   data: this.temperatures
            // }, false)

            // chart.series[1].update({
            //   data: this.humidity
            // }, true)


              chart = new Highcharts.chart('chart', {
                    chart: {
                          type: 'spline',
                          zoomType: 'x'
                      },
                      title: {
                          text: 'Berend\'s woonkamer'
                      },
                      tooltip: {
                        enabled: false,
                          // shared: true,
                          // crosshairs: true
                      },
                      series: [{
                          name: 'temperature',
                          data: this.temperatures
                      },{
                          name: 'humidity',
                          data: this.humidity
                      }],
                      xAxis: {
                        categories: this.timestamps,
                      }
                  })



          });
    }
  },
  mounted() {

    document.addEventListener('scroll', (e) => {
      console.count(e)
    })

    this.getCollections();
    this.fetchAllFromCollection();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
</style>
