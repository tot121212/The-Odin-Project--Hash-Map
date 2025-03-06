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
for (let i = 0; i < 24; i++){
    hashMap.set(getRandomString(12), getRandomString(12));
}

const data = [];
data.push("Capacity: " + hashMap.capacity);
data.push("Amt of Buckets: " + hashMap.size);

hashMap.set("Example", "123");
hashMap.set("Example2", "1234");
data.push("Get: " + hashMap.get("Example"));
data.push("Get: " + hashMap.get("Example3"));
data.push("Has: " + (hashMap.has("Example2") ? "true" : "false"));
data.push("Has: " + (hashMap.has("Example3") ? "true" : "false"));
data.push("Remove: " + (hashMap.remove("Example2") ? "true" : "false"));
data.push("Remove: " + (hashMap.remove("Example3") ? "true" : "false"));


data.push("Buckets:", hashMap.buckets);

fs.writeFile('output.txt', JSON.stringify(data, null, 2), (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('File written successfully!');
    }
});
