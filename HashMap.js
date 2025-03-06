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
        const oldBuckets = this.buckets;
        this.buckets = null;
        this.buckets = new Array(this.capacity).fill(null).map(() => new LinkedList());
        this.size = 0;
        if (!oldBuckets) return;
        for (let bucket of oldBuckets){
            while (bucket.size > 0){
                const poppedNode = bucket.pop();
                this.set(poppedNode.key, poppedNode.value);
            }
        }
        console.log("Rehashed Buckets:",this.buckets);
    }
    
    check(){
        if (this.size > this.capacity * this.loadFactor){
            this.capacity = Math.ceil(this.capacity * 2);
            this.rehash();
        }
    }

    set(key, value){
        if (typeof key !== "string") return;
        const index = this.hash(key);
        console.log("Index for:", key, "is:", index);
        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds");
        }
        const bucket = this.buckets[index];
        if (bucket.size === 0) this.size += 1; // if we are putting the first value into a bucket essentially
        bucket.append(value);
        this.check();
    }
    get(key){
        
    }
}