<template>
    <Drawer
        v-model:open="modelValue"
        title="好友列表"
        placement="left"
        width="400"
        :closable="false"
        :maskClosable="false"
        :destroyOnClose="true"
        @close=closeDrawer
    >
        <List>
            <ListItem>好友1</ListItem>
            <ListItem>好友2</ListItem>
            <ListItem>好友3</ListItem>
        </List>
    </Drawer>
    
</template>

<script lang="ts" setup>
import { ref, reactive, defineProps, defineEmits, computed } from 'vue';
import { Modal, Button, Form, FormItem, Input, Upload, message, Drawer, List, ListItem, type FormInstance } from 'ant-design-vue';

const props = defineProps({
    userId: {
        type: String,
        required: true,
    },
    modelValue: {
        type: Boolean,
    },
})

const emit = defineEmits(['update:modelValue']);

const closeDrawer = () => {
    emit('update:modelValue', false);
};

const modelValue = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v),
});


</script>

<style scoped>
</style>