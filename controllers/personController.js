import Person from "../models/personModel.js";
import {
  personRegisterValidation,
  personUpdateValidation,
} from "../validationSchemas/PersonValidationSchema.js";

// Gauti visus vartotojo persons
export const getUserPersons = async (req, res, next) => {
  try {
    const persons = await Person.find({ owner: req.user.id }).select("-__v");
    res.status(200).json(persons);
  } catch (err) {
    next(err);
  }
};

// Sukurti naują person
export const registerPerson = async (req, res, next) => {
  const { error } = personRegisterValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const emailExists = await Person.findOne({
      email: req.body.email,
      owner: req.user.id,
    });
    if (emailExists)
      return res.status(400).json({ message: "El. paštas jau užimtas" });

    const newPerson = new Person({
      ...req.body,
      owner: req.user.id,
    });

    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (err) {
    next(err);
  }
};

// Atnaujinti person
export const updatePerson = async (req, res, next) => {
  const { error } = personUpdateValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const person = await Person.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!person)
      return res.status(404).json({ message: "Vartotojas nerastas" });

    Object.assign(person, req.body);
    const updatedPerson = await person.save();
    res.status(200).json(updatedPerson);
  } catch (err) {
    next(err);
  }
};

// Ištrinti person
export const deletePerson = async (req, res, next) => {
  try {
    const deletedPerson = await Person.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!deletedPerson)
      return res.status(404).json({ message: "Vartotojas nerastas" });

    res.status(200).json({ message: "Vartotojas ištrintas" });
  } catch (err) {
    next(err);
  }
};
