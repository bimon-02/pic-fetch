// pages/dashboard.js
"use client";

import React, { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const theme = createTheme();

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: any, newValue: React.SetStateAction<number>) => {
    setSelectedTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <Paper elevation={3} square>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Tab 1" />
            <Tab label="Tab 2" />
          </Tabs>
        </Paper>
        <Box p={3}>
          {selectedTab === 0 && <div>Content for Tab 1</div>}
          {selectedTab === 1 && <div>Content for Tab 2</div>}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
