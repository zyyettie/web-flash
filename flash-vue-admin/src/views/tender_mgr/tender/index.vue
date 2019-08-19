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

      <el-table-column label="REF.NO.">
        <template slot-scope="scope">
          <el-button type="text" @click.native="viewTender(scope.row)"> {{scope.row.no}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="STONE">
        <template slot-scope="scope">
          {{scope.row.name}}
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
      <el-table-column label="COLOR">
        <template slot-scope="scope">
          <el-tag :color="scope.row.color"></el-tag>{{scope.row.colorNote}}
        </template>
      </el-table-column>
      <el-table-column label="CLARITY">
        <template slot-scope="scope">
          {{scope.row.clarity}}
        </template>
      </el-table-column>
      <el-table-column label="QUANTITY">
        <template slot-scope="scope">
          {{scope.row.quantity}}
        </template>
      </el-table-column>
      <el-table-column label="WEIGHT">
        <template slot-scope="scope">
          {{scope.row.weight}}{{scope.row.unitOfWeight}}
        </template>
      </el-table-column>
      <el-table-column label="ENHANCE">
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
      <el-table-column label="ORDER STATE">
        <template slot-scope="scope">
          {{scope.row.status}}
        </template>
      </el-table-column>
      <el-table-column label="DUE DATE">
        <template slot-scope="scope">
          {{scope.row.dueDate}}
        </template>
      </el-table-column>
      <el-table-column label="BID">
        <template slot-scope="scope">
          {{scope.row.count}}
        </template>
      </el-table-column>
      <el-table-column label="STONE USE FOR">
        <template slot-scope="scope">
          {{scope.row.stoneUseFor}}
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
            <el-form-item label="STONE" prop="name">
              <el-select v-model="form.name" placeholder="please select">
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
            <el-form-item label="SHAPE" prop="shape">
              <el-select v-model="form.shape" placeholder="please select">
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
            <el-form-item label="SIZE" prop="size">
              <el-col :span="9">
              <el-input v-model="form.size"  minlength=1></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="COLOR" prop="color">
              <el-color-picker v-model="form.color"></el-color-picker>
              <el-col :span="9">
              <el-input v-model="form.colorNote"  minlength=1></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CLARITY" prop="clarity">
              <el-select v-model="form.clarity" placeholder="please select">
                <el-option
                  v-for="item in clarityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="QUANTITY" prop="quantity">
              <el-col :span="9">
              <el-input v-model="form.quantity"></el-input>
              </el-col>
              <el-col :span="9">
                <el-form-item label="Pieces"/>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="WEIGHT" prop="weight">
              <el-col :span="6">
              <el-input v-model="form.weight"></el-input>
              </el-col>
              <el-select v-model="form.unitOfWeight" placeholder="please select">
                <el-option
                  v-for="item in unitOfWeightOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="ENHANCE" prop="enhance">
              <el-select v-model="form.enhance" placeholder="please select">
                <el-option
                  v-for="item in enhanceOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="MATERIAL" prop="material">
              <el-select v-model="form.material" placeholder="please select">
                <el-option
                  v-for="item in materialOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="DUEDATE">
              <el-col :span="9">
              <el-date-picker type="date" placeholder="DUE DATE" v-model="form.dueDate" style="width: 100%;">
              </el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="NOTE" prop="note">
              <el-col :span="9">
              <el-input v-model="form.note"  minlength=1></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="STONE USE FOR" prop="stoneUseFor">
              <el-input type="textarea" :rows="2" v-model="form.stoneUseFor"  minlength=1></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-form-item>
          <el-button type="primary" @click="save">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="formVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</div>
</template>

<script src="./tender.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

