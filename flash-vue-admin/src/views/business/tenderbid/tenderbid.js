import { delTenderBid, saveTenderBid } from '@/api/business/tenderbid'
import { getTenderList } from '@/api/business/tender'
import { saveBid } from '@/api/business/bid'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: this.$t('config.add'),
      isAdd: true,
      bidFormVisible: false,
      bidFormTitle: this.$t('config.add'),
      bidForm: {
        no: '',
        name: '',
        shape: '',
        dimension: '',
        color: '',
        purity: '',
        quantity: '',
        unit: '',
        heated: '',
        status: '',
        dueDate: '',
        count: '',
        bidQuantity: '',
        bidUnit: '',
        bidPrice: ''
      },
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
      unitOptions: [
        { value: 'carat', label: 'carat' },
        { value: 'piece', label: 'piece' }
      ]
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
        ],
        shape: [
          { required: true, message: this.$t('config.value') + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        dimension: [
          { required: true, message: this.$t('config.name') + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        purity: [
          { required: true, message: this.$t('config.name') + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: this.$t('config.name') + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        unit: [
          { required: true, message: this.$t('config.name') + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        heated: [
          { required: true, message: this.$t('config.name') + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        dueDate: [
          { required: true, message: this.$t('config.name') + this.$t('common.isRequired'), trigger: 'blur' }
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
      getTenderList(this.listQuery).then(response => {
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

    add() {
      this.resetForm()
      this.formTitle = this.$t('config.add')
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      this.$refs['bidForm'].validate((valid) => {
        if (valid) {
          saveTenderBid({
            quantity: this.bidForm.bidQuantity,
            unit: this.bidForm.bidUnit,
            price: this.bidForm.bidPrice,
            tenderId: this.bidForm.id
          }).then(response => {
            this.$message({
              message: this.$t('common.optionSuccess'),
              type: 'success'
            })
            this.fetchData()
            this.bidFormVisible = false
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
    remove() {
      if (this.checkSel()) {
        var id = this.selRow.id
        this.$confirm(this.$t('common.deleteConfirm'), this.$t('common.tooltip'), {
          confirmButtonText: this.$t('button.submit'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning'
        }).then(() => {
          delTenderBid(id).then(response => {
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
    addBid(row) {
      this.bidForm.tenderId = row.id
      this.bidForm = row
      this.bidFormVisible = true
    },
    saveBid() {
      saveBid({
        quantity: this.bidForm.bidQuantity,
        unit: this.bidForm.bidUnit,
        price: this.bidForm.bidPrice,
        tenderId: this.bidForm.id,
        tenderNo: this.bidForm.no
      }).then(response => {
        this.$message({
          message: this.$t('common.optionSuccess'),
          type: 'success'
        })
        this.fetchData()
        this.formVisible = false
      })
    }

  }
}
