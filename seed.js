import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./src/config/db.js";
import User from "./src/models/User.js";
import Province from "./src/models/Province.js";
import District from "./src/models/District.js";
import PoliceStation from "./src/models/PoliceStation.js";
import TukTuk from "./src/models/TukTuk.js";
import LocationLog from "./src/models/LocationLog.js";

dotenv.config();

const provincesRaw = [
  "Western",
  "Central",
  "Southern",
  "Northern",
  "Eastern",
  "North Western",
  "North Central",
  "Uva",
  "Sabaragamuwa"
];

const districtsRaw = [
  { name: "Colombo", province: "Western", latitude: 6.9271, longitude: 79.8612 },
  { name: "Gampaha", province: "Western", latitude: 7.084, longitude: 80.0098 },
  { name: "Kalutara", province: "Western", latitude: 6.5854, longitude: 79.9607 },

  { name: "Kandy", province: "Central", latitude: 7.2906, longitude: 80.6337 },
  { name: "Matale", province: "Central", latitude: 7.4675, longitude: 80.6234 },
  { name: "Nuwara Eliya", province: "Central", latitude: 6.9497, longitude: 80.7891 },

  { name: "Galle", province: "Southern", latitude: 6.0535, longitude: 80.221 },
  { name: "Matara", province: "Southern", latitude: 5.9549, longitude: 80.555 },
  { name: "Hambantota", province: "Southern", latitude: 6.1241, longitude: 81.1185 },

  { name: "Jaffna", province: "Northern", latitude: 9.6615, longitude: 80.0255 },
  { name: "Kilinochchi", province: "Northern", latitude: 9.3803, longitude: 80.377 },
  { name: "Mannar", province: "Northern", latitude: 8.981, longitude: 79.9044 },
  { name: "Vavuniya", province: "Northern", latitude: 8.7514, longitude: 80.4971 },
  { name: "Mullaitivu", province: "Northern", latitude: 9.2671, longitude: 80.8128 },

  { name: "Trincomalee", province: "Eastern", latitude: 8.5874, longitude: 81.2152 },
  { name: "Batticaloa", province: "Eastern", latitude: 7.7102, longitude: 81.6924 },
  { name: "Ampara", province: "Eastern", latitude: 7.3018, longitude: 81.6747 },

  { name: "Kurunegala", province: "North Western", latitude: 7.4863, longitude: 80.3647 },
  { name: "Puttalam", province: "North Western", latitude: 8.0362, longitude: 79.8283 },

  { name: "Anuradhapura", province: "North Central", latitude: 8.3114, longitude: 80.4037 },
  { name: "Polonnaruwa", province: "North Central", latitude: 7.9403, longitude: 81.0188 },

  { name: "Badulla", province: "Uva", latitude: 6.9934, longitude: 81.055 },
  { name: "Monaragala", province: "Uva", latitude: 6.8728, longitude: 81.3507 },

  { name: "Ratnapura", province: "Sabaragamuwa", latitude: 6.7056, longitude: 80.3847 },
  { name: "Kegalle", province: "Sabaragamuwa", latitude: 7.2513, longitude: 80.3464 }
];

const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

