<template>
  <div class="indexPage">
      <Load v-if="this.$store.state.isShow"/>
      <div style="padding: 0;">
        <div class="index_toper">
            <div class="index_unbinded" v-show="!judgeFlag.bindFlag">
                <div class="index_unbindedTips">亲，需要绑定号码才能查看完整信息哟~</div>
                <div class="index_unbindedBtn" @click="bindFun">绑定号码</div>
            </div>
            <div class="index_binded" v-show="judgeFlag.bindFlag">
                <span class="index_name">姓名：{{resBind.userName}}</span>
                <span class="index_phone">电话：{{resBind.phoneNumber}}</span>
                <span class="index_time">查询截止时间：{{resBind.endTime}}</span>
            </div>
        </div>
        <div class="index_box">
            <div class="index_infoInner">
                <div class="index_infoItem">
                    <div class="index_infoRow">当前可用余额</div>
                    <div class="index_infoRow">
                        <span class="index_infoPrice index_money">{{flowData.money}}</span>元
                    </div>
                    <div class="index_infoBtn index_pay" @click="payFun">充话费</div>
                </div>
                <div class="index_infoItem">
                    <div class="index_infoRow index_flowTxt">{{flowChara}}</div>
                    <div class="index_infoRow">
                        <span class="index_infoPrice index_flow">{{flowData.flow}}</span><span class="index_flowUnit">{{flowData.Unit}}</span>
                    </div>
                    <div class="index_infoBtn index_detail" data-info="detail" @click="publicPrups">查明细</div>
                </div>
            </div>
        </div>
        <div class="index_tips">注：本页面仅展示常用话费流量，数据仅供参考使用，如您有订购其他流量包或者想查看具体余量详情，请前往“手机营业厅”APP进行查询。</div>
        <div class="index_box">
            <div class="index_features">热门功能</div>
            <div class="index_featuresList">
                <div class="index_featuresItem">
                    <img src="https://www.189.cn/client/wap/wapclient/flowquery/images/index_features1.png" class="index_bill" data-info="bill" @click="publicPrups">
                </div>
                <div class="index_featuresItem">
                    <img src="https://www.189.cn/client/wap/wapclient/flowquery/images/index_features2.png" class="index_call" data-info="call" @click="publicPrups">
                </div>
                <div class="index_featuresItem">
                    <img src="https://www.189.cn/client/wap/wapclient/flowquery/images/index_features3.png" class="index_more" data-info="more" @click="publicPrups">
                </div>
                <div class="index_featuresItem">
                    <img src="https://www.189.cn/client/wap/wapclient/flowquery/images/index_features4.png" class="index_online" @click="kefuFun">
                </div>
            </div>
        </div>
        <div class="index_box">
            <img src="https://www.189.cn/client/wap/wapclient/flowquery/images/index_down.png" class="index_down index_queryBan" data-info="query" @click="queryFun">
        </div>
        <div class="index_box index_boxLast">
            <img src="https://www.189.cn/client/wap/wapclient/flowquery/images/index_networkAge.png" class="index_down index_networkAge" @click="ageFun">
        </div>
        <div class="index_mask" v-show="judgeFlag.isMask"></div>
        <!-- 绑定弹窗 -->
        <Bind v-show="judgeFlag.isBind" :bindLink='linkData.bindLink' @receve="getChild"/>
        <!--公共弹窗-->
        <Public v-if="judgeFlag.isPublic" :info="PublicMsg" @publicMsg='getPublic'/>
    </div>
  </div>
</template>

