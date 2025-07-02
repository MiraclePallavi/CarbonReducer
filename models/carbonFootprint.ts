import mongoose , {model, Schema, models} from "mongoose";

const CarbonFootprintSchema = new Schema({
    userId: { type: String, required: true },
Body_Type: { type: String, default: 'normal' },
Sex: { type: String, default: 'male' },
Diet: { type: String, default: 'omnivore' },
How_Often_Shower: { type: String, default: 'daily' },
Heating_Energy_Source: { type: String, default: 'electricity' },
Transport: { type: String, default: 'private' },
Vehicle_Type: { type: String, default: 'petrol' },
Social_Activity: { type: String, default: 'sometimes' },
Frequency_of_Traveling_by_Air: { type: String, default: 'never' },
Monthly_Grocery_Bill: { type: Number, default: 0 },
Vehicle_Monthly_Distance_Km: { type: Number, default: 0 },
Waste_Bag_Size: { type: String, default: 'small' },
Waste_Bag_Weekly_Count: { type: Number, default: 0 },
How_Long_TV_PC_Daily_Hour: { type: Number, default: 0 },
How_Many_New_Clothes_Monthly: { type: Number, default: 0 },
How_Long_Internet_Daily_Hour: { type: Number, default: 0 },
Energy_efficiency: { type: String, default: 'No' },
Recycling: { type: [String], default: [] },
Cooking_With: { type: [String], default: [] },
carbonEmission: { type: Number, required: true},

}, { timestamps: true }
);

const CarbonFootprint = models.CarbonFootprint || model('CarbonFootprint', CarbonFootprintSchema)
export default CarbonFootprint;
