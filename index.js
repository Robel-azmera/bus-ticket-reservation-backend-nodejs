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

app.get("/company/:id", async (req,res)=>{
    const {id} = req.params;
    try {
        const company = await pool.query("SELECT * FROM company WHERE company_id = $1", [id]);
        res.json(company);
    } catch (error) {
        console.error(error.message);
    }
});

//Get Reservations
app.get("/reservations", async (req,res)=>{
    try {
        const reservations = await pool.query("SELECT * FROM reservation");
        res.json(reservations);
    } catch (error) {
        console.error(error.message);
    }
});

app.get("/reservations/:id", async (req,res)=>{
    const {id} = req.params;
    try {
        const reservation = await pool.query("SELECT * FROM reservation WHERE reservation_id = $1", [id]);
        res.json(reservation);
    } catch (error) {
        console.error(error.message);
    }
});

//Get Passengers
app.get("/passengers", async (req,res)=>{
    try {
        const passengers = await pool.query("SELECT * FROM passenger");
        res.json(passengers);
    } catch (error) {
        console.error(error.message);
    }
});

app.get("/passenger/:id", async (req,res)=>{
    const {id} = req.params;
    try {
        const passenger = await pool.query("SELECT * FROM passenger WHERE passenger_id = $1", [id]);
        res.json(passenger);
    } catch (error) {
        console.error(error.message);
    }
});

//Get Buses
app.get("/buses", async (req,res)=>{
    try {
        const buses = await pool.query("SELECT * FROM bus");
        res.json(buses);
    } catch (error) {
        console.error(error.message);
    }
});

app.get("/bus/:id", async (req,res)=>{
    const {id} = req.params;
    try {
        const bus = await pool.query("SELECT * FROM bus WHERE bus_id = $1", [id]);
        res.json(bus);
    } catch (error) {
        console.error(error.message);
    }
});

//Get Drivers
app.get("/drivers", async (req,res)=>{
    try {
        const drivers = await pool.query("SELECT * FROM driver");
        res.json(drivers);
    } catch (error) {
        console.error(error.message);
    }
});

app.get("/driver/:id", async (req,res)=>{
    const {id} = req.params;
    try {
        const driver = await pool.query("SELECT * FROM driver WHERE driver_id = $1", [id]);
        res.json(driver);
    } catch (error) {
        console.error(error.message);
    }
});

//Get Routes
app.get("/routes", async (req,res)=>{
    try {
        const routes = await pool.query("SELECT * FROM route");
        res.json(routes);
    } catch (error) {
        console.error(error.message);
    }
});

//GET route by ID
app.get("/route/:id", async (req,res)=>{
    const {id} = req.params;
    try {
        const route = await pool.query("SELECT * FROM route WHERE route_id = $1", [id]);
        res.json(route);
    } catch (error) {
        console.error(error.message);
    }
});

//GET route by departure_date *********************************************
app.get("/company/route/:date", async (req,res)=>{
    let departure_date = new Date(
        +req.params.year,
        +req.params.month - 1,
        +req.params.day
      );

    try {
        const route = await pool.query("SELECT * FROM route WHERE departure_date = $1", [departure_date]);
        res.json(route);
    } catch (error) {
        console.error(error.message);
    }
});

//GET route by destination *******************************************************************????????
app.get("/route/:destination", async (req,res)=>{
    const {destination} = req.params;
    try {
        const route = await pool.query("SELECT * FROM route WHERE destination = $1", [destination]);
        res.json(route);
    } catch (error) {
        console.error(error.message);
    }
});

//POST bus
app.post("/bus", async(req,res)=>{
    try {
        const {bus_id} = req.body;
        const {company_id} = req.body;
        const {plate_number} = req.body;
        const {capacity} = req.body;
        const {color} = req.body;

        const newBus = await pool.query(
            "INSERT INTO public.bus(bus_id, company_id, plate_number, capacity, color) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [bus_id, company_id, plate_number, capacity, color],
            );

            res.json(newBus);

    } catch (error) {
        console.log(error.message);
    }
});

//POST Reservations
app.post("/reservation", async(req,res)=>{
    try {
        const {reservation_id} = req.body;
        const {passenger_id} = req.body;
        const {company_id} = req.body;
        const {destination} = req.body;
        const {start} = req.body;
        const {departure_date} = req.body;
        const {sit_number} = req.body;
        const {route_id} = req.body;


        const newReservation = await pool.query(
            "INSERT INTO public.reservation(reservation_id, passenger_id, company_id, destination, start, departure_date, sit_number, route_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [reservation_id, passenger_id, company_id, destination, start, departure_date, sit_number, route_id]
            );

            res.json(newReservation);

    } catch (error) {
        console.log(error.message);
    }
});


//POST Passenger
app.post("/passenger", async(req,res)=>{
    try {
        const {passenger_id} = req.body;
        const {passenger_name} = req.body;
        const {phone} = req.body;
        const {email} = req.body;
        const {password} = req.body;
        const {sex} = req.body;
        const {dob} = req.body;


        const newPassenger = await pool.query(
            "INSERT INTO public.passenger(passenger_id, passenger_name, phone, email, password, sex, dob) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [passenger_id, passenger_name, phone, email, password, sex, dob]
            );

            res.json(newPassenger);

    } catch (error) {
        console.log(error.message);
    }
});

