<template>
    <Modal v-model:open="modalVisible" title="删除好友确认" @ok="handleOk" @cancel="cancel" centered>
        <template #footer>
            <Button key="back" @click="cancel">取消</Button>
            <Button key="submit" type="primary" @click="handleOk">确定</Button>
        </template>
        <p>确定要删除好友: {{userName}} 吗？</p>
    </Modal>
</template>


<script lang="ts" setup>
import { generateDelete } from '@/utils/protocol';
import { Modal, Button, Form, FormItem, Input, Upload, message, InputPassword, type FormInstance } from 'ant-design-vue';
import { ref, reactive, defineProps, defineEmits, computed } from 'vue';

const props = defineProps({ 
    userId: {
        type: Number,
        required: true,
    },
    userName: {
            type: String,
            required: true,
    },
    friendId: {
        type: Number,
        required: true,
    },
    modelValue: {
        type: Boolean,
    },
})

const emit = defineEmits(['update:modelValue']);

const modalVisible = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v),
});

const handleOk = () => {
    generateDelete(`api/user/friend/${props.friendId}`).then((res) => {
        if (res.data.status === 0) {
            message.success('删除好友成功');
            emit('update:modelValue', false);
            location.reload();
        } else {
            message.error('删除好友失败');
        }
    });
}

const cancel = () => {
    emit('update:modelValue', false);
}
</script>