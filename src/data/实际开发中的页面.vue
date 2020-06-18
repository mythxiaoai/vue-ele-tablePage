<template>
  <div class="typhoon-plan-wrap update-form-wrap" v-if="show">
    <el-form
      :model="form"
      :inline="true"
      ref="form"
      label-width="85px"
      class="update-form clearfix"
      :rules="rule"
    >
      <el-col :span="8">
        <el-form-item label="设备类别" prop="useTypeId">
          <el-select v-model="form.useTypeId" @change="changeUseTypeId">
            <el-option
              v-for="(item,index) of select.useTypeId"
              :key="index"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="设备名称" prop="bigTypeId">
          <el-select v-model="form.bigTypeId">
            <el-option
              v-for="(item,index) of select.bigTypeId"
              :key="index"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="选择设备" prop="equipName">
          <div>
            <el-input v-model="form.equipName"></el-input>
          </div>
          <div>
            <i title="选择设备" @click="openModel('equipId')" class="el-icon-circle-plus-outline"></i>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="选择模板" prop="modelName">
          <div>
            <el-input v-model="form.modelName"></el-input>
          </div>
          <div>
            <i title="选择模板" @click="openModel('modelId')" class="el-icon-circle-plus-outline"></i>
          </div>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="计划名称" prop="planName">
          <el-input v-model="form.planName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="执行时间" prop="performTime">
          <el-date-picker
            v-model="form.performTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
            value-format="yyyy-MM-dd HH:hh:mm"
          ></el-date-picker>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="执行人" prop="performUserName">
          <div>
            <el-input v-model="form.performUserName" disabled></el-input>
          </div>
          <div>
            <i title="执行人" @click="openModel('performUserId')" class="el-icon-circle-plus-outline"></i>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="验收人" prop="acceptUserName">
          <div>
            <el-input v-model="form.acceptUserName" disabled></el-input>
          </div>
          <div>
            <i title="执行验收人" @click="openModel('acceptUserId')" class="el-icon-circle-plus-outline"></i>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-col>
    </el-form>

    <div class="standard-title">
      <span class="txt">防台标准</span>
      <el-button class="fr" @click="openModel('standardIdList')">
        添加
        <i class="el-icon-plus el-icon--right"></i>
      </el-button>
    </div>
    <el-table :data="table.data" size="mini" height="calc(100vh - 300px)" border>
      <el-table-column
        v-for="item of table.column"
        :prop="item.prop"
        :label="item.label"
        :key="item.prop"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="delSelected(scope)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row>
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-row>

    <x-dialog :title="dialogTable.title" :show.sync="dialogTable.show" @sure="sure">
      <x-table
        ref="xtable"
        v-bind="dialogTable"
        @current-change="currentChange"
        @row-dblclick="dblclick"
        v-if="selectMark!='standardIdList'"
      ></x-table>

      <x-table ref="xtable2" v-bind="dialogTable" @selection-change="currentChange" v-else>
        <template #before>
          <el-table-column type="selection" width="55"></el-table-column>
        </template>
      </x-table>
    </x-dialog>
  </div>
</template>

