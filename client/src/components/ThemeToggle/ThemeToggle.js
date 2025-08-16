import { useTheme } from '../../Context/ThemeContext';
import { IconButton, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const tooltipProps = {
    arrow: true,
    slotProps: {
      popper: {
        sx: {
          '& .MuiTooltip-tooltip': {
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            fontSize: '0.8rem',
            borderRadius: '6px',
            padding: '6px 10px',
          },
          '& .MuiTooltip-arrow': {
            color: 'var(--bg-tertiary)',
          },
        },
      },
    },
  };

  return (
    <Tooltip 
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"} 
      {...tooltipProps}
    >
      <IconButton
        onClick={toggleTheme}
        sx={{
          width: { xs: 24, md: 40 },
          height: { xs: 24, md: 40 },
          display: 'flex',
          marginRight: { xs: 1, md: 0 },
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-secondary)',
          boxShadow: 'var(--shadow)',
          cursor: 'pointer',
          transition: '0.25s ease',
          border: '1px solid var(--border-color)',
          '&:hover': {
            backgroundColor: 'var(--bg-tertiary)',
            transform: 'scale(1.08)',
            '& svg': { color: 'var(--accent-color)' },
          },
        }}
      >
        {isDarkMode ? (
          <LightModeIcon 
            sx={{ 
              fontSize: { xs: 16, md: 28 }, 
              color: 'var(--text-primary)',
              transition: 'color 0.3s ease'
            }} 
          />
        ) : (
          <DarkModeIcon 
            sx={{ 
              fontSize: { xs: 16, md: 28 },
              color: 'var(--text-primary)',
              transition: 'color 0.3s ease'
            }} 
          />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle; 