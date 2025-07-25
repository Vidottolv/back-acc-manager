import preference from "../models/preferences.js";

export default class PreferenceController {
     
    static getPreferences = async (req, res, next) => {
        try {
            const preferences = await preference.find({ idUser: req.user.id });
            res.status(200).send(preferences);
        } catch (error) {
            next(error);
        }
    }

    static postPreferences = async (req, res, next) => {
        try {
            let newPreference = new preference({
                ...req.body, 
                idUser: req.user.id});

            const preferenceResponse = await newPreference.save();
            res.status(201).send(preferenceResponse.toJSON());            
        } catch (error) {
            next(error);
        }
    }

    static updatePreference = async (req, res, next) => {
        try {
          const id = req.params.id;
          await preference.findByIdAndUpdate(id, {$set: req.body});
          res.status(200).send({message: "Updated successfully"});
        } catch (error) {
            next(error);
        }
    }

}