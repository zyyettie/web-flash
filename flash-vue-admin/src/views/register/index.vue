<template>
  <div class="login-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="login-form" auto-complete="on" label-position="left">
      <el-form-item label="name" prop="name">
        <el-input v-model="registerForm.name"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitForm('registerForm')">{{ $t('button.submit') }}</el-button>
      <el-button @click="resetForm('registerForm')">{{ $t('button.reset') }}</el-button>
    </el-form>
  </div>
</template>