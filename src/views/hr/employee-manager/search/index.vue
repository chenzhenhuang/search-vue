<template>
  <div>
    <el-card>
      <employee-inner-search @search="handleSearch"/>
    </el-card>
    <el-card class="container">
      <employee-inner-table :table-data="tableData" :loading="loading"></employee-inner-table>
      <div class="pager">
        <el-pagination
          @current-change="handlePageChange"
          :current-page.sync="page"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import {searchInnerEmployee} from "@/api/search";
import {formatBirth, formatDegree} from '@/utils/info-format'
import DepartmentPicker from "@/components/department-picker";
import EmployeeInnerTable from "@/views/components/tables/employee-inner-table";
import EmployeeInnerSearch from "@/views/components/search/employee-inner-search";

export default {
  name: "search",
  components: {EmployeeInnerSearch, EmployeeInnerTable, DepartmentPicker},
  data() {
    return {
      tableData: [],
      pageSize: 20,
      page: 0,
      loading: true,
      key: {
        type: 'NAME',
        value: ''
      },
      filters: [],
    }
  },
  computed: {
    searchInfo() {
      return {
        key: this.key,
        filters: this.filters,
        page: this.page,
        pageSize: this.pageSize
      }
    }
  },
  methods: {
    search(){
      if (!this.validateSearchInfo()) {
        return
      }
      this.loading = true
      searchInnerEmployee(this.searchInfo).then(res=>{
        if (res.data.code === 100){
          let data = res.data.data
          let listdata = data.list
          this.tableData = []
          for (let item of listdata){
            this.tableData.push(item)
          }
          this.loading = false
        }
      })
    },
    validateSearchInfo(){
      let key = this.searchInfo.key;
      if (key.type == null || key.type === ""){
        this.$message.error("请选择搜索关键词的类型")
        return false
      }
      return true
    },
    handlePageChange(val){
      this.page = val
      this.search()
    },
    handleSearch(val){
      this.tableData = []
      this.page = 0
      this.key = val.key
      this.filters = val.filters
      this.search()
    },
    handleRoute(path) {
      console.log(path)
      // this.$router.push({path: path})
    },
    handleCommand(val){
      this.$router.push({path: val})
    },
    formatBirth,formatDegree
  },
  mounted() {
    this.search()
  }
}
</script>

<style lang="scss" scoped>
.pager {
  padding: 30px 20px;
  text-align: right;
}

</style>
