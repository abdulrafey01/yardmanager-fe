import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import UploadIcon from "../../assets/main/44-upload.svg";
import {
  setPrevImage,
  setShowSideMenu,
  setShowSuccessModal,
  setShowToast,
} from "../../../lib/features/shared/sharedSlice";
import XIcon from "../../assets/main/45-xclose.svg";

import EnlargeIcon from "../../assets/main/46-enlarge.svg";
import DownArrow from "../../assets/main/28-downarrow.svg";
import React, { useEffect, useRef } from "react";
import {
  addInventory,
  updateInventory,
} from "../../../lib/features/inventory/inventoryActions";
import {
  fetchAllLocations,
  searchLocationByName,
} from "../../../lib/features/locations/locationActions";
import "../../styles.css";
import {
  fetchAllParts,
  searchPartByName,
} from "../../../lib/features/parts/partActions";
import MultiInput from "../common/MultiInput";
import DropDownInput from "../common/DropDownInput";
import { getLocalStorage } from "../../helpers/storage";
import PlusIcon from "../../assets/main/82-plus.svg";
import ImageDropzone from "../common/ImageDropzone";
import useLoadAuthState from "../../helpers/authHook";
import { usePathname } from "next/navigation";
import { resetLocationSearchData } from "../../../lib/features/locations/locationSlice";
import { resetPartSearchData } from "../../../lib/features/parts/partSlice";

const variantList = [
  "Front",
  "Rear",
  "Front Right",
  "Front Left",
  "Rear Right",
  "Rear Left",
  "Upper Front Right",
  "Upper Front Left",
  "Upper Rear Right",
  "Upper Rear Left",
  "Lower Front Right",
  "Lower Front Left",
  "Lower Rear Right",
  "Lower Rear Left",
]; // just for variant input

const makeList = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ferrari",
  "FIAT",
  "Fisker",
  "Ford",
  "Freightliner",
  "Genesis",
  "Geo",
  "GMC",
  "Honda",
  "HUMMER",
  "Hyundai",
  "INFINITI",
  "Isuzu",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Lotus",
  "Lucid",
  "Maserati",
  "Maybach",
  "MAZDA",
  "McLaren",
  "Mercedes-Benz",
  "Mercury",
  "MINI",
  "Mitsubishi",
  "Nissan",
  "Oldsmobile",
  "Plymouth",
  "Polestar",
  "Pontiac",
  "Porsche",
  "Ram",
  "Rivian",
  "Rolls-Royce",
  "Saab",
  "Saturn",
  "Scion",
  "Smart",
  "SRT",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "VinFast",
  "Volkswagen",
  "Volvo",
];

