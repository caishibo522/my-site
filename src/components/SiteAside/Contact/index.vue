<template>
  <ul class="contact-container">
    <li>
      <a>
        <div class="icon">
          <Icon type="github"/>
        </div>
        <span>{{data.githubName}}</span>
      </a>
    </li>
    <li>
      <a>
        <div class="icon">
          <Icon type="qq"/>
        </div>
        <span>{{data.qq}}</span>
      </a>
    </li>
    <li>
      <a>
        <div class="icon weixin">
          <Icon type="weixin"/>
        </div>
        <span>{{data.weixin}}</span>
      </a>
    </li>
    <li>
      <a>
        <div class="icon">
          <Icon type="mail"/>
        </div>
        <span>{{data.mail}}</span>
      </a>
    </li>
  </ul>
</template>

<script>
  import Icon from "@/components/Icon";
  import {mapState} from "vuex";
  export default {
    components: {
      Icon
    },
    computed: {
      ...mapState('setting',['data','loading'])
    }
  }
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
  .contact-container {
    list-style: none;
    padding: 20px;
    margin: 0;
    color: @gray;
    li {
      height: 30px;
      line-height: 30px;
      margin: 14px 0;
      a {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 14px;
      }
    }
    .icon {
      font-size: 26px;
      width: 36px;
      &.weixin {
        font-size: 32px;
        text-indent: -3px;
      }
    }
  }
</style>