<template>
  <div class="register-container">
    <el-form :model="forgotPasswordForm" status-icon :rules="rules" ref="forgotPasswordForm" label-width="100px" class="register-form">
      <div class="title-container">
        <h3 class="title">Reset Account Password</h3>
      </div>
    <el-row>
      <div style="padding-left:100px"><p>Please input your registered email, we will send the new password to your email box:</p>
      <p>Only reset password once is enough, if you are not able to receive the reset password email, please contact the administrator.</p>
      </div>
      <el-col :span="24">
        <el-form-item label="Email" prop="name">
        <el-input v-model="forgotPasswordForm.accountName" auto-complete="off"></el-input>
      </el-form-item>
      </el-col>
     

      </el-row>

      <el-form-item>
        <el-button type="primary" @click="submitForm('forgotPasswordForm')" :disabled="isDisabled">{{buttonName}}</el-button>
        <el-button @click="returnLogin()">{{$t('register.returnLogin')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script src="./forgotPassword.js"></script>
<style rel="stylesheet/scss" lang="scss" src="./forgotPassword.scss"></style>