<script>
import Bind from './flowquery_bind';
import Public from './flowquery_public';
import Load from './flowquery_load';
export default {
    components:{
        Bind,Public,Load
    },
    data(){
        return {
            paramData:{},//存储链接参数
            sName:'flowquery', //sessionStorage存储项目key
            resBind:'',//存储是否绑定返回信息
            localData:{},//缓存里存储的信息
            flowChara:'可用流量',//判断流量余额，是否改变html内容
            PublicMsg:'',//公共弹窗传递信息
            judgeFlag:{//所有v-show的内容
                bindFlag:false,//是否显示绑定区域的DOM
                isBind:false,//是否弹出现在绑定弹窗
                isPublic:false,//是否弹出公共弹窗
                isMask:false//是否弹出蒙版
            },
            flowData:{ //话费余量以及单位
                money:'--',
                flow:'--',
                Unit:'MB'
            },
            linkData:{
                bindLink:''
            }
        }
    },
    //vue实例的挂载元素el没有但是data有了
    created:function(){
        //修改根节点字体大小
        this.remChange();
        window.addEventListener('resize', this.remChange, false);
        //这里从路由中获取query中的所有数据，保存到paramData
        this.paramData=this.$route.query;
        //因为vue重定向页面会刷新页面,所以要提前保存openid
        if(this.paramData.openid){
            sessionStorage.setItem(this.sName,JSON.stringify(this.paramData));
            this.remParsToLink('openid');  
        }
    },
    mounted(){
        this.getData();  //获取数据，一般用来axios请求
    },
    //在vue页面销毁时，删除本地缓存信息
    destoryed(){
        sessionStorage.removeItem(this.sName);
    },
    methods:{
        //修改根节点字体大小
        remChange:function(){
            document.documentElement.style.fontSize = 18 * ($('body').width() / 360) + 'px';
        },
        //pars 必传参数 删除链接上的参数openid|toUserName
        //link 非必传
        remLinkPars:function(pars, link){
            var search;
            if(pars){
                !link && (link = location.href);
                search = link.split('?')[1];
                if(search){
                    search = search.replace(new RegExp('(' + pars + ')' + '[^&]*&?', 'gi'), '');
                    search = search.replace(/&$/, '')
                    return link.split('?')[0] + (search && ('?' + search))
                }else{
                    return link;
                }
            }
            console.log(link)
            return link || location.href;
        },
        remParsToLink:function(pars, link){
           location.replace(this.remLinkPars(pars,link));
        },
        //获取数据，对Dom进行操作
        getData:function(){
            this.localData= JSON.parse(sessionStorage.getItem(this.sName));
            if(!this.localData){
                window.location.href = 'https://www.189.cn/client/wap/common/page/error_404.html?errorCode=20001';
            }
            var param={
                "headerInfo": { "functionCode": "netCardQueryBalance"},"requestContent":{"toUserName":this.localData.toUserName || '',"openid":this.localData.openid || '',"backurl":location.href.split('#')[0]}
            }
            this.$http({
                url:'netCardQueryBalance.do',
                method:'post',
                data:JSON.stringify(param),
            }).then((res)=>{
                if (res.data.headerInfo.code === 'W_0000' && res.data.responseContent.serviceCode === '0') {
                    this.resBind=res.data.responseContent;
                    this.linkData.bindLink=this.resBind.bindingUrl+encodeURIComponent(location.href.split('#')[0]);
                    alert(this.linkData.bindLink);
                    if(!this.unbindFun()){  //未绑定弹窗
                        return false;
                    }else{
                        this.judgeFlag.bindFlag = true;
                        this.resBind.userName = this.resBind.userName ? this.resBind.userName : '';//回填用户名
                        this.resBind.phoneNumber = this.resBind.phoneNumber ? this.resBind.phoneNumber : '';//回填手机号
                        this.resBind.endTime = this.resBind.endTime ? this.resBind.endTime : '';//回填日期
                        this.flowData.money = this.resBind.callBalance || '--'//回填话费余额
                        if(this.resBind.flowBalance){
                            this.flowData.flow=this.resBind.flowBalance.replace(/[a-zA-z]/g,'');//回填可用通用流量
                            this.flowData.Unit=this.resBind.flowBalance.replace(/[0-9\.]/g,'');//截取流量单位
                        }else{
                            this.flowChara='已用流量'
                            this.flowData.flow = this.resBind.flowUsed ? this.resBind.flowUsed.replace(/[a-zA-z]/g,'') : '--';
                            this.flowData.Unit = this.resBind.flowUsed ? this.resBind.flowUsed.flowUsed.replace(/[0-9\.]/g,'') : 'MB';
                        }
                    }
                }else{
                    window.location.href = 'https://www.189.cn/client/wap/common/page/error_404.html?errorCode=20001';
                }
            })
        },
        //判断是否弹出绑定弹窗
        unbindFun :function(){
            if(!this.resBind.isBinding){
                this.common.openBoxBefore();  //禁止滚动
                this.judgeFlag.isMask=true;
                this.judgeFlag.isBind=true;  //显示蒙版和绑定弹窗
                return false;
            }else{
                return true;
            }
        },
        //现在绑定按钮事件
        bindFun:function(){
            try{trk_wap_jt.trkAppButtonClick("现在绑定", "jt_hlwk_ylcx_bdtc","","","");}catch(e){};
            alert(this.linkData.bindLink)
            window.location.href=this.linkData.bindLink;
        },
        //获取绑定弹窗组件所传值
        getChild :function(value){
            this.judgeFlag.isMask=value;
            this.judgeFlag.isBind=value;  //隐藏蒙版和绑定弹窗
        },
        //充话费按钮点击事件
        payFun:function(){
            if(!this.unbindFun()){  //未绑定弹窗
                return false;
            }
            try{trk_wap_jt.trkAppButtonClick("充话费", "jt_hlwk_ylcx","","","");}catch(e){}
            window.location.href='http://wapzt.189.cn:8010/rechargeV2/rechargeV2_index.html?ct=0&shopid=20001&shop=20001&cmpid=jt-gzh-ylcx-top';
        },
        //公共弹窗选框点击
        publicPrups:function(e){
            if(!this.unbindFun()){  //未绑定弹窗
                return false;
            }
            this.common.openBoxBefore();//禁止滚动
            this.PublicMsg=e.target.dataset.info;
            this.judgeFlag.isMask=true;
            this.judgeFlag.isPublic=true;
        },
        //获取公共弹窗组件所传值
        getPublic:function(value){
            this.judgeFlag.isMask=value;
            this.judgeFlag.isPublic=value;
        },
        //手机营业厅Box区域去查询按钮
        queryFun:function(){
            if(!this.unbindFun()){  //未绑定弹窗
                return false;
            }
            try{trk_wap_jt.trkAppButtonClick("去查询", "jt_hlwk_ylcx","","","");}catch(e){}
            window.location.href='http://a.189.cn/JJSaFF'; //打开客户端
        },
        //在线客服点击事件
        kefuFun:function(){
            if(!this.unbindFun()){  //未绑定弹窗
                return false;
            }
            try{trk_wap_jt.trkAppButtonClick("在线客服", "jt_hlwk_ylcx","","","");}catch(e){}
            var kefuLink=this.resBind.onlineServiceUrl || '';
            window.location.href=kefuLink;  //跳转在线客服链接
        },
        ageFun:function(){
            if(!this.unbindFun()){  //未绑定弹窗
                return false;
            }
            window.location.href='https://pms.189.cn/cljy-web/static/zdcz/zdcz_index.html?cmpid=jt-cfsf-zd20'; //跳转查网龄链接
        }
    }
}
</script>

