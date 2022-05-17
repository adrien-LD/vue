<template>
  <div>
    <vxe-modal v-model="visible">
      <vxe-table
        :data="currentTable"
        :edit-config="{ trigger: 'dblclick', mode: 'cell' }"
      >
        <vxe-column field="name" title="姓名" :edit-render="{}">
          <template #edit="{ row }">
            <vxe-input
              v-model="row.name"
              type="text"
              placeholder="请输入昵称"
            />
          </template>
        </vxe-column>
        <vxe-column field="age" title="年龄" :edit-render="{}">
          <template #edit="{ row }">
            <vxe-input v-model="row.age" type="text" placeholder="请输入昵称" />
          </template>
        </vxe-column>
      </vxe-table>
      <vxe-button @click="handleSave">保存</vxe-button>
    </vxe-modal>
    <vxe-table :data="otherData">
      <vxe-column field="name" title="姓名"> </vxe-column>
      <vxe-column field="age" title="年龄"> </vxe-column>
    </vxe-table>
    <vxe-input v-model="name" />
    <vxe-input v-model="age" />
    <vxe-button @click="handleSave1">保存1</vxe-button>
    <vxe-table
      v-for="(item, index) in data"
      :data="item.data"
      :key="index"
      :edit-config="{ trigger: 'dblclick', mode: 'cell' }"
      :row-config="{ isCurrent: true, isHover: true }"
      @current-change="currentChangeEvent(index)"
    >
      <vxe-column field="name" title="姓名" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.name" type="text" placeholder="请输入昵称" />
        </template>
      </vxe-column>
      <vxe-column field="age" title="年龄" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.age" type="text" placeholder="请输入昵称" />
        </template>
      </vxe-column>
    </vxe-table>
    <el-button @click="handleOpen">编辑</el-button>
    <el-button @click="handleDelete">删除</el-button>
  </div>
</template>

<script>
import { VXETable } from "vxe-table";
export default {
  name: "TableDemo",
  data() {
    return {
      otherData: [],
      name: "",
      age: "",
      data: [
        {
          type: null,
          data: [
            { name: 111, age: 19 },
            { name: 11222, age: 111 },
          ],
        },
        {
          type: "or",
          data: [
            { name: 222, age: 19 },
            { name: 22211, age: 111 },
          ],
        },
      ],
      visible: false,
      currentTable: null,
      currentIndex: null,

      data2: [
               { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01' },
                { id: 24300, parentId: 10050, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                { id: 20045, parentId: 24300, name: 'Test4', type: 'html', size: 600, date: '2021-04-01' },
                { id: 10053, parentId: 24300, name: 'Test5', type: 'avi', size: null, date: '2021-04-01' },
                { id: 24330, parentId: 10053, name: 'Test6', type: 'txt', size: 25, date: '2021-10-01' },
                { id: 21011, parentId: 10053, name: 'Test7', type: 'pdf', size: 512, date: '2020-01-01' },
                { id: 22200, parentId: 10053, name: 'Test8', type: 'js', size: 1024, date: '2021-06-01' },
              ]
    };
  },
  methods: {
    handleOpen() {
      this.visible = true;
    },
    currentChangeEvent(index) {
      this.currentTable = this.data[index];
      this.currentIndex = index;
      console.log("this.currentTable", this.currentTable);
    },
    handleSave() {
      this.visible = false;
      this.data[this.currentIndex] = this.currentTable;
    },
    handleDelete() {
      this.data = this.data.filter(
        (item, index) => index !== this.currentIndex
      );
    },
    handleSave1() {
      const sameItem = this.otherData.find((item) => item.name === this.name);
      if (sameItem) {
        VXETable.modal.message({ content: "添加失败", status: "error" });
        return;
      }
      this.otherData.push({ name: this.name, age: this.age });
      this.name = "";
      this.age = "";
    },

    queryAllParent(id) {
      const current = this.data2.find(item => item.id === id );
      const list = [current];

      for(let i = 1; i < this.list.length; i++) {
        const currentParentId = list[i].parentId;
        if(currentParentId) {
          const parentItem = this.data2.find(item => item.id === currentParentId );
          list.push(parentItem)
        } else {
          break;
        }
      }
      console.log(list);
      return list
    }
  },
};
</script>

<style>
</style>