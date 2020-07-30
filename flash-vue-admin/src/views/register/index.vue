<template>
  <div class="register-container">
    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="register-form">
      <div class="title-container">
        <h3 class="title">{{ $t('register.title') }}</h3>
      </div>
    <el-row>
      <el-col :span="12">
      <el-form-item label="Name" prop="name">
        <el-input v-model="registerForm.name" auto-complete="off"></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="Email" prop="account">
        <el-input v-model="registerForm.account" auto-complete="off"></el-input>
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
        <el-form-item label="Reg. Type" prop="regType">
          <el-select v-model="registerForm.regType" placeholder="please select">
            <el-option
              v-for="item in regTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
      <el-form-item label="ID No." prop="idNo">
        <el-input v-model="registerForm.idNo" auto-complete="off"></el-input>
      </el-form-item>
      </el-col>

      <el-col :span="12">
      <el-form-item label="Company Name" prop="companyName">
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
        <el-form-item label="Payment Method" prop="paymentType">
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

      <!-- 上传身份图片-->
      <el-col :span="12">
        <el-form-item label="ID/LICENCE PICTURE" ref="image" prop="fileName">
          <el-upload
            class="upload-demo"
            drag
            :multiple=false
            :action="uploadUrl"
            :headers="uploadHeaders"
            :before-upload="handleBeforeUpload"
            :on-success="handleUploadSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleUploadRemove"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Click to upload or drag files here</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" append-to-body>
              <img width="100%" fit="contain" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-col>

      </el-row>

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