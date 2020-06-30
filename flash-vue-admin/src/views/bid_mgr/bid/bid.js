import { delBid, getBidList, saveBid, moveBidToNextStatus } from '@/api/business/bid'
import { moveBidToNextStatusWithDeliverInfo } from '@/api/business/bid'
import { moveBidToNextStatusWithInvoice } from '@/api/business/bid'
import { getApiUrl } from '@/utils/utils'
import { Loading } from 'element-ui'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      labelPosition: 'left',
      uploadUrl: '',
      uploadFileId: '',
      uploadHeaders: {
        'Authorization': ''
      },
      formVisible: false,
      formTitle: 'ORDER INFORMATION',
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
      unitOfBidQuantityOptions: [
        { value: 'piece', label: 'piece' },
        { value: 'carat', label: 'carat' }
      ],
      unitOfBidPriceOptions: [
        { value: 'piece', label: 'piece' },
        { value: 'carat', label: 'carat' }
      ],
      listQuery: {
        page: 1,
        limit: 10,
        name: '',
        colorNote: '',
        shape: '',
        size: '',
        memoNo: ''
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
      statusForm: {
        id: '',
        no: '',
        status: '',
        deliverType: 1
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
        host: '7. Due time inform supplier for payment',
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
        deliverNo: [
          { required: true, message: 'deliverNo is required', trigger: 'blur' }
        ],
        memoNo: [
          { required: true, message: 'memoNo is required', trigger: 'blur' }
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
    labelHead(h, { column, index }) {
      const l = column.label.length
      const f = 16 // 每个字大小，其实是每个字的比例值，大概会比字体大小差不多大一点，
      column.minWidth = f * l // 字大小乘个数即长度 ,注意不要加px像素，这里minWidth只是一个比例值，不是真正的长度
      // 然后将列标题放在一个div块中，注意块的宽度一定要100%，否则表格显示不完全
      return h('div', { class: 'table-head', style: { width: '100%' }}, [column.label])
    },
    init() {
      this.uploadUrl = getApiUrl() + '/file'
      this.uploadHeaders['Authorization'] = getToken()
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getBidList(this.listQuery).then(response => {
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
      this.listQuery.shape = ''
      this.listQuery.size = ''
      this.listQuery.memoNo = ''
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
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 添加loading页面
          const loadingOption = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          const loadingInstance = Loading.service(loadingOption)
          saveBid({
            id: this.form.id,
            quantity: this.form.quantity,
            unitOfBidQuantity: this.form.unitOfBidQuantity,
            price: this.form.price,
            unitOfBidPrice: this.form.unitOfBidPrice
          }).then(response => {
            loadingInstance.close()
            this.$message({
              message: this.$t('common.optionSuccess'),
              type: 'success'
            })
            this.fetchData()
            this.formVisible = false
          })
        } else {
          return false
        }
      })
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
      if (this.statusForm.status === 1) {
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
            moveBidToNextStatusWithDeliverInfo({
              id: id,
              deliverType: this.statusForm.deliverType,
              deliverNo: this.statusForm.deliverNo,
              memoNo: this.statusForm.memoNo
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
      } else if (this.statusForm.status === 4) {
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
            moveBidToNextStatusWithInvoice({
              id: id,
              invoiceIdFile: this.uploadFileId,
              invoiceNo: this.statusForm.invoiceNo
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
