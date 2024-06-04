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
            <FormItem label="选择题目">
                <Select :options="options" @change="onSelectChange"></Select>
                <List>
                    <ListItem v-for="problem in promblems" :key="problem.id">
                        <ListItemMeta
                            :title="problem.title"
                            :description="problem.description"
                        >
                        </ListItemMeta>
                    </ListItem>
                </List>
            </FormItem> 
        </Form>
    
    </Modal>
    
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { Modal, Button, Form, FormItem, Input, message, type FormInstance, Select } from 'ant-design-vue';
import { computed, reactive, ref } from 'vue';
import { generatePost, generateGet } from '@/utils/protocol';
import { get } from 'http';

const props = defineProps({
    modelValue: {
        type: Boolean,
    },
    roomList: {
        type: Array,
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
const promblems = ref([] as any);

const roomNameCheck = (_: any, value: string) => {
    if (!value) {
        return Promise.reject('请输入房间名');
    } 
    console.log("roomName:", value);
    return Promise.resolve();
};

const handleCancel = () => {
    modalVisible.value = false;
};

const handleOk = () => {
    generatePost('/api/room/add', {
        name: formState.roomName,
    }).then((res) => {
        if (res.data.status === 0) {
            loading.value = false;
            message.success('创建成功');
            formRef.value?.resetFields();
            formState.roomName = '';
            modalVisible.value = false;
            location.reload();
        } else {
            message.error(res.data.msg);
        }
    }).catch((err) => {
        message.error('网络错误');
    });
};

const getProblems = () => {
    generateGet('/api/oj/search?tag=middle').then((res) => {
        if (res.data.status === 0) {
            console.log(res.data.data);
            promblems.value = res.data.data.results;
        } else {
            message.error(res.data.msg);
        }
    }).catch((err) => {
        message.error('网络错误');
    });
};

getProblems();

const options = [{value:'easy'}, {value:'middle'}];

const onSelectChange = (value: string) => {
    console.log(value);
    generateGet(`/api/oj/search?tag=${value}`).then((res) => {
        if (res.data.status === 0) {
            console.log(res.data.data);
            promblems.value = res.data.data.results;
            console.log("problems is ", promblems.value);
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