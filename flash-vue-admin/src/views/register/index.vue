<template>
  <div class="register-container">
    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="register-form">
      <div class="title-container">
        <h3 class="title">{{ $t('register.title') }}</h3>
      </div>

      <el-form-item label="用户名" prop="account">
        <el-input v-model="registerForm.account" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="registerForm.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="registerForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="email" prop="email">
        <el-input v-model="registerForm.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="phone" prop="phone">
        <el-input v-model="registerForm.phone" auto-complete="off"></el-input>
      </el-form-item>
      <!-- 年龄>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="registerForm.age"></el-input>
      </el-form-item>
      <-->
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">{{$t('button.submit')}}</el-button>
        <el-button @click="resetForm('registerForm')">{{$t('button.reset')}}</el-button>
        <el-button @click="returnLogin()">{{$t('register.returnLogin')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script src="./register.js"></script>
<style rel="stylesheet/scss" lang="scss" src="./register.scss"></style>