import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

const SearchBus = () => {
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [buses, setBuses] = useState([]);
  const [noBusesFound, setNoBusesFound] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showRoutes, setShowRoutes] = useState(false);

  const data = [
    {
      id: 1,
      name: 'Satara - Sajjangad',
      source: 'Satara',
      destination: 'Sajjangad',
      time: '10:00 AM',
      fare: '₹25',
    },
    {
      id: 2,
      name: 'Satara - Sajjangad',
      source: 'Satara',
      destination: 'Sajjangad',
      time: '01:00 PM',
      fare: '₹25',
    },
    {
      id: 3,
      name: 'Satara - Medha -  Mahabaleshwar ',
      source: 'Satara',
      destination: 'Mahabaleshwar',
      time: '08:00 PM',
      fare: '₹45',
    },
    {
      id: 4,
      name: 'Satara - Wai - Mahabaleshwar',
      source: 'Satara',
      destination: 'Mahabaleshwar',
      time: '08:00 PM',
      fare: '₹45',
    },
    {
      id: 5,
      name: 'Satara - lonavala - Mumbai',
      source: 'Satara',
      destination: 'Mumbai',
      time: '08:00 PM',
      fare: '₹45',
    },
    // Swargate - satara
    {
      id: 6,
      name: 'Swargate - satara',
      source: 'Swargate',
      destination: 'satara',
      time: '06:00 AM',

      fare: '₹160',
    },
    {
      id: 7,
      name: 'Satara - Swargate',
      source: 'Satara',
      destination: 'Swargate',
      time: '08:40 AM',
      fare: '₹160',
    },
    {
      id: 8,
      name: 'Swargate - satara',
      source: 'Swargate',
      destination: 'satara',
      time: '11:00 AM',

      fare: '₹160',
    },
    {
      id: 9,
      name: 'Satara - Swargate',
      source: 'Satara',
      destination: 'Swargate',
      time: '03:00 PM',
      fare: '₹160',
    },
    {
      id: 10,
      name: 'Swargate - satara',
      source: 'Swargate',
      destination: 'satara',
      time: '05:40 PM',

      fare: '₹160',
    },
    {
      id: 11,
      name: 'Satara - Swargate',
      source: 'Satara',
      destination: 'Swargate',
      time: '08:00 PM',
      fare: '₹160',
    },
    {
      id: 12,
      name: 'Swargate - satara',
      source: 'Swargate',
      destination: 'satara',
      time: '06:20 AM',

      fare: '₹160',
    },
    {
      id: 13,
      name: 'Satara - Swargate',
      source: 'Satara',
      destination: 'Swargate',
      time: '09:00 AM',
      fare: '₹160',
    },
    {
      id: 14,
      name: 'Swargate - satara',
      source: 'Swargate',
      destination: 'satara',
      time: '11:20 AM',

      fare: '₹160',
    },
    {
      id: 15,
      name: 'Satara - Swargate',
      source: 'Satara',
      destination: 'Swargate',
      time: '03:20 PM',
      fare: '₹160',
    },
    {
      id: 16,
      name: 'Swargate - satara',
      source: 'Swargate',
      destination: 'satara',
      time: '06:00 PM',

      fare: '₹160',
    },
    {
      id: 17,
      name: 'Satara - Swargate',
      source: 'Satara',
      destination: 'Swargate',
      time: '08:20 PM',
      fare: '₹160',
    },
    // Swargate - Satara
    {
      id: 18,
      name: 'Swargate - satara',
      source: 'Swargate',
      destination: 'satara',
      time: '06:40 AM',

      fare: '₹160',
    },
    //Satara - Swargate
    {
      id: 19,
      name: 'Satara - Swargate',
      source: 'Satara',
      destination: 'Swargate',
      time: '09:20 AM',
      fare: '₹160',
    }, //Satara - Swargate
    {
      id: 20,
      name: 'Satara - Swargate',
      source: 'Satara',
      destination: 'Swargate',
      time: '09:20 AM',
      fare: '₹160',
    }, //Satara - Swargate
    {
      id: 21,
      name: 'Satara - Swargate',
      source: 'Satara',
      destination: 'Swargate',
      time: '09:20 AM',
      fare: '₹160',
    },

    // Swargate - Satara
    {
      id: 22,
      name: 'Swargate - satara',
      source: 'Swargate',
      destination: 'satara',
      time: '06:20 PM',
      fare: '₹160',
    },
    //Satara - Swargate
    {
      id: 23,
      name: 'Satara - Swargate',
      source: 'Satara',
      destination: 'Swargate',
      time: '08:40 PM',
      fare: '₹160',
    }, //Satara - Dusaale
    {
      id: 24,
      name: 'Satara - Dusaale',
      source: 'Satara',
      destination: 'Dusaale',
      time: '01:00 PM',
      fare: '₹60',
    },
    //Satara - Tarale
    {
      id: 25,
      name: 'Satara - Tarale',
      source: 'Satara',
      destination: 'Tarale',
      time: '04:00 PM',
      fare: '₹55',
    }, //Tarale - Satara
    {
      id: 26,
      name: 'Tarale - Satara',
      source: 'Tarale',
      destination: 'Satara',
      time: '06:05 PM',
      fare: '₹55',
    },

    //Satara - Dusaale
    {
      id: 27,
      name: 'Satara - Dusaale',
      source: 'Satara',
      destination: 'Dusaale',
      time: '07:30 PM',
      fare: '₹60',
    },
    //Dusaale - Satara
    {
      id: 28,
      name: 'Dusaale - Satara',
      source: 'Dusaale',
      destination: 'Satara',
      time: '07:00 AM',
      fare: '₹60',
    },
    //Satara - Dusaale
    {
      id: 29,
      name: 'Satara - Dusaale',
      source: 'Satara',
      destination: 'Dusaale',
      time: '08:40 AM',
      fare: '₹60',
    },
    //Dusaale - Satara
    {
      id: 30,
      name: 'Dusaale - Satara',
      source: 'Dusaale',
      destination: 'Satara',
      time: '10:20 AM',
      fare: '₹60',
    },
    //Satara - Limb
    {
      id: 31,
      name: 'Satara - Limb',
      source: 'Satara',
      destination: 'Limb',
      time: '12:30 PM',
      fare: '₹25',
    },
    //Limb - Satara
    {
      id: 108,
      name: 'Limb - Satara',
      source: 'Limb',
      destination: 'Satara',
      time: '01:10 PM',
      fare: '₹25',
    },
    //Satara - Malganv
    {
      id: 109,
      name: 'Satara - Malganv',
      source: 'Satara',
      destination: 'Malganv',
      time: '12:30 PM',
      fare: '₹25',
    },
    //Malganv - Satara
    {
      id: 110,
      name: 'Malganv - Satara',
      source: 'Malganv',
      destination: 'Satara',
      time: '02:55 PM',
      fare: '₹25',
    },
    //Satara - Malganv
    {
      id: 111,
      name: 'Satara - Malganv',
      source: 'Satara',
      destination: 'Malganv',
      time: '03:45 PM',
      fare: '₹25',
    },
    //Malganv - Satara
    {
      id: 112,
      name: 'Malganv - Satara',
      source: 'Malganv',
      destination: 'Satara',
      time: '06:35 PM',
      fare: '₹25',
    },
    //Satara - Kholwadi
    {
      id: 113,
      name: 'Satara - Kholwadi',
      source: 'Satara',
      destination: 'Kholwadi',
      time: '05:25 PM',
      fare: '₹30',
    },
    //Kholwadi - Satara
    {
      id: 114,
      name: 'Kholwadi - Satara',
      source: 'Kholwadi',
      destination: 'Satara',
      time: '06:20 PM',
      fare: '₹30',
    },
    //Satara - Kholwadi
    {
      id: 115,
      name: 'Satara - Kholwadi',
      source: 'Satara',
      destination: 'Kholwadi',
      time: '05:25 PM',
      fare: '₹30',
    },
    //Satara -Rautwadi'
    {
      id: 116,
      name: 'Satara - Rautwadi',
      source: 'Satara',
      destination: 'Rautwadi',
      time: '07:15 PM',
      fare: '₹30',
    },
    //Rautwadi' - Satara
    {
      id: 117,
      name: 'Rautwadi' - 'Satara',
      source: 'Rautwadi',
      destination: 'Satara',
      time: '08:10 PM',
      fare: '₹30',
    },
    //Satara - Limb
    {
      id: 118,
      name: 'Satara - Limb',
      source: 'Satara',
      destination: 'Limb',
      time: '05:50 AM',
      fare: '₹25',
    },
    //Limb - Satara
    {
      id: 119,
      name: 'Limb - Satara',
      source: 'Limb',
      destination: 'Satara',
      time: '06:30 AM',
      fare: '₹25',
    },
    //Satara -Rautwadi'
    {
      id: 120,
      name: 'Satara - Rautwadi',
      source: 'Satara',
      destination: 'Rautwadi',
      time: '07:10 AM',
      fare: '₹30',
    },
    //Rautwadi' - Satara
    {
      id: 121,
      name: 'Rautwadi' - 'Satara',
      source: 'Rautwadi',
      destination: 'Satara',
      time: '08:05 AM',
      fare: '₹30',
    },
    //Satara - Kholwadi
    {
      id: 122,
      name: 'Satara - Kholwadi',
      source: 'Satara',
      destination: 'Kholwadi',
      time: '09:00 AM',
      fare: '₹30',
    },
    //Kholwadi - Satara
    {
      id: 123,
      name: 'Kholwadi - Satara',
      source: 'Kholwadi',
      destination: 'Satara',
      time: '09:55 AM',
      fare: '₹30',
    },
    //Satara - Malganv
    {
      id: 124,
      name: 'Satara - Malganv',
      source: 'Satara',
      destination: 'Malganv',
      time: '10:50 AM',
      fare: '₹25',
    },
    //Malganv - Satara
    {
      id: 125,
      name: 'Malganv - Satara',
      source: 'Malganv',
      destination: 'Satara',
      time: '11:40 AM',
      fare: '₹25',
    },
    //Satara - Kholwadi
    {
      id: 126,
      name: 'Satara - Kholwadi',
      source: 'Satara',
      destination: 'Kholwadi',
      time: '12:50 PM',
      fare: '₹30',
    },
    //Kholwadi - Satara
    {
      id: 127,
      name: 'Kholwadi - Satara',
      source: 'Kholwadi',
      destination: 'Satara',
      time: '01:45 PM',
      fare: '₹30',
    },
    //Satara - Pusesavali
    {
      id: 128,
      name: 'Satara - Pusesavali',
      source: 'Satara',
      destination: 'Pusesavali',
      time: '03:00 PM',
      fare: '₹80',
    },

    //Pusesavali - Satara
    {
      id: 129,
      name: 'Pusesavali - Satara',
      source: 'Pusesavali',
      destination: 'Satara',
      time: '05:00 PM',
      fare: '₹80',
    },
    //Satara - Pusesavali
    {
      id: 130,
      name: 'Satara - Pusesavali',
      source: 'Satara',
      destination: 'Pusesavali',
      time: '07:15 PM',
      fare: '₹80',
    },
    //Pusesavali - Satara
    {
      id: 131,
      name: 'Pusesavali - Satara',
      source: 'Pusesavali',
      destination: 'Satara',
      time: '07:00 AM',
      fare: '₹80',
    },
    //Satara - Nimsod
    {
      id: 132,
      name: 'Satara - Nimsod',
      source: 'Satara',
      destination: 'Nimsod',
      time: '09:30 AM',
      fare: '₹105',
    },
    //Nimsod - Satara
    {
      id: 133,
      name: 'Nimsod - Satara',
      source: 'Nimsod',
      destination: 'Satara',
      time: '11:55 AM',
      fare: '₹105',
    },
    //Satara - Satara Road
    {
      id: 134,
      name: 'Satara -  Satara Road',
      source: 'Satara',
      destination: ' Satara Road',
      time: '01:20 PM',
      fare: '₹25',
    },
    //Satara Road - Satara
    {
      id: 135,
      name: 'Satara Road -  Satara ',
      source: 'Satara Road',
      destination: ' Satara ',
      time: '02:10 PM',
      fare: '₹25',
    },
    //Satara - Kinhai
    {
      id: 136,
      name: 'Satara - Kinhai',
      source: 'Satara',
      destination: 'Kinhai',
      time: '03:00 PM',
      fare: '₹40',
    },
    // Kinhai - Satara
    {
      id: 136,
      name: 'Kinhai - Satara',
      source: 'Kinhai',
      destination: ' Satara',
      time: '04:00 PM',
      fare: '₹40',
    },
    //Satara - Kinhai
    {
      id: 137,
      name: 'Satara - Kinhai',
      source: 'Satara',
      destination: 'Kinhai',
      time: '05:00 PM',
      fare: '₹40',
    },
    // Kinhai - Satara
    {
      id: 138,
      name: 'Kinhai - Satara',
      source: 'Kinhai',
      destination: ' Satara',
      time: '06:00 PM',
      fare: '₹40',
    },
    // Satara - Sajjangad
    {
      id: 139,
      name: 'Satara - Sajjangad',
      source: 'Satara',
      destination: 'Sajjangad',
      time: '07:00 AM',
      fare: '₹25',
    },
    // Sajjangad - Satara
    {
      id: 140,
      name: 'Sajjangad -  Satara',
      source: 'Sajjangad',
      destination: ' Satara',
      time: '07:50 PM',
      fare: '₹25',
    },

    // Angapur - Satara
    {
      id: 141,
      name: 'Angapur -  Satara',
      source: 'Angapur',
      destination: ' Satara',
      time: '06:40 AM',
      fare: '₹40',
    },
    // Satara - Nigadi Vandan
    {
      id: 142,
      name: 'Satara - Nigadi Vandan',
      source: 'Satara',
      destination: 'Nigadi Vandan',
      time: '07:40 AM',
      fare: '₹45',
    },
    // Nigadi Vandan - Satara
    {
      id: 143,
      name: 'Nigadi Vandan - Satara',
      source: 'Nigadi Vandan',
      destination: 'Satara',
      time: '08:45 AM',
      fare: '₹45',
    },
    // Satara - Aganpur
    {
      id: 144,
      name: 'Satara - Aganpur',
      source: 'Satara',
      destination: 'Aganpur',
      time: '09:50 AM',
      fare: '₹40',
    },
    // Aganpur - Satara
    {
      id: 145,
      name: 'Aganpur - Satara',
      source: 'Aganpur',
      destination: 'Satara',
      time: '10:50 AM',
      fare: '₹40',
    },
    // Satara - Aganpur
    {
      id: 146,
      name: 'Satara - Aganpur',
      source: 'Satara',
      destination: 'Aganpur',
      time: '12:10 PM',
      fare: '₹40',
    },
    // Aganpur - Satara
    {
      id: 147,
      name: 'Aganpur - Satara',
      source: 'Aganpur',
      destination: 'Satara',
      time: '01:10 PM',
      fare: '₹40',
    },

    // Satara - Karandi
    {
      id: 148,
      name: 'Satara - Karandi',
      source: 'Satara',
      destination: 'Karandi',
      time: '02:40 PM',
      fare: '₹25',
    },
    // Karandi - Satara
    {
      id: 149,
      name: ' Karandi - Satara',
      source: 'Karandi',
      destination: 'Satara',
      time: '03:20 PM',
      fare: '₹25',
    },
    // Satara - Nigadi Vandan
    {
      id: 150,
      name: 'Satara - Nigadi Vandan',
      source: 'Satara',
      destination: 'Nigadi Vandan',
      time: '04:00 PM',
      fare: '₹45',
    },
    // Nigadi Vandan - Satara
    {
      id: 151,
      name: 'Nigadi Vandan - Satara',
      source: 'Nigadi Vandan',
      destination: 'Satara',
      time: '05:05 PM',
      fare: '₹45',
    },
    // Satara - Bhaktavadi
    {
      id: 152,
      name: 'Satara - Bhaktavadi',
      source: 'Satara',
      destination: 'Bhaktavadi',
      time: '07:00 PM',
      fare: '₹30',
    },
    //Bhaktavadi - Satara
    {
      id: 153,
      name: 'Bhaktavadi - Satara ',
      source: 'Bhaktavadi',
      destination: ' Satara',
      time: '07:10 PM',
      fare: '₹30',
    },
    // Satara - Angapur
    {
      id: 154,
      name: 'Satara - Angapur',
      source: 'Satara',
      destination: 'Angapur',
      time: '08:40 PM',
      fare: '₹35',
    },
    // Satara - kelavli
    {
      id: 155,
      name: 'Satara - kelavli',
      source: 'Satara',
      destination: ' kelavli',
      time: '06:30 PM',
      fare: '₹57',
    },
    // kelavli -Satara
    {
      id: 156,
      name: 'kelavli -Satara',
      source: 'kelavli',
      destination: ' Satara',
      time: '08:10 AM',
      fare: '₹57',
    },
    // Satara - Bo Karandi
    {
      id: 157,
      name: 'Satara - Bo Karandi',
      source: 'Satara',
      destination: ' Bo Karandi',
      time: '09:50 AM',
      fare: '₹25',
    },
    //Bo Karandi - Satara
    {
      id: 158,
      name: 'Bo Karandi - Satara ',
      source: 'Bo Karandi',
      destination: ' Satara',
      time: '10:30 AM',
      fare: '₹25',
    },
    // Satara - Tukaaiwadi
    {
      id: 159,
      name: 'Satara - Tukaaiwadi',
      source: 'Satara',
      destination: 'Tukaaiwadi',
      time: '11:30 AM',
      fare: '₹25',
    },
    // Tukaaiwadi - Satara
    {
      id: 160,
      name: 'Tukaaiwadi - Satara',
      source: 'Tukaaiwadi',
      destination: 'Satara',
      time: '12:45 PM',
      fare: '₹47',
    },
    // Satara - Kadve
    {
      id: 161,
      name: 'Satara - Kadve',
      source: 'Satara',
      destination: 'Kadve',
      time: '02:25 PM',
      fare: '₹47',
    },
    // Kadve - Satara
    {
      id: 162,
      name: 'Kadve - Satara',
      source: 'Kadve',
      destination: 'Satara',
      time: '03:50 PM',
      fare: '₹47',
    },
    // Satara - Walekamati
    {
      id: 163,
      name: 'Satara - Walekamati',
      source: 'Satara',
      destination: 'Walekamati',
      time: '05:15 PM',
      fare: '₹25',
    },
    // Walekamati - Satara
    {
      id: 164,
      name: 'Walekamati - Satara',
      source: 'Walekamati',
      destination: 'Satara',
      time: '06:05 PM',
      fare: '₹25',
    },
    // Satara - Walekamati
    {
      id: 165,
      name: 'Satara - Walekamati',
      source: 'Satara',
      destination: 'Walekamati',
      time: '06:55 PM',
      fare: '₹25',
    },
    // Walekamati - Satara
    {
      id: 166,
      name: 'Walekamati - Satara',
      source: 'Walekamati',
      destination: 'Satara',
      time: '07:45 PM',
      fare: '₹25',
    },
    // Satara - Walekamati Mu.
    {
      id: 167,
      name: 'Satara - Walekamati Mu.',
      source: 'Satara',
      destination: 'Walekamati Mu.',
      time: '08:55 PM',
      fare: '₹25',
    },
    // Walekamati - Satara
    {
      id: 168,
      name: 'Walekamati - Satara',
      source: 'Walekamati',
      destination: 'Satara',
      time: '06:35 AM',
      fare: '₹25',
    },
    // Satara - Walekamati
    {
      id: 169,
      name: 'Satara - Walekamati',
      source: 'Satara',
      destination: 'Walekamati',
      time: '07:25 AM',
      fare: '₹25',
    },
    // Walekamati - Satara
    {
      id: 170,
      name: 'Walekamati - Satara',
      source: 'Walekamati',
      destination: 'Satara',
      time: '08:15 AM',
      fare: '₹25',
    },
    // Satara - Walekamati
    {
      id: 171,
      name: 'Satara - Walekamati',
      source: 'Satara',
      destination: 'Walekamati',
      time: '09:05 AM',
      fare: '₹25',
    },
    // Walekamati - Satara
    {
      id: 172,
      name: 'Walekamati - Satara',
      source: 'Walekamati',
      destination: 'Satara',
      time: '09:55 AM',
      fare: '₹25',
    },
    // Satara - Walekamati
    {
      id: 173,
      name: 'Satara - Walekamati',
      source: 'Satara',
      destination: 'Walekamati',
      time: '11:05 AM',
      fare: '₹25',
    },
    // Walekamati - Satara
    {
      id: 174,
      name: 'Walekamati - Satara',
      source: 'Walekamati',
      destination: 'Satara',
      time: '11:55 AM',
      fare: '₹25',
    },
    // Satara - Walekamati
    {
      id: 175,
      name: 'Satara - Walekamati',
      source: 'Satara',
      destination: 'Walekamati',
      time: '12:45 PM',
      fare: '₹25',
    },
    // Walekamati - Satara
    {
      id: 176,
      name: 'Walekamati - Satara',
      source: 'Walekamati',
      destination: 'Satara',
      time: '11:55 AM',
      fare: '₹25',
    },
    // Satara - Walekamati
    {
      id: 177,
      name: 'Satara - Walekamati',
      source: 'Satara',
      destination: 'Walekamati',
      time: '12:45 PM',
      fare: '₹25',
    },
    // Walekamati - Satara
    {
      id: 178,
      name: 'Walekamati - Satara',
      source: 'Walekamati',
      destination: 'Satara',
      time: '01:35 PM',
      fare: '₹25',
    },
    // Satara - Bhaktavadi
    {
      id: 179,
      name: 'Satara - Bhaktavadi',
      source: 'Satara',
      destination: 'Bhaktavadi',
      time: '05:00 AM',
      fare: '₹30',
    },
    //Bhaktavadi - Satara
    {
      id: 180,
      name: 'Bhaktavadi - Satara ',
      source: 'Bhaktavadi',
      destination: ' Satara',
      time: '05:55 AM',
      fare: '₹30',
    },
    // Satara - Madhavaapur
    {
      id: 181,
      name: 'Satara - Madhavaapur',
      source: 'Satara',
      destination: 'Madhavaapur',
      time: '06:50 AM',
      fare: '₹41',
    },
    // Madhavaapur - Satara
    {
      id: 182,
      name: 'Madhavaapur - Satara',
      source: 'Madhavaapur',
      destination: 'Satara',
      time: '07:55 AM',
      fare: '₹41',
    },
    //Satara - Satara Road
    {
      id: 183,
      name: 'Satara -  Satara Road',
      source: 'Satara',
      destination: ' Satara Road',
      time: '09:00 AM',
      fare: '₹25',
    },
    //Satara Road - Satara
    {
      id: 184,
      name: 'Satara Road -  Satara ',
      source: 'Satara Road',
      destination: ' Satara ',
      time: '09:50 AM',
      fare: '₹25',
    },
    //Satara - Satara Road
    {
      id: 185,
      name: 'Satara -  Satara Road',
      source: 'Satara',
      destination: ' Satara Road',
      time: '11:00 AM',
      fare: '₹25',
    },
    //Satara Road - Satara
    {
      id: 186,
      name: 'Satara Road -  Satara ',
      source: 'Satara Road',
      destination: ' Satara ',
      time: '11:50 AM',
      fare: '₹25',
    },
    //Satara - kusvade
    {
      id: 187,
      name: 'Satara -  kusvade',
      source: 'Satara',
      destination: ' kusvade',
      time: '01:00 PM',
      fare: '₹25',
    },
    //kusvade  - Satara
    {
      id: 188,
      name: 'kusvade  - Satara  ',
      source: 'kusvade',
      destination: ' Satara ',
      time: '01:45 PM',
      fare: '₹25',
    },
    //Satara - Kaameri
    {
      id: 189,
      name: 'Satara - Kaameri',
      source: 'Satara',
      destination: ' Kaameri',
      time: '04:00 PM',
      fare: '₹25',
    },
    //Kaameri  - Satara
    {
      id: 190,
      name: 'Kaameri  - Satara  ',
      source: 'Kaameri',
      destination: ' Satara ',
      time: '05:00 PM',
      fare: '₹25',
    },
    //Satara - Raighar
    {
      id: 191,
      name: 'Satara - Raighar',
      source: 'Satara',
      destination: ' Raighar',
      time: '06:00 PM',
      fare: '₹26',
    },
    //Raighar  - Satara
    {
      id: 192,
      name: 'Raighar  - Satara  ',
      source: 'Raighar',
      destination: ' Satara ',
      time: '06:50 PM',
      fare: '₹25',
    },
    //Satara - Kaameri
    {
      id: 193,
      name: 'Satara - Kaameri',
      source: 'Satara',
      destination: ' Kaameri',
      time: '07:40 PM',
      fare: '₹45',
    },
    //Kaameri  - Satara
    {
      id: 194,
      name: 'Kaameri  - Satara  ',
      source: 'Kaameri',
      destination: ' Satara ',
      time: '06:15 AM',
      fare: '₹45',
    },
    //Satara - Kaameri
    {
      id: 195,
      name: 'Satara - Kaameri',
      source: 'Satara',
      destination: ' Kaameri',
      time: '07:15 PM',
      fare: '₹45',
    },
    //Kaameri  - Satara
    {
      id: 196,
      name: 'Kaameri  - Satara  ',
      source: 'Kaameri',
      destination: ' Satara ',
      time: '08:15 AM',
      fare: '₹45',
    },
    //Satara - Kaameri
    {
      id: 197,
      name: 'Satara - Kaameri',
      source: 'Satara',
      destination: ' Kaameri',
      time: '09:15 AM',
      fare: '₹45',
    },
    //Kaameri  - Satara
    {
      id: 198,
      name: 'Kaameri  - Satara  ',
      source: 'Kaameri',
      destination: ' Satara ',
      time: '10:15 AM',
      fare: '₹45',
    },
    //Satara - Kaameri
    {
      id: 199,
      name: 'Satara - Kaameri',
      source: 'Satara',
      destination: ' Kaameri',
      time: '12:25 PM',
      fare: '₹45',
    },
    //Kaameri  - Satara
    {
      id: 200,
      name: 'Kaameri  - Satara  ',
      source: 'Kaameri',
      destination: ' Satara ',
      time: '01:25 PM',
      fare: '₹45',
    },
    //Satara - Kaameri
    {
      id: 201,
      name: 'Satara - Kaameri',
      source: 'Satara',
      destination: ' Kaameri',
      time: '03:15 PM',
      fare: '₹45',
    },
    //Kaameri  - Satara
    {
      id: 202,
      name: 'Kaameri  - Satara  ',
      source: 'Kaameri',
      destination: ' Satara ',
      time: '04:15 PM',
      fare: '₹45',
    },
    //Satara - Maloshi
    {
      id: 203,
      name: 'Satara - Maloshi',
      source: 'Satara',
      destination: ' Maloshi',
      time: '05:30 PM',
      fare: '₹56',
    },
    //Maloshi - Satara
    {
      id: 204,
      name: 'Maloshi - Satara',
      source: 'Maloshi',
      destination: ' Satara',
      time: '06:45 AM',
      fare: '₹56',
    },
    // Satara - Karandi
    {
      id: 205,
      name: 'Satara - Karandi',
      source: 'Satara',
      destination: 'Karandi',
      time: '08:55 AM',
      fare: '₹25',
    },
    // Karandi - Satara
    {
      id: 206,
      name: ' Karandi - Satara',
      source: 'Karandi',
      destination: 'Satara',
      time: '09:35 AM',
      fare: '₹25',
    },
    // Satara - Aundh
    {
      id: 207,
      name: 'Satara - Aundh',
      source: 'Satara',
      destination: 'Aundh',
      time: '10:35 AM',
      fare: '₹65',
    },
    // Aundh - Satara
    {
      id: 208,
      name: 'Aundh - Satara',
      source: 'Aundh',
      destination: 'Satara',
      time: '12:00 PM',
      fare: '₹65',
    },
    // Satara - Jambhe
    {
      id: 209,
      name: 'Satara - Jambhe',
      source: 'Satara',
      destination: 'Jambhe',
      time: '01:30 PM',
      fare: '₹57',
    },
    // Jambhe - Satara
    {
      id: 210,
      name: 'Jambhe - Satara',
      source: 'Jambhe',
      destination: 'Satara',
      time: '03:10 PM',
      fare: '₹57',
    },
    // Satara - Vangal
    {
      id: 211,
      name: 'Satara - Vangal',
      source: 'Satara',
      destination: 'Vangal',
      time: '04:50 PM',
      fare: '₹23',
    },
    // Vangal - Satara
    {
      id: 212,
      name: ' Vangal - Satara',
      source: 'Vangal',
      destination: 'Satara',
      time: '05:35 PM',
      fare: '₹23',
    },
    //Satara - Kaameri
    {
      id: 213,
      name: 'Satara - Kaameri',
      source: 'Satara',
      destination: ' Kaameri',
      time: '06:40 PM',
      fare: '₹45',
    },
    //Kaameri  - Satara
    {
      id: 214,
      name: 'Kaameri  - Satara  ',
      source: 'Kaameri',
      destination: ' Satara ',
      time: '07:40 PM',
      fare: '₹45',
    },
    //Satara - Aasangav
    {
      id: 215,
      name: 'Satara - Aasangav',
      source: 'Satara',
      destination: ' Aasangav',
      time: '12:30 PM',
      fare: '₹25',
    },
    //Aasangav - Satara
    {
      id: 216,
      name: 'Aasangav - Satara',
      source: 'Aasangav',
      destination: ' Satara',
      time: '01:20 PM',
      fare: '₹25',
    },
    //Satara - Aasangav
    {
      id: 217,
      name: 'Satara - Aasangav',
      source: 'Satara',
      destination: ' Aasangav',
      time: '02:10 PM',
      fare: '₹25',
    },
    //Aasangav - Satara
    {
      id: 218,
      name: 'Aasangav - Satara',
      source: 'Aasangav',
      destination: ' Satara',
      time: '03:00 PM',
      fare: '₹25',
    },
    //Satara - Aasangav
    {
      id: 219,
      name: 'Satara - Aasangav',
      source: 'Satara',
      destination: ' Aasangav',
      time: '03:50 PM',
      fare: '₹25',
    },
    //Aasangav - Satara
    {
      id: 220,
      name: 'Aasangav - Satara',
      source: 'Aasangav',
      destination: ' Satara',
      time: '04:40 PM',
      fare: '₹25',
    },
    //Satara - Rakusalewadi
    {
      id: 221,
      name: 'Satara - Rakusalewadi',
      source: 'Satara',
      destination: ' Rakusalewadi',
      time: '05:30 PM',
      fare: '₹30',
    },
    //Rakusalewadi - Satara
    {
      id: 222,
      name: 'Rakusalewadi - Satara',
      source: 'Rakusalewadi',
      destination: ' Satara',
      time: '06:25 PM',
      fare: '₹30',
    },
    //Satara - Rakusalewadi
    {
      id: 223,
      name: 'Satara - Rakusalewadi',
      source: 'Satara',
      destination: ' Rakusalewadi',
      time: '07:40 PM',
      fare: '₹30',
    },
    //Rakusalewadi - Satara
    {
      id: 224,
      name: 'Rakusalewadi - Satara',
      source: 'Rakusalewadi',
      destination: ' Satara',
      time: '06:15 AM',
      fare: '₹30',
    },
    //Satara - Rakusalewadi
    {
      id: 225,
      name: 'Satara - Rakusalewadi',
      source: 'Satara',
      destination: ' Rakusalewadi',
      time: '07:10 AM',
      fare: '₹30',
    },

    //Rakusalewadi - Satara
    {
      id: 226,
      name: 'Rakusalewadi - Satara',
      source: 'Rakusalewadi',
      destination: ' Satara',
      time: '08:05 AM',
      fare: '₹30',
    },
    //Satara - Aasangav
    {
      id: 227,
      name: 'Satara - Aasangav',
      source: 'Satara',
      destination: ' Aasangav',
      time: '09:00 AM',
      fare: '₹25',
    },
    //Aasangav - Satara
    {
      id: 228,
      name: 'Aasangav - Satara',
      source: 'Aasangav',
      destination: ' Satara',
      time: '09:50 AM',
      fare: '₹25',
    },
    //Satara - Kondani
    {
      id: 229,
      name: 'Satara - Kondani',
      source: 'Satara',
      destination: ' Kondani',
      time: '11:00 AM',
      fare: '₹45',
    },
    //Kondani - Satara
    {
      id: 230,
      name: 'Kondani - Satara',
      source: 'Kondani',
      destination: ' Satara',
      time: '12:00 PM',
      fare: '₹45',
    },
    // Satara - Sajjangad
    {
      id: 231,
      name: 'Satara - Sajjangad',
      source: 'Satara',
      destination: 'Sajjangad',
      time: '01:00 PM',
      fare: '₹25',
    },
    // Sajjangad - Satara
    {
      id: 232,
      name: 'Sajjangad -  Satara',
      source: 'Sajjangad',
      destination: ' Satara',
      time: '02:00 PM',
      fare: '₹25',
    },
    // Satara - Sajjangad
    {
      id: 233,
      name: 'Satara - Sajjangad',
      source: 'Satara',
      destination: 'Sajjangad',
      time: '03:00 PM',
      fare: '₹25',
    },
    // Sajjangad - Satara
    {
      id: 234,
      name: 'Sajjangad -  Satara',
      source: 'Sajjangad',
      destination: ' Satara',
      time: '04:00 PM',
      fare: '₹25',
    },
    // Satara - Sajjangad
    {
      id: 235,
      name: 'Satara - Sajjangad',
      source: 'Satara',
      destination: 'Sajjangad',
      time: '05:00 PM',
      fare: '₹25',
    },
    // Sajjangad - Satara
    {
      id: 236,
      name: 'Sajjangad -  Satara',
      source: 'Sajjangad',
      destination: ' Satara',
      time: '06:00 PM',
      fare: '₹25',
    },
    //Satara - Kinhai
    {
      id: 237,
      name: 'Satara - Kinhai',
      source: 'Satara',
      destination: 'Kinhai',
      time: '07:10 PM',
      fare: '₹40',
    },
    // Kinhai - Satara
    {
      id: 238,
      name: 'Kinhai - Satara',
      source: 'Kinhai',
      destination: ' Satara',
      time: '08:10 PM',
      fare: '₹40',
    },
    // Satara - Vangal
    {
      id: 239,
      name: 'Satara - Vangal',
      source: 'Satara',
      destination: 'Vangal',
      time: '05:30 AM',
      fare: '₹23',
    },
    // Vangal - Satara
    {
      id: 240,
      name: ' Vangal - Satara',
      source: 'Vangal',
      destination: 'Satara',
      time: '06:15 AM',
      fare: '₹23',
    },
    // Satara - Vangal
    {
      id: 241,
      name: 'Satara - Vangal',
      source: 'Satara',
      destination: 'Vangal',
      time: '07:15 AM',
      fare: '₹23',
    },
    // Vangal - Satara
    {
      id: 242,
      name: ' Vangal - Satara',
      source: 'Vangal',
      destination: 'Satara',
      time: '08:00 AM',
      fare: '₹23',
    },
    //Satara - Limb
    {
      id: 243,
      name: 'Satara - Limb',
      source: 'Satara',
      destination: 'Limb',
      time: '09:15 AM',
      fare: '₹25',
    },
    //Limb - Satara
    {
      id: 244,
      name: 'Limb - Satara',
      source: 'Limb',
      destination: 'Satara',
      time: '09:55 AM',
      fare: '₹25',
    },
    //Satara - Limb
    {
      id: 245,
      name: 'Satara - Limb',
      source: 'Satara',
      destination: 'Limb',
      time: '10:45 AM',
      fare: '₹25',
    },
    //Limb - Satara
    {
      id: 246,
      name: 'Limb - Satara',
      source: 'Limb',
      destination: 'Satara',
      time: '11:25 AM',
      fare: '₹25',
    },
    //Satara - Limb
    {
      id: 247,
      name: 'Satara - Limb',
      source: 'Satara',
      destination: 'Limb',
      time: '12:05 PM',
      fare: '₹25',
    },
    //Limb - Satara
    {
      id: 246,
      name: 'Limb - Satara',
      source: 'Limb',
      destination: 'Satara',
      time: '12:45 AM',
      fare: '₹25',
    },
    //Alavdi - Satara
    {
      id: 247,
      name: 'Alavdi - Satara',
      source: 'Alavdi',
      destination: 'Satara',
      time: '06:30 AM',
      fare: '₹48',
    },
    //Satara - Shenavdi
    {
      id: 248,
      name: 'Satara - Shenavdi',
      source: 'Satara',
      destination: 'Shenavdi',
      time: '08:15 AM',
      fare: '₹105',
    },
    //Shenavdi - Satara
    {
      id: 248,
      name: 'Shenavdi - Satara',
      source: 'Shenavdi',
      destination: 'Satara',
      time: '10:35 AM',
      fare: '₹105',
    },
    //Satara - Yeleevi
    {
      id: 248,
      name: 'Satara - Yeleevi',
      source: 'Satara',
      destination: 'Yeleevi',
      time: '01:00 PM',
      fare: '₹80',
    },
    //Satara - Yeleevi
    {
      id: 249,
      name: 'Yeleevi - Satara',
      source: 'Yeleevi',
      destination: 'Satara',
      time: '02:40 PM',
      fare: '₹80',
    },
    //Satara - Nimsod
    {
      id: 250,
      name: 'Satara - Nimsod',
      source: 'Satara',
      destination: 'Nimsod',
      time: '05:30 PM',
      fare: '₹105',
    },
    //Nimsod - Satara
    {
      id: 251,
      name: 'Nimsod - Satara',
      source: 'Nimsod',
      destination: 'Satara',
      time: '06:45 AM',
      fare: '₹105',
    },
    //Satara - Solashi
    {
      id: 252,
      name: 'Satara - Solashi',
      source: 'Satara',
      destination: 'Solashi',
      time: '09:15 AM',
      fare: '₹60',
    },
    //Solashi - Satara
    {
      id: 253,
      name: 'Solashi - Satara',
      source: 'Solashi',
      destination: 'Satara',
      time: '10:50 AM',
      fare: '₹60',
    },
    //Satara - Alavdi
    {
      id: 254,
      name: 'Satara - Alavdi',
      source: 'Satara',
      destination: 'Alavdi',
      time: '12:30 PM',
      fare: '₹47',
    },
    //Alavdi - Satara
    {
      id: 255,
      name: 'Alavdi - Satara',
      source: 'Alavdi',
      destination: 'Satara',
      time: '02:10 PM',
      fare: '₹47',
    },
    //Satara - Kinhai
    {
      id: 256,
      name: 'Satara - Kinhai',
      source: 'Satara',
      destination: 'Kinhai',
      time: '04:30 PM',
      fare: '₹40',
    },
    //Kinhai - Satara
    {
      id: 257,
      name: 'Kinhai - Satara',
      source: 'Kinhai',
      destination: 'Satara',
      time: '06:20 PM',
      fare: '₹40',
    },
    //Satara - Alavdi
    {
      id: 258,
      name: 'Satara - Alavdi',
      source: 'Satara',
      destination: 'Alavdi',
      time: '07:30 PM',
      fare: '₹47',
    },
    //Kondani - Satara
    {
      id: 259,
      name: 'Kondani - Satara',
      source: 'Kondani',
      destination: ' Satara',
      time: '06:15 AM',
      fare: '₹45',
    },
    //Satara - Kondani
    {
      id: 260,
      name: 'Satara - Kondani',
      source: 'Satara',
      destination: ' Kondani',
      time: '07:35 AM',
      fare: '₹45',
    },
    //Kondani - Satara
    {
      id: 261,
      name: 'Kondani - Satara',
      source: 'Kondani',
      destination: ' Satara',
      time: '08:35 AM',
      fare: '₹45',
    },
    //Satara - Aasangav
    {
      id: 262,
      name: 'Satara - Aasangav',
      source: 'Satara',
      destination: ' Aasangav',
      time: '09:35 AM',
      fare: '₹25',
    },
    //Aasangav - Satara
    {
      id: 263,
      name: 'Aasangav - Satara',
      source: 'Aasangav',
      destination: ' Satara',
      time: '10:25 AM',
      fare: '₹25',
    },
    //Satara - Aasangav
    {
      id: 264,
      name: 'Satara - Aasangav',
      source: 'Satara',
      destination: ' Aasangav',
      time: '11:30 AM',
      fare: '₹25',
    },
    //Aasangav - Satara
    {
      id: 265,
      name: 'Aasangav - Satara',
      source: 'Aasangav',
      destination: ' Satara',
      time: '10:20 PM',
      fare: '₹25',
    },

    // shreya
    {
      id: 1,
      name: 'Alawadi - Satara',
      source: 'Alawadi',
      destination: 'Satara',
      time: '06:30 AM',
      fare: '₹45',
    },
    {
      id: 2,
      name: 'Satara - Shenwadi',
      source: 'Satara',
      destination: 'Shenwadi',
      time: '08:15 AM',
      fare: '₹105',
    },
    {
      id: 3,
      name: 'Shenwadi - Satara',
      source: 'Shenwadi',
      destination: 'Satara',
      time: '10:35 AM',
      fare: '₹105',
    },
    {
      id: 4,
      name: 'Satara - Yeliv',
      source: 'Satara',
      destination: 'Yeliv',
      time: '01:00 PM',
      fare: '₹80',
    },

    {
      id: 5,
      name: 'Yeliv - Satara',
      source: 'Yeliv',
      destination: 'Satara',
      time: '02:40 PM',
      fare: '₹80',
    },

    {
      id: 6,
      name: 'Satara - Nimsod',
      source: 'Satara',
      destination: 'Nimsod',
      time: '05:30 PM',
      fare: '₹105',
    },

    {
      id: 7,
      name: 'Nimsod - Satara',
      source: 'Nimsod',
      destination: 'Satara',
      time: '06:45 AM',
      fare: '₹105',
    },

    {
      id: 8,
      name: 'Satara - Solashi',
      source: 'Satara',
      destination: 'Solashi',
      time: '09:15 AM',
      fare: '₹60',
    },

    {
      id: 9,
      name: 'Satara - Alawadi',
      source: 'Satara',
      destination: 'Alawadi',
      time: '12:30 PM',
      fare: '₹45',
    },

    {
      id: 10,
      name: 'Alawadi - satara',
      source: 'Alawadi',
      destination: 'satara',
      time: '02:10 PM',
      fare: '₹45',
    },

    {
      id: 11,
      name: 'Satara - Kinhai',
      source: 'Satara',
      destination: 'Kinhai',
      time: '04:30 PM',
      fare: '₹40',
    },

    {
      id: 12,
      name: 'Kinhai - satara',
      source: 'Kinhai',
      destination: 'satara',
      time: '05:30 PM',
      fare: '₹40',
    },

    {
      id: 13,
      name: 'Satara - Alawadi',
      source: 'Satara',
      destination: 'Alawadi',
      time: '07:30 PM',
      fare: '₹45',
    },

    {
      id: 14,
      name: 'Kaundani - Satara',
      source: 'Kaundani',
      destination: 'satara',
      time: '06:15 AM',
      fare: '₹45',
    },

    {
      id: 15,
      name: 'Satara - Kaundani',
      source: 'Satara',
      destination: 'Kaundani',
      time: '07:35 AM',
      fare: '₹45',
    },

    {
      id: 16,
      name: 'Satara - Kaundani',
      source: 'Satara',
      destination: 'Kaundani',
      time: '08:35 AM',
      fare: '₹45',
    },

    {
      id: 17,
      name: 'Satara - Asangaon',
      source: 'Satara',
      destination: 'Asangaon',
      time: '09:35 AM',
      fare: '₹25',
    },

    {
      id: 18,
      name: 'Asangaon - satara',
      source: 'Asangaon',
      destination: 'satara',
      time: '10:25 AM',
      fare: '₹25',
    },

    {
      id: 19,
      name: 'Satara - Asangaon',
      source: 'Satara',
      destination: 'Asangaon',
      time: '11:30 AM',
      fare: '₹25',
    },

    {
      id: 20,
      name: 'Asangaon - Satara',
      source: 'Asangaon',
      destination: 'Satara',
      time: '12:20 PM',
      fare: '₹25',
    },

    {
      id: 21,
      name: 'Satara - Malgaon',
      source: 'Satara',
      destination: 'Malgaon',
      time: '01:30 PM',
      fare: '₹25',
    },

    {
      id: 22,
      name: 'Malgaon - Satara',
      source: 'Malgaon',
      destination: 'Satara',
      time: '02:20 PM',
      fare: '₹25',
    },
    {
      id: 23,
      name: 'Satara - Kaundani',
      source: 'Satara',
      destination: 'Kaundani',
      time: '03:15 PM',
      fare: '₹45',
    },

    {
      id: 24,
      name: 'Kaundani - Satara',
      source: 'Kaundani',
      destination: 'Satara',
      time: '04:15 PM',
      fare: '₹45',
    },

    {
      id: 25,
      name: 'Satara - khadgaon',
      source: 'Satara',
      destination: 'Khadgaon',
      time: '06:05 PM',
      fare: '₹30',
    },

    {
      id: 26,
      name: 'Khadgaon - Satara',
      source: 'Khadgaon',
      destination: 'Satara',
      time: '06:55 PM',
      fare: '₹30',
    },

    {
      id: 27,
      name: 'Satara - Kaundani',
      source: 'Satara',
      destination: 'Kaundani',
      time: '08:00 PM',
      fare: '₹45',
    },

    {
      id: 28,
      name: 'Ghatewadi - Satara',
      source: 'Ghatewadi',
      destination: 'Satara',
      time: '06:00 AM',
      fare: '₹45',
    },

    {
      id: 29,
      name: 'Satara - Vanjoli',
      source: 'Satara',
      destination: 'Vanjoli',
      time: '07:45 AM',
      fare: '₹95',
    },

    {
      id: 30,
      name: ' Vanjoli - Satara',
      source: 'Vanjoli',
      destination: 'Satara',
      time: '10:10 AM',
      fare: '₹95',
    },

    {
      id: 31,
      name: ' Satara - Gogave',
      source: 'Satara',
      destination: 'Gogave',
      time: '02:00 PM',
      fare: '₹95',
    },

    {
      id: 32,
      name: ' Gogave - Satara',
      source: 'Gogave',
      destination: 'Satara',
      time: '04:15 PM',
      fare: '₹95',
    },

    {
      id: 33,
      name: ' Satara - Ghatewadi',
      source: 'Satara',
      destination: 'Ghatewadi',
      time: '06:50 PM',
      fare: '₹45',
    },

    {
      id: 34,
      name: ' Tondoshi-Bambavade - Satara',
      source: 'Tondoshi-Bambavade',
      destination: 'Satara',
      time: '05:50 AM',
      fare: '₹60',
    },

    {
      id: 35,
      name: ' Satara - Murud',
      source: 'Satara',
      destination: 'Murud',
      time: '07:30 AM',
      fare: '₹60',
    },

    {
      id: 36,
      name: ' Murud - Satara',
      source: 'Murud',
      destination: 'Satara',
      time: '09:20 PM',
      fare: '₹60',
    },

    {
      id: 37,
      name: ' Satara - Pawarwadi',
      source: 'Satara',
      destination: 'Pawarwadi',
      time: '11:10 AM',
      fare: '₹30',
    },

    {
      id: 38,
      name: ' Pawarwadi - Satara',
      source: 'Pawarwadi',
      destination: 'Satara',
      time: '12:00 PM',
      fare: '₹30',
    },

    {
      id: 39,
      name: ' Satara - Murud',
      source: 'Satara',
      destination: 'Murud',
      time: '01:30 PM',
      fare: '₹60',
    },

    {
      id: 40,
      name: ' Murud - Nagthane',
      source: 'Murud',
      destination: 'Nagthane',
      time: '03:20 PM',
      fare: '₹30',
    },

    {
      id: 41,
      name: ' Nagthane - Tukaiwadi',
      source: 'Nagthane',
      destination: 'Tukaiwadi',
      time: '04:15 PM',
      fare: '₹25',
    },

    {
      id: 42,
      name: ' Tukaiwadi - Satara',
      source: 'Tukaiwadi',
      destination: 'Satara',
      time: '04:55 PM',
      fare: '₹45',
    },

    {
      id: 43,
      name: ' Satara - Bambavade',
      source: 'Satara',
      destination: 'Bambavade',
      time: '06:30 PM',
      fare: '₹60',
    },

    {
      id: 44,
      name: ' Durgalwadi - Satara',
      source: 'Durgalwadi',
      destination: 'Satara',
      time: '06:20 AM',
      fare: '₹55',
    },
    {
      id: 45,
      name: ' Satara - Vangal',
      source: 'Satara',
      destination: 'Vangal',
      time: '08:00 PM',
      fare: '₹25',
    },

    {
      id: 47,
      name: ' Vangal - Satara',
      source: 'Vangal',
      destination: 'Satara',
      time: '08:45 AM',
      fare: '₹25',
    },

    {
      id: 48,
      name: ' Satara - Marloshi',
      source: 'Satara',
      destination: 'Marloshi',
      time: '09:30 AM',
      fare: '₹60',
    },

    {
      id: 49,
      name: ' Marloshi - Satara',
      source: 'Marloshi',
      destination: 'Satara',
      time: '11:00 AM',
      fare: '₹60',
    },

    {
      id: 50,
      name: ' Satara - Raighar',
      source: 'Satara',
      destination: 'Raighar',
      time: '01:30 PM',
      fare: '₹25',
    },

    {
      id: 51,
      name: ' Raighar - Satara',
      source: 'Raighar',
      destination: 'Satara',
      time: '02:20 PM',
      fare: '₹25',
    },

    {
      id: 52,
      name: ' Satara - Dhanawadewadi',
      source: 'Satara',
      destination: 'Dhanawadewadi',
      time: '03:10 PM',
      fare: '₹30',
    },

    {
      id: 53,
      name: ' Dhanawadewadi - Satara',
      source: 'Dhanawadewadi',
      destination: 'Satara',
      time: '04:05 PM',
      fare: '₹30',
    },

    {
      id: 54,
      name: ' Satara - Dolegaon',
      source: 'Satara',
      destination: 'Dolegaon',
      time: '05:15 PM',
      fare: '₹25',
    },

    {
      id: 55,
      name: ' Dolegaon - Satara',
      source: 'Dolegaon',
      destination: 'Satara',
      time: '05:55 PM',
      fare: '₹25',
    },

    {
      id: 56,
      name: ' Satara - Durgalwadi',
      source: 'Satara',
      destination: 'Durgalwadi',
      time: '07:50 PM',
      fare: '₹55',
    },

    {
      id: 57,
      name: ' Kelewadi - Satara',
      source: 'Kelewadi',
      destination: 'Satara',
      time: '06:40 AM',
      fare: '₹45',
    },

    {
      id: 58,
      name: ' Satara - Kiroli',
      source: 'Satara',
      destination: 'Kiroli',
      time: '08:05 AM',
      fare: '₹45',
    },

    {
      id: 59,
      name: ' Kiroli - Satara',
      source: 'Kiroli',
      destination: 'Satara',
      time: '09:15 AM',
      fare: '₹45',
    },

    {
      id: 60,
      name: ' Satara - Khadgaon',
      source: 'Satara',
      destination: 'Khadgaon',
      time: '11:25 AM',
      fare: '₹30',
    },

    {
      id: 61,
      name: ' Khadgaon - Satara',
      source: 'Khadgaon',
      destination: 'Satara',
      time: '12:15 PM',
      fare: '₹30',
    },

    {
      id: 62,
      name: ' Satara - Kameri',
      source: 'Satara',
      destination: 'Kameri',
      time: '02:00 PM',
      fare: '₹45',
    },

    {
      id: 63,
      name: ' Kameri - Satara',
      source: 'Kameri',
      destination: 'Satara',
      time: '03:00 PM',
      fare: '₹45',
    },

    {
      id: 64,
      name: ' Satara - Durgalwadi',
      source: 'Satara',
      destination: 'Durgalwadi',
      time: '05:00 PM',
      fare: '₹55',
    },

    {
      id: 65,
      name: ' Durgalwadi - Satara',
      source: 'Durgalwadi',
      destination: 'Satara',
      time: '06:20 PM',
      fare: '₹55',
    },

    {
      id: 66,
      name: ' Satara - Kelewadi',
      source: 'Satara',
      destination: 'Kelewadi',
      time: '08:00 PM',
      fare: '₹45',
    },

    {
      id: 67,
      name: ' Tukaiwadi - Satara',
      source: 'Tukaiwadi',
      destination: 'Satara',
      time: '06:10 AM',
      fare: '₹45',
    },
    {
      id: 68,
      name: ' Satara - Tukaiwadi',
      source: 'Satara',
      destination: 'Tukaiwadi',
      time: '07:25 AM',
      fare: '₹45',
    },

    {
      id: 69,
      name: ' Tukaiwadi - Satara',
      source: 'Tukaiwadi',
      destination: 'Satara',
      time: '08:40 AM',
      fare: '₹45',
    },

    {
      id: 70,
      name: ' Satara - Mandave',
      source: 'Satara',
      destination: 'Mandave',
      time: '10:15 AM',
      fare: '₹40',
    },

    {
      id: 71,
      name: ' Mandave - Satara',
      source: 'Mandave',
      destination: 'Satara',
      time: '11:35 AM',
      fare: '₹40',
    },

    {
      id: 72,
      name: ' Satara - Tukaiwadi',
      source: 'Satara',
      destination: 'Tukaiwadi',
      time: '01:15 PM',
      fare: '₹45',
    },

    {
      id: 73,
      name: ' Tukaiwadi - Satara',
      source: 'Tukaiwadi',
      destination: 'Satara',
      time: '02:30 PM',
      fare: '₹45',
    },

    {
      id: 74,
      name: ' Satara - Tukaiwadi',
      source: 'Satara',
      destination: 'Tukaiwadi',
      time: '04:35 PM',
      fare: '₹45',
    },

    {
      id: 75,
      name: ' Tukaiwadi - Satara',
      source: 'Tukaiwadi',
      destination: 'Satara',
      time: '05:50 PM',
      fare: '₹45',
    },

    {
      id: 76,
      name: ' Satara - Tukaiwadi',
      source: 'Satara',
      destination: 'Tukaiwadi',
      time: '07:15 PM',
      fare: '₹45',
    },

    {
      id: 77,
      name: ' Jambhe - Satara',
      source: 'Jambhe',
      destination: 'Satara',
      time: '06:00 AM',
      fare: '₹55',
    },

    {
      id: 78,
      name: ' Satara - Raighar',
      source: 'Satara',
      destination: 'Raighar',
      time: '07:40 AM',
      fare: '₹25',
    },

    {
      id: 79,
      name: ' Raighar - Satara',
      source: 'Raighar',
      destination: 'Satara',
      time: '08:30 AM',
      fare: '₹25',
    },

    {
      id: 80,
      name: ' Satara - Jambhe',
      source: 'Satara',
      destination: 'Jambhe',
      time: '09:20 AM',
      fare: '₹55',
    },

    {
      id: 81,
      name: ' Jambhe - Satara',
      source: 'Jambhe',
      destination: 'Satara',
      time: '11:00 AM',
      fare: '₹55',
    },

    {
      id: 82,
      name: ' Satara - Kaundani',
      source: 'Satara',
      destination: 'Kaundani',
      time: '01:00 PM',
      fare: '₹45',
    },

    {
      id: 83,
      name: ' Kaundani - Satara',
      source: 'Kaundani',
      destination: 'Satara',
      time: '02:00 PM',
      fare: '₹45',
    },

    {
      id: 84,
      name: ' Satara - Wavadare-Revande',
      source: 'Satara',
      destination: ' Wavadare-Revande',
      time: '03:30 PM',
      fare: '₹45',
    },

    {
      id: 85,
      name: ' Wavadare-Revande - Satara',
      source: 'Wavadare-Revande',
      destination: 'Satara',
      time: '04:40 PM',
      fare: '₹45',
    },

    {
      id: 86,
      name: ' Satara - Jambhe',
      source: 'Satara',
      destination: 'Jambhe',
      time: '06:40 PM',
      fare: '₹55',
    },

    {
      id: 87,
      name: ' Nagzari - Satara',
      source: 'Nagzari',
      destination: 'Satara',
      time: '06:30 AM',
      fare: '₹60',
    },

    {
      id: 88,
      name: ' Satara - Pusesavali',
      source: 'Satara',
      destination: 'Pusesavali',
      time: '08:35 AM',
      fare: '₹80',
    },

    {
      id: 89,
      name: ' Pusesavali - Satara',
      source: 'Pusesavali',
      destination: 'Satara',
      time: '10:30 AM',
      fare: '₹80',
    },
    {
      id: 90,
      name: ' Satara - Pusesavali',
      source: 'Satara',
      destination: 'Pusesavali',
      time: '12:30 PM',
      fare: '₹80',
    },

    {
      id: 91,
      name: ' Pusesavali - Satara',
      source: 'Pusesavali',
      destination: 'Satara',
      time: '02:25 PM',
      fare: '₹80',
    },

    {
      id: 90,
      name: ' Satara - Chinchner-Nimb',
      source: 'Satara',
      destination: 'Chinchner-Nimb',
      time: '05:15 PM',
      fare: '₹20',
    },

    {
      id: 91,
      name: ' Chinchner-Nimb - Satara',
      source: 'Chinchner-Nimb',
      destination: 'Satara',
      time: '05:50 PM',
      fare: '₹20',
    },

    {
      id: 92,
      name: ' Satara - Nagzari',
      source: 'Satara',
      destination: 'Nagzari',
      time: '06:45 PM',
      fare: '₹60',
    },

    {
      id: 93,
      name: ' Satara - Degaon',
      source: 'Satara',
      destination: 'Degaon',
      time: '06:00 AM',
      fare: '₹15',
    },

    {
      id: 94,
      name: ' Degaon - Rajawada',
      source: 'Degaon',
      destination: 'Rajwada',
      time: '06:25 AM',
      fare: '₹20',
    },

    {
      id: 95,
      name: ' Rajwada - Degaon',
      source: 'Rajwada',
      destination: 'Degaon',
      time: '07:30 AM',
      fare: '₹20',
    },

    {
      id: 96,
      name: ' Degaon - Rajawada',
      source: 'Degaon',
      destination: 'Rajwada',
      time: '08:05 AM',
      fare: '₹20',
    },

    {
      id: 97,
      name: ' Rajwada - Dhawadshi',
      source: 'Rajwada',
      destination: 'Dhawadshi',
      time: '08:50 AM',
      fare: '₹25',
    },

    {
      id: 98,
      name: ' Dhawadshi - Rajawada',
      source: 'Dhawadshi',
      destination: 'Rajwada',
      time: '09:35 AM',
      fare: '₹25',
    },

    {
      id: 99,
      name: ' Rajwada - Dhawadshi',
      source: 'Rajwada',
      destination: 'Dhawadshi',
      time: '10:20 AM',
      fare: '₹25',
    },

    {
      id: 100,
      name: ' Dhawadshi - Rajawada',
      source: 'Dhawadshi',
      destination: 'Rajwada',
      time: '11:05 AM',
      fare: '₹25',
    },

    {
      id: 101,
      name: ' Rajwada - Mahagaon',
      source: 'Rajwada',
      destination: 'Mahagaon',
      time: '10:20 AM',
      fare: '₹20',
    },

    {
      id: 102,
      name: ' Mahagaon - Satara',
      source: 'Mahagaon',
      destination: 'Satara',
      time: '12:20 PM',
      fare: '₹15',
    },

    {
      id: 103,
      name: ' Satara - Bhadale',
      source: 'Satara',
      destination: 'Bhadale',
      time: '01:00 PM',
      fare: '₹55',
    },

    {
      id: 104,
      name: ' Bhadale - Satara',
      source: 'Bhadale',
      destination: 'Satara',
      time: '02:15 PM',
      fare: '₹55',
    },

    {
      id: 105,
      name: ' Satara - Bhadale',
      source: 'Satara',
      destination: 'Bhadale',
      time: '04:00 PM',
      fare: '₹55',
    },

    {
      id: 106,
      name: ' Bhadale - Satara',
      source: 'Bhadale',
      destination: 'Satara',
      time: '05:15 PM',
      fare: '₹55',
    },

    {
      id: 107,
      name: ' Satara - Bhadale',
      source: 'Satara',
      destination: 'Bhadale',
      time: '07:30 PM',
      fare: '₹55',
    },

    {
      id: 108,
      name: ' Bhadale - Satara',
      source: 'Bhadale',
      destination: 'Satara',
      time: '06:45 AM',
      fare: '₹55',
    },

    {
      id: 109,
      name: ' Satara - Bhadale',
      source: 'Satara',
      destination: 'Bhadale',
      time: '08:00 AM',
      fare: '₹55',
    },
    {
      id: 110,
      name: ' Bhadale - Satara',
      source: 'Bhadale',
      destination: 'Satara',
      time: '09:15 AM',
      fare: '₹55',
    },

    {
      id: 111,
      name: ' Satara - Kinhai',
      source: 'Satara',
      destination: 'Kinhai',
      time: '10:50 AM',
      fare: '₹40',
    },

    {
      id: 112,
      name: ' Kinhai - Satara',
      source: 'Kinhai',
      destination: 'Satara',
      time: '11:50 AM',
      fare: '₹40',
    },

    {
      id: 113,
      name: ' Satara - Limb',
      source: 'Satara',
      destination: 'Limb',
      time: '01:45 PM',
      fare: '₹25',
    },

    {
      id: 114,
      name: ' Limb - Satara',
      source: 'Limb',
      destination: 'Satara',
      time: '02:25 PM',
      fare: '₹25',
    },

    {
      id: 115,
      name: ' Satara - Vanmal',
      source: 'Satara',
      destination: 'Vanmal',
      time: '03:05 PM',
      fare: '₹25',
    },

    {
      id: 116,
      name: ' Vanmal - Satara',
      source: 'Vanmal',
      destination: 'Satara',
      time: '03:50 PM',
      fare: '₹25',
    },

    {
      id: 117,
      name: ' Satara - Limb',
      source: 'Vanmal',
      destination: 'Satara',
      time: '05:00 PM',
      fare: '₹25',
    },

    {
      id: 118,
      name: ' Limb - Satara',
      source: 'Limb',
      destination: 'Satara',
      time: '05:40 PM',
      fare: '₹25',
    },

    {
      id: 119,
      name: ' Satara - Vangal',
      source: 'Satara',
      destination: 'Vangal',
      time: '06:40 PM',
      fare: '₹25',
    },

    {
      id: 120,
      name: ' Vangal - Satara',
      source: 'Vangal',
      destination: 'Satara',
      time: '07:25 PM',
      fare: '₹25',
    },

    {
      id: 121,
      name: ' Satara - Vangal',
      source: 'Satara',
      destination: 'Vangal',
      time: '08:10 PM',
      fare: '₹25',
    },

    {
      id: 122,
      name: ' Vangal - Satara',
      source: 'Vangal',
      destination: 'Satara',
      time: '08:55 PM',
      fare: '₹25',
    },

    {
      id: 123,
      name: ' Gogave - Satara',
      source: 'Gogave',
      destination: 'Satara',
      time: '06:00 AM',
      fare: '₹95',
    },

    {
      id: 124,
      name: ' Satara - Tetli',
      source: 'Satara',
      destination: 'Tetli',
      time: '09:00 AM',
      fare: '₹80',
    },

    {
      id: 125,
      name: ' Tetli - Satara',
      source: 'Tetli',
      destination: 'Satara',
      time: '10:30 AM',
      fare: '₹80',
    },

    {
      id: 126,
      name: ' Satara - Tetli',
      source: 'Satara',
      destination: 'Tetli',
      time: '12:30 PM',
      fare: '₹80',
    },

    {
      id: 127,
      name: ' Tetli - Satara',
      source: 'Tetli',
      destination: 'Satara',
      time: '02:00 AM',
      fare: '₹80',
    },

    {
      id: 128,
      name: ' Satara - Gogave',
      source: 'Satara',
      destination: 'Gogave',
      time: '12:30 PM',
      fare: '₹95',
    },

    {
      id: 129,
      name: ' Satara - Tukaiwadi',
      source: 'Satara',
      destination: 'Tukaiwadi',
      time: '05:20 AM',
      fare: '₹45',
    },

    {
      id: 130,
      name: ' Tukaiwadi - Satara',
      source: 'Tukaiwadi',
      destination: 'Satara',
      time: '06:35 AM',
      fare: '₹45',
    },

    {
      id: 131,
      name: ' Satara - Alwadi',
      source: 'Satara',
      destination: 'Alwadi',
      time: '07:50 AM',
      fare: '₹55',
    },

    {
      id: 132,
      name: ' Vangal - Satara',
      source: 'Vangal',
      destination: 'Satara',
      time: '12:25 PM',
      fare: '₹25',
    },

    {
      id: 133,
      name: ' Satara - Kiroli',
      source: 'Satara',
      destination: 'Kiroli',
      time: '01:25 PM',
      fare: '₹45',
    },

    {
      id: 134,
      name: ' Kiroli - Satara',
      source: 'Kiroli',
      destination: 'Satara',
      time: '02:35 PM',
      fare: '₹45',
    },

    {
      id: 135,
      name: ' Satara - Yeliv',
      source: 'Satara',
      destination: 'Yeliv',
      time: '03:45 PM',
      fare: '₹80',
    },

    {
      id: 136,
      name: ' Yeliv - Satara',
      source: 'Yeliv',
      destination: 'Satara',
      time: '05:25 PM',
      fare: '₹80',
    },

    {
      id: 137,
      name: ' Satara - Lavghar',
      source: 'Satara',
      destination: 'Lavghar',
      time: '07:55 PM',
      fare: '₹25',
    },

    {
      id: 138,
      name: ' Lavghar - Satara',
      source: 'Lavghar',
      destination: 'Satara',
      time: '06:05 AM',
      fare: '₹25',
    },

    {
      id: 139,
      name: ' Satara - Durgalwadi',
      source: 'Satara',
      destination: 'Durgalwadi',
      time: '07:05 AM',
      fare: '₹55',
    },

    {
      id: 140,
      name: ' Durgalwadi - Satara',
      source: 'Durgalwadi',
      destination: 'Satara',
      time: '08:25 AM',
      fare: '₹55',
    },

    {
      id: 141,
      name: ' Satara - Pateghar',
      source: 'Satara',
      destination: 'Pateghar',
      time: '09:45 AM',
      fare: '₹45',
    },

    {
      id: 142,
      name: ' Pateghar - Satara',
      source: 'Pateghar',
      destination: 'Satara',
      time: '11:40 AM',
      fare: '₹45',
    },

    {
      id: 143,
      name: ' Satara - Venekhol',
      source: 'Satara',
      destination: 'Venekhol',
      time: '01:45 PM',
      fare: '₹55',
    },

    {
      id: 144,
      name: ' Venekhol - Satara',
      source: 'Venekhol',
      destination: 'Satara',
      time: '03:20 PM',
      fare: '₹55',
    },

    {
      id: 145,
      name: ' Satara - Lavghar',
      source: 'Satara',
      destination: 'Lavghar',
      time: '05:15 PM',
      fare: '₹25',
    },

    {
      id: 146,
      name: ' Lavghar - Satara',
      source: 'Lavghar',
      destination: 'Satara',
      time: '06:15 PM',
      fare: '₹25',
    },

    {
      id: 147,
      name: ' Satara - Kuswade',
      source: 'Satara',
      destination: 'Kuswade',
      time: '07:15 PM',
      fare: '₹25',
    },

    {
      id: 148,
      name: ' Kuswade - Satara',
      source: 'Kuswade',
      destination: 'Satara',
      time: '07:55 PM',
      fare: '₹25',
    },

    {
      id: 149,
      name: ' Satara - Aredare',
      source: 'Satara',
      destination: 'Aredare',
      time: '06:00 AM',
      fare: '₹20',
    },

    {
      id: 150,
      name: ' Aredare - Satara',
      source: 'Aredare',
      destination: 'Satara',
      time: '06:40 AM',
      fare: '₹20',
    },

    {
      id: 151,
      name: ' Satara -Dhavdashi',
      source: 'Satara',
      destination: 'Dhavdashi',
      time: '07:20 AM',
      fare: '₹20',
    },
    {
      id: 152,
      name: ' Dhavdashi - Rajwada',
      source: 'Dhavdashi',
      destination: 'Rajwada',
      time: '07:55 AM',
      fare: '₹25',
    },

    {
      id: 153,
      name: ' Rajwada - Nigadi',
      source: 'Rajwada',
      destination: 'Nigadi',
      time: '08:40 AM',
      fare: '₹25',
    },

    {
      id: 154,
      name: ' Nigadi - Satara',
      source: 'Nigadi',
      destination: 'Satara',
      time: '09:30 AM',
      fare: '₹20',
    },

    {
      id: 155,
      name: ' Satara -Aredare',
      source: 'Satara',
      destination: 'Aredare',
      time: '10:40 AM',
      fare: '₹20',
    },

    {
      id: 156,
      name: ' Aredare - Satara',
      source: 'Aredare',
      destination: 'Satara',
      time: '11:20 AM',
      fare: '₹20',
    },

    {
      id: 157,
      name: ' Satara -Dhavdashi',
      source: 'Satara',
      destination: 'Dhavdashi',
      time: '12:00 PM',
      fare: '₹20',
    },

    {
      id: 158,
      name: ' Dhavdashi - Satara',
      source: 'Dhavdashi',
      destination: 'Satara',
      time: '12:30 PM',
      fare: '₹20',
    },

    {
      id: 159,
      name: ' Satara -Angapur',
      source: 'Satara',
      destination: 'Angapur',
      time: '01:30 PM',
      fare: '₹40',
    },

    {
      id: 160,
      name: ' Angapur - Satara',
      source: 'Angapur',
      destination: 'Satara',
      time: '02:30 PM',
      fare: '₹40',
    },

    {
      id: 161,
      name: ' Satara -Angapur',
      source: 'Satara',
      destination: 'Angapur',
      time: '03:30 PM',
      fare: '₹40',
    },

    {
      id: 162,
      name: ' Angapur - Satara',
      source: 'Angapur',
      destination: 'Satara',
      time: '04:30 PM',
      fare: '₹40',
    },

    {
      id: 163,
      name: ' Satara -Angapur',
      source: 'Satara',
      destination: 'Angapur',
      time: '05:30 PM',
      fare: '₹40',
    },

    {
      id: 164,
      name: ' Angapur - Satara',
      source: 'Angapur',
      destination: 'Satara',
      time: '06:30 PM',
      fare: '₹40',
    },

    {
      id: 165,
      name: ' Satara - Varne-Abapuri',
      source: 'Satara',
      destination: 'Varne-Abapuri',
      time: '07:30 PM',
      fare: '₹35',
    },

    {
      id: 166,
      name: ' Varne-Abapuri - Satara',
      source: 'Varne-Abapuri',
      destination: 'Satara',
      time: '06:15 AM',
      fare: '₹35',
    },

    {
      id: 167,
      name: ' Satara -Angapur',
      source: 'Satara',
      destination: 'Angapur',
      time: '07:10 AM',
      fare: '₹40',
    },

    {
      id: 168,
      name: ' Angapur - Satara',
      source: 'Angapur',
      destination: 'Satara',
      time: '08:10 AM',
      fare: '₹40',
    },

    {
      id: 169,
      name: ' Satara -Malgaon',
      source: 'Satara',
      destination: 'Malgaon',
      time: '09:10 AM',
      fare: '₹25',
    },

    {
      id: 170,
      name: ' Malgaon - Satara',
      source: 'Malgaon',
      destination: 'Satara',
      time: '10:00 AM',
      fare: '₹25',
    },

    {
      id: 171,
      name: ' Satara -Angapur',
      source: 'Satara',
      destination: 'Angapur',
      time: '11:10 AM',
      fare: '₹40',
    },

    {
      id: 172,
      name: ' Angapur - Satara',
      source: 'Angapur',
      destination: 'Satara',
      time: '12:10 PM',
      fare: '₹40',
    },

    {
      id: 173,
      name: ' Satara -Aredare',
      source: 'Satara',
      destination: 'Aredare',
      time: '01:15 PM',
      fare: '₹20',
    },
    {
      id: 174,
      name: ' Aredare - Satara',
      source: 'Aredare',
      destination: 'Satara',
      time: '01:55 PM',
      fare: '₹20',
    },
  ];

  const handleSearch = () => {
    setLoading(true);

    const filteredData = data.filter(
      (item) =>
        item.source.toLowerCase() === source.toLowerCase() &&
        item.destination.toLowerCase() === destination.toLowerCase()
    );

    const uniqueRoutes = Array.from(
      new Set(filteredData.map((item) => item.name))
    );

    setSelectedRoute(null);
    setBuses([]);
    setShowRoutes(true);
    setRoutes(uniqueRoutes);
    setNoBusesFound(false);
    setCurrentIndex(0);
    setLoading(false);
  };

  const handleRouteSelect = (route) => {
    const filteredData = data.filter((item) => item.name === route);
    if (filteredData.length === 0) {
      setNoBusesFound(true);
      setBuses([]);
    } else {
      setBuses(filteredData);
      setSelectedRoute(route);
      setShowRoutes(false);
      setNoBusesFound(false);
      setCurrentIndex(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < buses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderBuses = () => {
    if (loading) {
      return <Text>Loading...</Text>;
    }

    if (noBusesFound) {
      return <Text>No buses available.</Text>;
    }
    if (buses.length > 0) {
      return (
        <View style={styles.busContainer}>
          <Card containerStyle={styles.cardContainer}>
            <Card.Title style={styles.cardTitle}>{selectedRoute}</Card.Title>
            <Card.Divider />
            <View style={styles.busDetailsContainer}>
              <View style={styles.busDetails}>
                <Text style={styles.busValue}>Source:</Text>
                <Text style={styles.busValue}>
                  {buses[currentIndex].source}
                </Text>
              </View>
              <View style={styles.busDetails}>
                <Text style={styles.busValue}>Destination:</Text>
                <Text style={styles.busValue}>
                  {buses[currentIndex].destination}
                </Text>
              </View>
              <View style={styles.busDetails}>
                <Text style={styles.busValue}>Time:</Text>
                <Text style={styles.busValue}>{buses[currentIndex].time}</Text>
              </View>
              <View style={styles.busDetails}>
                <Text style={styles.busValue}>Fare:</Text>
                <Text style={styles.busValue}>{buses[currentIndex].fare}</Text>
              </View>
            </View>
            <View style={styles.busNavigationContainer}>
              <TouchableOpacity
                style={styles.busNavigationButton}
                onPress={handlePrevious}
                disabled={currentIndex <= 0}>
                <Icon
                  name="chevron-left"
                  type="font-awesome"
                  color="#ffffff"
                  size={20}
                />
              </TouchableOpacity>
              <Text style={styles.busNavigationText}>
                {`${currentIndex + 1}/${buses.length}`}
              </Text>
              <TouchableOpacity
                style={styles.busNavigationButton}
                onPress={handleNext}
                disabled={currentIndex >= buses.length - 1}>
                <Icon
                  name="chevron-right"
                  type="font-awesome"
                  color="#ffffff"
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            style={{ flex: 1 }}
            selectedValue={source}
            onValueChange={setSource}>
            <Picker.Item label="Source" value="" />
            <Picker.Item label="Aredare" value="Aredare" />
            <Picker.Item label="Angapur" value="Angapur" />
            <Picker.Item label="Aundh" value="Aundh" />
            <Picker.Item label="Assangav" value="Assangav" />
            <Picker.Item label="Alavdi" value="Alavdi" />
            <Picker.Item label="Alawadi" value="Alawadi" />
            <Picker.Item label="Asangaon" value="Asangaon" />
            <Picker.Item label="BusStation" value="BusStation" />
            <Picker.Item label="Bhaktavadi" value="Bhaktavadi" />
            <Picker.Item label="Bo Krandi" value="Bo Krandi" />
            <Picker.Item label="Bhadale" value="Bhadale" />
            <Picker.Item label="Borkhal" value="Borkhal" />
            <Picker.Item label="Bambavade" value="Bambavade" />
            <Picker.Item label="Chinchani" value="Chinchani" />
            <Picker.Item label="Chinchner-Nimb" value="Chinchner-Nimb" />
            <Picker.Item label="Dahigaon" value="Dahigaon" />
            <Picker.Item label="Degaon" value="Degaon" />
            <Picker.Item label="Durgalwadi" value="Durgalwadi" />
            <Picker.Item label="Dhavadshi" value="Dhavadshi" />
            <Picker.Item label="Dhawadshi" value="Dhawadshi" />
            <Picker.Item label="Dusaale" value="Dusaale" />
            <Picker.Item label="Dolegaon" value="Dolegaon" />
            <Picker.Item label="Dhanawadewadi" value="Dhanawadewadi" />
            <Picker.Item label="Dmarrt" value="Dmarrt" />
            <Picker.Item label="Dahigaon" value="Dahigaon" />
            <Picker.Item label="DivyaNagar" value="DivyaNagar" />
            <Picker.Item label="Gavadi" value="Gavadi" />
            <Picker.Item label="Gatewadi" value="Gatewadi" />
            <Picker.Item label="Gogave" value="Gogave" />
            <Picker.Item label="Jambhe" value="Jambhe" />
            <Picker.Item label="Kholwadi" value="Kholwadi" />
            <Picker.Item label="Kinhai" value="Kinhai" />
            <Picker.Item label="Kusawade" value="Kusawade" />
            <Picker.Item label="Kelewadi" value="Kelewadi" />
            <Picker.Item label="Kelavli" value="Kelavli" />
            <Picker.Item label="Kadve" value="Kadve" />
            <Picker.Item label="kusvade" value="kusvade" />
            <Picker.Item label="Kaameri" value="Kaameri" />
            <Picker.Item label="Kondani" value="Kondani" />
            <Picker.Item label="Kiroli" value="Kiroli" />
            <Picker.Item label="kuswadi" value="kuswadi" />
            <Picker.Item label="Limb" value="Limb" />
            <Picker.Item label="Laughar" value="Laughar" />
            <Picker.Item label="Lavanghar" value="Lavanghar" />
            <Picker.Item label="Malganv" value="Malganv" />
            <Picker.Item label="Mahagaon" value="Mahagaon" />
            <Picker.Item label="Mandave" value="Mandave" />
            <Picker.Item label="Murud" value="Murud" />
            <Picker.Item label="Marloshi" value="Marloshi" />
            <Picker.Item label="Mahabaleshwar" value="Mahabaleshwar" />
            <Picker.Item label="Nigadi" value="Nigadi" />
            <Picker.Item label="Nagthane" value="Nagthane" />
            <Picker.Item label="Nagzari" value="Nagzari" />
            <Picker.Item label="Nigadi Vandan" value="Nigadi Vandan" />
            <Picker.Item label="Nimsod" value="Nimsod" />
            <Picker.Item label="PMP" value="PMP" />
            <Picker.Item label="Puseavali" value="Puseavali" />
            <Picker.Item label="Pateghar" value="Pateghar" />
            <Picker.Item label="Pawarwadi" value="Pawarwadi" />
            <Picker.Item label="Padali" value="Padali" />
            <Picker.Item label="Pharmacy" value="Pharmacy" />
            <Picker.Item label="Rajwada" value="Rajwada" />
            <Picker.Item label="Rahimatpur" value="Rahimatpur" />
            <Picker.Item label="Raighar" value="Raighar" />
            <Picker.Item label="Rautwadi" value="Rautwadi" />
            <Picker.Item label="RailwayStation" value="RailwayStation" />
            <Picker.Item label="Satara Road" value="Satara Road" />
            <Picker.Item label="Samartha mandir" value="Samartha mandir" />
            <Picker.Item label="Satara" value="Satara" />
            <Picker.Item label="Swargate" value="Swargate" />
            <Picker.Item label="Swaminathnagar" value="Swaminathnagar" />
            <Picker.Item label="Sajjangad" value="Sajjangad" />
            <Picker.Item label="Tarale" value="Tarale" />
            <Picker.Item label="Tetli" value="Tetli" />
            <Picker.Item label="Tondoshi-Bambavade" value="Tondoshi-Bambavade" />
            <Picker.Item label="Tukaiwadi" value="Tukaiwadi" />
            <Picker.Item label="Umbraj" value="Umbraj" />
            <Picker.Item label="Umbraj" value="Umbraj" />
            <Picker.Item label="Vanjoli" value="Vanjoli" />
            <Picker.Item label="Vangal" value="Vangal" />
            <Picker.Item label="Vanmal" value="Vanmal" />
            <Picker.Item label="Venekhol" value="Venekhol" />
            <Picker.Item label="Venekhol" value="Venekhol" />
            <Picker.Item label="Vame-Abapuri" value="Venekhol" />
            <Picker.Item label="Wavadare-Revande" value="Wavadare-Revande" />
            <Picker.Item label="Walekamati" value="Walekamati" />
            <Picker.Item label="Walekamati Mu." value="Walekamati Mu." />
            <Picker.Item label="YerunkarWadi" value="YerunkarWadi" />
            <Picker.Item label="Yeliv" value="Yeliv" />
          </Picker>

          <Picker
            style={{ flex: 1 }}
            selectedValue={destination}
            onValueChange={setDestination}>
            <Picker.Item label="Destination" value="" />
            <Picker.Item label="Aredare" value="Aredare" />
            <Picker.Item label="Angapur" value="Angapur" />
            <Picker.Item label="Aundh" value="Aundh" />
            <Picker.Item label="Assangav" value="Assangav" />
            <Picker.Item label="Alavdi" value="Alavdi" />
            <Picker.Item label="Alawadi" value="Alawadi" />
            <Picker.Item label="Asangaon" value="Asangaon" />
            <Picker.Item label="BusStation" value="BusStation" />
            <Picker.Item label="Bhaktavadi" value="Bhaktavadi" />
            <Picker.Item label="Bo Krandi" value="Bo Krandi" />
            <Picker.Item label="Bhadale" value="Bhadale" />
            <Picker.Item label="Borkhal" value="Borkhal" />
            <Picker.Item label="Bambavade" value="Bambavade" />
            <Picker.Item label="Chinchani" value="Chinchani" />
            <Picker.Item label="Chinchner-Nimb" value="Chinchner-Nimb" />
            <Picker.Item label="Dahigaon" value="Dahigaon" />
            <Picker.Item label="Degaon" value="Degaon" />
            <Picker.Item label="Durgalwadi" value="Durgalwadi" />
            <Picker.Item label="Dhavadshi" value="Dhavadshi" />
            <Picker.Item label="Dhawadshi" value="Dhawadshi" />
            <Picker.Item label="Dusaale" value="Dusaale" />
            <Picker.Item label="Dolegaon" value="Dolegaon" />
            <Picker.Item label="Dhanawadewadi" value="Dhanawadewadi" />
            <Picker.Item label="Dmarrt" value="Dmarrt" />
            <Picker.Item label="Dahigaon" value="Dahigaon" />
            <Picker.Item label="DivyaNagar" value="DivyaNagar" />
            <Picker.Item label="Gavadi" value="Gavadi" />
            <Picker.Item label="Gatewadi" value="Gatewadi" />
            <Picker.Item label="Gogave" value="Gogave" />
            <Picker.Item label="Jambhe" value="Jambhe" />
            <Picker.Item label="Kholwadi" value="Kholwadi" />
            <Picker.Item label="Kinhai" value="Kinhai" />
            <Picker.Item label="Kusawade" value="Kusawade" />
            <Picker.Item label="Kelewadi" value="Kelewadi" />
            <Picker.Item label="Kelavli" value="Kelavli" />
            <Picker.Item label="Kadve" value="Kadve" />
            <Picker.Item label="kusvade" value="kusvade" />
            <Picker.Item label="Kaameri" value="Kaameri" />
            <Picker.Item label="Kondani" value="Kondani" />
            <Picker.Item label="Kiroli" value="Kiroli" />
            <Picker.Item label="kuswadi" value="kuswadi" />
            <Picker.Item label="Limb" value="Limb" />
            <Picker.Item label="Laughar" value="Laughar" />
            <Picker.Item label="Lavanghar" value="Lavanghar" />
            <Picker.Item label="Malganv" value="Malganv" />
            <Picker.Item label="Mahagaon" value="Mahagaon" />
            <Picker.Item label="Mandave" value="Mandave" />
            <Picker.Item label="Murud" value="Murud" />
            <Picker.Item label="Marloshi" value="Marloshi" />
            <Picker.Item label="Mahabaleshwar" value="Mahabaleshwar" />
            <Picker.Item label="Nigadi" value="Nigadi" />
            <Picker.Item label="Nagthane" value="Nagthane" />
            <Picker.Item label="Nagzari" value="Nagzari" />
            <Picker.Item label="Nigadi Vandan" value="Nigadi Vandan" />
            <Picker.Item label="Nimsod" value="Nimsod" />
            <Picker.Item label="PMP" value="PMP" />
            <Picker.Item label="Puseavali" value="Puseavali" />
            <Picker.Item label="Pateghar" value="Pateghar" />
            <Picker.Item label="Pawarwadi" value="Pawarwadi" />
            <Picker.Item label="Padali" value="Padali" />
            <Picker.Item label="Pharmacy" value="Pharmacy" />
            <Picker.Item label="Rajwada" value="Rajwada" />
            <Picker.Item label="Rahimatpur" value="Rahimatpur" />
            <Picker.Item label="Raighar" value="Raighar" />
            <Picker.Item label="Rautwadi" value="Rautwadi" />
            <Picker.Item label="RailwayStation" value="RailwayStation" />
            <Picker.Item label="Satara Road" value="Satara Road" />
            <Picker.Item label="Samartha mandir" value="Samartha mandir" />
            <Picker.Item label="Satara" value="Satara" />
            <Picker.Item label="Swargate" value="Swargate" />
            <Picker.Item label="Swaminathnagar" value="Swaminathnagar" />
            <Picker.Item label="Sajjangad" value="Sajjangad" />
            <Picker.Item label="Tarale" value="Tarale" />
            <Picker.Item label="Tetli" value="Tetli" />
            <Picker.Item label="Tondoshi-Bambavade" value="Tondoshi-Bambavade" />
            <Picker.Item label="Tukaiwadi" value="Tukaiwadi" />
            <Picker.Item label="Umbraj" value="Umbraj" />
            <Picker.Item label="Umbraj" value="Umbraj" />
            <Picker.Item label="Vanjoli" value="Vanjoli" />
            <Picker.Item label="Vangal" value="Vangal" />
            <Picker.Item label="Vanmal" value="Vanmal" />
            <Picker.Item label="Venekhol" value="Venekhol" />
            <Picker.Item label="Venekhol" value="Venekhol" />
            <Picker.Item label="Vame-Abapuri" value="Venekhol" />
            <Picker.Item label="Wavadare-Revande" value="Wavadare-Revande" />
            <Picker.Item label="Walekamati" value="Walekamati" />
            <Picker.Item label="Walekamati Mu." value="Walekamati Mu." />
            <Picker.Item label="YerunkarWadi" value="YerunkarWadi" />
            <Picker.Item label="Yeliv" value="Yeliv" />
          </Picker>
        </View>
        {/* <TextInput
          style={styles.input}
          placeholder="Source"
          value={source}
          onChangeText={setSource}
        />

        <TextInput
          style={styles.input}
          placeholder="Destination"
          value={destination}
          onChangeText={setDestination}
        />*/}
        {/* <Button title="Search" style={styles.searchBtn} onPress={handleSearch} />*/}
      </View>
      <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
      {showRoutes && (
        <ScrollView style={styles.routesContainer}>
          {routes.map((route) => (
            <TouchableOpacity
              key={route}
              style={styles.routeButton}
              onPress={() => handleRouteSelect(route)}>
              <Text style={styles.routeButtonText}>{route}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {renderBuses()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 16,
  },
  searchBtn: {
    width: '50%',
    backgroundColor: '#FF0000',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  searchText: {
    color: 'white',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  routeButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  busContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  cardContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    borderColor: '#ffffff',
    borderWidth: 1,
    padding: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  busDetailsContainer: {
    marginBottom: 10,
  },
  busDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  busValue: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 5,
  },
  busNavigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 10,
  },
  busNavigationButton: {
    backgroundColor: '#FF0000',
    borderRadius: 20,
    padding: 10,
  },
  busNavigationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default SearchBus;
