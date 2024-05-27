<template>
    <Modal v-model:open="modalVisible" title="创建房间" @ok="handleOk" centered>
        <template #footer>
            <Button key="back" @click="handleCancel">取消</Button>
            <Button key="submit" type="primary" :loading="loading" @click="handleOk">创建房间</Button>
        </template>
        <Form ref="formRef" :model="formState" layout="vertical">
            <FormItem label="房间名" :rules="[{ required: true, message: '请输入房间名', trigger: 'blur', validator:roomNameCheck }]">
                <Input v-model:value="formState.roomName" placeholder="Room Name"></Input>
            </FormItem>
        </Form>
    
    </Modal>
    
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { Modal, Button, Form, FormItem, Input, message, type FormInstance } from 'ant-design-vue';
import { computed, reactive, ref } from 'vue';
import { generatePost } from '@/utils/protocol';

const props = defineProps({
    modelValue: {
        type: Boolean,
    },
});
const emit = defineEmits(['update:modelValue']);

const modalVisible = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v),
});

const formState = reactive({
    roomName: '',
});

const loading = ref(false);
const formRef = ref<FormInstance | null>(null);

const roomNameCheck = (_: any, value: string) => {
    if (!value) {
        return Promise.reject('请输入房间名');
    } 
    return Promise.resolve();
};

const handleCancel = () => {
    modalVisible.value = false;
};

const handleOk = () => {
    generatePost('/api/room/add', {
        roomName: formState.roomName,
    }).then((res) => {
        if (res.data.status === 0) {
            loading.value = false;
            message.success('创建成功');
            modalVisible.value = false;
        } else {
            message.error(res.data.msg);
        }
    }).catch((err) => {
        message.error('网络错误');
    });
};

</script>
<style scoped>

</style>