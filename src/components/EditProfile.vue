<template>
    <div>
      <Button type="primary" @click="showModal">Open Modal with customized footer</Button>
      <Modal v-model:open="open" title="修改个人信息" @ok="handleOk" centered>
        <template #footer>
          <Button key="back" @click="handleCancel">取消</Button>
          <Button key="submit" type="primary" :loading="loading" @click="handleOk">修改信息</Button>
        </template>
        <Form ref="formRef" :model="formState" layout="vertical">
            <FormItem label="用户名" :rules="[{validator: userNameCheck, trigger: 'blur'}]">
              <Input v-model:value="formState.userName" placeholder="Username"></Input>
              
            </FormItem>
            <FormItem label="邮箱" :rules="[{validator: emailCheck, trigger: 'blur'}]">
                <Input v-model:value="formState.email" placeholder="Email"></Input>
            </FormItem>
            <FormItem 
            label="头像">
            <Upload
            v-model:file-list="fileList"
            action="#"
            list-type="picture-card"
            @preview="handlePreview"
            :customRequest="customUpload"
            >
            <div v-if="fileList.length < 2">
                <PlusOutlined />
                <div style="margin-top: 8px">Upload</div>
            </div>
            </Upload>
            <Modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="previewCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
            </Modal>
            </FormItem>
        </Form>
      </Modal>
    </div>
  </template>
<script lang="ts" setup>
    import { ref, reactive } from 'vue';
    import { Modal, Button, Form, FormItem, Input, Upload, UploadProps, UploadChangeParam, message, FormInstance } from 'ant-design-vue';
    import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
    import { generateGet, generatePost, generatePostAvatar } from '@/utils/protocol';
    import type {Rule} from "ant-design-vue/es/form";

    const loading = ref<boolean>(false);
    const open = ref<boolean>(false);
    const props = {
        userId:{
            type: Number,
            required: true
        }
    }

    // 定义表单域
    const formState = reactive({
        userName: '',
        email: '',
        avatar: ''
    })

    const showModal = () => {
        open.value = true;
    };

    let avatarAddr = '';
    const formRef = ref<FormInstance>();
    
    const handleOk = () => {
        loading.value = true;
        const userName = formState.userName;
        const email = formState.email;
        const avatar = formState.avatar;
        generatePost('user/update', {id:props.userId, userName:userName, userEmail:email, avatar});

        formRef.value.validate((valid: boolean) => {
        if (valid) {
            setTimeout(() => {
            loading.value = false;
            open.value = false;
            }, 2000);
        } else {
            loading.value = false;
            message.error('Fail');
            return;
        }
        });
        // setTimeout(() => {
        // loading.value = false;
        // open.value = false;
        // }, 2000);
    };
    
    const userNameCheck = async (_rule: Rule, value: string) => {
        if (value && value.length <= 2) {
            return Promise.reject('用户名长度不能小于两个字符')
        } else {
            return Promise.resolve()
        }
    }

    const emailCheck = async (_rule: Rule, value: string) => {
        if (value && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(value)) {
            return Promise.reject('请输入有效的邮箱地址')
        } else {
            return Promise.resolve()
        }
    }

    const handleCancel = () => {
        open.value = false;
    };

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
    });
    }
    const previewVisible = ref(false);
    const previewImage = ref('');
    const previewTitle = ref('');
    const fileList = ref([]);
    const previewCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
    };

    const handlePreview = async file => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
    previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
    };

    const handleUpload = async file => {
        const formData = new FormData();
        formData.append('file', file.file);
        const res = await generatePost('user/upload', formData);
        formState.avatar = res.data.data;
    };

    const customUpload = async fileInfo => {
            const { file } = fileInfo;
            const formData = new FormData();
            try {
                const url = await getBase64(file); // 获取base64地址
                formData.append('file', file);
                const res = await generatePostAvatar('api/upload/avatar', formData);
                formState.avatar = res.data.data;
            } catch (err) {
                message.info(err);
            }
        }

   


    
    
</script>