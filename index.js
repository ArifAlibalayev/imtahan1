import express from "express"
import 'dotenv/config'
import mongoose, { Schema } from "mongoose"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT

mongoose.connect(process.env.DB_SECRET_KEY)
  .then(() => console.log('Connected'))
  .catch(err => console.log(err.message))

const productsSchema = new Schema({
  name: String,
  price: Number,
  category: String,
});

const productModel = mongoose.model("products", productsSchema)



app.post("/", async (req, res) => {
  try {
    const { name, price, category } = req.body
    const newProduct = new productModel({ name, price, category })
    await newProduct.save()
    res.send("created")
  } catch (error) {
    res.send("")
  }
}
)

app.get("/", async (req, res) => {
  try {
    const { name, price, category } = req.body
    const product = await productModel.find({})
    res.send(product)
  } catch (error) {
    res.send("")
  }
})

app.get("/:id", async (req, res) => {
  const { id } = req.params
  const product = await productModel.findById(id)
  res.send(product)

})

app.delete("/:id", async (req,res)=>{
  
  const {id} = req.params
  const product = await productModel.findByIdAndDelete(id)
  res.send(product)

})

app.put("/:id", async (req,res)=>{
  try{
    const {id} = req.params
    const {name, price, category} = req.body
    const product = await productModel.findByIdAndUpdate(id,{name, price, category})
    res.send(product)
  }catch(error) {
    res.send("")
  }
  
})

app.listen(port, () => {
  console.log(`Running on ${port} port`)
})
