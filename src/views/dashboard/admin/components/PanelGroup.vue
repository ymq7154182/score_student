<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel card-hover" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="grade2" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">本次成绩</div>
          <!--<count-to :start-val="0" :end-val="score_rank[0].score" :duration="2600" class="card-panel-num" />-->
          <div class="card-panel-num">
            {{ score_rank[0].score }}
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel card-hover" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="paiming" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">班级占位：<span class="scorestyle">{{ score_rank[0].classIndex }}</span></div>
          <!--<count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />-->
          <div class="card-panel-text">年级占位：<span class="scorestyle">{{ score_rank[0].schoolIndex }}</span></div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel card-hover" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="jinbu" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">进步最快学科</div>
          <!--<count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" />-->
          <div class="card-panel-num">
            <span v-for="(item, index) in MostProgressSubject" :key="index" class="word">{{ item }}</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel card-hover" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shangsheng" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">需要提高科目</div>
          <!--<count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />-->
          <div class="card-panel-num">
            <span v-for="(item, index) in MostBackSubject" :key="index" class="word">{{ item }}</span>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import CountTo from 'vue-count-to'
import { getMostProgressSubject, getMostBackSubject, ScoreRank } from '@/api/home'

export default {
  // components: {
  //   CountTo
  // },
  data() {
    return {
      userId: this.$store.state.user.token,
      MostProgressSubject: [],
      MostBackSubject: [],
      score_rank: []
    }
  },
  mounted() {
    console.log(this.userId)
    this.getData()
    this.getSoreRank()
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    getData() {
      var param = {
        user_id: this.userId
      }
      getMostProgressSubject(param).then((res) => {
        this.MostProgressSubject = res.data.info
      })
      getMostBackSubject(param).then((res) => {
        this.MostBackSubject = res.data.info
      })
    },
    getSoreRank() {
      var params = {
        userID: this.userId
      }
      ScoreRank(params).then((res) => {
        this.score_rank = res.data.info
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    /*background: #FFEEEE;  !* fallback for old browsers *!*/
    /*background: -webkit-linear-gradient(to right, #DDEFBB, #FFEEEE);  !* Chrome 10-25, Safari 5.1-6 *!*/
    /*background: linear-gradient(to right, #DDEFBB, #FFEEEE); !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!*/
    /*background: #E0EAFC;  !* fallback for old browsers *!*/
    /*background: -webkit-linear-gradient(to right, #CFDEF3, #E0EAFC);  !* Chrome 10-25, Safari 5.1-6 *!*/
    /*background: linear-gradient(to right, #CFDEF3, #E0EAFC); !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!*/
    /*background: #ECE9E6;  !* fallback for old browsers *!*/
    /*background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  !* Chrome 10-25, Safari 5.1-6 *!*/
    /*background: linear-gradient(to right, #FFFFFF, #ECE9E6); !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!*/
    background: #FFEFBA;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FFFFFF, #FFEFBA);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FFFFFF, #FFEFBA); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    /*background: #A1FFCE;  !* fallback for old browsers *!*/
    /*background: -webkit-linear-gradient(to right, #FAFFD1, #A1FFCE);  !* Chrome 10-25, Safari 5.1-6 *!*/
    /*background: linear-gradient(to right, #FAFFD1, #A1FFCE); !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!*/
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    border-radius: 10px;
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #34bfa3
      }
      .icon-shopping {
        background: #f4516c;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #34bfa3
    }
    .icon-shopping {
      color: #f4516c;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
      .scorestyle {
        font-size: 20px;
        color: #666666;
      }
      .word {
        margin-right: 10px;
      }
    }
  }
  .card-hover {
    transition: all 0.6s;
  }
  .card-hover:hover {
    transform: translateY(-5px);
  }
}
</style>
