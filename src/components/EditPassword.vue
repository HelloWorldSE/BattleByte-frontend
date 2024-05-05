<template>
    <Modal v-model:open="modalVisible" title="修改密码" @ok="handleOk" @cancel="cancel">
        <template #footer>
            <Button key="back" @click="cancel">取消</Button>
            <Button key="submit" type="primary" @click="handleOk">确定</Button>
        </template>
        <Form :model="formState" layout="vertical">
            <FormItem label="密码" :rules="[{validator: passWordCheck, trigger: 'blur'}]">
                <InputPassword v-model:value="formState.password" type="password" />
            </FormItem>
            <FormItem label="确认新密码" :rules="[{validator: againPasswordCheck, trigger: 'blur'}]">
                <InputPassword v-model:value="formState.againPassword" type="password" />
            </FormItem>
        </Form>
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
    const formState = reactive({
        password: '',
        againPassword: ''
    })

    const passWordCheck = async (_rule: Rule, value: string) => {
        if (!value) {
            return Promise.reject('请输入密码');
        }
        if (value.length < 6) {
            return Promise.reject('密码长度不能小于6位');
        }
        return Promise.resolve();
    }

    const againPasswordCheck = async (_rule: Rule, value: string) => {
        if (!value) {
            return Promise.reject('请再次输入密码');
        }
        if (value !== formState.password) {
            return Promise.reject('两次输入的密码不一致');
        }
        return Promise.resolve();
    }

    const emit = defineEmits(['update:modelValue']);

    const modalVisible = computed({
        get: () => props.modelValue,
        set: v => emit('update:modelValue', v),
    });

    const handleOk = () => {
        loading.value = true;
        const password = formState.password;
        generatePost('api/user/update', {id:props.userId, password: password}).then((res) => {
            if (res.data.status === 0) {
                message.success('修改成功');
                emit('update:modelValue', false);
            } else {
                message.error('修改失败');
            }
            loading.value = false;
        }).catch(() => {
            message.error('修改失败');
            loading.value = false;
        })
    }

    const cancel = () => {
        emit('update:modelValue', false);
    }



</script>