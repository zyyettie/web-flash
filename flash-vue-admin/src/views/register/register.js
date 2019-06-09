import { isvalidUsername } from '@/utils/validate'
export default{
  data() {
    const validateName = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('Please enter the correct name'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        name: ''
      },
      registerRules: {
        name: [{ required: true, trigger: 'blur', validator: validateName }]
      }
    }
  },
  computed: {

  },
  methods: {
    submitForm() {
    },
    resetForm() {
    }
  }
}
