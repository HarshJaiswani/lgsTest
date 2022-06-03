import * as fs from "fs";

export default function handler(req, res) {
    fs.writeFile(`BlogData/${req.body.slug}.json`,JSON.stringify(req.body), (err)=>{
        if(err){
            console.error(err);
        }
    })
    res.status(200).json({sucesses : 'file saved'});
}
