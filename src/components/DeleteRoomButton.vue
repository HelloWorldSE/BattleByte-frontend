<template>
    <div
              @mouseover="showOpenIcon = true"
              @mouseout="showOpenIcon = false"
              @click="handleDeleteRoom"
              class="custom-button secondary"
            >
          <img
            :src="showOpenIcon ? 'open-test.svg' : 'close-test.svg'"
            alt="Trash Icon"
            width="24"
            height="24"
            class="button-icon"
          />
          <span class="button-text">删除房间</span>
        </div>
</template>

<script setup>
import { ref, reactive, emit } from 'vue';
import { useRouter } from 'vue-router';
import { generateDelete } from '@/utils/protocol';
import { message } from 'ant-design-vue';

const showOpenIcon = ref(false);

const props = defineProps({
    roomId: {
        type: Number,
        required: true,
    },
    curRooms: {
        type: Array,
        required: true,
    },
});



const router = useRouter();
const curRooms = ref(props.curRooms);
const handleDeleteRoom = () => {
    console.log('delete room');
    generateDelete(`/api/room/${props.roomId}`).then((res) => {
        if (res.data.status === 0) {
          console.log('curRooms:', curRooms.value);

          curRooms.value = curRooms.value.filter((room) => room.id !== props.roomId);
          console.log('curRooms1:', curRooms.value);
            message.success('删除房间成功');
            // location.reload();
        } else {
            message.error('删除房间失败');
        }
    });

    // router.push(`/roomDetails/${props.roomId}`);
};


</script>

<style scoped>
.custom-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d9d9d9; /* 灰色边框 */
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.custom-button.secondary {
  color: #595959; /* 次要文字颜色 */
  background-color: #fff; /* 白色背景 */
}

.custom-button.secondary:hover {
  color: #262626; /* hover 时的文字颜色 */
  background-color: #f5f5f5; /* hover 时的背景色 */
}

</style>