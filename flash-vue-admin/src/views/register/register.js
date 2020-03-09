import { userRegister } from '@/api/system/user'
import { Loading } from 'element-ui'
import { getApiUrl } from '@/utils/utils'
import { getToken } from '@/utils/auth'
export default{
  data() {
    // var checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('年龄不能为空'))
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error('请输入数字值'))
    //     } else {
    //       if (value < 18) {
    //         callback(new Error('必须年满18岁'))
    //       } else {
    //         callback()
    //       }
    //     }
    //   }, 1000)
    // }
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Email can not be null'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input password'))
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input your password again'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('Password and confirm password are not consistent!'))
      } else {
        callback()
      }
    }
    return {
      uploadUrl: '',
      uploadFileId: '',
      uploadHeaders: {
        'Authorization': ''
      },
      registerForm: {
        id: '',
        account: '',
        password: '',
        checkPass: '',
        name: '',
        email: '',
        phone: '',
        companyName: '',
        address: '',
        registrationNo: '',
        taxNo: '',
        paymentTerms: '',
        paymentType: '',
        regType: '',
        idFile: '',
        idNo: ''
      },
      paymentTermsOptions: [
        { value: 'cash', label: 'cash' },
        { value: '30days', label: '30days' },
        { value: '60days', label: '60days' },
        { value: '90days', label: '90days' }],
      paymentTypeOptions: [
        { value: 'by Cheque', label: 'by Cheque' },
        { value: 'by TT', label: 'by TT' },
        { value: 'by Cash', label: 'by Cash' }],
      regTypeOptions: [
        { value: 'company', label: 'company' },
        { value: 'broker', label: 'broker' }],
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        account: [
          { validator: checkAccount, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.uploadUrl = getApiUrl() + '/file'
      this.uploadHeaders['Authorization'] = getToken()
    },
    submitForm() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          userRegister({
            id: this.registerForm.id,
            account: this.registerForm.account,
            password: this.registerForm.password,
            name: this.registerForm.name,
            email: this.registerForm.email,
            phone: this.registerForm.phone,
            companyName: this.registerForm.companyName,
            address: this.registerForm.address,
            registrationNo: this.registerForm.registrationNo,
            taxNo: this.registerForm.taxNo,
            paymentTerms: this.registerForm.paymentTerms,
            paymentType: this.registerForm.paymentType,
            regType: this.registerForm.regType,
            idNo: this.registerForm.idNo,
            idFile: this.uploadFileId
          }).then(response => {
            this.$message({
              message: this.$t('register.successMsg'),
              type: 'success'
            })
          }).catch(error => {
            this.errors.push(error.response.data.errors)
          })
        } else {
          return false
        }
      })
    },
    // submitForm(formName) {
    //   this.$refs.registerForm.validate((valid) => {
    //     if (valid) {
    //       alert('submit!')
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    resetForm(formName) {
      this.$refs.registerForm.resetFields()
    },
    returnLogin() {
      this.$router.push('/login')
    },
    // upload file
    handleBeforeUpload() {
      if (this.uploadFileId !== '') {
        this.$message({
          message: this.$t('common.mustSelectOne'),
          type: 'warning'
        })
        return false
      }
      this.loadingInstance = Loading.service({
        lock: true,
        text: this.$t('common.uploading'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    handleUploadSuccess(response, raw) {
      this.loadingInstance.close()
      if (response.code === 20000) {
        console.log(response.data)
        this.uploadFileId = response.data.id
        this.registerForm.fileName = response.data.originalFileName
      } else {
        this.$message({
          message: this.$t('common.uploadError'),
          type: 'error'
        })
      }
    }
  }
}
