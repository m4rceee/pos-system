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
    DashboardRounded,
    CategoryRounded,
    InventoryRounded,
    LeaderboardRounded,
    ShowChartRounded,
    DonutLargeRounded,
} from '@mui/icons-material';

import { 
    IconButton,
} from '@mui/material';

export default function SideBar() {

    const [collapsed, setCollapsed] = useState(false);
    const [hovered, setHovered] = useState(false);

    return(
        
        <>
            <div 
                style={{ 
                    display: 'flex', 
                    height: '100%', 
                    minHeight: '100vh',
                    }}>
                <Sidebar 
                    collapsed={collapsed} 
                    transitionDuration={750} 
                    backgroundColor="#D1D5DB" 
                    style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
                    
                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                        <Menu>
                            {collapsed ? (
                                <>
                                    <MenuItem 
                                        className='text-center'>
                                        <DashboardRounded sx={{ fontSize: '2rem', color: '#374151' }}/>
                                    </MenuItem>
                                    <MenuItem className='text-center'>
                                        <CategoryRounded sx={{ fontSize: '2rem', color: '#374151' }}/>
                                    </MenuItem>
                                    <MenuItem className='text-center'>
                                        <InventoryRounded sx={{ fontSize: '2rem', color: '#374151' }}/>
                                    </MenuItem>
                                    <MenuItem className='text-center'>
                                        <LeaderboardRounded sx={{ fontSize: '2rem', color: '#374151' }}/>
                                    </MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem
                                        className='p-1'
                                        sx={{display: 'flex', alignItems: 'center', fontSize: '5rem',}}>
                                        <DashboardRounded sx={{ marginRight: '10px', marginBottom: '3px', color: '#374151' }} />
                                        Dashboard
                                    </MenuItem>
                                    <MenuItem className='p-1' sx={{ display: 'flex', alignItems: 'center', fontSize: '5rem' }}>
                                        <CategoryRounded sx={{ marginRight: '10px', marginBottom: '3px', color: '#374151' }} />
                                        Category
                                    </MenuItem>
                                    <MenuItem className='p-1' sx={{ display: 'flex', alignItems: 'center', fontSize: '5rem' }}>
                                        <InventoryRounded sx={{ marginRight: '10px', marginBottom: '3px', color: '#374151' }} />
                                        Inventory
                                    </MenuItem>
                                    <SubMenu 
                                        defaultOpen 
                                        className='p-1' 
                                        label="Reports" 
                                        icon={<LeaderboardRounded 
                                            sx={{ 
                                                marginRight: '7px', 
                                                marginBottom: '3px', 
                                                color: '#374151' 
                                                }} 
                                            />}
                                        >
                                        <MenuItem className='p-1' sx={{ display: 'flex', alignItems: 'center', fontSize: '5rem' }}>
                                            <ShowChartRounded sx={{ marginRight: '10px', marginBottom: '3px', color: '#374151' }} />
                                            Sales
                                        </MenuItem>
                                        <MenuItem className='p-1' sx={{ display: 'flex', alignItems: 'center', fontSize: '5rem' }}>
                                            <DonutLargeRounded sx={{ marginRight: '10px', marginBottom: '3px', color: '#374151' }} />
                                            Analytics
                                        </MenuItem>
                                    </SubMenu>
                                </>
                                
                            )}
                        </Menu>
                    </div>
                    <main className='text-center mt-5' style={{ padding: 10 }}>
                        <div>
                            <IconButton
                                onClick={() => setCollapsed(!collapsed)}
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                                style={{
                                    backgroundColor: hovered ? '#222933' : '#374151',
                                    borderRadius: '50%',
                                    color: 'white',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                }}
                                >
                                <ArrowBackIosRounded />
                            </IconButton>
                        </div>
                    </main>
                </Sidebar>
            </div>
        </>
    );
}

