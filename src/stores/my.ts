import { getUserId } from "@/utils/auth";
import { generateGet } from "@/utils/protocol";
import { defineStore } from "pinia";
import { watch, ref } from "vue";

export const useMyProfile = defineStore('my', () => {
    const userId = ref<string>(getUserId())
    
    const profile = ref<{
        userName: string,
        email: string,
        avatar: string
    }>({
        userName: '未登录',
        email: '',
        avatar: ''
    })

    watch(userId, async (val) => {
        if (val == '') {
            profile.value = {
                userName: '未登录',
                email: '',
                avatar: ''
            }
            return
        }

        profile.value = 
        await generateGet("api/user/profile", { id: val }).then((res) => {
            if (res.data.status === 0) {
                return {
                    userName: res.data.data.userName,
                    email: res.data.data.userEmail,
                    avatar: '/avatar/' + res.data.data.avatar
                }
            } else {
                console.log(res);
            }
        }) ?? {
            userName: '未登录',
            email: '',
            avatar: ''
        }
    }, {
        immediate: true
    })

    return {
        userId,
        profile
    }
})