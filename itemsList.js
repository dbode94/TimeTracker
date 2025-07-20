class ItemList {

    /**
     * @param {ItemList} list 
     */
    constructor(list = []){
        this.list = list;
    }

    /**
     * @param {String} name 
     * @param {double} timeTracked 
     */
    add(name, timeTracked){
        this.list.add({name: name, time: timeTracked});
    }

    /**
     * @param {number} index 
     * @param {String} name 
     */
    remove(index = -1, name){
        if(index != -1) this.list.remove(index);
        else {
            for (let i = 0; i < this.list.length; i++) 
                if(this.list[i].name == name) this.list.remove(i);
        }
    }

}

module.exports = ItemList;