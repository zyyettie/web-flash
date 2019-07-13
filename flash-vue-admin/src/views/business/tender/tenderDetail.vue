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
            <el-form-item label="发标编号" prop="no">
              <el-input v-model="bidForm.no" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="bidForm.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="形状" prop="shape">
              <el-input v-model="bidForm.shape" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="尺寸" prop="dimension">
              <el-input v-model="bidForm.dimension" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="颜色" prop="color">
              <el-input v-model="bidForm.color" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="净度" prop="purity">
              <el-input v-model="bidForm.purity" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数量" prop="quantity">
              <el-input v-model="bidForm.quantity" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="unit">
              <el-input v-model="bidForm.unit" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理方式" prop="heated">
              <el-input v-model="bidForm.heated" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-input v-model="bidForm.status" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到期日期" prop="dueDate">
              <el-input v-model="bidForm.dueDate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
    </el-form>

    <el-steps :sapce="200" :active=-1 finish-status="success">
      <el-step title="1. 发标团队选择供应商"></el-step>
      <el-step title="2. 供应商发货"></el-step>
      <el-step title="3. 收获并检测"></el-step>
      <el-step title="4. 发标团队确认购买数量、价格"></el-step>
      <el-step title="5. 供应商确认,并送达发票"></el-step>
      <el-step title="6. 收到发票，付款结算"></el-step>
    </el-steps>
    <!-- 投标列表 -->
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
              @current-change="handleCurrentChange">
      <el-table-column label="投标id" v-if=false>
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="投标编号">
        <template slot-scope="scope">
          {{scope.row.no}}
        </template>
      </el-table-column>
      <el-table-column label="单位">
        <template slot-scope="scope">
          {{scope.row.unit}}
        </template>
      </el-table-column>
      <el-table-column label="数量">
        <template slot-scope="scope">
          {{scope.row.quantity}}
        </template>
      </el-table-column>
      <el-table-column label="价格">
        <template slot-scope="scope">
          {{scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column label="投标人">
        <template slot-scope="scope">
          {{scope.row.contact}}
        </template>
      </el-table-column>
      <el-table-column label="是否中标">
        <template slot-scope="scope">
          {{scope.row.isApproved}}
        </template>
      </el-table-column>
      <el-table-column label="投标状态">
        <template slot-scope="scope">
          {{scope.row.status}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.isApproved === 0">
          <el-button type="button" @click="approve(scope.row.id)">{{$t('business.accept')}}</el-button>
          <el-button type="button" @click="deny(scope.row.id)">{{$t('business.deny')}}</el-button>
          </div>
          <div v-else>
            <div v-if="scope.row.status === 1 || scope.row.status === 3 || scope.row.status === 4 || scope.row.status === 6">
              <el-button type="button" @click="changeStatus(scope.row)">{{$t('business.nextStep')}}</el-button>
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
        <el-steps :sapce="200" :active="statusForm.status" finish-status="success">
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
          <el-button type="primary" @click="nextStep(statusForm.id)">{{ $t('button.submit') }}</el-button>
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

