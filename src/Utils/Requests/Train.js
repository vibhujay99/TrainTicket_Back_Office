import axios from "axios";

export const getAvailableTrainsOfOwner = () => {
    return axios.get("/train/owner-train-available");
}

export const getAllAvailableTrains = () => axios.get("/train/all-train-available");

export const getUnavailableTrainsOfOwner = () => axios.get('/train/owner-train-unavailable');
export const getAllUnavailableTrains = () => axios.get('/train/all-train-unavailable');

export const addNewTrain = body => axios.post('/train', body);

export const getTrainBySlug = slug => axios.get('/train/' + slug);

export const removeTrain = slug => axios.delete('/train/' + slug);

export const updateTrain = (slug, body) => axios.put('/train/' + slug, body);