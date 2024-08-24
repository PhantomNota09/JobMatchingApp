import axios from 'axios';

export const fetchJobsFromAPI = async (preferences) => {
  const { location, jobType } = preferences;
  return axios.get('https://api.example.com/jobs', {
    params: { location, jobType },
  });
};
