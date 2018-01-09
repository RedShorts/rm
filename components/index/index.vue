<template>
    <div class="index_div">
        <div class="search_form_div">
            <input type="text" name="" placeholder="快速搜索新闻" v-on:focus="getFocus()" v-on:blur="getBlur()">
        </div>
        <swiper-com id="swiperCom"></swiper-com>
        <!-- <ul class="router_ul">
        <router-link to="/index/newWx" tag="li"  class="">微信</router-link>
        <router-link to="/index/newWb" tag="li"  class="">微博</router-link>
        <router-link to="/index/newWb" tag="li"  class="">头条</router-link>
        </ul> -->
        <div >
            <mt-navbar  :class="nowFixed?'isFixed':''">
              <mt-tab-item id="1" :class="active === 'Wx'?'nowActive':''" >微信</mt-tab-item><!-- @click.native.prevent="active = 'Wx'" -->
              <mt-tab-item id="2" :class="active === 'Wb'?'nowActive':''" >微博</mt-tab-item><!-- @click.native.prevent="active = 'Wb'" -->
              <mt-tab-item id="3" :class="active === 'Tt'?'nowActive':''" >头条</mt-tab-item>
              <!--@click.native.prevent="active = 'Tt'"-->
            </mt-navbar>
        </div>
        <mt-tab-container v-model="active" swipeable>
            <mt-tab-container-item id="Wx">
                <keep-alive>
                    <newpub-wx></newpub-wx>
                </keep-alive>
            </mt-tab-container-item>
            <mt-tab-container-item id="Wb">
                <keep-alive>
                    <newpub-wb></newpub-wb>
                </keep-alive>
            </mt-tab-container-item>
            <mt-tab-container-item id="Tt">
                <keep-alive>
                    <newpub-tt></newpub-tt>
                </keep-alive>
            </mt-tab-container-item>
        </mt-tab-container>
        <!-- <router-view></router-view> -->
        <backtop-com></backtop-com>
        <alert-com :alertMsg="alertWord" v-show="alertWord != ''"></alert-com>
        <footer-com></footer-com>
    </div>
</template>

<script>
    import swiper from '../public/swiper.vue'
    import newPubWx from './newPubWx.vue'
    import newPubWb from './newPubWb.vue'
    import newPubTt from './newPubTt.vue'
    import footer from '../footer/footer.vue'
    import backtop from '../public/backtop.vue'
    import alert from '../public/alert.vue'

    export default {
        name: 'index',
        data () {
            return {
                H: 0,
                nowFixed:false,
                active: 'Wx',
                alertWord:'',
                scrollTop_wx:0,
                scrollTop_wb:0,
                scrollTop_tt:0,
            }
        },
        components:{
            "swiper-com": swiper,
            "newpub-wx":newPubWx,
            "newpub-wb":newPubWb,
            "newpub-tt":newPubTt,
            "footer-com": footer,
            "backtop-com": backtop,
            "alert-com": alert,
        },
        methods:{
            scrollTop(){
                var $scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if($scrollTop > this.H ){
                    this.nowFixed = true
                } else{
                    this.nowFixed = false
                }
            },
            getFocus:function(){
                this.$store.state._searchType = this.active;
                this.$router.push({ path: '/search' })
            },
            getBlur:function(){
                //this.$store.state._searchType = this.active;
            }
        },
        computed:{
            
        },
        mounted:function(){
            //this.$store.dispatch('get_newPubList');
            //this.$store.dispatch('get_newPubListWb');
            window.onload = function(){
                this.H = $('#swiperCom').height();
            };
            window.addEventListener('scroll', this.scrollTop)
        },
        watch:{ // 当mt-tab-item 切换时，监听当前对应的ID 值，然后请求数据
            active(curVal,oldVal){
                this.$store.state._searchType = curVal;
                this.active = curVal;
                // tab切换时记住当前页面的scrolltop，下次切换回来时显示到浏览位置
                var s = 0, nowScrollTop = 0;
                if(curVal == "Wx"){
                    nowScrollTop = document.body.scrollTop;
                    this.scrollTop_wb = nowScrollTop;
                    s = this.scrollTop_wx;
                    document.body.scrollTop = s;
                }else if(curVal == "Wb"){
                        if(oldVal == 'Wx'){
                            nowScrollTop = document.body.scrollTop;
                            this.scrollTop_wx = nowScrollTop;
                        }else if(oldVal == 'Tt'){
                            nowScrollTop = document.body.scrollTop;
                            this.scrollTop_tt = nowScrollTop;
                        }
                        s = this.scrollTop_wb;  
                        document.body.scrollTop = s;
                }else if(curVal == "Tt"){
                    nowScrollTop = document.body.scrollTop;
                    this.scrollTop_wb = nowScrollTop;
                    s = this.scrollTop_tt;
                    document.body.scrollTop = s;
                }
                if(curVal == "Tt"){ // 头条目前没有内容所以先不请求
                    return false;
                }else{
                    // this.$store.state._pageNow = 1;
                    // this.$store.state._newPubType = curVal;
                    // this.$store.dispatch('get_newPubList');
                }
            }
        }
    }
</script>

<style rel="stylesheet" lang="scss">
    @import "../../assets/css/index.scss";
    .mint-navbar .mint-tab-item{
        padding: 0.2667rem 0 !important;
    }
    .search_form_div{
        position: absolute;
        top: 0;
        z-index: 2;
        width: 100%;
        max-width:750px;
        height: 1.0667rem;
        background-color: transparent;
        input[type=text]{
            height: 0.8rem;
            line-height: 0.8rem;
            background-color: #FFF;
            border-radius: 0.08rem;
            position: absolute;
            top: 0.1333rem;
            left: 5%;
            width: 90%;
            box-sizing: border-box;
            padding: 0 0.2667rem;
        }
    }
</style>
