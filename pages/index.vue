<template>
    <div class="page-articles">
        <p class="articles_text">接入厂商持币权益</p>
        <tabs>
             <tab name="厂商入驻权益持有50万离子币">
               厂商接入离子链时需提交厂商钱包地址，持币数不少于50万离子币。
            </tab>
            <tab name="共识数据定义权持有100万离子币">
                厂商接入离子链时接入数据或操作权限与离子链初始定义的该品类数据字段或操作类型不同，抑或有额外的数据及操作权限。厂商钱包地址内余额为100万离子币时可向离子链基金会提出申请，由基金会授权技术开发组对该厂商接入的共识服务器进行更改（合作厂商不得以无价值或无效数据字段或操作权限充数，解释权归离子链基金会）
            </tab>
            <tab name="收益分配权持有300万离子币">
                设备挖矿收益默认为发放给终端用户，但离子链可通过智能合约将收益进行灵活分配，厂商可至多将40%的挖矿收益分配至任意账户（同时厂商也可选择0%-40%间的任意比例，剩余部分仍归终端用户）
            </tab>
            <tab name="挖矿收益加速持有500万-800万离子币">
                厂商可通过持币数加速旗下挖矿设备的收益，分为四档第一档为持有500万离子币，加速系数为1.1（例：某矿机未加速时矿机每日挖得离子币10个，加速后为10*1.1为11个），第二档持有600万离子币，收益系数为1.2，第三档持有700万离子币，收益系数为1.3，第四档持有800万离子币，收益系数为1.4
            </tab>
        </tabs>
        <div class="articles_remark" v-show="articlesRemark">
            <a class="remark_close" @click="remark_close">
                <svg viewBox="0 0 62 62" >
                    <path d="M33.83 31l9.9 9.9-2.83 2.83-9.9-9.9-9.9 9.9-2.83-2.83 9.9-9.9-9.9-9.9 2.83-2.83 9.9 9.9 9.9-9.9 2.83 2.83-9.9 9.9z" fill="#A5A7AE"></path>
                </svg>
            </a>
            <div><b>备注：</b>以上持币数量以离子币法币价格0.1RMB计算，持币数量月初以上月的币价做动态调整，（例：上月离子币均价为0.2RMB时，厂商只需持有25万离子币即可申请入驻离子链，同理，要获得该月其他权益也仅需持有以上标准的半数离子币）</div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
  data() {
    return {
      articlesRemark: false
    }
  },
  mounted() {
    $('.articles_remark').appendTo('body')
    this.articlesRemark = true
  },
  head() {
    return {
      title: `Index - IONPartnership`
    }
  },
  methods: {
    remark_close() {
      this.articlesRemark = false
    }
  }
}
</script>
