const express = require("express");
const app_booking = express();
app_booking.use(express.json())
const PORT = 3000;


//Creating a rooms
const room_booking = [
    {
        roomName: 'Basic',
        seats: 40,
        amenities: "Projector screen",
        Rent_per_hr: 4000,
        room_id: 1
    },
    {
        roomName: 'Premium',
        seats: 80,
        amenities: "Projector screen, AC , wifi",
        Rent_per_hr: 9000,
        room_id: 2
    }
]

// Room booking data
var customer = [
    {

        Name: "John Kevin",
        Date: "17/07/2024",
        StartTime: "12:00pm",
        EndTime: "11:00am",
        room_id: 1,
        booking_id: 1
    },
    {

        Name: "Rathan",
        Date: "17/01/2024",
        StartTime: "12:00pm",
        EndTime: "11:00am",
        room_id: 2,
        booking_id: 2

    },

]

// Hall Booking API starts here

// Get all data
app_booking.get("/", (req, res) => {
    try {
        res.status(200).send({
            Feedback: "Successfully fetched all booked data ",
            customer,
            room_booking
        })
    } catch (error) {
        res.status(500).send({
            Feedback: "Connection Failed"
        })
    }
})



// New Room to room_booking
app_booking.post("/createrooms", (req, res) => {
    try {
        const { roomName, seats, amenities, Rent_per_hr } = req.body

        const room_id = room_booking.length + 1

        console.log(room_id)

        const room = {
            roomName,
            seats,
            amenities,
            Rent_per_hr,
            room_id
        }
        room_booking.push(room)

        return res.status(200).send({
            Feedback: "New booking added successfully",
            room
        })

    } catch (error) {
        res.status(500).send({
            Feedback: "Connection Failed"
        })
    }

})





// Room booking

app_booking.post('/roombooking', (req, res) => {
    try {
        const { Name, Date, StartTime, EndTime } = req.body
        const room_id = customer.length + 1
        const booking_id = customer.length + 1

        const Roombooking = {
            Name,
            Date,
            StartTime,
            EndTime,
            room_id,
            booking_id
        }
        customer.forEach((cus_booking) => {
            if (cus_booking.room_id == Roombooking.room_id) {
                return res.status(200).send({
                    Feedback: "The room is booked already"

                })
            }
            else if (cus_booking.Date == Roombooking.Date && cus_booking.StartTime == Roombooking.StartTime) {
                return res.status(200).send({
                    Feedback: "The room is booked already at the given date and time"
                })
            }
            else {
                customer.push(Roombooking)
                return res.status(200).send({
                    Feedback: "Room successfully booked",
                    BookingDetails: Roombooking
                });
            }

        })

    } catch (error) {
        res.status(400).send({
            message: "Room Booking error",
            error: error.message
        })
    }
})

// Get all Customer


app_booking.get("/allcustomers", (req, res) => {
    try {
        const getallcus = customer.map((cus) => {
            return {
                Customer_Name: cus.Name,
                Date: cus.Date,
                StartTime: cus.StartTime,
                EndTime: cus.EndTime
            };
        });

        res.status(200).send({
            Feedback: "Customer details fetched successfully",
            getallcus
        });
    } catch (error) {
        res.status(400).send({
            Feedback: "Error Unable to fetch data",
            error: error.message
        });
    }
});





// Get Booked customer.

app_booking.get("/booked_rooms", (req, res) => {

    try {
        var Name = req.query.Name;
        let users = customer.filter(function (acc) {
            return acc.Name == Name
        })


        let rooms = users[0].Roomid

        let roomdetails = room_booking.filter((booking, index) => {
            console.log(index);
            return rooms.includes(index)
        })


        res.status(200).send({
            Feedback: "Data connecting successfully",
            roomdetails, Name
        })


    } catch (error) {
        res.status(500).send({
            Feedback: "No customers found at the given name"
        })
    }

})


app_booking.listen(PORT, () => console.log(`server connected successfully to ${PORT}`))