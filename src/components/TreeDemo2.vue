<template>
  <div>
    <vxe-input placeholder="名称" size="small" allowClear v-model="filterTitle">
    </vxe-input>
    <vxe-button size="mini" @click="setTreeExpand" style="height: 24px;">查找</vxe-button>

    <vxe-table ref="xTree" size="mini" max-height="600" highlight-hover-row :loading="loading" :data="tableData"
      :tree-config="{ rowField: 'id', children: 'children' }">
      <vxe-table-column field="name" title="名称" tree-node>
        <template v-slot="{ row }" style="height:22px">
          <span>
            <span style="margin-left: 4px;">
              <span type="link" v-html="row.name"></span>
            </span>
          </span>
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>

</template>
<script>
import XEUtils from 'xe-utils'
export default {
  name: 'TreeDemo2',
  data() {
    return {
      filterTitle: '',
      loading: false,
      originData: [],
      tableData: [],
    }
  },
  created() {
    this.loading = true
    setTimeout(() => {
      const list = [
        {
          id: 1,
          name: "系统管理",
          url: "",
          children: [
            {
              id: 10,
              name: "用户管理",
              url: "sys/user"
            },
            {
              id: 11,
              name: "权限管理",
              url: "sys/right",
              children: [{
                id: 111,
                name: "角色管理3",
                url: "sys/role"
              }
              ]
            },
            {
              id: 12,
              name: "角色管理",
              url: "sys/role"
            }
          ]
        },

      ]
      this.loading = false
      this.originData = list
      this.tableData = this.originData
    }, 300)
  },
  methods: {
    setTreeExpand() {
      // 查找关键字展开与之相关的所有节点，其他无关系的节点关闭掉
      //组件本身的事件,使用了xe-utils中的searchTree方法,从树结构中根据回调查找数据
      const filterName = XEUtils.toString(this.filterTitle).trim().toLowerCase()
      if (filterName) {
        const options = { id: 'id' }
        const searchProps = ['name']
        this.tableData = XEUtils.searchTree(
          this.originData,
          (item) => searchProps.some((key) => XEUtils.toString(item[key]).indexOf(filterName) > -1),
          options
        )
        // const nodes = XEUtils.searchTree(
        //   tree,
        //   (item) => searchProps.some((key) => XEUtils.toString(item[key]).indexOf(filterName) > -1)
        // )

        //替换查找关键字的样式
        //这里我用了xe-utils中的eachTree方法,从树结构中遍历数据的键、值、路径,遍历数据中的name字段,将其关键字替换成有红色样式的
        this.$nextTick(() => {
          this.$refs.xTree.setAllTreeExpand(true)
        })
        let replaceReg = new RegExp(filterName, 'g')
        let replaceString = `<span class="search-text" >${filterName}</span>`
        XEUtils.eachTree(this.tableData, (item) => (item.name = item.name.replace(replaceReg, replaceString)))
      } else {
        this.tableData = this.originData
      }
    },
    searchEvent: XEUtils.debounce(function () {
      this.setTreeExpand()
    }, 500, { leading: false, trailing: true })
  },
};
</script>
<style scoped>
.search-text {
  color: red;
}
</style>