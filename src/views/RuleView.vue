<template>
    <div class="wrapper">
        <Row :gutter="24" id="main">
    <Col span="18" class="colBox">
    <TypographyParagraph id="typo">
        <TypographyTitle id="Introduction">BattleByte 介绍</TypographyTitle>
        <Divider></Divider>
        <TypographyParagraph class="paragraph">
          BattleByte 是一个创新的编程实时对战游戏，旨在帮助学生们通过有趣的编程比赛更好地理解编程概念。它结合了编程教育和游戏化学习的优势，为学生们提供了一种既有趣又高效的学习方式。
        </TypographyParagraph>
        <TypographyTitle :level="2" id="Part1">使用技术栈</TypographyTitle>
        <TypographyParagraph class="paragraph">
            BattleByte使用
            Vue3 + TypeScript + Ant Design Vue+ Vite构建，后端使用Spring Boot + MySQL。
        </TypographyParagraph>
        <TypographyTitle :level="2" id="Part2">功能介绍</TypographyTitle>
        <TypographyParagraph class="paragraph">
        <ul>
        <li>登录注册&nbsp;&nbsp;</li>
        <!-- <RadioGroup v-model:value="value1" :options="plainOptions" disabled></RadioGroup> -->
        <!-- <br/> -->
        <li>用户中心（修改用户名，邮箱，邮箱，密码）&nbsp;&nbsp;</li>
          <li>好友系统（好友列表、添加好友，删除好友、查看好友主页）&nbsp;&nbsp;</li>
        <li>对战功能（单人模式）（单题目显示、代码显示）&nbsp;&nbsp;</li>
          <li>对战功能（大逃杀模式）（多题目显示、代码显示）&nbsp;&nbsp;</li>
        <li>OJ评测（查看评测记录）&nbsp;&nbsp;</li>
        <li>双方进度显示&nbsp;&nbsp;</li>
        <li>对战聊天&nbsp;&nbsp;</li>
          <li>番茄道具&nbsp;&nbsp;</li>
          <li>房间系统（创建房间，加入房间，添加题目）&nbsp;&nbsp;</li>


        </ul>
    </TypographyParagraph>
        <TypographyTitle :level="2" id="Part3">玩法介绍</TypographyTitle>
        <img src="../assets/rules/init.png" alt="初始界面" style="width: 100%;"/>
        <TypographyParagraph class="paragraph">
            注册登陆后，进入首页对战界面，点击黄色球球和蓝色球球可切换单人模式和大逃杀模式。点击页面下方的<TypographyText mark class="text">开始匹配</TypographyText>按钮即可进入匹配。
        </TypographyParagraph>
        <img src="../assets/rules/matching.png" alt="匹配界面" style="width: 100%;"/>
        <TypographyParagraph class="paragraph">
            如图为匹配界面，等待匹配成功后即可进入对战界面。
        </TypographyParagraph>

        <img src="../assets/rules/problem.png" alt="对战界面" style="width: 100%;"/>
        <TypographyParagraph class="paragraph">
            如图为对战界面，左侧为题目描述，右侧为代码编辑器。下方表格显示了自己和对手的相关信息，包括排名、血量、AC题目数量。侧边栏有聊天框，可以在聊天框内实时发送消息。同时右下角有投降和提交两个按钮，点击可以进行投降或提交评测的操作。提交评测后，点击显示评测结果可以在左侧表格中显示评测结果如下图所示。代码编辑器支持多种语言，包括C++、Java、Python等，并在左上角可以选择语言，颜色主题，字体大小，行高等选项。
        </TypographyParagraph>
        <img src="../assets/rules/problem1.png" alt="对战界面1" style="width: 100%;"/>
        <TypographyParagraph class="paragraph">
            如图对战界面的右下角可以点击番茄道具向对手屏幕扔番茄阻挡视线。
        </TypographyParagraph>
        <img src="../assets/rules/profile.png" alt="个人主页" style="width: 100%;"/>
        <TypographyParagraph class="paragraph">
            如图为个人主页，可以查看个人信息，并进行修改密码，修改个人信息，添加好友等操作。
        </TypographyParagraph>
        <img src="../assets/rules/friend.png" alt="好友界面" style="width: 100%;"/>
        <TypographyParagraph class="paragraph">
            点击右上角左侧的朋友图标，可以查看好友列表，接受新的好友申请。
        </TypographyParagraph>
        <img src="../assets/rules/room.png" alt="房间界面" style="width: 100%;"/>
        <TypographyParagraph class="paragraph">
            点击右上角右侧的房间图标，可以查看房间列表，加入房间，创建房间，添加题目等操作。
        </TypographyParagraph>
       <img src="../assets/rules/add.png" alt="添加房间" style="width: 100%;"/>
        <TypographyParagraph class="paragraph">
            点击右下角右侧的加号图标，可以创建房间并选择题目，预览题目。
        </TypographyParagraph>
        <img src="../assets/rules/wait.png" alt="等待匹配" style="width: 100%;"/>
        <TypographyParagraph class="paragraph">
            点击进入房间后即可等待开始，人数为2时触发单人模式进行1v1单挑，人数大于等于3时触发大逃杀模式
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

    </TypographyParagraph>
    </Col>
    <Col span="6">
    <Anchor :items="anchorItems" :target-offset="targetOffset">
    </Anchor>
    </Col>
</Row>
    </div>

</template>

<script lang="ts" setup>
import { pageIs } from "@/utils/pageis";
pageIs('rule')

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
                title: '功能介绍',
                href: '#Part2',
            },
            {
                title: '玩法介绍',
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
.wrapper {
    overflow-y: scroll;
    height: 100%;
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
