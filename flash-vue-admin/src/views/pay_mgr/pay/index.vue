<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input v-model="listQuery.name" placeholder="GEMSTONE"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.colorNote" placeholder="COLOR"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="success" icon="el-icon-search" @click.native="search">{{ $t('button.search') }}</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click.native="reset">{{ $t('button.reset') }}</el-button>
          
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="24">
          <!--el-button type="primary" icon="el-icon-edit" @click.native="edit">{{ $t('button.edit') }}</el-button-->
          <!--el-button type="danger" icon="el-icon-delete" @click.native="remove">{{ $t('button.delete') }}</el-button-->
        </el-col>
      </el-row>
    </div>

    <el-steps :sapce="200" :active=-1 finish-status="success">
      <el-step title="1. Purchase confirm supplier"></el-step>
      <el-step title="2. Supplier ship gemstone"></el-step>
      <el-step title="3. Receipted gemstone and in checking process"></el-step>
      <el-step title="4. Confirm final quantity/price and issue purchase bill"></el-step>
      <el-step title="5. Confirmed by supplier and issue tax invoice"></el-step>
      <el-step title="6. Received invoice"></el-step>
      <el-step title="7. Finished payment"></el-step>
    </el-steps>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
              @current-change="handleCurrentChange">

      <el-table-column label="EDIT">
        <template slot-scope="scope">
          <div v-if="scope.row.isApproved === 0">
            <el-button type="button" @click="editBid(scope.row)">EDIT</el-button>
          </div>
          <div v-else>
            <div v-if="scope.row.status === 6">
              <el-button type="button" @click="changeVendorStatus(scope.row)">{{$t('business.nextStep')}}</el-button>
            </div>
            <div v-else>
              <el-button type="button" :disabled="true">{{$t('business.nextStep')}}</el-button>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="投标id" v-if="false">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="BID REF.NO.">
        <template slot-scope="scope">
          {{scope.row.no}}
        </template>
      </el-table-column>
      <el-table-column label="ORDER REF.NO.">
        <template slot-scope="scope">
          {{scope.row.tenderNo}}
        </template>
      </el-table-column>
      <el-table-column label="GEMSTONE">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="COLOR">
        <template slot-scope="scope">
          <el-tag :color="scope.row.color"></el-tag>{{scope.row.colorNote}}
        </template>
      </el-table-column>
      <el-table-column label="PAYMENT TERMS">
        <template slot-scope="scope">
          {{scope.row.paymentTerms}}
        </template>
      </el-table-column>
      <el-table-column label="PAYMENT TYPE">
        <template slot-scope="scope">
          {{scope.row.paymentType}}
        </template>
      </el-table-column>
      
      <el-table-column label="INVOICE">
        <template slot-scope="scope">
        <div v-if="scope.row.invoiceIdFile!=='' && scope.row.invoiceIdFile!==null && scope.row.invoiceIdFile!==undefined">
          <el-popover
            placement="right"
            title=""
            trigger="click">
            <img :src="scope.row.invoiceImg"/>
            <img slot="reference" :src="scope.row.invoiceImg" :alt="scope.row.invoiceImg" style="max-height: 80px;max-width: 80px">
          </el-popover>
        </div>
        </template>
      </el-table-column>
      <el-table-column label="PAYMENT">
        <template slot-scope="scope">
        <div v-if="scope.row.idFile!=='' && scope.row.idFile!==null && scope.row.idFile!==undefined">
          <el-popover
            placement="right"
            title=""
            trigger="click">
            <img :src="scope.row.img"/>
            <img slot="reference" :src="scope.row.img" :alt="scope.row.img" style="max-height: 80px;max-width: 80px">
          </el-popover>
        </div>
        </template>
      </el-table-column>
      <el-table-column label="ORDER STEP">
        <template slot-scope="scope">
          {{scope.row.status}}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 50, 100,500]"
      :page-size="listQuery.limit"
      :total="total"
      @size-change="changeSize"
      @current-change="fetchPage"
      @prev-click="fetchPrev"
      @next-click="fetchNext">
    </el-pagination>
    <!-- ================================================================================================= -->
    <!-- 更改状态Dialog弹出框 -->
  <el-dialog
          :title="statusFormTitle"
          :visible.sync="statusFormVisible"
          width="70%">
      <el-form ref="statusForm" :model="statusForm" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="ORDER REF.NO." prop="no">
              <el-input v-model="statusForm.no" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
        <el-steps :sapce="200" :active="statusForm.status" finish-status="success">
          <el-step title="1. Purchase confirm supplier"></el-step>
          <el-step title="2. Supplier ship gemstone"></el-step>
          <el-step title="3. Receipted gemstone and in checking process"></el-step>
          <el-step title="4. Confirm final quantity/price and issue purchase bill"></el-step>
          <el-step title="5. Confirmed by supplier and issue tax invoice"></el-step>
          <el-step title="6. Received invoice"></el-step>
          <el-step title="7. Finished payment"></el-step>
        </el-steps>
        </el-row>
        <br>
        <el-row>
        <el-table
        :data="statusData" style="width: 65%">
        <el-table-column
          prop="host"
          label="PURCHASE"
          width="400">
        </el-table-column>
        <el-table-column
          prop="vendor"
          label="SUPPLIER"
          width="400">
        </el-table-column>
        </el-table>
        </el-row>
        <br>
        <el-row>
          <!-- 上传付款凭证-->
          <div v-if="statusForm.status === 6">
          <el-col :span="12">
            <el-form-item label="EVIDENCE OF PAYMENT">
              <el-upload
                class="upload-demo"
                drag
                :multiple=false
                :action="uploadUrl"
                :headers="uploadHeaders"
                :before-upload="handleBeforeUpload"
                :on-success="handleUploadSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleUploadRemove"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Click to upload or drag files here</div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" append-to-body>
                <img width="100%" fit="contain" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
          </div>
          <!-- 上传付款凭证结束-->
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="nextStepWithAdditionalInfo(statusForm.id)">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="statusFormVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

</div>
</template>

<script src="./pay.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

