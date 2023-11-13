// This is mostly for debugging, not really a reason that you would need to download images from the database most of the time

const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const fs = require('fs');

dotenv.config({ path: '../config.env' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const downloadImages = async () => {
    let { data, error } = await supabase.from("programs").select("*");
    data.forEach((entry) => {
        console.log(entry)
        convertToImage(entry["program_name"], entry["image"])
    });
}

function convertToImage(name, byteArray) {
    fs.writeFile('./Program Images/DOWNLOAD_' + name + ".jpg", byteArray, {encoding: 'base64'}, function(err) {
        console.log('File created');
    });
}

downloadImages()