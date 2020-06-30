import { delTender, getTenderList, saveTender, closeTender } from '@/api/business/tender'
import { Loading } from 'element-ui'

export default {
  data() {
    return {
      intervalId: null,
      labelPosition: 'left',
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
        unitOfQuantity: '',
        enhance: '',
        material: '',
        dueDate: '',
        note: '',
        unitOfNote: '',
        stoneUseFor: ''
      },
      listQuery: {
        page: 1,
        limit: 10,
        name: '',
        colorNote: '',
        shape: '',
        size: ''
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
      unitOfQuantityOptions: [
        { value: 'piece', label: 'piece' },
        { value: 'carat', label: 'carat' }
      ],
      unitOfNoteOptions: [
        { value: 'piece', label: 'piece' },
        { value: 'carat', label: 'carat' }
      ],
      enhanceOptions: [
        { value: 'Natural', label: 'Natural' },
        { value: 'Heat', label: 'Heat' },
        { value: 'Unheat', label: 'Unheat' },
        { value: 'Diffusion', label: 'Diffusion' },
        { value: 'Beryllium', label: 'Beryllium' }
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
        colorNote: [
          { required: true, message: 'COLOR NOTE' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        clarity: [
          { required: true, message: 'CLARITY' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: 'QUANTITY' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        unitOfQuantity: [
          { required: true, message: 'Unit of quantity' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        enhance: [
          { required: true, message: 'TREATMENT' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        material: [
          { required: true, message: 'MATERIAL' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        note: [
          { required: true, message: 'PRICE RANGE(THB)' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        unitOfNote: [
          { required: true, message: 'Unit of Price Range' + this.$t('common.isRequired'), trigger: 'blur' }
        ],
        dueDate: [
          { required: true, message: 'CLOSE DATE' + this.$t('common.isRequired'), trigger: 'change' }
        ],
        stoneUseFor: [
          { required: true, message: 'USE FOR' + this.$t('common.isRequired'), trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
    this.dataRefreh()
  },
  destroyed() {
    // 在页面销毁后，清除计时器
    this.clear()
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
      getTenderList(this.listQuery).then(response => {
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
      this.listQuery.colorNote = ''
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
    resetForm() {
      this.form = {
        name: '',
        shape: '',
        size: '',
        color: '#BF2929',
        clarity: '',
        quantity: '',
        unitOfQuantity: '',
        enhance: '',
        dueDate: '',
        note: '',
        unitOfNote: '',
        stoneUseFor: ''
      }
    },
    add() {
      this.clear()
      this.resetForm()
      this.formTitle = this.$t('business.addTender')
      this.formVisible = true
      this.isAdd = true
    },
    cancel() {
      this.formVisible = false
      this.dataRefreh()
    },
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 添加loading页面
          const loadingOption = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          const loadingInstance = Loading.service(loadingOption)
          saveTender({
            name: this.form.name,
            shape: this.form.shape,
            size: this.form.size,
            color: this.form.color,
            colorNote: this.form.colorNote,
            clarity: this.form.clarity,
            quantity: this.form.quantity,
            unitOfQuantity: this.form.unitOfQuantity,
            enhance: this.form.enhance,
            material: this.form.material,
            dueDate: this.form.dueDate,
            note: this.form.note,
            unitOfNote: this.form.unitOfNote,
            stoneUseFor: this.form.stoneUseFor
          }).then(response => {
            loadingInstance.close()
            this.$message({
              message: this.$t('common.optionSuccess'),
              type: 'success'
            })
            this.dataRefreh()
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
    closeTender(row) {
      this.selRow = row
      if (this.checkSel()) {
        var id = this.selRow.id
        this.$confirm(this.$t('business.closeConfirm'), this.$t('common.tooltip'), {
          confirmButtonText: this.$t('button.submit'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning'
        }).then(() => {
          closeTender(id).then(response => {
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
          colorNote: rowData.colorNote,
          clarity: rowData.clarity,
          quantity: rowData.quantity,
          unitOfQuantity: rowData.unitOfQuantity,
          enhance: rowData.enhance,
          material: rowData.material,
          note: rowData.note,
          unitOfNote: rowData.unitOfNote,
          dueDate: rowData.dueDate,
          status: rowData.status
        }
      })
    },
    // 定时刷新数据函数
    dataRefreh() {
    // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        console.log('refresh ' + new Date())
        this.init() // 加载数据函数
      }, 60000)
    },
    // 停止定时器
    clear() {
      clearInterval(this.intervalId) // 清除计时器
      this.intervalId = null // 设置为null
    }
  }
}
