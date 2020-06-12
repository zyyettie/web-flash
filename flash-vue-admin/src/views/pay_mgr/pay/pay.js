import { delBid, getBidListForPayment, moveBidToNextStatus } from '@/api/business/bid'
import { moveBidToNextStatusWithPayment } from '@/api/business/bid'
import { getApiUrl } from '@/utils/utils'
import { Loading } from 'element-ui'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      uploadUrl: '',
      uploadFileId: '',
      uploadHeaders: {
        'Authorization': ''
      },
      formVisible: false,
      formTitle: this.$t('business.modify'),
      isAdd: true,
      form: {
        quantity: '',
        unit: '',
        contact: '',
        isApproved: '',
        tenderNo: ''
      },
      deliverTypeOptions: [
        { value: '1', label: 'Sent By Messenger' },
        { value: '2', label: 'Express' },
        { value: '3', label: 'Other Way' }
      ],
      unitOptions: [
        { value: 'carat', label: 'carat' },
        { value: 'piece', label: 'piece' }
      ],
      listQuery: {
        page: 1,
        limit: 20,
        name: '',
        colorNote: ''
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
      statusFormTitle: 'business.statusChange',
      statusFormVisible: false,
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
        vendor: ''
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
          { required: true, message: 'SUPPLIER AVAILABLE PIECE is required', trigger: 'blur' }
        ],
        type: [
          { required: true, message: 'PRICE is required', trigger: 'blur' }
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
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getBidListForPayment(this.listQuery).then(response => {
        this.list = response.data.records
        for (var index in this.list) {
          const item = this.list[index]
          item.img = getApiUrl() + '/file/getImgStream?idFile=' + item.idFile
          item.invoiceImg = getApiUrl() + '/file/getImgStream?idFile=' + item.invoiceIdFile
          console.log(item)
        }
        this.listLoading = false
        this.total = response.data.total
      })
    },
    search() {
      this.fetchData()
    },
    reset() {
      this.listQuery.name = ''
      this.listQuery.colorNote = ''
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
    resetForm() {
      this.form = {
        quantity: '',
        unit: '',
        contact: '',
        isApproved: '',
        tenderNo: ''
      }
    },
    add() {
      this.resetForm()
      this.formTitle = this.$t('config.add')
      this.formVisible = true
      this.isAdd = true
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
    editBid(row) {
      this.form.id = row.id
      this.form = row
      this.formVisible = true
    },
    remove() {
      if (this.checkSel()) {
        var id = this.selRow.id
        this.$confirm(this.$t('common.deleteConfirm'), this.$t('common.tooltip'), {
          confirmButtonText: this.$t('button.submit'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning'
        }).then(() => {
          delBid(id).then(response => {
            this.$message({
              message: this.$t('common.optionSuccess'),
              type: 'success'
            })
            this.fetchData()
          })
        }).catch(() => {
        })
      }
    },
    changeVendorStatus(row) {
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
    handleUploadRemove(file) {
      this.uploadFileId = ''
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
      if (this.statusForm.status === 6) {
        this.$refs['statusForm'].validate((valid) => {
          if (valid) {
            // 添加loading页面
            const loadingOption = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            const loadingInstance = Loading.service(loadingOption)
            moveBidToNextStatusWithPayment({
              id: id,
              idFile: this.uploadFileId
            }).then(response => {
              loadingInstance.close()
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
        // 添加loading页面
        const loadingOption = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const loadingInstance = Loading.service(loadingOption)
        moveBidToNextStatus(id).then(response => {
          console.log(response)
          loadingInstance.close()
          this.$message({
            message: 'Status modification succeeded',
            type: 'success'
          })
          this.fetchData()
          this.statusFormVisible = false
        })
      }
    }
  }// close methods():
}
