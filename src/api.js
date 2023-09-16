export default {
    addItem,
    deleteItem
} 

function addItem(item) {
    localStorage.setItem(item.id, JSON.stringify([item.value, item.progress]));
}

function deleteItem(key) {
    localStorage.removeItem(key);
}