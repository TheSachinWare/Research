const sampleListing_d = [
    {
        name: "Dr. John Doe",
        image: {
            filename: "doctorimage1",
            url: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        degree: "MBBS",
        specialization: "Cardiology",
        clinicName: "HeartCare Clinic",
        clinicCall: 1234567890,
        clinicAdd: "123 Main St, New York, NY",
        yearsOfEx: 15,
        consultingFees: 500
    },
    {
        name: "Dr. Jane Smith",
        image: {
            filename: "doctorimage2",
            url: "https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        degree: "MD",
        specialization: "Dermatology",
        clinicName: "SkinCare Center",
        clinicCall: 9876543210,
        clinicAdd: "456 Oak St, Los Angeles, CA",
        yearsOfEx: 10,
        consultingFees: 300
    },
    {
        name: "Dr. Emily Johnson",
        image: {
            filename: "doctorimage3",
            url: "https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        degree: "BDS",
        specialization: "Dentistry",
        clinicName: "Smile Dental Clinic",
        clinicCall: 1239874560,
        clinicAdd: "789 Elm St, Chicago, IL",
        yearsOfEx: 8,
        consultingFees: 250
    },
    {
        name: "Dr. Michael Brown",
        image: {
            filename: "doctorimage4",
            url: "https://plus.unsplash.com/premium_photo-1681996484614-6afde0d53071?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        degree: "MS",
        specialization: "Orthopedics",
        clinicName: "OrthoHealth Clinic",
        clinicCall: 4567890123,
        clinicAdd: "321 Pine St, Houston, TX",
        yearsOfEx: 12,
        consultingFees: 600
    },
    {
        name: "Dr. Sophia Lee",
        image: {
            filename: "doctorimage5",
            url: "https://media.istockphoto.com/id/1301595548/photo/female-doctor-stock-photo.jpg?s=1024x1024&w=is&k=20&c=5TZmRIrv19xzHJG9DINZYPqxyZh6Ae-0utCXG7J0sGE="
        },
        degree: "MD",
        specialization: "Pediatrics",
        clinicName: "Happy Kids Clinic",
        clinicCall: 7891234560,
        clinicAdd: "654 Maple St, Seattle, WA",
        yearsOfEx: 9,
        consultingFees: 350
    },
    {
        name: "Dr. James Wilson",
        image: {
            filename: "doctorimage6",
            url: "https://media.istockphoto.com/id/1383445193/photo/shot-of-a-young-male-doctor-using-a-digital-tablet-at-work.jpg?s=1024x1024&w=is&k=20&c=mvpIaKJpSDBMRt2WaX3JnMoVGyMGDzXjwO0k2GL0YDw="
        },
        degree: "MBBS",
        specialization: "Psychiatry",
        clinicName: "Mind Wellness Clinic",
        clinicCall: 8529637410,
        clinicAdd: "987 Cedar St, Miami, FL",
        yearsOfEx: 20,
        consultingFees: 700
    },
    {
        name: "Dr. Olivia Martinez",
        image: {
            filename: "doctorimage7",
            url: "https://media.istockphoto.com/id/1292015214/photo/portrait-female-doctor-stock-photo.jpg?s=1024x1024&w=is&k=20&c=ebKJ9M5xL2OJwpTBhIRzyFolm0oB2mRSaSeBV3zUt-I="
        },
        degree: "MS",
        specialization: "Neurology",
        clinicName: "Neuro Health Center",
        clinicCall: 7531598520,
        clinicAdd: "246 Birch St, San Francisco, CA",
        yearsOfEx: 14,
        consultingFees: 800
    },
    {
        name: "Dr. William Davis",
        image: {
            filename: "doctorimage8",
            url: "https://img.freepik.com/free-photo/portrait-friendly-male-doctor-dressed-uniform_171337-105.jpg?t=st=1726301913~exp=1726305513~hmac=13f10d65058013a3ca77d95de6477e67da0af6e24e88c3ac828413c5538dc3f4&w=1060"
        },
        degree: "MBBS",
        specialization: "General Surgery",
        clinicName: "City Surgery Center",
        clinicCall: 9517534862,
        clinicAdd: "159 Spruce St, Boston, MA",
        yearsOfEx: 11,
        consultingFees: 550
    },
    {
        name: "Dr. Achyut Patel",
        image: {
            filename: "doctorimage9",
            url: "https://media.istockphoto.com/id/1298800629/photo/portrait-of-confident-male-doctor-looking-at-camera.jpg?s=1024x1024&w=is&k=20&c=YZqLotGgfGkQMmLrsanq56g-z5yWFOhovcGlBz20KPQ="
        },
        degree: "BAMS",
        specialization: "Ayurveda",
        clinicName: "Holistic Health Clinic",
        clinicCall: 6549871230,
        clinicAdd: "753 Palm St, Phoenix, AZ",
        yearsOfEx: 7,
        consultingFees: 400
    },
    {
        name: "Dr. Daniel White",
        image: {
            filename: "doctorimage10",
            url: "https://media.istockphoto.com/id/524539495/photo/indian-doctor.jpg?s=1024x1024&w=is&k=20&c=wiBtIcSM5uyYyp_6PWSU9ASjTJVmH4QmzhYFBC4a06Y="
        },
        degree: "BDS",
        specialization: "Oral Surgery",
        clinicName: "Advanced Dental Care",
        clinicCall: 1478523690,
        clinicAdd: "852 Willow St, Denver, CO",
        yearsOfEx: 18,
        consultingFees: 650
    }
];

module.exports = { data_d : sampleListing_d };
// This data_d name is going to be used in index_d.js in insertMany function after '.'.