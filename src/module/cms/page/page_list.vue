<template>
  <div>
    <!-- Header form -->
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="站点列表:">
        <el-select
          v-model="params.siteId"
          filterable remote clearable
          placeholder="请选择站点"
          :remote-method="siteRemoteMethod"
          :loading="loading.site">
          <el-option
            v-for="item in siteList"
            :key="item.siteId"
            :label="item.siteName"
            :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面名称:">
        <el-input placeholder="页面名称" v-model="params.pageAlias"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small"
                   :loading=loading.main @click="page=1;query()">
          查询
        </el-button>
        <router-link class="mui-tab-item" :to="{
        path: '/cms/page/add',
        query:{
          page: this.page,
          siteId: this.params.siteId,
          pageAlias: this.params.pageAlias}}">
          <el-button type="primary" icon="el-icon-plus" size="small">新增</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <!-- Content table -->
    <el-table
      :data="list"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="pageName"
        label="页面名称"
        width="220">
      </el-table-column>
      <el-table-column
        prop="pageAlias"
        label="页面别名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="pageType"
        label="页面类型"
        width="150">
      </el-table-column>
      <el-table-column
        prop="pageWebPath"
        label="访问路径"
        width="250">
      </el-table-column>
      <el-table-column
        prop="pagePhysicalPath"
        label="物理路径"
        width="">
      </el-table-column>
      <el-table-column
        prop="pageCreateTime"
        label="创建时间"
        width="280">
      </el-table-column>
    </el-table>
    <!-- Footer pagination -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=page
      :page-sizes="[size, size*2, size*3, size*4]"
      :page-size=size
      layout="total, sizes, prev, pager, next, jumper"
      :total=total
      style="text-align: center"
      background
    >
    </el-pagination>
  </div>
</template>

<script>
  import * as cmsApi from "../api/cms";

  export default {
    data() {
      return {
        list: [],
        total: 0,
        page: 1, // 页码
        size: 20,// 每页数量
        // Query by other param
        params: {
          siteId: '',
          pageAlias: '',
        },
        // Site list
        siteList: [],
        // Loading
        loading: {
          main: false,
          site: false
        }
      }
    },
    methods: {
      handleSizeChange(size) {
        this.size = size;
        this.query();
      },
      handleCurrentChange(page) {
        this.page = page;
        this.query();
      },
      siteRemoteMethod(query) {
        this.loading.site = true;
        setTimeout(() => {
          this.siteList = cmsApi.sub_site_list(query).then(res => {
            this.siteList = res.queryResult.list;
            this.loading.site = false;
          });
        }, 200);
      },
      query() {
        this.loading.main = true;
        setTimeout(() => {
          cmsApi.page_list(this.page, this.size, this.params).then(res => {
            this.list = res.queryResult.list;
            this.total = res.queryResult.total;
            this.loading.main = false;
          });
        }, 200);
      }
    },
    created() {
      this.page = Number.parseInt(this.$route.query.page || 1);
      this.params.siteId = this.$route.query.siteId;
      this.params.pageAlias = this.$route.query.pageAlias;
      this.query();
      this.loading.main = false;
      this.siteRemoteMethod();
      this.loading.site = false;
    }
  }
</script>

<style scoped>
</style>