const modelList = [
  "CL",
  "ILX",
  "Integra",
  "Legend",
  "MDX",
  "MDX Sport Hybrid",
  "NSX",
  "RDX",
  "RL",
  "RLX",
  "RLX Sport Hybrid",
  "RSX",
  "SLX",
  "TL",
  "TLX",
  "TSX",
  "Vigor",
  "ZDX",
  "164",
  "4C",
  "4C Spider",
  "Giulia",
  "Spider",
  "Stelvio",
  "Tonale",
  "DB11",
  "DB9",
  "DB9 GT",
  "DBS",
  "DBS Superleggera",
  "DBX",
  "Rapide",
  "Rapide S",
  "Vanquish",
  "Vanquish S",
  "Vantage",
  "Virage",
  "100",
  "80",
  "90",
  "A3",
  "A3 Sportback e-tron",
  "A4",
  "A4 (2005.5)",
  "A4 allroad",
  "A5",
  "A5 Sport",
  "A6",
  "A6 allroad",
  "A7",
  "A8",
  "allroad",
  "Cabriolet",
  "e-tron",
  "e-tron GT",
  "e-tron S",
  "e-tron S Sportback",
  "e-tron Sportback",
  "Q3",
  "Q4 e-tron",
  "Q4 Sportback e-tron",
  "Q5",
  "Q5 Sportback",
  "Q6 e-tron",
  "Q7",
  "Q8",
  "Q8 e-tron",
  "Q8 Sportback e-tron",
  "Quattro",
  "R8",
  "RS 3",
  "RS 4",
  "RS 5",
  "RS 6",
  "RS 7",
  "RS e-tron GT",
  "RS Q8",
  "S3",
  "S4",
  "S4 (2005.5)",
  "S5",
  "S6",
  "S7",
  "S8",
  "SQ5",
  "SQ5 Sportback",
  "SQ7",
  "SQ8",
  "SQ8 e-tron",
  "SQ8 Sportback e-tron",
  "TT",
  "Arnage",
  "Azure",
  "Azure T",
  "Bentayga",
  "Brooklands",
  "Continental",
  "Continental GT",
  "Flying Spur",
  "Mulsanne",
  "1 Series",
  "2 Series",
  "3 Series",
  "4 Series",
  "5 Series",
  "6 Series",
  "7 Series",
  "8 Series",
  "Alpina B7",
  "i3",
  "i4",
  "i5",
  "i7",
  "i8",
  "iX",
  "M",
  "M2",
  "M3",
  "M4",
  "M5",
  "M6",
  "M8",
  "X1",
  "X2",
  "X3",
  "X3 M",
  "X4",
  "X4 M",
  "X5",
  "X5 M",
  "X6",
  "X6 M",
  "X7",
  "XM",
  "Z3",
  "Z4",
  "Z4 M",
  "Z8",
  "Cascada",
  "Century",
  "Enclave",
  "Encore",
  "Encore GX",
  "Envision",
  "Envista",
  "LaCrosse",
  "LeSabre",
  "Lucerne",
  "Park Avenue",
  "Rainier",
  "Regal",
  "Regal Sportback",
  "Regal TourX",
  "Rendezvous",
  "Riviera",
  "Roadmaster",
  "Skylark",
  "Terraza",
  "Verano",
  "Allante",
  "ATS",
  "ATS-V",
  "Brougham",
  "Catera",
  "Celestiq",
  "CT4",
  "CT5",
  "CT6",
  "CT6-V",
  "CTS",
  "CTS-V",
  "DeVille",
  "DTS",
  "Eldorado",
  "ELR",
  "Escalade",
  "Escalade ESV",
  "Escalade EXT",
  "Escalade IQ",
  "Fleetwood",
  "LYRIQ",
  "OPTIQ",
  "Seville",
  "Sixty Special",
  "SRX",
  "STS",
  "Vistiq",
  "XLR",
  "XT4",
  "XT5",
  "XT6",
  "XTS",
  "1500 Extended Cab",
  "1500 Regular Cab",
  "2500 Crew Cab",
  "2500 Extended Cab",
  "2500 HD Extended Cab",
  "2500 HD Regular Cab",
  "2500 Regular Cab",
  "3500 Crew Cab",
  "3500 Extended Cab",
  "3500 HD Extended Cab",
  "3500 HD Regular Cab",
  "3500 Regular Cab",
  "APV Cargo",
  "Astro Cargo",
  "Astro Passenger",
  "Avalanche",
  "Avalanche 1500",
  "Avalanche 2500",
  "Aveo",
  "Beretta",
  "Blazer",
  "Blazer EV",
  "Bolt EUV",
  "Bolt EV",
  "Camaro",
  "Caprice",
  "Caprice Classic",
  "Captiva Sport",
  "Cavalier",
  "City Express",
  "Classic",
  "Cobalt",
  "Colorado Crew Cab",
  "Colorado Extended Cab",
  "Colorado Regular Cab",
  "Corsica",
  "Corvette",
  "Cruze",
  "Cruze Limited",
  "Equinox",
  "Equinox EV",
  "Express 1500 Cargo",
  "Express 1500 Passenger",
  "Express 2500 Cargo",
  "Express 2500 Passenger",
  "Express 3500 Cargo",
  "Express 3500 Passenger",
  "G-Series 1500",
  "G-Series 2500",
  "G-Series 3500",
  "G-Series G10",
  "G-Series G20",
  "G-Series G30",
  "HHR",
  "Impala",
  "Impala Limited",
  "Lumina",
  "Lumina APV",
  "Lumina Cargo",
  "Lumina Passenger",
  "Malibu",
  "Malibu (Classic)",
  "Malibu Limited",
  "Metro",
  "Monte Carlo",
  "Prizm",
  "S10 Blazer",
  "S10 Crew Cab",
  "S10 Extended Cab",
  "S10 Regular Cab",
  "Silverado (Classic) 1500 Crew Cab",
  "Silverado (Classic) 1500 Extended Cab",
  "Silverado (Classic) 1500 HD Crew Cab",
  "Silverado (Classic) 1500 Regular Cab",
  "Silverado (Classic) 2500 HD Crew Cab",
  "Silverado (Classic) 2500 HD Extended Cab",
  "Silverado (Classic) 2500 HD Regular Cab",
  "Silverado (Classic) 3500 Crew Cab",
  "Silverado (Classic) 3500 Extended Cab",
  "Silverado (Classic) 3500 Regular Cab",
  "Silverado 1500 Crew Cab",
  "Silverado 1500 Double Cab",
  "Silverado 1500 Extended Cab",
  "Silverado 1500 HD Crew Cab",
  "Silverado 1500 LD Double Cab",
  "Silverado 1500 Limited Crew Cab",
  "Silverado 1500 Limited Double Cab",
  "Silverado 1500 Limited Regular Cab",
  "Silverado 1500 Regular Cab",
  "Silverado 2500 Crew Cab",
  "Silverado 2500 Extended Cab",
  "Silverado 2500 HD Crew Cab",
  "Silverado 2500 HD Double Cab",
  "Silverado 2500 HD Extended Cab",
  "Silverado 2500 HD Regular Cab",
  "Silverado 2500 Regular Cab",
  "Silverado 3500 Crew Cab",
  "Silverado 3500 Extended Cab",
  "Silverado 3500 HD Crew Cab",
  "Silverado 3500 HD Double Cab",
  "Silverado 3500 HD Extended Cab",
  "Silverado 3500 HD Regular Cab",
  "Silverado 3500 Regular Cab",
  "Silverado EV",
  "Sonic",
  "Spark",
  "Spark EV",
  "Sportvan G10",
  "Sportvan G20",
  "Sportvan G30",
  "SS",
  "SSR",
  "Suburban",
  "Suburban 1500",
  "Suburban 2500",
  "Suburban 3500HD",
  "Tahoe",
  "Tahoe (New)",
  "Tracker",
  "TrailBlazer",
  "Traverse",
  "Traverse Limited",
  "Trax",
  "Uplander Cargo",
  "Uplander Passenger",
  "Venture Cargo",
  "Venture Passenger",
  "Volt",
  "200",
  "300",
  "300M",
  "Aspen",
  "Cirrus",
  "Concorde",
  "Crossfire",
  "Fifth Ave",
  "Grand Voyager",
  "Imperial",
  "LeBaron",
  "LHS",
  "New Yorker",
  "Pacifica",
  "Pacifica Hybrid",
  "Prowler",
  "PT Cruiser",
  "Sebring",
  "Town & Country",
  "Voyager",
  "Avenger",
  "Caliber",
  "Caravan Cargo",
  "Caravan Passenger",
  "Challenger",
  "Charger",
  "Colt",
  "D150 Club Cab",
  "D150 Regular Cab",
  "D250 Club Cab",
  "D250 Regular Cab",
  "D350 Club Cab",
  "D350 Regular Cab",
  "Dakota Club Cab",
  "Dakota Crew Cab",
  "Dakota Extended Cab",
  "Dakota Quad Cab",
  "Dakota Regular Cab",
  "Dart",
  "Daytona",
  "Durango",
  "Dynasty",
  "Grand Caravan Cargo",
  "Grand Caravan Passenger",
  "Hornet",
  "Intrepid",
  "Journey",
  "Magnum",
  "Monaco",
  "Neon",
  "Nitro",
  "Ram 1500 Club Cab",
  "Ram 1500 Crew Cab",
  "Ram 1500 Mega Cab",
  "Ram 1500 Quad Cab",
  "Ram 1500 Regular Cab",
  "Ram 2500 Club Cab",
  "Ram 2500 Crew Cab",
  "Ram 2500 Mega Cab",
  "Ram 2500 Quad Cab",
  "Ram 2500 Regular Cab",
  "Ram 3500 Club Cab",
  "Ram 3500 Crew Cab",
  "Ram 3500 Mega Cab",
  "Ram 3500 Quad Cab",
  "Ram 3500 Regular Cab",
  "Ram 50 Regular Cab",
  "Ram Van 1500",
  "Ram Van 2500",
  "Ram Van 3500",
  "Ram Van B150",
  "Ram Van B250",
  "Ram Van B350",
  "Ram Wagon 1500",
  "Ram Wagon 2500",
  "Ram Wagon 3500",
  "Ram Wagon B150",
  "Ram Wagon B250",
  "Ram Wagon B350",
  "Ramcharger",
  "Shadow",
  "Spirit",
  "Sprinter 2500 Cargo",
  "Sprinter 2500 Passenger",
  "Sprinter 3500 Cargo",
  "Stealth",
  "Stratus",
  "Viper",
  "296 GTB",
  "430 Scuderia",
  "458 Italia",
  "458 Speciale",
  "458 Spider",
  "488 GTB",
  "488 Pista",
  "488 Spider",
  "599 GTB Fiorano",
  "599 GTO",
  "612 Scaglietti",
  "812 Competizione",
  "812 Competizione A",
  "812 GTS",
  "812 Superfast",
  "California",
  "F12berlinetta",
  "F430",
  "F8",
  "FF",
  "GTC4Lusso",
  "Portofino",
  "Roma",
  "SF90",
  "124 Spider",
  "500",
  "500 Abarth",
  "500c",
  "500c Abarth",
  "500e",
  "500L",
  "500X",
  "Alaska",
  "Karma",
  "Ocean",
  "Pear",
  "Ronin",
  "Aerostar Cargo",
  "Aerostar Passenger",
  "Aspire",
  "Bronco",
  "Bronco Sport",
  "C-MAX Energi",
  "C-MAX Hybrid",
  "Club Wagon",
  "Contour",
  "Crown Victoria",
  "E-Transit 350 Cargo Van",
  "E150 Cargo",
  "E150 Passenger",
  "E150 Super Duty Cargo",
  "E150 Super Duty Passenger",
  "E250 Cargo",
  "E250 Super Duty Cargo",
  "E350 Super Duty Cargo",
  "E350 Super Duty Passenger",
  "Econoline E150 Cargo",
  "Econoline E150 Passenger",
  "Econoline E250 Cargo",
  "Econoline E350 Cargo",
  "Econoline E350 Super Duty Cargo",
  "Econoline E350 Super Duty Passenger",
  "EcoSport",
  "Edge",
  "Escape",
  "Escape Plug-in Hybrid",
  "Escort",
  "Excursion",
  "Expedition",
  "Expedition EL",
  "Expedition MAX",
  "Explorer",
  "Explorer Sport",
  "Explorer Sport Trac",
  "F150 (Heritage) Regular Cab",
  "F150 (Heritage) Super Cab",
  "F150 Lightning",
  "F150 Regular Cab",
  "F150 Super Cab",
  "F150 SuperCrew Cab",
  "F250 Crew Cab",
  "F250 Regular Cab",
  "F250 Super Cab",
  "F250 Super Duty Crew Cab",
  "F250 Super Duty Regular Cab",
  "F250 Super Duty Super Cab",
  "F350 Crew Cab",
  "F350 Regular Cab",
  "F350 Super Cab",
  "F350 Super Duty Crew Cab",
  "F350 Super Duty Regular Cab",
  "F350 Super Duty Super Cab",
  "F450 Super Duty Crew Cab",
  "F450 Super Duty Regular Cab",
  "Festiva",
  "Fiesta",
  "Five Hundred",
  "Flex",
  "Focus",
  "Focus ST",
  "Freestar Cargo",
  "Freestar Passenger",
  "Freestyle",
  "Fusion",
  "Fusion Energi",
  "Fusion Plug-in Hybrid",
  "GT",
  "Maverick",
  "Mustang",
  "Mustang MACH-E",
  "Probe",
  "Ranger Regular Cab",
  "Ranger Super Cab",
  "Ranger SuperCab",
  "Ranger SuperCrew",
  "Taurus",
  "Taurus X",
  "Tempo",
  "Thunderbird",
  "Transit 150 Cargo Van",
  "Transit 150 Crew Van",
  "Transit 150 Passenger Van",
  "Transit 150 Van",
  "Transit 150 Wagon",
  "Transit 250 Cargo Van",
  "Transit 250 Crew Van",
  "Transit 250 Van",
  "Transit 350 Cargo Van",
  "Transit 350 Crew Van",
  "Transit 350 HD Cargo Van",
  "Transit 350 HD Crew Van",
  "Transit 350 HD Van",
  "Transit 350 Passenger Van",
  "Transit 350 Van",
  "Transit 350 Wagon",
  "Transit Connect Cargo",
  "Transit Connect Cargo Van",
  "Transit Connect Passenger",
  "Transit Connect Passenger Wagon",
  "Windstar Cargo",
  "Windstar Passenger",
  "ZX2",
  "Sprinter 1500 Cargo",
  "Sprinter 1500 Passenger",
  "Sprinter 2500 Cargo",
  "Sprinter 2500 Crew",
  "Sprinter 2500 Passenger",
  "Sprinter 3500 Cargo",
  "Sprinter 3500 Crew",
  "Sprinter 3500 XD Crew",
  "Sprinter 3500XD Cargo",
  "Sprinter 4500 Cargo",
  "Sprinter 4500 Crew",
  "Sprinter WORKER Cargo",
  "Sprinter WORKER Passenger",
  "Electrified G80",
  "Electrified GV70",
  "G70",
  "G80",
  "G90",
  "GV60",
  "GV70",
  "GV80",
  "GV80 Coupe",
  "Metro",
  "Prizm",
  "Storm",
  "Tracker",
  "1500 Club Coupe",
  "1500 Regular Cab",
  "2500 Club Coupe",
  "2500 Crew Cab",
  "2500 HD Club Coupe",
  "2500 HD Extended Cab",
  "2500 HD Regular Cab",
  "2500 Regular Cab",
  "3500 Club Coupe",
  "3500 Crew Cab",
  "3500 Extended Cab",
  "3500 Regular Cab",
  "Acadia",
  "Acadia Limited",
  "Canyon Crew Cab",
  "Canyon Extended Cab",
  "Canyon Regular Cab",
  "Envoy",
  "Envoy XL",
  "Envoy XUV",
  "HUMMER EV Pickup",
  "HUMMER EV SUV",
  "Jimmy",
  "Rally Wagon 1500",
  "Rally Wagon 2500",
  "Rally Wagon 3500",
  "Rally Wagon G2500",
  "Rally Wagon G3500",
  "Safari Cargo",
  "Safari Passenger",
  "Savana 1500 Cargo",
  "Savana 1500 Passenger",
  "Savana 2500 Cargo",
  "Savana 2500 Passenger",
  "Savana 3500 Cargo",
  "Savana 3500 Passenger",
  "Sierra (Classic) 1500 Crew Cab",
  "Sierra (Classic) 1500 Extended Cab",
  "Sierra (Classic) 1500 HD Crew Cab",
  "Sierra (Classic) 1500 Regular Cab",
  "Sierra (Classic) 2500 Crew Cab",
  "Sierra (Classic) 2500 HD Crew Cab",
  "Sierra (Classic) 2500 HD Extended Cab",
  "Sierra (Classic) 2500 HD Regular Cab",
  "Sierra (Classic) 3500 Crew Cab",
  "Sierra (Classic) 3500 Extended Cab",
  "Sierra (Classic) 3500 Regular Cab",
  "Sierra 1500 Crew Cab",
  "Sierra 1500 Double Cab",
  "Sierra 1500 Extended Cab",
  "Sierra 1500 HD Crew Cab",
  "Sierra 1500 Limited Crew Cab",
  "Sierra 1500 Limited Double Cab",
  "Sierra 1500 Limited Regular Cab",
  "Sierra 1500 Regular Cab",
  "Sierra 2500 Crew Cab",
  "Sierra 2500 Extended Cab",
  "Sierra 2500 HD Crew Cab",
  "Sierra 2500 HD Double Cab",
  "Sierra 2500 HD Extended Cab",
  "Sierra 2500 HD Regular Cab",
  "Sierra 2500 Regular Cab",
  "Sierra 3500 Crew Cab",
  "Sierra 3500 Extended Cab",
  "Sierra 3500 HD Crew Cab",
  "Sierra 3500 HD Double Cab",
  "Sierra 3500 HD Extended Cab",
  "Sierra 3500 HD Regular Cab",
  "Sierra 3500 Regular Cab",
  "Sierra EV",
  "Sonoma Club Cab",
  "Sonoma Club Coupe Cab",
  "Sonoma Crew Cab",
  "Sonoma Extended Cab",
  "Sonoma Regular Cab",
  "Suburban 1500",
  "Suburban 2500",
  "Terrain",
  "Vandura 1500",
  "Vandura 2500",
  "Vandura 3500",
  "Vandura G1500",
  "Vandura G2500",
  "Vandura G3500",
  "Yukon",
  "Yukon Denali",
  "Yukon XL",
  "Yukon XL 1500",
  "Yukon XL 2500",
  "Accord",
  "Accord Crosstour",
  "Accord Hybrid",
  "Civic",
  "Civic Type R",
  "Clarity Electric",
  "Clarity Fuel Cell",
  "Clarity Plug-in Hybrid",
  "CR-V",
  "CR-V Hybrid",
  "CR-Z",
  "Crosstour",
  "del Sol",
  "Element",
  "Fit",
  "HR-V",
  "Insight",
  "Odyssey",
  "Passport",
  "Pilot",
  "Prelude",
  "Prologue",
  "Ridgeline",
  "S2000",
  "H1",
  "H2",
  "H3",
  "H3T",
  "Accent",
  "Azera",
  "Elantra",
  "Elantra GT",
  "Elantra Hybrid",
  "Elantra N",
  "Entourage",
  "Equus",
  "Excel",
  "Genesis",
  "Genesis Coupe",
  "IONIQ 5",
  "IONIQ 6",
  "IONIQ 7",
  "Ioniq Electric",
  "Ioniq Hybrid",
  "Ioniq Plug-in Hybrid",
  "Kona",
  "Kona Electric",
  "Kona N",
  "NEXO",
  "Palisade",
  "Santa Cruz",
  "Santa Fe",
  "Santa Fe Hybrid",
  "Santa Fe Plug-in Hybrid",
  "Santa Fe Sport",
  "Santa Fe XL",
  "Scoupe",
  "Sonata",
  "Sonata Hybrid",
  "Sonata Plug-in Hybrid",
  "Tiburon",
  "Tucson",
  "Tucson Fuel Cell",
  "Tucson Hybrid",
  "Tucson Plug-in Hybrid",
  "Veloster",
  "Venue",
  "Veracruz",
  "XG300",
  "XG350",
  "EX",
  "FX",
  "G",
  "I",
  "J",
  "JX",
  "M",
  "Q",
  "Q40",
  "Q50",
  "Q60",
  "Q70",
  "QX",
  "QX30",
  "QX50",
  "QX55",
  "QX60",
  "QX70",
  "QX80",
  "Amigo",
  "Ascender",
  "Axiom",
  "Hombre Regular Cab",
  "Hombre Spacecab",
  "i-280 Extended Cab",
  "i-290 Extended Cab",
  "i-350 Crew Cab",
  "i-370 Crew Cab",
  "i-370 Extended Cab",
  "Impulse",
  "Oasis",
  "Regular Cab",
  "Rodeo",
  "Rodeo Sport",
  "Spacecab",
  "Stylus",
  "Trooper",
  "VehiCROSS",
  "E-PACE",
  "F-PACE",
  "F-TYPE",
  "I-PACE",
  "S-Type",
  "X-Type",
  "XE",
  "XF",
  "XJ",
  "XK",
  "Cherokee",
  "Comanche Regular Cab",
  "Commander",
  "Compass",
  "Gladiator",
  "Grand Cherokee",
  "Grand Cherokee 4xe",
  "Grand Cherokee L",
  "Grand Wagoneer",
  "Grand Wagoneer L",
  "Liberty",
  "Patriot",
  "Recon",
  "Renegade",
  "Wagoneer",
  "Wagoneer L",
  "Wrangler",
  "Wrangler 2 Door",
  "Wrangler 4 Door",
  "Wrangler 4xe",
  "Wrangler Unlimited",
  "Wrangler Unlimited 4xe",
  "Amanti",
  "Borrego",
  "Cadenza",
  "Carnival",
  "EV6",
  "EV9",
  "Forte",
  "Forte Koup",
  "Forte5",
  "K5",
  "K900",
  "Niro",
  "Niro EV",
  "Niro Plug-in Hybrid",
  "Optima",
  "Optima (2006.5)",
  "Optima Hybrid",
  "Optima Plug-in Hybrid",
  "Rio",
  "Rondo",
  "Sedona",
  "Seltos",
  "Sephia",
  "Sorento",
  "Sorento Hybrid",
  "Sorento Plug-in Hybrid",
  "Soul",
  "Soul EV",
  "Spectra",
  "Sportage",
  "Sportage Hybrid",
  "Sportage Plug-in Hybrid",
  "Stinger",
  "Telluride",
  "Aventador",
  "Gallardo",
  "Huracan",
  "Murcielago",
  "Murcielago LP640",
  "Urus",
  "Defender 110",
  "Defender 130",
  "Defender 90",
  "Discovery",
  "Discovery Series II",
  "Discovery Sport",
  "Freelander",
  "LR2",
  "LR3",
  "LR4",
  "Range Rover",
  "Range Rover Evoque",
  "Range Rover Sport",
  "Range Rover Velar",
  "CT",
  "ES",
  "GS",
  "GX",
  "HS",
  "IS",
  "IS F",
  "LC",
  "LFA",
  "LS",
  "LX",
  "NX",
  "RC",
  "RX",
  "RZ",
  "SC",
  "TX",
  "UX",
  "Aviator",
  "Blackwood",
  "Continental",
  "Corsair",
  "LS",
  "Mark LT",
  "Mark VII",
  "Mark VIII",
  "MKC",
  "MKS",
  "MKT",
  "MKX",
  "MKZ",
  "Nautilus",
  "Navigator",
  "Navigator L",
  "Town Car",
  "Zephyr",
  "Elise",
  "Evora",
  "Evora 400",
  "Evora GT",
  "Exige",
  "Exige S",
  "Air",
  "Gravity",
  "Coupe",
  "Ghibli",
  "GranSport",
  "GranTurismo",
  "Grecale",
  "Levante",
  "MC20",
  "Quattroporte",
  "57",
  "62",
  "323",
  "626",
  "929",
  "B-Series Cab Plus",
  "B-Series Extended Cab",
  "B-Series Regular Cab",
  "CX-3",
  "CX-30",
  "CX-5",
  "CX-50",
  "CX-7",
  "CX-70",
  "CX-9",
  "CX-90",
  "CX-90 PHEV",
  "MAZDA2",
  "MAZDA3",
  "MAZDA5",
  "MAZDA6",
  "Millenia",
  "MPV",
  "MX-3",
  "MX-30",
  "MX-5 Miata",
  "MX-5 Miata RF",
  "MX-6",
  "Navajo",
  "Protege",
  "Protege5",
  "RX-7",
  "RX-8",
  "Tribute",
  "570GT",
  "570S",
  "600LT",
  "650S",
  "675LT",
  "720S",
  "MP4-12C",
  "190 E",
  "300 CE",
  "300 D",
  "300 E",
  "300 SD",
  "300 SE",
  "300 SL",
  "300 TE",
  "400 E",
  "400 SE",
  "400 SEL",
  "500 E",
  "500 SEC",
  "500 SEL",
  "500 SL",
  "600 SEC",
  "600 SEL",
  "600 SL",
  "A-Class",
  "B-Class",
  "C-Class",
  "CL-Class",
  "CLA",
  "CLA-Class",
  "CLE",
  "CLK-Class",
  "CLS",
  "CLS-Class",
  "E-Class",
  "eSprinter",
  "G-Class",
  "GL-Class",
  "GLA",
  "GLA-Class",
  "GLB",
  "GLC",
  "GLC Coupe",
  "GLE",
  "GLE Coupe",
  "GLK-Class",
  "GLS",
  "M-Class",
  "Mercedes-AMG A-Class",
  "Mercedes-AMG C-Class",
  "Mercedes-AMG CLA",
  "Mercedes-AMG CLS",
  "Mercedes-AMG E-Class",
  "Mercedes-AMG EQE",
  "Mercedes-AMG EQE SUV",
  "Mercedes-AMG EQS",
  "Mercedes-AMG G-Class",
  "Mercedes-AMG GLA",
  "Mercedes-AMG GLB",
  "Mercedes-AMG GLC",
  "Mercedes-AMG GLC Coupe",
  "Mercedes-AMG GLE",
  "Mercedes-AMG GLE Coupe",
  "Mercedes-AMG GLS",
  "Mercedes-AMG GT",
  "Mercedes-AMG S-Class",
  "Mercedes-AMG SL",
  "Mercedes-AMG SLC",
  "Mercedes-AMG SLK",
  "Mercedes-EQ EQB",
  "Mercedes-EQ EQE",
  "Mercedes-EQ EQE SUV",
  "Mercedes-EQ EQS",
  "Mercedes-EQ EQS SUV",
  "Mercedes-Maybach EQS SUV",
  "Mercedes-Maybach GLS",
  "Mercedes-Maybach S 600",
  "Mercedes-Maybach S-Class",
  "Metris Cargo",
  "Metris Passenger",
  "Metris WORKER Cargo",
  "Metris WORKER Passenger",
  "R-Class",
  "S-Class",
  "SL",
  "SL-Class",
  "SLC",
  "SLK",
  "SLK-Class",
  "SLR McLaren",
  "SLS-Class",
  "Sprinter 1500 Cargo",
  "Sprinter 1500 Passenger",
  "Sprinter 2500 Cargo",
  "Sprinter 2500 Crew",
  "Sprinter 2500 Passenger",
  "Sprinter 3500 Cargo",
  "Sprinter 3500 Crew",
  "Sprinter 3500 XD Cargo",
  "Sprinter 3500 XD Crew",
  "Sprinter 4500 Cargo",
  "Sprinter 4500 Crew",
  "Sprinter WORKER Cargo",
  "Sprinter WORKER Passenger",
  "Capri",
  "Cougar",
  "Grand Marquis",
  "Marauder",
  "Mariner",
  "Milan",
  "Montego",
  "Monterey",
  "Mountaineer",
  "Mystique",
  "Sable",
  "Topaz",
  "Tracer",
  "Villager",
  "Clubman",
  "Convertible",
  "Cooper",
  "Countryman",
  "Coupe",
  "Hardtop",
  "Hardtop 2 Door",
  "Hardtop 4 Door",
  "Paceman",
  "Roadster",
  "3000GT",
  "Diamante",
  "Eclipse",
  "Eclipse Cross",
  "Endeavor",
  "Expo",
  "Galant",
  "i-MiEV",
  "Lancer",
  "Lancer Evolution",
  "Mighty Max Macro Cab",
  "Mighty Max Regular Cab",
  "Mirage",
  "Mirage G4",
  "Montero",
  "Montero Sport",
  "Outlander",
  "Outlander PHEV",
  "Outlander Sport",
  "Precis",
  "Raider Double Cab",
  "Raider Extended Cab",
  "200SX",
  "240SX",
  "300ZX",
  "350Z",
  "370Z",
  "400Z",
  "Altima",
  "Ariya",
  "Armada",
  "cube",
  "Frontier Crew Cab",
  "Frontier King Cab",
  "Frontier Regular Cab",
  "GT-R",
  "JUKE",
  "Kicks",
  "King Cab",
  "LEAF",
  "Maxima",
  "Murano",
  "NV1500 Cargo",
  "NV200",
  "NV200 Taxi",
  "NV2500 HD Cargo",
  "NV3500 HD Cargo",
  "NV3500 HD Passenger",
  "NX",
  "Pathfinder",
  "Pathfinder Armada",
  "Quest",
  "Regular Cab",
  "Rogue",
  "Rogue Select",
  "Rogue Sport",
  "Sentra",
  "Stanza",
  "Titan Crew Cab",
  "Titan King Cab",
  "TITAN Single Cab",
  "TITAN XD Crew Cab",
  "TITAN XD King Cab",
  "TITAN XD Single Cab",
  "Versa",
  "Versa Note",
  "Xterra",
  "Z",
  "88",
  "98",
  "Achieva",
  "Alero",
  "Aurora",
  "Bravada",
  "Ciera",
  "Custom Cruiser",
  "Cutlass",
  "Cutlass Ciera",
  "Cutlass Cruiser",
  "Cutlass Supreme",
  "Intrigue",
  "LSS",
  "Regency",
  "Silhouette",
  "Toronado",
  "Acclaim",
  "Breeze",
  "Colt",
  "Colt Vista",
  "Grand Voyager",
  "Laser",
  "Neon",
  "Prowler",
  "Sundance",
  "Voyager",
  "1",
  "2",
  "3",
  "4",
  "5",
  "Aztek",
  "Bonneville",
  "Firebird",
  "G3",
  "G5",
  "G6",
  "G6 (2009.5)",
  "G8",
  "Grand Am",
  "Grand Prix",
  "GTO",
  "LeMans",
  "Montana",
  "Montana SV6",
  "Solstice",
  "Sunbird",
  "Sunfire",
  "Torrent",
  "Trans Sport",
  "Vibe",
  "718 Boxster",
  "718 Cayman",
  "718 Spyder",
  "911",
  "928",
  "968",
  "Boxster",
  "Carrera GT",
  "Cayenne",
  "Cayenne Coupe",
  "Cayman",
  "Macan",
  "Panamera",
  "Taycan",
  "Taycan Cross Turismo",
  "Taycan Sport Turismo",
  "1500 Classic Crew Cab",
  "1500 Classic Quad Cab",
  "1500 Classic Regular Cab",
  "1500 Crew Cab",
  "1500 Quad Cab",
  "1500 Ramcharger",
  "1500 Regular Cab",
  "1500 REV",
  "2500 Crew Cab",
  "2500 Mega Cab",
  "2500 Regular Cab",
  "3500 Crew Cab",
  "3500 Mega Cab",
  "3500 Regular Cab",
  "C/V",
  "C/V Tradesman",
  "Dakota Crew Cab",
  "Dakota Extended Cab",
  "ProMaster 1500 Cargo",
  "ProMaster 2500 Cargo",
  "ProMaster 3500 Cargo",
  "ProMaster Cargo Van",
  "ProMaster City",
  "ProMaster Window Van",
  "R1S",
  "R1T",
  "Cullinan",
  "Dawn",
  "Ghost",
  "Phantom",
  "Wraith",
  "9-2X",
  "9-3",
  "9-4X",
  "9-5",
  "9-7X",
  "900",
  "9000",
  "Astra",
  "Aura",
  "Ion",
  "L-Series",
  "Outlook",
  "Relay",
  "S-Series",
  "SKY",
  "VUE",
  "FR-S",
  "iA",
  "iM",
  "iQ",
  "tC",
  "xA",
  "xB",
  "xD",
  "fortwo",
  "fortwo cabrio",
  "fortwo electric drive",
  "fortwo electric drive cabrio",
  "fortwo EQ cabrio",
  "fortwo EQ coupe",
  "Viper",
  "Ascent",
  "B9 Tribeca",
  "Baja",
  "BRZ",
  "Crosstrek",
  "Forester",
  "Impreza",
  "Justy",
  "Legacy",
  "Loyale",
  "Outback",
  "Solterra",
  "SVX",
  "Tribeca",
  "WRX",
  "XV Crosstrek",
  "Aerio",
  "Equator Crew Cab",
  "Equator Extended Cab",
  "Esteem",
  "Forenza",
  "Grand Vitara",
  "Kizashi",
  "Reno",
  "Samurai",
  "Sidekick",
  "Swift",
  "SX4",
  "Verona",
  "Vitara",
  "X-90",
  "XL-7",
  "XL7",
  "Cybertruck",
  "Model 3",
  "Model S",
  "Model X",
  "Model Y",
  "4Runner",
  "86",
  "Avalon",
  "Avalon Hybrid",
  "bZ4X",
  "C-HR",
  "Camry",
  "Camry Hybrid",
  "Celica",
  "Corolla",
  "Corolla Cross",
  "Corolla Cross Hybrid",
  "Corolla Hatchback",
  "Corolla Hybrid",
  "Corolla iM",
  "Cressida",
  "Crown",
  "Crown Signia",
  "Echo",
  "FJ Cruiser",
  "GR Corolla",
  "GR Supra",
  "GR86",
  "Grand Highlander",
  "Grand Highlander Hybrid",
  "Highlander",
  "Highlander Hybrid",
  "Land Cruiser",
  "Matrix",
  "Mirai",
  "MR2",
  "Paseo",
  "Previa",
  "Prius",
  "Prius c",
  "Prius Plug-in Hybrid",
  "Prius Prime",
  "Prius v",
  "RAV4",
  "RAV4 Hybrid",
  "RAV4 Prime",
  "Regular Cab",
  "Sequoia",
  "Sienna",
  "Solara",
  "Supra",
  "T100 Regular Cab",
  "T100 Xtracab",
  "Tacoma Access Cab",
  "Tacoma Double Cab",
  "Tacoma Regular Cab",
  "Tacoma XtraCab",
  "Tercel",
  "Tundra Access Cab",
  "Tundra CrewMax",
  "Tundra Double Cab",
  "Tundra Hybrid CrewMax",
  "Tundra Regular Cab",
  "Venza",
  "Xtra Cab",
  "Yaris",
  "Yaris Hatchback",
  "Yaris iA",
  "VF 6",
  "VF 7",
  "VF 8",
  "VF 9",
  "Arteon",
  "Atlas",
  "Atlas Cross Sport",
  "Beetle",
  "Cabrio",
  "Cabrio (New)",
  "Cabriolet",
  "CC",
  "Corrado",
  "e-Golf",
  "Eos",
  "Eurovan",
  "Fox",
  "GLI",
  "Golf",
  "Golf (New)",
  "Golf Alltrack",
  "Golf GTI",
  "Golf III",
  "Golf R",
  "Golf SportWagen",
  "GTI",
  "GTI (New)",
  "ID.4",
  "ID.7",
  "ID.Buzz",
  "Jetta",
  "Jetta (New)",
  "Jetta GLI",
  "Jetta III",
  "Jetta SportWagen",
  "New Beetle",
  "Passat",
  "Passat (New)",
  "Phaeton",
  "R32",
  "Rabbit",
  "Routan",
  "Taos",
  "Tiguan",
  "Tiguan Limited",
  "Touareg",
  "Touareg 2",
  "240",
  "740",
  "850",
  "940",
  "960",
  "C30",
  "C40 Recharge",
  "C70",
  "EX30",
  "EX90",
  "S40",
  "S40 (New)",
  "S60",
  "S70",
  "S80",
  "S90",
  "V40",
  "V50",
  "V60",
  "V70",
  "V90",
  "XC40",
  "XC40 Recharge",
  "XC60",
  "XC70",
  "XC90",
];

