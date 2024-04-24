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
            "code": 200,
            "token": "user1",
            "userId": 1,
            "userName": "user1",
            "userEmail": "user1@buaa.edu.cn",
            "userAvatar": "@/assets/1.jpg",
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
        url: '/api/schedule/query',
        method: 'GET',
        body: {
            "code": 0,
            "assignments": [
            ]
        }
    },
    {
        url: '/api/task/getTaskInOrder',
        method: 'GET',
        body: {
            "code": 0,
            "tasks": [
                {
                    "name": "任务A",
                    "project": "项目A",
                    "team": "团队A",
                    "task_id": 2,
                    "status": 1,
                    "deadline_time": "2023-12-25T11:59:28Z",
                    "progress": 78
                },
                {
                    "name": "任务B",
                    "project": "项目A",
                    "team": "团队A",
                    "task_id": 3,
                    "status": 0,
                    "deadline_time": "2024-01-25T11:59:28Z",
                    "progress": 0
                },
                {
                    "name": "任务C",
                    "project": "项目C",
                    "team": "团队B",
                    "task_id": 4,
                    "status": 1,
                    "deadline_time": "2024-12-25T11:59:28Z",
                    "progress": 0
                }
            ]
        }
    },
    {
        url: '/api/project/gettasks',
        method: "GET",
        body: {
            "code": 0,
            "tasks": [
                {
                    "task_id": 1,
                    "task_name": "数据库大作业",
                    "task_description": "这个人很懒，什么都没有留下~",
                    "responsible_id": 1,
                    "responsible_name": "田秀兰",
                    "status": 1,
                    "progress": 0.0
                },
                {
                    "task_id": 2,
                    "task_name": "数据库大作业B",
                    "task_description": "这个人很懒，什么都没有留下~",
                    "responsible_id": 1,
                    "responsible_name": "田秀兰",
                    "status": 1,
                    "progress": 0.0
                },
                {
                    "task_id": 3,
                    "task_name": "数据库大作业C",
                    "task_description": "这个人很懒，什么都没有留下~",
                    "responsible_id": 1,
                    "responsible_name": "田秀兰",
                    "status": 0,
                    "progress": 0.0
                }
            ],
            "dependencies": [
                {
                    "former_task_id": [],
                    "latter_task_id": [
                        3
                    ]
                },
                {
                    "former_task_id": [],
                    "latter_task_id": [
                        3
                    ]
                },
                {
                    "former_task_id": [
                        1,
                        2
                    ],
                    "latter_task_id": []
                }
            ]
        }
    },
    {
        url: '/api/project/getAllMember',
        method: 'GET',
        body: {
            "code": 0,
            "memberInfo": [
                {
                    "user_id": 1,
                    "nickname": "田秀兰",
                    "job": 1
                }
            ]
        }
    },
    {
        url: '/api/user/login',
        method: 'POST',
        body: {
            "code": 0,
            "user_id": 1
        }
    },
    {
        url: '/api/user/getinfo',
        method: 'GET',
        body: {
            "username": "snowcoat01",
            "nickname": "下雪大衣",
            "email": "21371190@buaa.edu.cn"
        }
    },
    {
        url: '/api/task/getinfo',
        method: 'GET',
        body: {
            "code": 0,
            "name": "数据库大作业",
            "project_id": 1,
            "description": "这个人很懒，什么都没有留下~",
            "progress": 100.0,
            "creator": "田秀兰",
            "responsible": "田秀兰",
            "checker": [],
            "creation_time": "2023-11-25T09:46:34.101682Z",
            "deadline_time": "2024-10-25T11:59:28Z",
            "reports": []
        }
    },
    {
        url: '/api/task/getmodinfo',
        method: 'GET',
        body: {
            "code": 0,
            "name": "任务D",
            "description": "sed Lorem in proident",
            "responsible_id": 1,
            "checker_id": [
                20,
                11
            ],
            "deadline_time": "2022-05-17 19:57:29",
            "former_task_id": [
                2,
                3
            ]
        }
    },
    {
        url: '/api/notification/getAll/',
        method: 'GET',
        body: {
            "code": 0,
            "notifications": [
                {
                    "message": "您已成为任务“任务A”的负责人。",
                    "time": "2023-11-05T12:00:26Z"
                },
                {
                    "message": "您负责的任务“任务C”已经开始。",
                    "time": "2023-10-31T12:00:26Z"
                },
                {
                    "message": "您检查的任务“任务B”正在等待验收。",
                    "time": "2023-10-29T12:00:26Z"
                }
            ]
        }
    },
    {
        url: '/api/notification/getunread',
        method: 'GET',
        body: {
            "code": 0,
            "count": 1
        }
    },
    {
        url: '/api/project/getinfo',
        method: 'GET',
        body: {
            "code": 0,
            "project_summary": {
                "project_id": "1",
                "project_name": "人类第一个TM项目",
                "project_description": "这是人类的第一个TM项目这是人类的第一个TM项目这是人类的第一个TM项目这是人类的第一个TM项目这是人类的第一个TM项目这是人类的第一个TM项目这是人类的第一个TM项目这是人类的第一个TM项目",
                "team_id": 3,
                "creator_id": 2,
                "creator_name": "snowcoat",
                "commit_times": 0,
                "member_count": 2,
                "creation_date": "2023-12-03"
            }
        }
    },
    {
        url: '/api/team/getSummaryInfo',
        method: 'GET',
        body: {
            "team_name": "对对队",
            "creator_id": 1,
            "creator_name": "user001",
            "member_count": 2,
            "project_count": 0,
            "team_id": "1"
        }
    },
    {
        url: '/api/schedule/create',
        method: 'POST',
        body: {
            "code": 0,
            "assignment_id": 2
        }
    },
    {
        url: '/api/schedule/delete',
        method: 'POST',
        body: {
            "code": 0
        }
    },
    {
        url: '/api/user/get-info/',
        method: 'GET',
        body: {
            "abc": 0,
            "code": "string"
        }
    }
])