import { delBid, getBidList, saveBid, moveBidToNextStatus } from '@/api/business/bid'

export default {
  data() {
    return {
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
        host: '1. 发标团队选择供应商',
        vendor: ''
      }, {
        host: '',
        vendor: '2. 供应商发货'
      }, {
        host: '3. 收获并检测',
        vendor: ''
      }, {
        host: '4. 发标团队确认购买数量、价格',
        vendor: ''
      }, {
        host: '',
        vendor: '5. 供应商确认,并送达发票'
      }, {
        host: '6. 收到发票，付款结算',
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
          { required: true, message: this.$t('config.name') + this.$t('common.isRequired'), trigger: 'blur' },
          { min: 3, max: 2000, message: this.$t('config.name') + this.$t('config.lengthValidation'), trigger: 'blur' }
        ],
        type: [
          { required: true, message: this.$t('config.value') + this.$t('common.isRequired'), trigger: 'blur' },
          { min: 2, max: 2000, message: this.$t('config.value') + this.$t('config.lengthValidation'), trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
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
            no: this.form.no,
            name: this.form.name,
            email: this.form.email,
            telephone: this.form.telephone,
            isDelete: this.form.isDelete
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
      this.form.tenderId = row.id
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
      this.statusForm = this.selRow
      this.statusFormTitle = this.$t('business.statusChange')
      this.statusFormVisible = true
    },
    nextStep(id) {
      moveBidToNextStatus(id).then(response => {
        console.log(response)
        this.$message({
          message: '状态修改成功',
          type: 'success'
        })
        this.fetchData()
        this.statusFormVisible = false
      })
    }
  }
}