const createLocationPoint = (baseLat, baseLng, movementIndex) => {
  const latOffset = (Math.random() - 0.5) * 0.08 + movementIndex * 0.0005;
  const lngOffset = (Math.random() - 0.5) * 0.08 + movementIndex * 0.0005;

  return {
    latitude: Number((baseLat + latOffset).toFixed(6)),
    longitude: Number((baseLng + lngOffset).toFixed(6))
  };
};

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("Clearing old data...");

    await User.deleteMany();
    await Province.deleteMany();
    await District.deleteMany();
    await PoliceStation.deleteMany();
    await TukTuk.deleteMany();
    await LocationLog.deleteMany();

    console.log("Creating provinces...");

    const provinces = await Province.insertMany(
      provincesRaw.map((name) => ({ name }))
    );

    const provinceMap = new Map();
    provinces.forEach((province) => {
      provinceMap.set(province.name, province._id);
    });

    console.log("Creating districts...");

    const districts = await District.insertMany(
      districtsRaw.map((district) => ({
        name: district.name,
        province: provinceMap.get(district.province),
        latitude: district.latitude,
        longitude: district.longitude
      }))
    );

    const districtMap = new Map();
    districts.forEach((district) => {
      districtMap.set(district.name, district);
    });

    console.log("Creating police stations...");

    const stationsRaw = districtsRaw.map((district, index) => {
      const districtDoc = districtMap.get(district.name);

      return {
        name: `${district.name} Police Station`,
        code: `PS-${String(index + 1).padStart(3, "0")}`,
        province: districtDoc.province,
        district: districtDoc._id,
        contactNumber: `011${String(1000000 + index).slice(0, 7)}`,
        address: `${district.name}, Sri Lanka`,
        latitude: district.latitude,
        longitude: district.longitude
      };
    });

    const stations = await PoliceStation.insertMany(stationsRaw);

    console.log("Creating users...");

    await User.create([
      {
        name: "HQ Administrator",
        email: "admin@police.lk",
        password: "Admin123!",
        role: "hq_admin"
      },
      {
        name: "Colombo Station Officer",
        email: "station@police.lk",
        password: "Station123!",
        role: "station_officer",
        province: stations[0].province,
        district: stations[0].district,
        policeStation: stations[0]._id
      },
      {
        name: "Tuk Tuk Device",
        email: "device@tuktuk.lk",
        password: "Device123!",
        role: "device"
      }
    ]);

    console.log("Creating 200 tuk-tuks...");

    const tukTukData = [];

    for (let i = 1; i <= 200; i++) {
      const station = stations[(i - 1) % stations.length];

      tukTukData.push({
        registrationNumber: `TT-${String(i).padStart(4, "0")}`,
        ownerName: `Owner ${i}`,
        driverName: `Driver ${i}`,
        phoneNumber: `077${String(1000000 + i).slice(0, 7)}`,
        province: station.province,
        district: station.district,
        policeStation: station._id,
        status: "active"
      });
    }

    const tukTuks = await TukTuk.insertMany(tukTukData);

    console.log("Creating one week of movement logs...");

    const locationLogs = [];
    const latestLocationMap = new Map();

    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;

    for (const tukTuk of tukTuks) {
      const station = stations.find(
        (s) => s._id.toString() === tukTuk.policeStation.toString()
      );

      let movementIndex = 0;

      for (let day = 7; day >= 1; day--) {
        for (let ping = 0; ping < 4; ping++) {
          const timestamp = new Date(
            now.getTime() - day * oneDay + ping * 6 * 60 * 60 * 1000
          );

          const point = createLocationPoint(
            station.latitude,
            station.longitude,
            movementIndex
          );

          const log = {
            tukTuk: tukTuk._id,
            registrationNumber: tukTuk.registrationNumber,
            province: tukTuk.province,
            district: tukTuk.district,
            policeStation: tukTuk.policeStation,
            latitude: point.latitude,
            longitude: point.longitude,
            speed: Math.floor(Math.random() * 55) + 5,
            heading: randomItem(["North", "South", "East", "West", "North-East", "South-West"]),
            timestamp
          };

          locationLogs.push(log);
          latestLocationMap.set(tukTuk._id.toString(), log);
          movementIndex++;
        }
      }
    }

    await LocationLog.insertMany(locationLogs);

    console.log("Updating latest live locations...");

    const bulkUpdates = [];

    for (const tukTuk of tukTuks) {
      const latest = latestLocationMap.get(tukTuk._id.toString());

      bulkUpdates.push({
        updateOne: {
          filter: { _id: tukTuk._id },
          update: {
            $set: {
              lastLocation: {
                latitude: latest.latitude,
                longitude: latest.longitude,
                speed: latest.speed,
                heading: latest.heading,
                timestamp: latest.timestamp
              }
            }
          }
        }
      });
    }

    await TukTuk.bulkWrite(bulkUpdates);

    console.log("Database seeded successfully.");
    console.log("Demo users:");
    console.log("Admin: admin@police.lk / Admin123!");
    console.log("Station Officer: station@police.lk / Station123!");
    console.log("Device: device@tuktuk.lk / Device123!");
    console.log(`Provinces: ${provinces.length}`);
    console.log(`Districts: ${districts.length}`);
    console.log(`Police Stations: ${stations.length}`);
    console.log(`Tuk-tuks: ${tukTuks.length}`);
    console.log(`Location logs: ${locationLogs.length}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();