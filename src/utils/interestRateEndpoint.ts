import axios from 'axios';

const getInterestRate = async (): Promise<number> => {
  const response = await axios.get('https://australia-southeast1-mitchsandbox.cloudfunctions.net/getCaseStudyConfig');
  return response.data.interestRate;
};

export default getInterestRate;