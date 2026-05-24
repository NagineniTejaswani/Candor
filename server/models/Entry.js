import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text:{
        type: String,
        required: true,
        trim: true,
        minLength: [10, "Text must be at least 10 characters long"]
    },
    mood:{
        enum: ["happy","joyful","excited","calm","peaceful","relaxed","content","confident","motivated","hopeful","grateful","proud","energetic","inspired","focused","curious","thoughtful","indifferent","bored","confused","tired","distracted","awkward","observant","sad","angry","frustrated","anxious","stressed","overwhelmed","lonely","disappointed","hurt","guilty","jealous","nervous","restless","fearful","conflicted","emotional","nostalgic","moody","uncertain","vulnerable","hopeful-worried","calm-sad","excited-nervous"],
        type:String,
        trim:true,
        default:"neutral"
    },
    aiSummary:{
        type:String,
        default:""
    },
    aiMoodAnalysis:{
        type:Number,
        min:1,
        max:10,
        default:null
    }

});

export default mongoose.model('Entry', entrySchema);