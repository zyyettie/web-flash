import { forgotPassword } from '@/api/login'

export default{
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Email can not be null'))
      }
      callback()
    }

    return {
      buttonName: 'Submit',
      isDisabled: false,
      time: 30,
      forgotPasswordForm: {
        accountName: ''
      },
      rules: {
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
    sendMsg() {

    },
    init() {
    },
    submitForm() {
      const me = this
      me.isDisabled = true
      const interval = window.setInterval(function() {
        me.buttonName = '（' + me.time + '）Submit'
        --me.time
        if (me.time < 0) {
          me.buttonName = 'Submit'
          me.time = 30
          me.isDisabled = false
          window.clearInterval(interval)
        }
      }, 1000)
      this.$refs.forgotPasswordForm.validate((valid) => {
        if (valid) {
          forgotPassword({
            accountName: this.forgotPasswordForm.accountName
          }).then(response => {
            this.$message({
              message: this.$t('register.forgotPwdMsg'),
              type: 'success'
            })
          }).catch(error => {
            this.$message({
              message: error,
              type: 'error'
            })
            // this.errors.push(error.response.data.errors)
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
