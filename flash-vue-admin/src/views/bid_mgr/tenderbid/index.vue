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
        <el-col :span="3">
          <el-input v-model="listQuery.shape" placeholder="SHAPE"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.size" placeholder="SIZE"></el-input>
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
          <el-button size="mini" type="button" @click="addBid(scope.row)" :disabled="isBidAlready(scope.row)">{{$t('business.bid')}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="发标ID" v-if="false">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="ORDER REF.NO." :render-header="labelHead">
        <template slot-scope="scope">
          {{scope.row.no}}
        </template>
      </el-table-column>
      <el-table-column label="GEMSTONE" :render-header="labelHead">
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
      <el-table-column label="PIECES" :render-header="labelHead">
        <template slot-scope="scope">
          {{scope.row.quantity}}
        </template>
      </el-table-column>
      <el-table-column label="CLARITY" :render-header="labelHead">
        <template slot-scope="scope">
          {{scope.row.clarity}}
        </template>
      </el-table-column>
      <el-table-column label="TREATMENT" :render-header="labelHead">
        <template slot-scope="scope">
          {{scope.row.enhance}}
        </template>
      </el-table-column>
      <el-table-column label="MATERIAL" :render-header="labelHead">
        <template slot-scope="scope">
          {{scope.row.material}}
        </template>
      </el-table-column>
      <el-table-column label="PRICE RANGE" :render-header="labelHead">
        <template slot-scope="scope">
          {{scope.row.note}}
        </template>
      </el-table-column>
      <el-table-column label="CLOSE DATE" :render-header="labelHead">
        <template slot-scope="scope">
          {{scope.row.dueDate}}
        </template>
      </el-table-column>
      <el-table-column label="ORDER STATE" :render-header="labelHead">
        <template slot-scope="scope">
          {{scope.row.status}}
        </template>
      </el-table-column>
      <el-table-column label="Purchase User" :render-header="labelHead">
        <template slot-scope="scope">
          {{scope.row.userName}}
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
      <div slot="title">
        <span>ORDER REF.NO.:</span>
        <el-input v-model="bidForm.no" :disabled="true" style="width:300px"></el-input>
        <span style="float:right; margin-right:25px; color:green" >OPEN ORDER</span>
      </div>
      <el-form ref="bidForm" :model="bidForm" :rules="rules" :label-position="labelPosition" label-width="160px">
        <!-- tender信息 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="GEMSTONE" prop="name">
              <el-col :span="12">
              <el-input v-model="bidForm.name" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="COLOR" prop="color">
              <el-tag :color="bidForm.color"></el-tag>
              <el-col :span="12">
              <el-input v-model="bidForm.colorNote" :disabled="true"></el-input>
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
            <el-form-item label="SIZE(mm)" prop="size">
              <el-col :span="12">
              <el-input v-model="bidForm.size" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="QUANTITY" prop="quantity">
              <el-col :span="12">
              <el-input v-model="bidForm.quantity" :disabled="true"></el-input>
              </el-col>
              <el-col :span="6">
              <el-input v-model="bidForm.unitOfQuantity" :disabled="true"></el-input>
              </el-col>
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
            <el-form-item label="PRICE RANGE" prop="note">
              <el-col :span="12">
              <el-input v-model="bidForm.note" :disabled="true"></el-input>
              </el-col>
              <el-col :span="6">
              <el-input v-model="bidForm.unitOfNote" :disabled="true"></el-input>
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

        <!-- 分隔线 -->
        <el-divider></el-divider>
        <br>
        <br>
        <!-- bid信息 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="SUPPLIER AVAILABLE QUANTITY"  prop="bidQuantity" >
              <el-col :span="12">
              <el-input v-model="bidForm.bidQuantity" ></el-input>
              </el-col>
              <el-col :span="12">
              <el-select v-model="bidForm.unitOfBidQuantity" style="width:60%" placeholder="please select">
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
            <el-form-item label="UNIT PRICE (THB)"  prop="bidPrice">
              <el-col :span="12">
              <el-input v-model="bidForm.bidPrice" ></el-input>
              </el-col>
              <el-col :span="12">
              <el-select v-model="bidForm.unitOfBidPrice" style="width:60%" placeholder="please select">
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
        <br>
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

