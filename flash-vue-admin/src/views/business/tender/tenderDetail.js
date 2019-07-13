import { getBidByTenderId, moveBidToNextStatus, approveBid, denyBid } from '@/api/business/bid'

export default {
  data() {
    return {
      statusFormTitle: 'business.statusChange',
      statusFormVisible: false,
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
      ],
      statusForm: {
        id: '',
        no: '',
        status: ''
      },
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

  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  }
}
