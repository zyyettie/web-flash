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
    <el-form ref="bidForm" :model="bidForm" :rules="rules" :label-position="labelPosition" label-width="160px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="ORDER REF.NO." prop="no">
              <el-col :span="12">
              <el-input v-model="bidForm.no" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="GEMSTONE" prop="name">
              <el-col :span="12">
              <el-input v-model="bidForm.name" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SHAPE" prop="shape">
              <el-col :span="12">
              <el-input v-model="bidForm.shape" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SIZE" prop="size">
              <el-col :span="12">
              <el-input v-model="bidForm.size" :disabled="true"></el-input>
              </el-col>
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
              <el-col :span="12">
              <el-input v-model="bidForm.clarity" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="QUANTITY" prop="quantity">
              <el-col :span="12">
              <el-input v-model="bidForm.quantity" :disabled="true"></el-input>
              </el-col>
              <el-col :span="4">
              <el-input v-model="bidForm.unitOfQuantity" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="TREATMENT" prop="enhance">
              <el-col :span="12">
              <el-input v-model="bidForm.enhance" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="MATERIAL" prop="material">
              <el-col :span="12">
              <el-input v-model="bidForm.material" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="PRICE RANGE(THB)" prop="note">
              <el-col :span="12">
              <el-input v-model="bidForm.note" :disabled="true"></el-input>
              </el-col>
              <el-col :span="4">
              <el-input v-model="bidForm.unitOfNote" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="ORDER STATUS" prop="status">
              <el-col :span="12">
              <el-input v-model="bidForm.status" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CLOSE DATE" prop="dueDate">
              <el-col :span="12">
              <el-input v-model="bidForm.dueDate" :disabled="true"></el-input>
              </el-col>
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
      <el-table-column label="EDIT" width="160px" header-align="center" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.isApproved === 0">
          <div style="float:left">
          <el-button size="mini" type="button" @click="approve(scope.row.id)">{{$t('business.accept')}}</el-button>
          </div>
          <div style="float:right">
          <el-button size="mini" type="button" @click="deny(scope.row.id)">{{$t('business.deny')}}</el-button>
          </div>
          </div>
          <div v-else>
            <div v-if="scope.row.status === 2 || scope.row.status === 3 || scope.row.status === 5">
              <el-button size="mini" type="button" @click="changeStatus(scope.row)">{{$t('business.nextStep')}}</el-button>
            </div>
            <div v-else>
              <el-button size="mini" type="button" :disabled="true">{{$t('business.nextStep')}}</el-button>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="ORDER NO." width="160px" header-align="center" align="center" v-if=false>
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="ORDER REF.NO." width="160px" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.no}}
        </template>
      </el-table-column>
      <el-table-column label="QUANTITY" width="120px" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.quantity}} {{scope.row.unitOfBidQuantity}}
        </template>
      </el-table-column>
      <el-table-column label="PRICE" width="120px" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.price}}/{{scope.row.unitOfBidPrice}}
        </template>
      </el-table-column>
      <el-table-column label="DELIVER TYPE" width="160px" header-align="center" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.deliverType === 1">Sent By Messenger</p>
          <p v-else-if="scope.row.deliverType === 2">Express</p>
          <p v-else-if="scope.row.deliverType === 3">Other Way</p>
          <p v-else></p>
        </template>
      </el-table-column>
      <el-table-column label="DELIVER NO." width="140px" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.deliverNo}}
        </template>
      </el-table-column>
      <el-table-column label="CONFIRMED QUANTITY" width="190px" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.confirmedQuantity}} {{scope.row.confirmedQuantityUnit}}
        </template>
      </el-table-column>
      <el-table-column label="CONFIRMED PRICE" width="160px" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.confirmedPrice}} THB/{{scope.row.confirmedPriceUnit}}
        </template>
      </el-table-column>
      <el-table-column label="SUPPLIER" width="200px" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.contact}}
        </template>
      </el-table-column>
      <el-table-column label="ORDER ACCEPT STATE" width="200px" header-align="center" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.isApproved===1">Approved</p>
          <p v-else-if="scope.row.isApproved===-1">Denied</p>
          <p v-else>Undecided</p>
        </template>
      </el-table-column>
      <el-table-column label="INVOICE" width="140px" header-align="center" align="center">
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
      <el-table-column label="PAYMENT" width="140px" header-align="center" align="center">
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
      <el-table-column label="ORDER STEP" width="120px" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.status}}
        </template>
      </el-table-column>

    </el-table>

    <!-- =============================================================================================-->
    <!-- UPDATE STATE 弹出框-->
    <el-dialog
          :title="statusFormTitle"
          :visible.sync="statusFormVisible"
          width="70%">
      <el-form ref="statusForm" :model="statusForm" :rules="rules" :label-position="labelPosition" label-width="160px">
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
          <!-- 确认供应商发货数量是否正确-->
          <div v-if="statusForm.status === 2">
          <el-col :span="12">
            <el-form-item label="DELIVER QUANTITY CORRECT" prop="isDeliverQuantityCorrect">
              <el-col :span="12">
              <el-select v-model="statusForm.isDeliverQuantityCorrect" placeholder="please select">
                  <el-option
                    v-for="item in isDeliverQuantityCorrectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          </div>
          <!-- 确认数量/价格-->
          <div v-else-if="statusForm.status === 3">
          <el-col :span="12">
            <el-form-item label="CONFIRMED QUANTITY" prop="confirmedQuantity">
            <el-col :span="9">
              <el-input v-model="statusForm.confirmedQuantity" ></el-input>
            </el-col>
            <el-col :span="9">
            <el-select v-model="statusForm.confirmedQuantityUnit" placeholder="please select">
                <el-option
                  v-for="item in confirmedQuantityUnitOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
            </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CONFIRMED PRICE" prop="confirmedPrice">
              <el-col :span="9">
              <!--<el-input v-model="statusForm.confirmedPrice" v-on:blur="calculateUnitPrice"></el-input>-->
              <el-input v-model="statusForm.confirmedPrice"></el-input>
              </el-col>
              <el-col :span="9">
              <el-select v-model="statusForm.confirmedPriceUnit" placeholder="please select">
                  <el-option
                    v-for="item in confirmedPriceUnitOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
              </el-col>
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

