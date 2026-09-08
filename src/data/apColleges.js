/**
 * Andhra Pradesh Recognized Engineering Colleges Dataset
 * 
 * Official engineering colleges across all districts of Andhra Pradesh
 * with verified institution names, official AP EAPCET / EAMCET counseling codes,
 * and district assignments.
 * 
 * Arranged alphabetically and deduplicated.
 */

export const AP_DISTRICTS = [
  'All Districts',
  'Anakapalli',
  'Ananthapuramu (Anantapur)',
  'Annamayya',
  'Bapatla',
  'Chittoor',
  'Dr. B.R. Ambedkar Konaseema',
  'East Godavari',
  'Eluru',
  'Guntur',
  'Kakinada',
  'Krishna',
  'Kurnool',
  'Nandyal',
  'NTR (Vijayawada)',
  'Palnadu',
  'Prakasam',
  'Sri Potti Sriramulu Nellore',
  'Sri Sathya Sai',
  'Srikakulam',
  'Tirupati',
  'Visakhapatnam',
  'Vizianagaram',
  'West Godavari',
  'YSR Kadapa'
];

export const RAW_AP_ENGINEERING_COLLEGES = [
  // --- VISAKHAPATNAM & ANAKAPALLI ---
  {
    name: 'A.U. College of Engineering (Autonomous), Visakhapatnam',
    code: 'AUCE',
    district: 'Visakhapatnam',
    location: 'Visakhapatnam',
    type: 'State University Campus'
  },
  {
    name: 'A.U. College of Engineering for Women, Visakhapatnam',
    code: 'AUCW',
    district: 'Visakhapatnam',
    location: 'Visakhapatnam',
    type: 'State University Campus'
  },
  {
    name: 'Al-Aman College of Engineering, Anandapuram',
    code: 'ALAM',
    district: 'Visakhapatnam',
    location: 'Anandapuram',
    type: 'Affiliated'
  },
  {
    name: 'Anil Neerukonda Institute of Technology & Sciences (ANITS), Sangivalasa',
    code: 'ANIL',
    district: 'Visakhapatnam',
    location: 'Bheemunipatnam',
    type: 'Autonomous'
  },
  {
    name: 'Avanthi Institute of Engineering & Technology, Cherukupally',
    code: 'AVAN',
    district: 'Visakhapatnam',
    location: 'Bhogapuram',
    type: 'Affiliated'
  },
  {
    name: 'Avanthi Institute of Engineering & Technology, Makavarapalem',
    code: 'AVAM',
    district: 'Anakapalli',
    location: 'Makavarapalem',
    type: 'Affiliated'
  },
  {
    name: 'Baba Institute of Technology & Sciences, Bakkannapalem',
    code: 'BITS',
    district: 'Visakhapatnam',
    location: 'Madhurawada',
    type: 'Affiliated'
  },
  {
    name: 'Chaitanya Engineering College, Kommadi',
    code: 'CHEC',
    district: 'Visakhapatnam',
    location: 'Madhurawada',
    type: 'Affiliated'
  },
  {
    name: 'Dadi Institute of Engineering & Technology (DIET), Anakapalli',
    code: 'DIET',
    district: 'Anakapalli',
    location: 'Anakapalli',
    type: 'Autonomous'
  },
  {
    name: 'Gayatri Vidya Parishad College of Engineering (Autonomous), Madhurawada',
    code: 'GVPE',
    district: 'Visakhapatnam',
    location: 'Madhurawada',
    type: 'Autonomous'
  },
  {
    name: 'Gayatri Vidya Parishad College of Engineering for Women, Madhurawada',
    code: 'GVPW',
    district: 'Visakhapatnam',
    location: 'Madhurawada',
    type: 'Affiliated'
  },
  {
    name: 'Indian Institute of Petroleum and Energy (IIPE), Visakhapatnam',
    code: 'IIPE',
    district: 'Visakhapatnam',
    location: 'Visakhapatnam',
    type: 'Institute of National Importance'
  },
  {
    name: 'Nadimpalli Satyanarayana Raju Institute of Technology (NSRIT), Sontyam',
    code: 'NSRT',
    district: 'Visakhapatnam',
    location: 'Pendurthi',
    type: 'Autonomous'
  },
  {
    name: 'Raghu Engineering College (Autonomous), Dakamarri',
    code: 'RGIT',
    district: 'Visakhapatnam',
    location: 'Bheemunipatnam',
    type: 'Autonomous'
  },
  {
    name: 'Raghu Institute of Technology, Dakamarri',
    code: 'RITV',
    district: 'Visakhapatnam',
    location: 'Bheemunipatnam',
    type: 'Autonomous'
  },
  {
    name: 'Sanketika Vidya Parishad Engineering College, P.M. Palem',
    code: 'SANK',
    district: 'Visakhapatnam',
    location: 'Madhurawada',
    type: 'Affiliated'
  },
  {
    name: 'Vignan\'s Institute of Information Technology (VIIT), Duvvada',
    code: 'VIEW',
    district: 'Visakhapatnam',
    location: 'Gajuwaka',
    type: 'Autonomous'
  },
  {
    name: 'Visakha Institute of Engineering & Technology, Narava',
    code: 'VIET',
    district: 'Visakhapatnam',
    location: 'Gopalapatnam',
    type: 'Affiliated'
  },
  {
    name: 'Wellfare Institute of Science, Technology & Management, Pinagadi',
    code: 'WIST',
    district: 'Visakhapatnam',
    location: 'Pendurthi',
    type: 'Affiliated'
  },

  // --- VIZIANAGARAM & PARVATHIPURAM MANYAM ---
  {
    name: 'Avanthi\'s St. Theressa Institute of Engineering & Technology, Garividi',
    code: 'AVEV',
    district: 'Vizianagaram',
    location: 'Garividi',
    type: 'Affiliated'
  },
  {
    name: 'Gokul Group of Institutions, Bobbili',
    code: 'GOKL',
    district: 'Vizianagaram',
    location: 'Bobbili',
    type: 'Affiliated'
  },
  {
    name: 'JNTU-GV College of Engineering, Vizianagaram',
    code: 'JNTV',
    district: 'Vizianagaram',
    location: 'Vizianagaram',
    type: 'State University Campus'
  },
  {
    name: 'Lendi Institute of Engineering & Technology (Autonomous), Jonnada',
    code: 'LEND',
    district: 'Vizianagaram',
    location: 'Jonnada',
    type: 'Autonomous'
  },
  {
    name: 'Maharaj Vijayaram Gajapathi Raj (MVGR) College of Engineering, Vizianagaram',
    code: 'MVRG',
    district: 'Vizianagaram',
    location: 'Chintalavalasa',
    type: 'Autonomous'
  },
  {
    name: 'Satya Institute of Technology and Management (SITAM), Vizianagaram',
    code: 'SITV',
    district: 'Vizianagaram',
    location: 'Gajularega',
    type: 'Affiliated'
  },
  {
    name: 'Thandra Paparaya Institute of Science & Technology, Bobbili',
    code: 'TPST',
    district: 'Vizianagaram',
    location: 'Bobbili',
    type: 'Affiliated'
  },

  // --- SRIKAKULAM ---
  {
    name: 'Aditya Institute of Technology & Management (AITAM), Tekkali',
    code: 'ADIT',
    district: 'Srikakulam',
    location: 'Tekkali',
    type: 'Autonomous'
  },
  {
    name: 'GMR Institute of Technology (GMRIT), Rajam',
    code: 'GMRI',
    district: 'Srikakulam',
    location: 'Rajam',
    type: 'Autonomous'
  },
  {
    name: 'Praveenya Institute of Marine Engineering & Maritime Studies, Modavalasa',
    code: 'PRVN',
    district: 'Srikakulam',
    location: 'Ranasthalam',
    type: 'Affiliated'
  },
  {
    name: 'Sarada Institute of Science, Technology & Management, Srikakulam',
    code: 'SIST',
    district: 'Srikakulam',
    location: 'Srikakulam',
    type: 'Affiliated'
  },
  {
    name: 'Sri Sivani College of Engineering, Chilakapalem',
    code: 'SSCE',
    district: 'Srikakulam',
    location: 'Etcherla',
    type: 'Affiliated'
  },
  {
    name: 'Sri Vaishnavi College of Engineering, Singupuram',
    code: 'SVES',
    district: 'Srikakulam',
    location: 'Srikakulam',
    type: 'Affiliated'
  },

  // --- EAST GODAVARI, KAKINADA & KONASEEMA ---
  {
    name: 'Aditya College of Engineering & Technology, Surampalem',
    code: 'ACET',
    district: 'Kakinada',
    location: 'Surampalem',
    type: 'Autonomous'
  },
  {
    name: 'Aditya College of Engineering, Surampalem',
    code: 'AECP',
    district: 'Kakinada',
    location: 'Surampalem',
    type: 'Autonomous'
  },
  {
    name: 'Aditya Engineering College (Autonomous), Surampalem',
    code: 'ADTP',
    district: 'Kakinada',
    location: 'Surampalem',
    type: 'Autonomous'
  },
  {
    name: 'B.V.C. College of Engineering, Rajahmundry',
    code: 'BVCR',
    district: 'East Godavari',
    location: 'Rajahmundry',
    type: 'Affiliated'
  },
  {
    name: 'B.V.C. Engineering College, Odalarevu',
    code: 'BVCE',
    district: 'Dr. B.R. Ambedkar Konaseema',
    location: 'Odalarevu',
    type: 'Autonomous'
  },
  {
    name: 'B.V.C. Institute of Technology & Science, Batlapalem',
    code: 'BVTS',
    district: 'Dr. B.R. Ambedkar Konaseema',
    location: 'Amalapuram',
    type: 'Affiliated'
  },
  {
    name: 'Chaitanya Institute of Science & Technology, Madhavapatnam',
    code: 'CIST',
    district: 'Kakinada',
    location: 'Kakinada',
    type: 'Affiliated'
  },
  {
    name: 'GIET College of Engineering, Rajahmundry',
    code: 'GITE',
    district: 'East Godavari',
    location: 'Rajahmundry',
    type: 'Autonomous'
  },
  {
    name: 'Godavari Institute of Engineering & Technology (GIET), Rajahmundry',
    code: 'GIET',
    district: 'East Godavari',
    location: 'Rajahmundry',
    type: 'Autonomous'
  },
  {
    name: 'Ideal Institute of Technology, Vidyut Nagar',
    code: 'IDEL',
    district: 'Kakinada',
    location: 'Kakinada',
    type: 'Affiliated'
  },
  {
    name: 'International School of Technology & Sciences for Women (ISTS), Rajanagaram',
    code: 'ISTS',
    district: 'East Godavari',
    location: 'Rajanagaram',
    type: 'Affiliated'
  },
  {
    name: 'JNTUK University College of Engineering, Kakinada',
    code: 'JNTK',
    district: 'Kakinada',
    location: 'Kakinada',
    type: 'State University Campus'
  },
  {
    name: 'Kakinada Institute of Engineering & Technology (KIET), Korangi',
    code: 'KIET',
    district: 'Kakinada',
    location: 'Korangi',
    type: 'Affiliated'
  },
  {
    name: 'Kakinada Institute of Engineering & Technology for Women, Korangi',
    code: 'KIEW',
    district: 'Kakinada',
    location: 'Korangi',
    type: 'Affiliated'
  },
  {
    name: 'Lenora College of Engineering, Rampachodavaram',
    code: 'LNRA',
    district: 'East Godavari',
    location: 'Rampachodavaram',
    type: 'Affiliated'
  },
  {
    name: 'Pragati Engineering College (Autonomous), Surampalem',
    code: 'PRAG',
    district: 'Kakinada',
    location: 'Surampalem',
    type: 'Autonomous'
  },
  {
    name: 'Sri Sai Aditya Institute of Science and Technology, Surampalem',
    code: 'SAIT',
    district: 'Kakinada',
    location: 'Surampalem',
    type: 'Affiliated'
  },
  {
    name: 'V.S. Lakshmi Engineering College for Women, Matlapalem',
    code: 'VSLW',
    district: 'Kakinada',
    location: 'Kakinada',
    type: 'Affiliated'
  },

  // --- WEST GODAVARI & ELURU ---
  {
    name: 'Akula Sreeramulu College of Engineering, Tanuku',
    code: 'ASRE',
    district: 'West Godavari',
    location: 'Tanuku',
    type: 'Affiliated'
  },
  {
    name: 'Bhimavaram Institute of Engineering & Technology, Pennada',
    code: 'BIMV',
    district: 'West Godavari',
    location: 'Bhimavaram',
    type: 'Affiliated'
  },
  {
    name: 'D.N.R. College of Engineering & Technology, Bhimavaram',
    code: 'DNRE',
    district: 'West Godavari',
    location: 'Bhimavaram',
    type: 'Affiliated'
  },
  {
    name: 'Eluru College of Engineering & Technology, Duggirala',
    code: 'ECET',
    district: 'Eluru',
    location: 'Eluru',
    type: 'Affiliated'
  },
  {
    name: 'Grandhi Varalakshmi Venkatarao Institute of Technology (GVIT), Tundurru',
    code: 'GVIT',
    district: 'West Godavari',
    location: 'Bhimavaram',
    type: 'Affiliated'
  },
  {
    name: 'Helapuri Institute of Technology & Science, Vegavaram',
    code: 'HITS',
    district: 'Eluru',
    location: 'Eluru',
    type: 'Affiliated'
  },
  {
    name: 'National Institute of Technology Andhra Pradesh (NIT-AP), Tadepalligudem',
    code: 'NITAP',
    district: 'West Godavari',
    location: 'Tadepalligudem',
    type: 'Institute of National Importance'
  },
  {
    name: 'Ramachandra College of Engineering, Vatluru',
    code: 'RCEE',
    district: 'Eluru',
    location: 'Eluru',
    type: 'Autonomous'
  },
  {
    name: 'S.R.K.R. Engineering College (Autonomous), Bhimavaram',
    code: 'SRKR',
    district: 'West Godavari',
    location: 'Bhimavaram',
    type: 'Autonomous'
  },
  {
    name: 'SASI Institute of Technology & Engineering (Autonomous), Tadepalligudem',
    code: 'SASI',
    district: 'West Godavari',
    location: 'Tadepalligudem',
    type: 'Autonomous'
  },
  {
    name: 'Shri Vishnu Engineering College for Women (Autonomous), Bhimavaram',
    code: 'BVMW',
    district: 'West Godavari',
    location: 'Bhimavaram',
    type: 'Autonomous'
  },
  {
    name: 'Sir C.R. Reddy College of Engineering, Vatluru',
    code: 'CRRE',
    district: 'Eluru',
    location: 'Eluru',
    type: 'Autonomous'
  },
  {
    name: 'Sri Vasavi Engineering College (Autonomous), Pedatadepalli',
    code: 'SVET',
    district: 'West Godavari',
    location: 'Tadepalligudem',
    type: 'Autonomous'
  },
  {
    name: 'Swarnandhra College of Engineering & Technology (Autonomous), Seetharampuram',
    code: 'SWRN',
    district: 'West Godavari',
    location: 'Narsapur',
    type: 'Autonomous'
  },
  {
    name: 'Swarnandhra Institute of Engineering & Technology, Seetharampuram',
    code: 'SIET',
    district: 'West Godavari',
    location: 'Narsapur',
    type: 'Affiliated'
  },
  {
    name: 'Vishnu Institute of Technology (VITB), Vishnupur',
    code: 'VITB',
    district: 'West Godavari',
    location: 'Bhimavaram',
    type: 'Autonomous'
  },

  // --- KRISHNA & NTR (VIJAYAWADA) ---
  {
    name: 'Amrita Sai Institute of Science & Technology, Paritala',
    code: 'ASVR',
    district: 'NTR (Vijayawada)',
    location: 'Kanchikacherla',
    type: 'Autonomous'
  },
  {
    name: 'Andhra Loyola Institute of Engineering & Technology, Vijayawada',
    code: 'ALIT',
    district: 'NTR (Vijayawada)',
    location: 'Vijayawada',
    type: 'Affiliated'
  },
  {
    name: 'Devineni Venkata Ramana & Dr. Hima Sekhar MIC College of Technology, Kanchikacherla',
    code: 'MICT',
    district: 'NTR (Vijayawada)',
    location: 'Kanchikacherla',
    type: 'Autonomous'
  },
  {
    name: 'DJR Institute of Engineering & Technology, Velpuru',
    code: 'DJRE',
    district: 'Krishna',
    location: 'Vijayawada',
    type: 'Affiliated'
  },
  {
    name: 'Lakireddy Bali Reddy College of Engineering (Autonomous), Mylavaram',
    code: 'LBCE',
    district: 'NTR (Vijayawada)',
    location: 'Mylavaram',
    type: 'Autonomous'
  },
  {
    name: 'MVR College of Engineering & Technology, Paritala',
    code: 'MVRS',
    district: 'NTR (Vijayawada)',
    location: 'Kanchikacherla',
    type: 'Affiliated'
  },
  {
    name: 'Nimra College of Engineering & Technology, Ibrahimpatnam',
    code: 'NIMR',
    district: 'NTR (Vijayawada)',
    location: 'Ibrahimpatnam',
    type: 'Affiliated'
  },
  {
    name: 'Nova College of Engineering & Technology, Jafarguda',
    code: 'NOVA',
    district: 'NTR (Vijayawada)',
    location: 'Ibrahimpatnam',
    type: 'Affiliated'
  },
  {
    name: 'NRI Institute of Technology (Autonomous), Agiripalli',
    code: 'NRIT',
    district: 'Krishna',
    location: 'Agiripalli',
    type: 'Autonomous'
  },
  {
    name: 'Paladugu Parvathi Devi College of Engineering & Technology, Surampalli',
    code: 'PPDC',
    district: 'Krishna',
    location: 'Gannavaram',
    type: 'Affiliated'
  },
  {
    name: 'Potti Sriramulu Chalavadi Mallikarjuna Rao College of Engineering & Technology, Kothapet',
    code: 'PSCM',
    district: 'NTR (Vijayawada)',
    location: 'Vijayawada',
    type: 'Affiliated'
  },
  {
    name: 'Prasad V. Potluri Siddhartha Institute of Technology, Kanuru',
    code: 'PPSV',
    district: 'Krishna',
    location: 'Vijayawada',
    type: 'Autonomous'
  },
  {
    name: 'RK College of Engineering, Kethanakonda',
    code: 'RKCE',
    district: 'NTR (Vijayawada)',
    location: 'Ibrahimpatnam',
    type: 'Affiliated'
  },
  {
    name: 'Seshadri Rao Gudlavalleru Engineering College (Autonomous), Gudlavalleru',
    code: 'GECG',
    district: 'Krishna',
    location: 'Gudlavalleru',
    type: 'Autonomous'
  },
  {
    name: 'SRK Institute of Technology, Enikepadu',
    code: 'SRKI',
    district: 'NTR (Vijayawada)',
    location: 'Vijayawada',
    type: 'Affiliated'
  },
  {
    name: 'Usha Rama College of Engineering & Technology, Telaprolu',
    code: 'URCE',
    district: 'Krishna',
    location: 'Gannavaram',
    type: 'Autonomous'
  },
  {
    name: 'Velagapudi Ramakrishna Siddhartha Engineering College (Autonomous), Kanuru',
    code: 'VRSE',
    district: 'Krishna',
    location: 'Vijayawada',
    type: 'Autonomous'
  },
  {
    name: 'Vikas College of Engineering & Technology, Nunna',
    code: 'VICT',
    district: 'NTR (Vijayawada)',
    location: 'Vijayawada',
    type: 'Affiliated'
  },

  // --- GUNTUR, PALNADU & BAPATLA ---
  {
    name: 'Bapatla Engineering College (Autonomous), Bapatla',
    code: 'BECB',
    district: 'Bapatla',
    location: 'Bapatla',
    type: 'Autonomous'
  },
  {
    name: 'Bapatla Women\'s Engineering College, Bapatla',
    code: 'BWEC',
    district: 'Bapatla',
    location: 'Bapatla',
    type: 'Affiliated'
  },
  {
    name: 'Chalapathi Institute of Engineering & Technology, Lam',
    code: 'CIET',
    district: 'Guntur',
    location: 'Guntur',
    type: 'Autonomous'
  },
  {
    name: 'Chalapathi Institute of Technology, Mothadaka',
    code: 'CLPT',
    district: 'Guntur',
    location: 'Guntur',
    type: 'Affiliated'
  },
  {
    name: 'Chebrolu Engineering College, Chebrolu',
    code: 'CHEB',
    district: 'Guntur',
    location: 'Tenali',
    type: 'Affiliated'
  },
  {
    name: 'Eswar College of Engineering, Narasaraopet',
    code: 'ESWR',
    district: 'Palnadu',
    location: 'Narasaraopet',
    type: 'Affiliated'
  },
  {
    name: 'Guntur Engineering College, Yanamadala',
    code: 'GECN',
    district: 'Guntur',
    location: 'Guntur',
    type: 'Affiliated'
  },
  {
    name: 'Kallam Haranadhareddy Institute of Technology (KHIT), Chowdavaram',
    code: 'KHIT',
    district: 'Guntur',
    location: 'Guntur',
    type: 'Autonomous'
  },
  {
    name: 'KKR & KSR Institute of Technology & Sciences (KITS), Vinjanampadu',
    code: 'KITS',
    district: 'Guntur',
    location: 'Guntur',
    type: 'Autonomous'
  },
  {
    name: 'Loyola Institute of Technology & Management, Dhulipalla',
    code: 'LITM',
    district: 'Palnadu',
    location: 'Sattenapalle',
    type: 'Affiliated'
  },
  {
    name: 'Malineni Perumallu Educational Society\'s Group of Institutions, Pulladigunta',
    code: 'MPES',
    district: 'Guntur',
    location: 'Guntur',
    type: 'Affiliated'
  },
  {
    name: 'Narasaraopeta Engineering College (Autonomous), Narasaraopet',
    code: 'NECN',
    district: 'Palnadu',
    location: 'Narasaraopet',
    type: 'Autonomous'
  },
  {
    name: 'Narasaraopeta Institute of Technology, Kotappakonda Road',
    code: 'NRIA',
    district: 'Palnadu',
    location: 'Narasaraopet',
    type: 'Affiliated'
  },
  {
    name: 'Newton\'s Institute of Engineering, Macherla',
    code: 'NEWT',
    district: 'Palnadu',
    location: 'Macherla',
    type: 'Affiliated'
  },
  {
    name: 'Priyadarshini Institute of Technology & Management, Pulladigunta',
    code: 'PITM',
    district: 'Guntur',
    location: 'Guntur',
    type: 'Affiliated'
  },
  {
    name: 'Priyadarshini Institute of Technology & Science, Chintalapudi',
    code: 'PIST',
    district: 'Guntur',
    location: 'Tenali',
    type: 'Affiliated'
  },
  {
    name: 'R.V.R. & J.C. College of Engineering (Autonomous), Chowdavaram',
    code: 'RVJC',
    district: 'Guntur',
    location: 'Guntur',
    type: 'Autonomous'
  },
  {
    name: 'St. Mary\'s Group of Institutions, Chebrolu',
    code: 'MARY',
    district: 'Guntur',
    location: 'Chebrolu',
    type: 'Affiliated'
  },
  {
    name: 'Tirumala Engineering College, Jonnalagadda',
    code: 'TRML',
    district: 'Palnadu',
    location: 'Narasaraopet',
    type: 'Affiliated'
  },
  {
    name: 'Universal College of Engineering & Technology, Dokiparru',
    code: 'UCEN',
    district: 'Guntur',
    location: 'Medikonduru',
    type: 'Affiliated'
  },
  {
    name: 'Vasireddy Venkatadri Institute of Technology (VVIT), Nambur',
    code: 'VVIG',
    district: 'Guntur',
    location: 'Guntur',
    type: 'Autonomous'
  },
  {
    name: 'Vignan\'s Nirula Institute of Technology & Science for Women, Palakaluru',
    code: 'VNEW',
    district: 'Guntur',
    location: 'Guntur',
    type: 'Affiliated'
  },

  // --- PRAKASAM ---
  {
    name: 'A.B.R. College of Engineering & Technology, Kanigiri',
    code: 'ABRK',
    district: 'Prakasam',
    location: 'Kanigiri',
    type: 'Affiliated'
  },
  {
    name: 'Chirala Engineering College, Ramapuram',
    code: 'CECC',
    district: 'Prakasam',
    location: 'Chirala',
    type: 'Affiliated'
  },
  {
    name: 'Dr. Samuel George Institute of Engineering & Technology, Markapur',
    code: 'SGIT',
    district: 'Prakasam',
    location: 'Markapur',
    type: 'Affiliated'
  },
  {
    name: 'Indira Institute of Technology & Sciences, Markapur',
    code: 'IITS',
    district: 'Prakasam',
    location: 'Markapur',
    type: 'Affiliated'
  },
  {
    name: 'Malineni Lakshmaiah Women\'s Engineering College, Ongole',
    code: 'MLEW',
    district: 'Prakasam',
    location: 'Ongole',
    type: 'Affiliated'
  },
  {
    name: 'PACE Institute of Technology & Sciences (Autonomous), Valluru',
    code: 'PACE',
    district: 'Prakasam',
    location: 'Ongole',
    type: 'Autonomous'
  },
  {
    name: 'Prakasam Engineering College, Kandukur',
    code: 'PREC',
    district: 'Prakasam',
    location: 'Kandukur',
    type: 'Affiliated'
  },
  {
    name: 'QIS College of Engineering & Technology (Autonomous), Vengamukkapalem',
    code: 'QISE',
    district: 'Prakasam',
    location: 'Ongole',
    type: 'Autonomous'
  },
  {
    name: 'QIS Institute of Technology, Vengamukkapalem',
    code: 'QIST',
    district: 'Prakasam',
    location: 'Ongole',
    type: 'Affiliated'
  },
  {
    name: 'Rise Krishna Sai Gandhi Group of Institutions, Valluru',
    code: 'RGAN',
    district: 'Prakasam',
    location: 'Ongole',
    type: 'Affiliated'
  },
  {
    name: 'Rise Krishna Sai Prakasam Group of Institutions, Valluru',
    code: 'RISE',
    district: 'Prakasam',
    location: 'Ongole',
    type: 'Affiliated'
  },
  {
    name: 'St. Ann\'s College of Engineering & Technology, Nayunipalli',
    code: 'ANNU',
    district: 'Prakasam',
    location: 'Chirala',
    type: 'Autonomous'
  },
  {
    name: 'VRS & YRN College of Engineering & Technology, Chirala',
    code: 'VYRN',
    district: 'Prakasam',
    location: 'Chirala',
    type: 'Affiliated'
  },

  // --- SRI POTTI SRIRAMULU NELLORE ---
  {
    name: 'Audisankara College of Engineering & Technology (Autonomous), Gudur',
    code: 'ASIT',
    district: 'Sri Potti Sriramulu Nellore',
    location: 'Gudur',
    type: 'Autonomous'
  },
  {
    name: 'Audisankara Institute of Technology, Gudur',
    code: 'AIET',
    district: 'Sri Potti Sriramulu Nellore',
    location: 'Gudur',
    type: 'Affiliated'
  },
  {
    name: 'Brahmaiah College of Engineering, North Rajupalem',
    code: 'BCEK',
    district: 'Sri Potti Sriramulu Nellore',
    location: 'Nellore',
    type: 'Affiliated'
  },
  {
    name: 'Geethanjali Institute of Science & Technology (GIST), Gangavaram',
    code: 'GIST',
    district: 'Sri Potti Sriramulu Nellore',
    location: 'Kovur',
    type: 'Autonomous'
  },
  {
    name: 'Jagan\'s College of Engineering & Technology, Chittedu',
    code: 'JCET',
    district: 'Sri Potti Sriramulu Nellore',
    location: 'Tada',
    type: 'Affiliated'
  },
  {
    name: 'Mekapati Rajamohan Reddy Institute of Technology & Science (MeRITS), Udayagiri',
    code: 'MRIT',
    district: 'Sri Potti Sriramulu Nellore',
    location: 'Udayagiri',
    type: 'Affiliated'
  },
  {
    name: 'Narayana Engineering College, Gudur',
    code: 'NECG',
    district: 'Sri Potti Sriramulu Nellore',
    location: 'Gudur',
    type: 'Autonomous'
  },
  {
    name: 'Narayana Engineering College, Nellore',
    code: 'NENG',
    district: 'Sri Potti Sriramulu Nellore',
    location: 'Nellore',
    type: 'Autonomous'
  },
  {
    name: 'Parvatha Reddy Babulreddy Viswodaya Institute of Technology & Science (PBR VITS), Kavali',
    code: 'PVTK',
    district: 'Sri Potti Sriramulu Nellore',
    location: 'Kavali',
    type: 'Autonomous'
  },
  {
    name: 'Priyadarshini College of Engineering, Kanuparthipadu',
    code: 'PDPE',
    district: 'Sri Potti Sriramulu Nellore',
    location: 'Nellore',
    type: 'Affiliated'
  },
  {
    name: 'Rao & Naidu Engineering College, Ongole Road',
    code: 'RNEC',
    district: 'Sri Potti Sriramulu Nellore',
    location: 'Kavali',
    type: 'Affiliated'
  },
  {
    name: 'Sri Venkateswara College of Engineering (SVCN), North Rajupalem',
    code: 'SVCN',
    district: 'Sri Potti Sriramulu Nellore',
    location: 'Kodavalur',
    type: 'Affiliated'
  },

  // --- CHITTOOR & TIRUPATI ---
  {
    name: 'Annamacharya Institute of Technology & Sciences, Karakambadi',
    code: 'AITT',
    district: 'Tirupati',
    location: 'Tirupati',
    type: 'Affiliated'
  },
  {
    name: 'Chadalawada Ramanamma Engineering College (Autonomous), Tirupati',
    code: 'CRIT',
    district: 'Tirupati',
    location: 'Tirupati',
    type: 'Autonomous'
  },
  {
    name: 'Indian Institute of Information Technology Sri City (IIIT Sri City)',
    code: 'IIITS',
    district: 'Tirupati',
    location: 'Sri City',
    type: 'Institute of National Importance'
  },
  {
    name: 'Indian Institute of Technology Tirupati (IIT Tirupati)',
    code: 'IITT',
    district: 'Tirupati',
    location: 'Yerpedu',
    type: 'Institute of National Importance'
  },
  {
    name: 'Kuppam Engineering College, Kuppam',
    code: 'KUPM',
    district: 'Chittoor',
    location: 'Kuppam',
    type: 'Autonomous'
  },
  {
    name: 'Madanapalle Institute of Technology & Science (MITS) (Autonomous), Madanapalle',
    code: 'MITS',
    district: 'Annamayya',
    location: 'Madanapalle',
    type: 'Autonomous'
  },
  {
    name: 'Mother Theresa Institute of Engineering & Technology, Palamaner',
    code: 'MTIE',
    district: 'Chittoor',
    location: 'Palamaner',
    type: 'Affiliated'
  },
  {
    name: 'Siddharth Institute of Engineering & Technology (Autonomous), Puttur',
    code: 'SIET',
    district: 'Tirupati',
    location: 'Puttur',
    type: 'Autonomous'
  },
  {
    name: 'Siddhartha Institute of Science & Technology, Puttur',
    code: 'SIST',
    district: 'Tirupati',
    location: 'Puttur',
    type: 'Autonomous'
  },
  {
    name: 'Sree Vidyanikethan Engineering College (Autonomous), A. Rangampet',
    code: 'SVEC',
    district: 'Tirupati',
    location: 'Tirupati',
    type: 'Autonomous'
  },
  {
    name: 'Sreenivasa Institute of Technology & Management Studies (SITAMS), Chittoor',
    code: 'SITM',
    district: 'Chittoor',
    location: 'Chittoor',
    type: 'Autonomous'
  },
  {
    name: 'Sri Padmavati Mahila Visvavidyalayam School of Engineering & Technology, Tirupati',
    code: 'SPMU',
    district: 'Tirupati',
    location: 'Tirupati',
    type: 'State University Campus'
  },
  {
    name: 'Sri Venkateswara College of Engineering, Karakambadi Road',
    code: 'SVCE',
    district: 'Tirupati',
    location: 'Tirupati',
    type: 'Autonomous'
  },
  {
    name: 'Sri Venkateswara University College of Engineering (SVUCE), Tirupati',
    code: 'SVUC',
    district: 'Tirupati',
    location: 'Tirupati',
    type: 'State University Campus'
  },
  {
    name: 'Vaishnavi Institute of Technology, Chembakuru',
    code: 'VTTT',
    district: 'Tirupati',
    location: 'Tirupati',
    type: 'Affiliated'
  },
  {
    name: 'Vemu Institute of Technology, P. Kothakota',
    code: 'VEMU',
    district: 'Chittoor',
    location: 'Chittoor',
    type: 'Affiliated'
  },
  {
    name: 'Yogananda Institute of Technology & Science, Mohanapuram',
    code: 'YITS',
    district: 'Tirupati',
    location: 'Tirupati',
    type: 'Affiliated'
  },

  // --- ANANTHAPURAMU & SRI SATHYA SAI ---
  {
    name: 'Anantha Lakshmi Institute of Technology & Sciences, Itikalapalli',
    code: 'ALTS',
    district: 'Ananthapuramu (Anantapur)',
    location: 'Anantapur',
    type: 'Affiliated'
  },
  {
    name: 'BIT Institute of Technology, Hindupur',
    code: 'BITA',
    district: 'Sri Sathya Sai',
    location: 'Hindupur',
    type: 'Affiliated'
  },
  {
    name: 'Chiranjeevi Reddy Institute of Engineering & Technology, Alampur',
    code: 'CRIA',
    district: 'Ananthapuramu (Anantapur)',
    location: 'Anantapur',
    type: 'Affiliated'
  },
  {
    name: 'Gates Institute of Technology, Gooty',
    code: 'GTTM',
    district: 'Ananthapuramu (Anantapur)',
    location: 'Gooty',
    type: 'Autonomous'
  },
  {
    name: 'Intell Engineering College, Anantapur',
    code: 'INTL',
    district: 'Ananthapuramu (Anantapur)',
    location: 'Anantapur',
    type: 'Affiliated'
  },
  {
    name: 'JNTUA College of Engineering, Ananthapuramu',
    code: 'JNTA',
    district: 'Ananthapuramu (Anantapur)',
    location: 'Anantapur',
    type: 'State University Campus'
  },
  {
    name: 'JNTUA College of Engineering, Kalikiri',
    code: 'JNTK',
    district: 'Annamayya',
    location: 'Kalikiri',
    type: 'State University Campus'
  },
  {
    name: 'Sanskrithi School of Engineering, Behind SSSIHMS',
    code: 'SSBE',
    district: 'Sri Sathya Sai',
    location: 'Puttaparthi',
    type: 'Affiliated'
  },
  {
    name: 'Sir C.V. Raman Institute of Technology & Sciences, Tadipatri',
    code: 'CVRT',
    district: 'Ananthapuramu (Anantapur)',
    location: 'Tadipatri',
    type: 'Affiliated'
  },
  {
    name: 'Sri Venkateswara Institute of Technology, Hampapuram',
    code: 'SVHN',
    district: 'Ananthapuramu (Anantapur)',
    location: 'Anantapur',
    type: 'Affiliated'
  },
  {
    name: 'Srinivasa Ramanujan Institute of Technology (SRIT) (Autonomous), Rotarypuram',
    code: 'SRIT',
    district: 'Ananthapuramu (Anantapur)',
    location: 'Anantapur',
    type: 'Autonomous'
  },
  {
    name: 'Tadipatri Engineering College, Veerapuram',
    code: 'TPEC',
    district: 'Ananthapuramu (Anantapur)',
    location: 'Tadipatri',
    type: 'Affiliated'
  },

  // --- KURNOOL & NANDYAL ---
  {
    name: 'AVR & SVR College of Engineering & Technology, Nandyal',
    code: 'AVRS',
    district: 'Nandyal',
    location: 'Nandyal',
    type: 'Affiliated'
  },
  {
    name: 'Bheema Institute of Technology & Science, Adoni',
    code: 'BMTK',
    district: 'Kurnool',
    location: 'Adoni',
    type: 'Affiliated'
  },
  {
    name: 'Brindavan Institute of Technology & Science, Peddatekur',
    code: 'BRND',
    district: 'Kurnool',
    location: 'Kurnool',
    type: 'Affiliated'
  },
  {
    name: 'Dr. K.V. Subba Reddy Institute of Technology, Dupadu',
    code: 'KVSR',
    district: 'Kurnool',
    location: 'Kurnool',
    type: 'Affiliated'
  },
  {
    name: 'G. Pulla Reddy Engineering College (Autonomous), Kurnool',
    code: 'GPRE',
    district: 'Kurnool',
    location: 'Kurnool',
    type: 'Autonomous'
  },
  {
    name: 'G. Pullaiah College of Engineering & Technology (Autonomous), Kurnool',
    code: 'GPCX',
    district: 'Kurnool',
    location: 'Kurnool',
    type: 'Autonomous'
  },
  {
    name: 'Rajeev Gandhi Memorial College of Engineering & Technology (RGMCET) (Autonomous), Nandyal',
    code: 'RGMC',
    district: 'Nandyal',
    location: 'Nandyal',
    type: 'Autonomous'
  },
  {
    name: 'Ravindra College of Engineering for Women, Venkayapalli',
    code: 'RCEW',
    district: 'Kurnool',
    location: 'Kurnool',
    type: 'Autonomous'
  },
  {
    name: 'Santhiram Engineering College, Nandyal',
    code: 'SREC',
    district: 'Nandyal',
    location: 'Nandyal',
    type: 'Autonomous'
  },
  {
    name: 'St. Johns College of Engineering & Technology, Yemmiganur',
    code: 'SJNT',
    district: 'Kurnool',
    location: 'Yemmiganur',
    type: 'Affiliated'
  },
  {
    name: 'Stanley Stephen College of Engineering & Technology, Panchalingala',
    code: 'SSCT',
    district: 'Kurnool',
    location: 'Kurnool',
    type: 'Affiliated'
  },

  // --- YSR KADAPA & ANNAMAYYA ---
  {
    name: 'Annamacharya Institute of Technology & Sciences (Autonomous), Rajampet',
    code: 'AITS',
    district: 'Annamayya',
    location: 'Rajampet',
    type: 'Autonomous'
  },
  {
    name: 'Bharath College of Engineering & Technology for Women, Buggaletipalli',
    code: 'BCET',
    district: 'YSR Kadapa',
    location: 'Kadapa',
    type: 'Affiliated'
  },
  {
    name: 'Chaitanya Bharathi Institute of Technology, Pallavolu',
    code: 'CBIT',
    district: 'YSR Kadapa',
    location: 'Proddatur',
    type: 'Affiliated'
  },
  {
    name: 'Global College of Engineering & Technology, Chennur',
    code: 'GCET',
    district: 'YSR Kadapa',
    location: 'Kadapa',
    type: 'Affiliated'
  },
  {
    name: 'JNTUA College of Engineering, Pulivendula',
    code: 'JNTP',
    district: 'YSR Kadapa',
    location: 'Pulivendula',
    type: 'State University Campus'
  },
  {
    name: 'Kandula Lakshumma Memorial College of Engineering for Women (KLM CEW), Kadapa',
    code: 'KLMW',
    district: 'YSR Kadapa',
    location: 'Kadapa',
    type: 'Affiliated'
  },
  {
    name: 'K.S.R.M. College of Engineering (Autonomous), Kadapa',
    code: 'KSRM',
    district: 'YSR Kadapa',
    location: 'Kadapa',
    type: 'Autonomous'
  },
  {
    name: 'Sri Sai Institute of Technology and Science, Rayachoti',
    code: 'SSIT',
    district: 'Annamayya',
    location: 'Rayachoti',
    type: 'Affiliated'
  },
  {
    name: 'Sri Venkateswara College of Engineering and Technology, Kadapa',
    code: 'SVTE',
    district: 'YSR Kadapa',
    location: 'Kadapa',
    type: 'Affiliated'
  },
  {
    name: 'Srinivasa Institute of Technology & Science, Ukkayapalli',
    code: 'SITC',
    district: 'YSR Kadapa',
    location: 'Kadapa',
    type: 'Affiliated'
  },
  {
    name: 'Vignana Bharathi Institute of Technology, Proddatur',
    code: 'VBIT',
    district: 'YSR Kadapa',
    location: 'Proddatur',
    type: 'Affiliated'
  },
  {
    name: 'Y.S.R. Engineering College of Yogi Vemana University, Proddatur',
    code: 'YVUC',
    district: 'YSR Kadapa',
    location: 'Proddatur',
    type: 'State University Campus'
  },

  // --- CUSTOM / OTHER OPTION ---
  {
    name: 'Other / Custom Engineering College in Andhra Pradesh',
    code: 'OTHER',
    district: 'Other',
    location: 'Andhra Pradesh',
    type: 'Custom'
  }
];

