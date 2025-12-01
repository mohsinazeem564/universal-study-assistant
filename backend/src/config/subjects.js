// Complete subject taxonomy covering all educational domains
module.exports = {
  STEM: {
    Mathematics: {
      topics: [
        'Algebra', 'Geometry', 'Calculus', 'Trigonometry', 'Statistics',
        'Probability', 'Linear Algebra', 'Differential Equations',
        'Number Theory', 'Discrete Mathematics', 'Complex Analysis',
        'Real Analysis', 'Topology', 'Abstract Algebra', 'Graph Theory'
      ]
    },
    Physics: {
      topics: [
        'Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics',
        'Quantum Mechanics', 'Relativity', 'Nuclear Physics',
        'Particle Physics', 'Astrophysics', 'Condensed Matter',
        'Plasma Physics', 'Acoustics', 'Fluid Dynamics'
      ]
    },
    Chemistry: {
      topics: [
        'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry',
        'Analytical Chemistry', 'Biochemistry', 'Electrochemistry',
        'Polymer Chemistry', 'Environmental Chemistry', 'Medicinal Chemistry',
        'Quantum Chemistry', 'Thermochemistry', 'Photochemistry'
      ]
    },
    Biology: {
      topics: [
        'Botany', 'Zoology', 'Genetics', 'Microbiology', 'Ecology',
        'Molecular Biology', 'Cell Biology', 'Evolutionary Biology',
        'Anatomy', 'Physiology', 'Immunology', 'Neuroscience',
        'Marine Biology', 'Biotechnology', 'Bioinformatics'
      ]
    },
    ComputerScience: {
      topics: [
        'Programming', 'Data Structures', 'Algorithms', 'Database Systems',
        'Operating Systems', 'Computer Networks', 'Artificial Intelligence',
        'Machine Learning', 'Cybersecurity', 'Software Engineering',
        'Web Development', 'Mobile Development', 'Cloud Computing',
        'Blockchain', 'Computer Graphics', 'Natural Language Processing'
      ]
    }
  },
  
  Engineering: {
    CivilEngineering: {
      topics: [
        'Structural Engineering', 'Geotechnical Engineering', 'Transportation',
        'Hydraulics', 'Construction Management', 'Surveying',
        'Environmental Engineering', 'Urban Planning'
      ]
    },
    MechanicalEngineering: {
      topics: [
        'Thermodynamics', 'Fluid Mechanics', 'Machine Design',
        'Manufacturing', 'Robotics', 'Automotive Engineering',
        'HVAC', 'Materials Science', 'CAD/CAM'
      ]
    },
    ElectricalEngineering: {
      topics: [
        'Circuit Theory', 'Electronics', 'Power Systems',
        'Control Systems', 'Signal Processing', 'Telecommunications',
        'Embedded Systems', 'VLSI Design', 'Renewable Energy'
      ]
    },
    ChemicalEngineering: {
      topics: [
        'Process Engineering', 'Reaction Engineering', 'Separation Processes',
        'Process Control', 'Petroleum Engineering', 'Polymer Engineering'
      ]
    }
  },

  Languages: {
    English: {
      topics: [
        'Grammar', 'Literature', 'Writing', 'Poetry', 'Drama',
        'Linguistics', 'Phonetics', 'Syntax', 'Semantics', 'Rhetoric'
      ]
    },
    Spanish: {
      topics: ['Grammar', 'Vocabulary', 'Conversation', 'Literature', 'Culture']
    },
    French: {
      topics: ['Grammar', 'Vocabulary', 'Conversation', 'Literature', 'Culture']
    },
    German: {
      topics: ['Grammar', 'Vocabulary', 'Conversation', 'Literature', 'Culture']
    },
    Chinese: {
      topics: ['Mandarin', 'Characters', 'Grammar', 'Conversation', 'Culture']
    },
    Arabic: {
      topics: ['Grammar', 'Vocabulary', 'Conversation', 'Literature', 'Culture']
    },
    Urdu: {
      topics: ['Grammar', 'Vocabulary', 'Literature', 'Poetry', 'Culture']
    }
  },

  SocialSciences: {
    History: {
      topics: [
        'Ancient History', 'Medieval History', 'Modern History',
        'World Wars', 'American History', 'European History',
        'Asian History', 'African History', 'Islamic History'
      ]
    },
    Geography: {
      topics: [
        'Physical Geography', 'Human Geography', 'Political Geography',
        'Economic Geography', 'Cartography', 'GIS', 'Climate',
        'Geomorphology', 'Oceanography'
      ]
    },
    Economics: {
      topics: [
        'Microeconomics', 'Macroeconomics', 'International Economics',
        'Development Economics', 'Econometrics', 'Public Finance',
        'Monetary Economics', 'Labor Economics'
      ]
    },
    Psychology: {
      topics: [
        'Cognitive Psychology', 'Developmental Psychology', 'Social Psychology',
        'Clinical Psychology', 'Neuropsychology', 'Behavioral Psychology',
        'Educational Psychology', 'Industrial Psychology'
      ]
    },
    Sociology: {
      topics: [
        'Social Theory', 'Social Stratification', 'Urban Sociology',
        'Rural Sociology', 'Criminology', 'Demography', 'Social Change'
      ]
    },
    PoliticalScience: {
      topics: [
        'Political Theory', 'Comparative Politics', 'International Relations',
        'Public Administration', 'Political Economy', 'Public Policy'
      ]
    },
    Philosophy: {
      topics: [
        'Ethics', 'Metaphysics', 'Epistemology', 'Logic',
        'Political Philosophy', 'Philosophy of Mind', 'Aesthetics'
      ]
    }
  },

  Professional: {
    Medicine: {
      topics: [
        'Anatomy', 'Physiology', 'Pharmacology', 'Pathology',
        'Surgery', 'Internal Medicine', 'Pediatrics', 'Cardiology',
        'Neurology', 'Psychiatry', 'Radiology', 'Oncology'
      ]
    },
    Law: {
      topics: [
        'Constitutional Law', 'Criminal Law', 'Civil Law',
        'Corporate Law', 'International Law', 'Property Law',
        'Contract Law', 'Tax Law', 'Environmental Law'
      ]
    },
    Business: {
      topics: [
        'Management', 'Marketing', 'Finance', 'Accounting',
        'Human Resources', 'Operations Management', 'Strategy',
        'Entrepreneurship', 'Business Analytics', 'Supply Chain'
      ]
    },
    Nursing: {
      topics: [
        'Fundamentals', 'Medical-Surgical', 'Pediatric Nursing',
        'Psychiatric Nursing', 'Community Health', 'Critical Care'
      ]
    },
    Pharmacy: {
      topics: [
        'Pharmacology', 'Pharmaceutical Chemistry', 'Pharmacognosy',
        'Clinical Pharmacy', 'Hospital Pharmacy', 'Drug Formulation'
      ]
    }
  },

  Arts: {
    Music: {
      topics: [
        'Music Theory', 'Composition', 'Music History',
        'Instruments', 'Vocal Training', 'Jazz', 'Classical'
      ]
    },
    VisualArts: {
      topics: [
        'Drawing', 'Painting', 'Sculpture', 'Art History',
        'Digital Art', 'Photography', 'Graphic Design'
      ]
    },
    PerformingArts: {
      topics: [
        'Theater', 'Dance', 'Film Studies', 'Acting',
        'Choreography', 'Stage Design'
      ]
    }
  },

  Applied: {
    Agriculture: {
      topics: [
        'Agronomy', 'Horticulture', 'Animal Husbandry',
        'Soil Science', 'Agricultural Economics', 'Plant Pathology'
      ]
    },
    EnvironmentalScience: {
      topics: [
        'Ecology', 'Conservation', 'Climate Change',
        'Pollution Control', 'Sustainability', 'Wildlife Management'
      ]
    },
    Architecture: {
      topics: [
        'Architectural Design', 'Building Technology', 'Urban Design',
        'Landscape Architecture', 'Interior Design', 'Sustainable Architecture'
      ]
    },
    Education: {
      topics: [
        'Pedagogy', 'Curriculum Development', 'Educational Psychology',
        'Assessment', 'Special Education', 'Educational Technology'
      ]
    }
  }
};
