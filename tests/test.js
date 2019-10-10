#!/usr/bin/env node

const request = require('request-promise-native');
const polyline = require('@mapbox/polyline');

const _ = require('lodash');

const HOST = '127.0.0.1:8005'

const options = {
  method: 'POST',
  uri: `http://${HOST}/route`,
  body: {
    locations: [
      // UAlbany
      { lat: 42.688188, lon: -73.823153 },
      // Pho Yum
      { lat: 42.715296, lon: -73.830533 },
      // Hannaford
      { lat: 42.71651, lon: -73.812453 },
      // Rensselaer Walmart
      { lat: 42.641411, lon: -73.699788 }
    ],
    costing: 'auto',
    directions_options: { units: 'miles' }
  },
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true // Automatically parses the JSON string in the response
};

(async () => {
  const response = await request(options);
  // console.error(JSON.stringify(response, null, 4));

  const shapes = response.trip.legs.map(({ shape }) => polyline.decode(shape));

  const shape = _.flatten(
    shapes.map((lineStr, i) => (i ? _.tail(lineStr) : lineStr))
  );

  const encoded_polyline = polyline.encode(shape);

  const matchOpts = {
    method: 'POST',
    uri: `http://${HOST}/trace_attributes`,
    body: {
      filters: {
        attributes: ['edge.way_id', 'edge.traversability'],
        action: 'include'
      },
      encoded_polyline,
      shape_match: 'walk_or_snap',
      costing: 'auto',
      directions_options: { units: 'miles' }
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  };

  const matched = await request(matchOpts);
  console.log(JSON.stringify(matched, null, 4));
  const wayIds = _.uniqWith(
    matched.edges.map(({ way_id }) => way_id),
    _.isEqual
  );

  const qgisFilter = `"id" IN (${wayIds.map(w => `'${w}'`)})`;
  console.log(qgisFilter);
})();
