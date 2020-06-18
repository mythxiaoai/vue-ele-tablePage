const MODEL_TYPE_ENUM = {
  电气: 0,
  机械: 1,
  其它: 2,
  "0": "电气",
  "1": "机械",
  "2": "其它"
};
function formatterModelType(row, column, value) {
  return MODEL_TYPE_ENUM[value];
}

export default {
  equipId: {
    title: "选择防台设备",
    show: false,
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
  },
  modelId: {
    title: "选择模板",
    show: false,
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
        }
      }
    },
    getData: () => {
      return [];
    },
    columns: [
      { prop: "useCompanyName", label: "使用单位" },
      { prop: "useOrgName", label: "使用部门" },
      { prop: "modelName", label: "模板名称" },
      { prop: "bigTypeName", label: "设备名称" },
      { prop: "modelType", label: "模板类型", formatter: formatterModelType },
      { prop: "remark", label: "备注" }
    ]
  },
  performUserId: {
    title: "选择执行人",
    show: false,
    search: {
      useCompanyId: "",
      useOrgId: "",
      roleName: "",
      userName: ""
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
      { component: "el-input", label: "用户角色", prop: "roleName" },
      { component: "el-input", label: "用户名", prop: "userName" }
    ],
    config: {
      "el-table": {
        bind: {
          size: "mini",
          "highlight-current-row": true
        }
      }
    },
    getData: () => {
      return [];
    },
    columns: [
      { prop: "useCompanyName", label: "使用单位" },
      { prop: "orgName", label: "所属部门" },
      { prop: "userCode", label: "用户号" },
      { prop: "userName", label: "用户名" },
      { prop: "roleName", label: "角色" }
    ]
  },
  acceptUserId: {
    title: "选择验收人",
    show: false,
    search: {
      useCompanyId: "",
      useOrgId: "",
      roleName: "",
      userName: ""
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
      { component: "el-input", label: "用户角色", prop: "roleName" },
      { component: "el-input", label: "用户名", prop: "userName" }
    ],
    config: {
      "el-table": {
        bind: {
          size: "mini",
          "highlight-current-row": true
        }
      }
    },
    getData: () => {
      return [];
    },
    columns: [
      { prop: "useCompanyName", label: "使用单位" },
      { prop: "orgName", label: "所属部门" },
      { prop: "userCode", label: "用户号" },
      { prop: "userName", label: "用户名" },
      { prop: "roleName", label: "角色" }
    ]
  },
  standardIdList: {
    title: "选择防台标准",
    show: false,
    config: {
      "el-table": {
        bind: {
          size: "mini"
        }
      }
    },
    getData: () => {
      return [];
    },
    columns: [
      { prop: "useTypeName", label: "设备类别" },
      { prop: "bigTypeName", label: "设备名称" },
      { prop: "partName", label: "设备部位" },
      { prop: "partUnitName", label: "设备部件" },
      { prop: "drillContent", label: "防台内容" },
      { prop: "drillStandard", label: "评判标准" },
      { prop: "drillMeasure", label: "处理措施" },
      { prop: "drillMethod", label: "防台方法" },
      { prop: "remark", label: "备注" }
    ]
  }
};
