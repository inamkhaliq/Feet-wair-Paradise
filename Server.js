const express = require('express');
const app = express();
const jsonwebtoke=require('jsonwebtoken')

var bodyParser = require('body-parser')
var cors = require('cors')

const { default: mongoose } = require('mongoose');
const { User } = require("./DB/Models/User")
// mongoose.connect('mongodb+srv://AhmadSh:raheel123@cluster0.1o1wb3p.mongodb.net/inam').then((res)=>{
//     console.log("DB Connected................................")
// }).catch((err)=>{
//     console.log(err)
// })
const connectDB = async () => {
    // mongoose.connect("mongodb+srv://AhmadSh:raheel123@cluster0.1o1wb3p.mongodb.net/inam", {
    mongoose.connect("mongodb+srv://ShoeStoreAdmin:ShoeStoreAdmin@cluster0.nsrnana.mongodb.net/SHOESTORE")
        .then(() => {
            console.log("Successfully connected to MongoDB")

        }).catch((error) => {
            console.error("Unable to connect to MongoDB", error);
        })

}
 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(cors()); //cors for frontend compatibility
app.use(express.json()); // parse object data
app.use(express.urlencoded({ extended: true }))  // parse form data

app.use(express.static('./build'));










app.post('/sign-up', async (req, res) => {
    try {
        // console.log(req.body);
        let newUser =  new User(req.body)
        newUser.save()
        res.status(200).json({ message:true,newUser })
    } catch (error) {
        res.status(500).json({ message: "data not added", error: error.message })

    }
})

app.post('/log-in', async (req, res) => {
    // console.log(req.body)
    // let loggedUser = users.find((user)=>(user.Email === req.body.Email && user.Password === req.body.Password ))
    let loggedUser = await User.findOne({ Email: req.body.Email, Password: req.body.Password })
    // console.log(loggedUser);
        jsonwebtoke.sign(
            {
                Email:loggedUser.Email,Pasword:loggedUser.Password,
            },
            'gandu',
            {expiresIn:'1h'},
            (eror,token)=>{
                res.json({
                    mytoken:token,
                    loggedUser,
                })
            }
        )

    // res.json({ loggedUser, success: true })
})
app.post('/check-token',async (req,res)=>{
//    if(res.body.usertoken){
    try{
        const tokenwaladatamilgya=jsonwebtoke.verify(req.body.usertoken,"gandu");
        let loggedUser=await User.findOne({Email:tokenwaladatamilgya.Email, Password:tokenwaladatamilgya.Pasword});
        // console.log(loggedUser)
        if(loggedUser){
            res.status(200).json({
                message:true,
                loggedUser,
            })

        }
        }catch(error){
        res.status(4).json({ error: 'Invalid token'})
    }
//    }
})



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const poart = 7080;

connectDB().then(() => {

    app.listen(poart, () => {
        console.log(`Server is running at ${poart}`);
    });
})