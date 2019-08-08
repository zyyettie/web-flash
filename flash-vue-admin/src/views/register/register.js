import { userRegister } from '@/api/system/user'
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
        paymentType: ''
      },
      paymentTermsOptions: [
        { value: 'cash', label: 'cash' },
        { value: '30days', label: '30days' },
        { value: '60days', label: '60days' },
        { value: '90days', label: '90days' }],
      paymentTypeOptions: [
        { value: 'by cheque', label: 'by cheque' },
        { value: 'by TT', label: 'by TT' }],
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
  methods: {
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
            paymentType: this.registerForm.paymentType
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
    }
  }
}
