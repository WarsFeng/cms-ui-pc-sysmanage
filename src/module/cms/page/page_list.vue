<template>
  <div>
    <el-button
      @click="query"
      type="primary" icon="el-icon-search" size="small"
      :loading=loading>搜索
    </el-button>
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=params.page
      :page-sizes="[params.size, params.size*2, params.size*3, params.size*4]"
      :page-size=params.size
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
        total: 550,
        loading: false,
        params: {
          page: 1, // 页码
          size: 20 // 每页数量
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        this.params.size = val;
        this.query();
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.query();
      },
      query() {
        this.loading = true;
        cmsApi.page_list(this.params.page, this.params.size, this.params).then(res => {
          console.log(res);
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
          this.loading = false;
        });
      }
    },
    created() {
      this.query();
    }
  }
</script>

<style scoped>
</style>
