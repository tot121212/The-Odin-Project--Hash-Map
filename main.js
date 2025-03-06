import { HashMap } from "./HashMap.js";
import fs from "fs" ;

const hashMap = new HashMap();
const key = "MyUsername";
hashMap.set(key, "Hello");

function getRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%$#@!';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
for (let i = 0; i < 100; i++){
    hashMap.set(getRandomString(12), getRandomString(12));
}

const data = [];
data.push("Capacity: " + hashMap.capacity);
data.push("Amt of Buckets: " + hashMap.size);
//data.push("Buckets:", hashMap.buckets);
hashMap.set("Example", "123");
data.push("Get: " + hashMap.get("Example"));

fs.writeFile('output.txt', JSON.stringify(data, null, 2), (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('File written successfully!');
    }
});
