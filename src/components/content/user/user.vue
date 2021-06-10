<template>
  <div class="user">
    <!--    头部nav-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--    中间卡片内容-->
    <el-card class="box-card">
      <!--      头部搜索-->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="userQuery.query"
            clearable>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="queryBtnClick"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button
            type="primary"
            @click="addUserClick">添加用户
          </el-button>
        </el-col>
      </el-row>
      <!--      中间表格区域-->
      <el-table
        :data="userList"
        style="width: 100%"
        border
        max-height="220">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="mg_state"
          label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userTypeChange(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="230px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="editUserItem(scope.row)"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="userDel(scope.row.id)"></el-button>
            <el-button
              type="warning"
              icon="el-icon-s-tools"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--        :current-page="currentPage4"-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1, 5, 10]"
        :page-size="pagenum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

<!--      添加用户-->
      <el-dialog
        title="添加用户"
        :visible.sync="dialogVisibleAddUser"
        width="60%"
        @close="closeUser">
        <el-form
          :model="addForm"
          :rules="rules"
          ref="ruleFormUser"
          label-width="100px"
          class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleAddUser = false">取 消</el-button>
          <el-button type="primary" @click="userAddBtn">确 定</el-button>
        </span>
      </el-dialog>

<!--      修改用户-->
      <el-dialog
        title="修改用户"
        :visible.sync="dialogVisibleEditUser"
        width="60%">
        <el-form
          :model="EditForm"
          :rules="rules"
          ref="ruleFormUserEdit"
          label-width="100px"
          class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="EditForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="EditForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="EditForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleEditUser = false">取 消</el-button>
          <el-button type="primary" @click="userEditBtn">确 定</el-button>
        </span>
      </el-dialog>


    </el-card>
  </div>
</template>

<script>
import {
  userList,
  userEditType,
  delUser,
  userAdd,
  userEdit,
  getUserIdList
} from '@/network/home'

export default {
  name: 'user',
  data () {
    const checkPassWord = (rule, value, callback) => {
      const rep = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
      if (rep.test(value)) {
        callback()
      } else {
        callback(new Error('密码不符合规则！'))
      }
    }
    const checkEmail = (rule, value, callback) => {
      const rep = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (rep.test(value)) {
        callback()
      } else {
        callback(new Error('邮箱不符合规则！'))
      }
    }
    const checkMobile = (rule, value, callback) => {
      const rep = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/
      if (rep.test(value)) {
        callback()
      } else {
        callback(new Error('手机号不符合规则！'))
      }
    }
    return {
      // 用户列表数据
      userList: [],
      //  用户列表请求参数及页码及每页显示条数
      userQuery: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      pagenum: 0,
      dialogVisibleAddUser: false,
      dialogVisibleEditUser: false,
      addForm: {},
      EditForm: {},
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 6,
            message: '长度在 3 到 6 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'blur'
          },
          { validator: checkPassWord, trigger: 'blur' }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // 获取用户列表
    this.getUserList()
  },
  methods: {
    //  *********************网络请求相关*********************
    //  用户列表数据
    async getUserList () {
      const res = await userList(this.userQuery)
      if (res.meta.status === 200) {
        this.userList = res.data.users
        this.total = res.data.total
        this.pagenum = res.data.pagenum
      }
    },
    async editUserType (data) {
      const res = await userEditType(data)
      if (res.meta.status === 200) {
        this.$msg.success('修改状态成功！')
      }
    },
    async delUser (id) {
      const res = await delUser(id)
      if (res.meta.status === 200) {
        this.$msg.success('删除成功！')
        this.getUserList()
      }
    },
    async userAdd(data) {
      const res = await userAdd(data)
      if (res.meta.status === 201) {
        this.dialogVisibleAddUser = false
        this.$msg.success('创建用户成功！')
        this.getUserList()
      }
    },
    async userEdit(data) {
      const res = await userEdit(data)
      if (res.meta.status === 200) {
        this.dialogVisibleEditUser = false
        this.$msg.success('修改成功！')
        this.getUserList()
      }
    },

    //  *********************事件监听相关*********************
    queryBtnClick () {
      this.getUserList()
    },
    handleSizeChange (val) {
      this.userQuery.pagesize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.userQuery.pagenum = val
      this.getUserList()
    },
    userTypeChange (row) {
      this.editUserType({
        id: row.id,
        type: row.mg_state
      })
    },
    userDel (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delUser(id)
      }).catch(() => {
        this.$msg.info('已取消删除！')
      })
    },
    addUserClick () {
      this.dialogVisibleAddUser = true
    },
    userAddBtn() {
      this.$refs.ruleFormUser.validate().then(() => {
        this.userAdd(this.addForm)
      }).catch(() => {})
    },
    closeUser() {
      this.$refs.ruleFormUser.resetFields()
    },
    async editUserItem(row) {
      this.dialogVisibleEditUser = true
      const res = await getUserIdList(row.id)
      if (res.meta.status === 200) {
        this.EditForm = res.data
      }
    },
    userEditBtn() {
      this.userEdit(this.EditForm)
    }

  }
}
</script>

<style scoped>

</style>
