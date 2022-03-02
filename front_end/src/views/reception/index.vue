<template>
  <div class="reception">
    <!-- 头部 -->
    <div class="header">
      <el-row style="height: 120px">
        <el-col :span="12" style="margin-left: 100px; height: 120px"
          ><img src="./logo.png" alt="logo"
        /></el-col>
        <el-col :span="10">
          <nav>
            <ul class="dd-menu">
              <li
                v-for="(item, index) in menu"
                :key="index"
                :class="{ active: index == currentIndex }"
                @click="changeStyle(index)"
              >
                <a :href="item.href" :title="item.title"
                  ><span>{{ item.content }}</span></a
                >
              </li>
            </ul>
          </nav>
        </el-col>
      </el-row>
    </div>
    <!-- 轮播图 -->
    <div class="walking-lantern">
      <el-carousel indicator-position="outside" style="width: 100%">
        <el-carousel-item v-for="(item, index) in imgArr" :key="index">
          <img :src="item.imgSrc" :alt="item.alt" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 产品信息 -->
    <div class="product-info">
      <!-- 标题 -->
      <h3 class="theme">NEW PRODUCT</h3>
      <!-- 销售产品 -->
      <div class="promoting-products">
        <div
          v-for="(item, index) in productArr"
          :key="index"
          class="product-box"
        >
          <div class="product-shoe-info">
            <!-- 产品图例 -->
            <img :src="item.img" :alt="item.type" />
            <!-- 产品信息 -->
            <div class="item-info-product">
              <div class="title">{{ item.product_name }}</div>
              <div class="price">${{ item.price }}.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 关于我们 -->
    <el-footer style="height: 450px">
      <div class="container">
        <!-- 左侧区域 -->
        <div class="left-area">
          <div class="left-logo">
            <img
              src="./logo.png"
              alt="logo"
              style="width: 200px; height: 80px"
            />
          </div>
          <!-- 经营范围 -->
          <div style="margin: 40px 0; text-align: left">
            Enterprise type :
            <span
              >Production and manufacturing, service wholesale, retail
              agriculture, new industries, traditional industries and
              others</span
            >
          </div>
          <div class="left-container">
            <h3>Follow As：</h3>
            <ul class="payment-links">
              <li>
                <img src="./1.png" alt="" />
              </li>
              <li>
                <img src="./2.png" alt="" />
              </li>
              <li>
                <img src="./3.png" alt="" />
              </li>
              <li>
                <img src="./4.png" alt="" />
              </li>
            </ul>
          </div>
        </div>

        <!-- 中间区域 -->
        <div class="center-area">
          <div class="top-container"><h3>Contact Us</h3></div>
          <div style="margin: 40px 0; text-align: left">
            <p>
              Address :Yango College, Mawei District, Fuzhou City, Fujian
              Province,Denglong Road
            </p>
            <p>Phone : +13115029742</p>
            <p>Email : 2631225507@qq.com</p>
          </div>
          <div class="top-container">
            <h3>Payment Method</h3>
            <ul class="payment-links">
              <li>
                <img src="https://s4.ax1x.com/2022/03/02/b3qtr8.png" alt="" />
              </li>
              <li>
                <img src="https://s4.ax1x.com/2022/03/02/b3qYKf.png" alt="" />
              </li>
              <li>
                <img src="https://s4.ax1x.com/2022/03/02/b3qGxP.png" alt="" />
              </li>
              <li>
                <img src="https://s4.ax1x.com/2022/03/02/b3q82t.png" alt="" />
              </li>
            </ul>
          </div>
        </div>

        <!-- 右侧区域 -->
        <div class="right-area" style="width: 100%">
          <div class="top-container"><h3>Request Info</h3></div>
          <el-form ref="form" :model="form" label-width="0">
            <el-form-item>
              <el-input v-model="form.name" placeholder="Name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.phone" placeholder="Phone"></el-input>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                {
                  type: 'email',
                  message: '请输入正确的邮箱地址',
                  trigger: ['blur', 'change'],
                },
              ]"
            >
              <el-input v-model="form.email" placeholder="Email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                type="textarea"
                v-model="form.desc"
                rows="2"
                resize="none"
                maxlength="500"
                show-word-limit
                placeholder="Comment"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Submit</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 版权 -->
      <div class="copy-right">Copyright © 2022.HHG All rights reserved</div>
    </el-footer>
  </div>
</template>

