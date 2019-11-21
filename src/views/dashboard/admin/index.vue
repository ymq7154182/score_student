<template>
  <div class="dashboard-editor-container">

    <!--<github-corner style="position: absolute; top: 0px; border: 0; right: 0;" />-->

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="padding:16px 16px 0;margin-bottom:32px;">
      <line-chart2 :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="title_word">
          <span>{{ examName }}</span>
        </div>
        <div class="title_word2">
          <span>- 成绩超越率 -</span>
        </div>
        <div class="title_word3">
          <span>各科目超越率雷达图</span>
        </div>
        <div class="radiostyle">
          <el-radio-group v-model="radio">
            <el-radio :label="1">班级</el-radio>
            <el-radio :label="2">学校</el-radio>
          </el-radio-group>
        </div>
        <div class="chart-wrapper">
          <raddar-chart2 :radiovalue="radio" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <div class="title_word">
            <span>{{ examName }}</span>
          </div>
          <div class="title_word3">
            <span>最近一次考试得分情况</span>
          </div>
          <pie-chart2 />
        </div>
      </el-col>
    </el-row>
  <!--<el-row :gutter="8">-->
  <!--<el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">-->
    <!--<transaction-table />-->
  <!--</el-col>-->
  <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
    <!--<todo-list />-->
  <!--</el-col>-->
  <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
    <!--<box-card />-->
  <!--</el-col>-->
  <!--</el-row>-->
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
import { ExamsScore, ExamInfo } from '@/api/home'
import PanelGroup from './components/PanelGroup'
// import LineChart from './components/LineChart'
import LineChart2 from './components/LineChart2'
// import RaddarChart from './components/RaddarChart'
import RaddarChart2 from './components/RaddarChart2'
// import PieChart from './components/PieChart'
import PieChart2 from './components/PieChart2'
// import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

// const lineChartData = {
//   newVisitis: {
//     expectedData: [100, 120, 161, 134, 105, 160, 165],
//     actualData: [120, 82, 91, 154, 162, 140, 145],
//     date: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//   },
//   messages: {
//     expectedData: [200, 192, 120, 144, 160, 130, 140],
//     actualData: [180, 160, 151, 106, 145, 150, 130]
//   },
//   purchases: {
//     expectedData: [80, 100, 121, 104, 105, 90, 100],
//     actualData: [120, 90, 100, 138, 142, 130, 130]
//   },
//   shoppings: {
//     expectedData: [130, 140, 141, 142, 145, 150, 160],
//     actualData: [120, 82, 91, 154, 162, 140, 130]
//   }
// }

export default {
  name: 'DashboardAdmin',
  components: {
    // GithubCorner,
    PanelGroup,
    // LineChart,
    LineChart2,
    // RaddarChart,
    RaddarChart2,
    // PieChart,
    PieChart2
    // BarChart,
    // TransactionTable,
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      lineChartData: {
        date: [],
        classIndex: [],
        schoolIndex: []
      },
      radio: 1,
      examName: ''
    }
  },
  created() {
    this.getExamInfo()
    this.getExamsScore()
  },
  methods: {
    handleSetLineChartData(type) {
      // this.lineChartData = lineChartData[type]
    },
    getExamsScore() {
      var params = {
        userID: this.$store.state.user.token
      }
      ExamsScore(params).then((res) => {
        this.lineChartData.date = res.data.info.map(x => {
          return x.examName
        })
        this.lineChartData.classIndex = res.data.info.map(x => {
          return x.classIndex
        })
        this.lineChartData.schoolIndex = res.data.info.map(x => {
          return x.studentschoolIndex
        })
        console.log(this.lineChartData.classIndex)
      })
    },
    getExamInfo() {
      var params = {
        userID: this.$store.state.user.token
      }
      ExamInfo(params).then((res) => {
        this.examName = res.data.info[0].examName
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    /*background: #fff;*/
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .radiostyle {
    width: 100%;margin: 0 auto;text-align: center;
  }
  .title_word {
    width: 100%;
    margin: 0 auto;
    font-weight: bolder;
    text-align: center;
  }
  .title_word2 {
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    font-weight: bolder;
    color: #66CCCC;
  }
  .title_word3 {
    width: 100%;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    color: #5FB3DD;
    font-size: 20px;
    font-weight: bolder;
  }
}
</style>
