const API_URL = 'https://serpapi.com/search.json'; // Base URL for SerpApi
const API_KEY = 'a8e31933565884a32de4caf3a04b4f1345ed0d6a23c4e0652c0c1adbc73ff283'; // Your API Key

export const fetchJobsFromSerpApi = async (query, location) => {
  try {
    // Construct the API URL with parameters
    const response = await fetch(`${API_URL}?engine=google_jobs&q=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&hl=en&api_key=${API_KEY}`);
    
    if (!response.ok) {
      // Log the status and response body for debugging
      const errorText = await response.text();
      console.error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data); // Log the response to verify its structure

    // Check if jobs_results is available in the response
    if (data && data.jobs_results) {
      return data.jobs_results.map(job => ({
        title: job.title || 'No title available',
        companyName: job.company_name || 'No company name available',
        location: job.location || 'No location available',
        description: job.description || 'No description available',
        highlights: job.job_highlights || [],
      }));
    } else {
      throw new Error('No jobs found in the response.');
    }
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};
