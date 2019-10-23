import { delTenderBid, saveTenderBid } from '@/api/business/tenderbid'
import { getTenderList } from '@/api/business/tender'
import { getBidList } from '@/api/business/bid'
import { Loading } from 'element-ui'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: this.$t('config.add'),
      isAdd: true,
      bidFormVisible: false,
      bidFormTitle: 'ORDER INFORMATION',
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
        material: '',
        status: '',
        dueDate: '',
        count: '',
        bidQuantity: '',
        bidWeight: '',
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
      weightOptions: [
        { value: 'carat', label: 'carat' },
        { value: 'piece', label: 'piece' }
      ],
      bidListForCurrentUser: null
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
        bidQuantity: [
          { required: true, message: 'SUPPLIER SUPPLY QUANTITY is required', trigger: 'blur' }
        ],
        bidPrice: [
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
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getTenderList(this.listQuery).then(response => {
        this.list = response.data
        this.listLoading = false
        this.total = response.data.total
      })
      getBidList(this.listQuery).then(response => {
        this.bidListForCurrentUser = response.data
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
      // 添加loading页面
      let loadingInstance
      const loadingOption = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$refs['bidForm'].validate((valid) => {
        if (valid) {
          loadingInstance = Loading.service(loadingOption)
          saveTenderBid({
            quantity: this.bidForm.bidQuantity,
            weight: this.bidForm.weight,
            unitOfWeight: this.bidForm.unitOfWeight,
            price: this.bidForm.bidPrice,
            tenderId: this.bidForm.id
          }).then(response => {
            loadingInstance.close()
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
    isBidAlready(row) {
      if (this.bidListForCurrentUser) {
        for (let i = 0; i < this.bidListForCurrentUser.length; i++) {
          const bid = this.bidListForCurrentUser[i]
          if (row.id === bid.tenderId) {
            return true
          }
        }
      }
      return false
    }
  }
}
