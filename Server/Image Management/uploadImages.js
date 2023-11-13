const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const fs = require('fs');

dotenv.config({ path: '../config.env' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const updateImages = async () => {
    let { data, error } = await supabase.from("programs").select("*");
    data.forEach(async row => {
        const { data, error } = await supabase.from("programs").update({image: convertToBytes(row["program_name"])}).eq("program_name", row["program_name"]).select("*");
        console.log(data)
    });
}

function convertToBytes(name) {
 const output = fs.readFileSync(__dirname + '\\Program Images\\' + name + '.jpg', {encoding: 'base64'});
 return output;
}

updateImages()