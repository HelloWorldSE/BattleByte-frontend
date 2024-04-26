import { defineMock } from 'vite-plugin-mock-dev-server'
/*
                {
                    "assignment_id": 2,
                    "time_zone": "08:00~10:00",
                    "task_id": 2,
                    "title": "任务A",
                    "comment": "完成日程表控件",
                    "date": "2023-12-05"
                },
                {
                    "assignment_id": 3,
                    "time_zone": "10:00~12:00",
                    "task_id": 2,
                    "title": "任务A",
                    "comment": "修复bug",
                    "date": "2023-12-05"
                },
                {
                    "assignment_id": 4,
                    "time_zone": "18:00~20:00",
                    "task_id": 2,
                    "title": "任务A",
                    "comment": "修复bug",
                    "date": "2023-12-05"
                },
                {
                    "assignment_id": 5,
                    "time_zone": "20:00~22:00",
                    "task_id": 2,
                    "title": "任务A",
                    "comment": "修复bug",
                    "date": "2023-12-05"
                },
                {
                    "assignment_id": 6,
                    "time_zone": "20:00~22:00",
                    "task_id": 2,
                    "title": "任务A",
                    "comment": "修复bug",
                    "date": "2023-12-06"
                },
                {
                    "assignment_id": 7,
                    "time_zone": "12:00~14:00",
                    "task_id": 2,
                    "title": "任务A",
                    "comment": "修复bug",
                    "date": "2023-12-07"
                },
                {
                    "assignment_id": 8,
                    "time_zone": "10:00~12:00",
                    "task_id": 2,
                    "title": "任务A",
                    "comment": "修复bug",
                    "date": "2023-12-06"
                },
                {
                    "assignment_id": 9,
                    "time_zone": "14:00~16:00",
                    "task_id": 3,
                    "title": "任务B",
                    "comment": "完成函数符号表",
                    "date": "2023-12-06"
                },
                {
                    "assignment_id": 10,
                    "time_zone": "16:00~18:00",
                    "task_id": 3,
                    "title": "任务B",
                    "comment": "修复bug",
                    "date": "2023-12-06"
                }*/
export default defineMock([
    {
        url: '/api/auth/login',
        method: 'POST',
        body: {
            "status": 0,
            "msg": "",
            "data": {
                "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTQzOTM5MTQsInVzZXJJZCI6MTB9.ujdlbQWB0rEG6uyDFZRi0zaAXjXP0AzcJHhRRFR7upo",
                "role": "user"
            }
        }
    },
    
    {
        url: '/api/user/profile',
        method: 'GET',
        body: {
            "code": 200,
            "userId": 1,
            "username": "user1",
            "email": "user1@buaa.edu.cn",
            "avatar": "https://pravatar.cc/300",
        }
    },
    {
        url: '/api/user/friend',
        method: 'GET',
        body: {
            "code": 200,
            "friends": [
                {"userId": 2, "userName": "user2"},
                {"userId": 3, "userName": "user3"},
                {"userId": 4, "userName": "user4"},
            ]
        }
    },
    {
        url: '/api/auth/register',
        method: 'POST',
        body: {
            status: 0,
            msg: "",
            data: null
        }
    }
])