<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions({ classIndex, schoolIndex, date } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: '历次考试班内排名和全校排名情况折线图'
        },
        legend: {
          color: ['#F58080', '#47D8BE', '#F9A589'],
          data: ['班内排名', '全校排名'],
          left: 'center'
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          top: 'middle',
          left: '3%',
          right: '4%',
          bottom: '3%',
          height: '80%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: date,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#DDD'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#333'
            }
          },
          nameTextStyle: {
            color: '#999'
          },
          splitArea: {
            show: false
          }
        },
        series: [{
          name: '班内排名',
          type: 'line',
          data: classIndex,
          color: '#F58080',
          lineStyle: {
            normal: {
              width: 5,
              color: {
                type: 'linear',
                colorStops: [{
                  offset: 0,
                  color: '#FFCAD4' // 0% 处的颜色
                }, {
                  offset: 0.4,
                  color: '#F58080' // 100% 处的颜色
                }, {
                  offset: 1,
                  color: '#F58080' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(245,128,128, 0.5)',
              shadowBlur: 10,
              shadowOffsetY: 7
            }
          },
          itemStyle: {
            normal: {
              color: '#F58080',
              borderWidth: 10,
              borderColor: '#F58080'
            }
          },
          smooth: true,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '全校排名',
          type: 'line',
          data: schoolIndex,
          lineStyle: {
            normal: {
              width: 5,
              color: {
                type: 'linear',

                colorStops: [{
                  offset: 0,
                  color: '#AAF487' // 0% 处的颜色
                },
                {
                  offset: 0.4,
                  color: '#47D8BE' // 100% 处的颜色
                },
                {
                  offset: 1,
                  color: '#47D8BE' // 100% 处的颜色
                }
                ],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(71,216,190, 0.5)',
              shadowBlur: 10,
              shadowOffsetY: 7
            }
          },
          itemStyle: {
            normal: {
              color: '#AAF487',
              borderWidth: 10,
              borderColor: '#AAF487'
            }
          },
          smooth: true,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }
        ]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>

<style scoped>

</style>
