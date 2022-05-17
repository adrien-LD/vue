const data2 = [
  { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01' },
   { id: 24300, parentId: 10050, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
   { id: 20045, parentId: 24300, name: 'Test4', type: 'html', size: 600, date: '2021-04-01' },
   { id: 10053, parentId: 24300, name: 'Test5', type: 'avi', size: null, date: '2021-04-01' },
   { id: 24330, parentId: 10053, name: 'Test6', type: 'txt', size: 25, date: '2021-10-01' },
   { id: 21011, parentId: 10053, name: 'Test7', type: 'pdf', size: 512, date: '2020-01-01' },
   { id: 22200, parentId: 10053, name: 'Test8', type: 'js', size: 1024, date: '2021-06-01' },
 ]


 function queryAllParent(id) {
  const current = data2.find(item => item.id === id );
  const list = [current];

  for(let i = 0; i < list.length; i++) {
    const currentParentId = list[i].parentId;
    if(currentParentId) {
      const parentItem = data2.find(item => item.id === currentParentId );
      list.push(parentItem)
    } else {
      break;
    }
  }
  console.log(list);
  return list
}


queryAllParent(10053)