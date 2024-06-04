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
                <template v-for="tag in selectedProblems" :key="tag">
                    <Tag closable @close="handleCloseTag(tag)">#{{ tag }}</Tag>
                </template>
                <Select :options="options" @change="onSelectChange" placeholder="搜索题目难度"></Select>
                <List>
                    <ListItem v-for="problem in showProblems" :key="problem.id">
                        <ListItemMeta
                            :title="problem.title"
                            :description="formatDescription(problem.description)"
                        >
                        </ListItemMeta>
                        <template #actions>
                            <a key="check-problem">查看</a>
                <a key="add-problem" @click="addProblem(problem)">添加</a>
                        </template>
                    </ListItem>
                    <template #loadMore>
                        <div
                            :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
                        >
                            <Pagination @change="onLoadMore" :current="currentPage" :total="totalProblems" :pageSize="onePageSize" simple/>
                        </div>
                    </template>
                </List>
            </FormItem> 
        </Form>
    
    </Modal>
    
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { Modal, Button, Form, FormItem, Input, message, type FormInstance, Select, List, ListItem, ListItemMeta, Pagination, Tag } from 'ant-design-vue';
import { computed, reactive, ref } from 'vue';
import { generatePost, generateGet } from '@/utils/protocol';


const currentPage = ref(1);
const onePageSize = 5;
const totalProblems = ref(0);

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
const promblems = ref([] as any[]);
const showProblems = ref([] as any[]);
const selectedProblems = ref<string[]>([]);

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

const onSelectChange = (value:any) => {
    console.log(value);
    generateGet(`/api/oj/search?tag=${value}`).then((res) => {
        if (res.data.status === 0) {
            console.log(res.data.data);
            promblems.value = res.data.data.data.results;
            console.log("problems is ", promblems.value);
            totalProblems.value = promblems.value.length;
            showProblems.value = promblems.value.slice(0, onePageSize);
        } else {
            message.error(res.data.msg);
        }
    }).catch((err) => {
        message.error('网络错误');
    });
};

function formatDescription(description: string) {
    // 去除首尾的 <p> 标签
    description = description.replace(/^<p>|<\/p>$/g, "");

    // 如果字数超过 50 个字，则省略
    if (description.length > 80) {
    return description.slice(0, 80) + "...";
    }
    return description;
}

const onLoadMore = (val:any) => {
    currentPage.value = val;
    showProblems.value = promblems.value.slice((currentPage.value - 1) * onePageSize, currentPage.value * onePageSize);
}

const handleCloseTag = (tag: string) => {
    console.log(tag);
    selectedProblems.value = selectedProblems.value.filter((item: any) => item !== tag);
}

const addProblem = (problem: any) => {
    console.log(problem);
    selectedProblems.value.push(problem.title);
}
</script>
<style scoped>

</style>