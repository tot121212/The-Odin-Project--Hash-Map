class Node{
    constructor(key, value){
        if (key === undefined || value === undefined) throw new Error("Node must have both key and value");
        this.key = key;
        this.value = value;
        this.nextNode = null;
    }
}

export class LinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    append(key, value){
        let newNode = new Node(key, value);
        switch (this.getSize()) {
            case 0:
                this.head = newNode;
                this.tail = newNode;
                break;
            default:
                this.tail.nextNode = newNode;
                this.tail = newNode;
                break;
        }
        this.setSize(this.getSize()+1);
    }
    prepend(key, value){
        let newNode = new Node(key, value);
        switch (this.getSize()) {
            case 0:
                this.head = newNode;
                this.tail = newNode;
                break;
            default:
                let oldHead = this.head;
                newNode.nextNode = oldHead;
                this.head = newNode;
                break;
        }
        this.setSize(this.getSize()+1);
    }
    getSize(){
        return this.size;
    }
    setSize(size){
        this.size = Math.max(size, 0);
    }
    getHead(){
        return this.head;
    }
    getTail(){
        return this.tail;
    }
    at(index){
        if (index < 0 || index > this.getSize() - 1) return null;
        let node = this.head;
        let i = 0;
        while (i < index){
            if (node) {node = node.nextNode;}
            else return;
            i++;
        }
        return node;
    }
    pop(){
        let popped;
        let size = this.getSize();
        switch (size) {
            case 0:
                return null;
            case 1:
                popped = this.head;
                this.head = null;
                this.tail = null;
                break;
            default:
                let secondToLast = this.at(size-2);
                popped = secondToLast.nextNode;
                secondToLast.nextNode = null;
                this.tail = secondToLast;
                break;
        }
        this.setSize(this.getSize()-1);
        return popped;
    }
    contains(value){
        let node = this.head;
        while(node){
            if (node.value === value) return true;
            node = node.nextNode;
        }
        return false;
    }
    find(value){
        let idx = 0;
        let node = this.head;
        while(node){
            if (node.value === value) return idx;
            node=node.nextNode;
            idx++;
        }
        return null;
    }
    findNode(key){
        let node = this.head;
        while(node){
            if (node.key === key) return node;
            node=node.nextNode;
        }
        return null;
    }
    toString(){
        let string = "";
        let node = this.head;
        while (node){
            string+=`( ${node.value} )`;
            string+=" -> ";
            node = node.nextNode;
        }
        string+="null";
        return string;
    }
    insertAt(key, value, index){
        if (index < 0 || index > this.getSize()) return;

        let newNode = new Node(key, value);
        if (index === 0){
            this.prepend(key, value);
        } 
        else if (index === this.getSize()){
            this.append(key, value);
        } 
        else{
            let prev = this.at(index-1);
            let old = this.at(index);
            newNode.nextNode = old;
            prev.nextNode = newNode;
            this.setSize(this.getSize()+1);
        }
    }
    removeAt(index) {
        if (index < 0 || index >= this.getSize()) return null; // Out of bounds check
        if (!this.head) return null;
        let removedNode;
        
        if (index === 0) { // Removing the head
            removedNode = this.head;
            this.head = this.head.nextNode;
            if (this.getSize() === 1) this.tail = null; // If it was the only node
        } else {
            let prev = this.at(index - 1);
            removedNode = prev.nextNode;
            prev.nextNode = removedNode.nextNode;
    
            if (index === this.getSize() - 1) { // Removing the tail
                this.tail = prev;
            }
        }
    
        this.setSize(this.getSize() - 1);
        return removedNode;
    }
}