//POST Driver
app.post("/driver", async(req,res)=>{
    try {
        const {driver_id} = req.body;
        const {company_id} = req.body;
        const {driver_name} = req.body;
        const {email} = req.body;
        const {phone} = req.body;
        const {dob} = req.body;


        const newDriver = await pool.query(
            "INSERT INTO public.driver(driver_id, company_id, driver_name, email, phone, dob) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [driver_id, company_id, driver_name, email, phone, dob]
            );

            res.json(newDriver);

    } catch (error) {
        console.log(error.message);
    }
});

//POST Route
app.post("/route", async(req,res)=>{
    try {
        // const {route_id} = req.body;
        const {company_id} = req.body;
        const {start} = req.body;
        const {destination} = req.body;
        const {starting_time} = req.body;
        const {arriving_time} = req.body;
        const {price} = req.body;
        const {status} = req.body;


        const newRoute = await pool.query(
            "INSERT INTO public.route(company_id, start, destination, starting_time, arriving_time, price, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [company_id, start, destination, starting_time, arriving_time, price,status],
            );

            res.json(newRoute);

    } catch (error) {
        console.log(error.message);
    }
});

//POST Company
app.post("/company", async(req,res)=>{
    try {
        const {company_name} = req.body;
        const {email} = req.body;
        const {phone} = req.body;
        const {password} = req.body;

        const newCompany = await pool.query(
            "INSERT INTO public.company(company_name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [company_name, email, phone, password],
            );

            res.json(newCompany);

    } catch (error) {
        console.log(error.message);
    }
});



//UPDATE Company
app.put("/company/:id", async(req,res)=>{
    try {
        const {company_name} = req.body;
        const {company_id} = req.body;
        const {email} = req.body;
        const {phone} = req.body;
        const {password} = req.body;
        const {id} = req.params;

        const updatedCompany = await pool.query(
            "UPDATE public.company SET company_id = $1, company_name = $2, email = $3, phone = $4, password = $5 WHERE company_id = $6",
            [company_id, company_name, email, phone, password, id],
            );

            res.json(updatedCompany);

    } catch (error) {
        console.log(error.message);
    }
});

//UPDATE Bus
app.put("/bus/:id", async(req,res)=>{
    try {
        const {bus_id} = req.body;
        const {company_id} = req.body;
        const {plate_number} = req.body;
        const {capacity} = req.body;
        const {color} = req.body;
        const {id} = req.params;

        const updatedBus = await pool.query(
            "UPDATE public.bus SET bus_id = $1, company_id = $2, plate_number = $3, capacity = $4, color = $5 WHERE bus_id = $6",
            [bus_id, company_id, plate_number, capacity, color, id],
            );

            res.json(updatedBus);

    } catch (error) {
        console.log(error.message);
    }
});

//UPDATE Route
app.put("/route/:id", async(req,res)=>{
    try {
        const {route_id} = req.body;
        const {company_id} = req.body;
        const {start} = req.body;
        const {destination} = req.body;
        const {starting_time} = req.body;
        const {arriving_time} = req.body;
        const {price} = req.body;
        const {status} = req.body;
        const {id} = req.params;

        const updatedRoute = await pool.query(
            "UPDATE public.route SET route_id = $1, company_id = $2, start = $3, destination = $4, starting_time = $5, arriving_time = $6, price = $7, status = $8 WHERE route_id = $9",
            [route_id, company_id, start, destination, starting_time, arriving_time, price, status, id],
            );

            res.json(updatedRoute);

    } catch (error) {
        console.log(error.message);
    }
});

//UPDATE Passenger
app.put("/passenger/:id", async(req,res)=>{
    try {
        const {passenger_id} = req.body;
        const {passenger_name} = req.body;
        const {phone} = req.body;
        const {email} = req.body;
        const {password} = req.body;
        const {sex} = req.body;
        const {dob} = req.body;
        const {id} = req.params;


        const updatedPassenger = await pool.query(
            "UPDATE public.passenger SET passenger_id = $1, passenger_name = $2, phone = $3, email = $4, password = $5, sex = $6, dob = $7 WHERE passenger_id = $8",
            [passenger_id, passenger_name, phone, email, password, sex, dob, id]
            );

            res.json(updatedPassenger);

    } catch (error) {
        console.log(error.message);
    }
});


//DELETE All Companies
app.delete("/companies", async (req,res)=>{
    try {
        const company = await pool.query("DELETE FROM public.company");
        res.json(company);
    } catch (error) {
        console.error(error.message);
    }
});

//DELETE company
app.delete("/company/:id", async (req,res)=>{
    const {id} = req.params;
    try {
        const company = await pool.query("DELETE FROM public.company WHERE company_id = $1", [id]);
        res.json(company);
    } catch (error) {
        console.error(error.message);
    }
});

// PORT Listening
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port} ...`));









