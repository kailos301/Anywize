export default {
  "id": 4,
  "tour_id": 3,
  "uuid": "3f1943d0-c9eb-11eb-9585-374befa75bfc",
  "pathway": [
    {
      "id": 2,
      "city": "City 2",
      "name": "Vea San Pedro",
      "alias": "Klein Inc",
      "email": "macy61@yahoo.com",
      "phone": "123321312312",
      "deposit_agreement": 'KEY_BOX', // 'BRING_KEY' | 'NONE'
      "keybox_code": '123',
      "Orders": [
        {
          "id": 8,
          "number": "number",
          "customer_id": 7,
          "description": "This is the order description for Bruen, Halvorson and Carter",
          "supplier_id": 1,
          "delivered_at": "22123123",
        }
      ],
      "street": "st",
      "country": "BR",
      "tour_id": 3,
      "zipcode": "123",
      "longitude": -59.668550704589165,
      "latitude": -33.677911362489525,
      "coordinates": {
        "type": "Point",
        "coordinates": [
          -33.677911362489525,
          -59.668550704589165,
        ]
      },
      "street_number": "123123",
      "tour_position": 1
    },
    {
      "id": 8,
      "city": "City 2",
      "name": "Ferreteria Nacion",
      "alias": "Ferreteria Nacion",
      "email": "madisyn.ullrich86@hotmail.com",
      "phone": "123321312312",
      "deposit_agreement": 'KEY_BOX', // 'BRING_KEY' | 'NONE'
      "keybox_code": '123',
      "Orders": [
        {
          "id": 9,
          "number": "number",
          "customer_id": 8,
          "description": "This is the order description for Sipes - Okuneva",
          "supplier_id": 1
        },
        {
          "id": 10,
          "number": "number",
          "customer_id": 8,
          "description": "This is the order description for Sipes - Okuneva",
          "supplier_id": 1
        }
      ],
      "street": "st",
      "country": "BR",
      "tour_id": 3,
      "zipcode": "123",
      "longitude": -59.6594484271203244,
      "latitude": -33.68181972193268,
      "coordinates": {
        "type": "Point",
        "coordinates": [
          -33.68181972193268,
          -59.6594484271203244,
        ]
      },
      "street_number": "123123",
      "tour_position": 1
    },
  ],
  "start_date": null,
  "end_date": null,
  "code": "ZOIBDM",
  "password": "8756",
  "Tour": {
    "id": 3,
    "supplier_id": 1,
    "transport_agent_id": 1,
    "name": "Tour: Considine, Cassin and Zulauf",
    "description": "this is the tour 1",
    "active": true,
    "updated_at": "2021-06-10T12:56:17.000Z",
    "created_at": "2021-06-10T12:56:17.000Z",
    "TransportAgent": {
      "id": 1,
      "name": "Name - Breitenberg and Sons",
      "alias": "Alias - Olson - Breitenberg",
      "street": "street",
      "street_number": "123123",
      "city": "City",
      "country": "AR"
    },
    "Supplier": {
      "id": 1,
      "name": "Name - Sauer Group",
      "coordinates": {
        "type": "Point",
        "coordinates": [
          -59.67128397477,
          -33.681292992081
        ]
      }
    }
  },
  "Orders": [
    {
      "id": 8,
      "delivered_at": null
    },
    {
      "id": 9,
      "delivered_at": null
    },
    {
      "id": 10,
      "delivered_at": null
    }
  ],
  "Stops": [{ // array with the stops the driver created
    "id": 1,
    "customer_id": 2,
    "signature_file": 'bla.com/png.png',
    "pictures": ['bla.com/one.png', 'bla.com/two.png'],
    "route_id": 4,
    "time": '2021-01-01T10:00:00',
    "customer_signed": true,
    "coordinates": [
      -33.677911362489525,
      -59.668550704589165,
    ],
    "meet_customer": true,
    "reason": null,
    "driver_name": "John",
    "driver_phone": "1231313123",
    "goods_back": false,
  }],
  "DriversLocations": [{ // array that contains all the positions the driver reported
    "location": {
      "type": "Point",
      "coordinates": [10, 10.1] // longitude,latitude
    },
    "created_at": "2021-01-01T10:00:00",
  }, {
    "location": {
      "type": "Point",
      "coordinates": [-59.66502886988825, -33.67806717009697] // longitude,latitude
    },
    "created_at": "2021-01-01T10:00:00",
  }],
  "RoutesNavigations": [{ // array that contains all the directions the driver was given
    "customer_id": 2,
    "navigation": {
      "routes": [
        {
          "weight_name": "auto",
          "weight": 252.894,
          "duration": 188.813,
          "distance": 951.133,
          "legs": [
            {
              "via_waypoints": [],
              "admins": [{ "iso_3166_1_alpha3": "ARG", "iso_3166_1": "AR" }],
              "weight": 252.894,
              "duration": 188.813,
              "steps": [
                {
                  "intersections": [
                    {
                      "bearings": [215],
                      "entry": [true],
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "geometry_index": 0,
                      "location": [-59.67337, -33.681274]
                    }
                  ],
                  "maneuver": {
                    "type": "depart",
                    "instruction": "Drive southwest on Arzobispo Bottaro.",
                    "bearing_after": 215,
                    "bearing_before": 0,
                    "location": [-59.67337, -33.681274]
                  },
                  "name": "Arzobispo Bottaro",
                  "duration": 7.491,
                  "distance": 29.134,
                  "driving_side": "right",
                  "weight": 8.428,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.67337, -33.681274],
                      [-59.673549, -33.681485]
                    ],
                    "type": "LineString"
                  }
                },
                {
                  "intersections": [
                    {
                      "bearings": [35, 305],
                      "entry": [false, true],
                      "in": 0,
                      "turn_weight": 8,
                      "turn_duration": 2.208,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 1,
                      "geometry_index": 1,
                      "location": [-59.673549, -33.681485]
                    }
                  ],
                  "maneuver": {
                    "type": "turn",
                    "instruction": "Turn right onto Doctor Norberto Dávila.",
                    "modifier": "right",
                    "bearing_after": 305,
                    "bearing_before": 215,
                    "location": [-59.673549, -33.681485]
                  },
                  "name": "Doctor Norberto Dávila",
                  "duration": 17.688,
                  "distance": 86,
                  "driving_side": "right",
                  "weight": 25.415,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.673549, -33.681485],
                      [-59.674309, -33.681044]
                    ],
                    "type": "LineString"
                  }
                },
                {
                  "intersections": [
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [35, 125],
                      "duration": 11.893,
                      "turn_weight": 10,
                      "turn_duration": 2.105,
                      "mapbox_streets_v8": { "class": "secondary" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 21.011,
                      "geometry_index": 2,
                      "location": [-59.674309, -33.681044]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [35, 215],
                      "duration": 9.457,
                      "turn_weight": 2,
                      "turn_duration": 0.007,
                      "mapbox_streets_v8": { "class": "secondary" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 12.631,
                      "geometry_index": 3,
                      "location": [-59.67377, -33.680409]
                    },
                    {
                      "bearings": [35, 215],
                      "entry": [true, false],
                      "in": 1,
                      "turn_weight": 2,
                      "turn_duration": 0.007,
                      "mapbox_streets_v8": { "class": "secondary" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "geometry_index": 4,
                      "location": [-59.67325, -33.679795]
                    }
                  ],
                  "maneuver": {
                    "type": "turn",
                    "instruction": "Turn right onto Avenida 11 de Septiembre.",
                    "modifier": "right",
                    "bearing_after": 35,
                    "bearing_before": 305,
                    "location": [-59.674309, -33.681044]
                  },
                  "name": "Avenida 11 de Septiembre",
                  "duration": 30.807,
                  "distance": 255,
                  "driving_side": "right",
                  "weight": 46.037,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.674309, -33.681044],
                      [-59.67377, -33.680409],
                      [-59.67325, -33.679795],
                      [-59.672727, -33.679178]
                    ],
                    "type": "LineString"
                  }
                },
                {
                  "intersections": [
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [127, 215],
                      "duration": 17.795,
                      "turn_weight": 6,
                      "turn_duration": 2.315,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 23.028,
                      "geometry_index": 5,
                      "location": [-59.672727, -33.679178]
                    },
                    {
                      "bearings": [126, 307],
                      "entry": [true, false],
                      "in": 1,
                      "turn_weight": 2,
                      "turn_duration": 0.021,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "geometry_index": 6,
                      "location": [-59.671984, -33.679638]
                    }
                  ],
                  "maneuver": {
                    "type": "turn",
                    "instruction": "Turn right onto Riobamba.",
                    "modifier": "right",
                    "bearing_after": 127,
                    "bearing_before": 35,
                    "location": [-59.672727, -33.679178]
                  },
                  "name": "Riobamba",
                  "duration": 32.215,
                  "distance": 166,
                  "driving_side": "right",
                  "weight": 41.228,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.672727, -33.679178],
                      [-59.671984, -33.679638],
                      [-59.671283, -33.68006]
                    ],
                    "type": "LineString"
                  }
                },
                {
                  "intersections": [
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [36, 306],
                      "duration": 19.675,
                      "turn_weight": 12.5,
                      "turn_duration": 5.275,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 28.7,
                      "geometry_index": 7,
                      "location": [-59.671283, -33.68006]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [35, 216],
                      "duration": 15.487,
                      "turn_weight": 2,
                      "turn_duration": 0.007,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 19.415,
                      "geometry_index": 8,
                      "location": [-59.670775, -33.679477]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [30, 215],
                      "duration": 1.646,
                      "turn_weight": 2,
                      "turn_duration": 0.026,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 3.822,
                      "geometry_index": 9,
                      "location": [-59.670243, -33.67884]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [35, 210],
                      "duration": 15.49,
                      "turn_weight": 2,
                      "turn_duration": 0.01,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 19.028,
                      "geometry_index": 10,
                      "location": [-59.670194, -33.678769]
                    },
                    {
                      "bearings": [36, 215],
                      "entry": [true, false],
                      "in": 1,
                      "turn_weight": 2,
                      "turn_duration": 0.008,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "geometry_index": 11,
                      "location": [-59.669668, -33.678137]
                    }
                  ],
                  "maneuver": {
                    "type": "turn",
                    "instruction": "Turn left onto Miguel Porta.",
                    "modifier": "left",
                    "bearing_after": 36,
                    "bearing_before": 126,
                    "location": [-59.671283, -33.68006]
                  },
                  "name": "Miguel Porta",
                  "duration": 77.206,
                  "distance": 344,
                  "driving_side": "right",
                  "weight": 100.355,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.671283, -33.68006],
                      [-59.670775, -33.679477],
                      [-59.670243, -33.67884],
                      [-59.670194, -33.678769],
                      [-59.669668, -33.678137],
                      [-59.669137, -33.677532]
                    ],
                    "type": "LineString"
                  }
                },
                {
                  "intersections": [
                    {
                      "bearings": [125, 216],
                      "entry": [true, false],
                      "in": 1,
                      "turn_weight": 8,
                      "turn_duration": 2.105,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "geometry_index": 12,
                      "location": [-59.669137, -33.677532]
                    }
                  ],
                  "maneuver": {
                    "type": "turn",
                    "instruction": "Turn right onto Balcarce.",
                    "modifier": "right",
                    "bearing_after": 125,
                    "bearing_before": 36,
                    "location": [-59.669137, -33.677532]
                  },
                  "name": "Balcarce",
                  "duration": 23.405,
                  "distance": 71,
                  "driving_side": "right",
                  "weight": 31.43,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.669137, -33.677532],
                      [-59.668511, -33.677903]
                    ],
                    "type": "LineString"
                  }
                },
                {
                  "intersections": [
                    {
                      "bearings": [305],
                      "entry": [true],
                      "in": 0,
                      "admin_index": 0,
                      "geometry_index": 13,
                      "location": [-59.668511, -33.677903]
                    }
                  ],
                  "maneuver": {
                    "type": "arrive",
                    "instruction": "You have arrived at your destination.",
                    "bearing_after": 0,
                    "bearing_before": 125,
                    "location": [-59.668511, -33.677903]
                  },
                  "name": "Balcarce",
                  "duration": 0,
                  "distance": 0,
                  "driving_side": "right",
                  "weight": 0,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.668511, -33.677903],
                      [-59.668511, -33.677903]
                    ],
                    "type": "LineString"
                  }
                }
              ],
              "distance": 951.133,
              "summary": "Avenida 11 de Septiembre, Miguel Porta"
            }
          ],
          "geometry": {
            "coordinates": [
              [-59.67337, -33.681274],
              [-59.673549, -33.681485],
              [-59.674309, -33.681044],
              [-59.672727, -33.679178],
              [-59.671283, -33.68006],
              [-59.669137, -33.677532],
              [-59.668511, -33.677903]
            ],
            "type": "LineString"
          }
        },
        {
          "weight_name": "auto",
          "weight": 274.003,
          "duration": 207.552,
          "distance": 955.133,
          "legs": [
            {
              "via_waypoints": [],
              "admins": [{ "iso_3166_1_alpha3": "ARG", "iso_3166_1": "AR" }],
              "weight": 274.003,
              "duration": 207.552,
              "steps": [
                {
                  "intersections": [
                    {
                      "bearings": [215],
                      "entry": [true],
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "geometry_index": 0,
                      "location": [-59.67337, -33.681274]
                    }
                  ],
                  "maneuver": {
                    "type": "depart",
                    "instruction": "Drive southwest on Arzobispo Bottaro.",
                    "bearing_after": 215,
                    "bearing_before": 0,
                    "location": [-59.67337, -33.681274]
                  },
                  "name": "Arzobispo Bottaro",
                  "duration": 7.491,
                  "distance": 29.134,
                  "driving_side": "right",
                  "weight": 8.428,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.67337, -33.681274],
                      [-59.673549, -33.681485]
                    ],
                    "type": "LineString"
                  }
                },
                {
                  "intersections": [
                    {
                      "bearings": [35, 305],
                      "entry": [false, true],
                      "in": 0,
                      "turn_weight": 8,
                      "turn_duration": 2.208,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 1,
                      "geometry_index": 1,
                      "location": [-59.673549, -33.681485]
                    }
                  ],
                  "maneuver": {
                    "type": "turn",
                    "instruction": "Turn right onto Doctor Norberto Dávila.",
                    "modifier": "right",
                    "bearing_after": 305,
                    "bearing_before": 215,
                    "location": [-59.673549, -33.681485]
                  },
                  "name": "Doctor Norberto Dávila",
                  "duration": 17.688,
                  "distance": 86,
                  "driving_side": "right",
                  "weight": 25.415,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.673549, -33.681485],
                      [-59.674309, -33.681044]
                    ],
                    "type": "LineString"
                  }
                },
                {
                  "intersections": [
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [35, 125],
                      "duration": 11.893,
                      "turn_weight": 10,
                      "turn_duration": 2.105,
                      "mapbox_streets_v8": { "class": "secondary" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 21.011,
                      "geometry_index": 2,
                      "location": [-59.674309, -33.681044]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [35, 215],
                      "duration": 9.457,
                      "turn_weight": 2,
                      "turn_duration": 0.007,
                      "mapbox_streets_v8": { "class": "secondary" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 12.631,
                      "geometry_index": 3,
                      "location": [-59.67377, -33.680409]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [35, 215],
                      "duration": 9.457,
                      "turn_weight": 2,
                      "turn_duration": 0.007,
                      "mapbox_streets_v8": { "class": "secondary" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 12.395,
                      "geometry_index": 4,
                      "location": [-59.67325, -33.679795]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [35, 215],
                      "duration": 23.707,
                      "turn_weight": 2,
                      "turn_duration": 0.007,
                      "mapbox_streets_v8": { "class": "secondary" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 28.07,
                      "geometry_index": 5,
                      "location": [-59.672727, -33.679178]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [35, 215],
                      "duration": 25.507,
                      "turn_weight": 2,
                      "turn_duration": 0.007,
                      "mapbox_streets_v8": { "class": "secondary" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 30.05,
                      "geometry_index": 6,
                      "location": [-59.672236, -33.678598]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [15, 215],
                      "duration": 3.383,
                      "turn_weight": 2,
                      "turn_duration": 0.083,
                      "mapbox_streets_v8": { "class": "secondary" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 5.63,
                      "geometry_index": 7,
                      "location": [-59.671703, -33.677971]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [35, 195],
                      "duration": 25.225,
                      "turn_weight": 2,
                      "turn_duration": 0.025,
                      "mapbox_streets_v8": { "class": "secondary" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 29.72,
                      "geometry_index": 8,
                      "location": [-59.671672, -33.677872]
                    },
                    {
                      "bearings": [35, 215],
                      "entry": [true, false],
                      "in": 1,
                      "turn_weight": 0.5,
                      "turn_duration": 0.007,
                      "mapbox_streets_v8": { "class": "secondary" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "geometry_index": 9,
                      "location": [-59.671157, -33.677251]
                    }
                  ],
                  "maneuver": {
                    "type": "turn",
                    "instruction": "Turn right onto Avenida 11 de Septiembre.",
                    "modifier": "right",
                    "bearing_after": 35,
                    "bearing_before": 305,
                    "location": [-59.674309, -33.681044]
                  },
                  "name": "Avenida 11 de Septiembre",
                  "duration": 121.085,
                  "distance": 597,
                  "driving_side": "right",
                  "weight": 153.702,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.674309, -33.681044],
                      [-59.67377, -33.680409],
                      [-59.67325, -33.679795],
                      [-59.672727, -33.679178],
                      [-59.672236, -33.678598],
                      [-59.671703, -33.677971],
                      [-59.671672, -33.677872],
                      [-59.671157, -33.677251],
                      [-59.670648, -33.676638]
                    ],
                    "type": "LineString"
                  }
                },
                {
                  "intersections": [
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [126, 215],
                      "duration": 12.785,
                      "turn_weight": 8,
                      "turn_duration": 2.105,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 19.748,
                      "geometry_index": 10,
                      "location": [-59.670648, -33.676638]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [125, 306],
                      "duration": 27.183,
                      "turn_weight": 11.4,
                      "turn_duration": 0.019,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 41.28,
                      "geometry_index": 11,
                      "location": [-59.669869, -33.677106]
                    },
                    {
                      "bearings": [125, 305],
                      "entry": [true, false],
                      "in": 1,
                      "turn_weight": 2,
                      "turn_duration": 0.019,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "geometry_index": 12,
                      "location": [-59.669137, -33.677532]
                    }
                  ],
                  "maneuver": {
                    "type": "turn",
                    "instruction": "Turn right onto Balcarce.",
                    "modifier": "right",
                    "bearing_after": 126,
                    "bearing_before": 35,
                    "location": [-59.670648, -33.676638]
                  },
                  "name": "Balcarce",
                  "duration": 61.287,
                  "distance": 243,
                  "driving_side": "right",
                  "weight": 86.458,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.670648, -33.676638],
                      [-59.669869, -33.677106],
                      [-59.669137, -33.677532],
                      [-59.668511, -33.677903]
                    ],
                    "type": "LineString"
                  }
                },
                {
                  "intersections": [
                    {
                      "bearings": [305],
                      "entry": [true],
                      "in": 0,
                      "admin_index": 0,
                      "geometry_index": 13,
                      "location": [-59.668511, -33.677903]
                    }
                  ],
                  "maneuver": {
                    "type": "arrive",
                    "instruction": "You have arrived at your destination.",
                    "bearing_after": 0,
                    "bearing_before": 125,
                    "location": [-59.668511, -33.677903]
                  },
                  "name": "Balcarce",
                  "duration": 0,
                  "distance": 0,
                  "driving_side": "right",
                  "weight": 0,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.668511, -33.677903],
                      [-59.668511, -33.677903]
                    ],
                    "type": "LineString"
                  }
                }
              ],
              "distance": 955.133,
              "summary": "Avenida 11 de Septiembre, Balcarce"
            }
          ],
          "geometry": {
            "coordinates": [
              [-59.67337, -33.681274],
              [-59.673549, -33.681485],
              [-59.674309, -33.681044],
              [-59.671703, -33.677971],
              [-59.671672, -33.677872],
              [-59.670648, -33.676638],
              [-59.668511, -33.677903]
            ],
            "type": "LineString"
          }
        }
      ],
      "waypoints": [
        {
          "distance": 4.29,
          "name": "Arzobispo Bottaro",
          "location": [-59.67337, -33.681274]
        },
        {
          "distance": 3.795,
          "name": "Balcarce",
          "location": [-59.668511, -33.677903]
        }
      ],
      "code": "Ok",
      "uuid": "kE9H0u0bTIqJcp4v2q-HkNm8HyrrFLkYtz2NTAr5guB1AEGnGMg_QQ=="
    }, // object containing mapbox returned directions
    "created_at": "2021-01-01T10:00:00"
  }, {
    "customer_id": 8,
    "navigation": {
      "routes": [
        {
          "weight_name": "auto",
          "weight": 381.254,
          "duration": 306.053,
          "distance": 1161.594,
          "legs": [
            {
              "via_waypoints": [],
              "admins": [{ "iso_3166_1_alpha3": "ARG", "iso_3166_1": "AR" }],
              "weight": 381.254,
              "duration": 306.053,
              "steps": [
                {
                  "intersections": [
                    {
                      "bearings": [125],
                      "entry": [true],
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "geometry_index": 0,
                      "location": [-59.668511, -33.677903]
                    }
                  ],
                  "maneuver": {
                    "type": "depart",
                    "instruction": "Drive southeast on Balcarce.",
                    "bearing_after": 125,
                    "bearing_before": 0,
                    "location": [-59.668511, -33.677903]
                  },
                  "name": "Balcarce",
                  "duration": 30.436,
                  "distance": 93,
                  "driving_side": "right",
                  "weight": 33.48,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.668511, -33.677903],
                      [-59.667693, -33.678388]
                    ],
                    "type": "LineString"
                  }
                },
                {
                  "intersections": [
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [35, 305],
                      "duration": 40.201,
                      "turn_weight": 12.5,
                      "turn_duration": 5.51,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 50.66,
                      "geometry_index": 1,
                      "location": [-59.667693, -33.678388]
                    },
                    {
                      "bearings": [34, 215],
                      "entry": [true, false],
                      "in": 1,
                      "turn_weight": 2,
                      "turn_duration": 0.019,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "geometry_index": 2,
                      "location": [-59.667041, -33.677603]
                    }
                  ],
                  "maneuver": {
                    "type": "turn",
                    "instruction": "Turn left onto Belgrano.",
                    "modifier": "left",
                    "bearing_after": 35,
                    "bearing_before": 125,
                    "location": [-59.667693, -33.678388]
                  },
                  "name": "Belgrano",
                  "duration": 55.97,
                  "distance": 176,
                  "driving_side": "right",
                  "weight": 69.985,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.667693, -33.678388],
                      [-59.667041, -33.677603],
                      [-59.666618, -33.677084]
                    ],
                    "type": "LineString"
                  }
                },
                {
                  "intersections": [
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [125, 214],
                      "duration": 16.608,
                      "turn_weight": 8,
                      "turn_duration": 2.208,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 23.84,
                      "geometry_index": 3,
                      "location": [-59.666618, -33.677084]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [126, 305],
                      "duration": 24.319,
                      "turn_weight": 2,
                      "turn_duration": 0.019,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 28.73,
                      "geometry_index": 4,
                      "location": [-59.665947, -33.677476]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [126, 306],
                      "duration": 16.619,
                      "turn_weight": 7,
                      "turn_duration": 0.019,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 25.26,
                      "geometry_index": 5,
                      "location": [-59.665238, -33.677906]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [125, 306],
                      "duration": 13.733,
                      "turn_weight": 2,
                      "turn_duration": 0.019,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 17.086,
                      "geometry_index": 6,
                      "location": [-59.664509, -33.67834]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [125, 305],
                      "duration": 26.119,
                      "turn_weight": 2,
                      "turn_duration": 0.019,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 30.71,
                      "geometry_index": 7,
                      "location": [-59.663799, -33.678751]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [127, 305],
                      "duration": 19.687,
                      "turn_weight": 2,
                      "turn_duration": 0.007,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 23.648,
                      "geometry_index": 8,
                      "location": [-59.663026, -33.679198]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [125, 307],
                      "duration": 20.181,
                      "turn_weight": 2,
                      "turn_duration": 0.021,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 24.176,
                      "geometry_index": 9,
                      "location": [-59.662322, -33.67964]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [124, 305],
                      "duration": 17.809,
                      "turn_weight": 2,
                      "turn_duration": 0.021,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 21.567,
                      "geometry_index": 10,
                      "location": [-59.661579, -33.680077]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [125, 304],
                      "duration": 27.498,
                      "turn_weight": 2,
                      "turn_duration": 0.007,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 32.24,
                      "geometry_index": 11,
                      "location": [-59.660832, -33.680498]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [120, 305],
                      "duration": 2.974,
                      "turn_weight": 2,
                      "turn_duration": 0.028,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 5.24,
                      "geometry_index": 12,
                      "location": [-59.660089, -33.680932]
                    },
                    {
                      "bearings": [126, 300],
                      "entry": [true, false],
                      "in": 1,
                      "turn_weight": 2,
                      "turn_duration": 0.01,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "geometry_index": 13,
                      "location": [-59.660001, -33.680975]
                    }
                  ],
                  "maneuver": {
                    "type": "turn",
                    "instruction": "Turn right onto Ayacucho.",
                    "modifier": "right",
                    "bearing_after": 125,
                    "bearing_before": 34,
                    "location": [-59.666618, -33.677084]
                  },
                  "name": "Ayacucho",
                  "duration": 207.158,
                  "distance": 846,
                  "driving_side": "right",
                  "weight": 258.257,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.666618, -33.677084],
                      [-59.665947, -33.677476],
                      [-59.665238, -33.677906],
                      [-59.664509, -33.67834],
                      [-59.663799, -33.678751],
                      [-59.663026, -33.679198],
                      [-59.662322, -33.67964],
                      [-59.661579, -33.680077],
                      [-59.660832, -33.680498],
                      [-59.660089, -33.680932],
                      [-59.660001, -33.680975],
                      [-59.659163, -33.681475]
                    ],
                    "type": "LineString"
                  }
                },
                {
                  "intersections": [
                    {
                      "bearings": [216, 306],
                      "entry": [true, false],
                      "in": 1,
                      "turn_weight": 8,
                      "turn_duration": 2.005,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "geometry_index": 14,
                      "location": [-59.659163, -33.681475]
                    }
                  ],
                  "maneuver": {
                    "type": "turn",
                    "instruction": "Turn right onto La Nación.",
                    "modifier": "right",
                    "bearing_after": 216,
                    "bearing_before": 126,
                    "location": [-59.659163, -33.681475]
                  },
                  "name": "La Nación",
                  "duration": 12.489,
                  "distance": 46.594,
                  "driving_side": "right",
                  "weight": 19.532,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.659163, -33.681475],
                      [-59.659455, -33.681816]
                    ],
                    "type": "LineString"
                  }
                },
                {
                  "intersections": [
                    {
                      "bearings": [36],
                      "entry": [true],
                      "in": 0,
                      "admin_index": 0,
                      "geometry_index": 15,
                      "location": [-59.659455, -33.681816]
                    }
                  ],
                  "maneuver": {
                    "type": "arrive",
                    "instruction": "You have arrived at your destination.",
                    "bearing_after": 0,
                    "bearing_before": 216,
                    "location": [-59.659455, -33.681816]
                  },
                  "name": "La Nación",
                  "duration": 0,
                  "distance": 0,
                  "driving_side": "right",
                  "weight": 0,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.659455, -33.681816],
                      [-59.659455, -33.681816]
                    ],
                    "type": "LineString"
                  }
                }
              ],
              "distance": 1161.594,
              "summary": "Belgrano, Ayacucho"
            }
          ],
          "geometry": {
            "coordinates": [
              [-59.668511, -33.677903],
              [-59.667693, -33.678388],
              [-59.666618, -33.677084],
              [-59.659163, -33.681475],
              [-59.659455, -33.681816]
            ],
            "type": "LineString"
          }
        },
        {
          "weight_name": "auto",
          "weight": 395,
          "duration": 287.199,
          "distance": 1157.594,
          "legs": [
            {
              "via_waypoints": [],
              "admins": [{ "iso_3166_1_alpha3": "ARG", "iso_3166_1": "AR" }],
              "weight": 395,
              "duration": 287.199,
              "steps": [
                {
                  "intersections": [
                    {
                      "entry": [true],
                      "bearings": [125],
                      "duration": 30.436,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 33.48,
                      "geometry_index": 0,
                      "location": [-59.668511, -33.677903]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [125, 305],
                      "duration": 37.048,
                      "turn_weight": 2,
                      "turn_duration": 0.019,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 43.657,
                      "geometry_index": 1,
                      "location": [-59.667693, -33.678388]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [125, 305],
                      "duration": 9.979,
                      "turn_weight": 2,
                      "turn_duration": 0.019,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 13.205,
                      "geometry_index": 2,
                      "location": [-59.667062, -33.678761]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [124, 305],
                      "duration": 9.741,
                      "turn_weight": 27,
                      "turn_duration": 0.021,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 37.935,
                      "geometry_index": 3,
                      "location": [-59.666331, -33.679193]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [126, 304],
                      "duration": 22.379,
                      "turn_weight": 13.2,
                      "turn_duration": 0.007,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 38.368,
                      "geometry_index": 4,
                      "location": [-59.665605, -33.679602]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [124, 306],
                      "duration": 11.973,
                      "turn_weight": 2,
                      "turn_duration": 0.021,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 15.446,
                      "geometry_index": 5,
                      "location": [-59.664848, -33.680065]
                    },
                    {
                      "bearings": [125, 304],
                      "entry": [true, false],
                      "in": 1,
                      "turn_weight": 2,
                      "turn_duration": 0.007,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "geometry_index": 6,
                      "location": [-59.664107, -33.680482]
                    }
                  ],
                  "maneuver": {
                    "type": "depart",
                    "instruction": "Drive southeast on Balcarce.",
                    "bearing_after": 125,
                    "bearing_before": 0,
                    "location": [-59.668511, -33.677903]
                  },
                  "name": "Balcarce",
                  "duration": 141.483,
                  "distance": 582,
                  "driving_side": "right",
                  "weight": 206.501,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.668511, -33.677903],
                      [-59.667693, -33.678388],
                      [-59.667062, -33.678761],
                      [-59.666331, -33.679193],
                      [-59.665605, -33.679602],
                      [-59.664848, -33.680065],
                      [-59.664107, -33.680482],
                      [-59.663375, -33.680905]
                    ],
                    "type": "LineString"
                  }
                },
                {
                  "intersections": [
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [35, 305],
                      "duration": 25.567,
                      "turn_weight": 12.5,
                      "turn_duration": 5.51,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 35.064,
                      "geometry_index": 7,
                      "location": [-59.663375, -33.680905]
                    },
                    {
                      "bearings": [34, 215],
                      "entry": [true, false],
                      "in": 1,
                      "turn_weight": 2,
                      "turn_duration": 0.019,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "geometry_index": 8,
                      "location": [-59.662892, -33.680334]
                    }
                  ],
                  "maneuver": {
                    "type": "turn",
                    "instruction": "Turn left onto Almafuerte.",
                    "modifier": "left",
                    "bearing_after": 35,
                    "bearing_before": 125,
                    "location": [-59.663375, -33.680905]
                  },
                  "name": "Almafuerte",
                  "duration": 40.968,
                  "distance": 172,
                  "driving_side": "right",
                  "weight": 53.984,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.663375, -33.680905],
                      [-59.662892, -33.680334],
                      [-59.662322, -33.67964]
                    ],
                    "type": "LineString"
                  }
                },
                {
                  "intersections": [
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [125, 214],
                      "duration": 22.368,
                      "turn_weight": 8,
                      "turn_duration": 2.208,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 30.176,
                      "geometry_index": 9,
                      "location": [-59.662322, -33.67964]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [124, 305],
                      "duration": 17.809,
                      "turn_weight": 2,
                      "turn_duration": 0.021,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 21.567,
                      "geometry_index": 10,
                      "location": [-59.661579, -33.680077]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [125, 304],
                      "duration": 27.498,
                      "turn_weight": 2,
                      "turn_duration": 0.007,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 32.24,
                      "geometry_index": 11,
                      "location": [-59.660832, -33.680498]
                    },
                    {
                      "entry": [true, false],
                      "in": 1,
                      "bearings": [120, 305],
                      "duration": 2.974,
                      "turn_weight": 2,
                      "turn_duration": 0.028,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "weight": 5.24,
                      "geometry_index": 12,
                      "location": [-59.660089, -33.680932]
                    },
                    {
                      "bearings": [126, 300],
                      "entry": [true, false],
                      "in": 1,
                      "turn_weight": 2,
                      "turn_duration": 0.01,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "geometry_index": 13,
                      "location": [-59.660001, -33.680975]
                    }
                  ],
                  "maneuver": {
                    "type": "turn",
                    "instruction": "Turn right onto San Martín.",
                    "modifier": "right",
                    "bearing_after": 125,
                    "bearing_before": 34,
                    "location": [-59.662322, -33.67964]
                  },
                  "name": "San Martín",
                  "duration": 92.259,
                  "distance": 357,
                  "driving_side": "right",
                  "weight": 114.983,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.662322, -33.67964],
                      [-59.661579, -33.680077],
                      [-59.660832, -33.680498],
                      [-59.660089, -33.680932],
                      [-59.660001, -33.680975],
                      [-59.659163, -33.681475]
                    ],
                    "type": "LineString"
                  }
                },
                {
                  "intersections": [
                    {
                      "bearings": [216, 306],
                      "entry": [true, false],
                      "in": 1,
                      "turn_weight": 8,
                      "turn_duration": 2.005,
                      "mapbox_streets_v8": { "class": "street" },
                      "is_urban": true,
                      "admin_index": 0,
                      "out": 0,
                      "geometry_index": 14,
                      "location": [-59.659163, -33.681475]
                    }
                  ],
                  "maneuver": {
                    "type": "turn",
                    "instruction": "Turn right onto La Nación.",
                    "modifier": "right",
                    "bearing_after": 216,
                    "bearing_before": 126,
                    "location": [-59.659163, -33.681475]
                  },
                  "name": "La Nación",
                  "duration": 12.489,
                  "distance": 46.594,
                  "driving_side": "right",
                  "weight": 19.532,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.659163, -33.681475],
                      [-59.659455, -33.681816]
                    ],
                    "type": "LineString"
                  }
                },
                {
                  "intersections": [
                    {
                      "bearings": [36],
                      "entry": [true],
                      "in": 0,
                      "admin_index": 0,
                      "geometry_index": 15,
                      "location": [-59.659455, -33.681816]
                    }
                  ],
                  "maneuver": {
                    "type": "arrive",
                    "instruction": "You have arrived at your destination.",
                    "bearing_after": 0,
                    "bearing_before": 216,
                    "location": [-59.659455, -33.681816]
                  },
                  "name": "La Nación",
                  "duration": 0,
                  "distance": 0,
                  "driving_side": "right",
                  "weight": 0,
                  "mode": "driving",
                  "geometry": {
                    "coordinates": [
                      [-59.659455, -33.681816],
                      [-59.659455, -33.681816]
                    ],
                    "type": "LineString"
                  }
                }
              ],
              "distance": 1157.594,
              "summary": "Balcarce, San Martín"
            }
          ],
          "geometry": {
            "coordinates": [
              [-59.668511, -33.677903],
              [-59.663375, -33.680905],
              [-59.662322, -33.67964],
              [-59.659163, -33.681475],
              [-59.659455, -33.681816]
            ],
            "type": "LineString"
          }
        }
      ],
      "waypoints": [
        {
          "distance": 3.795,
          "name": "Balcarce",
          "location": [-59.668511, -33.677903]
        },
        {
          "distance": 0.801,
          "name": "La Nación",
          "location": [-59.659455, -33.681816]
        }
      ],
      "code": "Ok",
      "uuid": "WRLyXF_8v7wdsLuT_Dv1RKDHX-3uNDv5eBRRfS0VVIGQTsj6_zKo2g=="
    },
    "created_at": "2021-01-01T10:00:00"
  }]
};