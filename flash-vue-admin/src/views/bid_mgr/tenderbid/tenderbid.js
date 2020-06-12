import { delTenderBid, saveTenderBid } from '@/api/business/tenderbid'
import { getTenderList2 } from '@/api/business/tender'
import { Loading } from 'element-ui'

export default {
  data() {
    return {
      labelPosition: 'left',
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
        name: '',
        colorNote: '',
        shape: '',
        size: ''
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
      unitOfBidQuantityOptions: [
        { value: 'piece', label: 'piece' },
        { value: 'carat', label: 'carat' }
      ],
      unitOfBidPriceOptions: [
        { value: 'piece', label: 'piece' },
        { value: 'carat', label: 'carat' }
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
          { required: true, message: 'SUPPLIER AVAILABLE PIECE is required', trigger: 'blur' }
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
    labelHead(h, { column, index }) {
      const l = column.label.length
      const f = 16 // 每个字大小，其实是每个字的比例值，大概会比字体大小差不多大一点，
      column.minWidth = f * l // 字大小乘个数即长度 ,注意不要加px像素，这里minWidth只是一个比例值，不是真正的长度
      // 然后将列标题放在一个div块中，注意块的宽度一定要100%，否则表格显示不完全
      return h('div', { class: 'table-head', style: { width: '100%' }}, [column.label])
    },
    init() {
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getTenderList2(this.listQuery).then(response => {
        this.list = response.data.records
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
      this.listQuery.shape = ''
      this.listQuery.size = ''
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
          // 添加loading页面
          const loadingOption = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          const loadingInstance = Loading.service(loadingOption)
          saveTenderBid({
            quantity: this.bidForm.bidQuantity,
            unitOfBidQuantity: this.bidForm.unitOfBidQuantity,
            price: this.bidForm.bidPrice,
            unitOfBidPrice: this.bidForm.unitOfBidPrice,
            'Tender.id': this.bidForm.id
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
