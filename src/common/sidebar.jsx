import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../styles.css"
import 'typeface-poppins';
import { 
    Sidebar, 
    Menu, 
    MenuItem, 
    SubMenu,
} from 'react-pro-sidebar';

import { 
    UnfoldLessDoubleRounded,
    UnfoldMoreDoubleRounded,
    DashboardRounded,
    CategoryRounded,
    InventoryRounded,
    LeaderboardRounded,
    ShowChartRounded,
    DonutLargeRounded,
    BlockRounded,
    PointOfSaleRounded,
    ShoppingCartRounded,
    FolderRounded,
} from '@mui/icons-material';

import { 
    IconButton,
    Divider,
    Chip,
    Icon,
    Typography,
} from '@mui/material';

const colors = {
    primary: '#1D1D2C',
    secondary: '#F7F4E9',
    accentRed: '#E40C2B',
    accentBlue: '#3CBCC3',
    accentYellow: '#EBA63F',
    accentGreen: '#438945',
    fontColor: '#181818',
  };

export default function SideBar() {

    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const [hovered, setHovered] = useState(false);
    const iconSize = collapsed ? 50 : 100;

    const handleCategoryHome = () => {
        navigate('/category-home');
      }
    
    const handleDashboardHome = () => {
        navigate('/dashboard');
      }

    return(
        
        <>
            <div 
                style={{ 
                    display: 'flex', 
                    minHeight: '100vh',
                    flex: '0 0 auto', 
                    overflowY: 'auto'
                    }}>
                <Sidebar 
                    collapsed={collapsed}
                    width='200px' 
                    transitionDuration={750} 
                    backgroundColor={colors.secondary}
                    >
                    
                    <div className='text-center' style={{ padding: '20px', color: 'lightgray' }} >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <BlockRounded style={{ fontSize: iconSize, marginBottom: '5px' }} />
                            <p>No Logo Yet</p>

                            {collapsed && (
                                <Divider variant='fullWidth' sx={{ marginTop: '2rem', width: '100%', backgroundColor: colors.primary, height: '3px' }} />
                            )}

                            {!collapsed && (
                            <Divider variant='fullWidth' sx={{ marginTop: '2rem', width: '100%' }}>
                                <Chip label="M" style={{ color: colors.secondary, backgroundColor:  colors.primary }} />
                            </Divider>
                            )}

                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column'}}  transitionDuration={750}>
                        <Menu>
                            {collapsed ? (
                                <>
                                    <MenuItem
                                        onClick={handleDashboardHome} 
                                        className='text-center'>
                                        <DashboardRounded sx={{ fontSize: '2rem', color: colors.primary }}/>
                                    </MenuItem>
                                    <MenuItem className='text-center'>
                                        <PointOfSaleRounded sx={{ fontSize: '2rem', color: colors.primary }}/>
                                    </MenuItem>
                                    <MenuItem onClick={handleCategoryHome} className='text-center'>
                                        <FolderRounded sx={{ fontSize: '2rem', color: colors.primary }}/>
                                    </MenuItem>
                                    <MenuItem className='text-center'>
                                        <ShoppingCartRounded sx={{ fontSize: '2rem', color: colors.primary }}/>
                                    </MenuItem>
                                    <MenuItem className='text-center'>
                                        <InventoryRounded sx={{ fontSize: '2rem', color: colors.primary }}/>
                                    </MenuItem>
                                    <MenuItem className='text-center'>
                                        <LeaderboardRounded sx={{ fontSize: '2rem', color: colors.primary }}/>
                                    </MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem
                                        onClick={handleDashboardHome} 
                                        className='p-1'
                                        sx={{display: 'flex', alignItems: 'center', fontSize: '5rem', color: colors.primary }}
                                        icon={<DashboardRounded sx={{ marginBottom: '3px', color: colors.primary }} />}>
                                        Dashboard
                                    </MenuItem>
                                    <MenuItem className='p-1' sx={{ display: 'flex', alignItems: 'center', fontSize: '5rem' }}
                                        icon={<PointOfSaleRounded sx={{ marginBottom: '3px', color: colors.primary }} />}>
                                        POS
                                    </MenuItem>
                                    <MenuItem onClick={handleCategoryHome} className='p-1' sx={{ display: 'flex', alignItems: 'center', fontSize: '5rem' }}
                                        icon={<FolderRounded sx={{ marginBottom: '3px', color: colors.primary }} />}>
                                        Categories
                                    </MenuItem>
                                    <MenuItem className='p-1' sx={{ display: 'flex', alignItems: 'center', fontSize: '5rem' }}
                                        icon={<ShoppingCartRounded sx={{ marginBottom: '3px', color: colors.primary }} />}>
                                        Products
                                    </MenuItem>
                                    <MenuItem className='p-1' sx={{ display: 'flex', alignItems: 'center', fontSize: '5rem' }}
                                        icon={<InventoryRounded sx={{ marginBottom: '3px', color: colors.primary }} />}>
                                        Inventory
                                    </MenuItem>
                                    <SubMenu
                                        className='p-1' 
                                        label="Records" 
                                        icon={<LeaderboardRounded 
                                            sx={{ 
                                                marginRight: '7px', 
                                                marginBottom: '3px', 
                                                color: colors.primary 
                                                }} 
                                            />}
                                            
                                        >
                                        <MenuItem className='p-1' sx={{ fontSize: '5rem' }}
                                            icon={<ShowChartRounded sx={{ marginBottom: '3px', color: colors.primary }} />}>
                                            Sales
                                        </MenuItem>
                                        <MenuItem className='p-1' sx={{ fontSize: '5rem' }}
                                            icon={<DonutLargeRounded sx={{ marginBottom: '3px', color: colors.primary }} />}>
                                            Analytics
                                        </MenuItem>
                                    </SubMenu>
                                </>
                                
                            )}
                        </Menu>
                    </div>
                    <main className='text-center' style={{ padding: 10 }} transitionDuration={750}>
                        <div>
                            <IconButton
                                onClick={() => setCollapsed(!collapsed)}
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                                style={{
                                    backgroundColor: 'transparent',
                                    borderRadius: '50%',
                                    color: colors.primary,
                                }}
                                >
                                {collapsed ? <UnfoldMoreDoubleRounded sx={{ transform: 'rotate(90deg)' }}/> : <UnfoldLessDoubleRounded sx={{ transform: 'rotate(90deg)' }}/>}
                            </IconButton>
                        </div>
                    </main>
                </Sidebar>
            </div>
        </>
    );
}