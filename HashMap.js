import { LinkedList } from "./LinkedList.js";

export class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.size = 0;
        this.rehash();
    }
    hash(key) {
        if (typeof key !== "string") return;
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
          hashCode = hashCode % this.capacity;
        }
        return hashCode;
    }
    rehash(){
        console.log("Rehashing buckets");
        const oldBuckets = this.buckets;
        this.buckets = new Array(this.capacity).fill(null).map(() => new LinkedList());
        this.size = 0;
        
        if (!oldBuckets) return;
        for (let bucket of oldBuckets) {
            let node = bucket.head;
            while (node) {
                this.set(node.key, node.value);
                node = node.nextNode;
            }
        }
        console.log("Rehashed Buckets:\n",this.buckets);
    }
    check(){
        //console.log("Size of HashMap:", this.size);
        //console.log("Capacity * Load Factor:",this.capacity * this.loadFactor);
        if (this.size >= this.capacity * this.loadFactor){
            this.capacity *= 2;
            this.rehash();
            console.log("Rehash complete, capacity is now:",this.capacity);
        }
    }
    validateKey(key){
        if (typeof key !== "string") return;
        const index = this.hash(key);
        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds");
        }
        const bucket = this.buckets[index];
        return bucket ?? null;
    }
    set(key, value){
        const bucket = this.validateKey(key);
        if (bucket === null) return;
        // if key exists already, overwrite value instead of appending
        if (this.has(key)){
            bucket.findNode(key).value = value;
        } else {
            bucket.append(key, value);
            this.size += 1;
        }
        this.check();
    }
    get(key){
        const bucket = this.validateKey(key);
        if (bucket === null) return null;
        return bucket.findNode(key).value ?? null;
    }
    has(key){
        const bucket = this.validateKey(key);
        if (bucket === null) return false;
        return bucket.findNode(key) ? true : false;
    }
    remove(key){
        const bucket = this.validateKey(key);
        if (bucket === null) return false;
        if (bucket.size === 0) return false;
        const node = bucket.findNode(key);
        const removedNode = bucket.removeAt(bucket.find(node.value));
        if (!removedNode) return false; // if we didnt remove a node
        this.size -= 1;
        return true;
    }
    length(){
        return this.size;
    }
    clear(){
        this.buckets = null;
        return this.rehash();
    }
    keys(){
        let keys = [];
        for (const bucket of this.buckets){
            if (!bucket.head) continue;
            let node = bucket.head;
            while (node){
                if (node.key) keys.push(node.key);
                node = node.nextNode;
            }
        }
        return keys;
    }
    values(){
        let values = [];
        for (const bucket of this.buckets){
            if (!bucket.head) continue;
            let node = bucket.head;
            while (node){
                if (node.value) values.push(node.value);
                node = node.nextNode;
            }
        }
        return values;
    }
    entries(){
        let entries = [];
        for (const bucket of this.buckets){
            if (!bucket.head) continue;
            let node = bucket.head;
            while (node){
                if (node.key || node.value) entries.push([node.key, node.value]);
                node = node.nextNode;
            }
        }
        return entries;
    }
}