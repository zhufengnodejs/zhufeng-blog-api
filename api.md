
# 珠峰博客接口文档


## API 目录

- 登录
    - [/user/signin 登录](#signin-登录)
    - [/user/signout 登出](#signout-登出)
    - [/user/singup 注册](#singup-注册)

- 主页列表
    - [article/add 增加博客](#articleadd-增加博客)
    - [article/list 博客列表](#articlelist-博客列表)
    - [article/delete 删除](#articledelete-删除博客)
    - [article/edit 编辑博客](#articleedit-编辑博客)
    - [article/discuss 评论](#articlediscuss-评论博客)

### POST /user/singup 注册

#### 请求参数
放在请求体里
```json
{
   "username":"zfpx", //用户名
   "password":"123456", //密码
   "email":"zfpx@qq.com" //邮箱
}
```

#### 响应
```json
{
    "result": {
        "code":0,//成功，其他数字则为不成功
        "message":"success"
    }
}
```


### POST /user/signin 登录

#### 请求参数
放在请求体里
```json
{
   "username":"zfpx", //用户名
   "password":"123456", //密码
}
```

#### 响应
```json
{
    "code":0,//成功，其他数字则为不成功
    "message":"success"
}
```

### GET /user/signout 登出

#### 请求参数 无

#### 响应

```json
{
    "code":0,//成功，其他数字则为不成功
    "message":"success"
}
```

### POST article/add 增加博客

#### 请求参数
```json
{
   "title":"标题1",
   "content":"内容1"
}
```

#### 响应
```json
{
    "code":0,//成功，其他数字则为不成功
    "message":"success"
}
```

### GET article/list 博客列表

#### 请求参数，放在URL地址中的查询字符串里
- "pageNum":1,  //显示当前显示的页
- "pageSize":5,  //显示每页条数是5
- "keyword":"a"  //关键字

```json
pageNum=1&pageSize=5&keyword=a
```

#### 响应
```json
{
    "code": 0,
    "data": {
        "articles": [
                        {
                "pv": 0,
                "comments": [
                    {
                        "createAt": "2018-04-30T14:00:31.417Z",
                        "_id": "5ae7217f176d5a17507d6ae9",
                        "content": "评论内容1",
                        "user": "5ae70c24a8003f0cdcfc4ebc"
                    },
                    {
                        "createAt": "2018-04-30T14:06:09.560Z",
                        "_id": "5ae722d18463811c606f4643",
                        "content": "评论内容2",
                        "user": "5ae70c24a8003f0cdcfc4ebc"
                    }
                ],
                "createAt": "2018-04-30T13:54:31.198Z",
                "_id": "5ae720178633281b481757fc",
                "title": "标题2",
                "content": "内容2",
                "user": "5ae70c24a8003f0cdcfc4ebc",
                "__v": 0
            },
        ],//文章列表
        "pageNum": 1,//当前页码
        "pageSize": 5,//每页条数
        "total": 9,//总条数
        "pageCount": 2//总页数
    }
}
```

### GET article/delete/:id 删除文章

#### 请求参数 路径参数
- id:1, 文章的ID

路径参数
#### 响应
```json
{
    "code":0,
    "message":"success"
}
```


### POST article/edit/:id 编辑文章
- id 博客的ID 此参数放在路径里

#### 请求参数
此参数放在请求体里
```json
{
    "title":"xxx",   //该博客的新标题
    "content":"xxx", // 该博客的新内容
}
```

#### 响应
```json
{
    "result": {
        "code":0,//成功，其他数字则为不成功
        "message":"success" // 成功为success不成功，显示不成功原因
    }
}
```

### POST article/discuss/:id 文章评论
- id 要评论的文章ID，放在路径参数里

#### 请求参数
```json
{
   "content":"xxx", // 评论内容
}
```

#### 响应
```json
{
    "result": {
        "code":0,//成功，其他数字则为不成功
        "message":"success" // 成功为success不成功，显示不成功原因
    }
}
```
