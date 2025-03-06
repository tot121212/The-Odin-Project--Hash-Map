import { HashMap } from "./HashMap.js";

const hashMap = new HashMap(0.8, 16);
const key = "MyUsername";
hashMap.set(key, "Hello");
console.log("Bucket:", hashMap.buckets);