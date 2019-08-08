import { delTender, getTenderList, saveTender } from '@/api/business/tender'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: this.$t('business.addTender'),
      isAdd: true,
      form: {
        name: '',
        shape: '',
        size: '',
        color: '#FFFFFF',
        clarity: '',
        quantity: '',
        weight: '',
        unitOfWeight: '',
        enhance: '',
        dueDate: '',
        note: '',
        stoneUseFor: ''
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
      nameOptions: [
        { value: 'BS-BLUE SAPPHIRE', label: 'BS-BLUE SAPPHIRE' },
        { value: 'PS-PINK SAPPHIRE', label: 'PS-PINK SAPPHIRE' },
        { value: 'RB-RUBY', label: 'RB-RUBY' },
        { value: 'TS-TSAVORITE', label: 'TS-TSAVORITE' },
        { value: 'WS-WHITE SAPPHIRE', label: 'WS-WHITE SAPPHIRE' },
        { value: 'YS-YELLOW SAPPHIRE', label: 'YS-YELLOW SAPPHIRE' },
        { value: 'GS-GREY SAPPHIRE', label: 'GS-GREY SAPPHIRE' },
        { value: 'LS-LAVENDER SAPPHIRE', label: 'LS-LAVENDER SAPPHIRE' },
        { value: 'BM-BLUE SAPPHIRE', label: 'BM-BLUE SAPPHIRE' },
        { value: 'BC-BLUE SAPPHIRE', label: 'BC-BLUE SAPPHIRE' },
        { value: 'BK-BLACK SAPPHIRE', label: 'BK-BLACK SAPPHIRE' },
        { value: 'YB-YELLOW SAPPHIRE', label: 'YB-YELLOW SAPPHIRE' },
        { value: 'YC-YELLOW SAPPHIRE', label: 'YC-YELLOW SAPPHIRE' },
        { value: 'YR-YELLOW SAPPHIRE', label: 'YR-YELLOW SAPPHIRE' },
        { value: 'CT-CHROME TOURMALINE', label: 'CT-CHROME TOURMALINE' },
        { value: 'SP-PINK SPINEL', label: 'SP-PINK SPINEL' },
        { value: 'SR-RED SPINEL', label: 'SR-RED SPINEL' },
        { value: 'BT-SWISS BLUE TOPAZ', label: 'BT-SWISS BLUE TOPAZ' },
        { value: 'AM-AMETHYST', label: 'AM-AMETHYST' },
        { value: 'RG-RED GARNET', label: 'RG-RED GARNET' },
        { value: 'AQ-AQUAMARINE', label: 'AQ-AQUAMARINE' },
        { value: 'BB-BLUE SAPPHIRE', label: 'BB-BLUE SAPPHIRE' },
        { value: 'BG-BLUE SAPPHIRE', label: 'BG-BLUE SAPPHIRE' },
        { value: 'GN-GARNET', label: 'GN-GARNET' },
        { value: 'PP-PURPLE SAPPHIRE', label: 'PP-PURPLE SAPPHIRE' },
        { value: 'RD-RHODOLITE', label: 'RD-RHODOLITE' },
        { value: 'AD-ANDALUSITE', label: 'AD-ANDALUSITE' },
        { value: 'PT-PINK TOURMALINE', label: 'PT-PINK TOURMALINE' },
        { value: 'PR-PERIDOT', label: 'PR-PERIDOT' },
        { value: 'ML-MALAIA GARNET', label: 'ML-MALAIA GARNET' },
        { value: 'MG-MANDARIN GARNET', label: 'MG-MANDARIN GARNET' },
        { value: 'LT-LONDON TOPAZ', label: 'LT-LONDON TOPAZ' },
        { value: 'LP-LAPIS LAZULI', label: 'LP-LAPIS LAZULI' },
        { value: 'TZ-TANZANITE', label: 'TZ-TANZANITE' },
        { value: 'SM-SMOCKY QUARTZ', label: 'SM-SMOCKY QUARTZ' },
        { value: 'CI-CITRINE', label: 'CI-CITRINE' },
        { value: 'EM-EMERALD', label: 'EM-EMERALD' },
        { value: 'GR-GREEN SAPPHIRE', label: 'GR-GREEN SAPPHIRE' },
        { value: 'IO-IOLITE', label: 'IO-IOLITE' },
        { value: 'AF-AMETHYST FANCY', label: 'AF-AMETHYST FANCY' },
        { value: 'BF-BLUE SAPPHIRE FANCY', label: 'BF-BLUE SAPPHIRE FANCY' },
        { value: 'CF-TOURMALINE FANCY', label: 'CF-TOURMALINE FANCY' },
        { value: 'GF-GREY SAPPHIRE FANCY', label: 'GF-GREY SAPPHIRE FANCY' },
        { value: 'LF-LAVENDER SAPPHIRE FANCY', label: 'LF-LAVENDER SAPPHIRE FANCY' },
        { value: 'PF-PINK SAPPHIRE FANCY', label: 'PF-PINK SAPPHIRE FANCY' },
        { value: 'RF-RUBY FANCY', label: 'RF-RUBY FANCY' },
        { value: 'SF-SPINEL FANCY', label: 'SF-SPINEL FANCY' },
        { value: 'TF-TSAVORITE FANCY', label: 'TF-TSAVORITE FANCY' },
        { value: 'WF-WHITE SAPPHIRE FANCY', label: 'WF-WHITE SAPPHIRE FANCY' },
        { value: 'YF-YELLOW SAPPHIRE FANCY', label: 'YF-YELLOW SAPPHIRE FANCY' },
        { value: 'FG-GREEN SAPPHIRE FANCY', label: 'FG-GREEN SAPPHIRE FANCY' },
        { value: 'FP-PURPLE SAPPHIRE FANCY', label: 'FP-PURPLE SAPPHIRE FANCY' }
      ],
      shapeOptions: [
        { value: 'c', label: 'c' },
        { value: 'q', label: 'q' },
        { value: 'b', label: 'b' },
        { value: 'g', label: 'g' }],
      clarityOptions: [
        { value: 'lc', label: 'lc' },
        { value: 'ec', label: 'ec' },
        { value: 'cq', label: 'cq' },
        { value: 'ct', label: 'ct' }],
      unitOfWeightOptions: [
        { value: 'ct', label: 'ct' },
        { value: 'g', label: 'g' },
        { value: 'kg', label: 'kg' }
      ],
      enhanceOptions: [
        { value: 'unheated', label: 'unheated' },
        { value: 'heated', label: 'heated' }
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
          { required: true, message: 'STONE' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        shape: [
          { required: true, message: 'SHAPE' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        size: [
          { required: true, message: 'SIZE' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        color: [
          { required: true, message: 'COLOR' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        clarity: [
          { required: true, message: 'CLARITY' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: 'QUANTITY' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        weight: [
          { required: true, message: 'WEIGHT' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        enhance: [
          { required: true, message: 'ENHANCE' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        dueDate: [
          { required: true, message: 'DUEDATE' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        stoneUseFor: [
          { required: true, message: 'STONEUSEFOR' + this.$t('common.isRequired'), trigger: 'blur' }
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
    resetForm() {
      this.form = {
        name: '',
        shape: '',
        size: '',
        color: '#BF2929',
        clarity: '',
        quantity: '',
        weight: '',
        unitOfWeight: '',
        enhance: '',
        dueDate: '',
        note: '',
        stoneUseFor: ''
      }
    },
    add() {
      this.resetForm()
      this.formTitle = this.$t('business.addTender')
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          saveTender({
            name: this.form.name,
            shape: this.form.shape,
            size: this.form.size,
            color: this.form.color,
            clarity: this.form.clarity,
            quantity: this.form.quantity,
            weight: this.form.weight,
            unitOfWeight: this.form.unitOfWeight,
            enhance: this.form.enhance,
            dueDate: this.form.dueDate,
            note: this.form.note,
            stoneUseFor: this.form.stoneUseFor
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
    edit(row) {
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
          delTender(id).then(response => {
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
    viewTender(rowData) {
      this.$router.push({
        path: '/business/tenderDetail',
        name: 'tenderDetail',
        params: {
          tenderId: rowData.id,
          no: rowData.no,
          name: rowData.name,
          shape: rowData.shape,
          size: rowData.size,
          color: rowData.color,
          clarity: rowData.clarity,
          quantity: rowData.quantity,
          weight: rowData.weight,
          unitOfWeight: rowData.unitOfWeight,
          enhance: rowData.enhance,
          dueDate: rowData.dueDate,
          status: rowData.status
        }
      })
    }

  }
}
