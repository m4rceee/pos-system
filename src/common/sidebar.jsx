import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shortLogo from '../svg pics/logo2.png';
import logo3 from '../svg pics/3.svg';

import "../styles.css";
import 'typeface-poppins';

import { Typography } from '@mui/material';

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

    const [collapsed, setCollapsed] = useState(true);

    const handleSidebarHover = () => {
        if (collapsed) {
            setCollapsed(false);
        }
    };

    const handleSidebarLeave = () => {
        if (!collapsed) {
            setCollapsed(true);
        }
    };

    const getMenuItemStyle = (itemId) => ({
        backgroundColor: collapsed ? 'transparent' : 'transparent',
        transition: '0.2s ease',
        cursor: 'pointer',
    });

    const iconSize = collapsed ? 75 : 200;

    const handleCategoryHome = () => {
        navigate('/category-home');
    }

    const handleDashboardHome = () => {
        navigate('/dashboard');
    }

    const handleProductHome = () => {
        navigate('/product-home');
    }

    const handlePosPage = () => {
        navigate('/pos');
    }

    const handleReports = () => {
        navigate('/reports-home');
    }

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                zIndex: 1000,
                display: 'flex',
                height: '100%',
            }}
        >
            <Sidebar
                collapsed={collapsed}
                width='200px'
                backgroundColor={colors.secondary}
                onMouseEnter={handleSidebarHover}
                onMouseLeave={handleSidebarLeave}
            >
                <div className='text-center'>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={logo3} alt="store logo" style={{iconSize}}/>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }} transitionDuration={750}>
                <Menu>
                    {!collapsed ? (
                        <>
                            <MenuItem
                                style={getMenuItemStyle('item1')}
                                onClick={handleDashboardHome}
                                className='p-1 menu-item'
                                icon={<DashboardRounded sx={{ marginBottom: '3px', color: colors.primary }} />}
                            >
                                Dashboard
                            </MenuItem>
                            <MenuItem
                                style={getMenuItemStyle('item2')}
                                onClick={handlePosPage}
                                className='p-1 menu-item'
                                icon={<PointOfSaleRounded sx={{ marginBottom: '3px', color: colors.primary }} />}
                            >
                                POS
                            </MenuItem>
                            <MenuItem
                                style={getMenuItemStyle('item3')}
                                onClick={handleCategoryHome}
                                className='p-1 menu-item'
                                icon={<FolderRounded sx={{ marginBottom: '3px', color: colors.primary }} />}
                            >
                                Categories
                            </MenuItem>
                            <MenuItem
                                style={getMenuItemStyle('item4')}
                                onClick={handleProductHome}
                                className='p-1 menu-item'
                                icon={<ShoppingCartRounded sx={{ marginBottom: '3px', color: colors.primary }} />}
                            >
                                Products
                            </MenuItem>
                            <MenuItem
                                style={getMenuItemStyle('item5')}
                                onClick={handleReports}
                                className='p-1 menu-item'
                                icon={<LeaderboardRounded sx={{ marginBottom: '3px', color: colors.primary }} />}
                            >
                                Reports
                            </MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem
                                style={getMenuItemStyle('item1')}
                                onClick={handleDashboardHome}
                                className='text-center menu-item'
                            >
                                <DashboardRounded sx={{ fontSize: '2rem', color: colors.primary }} />
                            </MenuItem>
                            <MenuItem
                                style={getMenuItemStyle('item2')}
                                onClick={handlePosPage}
                                className='text-center menu-item'
                            >
                                <PointOfSaleRounded sx={{ fontSize: '2rem', color: colors.primary }} />
                            </MenuItem>
                            <MenuItem
                                style={getMenuItemStyle('item3')}
                                onClick={handleCategoryHome}
                                className='text-center'
                            >
                                <FolderRounded sx={{ fontSize: '2rem', color: colors.primary }} />
                            </MenuItem>
                            <MenuItem
                                style={getMenuItemStyle('item4')}
                                onClick={handleProductHome}
                                className='text-center menu-item'
                            >
                                <ShoppingCartRounded sx={{ fontSize: '2rem', color: colors.primary }} />
                            </MenuItem>
                            <MenuItem
                                style={getMenuItemStyle('item5')}
                                className='text-center menu-item'
                            >
                                <LeaderboardRounded sx={{ fontSize: '2rem', color: colors.primary }} />
                            </MenuItem>
                        </>

                    )}
                    </Menu>
                </div>
            </Sidebar>
        </div>
    );
}
