<template>
  <div class="topBar">
    <TopNav/>
  </div>
  <div id="app">
    <div class="star" v-for="n in 400"></div>
    <!-- MAIN CONTENT  -->
    <div class="sun" :style="sunStyle()"></div>
    <div
        class="planet_container"
        :class="`planet_container-${mode}`"
        v-for="(p, i) in planetsFiltered"
        :style="planetContainerStyle(i)"
        @click="onClickPlanetContainer(i)"
    >
      <div
          class="planet"
          :class="`planet-${mode}`"
          :style="planetStyle(i)"
          @click="onClickPlanet(i)"
      >
        <div
            class="satellite_container"
            v-for="(s, j) in p.satellites"
            :style="satelliteContainerStyle(i, j)"
        >
          <div class="satellite" :style="satelliteStyle(i, j)"></div>
        </div>
      </div>
    </div>

    <div class="match-button">
      <button @click="onClickMatch()" type="primary" ghost>
        开始匹配
      </button>
    </div>

    <div v-if="matching" class="match-button" style="z-index: 999;">
      <button @click="cancelMatch">取消匹配</button>
    </div>

    <!-- INFORMATION  -->
    <div class="information-container">
      <p class="name">{{ selectedPlanet.name }}</p>
      <!--
      <p>
        当前在线人数 :    {{ peopleNum ? peopleNum : "" }}
      </p>
      <p>
        题库题数 : {{ parseNumeriqueSpace(selectedPlanet.diameter * 1000) }}
      </p>
      <p>
        平均完成时间 : {{ parseNumeriqueSpace(selectedPlanet.rotationTime) }} s
      </p>
      <p>历史最高排名 : {{ parseNumeriqueSpace(selectedPlanet.ua * 150) }} </p>
      -->
    </div>

    <!-- ACTION  -->
    <!--
    <div class="action-container">
      <div>
				<span v-for="m in modes">
					<button :disabled="m === mode" @click="switchMode(m)">{{ m }}</button>
				</span>
      </div>
      <div v-if="mode !== 'WIDTH' || speedReal">
        <input type="range" step="1" min="1" max="1000" v-model="speedRatio"/>
        <input type="number" step="1" min="1" max="1000" v-model="speedRatio"/>
        <span>days / second</span>
      </div>
      <div>
        <button v-if="mode === 'WIDTH'" @click="speedReal = !speedReal">
          {{ speedReal ? "Speed Real" : "Speed Fake" }}
        </button>
      </div>
      <div v-if="mode === 'DISTANCE'">
        <button :disabled="planetsFilteredLength <= 4" @click="zoomIn">
          Zoom IN
        </button>
        <button
            :disabled="planetsFilteredLength >= planets.length"
            @click="zoomOut"
        >
          Zoom OUT
        </button>
      </div>
    </div>
    -->
  </div>
</template>

<script>
import {Modal, message} from 'ant-design-vue';
import TopNav from "@/components/TopNav.vue";
import {useHallState} from '@/stores/hall';
import {mapStores} from 'pinia';
import {isLoggedIn} from '@/utils/auth'
import {generateGet} from "@/utils/protocol";

