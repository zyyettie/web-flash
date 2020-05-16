<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="listQuery.name" placeholder="please input name"></el-input>
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
      <el-step title="7. Due time inform supplier for payment"></el-step>
    </el-steps>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
              @current-change="handleCurrentChange">

      <el-table-column label="EDIT">
        <template slot-scope="scope">
          <div v-if="scope.row.isApproved === 0">
            <el-button type="button" @click="editBid(scope.row)">EDIT</el-button>
          </div>
          <div v-else>
            <div v-if="scope.row.bidStatus === 1 || scope.row.bidStatus === 4">
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
          {{scope.row.bidId}}
        </template>
      </el-table-column>
      <el-table-column label="ORDER NO.">
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
      <el-table-column label="SHAPE">
        <template slot-scope="scope">
          {{scope.row.shape}}
        </template>
      </el-table-column>
      <el-table-column label="SIZE(mm)">
        <template slot-scope="scope">
          {{scope.row.size}}
        </template>
      </el-table-column>
      <el-table-column label="QUANTITY">
        <template slot-scope="scope">
          {{scope.row.quantity}}
        </template>
      </el-table-column>
      <el-table-column label="CLARITY">
        <template slot-scope="scope">
          {{scope.row.clarity}}
        </template>
      </el-table-column>
      <el-table-column label="TREATMENT">
        <template slot-scope="scope">
          {{scope.row.enhance}}
        </template>
      </el-table-column>
      <el-table-column label="MATERIAL">
        <template slot-scope="scope">
          {{scope.row.material}}
        </template>
      </el-table-column>
      <el-table-column label="PRICE RANGE">
        <template slot-scope="scope">
          {{scope.row.note}}
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
          <p v-if="scope.row.confirmedQuantity===0"></p>
          <p v-else>{{scope.row.confirmedQuantity}}</p>
        </template>
      </el-table-column>
      <el-table-column label="CONFIRMED PRICE">
        <template slot-scope="scope">
          <p v-if="scope.row.confirmedPrice===0"></p>
          <p v-else>{{scope.row.confirmedPrice}}</p>
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
      <el-table-column label="ORDER STATE">
        <template slot-scope="scope">
          {{scope.row.bidStatus}}
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
    <!-- 修改投标弹出框 -->
    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="70%">
      <div slot="title">
        <span>ORDER REF.NO.:</span>
        <el-input v-model="form.no" :disabled="true" style="width:300px"></el-input>
        <span style="float:right; margin-right:25px; color:green" >OPEN ORDER</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" :label-position="labelPosition" label-width="160px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="GEMSTONE" prop="name">
              <el-col :span="12">
              <el-input v-model="form.name" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="COLOR" prop="color">
              <el-tag :color="form.color"></el-tag>
              <el-col :span="12">
              <el-input v-model="form.colorNote" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SHAPE" prop="shape">
              <el-col :span="12">
              <el-input v-model="form.shape" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SIZE(mm)" prop="size">
              <el-col :span="12">
              <el-input v-model="form.size" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="QUANTITY" prop="quantity">
              <el-col :span="12">
              <el-input v-model="form.quantity" :disabled="true"></el-input>
              </el-col>
              <el-col :span="6">
              <el-input v-model="form.unitOfQuantity" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CLARITY" prop="clarity">
              <el-col :span="12">
              <el-input v-model="form.clarity" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="TREATMENT" prop="enhance">
              <el-col :span="12">
              <el-input v-model="form.enhance" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="MATERIAL" prop="material">
              <el-col :span="12">
              <el-input v-model="form.material" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="PIRCE RANGE" prop="note">
              <el-col :span="12">
              <el-input v-model="form.note" :disabled="true"></el-input>
              </el-col>
              <el-col :span="6">
              <el-input v-model="form.unitOfNote" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CLOSE DATE" prop="dueDate">
              <el-col :span="12">
              <el-input v-model="form.dueDate" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 分隔线 -->
        <el-divider></el-divider>
        <br>
        <br>

        <!-- bid信息 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="SUPPLIER AVAILABLE QUANTITY" prop="bidQuantity">
              <el-col :span="12">
              <el-input v-model="form.bidQuantity" ></el-input>
              </el-col>
              <el-col :span="12">
              <el-select v-model="form.unitOfBidQuantity" style="width:60%" placeholder="please select">
                <el-option
                  v-for="item in unitOfBidQuantityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="UNIT PRICE (THB)" prop="bidPrice">
               <el-col :span="12">
              <el-input v-model="form.bidPrice" ></el-input>
              </el-col>
              <el-col :span="12">
              <el-select v-model="form.unitOfBidPrice" style="width:60%" placeholder="please select">
                <el-option
                  v-for="item in unitOfBidPriceOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="save">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="formVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- ================================================================================================= -->
    <!-- 更改状态Dialog弹出框 -->
  <el-dialog
          :title="statusFormTitle"
          :visible.sync="statusFormVisible"
          width="70%">
      <el-form ref="statusForm" :model="statusForm" :rules="rules" :label-position="labelPosition" label-width="160px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="ORDER REF.NO." prop="no">
              <el-input v-model="statusForm.no" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
        <el-steps :sapce="200" :active="statusForm.bidStatus" finish-status="success">
          <el-step title="1. Purchase confirm supplier"></el-step>
          <el-step title="2. Supplier ship gemstone"></el-step>
          <el-step title="3. Receipted gemstone and in checking process"></el-step>
          <el-step title="4. Confirm final quantity/price and issue purchase bill"></el-step>
          <el-step title="5. Confirmed by supplier and issue tax invoice"></el-step>
          <el-step title="6. Received invoice"></el-step>
          <el-step title="7. Due time inform supplier for payment"></el-step>
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
          <!-- 确认快递方式-->
          <div v-if="statusForm.bidStatus === 1">
          <el-col :span="12">
            <el-form-item label="DELIVER TYPE" prop="deliverType">
              <el-select v-model="statusForm.deliverType" placeholder="please select" >
                <el-option
                  v-for="item in deliverTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="DELIVER NO." prop="deliverNo" >
              <el-col :span="12">
              <el-input v-model="statusForm.deliverNo" ></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="MEMO NO." prop="memoNo" >
              <el-col :span="12">
              <el-input v-model="statusForm.memoNo" ></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          </div>
          <!-- 上传发票-->
          <div v-else-if="statusForm.bidStatus === 4">
          <el-row>
            <el-col :span="12">
              <el-form-item label="INVOICE NO" prop="invoiceNo">
                <el-input v-model="statusForm.invoiceNo" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="12">
            <el-form-item label="INVOICE">
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
          <!-- 上传发票结束-->
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="nextStepWithAdditionalInfo(statusForm.bidId)">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="statusFormVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

</div>
</template>

<script src="./bid.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

