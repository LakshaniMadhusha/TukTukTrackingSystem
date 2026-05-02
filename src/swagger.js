const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Tuk-Tuk Tracking API",
    version: "1.0.0",
    description:
      "RESTful API for real-time tuk-tuk tracking, movement logging, administrative boundaries, and secure access control for Sri Lanka Police."
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
                password: "Admin1234!",
                role: "hq_admin"
              }
            }
          }
        },
        responses: {
          201: {
            description: "User registered successfully"
          },
          409: {
            description: "User already exists"
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
                password: "Admin1234!"
              }
            }
          }
        },
        responses: {
          200: {
            description: "Login successful"
          },
          401: {
            description: "Invalid email or password"
          }
        }
      }
    },

    "/api/auth/profile": {
      get: {
        summary: "Get logged-in user profile",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "User profile"
          },
          401: {
            description: "Unauthorized"
          }
        }
      }
    },

    "/api/provinces": {
      get: {
        summary: "Get all provinces",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Province list"
          }
        }
      },
      post: {
        summary: "Create a new province",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                name: "Western Province",
                code: "WP"
              }
            }
          }
        },
        responses: {
          201: {
            description: "Province created successfully"
          },
          400: {
            description: "Validation error"
          },
          403: {
            description: "Forbidden"
          }
        }
      }
    },

    "/api/provinces/{id}": {
      get: {
        summary: "Get province by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            },
            example: "665f1a2b3c4d5e6f78901234"
          }
        ],
        responses: {
          200: {
            description: "Province details"
          },
          404: {
            description: "Province not found"
          }
        }
      },
      put: {
        summary: "Update province by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            },
            example: "665f1a2b3c4d5e6f78901234"
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                name: "Western Province",
                code: "WP"
              }
            }
          }
        },
        responses: {
          200: {
            description: "Province updated successfully"
          },
          404: {
            description: "Province not found"
          }
        }
      },
      delete: {
        summary: "Delete province by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            },
            example: "665f1a2b3c4d5e6f78901234"
          }
        ],
        responses: {
          200: {
            description: "Province deleted successfully"
          },
          400: {
            description: "Cannot delete province because related records exist"
          },
          404: {
            description: "Province not found"
          }
        }
      }
    },

    "/api/districts": {
      get: {
        summary: "Get all districts or filter by provinceId",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "provinceId",
            in: "query",
            required: false,
            schema: {
              type: "string"
            },
            example: "665f1a2b3c4d5e6f78901234"
          }
        ],
        responses: {
          200: {
            description: "District list"
          }
        }
      },
      post: {
        summary: "Create a new district",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                name: "Colombo",
                province: "665f1a2b3c4d5e6f78901234",
                latitude: 6.9271,
                longitude: 79.8612
              }
            }
          }
        },
        responses: {
          201: {
            description: "District created successfully"
          },
          400: {
            description: "Validation error"
          },
          404: {
            description: "Province not found"
          }
        }
      }
    },

    "/api/districts/{id}": {
      get: {
        summary: "Get district by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            },
            example: "665f1a2b3c4d5e6f78905678"
          }
        ],
        responses: {
          200: {
            description: "District details"
          },
          404: {
            description: "District not found"
          }
        }
      },
      put: {
        summary: "Update district by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            },
            example: "665f1a2b3c4d5e6f78905678"
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                name: "Colombo",
                province: "665f1a2b3c4d5e6f78901234",
                latitude: 6.9271,
                longitude: 79.8612
              }
            }
          }
        },
        responses: {
          200: {
            description: "District updated successfully"
          },
          404: {
            description: "District not found"
          }
        }
      },
      delete: {
        summary: "Delete district by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            },
            example: "665f1a2b3c4d5e6f78905678"
          }
        ],
        responses: {
          200: {
            description: "District deleted successfully"
          },
          400: {
            description: "Cannot delete district because related records exist"
          },
          404: {
            description: "District not found"
          }
        }
      }
    },

    "/api/police-stations": {
      get: {
        summary: "Get police stations or filter by provinceId/districtId",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "provinceId",
            in: "query",
            required: false,
            schema: {
              type: "string"
            },
            example: "665f1a2b3c4d5e6f78901234"
          },
          {
            name: "districtId",
            in: "query",
            required: false,
            schema: {
              type: "string"
            },
            example: "665f1a2b3c4d5e6f78905678"
          }
        ],
        responses: {
          200: {
            description: "Police station list"
          }
        }
      },
      post: {
        summary: "Create a new police station",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                name: "Pettah Police Station",
                code: "PTH001",
                province: "665f1a2b3c4d5e6f78901234",
                district: "665f1a2b3c4d5e6f78905678",
                contactNumber: "0112345678",
                address: "Pettah, Colombo",
                latitude: 6.9368,
                longitude: 79.8500
              }
            }
          }
        },
        responses: {
          201: {
            description: "Police station created successfully"
          },
          400: {
            description: "Validation error"
          },
          404: {
            description: "Province or district not found"
          }
        }
      }
    },

    "/api/police-stations/{id}": {
      get: {
        summary: "Get police station by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            },
            example: "665f1a2b3c4d5e6f78909999"
          }
        ],
        responses: {
          200: {
            description: "Police station details"
          },
          404: {
            description: "Police station not found"
          }
        }
      },
      put: {
        summary: "Update police station by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            },
            example: "665f1a2b3c4d5e6f78909999"
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                name: "Pettah Police Station",
                code: "PTH001",
                province: "665f1a2b3c4d5e6f78901234",
                district: "665f1a2b3c4d5e6f78905678",
                contactNumber: "0112345678",
                address: "Pettah, Colombo",
                latitude: 6.9368,
                longitude: 79.8500
              }
            }
          }
        },
        responses: {
          200: {
            description: "Police station updated successfully"
          },
          404: {
            description: "Police station not found"
          }
        }
      },
      delete: {
        summary: "Delete police station by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            },
            example: "665f1a2b3c4d5e6f78909999"
          }
        ],
        responses: {
          200: {
            description: "Police station deleted successfully"
          },
          400: {
            description: "Cannot delete police station because related tuk-tuks exist"
          },
          404: {
            description: "Police station not found"
          }
        }
      }
    },

    "/api/tuktuks": {
      get: {
        summary: "Get tuk-tuks with optional filters",
        security: [{ bearerAuth: [] }],
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
          },
          {
            name: "status",
            in: "query",
            required: false,
            schema: {
              type: "string",
              enum: ["active", "inactive", "seized"]
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
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                registrationNumber: "WP-AAA-1234",
                ownerName: "Kamal Perera",
                driverName: "Nimal Silva",
                phoneNumber: "0771234567",
                province: "665f1a2b3c4d5e6f78901234",
                district: "665f1a2b3c4d5e6f78905678",
                policeStation: "665f1a2b3c4d5e6f78909999"
              }
            }
          }
        },
        responses: {
          201: {
            description: "Tuk-tuk registered successfully"
          },
          400: {
            description: "Validation error"
          },
          409: {
            description: "Tuk-tuk registration number already exists"
          }
        }
      }
    },

    "/api/tuktuks/{id}": {
      get: {
        summary: "Get tuk-tuk by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            },
            example: "665f1a2b3c4d5e6f78907777"
          }
        ],
        responses: {
          200: {
            description: "Tuk-tuk details"
          },
          404: {
            description: "Tuk-tuk not found"
          }
        }
      },
      put: {
        summary: "Update tuk-tuk by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            },
            example: "665f1a2b3c4d5e6f78907777"
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                registrationNumber: "WP-AAA-1234",
                ownerName: "Kamal Perera",
                driverName: "Nimal Silva",
                phoneNumber: "0771234567",
                province: "665f1a2b3c4d5e6f78901234",
                district: "665f1a2b3c4d5e6f78905678",
                policeStation: "665f1a2b3c4d5e6f78909999",
                status: "active"
              }
            }
          }
        },
        responses: {
          200: {
            description: "Tuk-tuk updated successfully"
          },
          404: {
            description: "Tuk-tuk not found"
          }
        }
      },
      delete: {
        summary: "Delete tuk-tuk by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            },
            example: "665f1a2b3c4d5e6f78907777"
          }
        ],
        responses: {
          200: {
            description: "Tuk-tuk deleted successfully"
          },
          404: {
            description: "Tuk-tuk not found"
          }
        }
      }
    },

    "/api/locations/update": {
      post: {
        summary: "Send tuk-tuk GPS location update",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                tukTukId: "665f1a2b3c4d5e6f78907777",
                latitude: 6.9271,
                longitude: 79.8612,
                speed: 42,
                heading: "North",
                timestamp: "2026-05-02T10:30:00.000Z"
              }
            }
          }
        },
        responses: {
          201: {
            description: "Location saved successfully"
          },
          400: {
            description: "Validation error"
          }
        }
      }
    },

    "/api/locations/live": {
      get: {
        summary: "Get latest live location of tuk-tuks",
        security: [{ bearerAuth: [] }],
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

    "/api/locations/live/{tukTukId}": {
      get: {
        summary: "Get latest live location by tuk-tuk ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "tukTukId",
            in: "path",
            required: true,
            schema: {
              type: "string"
            },
            example: "665f1a2b3c4d5e6f78907777"
          }
        ],
        responses: {
          200: {
            description: "Latest tuk-tuk location"
          },
          404: {
            description: "Location not found"
          }
        }
      }
    },

    "/api/locations/history/{tukTukId}": {
      get: {
        summary: "Get historical movement logs of a tuk-tuk",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "tukTukId",
            in: "path",
            required: true,
            schema: {
              type: "string"
            },
            example: "665f1a2b3c4d5e6f78907777"
          },
          {
            name: "from",
            in: "query",
            required: false,
            schema: {
              type: "string",
              format: "date-time"
            },
            example: "2026-05-02T00:00:00.000Z"
          },
          {
            name: "to",
            in: "query",
            required: false,
            schema: {
              type: "string",
              format: "date-time"
            },
            example: "2026-05-02T23:59:59.999Z"
          }
        ],
        responses: {
          200: {
            description: "Movement history"
          },
          400: {
            description: "Invalid TukTuk ID or invalid date format"
          }
        }
      }
    }
  }
};

export default swaggerSpec;