export default {
  components: {
    TopNav,
    'a-modal': Modal
  },
  created() {
    this.infoModalVisible = false;

    // 如果没有登录，跳转 login
    if (!isLoggedIn()) {
      this.$router.push('/auth/login')
    }
  },
  // ##################################################
  // DATA #############################################
  // ##################################################
  data() {
    return {
      // peopleNum: null,
      timer: null,
      matching: false,
      infoModalVisible: false,
      mode: null,
      modes: ["WIDTH", "SPEED", "DISTANCE"],
      speedRatio: 1, // 初始为1，否则speed模式下转的太快
      speedReal: false,
      sun: {
        diameter: "0.01",
        colors: [] // "gold", "orange"
      },
      selectedPlanetId: 3,
      planetsFilteredLength: 0,
      planets: [
        {
          name: "mercury",
          diameter: "0.01",
          rotationTime: "87.969",
          ua: "0.47",
          colors: ["gold", "darkBlue"]
        },
        {
          name: "venus",
          diameter: "0.01",
          rotationTime: "224.701",
          ua: "0.7",
          colors: ["forestgreen", "springGreen"]
        },
        /*
        Venus (and the planet Mercury) are the only two planets that don't have a single natural moon orbiting them
        */
        {
          name: "earth",
          diameter: "0.01", // *1000 km
          rotationTime: "365.256", // days
          ua: "1", // 150Mkm
          colors: ["white", "blue"],
          backgroundUrl:
              "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6d358ffa-5177-4b84-963f-9a1957b5a8d0/d8vp0fw-994cd783-be4b-46d3-86a8-2a30d4791003.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzZkMzU4ZmZhLTUxNzctNGI4NC05NjNmLTlhMTk1N2I1YThkMFwvZDh2cDBmdy05OTRjZDc4My1iZTRiLTQ2ZDMtODZhOC0yYTMwZDQ3OTEwMDMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.0DhwRtmDbKrm-cI67M7nD6zVeH6xKg1nbgFZlUSDs5s",
          satellites: [
            {
              name: "moon",
              diameter: "0.01",
              rotationTime: "29.53",
              colors: []
              /* white grey */
            }
          ]
        },
        /* Mars has two moons, Phobos and Deimos. Both are thought to be captured asteroids, or debris from early in the formation of our solar system. */
        {
          name: "单人模式",
          diameter: "120.0",
          rotationTime: "4332.6",
          ua: "5.2",
          colors: [], // "#876f51", "#9c661f"
          /* satellites: [
            {
              name: "Io",
              diameter: "3.6432",
              rotationTime: "1.769",
              distance: "421,8",
              colors: [] // "green", "yellow"
            },
            {
              name: "europe",
              diameter: "3.1216",
              rotationTime: "3.551",
              distance: "671,1",
              colors: [] // "brown", "pink"
            },
            {
              name: "ganymede",
              diameter: "5.2644",
              rotationTime: "7.15",
              distance: "1070,4",
              colors: [] // "blue", "cyan"
            },
            {
              name: "callisto",
              diameter: "4.8206",
              rotationTime: "16.689",
              distance: "1882,7",
              colors: [] // "orange", "grey"
            }
          ] */
        },
        {
          name: "单人模式",
          diameter: "120.0",
          rotationTime: "4332",
          ua: "5.2",
          colors: ["#b09f74", "#b8902a"],
          satellites: [
            {
              name: "Thétys",
              diameter: "1.066",
              rotationTime: "1.89",
              distance: "294,66",
              colors: ["white", "grey"]
            },
            {
              name: "Dioné",
              diameter: "1.1234",
              rotationTime: "2.74",
              distance: "377,4",
              colors: ["white", "white"]
            },
            {
              name: "Rhéa",
              diameter: "1.5286",
              rotationTime: "4.52",
              distance: "527,04",
              colors: ["white", "grey"]
            },
            {
              name: "Titan",
              diameter: "5.1495",
              rotationTime: "15.95",
              distance: "1221,83",
              colors: ["gold", "white"]
            },
            {
              name: "Japet",
              diameter: "1.4712",
              rotationTime: "79.33",
              distance: "3561,3",
              colors: ["springGreen", "cyan"]
            }
          ]
        },
        {
          name: "大逃杀模式",
          diameter: "120.0",
          rotationTime: "30688.4",
          ua: "19.2",
          colors: [], // "#a3bebf", "#387a7d"
          /* satellites: [
            {
              name: "titania",
              diameter: "0.7884",
              rotationTime: "8.7",
              colors: ["#387a7d", "#a3bebf"]
            }
          ] */
        },
        {
          name: "mars",
          diameter: "0.01",
          rotationTime: "686.980",
          ua: "1.666",
          colors: ["darkred", "red"]
        },
        {
          name: "neptune",
          diameter: "0.01",
          rotationTime: "60181.3",
          ua: "30.1",
          colors: ["#7f8dc7", "#01146b"],
          /* satellites: [
            {
              name: "triton",
              diameter: "2.7068",
              rotationTime: "5.877",
              colors: []
              /* "forestgreen", "#7f8dc7"
            },
            {
              name: "néréide",
              diameter: "0.340",
              rotationTime: "360.14",
              colors: ["#01146b", "#7f8dc7"]
            }
          ] */
        }
      ]
    };
  },

  // ##################################################
  // COMPUTED #########################################
  // ##################################################
  computed: {
    // #########
    // ## Global status import
    // #########
    ...mapStores(useHallState),

    selectedPlanet() {
      return this.planets[this.selectedPlanetId];
    },
    totalPlanetsWidth() {
      let result = 0;
      for (let i = 0; i < this.planetsFiltered.length; i++) {
        result += parseFloat(this.planetsFiltered[i].diameter);
      }
      return result;
    },
    containerMargin_modeWidth() {
      return parseFloat(this.totalPlanetsWidth * 0.0075);
    },
    planetMargin_modeWidth() {
      return parseFloat(
          (this.totalPlanetsWidth / this.planetsFiltered.length) * 0.045
      );
    },
    sunWidth(index) {
      return parseFloat(
          (this.sun.diameter / this.totalPlanetsWidth) *
          (100 -
              this.containerMargin_modeWidth * 2 -
              this.planetMargin_modeWidth * 2 * this.planetsFiltered.length)
      );
    },
    planetsFiltered() {
      const result = [];
      for (let i = 0; i < this.planetsFilteredLength; i++) {
        result.push(this.planets[i]);
      }
      return result;
    }
  },

  // ##################################################
  // WATCH ############################################
  // ##################################################
  watch: {},

  // ##################################################
  // MOUNTED ##########################################
  // ##################################################
  mounted() {
    this.mode = this.modes[0];
    this.planetsFilteredLength = this.planets.length;
    //this.startTimer();
  },
  /*destroyed() {
    // 组件销毁前清除定时器，防止内存泄漏
    this.stopTimer();
  },*/

  // ##################################################
  // METHODS ##########################################
  // ##################################################
  methods: {
    /* startTimer() {

      this.timer = setInterval(() => {
        this.updatePeopleNum();
      }, 5); // 500毫秒 = 0.005秒
    },
    // 停止定时器
    stopTimer() {
      clearInterval(this.timer); // 清除定时器
    },
    updatePeopleNum() {
      generateGet('/onlineCount').then((res) => {
        res=res.data
        if (res.status === 0) {
          this.peopleNum = res.data;
        } else {
          console.log("error:", res.msg);
        }
      })
    },
     */
    // ACTION ##################################################
    switchMode(m) {
      this.mode = m;
      this.planetsFilteredLength = this.planets.length;
    },
    cancelMatch() {
      window.location.reload();
      this.matching = false;
    },
    onClickMatch() {
      this.matching = true;
      this.mode = "SPEED";
      setTimeout(() => {
        this.mode = "DISTANCE";
      }, 3000);
      setTimeout(() => {
        if (this.planetsFilteredLength > 4) {
          this.planetsFilteredLength--;
        }
      }, 6000);
      setTimeout(() => {
        if (this.planetsFilteredLength > 4) {
          this.planetsFilteredLength--;
        }
      }, 7000);
      setTimeout(() => {
        if (this.planetsFilteredLength > 4) {
          this.planetsFilteredLength--;
        }
      }, 8000);
      setTimeout(() => {
        if (this.planetsFilteredLength > 4) {
          this.planetsFilteredLength--;
        }
      }, 9000);

      this.hall_stateStore.hall.match_request()
    },
    zoomIn() {
      if (this.planetsFilteredLength > 4) {
        this.planetsFilteredLength--;
      }
    },
    zoomOut() {
      if (this.planetsFilteredLength < this.planets.length) {
        this.planetsFilteredLength++;
      }
    },
    onClickPlanet(i) {
      if (i == 4) {
        console.log("onClickPlanet", i);
        this.selectedPlanetId = i;
        this.infoModalVisible = true;
        // let signal = (this.infoModalVisible == true) ? 1 : 0;
        // message.success(signal);
      }
    },
    onClickPlanetContainer(i) {
      if (this.mode === "WIDTH" || this.mode === "SPEED" || this.mode === "DISTANCE") {
        return;
      }
      if (this.mode !== "WIDTH") {
        console.log("onClickPlanetContainer", i);
        this.selectedPlanetId = i;
      }
    },
    parseNumeriqueSpace(value) {
      let result = "";
      value = parseInt(value);
      value = value.toString();
      for (let i = value.length - 1; i >= 0; i--) {
        result = value.charAt(i).concat(result);
        if ((value.length - i) % 3 === 0) {
          result = " ".concat(result);
        }
      }
      return result;
    },

    // MODE WIDTH ##################################################
    calcPlanetWidth_modeWidth(diameter) {
      return parseFloat(
          (parseFloat(diameter) / this.totalPlanetsWidth) *
          (100 -
              this.containerMargin_modeWidth * 2 -
              this.planetMargin_modeWidth * 2 * this.planetsFiltered.length)
      );
    },
    planetLeft_modeWidth(index) {
      let result = this.containerMargin_modeWidth + this.planetMargin_modeWidth;
      for (let i = 0; i < index; i++) {
        result +=
            this.calcPlanetWidth_modeWidth(this.planetsFiltered[i].diameter) +
            this.planetMargin_modeWidth * 2;
      }
      return result;
    },

    // SUN ##################################################
    sunStyle() {
      let width;
      let boxShadowWidth;
      let unit;
      let right;
      const color = this.sun.colors[1];

      if (this.mode === "WIDTH") {
        width = this.sunWidth;
        boxShadowWidth = 10;
        unit = "vw";
        right = "65vw";
        boxShadowWidth = 10;
      } else if (this.mode === "SPEED") {
        width = 2.5;
        boxShadowWidth = 0.9;
        unit = "vw";
        right = `calc(50% - ${width / 2}${unit});`;
        boxShadowWidth = width / 5;
      } else if (this.mode === "DISTANCE") {
        width = 5;
        boxShadowWidth = 5;
        unit = "px";
        right = `calc(50% - ${width / 2}${unit});`;
        boxShadowWidth = width / 5;
      }
      return `
				right: ${right};
				top: calc(50% - ${width / 2}${unit});
				height: ${width}${unit};
				width: ${width}${unit};
				box-shadow: 0 0 ${boxShadowWidth}${unit} ${color};
			`;
    },

    // PLANET CONTAINER ##################################################
    planetContainerStyle(i) {
      let left;
      let top;
      let width;
      let height;
      let border;
      let rotationTime;
      let cursor = "auto";

      if (this.mode === "WIDTH") {
        top = "10vh";
        left = this.planetLeft_modeWidth(i) + "vw";
        width =
            this.calcPlanetWidth_modeWidth(this.planetsFiltered[i].diameter) + "vw";
        height = "80vh";
        border = "0";
        rotationTime = 0;
      } else if (this.mode === "SPEED") {
        width = (90 / (this.planetsFiltered.length + 1)) * (i + 1);
        top = `calc(50% - ${width / 2}vw - 1px)`;
        left = `calc(50% - ${width / 2}vw - 1px)`;
        width = width + "vw";
        height = width;
        border = `solid 1px ${this.planetsFiltered[i].colors[1]}`;
        rotationTime = this.planetsFiltered[i].rotationTime / this.speedRatio;
        cursor = "pointer";
      } else if (this.mode === "DISTANCE") {
        width =
            (90 / this.planetsFiltered[this.planetsFiltered.length - 1].ua) *
            this.planetsFiltered[i].ua;
        top = `calc(50% - ${width / 2}vw - 1px)`;
        left = `calc(50% - ${width / 2}vw - 1px)`;
        width = width + "vw";
        height = width;
        border = `solid 1px ${this.planetsFiltered[i].colors[1]}`;
        rotationTime = this.planetsFiltered[i].rotationTime / this.speedRatio;
        cursor = "pointer";
      }
      return `
					top: ${top};
					left: ${left};
					width: ${width};
					height: ${height};
					border: ${border};
					animation: gravitation ${rotationTime}s linear infinite;
					z-index: ${this.planets.length - i};
					cursor: ${cursor};
				`;
    },

    // PLANET ##################################################
    planetStyle(index) {
      let right;
      let width;
      let boxshadowWidth;
      let unit;
      let backgroundImage = "";

      if (this.mode === "WIDTH") {
        width = this.calcPlanetWidth_modeWidth(
            this.planetsFiltered[index].diameter
        );
        boxshadowWidth = 1.65;
        unit = "vw";
        right = `calc(50% - ${width / 2}${unit})`;
      } else if (this.mode === "SPEED") {
        width = 2.5;
        boxshadowWidth = 0.9;
        unit = "vw";
        right = `-${width / 2}${unit}`;
      } else if (this.mode === "DISTANCE") {
        width = 4;
        boxshadowWidth = 2;
        unit = "px";
        right = `-${width / 2}${unit}`;
      }
      const color1 = this.planetsFiltered[index].colors[0];
      const color2 = this.planetsFiltered[index].colors[1];
      if (this.planetsFiltered[index].backgroundUrl) {
        backgroundImage = `
					background-position: center;
					background-repeat-style: no-repeat;
					background-size: ${width * 1.2}${unit};
					background-image: url(${this.planetsFiltered[index].backgroundUrl});
				`;
      }
      return (
          `
				top: calc(50% - ${width / 2}${unit});
				right: ${right};
				height: ${width}${unit};
				width: ${width}${unit};
				background: radial-gradient(circle at ${width / 3}${unit} ${
              width / 3
          }${unit}, ${color1}, ${color2});
				box-shadow: 0 0 ${boxshadowWidth}${unit} ${color2};
			` + backgroundImage
      );
    },

    // SATELLITE CONTAINER ##################################################
    satelliteContainerStyle(i, j) {
      if (
          this.planetsFiltered[i]?.satellites &&
          this.planetsFiltered[i].satellites.length > 0 &&
          this.planetsFiltered[i].satellites[j]
      ) {
        let width;
        let unit;
        let color;
        let animationTime;
        let animationDelay;
        const satellite = this.planetsFiltered[i].satellites[j];

        if (this.mode === "WIDTH") {
          width =
              this.calcPlanetWidth_modeWidth(this.planetsFiltered[i].diameter) +
              1.5 +
              1.5 * j;
          unit = "vw";
          color = satellite.colors[1];
          if (this.speedReal) {
            animationTime = satellite.rotationTime / this.speedRatio;
            animationDelay = 0;
          } else {
            animationTime = 5 * (j + 1);
            animationDelay = 5 * j;
          }
        } else if (this.mode === "SPEED") {
          width = 2.5 + 1 + 1 * j;
          unit = "vw";
          color = satellite.colors[1];
          animationTime = satellite.rotationTime / this.speedRatio;
          animationDelay = 0;
        } else if (this.mode === "DISTANCE") {
          width = 0;
          unit = "px";
          color = "transparent";
          animationTime = satellite.rotationTime / this.speedRatio;
          animationDelay = 0;
        }
        return `
					top: calc(50% - ${width / 2}${unit});
					left: calc(50% - ${width / 2}${unit});
					width: ${width}${unit};
					height: ${width}${unit};
					border-color: transparent transparent transparent ${color};
					animation: gravitation ${animationTime}s linear infinite;
					animation-delay: -${animationDelay}s;
					`;
      }
    },

    // SATELLITE ##################################################
    satelliteStyle(i, j) {
      if (
          this.planetsFiltered[i]?.satellites &&
          this.planetsFiltered[i].satellites.length > 0 &&
          this.planetsFiltered[i].satellites[j]
      ) {
        const satellite = this.planetsFiltered[i].satellites[j];
        let width;
        let boxshadowWidth;
        let unit;
        let color1;
        let color2;
        if (this.mode === "WIDTH") {
          width = this.calcPlanetWidth_modeWidth(satellite.diameter);
          boxshadowWidth = width * 0.1;
          unit = "vw";
          color1 = satellite.colors[0];
          color2 = satellite.colors[1];
        } else if (this.mode === "SPEED") {
          width = 5;
          boxshadowWidth = 3;
          unit = "px";
          color1 = satellite.colors[0];
          color2 = satellite.colors[1];
        } else if (this.mode === "DISTANCE") {
          width = 0;
          boxshadowWidth = 0;
          unit = "px";
          color1 = "transparent";
          color2 = "transparent";
        }
        return `
					top: calc(14.5% - ${width / 2}${unit});
					left: calc(14.5% - ${width / 2}${unit});
					height: ${width}${unit};
					width: ${width}${unit};
					background: radial-gradient(circle at ${width / 3}${unit} ${
            width / 3
        }${unit}, ${color1}, ${color2});
					box-shadow: 0 0 ${boxshadowWidth}${unit} ${color2};
				`;
      }
    }
  }
};
</script>

