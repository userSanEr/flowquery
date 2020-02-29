<template>
   <div class="index_popups">
        <div class="index_popInner">
            <div class="index_popTips">尊敬的客户，建议您绑定号码后进行查询</div>
            <div class="index_popBtns">
                <div class="index_nowBind" @click="bindFun">现在绑定</div>
                <div class="index_lateBind" @click="lateBind">稍后绑定</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['bindLink'],
    data(){
        return{}
    },
    methods:{
        //修改根节点字体大小
        remChange:function(){
            document.documentElement.style.fontSize = 18 * ($('body').width() / 360) + 'px';
        },
        //现在绑定按钮点击事件
        bindFun:function(){
            try{trk_wap_jt.trkAppButtonClick("现在绑定", "jt_hlwk_ylcx_bdtc","","","");}catch(e){};
            window.location.href=this.bindLink;
        },
        //稍后绑定按钮点击事件
        lateBind:function(){
            try{trk_wap_jt.trkAppButtonClick("稍后绑定", "jt_hlwk_ylcx_bdtc","","","");}catch(e){};
            this.common.closeBoxBefore();
            this.$emit('receve',false);
        }
    },
    //vue实例的挂载元素el没有但是data有了
    created(){
        //修改根节点字体大小
        this.remChange();
        window.addEventListener('resize', this.remChange, false);
    }
}
</script>

<style scoped>
    .index_popups{width: 84%;max-width: 604.8px;background: #fff;border-radius: 0.5rem;position: fixed;top: 25%;left: 0;right: 0;margin: 0 auto;}
    .index_popInner{width: 92%;margin: 0.6rem auto;padding: 1rem 0;border-radius: 0.3rem;-moz-box-shadow: 0 4px 12px #d6d6d6;-webkit-box-shadow: 0 4px 12px #797979;box-shadow: 0 4px 16px #797979;}
    .index_popTips{color: #737373;text-align: center;line-height: 1.8rem;font-size: 1rem;margin: 2rem;}
    .index_popBtns{display: -webkit-flex;display: flex;justify-content:center;-webkit-justify-content:center;}
    .index_popBtns div{width: 35%;height: 2rem;line-height: 2rem;border-radius: 2rem;font-size: 1rem;text-align: center;box-sizing: border-box;-webkit-box-sizing: border-box;margin: 0 5% 1.8rem;}
    .index_nowBind{background: #ef9035;color: #fff;}
    .index_lateBind{border: 1px solid #ef9035;background: #fff;color: #656565;}
</style>