<script>
import api from "@/api/modules/typhoonAction";
import XDialog from "@/components/XDialog";
import XTable from "@/components/XTable";
import dialogTableConfig from "./dialogTableConfig";
export default {
  components: { XDialog, XTable },
  name: "addOrUpdate",
  props: {
    show: Boolean,
    id: [String, Number],
    title: String
  },
  async created() {
   
  },
  data() {
    return {
      dialogTable: {},
      selected: null,
      selectMark: "",
      form: {
        id: "",
        useTypeId: "", //设备类别id
        bigTypeId: "", //设备名称id
        equipId: "", //设备id
        equipName: "", //设备名字  显示用
        modelId: "", //模板id
        modelName: "", //模板名字  显示用
        planName: "", //计划名称
        performTime: "", //执行要求时间
        performUserId: "", //执行人id
        performUserName: "", //执行人
        acceptUserId: "", //执行验收人id
        acceptUserName: "", //验收人
        remark: "", //备注
        standardIdList: "" //计划
      },
      rule: {
        useTypeId: [
          { required: true, message: "请选择设备类别", trigger: "change" }
        ],
        bigTypeId: [
          { required: true, message: "请选择设备名称", trigger: "change" }
        ],
        equipName: [
          { required: true, message: "请选择关联设备", trigger: "change" }
        ],
        modelName: [
          { required: true, message: "请选择模板名字", trigger: "change" }
        ],
        planName: [
          { required: true, message: "请输入计划名称", trigger: "blur" },
          { max: 30, message: "长度不超过30个字符", trigger: "blur" }
        ],
        performTime: [
          {
            required: true,
            message: "请输入日期",
            trigger: "change",
            validator: (rule, value, callback) => {
              if (!value.length || !value[0]) {
                callback(new Error("请输入日期"));
              } else {
                callback();
              }
            }
          }
        ],
        performUserName: [
          { required: true, message: "请选择负责人", trigger: "change" }
        ],
        acceptUserName: [
          { required: true, message: "请选择验收人员", trigger: "change" }
        ],
        remark: [{ max: 50, message: "长度不超过50个字符", trigger: "blur" }]
      },
      select: {
        useTypeId: [],
        bigTypeId: []
      },
      table: {
        column: [
          { prop: "useTypeName", label: "设备类别" },
          { prop: "bigTypeName", label: "设备名称" },
          { prop: "partName", label: "设备部位" },
          { prop: "partUnitName", label: "设备部件" },
          { prop: "drillContent", label: "防台内容" },
          { prop: "drillStandard", label: "评判标准" },
          { prop: "drillMeasure", label: "处理措施" },
          { prop: "drillMethod", label: "防台方法" },
          { prop: "remark", label: "备注" }
        ],
        data: []
      },
      page: {
        pageSize: 50,
        current: 1,
        total: 0
      }
    };
  },
  methods: {
    //单选
    currentChange(row) {
      this.selected = row;
    },
    //双击事件
    dblclick(row) {
      this.selected = row;
      this.sure();
    },
    delSelected(scope) {
      let index = scope.$index;
      this.table.data.splice(index, 1);
    },
    async back(id) {
      id  = id || this.id;
      //回显数据
      let res = (await api.plan.find({ id })).data;
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = res[key];
        }
      }
      this.table.data = res.equipTyphoonCheckStandardRespVoList;
    },
    async findModel(id) {
      const res = (await api.template.find({ id, noLodaing: true })).data;
      return res.equipTyphoonCheckStandardRespVoList
        ? res.equipTyphoonCheckStandardRespVoList
        : [];
    },
    async sure() {
      //equipId modelId performUserId acceptUserId standardIdList
      if (!this.selected) {
        this.$message({
          message: "请选择一条记录~",
          type: "warning"
        });
        return;
      }
      if (this.selectMark == "equipId") {
        this.form.equipId = this.selected.id;
        this.form.equipName = `${this.selected.name} (${this.selected.equipCode})`;
      }
      if (this.selectMark == "modelId") {
        this.form.modelId = this.selected.id;
        this.form.modelName = `${this.selected.modelName} (${this.selected.id})`;
        let model = await this.findModel(this.selected.id);
        this.table.data.push(...model);
      }
      if (this.selectMark == "performUserId") {
        this.form.performUserId = this.selected.id;
        this.form.performUserName = this.selected.userName;
      }
      if (this.selectMark == "acceptUserId") {
        this.form.acceptUserId = this.selected.id;
        this.form.acceptUserName = this.selected.userName;
      }
      if (this.selectMark == "standardIdList") {
        if (this.selected.length == 0) {
          this.$message({
            message: "请勾选一条记录~",
            type: "warning"
          });
          return;
        }
        this.table.data.push(...this.selected);
      }
      this.dialogTable.show = false;
      this.selected = null; //复原
    },
    async add() {
      const res = await api.plan.add(this.form);
      if (res.code === "00000000" && res.data) {
        this.cancel();
        this.$emit("refalsh");
        this.$message({ message: "新增成功！", type: "success" });
      }
    },
    async update() {
      const res = await api.plan.update(this.form);
      if (res.code === "00000000" && res.data) {
        this.cancel();
        this.$emit("refalsh");
        this.$message({ message: "修改成功", type: "success" });
      }
    },
    async copy() {
      const res = await api.plan.add(this.form);
      if (res.code === "00000000" && res.data) {
        this.cancel();
        this.$emit("refalsh");
        this.$message({ message: "复制成功", type: "success" });
      }
    },
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.form.standardIdList = this.table.data.map(row => row.id);
          if (this.form.standardIdList.length == 0) {
            this.$message({
              message: "请添加防台标准",
              type: "error"
            });
            return;
          }
          this[this.opts]();
        }
      });
    },
    cancel() {
      //因为异步更新的问题，导致重置不了  这里用延迟解决下，，
      setTimeout(()=>{
        let params = deepClone({}, this.form);
        this.form = fromReset(params);
        //因为设备是数字...所以手动设置   因为fromReset如果是number是恢复到0的
        this.form.useTypeId = ""; //设备类别id
        this.form.bigTypeId = ""; //设备名称id
        this.table.data = [];
      },200)
      this.$emit("update:show", false);
    },
    async openModel(key) {
      if (key == "equipId" || key == "modelId" || key == "standardIdList") {
        if (!(this.form.useTypeId && this.form.bigTypeId)) {
          this.$message({
            message: "请先选择设备类别,设备名称",
            type: "warning"
          });
          return;
        }
      }
      this.selectMark = key;
      //处理  equipId modelId performUserId acceptUserId
      this.dialogTable = dialogTableConfig[key];
      this.dialogTable.show = true;
      //下拉单位和部门选项
      if (key != "standardIdList") {
        this.orgOrdept();
      }

      //equipId 设备
      if (key == "equipId") {
        //列表
        this.dialogTable.getData = async (getParmas, next) => {
          let params = getParmas();
          params.useTypeId = this.form.useTypeId;
          params.bigTypeId = this.form.bigTypeId;
          let { records, total } = (await api.select.equipId(params)).data;
          next(records, total);
        };
      }
      // modelId 模板
      if (key == "modelId") {
        this.dialogTable.getData = async (getParmas, next) => {
          let params = getParmas();
          let { records, total } = (await api.template.list(params)).data;
          next(records, total);
        };
      }

      //performUserId 执行人  acceptUserId 验收人
      if (key == "performUserId") {
        this.dialogTable.getData = async (getParmas, next) => {
          let params = getParmas();
          let { records, total } = (await api.select.user(params)).data;
          next(records, total);
        };
      }
      //acceptUserId 验收人
      if (key == "acceptUserId") {
        this.dialogTable.getData = async (getParmas, next) => {
          let params = getParmas();
          let { records, total } = (await api.select.user(params)).data;
          next(records, total);
        };
      }

      //standardIdList 添加标志
      if (key == "standardIdList") {
        this.dialogTable.getData = async (getParmas, next) => {
          let params = getParmas();
          params.useTypeId = this.form.useTypeId;
          params.bigTypeId = this.form.bigTypeId;
          let { records, total } = (
            await api.template.getTyphoonNorm(params)
          ).data;
          next(records, total);
        };
      }
    },
    async orgOrdept() {
      //单位下拉
      this.dialogTable.formItem[0]["el-option"].data = (
        await api.select.useCompanyId({ noLodaing: true })
      ).data.map(v => {
        v.label = v.abbrName;
        return v;
      });

      //单位下拉事件触发部门
      this.dialogTable.formItem[0].on.change = async v => {
        //把部门下拉变成空串
        //不能直接赋值search 需要调用这个方法  后面优化
        this.$refs.xtable.setSearch("useOrgId", "");
        this.dialogTable.formItem[1]["el-option"].data = (
          await api.select.useOrgId({ useCompanyId: v, noLodaing: true })
        ).data.map(v => {
          v.label = v.abbrName;
          return v;
        });
      };
    },
    async selectUseTypeId(){
       //下拉设备数据加载
      this.select.useTypeId = (
        await api.select.useTypeId({ noLodaing: true })
      ).data.map(v => {
        v.label = v.name;
        return v;
      });
    },
    changeUseTypeId(){
      this.form.bigTypeId = "";
      this.selectBigTypeId();
    },
    async selectBigTypeId(){
      // useTypeId: "", //设备类别id
      //  bigTypeId: "", //设备名称id
      this.select.bigTypeId = (
        await api.select.bigTypeId({ equipmentTypeId: this.form.useTypeId, noLodaing: true })
      ).data.map(v => {
        v.label = v.name;
        return v;
      });
    },
    async init(){
      let opts = this.opts;
      if(opts=="add"){
        this.selectUseTypeId();
      }else if(opts=="update"){
        await this.back();
        this.selectUseTypeId();
        this.selectBigTypeId();
      }else if(opts=="copy"){
        //吧id还原
        await this.back(this.id.slice(1));
        this.form.id = "";
        this.selectUseTypeId();
        this.selectBigTypeId();
      }
    }
  },
  computed: {
    opts() {
      return (!!!this.id)?"add":~this.id.indexOf("@")?"copy":"update";
    }
  },
  watch: {
    show:"init"
  }
};

