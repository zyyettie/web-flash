<template>
  <div class="app-container">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="6">
          <el-input v-model="listQuery.account" placeholder="input account please"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="listQuery.name" placeholder="input name please"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="success" icon="el-icon-search" @click.native="search">{{ $t('button.search') }}</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click.native="reset">{{ $t('button.reset') }}</el-button>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="24">
          <el-button type="success" icon="el-icon-plus" @click.native="add" v-permission="['/mgr/add']">
            {{$t('button.add') }}
          </el-button>
          <el-button type="primary" icon="el-icon-edit" @click.native="edit" v-permission="['/mgr/edit']">
            {{$t('button.edit') }}
          </el-button>
          <el-button type="danger" icon="el-icon-delete" @click.native="remove" v-permission="['/mgr/delete']">
            {{$t('button.delete') }}
          </el-button>
          <el-button type="info" icon="el-icon-role" @click.native="openRole">Assign Role</el-button>
        </el-col>
      </el-row>
    </div>


    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
    @current-change="handleCurrentChange">

      <el-table-column label="Account">
        <template slot-scope="scope">
          {{scope.row.account}}
        </template>
      </el-table-column>
      <el-table-column label="Name">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="Role">
        <template slot-scope="scope">
          {{scope.row.roleName}}
        </template>
      </el-table-column>
      <el-table-column label="Department">
        <template slot-scope="scope">
          {{scope.row.deptName}}
        </template>
      </el-table-column>
      <el-table-column label="Email">
        <template slot-scope="scope">
          {{scope.row.email}}
        </template>
      </el-table-column>
      <el-table-column label="Tel.">
        <template slot-scope="scope">
          {{scope.row.phone}}
        </template>
      </el-table-column>
      <el-table-column label="Status">
        <template slot-scope="scope">
          {{scope.row.statusName}}
        </template>
      </el-table-column>
      <el-table-column label="regType">
        <template slot-scope="scope">
          {{scope.row.regType}}
        </template>
      </el-table-column>
      <el-table-column label="PaymentTerms">
        <template slot-scope="scope">
          {{scope.row.paymentTerms}}
        </template>
      </el-table-column>
      <el-table-column label="PaymentType">
        <template slot-scope="scope">
          {{scope.row.paymentType}}
        </template>
      </el-table-column>
      <el-table-column label="idNo">
        <template slot-scope="scope">
          {{scope.row.idNo}}
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
            <el-form-item label="Account" prop="account">
              <el-input v-model="form.account" minlength=1></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Name" prop="name">
              <el-input v-model="form.name"  minlength=1></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Email" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="isAdd">
            <el-form-item label="Password" prop="password">
              <el-input v-model="form.password"  type="password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="isAdd">
            <el-form-item label="Confirm Password" prop="rePassword">
              <el-input v-model="form.rePassword"  type="password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Phone" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CompanyName" prop="companyName">
              <el-input v-model="form.companyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Address" prop="address">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="RegistrationNo." prop="registrationNo">
              <el-input v-model="form.registrationNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="TaxNo." prop="taxNo">
              <el-input v-model="form.taxNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="IDNo." prop="idNo">
              <el-input v-model="form.idNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Reg.Type" prop="regType">
              <el-input v-model="form.regType" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="PaymentTerms" prop="paymentTerms">
              <el-input v-model="form.paymentTerms" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="PaymentType" prop="paymentType">
              <el-input v-model="form.paymentType" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Department" >
              <el-input
                placeholder="please select department"
                v-model="form.deptName"
                readonly="readonly"
                @click.native="deptTree.show  = !deptTree.show">
              </el-input>
              <el-tree v-if="deptTree.show"
                       empty-text="暂无数据"
                       :expand-on-click-node="false"
                       :data="deptTree.data"
                       :props="deptTree.defaultProps"
                       @node-click="handleNodeClick"
                       class="input-tree">
              </el-tree>

            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="isActive" prop="status">
              <el-switch v-model="form.status"></el-switch>
            </el-form-item>
          </el-col>

          <el-col :span="12">
          <div v-if="form.idFile!=='' && form.idFile!==null && form.idFile!==undefined">
            <el-form-item label="ID/LICENCE PICTURE" prop="status">
            <el-popover
                placement="right"
                title=""
                trigger="click">
                <img :src="form.img"/>
                <img slot="reference" :src="form.img" :alt="form.img" style="max-height: 80px;max-width: 80px">
              </el-popover>
              </el-form-item>
            </div>
            </el-col>
      

        </el-row>
        <el-form-item>
          <el-button type="primary" @click="saveUser">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="formVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="角色分配"
      :visible.sync="roleDialog.visible"
      width="25%">
      <el-form>
        <el-row>
          <el-col :span="12">
            <el-tree
              :data="roleDialog.roles"
              ref="roleTree"
              show-checkbox
              node-key="id"
              :default-checked-keys="roleDialog.checkedRoleKeys"
              :props="roleDialog.defaultProps">
            </el-tree>

          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="setRole">{{ $t('button.submit') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./user.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

