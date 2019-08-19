import { delBid, getBidList, saveBid, moveBidToNextStatus } from '@/api/business/bid'
import { moveBidToNextStatusWithDeliverInfo } from '@/api/business/bid'
import { getApiUrl } from '@/utils/utils'

export default {
  data() {
    return {
      uploadUrl: '',
      formVisible: false,
      formTitle: this.$t('config.add'),
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
        name: undefined,
        type: undefined
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
          { required: true, message: 'SUPPLIER SUPPLY QUANTITY is required', trigger: 'blur' }
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
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getBidList(this.listQuery).then(response => {
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
          saveBid({
            id: this.form.bidId,
            quantity: this.form.quantity,
            price: this.form.price
          }).then(response => {
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
      this.form.bidId = row.bidId
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
      if (this.statusForm.bidStatus === 1) {
        this.$refs['statusForm'].validate((valid) => {
          if (valid) {
            moveBidToNextStatusWithDeliverInfo({
              id: id,
              deliverType: this.statusForm.deliverType,
              deliverNo: this.statusForm.deliverNo
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

  }// close methods():
}