const colorList = [
  "Beige",
  "Black",
  "Blue",
  "Brown",
  "Burgundy",
  "Charcoal",
  "Gold",
  "Green",
  "Grey",
  "Off white",
  "Orange",
  "Pink",
  "Purple",
  "Red",
  "Silver",
  "Tan",
  "Turquoise",
  "White",
  "Yellow",
];

const InventorySideMenu = () => {
  useLoadAuthState(); // for updating image and price fields
  const { showSideMenu, selectedItem } = useSelector((state) => state.shared);
  const { locationSearchData } = useSelector((state) => state.locations);
  const { partSearchData } = useSelector((state) => state.parts);
  const { toastMsg } = useSelector((state) => state.inventory);
  const { user } = useSelector((state) => state.auth);
  const [imgArray, setImgArray] = React.useState([]);
  const [showLocDropDown, setShowLocDropDown] = React.useState(false);
  const [showPartDropDown, setShowPartDropDown] = React.useState(false);
  const [locId, setLocId] = React.useState(null);
  const [partId, setPartId] = React.useState(null);
  // Values for inputs
  const [locValue, setLocValue] = React.useState("");
  const [partValue, setPartValue] = React.useState("");
  const dispatch = useDispatch();
  // for date input change types
  const [dateType1, setDateType1] = React.useState(false);
  const [dateType2, setDateType2] = React.useState(false);

  // useref is used to prevent adding new key on every character change
  // const formDataRef = useRef(new FormData());
  const formData = new FormData();
  const [formState, setFormState] = React.useState({
    name: "",
    sku: "",
    year: "",
    model: [],
    make: [],
    variant: [],
    notes: "",
    color: [],
    startYear: "",
    lastYear: "",
    price: "",
  });

  // Price Toggle for inventory
  const [priceToggle, setPriceToggle] = React.useState(false);

  // Color toggle for inventory
  const [colorToggle, setColorToggle] = React.useState(false);

  // Image toggle for inventory
  const [imageToggle, setImageToggle] = React.useState(false);

  // To check during form submit
  const currentYear = new Date().getFullYear();

  const yearsArray = Array.from({ length: currentYear - 1950 + 1 }, (_, i) =>
    (1950 + i).toString()
  );
  const pathName = usePathname();
  useEffect(() => {
    if (user) {
      if (user.userType === "admin") {
        setImageToggle(true);
        setPriceToggle(true);
        return;
      }
    }
    setImageToggle(user?.company.image);
    setPriceToggle(user?.company.price);
  }, [user]);

  // Function to handle input change
  const onInputChange = (e) => {
    // formDataRef.current.set(e.target.name, e.target.value);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onLocInputChange = (e) => {
    setLocValue(e.target.value);
    if (e.target.value.length >= 1) {
      setShowLocDropDown(true);
      dispatch(
        searchLocationByName({
          val: e.target.value,
          isAdmin: user?.userType === "admin",
          totalOverview:
            pathName === "/admin/inventory-overview"
              ? {
                  value: true,
                  id: selectedItem.company,
                }
              : false,
        })
      );
    } else {
      dispatch(
        fetchAllLocations({
          isAdmin: user?.userType === "admin",
          totalOverview:
            pathName === "/admin/inventory-overview"
              ? {
                  value: true,
                  id: selectedItem.company,
                }
              : false,
        })
      );
    }
  };

  const onLocNameClick = (loc) => {
    setLocId(loc._id);
    setLocValue(loc.location);
    setShowLocDropDown(false);
  };

  const onPartNameClick = (part) => {
    // formDataRef.current.set("part", part._id);
    // formData.set("part", part._id);
    setPartId(part._id);
    setPartValue(part.name);
    setColorToggle(part.color);
    setShowPartDropDown(false);
  };

  const onPartInputChange = (e) => {
    setPartValue(e.target.value);
    if (e.target.value.length >= 1) {
      setShowPartDropDown(true);
      dispatch(
        searchPartByName({
          val: e.target.value,
          isAdmin: user?.userType === "admin",
          totalOverview:
            pathName === "/admin/inventory-overview"
              ? {
                  value: true,
                  id: selectedItem.company,
                }
              : false,
        })
      );
    } else {
      fetchAllParts({
        isAdmin: user?.userType === "admin",
        totalOverview:
          pathName === "/admin/inventory-overview"
            ? {
                value: true,
                id: selectedItem.company,
              }
            : false,
      });
    }
  };
  // Function to handle image change
  const onImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImgArray([...imgArray, ...files]);
  };

  function getDate(date) {
    return new Date(date);
  }
  // Function to handle form submit
  const onFormSubmit = (e) => {
    e.preventDefault();

    if (locValue === "") {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill the Location field",
          red: true,
        })
      );
    } else if (partId === null || partId === "" || !partId) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please select the Part field",
          red: true,
        })
      );
    } else if (locId === null || locId === "" || !locId) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please select the Location field",
          red: true,
        })
      );
    } else if (
      formState.startYear === "" ||
      !yearsArray.includes(formState.startYear)
    ) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill in Valid Start Year",
          red: true,
        })
      );
    } else if (
      formState.lastYear === "" ||
      !yearsArray.includes(formState.lastYear)
    ) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill in Valid Last Year",
          red: true,
        })
      );
    } else if (formState.model.length === 0) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill the model field",
          red: true,
        })
      );
    } else if (formState.make.length === 0) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill the make field",
          red: true,
        })
      );
    } else if (formState.variant.length === 0) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill the variant field",
          red: true,
        })
      );
    }
    if (priceToggle === true) {
      if (formState.price === "" || formState.price <= 0) {
        return dispatch(
          setShowToast({
            value: true,
            msg: "Please fill the Price field",
            red: true,
          })
        );
      }
    }
    if (colorToggle === true) {
      if (
        formState.color === "" ||
        formState.color === null ||
        formState.color === "undefined" ||
        formState.color.length === 0
      ) {
        return dispatch(
          setShowToast({
            value: true,
            msg: "Please fill the Color field",
            red: true,
          })
        );
      }
    }
    if (imageToggle === true) {
      if (imgArray.length === 0) {
        return dispatch(
          setShowToast({
            value: true,
            msg: "Please select at least one Image",
            red: true,
          })
        );
      }
    }
    if (Number(formState.lastYear) < Number(formState.startYear)) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Start Year cannot be greater than Last Year",
          red: true,
        })
      );
    }

    formData.append("name", formState.name);
    formData.append("year", formState.year);
    if (formState.model.length === 1) {
      formData.append("model", formState.model[0]);
    } else {
      formState.model.forEach((model, index) => {
        formData.append(`model`, model);
      });
    }

    if (formState.make.length === 1) {
      formData.append("make", formState.make[0]);
    } else {
      formState.make.forEach((make, index) => {
        formData.append(`make`, make);
      });
    }

    if (formState.variant.length === 1) {
      formData.append("variant", formState.variant[0]);
    } else {
      formState.variant.forEach((variant, index) => {
        formData.append(`variant`, variant);
      });
    }

    // In edit mode:
    if (showSideMenu.mode === "edit") {
      if (imgArray.length > 0) {
        for (let i = 0; i < imgArray.length; i++) {
          if (typeof imgArray[i] !== "string") {
            formData.append(`newImage`, imgArray[i]);
          } else {
            formData.append(`images`, imgArray[i]);
          }
        }
      } else {
        // formData.append("images", []);
      }
    } else {
      // in add mode
      if (imgArray.length > 0) {
        console.log("here 1");
        for (let i = 0; i < imgArray.length; i++) {
          // formDataRef.current.set("images", files[i]);
          formData.append(`images`, imgArray[i]);
        }
      } else {
        console.log("here 2");

        formData.delete("images");
      }
    }
    formData.append("notes", formState.notes);
    console.log(
      "startYear",
      getDate(formState.startYear),
      "lastYear",
      getDate(formState.lastYear)
    );
    formData.append("startYear", formState.startYear);

    formData.append("lastYear", formState.lastYear);

    formData.append("part", `${partId}`); // partId);
    formData.append("location", `${locId}`);
    if (priceToggle) {
      formData.append("price", formState.price);
    }
    if (colorToggle) {
      if (formState.color.length === 1) {
        formData.append("color", formState.color[0]);
      } else {
        formState.color.forEach((color, index) => {
          formData.append(`color`, color);
        });
      }
    } else {
      formData.append("color", []);
    }
    if (showSideMenu.mode === "edit") {
      if (user?.userType === "admin") {
        dispatch(
          updateInventory({
            formData: formData,
            id: selectedItem._id,
            isAdmin: true,
            totalOverview:
              pathName === "/admin/inventory-overview"
                ? {
                    value: true,
                    id: selectedItem.company,
                  }
                : false,
          })
        );
      } else {
        dispatch(updateInventory({ formData: formData, id: selectedItem._id }));
      }
    } else {
      if (user?.userType === "admin") {
        dispatch(addInventory({ data: formData, isAdmin: true }));
      } else {
        dispatch(addInventory({ data: formData }));
      }
    }
  };

  // Close the form if no error
  useEffect(() => {
    if (toastMsg?.red === false) {
      dispatch(resetLocationSearchData());
      dispatch(resetPartSearchData());
      dispatch(setShowSideMenu({ value: false }));

      setDateType1(false);
      setDateType2(false);
    }
  }, [toastMsg]);

  const removeModelFromList = (index) => {
    setFormState({
      ...formState,
      model: formState.model.filter((_, i) => i !== index),
    });
    // console.log(index);
  };
  const removeMakeFromList = (index) => {
    setFormState({
      ...formState,
      make: formState.make.filter((_, i) => i !== index),
    });
    // console.log(index);
  };
  const removeVariantFromList = (index) => {
    setFormState({
      ...formState,
      variant: formState.variant.filter((_, i) => i !== index),
    });
    // console.log(index);
  };

  const removeColorFromList = (index) => {
    setFormState({
      ...formState,
      color: formState.color.filter((_, i) => i !== index),
    });
    // console.log(index);
  };

  // When in edit mode  Update formData when selectedItem selected otherwise empty
  useEffect(() => {
    if (showSideMenu.mode === "edit" || showSideMenu.mode === "preview") {
      if (selectedItem) {
        console.log(selectedItem);
        setFormState({
          ...selectedItem,
          startYear: selectedItem.startYear,
          lastYear: selectedItem.lastYear,
        });
        setLocValue(selectedItem.location?.location);
        setPartValue(selectedItem?.part?.name);
        setImgArray(selectedItem?.images);
        setLocId(selectedItem.location?._id);
        setPartId(selectedItem?.part?._id);
        if (selectedItem?.color) {
          setColorToggle(true);
        } else {
          setColorToggle(false);
        }
      }
    } else {
      setFormState({
        name: "",
        sku: "",
        year: "",
        model: [],
        make: [],
        variant: [],
        notes: "",
        startYear: "",
        lastYear: "",
        price: "",
        color: [],
      });
      setImgArray([]);
      setLocValue("");
      setColorToggle(false);
      setDateType1(false);
      setDateType2(false);
      setPartValue("");
      dispatch(resetLocationSearchData());
      dispatch(resetPartSearchData());
    }
  }, [selectedItem, showSideMenu]);

  const onCloseMenu = () => {
    dispatch(setShowSideMenu({ value: false }));
    dispatch(resetLocationSearchData());
    dispatch(resetPartSearchData());
    setFormState({
      name: "",
      sku: "",
      year: "",
      model: [],
      make: [],
      variant: [],
      notes: "",
      color: [],
      startYear: "",
      lastYear: "",
      price: "",
    });
    setImgArray([]);
    setLocValue("");
    setPartValue("");
    setDateType1(false);
    setDateType2(false);
  };
  return (
    <div
      className={`fixed flex w-full ${
        showSideMenu.value ? "flex" : "hidden"
      }   h-full  z-20 overflow-y-clip `}
    >
      {/* Black part */}
      <div
        onClick={onCloseMenu}
        className="flex-1  lg:flex-[2] hidden sm:block h-full bg-black opacity-50"
      ></div>

      {/* Main container */}
      <div className="flex-1 bg-white  overflow-y-auto  no-scrollbar flex flex-col justify-start items-start ">
        <div className="p-6 flex w-full flex-col space-y-4">
          <p className="font-semibold">
            {showSideMenu.mode === "edit"
              ? "Edit Inventory"
              : showSideMenu.mode === "preview"
              ? "Preview Inventory"
              : "Add New Inventory"}
          </p>
          {/* This additional container to make them opaque in preview mode */}
          <div
            className={`${
              showSideMenu.mode === "preview" &&
              "opacity-50 pointer-events-none"
            }  flex flex-col space-y-4  items-center w-full `}
          >
            {/* Inventory name input */}
            {/* <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Inventory Name"
                name="name"
                value={formState.name}
                onChange={onInputChange}
              />
            </div> */}
            <div className="flex w-full gap-4">
              {/* Inventory Location input */}
              <div className="w-full relative p-3 flex justify-between items-center hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  value={locValue}
                  placeholder="Location"
                  name="location"
                  onChange={onLocInputChange}
                  autoComplete="off"
                  onFocus={() => {
                    setShowLocDropDown(true);
                    dispatch(
                      fetchAllLocations({
                        isAdmin: user?.userType === "admin",
                        totalOverview:
                          pathName === "/admin/inventory-overview"
                            ? {
                                value: true,
                                id: selectedItem.company,
                              }
                            : false,
                      })
                    );
                  }}
                  onBlur={
                    () =>
                      setTimeout(() => {
                        setShowLocDropDown(false);
                      }, 300) // timeout for dropdown to close because to let the onNameClick (dropdown functions) run before closing
                  }
                />
                <Image src={DownArrow} alt="downarrow" />
                {/* Dropdown */}
                <div
                  className={`${
                    showLocDropDown ? "block" : "hidden"
                  } bg-white overflow-auto z-50  absolute top-[110%] w-full left-0  rounded-lg border shadow-md p-3 flex flex-col justify-start max-h-40`}
                >
                  {locationSearchData.length === 0 && (
                    <p className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg">
                      No results
                    </p>
                  )}
                  {locationSearchData.map((loc) => {
                    return (
                      <p
                        onClick={() => onLocNameClick(loc)}
                        className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
                      >
                        {loc.location}
                      </p>
                    );
                  })}
                </div>
              </div>
              {/* Inventory Part input */}
              <div className="w-full relative p-3 flex justify-between items-center hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  value={partValue}
                  placeholder="Part"
                  name="location"
                  onChange={onPartInputChange}
                  autoComplete="off"
                  onFocus={() => {
                    setShowPartDropDown(true);
                    dispatch(
                      fetchAllParts({
                        isAdmin: user?.userType === "admin",
                        totalOverview:
                          pathName === "/admin/inventory-overview"
                            ? {
                                value: true,
                                id: selectedItem.company,
                              }
                            : false,
                      })
                    );
                  }}
                  onBlur={() =>
                    setTimeout(() => {
                      setShowPartDropDown(false);
                    }, 300)
                  }
                />
                <Image src={DownArrow} alt="downarrow" />
                {/* Dropdown */}
                <div
                  className={`${
                    showPartDropDown ? "block" : "hidden"
                  } bg-white overflow-auto  z-50 absolute top-[110%] w-full left-0  rounded-lg border shadow-md p-3 flex flex-col justify-start max-h-40`}
                >
                  {partSearchData.length === 0 && (
                    <p className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg">
                      No results
                    </p>
                  )}
                  {partSearchData.map((part) => {
                    return (
                      <p
                        onClick={() => onPartNameClick(part)}
                        className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
                      >
                        {part.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Inventory Dates input */}
            <div className="flex w-full space-x-4">
              <DropDownInput
                inputValue={formState.startYear}
                setInputValue={(val) => {
                  setFormState({ ...formState, startYear: val });
                }}
                typeDate={true}
                placeholder={"Start Year"}
              />
              <DropDownInput
                inputValue={formState.lastYear}
                setInputValue={(val) => {
                  setFormState({ ...formState, lastYear: val });
                }}
                typeDate={true}
                placeholder={"Last Year"}
              />
            </div>
            {/* Inventory Model input */}
            <MultiInput
              dataToMap={formState.model}
              placeholder="Model"
              name="variant"
              dataList={modelList}
              onPressEnter={(e) => {
                if (e.length < 1) {
                  dispatch(
                    setShowToast({
                      value: true,
                      msg: "Model should be at least 1 character",
                      red: true,
                    })
                  );
                } else if (e.length > 25) {
                  return dispatch(
                    setShowToast({
                      value: true,
                      msg: "Model must be less than 25 characters",
                      red: true,
                    })
                  );
                } else {
                  setFormState({
                    ...formState,
                    model: [...formState.model, e],
                  });
                }
              }}
              removeItemFunction={removeModelFromList}
            />
            {/* Inventory Make input */}
            <MultiInput
              dataToMap={formState.make}
              placeholder="Make"
              dataList={makeList}
              name="variant"
              onPressEnter={(e) => {
                if (e.length < 1) {
                  dispatch(
                    setShowToast({
                      value: true,
                      msg: "Make should be at least 1 character",
                      red: true,
                    })
                  );
                } else if (e.length > 25) {
                  return dispatch(
                    setShowToast({
                      value: true,
                      msg: "Make must be less than 25 characters",
                      red: true,
                    })
                  );
                } else {
                  setFormState({
                    ...formState,
                    make: [...formState.make, e],
                  });
                }
              }}
              removeItemFunction={removeMakeFromList}
            />
            {/* Inventory Variant input */}
            <MultiInput
              dataToMap={formState.variant}
              placeholder="Variant"
              dataList={variantList}
              name="variant"
              onPressEnter={(e) => {
                if (e.length < 1) {
                  dispatch(
                    setShowToast({
                      value: true,
                      msg: "Variant should be at least 1 character",
                      red: true,
                    })
                  );
                } else if (e.length > 25) {
                  return dispatch(
                    setShowToast({
                      value: true,
                      msg: "Variant must be less than 25 characters",
                      red: true,
                    })
                  );
                } else {
                  setFormState({
                    ...formState,
                    variant: [...formState.variant, e],
                  });
                }
              }}
              removeItemFunction={removeVariantFromList}
            />
            {/* Color input based on toggle */}
            {colorToggle && (
              // <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              //   <input
              //     className="w-full outline-none"
              //     type="text"
              //     placeholder="Color"
              //     name="color"
              //     value={formState.color}
              //     onChange={onInputChange}
              //   />
              // </div>
              <MultiInput
                dataToMap={formState.color}
                placeholder="Color"
                dataList={colorList}
                name="variant"
                onPressEnter={(e) => {
                  if (e.length < 1) {
                    dispatch(
                      setShowToast({
                        value: true,
                        msg: "Color should be at least 1 character",
                        red: true,
                      })
                    );
                  } else if (e.length > 25) {
                    return dispatch(
                      setShowToast({
                        value: true,
                        msg: "Color must be less than 25 characters",
                        red: true,
                      })
                    );
                  } else {
                    setFormState({
                      ...formState,
                      color: [...formState.color, e],
                    });
                  }
                }}
                removeItemFunction={removeColorFromList}
              />
            )}
            <div className="flex w-full gap-4">
              {/* Inventory Price input */}
              {priceToggle || showSideMenu.mode === "preview" ? (
                <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                  <input
                    className="w-full outline-none"
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={formState.price}
                    onChange={onInputChange}
                  />
                </div>
              ) : null}

              {/* Inventory SKU input
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="number"
                  placeholder="SKU"
                  name="sku"
                  value={formState.sku}
                  onChange={onInputChange}
                />
              </div> */}
            </div>
            {/* Inventory Notes input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <textarea
                className="w-full outline-none min-h-20 max-h-32"
                type="text"
                placeholder="Notes"
                name="notes"
                value={formState.notes}
                onChange={onInputChange}
              />
            </div>
          </div>
          {/* Inventory Image input */}
          {imageToggle || showSideMenu.mode === "preview" ? (
            <ImageDropzone
              previewMode={showSideMenu.mode === "preview"}
              imgArray={imgArray}
              setImgArray={setImgArray}
              onImageChange={onImageChange}
            />
          ) : null}
        </div>
        {/* Buttons */}

        <div className="flex flex-1 place-items-end p-6  w-full justify-center space-x-4 ">
          <div
            onClick={onCloseMenu}
            className="flex-1 flex justify-center items-center px-4 py-3 rounded-lg bg-white border border-gray-300 font-semibold cursor-pointer select-none hover:bg-gray-200"
          >
            Cancel
          </div>
          <div
            onClick={onFormSubmit}
            className={`flex-1 flex justify-center items-center px-4 py-3 rounded-lg bg-[#78FFB6] hover:bg-[#37fd93] font-semibold cursor-pointer select-none ${
              showSideMenu.mode === "preview" && "hidden"
            }`}
          >
            {showSideMenu.mode === "edit" ? "Edit Inventory" : "Add Inventory"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySideMenu;
