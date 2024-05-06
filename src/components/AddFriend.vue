<template>
    <Modal v-model:open="modalVisible" title="搜索用户" @ok="handleOk" @cancel="cancel">
        <template #footer>
            <Button key="back" @click="cancel">关闭</Button>
        </template>
    
    </Modal>
</template>

<script lang="ts" setup>
import { Modal, Button, Form, FormItem, Input, Upload, message, InputPassword, type FormInstance } from 'ant-design-vue';
import { ref, reactive } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';

import { defineProps, defineEmits, computed } from 'vue';
import { generatePost } from '@/utils/protocol';

const props = defineProps({ 
        userId: {
            type: String,
            required: true,
        },
        modelValue: {
            type: Boolean,
        },
    })

const loading = ref<boolean>(false);

const emit = defineEmits(['update:modelValue']);

const modalVisible = computed({
        get: () => props.modelValue,
        set: v => emit('update:modelValue', v),
    });

const handleOk = () => {
    loading.value = true;
    // do something
    emit('update:modelValue', false);
}

const cancel = () => {
        emit('update:modelValue', false);
    }

</script>