<script>
import { getProductInfo } from "@/api/product";
export default {
  data() {
    return {
      currentIndex: 0,
      menu: [
        {
          title: "Home",
          href: "#",
          content: "首页",
        },
        {
          title: "About",
          href: "#",
          content: "关于我们",
        },
        {
          title: "Login",
          href: "/login",
          content: "登录",
        },
      ],
      imgArr: [
        {
          imgSrc:
            "https://img0.baidu.com/it/u=1770956201,830751560&fm=253&fmt=auto&app=138&f=JPEG?w=1280&h=400",
          alt: "潮流时尚 舒适行走",
        },
        {
          imgSrc:
            "	https://img2.baidu.com/it/u=2175295644,519237568&fm=253&fmt=auto&app=138&f=JPEG?w=991&h=283",
          alt: "百搭运动鞋",
        },
        {
          imgSrc:
            "https://img2.baidu.com/it/u=61281636,1309391691&fm=253&fmt=auto&app=138&f=JPEG?w=1477&h=500",
          alt: "战术靴",
        },
        {
          imgSrc:
            "	https://img2.baidu.com/it/u=1730127637,1855612868&fm=253&fmt=auto&app=138&f=JPEG?w=1200&h=390",
          alt: "篮球鞋",
        },
      ],
      form: {},
      productArr: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取点击导航标题
    changeStyle(index) {
      this.currentIndex = index;
    },
    // 获取产品信息
    getList() {
      getProductInfo({ page: 1, limit: 9999 }).then((res) => {
        this.productArr = res.data.rows;
      });
    },
    onSubmit() {
      alert("该功能尚未开放");
    },
  },
};
</script>

<style lang="scss" scoped>
.reception {
  width: 100%;
  height: 100%;
  .header {
    img {
      padding: 10px 0;
      height: 90%;
      box-sizing: border-box;
    }
    .dd-menu {
      display: block;
      list-style-type: none;
    }
    .dd-menu > li {
      position: relative;
      display: inline-block;
      margin-left: 35px;
    }
    .dd-menu > .active > a {
      color: #f1ad48;
    }
    .dd-menu > li > a {
      position: relative;
      display: block;
      line-height: 90px;
      cursor: pointer;
      letter-spacing: 3px;
      transition: all 0.3s ease 0.1s;
    }
    .dd-menu li span {
      font-size: 20px;
      position: relative;
    }
    .dd-menu > li > a :hover {
      color: #f1ad48;
    }
    a:hover:before {
      transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
      transform-origin: left;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200%25' height='100%25'%3E%3Cdefs%3E%3Cstyle%3E .wave%7B animation:wave 2s cubic-bezier(0.175, 0.885, 0.32, 1) infinite; animation-delay:-0.25s; stroke:%23e0ff00; stroke-width:2; stroke-linecap:square; %7D @keyframes wave%7B 25%25%7B d:path('M 0 20 L 10 15 L 20 20 L 30 25 L 40 20 ');%0A%7D%0A50%25%7B%0Ad:path('M 0 20 L 10 25 L 20 20 L 30 15 L 40 20  ');%0A%7D%0A75%25%7B%0Ad:path('M 0 20 L 10 15 L 20 20 L 30 25 L 40 20 ');%0A%7D %7D %3C/style%3E%3C/defs%3E%3Cpattern id='wavePattern' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath fill='none' class='wave' d='M 0 20 L 10 25 L 20 20 L 30 15 L 40 20' /%3E%3C/pattern%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='url(%23wavePattern)'%3E%3C/rect%3E%3C/svg%3E")
        0px 50%/40px 40px repeat-x;
      animation: waving 3s linear infinite;
      transform: scaleX(1);
    }
    a:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 80px;
      bottom: -10px;
      transform: scaleX(0);
    }
    @keyframes waving {
      to {
        background-position: 80px 50%, 160px 50%;
      }
    }
  }
  .walking-lantern {
    width: 100%;
    height: 500px;
    ::v-deep .el-carousel__container {
      height: 500px !important;
    }
    img {
      width: 100%;
    }
  }
  .product-info {
    width: 80%;
    margin: auto;
    .theme {
      font-size: 2.5em;
      letter-spacing: 2px;
      color: #292a2b;
      margin-bottom: 1em;
      text-align: center;
    }
    .promoting-products {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    .product-box {
      width: 30.333333%;
      margin-bottom: 20px;
      margin-left: 20px;
      .product-shoe-info {
        padding: 15px;
        border: 1px solid #e4e4e4;
        text-align: center !important;
        img {
          width: 300px;
          height: 300px;
        }
        .item-info-product {
          margin: 1em 0 0 0;
          padding: 1em 0 0 0;
          border-top: 1px solid #ddd;
          .title {
            color: #080808;
            font-size: 15px;
            letter-spacing: 1px;
            font-weight: 700;
            margin-bottom: 10px;
          }
          .price {
            font-size: 1em;
            font-weight: 600;
            color: #ff4c4c;
            letter-spacing: 2px;
          }
        }
      }
    }
  }
  .el-footer {
    background-color: #17181b;
    color: #333;
    text-align: center;
    .container {
      width: 95%;
      margin: auto;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      .left-area,
      .center-area,
      .right-area {
        margin-top: 40px;
        padding: 0 25px;
        max-width: 33.33333%;
        color: #727377;
        font-size: 15px;
      }
    }
    .left-container {
      img {
        width: 40px;
        height: 40px;
      }
    }
    .top-container h3,
    .left-container h3 {
      font-size: 20px;
      text-align: left;
      color: #f3f3f3;
      letter-spacing: 1px;
    }
    .payment-links {
      list-style-type: none;
      padding: 0;
      li {
        float: left;
      }
    }
    .payment-links:after {
      content: "";
      display: table;
      clear: both;
    }
    .copy-right {
      letter-spacing: 1px;
      color: #999;
      font-family: "Lato", sans-serif;
      font-weight: normal;
    }
  }
}
</style>