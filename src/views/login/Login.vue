<template>
  <div class="login">
    <div class="login_box">
      <!--      头像区域-->
      <div class="active_box">
        <img src="~assets/logo.png" alt="" />
      </div>

      <!--      form表单区域-->
      <el-form
        ref="loginFormRef"
        class="form_box"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <!--        用户名-->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!--        密码-->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-s-goods"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <!--        提交和取消按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/network/login'

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 登录表单重置
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 登录验证表单是否全部通过
    login () {
      this.$refs.loginFormRef.validate(async (validate) => {
        //  1：如果表单验证失败就直接返回，不提交登录
        if (!validate) return
        const res = await login(
          this.loginForm.username,
          this.loginForm.password
        )
        if (res.meta.status !== 200) return this.$msg.error('登录失败！')
        this.$msg.success('登录成功！')
        // 登录成功保存token在localStorage内
        localStorage.setItem('token', res.data.token)
        // 页面跳转到home首页
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-color: #2b4b6b;
}
.login_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 300px;
  background-color: #fff;
}
.active_box {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #eee;
  box-shadow: 0 0 10px #ddd;
  img {
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.form_box {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