<style scoped>

.topBar {
  z-index: 1005;
  width: 100%;
  overflow: hidden; /* 隐藏超出部分 */
  height: 60px;
  position: relative; /* 确保 TopNav 绝对定位相对于 .top */
}

#app {
  background-color: black; /* 设置背景为黑色 */
  min-height: 100vh; /* 至少为视口的100%高度 */
  display: flex;
  flex-direction: column; /* 如果你需要垂直布局 */
  align-items: stretch; /* 使子元素填满容器宽度 */
}
</style>

<style lang="scss">

.planet_container,
.planet,
.satellite_container,
.satellite,
.sun {
  transition: all ease 2s;
}

.sun {
  position: absolute;
  border-radius: 50%;
}

.planet_container {
  position: absolute;
  border-radius: 50%;
  transform-origin: center;

  .planet {
    border-radius: 50%;
    position: absolute;
    cursor: pointer;

    .satellite_container {
      position: absolute;
      border: solid;
      border-width: 1px 0 0 1px;
      border-radius: 50%;

      .satellite {
        position: absolute;
        border-radius: 50%;
      }
    }
  }
}

.planet_container-SPEED,
.planet_container-DISTANCE {
  transition: all ease 2s, box-shadow ease 0.6s;

  /* &:hover {
    box-shadow: 0 0 25px white !important;

    .planet {
      box-shadow: 0 0 25px white !important;
    }
  } */
}

