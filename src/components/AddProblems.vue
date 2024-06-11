<template>
    <Drawer 
        v-model:open="modelValue"
        title="新增题目" 
        placement="right"
        width="400"
        :closable="true"
        :mask="false"
        :maskClosable="true"
        :destroyOnClose="true"
        @close=closeDrawer
        :push="{distance: 600}"
        >
        <template v-for="tag in selectedProblems" :key="tag">
                        <Tag closable @close="handleCloseTag(tag)" :color="tag.color">{{ tag.title }}</Tag>
        </template>
        <Button type="primary" @click="postProblems">确认添加</Button>
        <Divider />
        <Select @change="onSelectChange" placeholder="搜索题目标签" style="width: 100%" v-model:value="selectValue">
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
                            <a key="check-problem" @click="openSecondDrawer(problem)">查看</a>
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
        <Drawer
            title="题目详情"
            placement="right"
            :visible="isDrawerOpen"
            @close="closeSecondDrawer"
            :mask="false"
            width="600"
            >
        <QuestionView :problem-id="curProblemId"
            v-if="curProblemId !== -1"/>
        <p v-else>没有选中题目！</p>
        </Drawer>

    </Drawer>
    
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { Modal, Button, Form, FormItem, Input, message, type FormInstance, Select, List, ListItem, ListItemMeta, Pagination, Tag, Divider, SelectOption, Drawer, Spin } from 'ant-design-vue';
import { computed, reactive, ref, watch } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { generatePost, generateGet } from '@/utils/protocol';
import QuestionView from '@/views/QuestionView.vue';
import { useRouter } from 'vue-router';

const currentPage = ref(1);
const onePageSize = 5;
const totalProblems = ref(0);
const isDrawerOpen = ref(false);
const curProblemId = ref(-1);

const searchLoading = ref(false);
const selectValue = ref('');

const props = defineProps({
    modelValue: {
        type: Boolean,
    },
    existedProblems: {
        type: Array,
        default: () => [],
    },
    gameId: {
        type: Number,
    },
})

const emit = defineEmits(['update:modelValue', 'update:existedProblems', 'update']);

const closeDrawer = () => {
    // modelValue.value = false;
    emit('update:modelValue', false);
    emit('update:existedProblems', selectedProblems.value.concat(props.existedProblems));
};

const modelValue = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v),
});



const promblems = ref<any[]>([]);
const showProblems = ref<any[]>([]);
const selectedProblems = ref<any[]>([]);


const options = [{value:'Loop', color:"green"}, {value:'branch', color:"blue"}, {value:'Input and Output', color:'red'}, {value:'String', color:'orange'}];

const onSelectChange = (value:any) => {
    searchLoading.value = true;
    console.log(value);
    generateGet(`/api/oj/search?tag=${value}`).then((res) => {
        if (res.data.status === 0) {
            console.log(res.data.data);
            searchLoading.value = false;
            promblems.value = res.data.data.data.results;
            console.log("problems is ", promblems.value);
            // filter existed problems
            console.log("existedProblems is", props.existedProblems);
            promblems.value = promblems.value.filter((item: any) => !props.existedProblems.some((existed: any) => existed._id == item._id));
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
        description: problem.description,
        color: problem.tags[0] === "branch" ? "blue" :
         problem.tags[0] === "Loop" ? "green" :
         problem.tags[0] === "String" ? "orange" :"red",
    });
    console.log("problem.tags[0] is", problem.tags[0]);
    console.log("select is", selectedProblems.value);
}

const openSecondDrawer = (problem:any) => {
    isDrawerOpen.value = true;
    curProblemId.value = problem._id;
};

const closeSecondDrawer = () => {
  isDrawerOpen.value = false;
};

const wrapAddRoom = computed(() => {
  return isDrawerOpen.value ? 'modalMask' : '';
});

const loading = ref(false);

const postProblems = () => {
    const addedProblems = selectedProblems.value.map((item) => item._id);

    loading.value = true;
    generatePost(`/api/game/gameaddbatch?id=${props.gameId}`, addedProblems ).then((res) => {
                    if (res.data.status === 0) {
                        console.log(res.data.data);
                        loading.value = false;
                        message.success('添加成功');
                        modelValue.value = false;
                        isDrawerOpen.value = false;
                        console.log('selectedProblems.value', selectedProblems.value);
                        emit('update:existedProblems', selectedProblems.value.concat(props.existedProblems));
                        emit('update')
                        selectedProblems.value = [];
                        showProblems.value = [];
                        selectValue.value = '';
                        
                            
                    } else {
                        loading.value = false;
                        message.error(res.data.msg);
                    }
                }).catch((err) => {
                    message.error('网络错误');
                });
}




</script>

<style scoped>

</style>