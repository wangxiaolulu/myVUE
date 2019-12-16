<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">
              Default
            </a>
            <a href="javascript:void(0)" class="price" @click="sortGoods">
              Price
              <svg class="icon icon-arrow-short">
                <use xlink:href="#icon-arrow-short"></use>
              </svg>
            </a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">
              Filter by
            </a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterBy-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">All</a></dd>
                <dd v-for="(price,index) in priceFilter">
                  <a href="javascript:void(0)" v-bind:class="{'cur':priceChecked==index}"  @click="setPriceFilter(index)">{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in goodsList">
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                  <img src="./../assets/loading-spinning-bubbles.svg" alt="" v-show="loading">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      <nav-footer></nav-footer>
    </div>
</template>
<style>
  .container{
    padding: 0 10px;
  }
  .filter-nav{
    height: 55px;
    line-height: 55px;
    background-color: white;
    text-align: right;
    padding-right: 20px;
    margin: 60px 0 30px 0;
  }
  .def{
    color: #ee7a23;
  }
  .filter-nav span{
    margin-right: 10px;
  }
  .filter-nav a{
    margin-left: 10px;
  }
  .icon-arrow-short{
    width: 11px;
    height: 11px;
  }
  .goods-container{
    display: flex;
  }
  .price-wrap{
    padding: 0 20px;
    margin-right: 50px;
    width: 230px;
  }
  .price-fliter dt{
    height: 40px;
    line-height: 40px;
    margin-bottom: 30px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .price-fliter dd{
    height: 26px;
    line-height: 26px;
    margin-bottom: 20px;
  }
  .price-fliter dd a{
    transition: all .3s ease-out;
  }
  .cur{
    border-left: 2px solid #ee7a2c;
    color:#ee7a2c;
    transition: all .3s ease-out;
    padding-left: 15px;
  }
  .price-fliter dd a:hover{
    border-left: 2px solid #ee7a2c;
    color:#ee7a2c;
    transition: all .3s ease-out;
    padding-left: 15px;
  }
  .list-wrap{
    flex:1
  }
  .list-wrap ul::after{
    clear:both;
    content: '';
    height: 0;
    display: block;
    visibility: hidden;
  }
  .list-wrap .item{
    width: 23.80952%;
    float: left;
    margin-left: 1.5%;
    margin-bottom: 1.5%;
    border: 2px solid #e9e9e9;
    background: white;
    transition: all .5s ease-out;
  }
  .list-wrap .item:hover{
    transform: translateY(-10px);
    transition: all .5s ease-out;
    box-shadow: 0 0 3px #e9e9e9;
    border-color: #ee7a2c;
  }
  .list-wrap .item:nth-child(4n){
    margin-right: 0;
  }
  .list-wrap .info{
    margin-top: 20px;
  }
  .item img{
    width: 100%;
  }
  .info .info-name{
    height: 4em;
    font-weight: bold;
    font-size: 18px;
    color: #d1434a;
  }
  .btn{
    display: inline-block;
    width: 100%;
    padding: 0 10px;
    text-align: center;
    color: #d1434a;
    height: 40px;
    line-height: 40px;
    border: 1px solid #d1434a;
    margin-top: 10px;
  }
  .load-more{
    height: 100%;
    line-height: 100px;
    text-align: center;
  }
</style>
<script>
    import './../assets/css/base.css'
    import './../assets/css/product.css'
    import NavHeader from "../components/NavHeader"
    import NavFooter from "../components/NavFooter"
    import NavBread from "../components/NavBread"
    import axios from "axios"

    export default {
      data(){
        return{
          goodsList:[],
          priceFilter:[
            {
              startPrice:'0.00',
              endPrice:'100.00'
            },
            {
              startPrice:'100.00',
              endPrice:'500.00'
            },
            {
              startPrice:'500.00',
              endPrice:'1000.00'
            },
            {
              startPrice:'1000.00',
              endPrice:'5000.00'
            }
          ],
          priceChecked:'all',
          filterBy:false,
          overLayFlag:false,
          sortFlag:true,
          page:1,
          pageSize:8,
          busy:true,
          loading:false
        }
      },
      name: "GoodsList",
      components:{
        NavHeader,
        NavFooter,
        NavBread
      },
      mounted() {
        this.getGoodsList()
      },
      methods:{
        showFilterPop(){
          this.filterBy = true;
          this.overLayFlag = true
        },
        /*setPriceFilter(index){
          this.priceChecked = index;
          this.closePop()
        },*/
        closePop(){
          this.filterBy = false;
          this.overLayFlag = false
        },
        getGoodsList(flag){
          let param = {
            page:this.page,
            pageSize:this.pageSize,
            sort:this.sortFlag?1:-1,
            priceLevel:this.priceChecked
          }
          this.loading = true;
          axios.get('/goods/list',{
            params:param
          }).then((response) => {
            let res = response.data;
            this.loading = false;
            if(res.status == "0"){
              if(flag){
                this.goodsList = this.goodsList.concat(res.result.list);
                if(res.result.count < this.pageSize){
                  this.busy = true
                }else{
                  this.busy = false
                }
              }else{
                this.goodsList = res.result.list;
                this.busy = false
              }
            }else{
              this.goodsList = []
            }
          })
        },
        sortGoods(){
          this.sortFlag = ! this.sortFlag;
          this.page = 1;
          this.getGoodsList()
        },
        setPriceFilter(index){
          this.priceChecked = index;
          this.page = 1;
          this.getGoodsList();
          this.closePop()
        },
        loadMore(){
          this.busy = true;
          setTimeout(() => {
            this.page++;
            this.getGoodsList(true);
          }, 500);
        },
        addCart(productId){
          axios.post("/goods/addCart",{
            productId:productId
          }).then((res)=>{
            let resM = res.data;
            if(resM.status==0){
              alert("加入成功")
            }else{
              alert("msg:"+res.msg)
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
