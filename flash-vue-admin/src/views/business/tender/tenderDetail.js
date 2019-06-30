import { delTenderBid, saveTenderBid } from '@/api/business/tenderbid'
import { getBidByTenderId } from '@/api/business/bid'

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
      this.bidForm.dimension = routerParams.dimension
      this.bidForm.color = routerParams.color
      this.bidForm.purity = routerParams.purity
      this.bidForm.quantity = routerParams.quantity
      this.bidForm.unit = routerParams.unit
      this.bidForm.heated = routerParams.heated
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
    back() {
      this.$router.go(-1)
    }

  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  }
}