<style scoped>
    .indexPage{background: #fdfdfd;color: black;}
    .index_toper{position: relative;background-image: linear-gradient(to right , #e54825, #ef9135);background-image: -webkit-linear-gradient(to right , #e54825, #ef9135);height: 2rem;}
    .index_unbindedTips{position: absolute;font-size: 0.55rem;line-height: 2rem;color: #fff;left: 1rem;}
    .index_unbindedBtn{background: #fff;border-radius: 2rem;padding: 0 0.6rem;position: absolute;height: 1.2rem;line-height: 1.3rem;top: 0.4rem;color: #e64d26;font-size: 0.6rem;right: 1rem;}
    .index_binded span{font-size: 0.55rem;letter-spacing: -0.05rem;margin-left: 0.3rem;line-height: 1.7rem;}
    .index_box{-moz-box-shadow: 0 4px 12px #d6d6d6;-webkit-box-shadow: 0 4px 12px #d6d6d6;box-shadow: 0 4px 12px #d6d6d6;width: 94%;border-radius: 0.3rem;padding: 0.1rem 0;margin: 1rem auto 0;}
    .index_infoInner{margin: 0.7rem 0;display: -webkit-flex;display: flex;}
    .index_infoItem{text-align: center;-webkit-box-flex: 1;flex: 1;}
    .index_infoItem:first-child{border-right: 0.1rem solid red;}
    .index_infoRow{line-height: 1.5rem;font-size: 0.8rem;}
    .index_infoPrice{color: red;font-weight: 600;font-size: 1rem;vertical-align: bottom;}
    .index_infoBtn{background: #ef8f35;width: 46%;border-radius: 3rem;color: #fff;font-size: 0.9rem;margin: 0.4rem auto 0;line-height: 1.5rem;}
    .index_tips{width: 94%;margin: 0.8rem auto;font-size: 0.6rem;line-height: 1.2rem;}
    .index_features{border-bottom: 1px solid #f5f5f5;line-height: 2rem;font-size: 0.8rem;padding-left: 0.5rem;}
    .index_featuresList{display: -webkit-flex;display: flex;}
    .index_featuresItem{-webkit-box-flex: 1;flex: 1;padding-top: 0.4rem;}
    .index_featuresItem img{width: 70%;margin: 0 auto;display: block;}
    .index_down{width: 94%;margin: 0.4rem 3% 0;vertical-align: baseline;}
    .index_boxLast{margin-bottom: 1.5rem;}
    .index_mask{position: fixed;top: 0;left: 0;right: 0;margin: 0 auto;background: rgba(0,0,0,.6);height: 100%;width: 100%;max-width: 720px;}
</style>