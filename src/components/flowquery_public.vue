<template>
    <div class="index_popBox">
        <img src="https://www.189.cn/client/wap/wapclient/flowquery/images/index_close.png" class="index_close" @click="closeFun">
        <div class="index_title">{{popupsData.title}}</div>
        <div class="index_subTitle">{{popupsData.subTitle}}</div>
        <img class="index_popImg" :src="popupsData.img">
        <div class="index_popTxt">【查询方式】</div>
        <div class="index_popPath">{{popupsData.path}}</div>
        <div class="index_goQuery" @click="queryFun">去查询</div>
    </div>
</template>

<script>
export default {
    props:['info'],
    data(){
        return {
            infoData:'',
            popupsData:{
                title:'',
                subTitle:'',
                img:'',
                path:'',
            },
            popups: {  //公共弹窗
                detail: {  //查明细
                    title: '流量明细',  //标题
                    subTitle:'可查询已用免费流量、订购通用包流量等',  //副标题
                    img: 'https://www.189.cn/client/wap/wapclient/flowquery/images/index_detail.png',  //图片地址
                    path: '手机营业厅>查询办理>流量明细'  //查询方式
                },
                bill: {  //历史账单
                    title: '历史账单',  //标题
                    subTitle:'可查询最近一年扣费情况',  //副标题
                    img: 'https://www.189.cn/client/wap/wapclient/flowquery/images/index_bill.png',  //图片地址
                    path: '手机营业厅>查询办理>历史账单'  //查询方式
                },
                call: {  //通话详情
                    title: '通话详情',  //标题
                    subTitle:'可查询已用免费流量、订购通用包流量等',  //副标题
                    img: 'https://www.189.cn/client/wap/wapclient/flowquery/images/index_call.png',  //图片地址
                    path: '手机营业厅>查询办理>通话详情'  //查询方式
                },
                more: {  //更多查询
                    title: '更多查询',  //标题
                    subTitle:'可查询实时话费、缴费记录、上网记录等',  //副标题
                    img: 'https://www.189.cn/client/wap/wapclient/flowquery/images/index_more.png',  //图片地址
                    path: '手机营业厅>查询办理>更多查询'  //查询方式
                }
            }
        }
    },
    methods:{
        //修改根节点字体大小
        remChange:function(){
            document.documentElement.style.fontSize = 18 * ($('body').width() / 360) + 'px';
        },
        //回填内容
        fillFun:function(){
            this.infoData = this.popups[this.info];
            this.popupsData.title=this.infoData.title;
            this.popupsData.subTitle=this.infoData.subTitle;
            this.popupsData.img=this.infoData.img;
            this.popupsData.path=this.infoData.path;
            switch(this.info){
                case 'detail':
                    try{trk_wap_jt.trkAppButtonClick("查明细", "jt_hlwk_ylcx","","","");}catch(e){}
                    break;
                case 'bill':
                    try{trk_wap_jt.trkAppButtonClick("历史账单", "jt_hlwk_ylcx","","","");}catch(e){}
                    break;
                case 'call':
                    try{trk_wap_jt.trkAppButtonClick("通话详情", "jt_hlwk_ylcx","","","");}catch(e){}
                    break;
                case 'more':
                    try{trk_wap_jt.trkAppButtonClick("更多查询", "jt_hlwk_ylcx","","","");}catch(e){}
                    break;
            }
        },
        //关闭公共弹窗
        closeFun:function(){
            this.common.closeBoxBefore();  //打开滚动
            this.$emit('publicMsg',false);
            this.popupsData.title='';
            this.popupsData.subTitle='';
            this.popupsData.img='';
            this.popupsData.path='';
        },
        //点击去查询
        queryFun:function(){
            switch(this.info){
                case 'detail':
                    try{trk_wap_jt.trkAppButtonClick("去查询", "jt_hlwk_ylcx_tc_llmx","","","");}catch(e){}
                    break;
                case 'bill':
                    try{trk_wap_jt.trkAppButtonClick("去查询", "jt_hlwk_ylcx_tc_lszd","","","");}catch(e){}
                    break;
                case 'call':
                    try{trk_wap_jt.trkAppButtonClick("去查询", "jt_hlwk_ylcx_tc_thxq","","","");}catch(e){}
                    break;
                case 'more':
                    try{trk_wap_jt.trkAppButtonClick("去查询", "jt_hlwk_ylcx_tc_gdcx","","","");}catch(e){}
                    break;
            }
            window.location.href='http://a.189.cn/JJSaFF';  //打开客户端
        }
    },
    //vue实例的挂载元素el没有但是data有了
    created(){
        //修改根节点字体大小
        this.remChange();
        window.addEventListener('resize', this.remChange, false);
    },
    mounted(){
        this.fillFun(); 
    }
}
</script>

<style scoped>
    .index_popBox{width: 84%;background: #fff;border-radius: 0.5rem;position: fixed;top: 16%;left: 0;right: 0;margin: 0 auto;max-width: 604.8px;}
    .index_close{position: absolute;top: -2.5rem;width: 2rem;right: 0;}
    .index_title{color: #cc8921;font-weight: 600;font-size: 1.1rem;text-align: center;margin: 1rem 1rem 0.6rem;line-height: 1.4rem;}
    .index_subTitle{font-size: 0.8rem;margin-left: 1.2rem;line-height: 1.4rem;color: #3e3e3e;text-align: center;}
    .index_popImg{width: 86%;min-height: 12rem;display: block;margin: 0 auto 0.3rem;}
    .index_popTxt{font-size: 0.8rem;margin-left: 0.83rem;line-height: 1.4rem;color: #3e3e3e;text-align: left;}
    .index_popPath{font-size: 0.8rem;margin-left: 1.2rem;line-height: 1.4rem;color: #3e3e3e;text-align: left;}
    .index_goQuery{width: 84%;height: 2rem;line-height: 2rem;border-radius: 2rem;font-weight: 500;margin: 0.8rem auto 1.5rem;background: #d28b21;color: #fff;font-size: 1rem;text-align: center;}
</style>