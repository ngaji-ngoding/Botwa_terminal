const readline = require("readline");
const {exec}=require("child_process");
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
});

function tanya (kalimat){
        return new Promise((resolve,reject)=>{
                rl.question(kalimat, (jawaban)=>{
                        resolve(jawaban);
                })
        })
}

function command(cmd){
        return new Promise((resolve, reject)=>{
                exec(cmd, (err,stdout,stderr)=>{
                        console.log(stdout);
                        resolve();
                })
        })
}

const authMethod = ["scan barcode", "pairing code"];
let authStat = false;
const menus = ["kirim pesan", "cek nomor", "pesan bulk"];

async function runBot(){
        if (!authStat) {


                authMethod.forEach((v,id)=>console.log((id+1)+" "+v))

                const auth = await tanya("pilihlah metode autentitaksinya: ");
                if (auth==1||authMethod.indexOf(auth)==0) {
                        await command("clear");
                        console.log("silahkan scan barcode berikut ini");
                        authStat = true;
                        runBot();
                } else if (auth == 2 || authMethod.indexOf(auth)==1) {
                        await command("clear");
                        console.log("silahkan masukkan code berikut ke wa anda");
                        authStat = true;
                        runBot();
                }
        }else{
                menus.forEach((v,id)=>console.log((id+1)+" "+v));
                const menu = await tanya("pilih salah satu menu di atas : ");
                console.log("menu yang di pilih adalah "+menu);
                rl.close();
        }
}

runBot();
