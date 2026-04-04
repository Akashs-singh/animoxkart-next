//call api to get product list
import axios from 'axios';
const  fs = require('browserify-fs');
// console.log("getProduct.js");
const getData = async () => {
    var d={"token":"animoxkarttokentogetproducts"};
     const response = await axios.post("http://localhost:8080/animoxkart/api/internal/getProducts",d,{
         headers: {
             "Content-Type": "application/json",
             'Access-Control-Allow-Origin': '*',
         }
     });
     const data = await response.data;
     console.log(data)
     //update data.json file with new data
     fs.writeFile('data copy.json', JSON.stringify(data), (err) => {
         if (err) throw err;
        //  console.log('Data written to file');
     });
     fs.readFile('data copy.json', 'utf-8', function(err, datas) {
        //  console.log(datas);
     });
     // return data;
  
   };
   getData();

