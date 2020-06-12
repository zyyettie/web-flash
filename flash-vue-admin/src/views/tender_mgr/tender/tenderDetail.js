import { getBidByTenderId, moveBidToNextStatusStep3, moveBidBackToStep2, approveBid, denyBid } from '@/api/business/bid'
import { moveBidToNextStatusWithQuantityPrice } from '@/api/business/bid'
import { getToken } from '@/utils/auth'
import { Loading } from 'element-ui'
import { getApiUrl } from '@/utils/utils'

export default {
  data() {
    return {
      labelPosition: 'left',
      loadingInstance: '',
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
        colorNote: '',
        clarity: '',
        quantity: '',
        unitOfQuantity: '',
        enhance: '',
        material: '',
        note: '',
        unitOfNote: '',
        status: '',
        dueDate: '',
        count: '',
        img: '',
        idFile: '',
        invoiceImg: '',
        invoiceNo: '',
        invoiceIdFile: ''
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
        status: '',
        invoiceNo: '',
        confirmedQuantity: '',
        confirmedPrice: '',
        confirmedQuantityUnit: '',
        confirmedUnitPrice: ''
      },
      isDeliverQuantityCorrectOptions: [
        { value: 'yes', label: 'yes' },
        { value: 'no', label: 'no' }
      ],
      confirmedQuantityUnitOptions: [
        { value: 'piece', label: 'piece' },
        { value: 'carat', label: 'carat' }
      ],
      confirmedPriceUnitOptions: [
        { value: 'piece', label: 'piece' },
        { value: 'carat', label: 'carat' }
      ],
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
        confirmedQuantity: [
          { required: true, message: 'confirmedQuantity' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        confirmedPrice: [
          { required: true, message: 'confirmedPrice' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        confirmedQuantityUnit: [
          { required: true, message: 'confirmedQuantityUnit' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        confirmedPriceUnit: [
          { required: true, message: 'confirmedPriceUnit' + this.$t('common.isRequired'), trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
    this.getParams()
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
      // this.listQuery.tenderId = this.$route.query.tenderId
      this.listQuery.tenderId = this.$route.params.tenderId
      this.fetchData()
    },
    // tableHeaderFontSize({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex === 0) {
    //     return 'font-weight: 1000;'
    //   }
    // },
    getParams() {
      // 取到路由带过来的参数
      var routerParams = this.$route.params
      // 将数据放在当前组件的数据内
      this.bidForm.no = routerParams.no
      this.bidForm.name = routerParams.name
      this.bidForm.shape = routerParams.shape
      this.bidForm.size = routerParams.size
      this.bidForm.color = routerParams.color
      this.bidForm.colorNote = routerParams.colorNote
      this.bidForm.clarity = routerParams.clarity
      this.bidForm.quantity = routerParams.quantity
      this.bidForm.unitOfQuantity = routerParams.unitOfQuantity
      this.bidForm.note = routerParams.note
      this.bidForm.unitOfNote = routerParams.unitOfNote
      this.bidForm.enhance = routerParams.enhance
      this.bidForm.material = routerParams.material
      this.bidForm.dueDate = routerParams.dueDate
      this.bidForm.status = routerParams.status
    },
    fetchData() {
      this.listLoading = true
      getBidByTenderId(this.listQuery).then(response => {
        this.list = response.data
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
          message: 'Bid has been approved successfully',
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
      if (this.statusForm.status === 2) {
        if (this.statusForm.isDeliverQuantityCorrect === 'yes') {
          // 添加loading页面
          const loadingOption = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          const loadingInstance2 = Loading.service(loadingOption)
          moveBidToNextStatusStep3(id).then(response => {
            loadingInstance2.close()
            console.log(response)
            this.$message({
              message: 'Status modification succeeded',
              type: 'success'
            })
            this.fetchData()
            this.statusFormVisible = false
          })
        } else if (this.statusForm.isDeliverQuantityCorrect === 'no') {
          // 添加loading页面
          const loadingOption = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          const loadingInstance2 = Loading.service(loadingOption)
          moveBidBackToStep2(id).then(response => {
            loadingInstance2.close()
            console.log(response)
            this.$message({
              message: 'Status modification succeeded',
              type: 'success'
            })
            this.fetchData()
            this.statusFormVisible = false
          })
        } else {
          this.$alert('Please select whether the deliver quantity is correct or not', 'warning', {
            confirmButtonText: 'OK',
            callback: action => {
              this.$message({
                type: 'info',
                message: ``
              })
            }
          })
        }
      } else if (this.statusForm.status === 3) {
        this.$refs['statusForm'].validate((valid) => {
          if (valid) {
            // 添加loading页面
            const loadingOption = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            const loadingInstance2 = Loading.service(loadingOption)
            moveBidToNextStatusWithQuantityPrice({
              id: id,
              confirmedQuantity: this.statusForm.confirmedQuantity,
              confirmedPrice: this.statusForm.confirmedPrice,
              confirmedQuantityUnit: this.statusForm.confirmedQuantityUnit,
              confirmedPriceUnit: this.statusForm.confirmedPriceUnit
            }).then(response => {
              loadingInstance2.close()
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
        const loadingInstance2 = Loading.service(loadingOption)
        moveBidToNextStatusStep3(id).then(response => {
          loadingInstance2.close()
          console.log(response)
          this.$message({
            message: 'Status modification succeeded',
            type: 'success'
          })
          this.fetchData()
          this.statusFormVisible = false
        })
      }
    },
    calculateUnitPrice() {
      if (this.statusForm.confirmedQuantity !== '0' && this.statusForm.confirmedQuantity !== '' && this.statusForm.confirmedQuantity !== null && this.statusForm.confirmedPrice !== '' && this.statusForm.confirmedPrice !== null) {
        var unitPrice = this.statusForm.confirmedPrice / this.statusForm.confirmedQuantity
        this.statusForm.confirmedUnitPrice = unitPrice.toFixed(2)
      } else {
        this.statusForm.confirmedUnitPrice = ''
      }
    }

  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  }
}
