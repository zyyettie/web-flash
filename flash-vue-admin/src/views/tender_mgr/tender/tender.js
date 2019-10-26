import { delTender, getTenderList, saveTender } from '@/api/business/tender'
import { Loading } from 'element-ui'

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
        material: '',
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
        { value: 'AMETHYST', label: 'AMETHYST' },
        { value: 'ANDALUSITE', label: 'ANDALUSITE' },
        { value: 'AQUAMARINE', label: 'AQUAMARINE' },
        { value: 'BLACK SAPPHIRE', label: 'BLACK SAPPHIRE' },
        { value: 'BLUE SAPPHIRE', label: 'BLUE SAPPHIRE' },
        { value: 'CHROME TOURMALINE', label: 'CHROME TOURMALINE' },
        { value: 'CITRINE', label: 'CITRINE ' },
        { value: 'EMERALD', label: 'EMERALD' },
        { value: 'GARNET', label: 'GARNET' },
        { value: 'GREEN SAPPHIRE', label: 'GREEN SAPPHIRE' },
        { value: 'GREY SAPPHIRE', label: 'GREY SAPPHIRE' },
        { value: 'IOLITE', label: 'IOLITE' },
        { value: 'LAPIS LAZULI', label: 'LAPIS LAZULI' },
        { value: 'LAVENDER SAPPHIRE', label: 'LAVENDER SAPPHIRE' },
        { value: 'LONDON TOPAZ', label: 'LONDON TOPAZ' },
        { value: 'MALAIA GARNET', label: 'MALAIA GARNET' },
        { value: 'MANDARIN GARNET', label: 'MANDARIN GARNET' },
        { value: 'PERIDOT', label: 'PERIDOT' },
        { value: 'PINK SAPPHIRE', label: 'PINK SAPPHIRE' },
        { value: 'PINK SPINEL', label: 'PINK SPINEL' },
        { value: 'PINK TOURMALINE', label: 'PINK TOURMALINE' },
        { value: 'PURPLE SAPPHIRE', label: 'PURPLE SAPPHIRE' },
        { value: 'RED GARNET', label: 'RED GARNET' },
        { value: 'RED SPINEL', label: 'RED SPINEL' },
        { value: 'RHODOLITE', label: 'RHODOLITE' },
        { value: 'RUBY', label: 'RUBY' },
        { value: 'SMOCKY QUARTZ', label: 'SMOCKY QUARTZ' },
        { value: 'SWISS BLUE TOPAZ', label: 'SWISS BLUE TOPAZ' },
        { value: 'TANZANITE', label: 'TANZANITE' },
        { value: 'TSAVORITE', label: 'TSAVORITE' },
        { value: 'WHITE SAPPHIRE', label: 'WHITE SAPPHIRE' },
        { value: 'YELLOW SAPPHIRE', label: 'YELLOW SAPPHIRE' }
      ],
      shapeOptions: [
        { value: 'BAG', label: 'BAG' },
        { value: 'CAB', label: 'CAB' },
        { value: 'MQ', label: 'MQ' },
        { value: 'OCT', label: 'OCT' },
        { value: 'OV', label: 'OV' },
        { value: 'PS', label: 'PS' },
        { value: 'RD', label: 'RD' },
        { value: 'SQ/PC', label: 'SQ/PC' },
        { value: 'TR', label: 'TR' },
        { value: 'SQ', label: 'SQ' }],
      clarityOptions: [
        { value: 'Loup Clean', label: 'Loup Clean' },
        { value: 'Eye Clean', label: 'Eye Clean' },
        { value: 'Commercial', label: 'Commercial' }],
      unitOfWeightOptions: [
        { value: 'ct', label: 'ct' },
        { value: 'g', label: 'g' },
        { value: 'kg', label: 'kg' }
      ],
      enhanceOptions: [
        { value: 'Natural', label: 'Natural' },
        { value: 'Heat', label: 'Heat' },
        { value: 'Unheat', label: 'Unheat' },
        { value: 'Diffusion', label: 'Diffusion' }
      ],
      materialOptions: [
        { value: 'Rough stones', label: 'Rough stones' },
        { value: 'Preform', label: 'Preform' },
        { value: 'Cut stones', label: 'Cut stones' }
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
          { required: true, message: 'GEMSTONE' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        shape: [
          { required: true, message: 'SHAPE' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        size: [
          { required: true, message: 'SIZE' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        color: [
          { required: true, message: 'COLORNOTE' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        clarity: [
          { required: true, message: 'CLARITY' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        // quantity: [
        //  { required: true, message: 'PIECES' + this.$t('common.isRequired'), trigger: 'blur' }
        // ],
        // weight: [
        //  { required: true, message: 'WEIGHT' + this.$t('common.isRequired'), trigger: 'blur' }
        // ],
        enhance: [
          { required: true, message: 'TREATMENT' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        material: [
          { required: true, message: 'MATERIAL' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        dueDate: [
          { required: true, message: 'CLOSE DATE' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        stoneUseFor: [
          { required: true, message: 'USE FOR' + this.$t('common.isRequired'), trigger: 'blur' }
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
      // 添加loading页面
      let loadingInstance
      const loadingOption = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$refs['form'].validate((valid) => {
        if (valid) {
          loadingInstance = Loading.service(loadingOption)
          saveTender({
            name: this.form.name,
            shape: this.form.shape,
            size: this.form.size,
            color: this.form.color,
            colorNote: this.form.colorNote,
            clarity: this.form.clarity,
            quantity: this.form.quantity,
            weight: this.form.weight,
            unitOfWeight: this.form.unitOfWeight,
            enhance: this.form.enhance,
            material: this.form.material,
            dueDate: this.form.dueDate,
            note: this.form.note,
            stoneUseFor: this.form.stoneUseFor
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
          material: rowData.material,
          dueDate: rowData.dueDate,
          status: rowData.status
        }
      })
    }

  }
}