/**
 * val 参数  是任意类型
 * 作用:form表单清空   所有对象   支持深层！
 */
function fromReset(val) {
  if (typeof val == "string") {
    val = "";
  } else if (typeof val == "object") {
    if (Array.isArray(val)) {
      val = [];
    } else if (val == null) {
      val = null;
    } else {
      for (var key in val) {
        if (val.hasOwnProperty(key)) {
          val[key] = fromReset(val[key]);
        }
      }
    }
  } else if (typeof val == "boolean") {
    val = false;
  } else if (typeof val == "number") {
    val = 0;
  } else {
    val = "";
  }
  return val;
}
/**
 * 克隆
 */
function deepClone(target, datajson) {
  var args = Array.prototype.slice.call(arguments);
  if (args.length == 1) return args[0];
  var i = 1;
  while (args[i]) {
    //这里做为判断条件 取不到就返回false
    var temp = args[i];
    for (var j in temp) {
      if (temp.hasOwnProperty(j)) {
        if (typeof temp[j] == "object") {
          target[j] = deepClone({}, temp[j]);
        } else {
          target[j] = temp[j];
        }
      }
    }
    i++;
  }
  return target;
}
</script>

<style rel="stylesheet/scss" lang="scss">
.typhoon-plan-wrap {
  height: 99.9vh;
  padding: 10px;
  background-color: #fff;
  .qry-form-wrap {
    .el-form {
      .el-input,
      .el-select {
        width: 180px;
      }
    }
    .qry-btn-wrap {
      button:first-child {
        margin-left: 20px;
      }
    }
  }
  .el-table {
    font-size: 12px;
    color: #666;
  }
  .el-pagination {
    margin-top: 8px;
  }
  .el-button--primary {
    font-size: 12px;
  }
  .standard-title {
    margin-bottom: 8px;
    .txt {
      display: inline-block;
      padding-top: 8px;
    }
    .el-button {
      margin-top: -5px;
    }
  }
  .el-form {
    .el-form-item__label {
      font-size: 14px;
      font-weight: normal;
      color: #606266;
    }
    .el-icon-circle-plus-outline {
      position: absolute;
      right: 0;
      top: -35px;
      display: inline-block;
      font-size: 18px;
      padding: 8px 5px;
      cursor: pointer;
      color: #5cb6ff;
      &:hover {
        color: #6dc7ff;
      }
    }
  }
  .el-dialog {
    .el-table tr:nth-child(even) {
      background-color: #fff !important;
    }
  }
  .update-form-wrap {
    .update-form {
      .el-form-item {
        width: 100%;
      }
      .el-form-item .el-form-item__content {
        width: calc(100% - 90px);
        & > div {
          position: relative;
          width: 100%;
        }
      }
      .el-form-item.two-item-length {
        .el-form-item__content {
          width: calc(100% - 90px);
        }
      }
      .el-input__inner {
        width: 100%;
      }
    }
    .el-row {
      margin-top: 10px;
      text-align: center;
    }
    .el-col {
      height: 50px;
    }
  }
  /*    @media screen and (max-width: 1080px) {
      .qry-plan-table {
        height: calc(100vh - 210px)
      }
    }*/
}
</style>
