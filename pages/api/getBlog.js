// http://localhost:3000/api/getBlog?slug=how-to-learn-javascript
import * as fs from "fs";

export default function handler(req, res) {
    const slug = req.query.slug;
    const blog = JSON.parse(fs.readFileSync(`BlogData/${slug}.json`,'utf-8'));
    res.status(200).json({ blog : blog});

}
