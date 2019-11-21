<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { ClassByondRate, SchoolByondRate } from '@/api/home'

const animationDuration = 3000
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    },
    radiovalue: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      chart: null,
      byondRateList: [],
      subjectRateList: []
    }
  },
  watch: {
    radiovalue: function(val) {
      if (val === 1) {
        this.getClassByondRate()
      } else {
        this.getSchoolByondRate()
      }
    }
  },
  mounted() {
    if (this.radiovalue === 1) {
      this.getClassByondRate()
    } else {
      this.getSchoolByondRate()
    }
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true }
          }
        },
        radar: {
          radius: '66%',
          center: ['50%', '42%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: [
            { name: '语文', max: 1 },
            { name: '数学', max: 1 },
            { name: '英语', max: 1 },
            { name: '物理', max: 1 },
            { name: '化学', max: 1 },
            { name: '生物', max: 1 },
            { name: '地理', max: 1 },
            { name: '历史', max: 1 },
            { name: '政治', max: 1 }
          ]
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['总分超越率', '单科超越率']
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 0.6
            }
          },
          data: [
            {
              value: this.byondRateList,
              name: '总分超越率'
            },
            {
              value: this.subjectRateList,
              name: '单科超越率'
            }
          ],
          animationDuration: animationDuration
        }]
      })
    },
    getClassByondRate() {
      var params = {
        userID: this.$store.state.user.token
      }
      ClassByondRate(params).then((res) => {
        var byondRateList = []
        var subjectRateList = []
        for (var i = 0; i < 9; i++) {
          byondRateList.push(res.data.info.byondRate)
        }
        this.byondRateList = byondRateList
        subjectRateList[0] = res.data.info.yuwenByrate
        subjectRateList[1] = res.data.info.shuxueByrate
        subjectRateList[2] = res.data.info.yingyuByrate
        subjectRateList[3] = res.data.info.wuliByrate
        subjectRateList[4] = res.data.info.huaxueByrate
        subjectRateList[5] = res.data.info.shengwuByrate
        subjectRateList[6] = res.data.info.diliByrate
        subjectRateList[7] = res.data.info.lishiByrate
        subjectRateList[8] = res.data.info.zhengzhiByrate
        this.subjectRateList = subjectRateList
        console.log(this.subjectRateList)
        this.initChart()
      })
    },
    getSchoolByondRate() {
      var params = {
        userID: this.$store.state.user.token
      }
      SchoolByondRate(params).then((res) => {
        var byondRateList = []
        var subjectRateList = []
        for (var i = 0; i < 9; i++) {
          byondRateList.push(res.data.info.byondRate)
        }
        this.byondRateList = byondRateList
        subjectRateList[0] = res.data.info.yuwenByrate
        subjectRateList[1] = res.data.info.shuxueByrate
        subjectRateList[2] = res.data.info.yingyuByrate
        subjectRateList[3] = res.data.info.wuliByrate
        subjectRateList[4] = res.data.info.huaxueByrate
        subjectRateList[5] = res.data.info.shengwuByrate
        subjectRateList[6] = res.data.info.diliByrate
        subjectRateList[7] = res.data.info.lishiByrate
        subjectRateList[8] = res.data.info.zhengzhiByrate
        this.subjectRateList = subjectRateList
        console.log(this.subjectRateList)
        this.initChart()
      })
    }
  }
}
</script>

<style scoped>

</style>
