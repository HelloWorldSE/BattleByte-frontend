<template>
    <Modal v-model:open="modalVisible" title="创建房间" @ok="handleOk" @cancel="handleCancel" :wrapClassName="wrapAddRoom"  centered>
        <template #footer>
            <Button key="back" @click="handleCancel">取消</Button>
            <Button key="submit" type="primary" :loading="loading" @click="handleOk">创建房间</Button>
        </template>
        <Form ref="formRef" :model="formState" layout="vertical">
            <FormItem label="房间名" name="roomName" :rules="[{ required: true, message: '请输入房间名', trigger: 'blur', validator:roomNameCheck }]" >
                <Input v-model:value="formState.roomName" placeholder="Room Name"></Input>
            </FormItem>
            <FormItem label="选择题目">
                    <template v-for="tag in selectedProblems" :key="tag">
                        <Tag closable @close="handleCloseTag(tag)" :color="tag.color">{{ tag.title }}</Tag>
                    </template>

                    <Divider />
                
                <Select @change="onSelectChange" placeholder="搜索题目标签">
                    <SelectOption v-for="item in options" :key="item.value" :value="item.value">
                        <span :aria-label="item.value" :class="'custom-span-' + item.color"> {{ item.value }}</span>
                    </SelectOption>
                
                </Select>
                <List v-if="searchLoading===false">
                    <ListItem v-for="problem in showProblems" :key="problem.id">
                        <ListItemMeta
                            :title="problem.title"
                            :description="formatDescription(problem.description)"
                        >
                        </ListItemMeta>
                        <template #actions>
                            <a key="check-problem" @click="openDrawer(problem)">查看</a>
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
                <div v-else class="spinContainer">
                    <Spin />
                </div>
            </FormItem> 
        </Form>
    
    </Modal>
    <Drawer
        title="题目详情"
        placement="right"
        :visible="isDrawerOpen"
        @close="closeDrawer"
        :mask="false"
        width="600"
        >
        <QuestionView :problem-id="curProblemId"
        v-if="curProblemId !== -1"/>
        <p v-else>没有选中题目！</p>
    </Drawer>
    
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { Modal, Button, Form, FormItem, Input, message, type FormInstance, Select, List, ListItem, ListItemMeta, Pagination, Tag, Divider, SelectOption, Drawer, Spin } from 'ant-design-vue';
import { computed, reactive, ref, watch } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { generatePost, generateGet } from '@/utils/protocol';
import QuestionView from '@/views/QuestionView.vue';


const currentPage = ref(1);
const onePageSize = 5;
const totalProblems = ref(0);
const isDrawerOpen = ref(false);
const curProblemId = ref(-1);

const searchLoading = ref(false);

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
const promblems = ref<any[]>([]);
const showProblems = ref<any[]>([]);
const selectedProblems = ref<any[]>([]);

const roomNameCheck = async (_rule: Rule, value: string) => {
    console.log("roomName:", value);
    if (!value) {
        return Promise.reject('请输入房间名');
    } 
    else {
        console.log("roomName:", value);
        return Promise.resolve();
    }
    
};

const handleCancel = () => {
    modalVisible.value = false;
    formRef.value?.resetFields();
    isDrawerOpen.value = false;
};

const handleOk = () => {
    formRef.value?.validate().then(() => {
        loading.value = true;
        console.log("roomName1:", formState.roomName);
        generatePost('/api/room/add', {
            name: formState.roomName,
        }).then((res) => {
            if (res.data.status === 0) {
                const addedProblems = selectedProblems.value.map((item) => item._id);
                console.log("problems:", addedProblems);
                generatePost(`/api/game/gameaddbatch?id=${res.data.data.gameId}`, addedProblems ).then((res) => {
                    if (res.data.status === 0) {
                        console.log(res.data.data);
                        loading.value = false;
                        message.success('创建成功');
                        formRef.value?.resetFields();
                        formState.roomName = '';
                        modalVisible.value = false;
                        isDrawerOpen.value = false;
                    } else {
                        loading.value = false;
                        message.error(res.data.msg);
                    }
                }).catch((err) => {
                    message.error('网络错误');
                });
                
                // location.reload();
            } else {
                message.error(res.data.msg);
            }
        }).catch((err) => {
            message.error('网络错误');
        });
    }).catch((err) => {
        message.error('请输入房间名');
    });
    
};

// const getProblems = () => {
//     generateGet('/api/oj/search?tag=middle').then((res) => {
//         if (res.data.status === 0) {
//             console.log(res.data.data);
//             promblems.value = res.data.data.results;
            
//         } else {
//             message.error(res.data.msg);
//         }
//     }).catch((err) => {
//         message.error('网络错误');
//     });
// };

// getProblems();

const options = [{value:'Loop', color:"green"}, {value:'middle', color:"blue"}, {value:'Input and Output', color:'red'}, {value:'String', color:'orange'}];

const onSelectChange = (value:any) => {
    searchLoading.value = true;
    console.log(value);
    generateGet(`/api/oj/search?tag=${value}`).then((res) => {
        if (res.data.status === 0) {
            console.log(res.data.data);
            searchLoading.value = false;
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
    if (selectedProblems.value.some((item: any) => item.title === problem.title)){
        return;
    }
    selectedProblems.value.push({
        id: problem.id,
        _id: problem._id,
        title: problem.title,
        color: problem.tags[0] === "middle" ? "blue" :
         problem.tags[0] === "Loop" ? "green" :
         problem.tags[0] === "String" ? "orange" :"red",
    });
    console.log("problem.tags[0] is", problem.tags[0]);
    console.log("select is", selectedProblems.value);
}

const judgeIfDisabled = (problem: any) => {
    console.log("selectedProblems.value is", selectedProblems.value);
    return selectedProblems.value.some((item: any) => item.title === problem.title);
}


const openDrawer = (problem:any) => {
    isDrawerOpen.value = true;
    curProblemId.value = problem._id;
};

const closeDrawer = () => {
  isDrawerOpen.value = false;
};

const wrapAddRoom = computed(() => {
  return isDrawerOpen.value ? 'modalMask' : '';
});

watch(modalVisible, (newVal) => {
  if (!newVal) {
    isDrawerOpen.value = false;
  }
});


</script>

<style>
.modalMask {
  right: 600px;
}

/* 定义 Modal 左移的动画效果 */
.modalMask .ant-modal-content {
    transform: translateX(-50%);
    transition: transform 0.3s ease;
}

/* 确保 Modal 正常显示时复位 */
.ant-modal-content {
  transition: transform 0.3s ease;
}

.custom-span-green {
    color: #52c41a;
}

.custom-span-blue {
    color: #1890ff;
}

.custom-span-red {
    color: #f5222d;
}

.custom-span-orange {
    color: #fa8c16;
}

.spinContainer {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    /* background: rgba(0, 0, 0, 0.05); */
}

</style>