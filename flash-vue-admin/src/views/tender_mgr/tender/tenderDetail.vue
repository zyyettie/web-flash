<template>
  <div class="app-container">
    <div class="block">
      <el-row>
        <el-col :span="24">
          <el-button icon="el-icon-back" @click.native="back">{{ $t('button.back') }}</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 标书信息 -->
    <el-form ref="bidForm" :model="bidForm" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="ORDER REF.NO." prop="no">
              <el-input v-model="bidForm.no" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="GEMSTONE" prop="name">
              <el-input v-model="bidForm.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SHAPE" prop="shape">
              <el-input v-model="bidForm.shape" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SIZE" prop="size">
              <el-input v-model="bidForm.size" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="COLOR" prop="color">
              <el-col :span="12">
              <el-input v-model="bidForm.colorNote" :disabled="true"></el-input>
              </el-col>
              <el-tag :color="bidForm.color"></el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CLARITY" prop="clarity">
              <el-input v-model="bidForm.clarity" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="PIECES" prop="quantity">
              <el-input v-model="bidForm.quantity" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="WEIGHT BY PIECE" prop="weight">
              <el-col :span="12">
              <el-input v-model="bidForm.weight" :disabled="true"></el-input>
              </el-col>
              <el-col :span="12">
              <el-input v-model="bidForm.unitOfWeight" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="TREATMENT" prop="enhance">
              <el-input v-model="bidForm.enhance" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="MATERIAL" prop="material">
              <el-input v-model="bidForm.material" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="PRICE RANGE(THB)" prop="note">
              <el-input v-model="bidForm.note" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="ORDER STATUS" prop="status">
              <el-input v-model="bidForm.status" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CLOSE DATE" prop="dueDate">
              <el-input v-model="bidForm.dueDate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
    </el-form>

    <el-steps :sapce="200" :active=-1 finish-status="success">
      <el-step title="1. Purchase confirm supplier"></el-step>
      <el-step title="2. Supplier ship gemstone"></el-step>
      <el-step title="3. Receipted gemstone and in checking process"></el-step>
      <el-step title="4. Confirm final quantity/price and issue purchase bill"></el-step>
      <el-step title="5. Confirmed by supplier and issue tax invoice"></el-step>
      <el-step title="6. Received invoice"></el-step>
      <el-step title="7. Finished payment"></el-step>
    </el-steps>
    <!-- 投标列表 -->
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
              @current-change="handleCurrentChange">
      <el-table-column label="EDIT">
        <template slot-scope="scope">
          <div v-if="scope.row.isApproved === 0">
          <el-button type="button" @click="approve(scope.row.id)">{{$t('business.accept')}}</el-button>
          <el-button type="button" @click="deny(scope.row.id)">{{$t('business.deny')}}</el-button>
          </div>
          <div v-else>
            <div v-if="scope.row.status === 2 || scope.row.status === 3 || scope.row.status === 5">
              <el-button type="button" @click="changeStatus(scope.row)">{{$t('business.nextStep')}}</el-button>
            </div>
            <div v-else>
              <el-button type="button" :disabled="true">{{$t('business.nextStep')}}</el-button>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="ORDER NO." v-if=false>
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="ORDER REF.NO.">
        <template slot-scope="scope">
          {{scope.row.no}}
        </template>
      </el-table-column>
      <el-table-column label="WEIGHT">
        <template slot-scope="scope">
          {{scope.row.weight}}{{scope.row.unitOfWeight}}
        </template>
      </el-table-column>
      <el-table-column label="PIECES">
        <template slot-scope="scope">
          {{scope.row.quantity}}
        </template>
      </el-table-column>
      <el-table-column label="PRICE">
        <template slot-scope="scope">
          {{scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column label="DELIVER TYPE">
        <template slot-scope="scope">
          <p v-if="scope.row.deliverType === 1">Sent By Messenger</p>
          <p v-else-if="scope.row.deliverType === 2">Express</p>
          <p v-else-if="scope.row.deliverType === 3">Other Way</p>
          <p v-else></p>
        </template>
      </el-table-column>
      <el-table-column label="DELIVER NO.">
        <template slot-scope="scope">
          {{scope.row.deliverNo}}
        </template>
      </el-table-column>
      <el-table-column label="CONFIRMED QUANTITY">
        <template slot-scope="scope">
          {{scope.row.confirmedQuantity}}
        </template>
      </el-table-column>
      <el-table-column label="CONFIRMED PRICE">
        <template slot-scope="scope">
          {{scope.row.confirmedPrice}}
        </template>
      </el-table-column>
      <el-table-column label="SUPPLIER">
        <template slot-scope="scope">
          {{scope.row.contact}}
        </template>
      </el-table-column>
      <el-table-column label="ORDER ACCEPT STATE">
        <template slot-scope="scope">
          <p v-if="scope.row.isApproved===1">Approved</p>
          <p v-else-if="scope.row.isApproved===-1">Denied</p>
          <p v-else>Undecided</p>
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
      <el-table-column label="ATTACHMENT">
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
      <el-table-column label="ORDER STATUS">
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
    <!-- =============================================================================================-->
    <!-- UPDATE STATE 弹出框-->
    <el-dialog
          :title="statusFormTitle"
          :visible.sync="statusFormVisible"
          width="70%">
      <el-form ref="statusForm" :model="statusForm" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="ORDER NO." prop="no">
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
          <!-- 确认数量/价格-->
          <div v-if="statusForm.status === 3">
          <el-col :span="12">
            <el-col :span="12">
            <el-form-item label="CONFIRMED QUANTITY" prop="confirmedQuantity">
              <el-input v-model="statusForm.confirmedQuantity" ></el-input>
            </el-form-item>
            </el-col>
            <el-select v-model="statusForm.confirmedQuantityUnit" placeholder="please select">
                <el-option
                  v-for="item in confirmedQuantityUnitOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CONFIRMED PRICE" prop="confirmedPrice">
              <el-col :span="9">
              <el-input v-model="statusForm.confirmedPrice" ></el-input>
              </el-col>
              <el-col :span="9">
              </el-col>
              <el-col :span="9">
              <el-input v-model="statusForm.confirmedUnitPrice" disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          </div>
          <!-- 上传付款凭证-->
          <div v-else-if="statusForm.status === 6">
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
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Click to upload</div>
              </el-upload>
            </el-form-item>
          </el-col>
          </div>
          <div v-else>
          </div>
        </el-row>
        <br>
        <el-form-item>
          <el-button type="primary" @click="nextStepWithAdditionalInfo(statusForm.id)">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="statusFormVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


</div>
</template>

<script src="./tenderDetail.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

