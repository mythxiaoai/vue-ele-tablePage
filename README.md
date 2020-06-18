# tablepage

> 一个基于elementUI的表格布局组件

> 解决常规表格布局的页面封装，包括查询，表格，分页三个组件的封装，提供丰富的钩子，提升效率，目前查询选项只做了el-input和el-select的处理，后期需要自行拓展

## 属性
- search Object  查询选项  不需要写分页对象的key  对象的三个key(pageSize,current,total)这里在插件里面写死了，外部不用关心 会进行默认的混入操作  要与formType的数量一致，节省时间就没做props校验
- formItem Array[Object{component,label,prop,"el-option":{label,value,data:[]}},on]
   - component 组件名称
   - label     查询前面的显示
   - prop      关联的key是什么  与search对应
   - "el-option"   非必填  如果是el-select需要有
       - label:下拉显示的key
       - value:下拉的值的key
       - data:[]下拉的数据
   - on      非常的关键 事件绑定   如 on:{change:()=>{}} 可以在当前组件写，可以获取当前实例
 - config：配置组件数据和事件   key为组件名称
 - isPage:是否要分页组件
 - getData:一个异步函数需要运行两个参数的getparms和next的函数  Fn(params,next)
     - params获取当前参数
     - next是把取到的data值和总条数传递过来的回调函数  next(data,total)   保证业务与数据请求方法不耦合
 - columns：Array 显示字段  任何属性都可生效

## 方法
- setSearch:设置search的值  业务经常用在下拉改变另外查询的值

```
this.$refs.xtable.setSearch("useOrgId", "");
```

## slot
- \<solot></slot>默认slot是表格列字段
- \<solot name="before"></slot> 表格前列  常用多选的情况
- \<solot name="after"></slot>  表格后列  常用操作列的情况
- \<slot name="search"></slot>  搜索栏
- \<slot name="toolbar"></slot> 表格工具栏


*参数事例:*
```
{
    search: {
      useCompanyId: "",
      useOrgId: "",
      keywords: ""
    },
    formItem: [
      {
        component: "el-select",
        label: "单位",
        prop: "useCompanyId",
        "el-option": { label: "label", value: "id", data: [] },
        on: {}
      },
      {
        component: "el-select",
        label: "部门",
        prop: "useOrgId",
        "el-option": { label: "label", value: "id", data: [] }
      },
      { component: "el-input", label: "关键词", prop: "keywords" }
    ],
    config: {
      "el-table": {
        bind: {
          size: "mini",
          "highlight-current-row": true
        },
        on: {
          // "current-change"(rows) {
          //   console.log(11111, rows);
          //   console.log(this); 因为this的问题所以用其他方式处理事件
          // }
        }
      }
    },
    getData: () => {
      return [];
    },
    columns: [
      { prop: "useCompanyName", label: "使用单位" },
      { prop: "useOrgName", label: "使用部门" },
      { prop: "useTypeName", label: "设备类别" },
      { prop: "name", label: "设备名称" },
      { prop: "equipCode", label: "单位自编号" },
      { prop: "particularRegistrationCode", label: "设备编号" }
    ]
  }
```

### 后期可拓展
1. 目的是做一个界面配置生成器的中台通用性组件，解决搬砖问题

### 现阶段的问题
1. 查询表单部分配置过于烦琐，只写了el-input和el-select两个表单元素的支持
2. search的关键字无法同步，只能通过setSearch方法同步
3. 配置中的formItem中的组件选项的on事件只能通过赋值的方式才能拿到this,也无法通过bind绑定this,XTable中v-on会让this丢失变成null


不过上述问题 稍微注意下使用上是没有问题的，安装后运行可以看到demo


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
