const chargerModel = require("../models/chargerModel")
const stationModel = require("../models/stationModel")
const { propogateError, generateId } = require("../utils/helper")

const getAllChargers = async (stationId) => {
    try {
        const station = await stationModel.findById(stationId).populate({
            path: "chargers",
            select: { updatedAt: 0, createdAt: 0, __v: 0 },
            populate: {
                path: "connectors",
                select: { updatedAt: 0, createdAt: 0, __v: 0 },
            }
        })

        if (!station) {
            return propogateError("Station does not exist!")
        }

        return { data: station.chargers || [], message: "Charger Details!" }
    }
    catch (error) {
        return propogateError(error.message || "Error in finding chargers!")
    }
}

const createCharger = async (chargerData) => {
    try {
        const charger = new chargerModel(chargerData)

        const station = await stationModel.findById(chargerData.stationId)
        if (!station) {
            return propogateError("Station does not exist!")
        }

        charger.stationId = station.id
        charger.id = "C" + generateId(12)

        let chargers = station.chargers
        chargers.push(charger._id)
        await station.save()

        return { data: await charger.save(), message: "Charger Created" }
    }
    catch (error) {
        console.log(error)
        return propogateError(error.message || "Error in creating new charger!")
    }
}

const updateCharger = async (chargerData) => {
    try {
        const charger = await chargerModel.findById(chargerData.chargerId);

        if (!charger) {
            return propogateError("Charger does not exist!")
        }

        if (chargerData.stationId && charger.stationId.toString() != chargerData.stationId) {
            const oldStation = await stationModel.findById(charger.stationId)
            const newStation = await stationModel.findById(chargerData.stationId)

            if (!oldStation || !newStation) {
                return propogateError("Station does not exist!")
            }

            // Remove from old Station
            oldStation.chargers = oldStation.chargers.filter(chargerId => {
                return chargerId != charger._id.toString()
            })

            await oldStation.save()

            // Add to new Station
            let chargers = newStation.chargers
            chargers.push(charger._id)
            newStation.chargers = chargers

            await newStation.save()
        }

        charger.stationId = chargerData.stationId || charger.stationId
        charger.chargeSpotName = chargerData.chargeSpotName || charger.chargeSpotName
        charger.desc = chargerData.desc || charger.desc
        charger.cooldownTime = chargerData.cooldownTime || charger.cooldownTime
        charger.oem = chargerData.oem || charger.oem
        charger.tariff = chargerData.tariff || charger.tariff
        charger.chargingSpeed = chargerData.chargingSpeed || charger.chargingSpeed
        charger.installationDate = chargerData.installationDate || charger.installationDate
        charger.connectors = chargerData.connectors || charger.connectors
        charger.status = chargerData.status || charger.status


        return { data: await charger.save(), message: "Charger Updated!" }
    }
    catch (error) {
        return propogateError(error.message || "Error in updating charger!")
    }
}

const deleteCharger = async ({ deleteAll, stationId, chargerId }) => {
    try {
        if (deleteAll) {

            const stations = await stationModel.find()

            stations.map(async station => {
                station.chargers = []
                await station.save()
            })

            return { data: await chargerModel.deleteMany(), message: "All Chargers Deleted" }
        }

        const station = await stationModel.findById(stationId)
        const charger = await chargerModel.findById(chargerId)

        if (!charger || !station) {
            return propogateError(((!station) ? "Station " : "Charger ") + "does not exist!")
        }

        let chargers = station.chargers
        chargers = chargers.filter(id => {
            return (id != charger._id.toString())
        })
        station.chargers = chargers

        await station.save()

        return { data: await chargerModel.deleteOne({ _id: chargerId }), message: "Charger Deleted" }
    }
    catch (error) {
        return propogateError(error.message || "Error in deleing charger!")
    }
}

module.exports.getAllChargers = getAllChargers
module.exports.createCharger = createCharger
module.exports.updateCharger = updateCharger
module.exports.deleteCharger = deleteCharger