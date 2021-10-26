export const filterLogic=(totalItems,text)=>{
return totalItems.filter((item)=>{
return item['title'].toLowerCase().includes(text.toLowerCase()) ||
item['created_at'].includes(text)
})
}