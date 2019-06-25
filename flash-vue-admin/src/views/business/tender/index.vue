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
      <el-row>
        <el-col :span="24">
          <el-button type="success" icon="el-icon-plus" @click.native="add">{{ $t('button.add') }}</el-button>
          <el-button type="danger" icon="el-icon-delete" @click.native="remove">{{ $t('button.delete') }}</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
              @current-change="handleCurrentChange">

      <el-table-column label="编号">
        <template slot-scope="scope">
          {{scope.row.no}}
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
      <el-table-column label="数量">
        <template slot-scope="scope">
          {{scope.row.quantity}}
        </template>
      </el-table-column>
      <el-table-column label="单位">
        <template slot-scope="scope">
          {{scope.row.unit}}
        </template>
      </el-table-column>
      <el-table-column label="处理方式">
        <template slot-scope="scope">
          {{scope.row.heated}}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{scope.row.status}}
        </template>
      </el-table-column>
      <el-table-column label="到期日期">
        <template slot-scope="scope">
          {{scope.row.dueDate}}
        </template>
      </el-table-column>
      <el-table-column label="已投标数">
        <template slot-scope="scope">
          {{scope.row.count}}
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="button" @click="addBid(scope.row)">{{$t('business.bid')}}</el-button>
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
      :title="formTitle"
      :visible.sync="formVisible"
      width="70%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-select v-model="form.name" placeholder="请选择">
                <el-option
                  v-for="item in nameOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="形状" prop="shape">
              <el-select v-model="form.shape" placeholder="请选择">
                <el-option
                  v-for="item in shapeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="尺寸" prop="dimension">
              <el-input v-model="form.dimension"  minlength=1></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="颜色" prop="color">
              <el-input v-model="form.color"  minlength=1></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="净度" prop="purity">
              <el-select v-model="form.purity" placeholder="请选择">
                <el-option
                  v-for="item in purityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数量" prop="quantity">
              <el-input v-model="form.quantity"></el-input>
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
            <el-form-item label="处理方式" prop="heated">
              <el-select v-model="form.heated" placeholder="请选择">
                <el-option
                  v-for="item in heatedOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到期日期">
              <el-date-picker type="date" placeholder="到期日期" v-model="form.dueDate" style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>
        <el-form-item>
          <el-button type="primary" @click="save">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="formVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :title="bidFormTitle"
      :visible.sync="bidFormVisible"
      width="70%">
      <el-form ref="bidForm" :model="bidForm" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="编号" prop="no">
              <el-input v-model="bidForm.no" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="bidForm.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-input v-model="bidForm.type" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数量" prop="quantity">
              <el-input v-model="bidForm.quantity" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-input v-model="bidForm.status" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束日期" prop="dueDate">
              <el-input v-model="bidForm.dueDate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" prop="contact">
              <el-input v-model="bidForm.contact" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- bid信息 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="数量" prop="bidQuantity">
              <el-input v-model="bidForm.bidQuantity" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="bidUnit">
              <el-input v-model="bidForm.bidUnit" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投标联系人" prop="bidContact">
              <el-input v-model="bidForm.bidContact" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="saveBid">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="bidFormVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</div>
</template>

<script src="./tender.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

