const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Tuk-Tuk Tracking API",
    version: "1.0.0",
    description:
      "RESTful API for real-time tuk-tuk tracking and movement logging for Sri Lanka Police."
  },
  servers: [
    {
      url: "/",
      description: "Current server"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],
  paths: {
    "/api/health": {
      get: {
        summary: "Check API health",
        responses: {
          200: {
            description: "API is running"
          }
        }
      }
    },

    "/api/auth/register": {
      post: {
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                name: "HQ Admin",
                email: "admin@police.lk",
                password: "Admin123!",
                role: "hq_admin"
              }
            }
          }
        },
        responses: {
          201: {
            description: "User registered"
          }
        }
      }
    },

    "/api/auth/login": {
      post: {
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                email: "admin@police.lk",
                password: "Admin123!"
              }
            }
          }
        },
        responses: {
          200: {
            description: "Login successful"
          }
        }
      }
    },

    "/api/provinces": {
      get: {
        summary: "Get all provinces",
        responses: {
          200: {
            description: "Province list"
          }
        }
      }
    },

    "/api/districts": {
      get: {
        summary: "Get all districts or filter by provinceId",
        parameters: [
          {
            name: "provinceId",
            in: "query",
            required: false,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "District list"
          }
        }
      }
    },

    "/api/police-stations": {
      get: {
        summary: "Get police stations or filter by districtId/provinceId",
        parameters: [
          {
            name: "provinceId",
            in: "query",
            required: false,
            schema: {
              type: "string"
            }
          },
          {
            name: "districtId",
            in: "query",
            required: false,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "Police station list"
          }
        }
      }
    },

    "/api/tuktuks": {
      get: {
        summary: "Get tuk-tuks with optional filters",
        parameters: [
          {
            name: "provinceId",
            in: "query",
            required: false,
            schema: {
              type: "string"
            }
          },
          {
            name: "districtId",
            in: "query",
            required: false,
            schema: {
              type: "string"
            }
          },
          {
            name: "policeStationId",
            in: "query",
            required: false,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "Tuk-tuk list"
          }
        }
      },
      post: {
        summary: "Register a new tuk-tuk",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                registrationNumber: "WP-AAA-1234",
                ownerName: "Kamal Perera",
                driverName: "Nimal Silva",
                phoneNumber: "0771234567",
                province: "province_id",
                district: "district_id",
                policeStation: "station_id"
              }
            }
          }
        },
        responses: {
          201: {
            description: "Tuk-tuk registered"
          }
        }
      }
    },

    "/api/locations/update": {
      post: {
        summary: "Send tuk-tuk GPS location update",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                tukTukId: "tuktuk_id",
                latitude: 6.9271,
                longitude: 79.8612,
                speed: 42,
                heading: "North",
                timestamp: "2026-04-24T10:30:00.000Z"
              }
            }
          }
        },
        responses: {
          201: {
            description: "Location saved"
          }
        }
      }
    },

    "/api/locations/live": {
      get: {
        summary: "Get latest live location of tuk-tuks",
        parameters: [
          {
            name: "provinceId",
            in: "query",
            required: false,
            schema: {
              type: "string"
            }
          },
          {
            name: "districtId",
            in: "query",
            required: false,
            schema: {
              type: "string"
            }
          },
          {
            name: "policeStationId",
            in: "query",
            required: false,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "Live locations"
          }
        }
      }
    },

    "/api/locations/history/{tukTukId}": {
      get: {
        summary: "Get historical movement logs of a tuk-tuk",
        parameters: [
          {
            name: "tukTukId",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "from",
            in: "query",
            required: false,
            schema: {
              type: "string"
            }
          },
          {
            name: "to",
            in: "query",
            required: false,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "Movement history"
          }
        }
      }
    }
  }
};

export default swaggerSpec;