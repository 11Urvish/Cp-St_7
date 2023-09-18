const stationModel = require("../models/stationModel");
const userModel = require("../models/userModel");
const { propogateError, generateId } = require("../utils/helper");
const { createNewState } = require("./stateServices");

const getAllStations = async () => {
    try {
        return { data: await stationModel.find({}, { updatedAt: 0, createdAt: 0, __v: 0 }), message: "Statoion Details" }
    } catch (error) {
        propogateError(error.message || "Error in finding stations!")
    }
}

const createStation = async (stationData) => {
    try {
        const station = new stationModel(stationData)

        const tenant = await userModel.findOne({ tenantId: stationData.tenantId })
        if (!tenant) {
            propogateError("Tenant does not exist!")
        }

        let stations = tenant.stations
        stations.push(station._id)
        tenant.stations = stations

        await tenant.save()

        return { data: await station.save(), message: "Station Created" }
    }
    catch (error) {
        return propogateError(error.message || "Error in creating new station!")
    }
}

const updateStation = async (stationData) => {
    try {
        const station = await stationModel.findById(stationData.stationId)

        if (!station) {
            return propogateError("Station does not exist!")
        }

        const oldTenant = await userModel.findOne({ tenantId: station.tenantId })
        const newTenant = await userModel.findOne({ tenantId: stationData.tenantId })

        if (oldTenant.tenantId != newTenant.tenantId) {
            oldTenant.stations = oldTenant.stations.filter(stationId => {
                return stationId != station._id.toString()
            })

            await oldTenant.save()

            let stations = newTenant.stations
            stations.push(station._id)
            newTenant.stations = stations

            await newTenant.save()
        }

        station.tenantId = stationData.tenantId || station.tenantId

        if (stationData.info) {
            station.info.name = stationData.info.name || station.info.name
            station.info.accessType = stationData.info.accessType || station.info.accessType
            station.info.desc = stationData.info.desc || station.info.desc
            station.info.address = stationData.info.address || station.info.address
            station.info.stationStatus = stationData.info.stationStatus || station.info.stationStatus
            station.info.energyLimit = stationData.info.energyLimit || station.info.energyLimit
        }

        if (stationData.timings) {
            station.timings.from = stationData.timings.from || station.timings.from
            station.timings.to = stationData.timings.to || station.timings.to
        }

        if (stationData.owner) {
            station.owner.name = stationData.owner.name || station.owner.name
            station.owner.number = stationData.owner.number || station.owner.number
            station.owner.email = stationData.owner.email || station.owner.email
            station.owner.address = stationData.owner.address || station.owner.address
        }

        station.chargers = stationData.chargers || station.chargers

        return { data: await station.save(), message: "Station Updated!" }
    } catch (error) {
        return propogateError(error.message || "Error in updating station!")
    }
}

const deleteStation = async ({ deleteAll, stationId }) => {
    try {

        if (deleteAll) {
            return { data: await stationModel.deleteMany({}), message: "All Stations Deleted!" }
        }

        const station = await stationModel.findById(stationId)

        if (!station) {
            return propogateError("Station does not exist!")
        }

        return { data: await stationModel.deleteOne({ _id: stationId }), message: "Station Deleted" }
    } catch (error) {
        return propogateError(error.message || "Error in deleting station!")
    }
}

module.exports.getAllStations = getAllStations
module.exports.createStation = createStation
module.exports.updateStation = updateStation
module.exports.deleteStation = deleteStation