.planet-WIDTH {
  transition: all ease 2s, box-shadow ease 0.6s;

  /* &:hover {
    box-shadow: 0 0 25px white !important;
  } */
}

.action-container {
  z-index: 999;
  position: absolute;
  color: white;

  div {
    margin-top: 10px;
  }

  button {
    padding: 10px 15px;
    margin-left: 10px;
  }

  input {
    margin-left: 13px;

    &[type="number"] {
      width: 50px;
    }
  }
}

.information-container {
  z-index: 999;
  position: absolute;
  color: white;
  right: 15px;
  bottom: 15px;
  border: solid 1px grey;
  border-radius: 15px;
  padding: 0 20px 10px 20px;
  font-size: 14px;

  .name {
    text-transform: uppercase;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.4rem;
  }
}

.match-button {
  position: absolute;
  bottom: 20px; /* 调整底部边距 */
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 居中对齐 */
}


@keyframes gravitation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.author-container {
  $width: 42px;
  position: absolute;
  width: 50%;
  left: $width/2;
  bottom: $width/2;

  .picture {
    position: absolute;
    top: -$width;
    margin-top: -12px;
    width: $width;
    height: $width;
    background-size: $width;
    background-position: center;
    background-repeat-style: "no-repeat";
    background-image: url(https://assets.codepen.io/595576/internal/avatars/users/default.png?format=auto&version=1689877807&width=80&height=80);
  }

  .title {
    font-size: 16px;
    letter-spacing: 2px;
    color: white;
  }
}

.star {
  position: absolute;
  width: 1px;
  height: 1px;
  border-radius: 1px;
  background: #fff;
  @for $i from 1 through 400 {
    &:nth-child(#{$i}) {
      $randomOpacity: (random(95 + 1) + 5 - 1) / 100;
      left: random(1000) / 10 * 1% - 1%;
      bottom: random(1000) / 10 * 1% - 1%;
      opacity: $randomOpacity;
      box-shadow: 0 0 6px 1px rgba(255, 255, 255, $randomOpacity);
    }
  }
}
</style>
