import React, { useState } from 'react';
import "../styles.css"
import 'typeface-poppins';
import { 
    Sidebar, 
    Menu, 
    MenuItem, 
    SubMenu,
} from 'react-pro-sidebar';

import { 
    ArrowBackIosRounded,
    ArrowForwardIosRounded,
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
    Typography,
} from '@mui/material';

export default function SideBar() {

    const [collapsed, setCollapsed] = useState(false);
    const [hovered, setHovered] = useState(false);
    const iconSize = collapsed ? 50 : 100;

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
                    backgroundColor="#1F2937" 
                    style={{ 
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                        }}>
                    
                    <div className='text-center' style={{ padding: '20px', color: '#A0A0A0', opacity: 0.5 }}  transitionDuration={750}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <BlockRounded style={{ fontSize: iconSize, marginBottom: '5px' }} />
                            <p>No Logo Yet</p>

                            {collapsed && (
                                <Divider variant='fullWidth' sx={{ marginTop: '2rem', width: '100%', backgroundColor: '#849E87', height: '3px' }} />
                            )}

                            {!collapsed && (
                            <Divider variant='fullWidth' sx={{ marginTop: '2rem', width: '100%' }}>
                                <Chip label="M" style={{ color: 'white', backgroundColor: '#849E87' }} />
                            </Divider>
                            )}

                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column'}}  transitionDuration={750}>
                        <Menu>
                            {collapsed ? (
                                <>
                                    <MenuItem 
                                        className='text-center'>
                                        <DashboardRounded sx={{ fontSize: '2rem', color: '#849E87' }}/>
                                    </MenuItem>
                                    <MenuItem className='text-center'>
                                        <PointOfSaleRounded sx={{ fontSize: '2rem', color: '#849E87' }}/>
                                    </MenuItem>
                                    <MenuItem className='text-center'>
                                        <FolderRounded sx={{ fontSize: '2rem', color: '#849E87' }}/>
                                    </MenuItem>
                                    <MenuItem className='text-center'>
                                        <ShoppingCartRounded sx={{ fontSize: '2rem', color: '#849E87' }}/>
                                    </MenuItem>
                                    <MenuItem className='text-center'>
                                        <InventoryRounded sx={{ fontSize: '2rem', color: '#849E87' }}/>
                                    </MenuItem>
                                    <MenuItem className='text-center'>
                                        <LeaderboardRounded sx={{ fontSize: '2rem', color: '#849E87' }}/>
                                    </MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem
                                        className='p-1'
                                        sx={{display: 'flex', alignItems: 'center', fontSize: '5rem', color: '#849E87',}}>
                                        <DashboardRounded sx={{ marginRight: '10px', marginBottom: '3px', color: '#849E87' }} />
                                        <span style={{ color: '#F5F5F5' }}>Dashboard</span>
                                    </MenuItem>
                                    <MenuItem className='p-1' sx={{ display: 'flex', alignItems: 'center', fontSize: '5rem' }}>
                                        <PointOfSaleRounded sx={{ marginRight: '10px', marginBottom: '3px', color: '#849E87' }} />
                                        <span style={{ color: '#F5F5F5' }}>POS</span>
                                    </MenuItem>
                                    <MenuItem className='p-1' sx={{ display: 'flex', alignItems: 'center', fontSize: '5rem' }}>
                                        <FolderRounded sx={{ marginRight: '10px', marginBottom: '3px', color: '#849E87' }} />
                                        <span style={{ color: '#F5F5F5' }}>Category</span>
                                    </MenuItem>
                                    <MenuItem className='p-1' sx={{ display: 'flex', alignItems: 'center', fontSize: '5rem' }}>
                                        <ShoppingCartRounded sx={{ marginRight: '10px', marginBottom: '3px', color: '#849E87' }} />
                                        <span style={{ color: '#F5F5F5' }}>Products</span>
                                    </MenuItem>
                                    <MenuItem className='p-1' sx={{ display: 'flex', alignItems: 'center', fontSize: '5rem' }}>
                                        <InventoryRounded sx={{ marginRight: '10px', marginBottom: '3px', color: '#849E87' }} />
                                        <span style={{ color: '#F5F5F5' }}>Inventory</span>
                                    </MenuItem>
                                    <SubMenu
                                        className='p-1' 
                                        label={<span style={{ color: '#F5F5F5' }}>Records</span>} 
                                        icon={<LeaderboardRounded 
                                            sx={{ 
                                                marginRight: '7px', 
                                                marginBottom: '3px', 
                                                color: '#849E87' 
                                                }} 
                                            />}
                                            
                                        >
                                        <MenuItem className='p-1' sx={{ display: 'flex', alignItems: 'center', fontSize: '5rem' }}>
                                            <ShowChartRounded sx={{ marginRight: '10px', marginBottom: '3px', color: '#849E87' }} />
                                            <span style={{ color: '#849E87' }}>Sales</span>
                                        </MenuItem>
                                        <MenuItem className='p-1' sx={{ display: 'flex', alignItems: 'center', fontSize: '5rem' }}>
                                            <DonutLargeRounded sx={{ marginRight: '10px', marginBottom: '3px', color: '#849E87' }} />
                                            <span style={{ color: '#849E87' }}>Analytics</span>
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
                                    backgroundColor: hovered ? '#5C725A' : '#849E87',
                                    borderRadius: '50%',
                                    color: '#F5F5F5',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                }}
                                >
                                {collapsed ? <ArrowForwardIosRounded /> : <ArrowBackIosRounded />}
                            </IconButton>
                        </div>
                    </main>
                </Sidebar>
            </div>
        </>
    );
}