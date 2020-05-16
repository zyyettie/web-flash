<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input v-model="listQuery.name" placeholder="GEMSTONE"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.color" placeholder="COLOR"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.shape" placeholder="SHAPE"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.size" placeholder="SIZE"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.memoNo" placeholder="MEMONo."></el-input>
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
          {{scope.row.quantity}} {{scope.row.unitOfQuantity}}
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
      <el-table-column label="PRICE RANGE(THB)">
        <template slot-scope="scope">
          {{scope.row.note}}/{{scope.row.unitOfNote}}
        </template>
      </el-table-column>
      <el-table-column label="CLOSE DATE">
        <template slot-scope="scope">
          {{scope.row.dueDate}}
        </template>
      </el-table-column>
      <el-table-column label="USE FOR">
        <template slot-scope="scope">
          {{scope.row.stoneUseFor}}
        </template>
      </el-table-column>
      <el-table-column label="ORDER STATE">
        <template slot-scope="scope">
          {{scope.row.status}}
        </template>
      </el-table-column>
      <el-table-column label="BID">
        <template slot-scope="scope">
          {{scope.row.count}}
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
      <el-form ref="form" :model="form" :rules="rules" :label-position="labelPosition" label-width="160px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="GEMSTONE" prop="name" >
              <el-col :span="12">
              <el-select v-model="form.name" filterable style="width:100%" placeholder="please select">
                <el-option
                  v-for="item in nameOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="COLOR" prop="color">
              <el-color-picker v-model="form.color"></el-color-picker>
              <el-col :span="12">
              <el-input v-model="form.colorNote"  minlength=1></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SHAPE" prop="shape">
              <el-col :span="12">
              <el-select v-model="form.shape" filterable style="width:100%" placeholder="please select">
                <el-option
                  v-for="item in shapeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SIZE(mm)" prop="size">
              <el-col :span="12">
              <el-input v-model="form.size"  minlength=1></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="QUANTITY" prop="quantity">
              <el-col :span="12">
              <el-input v-model="form.quantity"></el-input>
              </el-col>
              <el-col :span="12">
              <el-select v-model="form.unitOfQuantity" style="width:60%" placeholder="please select">
                <el-option
                  v-for="item in unitOfQuantityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CLARITY" prop="clarity">
              <el-col :span="12">
              <el-select v-model="form.clarity" filterable style="width:100%" placeholder="please select">
                <el-option
                  v-for="item in clarityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="TREATMENT" prop="enhance">
              <el-col :span="12">
              <el-select v-model="form.enhance" filterable style="width:100%" placeholder="please select">
                <el-option
                  v-for="item in enhanceOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="MATERIAL" prop="material">
              <el-col :span="12">
              <el-select v-model="form.material" filterable style="width:100%" placeholder="please select">
                <el-option
                  v-for="item in materialOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="PRICE RANGE(THB)" prop="note">
              <el-col :span="12">
              <el-input v-model="form.note"  minlength=1></el-input>
              </el-col>
              <el-col :span="12">
              <el-select v-model="form.unitOfNote" style="width:60%" placeholder="please select" prop="unitOfNote">
                <el-option
                  v-for="item in unitOfNoteOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CLOSE DATE" prop="dueDate">
              <el-col :span="12">
              <el-date-picker type="date" placeholder="CLOSE DATE" v-model="form.dueDate" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="USE FOR" prop="stoneUseFor">
               <el-col :span="12">
              <el-input v-model="form.stoneUseFor"  minlength=1></el-input>
               </el-col>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <div>
          <br>
          <br>
          </div>
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

