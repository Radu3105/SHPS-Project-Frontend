export const mockSymptoms = [
    "Chest Pain",
    "Chest flutter",
    "Right Arm Pain",
    "Left Arm Pain",
    "Joint Pain",
    "Dizziness",
    "Vertigo",
    "Headache",
];

export const mockDiseases = [
    {
        'id': 0,
        'name': 'heart disease',
        'type': 'cardiovascular',
    },
    {
        'id': 1,
        'name': 'skin cancer',
        'type': 'derma',
    },
];

export const mockQuestions = [
    {
        'id' : 0,
        'title': 'Does your left arm hurt?',
    },
    {
        'id' : 1,
        'title': 'Does your right arm hurt?',
    },
    {
        'id' : 2,
        'title': 'Does your chest hurt?',
    },
    {
        'id' : 3,
        'title': 'Do you feel pressure, fullness, burning or tightness in the chest?',
    },
    {
        'id' : 4,
        'title': 'Do you have shortness of breath?',
    },
    {
        'id' : 5,
        'title': 'Do you feel like your heart is racing?',
    },
];

export const mockPredictions = [
    {
        'id': 0,
        'disease': mockDiseases[0],
        'accuracy': .8,
    },
    {
        'id': 1,
        'disease': mockDiseases[1],
        'accuracy': .2,
    },
];

export const mockDoctors = [
    {
        'id': 0,
        'status': 'available',
        'firstName': 'Bob',
        'lastName': 'Martin',
        'gender': 'male',
        'age': 35,
        'email': 'bobmartin2323@gmail.com',
        'phone': '0752428753',
        'specialization': 'cardiovascular',
        'location': 'Craiova, Romania',
    },
    {
        'id': 1,
        'status': 'unavailable',
        'firstName': 'Natasha',
        'lastName': 'Johnson',
        'gender': 'female',
        'age': 42,
        'email': 'NattyNatashaTha@gmail.com',
        'phone': '0752222719',
        'specialization': 'derma',
        'location': 'Bucuresti, Romania',
    },
    {
        'id': 2,
        'status': 'available',
        'firstName': 'A',
        'lastName': 'B',
        'gender': 'male',
        'age': 36,
        'email': 'bobmadwadtin2323@gmail.com',
        'phone': '0752242753',
        'specialization': 'cardiovascular',
        'location': 'Craiova, Romania',
    },
];