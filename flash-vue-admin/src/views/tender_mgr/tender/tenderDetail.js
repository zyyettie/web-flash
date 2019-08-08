import { getBidByTenderId, moveBidToNextStatus, approveBid, denyBid } from '@/api/business/bid'
import { moveBidToNextStatusWithQuantityPrice, moveBidToNextStatusWithPayment } from '@/api/business/bid'
import { getToken } from '@/utils/auth'
import { Loading } from 'element-ui'
import { getApiUrl } from '@/utils/utils'

export default {
  data() {
    return {
      uploadUrl: '',
      uploadFileId: '',
      uploadHeaders: {
        'Authorization': ''
      },
      statusFormTitle: 'business.statusChange',
      statusFormVisible: false,
      isAdd: true,
      bidFormVisible: false,
      bidFormTitle: this.$t('config.add'),
      bidForm: {
        no: '',
        name: '',
        shape: '',
        size: '',
        color: '',
        clarity: '',
        quantity: '',
        weight: '',
        unitOfWeight: '',
        enhance: '',
        status: '',
        dueDate: '',
        count: ''
      },
      listQuery: {
        page: 1,
        limit: 20,
        tenderId: undefined
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
      statusForm: {
        id: '',
        no: '',
        status: ''
      },
      statusData: [{
        host: '1. Purchase confirm supplier',
        vendor: ''
      }, {
        host: '',
        vendor: '2. Supplier ship gemstone'
      }, {
        host: '3. Receipted gemstone and in checking process',
        vendor: ''
      }, {
        host: '4. Confirm final quantity/price and issue purchase bill',
        vendor: ''
      }, {
        host: '',
        vendor: '5. Confirmed by supplier and issue tax invoice'
      }, {
        host: '6. Received invoice',
        vendor: ''
      }, {
        host: '7. Finished payment',
        vender: ''
      }]
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  computed: {
    rules() {
      return {
        name: [
          { required: true, message: this.$t('config.name') + this.$t('common.isRequired'), trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
    this.getParams()
  },
  methods: {
    init() {
      this.uploadUrl = getApiUrl() + '/file'
      this.uploadHeaders['Authorization'] = getToken()
      // this.listQuery.tenderId = this.$route.query.tenderId
      this.listQuery.tenderId = this.$route.params.tenderId
      this.fetchData()
    },
    getParams() {
      // 取到路由带过来的参数
      var routerParams = this.$route.params
      // 将数据放在当前组件的数据内
      this.bidForm.no = routerParams.no
      this.bidForm.name = routerParams.name
      this.bidForm.shape = routerParams.shape
      this.bidForm.size = routerParams.size
      this.bidForm.color = routerParams.color
      this.bidForm.clarity = routerParams.clarity
      this.bidForm.quantity = routerParams.quantity
      this.bidForm.weight = routerParams.weight
      this.bidForm.unitOfWeight = routerParams.unitOfWeight
      this.bidForm.enhance = routerParams.enhance
      this.bidForm.dueDate = routerParams.dueDate
      this.bidForm.status = routerParams.status
    },
    fetchData() {
      this.listLoading = true
      getBidByTenderId(this.listQuery).then(response => {
        this.list = response.data
        this.listLoading = false
        this.total = response.data.total
      })
    },
    search() {
      this.fetchData()
    },
    reset() {
      this.listQuery.name = ''
      this.listQuery.type = ''
      this.fetchData()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getTenderList()
    },
    handleClose() {

    },
    fetchNext() {
      this.listQuery.page = this.listQuery.page + 1
      this.fetchData()
    },
    fetchPrev() {
      this.listQuery.page = this.listQuery.page - 1
      this.fetchData()
    },
    fetchPage(page) {
      this.listQuery.page = page
      this.fetchData()
    },
    changeSize(limit) {
      this.listQuery.limit = limit
      this.fetchData()
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.selRow = currentRow
    },
    clickCell(row, column, cell, event) {
      this.selRow = row
    },

    checkSel() {
      if (this.selRow && this.selRow.id) {
        return true
      }
      this.$message({
        message: this.$t('common.mustSelectOne'),
        type: 'warning'
      })
      return false
    },
    edit() {
      if (this.checkSel()) {
        this.isAdd = false
        this.form = this.selRow
        this.formTitle = this.$t('config.edit')
        this.formVisible = true
      }
    },
    back() {
      this.$router.go(-1)
    },
    approve(id) {
      approveBid(id).then(response => {
        console.log(response)
        this.$message({
          message: '批准投标成功',
          type: 'success'
        })
        this.fetchData()
      })
    },
    deny(id) {
      denyBid(id).then(response => {
        console.log(response)
        this.$message({
          message: '拒绝投标成功',
          type: 'success'
        })
        this.fetchData()
      })
    },
    changeStatus(row) {
      //this.statusForm = this.selRow
      this.statusForm = row
      this.statusFormTitle = this.$t('business.statusChange')
      this.statusFormVisible = true
    },
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
        this.statusForm.fileName = response.data.originalFileName
      } else {
        this.$message({
          message: this.$t('common.uploadError'),
          type: 'error'
        })
      }
    },
    // nextStep(id) {
    //   moveBidToNextStatus(id).then(response => {
    //     console.log(response)
    //     this.$message({
    //       message: '状态修改成功',
    //       type: 'success'
    //     })
    //     this.fetchData()
    //     this.statusFormVisible = false
    //   })
    // },
    nextStepWithAdditionalInfo(id) {
      if (this.statusForm.status === 3) {
        this.$refs['statusForm'].validate((valid) => {
          if (valid) {
            moveBidToNextStatusWithQuantityPrice({
              id: id,
              confirmedQuantity: this.statusForm.confirmedQuantity,
              confirmedPrice: this.statusForm.confirmedPrice
            }).then(response => {
              this.$message({
                message: this.$t('common.optionSuccess'),
                type: 'success'
              })
              this.fetchData()
              this.statusFormVisible = false
            })
          } else {
            return false
          }
        })
      } else if (this.statusForm.status === 6) {
        this.$refs['statusForm'].validate((valid) => {
          if (valid) {
            moveBidToNextStatusWithPayment({
              id: id,
              idFile: this.uploadFileId
            }).then(response => {
              this.$message({
                message: this.$t('common.optionSuccess'),
                type: 'success'
              })
              this.fetchData()
              this.statusFormVisible = false
            })
          } else {
            return false
          }
        })
      } else {
        moveBidToNextStatus(id).then(response => {
          console.log(response)
          this.$message({
            message: 'Status modification succeeded',
            type: 'success'
          })
          this.fetchData()
          this.statusFormVisible = false
        })
      }
    }

  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  }
}
