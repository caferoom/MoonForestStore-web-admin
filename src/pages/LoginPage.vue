<template>
  <div class="login">
    <div class="login-box">
      <div class="body">
        <p class="tips">admin</p>
        <el-form ref="form" :model="form" :rules="rules" label-position="top">
          <el-form-item label="" prop="username">
            <el-input v-model="form.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              type="password"
              v-model="form.password"
              placeholder="密码"
              @keyup.enter.native="onLogin"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onLogin"
              :loading="loading"
              style="width: 100%"
            >
              {{ loading ? "登录中..." : "登录" }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          username: "",
          password: "",
        },
        rules: {
          username: [
            { required: true, message: "请输入用户名", trigger: "blur" },
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 6, message: "密码不得低于6个字符", trigger: "blur" },
          ],
        },
        loading: false,
      };
    },
    methods: {
      onLogin() {
        this.$refs["form"].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.loading = true;
          this.$axios
            .post("auth/login", {
              username: this.form.username,
              password: this.form.password,
            })
            .then((res) => {
              this.loading = false;
              if (res.success) {
                console.log(res.data);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem(
                  "userInfo",
                  JSON.stringify(res.data.userInfo)
                );
                console.log(JSON.stringify(res.data.token));
                console.log(JSON.stringify(res.data.userInfo));
                this.$router.push({ name: "home" });
                let sUserAgent = navigator.userAgent;
                // todo 手机端
                let mobileAgents = [
                  "Android",
                  "iPhone",
                  "Symbian",
                  "WindowsPhone",
                  "iPod",
                  "BlackBerry",
                  "Windows CE",
                ];
                let goUrl = 0;
                for (var i = 0; i < mobileAgents.length; i++) {
                  if (sUserAgent.indexOf(mobileAgents[i]) > -1) {
                    goUrl = 1;
                    break;
                  }
                }
                console.log(goUrl);
                if (goUrl == 1) {
                  this.$router.push({ name: "wap" });
                }
              } else {
                this.$message({
                  type: "error",
                  message: call.errmsg,
                });
                return false;
              }
            })
            .catch((err) => {
              this.loading = false;
            });
        });
      },
    },
  };
</script>
<style>
  .login {
    align-items: center;
    background-size: 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    text-align: center;
    height: 100%;
    width: 100%;
    color: #656565;
  }

  .login-box {
    width: 320px;
    background: #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 12px #ccc;
  }

  .login-box .logo {
    height: 100px;
    padding-top: 30px;
    /*background: #324157;*/
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-box .logo img {
    width: 80px;
    height: 80px;
  }

  .login-box .body {
    padding: 10px 30px 30px 30px;
  }

  .login-box .body .tips {
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-bottom: 30px;
  }

  .login-box .body .author {
    display: block;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #656565;
    margin-bottom: 10px;
    text-decoration: none;
  }

  .login-box .body .author a {
    text-decoration: none;
  }
</style>
