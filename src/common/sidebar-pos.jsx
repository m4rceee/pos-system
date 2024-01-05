import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shortLogo from '../svg pics/logo2.png'

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

    const [collapsed, setCollapsed] = useState(true);
    const [hovered, setHovered] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleItemHover = (itemId) => {
        setHoveredItem(itemId);
    };

    const getMenuItemStyle = (itemId) => ({
        backgroundColor: hoveredItem === itemId ? '#e9e1c4' : 'transparent',
        transition: '0.2s ease',
        cursor: hoveredItem === itemId ? 'pointer' : 'default',
      });

    const iconSize = collapsed ? 50 : 100;

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
                    transitionduration={750} 
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
                    
                    <div style={{ display: 'flex', flexDirection: 'column'}}  transitionduration={750}>
                        <Menu>
                            {collapsed ? (
                                <>
                                    <MenuItem
                                        onMouseEnter={() => handleItemHover('item1')}
                                        onMouseLeave={() => handleItemHover(null)}
                                        style={getMenuItemStyle('item1')}
                                        onClick={handleDashboardHome} 
                                        className='text-center'>
                                        <DashboardRounded sx={{ fontSize: '2rem', color: colors.primary }}/>
                                    </MenuItem>
                                    <MenuItem
                                        onMouseEnter={() => handleItemHover('item2')}
                                        onMouseLeave={() => handleItemHover(null)}
                                        style={getMenuItemStyle('item2')} 
                                        onClick={handlePosPage} 
                                        className='text-center'>
                                        <PointOfSaleRounded sx={{ fontSize: '2rem', color: colors.primary }}/>
                                    </MenuItem>
                                    <MenuItem
                                        onMouseEnter={() => handleItemHover('item3')}
                                        onMouseLeave={() => handleItemHover(null)}
                                        style={getMenuItemStyle('item3')} 
                                        onClick={handleCategoryHome} 
                                        className='text-center'>
                                        <FolderRounded sx={{ fontSize: '2rem', color: colors.primary }}/>
                                    </MenuItem>
                                    <MenuItem
                                        onMouseEnter={() => handleItemHover('item4')}
                                        onMouseLeave={() => handleItemHover(null)}
                                        style={getMenuItemStyle('item4')} 
                                        onClick={handleProductHome} 
                                        className='text-center'>
                                        <ShoppingCartRounded sx={{ fontSize: '2rem', color: colors.primary }}/>
                                    </MenuItem>
                                    <MenuItem 
                                        onMouseEnter={() => handleItemHover('item6')}
                                        onMouseLeave={() => handleItemHover(null)}
                                        style={getMenuItemStyle('item6')}
                                        className='text-center'>
                                        <LeaderboardRounded sx={{ fontSize: '2rem', color: colors.primary }}/>
                                    </MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem
                                        onMouseEnter={() => handleItemHover('item1')}
                                        onMouseLeave={() => handleItemHover(null)}
                                        style={getMenuItemStyle('item1')}
                                        onClick={handleDashboardHome} 
                                        className='p-1'
                                        icon={<DashboardRounded sx={{ marginBottom: '3px',color: colors.primary,}}/>}>
                                        Dashboard
                                    </MenuItem>
                                    <MenuItem 
                                        className='p-1' 
                                        onMouseEnter={() => handleItemHover('item2')}
                                        onMouseLeave={() => handleItemHover(null)}
                                        style={getMenuItemStyle('item2')}
                                        onClick={handlePosPage}
                                        icon={<PointOfSaleRounded sx={{ marginBottom: '3px', color: colors.primary }} />}>
                                        POS
                                    </MenuItem>
                                    <MenuItem 
                                        onClick={handleCategoryHome} 
                                        className='p-1'
                                        onMouseEnter={() => handleItemHover('item3')}
                                        onMouseLeave={() => handleItemHover(null)}
                                        style={getMenuItemStyle('item3')} 
                                        icon={<FolderRounded sx={{ marginBottom: '3px', color: colors.primary }} />}>
                                        Categories
                                    </MenuItem>
                                    <MenuItem 
                                        onClick={handleProductHome}
                                        className='p-1'
                                        onMouseEnter={() => handleItemHover('item4')}
                                        onMouseLeave={() => handleItemHover(null)}
                                        style={getMenuItemStyle('item4')} 
                                        icon={<ShoppingCartRounded sx={{ marginBottom: '3px', color: colors.primary }} />}>
                                        Products
                                    </MenuItem>
                                    <SubMenu
                                        className='p-1'
                                        onMouseEnter={() => handleItemHover('records')}
                                        onMouseLeave={() => handleItemHover(null)}
                                        style={getMenuItemStyle('records')} 
                                        label="Records" 
                                        icon={<LeaderboardRounded 
                                            sx={{ 
                                                marginRight: '7px', 
                                                marginBottom: '3px', 
                                                color: colors.primary 
                                                }} 
                                            />}
                                            
                                        >
                                        <MenuItem 
                                            className='p-1'
                                            onMouseEnter={() => handleItemHover('sales')}
                                            onMouseLeave={() => handleItemHover(null)}
                                            style={getMenuItemStyle('sales')}
                                            sx={{fontSize: '5rem' }}
                                            icon={<ShowChartRounded sx={{ marginBottom: '3px', color: colors.primary }} />}>
                                            Sales
                                        </MenuItem>
                                        <MenuItem 
                                            className='p-1'
                                            onMouseEnter={() => handleItemHover('analytics')}
                                            onMouseLeave={() => handleItemHover(null)}
                                            style={getMenuItemStyle('analytics')}
                                            sx={{ fontSize: '5rem' }}
                                            icon={<DonutLargeRounded sx={{ marginBottom: '3px', color: colors.primary }} />}>
                                            Analytics
                                        </MenuItem>
                                    </SubMenu>
                                </>
                                
                            )}
                        </Menu>
                    </div>
                    <main className='text-center' style={{ padding: 10 }} transitionduration={750}>
                        <div>
                            <IconButton
                                onClick={() => setCollapsed(!collapsed)}
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                                style={{
                                    backgroundColor: 'none',
                                    borderRadius: '50%',
                                    color: colors.primary,
                                    transition: '0.2s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: '#e9e1c4',
                                        cursor: 'pointer',
                                    }
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