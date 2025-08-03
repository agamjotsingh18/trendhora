import React, { useEffect } from 'react';
import './PrivacyPolicy.css';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    const handleBack = () => {
        // Prevent any scroll behavior when navigating back
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
                        Privacy Policy
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
                            1. Information We Collect
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include:
                        </Typography>
                        <ul style={{ 
                            paddingLeft: '20px',
                            color: '#555',
                            lineHeight: 1.7
                        }}>
                            <li>Name, email address, and phone number</li>
                            <li>Billing and shipping addresses</li>
                            <li>Payment information (processed securely through our payment partners)</li>
                            <li>Order history and preferences</li>
                            <li>Communications with our customer service team</li>
                        </ul>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            2. How We Use Your Information
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            We use the information we collect to:
                        </Typography>
                        <ul style={{ 
                            paddingLeft: '20px',
                            color: '#555',
                            lineHeight: 1.7
                        }}>
                            <li>Process and fulfill your orders</li>
                            <li>Send order confirmations and shipping updates</li>
                            <li>Provide customer support</li>
                            <li>Send marketing communications (with your consent)</li>
                            <li>Improve our website and services</li>
                            <li>Prevent fraud and ensure security</li>
                        </ul>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            3. Information Sharing
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                        </Typography>
                        <ul style={{ 
                            paddingLeft: '20px',
                            color: '#555',
                            lineHeight: 1.7
                        }}>
                            <li>With your explicit consent</li>
                            <li>To trusted third-party service providers who assist us in operating our website</li>
                            <li>To comply with legal obligations</li>
                            <li>To protect our rights and safety</li>
                        </ul>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            4. Cookies and Tracking Technologies
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors are coming from. You can control cookie settings through your browser preferences.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            5. Data Security
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            6. Your Rights
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            You have the right to:
                        </Typography>
                        <ul style={{ 
                            paddingLeft: '20px',
                            color: '#555',
                            lineHeight: 1.7
                        }}>
                            <li>Access your personal information</li>
                            <li>Correct inaccurate information</li>
                            <li>Request deletion of your data</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Withdraw consent at any time</li>
                        </ul>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            7. Children's Privacy
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent and believe your child has provided us with personal information, please contact us.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            8. International Transfers
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            9. Changes to This Policy
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                            color: '#1a1a1a', 
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '18px', md: '20px' }
                        }}>
                            10. Contact Us
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                            If you have any questions about this Privacy Policy or our data practices, please contact us at:
                        </Typography>
                        <Box sx={{ 
                            pl: 2,
                            backgroundColor: '#f8f9fa',
                            padding: '16px',
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0'
                        }}>
                            <Typography variant="body1" sx={{ color: '#555', mb: 1 }}>
                                Email: shop@trendhora.com
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#555', mb: 1 }}>
                                Phone: +91 9319042075
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#555' }}>
                                Address: Delhi, India
                            </Typography>
                        </Box>
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
                        This Privacy Policy is effective as of January 2025 and will remain in effect except with respect to any changes in its provisions in the future.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default PrivacyPolicy; 