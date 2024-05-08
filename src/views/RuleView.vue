<template>
    <div class="topBar">
        <TopNav/>
    </div>
    <div>
        <Row :gutter="24" id="main">
    <Col span="18" class="colBox">
    <Typography id="typo">
        <TypographyTitle id="Introduction">BattleByte 介绍</TypographyTitle>
        <Divider></Divider>
        <TypographyParagraph class="paragraph">
            BattleByte是一个编程实时对战游戏网站，旨在为广大编程爱好者提供一个有趣而充满挑战性的平台。无论是新手还是熟练的编程学习者，都可以在这里找到属于自己的编程对战乐趣。
        </TypographyParagraph>
        <TypographyTitle :level="2" id="Part1">使用技术栈</TypographyTitle>
        <TypographyParagraph class="paragraph">
            BattleByte使用
            Vue3 + TypeScript + Ant Design Vue+ Vite构建，后端使用Spring Boot + MySQL。
        </TypographyParagraph>
        <TypographyTitle :level="2" id="Part2">Alpha阶段已完成功能</TypographyTitle>
        <TypographyParagraph class="paragraph">
        <ul>
        <li>登录注册&nbsp;&nbsp;</li>
        <!-- <RadioGroup v-model:value="value1" :options="plainOptions" disabled></RadioGroup> -->
        <!-- <br/> -->
        <li>用户中心（修改用户名，邮箱，邮箱，密码）&nbsp;&nbsp;</li>
        <li>对战功能（单题）（题目显示、代码显示）&nbsp;&nbsp;</li>
        <li>OJ评测&nbsp;&nbsp;</li>
        <li>双方进度显示&nbsp;&nbsp;</li>
        <li>对战聊天&nbsp;&nbsp;</li>

        </ul>
        目前用户中心<TypographyText mark class="text">删除好友和添加好友</TypographyText>功能尚不完善，后续版本会完善。
    <!-- <RadioGroup v-model:value="value1" :options="plainOptions" disabled></RadioGroup> -->
    </TypographyParagraph>
        <TypographyTitle :level="2" id="Part3">Alpha阶段玩法介绍</TypographyTitle>
        <img src="../assets/rules/init.png" alt="初始界面" style="width: 100%;"/>
        <TypographyParagraph class="paragraph">
            如图为首页，点击页面下方的<TypographyText mark class="text">开始匹配</TypographyText>按钮即可进入单人模式的匹配。
        </TypographyParagraph>
        <img src="../assets/rules/matching.png" alt="匹配界面" style="width: 100%;"/>
        <TypographyParagraph class="paragraph">
            如图为匹配界面，等待匹配成功后即可进入对战界面。
        </TypographyParagraph>
            
        <img src="../assets/rules/problem.png" alt="对战界面" style="width: 100%;"/>
        <TypographyParagraph class="paragraph">
            如图为对战界面，左侧为题目描述，右侧为代码编辑器，右下角有聊天框，可以在聊天框内发送消息。同时右下角有头像和提交两个按钮，点击可以进行头像或提交评测的操作。代码编辑器支持多种语言，包括C++、Java、Python等，并在左上角可以选择语言，颜色主题，字体大小，行高等选项。
        </TypographyParagraph>
        <img src="../assets/rules/problem1.png" alt="对战界面1" style="width: 100%;"/>
        <TypographyParagraph class="paragraph">
            如图对战界面的右下角可以点击番茄道具向对手屏幕扔番茄阻挡视线。
        </TypographyParagraph>
        <TypographyTitle :level="2" id="Part4">项目地址</TypographyTitle>
        <!-- <TypographyParagraph class="paragraph"> -->
            <TypographyLink href="https://github.com/HelloWorldSE/BattleByte-frontend" class="text">前端仓库</TypographyLink>
            <br/>
            <TypographyLink href="https://github.com/HelloWorldSE/BattleByte-backend" class="text">后端仓库</TypographyLink>
        <!-- </TypographyParagraph> -->
        <TypographyTitle :level="2" id="Part5">内测群二维码</TypographyTitle>
        <img src="../assets/rules/QRcode.jpg" alt="二维码" style="width: 100%;"/>
        <TypographyParagraph class="paragraph">
            欢迎大家加入我们的内测群试玩BattleByte！
        </TypographyParagraph>

    </Typography>
    </Col>
    <Col span="6">
    <Anchor :items="anchorItems" :target-offset="targetOffset">
    </Anchor>
    </Col>
</Row>
    </div>

</template>

<script lang="ts" setup>
import TopNav from "@/components/TopNav.vue";
import { Typography, Anchor, TypographyTitle, Divider, TypographyParagraph, TypographyText, RadioGroup, Radio, Table, TypographyLink, Row, Col } from "ant-design-vue";
import { onMounted, ref } from "vue";

const plainOptions = ['是', '否'];
const value1 = ref<string>('是');

const targetOffset = ref<number | undefined>(undefined);
// onMounted(() => {
//   targetOffset.value = window.innerHeight / 2;
// });

const anchorItems = ref<Array<any>>( [
    {
        title: 'BattleByte 介绍',
        href: '#Introduction',
        children: [
            {
                title: '使用技术栈',
                href: '#Part1',
            },
            {
                title: 'Alpha阶段已完成功能',
                href: '#Part2',
            },
            {
                title: 'Alpha阶段玩法介绍',
                href: '#Part3',
            },
            {
                title: '项目地址',
                href: '#Part4',
            },
            {
                title: '内测群二维码',
                href: '#Part5',
            },
        ]
    }
]);
</script>

<style scoped>
.topBar {
  z-index: 1005;
  width: 100%;
  overflow: hidden; /* 隐藏超出部分 */
  height: 60px;
  position: relative; /* 确保 TopNav 绝对定位相对于 .top */
}

#main {
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  */
  padding: 0%;
  margin-top: 20px;
  width: 100%;
}

.colBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

#typo {
    /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  width: 60%;
}

.paragraph {
  margin-top: 10px;
  /* set font size */
    font-size: 20px;
}

.text {
  font-size: 20px;
  font-weight: bold;
}
</style>