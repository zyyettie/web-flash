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
          <el-button type="danger" icon="el-icon-delete" @click.native="remove">{{ $t('button.delete') }}</el-button>
        </el-col>
      </el-row>
    </div>

    <el-steps :sapce="200" :active=-1 finish-status="success">
      <el-step title="1. 发标团队选择供应商"></el-step>
      <el-step title="2. 供应商发货"></el-step>
      <el-step title="3. 收获并检测"></el-step>
      <el-step title="4. 发标团队确认购买数量、价格"></el-step>
      <el-step title="5. 供应商确认,并送达发票"></el-step>
      <el-step title="6. 收到发票，付款结算"></el-step>
    </el-steps>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
              @current-change="handleCurrentChange">

      <el-table-column label="投标ID" v-if="false">
        <template slot-scope="scope">
          {{scope.row.bidId}}
        </template>
      </el-table-column>
      <el-table-column label="投标编号">
        <template slot-scope="scope">
          {{scope.row.no}}
        </template>
      </el-table-column>
      <el-table-column label="发标编号">
        <template slot-scope="scope">
          {{scope.row.tenderNo}}
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="形状">
        <template slot-scope="scope">
          {{scope.row.shape}}
        </template>
      </el-table-column>
      <el-table-column label="尺寸">
        <template slot-scope="scope">
          {{scope.row.dimension}}
        </template>
      </el-table-column>
      <el-table-column label="颜色">
        <template slot-scope="scope">
          {{scope.row.color}}
        </template>
      </el-table-column>
      <el-table-column label="净度">
        <template slot-scope="scope">
          {{scope.row.purity}}
        </template>
      </el-table-column>
      <el-table-column label="处理方式">
        <template slot-scope="scope">
          {{scope.row.heated}}
        </template>
      </el-table-column>
      <el-table-column label="投标数量">
        <template slot-scope="scope">
          {{scope.row.quantity}}
        </template>
      </el-table-column>
      <el-table-column label="投标单位">
        <template slot-scope="scope">
          {{scope.row.unit}}
        </template>
      </el-table-column>
      <el-table-column label="投标价格">
        <template slot-scope="scope">
          {{scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column label="是否批准">
        <template slot-scope="scope">
          {{scope.row.isApproved}}
        </template>
      </el-table-column>
      <el-table-column label="投标状态">
        <template slot-scope="scope">
          {{scope.row.bidStatus}}
        </template>
      </el-table-column>
      <!--el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="button" @click="editBid(scope.row)">{{$t('button.edit')}}</el-button>
        </template>
      </el-table-column-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.isApproved === 0">
            <el-button type="button" @click="editBid(scope.row)">{{$t('button.edit')}}</el-button>
          </div>
          <div v-else>
            <div v-if="scope.row.bidStatus === 2 || scope.row.bidStatus === 5">
              <el-button type="button" @click="changeVendorStatus(scope.row)">{{$t('business.nextStep')}}</el-button>
            </div>
            <div v-else>
              <el-button type="button" :disabled="true">{{$t('business.nextStep')}}</el-button>
            </div>
          </div>
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
    
    <!-- 修改投标 -->
    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="70%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="编号" prop="no">
              <el-input v-model="form.no" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="形状" prop="shape">
              <el-input v-model="form.shape" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="尺寸" prop="dimension">
              <el-input v-model="form.dimension" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="颜色" prop="color">
              <el-input v-model="form.color" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="净度" prop="purity">
              <el-input v-model="form.purity" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数量" prop="quantity">
              <el-input v-model="form.tenderQuantity" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="unit">
              <el-input v-model="form.tenderUnit" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理方式" prop="heated">
              <el-input v-model="form.heated" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="tenderStatus">
              <el-input v-model="form.tenderStatus" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到期日期" prop="dueDate">
              <el-input v-model="form.dueDate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- bid信息 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="数量" prop="bidQuantity">
              <el-input v-model="form.quantity" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="unit">
              <el-select v-model="form.unit" placeholder="请选择">
                <el-option
                  v-for="item in unitOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格" prop="bidPrice">
              <el-input v-model="form.price" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="save">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="formVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 更改状态Dialog -->
  <el-dialog
          :title="statusFormTitle"
          :visible.sync="statusFormVisible"
          width="70%">
      <el-form ref="statusForm" :model="statusForm" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="发标编号" prop="no">
              <el-input v-model="statusForm.no" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
        <el-steps :sapce="200" :active="statusForm.bidStatus" finish-status="success">
        <el-step title="1. 发标团队选择供应商"></el-step>
        <el-step title="2. 供应商发货"></el-step>
        <el-step title="3. 收获并检测"></el-step>
        <el-step title="4. 发标团队确认购买数量、价格"></el-step>
        <el-step title="5. 供应商确认,并送达发票"></el-step>
        <el-step title="6. 收到发票，付款结算"></el-step>
        </el-steps>
        </el-row>
        <br>
        <el-row>
        <el-table
        :data="statusData" style="width: 50%">
        <el-table-column
          prop="host"
          label="发标方"
          width="300">
        </el-table-column>
        <el-table-column
          prop="vendor"
          label="供应商"
          width="300">
        </el-table-column>
        </el-table>
        </el-row>
        <br>
        <br>
        <el-form-item>
          <el-button type="primary" @click="nextStep(statusForm.bidId)">{{ $t('button.submit') }}</el-button>
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

