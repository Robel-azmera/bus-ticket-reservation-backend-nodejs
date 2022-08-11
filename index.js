const express  = require("express");
const app = express();
const pool = require("./database");

app.use(express.json())

//*************ROUTES***************//

//Get Companies
app.get("/companies", async (req,res)=>{
    try {
        const companies = await pool.query("SELECT * FROM company");
        res.json(companies);
    } catch (error) {
        console.error(error.message);
    }
});

//Get Buses
app.get("/buses", async (req,res)=>{
    try {
        const buses = await pool.query("SELECT * FROM buses");
        res.json(buses);
    } catch (error) {
        console.error(error.message);
    }
});

//Post Company
app.post("/company", async(req,res)=>{
    try {
        const {company_name} = req.body;
        const {company_id} = req.body;
        const {email} = req.body;
        const {phone} = req.body;
        const {password} = req.body;

        const newCompany = await pool.query(
            "INSERT INTO public.company(company_id, company_name, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [company_id, company_name, email, phone, password],
            );

            res.json(newCompany);

    } catch (error) {
        console.log(error.message);
    }
});




// PORT
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port} ...`));







