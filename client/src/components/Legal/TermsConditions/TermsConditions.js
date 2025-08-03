import React, { useEffect } from 'react';
import './TermsConditions.css';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const TermsConditions = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    const handleBack = () => {
        window.scrollTo(0, 0);
        navigate(-1);
    };

    return (
        <Box sx={{ 
            pt: { xs: '120px', sm: '140px', md: '160px' }, 
            pb: 4,
            minHeight: '100vh',
            backgroundColor: '#f8f9fa'
        }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ mb: 3 }}>
                    <button 
                        onClick={handleBack}
                        style={{
                            background: 'none',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            color: '#333',
                            fontSize: '16px',
                            marginBottom: '20px',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            transition: 'all 0.3s ease',
                            ':hover': {
                                backgroundColor: '#f0f0f0'
                            }
                        }}
                    >
                        <ArrowBackIcon sx={{ mr: 1 }} />
                        Back
                    </button>
                </Box>

                <Paper elevation={3} sx={{ 
                    p: { xs: 3, md: 4 },
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ 
                        color: '#1a1a1a', 
                        mb: 3,
                        fontWeight: 700,
                        fontSize: { xs: '28px', md: '32px' }
                    }}>
                        Terms & Conditions
                    </Typography>
                    
                    <Typography variant="body2" sx={{ mb: 2, color: '#666', fontStyle: 'italic' }}>
                        Last updated: January 2025
                    </Typography>

                    <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            1. Acceptance of Terms
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            By accessing and using TrendHora ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            2. Use License
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            Permission is granted to temporarily download one copy of the materials (information or software) on TrendHora for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </Typography>
                        <ul style={{ 
                            paddingLeft: '20px',
                            color: '#555',
                            lineHeight: 1.7
                        }}>
                            <li>Modify or copy the materials</li>
                            <li>Use the materials for any commercial purpose or for any public display</li>
                            <li>Attempt to reverse engineer any software contained on TrendHora</li>
                            <li>Remove any copyright or other proprietary notations from the materials</li>
                        </ul>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            3. Product Information
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            We strive to display accurate product information, including prices, descriptions, and availability. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            4. Pricing and Payment
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            All prices are in Dollar ($) and are subject to change without notice. Payment must be made at the time of order placement. We accept various payment methods as displayed during checkout.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            5. Shipping and Delivery
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            Delivery times are estimates only. We are not responsible for delays beyond our control. Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            6. Returns and Refunds
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            Returns are accepted within 30 days of delivery for unused items in original packaging. Refunds will be processed within 5-7 business days after we receive the returned item.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            7. User Accounts
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            8. Privacy
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Website, to understand our practices.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            9. Limitation of Liability
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            In no event shall TrendHora or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TrendHora.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            10. Governing Law
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3, borderColor: '#e0e0e0' }} />

                    <Typography variant="body2" sx={{ 
                        color: '#666', 
                        textAlign: 'center',
                        fontStyle: 'italic',
                        backgroundColor: '#f8f9fa',
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0'
                    }}>
                        If you have any questions about these Terms & Conditions, please contact us at shop@trendhora.com
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default TermsConditions; 