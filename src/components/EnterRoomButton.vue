<template>
    <div
              @mouseover="showOpenIcon = true"
              @mouseout="showOpenIcon = false"
              @click="handleEnterRoom"
              class="custom-button secondary"
            >
          <img
            :src="showOpenIcon ? 'door-open.svg' : 'door-close.svg'"
            alt="Door Icon"
            width="24"
            height="24"
            class="button-icon"
          />
          <span class="button-text">进入房间</span>
        </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useHallState } from '@/stores/hall';
import { HallStatus } from '@/core/game/hall';


const showOpenIcon = ref(false);

const props = defineProps({
    roomId: {
        type: Number,
        required: true,
    },
});

const router = useRouter();
const hall = useHallState();


const handleEnterRoom = () => {
  hall.hall.room_enter(props.roomId as unknown as number)
  

  router.push(`/roomDetails/${props.roomId}`);
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