<template>
  <div class="register-container">
    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="register-form">
      <div class="title-container">
        <h3 class="title">{{ $t('register.title') }}</h3>
      </div>
    <el-row>
      <el-col :span="12">
      <el-form-item label="Email" prop="account">
        <el-input v-model="registerForm.account" auto-complete="off"></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="Name" prop="name">
        <el-input v-model="registerForm.name" auto-complete="off"></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="Confirm Pwd" prop="checkPass">
        <el-input type="password" v-model="registerForm.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="Phone" prop="phone">
        <el-input v-model="registerForm.phone" auto-complete="off"></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="Company" prop="companyName">
        <el-input type="textarea" :rows="1" v-model="registerForm.companyName" auto-complete="off"></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="Address" prop="address">
        <el-input type="textarea" :rows="1" v-model="registerForm.address" auto-complete="off"></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="Reg. No." prop="registrationNo">
        <el-input v-model="registerForm.registrationNo" auto-complete="off"></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="Tax No." prop="taxNo">
        <el-input v-model="registerForm.taxNo" auto-complete="off"></el-input>
      </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="Payment Terms" prop="paymentTerms">
          <el-select v-model="registerForm.paymentTerms" placeholder="please select">
            <el-option
              v-for="item in paymentTermsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Payment" prop="paymentType">
          <el-select v-model="registerForm.paymentType" placeholder="please select">
            <el-option
              v-for="item in paymentTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      </el-row>
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