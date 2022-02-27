<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日订单总数</div>
          <count-to
            :start-val="0"
            :end-val="todayOrder"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">本周订单总数</div>
          <count-to
            :start-val="0"
            :end-val="weekOrder"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日销售总额</div>
          <count-to
            :start-val="0"
            :end-val="todayMoney"
            :duration="3200"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">本周销售总额</div>
          <count-to
            :start-val="0"
            :end-val="weekMoney"
            :duration="3600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";
import { getOrderTotal } from "@/api/chart";
export default {
  components: {
    CountTo,
  },
  data() {
    return {
      todayStart: "",
      todayEnd: "",
      todayOrder: 0,
      weekOrder: 0,
      weekStart: "",
      weekEnd: "",
      todayMoney: 0,
      weekMoney: 0,
    };
  },
  created() {
    this.todayStart = this.dayjs().format("YYYY-MM-DD 00:00:00");
    this.todayEnd = this.dayjs().format("YYYY-MM-DD 23:59:59");
    this.weekStart = this.dayjs()
      .subtract(7, "day")
      .format("YYYY-MM-DD 00:00:00");
    this.weekEnd = this.dayjs().format("YYYY-MM-DD 23:59:59");
    this.getTodayOrder(this.todayStart, this.todayEnd);
    this.getWeekOrder(this.weekStart, this.weekEnd);
  },
  methods: {
    // 今日订单
    getTodayOrder(start, end) {
      getOrderTotal({ start, end }).then((res) => {
        const orderList = res.data.rows;
        // 订单总数
        this.todayOrder = res.data.count;
        // 订单总金额
        if ((orderList ?? "") != "" ) {
          orderList.forEach((item) => {
            item.order_details.forEach((value) => {
              this.todayMoney += value.order_quantity * value.price;
            });
          });
        }
      });
    },
    // 本周订单
    getWeekOrder(start, end) {
      getOrderTotal({ start, end }).then((res) => {
        const orderList = res.data.rows;
        // 订单总数
        this.weekOrder = res.data.count;
        // 订单总金额
        if (orderList.length != 0) {
          orderList.forEach((item) => {
            item.order_details.forEach((value) => {
              this.weekMoney += value.order_quantity * value.price;
            });
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

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
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
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
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
