<script setup lang="ts">
import { ConfigProvider, Modal } from 'ant-design-vue';
import { ref, watch } from 'vue';
import MBButton from '@/components/next-ui/notifications/MBButton.vue'
import { useRouter } from 'vue-router';
import { generateGet } from '@/utils/protocol';
import { useHallState } from '@/stores/hall';
import { HallStatus } from '@/core/game/hall';

const open = ref(true)

const props = defineProps<{
    friendid: number,
    roomid: number
}>()

const friendName = ref<string>('')
const roomName = ref<string>('')

const initFriendInfo = async (friendid: number) => {
  return await generateGet("api/user/profile", { id: friendid }).then((res) => {
    if (res.data.status === 0) {
      return res.data.data.userName as string
    } else {
      console.log(res.data.msg);
      return '好友'
    }
  }).catch((err) => {
    console.log(err);
    return '好友'
  });
};

const initRoomInfo = async (roomid: number) => {
  return await generateGet(`/api/room/id?id=${roomid}`).then((res) => {
    if (res.data.status === 0) {
      return res.data.data.name as string
    } else {
      console.log(res.data.msg);
      return '房间'
    }
  }).catch((err) => {
    console.log(err);
    return '房间'
  });
};

watch(()=> props.friendid, (val) => {
    friendName.value = val.toString()
    initFriendInfo(val).then((name) => {
        friendName.value = name
    })
}, { immediate: true })
watch(()=> props.roomid, (val) => {
    roomName.value = val.toString()
    initRoomInfo(val).then((name) => {
        roomName.value = name
    })
}, { immediate: true })


const hall = useHallState();
const router = useRouter()
const enter = () => {
    open.value = false
    hall.hall.room_enter(props.roomid as unknown as number);
    router.push(`/roomDetails/${props.roomid}`)
}

</script>

<template>
    <ConfigProvider
        :theme="{
            token: {
                borderRadius: 0
            }
        }">
        <Modal v-model:open="open" centered :footer="null">
            <template #closeIcon>
                <svg class="close-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 55.324 55.321" xml:space="preserve" >
                    <g id="Layer_12">
                        <polygon fill="rgba(217, 214, 214,.75)" class="close" points="47.393,0 27.677,19.709 8.531,0.563 0.602,8.491 19.752,27.635 0,47.387 7.931,55.321 
                            27.677,35.572 46.827,54.718 54.752,46.79 35.605,27.635 55.324,7.925 	"/>
                    </g>
                </svg>
            </template>

            <div class="content">
                <div class="title">
                    <span class="username">{{ friendName }}</span>
                    <span>邀请你加入</span>
                </div>
                <div class="roomname">
                    <span>{{ roomName }}</span>
                </div>
            </div>

            <div class="footer">
                <div class="two-button">
                    <MBButton title="拒绝" @click="open=false"/>
                    <MBButton title="加入" primary @click="enter"/>
                </div>
            </div>

            <template #modalRender="{ originVNode }">
                <div class="bb-msgbox-wrapper">
                    <component :is="originVNode" />
                </div>
            </template>
        </Modal>
    </ConfigProvider>
</template>

<style>
.ant-modal-mask {
    backdrop-filter: blur(3px);
    background-color: rbga(0,0,0,0.3);
}

.bb-msgbox-wrapper .ant-modal-content {
    background-color: #555;
}
.bb-msgbox-wrapper .ant-modal-close:hover {
    background-color: unset;
}
</style>

<style scoped>
.close-svg {
    transition: all 0.5s;
    transform-origin: center;
}
.close-svg:hover{
    transform: rotate(-90deg);
}
.content {
    color: white;
}

.footer {
    display: flex;
    justify-content: center;
    align-items: center;
}

.two-button {
    display: flex;
    width: 22.5rem;
    align-items: center;
    justify-content: space-between;
}

.content {
    .title {
        padding-top: 1rem;
        font-size: 1rem;
        .username {
            margin-right: 0.5rem;
        }
    }

    .roomname {
        padding: 3.5rem 0 4.5rem 0 ;
        font-size: 2rem;
        
        justify-content: center;
        align-items: center;
        display: flex;
    }
}
</style>