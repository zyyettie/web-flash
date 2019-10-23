<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="listQuery.name" placeholder="please input tender name"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="success" icon="el-icon-search" @click.native="search">{{ $t('button.search') }}</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click.native="reset">{{ $t('button.reset') }}</el-button>
          
        </el-col>
      </el-row>
      <br>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
              @current-change="handleCurrentChange">

      <el-table-column label="EDIT" >
        <template slot-scope="scope">
          <el-button type="button" @click="addBid(scope.row)" :disabled="isBidAlready(scope.row)">{{$t('business.bid')}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="发标ID" v-if="false">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="ORDER REF.NO.">
        <template slot-scope="scope">
          {{scope.row.no}}
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
      <el-table-column label="SIZE">
        <template slot-scope="scope">
          {{scope.row.size}}
        </template>
      </el-table-column>
      <el-table-column label="PIECES">
        <template slot-scope="scope">
          {{scope.row.quantity}}
        </template>
      </el-table-column>
      <el-table-column label="WEIGHT">
        <template slot-scope="scope">
          {{scope.row.weight}}{{scope.row.unitOfWeight}}
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
      <el-table-column label="NOTE">
        <template slot-scope="scope">
          {{scope.row.note}}
        </template>
      </el-table-column>
      <el-table-column label="CLOSE DATE">
        <template slot-scope="scope">
          {{scope.row.dueDate}}
        </template>
      </el-table-column>
      <el-table-column label="ORDER STATE">
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

    <el-dialog
      :title="bidFormTitle"
      :visible.sync="bidFormVisible"
      width="70%">
      <el-form ref="bidForm" :model="bidForm" :rules="rules" label-width="80px">
        <!-- tender信息 -->
        <el-row>
          <el-col :span="24">
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
            <el-form-item label="COLOR" prop="color">
              <el-tag :color="bidForm.color"></el-tag>
              <el-col :span="9">
              <el-input v-model="bidForm.colorNote" :disabled="true"></el-input>
              </el-col>
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
            <el-form-item label="PIECES" prop="quantity">
              <el-input v-model="bidForm.quantity" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="WEIGHT" prop="weight">
              <el-col :span="12">
              <el-input v-model="bidForm.weight" :disabled="true"></el-input>
              </el-col>
              <el-col :span="12">
              <el-input v-model="bidForm.unitOfWeight" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CLARITY" prop="clarity">
              <el-input v-model="bidForm.clarity" :disabled="true"></el-input>
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
            <el-form-item label="CLOSE DATE" prop="dueDate">
              <el-input v-model="bidForm.dueDate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="NOTE" prop="note">
              <el-input v-model="bidForm.note" :disabled="true"></el-input>
            </el-form-item>
          <el-col :span="12">
            <el-form-item label="ORDER STATE" prop="status">
              <el-input v-model="bidForm.status" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          </el-col>
        </el-row>
        <!-- bid信息 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="SUPPLIER SUPPLY QUANTITY" prop="bidQuantity">
              <el-input v-model="bidForm.bidQuantity" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SUPPLIER SUPPLY WEIGHT" prop="weight">
              <el-col :span="12">
              <el-input v-model="bidForm.weight"></el-input>
              </el-col>
              <el-col :span="12">
              <el-input v-model="bidForm.unitOfWeight"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="PRICE" prop="bidPrice">
              <el-input v-model="bidForm.bidPrice" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="save">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="bidFormVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</div>
</template>

<script src="./tenderbid.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

