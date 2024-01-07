const mongoose = require("mongoose")

const pdfDetailsSchema = new mongoose.Schema({
    pdf: String,
    title: String
})

mongoose.model("PdfDetails" , pdfDetailsSchema)