export default {
  id: 'wifi',
  type: 'http-get',
  dependent: 'none',
  resettable: false,
  bearer: true,
  url: 'https://api.airtable.com/v0/appoOTcmp4z8GJhsb/wifi_sites?count=-1',
  options: {
    params: {
      headers: {
        'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_ACCESS_TOKEN,
      },
    },
    success: function(data, dependent) {
      if (import.meta.env.VITE_DEBUG) console.log('wifi data:', data);
      data.features = [];
      data.records.forEach(function(record) {
        if (record.fields.X && record.fields.Y) {
          record.geometry = {
            type: 'Point',
            coordinates: [record.fields.X, record.fields.Y],
          };
          record.properties = record.fields
          record.type = 'Feature';
          data.features.push(record);
        }
      });
      // data.features = data.records;
    }
  },
};