// Helper to remove any accidental duplicates and sort alphabetically by official name
const uniqueMap = new Map();
RAW_AP_ENGINEERING_COLLEGES.forEach(col => {
  const key = col.name.trim().toLowerCase();
  if (!uniqueMap.has(key)) {
    uniqueMap.set(key, {
      ...col,
      name: col.name.trim(),
      code: (col.code || '').trim().toUpperCase(),
      district: col.district.trim(),
      location: col.location.trim()
    });
  }
});

// Alphabetically sorted colleges (with 'Other' maintained cleanly at the end or in search)
export const AP_ENGINEERING_COLLEGES = Array.from(uniqueMap.values()).sort((a, b) => {
  if (a.code === 'OTHER') return 1;
  if (b.code === 'OTHER') return -1;
  return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
});

/**
 * Filter colleges by district and optional search term
 * @param {string} district - Selected district or 'All Districts'
 * @param {string} searchTerm - Search query (name or code)
 * @returns {Array} List of matched colleges
 */
export function filterAPColleges(district = 'All Districts', searchTerm = '') {
  let list = AP_ENGINEERING_COLLEGES;

  if (district && district !== 'All Districts' && district !== 'All') {
    list = list.filter(c => 
      c.code === 'OTHER' || 
      c.district.toLowerCase() === district.toLowerCase() ||
      (district.includes('(') && c.district.toLowerCase().includes(district.split('(')[0].trim().toLowerCase()))
    );
  }

  if (searchTerm && searchTerm.trim()) {
    const term = searchTerm.trim().toLowerCase();
    list = list.filter(c => 
      c.name.toLowerCase().includes(term) ||
      c.code.toLowerCase().includes(term) ||
      c.location.toLowerCase().includes(term) ||
      c.district.toLowerCase().includes(term)
    );
  }

  return list;
}

/**
 * Find college by name or code
 */
export function findAPCollege(nameOrCode) {
  if (!nameOrCode) return null;
  const target = nameOrCode.trim().toLowerCase();
  return AP_ENGINEERING_COLLEGES.find(c => 
    c.name.toLowerCase() === target || 
    c.code.toLowerCase() === target
  );
}
