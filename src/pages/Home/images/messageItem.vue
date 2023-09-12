<template>
  <div class="message-item list-item">
    <div class="user-img">
      <img :src="messageIcon" class="user-avatar" >
    </div>
    <div class="item-content">
      <div class="item-content-top">
        <p class="item-title mb-20">{{ messageTitle }}</p>
        <div class="item-content-tr">
          <p>{{ message.updateTime | dateformat('MM-DD HH:mm:ss') }}</p>
          <div class="redcircle-box">
            <div v-if="!message.readed" class="redcircle" />
          </div>
        </div>
      </div>
      <p class="item-summary">{{ messageContent }}</p>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'MessageItem',
  props: {
    message: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      messageIcon: '',
      messageTitle: '',
      messageContent: ''
    }
  },
  mounted() {
    this.formatMessage()
  },
  methods: {
    formatMessage() {
      // 共16种类型，按index取对应的图片
      const iconIndex = {
        BT_POWER_CUT: 1,
        BT_POWER_TASK: 2,
        BT_MAINT_ORDER: 3,
        BT_MAINT_PLAN: 4,
        BT_PROD_CHECK: 5,
        NBT_PLC_ALERT: 6,
        NBT_DEVICE_LUBRICATE: 7,
        NBT_LUBRICATION_ORDER_TASK: 7,
        NBT_DEVICE_PROBLEM: 8,
        NBT_QUALITY_INSPECTION: 9,
        NBT_ENERGY_COST_OVERLOAD: 10,
        NBT_REPAIR_ORDER: 11,
        NBT_PRODUCTION_REPORT: 12,
        NBT_PRODUCTION_YIELD_ANALYSIS: 13,
        NBT_SAFE_REVIEW_TASK: 14,
        NBT_SPARE_PART_STOCK_WARNING: 15,
        NBT_MAINTENANCE_ORDER_TASK: 3
      }
      const businessType = this.message.businessType
      if (iconIndex[businessType]) {
        this.messageIcon = require('../../assets/messageicon/messageType' + iconIndex[businessType] + '.png')
      } else {
        this.messageIcon = require('../../assets/messageicon/messageType0.png')
      }
      const businessData = JSON.parse(this.message.businessData)
      this.messageTitle = businessData.title
      this.messageContent = businessData.content
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.redcircle {
  width: 8px;
  height: 8px;
  background: #f0445b;
  border-radius: 50%;
  margin-top: 5px;
  margin-left: 10px;
}
.isShowReaded {
  position: absolute;
  top: -2px;
  right: -3px;
  width: 6px;
  height: 6px;
  background: rgba(240, 68, 91, 1);
  border-radius: 50%;
}
.redcircle-box {
  width: 18px;
  height: 18px;
}
.message-item {
  &:first-child {
    padding-top: 8px;
  }
  margin-left: 18px;
  margin-right: 25px;
  padding: 20px 0px;
  border-bottom: 2px solid rgba(240, 242, 245, 1);
  display: flex;
  justify-content: space-between;
  .user-img {
    width: 35px;
    height: 35px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .item-content {
    width: calc(100% - 50px);
    .item-content-top {
      // position: relative;
      display: flex;
      justify-content: space-between;
      .item-content-tr {
        display: flex;
      }
    }
    .item-title,
    .item-content-tr p {
      color: #666666;
      font-size: $--font-size-md;
    }
    .item-title {
      width: 205px;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .item-summary {
      margin-top: 10px;
      color: #333333;
    }
    .item-tip {
      color: #999999;
      margin-top: 12px;
    }
  }
}
</style>
