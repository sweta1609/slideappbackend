const Presentation=require("../models/presentation.model")
const User = require("../models/user.model")
const Slide = require("../models/slides.model")
const axios = require('axios');
const logger = require("../config/logger")
const {google} = require('googleapis');
const slides = google.slides('v1');


const createNewPresentation = async (req, res) => {
  try {
    const { access_token,title,batchUpdatePayload } = req.body;

    if (!access_token) {
      return res.status(400).json({ error: 'Access token is required.' });
    }

    const response = await axios.post(
      'https://slides.googleapis.com/v1/presentations',
      {
        title: title,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      }
    );

    const newPresentationId = response.data.presentationId;
    await updatePresentation(newPresentationId, access_token,batchUpdatePayload);
    res.status(200).json({ presentationId: newPresentationId });
  } catch (error) {
    console.error('Error creating presentation:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
  }
};





const updatePresentation = async (presentationId, access_token,batchUpdatePayload) => {
  try {

    const response = await axios.post(
      `https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`,
        batchUpdatePayload
      ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      }
    );

    console.log('Batch Update Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating presentation:', error.response ? error.response.data : error.message);
    throw error;  // or handle the error accordingly
  }
};

const fetchPresentationData = async (presentationId, access_token) => {
  try {
      const response = await axios.get(`https://slides.googleapis.com/v1/presentations/${presentationId}`, {
          headers: {
              Authorization: `Bearer ${access_token}`,
          },
      });

      return response.data;
  } catch (error) {
      console.error('Error fetching presentation data:', error);
      throw new Error('Failed to fetch presentation data');
  }
};

const editExistingPresentation = async(req,res)=>{
  try{
    const { access_token,presentationId,batchUpdatePayload } = req.body;
    await updatePresentation(presentationId,access_token,batchUpdatePayload)

  }catch(error){
    console.error('Error updating existing presentation:', error.response ? error.response.data : error.message);
    throw error; 

  }
}

const saveSlideData = async (jsonData, presentationId) => {
  try {
    const existingSlide = await Slide.findOne({ presentation_id: presentationId });

    if (existingSlide) {
      console.log('Slide with the same presentation ID already exists:', existingSlide);
      return existingSlide;
    }

    // Create a new slide document
    const newSlide = await Slide.create({
      jsonData,
      presentation_id: presentationId,
    });

    console.log('Slide saved successfully:', newSlide);
    return newSlide;
  } catch (error) {
    console.error('Error saving slide:', error);
    throw error;
  }
};



const getPresentationById = async (req, res) => {
  try {
    const presentationId = req?.params?.id;
    const access_token = req.headers.authorization.split(' ')[1];

    const presentationData = await fetchPresentationData(presentationId, access_token);

    console.log('Fetched Presentation Data:', presentationData);
    const { presentationId: _, ...jsonData } = presentationData;

    await saveSlideData(jsonData, presentationId);

    res.json({ success: true, presentationData });
  } catch (error) {
    console.error('Error in getPresentationById:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};



module.exports = {

  createNewPresentation,
  getPresentationById,
  editExistingPresentation


  };
  