<template>
  <div>
    <vxe-table resizable :tree-config="{ transform: true, rowField: 'id', parentField: 'parentId' }" :data="tableData"
      :menu-config="tableMenu" :checkbox-config="{ labelField: 'id', highlight: true }"
      @menu-click="contextMenuClickEvent" @checkbox-change="selectChangeEvent">
      <vxe-column type="checkbox" title="ID" width="280" tree-node></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
    </vxe-table>
    <vxe-modal v-model="search" show-footer @confirm="save">
      查询：<vxe-input v-model="searchCondition"></vxe-input><br>
      <vxe-radio name="ddiection" v-model="value1" label="1" content="up"></vxe-radio>
      <vxe-radio name="ddiection" v-model="value1" label="2" content="down"></vxe-radio>
    </vxe-modal>
  </div>
</template>

<script>
// import Clipboard from 'clipboard';

import { VXETable } from 'vxe-table';
import XEUtils from 'xe-utils'
const directoryLabel = '├── ';
const hierarchyLabel = '│   ';
export default {
  name: 'treeDemo',
  data() {
    return {
      tableData: [
        { id: 10050, parentId: null, name: 'Test2' },
        { id: 24300, parentId: 10050, name: 'Test3' },
        { id: 20045, parentId: 24300, name: 'test abc4' },
        { id: 20046, parentId: 20045, name: 'test abc4' },
        { id: 20047, parentId: 20046, name: 'test abc4' },
        { id: 10053, parentId: 24300, name: 'test abc96' },
        { id: 24330, parentId: 10053, name: 'test abc5' },
        { id: 21011, parentId: 10053, name: 'Test6' },
        { id: 22200, parentId: 10053, name: 'Test7' },
        { id: 24331, parentId: 24330, name: 'test abc5' },
        { id: 24332, parentId: 24330, name: 'test abc5' },
        { id: 24333, parentId: 24331, name: 'test abc5' },
        { id: 24334, parentId: 24332, name: 'test abc5' },
      ],
      clipConfig: { isCopy: true },
      tableMenu: {
        body: {
          options: [[
            {
              code: 'search',
              name: '查找'
            }, {
              code: 'copy',
              name: '复制',
            }
          ]
          ],
        },
      },
      search: false,
      searchCondition: '',
      value1: 1,
      selected: []
    }
  },
  methods: {
    selectChangeEvent({ $table }) {
      this.selected = $table.getCheckboxRecords();

    },
    contextMenuClickEvent({ menu }) {

      console.log(menu.code);
      switch (menu.code) {
        case 'search':
          console.log("search")
          this.search = true;
          break;
        case 'copy':
          console.log("copy")
          if (this.selected.length) {
            console.log("succcess");
            this.handleCopy();
          }
          break;
      }
    },
    save() {

    },
    handleCopy() {
      let selectTrees = XEUtils.toArrayTree(this.selected);
      console.log("tree:" + selectTrees.length);
      // for (let i = 0; i < selectTrees.length; i++) {
      //   const text = this.transformText(selectTrees[i]);
      // }
      const text = this.transformText(selectTrees[0]);
      navigator.clipboard.writeText(text).then(function () {
        VXETable.modal.message({ content: '复制成功', status: 'success' })
      }, function () {
        VXETable.modal.message({ content: '复制失败', status: 'error' })
      });
    },

    transformText(selectTree) {
      let level = 1;
      console.log(selectTree);
      const rootNode = selectTree;
      console.log(rootNode);
      const text = directoryLabel + `${rootNode.id}-${rootNode.name}`;
      const children = rootNode.children;
      if (children?.length) {
        return `${text}
${this.transformText2(children, '', level)}`;
      }
      return text;

    },

    transformText2(children, text, level) {
      let currentText = text;
      for (let i = 0; i < children.length; i++) {
        const child = children[i]
        for (let j = 0; j < level; j++) {
          currentText += hierarchyLabel;
        }
        currentText = `${currentText}${directoryLabel}${child.id}-${child.name}
`;
        if (child?.children?.length) {
          currentText = this.transformText2(child.children, currentText, level + 1);
        }
      }
      return currentText;
    }
  },
};
</script>
