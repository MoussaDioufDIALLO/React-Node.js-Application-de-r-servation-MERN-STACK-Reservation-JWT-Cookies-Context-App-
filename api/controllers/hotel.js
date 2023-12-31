import Hotel from "../models/Hotel.js"

export const createHotel = async (req, res, next)=>{
    

    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)

    }catch(err){
        next(err); 
    }

}

export const updateHotel = async (req, res, next)=>{
    
    try {
        const updatedModel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedModel); 

    }catch(err){
        res.status(500).json(err)
    }

}
export const deleteHotel = async (req, res, next)=>{
    
    const newHotel = new Hotel(req.body)
    try {
        await Hotel.findByIdAndDelete(req.params.id);
            res.status(200).json("Hotel has been deleted."); 
        }catch(err){
            res.status(500).json(err)
        }

}
export const getHotel = async (req, res, next)=>{
    try {
        const hotel=await Hotel.findById(req.params.id);
        }catch(err){
            res.status(500).json(err)
        }
}
export const getHotels  = async (req, res, next)=>{
    try {
        const hotels=await Hotel.find();
        res.status(200).json(hotels); 
        }catch(err){
            next(err)
        }
}

export const countByCity = async (req, res, next)=>{
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list); 
        }catch(err){
            next(err)
        }
}