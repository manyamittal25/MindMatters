import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BACKEND_URL } from '../../urls';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: auto;
`;

const DoctorCard = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const DoctorName = styled.h3`
  margin-top: 0;
  font-size: 1.5rem;
  color: #333;
`;

const DoctorInfo = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #555;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
`;

const ContactDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {

        const lat = 26.180230;
        const long = 91.748760;
        const response = await axios.get(
          `${BACKEND_URL}test/getHelp`,
          {
            params: { lat, long },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            }
          }
        );
        setDoctors(response.data);
      } catch (error) {
        setError('Failed to load doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <p>Loading doctors...</p>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <PageContainer>
      <h1>Contact Doctors</h1>
      {doctors.length === 0 ? (
        <p>No doctors available at the moment.</p>
      ) : (
        doctors.map((doctor) => (
          <DoctorCard key={doctor.id}>
            <DoctorName>{doctor.doctor_name}</DoctorName>
            <DoctorInfo>Experience: {doctor.years_of_experience}</DoctorInfo>
            <DoctorInfo>Address: {doctor.address}</DoctorInfo>
            <DoctorInfo>Specialization: {doctor.specialization}</DoctorInfo>
          </DoctorCard>
        ))
      )}
    </PageContainer>
  );
};

export default ContactDoctors;
