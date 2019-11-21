<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import 'echarts-liquidfill/src/liquidFill.js'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { ScoreInfo } from '@/api/home'
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
    }
  },
  data() {
    return {
      chart: null,
      scoredate: [
        {
          value: '',
          name: '语文'
        },
        {
          value: '',
          name: '数学'
        },
        {
          value: '',
          name: '英语'
        },
        {
          value: '',
          name: '物理'
        },
        {
          value: '',
          name: '化学'
        },
        {
          value: '',
          name: '生物'
        },
        {
          value: '',
          name: '历史'
        },
        {
          value: '',
          name: '地理'
        },
        {
          value: '',
          name: '政治'
        }
      ],
      coversionTotal: ''
    }
  },
  mounted() {
    this.getScoreInfo()
    // this.initChart()
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
      var _this = this
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        title: {
          top: '45%',
          left: 'center',
          text: '最近一次考试得分情况',
          textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 14
          },
          subtext: '总得分：' + _this.coversionTotal,
          subtextStyle: {
            color: '#fff',
            fontSize: 12
          }
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
          left: 'center',
          bottom: '10'
        },
        tooltip: {
          trigger: 'item',
          formatter: function(res) {
            console.log(res)

            if (res.componentSubType === 'liquidFill') {
              return res.seriesName + ': ' + _this.coversionTotal
            } else {
              return '<span class="ii" style="background:' + res.color + ' "></span>' + res.name + ': ' + res.data.value + '分'
            }
          }
        },
        series: [{
          type: 'liquidFill',
          itemStyle: {
            normal: {
              opacity: 0.4,
              shadowBlur: 0,
              shadowColor: 'blue'
            }
          },
          name: '最近一次考试总分',
          data: [{
            value: 0.7,
            itemStyle: {
              normal: {
                color: '#53d5ff',
                opacity: 1
              }
            }
          }],
          //  background: '#fff',
          color: ['#53d5ff'],
          center: ['50%', '50%'],
          /*  backgroundStyle: {
                color: '#fff'
            },*/
          label: {
            normal: {
              formatter: '',
              textStyle: {
                fontSize: 12
              }
            }
          },
          outline: {
            itemStyle: {
              borderColor: '#86c5ff',
              borderWidth: 0
            },
            borderDistance: 0
          }
        },
        {
          type: 'pie',
          radius: ['42%', '50%'],
          color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#FF9900', '#63C2FF', '#FF9999', '#66CCCC'],
          hoverAnimation: false, // 设置饼图默认的展开样式
          label: {
            show: true,

            normal: {
              formatter: function(res) {
                return res.name + ': ' + res.data.value + '分'
              },
              show: true,
              position: ''
            }
          },
          labelLine: {
            normal: {
              show: true
            }
          },

          itemStyle: { // 此配置
            normal: {
              borderWidth: 2,
              borderColor: '#fff'
            },
            emphasis: {
              borderWidth: 0,
              shadowBlur: 2,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: _this.scoredate
        }
        ]
      })
    },
    getScoreInfo() {
      var params = {
        userID: this.$store.state.user.token
      }
      ScoreInfo(params).then((res) => {
        this.scoredate[0].value = res.data.info.yuwenScore
        this.scoredate[1].value = res.data.info.shuxueScore
        this.scoredate[2].value = res.data.info.yingyuScore
        this.scoredate[3].value = res.data.info.wuliCoversion
        this.scoredate[4].value = res.data.info.huaxueCoversion
        this.scoredate[5].value = res.data.info.shengwuCoversion
        this.scoredate[6].value = res.data.info.lishiCoversion
        this.scoredate[7].value = res.data.info.diliCoversion
        this.scoredate[8].value = res.data.info.zhengzhiCoversion
        this.coversionTotal = res.data.info.coversionTotal
        console.log(this.scoredate)
        this.initChart()
      })
    }
  }
}
</script>

<style scoped>

</style>
