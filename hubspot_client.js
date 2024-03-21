require('dotenv').config();
const axios = require('axios');

const CURRENCIES_OBJECT_TYPE_ID = process.env.CURRENCIES_OBJECT_TYPE_ID;
const HUBSPOT_PRIVATE_APP_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;

const instance = axios.create({
  baseURL: 'https://api.hubapi.com/',
  timeout: 1000,
  headers: {
    'Authorization': `Bearer ${HUBSPOT_PRIVATE_APP_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

const hubspot_client = {
  getCurrencies: async () => {
    const response = await instance.get(
      `crm/v3/objects/${CURRENCIES_OBJECT_TYPE_ID}`,
      {
        params: {
          limit: 100,
          archived: false,
          properties: "name, value, description"
        }
      }
    )

    if (response.status !== 200) {
      throw new Error('Error fetching currencies');
    }

    return response.data.results.map((currency) => currency.properties);
  },
  updateCurrency: async (data) => {
    const response = await instance.post(
      `crm/v3/objects/${CURRENCIES_OBJECT_TYPE_ID}`,
      { properties: data }
    );

    if ([200, 201].includes(response.status) === false)
      throw new Error('Error updating currency');
  }
}

module.exports = hubspot_client;
