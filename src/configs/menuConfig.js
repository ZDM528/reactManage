
const menuConfig=[
    {
        title:'首页',
        key:'/home',
        iconMenu:'<UserOutlined />'
    }, {
        title: '商品',
        key:'/products',
        iconMenu:'<MailOutlined/>',
        children:[
            {
                title: '品类管理',
                key: '/category',
                iconMenu:'<SnippetsOutlined/>'
            },
            {
                title:'商品管理',
                key:'/product',
                iconMenu:'<SnippetsOutlined/>'
            }
        ]
    }, {
        title:'用户管理',
        key:'/user',
        iconMenu:'<SnippetsOutlined/>'
    }, {
        title:'角色管理',
        key:'/role',
        iconMenu:'<SnippetsOutlined/>'
    }, {
        title:'图形图表',
        key:'/charts',
        iconMenu:'<SnippetsOutlined/>',
        children:[
            {
                title:'柱形图',
                key:'/bar',
                iconMenu:'<SnippetsOutlined/>'
            },{
                title:'折线图',
                key:'/line',
                iconMenu:'<SnippetsOutlined/>'
            },{
                title:'饼图',
                key:'/pie',
                iconMenu:'<SnippetsOutlined/>'
            }
        ]
    }
]

export default menuConfig
