import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { Layout } from "./components/layout/layout";

import iTable from './pages/index';
import InventorySubmit from './pages/inventory';
import InventoryRead from './pages/inventory_read';
import developer from './pages/developers';
import SerialPortProvider from './utils/SerialProvider';
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <NextUIProvider>
        <SerialPortProvider>
          <Layout>
            <Routes>
              <Route path="/" Component={iTable} />
              <Route path="/inventory" Component={InventorySubmit} />
              <Route path="/inventory_read" Component={InventoryRead} />
              <Route path="/developers" Component={developer} />
            </Routes>
          </Layout>
        </SerialPortProvider>
      </NextUIProvider>
    </Router>
  </React.StrictMode>,
)
